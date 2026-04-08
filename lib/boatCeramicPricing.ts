/**
 * Indicative marine ceramic coating math — REPLACE bracket bases and add-on rates with your real pricing.
 */

export type BoatHullType = 'open_bow' | 'cuddy' | 'pontoon' | 'cruiser' | 'other';

export type BoatCondition = 'good' | 'light_oxidation' | 'heavy_oxidation';

export type BoatCeramicQuoteInput = {
  loaFt: number;
  hullType: BoatHullType;
  scopeHull: boolean;
  scopeDeck: boolean;
  scopeTopside: boolean;
  scopeBrightwork: boolean;
  condition: BoatCondition;
};

export type BoatCeramicBreakdown = {
  bracketLabel: string;
  baseFromLength: number | null;
  hullMultiplier: number | null;
  hullTypeLabel: string;
  scopeHull: boolean;
  scopeDeck: boolean;
  scopeTopside: boolean;
  scopeBrightwork: boolean;
  deckAdd: number;
  topsideAdd: number;
  brightworkAdd: number;
  conditionLabel: string;
  conditionSurchargeRate: number;
  conditionSurcharge: number;
  subtotalBeforeCondition: number | null;
  indicativeTotal: number | null;
  needsCustom: boolean;
};

/** CAD — placeholder: base includes hull gelcoat / sides ceramic for that size class. */
const LENGTH_BRACKETS: { maxFt: number; label: string; baseCad: number }[] = [
  { maxFt: 24, label: 'Up to 24 ft LOA', baseCad: 1450 },
  { maxFt: 35, label: '24–35 ft LOA', baseCad: 2250 },
  { maxFt: 45, label: '35–45 ft LOA', baseCad: 3350 },
  { maxFt: Infinity, label: 'Over 45 ft LOA', baseCad: 4950 },
];

const HULL_TYPE: Record<
  BoatHullType,
  { label: string; multiplier: number | null }
> = {
  open_bow: { label: 'Open bow / runabout', multiplier: 1 },
  cuddy: { label: 'Cuddy / walkaround', multiplier: 1.08 },
  pontoon: { label: 'Pontoon / tri-toon', multiplier: 1.12 },
  cruiser: { label: 'Cruiser / express', multiplier: 1.18 },
  other: { label: 'Other (custom)', multiplier: null },
};

const CONDITION: Record<BoatCondition, { label: string; prepSurcharge: number }> = {
  good: { label: 'Good — light wash prep', prepSurcharge: 0 },
  light_oxidation: { label: 'Light oxidation / dull gelcoat', prepSurcharge: 0.1 },
  heavy_oxidation: { label: 'Heavy oxidation / correction likely', prepSurcharge: 0.25 },
};

/** Share of running subtotal for optional areas (placeholders). */
const DECK_PCT = 0.18;
const TOPSIDE_PCT = 0.12;
const BRIGHTWORK_FLAT_CAD = 350;

export function baseForLoa(loaFt: number): { base: number; label: string } | null {
  if (!Number.isFinite(loaFt) || loaFt <= 0) return null;
  for (const b of LENGTH_BRACKETS) {
    if (loaFt <= b.maxFt) return { base: b.baseCad, label: b.label };
  }
  return null;
}

