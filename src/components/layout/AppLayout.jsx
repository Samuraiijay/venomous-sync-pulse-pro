import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Upload, GitCompare, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { path: '/Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/Directory', label: 'Directory', icon: Users },
  { path: '/Compare', label: 'Compare', icon: GitCompare },
  { path: '/Import', label: 'Import Data', icon: Upload },
];

export default function AppLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SN</span>
              </div>
              <span className="font-semibold text-slate-900 tracking-tight text-lg hidden sm:block">ServiceHub</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="w-8" />
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 space-y-1">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    active
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}