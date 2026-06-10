import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';
import { CALENDAR_EVENTS } from '../lib/data';

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS   = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

const EVENT_COLORS = {
  tva:  { dot: 'bg-blue-500',    badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  is:   { dot: 'bg-violet-500',  badge: 'bg-violet-50 text-violet-700 border-violet-200' },
  cnss: { dot: 'bg-teal-500',    badge: 'bg-teal-50 text-teal-700 border-teal-200' },
  ir:   { dot: 'bg-rose-500',    badge: 'bg-rose-50 text-rose-700 border-rose-200' },
  tp:   { dot: 'bg-orange-500',  badge: 'bg-orange-50 text-orange-700 border-orange-200' },
};

function buildCalendar(year, month) {
  // month is 0-indexed
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert Sunday=0 to Mon-first grid
  const startOffset = (firstDay + 6) % 7;
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function Calendrier() {
  // Fixed to June 2026
  const year = 2026, month = 5; // 0-indexed June
  const cells = buildCalendar(year, month);
  const today = 6; // June 6, 2026

  const eventsByDay = {};
  CALENDAR_EVENTS.forEach((e) => {
    if (!eventsByDay[e.date]) eventsByDay[e.date] = [];
    eventsByDay[e.date].push(e);
  });

  return (
    <div className="space-y-6">

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {[
          { key: 'tva',  label: 'TVA' },
          { key: 'is',   label: 'Acompte IS' },
          { key: 'cnss', label: 'CNSS' },
          { key: 'ir',   label: 'IR Salaires' },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', EVENT_COLORS[key].dot)} />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Month header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">{MONTHS[month]} {year}</h3>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-slate-100">
            {DAYS.map((d) => (
              <div key={d} className="text-center py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              const events = day ? (eventsByDay[day] || []) : [];
              const isToday = day === today;
              return (
                <div key={i}
                  className={cn(
                    'min-h-[80px] p-1.5 border-b border-r border-slate-100 last:border-r-0',
                    !day && 'bg-slate-50/50',
                    day && 'hover:bg-slate-50/60 transition-colors cursor-default'
                  )}>
                  {day && (
                    <>
                      <div className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1',
                        isToday ? 'bg-blue-600 text-white' : 'text-slate-600'
                      )}>
                        {day}
                      </div>
                      <div className="space-y-0.5">
                        {events.slice(0, 2).map((ev, ei) => (
                          <div key={ei}
                            className={cn('flex items-center gap-1 rounded-sm px-1 py-0.5', EVENT_COLORS[ev.type]?.badge ?? 'bg-slate-100 text-slate-600')}>
                            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', EVENT_COLORS[ev.type]?.dot)} />
                            <span className="text-[10px] font-medium truncate leading-tight">{ev.label.split(' — ')[0]}</span>
                          </div>
                        ))}
                        {events.length > 2 && (
                          <span className="text-[10px] text-slate-400 pl-1">+{events.length - 2} autres</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming deadlines list */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden h-fit">
          <div className="px-4 py-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Échéances de juin</h3>
          </div>
          <ul className="divide-y divide-slate-50">
            {CALENDAR_EVENTS.sort((a, b) => a.date - b.date).map((ev, i) => (
              <li key={i} className="px-4 py-3.5 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5',
                    EVENT_COLORS[ev.type]?.dot.replace('bg-', 'bg-') ?? 'bg-slate-400')}>
                    {ev.date}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-800 leading-tight">{ev.label.split(' — ')[0]}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{ev.label.split(' — ')[1]}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ev.societes.slice(0, 3).map((s) => (
                        <span key={s} className="text-[10px] bg-slate-100 text-slate-600 rounded-full px-2 py-0.5 truncate max-w-[100px]">{s}</span>
                      ))}
                      {ev.societes.length > 3 && (
                        <span className="text-[10px] text-slate-400">+{ev.societes.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <span className={cn(
                    'text-xs font-medium rounded-full px-2 py-0.5 shrink-0',
                    ev.statut === 'Soumis'   ? 'bg-emerald-50 text-emerald-700' :
                    ev.statut === 'En cours' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  )}>{ev.statut}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-4 py-3 border-t border-slate-100">
            <p className="text-xs text-slate-400 text-center">{CALENDAR_EVENTS.length} échéances ce mois</p>
          </div>
        </div>

      </div>
    </div>
  );
}
