import { useState } from 'react';
import {
  Plus, Eye, Pencil, ChevronUp, ChevronDown, ChevronsUpDown,
  Receipt, X, Upload, FileText,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '../lib/utils';
import {
  MOCK_EXPENSES, EXPENSE_CATEGORIES, EXPENSE_STATUT_CFG, PAYMENT_METHODS,
} from '../lib/data';
import {
  Button, Input, Textarea, Badge,
  Select, SelectValue, SelectTrigger, SelectContent, SelectItem,
  Sheet, SheetClose, SheetContent, SheetHeader, Field,
} from '../components/ui';
import {
  SheetFormHeader, SheetBody, SheetSection, SheetFooterBar, SheetDivider,
  TagInput, fmtSheetAmt, fmtSheetDate,
  SheetDetailBody, SheetDetailSection, SheetDetailGrid, SheetDetailField,
  SheetDetailTags, SheetDetailNote,
} from '../components/sheet-form';

// ── ExpenseFormSheet ────────────────────────────────────────────────────────────
function ExpenseFormSheet({ open, onOpenChange, onSave, initialData }) {
  const today = new Date().toISOString().slice(0, 10);
  const empty = {
    title: '', amount: '', date: today,
    vendor: '', category: '', description: '',
    status: '', paymentMethod: '', notes: '',
  };
  const [form, setForm] = useState(empty);
  const [tags, setTags] = useState([]);
  const [receiptName, setReceiptName] = useState('');

  const [lastOpen, setLastOpen] = useState(false);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      if (initialData) {
        setForm({
          title: initialData.title || '',
          amount: initialData.amount ?? '',
          date: initialData.date || today,
          vendor: initialData.vendor || '',
          category: initialData.category || '',
          description: initialData.description || '',
          status: initialData.status || '',
          paymentMethod: initialData.paymentMethod || '',
          notes: initialData.notes || '',
        });
        setTags(initialData.tags || []);
        setReceiptName(initialData.receiptName || '');
      } else {
        setForm(empty);
        setTags([]);
        setReceiptName('');
      }
    }
  }

  const set    = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));
  const setVal = (f) => (v) => setForm((p) => ({ ...p, [f]: v }));
  const isEdit = !!initialData;

  const handleSave = () => {
    if (!form.title.trim()) { toast.error('Le titre est requis.'); return; }
    if (!form.amount || Number(form.amount) <= 0) { toast.error('Le montant doit être supérieur à 0.'); return; }
    if (!form.vendor.trim()) { toast.error('Le fournisseur est requis.'); return; }
    if (!form.status) { toast.error('Le statut est requis.'); return; }
    onSave({ ...form, tags, receiptName: receiptName || initialData?.receiptName || '', id: initialData?.id });
    onOpenChange(false);
    toast.success(isEdit ? 'Dépense mise à jour avec succès.' : 'Dépense enregistrée avec succès.');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={isEdit ? 'Modifier la dépense' : 'Nouvelle dépense'} description="Formulaire dépense">
        <SheetHeader>
          <SheetFormHeader
            title={isEdit ? 'Modifier la dépense' : 'Nouvelle dépense'}
            subtitle={isEdit ? 'Mettre à jour les informations de la dépense' : 'Enregistrer une nouvelle dépense'}
          />
        </SheetHeader>

        <SheetBody>
          <SheetSection title="Informations générales">
            <Field label="Titre" required>
              <Input value={form.title} onChange={set('title')} placeholder="Ex: Achat de matières premières" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Montant (DH)" required>
                <Input type="number" min={0} step="0.01" value={form.amount} onChange={set('amount')} placeholder="0.00" />
              </Field>
              <Field label="Date" required>
                <Input type="date" value={form.date} onChange={set('date')} />
              </Field>
            </div>
            <Field label="Fournisseur" required>
              <Input value={form.vendor} onChange={set('vendor')} placeholder="Ex: Fournisseur SARL" />
            </Field>
            <Field label="Catégorie" required>
              <Select value={form.category} onValueChange={setVal('category')}>
                <SelectTrigger><SelectValue placeholder="Sélectionner une catégorie" /></SelectTrigger>
                <SelectContent>
                  {EXPENSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Description">
              <Textarea value={form.description} onChange={set('description')}
                placeholder="Détails complémentaires sur la dépense" className="min-h-[80px]" />
            </Field>
          </SheetSection>

          <SheetDivider />

          <SheetSection title="Paiement et suivi">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Statut" required>
                <Select value={form.status} onValueChange={setVal('status')}>
                  <SelectTrigger><SelectValue placeholder="Statut" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(EXPENSE_STATUT_CFG).map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Moyen de paiement" required>
                <Select value={form.paymentMethod} onValueChange={setVal('paymentMethod')}>
                  <SelectTrigger><SelectValue placeholder="Paiement" /></SelectTrigger>
                  <SelectContent>
                    {PAYMENT_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Reçu">
              <label htmlFor="receipt-upload"
                className="flex flex-col items-center justify-center gap-2 h-24 w-full rounded-lg border border-dashed border-slate-300 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors">
                {receiptName ? (
                  <span className="flex items-center gap-2 text-sm text-slate-700">
                    <FileText className="w-4 h-4" />{receiptName}
                  </span>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-sm text-slate-600">Déposer ou parcourir</span>
                    <span className="text-xs text-slate-400">JPG, PNG ou PDF · Max 5 Mo</span>
                  </>
                )}
                <input id="receipt-upload" type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden"
                  onChange={(e) => setReceiptName(e.target.files?.[0]?.name || '')} />
              </label>
            </Field>
            <Field label="Notes">
              <Textarea value={form.notes} onChange={set('notes')} placeholder="Notes internes..." rows={2} />
            </Field>
            <Field label="Tags">
              <TagInput tags={tags} onChange={setTags} />
            </Field>
          </SheetSection>
        </SheetBody>

        <SheetFooterBar summary={{ label: 'Montant', value: fmtSheetAmt(form.amount || 0) }}>
          <SheetClose asChild><Button variant="outline">Annuler</Button></SheetClose>
          <Button onClick={handleSave}>
            {isEdit
              ? <><Pencil className="w-4 h-4" /> Enregistrer</>
              : <><Plus className="w-4 h-4" /> Enregistrer la dépense</>}
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── ExpenseDetailSheet ──────────────────────────────────────────────────────────
function ExpenseDetailSheet({ expense, open, onOpenChange, onEdit }) {
  if (!expense) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={expense.title} description="Détails dépense">
        <SheetHeader>
          <SheetFormHeader
            title={expense.title}
            subtitle={`${expense.vendor} · ${expense.status} · ${expense.category}`}
          />
        </SheetHeader>

        <SheetDetailBody>
          <SheetDetailSection title="Résumé">
            <SheetDetailGrid>
              <SheetDetailField label="Montant" value={fmtSheetAmt(expense.amount)} />
              <SheetDetailField label="Date" value={fmtSheetDate(expense.date)} />
            </SheetDetailGrid>
          </SheetDetailSection>

          <SheetDivider />

          <SheetDetailSection title="Informations générales">
            <SheetDetailGrid>
              <SheetDetailField label="Fournisseur" value={expense.vendor} />
              <SheetDetailField label="Catégorie" value={expense.category} />
              <SheetDetailField label="Description" value={expense.description} wide />
            </SheetDetailGrid>
          </SheetDetailSection>

          <SheetDivider />

          <SheetDetailSection title="Paiement">
            <SheetDetailGrid>
              <SheetDetailField label="Statut" value={expense.status} />
              <SheetDetailField label="Moyen de paiement" value={expense.paymentMethod} />
              <SheetDetailField
                label="Reçu"
                value={expense.receiptName || 'Aucun reçu joint'}
                wide
                mono={!!expense.receiptName}
              />
            </SheetDetailGrid>
          </SheetDetailSection>

          {(expense.notes || expense.tags?.length > 0) && (
            <>
              <SheetDivider />
              <SheetDetailSection title="Suivi">
                {expense.tags?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">Tags</p>
                    <SheetDetailTags tags={expense.tags} />
                  </div>
                )}
                <SheetDetailNote label="Notes" value={expense.notes} />
              </SheetDetailSection>
            </>
          )}
        </SheetDetailBody>

        <SheetFooterBar summary={{ label: 'Montant', value: fmtSheetAmt(expense.amount) }}>
          <SheetClose asChild><Button variant="outline">Fermer</Button></SheetClose>
          <Button onClick={() => { onOpenChange(false); onEdit(expense); }}>
            <Pencil className="w-4 h-4" />Modifier
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Depenses page ──────────────────────────────────────────────────────────
export default function Depenses({ search }) {
  const [expenses, setExpenses]         = useState(MOCK_EXPENSES);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment]   = useState('all');
  const [sortKey, setSortKey]           = useState(null);
  const [sortDir, setSortDir]           = useState('asc');
  const [formOpen, setFormOpen]         = useState(false);
  const [detailExpense, setDetailExpense] = useState(null);
  const [editExpense, setEditExpense]   = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = expenses
    .filter((e) => {
      if (search && !`${e.title} ${e.vendor} ${e.description}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterCategory !== 'all' && e.category !== filterCategory) return false;
      if (filterStatus   !== 'all' && e.status   !== filterStatus)   return false;
      if (filterPayment  !== 'all' && e.paymentMethod !== filterPayment) return false;
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

  const totalAmount = filtered.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const handleSave = (data) => {
    if (data.id) {
      setExpenses((prev) =>
        prev.map((e) =>
          e.id === data.id ? { ...e, ...data, amount: Number(data.amount) || e.amount } : e
        )
      );
    } else {
      setExpenses((prev) => [
        ...prev,
        { ...data, id: String(Date.now()), amount: Number(data.amount) || 0, addedThisMonth: true },
      ]);
    }
  };

  const openEdit = (expense) => {
    setDetailExpense(null);
    setEditExpense(expense);
    setFormOpen(true);
  };

  const hasFilters = filterCategory !== 'all' || filterStatus !== 'all' || filterPayment !== 'all';

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
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Catégorie" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {EXPENSE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.keys(EXPENSE_STATUT_CFG).map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPayment} onValueChange={setFilterPayment}>
              <SelectTrigger className="w-44"><SelectValue placeholder="Moyen de paiement" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les moyens</SelectItem>
                {PAYMENT_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
            {hasFilters && (
              <button
                onClick={() => { setFilterCategory('all'); setFilterStatus('all'); setFilterPayment('all'); }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer px-2 h-9">
                <X className="w-3.5 h-3.5" /> Réinitialiser
              </button>
            )}
          </div>
          <Button onClick={() => { setEditExpense(null); setFormOpen(true); }}>
            <Plus className="w-4 h-4" />Nouvelle dépense
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200/60">
                <tr>
                  <Th col="title">Titre</Th>
                  <Th col="vendor">Fournisseur</Th>
                  <Th col="category">Catégorie</Th>
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
                    <td colSpan={8} className="px-4 py-16 text-center text-slate-400 text-sm">
                      <Receipt className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      Aucune dépense trouvée
                    </td>
                  </tr>
                ) : filtered.map((e) => {
                  const st = EXPENSE_STATUT_CFG[e.status] ?? EXPENSE_STATUT_CFG['En attente'];
                  return (
                    <tr key={e.id} onClick={() => setDetailExpense(e)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0">
                            <Receipt className="w-3.5 h-3.5" />
                          </div>
                          <p className="font-semibold text-slate-900 leading-tight max-w-[180px] truncate">
                            {e.title}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">{e.vendor}</td>
                      <td className="px-4 py-3.5"><Badge variant="secondary">{e.category}</Badge></td>
                      <td className="px-4 py-3.5 font-semibold text-slate-700 whitespace-nowrap tabular-nums">
                        {fmtAmt(e.amount)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{fmtDate(e.date)}</td>
                      <td className="px-4 py-3.5">
                        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', st.cls)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', st.dot)} />{e.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap text-xs">{e.paymentMethod}</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); setDetailExpense(e); }}
                            title="Voir">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); openEdit(e); }}
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
              {filtered.length} dépense{filtered.length !== 1 ? 's' : ''} sur {expenses.length}
            </span>
            <span className="font-semibold text-slate-600">Total affiché : {fmtAmt(totalAmount)}</span>
          </div>
        </div>

      </div>

      <ExpenseDetailSheet
        expense={detailExpense}
        open={!!detailExpense}
        onOpenChange={(o) => { if (!o) setDetailExpense(null); }}
        onEdit={openEdit}
      />
      <ExpenseFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        initialData={editExpense}
      />
    </>
  );
}
