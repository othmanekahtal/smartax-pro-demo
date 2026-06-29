import { useState } from 'react';
import {
  Plus, Eye, Pencil, ChevronUp, ChevronDown, ChevronsUpDown,
  Users, X, Globe, Mail, Phone,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '../lib/utils';
import {
  MOCK_CUSTOMERS, CUSTOMER_TYPES, CUSTOMER_STATUS_CFG, PAYMENT_METHODS, COUNTRIES,
} from '../lib/data';
import {
  Button, Input, Textarea, Badge,
  Select, SelectValue, SelectTrigger, SelectContent, SelectItem,
  Sheet, SheetClose, SheetContent, SheetHeader, Field,
} from '../components/ui';
import {
  SheetFormHeader, SheetBody, SheetSection, SheetFooterBar, SheetDivider,
  TagInput,
  SheetDetailBody, SheetDetailSection, SheetDetailGrid, SheetDetailField,
  SheetDetailTags, SheetDetailNote,
} from '../components/sheet-form';

// ── CustomerFormSheet ───────────────────────────────────────────────────────────
function CustomerFormSheet({ open, onOpenChange, onSave, initialData }) {
  const empty = {
    name: '', type: '', status: 'Actif',
    firstName: '', lastName: '', email: '', website: '', phone: '', notes: '',
    billingAddress: '', country: '', taxId: '', paymentMethod: '',
  };
  const [form, setForm] = useState(empty);
  const [tags, setTags] = useState([]);

  const [lastOpen, setLastOpen] = useState(false);
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      if (initialData) {
        setForm({
          name: initialData.name || '',
          type: initialData.type || '',
          status: initialData.status || 'Actif',
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          website: initialData.website || '',
          phone: initialData.phone || '',
          notes: initialData.notes || '',
          billingAddress: initialData.billingAddress || '',
          country: initialData.country || '',
          taxId: initialData.taxId || '',
          paymentMethod: initialData.paymentMethod || '',
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
  const isEdit = !!initialData;

  const handleSave = () => {
    if (!form.name.trim()) { toast.error('Le nom est requis.'); return; }
    if (!form.type) { toast.error('Le type de client est requis.'); return; }
    if (!form.status) { toast.error('Le statut est requis.'); return; }
    onSave({ ...form, tags, id: initialData?.id });
    onOpenChange(false);
    toast.success(isEdit ? 'Client mis à jour avec succès.' : 'Client enregistré avec succès.');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={isEdit ? 'Modifier le client' : 'Nouveau client'} description="Formulaire client">
        <SheetHeader>
          <SheetFormHeader
            title={isEdit ? 'Modifier le client' : 'Nouveau client'}
            subtitle={isEdit ? 'Mettre à jour les informations du client' : 'Enregistrer un nouveau client'}
          />
        </SheetHeader>

        <SheetBody>
          <SheetSection title="Informations générales">
            <Field label="Nom (entreprise ou individu)" required>
              <Input value={form.name} onChange={set('name')} placeholder="Ex: Atlas Tech Solutions" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Type de client" required>
                <Select value={form.type} onValueChange={setVal('type')}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner le type" /></SelectTrigger>
                  <SelectContent>
                    {CUSTOMER_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Statut" required>
                <Select value={form.status} onValueChange={setVal('status')}>
                  <SelectTrigger><SelectValue placeholder="Statut" /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(CUSTOMER_STATUS_CFG).map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Tags">
              <TagInput tags={tags} onChange={setTags} />
            </Field>
          </SheetSection>

          <SheetDivider />

          <SheetSection title="Contact">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Prénom">
                <Input value={form.firstName} onChange={set('firstName')} placeholder="Prénom" />
              </Field>
              <Field label="Nom de famille">
                <Input value={form.lastName} onChange={set('lastName')} placeholder="Nom" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email">
                <Input type="email" value={form.email} onChange={set('email')} placeholder="email@exemple.com" />
              </Field>
              <Field label="Site web">
                <Input value={form.website} onChange={set('website')} placeholder="https://exemple.com" />
              </Field>
            </div>
            <Field label="Téléphone">
              <Input value={form.phone} onChange={set('phone')} placeholder="+212 6 00 00 00 00" />
            </Field>
            <Field label="Notes">
              <Textarea value={form.notes} onChange={set('notes')}
                placeholder="Informations supplémentaires sur ce client..." rows={3} />
            </Field>
          </SheetSection>

          <SheetDivider />

          <SheetSection title="Facturation">
            <Field label="Adresse de facturation">
              <Textarea value={form.billingAddress} onChange={set('billingAddress')}
                placeholder="123 Rue Principale, Ville, Pays" rows={3} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Pays" required>
                <Select value={form.country} onValueChange={setVal('country')}>
                  <SelectTrigger><SelectValue placeholder="Sélectionner un pays..." /></SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Identifiant fiscal">
                <Input value={form.taxId} onChange={set('taxId')} placeholder="Ex: IF-12345678" />
              </Field>
            </div>
            <Field label="Mode de paiement préféré">
              <Select value={form.paymentMethod} onValueChange={setVal('paymentMethod')}>
                <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                <SelectContent>
                  {PAYMENT_METHODS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </SheetSection>
        </SheetBody>

        <SheetFooterBar>
          <SheetClose asChild><Button variant="outline">Annuler</Button></SheetClose>
          <Button onClick={handleSave}>
            {isEdit
              ? <><Pencil className="w-4 h-4" /> Enregistrer</>
              : <><Plus className="w-4 h-4" /> Enregistrer le client</>}
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── CustomerDetailSheet ─────────────────────────────────────────────────────────
function CustomerDetailSheet({ customer, open, onOpenChange, onEdit }) {
  if (!customer) return null;
  const st = CUSTOMER_STATUS_CFG[customer.status] ?? CUSTOMER_STATUS_CFG['Actif'];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent title={customer.name} description="Détails client">
        <SheetHeader>
          <SheetFormHeader
            title={customer.name}
            subtitle={`${customer.type} · ${customer.status}`}
          />
        </SheetHeader>

        <SheetDetailBody>
          <SheetDetailSection title="Résumé">
            <SheetDetailGrid>
              <SheetDetailField label="Type" value={customer.type} />
              <SheetDetailField label="Statut" value={(
                <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', st.cls)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', st.dot)} />{customer.status}
                </span>
              )} />
            </SheetDetailGrid>
            {customer.tags?.length > 0 && <SheetDetailTags tags={customer.tags} />}
          </SheetDetailSection>

          <SheetDivider />

          <SheetDetailSection title="Contact">
            <SheetDetailGrid>
              {(customer.firstName || customer.lastName) && (
                <SheetDetailField
                  label="Nom complet"
                  value={`${customer.firstName} ${customer.lastName}`.trim()}
                  wide
                />
              )}
              {customer.email && <SheetDetailField label="Email" value={customer.email} />}
              {customer.phone && <SheetDetailField label="Téléphone" value={customer.phone} />}
              {customer.website && <SheetDetailField label="Site web" value={customer.website} mono />}
            </SheetDetailGrid>
            <SheetDetailNote label="Notes" value={customer.notes} />
          </SheetDetailSection>

          {(customer.billingAddress || customer.country || customer.taxId || customer.paymentMethod) && (
            <>
              <SheetDivider />
              <SheetDetailSection title="Facturation">
                <SheetDetailGrid>
                  {customer.billingAddress && (
                    <SheetDetailField label="Adresse de facturation" value={customer.billingAddress} wide />
                  )}
                  {customer.country && <SheetDetailField label="Pays" value={customer.country} />}
                  {customer.taxId && <SheetDetailField label="Identifiant fiscal" value={customer.taxId} mono />}
                  {customer.paymentMethod && (
                    <SheetDetailField label="Mode de paiement préféré" value={customer.paymentMethod} />
                  )}
                </SheetDetailGrid>
              </SheetDetailSection>
            </>
          )}
        </SheetDetailBody>

        <SheetFooterBar>
          <SheetClose asChild><Button variant="outline">Fermer</Button></SheetClose>
          <Button onClick={() => { onOpenChange(false); onEdit(customer); }}>
            <Pencil className="w-4 h-4" />Modifier
          </Button>
        </SheetFooterBar>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Clients page ───────────────────────────────────────────────────────────
export default function Clients({ search }) {
  const [customers, setCustomers]       = useState(MOCK_CUSTOMERS);
  const [filterType, setFilterType]     = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortKey, setSortKey]           = useState(null);
  const [sortDir, setSortDir]           = useState('asc');
  const [formOpen, setFormOpen]         = useState(false);
  const [detailCustomer, setDetailCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = customers
    .filter((c) => {
      if (search && !`${c.name} ${c.email} ${c.phone} ${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterType   !== 'all' && c.type   !== filterType)   return false;
      if (filterStatus !== 'all' && c.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const va = a[sortKey] ?? '';
      const vb = b[sortKey] ?? '';
      return sortDir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });

  const handleSave = (data) => {
    if (data.id) {
      setCustomers((prev) => prev.map((c) => c.id === data.id ? { ...c, ...data } : c));
    } else {
      setCustomers((prev) => [
        ...prev,
        { ...data, id: String(Date.now()), addedThisMonth: true },
      ]);
    }
  };

  const openEdit = (customer) => {
    setDetailCustomer(null);
    setEditCustomer(customer);
    setFormOpen(true);
  };

  const hasFilters = filterType !== 'all' || filterStatus !== 'all';

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
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {CUSTOMER_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                {Object.keys(CUSTOMER_STATUS_CFG).map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {hasFilters && (
              <button
                onClick={() => { setFilterType('all'); setFilterStatus('all'); }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer px-2 h-9">
                <X className="w-3.5 h-3.5" /> Réinitialiser
              </button>
            )}
          </div>
          <Button onClick={() => { setEditCustomer(null); setFormOpen(true); }}>
            <Plus className="w-4 h-4" />Nouveau client
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 border-b border-slate-200/60">
                <tr>
                  <Th col="name">Client</Th>
                  <Th col="type">Type</Th>
                  <Th col="status">Statut</Th>
                  <Th col="email">Email</Th>
                  <Th col="phone">Téléphone</Th>
                  <Th col="country">Pays</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-slate-400 text-sm">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      Aucun client trouvé
                    </td>
                  </tr>
                ) : filtered.map((c) => {
                  const st = CUSTOMER_STATUS_CFG[c.status] ?? CUSTOMER_STATUS_CFG['Actif'];
                  const initials = c.name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
                  return (
                    <tr key={c.id} onClick={() => setDetailCustomer(c)}
                      className="hover:bg-slate-50/70 cursor-pointer transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                            {initials || <Users className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 leading-tight max-w-[200px] truncate">
                              {c.name}
                            </p>
                            {(c.firstName || c.lastName) && (
                              <p className="text-xs text-slate-400 leading-tight">
                                {`${c.firstName} ${c.lastName}`.trim()}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="secondary">{c.type}</Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium', st.cls)}>
                          <span className={cn('w-1.5 h-1.5 rounded-full', st.dot)} />{c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {c.email ? (
                          <span className="flex items-center gap-1.5 text-slate-600 text-xs">
                            <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                            {c.email}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-4 py-3.5">
                        {c.phone ? (
                          <span className="flex items-center gap-1.5 text-slate-600 text-xs whitespace-nowrap">
                            <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                            {c.phone}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-4 py-3.5">
                        {c.country ? (
                          <span className="flex items-center gap-1.5 text-slate-600 text-xs whitespace-nowrap">
                            <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                            {c.country}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); setDetailCustomer(c); }}
                            title="Voir">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon"
                            onClick={(ev) => { ev.stopPropagation(); openEdit(c); }}
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
              {filtered.length} client{filtered.length !== 1 ? 's' : ''} sur {customers.length}
            </span>
            <span>
              {customers.filter((c) => c.status === 'Actif').length} actif{customers.filter((c) => c.status === 'Actif').length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

      </div>

      <CustomerDetailSheet
        customer={detailCustomer}
        open={!!detailCustomer}
        onOpenChange={(o) => { if (!o) setDetailCustomer(null); }}
        onEdit={openEdit}
      />
      <CustomerFormSheet
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={handleSave}
        initialData={editCustomer}
      />
    </>
  );
}
