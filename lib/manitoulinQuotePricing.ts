/**
 * Proposed fleet pricing for Manitoulin Transport (transport truck focus).
 * Base anchors: day cab $270 ($150 in / $120 out), sleeper $360 ($240 in / $120 out).
 * Exterior held at $120 for Class 8 variants; larger cabs scale on interior time only.
 */

export type ManitoulinVehicleId =
  | 'day_cab'
  | 'sleeper_standard'
  | 'sleeper_extended'
  | 'super_sleeper'
  | 'other';

export const MANITOULIN_VEHICLE_ROWS: {
  id: ManitoulinVehicleId;
  label: string;
  notes: string;
  interior: number;
  exterior: number;
}[] = [
  {
    id: 'day_cab',
    label: 'Day cab',
    notes: 'No sleeper — highway tractor',
    interior: 150,
    exterior: 120,
  },
  {
    id: 'sleeper_standard',
    label: 'Sleeper cab',
    notes: 'Standard bunk / mid-roof sleeper',
    interior: 240,
    exterior: 120,
  },
  {
    id: 'sleeper_extended',
    label: 'Extended / high-roof sleeper',
    notes: 'Larger cabin footprint vs standard sleeper',
    interior: 265,
    exterior: 120,
  },
  {
    id: 'super_sleeper',
    label: 'Super sleeper / condo',
    notes: 'Maximum interior time — condo-style or oversized sleeper',
    interior: 295,
    exterior: 120,
  },
  { id: 'other', label: 'Other (custom scope)', notes: 'Quoted after walkthrough', interior: 0, exterior: 0 },
];

export type ManitoulinFleetTier = 'units_0_60' | 'units_61_plus';

export type ManitoulinFrequency = 'once' | 'weekly' | 'biweekly' | 'monthly';

export type ManitoulinContract = 'none' | '6mo' | '12mo';

export type ManitoulinLine = {
  id: string;
  vehicleId: ManitoulinVehicleId;
  quantity: number;
  interior: boolean;
  exterior: boolean;
};

export type ManitoulinQuoteInput = {
  lines: ManitoulinLine[];
  fleetTier: ManitoulinFleetTier;
  frequency: ManitoulinFrequency;
  contract: ManitoulinContract;
};

/** List (pre-volume) per full-service visit for one unit of that type. */
export function manitoulinListFullServiceTotal(vehicleId: ManitoulinVehicleId): number | null {
  const row = MANITOULIN_VEHICLE_ROWS.find((r) => r.id === vehicleId);
  if (!row || vehicleId === 'other') return null;
  return row.interior + row.exterior;
}

/**
 * Volume: 0–60 active units on program → 5% off list (committed regional density).
 * 61+ → 12% off list (national-scale fleet). Delta 7 pts at the threshold.
 */
export const MANITOULIN_VOLUME: Record<
  ManitoulinFleetTier,
  { multiplier: number; label: string; discountPct: number }
> = {
  units_0_60: { multiplier: 0.95, label: '1–60 trucks', discountPct: 5 },
  units_61_plus: { multiplier: 0.88, label: '61+ trucks', discountPct: 12 },
};

/**
 * Recurring plan rate (same structure as public fleet planner): more frequent service = lower effective $/visit
 * because visits stack over the year. One-time = full rate after volume.
 */
export const MANITOULIN_FREQUENCY: Record<
  ManitoulinFrequency,
  { multiplier: number; label: string; vsListPct: number }
> = {
  once: { multiplier: 1, label: 'One-time visit', vsListPct: 0 },
  weekly: { multiplier: 0.5, label: 'Weekly', vsListPct: 50 },
  biweekly: { multiplier: 0.6, label: 'Every 2 weeks', vsListPct: 40 },
  monthly: { multiplier: 0.7, label: 'Monthly', vsListPct: 30 },
};

/**
 * Loyalty on contract subtotal (after volume + frequency), only when not one-time.
 * Slightly softer than generic 10%/15% because volume + frequency already discount heavily.
 */
export const MANITOULIN_CONTRACT: Record<
  Exclude<ManitoulinContract, 'none'>,
  { months: number; discountPct: number; label: string }
