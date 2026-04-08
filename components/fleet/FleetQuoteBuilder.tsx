import React, { useMemo, useState } from 'react';
import {
  Building2,
  CalendarClock,
  CirclePercent,
  Plus,
  Trash2,
  Truck,
} from 'lucide-react';
import {
  type FleetContractLength,
  type FleetFrequency,
  type FleetQuoteLine,
  type FleetVehicleId,
  FLEET_VEHICLE_OPTIONS,
  buildFleetQuoteSummaryText,
  computeFleetQuote,
  formatCad,
} from '@/lib/fleetQuotePricing';
import { leadQuoteSubmitErrorMessage, submitFleetQuote } from '@/lib/leadQuote';

function newLineId(): string {
  return `line-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
}

const FREQUENCY_OPTIONS: { id: FleetFrequency; label: string; hint: string }[] = [
  { id: 'once', label: 'One-time', hint: 'Single visit · list rate' },
  { id: 'weekly', label: 'Weekly', hint: '50% off plan rate' },
  { id: 'biweekly', label: 'Biweekly', hint: '40% off plan rate' },
  { id: 'monthly', label: 'Monthly', hint: '30% off plan rate' },
  { id: 'bimonthly', label: 'Bimonthly', hint: '15% off plan rate' },
];

const CONTRACT_OPTIONS: { id: FleetContractLength; label: string; hint: string }[] = [
  { id: '6mo', label: '6 months', hint: '10% off contract total' },
  { id: '12mo', label: '12 months', hint: '15% off contract total' },
];

export interface FleetQuoteBuilderProps {
  cityLabel: string;
}

const FleetQuoteBuilder: React.FC<FleetQuoteBuilderProps> = ({ cityLabel }) => {
  const [lines, setLines] = useState<FleetQuoteLine[]>([
    {
      id: newLineId(),
      vehicleId: 'car',
      quantity: 1,
      interior: true,
      exterior: true,
    },
  ]);
  const [frequency, setFrequency] = useState<FleetFrequency>('monthly');
  const [contractLength, setContractLength] = useState<FleetContractLength>('6mo');
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [totalBump, setTotalBump] = useState(0);

  const input = useMemo(
    () => ({ lines, frequency, contractLength }),
    [lines, frequency, contractLength]
  );
  const breakdown = useMemo(() => computeFleetQuote(input), [input]);

  React.useEffect(() => {
    setTotalBump((k) => k + 1);
  }, [breakdown.contractTotal, breakdown.perVisitAfterFrequency, lines, frequency, contractLength]);

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      {
        id: newLineId(),
        vehicleId: 'car',
        quantity: 1,
        interior: true,
        exterior: false,
      },
    ]);
  };

  const removeLine = (id: string) => {
    setLines((prev) => (prev.length <= 1 ? prev : prev.filter((l) => l.id !== id)));
  };

  const updateLine = (id: string, patch: Partial<FleetQuoteLine>) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const summary = buildFleetQuoteSummaryText(input, breakdown, { cityLabel, company });
    setSubmitting(true);
    try {
      await submitFleetQuote({
        name,
        email,
        phone,
        company: company.trim() || undefined,
        notes: notes.trim() || undefined,
        fleetCityLabel: cityLabel,
        summaryText: summary,
        carMakeModelShort: `Fleet quote — ${cityLabel}`,
      });
      setMessage({ type: 'ok', text: 'Thanks — we received your fleet plan and will reach out shortly.' });
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
            <Truck className="w-6 h-6 text-brand-yellow shrink-0" aria-hidden />
            <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-white">
              Your fleet mix
            </h3>
          </div>
          <p className="text-white/55 text-sm mb-6 leading-relaxed">
            Add each vehicle type and toggle interior and/or exterior. Quantities multiply per-visit pricing for that row.
            <span className="block mt-2 text-white/45 text-xs">
              Fleet volume: 1–10 units regular · 11–20 units 10% off · 21+ units 15% off (applied before recurring plan
              discounts).
            </span>
          </p>
          <div className="space-y-4">
            {lines.map((line) => (
              <div
                key={line.id}
                className="rounded-lg border border-white/10 bg-brand-black/60 p-4 transition-all duration-300 hover:border-white/15"
              >
                <div className="flex flex-wrap gap-3 items-end justify-between">
                  <div className="grid sm:grid-cols-2 gap-3 flex-1 min-w-0">
                    <label className="block min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1.5">
                        Vehicle
                      </span>
                      <select
                        value={line.vehicleId}
                        onChange={(e) =>
                          updateLine(line.id, { vehicleId: e.target.value as FleetVehicleId })
                        }
                        className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
                      >
                        {FLEET_VEHICLE_OPTIONS.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block min-w-0">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1.5">
                        Quantity
                      </span>
                      <input
                        type="number"
                        min={1}
                        max={999}
                        value={line.quantity}
                        onChange={(e) =>
                          updateLine(line.id, { quantity: Math.max(1, Number(e.target.value) || 1) })
                        }
                        className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    disabled={lines.length <= 1}
                    className="shrink-0 p-2.5 rounded-md border border-white/10 text-white/50 hover:text-red-400 hover:border-red-400/40 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    aria-label="Remove row"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 mt-4">
                  <label className="inline-flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={line.interior}
                      onChange={(e) => updateLine(line.id, { interior: e.target.checked })}
                      className="w-4 h-4 rounded border-white/30 bg-brand-black text-brand-yellow focus:ring-brand-yellow"
                    />
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">Interior</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={line.exterior}
                      onChange={(e) => updateLine(line.id, { exterior: e.target.checked })}
                      className="w-4 h-4 rounded border-white/30 bg-brand-black text-brand-yellow focus:ring-brand-yellow"
                    />
                    <span className="text-sm text-white/80 group-hover:text-white transition-colors">Exterior</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addLine}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-yellow hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add vehicle row
          </button>
        </div>

        <div className="rounded-xl border border-white/10 bg-brand-dark/80 p-5 sm:p-6 reveal">
          <div className="flex items-center gap-3 mb-5">
            <CalendarClock className="w-6 h-6 text-brand-yellow shrink-0" aria-hidden />
            <h3 className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-white">
              Schedule & contract
            </h3>
          </div>
          <fieldset className="space-y-3 mb-6">
            <legend className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Service frequency</legend>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {FREQUENCY_OPTIONS.map((f) => (
                <label
                  key={f.id}
                  className={`flex flex-col gap-0.5 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    frequency === f.id
                      ? 'border-brand-yellow bg-brand-yellow/10'
                      : 'border-white/10 bg-brand-black/40 hover:border-white/20'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fleet-frequency"
                      value={f.id}
                      checked={frequency === f.id}
                      onChange={() => setFrequency(f.id)}
                      className="text-brand-yellow focus:ring-brand-yellow"
                    />
                    <span className="font-bold text-white text-sm">{f.label}</span>
                  </span>
                  <span className="text-xs text-white/45 pl-6">{f.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset
            disabled={frequency === 'once'}
            className={`space-y-3 ${frequency === 'once' ? 'opacity-45 pointer-events-none' : ''}`}
          >
            <legend className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
              Contract length
            </legend>
            <div className="grid sm:grid-cols-2 gap-2">
              {CONTRACT_OPTIONS.map((c) => (
                <label
                  key={c.id}
                  className={`flex flex-col gap-0.5 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    contractLength === c.id
                      ? 'border-brand-yellow bg-brand-yellow/10'
                      : 'border-white/10 bg-brand-black/40 hover:border-white/20'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="fleet-contract"
                      value={c.id}
                      checked={contractLength === c.id}
                      onChange={() => setContractLength(c.id)}
                      className="text-brand-yellow focus:ring-brand-yellow"
                    />
                    <span className="font-bold text-white text-sm">{c.label}</span>
                  </span>
                  <span className="text-xs text-white/45 pl-6">{c.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {frequency === 'once' && (
            <p className="text-brand-yellow/90 text-xs mt-3 font-semibold">
              One-time visits do not use 6- or 12-month loyalty pricing—estimate is a single stop.
            </p>
          )}
          <p className="text-white/40 text-xs mt-4 leading-relaxed">
            {frequency === 'once'
              ? 'One visit only. Recurring plans unlock frequency discounts and optional contract savings.'
              : 'Visit counts are indicative (e.g. weekly ≈ 26 visits in 6 months). We align the live calendar to your yard or terminal.'}
          </p>
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
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 text-white/70">
              <dt>Per visit (list)</dt>
              <dd className="font-mono text-white tabular-nums">
                {breakdown.perVisitBase != null ? formatCad(breakdown.perVisitBase) : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-white/70 items-start">
              <dt className="min-w-0 pr-2">
                After fleet volume (per visit)
                <span className="block text-[10px] font-normal text-white/40 normal-case tracking-normal mt-0.5">
                  {breakdown.fleetUnitCount} units · {breakdown.volumeTierLabel}
                </span>
              </dt>
              <dd className="font-mono text-white tabular-nums shrink-0">
                {breakdown.perVisitAfterVolume != null ? formatCad(breakdown.perVisitAfterVolume) : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-white/70">
              <dt>
                {breakdown.frequency === 'once'
                  ? 'One-time (no plan discount)'
                  : `After ${breakdown.frequencyLabel.toLowerCase()} plan`}
              </dt>
              <dd className="font-mono text-brand-yellow tabular-nums">
                {breakdown.perVisitAfterFrequency != null ? formatCad(breakdown.perVisitAfterFrequency) : '—'}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-white/70">
              <dt>{breakdown.frequency === 'once' ? 'Visits' : `Visits (${breakdown.contractMonths} mo term)`}</dt>
              <dd className="font-mono text-white tabular-nums">
                {breakdown.frequency === 'once' ? '1' : breakdown.visitCount}
              </dd>
            </div>
            <div className="flex justify-between gap-4 text-white/70">
              <dt>{breakdown.frequency === 'once' ? 'Subtotal' : 'Before loyalty discount'}</dt>
              <dd className="font-mono text-white/80 tabular-nums">
                {breakdown.subtotalBeforeContractDiscount != null
                  ? formatCad(breakdown.subtotalBeforeContractDiscount)
                  : '—'}
              </dd>
            </div>
            <div className="pt-3 mt-3 border-t border-white/10 flex justify-between gap-4 items-baseline">
              <dt className="font-display font-black uppercase text-white text-base">Indicative total</dt>
              <dd
                key={totalBump}
                className="font-mono text-2xl sm:text-3xl font-black text-brand-yellow tabular-nums fleet-total-pop"
              >
                {breakdown.needsCustom || breakdown.contractTotal == null
                  ? 'Custom'
                  : formatCad(breakdown.contractTotal)}
              </dd>
            </div>
          </dl>
          {breakdown.needsCustom && (
            <p className="text-white/55 text-xs mt-3">
              “Other” or incomplete rows need a quick call — send the plan anyway and we will price it.
            </p>
          )}
          <p className="text-white/35 text-[11px] mt-4 leading-relaxed">
            Final pricing confirmed after fleet walkthrough. HST may apply.
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
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Company (optional)</span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
              autoComplete="organization"
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
              placeholder="Yard location, fleet size, timing…"
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
            {submitting ? 'Sending…' : 'Email me this fleet plan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FleetQuoteBuilder;
