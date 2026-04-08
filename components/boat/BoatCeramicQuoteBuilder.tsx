import React, { useMemo, useState } from 'react';
import { Anchor, Building2, CirclePercent, Ruler, Waves } from 'lucide-react';
import {
  type BoatCeramicQuoteInput,
  type BoatCondition,
  type BoatHullType,
  buildBoatQuoteSummaryText,
  computeBoatCeramicQuote,
  formatCad,
} from '@/lib/boatCeramicPricing';
import { leadQuoteSubmitErrorMessage, submitBoatQuote } from '@/lib/leadQuote';

const HULL_OPTIONS: { id: BoatHullType; label: string }[] = [
  { id: 'open_bow', label: 'Open bow / runabout' },
  { id: 'cuddy', label: 'Cuddy / walkaround' },
  { id: 'pontoon', label: 'Pontoon / tri-toon' },
  { id: 'cruiser', label: 'Cruiser / express' },
  { id: 'other', label: 'Other (custom quote)' },
];

const CONDITION_OPTIONS: { id: BoatCondition; label: string; hint: string }[] = [
  { id: 'good', label: 'Good gelcoat', hint: 'Standard wash & decon before coating' },
  { id: 'light_oxidation', label: 'Light oxidation', hint: '+10% prep placeholder' },
  { id: 'heavy_oxidation', label: 'Heavy oxidation', hint: '+25% prep placeholder' },
];

export interface BoatCeramicQuoteBuilderProps {
  cityLabel: string;
}

