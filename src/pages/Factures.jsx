import { useState } from 'react';
import {
  Plus, Eye, Pencil, ChevronUp, ChevronDown, ChevronsUpDown,
  FileText, X,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '../lib/utils';
import {
  MOCK_INVOICES, INVOICE_STATUT_CFG, REVENUE_CUSTOMERS, PAYMENT_TERMS,
} from '../lib/data';
import {
  Button, Input, Textarea, Badge, ScrollArea,
  Select, SelectValue, SelectTrigger, SelectContent, SelectItem,
  Sheet, SheetClose, SheetContent, SheetHeader, Separator, Field,
} from '../components/ui';
import {
  SheetFormHeader, SheetBody, SheetSection, SheetFooterBar, SheetDivider,
  SheetSwitch, SheetCheckbox, LineItemsEditor, calcLineItemsTotal,
  fmtSheetAmt,
} from '../components/sheet-form';

const emptyLine = () => ({ id: String(Date.now() + Math.random()), description: '', quantity: 1, unitPrice: '' });

function invoiceTotal(inv) {
  return calcLineItemsTotal(inv.lineItems || [], inv.applyTax);
}

// ── InvoiceFormSheet ────────────────────────────────────────────────────────────
function InvoiceFormSheet({ open, onOpenChange, onSave, initialData }) {
  const today = new Date().toISOString().slice(0, 10);
  const empty = {
    invoiceNumber: 'AUTO', invoiceDate: today, dueDate: '', paymentTerms: 'Net 30',
    customer: '', referenceNumber: '',
    notesToCustomer: '', internalNotes: '',
    applyTax: false, sendInvoiceImmediately: false,
  };
  const [form, setForm] = useState(empty);
  const [lineItems, setLineItems] = useState([emptyLine()]);

  const [lastOpen, setLastOpen] = useState(false);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      if (initialData) {
        setForm({
          invoiceNumber: initialData.invoiceNumber || 'AUTO',
          invoiceDate: initialData.invoiceDate || today,
          dueDate: initialData.dueDate || '',
          paymentTerms: initialData.paymentTerms || 'Net 30',
          customer: initialData.customer || '',
          referenceNumber: initialData.referenceNumber || '',
          notesToCustomer: initialData.notesToCustomer || '',
          internalNotes: initialData.internalNotes || '',
          applyTax: initialData.applyTax ?? false,
          sendInvoiceImmediately: initialData.sendInvoiceImmediately ?? false,
        });
        setLineItems(initialData.lineItems?.length ? initialData.lineItems : [emptyLine()]);
      } else {
        setForm(empty);
        setLineItems([emptyLine()]);
      }
    }
  }

  const set    = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const setVal = (f) => (v) => setForm((p) => ({ ...p, [f]: v }));
  const isEdit = !!initialData;
  const total  = calcLineItemsTotal(lineItems, form.applyTax);

  const handleSave = () => {
    if (!form.invoiceDate) { toast.error('La date de facture est requise.'); return; }
    if (!form.customer) { toast.error('Le client est requis.'); return; }
    const validLines = lineItems.filter((l) => l.description.trim());
    if (validLines.length === 0) { toast.error('Ajoutez au moins une ligne de facturation.'); return; }
    onSave({
      ...form,
      lineItems: validLines,
      amount: total,
      id: initialData?.id,
      status: initialData?.status || (form.sendInvoiceImmediately ? 'Envoyée' : 'Brouillon'),
    });
    onOpenChange(false);
    toast.success(isEdit ? 'Facture mise à jour.' : 'Facture enregistrée.');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent wide title={isEdit ? 'Modifier la facture' : 'Nouvelle facture'} description="Formulaire facture">
        <SheetHeader>
          <SheetFormHeader
            title={isEdit ? 'Modifier la facture' : 'Nouvelle facture'}
            subtitle={isEdit ? 'Mettre à jour la facture' : 'Créer une nouvelle facture client'}
          />
        </SheetHeader>

        <SheetBody>
          <SheetSection title="Informations générales">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Prochaine facture" hint="Attribué par le système à l'enregistrement.">
                <Input value={form.invoiceNumber} readOnly className="bg-slate-50 text-slate-500 font-mono text-xs" />
              </Field>
              <Field label="Date de facture" required>
                <Input type="date" value={form.invoiceDate} onChange={set('invoiceDate')} />
              </Field>
            </div>
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
            <Field label="Client" required>
              <Select value={form.customer} onValueChange={setVal('customer')}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un client" /></SelectTrigger>
                <SelectContent>
                  {REVENUE_CUSTOMERS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Numéro de référence" hint="N° bon de commande, ID contrat, etc.">
              <Input value={form.referenceNumber} onChange={set('referenceNumber')} placeholder="PO-2026-001" />
            </Field>
          </SheetSection>

          <SheetDivider />

          <SheetSection title="Lignes de facturation">
            <LineItemsEditor items={lineItems} onChange={setLineItems} />
            <div className="flex flex-col items-end gap-1 pt-3 mt-1 border-t border-slate-100">
              {form.applyTax && (
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <span>TVA (20 %)</span>
                  <span className="tabular-nums w-28 text-right">
                    {fmtSheetAmt(calcLineItemsTotal(lineItems, false) * 0.2)}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-900">
                <span>Total</span>
                <span className="tabular-nums w-28 text-right">{fmtSheetAmt(total)}</span>
              </div>
            </div>
          </SheetSection>

          <SheetDivider />

          <SheetSection title="Paramètres">
            <Field label="Notes au client">
              <Textarea value={form.notesToCustomer} onChange={set('notesToCustomer')}
                placeholder="Notes visibles par le client sur la facture" />
            </Field>
            <Field label="Notes internes">
              <Textarea value={form.internalNotes} onChange={set('internalNotes')}
                placeholder="Notes visibles uniquement par vous" />
            </Field>
            <Separator />
            <SheetSwitch
              label="Appliquer la TVA"
              description="Ajoute 20 % de TVA au sous-total"
              checked={form.applyTax}
              onChange={(v) => setForm((p) => ({ ...p, applyTax: v }))}
            />
            <SheetCheckbox
              label="Envoyer la facture immédiatement"
              checked={form.sendInvoiceImmediately}
              onChange={(e) => setForm((p) => ({ ...p, sendInvoiceImmediately: e.target.checked }))}
            />
          </SheetSection>
        </SheetBody>

        <SheetFooterBar summary={{ label: 'Total facture', value: fmtSheetAmt(total) }}>
          <SheetClose asChild><Button variant="outline">Annuler</Button></SheetClose>
          <Button onClick={handleSave}>
            {isEdit
              ? <><Pencil className="w-4 h-4" /> Enregistrer</>
              : <><Plus className="w-4 h-4" /> Enregistrer la facture</>}
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── InvoiceDetailSheet ──────────────────────────────────────────────────────────
function InvoiceDetailSheet({ invoice, open, onOpenChange, onEdit }) {
  if (!invoice) return null;
  const total = invoiceTotal(invoice);

  const fmtDate = (d) => {
    if (!d) return '—';
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
      const [y, m, day] = d.split('-');
      return `${day}/${m}/${y}`;
    }
    return d;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={invoice.invoiceNumber} description="Détails facture">
        <SheetHeader>
          <SheetFormHeader
            title={invoice.invoiceNumber}
            subtitle={`${invoice.customer} · ${invoice.status}`}
          />
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm border-b border-slate-200 pb-6">
              <div><p className="text-xs text-slate-500">Date</p><p className="mt-0.5">{fmtDate(invoice.invoiceDate)}</p></div>
              <div><p className="text-xs text-slate-500">Échéance</p><p className="mt-0.5">{fmtDate(invoice.dueDate)}</p></div>
              <div><p className="text-xs text-slate-500">Conditions</p><p className="mt-0.5">{invoice.paymentTerms}</p></div>
              <div><p className="text-xs text-slate-500">Référence</p><p className="mt-0.5">{invoice.referenceNumber || '—'}</p></div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-3">Lignes</p>
              <div className="border border-slate-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-400 uppercase">
                    <tr>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-right">Qté</th>
                      <th className="px-4 py-2 text-right">P.U.</th>
                      <th className="px-4 py-2 text-right">Montant</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(invoice.lineItems || []).map((l) => (
                      <tr key={l.id}>
                        <td className="px-4 py-2.5">{l.description}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{l.quantity}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtSheetAmt(l.unitPrice)}</td>
                        <td className="px-4 py-2.5 text-right font-medium tabular-nums">
                          {fmtSheetAmt((Number(l.quantity) || 0) * (Number(l.unitPrice) || 0))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-3 border-t border-slate-200 flex justify-end">
                  <span className="text-sm font-semibold tabular-nums">Total : {fmtSheetAmt(total)}</span>
                </div>
              </div>
            </div>

            {(invoice.notesToCustomer || invoice.internalNotes) && (
              <div className="space-y-3 text-sm">
                {invoice.notesToCustomer && (
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-400 mb-1">Notes client</p>
                    <p className="text-slate-700">{invoice.notesToCustomer}</p>
                  </div>
                )}
                {invoice.internalNotes && (
                  <div className="border-l-2 border-slate-300 pl-3">
                    <p className="text-xs text-slate-500 mb-1">Notes internes</p>
                    <p className="text-slate-700">{invoice.internalNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </ScrollArea>

        <SheetFooterBar summary={{ label: 'Total', value: fmtSheetAmt(total) }}>
          <SheetClose asChild><Button variant="outline">Fermer</Button></SheetClose>
          <Button onClick={() => { onOpenChange(false); onEdit(invoice); }}>
            <Pencil className="w-4 h-4" />Modifier
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Factures page ──────────────────────────────────────────────────────────
export default function Factures({ search }) {
  const [invoices, setInvoices]       = useState(MOCK_INVOICES);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey]         = useState(null);
  const [sortDir, setSortDir]         = useState('asc');
  const [formOpen, setFormOpen]       = useState(false);
  const [detailInvoice, setDetailInvoice] = useState(null);
  const [editInvoice, setEditInvoice] = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = invoices
    .filter((inv) => {
      if (search && !`${inv.invoiceNumber} ${inv.customer} ${inv.referenceNumber}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterStatus !== 'all' && inv.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const va = sortKey === 'amount' ? invoiceTotal(a) : (a[sortKey] ?? '');
      const vb = sortKey === 'amount' ? invoiceTotal(b) : (b[sortKey] ?? '');
      if (typeof va === 'number') return sortDir === 'asc' ? va - vb : vb - va;
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

  const totalAmount = filtered.reduce((sum, inv) => sum + invoiceTotal(inv), 0);

  const handleSave = (data) => {
    if (data.id) {
      setInvoices((prev) => prev.map((inv) => (inv.id === data.id ? { ...inv, ...data } : inv)));
    } else {
      setInvoices((prev) => [
        ...prev,
        {
          ...data,
          id: String(Date.now()),
          invoiceNumber: `FAC-2026-${String(prev.length + 1).padStart(4, '0')}`,
          addedThisMonth: true,
        },
      ]);
    }
  };

  const openEdit = (invoice) => {
    setDetailInvoice(null);
    setEditInvoice(invoice);
    setFormOpen(true);
  };

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Statut" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              {Object.keys(INVOICE_STATUT_CFG).map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => { setEditInvoice(null); setFormOpen(true); }}>
            <Plus className="w-4 h-4" />Nouvelle facture
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200/60">
                <tr>
                  <Th col="invoiceNumber">N° Facture</Th>
                  <Th col="customer">Client</Th>
                  <Th col="amount">Montant</Th>
                  <Th col="invoiceDate">Date</Th>
                  <Th col="dueDate">Échéance</Th>
                  <Th col="status">Statut</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-slate-400 text-sm">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      Aucune facture trouvée
                    </td>
                  </tr>
                ) : filtered.map((inv) => {
                  const st = INVOICE_STATUT_CFG[inv.status] ?? INVOICE_STATUT_CFG['Brouillon'];
                  return (
                    <tr key={inv.id} onClick={() => setDetailInvoice(inv)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white shrink-0">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <p className="font-semibold text-slate-900 font-mono text-xs">{inv.invoiceNumber}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 max-w-[160px] truncate">{inv.customer}</td>
                      <td className="px-4 py-3.5 font-semibold text-violet-700 whitespace-nowrap tabular-nums">
                        {fmtSheetAmt(invoiceTotal(inv))}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{fmtDate(inv.invoiceDate)}</td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{fmtDate(inv.dueDate)}</td>
                      <td className="px-4 py-3.5">
                        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', st.cls)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', st.dot)} />{inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); setDetailInvoice(inv); }} title="Voir">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); openEdit(inv); }} title="Modifier">
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
            <span>{filtered.length} facture{filtered.length !== 1 ? 's' : ''} sur {invoices.length}</span>
            <span className="font-semibold text-violet-700">Total affiché : {fmtSheetAmt(totalAmount)}</span>
          </div>
        </div>
      </div>

      <InvoiceDetailSheet
        invoice={detailInvoice}
        open={!!detailInvoice}
        onOpenChange={(o) => { if (!o) setDetailInvoice(null); }}
        onEdit={openEdit}
      />
      <InvoiceFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        initialData={editInvoice}
      />
    </>
  );
}
