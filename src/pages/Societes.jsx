import { useState } from 'react';
import {
  Plus, Eye, Pencil, ChevronUp, ChevronDown, ChevronsUpDown,
  Building2, Wallet, MapPin, User, X, Trash2, FileText, Upload,
  LayoutList, LayoutGrid, Circle,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn, fmtCapital } from '../lib/utils';
import { MOCK_COMPANIES, FORMES_JURIDIQUES, STATUT_CFG, FORME_V, PERIODE_V } from '../lib/data';
import {
  Button, Input, Textarea, Label, Separator, Badge, ScrollArea,
  Select, SelectValue, SelectTrigger, SelectContent, SelectItem,
  Sheet, SheetClose, SheetContent, SheetHeader, SheetFooter,
  RadioGroup, RadioGroupItem, Field, SectionHeader,
} from '../components/ui';

// ── RepartitionRow ─────────────────────────────────────────────────────────────
function RepartitionRow({ row, index, isFirst, onChange, onRemove }) {
  return (
    <div className="flex gap-2 items-end">
      <Field label={isFirst ? 'Associé' : undefined} className="flex-1 min-w-0">
        <Input value={row.nom} onChange={(e) => onChange(index, 'nom', e.target.value)} placeholder="Nom complet" />
      </Field>
      <Field label={isFirst ? 'Part (%)' : undefined} className="w-24 shrink-0">
        <Input type="number" min={0} max={100} value={row.pourcentage}
          onChange={(e) => onChange(index, 'pourcentage', Number(e.target.value))} />
      </Field>
      <Field label={isFirst ? 'Montant (DH)' : undefined} className="w-32 shrink-0">
        <Input type="number" min={0} value={row.montant}
          onChange={(e) => onChange(index, 'montant', Number(e.target.value))} />
      </Field>
      <button type="button" onClick={() => onRemove(index)}
        className="h-9 w-9 shrink-0 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── CompanyFormSheet ───────────────────────────────────────────────────────────
function CompanyFormSheet({ open, onOpenChange, onSave, initialData }) {
  const empty = {
    name: '', gerant: '', adresse: '', dateCreation: '',
    formeJuridique: '', duree: '99 ans', typeAdresse: '',
    capital: '', activitePrincipale: '',
    ice: '', identifiantFiscal: '', cnss: '', patente: '', rc: '',
    periodesFiscale: 'Mensuelle',
  };
  const [form, setForm] = useState(empty);
  const [associes, setAssocies] = useState([{ nom: '', pourcentage: 0, montant: 0 }]);
  const [pdfName, setPdfName] = useState('');

  // Sync when sheet opens
  useState(() => {}); // placeholder — handled in useEffect below
  const [lastOpen, setLastOpen] = useState(false);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      if (initialData) {
        setForm({
          name: initialData.name || '', gerant: initialData.gerant || '',
          adresse: initialData.adresse || '', dateCreation: initialData.dateCreation || '',
          formeJuridique: initialData.formeJuridique || '', duree: initialData.duree || '99 ans',
          typeAdresse: initialData.typeAdresse || '', capital: initialData.capital || '',
          activitePrincipale: initialData.activitePrincipale || '',
          ice: initialData.ice || '', identifiantFiscal: initialData.identifiantFiscal || '',
          cnss: initialData.cnss || '', patente: initialData.patente || '', rc: initialData.rc || '',
          periodesFiscale: initialData.periodesFiscale || 'Mensuelle',
        });
        setAssocies(initialData.associes?.length ? initialData.associes : [{ nom: '', pourcentage: 0, montant: 0 }]);
        setPdfName('');
      } else {
        setForm(empty);
        setAssocies([{ nom: '', pourcentage: 0, montant: 0 }]);
        setPdfName('');
      }
    }
  }

  const set    = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const setVal = (f) => (v) => setForm((p) => ({ ...p, [f]: v }));
  const totalPct = associes.reduce((s, r) => s + (Number(r.pourcentage) || 0), 0);
  const chgA = (i, f, v) => setAssocies((p) => p.map((r, j) => (j === i ? { ...r, [f]: v } : r)));
  const isEdit = !!initialData;

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Le nom de la société est requis.'); return; }
    onSave({ ...form, associes, pdfName, id: initialData?.id });
    onOpenChange(false);
    toast.success(isEdit ? 'Société mise à jour avec succès.' : 'Société enregistrée avec succès.');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={isEdit ? 'Modifier la société' : 'Nouvelle société'} description="Formulaire société">
        <SheetHeader>
          <div className="flex items-center gap-3 pr-8">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{isEdit ? 'Modifier la société' : 'Nouvelle société'}</h2>
              <p className="text-xs text-slate-400 mt-0.5">Renseignez les informations de la société</p>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-8">

            <section className="space-y-4">
              <SectionHeader>Informations générales</SectionHeader>
              <Field label="Nom de la société" required>
                <Input value={form.name} onChange={set('name')} placeholder="Ex: Atlas Tech Solutions" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Gérant" required>
                  <Input value={form.gerant} onChange={set('gerant')} placeholder="Prénom Nom" />
                </Field>
                <Field label="Forme juridique">
                  <Select value={form.formeJuridique} onValueChange={setVal('formeJuridique')}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                    <SelectContent>
                      {FORMES_JURIDIQUES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Activité principale">
                <Input value={form.activitePrincipale} onChange={set('activitePrincipale')} placeholder="Objet social de la société" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date de création">
                  <Input type="date" value={form.dateCreation} onChange={set('dateCreation')} />
                </Field>
                <Field label="Durée">
                  <Input value={form.duree} onChange={set('duree')} placeholder="Ex: 99 ans" />
                </Field>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <SectionHeader>Adresse</SectionHeader>
              <Field label="Adresse complète">
                <Textarea value={form.adresse} onChange={set('adresse')} placeholder="N° rue, quartier, ville, code postal" />
              </Field>
              <Field label="Type d'adresse">
                <Select value={form.typeAdresse} onValueChange={setVal('typeAdresse')}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Domiciliation">Domiciliation</SelectItem>
                    <SelectItem value="CB">Contrat de bail (CB)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </section>

            <Separator />

            <section className="space-y-4">
              <SectionHeader>Capital & Répartition</SectionHeader>
              <Field label="Capital social (DH)" hint="Valeur en dirhams marocains (DH)">
                <Input type="number" min={0} value={form.capital} onChange={set('capital')} placeholder="Ex: 100000" />
              </Field>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Répartition du capital</Label>
                  <button type="button"
                    onClick={() => setAssocies((p) => [...p, { nom: '', pourcentage: 0, montant: 0 }])}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer">
                    <Plus className="w-3.5 h-3.5" /> Ajouter un associé
                  </button>
                </div>
                <div className="space-y-2">
                  {associes.map((row, i) => (
                    <RepartitionRow key={i} row={row} index={i} isFirst={i === 0}
                      onChange={chgA}
                      onRemove={(idx) => setAssocies((p) => p.filter((_, j) => j !== idx))} />
                  ))}
                </div>
                <div className={cn(
                  'mt-3 flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold ring-1',
                  totalPct === 100 ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-600 ring-rose-200'
                )}>
                  <span>Total répartition</span>
                  <span>{totalPct}% {totalPct !== 100 && '— doit être 100%'}</span>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <SectionHeader>Identifiants légaux</SectionHeader>
              <div className="grid grid-cols-2 gap-3">
                <Field label="ICE" hint="15 chiffres">
                  <Input value={form.ice} onChange={set('ice')} placeholder="000000000000000" maxLength={15} />
                </Field>
                <Field label="IF (Identifiant Fiscal)">
                  <Input value={form.identifiantFiscal} onChange={set('identifiantFiscal')} placeholder="N° IF" />
                </Field>
                <Field label="RC (Registre du Commerce)">
                  <Input value={form.rc} onChange={set('rc')} placeholder="Ex: CS-2022-1234" />
                </Field>
                <Field label="CNSS">
                  <Input value={form.cnss} onChange={set('cnss')} placeholder="N° affiliation" />
                </Field>
                <Field label="Patente / Taxe Professionnelle" className="col-span-2">
                  <Input value={form.patente} onChange={set('patente')} placeholder="N° patente" />
                </Field>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <SectionHeader>Période fiscale</SectionHeader>
              <RadioGroup value={form.periodesFiscale} onValueChange={setVal('periodesFiscale')} className="flex-col gap-3">
                {[
                  { val: 'Mensuelle',     desc: 'Déclarations fiscales chaque mois (TVA, IS, IR...)' },
                  { val: 'Trimestrielle', desc: 'Déclarations regroupées par trimestre' },
                ].map(({ val, desc }) => (
                  <label key={val}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3.5 cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-colors has-[[data-state=checked]]:border-blue-500 has-[[data-state=checked]]:bg-blue-50/60">
                    <RadioGroupItem value={val} className="mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{val}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </section>

            <Separator />

            <section className="space-y-4 pb-2">
              <SectionHeader>Documents</SectionHeader>
              <Field label="Statuts (PDF)">
                <label htmlFor="pdf-upload"
                  className="flex flex-col items-center justify-center gap-2 h-24 w-full rounded-xl border-2 border-dashed border-slate-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-colors">
                  {pdfName ? (
                    <span className="flex items-center gap-2 text-sm font-medium text-blue-600">
                      <FileText className="w-4 h-4" />{pdfName}
                    </span>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-slate-300" />
                      <span className="text-sm text-slate-400">Cliquer pour charger les statuts</span>
                      <span className="text-xs text-slate-300">PDF uniquement</span>
                    </>
                  )}
                  <input id="pdf-upload" type="file" accept=".pdf" className="hidden"
                    onChange={(e) => setPdfName(e.target.files?.[0]?.name || '')} />
                </label>
              </Field>
            </section>

          </div>
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Annuler</Button></SheetClose>
          <Button onClick={handleSave}>
            {isEdit ? <><Pencil className="w-4 h-4" /> Enregistrer</> : <><Plus className="w-4 h-4" /> Enregistrer la société</>}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ── CompanyDetailSheet ─────────────────────────────────────────────────────────
function CompanyDetailSheet({ company, open, onOpenChange, onEdit }) {
  if (!company) return null;
  const s = STATUT_CFG[company.statut] ?? STATUT_CFG['En cours'];
  const DR = ({ label, value }) => (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-slate-400">{label}</span>
      <span className="text-sm text-slate-900 font-medium">{value || '—'}</span>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={company.name} description="Détails société">
        <SheetHeader>
          <div className="flex items-start gap-3 pr-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
              {company.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-slate-900">{company.name}</h2>
                <Badge variant={FORME_V[company.formeJuridique] ?? 'default'}>{company.formeJuridique}</Badge>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{company.activitePrincipale}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', s.cls)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />{company.statut}
                </span>
                <Badge variant={PERIODE_V[company.periodesFiscale] ?? 'secondary'}>{company.periodesFiscale}</Badge>
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-6">
            <div>
              <SectionHeader>Informations générales</SectionHeader>
              <div className="grid grid-cols-2 gap-4">
                <DR label="Gérant" value={company.gerant} />
                <DR label="Forme juridique" value={company.formeJuridique} />
                <DR label="Date de création" value={company.dateCreation} />
                <DR label="Durée" value={company.duree} />
              </div>
            </div>
            <Separator />
            <div>
              <SectionHeader>Adresse</SectionHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><DR label="Adresse" value={company.adresse} /></div>
                <DR label="Type d'adresse" value={company.typeAdresse} />
              </div>
            </div>
            <Separator />
            <div>
              <SectionHeader>Capital & Répartition</SectionHeader>
              <div className="mb-4"><DR label="Capital social" value={fmtCapital(company.capital)} /></div>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>{['Associé', '%', 'Montant'].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-xs font-semibold text-slate-500">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(company.associes || []).map((a, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2.5 font-medium text-slate-800">{a.nom}</td>
                        <td className="px-3 py-2.5 text-slate-600">{a.pourcentage}%</td>
                        <td className="px-3 py-2.5 text-slate-600">{fmtCapital(a.montant)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Separator />
            <div>
              <SectionHeader>Identifiants légaux</SectionHeader>
              <div className="grid grid-cols-2 gap-4">
                <DR label="ICE (15 chiffres)" value={company.ice} />
                <DR label="Identifiant Fiscal (IF)" value={company.identifiantFiscal} />
                <DR label="RC" value={company.rc} />
                <DR label="CNSS" value={company.cnss} />
                <DR label="Patente" value={company.patente} />
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild><Button variant="outline">Fermer</Button></SheetClose>
          <Button onClick={() => { onOpenChange(false); onEdit(company); }}>
            <Pencil className="w-4 h-4" />Modifier
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Societes page ─────────────────────────────────────────────────────────
export default function Societes({ search }) {
  const [companies, setCompanies]         = useState(MOCK_COMPANIES);
  const [filterForme, setFilterForme]     = useState('all');
  const [filterPeriode, setFilterPeriode] = useState('all');
  const [filterStatut, setFilterStatut]   = useState('all');
  const [sortKey, setSortKey]             = useState(null);
  const [sortDir, setSortDir]             = useState('asc');
  const [view, setView]                   = useState('table');
  const [formOpen, setFormOpen]           = useState(false);
  const [detailCompany, setDetailCompany] = useState(null);
  const [editCompany, setEditCompany]     = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = companies
    .filter((c) => {
      if (search && !`${c.name} ${c.gerant} ${c.activitePrincipale}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterForme   !== 'all' && c.formeJuridique !== filterForme)   return false;
      if (filterPeriode !== 'all' && c.periodesFiscale !== filterPeriode) return false;
      if (filterStatut  !== 'all' && c.statut          !== filterStatut)  return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const va = sortKey === 'capital' ? a.capital : (a[sortKey] ?? '');
      const vb = sortKey === 'capital' ? b.capital : (b[sortKey] ?? '');
      if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });

  const handleSave = (data) => {
    if (data.id) {
      setCompanies((prev) => prev.map((c) => c.id === data.id ? { ...c, ...data, capital: Number(data.capital) || c.capital } : c));
    } else {
      setCompanies((prev) => [...prev, { ...data, id: String(Date.now()), capital: Number(data.capital) || 0, statut: 'En cours', addedThisMonth: true }]);
    }
  };

  const openEdit = (company) => { setDetailCompany(null); setEditCompany(company); setFormOpen(true); };
  const hasFilters = filterForme !== 'all' || filterPeriode !== 'all' || filterStatut !== 'all';

  const Th = ({ col, children, className }) => (
    <th onClick={() => col && handleSort(col)}
      className={cn('px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap', col && 'cursor-pointer select-none hover:text-slate-600', className)}>
      <span className="flex items-center gap-1">
        {children}
        {col && (sortKey === col
          ? (sortDir === 'asc' ? <ChevronUp className="w-3 h-3 text-blue-500" /> : <ChevronDown className="w-3 h-3 text-blue-500" />)
          : <ChevronsUpDown className="w-3 h-3 opacity-30" />)}
      </span>
    </th>
  );

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="space-y-5">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={filterForme} onValueChange={setFilterForme}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Forme juridique" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les formes</SelectItem>
                {FORMES_JURIDIQUES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterPeriode} onValueChange={setFilterPeriode}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Période fiscale" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les périodes</SelectItem>
                <SelectItem value="Mensuelle">Mensuelle</SelectItem>
                <SelectItem value="Trimestrielle">Trimestrielle</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatut} onValueChange={setFilterStatut}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
            {hasFilters && (
              <button onClick={() => { setFilterForme('all'); setFilterPeriode('all'); setFilterStatut('all'); }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer px-2 h-9">
                <X className="w-3.5 h-3.5" /> Réinitialiser
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center rounded-lg bg-slate-100 p-1 gap-0.5">
              {[
                { val: 'table', Icon: LayoutList, label: 'Tableau' },
                { val: 'grid',  Icon: LayoutGrid, label: 'Cartes'  },
              ].map(({ val, Icon, label }) => (
                <button key={val} onClick={() => setView(val)} title={label}
                  className={cn('w-8 h-7 flex items-center justify-center rounded-md transition-all cursor-pointer text-slate-500', view === val && 'bg-white text-slate-900 shadow-sm')}>
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <Button onClick={() => { setEditCompany(null); setFormOpen(true); }}>
              <Plus className="w-4 h-4" />Nouvelle société
            </Button>
          </div>
        </div>

        {/* Grid view */}
        {view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-20 text-slate-400">
                <Building2 className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">Aucune société trouvée</p>
              </div>
            )}
            {filtered.map((c) => {
              const s = STATUT_CFG[c.statut] ?? STATUT_CFG['En cours'];
              return (
                <div key={c.id} onClick={() => setDetailCompany(c)}
                  className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shrink-0">{c.name.charAt(0)}</div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <Badge variant={FORME_V[c.formeJuridique] ?? 'default'}>{c.formeJuridique}</Badge>
                      <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', s.cls)}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', s.dot)} />{c.statut}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1 line-clamp-1">{c.name}</h3>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-1">{c.activitePrincipale}</p>
                  <div className="space-y-1.5 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-slate-300 shrink-0" />{c.gerant}</div>
                    <div className="flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-slate-300 shrink-0" />{fmtCapital(c.capital)}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" /><span className="line-clamp-1">{c.adresse.split(',').slice(-1)[0].trim()}</span></div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Badge variant={PERIODE_V[c.periodesFiscale] ?? 'secondary'}>{c.periodesFiscale}</Badge>
                    <button type="button" onClick={(e) => { e.stopPropagation(); openEdit(c); }}
                      className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer">
                      <Pencil className="w-3 h-3" /> Modifier
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Table view
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50/80 border-b border-slate-200/60">
                  <tr>
                    <Th col="name">Société</Th>
                    <Th col="gerant">Gérant</Th>
                    <Th col="formeJuridique">Forme</Th>
                    <Th col="periodesFiscale">Période</Th>
                    <Th col="capital">Capital</Th>
                    <Th>Activité</Th>
                    <Th>ICE</Th>
                    <Th className="text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-16 text-center text-slate-400 text-sm">
                      <Building2 className="w-8 h-8 mx-auto mb-2 opacity-30" />Aucune société trouvée
                    </td></tr>
                  ) : filtered.map((c) => {
                    const s = STATUT_CFG[c.statut] ?? STATUT_CFG['En cours'];
                    return (
                      <tr key={c.id} onClick={() => setDetailCompany(c)}
                        className="hover:bg-slate-50/70 cursor-pointer transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">{c.name.charAt(0)}</div>
                            <div>
                              <p className="font-semibold text-slate-900 leading-tight">{c.name}</p>
                              <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium mt-0.5', s.cls)}>
                                <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', s.dot)} />{c.statut}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{c.gerant}</td>
                        <td className="px-4 py-3.5"><Badge variant={FORME_V[c.formeJuridique] ?? 'default'}>{c.formeJuridique}</Badge></td>
                        <td className="px-4 py-3.5"><Badge variant={PERIODE_V[c.periodesFiscale] ?? 'secondary'}>{c.periodesFiscale}</Badge></td>
                        <td className="px-4 py-3.5 font-semibold text-slate-700 whitespace-nowrap tabular-nums">{fmtCapital(c.capital)}</td>
                        <td className="px-4 py-3.5 text-slate-500 max-w-[200px]"><span className="line-clamp-1">{c.activitePrincipale}</span></td>
                        <td className="px-4 py-3.5 font-mono text-xs text-slate-400">{c.ice}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setDetailCompany(c); }} title="Voir"><Eye className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openEdit(c); }} title="Modifier"><Pencil className="w-4 h-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''} sur {companies.length} société{companies.length !== 1 ? 's' : ''}
            </div>
          </div>
        )}

      </div>

      <CompanyDetailSheet company={detailCompany} open={!!detailCompany}
        onOpenChange={(o) => { if (!o) setDetailCompany(null); }} onEdit={openEdit} />
      <CompanyFormSheet open={formOpen} onOpenChange={setFormOpen} onSave={handleSave} initialData={editCompany} />
    </>
  );
}
