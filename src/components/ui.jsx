import { forwardRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Slot } from '@radix-ui/react-slot';
import { ChevronDown, Check, X, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

// ── Button ─────────────────────────────────────────────────────────────────────
export const Button = forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
        variant === 'default'  && 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm px-4 h-9',
        variant === 'outline'  && 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 h-9',
        variant === 'ghost'    && 'hover:bg-slate-100 text-slate-600 px-3 h-9',
        variant === 'danger'   && 'bg-red-600 text-white hover:bg-red-700 px-4 h-9',
        size === 'sm'          && '!h-8 !px-3 text-xs',
        size === 'icon'        && '!h-9 !w-9 !px-0',
        className
      )}
      {...props}
    />
  );
});
Button.displayName = 'Button';

// ── Input / Textarea ───────────────────────────────────────────────────────────
export const Input = forwardRef(({ className, ...props }, ref) => (
  <input ref={ref}
    className={cn('flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50', className)}
    {...props}
  />
));
Input.displayName = 'Input';

export const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea ref={ref}
    className={cn('flex min-h-[72px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none', className)}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

// ── Label ──────────────────────────────────────────────────────────────────────
export const Label = forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn('text-sm font-medium text-slate-700 leading-none', className)} {...props} />
));
Label.displayName = 'Label';

// ── Separator ──────────────────────────────────────────────────────────────────
export const Separator = ({ className, orientation = 'horizontal', ...props }) => (
  <SeparatorPrimitive.Root orientation={orientation}
    className={cn('shrink-0 bg-slate-100', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
    {...props}
  />
);

// ── Badge ──────────────────────────────────────────────────────────────────────
export const Badge = ({ className, variant = 'default', children }) => (
  <span className={cn(
    'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap',
    variant === 'default'   && 'bg-blue-50 text-blue-700 ring-1 ring-blue-200/60',
    variant === 'success'   && 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60',
    variant === 'warning'   && 'bg-amber-50 text-amber-700 ring-1 ring-amber-200/60',
    variant === 'secondary' && 'bg-slate-100 text-slate-600 ring-1 ring-slate-200/60',
    variant === 'purple'    && 'bg-violet-50 text-violet-700 ring-1 ring-violet-200/60',
    variant === 'indigo'    && 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/60',
    variant === 'rose'      && 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60',
    className
  )}>{children}</span>
);

// ── Select ─────────────────────────────────────────────────────────────────────
export const Select      = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger ref={ref}
    className={cn('flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 data-[placeholder]:text-slate-400', className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild><ChevronDown className="h-4 w-4 opacity-40 shrink-0" /></SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref}
      className={cn('relative z-50 min-w-[8rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl animate-fade-up', className)}
      position="popper" sideOffset={4} {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = 'SelectContent';

export const SelectItem = forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref}
    className={cn('relative flex w-full cursor-default select-none items-center rounded-md py-1.5 pl-8 pr-2 text-sm text-slate-700 outline-none focus:bg-slate-100 data-[disabled]:opacity-50', className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator><Check className="h-3.5 w-3.5 text-blue-600" /></SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = 'SelectItem';

// ── Sheet (right slide-over) ───────────────────────────────────────────────────
export const Sheet        = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose   = DialogPrimitive.Close;

const SheetOverlay = forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] animate-overlay-in', className)}
    {...props}
  />
));
SheetOverlay.displayName = 'SheetOverlay';

export const SheetContent = forwardRef(({ className, children, title, description, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content ref={ref}
      className={cn('fixed right-0 top-0 z-50 h-full w-[640px] max-w-[96vw] bg-white shadow-2xl flex flex-col animate-sheet-in', className)}
      aria-describedby={description ? 'sheet-desc' : undefined}
      {...props}
    >
      {title && <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>}
      {description && <p id="sheet-desc" className="sr-only">{description}</p>}
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer">
        <X className="h-4 w-4" /><span className="sr-only">Fermer</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = 'SheetContent';

export const SheetHeader = ({ className, ...props }) => (
  <div className={cn('px-6 pt-5 pb-4 border-b border-slate-100 shrink-0', className)} {...props} />
);
export const SheetFooter = ({ className, ...props }) => (
  <div className={cn('px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0', className)} {...props} />
);

// ── Tabs ───────────────────────────────────────────────────────────────────────
export const Tabs = TabsPrimitive.Root;

export const TabsList = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref}
    className={cn('inline-flex items-center rounded-lg bg-slate-100 p-1 text-slate-500', className)}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export const TabsTrigger = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref}
    className={cn('inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm focus-visible:outline-none', className)}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn('mt-0', className)} {...props} />
));
TabsContent.displayName = 'TabsContent';

// ── RadioGroup ─────────────────────────────────────────────────────────────────
export const RadioGroup = forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('flex gap-4', className)} {...props} />
));
RadioGroup.displayName = 'RadioGroup';

export const RadioGroupItem = forwardRef(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item ref={ref}
    className={cn('aspect-square h-4 w-4 rounded-full border border-slate-300 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 cursor-pointer', className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2 w-2 fill-white text-white" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = 'RadioGroupItem';

// ── ScrollArea ─────────────────────────────────────────────────────────────────
export const ScrollArea = forwardRef(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar orientation="vertical"
      className="flex select-none touch-none p-0.5 bg-transparent transition-colors hover:bg-slate-100/50 w-2.5">
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-slate-300/70" />
    </ScrollAreaPrimitive.Scrollbar>
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = 'ScrollArea';

// ── Field / SectionHeader ──────────────────────────────────────────────────────
export const Field = ({ label, required, hint, children, className }) => (
  <div className={cn('flex flex-col gap-1.5', className)}>
    {label && (
      <Label>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </Label>
    )}
    {children}
    {hint && <p className="text-xs text-slate-400">{hint}</p>}
  </div>
);

export const SectionHeader = ({ children }) => (
  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">{children}</p>
);
