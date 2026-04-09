import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MANITOULIN_CONTRACT,
  MANITOULIN_FREQUENCY,
  MANITOULIN_VEHICLE_ROWS,
  MANITOULIN_VOLUME,
  type ManitoulinContract,
  type ManitoulinFleetTier,
  type ManitoulinFrequency,
  type ManitoulinLine,
  type ManitoulinVehicleId,
  buildManitoulinSummaryText,
  computeManitoulinQuote,
  formatCad,
  getManitoulinSummaryRows,
} from '@/lib/manitoulinQuotePricing';
import { leadQuoteSubmitErrorMessage, submitFleetQuote } from '@/lib/leadQuote';

function newLineId(): string {
  return `mt-${typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now()}`;
}

const ManitoulinTransportQuotePage: React.FC = () => {
  const [lines, setLines] = useState<ManitoulinLine[]>([
    { id: newLineId(), vehicleId: 'day_cab', quantity: 10, interior: true, exterior: true },
    { id: newLineId(), vehicleId: 'sleeper_standard', quantity: 8, interior: true, exterior: true },
  ]);
  const [fleetTier, setFleetTier] = useState<ManitoulinFleetTier>('units_0_60');
  const [frequency, setFrequency] = useState<ManitoulinFrequency>('monthly');
  const [contract, setContract] = useState<ManitoulinContract>('12mo');
  const [name, setName] = useState('April');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const input = useMemo(
    () => ({ lines, fleetTier, frequency, contract: frequency === 'once' ? 'none' : contract }),
    [lines, fleetTier, frequency, contract]
  );
  const b = useMemo(() => computeManitoulinQuote(input), [input]);
  const summaryRows = useMemo(() => getManitoulinSummaryRows(input, b), [input, b]);

  const addLine = () => {
    setLines((prev) => [
      ...prev,
      { id: newLineId(), vehicleId: 'day_cab', quantity: 1, interior: true, exterior: true },
    ]);
  };

  const removeLine = (id: string) => {
    setLines((prev) => (prev.length <= 1 ? prev : prev.filter((l) => l.id !== id)));
  };

  const updateLine = (id: string, patch: Partial<ManitoulinLine>) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const summary = buildManitoulinSummaryText(input, b, { contactName: name });
    setSubmitting(true);
    try {
      await submitFleetQuote({
        name,
        email,
        phone,
        company: 'Manitoulin Transport',
        notes: notes.trim() || undefined,
        fleetCityLabel: 'Manitoulin Transport (proposal)',
        summaryText: summary,
        carMakeModelShort: 'Manitoulin fleet — transport trucks',
      });
      setMessage({ type: 'ok', text: 'Sent — we will follow up shortly.' });
    } catch (err) {
      setMessage({ type: 'err', text: await leadQuoteSubmitErrorMessage(err) });
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = name.trim() && email.trim() && phone.trim();

  return (
    <div className="min-h-screen bg-brand-black text-white pt-24 sm:pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <nav className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
          <Link to="/" className="hover:text-brand-yellow transition-colors">
            Home
          </Link>
          <span className="mx-2 text-white/25">/</span>
          <Link to="/fleet-detailing" className="hover:text-brand-yellow transition-colors">
            Fleet
          </Link>
          <span className="mx-2 text-white/25">/</span>
          <span className="text-brand-yellow">Manitoulin</span>
        </nav>

        <header className="mb-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-3">
            Fleet detailing <span className="text-brand-yellow">quote</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            <strong className="text-white">Manitoulin Transport</strong>
            {name.trim() ? (
              <>
                {' '}
                · <strong className="text-white">{name.trim()}</strong>
              </>
            ) : null}
            <br />
            These are <strong className="text-white">starting rates</strong> — scroll down for fleet volume, visit
            schedule, and contract discounts. Final numbers after a quick walkthrough.
          </p>
        </header>

        {/* Price list — base rates only */}
        <section className="mb-6 rounded-xl border border-white/10 bg-brand-dark/50 overflow-hidden">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-white/10 bg-brand-yellow/10">
            <h2 className="font-display font-black uppercase tracking-tight text-white text-sm sm:text-base">
              Base pricing <span className="text-brand-yellow">(per truck, full in &amp; out)</span>
            </h2>
            <p className="text-white/65 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Table rates only — <strong className="text-white/90">not your final price.</strong> Keep going: the next
              sections apply fleet-size savings, how often we visit, and optional contract discounts, then show your
              estimate.
            </p>
          </div>
          <div className="divide-y divide-white/10">
            {MANITOULIN_VEHICLE_ROWS.filter((r) => r.id !== 'other').map((r) => {
              const full = r.interior + r.exterior;
              return (
                <div
                  key={r.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 sm:px-5"
                >
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">{r.label}</div>
                    <div className="text-white/40 text-xs mt-0.5">{r.notes}</div>
                  </div>
                  <div className="font-display font-black text-brand-yellow text-lg tabular-nums">{formatCad(full)}</div>
                </div>
              );
            })}
          </div>
          <p className="px-4 sm:px-5 py-3 text-white/40 text-xs border-t border-white/10">
            Extreme conditions (heavy soiling, unusual access, extra time on site, or scope beyond a standard cab) may
            require an upcharge — we confirm after a walkthrough or photos.
          </p>
        </section>

        {/* One simple “how it works” */}
        <div className="mb-8 rounded-lg bg-white/[0.04] border border-white/10 px-4 py-4 text-sm text-white/70 space-y-2">
          <p className="font-display font-bold text-white text-xs uppercase tracking-wider">
            How discounts stack <span className="text-brand-yellow font-black">↓</span> on top of base pricing
          </p>
          <p>
            <strong className="text-white">1.</strong> Fleet size → <strong className="text-brand-yellow">5% off</strong>{' '}
            (1–60 trucks) or <strong className="text-brand-yellow">12% off</strong> (61+).
          </p>
          <p>
            <strong className="text-white">2.</strong> How often we visit → <strong className="text-brand-yellow">50% off</strong>{' '}
            if weekly, <strong className="text-brand-yellow">40% off</strong> if every 2 weeks, or{' '}
            <strong className="text-brand-yellow">30% off</strong> if monthly (each vs one regular-price visit).
          </p>
          <p>
            <strong className="text-white">3.</strong> Contract → <strong className="text-brand-yellow">8% off</strong> the
            total for 6 months, or <strong className="text-brand-yellow">13% off</strong> for 12 months.
          </p>
        </div>

        {/* Calculator */}
        <section className="rounded-xl border border-white/10 bg-brand-dark/60 p-4 sm:p-6 mb-8">
          <h2 className="font-display text-sm font-black uppercase tracking-wider text-white/50 mb-4">Your estimate</h2>

          <div className="space-y-3 mb-6">
            {lines.map((line) => {
              const row = MANITOULIN_VEHICLE_ROWS.find((r) => r.id === line.vehicleId);
              const isOther = line.vehicleId === 'other';
              const inPrice = row && !isOther ? formatCad(row.interior) : null;
              const outPrice = row && !isOther ? formatCad(row.exterior) : null;
              return (
              <div
                key={line.id}
                className="rounded-lg border border-white/10 bg-brand-black/40 p-3 space-y-3"
              >
                <div className="flex flex-wrap gap-2 items-end">
                  <label className="flex-1 min-w-[140px] block">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-1">
                      Truck type
                    </span>
                    <select
                      value={line.vehicleId}
                      onChange={(e) => updateLine(line.id, { vehicleId: e.target.value as ManitoulinVehicleId })}
                      className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
                    >
                      {MANITOULIN_VEHICLE_ROWS.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="w-20 block">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-1">#</span>
                    <input
                      type="number"
                      min={1}
                      max={999}
                      value={line.quantity}
                      onChange={(e) => updateLine(line.id, { quantity: Math.max(1, Number(e.target.value) || 1) })}
                      className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    disabled={lines.length <= 1}
                    className="text-xs text-white/35 hover:text-red-400 disabled:opacity-20 py-2"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={line.interior}
                      onChange={(e) => updateLine(line.id, { interior: e.target.checked })}
                      className="rounded border-white/30 bg-brand-black text-brand-yellow"
                    />
                    <span>
                      Inside{' '}
                      <span className="text-brand-yellow font-semibold tabular-nums">
                        {isOther ? 'custom' : inPrice ? `${inPrice}/truck` : '—'}
                      </span>
                    </span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={line.exterior}
                      onChange={(e) => updateLine(line.id, { exterior: e.target.checked })}
                      className="rounded border-white/30 bg-brand-black text-brand-yellow"
                    />
                    <span>
                      Outside{' '}
                      <span className="text-brand-yellow font-semibold tabular-nums">
                        {isOther ? 'custom' : outPrice ? `${outPrice}/truck` : '—'}
                      </span>
                    </span>
                  </label>
                </div>
                {line.quantity > 1 && row && !isOther && (line.interior || line.exterior) && (
                  <p className="text-[11px] text-white/40">
                    Row subtotal per visit:{' '}
                    <span className="text-white/55 tabular-nums font-medium">
                      {formatCad(
                        ((line.interior ? row.interior : 0) + (line.exterior ? row.exterior : 0)) * line.quantity
                      )}
                    </span>{' '}
                    <span className="text-white/35">
                      ({line.quantity} trucks
                      {line.interior && line.exterior
                        ? ` × ${formatCad(row.interior + row.exterior)}`
                        : line.interior
                          ? ` × ${formatCad(row.interior)} inside only`
                          : ` × ${formatCad(row.exterior)} outside only`}
                      )
                    </span>
                  </p>
                )}
              </div>
            );
            })}
            <button
              type="button"
              onClick={addLine}
              className="text-xs font-bold uppercase tracking-wide text-brand-yellow hover:underline"
            >
              + Add truck type
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-2">Fleet size</span>
              <div className="flex flex-col sm:flex-row gap-2">
                {(Object.keys(MANITOULIN_VOLUME) as ManitoulinFleetTier[]).map((id) => (
                  <label
                    key={id}
                    className={`flex-1 rounded-lg border px-3 py-2.5 cursor-pointer text-sm text-center ${
                      fleetTier === id ? 'border-brand-yellow bg-brand-yellow/10 text-white' : 'border-white/10 text-white/70'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fleetTier"
                      className="sr-only"
                      checked={fleetTier === id}
                      onChange={() => setFleetTier(id)}
                    />
                    {MANITOULIN_VOLUME[id].label}
                    <span className="block text-brand-yellow text-xs mt-0.5">−{MANITOULIN_VOLUME[id].discountPct}%</span>
                  </label>
                ))}
              </div>
              <p className="text-white/45 text-xs mt-2 leading-relaxed">
                Use a realistic guess for planning. A live agreement can follow the{' '}
                <strong className="text-white/75">units we actually service</strong> each round — we can align tiers or
                review counts if your active fleet size shifts, so you are not stuck to a number nobody can lock yet.
              </p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-2">Visit schedule</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(MANITOULIN_FREQUENCY) as ManitoulinFrequency[]).map((id) => {
                  const freq = MANITOULIN_FREQUENCY[id];
                  const disc =
                    id === 'once' ? (
                      <span className="text-brand-yellow font-bold tabular-nums">Regular price</span>
                    ) : (
                      <span className="text-brand-yellow font-bold tabular-nums">−{freq.vsListPct}%</span>
                    );
                  return (
                    <label
                      key={id}
                      className={`rounded-lg border px-2 py-2 cursor-pointer text-center text-xs sm:text-sm ${
                        frequency === id ? 'border-brand-yellow bg-brand-yellow/10 text-white' : 'border-white/10 text-white/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="frequency"
                        className="sr-only"
                        checked={frequency === id}
                        onChange={() => setFrequency(id)}
                      />
                      <span className="block leading-tight">{freq.label}</span>
                      <span className="block text-[11px] sm:text-xs mt-1">{disc}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className={frequency === 'once' ? 'opacity-40 pointer-events-none' : ''}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-2">
                Contract length
              </span>
              <div className="flex flex-col gap-2">
                <label
                  className={`rounded-lg border px-3 py-2 cursor-pointer text-sm flex items-center gap-2 ${
                    contract === 'none' ? 'border-brand-yellow/80 bg-brand-yellow/5' : 'border-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="contract"
                    checked={contract === 'none'}
                    onChange={() => setContract('none')}
                    disabled={frequency === 'once'}
                    className="text-brand-yellow"
                  />
                  No contract
                </label>
                {(Object.keys(MANITOULIN_CONTRACT) as (keyof typeof MANITOULIN_CONTRACT)[]).map((id) => (
                  <label
                    key={id}
                    className={`rounded-lg border px-3 py-2 cursor-pointer text-sm flex items-center gap-2 ${
                      contract === id ? 'border-brand-yellow/80 bg-brand-yellow/5' : 'border-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contract"
                      checked={contract === id}
                      onChange={() => setContract(id)}
                      disabled={frequency === 'once'}
                      className="text-brand-yellow"
                    />
                    {MANITOULIN_CONTRACT[id].label} — save {MANITOULIN_CONTRACT[id].discountPct}%
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-brand-yellow/20 bg-brand-black/50 p-4 text-sm space-y-0 divide-y divide-white/10">
            {summaryRows && !b.needsCustom ? (
              <>
                <div className="flex justify-between gap-3 py-2.5 first:pt-0">
                  <span className="text-white/60">Regular price — all trucks, one visit (before discounts)</span>
                  <span className="font-bold tabular-nums shrink-0 text-white">{formatCad(summaryRows.detailOneVisit!)}</span>
                </div>
                <div className="flex justify-between gap-3 py-2.5">
                  <span className="text-white/60">
                    Volume discount (−{summaryRows.volumeDiscountPct}%)
                  </span>
                  <span className="font-semibold tabular-nums shrink-0 text-emerald-400">
                    −{formatCad(summaryRows.volumeDiscountDollars)}
                  </span>
                </div>
                <div className="flex justify-between gap-3 py-2.5">
                  <span className="text-white/60">
                    {b.frequency === 'once'
                      ? 'Visit frequency (one-time — no repeat-visit discount)'
                      : `Visit-plan discount (−${summaryRows.frequencyDiscountPctVsFullPerVisit}% on the per-visit rate)`}
                  </span>
                  <span className="font-semibold tabular-nums shrink-0 text-emerald-400">
                    {summaryRows.frequencyDiscountDollars > 0
                      ? `−${formatCad(summaryRows.frequencyDiscountDollars)}`
                      : formatCad(0)}
                  </span>
                </div>
                <div className="flex justify-between gap-3 py-2.5">
                  <span className="text-white/60">Your cost each visit (after the two above)</span>
                  <span className="font-bold tabular-nums shrink-0 text-white">
                    {formatCad(summaryRows.perVisitAfterVolumeAndFrequency!)}
                  </span>
                </div>
                <div className="flex justify-between gap-3 py-2.5">
                  <span className="text-white/60">Visits in this period</span>
                  <span className="font-bold tabular-nums shrink-0 text-white">{b.visitCount}</span>
                </div>
                <div className="flex justify-between gap-3 py-2.5">
                  <span className="text-white/60">Subtotal for that period (visits × per visit)</span>
                  <span className="font-bold tabular-nums shrink-0 text-white">
                    {formatCad(summaryRows.periodSubtotal!)}
                  </span>
                </div>
                <div className="flex justify-between gap-3 py-2.5">
                  <span className="text-white/60">
                    {summaryRows.contractDiscountPct > 0
                      ? `Contract discount (−${summaryRows.contractDiscountPct}%)`
                      : 'Contract-term discount (none — select 6 or 12 months to apply)'}
                  </span>
                  <span className="font-semibold tabular-nums shrink-0 text-emerald-400">
                    {summaryRows.contractDiscountDollars > 0
                      ? `−${formatCad(summaryRows.contractDiscountDollars)}`
                      : formatCad(0)}
                  </span>
                </div>
                <div className="pt-4 pb-1">
                  <div className="flex justify-between items-start gap-3">
                    <span className="font-display font-black uppercase text-brand-yellow text-sm sm:text-base leading-tight pr-2">
                      {summaryRows.monthlyHeadlineTitle}
                    </span>
                    {b.frequency === 'once' ? (
                      <span className="font-display font-black text-xl sm:text-2xl text-brand-yellow tabular-nums shrink-0">
                        {formatCad(summaryRows.finalTotal!)}
                      </span>
                    ) : (
                      <span className="font-display font-black text-xl sm:text-2xl text-brand-yellow tabular-nums shrink-0 flex items-baseline gap-0.5">
                        {formatCad(summaryRows.monthlyAverage!)}
                        <span className="text-base sm:text-lg font-black">/mo</span>
                      </span>
                    )}
                  </div>
                  {summaryRows.periodTotalLabel != null &&
                    summaryRows.finalTotal != null &&
                    b.frequency !== 'once' && (
                      <p className="text-right mt-1.5 text-sm text-cyan-400/90 tabular-nums">
                        {summaryRows.periodTotalLabel}: {formatCad(summaryRows.finalTotal)}
                      </p>
                    )}
                </div>
              </>
            ) : (
              <p className="text-amber-200/80 text-xs py-2">
                Pick real truck types (not “Other”) to see the breakdown.
              </p>
            )}
            {summaryRows && input.contract === 'none' && frequency !== 'once' && (
              <p className="text-white/40 text-xs pt-3 border-t border-white/10">
                Save up to 5% by paying the year upfront.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-brand-dark/40 p-4 sm:p-6">
          <h2 className="font-display text-sm font-black uppercase tracking-wider text-white/50 mb-3">Email this estimate</h2>
          <form onSubmit={onSubmit} className="space-y-3 max-w-md">
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-1">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-1">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-1">Phone</span>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
              />
            </label>
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/35 block mb-1">Notes (optional)</span>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-brand-black border border-white/15 text-white text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/40"
              />
            </label>
            <button
              type="submit"
              disabled={!canSubmit || submitting}
              className="bg-brand-yellow text-brand-black px-6 py-3 font-black uppercase tracking-wider text-xs magnetic-cta disabled:opacity-40 w-full sm:w-auto"
            >
              {submitting ? 'Sending…' : 'Send to ShowRoom'}
            </button>
            {message && (
              <p className={`text-sm ${message.type === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ManitoulinTransportQuotePage;
