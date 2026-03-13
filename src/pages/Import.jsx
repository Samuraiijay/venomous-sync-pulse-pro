import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, FileSpreadsheet, Users, Laptop, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';

const IMPORT_TYPES = [
  {
    id: 'employees',
    label: 'Employees',
    icon: Users,
    description: 'Import employee profiles from CSV or Excel',
    color: 'indigo',
  },
  {
    id: 'hardware',
    label: 'Hardware',
    icon: Laptop,
    description: 'Import hardware assignments',
    color: 'cyan',
  },
  {
    id: 'issues',
    label: 'Issues',
    icon: AlertCircle,
    description: 'Import incident/issue tickets',
    color: 'rose',
  },
];

export default function Import() {
  const [selected, setSelected] = useState('employees');
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);
  const queryClient = useQueryClient();

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResult(null);

    const { file_url } = await base44.integrations.Core.UploadFile({ file });

    const schemas = {
      employees: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            full_name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            department: { type: 'string' },
            job_title: { type: 'string' },
            location: { type: 'string' },
            city: { type: 'string' },
            country: { type: 'string' },
            manager: { type: 'string' },
            employee_id: { type: 'string' },
            start_date: { type: 'string' },
            status: { type: 'string' },
            special_details: { type: 'string' },
            source: { type: 'string' },
          },
        },
      },
      hardware: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            employee_id: { type: 'string' },
            device_name: { type: 'string' },
            device_type: { type: 'string' },
            serial_number: { type: 'string' },
            asset_tag: { type: 'string' },
            assigned_date: { type: 'string' },
            status: { type: 'string' },
            notes: { type: 'string' },
          },
        },
      },
      issues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            employee_id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            category: { type: 'string' },
            priority: { type: 'string' },
            status: { type: 'string' },
            ticket_number: { type: 'string' },
            resolved_date: { type: 'string' },
            source: { type: 'string' },
          },
        },
      },
    };

    const extracted = await base44.integrations.Core.ExtractDataFromUploadedFile({
      file_url,
      json_schema: schemas[selected],
    });

    if (extracted.status === 'success' && extracted.output) {
      const records = Array.isArray(extracted.output) ? extracted.output : [extracted.output];
      const entityMap = {
        employees: 'Employee',
        hardware: 'HardwareAssignment',
        issues: 'Issue',
      };

      await base44.entities[entityMap[selected]].bulkCreate(records);
      queryClient.invalidateQueries();
      setResult({ success: true, count: records.length });
    } else {
      setResult({ success: false, error: extracted.details || 'Failed to extract data' });
    }

    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="p-6 lg:p-10 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Import Data</h1>
        <p className="text-slate-500 mt-1">Upload CSV or Excel files exported from ServiceNow or Neon DB</p>
      </div>

      {/* Import type selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {IMPORT_TYPES.map(type => {
          const Icon = type.icon;
          const active = selected === type.id;
          return (
            <button
              key={type.id}
              onClick={() => { setSelected(type.id); setResult(null); }}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all duration-200",
                active
                  ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/10"
                  : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
              )}
            >
              <Icon className={cn("w-5 h-5 mb-2", active ? "text-white" : "text-slate-400")} />
              <p className={cn("font-semibold text-sm", active ? "text-white" : "text-slate-900")}>{type.label}</p>
              <p className={cn("text-xs mt-0.5", active ? "text-slate-300" : "text-slate-400")}>{type.description}</p>
            </button>
          );
        })}
      </div>

      {/* Upload area */}
      <div className="bg-white rounded-2xl border border-slate-200/60 border-dashed p-10 text-center">
        <input
          ref={fileRef}
          type="file"
          accept=".csv,.xlsx,.xls,.json"
          className="hidden"
          onChange={handleFileUpload}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-600 font-medium">Processing file...</p>
            <p className="text-sm text-slate-400">Extracting and importing data</p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium">Drop your file here or click to upload</p>
            <p className="text-sm text-slate-400 mt-1">Supports CSV, Excel, and JSON files</p>
            <Button
              onClick={() => fileRef.current?.click()}
              className="mt-4 bg-slate-900 hover:bg-slate-800"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select File
            </Button>
          </>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className={cn(
          "rounded-2xl border p-5 flex items-center gap-4",
          result.success
            ? "bg-emerald-50 border-emerald-200"
            : "bg-red-50 border-red-200"
        )}>
          {result.success ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          )}
          <div>
            {result.success ? (
              <>
                <p className="font-medium text-emerald-800">Successfully imported {result.count} records</p>
                <p className="text-sm text-emerald-600 mt-0.5">Data is now available in the dashboard and directory</p>
              </>
            ) : (
              <>
                <p className="font-medium text-red-800">Import failed</p>
                <p className="text-sm text-red-600 mt-0.5">{result.error}</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-slate-50 rounded-2xl p-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-3">Tips for importing</h3>
        <ul className="space-y-2 text-sm text-slate-500">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
            Export data from ServiceNow as CSV (use list views or reports)
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
            For Neon DB, export query results as CSV or JSON
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
            Set the "source" column to "servicenow" or "neon_db" to track data origin
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
            For hardware and issues, use the employee's record ID in the "employee_id" column
          </li>
        </ul>
      </div>
    </div>
  );
}