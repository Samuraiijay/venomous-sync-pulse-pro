import React from 'react';
import { cn } from '@/lib/utils';

export default function StatCard({ title, value, icon: Icon, accent = 'indigo', subtitle }) {
  const accents = {
    indigo: 'from-indigo-500 to-violet-500 text-indigo-600 bg-indigo-50',
    emerald: 'from-emerald-500 to-teal-500 text-emerald-600 bg-emerald-50',
    amber: 'from-amber-500 to-orange-500 text-amber-600 bg-amber-50',
    rose: 'from-rose-500 to-pink-500 text-rose-600 bg-rose-50',
    cyan: 'from-cyan-500 to-blue-500 text-cyan-600 bg-cyan-50',
  };

  const a = accents[accent] || accents.indigo;
  const parts = a.split(' ');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-md hover:shadow-slate-100 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1 tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", parts[2], parts[3])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}