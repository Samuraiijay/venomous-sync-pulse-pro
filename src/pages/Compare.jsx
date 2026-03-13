import React, { useState, useMemo } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { GitCompare, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';

function EmployeePicker({ employees, selected, onSelect, label }) {
  const [open, setOpen] = useState(false);
  const current = employees.find(e => e.id === selected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between h-12 bg-white">
          {current ? (
            <span className="truncate">{current.full_name}</span>
          ) : (
            <span className="text-slate-400">{label}</span>
          )}
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput placeholder="Search employee..." />
          <CommandList>
            <CommandEmpty>No employee found.</CommandEmpty>
            <CommandGroup>
              {employees.map(emp => (
                <CommandItem
                  key={emp.id}
                  value={emp.full_name}
                  onSelect={() => { onSelect(emp.id); setOpen(false); }}
                >
                  <Check className={cn("w-4 h-4 mr-2", selected === emp.id ? "opacity-100" : "opacity-0")} />
                  <div>
                    <span className="font-medium">{emp.full_name}</span>
                    {emp.department && <span className="text-xs text-slate-400 ml-2">{emp.department}</span>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CompareField({ label, valueA, valueB }) {
  const match = valueA === valueB && valueA;
  return (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-slate-100 last:border-0">
      <div className="text-sm text-slate-500 font-medium">{label}</div>
      <div className={cn("text-sm", match ? "text-slate-600" : "text-slate-900 font-medium")}>
        {valueA || <span className="text-slate-300">—</span>}
      </div>
      <div className={cn("text-sm", match ? "text-slate-600" : "text-slate-900 font-medium")}>
        {valueB || <span className="text-slate-300">—</span>}
      </div>
    </div>
  );
}

export default function Compare() {
  const [empA, setEmpA] = useState(null);
  const [empB, setEmpB] = useState(null);

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: () => base44.entities.Employee.list('full_name', 200),
  });

  const { data: allHardware = [] } = useQuery({
    queryKey: ['hardware-all'],
    queryFn: () => base44.entities.HardwareAssignment.list('-assigned_date', 500),
  });

  const { data: allIssues = [] } = useQuery({
    queryKey: ['issues-all'],
    queryFn: () => base44.entities.Issue.list('-created_date', 500),
  });

  const a = employees.find(e => e.id === empA);
  const b = employees.find(e => e.id === empB);
  const hwA = allHardware.filter(h => h.employee_id === empA && h.status === 'active');
  const hwB = allHardware.filter(h => h.employee_id === empB && h.status === 'active');
  const issuesA = allIssues.filter(i => i.employee_id === empA);
  const issuesB = allIssues.filter(i => i.employee_id === empB);

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Compare Profiles</h1>
        <p className="text-slate-500 mt-1">Compare data between two employees side by side</p>
      </div>

      {/* Pickers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmployeePicker employees={employees} selected={empA} onSelect={setEmpA} label="Select first employee" />
        <EmployeePicker employees={employees} selected={empB} onSelect={setEmpB} label="Select second employee" />
      </div>

      {a && b ? (
        <div className="space-y-6">
          {/* Profile Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[a, b].map((emp) => {
              const initials = emp.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
              return (
                <Link key={emp.id} to={`/Profile?id=${emp.id}`} className="bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    {emp.profile_picture_url ? (
                      <img src={emp.profile_picture_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold">{initials}</span>
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{emp.full_name}</p>
                      <p className="text-xs text-slate-400 truncate">{emp.job_title}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 ml-auto group-hover:text-indigo-500 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Profile Comparison</h3>
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-slate-200 mb-1">
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Field</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{a.full_name}</div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{b.full_name}</div>
            </div>
            <CompareField label="Email" valueA={a.email} valueB={b.email} />
            <CompareField label="Department" valueA={a.department} valueB={b.department} />
            <CompareField label="Job Title" valueA={a.job_title} valueB={b.job_title} />
            <CompareField label="Location" valueA={[a.city, a.country].filter(Boolean).join(', ')} valueB={[b.city, b.country].filter(Boolean).join(', ')} />
            <CompareField label="Manager" valueA={a.manager} valueB={b.manager} />
            <CompareField label="Status" valueA={a.status} valueB={b.status} />
            <CompareField label="Source" valueA={a.source} valueB={b.source} />
            <CompareField label="Active Devices" valueA={String(hwA.length)} valueB={String(hwB.length)} />
            <CompareField label="Open Issues" valueA={String(issuesA.filter(i => i.status === 'open' || i.status === 'in_progress').length)} valueB={String(issuesB.filter(i => i.status === 'open' || i.status === 'in_progress').length)} />
            <CompareField label="Total Issues" valueA={String(issuesA.length)} valueB={String(issuesB.length)} />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/60 p-16 text-center">
          <GitCompare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Select two employees to compare</p>
          <p className="text-sm text-slate-400 mt-1">Choose from the dropdowns above</p>
        </div>
      )}
    </div>
  );
}