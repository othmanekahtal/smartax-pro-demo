import { useState } from 'react';
import {
  Plus, Eye, Pencil, ChevronUp, ChevronDown, ChevronsUpDown,
  CircleDollarSign, X,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '../lib/utils';
import { getMockRevenueDetail } from '../lib/mock-revenue-api';
import {
  MOCK_REVENUES, REVENUE_SOURCES, REVENUE_STATUT_CFG, REVENUE_CUSTOMERS,
  PAYMENT_METHODS, PAYMENT_TERMS,
} from '../lib/data';
import {
  Button, Input, Textarea, Badge,
  Select, SelectValue, SelectTrigger, SelectContent, SelectItem,
  Sheet, SheetClose, SheetContent, SheetHeader,
  Field,
} from '../components/ui';
import {
  SheetFormHeader, SheetBody, SheetSection, SheetFooterBar, SheetDivider,
  SheetOptionCard, SheetCheckbox, TagInput, fmtSheetAmt, fmtSheetDate,
  SheetDetailBody, SheetDetailSection, SheetDetailGrid, SheetDetailField,
  SheetDetailTags, SheetCustomerNote, fmtSheetDateTime,
} from '../components/sheet-form';

// ── RevenueFormSheet ────────────────────────────────────────────────────────────
function RevenueFormSheet({ open, onOpenChange, onSave, initialData }) {
  const today = new Date().toISOString().slice(0, 10);
  const empty = {
    amount: '', date: today, customer: '', source: '', description: '',
    paymentMethod: '', status: '', referenceNumber: '',
    createInvoice: true, invoiceNumber: 'AUTO', dueDate: '', paymentTerms: 'Net 30',
    notesToCustomer: '', sendInvoiceImmediately: false, applyTax: false,
  };
  const [form, setForm] = useState(empty);
  const [tags, setTags] = useState([]);

  const [lastOpen, setLastOpen] = useState(false);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      if (initialData) {
        setForm({
          amount: initialData.amount ?? '',
          date: initialData.date || today,
          customer: initialData.customer || '',
          source: initialData.source || '',
          description: initialData.description || '',
          paymentMethod: initialData.paymentMethod || '',
          status: initialData.status || '',
          referenceNumber: initialData.referenceNumber || '',
          createInvoice: initialData.createInvoice ?? true,
          invoiceNumber: initialData.invoiceNumber || 'AUTO',
          dueDate: initialData.dueDate || '',
          paymentTerms: initialData.paymentTerms || 'Net 30',
          notesToCustomer: initialData.notesToCustomer || '',
          sendInvoiceImmediately: initialData.sendInvoiceImmediately ?? false,
          applyTax: initialData.applyTax ?? false,
        });
        setTags(initialData.tags || []);
      } else {
        setForm(empty);
        setTags([]);
      }
    }
  }

  const set    = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const setVal = (f) => (v) => setForm((p) => ({ ...p, [f]: v }));
  const setBool = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.checked }));
  const isEdit = !!initialData;

  const handleSave = () => {
    if (!form.amount || Number(form.amount) <= 0) { toast.error('Le montant doit être supérieur à 0.'); return; }
    if (!form.customer) { toast.error('Le client est requis.'); return; }
    if (!form.source) { toast.error('La source est requise.'); return; }
    if (!form.paymentMethod) { toast.error('Le moyen de paiement est requis.'); return; }
    if (!form.status) { toast.error('Le statut est requis.'); return; }
    onSave({ ...form, tags, id: initialData?.id });
    onOpenChange(false);
    toast.success(isEdit ? 'Revenu mis à jour avec succès.' : 'Revenu enregistré avec succès.');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={isEdit ? 'Modifier le revenu' : 'Nouveau revenu'} description="Formulaire revenu">
        <SheetHeader>
          <SheetFormHeader
            title={isEdit ? 'Modifier le revenu' : 'Nouveau revenu'}
            subtitle={isEdit ? 'Mettre à jour les informations du revenu' : 'Enregistrer un nouveau revenu'}
          />
        </SheetHeader>

        <SheetBody>
          <SheetSection title="Informations générales">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date du revenu" required>
                <Input type="date" value={form.date} onChange={set('date')} />
              </Field>
              <Field label="Montant (DH)" required>
                <Input type="number" min={0} step="0.01" value={form.amount} onChange={set('amount')} placeholder="0.00" />
              </Field>
            </div>
            <Field label="Client" required>
              <Select value={form.customer} onValueChange={setVal('customer')}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un client" /></SelectTrigger>
                <SelectContent>
                  {REVENUE_CUSTOMERS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Source" required>
              <Select value={form.source} onValueChange={setVal('source')}>
                <SelectTrigger><SelectValue placeholder="Sélectionner une source" /></SelectTrigger>
                <SelectContent>
                  {REVENUE_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Description">
              <Textarea value={form.description} onChange={set('description')}
                placeholder="Détails du revenu" className="min-h-[80px]" />
            </Field>
          </SheetSection>

          <SheetDivider />

          <SheetSection title="Paiement">
            <Field label="Moyen de paiement" required>
              <Select value={form.paymentMethod} onValueChange={setVal('paymentMethod')}>
                <SelectTrigger><SelectValue placeholder="Moyen de paiement" /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field
              label="Statut"
              required
              hint="« Reçu » = payé · « Attendu » = à venir · « Facturé » = facture émise"
            >
              <Select value={form.status} onValueChange={setVal('status')}>
                <SelectTrigger><SelectValue placeholder="Statut" /></SelectTrigger>
                <SelectContent>
                  {Object.keys(REVENUE_STATUT_CFG).map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Numéro de référence" hint="N° bon de commande, ID contrat…">
              <Input value={form.referenceNumber} onChange={set('referenceNumber')} placeholder="Référence" />
            </Field>
            <Field label="Tags">
              <TagInput tags={tags} onChange={setTags} placeholder="Créer ou ajouter des tags..." />
            </Field>
          </SheetSection>

          <SheetDivider />

          <SheetSection title="Facturation">
            <SheetOptionCard
              checked={form.createInvoice}
              onChange={setBool('createInvoice')}
              label="Créer une facture pour ce revenu"
              hint="Génère une facture liée à ce revenu."
            >
              <Field label="Numéro de facture" required hint="Attribué automatiquement à l'enregistrement.">
                <Input value={form.invoiceNumber} readOnly className="bg-slate-50 text-slate-500 font-mono text-xs" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date d'échéance">
                  <Input type="date" value={form.dueDate} onChange={set('dueDate')} />
                </Field>
                <Field label="Conditions de paiement">
                  <Select value={form.paymentTerms} onValueChange={setVal('paymentTerms')}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PAYMENT_TERMS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field label="Notes au client">
                <Textarea value={form.notesToCustomer} onChange={set('notesToCustomer')}
                  placeholder="Notes visibles sur la facture" rows={2} />
              </Field>
              <SheetCheckbox
                label="Envoyer la facture immédiatement"
                checked={form.sendInvoiceImmediately}
                onChange={setBool('sendInvoiceImmediately')}
              />
              <SheetCheckbox
                label="Appliquer la TVA"
                checked={form.applyTax}
                onChange={setBool('applyTax')}
              />
            </SheetOptionCard>
          </SheetSection>
        </SheetBody>

        <SheetFooterBar summary={{ label: 'Montant', value: fmtSheetAmt(form.amount || 0) }}>
          <SheetClose asChild><Button variant="outline">Annuler</Button></SheetClose>
          <Button onClick={handleSave}>
            {isEdit
              ? <><Pencil className="w-4 h-4" /> Enregistrer</>
              : <><Plus className="w-4 h-4" /> Enregistrer le revenu</>}
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── RevenueDetailSheet ──────────────────────────────────────────────────────────
function RevenueDetailSheet({ detail, open, onOpenChange, onEdit }) {
  if (!detail) return null;
  const taxLabel = detail.tax ? `${detail.tax.name} (${detail.tax.rate} %)` : '—';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={detail.customer} description="Détails revenu">
        <SheetHeader>
          <SheetFormHeader
            title={detail.customer}
            subtitle={`${detail.source} · ${detail.status} · ${fmtSheetAmt(detail.amount)}`}
          />
        </SheetHeader>

        <SheetDetailBody>
          <SheetDetailSection title="Résumé">
            <SheetDetailGrid>
              <SheetDetailField label="Montant" value={fmtSheetAmt(detail.amount)} />
              <SheetDetailField label="Date du revenu" value={fmtSheetDate(detail.revenue_date)} />
              <SheetDetailField label="Créé le" value={fmtSheetDateTime(detail.created_at)} wide />
            </SheetDetailGrid>
          </SheetDetailSection>

          <SheetDivider />

          <SheetDetailSection title="Informations générales">
            <SheetDetailGrid>
              <SheetDetailField label="Client" value={detail.customer} />
              <SheetDetailField label="Source" value={detail.source} />
              <SheetDetailField label="Description" value={detail.description} wide />
            </SheetDetailGrid>
          </SheetDetailSection>

          <SheetDivider />

          <SheetDetailSection title="Paiement">
            <SheetDetailGrid>
              <SheetDetailField label="Statut" value={detail.status} />
              <SheetDetailField label="Moyen de paiement" value={detail.payment_method} />
              <SheetDetailField
                label="Référence"
                value={detail.reference_number}
                wide
                mono={!!detail.reference_number}
              />
            </SheetDetailGrid>
          </SheetDetailSection>

          {detail.create_invoice && (
            <>
              <SheetDivider />
              <SheetDetailSection title="Facturation">
                <SheetDetailGrid>
                  <SheetDetailField label="N° facture" value={detail.invoice_number} mono />
                  <SheetDetailField label="Date d'échéance" value={fmtSheetDate(detail.due_date)} />
                  <SheetDetailField label="Conditions de paiement" value={detail.payment_term} />
                  <SheetDetailField label="Taxe" value={taxLabel} />
                </SheetDetailGrid>
                <SheetCustomerNote value={detail.customer_note} />
              </SheetDetailSection>
            </>
          )}

          {detail.tags?.length > 0 && (
            <>
              <SheetDivider />
              <SheetDetailSection title="Tags">
                <SheetDetailTags tags={detail.tags} />
              </SheetDetailSection>
            </>
          )}
        </SheetDetailBody>

        <SheetFooterBar summary={{ label: 'Montant', value: fmtSheetAmt(detail.amount) }}>
          <SheetClose asChild><Button variant="outline">Fermer</Button></SheetClose>
          <Button onClick={onEdit}>
            <Pencil className="w-4 h-4" />Modifier
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Revenus page ───────────────────────────────────────────────────────────
export default function Revenus({ search }) {
  const [revenues, setRevenues]           = useState(MOCK_REVENUES);
  const [filterSource, setFilterSource]   = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey]             = useState(null);
  const [sortDir, setSortDir]             = useState('asc');
  const [formOpen, setFormOpen]           = useState(false);
  const [detailRow, setDetailRow]         = useState(null);
  const [detailApi, setDetailApi]         = useState(null);
  const [editRevenue, setEditRevenue]     = useState(null);

  const openDetail = (row) => {
    setDetailRow(row);
    setDetailApi(getMockRevenueDetail(row));
  };

  const closeDetail = () => {
    setDetailRow(null);
    setDetailApi(null);
  };

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = revenues
    .filter((r) => {
      if (search && !`${r.customer} ${r.source} ${r.description} ${r.referenceNumber}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterSource !== 'all' && r.source !== filterSource) return false;
      if (filterStatus !== 'all' && r.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const va = a[sortKey] ?? '';
      const vb = b[sortKey] ?? '';
      if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

  const totalAmount = filtered.reduce((sum, r) => sum + Number(r.amount || 0), 0);

  const handleSave = (data) => {
    if (data.id) {
      setRevenues((prev) =>
        prev.map((r) =>
          r.id === data.id ? { ...r, ...data, amount: Number(data.amount) || r.amount } : r
        )
      );
    } else {
      setRevenues((prev) => [
        ...prev,
        {
          ...data,
          id: String(Date.now()),
          amount: Number(data.amount) || 0,
          invoiceNumber: data.createInvoice ? `FAC-2026-${String(prev.length + 1).padStart(4, '0')}` : '',
          addedThisMonth: true,
        },
      ]);
    }
  };

  const openEdit = (revenue) => {
    closeDetail();
    setEditRevenue(revenue);
    setFormOpen(true);
  };

  const hasFilters = filterSource !== 'all' || filterStatus !== 'all';

  const fmtAmt = (v) =>
    `${Number(v).toLocaleString('fr-MA', { minimumFractionDigits: 2 })} DH`;

  const fmtDate = (d) => {
    if (!d) return '—';
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
      const [y, m, day] = d.split('-');
      return `${day}/${m}/${y}`;
    }
    return d;
  };

  const Th = ({ col, children, className }) => (
    <th
      onClick={() => col && handleSort(col)}
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap',
        col && 'cursor-pointer select-none hover:text-slate-600',
        className
      )}
    >
      <span className="flex items-center gap-1">
        {children}
        {col && (
          sortKey === col
            ? (sortDir === 'asc'
              ? <ChevronUp className="w-3 h-3 text-blue-500" />
              : <ChevronDown className="w-3 h-3 text-blue-500" />)
            : <ChevronsUpDown className="w-3 h-3 opacity-30" />
        )}
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
            <Select value={filterSource} onValueChange={setFilterSource}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Source" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sources</SelectItem>
                {REVENUE_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.keys(REVENUE_STATUT_CFG).map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasFilters && (
              <button
                onClick={() => { setFilterSource('all'); setFilterStatus('all'); }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer px-2 h-9">
                <X className="w-3.5 h-3.5" /> Réinitialiser
              </button>
            )}
          </div>
          <Button onClick={() => { setEditRevenue(null); setFormOpen(true); }}>
            <Plus className="w-4 h-4" />Nouveau revenu
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200/60">
                <tr>
                  <Th col="customer">Client</Th>
                  <Th col="source">Source</Th>
                  <Th col="amount">Montant</Th>
                  <Th col="date">Date</Th>
                  <Th col="status">Statut</Th>
                  <Th col="paymentMethod">Paiement</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-slate-400 text-sm">
                      <CircleDollarSign className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      Aucun revenu trouvé
                    </td>
                  </tr>
                ) : filtered.map((r) => {
                  const st = REVENUE_STATUT_CFG[r.status] ?? REVENUE_STATUT_CFG['Attendu'];
                  return (
                    <tr key={r.id} onClick={() => openDetail(r)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shrink-0">
                            <CircleDollarSign className="w-3.5 h-3.5" />
                          </div>
                          <p className="font-semibold text-slate-900 leading-tight max-w-[180px] truncate">
                            {r.customer}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><Badge variant="secondary">{r.source}</Badge></td>
                      <td className="px-4 py-3.5 font-semibold text-emerald-700 whitespace-nowrap tabular-nums">
                        {fmtAmt(r.amount)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{fmtDate(r.date)}</td>
                      <td className="px-4 py-3.5">
                        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', st.cls)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', st.dot)} />{r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap text-xs">{r.paymentMethod}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); openDetail(r); }}
                            title="Voir">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); openEdit(r); }}
                            title="Modifier">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>
              {filtered.length} revenu{filtered.length !== 1 ? 's' : ''} sur {revenues.length}
            </span>
            <span className="font-semibold text-emerald-700">Total affiché : {fmtAmt(totalAmount)}</span>
          </div>
        </div>

      </div>

      <RevenueDetailSheet
        detail={detailApi}
        open={!!detailApi}
        onOpenChange={(o) => { if (!o) closeDetail(); }}
        onEdit={() => openEdit(detailRow)}
      />
      <RevenueFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        initialData={editRevenue}
      />
    </>
  );
}