> = {
  '6mo': { months: 6, discountPct: 8, label: '6-month commitment' },
  '12mo': { months: 12, discountPct: 13, label: '12-month commitment' },
};

function visitsInTerm(frequency: ManitoulinFrequency, months: number): number {
  switch (frequency) {
    case 'once':
      return 1;
    case 'weekly':
      return Math.round((months * 52) / 12);
    case 'biweekly':
      return Math.round((months * 26) / 12);
    case 'monthly':
      return months;
    default:
      return months;
  }
}

export type ManitoulinLineBreakdown = {
  vehicleId: ManitoulinVehicleId;
  label: string;
  quantity: number;
  interior: boolean;
  exterior: boolean;
  interiorUnit: number;
  exteriorUnit: number;
  lineListPerVisit: number | null;
  needsCustom: boolean;
};

export type ManitoulinQuoteBreakdown = {
  lines: ManitoulinLineBreakdown[];
  unitCount: number;
  fleetTier: ManitoulinFleetTier;
  fleetTierLabel: string;
  volumeMultiplier: number;
  volumeDiscountPct: number;
  frequency: ManitoulinFrequency;
  frequencyLabel: string;
  frequencyMultiplier: number;
  contract: ManitoulinContract;
  contractMonths: number;
  contractDiscountRate: number;
  visitCount: number;
  perVisitList: number | null;
  perVisitAfterVolume: number | null;
  perVisitEffective: number | null;
  subtotalBeforeContractDiscount: number | null;
  contractTotal: number | null;
  needsCustom: boolean;
};

export function countManitoulinUnits(lines: ManitoulinLineBreakdown[]): number {
  let n = 0;
  for (const l of lines) {
    if (l.lineListPerVisit != null && l.lineListPerVisit > 0) n += Math.max(1, l.quantity);
  }
  return n;
}

export function computeManitoulinQuote(input: ManitoulinQuoteInput): ManitoulinQuoteBreakdown {
  const lines: ManitoulinLineBreakdown[] = input.lines.map((line) => {
    const row = MANITOULIN_VEHICLE_ROWS.find((r) => r.id === line.vehicleId)!;
    const needsCustom = line.vehicleId === 'other' && (line.interior || line.exterior);
    const intU = line.interior ? (line.vehicleId === 'other' ? 0 : row.interior) : 0;
    const extU = line.exterior ? (line.vehicleId === 'other' ? 0 : row.exterior) : 0;
    let lineListPerVisit: number | null = null;
    if (line.interior || line.exterior) {
      if (line.vehicleId === 'other') lineListPerVisit = null;
      else lineListPerVisit = (intU + extU) * Math.max(1, line.quantity);
    } else lineListPerVisit = 0;
    return {
      vehicleId: line.vehicleId,
      label: row.label,
      quantity: line.quantity,
      interior: line.interior,
      exterior: line.exterior,
      interiorUnit: line.interior ? row.interior : 0,
      exteriorUnit: line.exterior ? row.exterior : 0,
      lineListPerVisit,
      needsCustom,
    };
  });

  const needsCustom = lines.some((l) => l.needsCustom || (l.lineListPerVisit === null && (l.interior || l.exterior)));

  let perVisitList = 0;
  let hasPriced = false;
  for (const l of lines) {
    if (l.lineListPerVisit != null && l.lineListPerVisit > 0) {
      perVisitList += l.lineListPerVisit;
      hasPriced = true;
    }
  }

  const vol = MANITOULIN_VOLUME[input.fleetTier];
  const freq = MANITOULIN_FREQUENCY[input.frequency];
  const isOnce = input.frequency === 'once';
  /** Months used for visit count; if recurring but no term picked yet, assume 12-mo illustration. */
  const monthsForVisits =
    isOnce ? 0 : input.contract === 'none' ? 12 : MANITOULIN_CONTRACT[input.contract].months;
  const contractDiscRate =
    isOnce || input.contract === 'none' ? 0 : MANITOULIN_CONTRACT[input.contract].discountPct / 100;
  const visitCount = isOnce ? 1 : visitsInTerm(input.frequency, monthsForVisits);
  const contractMonths = isOnce ? 0 : monthsForVisits;

  const perVisitListOrNull = !hasPriced && perVisitList === 0 ? null : perVisitList;
  const perVisitAfterVolume =
    perVisitListOrNull === null ? null : Math.round(perVisitListOrNull * vol.multiplier * 100) / 100;
  const perVisitEffective =
    perVisitAfterVolume === null ? null : Math.round(perVisitAfterVolume * freq.multiplier * 100) / 100;

  let subtotalBeforeContractDiscount: number | null = null;
  if (perVisitEffective != null && visitCount > 0) {
    subtotalBeforeContractDiscount = Math.round(perVisitEffective * visitCount * 100) / 100;
  }

  const contractTotal =
    subtotalBeforeContractDiscount == null
      ? null
      : Math.round(subtotalBeforeContractDiscount * (1 - contractDiscRate) * 100) / 100;

  const unitCount = countManitoulinUnits(lines);

  return {
    lines,
    unitCount,
    fleetTier: input.fleetTier,
    fleetTierLabel: vol.label,
    volumeMultiplier: vol.multiplier,
    volumeDiscountPct: vol.discountPct,
    frequency: input.frequency,
    frequencyLabel: freq.label,
    frequencyMultiplier: freq.multiplier,
    contract: input.contract,
    contractMonths: input.frequency === 'once' ? 0 : contractMonths,
    contractDiscountRate: contractDiscRate,
    visitCount,
    perVisitList: perVisitListOrNull,
    perVisitAfterVolume,
    perVisitEffective,
    subtotalBeforeContractDiscount,
    contractTotal,
    needsCustom: needsCustom || !hasPriced,
  };
}

