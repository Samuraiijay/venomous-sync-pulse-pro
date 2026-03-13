import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Users, AlertCircle, Laptop, Building2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/dashboard/StatCard';
import EmployeeCard from '../components/employees/EmployeeCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { data: employees = [], isLoading: loadingEmp } = useQuery({
    queryKey: ['employees'],
    queryFn: () => base44.entities.Employee.list('-created_date', 50),
  });

  const { data: issues = [], isLoading: loadingIssues } = useQuery({
    queryKey: ['issues'],
    queryFn: () => base44.entities.Issue.list('-created_date', 50),
  });

  const { data: hardware = [], isLoading: loadingHw } = useQuery({
    queryKey: ['hardware'],
    queryFn: () => base44.entities.HardwareAssignment.list('-created_date', 50),
  });

  const isLoading = loadingEmp || loadingIssues || loadingHw;

  const openIssues = issues.filter(i => i.status === 'open' || i.status === 'in_progress');
  const activeHardware = hardware.filter(h => h.status === 'active');
  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))];
  const recentEmployees = employees.slice(0, 6);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your organization's IT data</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/60 p-5">
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-9 w-16" />
            </div>
          ))
        ) : (
          <>
            <StatCard title="Employees" value={employees.length} icon={Users} accent="indigo" subtitle={`${employees.filter(e=>e.status==='active').length} active`} />
            <StatCard title="Open Issues" value={openIssues.length} icon={AlertCircle} accent="rose" subtitle={`${issues.length} total`} />
            <StatCard title="Active Devices" value={activeHardware.length} icon={Laptop} accent="cyan" subtitle={`${hardware.length} total`} />
            <StatCard title="Departments" value={departments.length} icon={Building2} accent="amber" />
          </>
        )}
      </div>

      {/* Source Breakdown */}
      {!isLoading && employees.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Data Sources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['servicenow', 'neon_db', 'both', 'manual'].map(src => {
              const count = employees.filter(e => e.source === src).length;
              const labels = { servicenow: 'ServiceNow', neon_db: 'Neon DB', both: 'Both Sources', manual: 'Manual' };
              const colors = { servicenow: 'bg-emerald-500', neon_db: 'bg-cyan-500', both: 'bg-violet-500', manual: 'bg-slate-400' };
              return (
                <div key={src} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${colors[src]}`} />
                  <div>
                    <span className="text-sm font-medium text-slate-700">{labels[src]}</span>
                    <span className="text-sm text-slate-400 ml-2">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Employees */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Recent Profiles</h2>
          <Link to="/Directory" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View all →
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border p-5">
                <div className="flex gap-4">
                  <Skeleton className="w-14 h-14 rounded-xl" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : recentEmployees.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No employees yet</p>
            <p className="text-sm text-slate-400 mt-1">Import data to get started</p>
            <Link to="/Import" className="inline-flex mt-4 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 transition-colors">
              Import Data
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentEmployees.map(emp => (
              <EmployeeCard key={emp.id} employee={emp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}