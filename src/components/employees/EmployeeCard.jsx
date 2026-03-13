import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const SOURCE_COLORS = {
  servicenow: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  neon_db: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  both: 'bg-violet-50 text-violet-700 border-violet-200',
  manual: 'bg-slate-50 text-slate-600 border-slate-200',
};

const STATUS_DOT = {
  active: 'bg-emerald-400',
  inactive: 'bg-slate-300',
  on_leave: 'bg-amber-400',
};

export default function EmployeeCard({ employee }) {
  const initials = employee.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Link
      to={`/Profile?id=${employee.id}`}
      className="group block bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300/60 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          {employee.profile_picture_url ? (
            <img
              src={employee.profile_picture_url}
              alt={employee.full_name}
              className="w-14 h-14 rounded-xl object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-lg">{initials}</span>
            </div>
          )}
          <div className={cn(
            "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white",
            STATUS_DOT[employee.status] || STATUS_DOT.active
          )} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
              {employee.full_name}
            </h3>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </div>

          {employee.job_title && (
            <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-500">
              <Briefcase className="w-3.5 h-3.5" />
              <span className="truncate">{employee.job_title}</span>
            </div>
          )}

          {(employee.city || employee.location) && (
            <div className="flex items-center gap-1.5 mt-0.5 text-sm text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{[employee.city, employee.country].filter(Boolean).join(', ') || employee.location}</span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2.5">
            {employee.department && (
              <Badge variant="secondary" className="text-xs font-normal bg-slate-100 text-slate-600">
                {employee.department}
              </Badge>
            )}
            {employee.source && employee.source !== 'manual' && (
              <Badge variant="outline" className={cn("text-xs font-normal", SOURCE_COLORS[employee.source])}>
                {employee.source === 'neon_db' ? 'Neon DB' : employee.source === 'servicenow' ? 'ServiceNow' : 'Both'}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}