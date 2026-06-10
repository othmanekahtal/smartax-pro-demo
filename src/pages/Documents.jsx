import { useState } from 'react';
import { FileText, Download, Upload, X, FolderOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_DOCUMENTS, MOCK_COMPANIES } from '../lib/data';
import { Button, Badge, Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '../components/ui';

const TYPE_COLORS = {
  'Statuts':          'default',
  'RC':               'indigo',
  'PV d\'AG':         'purple',
  'Contrat de bail':  'warning',
  'Autorisation':     'success',
  'Licence export':   'success',
};

const STATUT_COLORS = {
  'Validé':      'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60',
  'En attente':  'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60',
};

const TYPES = ['Statuts', 'RC', 'PV d\'AG', 'Contrat de bail', 'Autorisation', 'Licence export'];

export default function Documents({ search }) {
  const [filterSociete, setFilterSociete] = useState('all');
  const [filterType,    setFilterType]    = useState('all');

  const filtered = MOCK_DOCUMENTS.filter((d) => {
    if (search && !`${d.societe} ${d.nom} ${d.type}`.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterSociete !== 'all' && d.societe !== filterSociete) return false;
    if (filterType    !== 'all' && d.type    !== filterType)    return false;
    return true;
  });

  const societeNames = [...new Set(MOCK_DOCUMENTS.map((d) => d.societe))].sort();
  const hasFilters = filterSociete !== 'all' || filterType !== 'all';

  return (
    <div className="space-y-5">

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total documents',   value: MOCK_DOCUMENTS.length,                                 color: 'text-slate-700' },
          { label: 'Validés',           value: MOCK_DOCUMENTS.filter(d => d.statut === 'Validé').length, color: 'text-emerald-700' },
          { label: 'En attente',        value: MOCK_DOCUMENTS.filter(d => d.statut === 'En attente').length, color: 'text-amber-700' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm text-center">
            <p className={cn('text-2xl font-bold', color)}>{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters + upload */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={filterSociete} onValueChange={setFilterSociete}>
            <SelectTrigger className="w-52"><SelectValue placeholder="Toutes les sociétés" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les sociétés</SelectItem>
              {societeNames.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-44"><SelectValue placeholder="Type de document" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
          {hasFilters && (
            <button onClick={() => { setFilterSociete('all'); setFilterType('all'); }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer px-2 h-9">
              <X className="w-3.5 h-3.5" /> Réinitialiser
            </button>
          )}
        </div>
        <Button>
          <Upload className="w-4 h-4" />Uploader un document
        </Button>
      </div>

      {/* Documents list */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <FolderOpen className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">Aucun document trouvé</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200/60">
              <tr>
                {['Document', 'Société', 'Type', 'Taille', 'Date', 'Statut', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200/60 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-red-500" />
                      </div>
                      <span className="font-medium text-slate-800 truncate max-w-[180px]">{doc.nom}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{doc.societe}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={TYPE_COLORS[doc.type] ?? 'secondary'}>{doc.type}</Badge>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap tabular-nums">{doc.taille}</td>
                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{doc.date}</td>
                  <td className="px-4 py-3.5">
                    <span className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', STATUT_COLORS[doc.statut] ?? STATUT_COLORS['En attente'])}>
                      {doc.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          {filtered.length} document{filtered.length !== 1 ? 's' : ''} sur {MOCK_DOCUMENTS.length}
        </div>
      </div>
    </div>
  );
}
