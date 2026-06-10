import { useState } from 'react';
import { Save, User, Building2, Bell, Shield } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { cn } from '../lib/utils';
import { Button, Input, Textarea, Label, Separator, Field } from '../components/ui';

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
          checked ? 'bg-blue-600' : 'bg-slate-200'
        )}
      >
        <span className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform',
          checked ? 'translate-x-4' : 'translate-x-0'
        )} />
      </button>
    </div>
  );
}

export default function Parametres() {
  const [profile, setProfile] = useState({
    nom: 'Othmane Kahtal', email: 'othmanekahtal@gmail.com',
    tel: '+212 6 00 00 00 00', ordre: 'OECMA-12345',
  });
  const [cabinet, setCabinet] = useState({
    nom: 'Cabinet Kahtal & Associés',
    adresse: '25 Rue Abou Inane, Casablanca 20100',
    tel: '+212 5 22 00 00 00', email: 'contact@cabinet-kahtal.ma',
    patente: '123456', if_: '87654321',
  });
  const [notifs, setNotifs] = useState({
    echeances: true, nouvelles: true, retards: true, hebdo: false,
  });

  const save = (section) => {
    toast.success(`${section} enregistré avec succès.`);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="max-w-2xl space-y-5">

        {/* Profile */}
        <Section icon={User} title="Mon profil">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                OK
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{profile.nom}</p>
                <p className="text-xs text-slate-400">Expert Comptable · OECMA</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nom complet">
                <Input value={profile.nom} onChange={(e) => setProfile(p => ({ ...p, nom: e.target.value }))} />
              </Field>
              <Field label="Adresse e-mail">
                <Input type="email" value={profile.email} onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))} />
              </Field>
              <Field label="Téléphone">
                <Input value={profile.tel} onChange={(e) => setProfile(p => ({ ...p, tel: e.target.value }))} />
              </Field>
              <Field label="N° Ordre (OECMA)">
                <Input value={profile.ordre} onChange={(e) => setProfile(p => ({ ...p, ordre: e.target.value }))} />
              </Field>
            </div>
            <div className="flex justify-end pt-1">
              <Button size="sm" onClick={() => save('Profil')}>
                <Save className="w-3.5 h-3.5" />Enregistrer
              </Button>
            </div>
          </div>
        </Section>

        {/* Cabinet */}
        <Section icon={Building2} title="Cabinet comptable">
          <div className="space-y-4">
            <Field label="Nom du cabinet">
              <Input value={cabinet.nom} onChange={(e) => setCabinet(p => ({ ...p, nom: e.target.value }))} />
            </Field>
            <Field label="Adresse">
              <Textarea value={cabinet.adresse} onChange={(e) => setCabinet(p => ({ ...p, adresse: e.target.value }))} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Téléphone">
                <Input value={cabinet.tel} onChange={(e) => setCabinet(p => ({ ...p, tel: e.target.value }))} />
              </Field>
              <Field label="E-mail">
                <Input type="email" value={cabinet.email} onChange={(e) => setCabinet(p => ({ ...p, email: e.target.value }))} />
              </Field>
              <Field label="Patente">
                <Input value={cabinet.patente} onChange={(e) => setCabinet(p => ({ ...p, patente: e.target.value }))} />
              </Field>
              <Field label="Identifiant Fiscal (IF)">
                <Input value={cabinet.if_} onChange={(e) => setCabinet(p => ({ ...p, if_: e.target.value }))} />
              </Field>
            </div>
            <div className="flex justify-end pt-1">
              <Button size="sm" onClick={() => save('Cabinet')}>
                <Save className="w-3.5 h-3.5" />Enregistrer
              </Button>
            </div>
          </div>
        </Section>

        {/* Notifications */}
        <Section icon={Bell} title="Notifications">
          <div className="space-y-4">
            <Toggle
              checked={notifs.echeances}
              onChange={(v) => setNotifs(p => ({ ...p, echeances: v }))}
              label="Rappels d'échéances fiscales"
              description="Recevoir des alertes 7 jours avant chaque date limite"
            />
            <Separator />
            <Toggle
              checked={notifs.retards}
              onChange={(v) => setNotifs(p => ({ ...p, retards: v }))}
              label="Alertes déclarations en retard"
              description="Notification immédiate dès qu'une date limite est dépassée"
            />
            <Separator />
            <Toggle
              checked={notifs.nouvelles}
              onChange={(v) => setNotifs(p => ({ ...p, nouvelles: v }))}
              label="Nouvelles sociétés ajoutées"
              description="Confirmation lors de l'ajout d'une nouvelle société"
            />
            <Separator />
            <Toggle
              checked={notifs.hebdo}
              onChange={(v) => setNotifs(p => ({ ...p, hebdo: v }))}
              label="Résumé hebdomadaire"
              description="Récapitulatif des déclarations chaque lundi matin"
            />
            <div className="flex justify-end pt-1">
              <Button size="sm" onClick={() => save('Notifications')}>
                <Save className="w-3.5 h-3.5" />Enregistrer
              </Button>
            </div>
          </div>
        </Section>

        {/* Security */}
        <Section icon={Shield} title="Sécurité">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Field label="Mot de passe actuel">
                <Input type="password" placeholder="••••••••" />
              </Field>
              <Field label="Nouveau mot de passe">
                <Input type="password" placeholder="••••••••" />
              </Field>
              <Field label="Confirmer le nouveau mot de passe">
                <Input type="password" placeholder="••••••••" />
              </Field>
            </div>
            <div className="flex justify-end pt-1">
              <Button size="sm" variant="outline" onClick={() => save('Mot de passe')}>
                <Save className="w-3.5 h-3.5" />Changer le mot de passe
              </Button>
            </div>
          </div>
        </Section>

      </div>
    </>
  );
}
