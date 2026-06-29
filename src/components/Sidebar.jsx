import { useState } from 'react';
import {
  LayoutDashboard, Building2, FileText, Calendar,
  FolderOpen, Settings, ChevronLeft, ChevronRight, LogOut, Receipt, CircleDollarSign, ScrollText, Users,
} from 'lucide-react';
import { cn } from '../lib/utils';

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Tableau de bord',  icon: LayoutDashboard },
  { id: 'societes',     label: 'Sociétés',          icon: Building2 },
  { id: 'declarations', label: 'Déclarations',      icon: FileText },
  { id: 'calendrier',   label: 'Calendrier fiscal', icon: Calendar },
  { id: 'documents',    label: 'Documents',         icon: FolderOpen },
  { id: 'clients',      label: 'Clients',           icon: Users },
  { id: 'depenses',     label: 'Dépenses',          icon: Receipt },
  { id: 'revenus',      label: 'Revenus',           icon: CircleDollarSign },
  { id: 'factures',     label: 'Factures',          icon: ScrollText },
];

const BOTTOM_ITEMS = [
  { id: 'parametres', label: 'Paramètres', icon: Settings },
];

export default function Sidebar({ activePage, setActivePage, collapsed, setCollapsed }) {
  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-white border-r border-slate-200/80 shrink-0 transition-all duration-200 ease-in-out',
        collapsed ? 'w-16' : 'w-[220px]'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-14 px-4 border-b border-slate-100 shrink-0', collapsed && 'justify-center px-0')}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
          S
        </div>
        {!collapsed && (
          <div className="ml-2.5 overflow-hidden">
            <p className="text-sm font-bold text-slate-900 leading-none whitespace-nowrap">SmartAx Pro</p>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium tracking-wide uppercase whitespace-nowrap">Portail Comptable</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-0.5 px-2">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const active = activePage === id;
            return (
              <li key={id}>
                <button
                  onClick={() => setActivePage(id)}
                  title={collapsed ? label : undefined}
                  className={cn(
                    'flex items-center w-full rounded-lg transition-colors cursor-pointer group',
                    collapsed ? 'justify-center h-10 w-10 mx-auto' : 'gap-3 px-3 h-9',
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4', active && 'text-blue-600')} />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{label}</span>
                  )}
                  {active && !collapsed && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Divider + bottom nav */}
        <div className="mt-3 pt-3 border-t border-slate-100 mx-2">
          <ul className="space-y-0.5">
            {BOTTOM_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = activePage === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => setActivePage(id)}
                    title={collapsed ? label : undefined}
                    className={cn(
                      'flex items-center w-full rounded-lg transition-colors cursor-pointer',
                      collapsed ? 'justify-center h-10 w-10 mx-auto' : 'gap-3 px-3 h-9',
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    )}
                  >
                    <Icon className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4', active && 'text-blue-600')} />
                    {!collapsed && <span className="text-sm font-medium truncate">{label}</span>}
                    {active && !collapsed && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User area + collapse toggle */}
      <div className="shrink-0 border-t border-slate-100">
        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-4 py-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              OK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate leading-none">Othmane Kahtal</p>
              <p className="text-[10px] text-slate-400 mt-0.5 truncate">Expert Comptable</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600 cursor-pointer p-1 rounded-md hover:bg-slate-100 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={cn(
            'flex items-center justify-center w-full py-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer border-t border-slate-100',
          )}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <><ChevronLeft className="w-4 h-4 mr-1.5" /><span className="text-xs text-slate-400">Réduire</span></>
          }
        </button>
      </div>
    </aside>
  );
}
