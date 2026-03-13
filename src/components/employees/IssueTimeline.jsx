import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Clock, CheckCircle2, Loader2, TicketCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const PRIORITY_STYLES = {
  critical: 'bg-red-50 text-red-700 border-red-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  low: 'bg-blue-50 text-blue-600 border-blue-200',
};

const STATUS_ICONS = {
  open: { icon: AlertCircle, color: 'text-red-400' },
  in_progress: { icon: Loader2, color: 'text-amber-500' },
  resolved: { icon: CheckCircle2, color: 'text-emerald-500' },
  closed: { icon: TicketCheck, color: 'text-slate-400' },
};

const CATEGORY_STYLES = {
  hardware: 'bg-violet-50 text-violet-600 border-violet-200',
  software: 'bg-blue-50 text-blue-600 border-blue-200',
  network: 'bg-cyan-50 text-cyan-600 border-cyan-200',
  access: 'bg-amber-50 text-amber-600 border-amber-200',
  account: 'bg-pink-50 text-pink-600 border-pink-200',
  other: 'bg-slate-50 text-slate-500 border-slate-200',
};

export default function IssueTimeline({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        <TicketCheck className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No issues found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {issues.map((issue, index) => {
        const statusConfig = STATUS_ICONS[issue.status] || STATUS_ICONS.open;
        const StatusIcon = statusConfig.icon;

        return (
          <div key={issue.id} className="relative flex gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className={cn("mt-0.5 flex-shrink-0", statusConfig.color)}>
              <StatusIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-medium text-slate-900 leading-snug">{issue.title}</h4>
                {issue.ticket_number && (
                  <span className="text-xs text-slate-400 font-mono flex-shrink-0">{issue.ticket_number}</span>
                )}
              </div>
              {issue.description && (
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{issue.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-2.5">
                {issue.priority && (
                  <Badge variant="outline" className={cn("text-xs", PRIORITY_STYLES[issue.priority])}>
                    {issue.priority}
                  </Badge>
                )}
                {issue.category && (
                  <Badge variant="outline" className={cn("text-xs", CATEGORY_STYLES[issue.category])}>
                    {issue.category}
                  </Badge>
                )}
                {issue.source && issue.source !== 'manual' && (
                  <Badge variant="outline" className="text-xs bg-slate-50 text-slate-400 border-slate-200">
                    {issue.source === 'servicenow' ? 'ServiceNow' : 'Neon DB'}
                  </Badge>
                )}
                <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {format(new Date(issue.created_date), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}