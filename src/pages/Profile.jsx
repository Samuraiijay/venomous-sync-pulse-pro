import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Mail, Phone, MapPin, Briefcase, Calendar, Building2,
  User, Hash, FileText, Laptop, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import HardwareList from '../components/employees/HardwareList';
import IssueTimeline from '../components/employees/IssueTimeline';

const SOURCE_LABELS = {
  servicenow: { label: 'ServiceNow', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  neon_db: { label: 'Neon DB', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  both: { label: 'Both Sources', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  manual: { label: 'Manual', color: 'bg-slate-50 text-slate-500 border-slate-200' },
};

const STATUS_STYLES = {
  active: 'bg-emerald-50 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-500',
  on_leave: 'bg-amber-50 text-amber-700',
};

function InfoRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
      <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
      <span className="text-sm text-slate-500 w-28 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-900 font-medium">{value}</span>
    </div>
  );
}

export default function Profile() {
  const urlParams = new URLSearchParams(window.location.search);
  const employeeId = urlParams.get('id');

  const { data: employees = [], isLoading: loadingEmp } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => base44.entities.Employee.filter({ id: employeeId }),
    enabled: !!employeeId,
  });

  const employee = employees[0];

  const { data: hardware = [], isLoading: loadingHw } = useQuery({
    queryKey: ['hardware', employeeId],
    queryFn: () => base44.entities.HardwareAssignment.filter({ employee_id: employeeId }, '-assigned_date'),
    enabled: !!employeeId,
  });

  const { data: issues = [], isLoading: loadingIssues } = useQuery({
    queryKey: ['issues', employeeId],
    queryFn: () => base44.entities.Issue.filter({ employee_id: employeeId }, '-created_date'),
    enabled: !!employeeId,
  });

  const isLoading = loadingEmp;

  if (!employeeId) {
    return (
      <div className="p-10 text-center">
        <p className="text-slate-500">No employee selected</p>
        <Link to="/Directory" className="text-indigo-600 text-sm mt-2 inline-block">Go to Directory</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="bg-white rounded-2xl border p-8">
          <div className="flex gap-6">
            <Skeleton className="w-24 h-24 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-10 text-center">
        <p className="text-slate-500">Employee not found</p>
        <Link to="/Directory" className="text-indigo-600 text-sm mt-2 inline-block">Back to Directory</Link>
      </div>
    );
  }

  const initials = employee.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const sourceInfo = SOURCE_LABELS[employee.source] || SOURCE_LABELS.manual;
  const openIssues = issues.filter(i => i.status === 'open' || i.status === 'in_progress');
  const activeHw = hardware.filter(h => h.status === 'active');

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto space-y-6">
      {/* Back */}
      <Link to="/Directory" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Directory
      </Link>

      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600" />
        <div className="px-6 lg:px-8 pb-6 -mt-14">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {employee.profile_picture_url ? (
              <img
                src={employee.profile_picture_url}
                alt={employee.full_name}
                className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center shadow-lg">
                <span className="text-indigo-600 font-bold text-2xl">{initials}</span>
              </div>
            )}
            <div className="flex-1 pt-4 sm:pt-8">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">{employee.full_name}</h1>
                <Badge className={cn("text-xs font-medium", STATUS_STYLES[employee.status] || STATUS_STYLES.active)}>
                  {employee.status || 'active'}
                </Badge>
                <Badge variant="outline" className={cn("text-xs", sourceInfo.color)}>
                  {sourceInfo.label}
                </Badge>
              </div>
              {employee.job_title && (
                <p className="text-slate-500 mt-1">{employee.job_title}{employee.department ? ` · ${employee.department}` : ''}</p>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{activeHw.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">Active Devices</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{openIssues.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">Open Issues</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{issues.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">Total Issues</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="bg-white border border-slate-200/60">
          <TabsTrigger value="details" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
            Details
          </TabsTrigger>
          <TabsTrigger value="hardware" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
            Hardware ({hardware.length})
          </TabsTrigger>
          <TabsTrigger value="issues" className="data-[state=active]:bg-slate-900 data-[state=active]:text-white">
            Issues ({issues.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Contact & Details</h3>
            <InfoRow icon={Mail} label="Email" value={employee.email} />
            <InfoRow icon={Phone} label="Phone" value={employee.phone} />
            <InfoRow icon={MapPin} label="Location" value={[employee.city, employee.country].filter(Boolean).join(', ') || employee.location} />
            <InfoRow icon={Building2} label="Department" value={employee.department} />
            <InfoRow icon={Briefcase} label="Job Title" value={employee.job_title} />
            <InfoRow icon={User} label="Manager" value={employee.manager} />
            <InfoRow icon={Hash} label="Employee ID" value={employee.employee_id} />
            <InfoRow icon={Calendar} label="Start Date" value={employee.start_date ? format(new Date(employee.start_date), 'MMMM d, yyyy') : null} />

            {employee.special_details && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Special Details</span>
                </div>
                <p className="text-sm text-slate-600 bg-slate-50 rounded-xl p-4 leading-relaxed">
                  {employee.special_details}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="hardware">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Hardware Assignments</h3>
              <Badge variant="secondary" className="text-xs">{activeHw.length} active</Badge>
            </div>
            {loadingHw ? (
              <div className="space-y-3">
                {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-16 rounded-xl" />)}
              </div>
            ) : (
              <HardwareList assignments={hardware} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="issues">
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Recent Issues</h3>
              <Badge variant="secondary" className="text-xs">{openIssues.length} open</Badge>
            </div>
            {loadingIssues ? (
              <div className="space-y-3">
                {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
              </div>
            ) : (
              <IssueTimeline issues={issues} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}