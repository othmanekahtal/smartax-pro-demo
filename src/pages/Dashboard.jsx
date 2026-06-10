import { Building2, Users, CalendarDays, Wallet, TrendingUp, AlertCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn, fmtCapital } from '../lib/utils';
import { MOCK_COMPANIES, MOCK_DECLARATIONS } from '../lib/data';
import { Badge } from '../components/ui';

function KPICard({ title, value, sub, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-500 font-medium leading-tight">{title}</p>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
          <Icon className={cn('w-4 h-4', iconColor)} />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900 leading-none tracking-tight">{value}</p>
      <p className="text-xs text-slate-400">{sub}</p>
    </div>
  );
}

const DECL_STATUS_ICON = {
  'En retard': { Icon: AlertCircle, color: 'text-rose-500' },
  'À faire':   { Icon: Clock,       color: 'text-amber-500' },
  'En cours':  { Icon: Clock,       color: 'text-blue-500' },
  'Soumis':    { Icon: CheckCircle2,color: 'text-emerald-500' },
};

export default function Dashboard({ setActivePage }) {
  const companies = MOCK_COMPANIES;
  const declarations = MOCK_DECLARATIONS;

  const kpis = {
    total:          companies.length,
    mensuelle:      companies.filter((c) => c.periodesFiscale === 'Mensuelle').length,
    trimestrielle:  companies.filter((c) => c.periodesFiscale === 'Trimestrielle').length,
    capitalTotal:   companies.reduce((s, c) => s + (c.capital || 0), 0),
    addedThisMonth: companies.filter((c) => c.addedThisMonth).length,
  };

  const urgent = declarations.filter((d) => d.statut === 'En retard' || d.statut === 'À faire').slice(0, 5);
  const recentCompanies = [...companies].slice(-4).reverse();

  return (
    <div className="space-y-7">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Bonjour, Othmane 👋</h2>
        <p className="text-sm text-slate-500 mt-0.5">Voici un aperçu de votre portefeuille au 6 juin 2026.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total des sociétés"          value={kpis.total}
          sub="Sociétés enregistrées"               icon={Building2}    iconBg="bg-blue-50"    iconColor="text-blue-600" />
        <KPICard title="Déclarations mensuelles"     value={kpis.mensuelle}
          sub="Période fiscale mensuelle"            icon={CalendarDays} iconBg="bg-indigo-50"  iconColor="text-indigo-600" />
        <KPICard title="Déclarations trimestrielles" value={kpis.trimestrielle}
          sub="Période fiscale trimestrielle"        icon={Users}        iconBg="bg-amber-50"   iconColor="text-amber-600" />
        <KPICard title="Capital total géré"          value={fmtCapital(kpis.capitalTotal)}
          sub="Somme des capitaux sociaux"           icon={Wallet}       iconBg="bg-emerald-50" iconColor="text-emerald-600" />
        <KPICard title="Ajoutées ce mois"            value={kpis.addedThisMonth}
          sub="Nouvelles sociétés en juin 2026"      icon={TrendingUp}   iconBg="bg-violet-50"  iconColor="text-violet-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Upcoming declarations */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Déclarations urgentes</h3>
            <button onClick={() => setActivePage('declarations')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer transition-colors">
              Voir tout <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <ul className="divide-y divide-slate-50">
            {urgent.length === 0 ? (
              <li className="px-5 py-8 text-center text-sm text-slate-400">Aucune déclaration urgente</li>
            ) : urgent.map((d) => {
              const { Icon, color } = DECL_STATUS_ICON[d.statut] ?? DECL_STATUS_ICON['À faire'];
              return (
                <li key={d.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/70 transition-colors">
                  <Icon className={cn('w-4 h-4 shrink-0', color)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{d.societe}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{d.type} · {d.periode}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-slate-700">{d.dateLimite}</p>
                    <p className={cn('text-xs mt-0.5 font-medium', d.statut === 'En retard' ? 'text-rose-500' : 'text-amber-500')}>
                      {d.statut}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Recent companies */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Sociétés récentes</h3>
            <button onClick={() => setActivePage('societes')}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer transition-colors">
              Voir tout <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <ul className="divide-y divide-slate-50">
            {recentCompanies.map((c) => (
              <li key={c.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/70 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {c.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">{c.activitePrincipale}</p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <Badge variant={c.formeJuridique === 'SARL' ? 'default' : c.formeJuridique === 'SA' ? 'purple' : 'indigo'}>
                    {c.formeJuridique}
                  </Badge>
                  <p className="text-xs text-slate-400">{fmtCapital(c.capital)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Declaration summary by type */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-900">Résumé des déclarations — Juin 2026</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
          {[
            { label: 'À faire',   count: declarations.filter(d => d.statut === 'À faire').length,   color: 'text-slate-600',   bg: 'bg-slate-50' },
            { label: 'En cours',  count: declarations.filter(d => d.statut === 'En cours').length,  color: 'text-blue-700',    bg: 'bg-blue-50/50' },
            { label: 'Soumis',    count: declarations.filter(d => d.statut === 'Soumis').length,    color: 'text-emerald-700', bg: 'bg-emerald-50/50' },
            { label: 'En retard', count: declarations.filter(d => d.statut === 'En retard').length, color: 'text-rose-700',    bg: 'bg-rose-50/50' },
          ].map(({ label, count, color, bg }) => (
            <div key={label} className={cn('flex flex-col items-center justify-center py-6 gap-1', bg)}>
              <span className={cn('text-3xl font-bold', color)}>{count}</span>
              <span className="text-xs text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