export function computeBoatCeramicQuote(input: BoatCeramicQuoteInput): BoatCeramicBreakdown {
  const hullMeta = HULL_TYPE[input.hullType];
  const needsCustom = input.hullType === 'other' || !input.scopeHull;

  const len = baseForLoa(input.loaFt);
  const baseFromLength = len?.base ?? null;
  const bracketLabel = len?.label ?? '—';

  const hullMult = hullMeta.multiplier;
  let running: number | null =
    baseFromLength != null && hullMult != null && input.scopeHull
      ? Math.round(baseFromLength * hullMult * 100) / 100
      : null;

  let deckAdd = 0;
  let topsideAdd = 0;
  let brightworkAdd = 0;

  if (running != null && input.scopeDeck) {
    deckAdd = Math.round(running * DECK_PCT * 100) / 100;
    running += deckAdd;
  }
  if (running != null && input.scopeTopside) {
    topsideAdd = Math.round(running * TOPSIDE_PCT * 100) / 100;
    running += topsideAdd;
  }
  if (running != null && input.scopeBrightwork) {
    brightworkAdd = BRIGHTWORK_FLAT_CAD;
    running += brightworkAdd;
  }

  const cond = CONDITION[input.condition];
  const conditionSurchargeRate = cond.prepSurcharge;
  const subtotalBeforeCondition = running;
  const conditionSurcharge =
    subtotalBeforeCondition != null && conditionSurchargeRate > 0
      ? Math.round(subtotalBeforeCondition * conditionSurchargeRate * 100) / 100
      : 0;
  const indicativeTotal =
    subtotalBeforeCondition != null
      ? Math.round((subtotalBeforeCondition + conditionSurcharge) * 100) / 100
      : null;

  return {
    bracketLabel,
    baseFromLength,
    hullMultiplier: hullMult,
    hullTypeLabel: hullMeta.label,
    scopeHull: input.scopeHull,
    scopeDeck: input.scopeDeck,
    scopeTopside: input.scopeTopside,
    scopeBrightwork: input.scopeBrightwork,
    deckAdd,
    topsideAdd,
    brightworkAdd,
    conditionLabel: cond.label,
    conditionSurchargeRate,
    conditionSurcharge,
    subtotalBeforeCondition,
    indicativeTotal: needsCustom ? null : indicativeTotal,
    needsCustom,
  };
}

export function formatCad(n: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);
}

export function buildBoatQuoteSummaryText(
  input: BoatCeramicQuoteInput,
  breakdown: BoatCeramicBreakdown,
  opts: { cityLabel: string; marinaOrSlip?: string }
): string {
  const parts: string[] = [];
  parts.push('[BOAT CERAMIC COATING QUOTE REQUEST]');
  parts.push(`Service area: ${opts.cityLabel}`);
  if (opts.marinaOrSlip?.trim()) parts.push(`Marina / storage: ${opts.marinaOrSlip.trim()}`);
  parts.push('');
  parts.push('--- Vessel ---');
  parts.push(`LOA: ${input.loaFt} ft (${breakdown.bracketLabel})`);
  parts.push(`Hull type: ${breakdown.hullTypeLabel}`);
  parts.push('');
  parts.push('--- Scope ---');
  parts.push(`Hull / gelcoat sides: ${input.scopeHull ? 'Yes' : 'No'}`);
  parts.push(`Deck / non-skid: ${input.scopeDeck ? `Yes (+${formatCad(breakdown.deckAdd)})` : 'No'}`);
  parts.push(`Topside / rails / cabin: ${input.scopeTopside ? `Yes (+${formatCad(breakdown.topsideAdd)})` : 'No'}`);
  parts.push(`Brightwork / metal: ${input.scopeBrightwork ? `Yes (+${formatCad(breakdown.brightworkAdd)})` : 'No'}`);
  parts.push('');
  parts.push(`Condition / prep: ${breakdown.conditionLabel}`);
  if (breakdown.conditionSurcharge > 0) {
    parts.push(`Prep surcharge: ${formatCad(breakdown.conditionSurcharge)}`);
  }
  parts.push('');
  if (breakdown.baseFromLength != null) {
    parts.push(`Length base (placeholder): ${formatCad(breakdown.baseFromLength)}`);
  }
  if (breakdown.subtotalBeforeCondition != null && !breakdown.needsCustom) {
    parts.push(`Subtotal before prep surcharge: ${formatCad(breakdown.subtotalBeforeCondition)}`);
  }
  if (breakdown.indicativeTotal != null) {
    parts.push(`Indicative total: ${formatCad(breakdown.indicativeTotal)}`);
  } else {
    parts.push('Indicative total: Custom quote (hull type or scope requires review)');
  }
  parts.push('');
  parts.push('Final pricing confirmed after vessel inspection.');
  return parts.join('\n');
}