export function formatCad(n: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);
}

/** Human-readable rows for the quote summary card (amounts in CAD). */
export type ManitoulinSummaryRows = {
  detailOneVisit: number | null;
  volumeDiscountDollars: number;
  volumeDiscountPct: number;
  afterVolumePerVisit: number | null;
  frequencyDiscountDollars: number;
  frequencyDiscountPctVsFullPerVisit: number;
  perVisitAfterVolumeAndFrequency: number | null;
  visitCount: number;
  periodSubtotal: number | null;
  contractDiscountDollars: number;
  contractDiscountPct: number;
  finalTotal: number | null;
  /** Months used for “monthly average” divisor (0 = one visit only). */
  monthlyDivisor: number;
  monthlyAverage: number | null;
  /** Left label for the primary (yellow) total line. */
  monthlyHeadlineTitle: string;
  /** Smaller cyan line: period total label (null for one-time). */
  periodTotalLabel: string | null;
};

export function getManitoulinSummaryRows(
  input: ManitoulinQuoteInput,
  b: ManitoulinQuoteBreakdown
): ManitoulinSummaryRows | null {
  if (b.perVisitList == null || b.needsCustom) return null;

  const afterVol = b.perVisitAfterVolume ?? b.perVisitList;
  const volumeDiscountDollars = Math.round((b.perVisitList - afterVol) * 100) / 100;

  const afterFreq = b.perVisitEffective ?? afterVol;
  const frequencyDiscountDollars = Math.round((afterVol - afterFreq) * 100) / 100;
  const frequencyDiscountPctVsFullPerVisit =
    afterVol > 0 ? Math.round((1 - afterFreq / afterVol) * 1000) / 10 : 0;

  const periodSubtotal = b.subtotalBeforeContractDiscount;
  const finalTotal = b.contractTotal;
  const contractDiscountDollars =
    periodSubtotal != null && finalTotal != null
      ? Math.round((periodSubtotal - finalTotal) * 100) / 100
      : 0;
  const contractDiscountPct = Math.round(b.contractDiscountRate * 1000) / 10;

  const isOnce = input.frequency === 'once';
  let monthlyDivisor = 0;
  let monthlyHeadlineTitle = '';
  let periodTotalLabel: string | null = null;

  if (isOnce) {
    monthlyDivisor = 0;
    monthlyHeadlineTitle = 'Total (single visit)';
    periodTotalLabel = null;
  } else if (input.contract === '6mo') {
    monthlyDivisor = 6;
    monthlyHeadlineTitle = 'Estimated per month';
    periodTotalLabel = '6-month total';
  } else if (input.contract === '12mo') {
    monthlyDivisor = 12;
    monthlyHeadlineTitle = 'Estimated per month';
    periodTotalLabel = 'Year total';
  } else {
    monthlyDivisor = 12;
    monthlyHeadlineTitle = 'Estimated per month';
    periodTotalLabel = '12-month total';
  }

  const monthlyAverage =
    !isOnce && monthlyDivisor > 0 && finalTotal != null
      ? Math.round((finalTotal / monthlyDivisor) * 100) / 100
      : null;

  return {
    detailOneVisit: b.perVisitList,
    volumeDiscountDollars,
    volumeDiscountPct: b.volumeDiscountPct,
    afterVolumePerVisit: b.perVisitAfterVolume,
    frequencyDiscountDollars,
    frequencyDiscountPctVsFullPerVisit,
    perVisitAfterVolumeAndFrequency: b.perVisitEffective,
    visitCount: b.visitCount,
    periodSubtotal,
    contractDiscountDollars,
    contractDiscountPct,
    finalTotal,
    monthlyDivisor,
    monthlyAverage,
    monthlyHeadlineTitle,
    periodTotalLabel,
  };
}

