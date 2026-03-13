import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import EmployeeCard from '../components/employees/EmployeeCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Directory() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [source, setSource] = useState('all');
  const [status, setStatus] = useState('all');

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: () => base44.entities.Employee.list('-created_date', 200),
  });

  const departments = useMemo(() => [...new Set(employees.map(e => e.department).filter(Boolean))].sort(), [employees]);

  const filtered = useMemo(() => {
    return employees.filter(emp => {
      const matchSearch = !search || 
        emp.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        emp.email?.toLowerCase().includes(search.toLowerCase()) ||
        emp.job_title?.toLowerCase().includes(search.toLowerCase()) ||
        emp.employee_id?.toLowerCase().includes(search.toLowerCase());
      const matchDept = department === 'all' || emp.department === department;
      const matchSource = source === 'all' || emp.source === source;
      const matchStatus = status === 'all' || emp.status === status;
      return matchSearch && matchDept && matchSource && matchStatus;
    });
  }, [employees, search, department, source, status]);

  const hasFilters = department !== 'all' || source !== 'all' || status !== 'all';

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Directory</h1>
        <p className="text-slate-500 mt-1">{employees.length} employees</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search by name, email, title, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 bg-white border-slate-200"
          />
        </div>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-full sm:w-44 bg-white">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={source} onValueChange={setSource}>
          <SelectTrigger className="w-full sm:w-40 bg-white">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="servicenow">ServiceNow</SelectItem>
            <SelectItem value="neon_db">Neon DB</SelectItem>
            <SelectItem value="both">Both</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-36 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="on_leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sm text-slate-500">{filtered.length} results</span>
          <button
            onClick={() => { setDepartment('all'); setSource('all'); setStatus('all'); }}
            className="ml-2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(9).fill(0).map((_, i) => (
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
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border p-12 text-center">
          <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No employees found</p>
          <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(emp => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      )}
    </div>
  );
}