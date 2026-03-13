import React from 'react';
import { Laptop, Monitor, Smartphone, Tablet, Mouse, HardDrive, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const DEVICE_ICONS = {
  laptop: Laptop,
  desktop: HardDrive,
  monitor: Monitor,
  phone: Smartphone,
  tablet: Tablet,
  peripheral: Mouse,
  other: Package,
};

const STATUS_STYLES = {
  active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  returned: 'bg-slate-50 text-slate-500 border-slate-200',
  lost: 'bg-red-50 text-red-600 border-red-200',
  damaged: 'bg-amber-50 text-amber-700 border-amber-200',
  retired: 'bg-slate-100 text-slate-400 border-slate-200',
};

export default function HardwareList({ assignments }) {
  if (!assignments || assignments.length === 0) {
    return (
      <div className="text-center py-10 text-slate-400">
        <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No hardware assigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {assignments.map((hw) => {
        const Icon = DEVICE_ICONS[hw.device_type] || Package;
        return (
          <div
            key={hw.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-100"
          >
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm text-slate-900 truncate">{hw.device_name}</span>
                <Badge variant="outline" className={cn("text-xs", STATUS_STYLES[hw.status] || STATUS_STYLES.active)}>
                  {hw.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                {hw.serial_number && <span>SN: {hw.serial_number}</span>}
                {hw.asset_tag && <span>Tag: {hw.asset_tag}</span>}
                {hw.assigned_date && <span>Assigned: {format(new Date(hw.assigned_date), 'MMM d, yyyy')}</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}