export function buildManitoulinSummaryText(
  input: ManitoulinQuoteInput,
  b: ManitoulinQuoteBreakdown,
  opts: { contactName?: string }
): string {
  const parts: string[] = [];
  parts.push('[MANITOULIN TRANSPORT — FLEET PROPOSAL]');
  parts.push(`Prepared for: Manitoulin Transport`);
  if (opts.contactName?.trim()) parts.push(`Contact: ${opts.contactName.trim()}`);
  parts.push('');
  parts.push('--- Fleet mix (per visit, list) ---');
  for (const l of b.lines) {
    if (!l.interior && !l.exterior) continue;
    const bits = [`${l.quantity}× ${l.label}`];
    if (l.interior) bits.push(l.vehicleId === 'other' ? 'interior (TBD)' : `in ${formatCad(l.interiorUnit)}`);
    if (l.exterior) bits.push(l.vehicleId === 'other' ? 'exterior (TBD)' : `out ${formatCad(l.exteriorUnit)}`);
    parts.push(bits.join(' · '));
  }
  parts.push('');
  parts.push(`Units in scope (volume count): ${b.unitCount}`);
  parts.push(`Volume tier: ${b.fleetTierLabel} (−${b.volumeDiscountPct}% vs list)`);
  parts.push(`Frequency: ${b.frequencyLabel} (plan × ${b.frequencyMultiplier})`);
  if (b.frequency === 'once') {
    parts.push('Contract: one-time (no term loyalty discount)');
  } else {
    parts.push(
      `Term: ${input.contract === 'none' ? 'not selected' : MANITOULIN_CONTRACT[input.contract].label} (−${Math.round(b.contractDiscountRate * 100)}% on contract subtotal)`
    );
    parts.push(`Indicative visits in term: ${b.visitCount}`);
  }
  if (b.perVisitList != null) parts.push(`Per visit (list, all lines): ${formatCad(b.perVisitList)}`);
  if (b.perVisitAfterVolume != null && b.volumeMultiplier < 1) {
    parts.push(`Per visit after volume: ${formatCad(b.perVisitAfterVolume)}`);
  }
  if (b.perVisitEffective != null) {
    parts.push(`Per visit effective (after plan frequency): ${formatCad(b.perVisitEffective)}`);
  }
  if (b.subtotalBeforeContractDiscount != null) {
    parts.push(`Subtotal before term discount: ${formatCad(b.subtotalBeforeContractDiscount)}`);
  }
  if (b.contractTotal != null && !b.needsCustom) {
    parts.push(`Indicative contract / scenario total: ${formatCad(b.contractTotal)}`);
    const sr = getManitoulinSummaryRows(input, b);
    if (sr && b.frequency !== 'once' && sr.monthlyAverage != null) {
      parts.push(`Estimated per month: ${formatCad(sr.monthlyAverage)}`);
    }
  }
  if (b.needsCustom) parts.push('Note: Custom line(s) — totals partial until scoped.');
  parts.push('');
  parts.push('All figures indicative CAD; final pricing after fleet walkthrough and facility access confirmation.');
  return parts.join('\n');
}
