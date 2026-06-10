import { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Settings, FileText, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

const PAGE_LABELS = {
  dashboard:    'Tableau de bord',
  societes:     'Sociétés',
  declarations: 'Déclarations',
  calendrier:   'Calendrier fiscal',
  documents:    'Documents',
  parametres:   'Paramètres',
  depenses:     'Dépenses',
};

function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors cursor-pointer">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
          OK
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-slate-900 leading-none">Othmane Kahtal</p>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-52 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden animate-fade-up">
          <div className="px-3 py-2.5 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-900">Othmane Kahtal</p>
            <p className="text-xs text-slate-400 mt-0.5">othmanekahtal@gmail.com</p>
          </div>
          <div className="p-1">
            {[
              { icon: User,     label: 'Mon profil' },
              { icon: Settings, label: 'Paramètres' },
              { icon: FileText, label: 'Facturation' },
            ].map(({ icon: Icon, label }) => (
              <button key={label} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors">
                <Icon className="w-4 h-4 text-slate-400" />{label}
              </button>
            ))}
          </div>
          <div className="p-1 border-t border-slate-100">
            <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors">
              <LogOut className="w-4 h-4" />Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TopBar({ activePage, search, setSearch }) {
  return (
    <header className="h-14 bg-white border-b border-slate-200/80 shrink-0 flex items-center gap-4 px-6 sticky top-0 z-30">
      <h1 className="text-sm font-semibold text-slate-900 whitespace-nowrap">{PAGE_LABELS[activePage] || ''}</h1>

      <div className="flex-1" />

      {/* Search — shown on pages where it's useful */}
      {(activePage === 'societes' || activePage === 'declarations' || activePage === 'documents' || activePage === 'depenses') && (
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            className="flex h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* Notifications */}
      <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer">
        <Bell className="w-4 h-4" />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 border-2 border-white" />
      </button>

      <AvatarDropdown />
    </header>
  );
}
