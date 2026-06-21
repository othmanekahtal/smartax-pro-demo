import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button, Input, Separator } from './ui';

export const fmtSheetAmt = (v) =>
  `${Number(v || 0).toLocaleString('fr-MA', { minimumFractionDigits: 2 })} DH`;

export const fmtSheetDate = (d) => {
  if (!d) return '—';
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  }
  return d;
};

export const fmtSheetBool = (v) => (v ? 'Oui' : 'Non');

// ── SheetFormHeader ─────────────────────────────────────────────────────────────
export function SheetFormHeader({ title, subtitle }) {
  return (
    <div className="pr-8">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
}

// ── SheetSection ────────────────────────────────────────────────────────────────
export function SheetSection({ title, children, className }) {
  return (
    <section className={cn('space-y-4', className)}>
      {title && (
        <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</h3>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

// ── SheetBody ───────────────────────────────────────────────────────────────────
export function SheetBody({ children }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6 space-y-8">{children}</div>
    </div>
  );
}

// ── SheetFooterBar ──────────────────────────────────────────────────────────────
export function SheetFooterBar({ summary, children }) {
  return (
    <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-4 shrink-0 bg-white">
      {summary ? (
        <div className="min-w-0">
          <p className="text-xs text-slate-500">{summary.label}</p>
          <p className="text-base font-semibold text-slate-900 tabular-nums">{summary.value}</p>
        </div>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-2 shrink-0">{children}</div>
    </div>
  );
}

// ── SheetOptionCard ─────────────────────────────────────────────────────────────
export function SheetOptionCard({ checked, onChange, label, hint, children }) {
  return (
    <div className="space-y-4">
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange}
          className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-400" />
        <span>
          <span className="text-sm text-slate-900">{label}</span>
          {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
        </span>
      </label>
      {checked && children && (
        <div className="pl-7 space-y-4 border-l border-slate-200 ml-1.5">{children}</div>
      )}
    </div>
  );
}

// ── SheetCheckbox ───────────────────────────────────────────────────────────────
export function SheetCheckbox({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange}
        className="rounded border-slate-300 text-slate-900 focus:ring-slate-400" />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

// ── SheetSwitch ─────────────────────────────────────────────────────────────────
export function SheetSwitch({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-900">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors',
          checked ? 'bg-slate-900' : 'bg-slate-200'
        )}
      >
        <span className={cn(
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        )} />
      </button>
    </div>
  );
}

// ── TagInput ────────────────────────────────────────────────────────────────────
export function TagInput({ tags, onChange, placeholder = 'Taper et appuyer sur Entrée...' }) {
  const [input, setInput] = useState('');
  const add = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) onChange([...tags, val]);
    setInput('');
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder}
        />
        <Button variant="outline" size="sm" type="button" onClick={add}>Ajouter</Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
              {tag}
              <button type="button" onClick={() => onChange(tags.filter((t) => t !== tag))}
                className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── LineItemsEditor ─────────────────────────────────────────────────────────────
const emptyLine = () => ({ id: String(Date.now() + Math.random()), description: '', quantity: 1, unitPrice: '' });

export function LineItemsEditor({ items, onChange }) {
  const update = (id, field, value) =>
    onChange(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  const lineAmount = (item) =>
    (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);

  const subtotal = items.reduce((s, item) => s + lineAmount(item), 0);

  return (
    <div className="space-y-3">
      <div className="hidden sm:grid grid-cols-[1fr_72px_96px_96px_36px] gap-2">
        {['Description', 'Qté', 'Prix unit.', 'Montant', ''].map((h) => (
          <span key={h || 'action'} className="text-xs text-slate-500">{h}</span>
        ))}
      </div>

      {items.map((item) => (
        <div key={item.id}
          className="grid grid-cols-1 sm:grid-cols-[1fr_72px_96px_96px_36px] gap-2 items-start border-b border-slate-100 pb-3">
          <Input
            value={item.description}
            onChange={(e) => update(item.id, 'description', e.target.value)}
            placeholder="Description"
          />
          <Input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => update(item.id, 'quantity', e.target.value)}
            className="tabular-nums"
          />
          <Input
            type="number"
            min={0}
            step="0.01"
            value={item.unitPrice}
            onChange={(e) => update(item.id, 'unitPrice', e.target.value)}
            placeholder="0.00"
            className="tabular-nums"
          />
          <div className="h-9 flex items-center text-sm text-slate-700 tabular-nums">
            {fmtSheetAmt(lineAmount(item))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="text-slate-400 hover:text-slate-700"
            disabled={items.length <= 1}
            onClick={() => onChange(items.filter((i) => i.id !== item.id))}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}

      <Button variant="outline" size="sm" type="button" onClick={() => onChange([...items, emptyLine()])}>
        <Plus className="w-4 h-4" /> Ajouter une ligne
      </Button>

      <div className="flex justify-end pt-2">
        <div className="flex items-center gap-8 text-sm text-slate-600">
          <span>Sous-total</span>
          <span className="font-medium tabular-nums w-28 text-right">{fmtSheetAmt(subtotal)}</span>
        </div>
      </div>
    </div>
  );
}

export function calcLineItemsTotal(items, applyTax = false) {
  const subtotal = items.reduce(
    (s, item) => s + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0
  );
  return applyTax ? subtotal * 1.2 : subtotal;
}

export { Separator as SheetDivider };

// ── Detail view ─────────────────────────────────────────────────────────────────
export function SheetDetailBody({ children }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6 space-y-8">{children}</div>
    </div>
  );
}

export function SheetDetailSection({ title, children }) {
  return (
    <section className="space-y-4">
      {title && (
        <h3 className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</h3>
      )}
      {children}
    </section>
  );
}

export function SheetDetailGrid({ children, className }) {
  return (
    <dl className={cn('grid grid-cols-2 gap-x-6 gap-y-4', className)}>
      {children}
    </dl>
  );
}

export function SheetDetailField({ label, value, wide, mono }) {
  return (
    <div className={cn(wide && 'col-span-2')}>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className={cn('text-sm text-slate-900 mt-0.5', mono && 'font-mono text-xs')}>
        {value ?? '—'}
      </dd>
    </div>
  );
}

export function SheetDetailTags({ tags }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
          {tag}
        </span>
      ))}
    </div>
  );
}

export function SheetDetailNote({ label, value }) {
  if (!value) return null;
  return (
    <div className="border-l-2 border-slate-200 pl-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="text-sm text-slate-900 mt-1 whitespace-pre-wrap">{value}</p>
    </div>
  );
}