const BoatCeramicQuoteBuilder: React.FC<BoatCeramicQuoteBuilderProps> = ({ cityLabel }) => {
  const [loaFt, setLoaFt] = useState(24);
  const [hullType, setHullType] = useState<BoatHullType>('open_bow');
  const [scopeHull, setScopeHull] = useState(true);
  const [scopeDeck, setScopeDeck] = useState(false);
  const [scopeTopside, setScopeTopside] = useState(false);
  const [scopeBrightwork, setScopeBrightwork] = useState(false);
  const [condition, setCondition] = useState<BoatCondition>('good');
  const [marina, setMarina] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [totalBump, setTotalBump] = useState(0);

  const input: BoatCeramicQuoteInput = useMemo(
    () => ({
      loaFt,
      hullType,
      scopeHull,
      scopeDeck,
      scopeTopside,
      scopeBrightwork,
      condition,
    }),
    [loaFt, hullType, scopeHull, scopeDeck, scopeTopside, scopeBrightwork, condition]
  );

  const breakdown = useMemo(() => computeBoatCeramicQuote(input), [input]);

  React.useEffect(() => {
    setTotalBump((k) => k + 1);
  }, [breakdown.indicativeTotal, input]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const summary = buildBoatQuoteSummaryText(input, breakdown, {
      cityLabel,
      marinaOrSlip: marina.trim() || undefined,
    });
    setSubmitting(true);
    try {
      await submitBoatQuote({
        name,
        email,
        phone,
        notes: notes.trim() || undefined,
        boatCityLabel: cityLabel,
        marinaOrSlip: marina.trim() || undefined,
        summaryText: summary,
        carMakeModelShort: `Boat ceramic — ${cityLabel}`,
      });
      setMessage({ type: 'ok', text: 'Thanks — we received your boat coating plan and will reach out shortly.' });
      setNotes('');
    } catch (err) {
      setMessage({ type: 'err', text: await leadQuoteSubmitErrorMessage(err) });
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = name.trim() && email.trim() && phone.trim();

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      <div className="lg:col-span-7 space-y-8">
        <div className="rounded-xl border border-white/10 bg-brand-dark/80 p-5 sm:p-6 reveal">
          <div className="flex items-center gap-3 mb-5">
            <Ruler className="w-6 h-6 text-brand-yellow shrink-0" aria-hidden />
            <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-white">
              Your vessel
            </h3>
          </div>
          <label className="block mb-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1.5">
              Length overall (ft)
            </span>
            <input
              type="number"
              min={1}
              max={200}
              value={loaFt}
              onChange={(e) => setLoaFt(Math.max(1, Number(e.target.value) || 1))}
              className="w-full max-w-xs bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
            />
            <span className="block text-xs text-white/45 mt-2">
              Bracket: {breakdown.bracketLabel} — placeholder bases in code; replace with your pricing.
            </span>
          </label>
          <fieldset className="space-y-2">
            <legend className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Hull type</legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {HULL_OPTIONS.map((h) => (
                <label
                  key={h.id}
                  className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                    hullType === h.id
                      ? 'border-brand-yellow bg-brand-yellow/10'
                      : 'border-white/10 bg-brand-black/40 hover:border-white/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="boat-hull"
                    value={h.id}
                    checked={hullType === h.id}
                    onChange={() => setHullType(h.id)}
                    className="text-brand-yellow focus:ring-brand-yellow"
                  />
                  <span className="text-sm font-semibold text-white">{h.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="rounded-xl border border-white/10 bg-brand-dark/80 p-5 sm:p-6 reveal">
          <div className="flex items-center gap-3 mb-5">
            <Waves className="w-6 h-6 text-brand-yellow shrink-0" aria-hidden />
            <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-white">
              Coating scope
            </h3>
          </div>
          <p className="text-white/50 text-sm mb-4">
            Hull/gelcoat is the core package. Add deck, topside, and brightwork as needed.
          </p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={scopeHull}
                onChange={(e) => setScopeHull(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 bg-brand-black text-brand-yellow focus:ring-brand-yellow"
              />
              <span className="text-sm text-white/85 group-hover:text-white">Hull / gelcoat sides (base package)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={scopeDeck}
                onChange={(e) => setScopeDeck(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 bg-brand-black text-brand-yellow focus:ring-brand-yellow"
              />
              <span className="text-sm text-white/85 group-hover:text-white">Deck / non-skid</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={scopeTopside}
                onChange={(e) => setScopeTopside(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 bg-brand-black text-brand-yellow focus:ring-brand-yellow"
              />
              <span className="text-sm text-white/85 group-hover:text-white">Topside / rails / cabin exterior</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={scopeBrightwork}
                onChange={(e) => setScopeBrightwork(e.target.checked)}
                className="w-4 h-4 rounded border-white/30 bg-brand-black text-brand-yellow focus:ring-brand-yellow"
              />
              <span className="text-sm text-white/85 group-hover:text-white">Brightwork / metal trim</span>
            </label>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-brand-dark/80 p-5 sm:p-6 reveal">
          <div className="flex items-center gap-3 mb-5">
            <Anchor className="w-6 h-6 text-brand-yellow shrink-0" aria-hidden />
            <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-white">
              Gelcoat condition
            </h3>
          </div>
          <div className="space-y-2">
            {CONDITION_OPTIONS.map((c) => (
              <label
                key={c.id}
                className={`flex flex-col gap-0.5 p-3 rounded-lg border cursor-pointer transition-all ${
                  condition === c.id
                    ? 'border-brand-yellow bg-brand-yellow/10'
                    : 'border-white/10 bg-brand-black/40 hover:border-white/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="boat-condition"
                    value={c.id}
                    checked={condition === c.id}
                    onChange={() => setCondition(c.id)}
                    className="text-brand-yellow focus:ring-brand-yellow"
                  />
                  <span className="font-bold text-white text-sm">{c.label}</span>
                </span>
                <span className="text-xs text-white/45 pl-6">{c.hint}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
        <div
          className={`rounded-xl border border-white/10 bg-gradient-to-b from-brand-yellow/10 to-brand-dark/90 p-5 sm:p-6 reveal transition-transform duration-300 ${
            totalBump % 2 === 0 ? 'scale-[1.01]' : 'scale-100'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <CirclePercent className="w-6 h-6 text-brand-yellow shrink-0" aria-hidden />
            <h3 className="font-display text-lg font-black uppercase tracking-tight text-white">Live estimate</h3>
          </div>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-4 text-white/70">
              <dt>Length bracket base</dt>
              <dd className="font-mono text-white tabular-nums text-right">
                {breakdown.baseFromLength != null ? formatCad(breakdown.baseFromLength) : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-white/70">
              <dt>Hull factor</dt>
              <dd className="font-mono text-white/80 tabular-nums">
                {breakdown.hullMultiplier != null ? `×${breakdown.hullMultiplier}` : '—'}
              </dd>
            </div>
            {breakdown.scopeDeck && (
              <div className="flex justify-between gap-4 text-white/60 text-xs">
                <dt>Deck add-on</dt>
                <dd className="font-mono tabular-nums">+{formatCad(breakdown.deckAdd)}</dd>
              </div>
            )}
            {breakdown.scopeTopside && (
              <div className="flex justify-between gap-4 text-white/60 text-xs">
                <dt>Topside add-on</dt>
                <dd className="font-mono tabular-nums">+{formatCad(breakdown.topsideAdd)}</dd>
              </div>
            )}
            {breakdown.scopeBrightwork && (
              <div className="flex justify-between gap-4 text-white/60 text-xs">
                <dt>Brightwork</dt>
                <dd className="font-mono tabular-nums">+{formatCad(breakdown.brightworkAdd)}</dd>
              </div>
            )}
            {breakdown.conditionSurcharge > 0 && (
              <div className="flex justify-between gap-4 text-amber-200/90 text-xs">
                <dt>Prep surcharge</dt>
                <dd className="font-mono tabular-nums">+{formatCad(breakdown.conditionSurcharge)}</dd>
              </div>
            )}
            <div className="pt-3 mt-3 border-t border-white/10 flex justify-between gap-4 items-baseline">
              <dt className="font-display font-black uppercase text-white text-base">Indicative total</dt>
              <dd
                key={totalBump}
                className="font-mono text-2xl sm:text-3xl font-black text-brand-yellow tabular-nums fleet-total-pop"
              >
                {breakdown.needsCustom || breakdown.indicativeTotal == null
                  ? 'Custom'
                  : formatCad(breakdown.indicativeTotal)}
              </dd>
            </div>
          </dl>
          <p className="text-white/35 text-[11px] mt-4 leading-relaxed">
            Placeholder math for planning only. Final price after in-person inspection and scope sign-off. HST may apply.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-xl border border-white/10 bg-brand-dark/80 p-5 sm:p-6 reveal space-y-4"
        >
          <div className="flex items-center gap-3 mb-1">
            <Building2 className="w-5 h-5 text-brand-yellow shrink-0" aria-hidden />
            <h3 className="font-display text-base font-black uppercase tracking-tight text-white">Request this quote</h3>
          </div>
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Marina / slip (optional)</span>
            <input
              value={marina}
              onChange={(e) => setMarina(e.target.value)}
              className="mt-1 w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
              placeholder="e.g. Hamilton Harbour, dry storage…"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Name *</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Email *</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Phone *</span>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
              autoComplete="tel"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Notes</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-1 w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 resize-y min-h-[80px]"
              placeholder="Make/model year, engine type, timeline…"
            />
          </label>
          {message && (
            <p
              className={`text-sm font-semibold ${message.type === 'ok' ? 'text-green-400' : 'text-red-400'}`}
              role="status"
            >
              {message.text}
            </p>
          )}
          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="w-full bg-brand-yellow text-brand-black py-3.5 font-black uppercase tracking-widest text-xs sm:text-sm magnetic-cta disabled:opacity-40 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending…' : 'Email me this boat coating plan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoatCeramicQuoteBuilder;
