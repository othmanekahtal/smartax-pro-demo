import { useState } from 'react';
import { CheckCircle2, Clock, AlertCircle, ChevronDown, X, FileCheck } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_DECLARATIONS, DECL_STATUT_CFG } from '../lib/data';
import { Badge, Button, Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '../components/ui';

const TYPE_COLORS = {
  'TVA':         'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60',
  'Acompte IS':  'bg-violet-50 text-violet-700 ring-1 ring-violet-200/60',
  'IS Annuel':   'bg-purple-50 text-purple-700 ring-1 ring-purple-200/60',
  'CNSS':        'bg-teal-50 text-teal-700 ring-1 ring-teal-200/60',
  'Taxe Prof.':  'bg-orange-50 text-orange-700 ring-1 ring-orange-200/60',
  'IR Salaires': 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60',
};

const STATUS_ICON = {
  'À faire':   { Icon: Clock,        iconCls: 'text-slate-400' },
  'En cours':  { Icon: Clock,        iconCls: 'text-blue-500' },
  'Soumis':    { Icon: CheckCircle2, iconCls: 'text-emerald-500' },
  'En retard': { Icon: AlertCircle,  iconCls: 'text-rose-500' },
};

const TYPES   = ['TVA', 'Acompte IS', 'IS Annuel', 'CNSS', 'Taxe Prof.', 'IR Salaires'];
const STATUTS = ['À faire', 'En cours', 'Soumis', 'En retard'];

export default function Declarations({ search }) {
  const [filterType,    setFilterType]    = useState('all');
  const [filterStatut,  setFilterStatut]  = useState('all');
  const [filterPeriode, setFilterPeriode] = useState('all');
  const [declarations, setDeclarations]   = useState(MOCK_DECLARATIONS);

  const filtered = declarations.filter((d) => {
    if (search && !`${d.societe} ${d.type} ${d.periode}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterType    !== 'all' && d.type        !== filterType)    return false;
    if (filterStatut  !== 'all' && d.statut      !== filterStatut)  return false;
    if (filterPeriode !== 'all' && d.periodeType !== filterPeriode) return false;
    return true;
  });

  const toggleStatut = (id, nextStatut) => {
    setDeclarations((prev) => prev.map((d) => d.id === id ? { ...d, statut: nextStatut } : d));
  };

  const counts = {
    aFaire:   declarations.filter(d => d.statut === 'À faire').length,
    enCours:  declarations.filter(d => d.statut === 'En cours').length,
    soumis:   declarations.filter(d => d.statut === 'Soumis').length,
    enRetard: declarations.filter(d => d.statut === 'En retard').length,
  };

  const hasFilters = filterType !== 'all' || filterStatut !== 'all' || filterPeriode !== 'all';

  return (
    <div className="space-y-5">

      {/* Summary chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'À faire',   count: counts.aFaire,   color: 'bg-slate-50 border-slate-200 text-slate-700',     dot: 'bg-slate-400' },
          { label: 'En cours',  count: counts.enCours,  color: 'bg-blue-50 border-blue-200 text-blue-700',         dot: 'bg-blue-500' },
          { label: 'Soumis',    count: counts.soumis,   color: 'bg-emerald-50 border-emerald-200 text-emerald-700', dot: 'bg-emerald-500' },
          { label: 'En retard', count: counts.enRetard, color: 'bg-rose-50 border-rose-200 text-rose-700',         dot: 'bg-rose-500' },
        ].map(({ label, count, color, dot }) => (
          <div key={label} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3.5', color)}>
            <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', dot)} />
            <div>
              <p className="text-2xl font-bold leading-none">{count}</p>
              <p className="text-xs mt-0.5 opacity-70">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatut} onValueChange={setFilterStatut}>
          <SelectTrigger className="w-36"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            {STATUTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterPeriode} onValueChange={setFilterPeriode}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Période" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les périodes</SelectItem>
            <SelectItem value="Mensuelle">Mensuelle</SelectItem>
            <SelectItem value="Trimestrielle">Trimestrielle</SelectItem>
          </SelectContent>
        </Select>
        {hasFilters && (
          <button onClick={() => { setFilterType('all'); setFilterStatut('all'); setFilterPeriode('all'); }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer px-2 h-9">
            <X className="w-3.5 h-3.5" /> Réinitialiser
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200/60">
              <tr>
                {['Société', 'Type', 'Période', 'Date limite', 'Statut', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-16 text-center text-slate-400 text-sm">
                  <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-30" />Aucune déclaration trouvée
                </td></tr>
              ) : filtered.map((d) => {
                const sc = DECL_STATUT_CFG[d.statut] ?? DECL_STATUT_CFG['À faire'];
                const { Icon, iconCls } = STATUS_ICON[d.statut] ?? STATUS_ICON['À faire'];
                return (
                  <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {d.societe.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-800 truncate max-w-[160px]">{d.societe}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap', TYPE_COLORS[d.type] ?? 'bg-slate-100 text-slate-600')}>
                        {d.type}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{d.periode}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn('font-medium text-sm whitespace-nowrap', d.statut === 'En retard' ? 'text-rose-600' : 'text-slate-700')}>
                        {d.dateLimite}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium', sc.cls)}>
                        <Icon className={cn('w-3 h-3', iconCls)} />{d.statut}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <Select value={d.statut} onValueChange={(v) => toggleStatut(d.id, v)}>
                        <SelectTrigger className="h-8 w-36 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          {filtered.length} déclaration{filtered.length !== 1 ? 's' : ''} sur {declarations.length}
        </div>
      </div>
    </div>
  );
}
