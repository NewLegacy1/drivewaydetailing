export type FleetVehicleId =
  | 'transport_truck'
  | 'transport_sleeper'
  | 'car'
  | 'suv'
  | 'van_cab'
  | 'van_cab_back'
  | 'truck_single'
  | 'truck_dual'
  | 'other';

export const FLEET_VEHICLE_OPTIONS: {
  id: FleetVehicleId;
  label: string;
  shortLabel: string;
}[] = [
  { id: 'transport_truck', label: 'Transport truck (day cab)', shortLabel: 'Transport truck' },
  { id: 'transport_sleeper', label: 'Transport truck with sleeper', shortLabel: 'Transport + sleeper' },
  { id: 'car', label: 'Car', shortLabel: 'Car' },
  { id: 'suv', label: 'SUV', shortLabel: 'SUV' },
  { id: 'van_cab', label: 'Van (cab only)', shortLabel: 'Van cab' },
  { id: 'van_cab_back', label: 'Van (cab + rear)', shortLabel: 'Van cab + back' },
  { id: 'truck_single', label: 'Pickup truck (single cab)', shortLabel: 'Truck single cab' },
  { id: 'truck_dual', label: 'Pickup truck (reg / dual cab)', shortLabel: 'Truck reg/dual' },
  { id: 'other', label: 'Other (custom quote)', shortLabel: 'Other' },
];

export type FleetFrequency = 'once' | 'weekly' | 'biweekly' | 'monthly' | 'bimonthly';

export type FleetContractLength = '6mo' | '12mo';

export type FleetQuoteLine = {
  id: string;
  vehicleId: FleetVehicleId;
  quantity: number;
  interior: boolean;
  exterior: boolean;
};

export type FleetQuoteInput = {
  lines: FleetQuoteLine[];
  frequency: FleetFrequency;
  contractLength: FleetContractLength;
};

const INTERIOR_BASE: Record<Exclude<FleetVehicleId, 'other'>, number> = {
  transport_truck: 180,
  transport_sleeper: 230,
  car: 180,
  suv: 200,
  van_cab: 150,
  van_cab_back: 250,
  truck_single: 150,
  truck_dual: 200,
};

/** Exterior uses same price for transport + sleeper (sleeper not priced separately). */
const EXTERIOR_BASE: Partial<Record<FleetVehicleId, number>> = {
  transport_truck: 130,
  transport_sleeper: 130,
  car: 50,
  suv: 60,
  van_cab: 70,
  van_cab_back: 70,
  truck_single: 80,
  truck_dual: 80,
};

const FREQUENCY_LABEL: Record<FleetFrequency, string> = {
  once: 'One-time',
  weekly: 'Weekly',
  biweekly: 'Biweekly',
  monthly: 'Monthly',
  bimonthly: 'Bimonthly',
};

/** Customer pays this fraction of per-visit base (discount baked in). One-time = full list rate. */
const FREQUENCY_PAY_MULTIPLIER: Record<FleetFrequency, number> = {
  once: 1,
  weekly: 0.5,
  biweekly: 0.6,
  monthly: 0.7,
  bimonthly: 0.85,
};

const CONTRACT_MONTHS: Record<FleetContractLength, number> = {
  '6mo': 6,
  '12mo': 12,
};

const CONTRACT_DISCOUNT: Record<FleetContractLength, number> = {
  '6mo': 0.1,
  '12mo': 0.15,
};

function visitsInContract(frequency: FleetFrequency, months: number): number {
  switch (frequency) {
    case 'once':
      return 1;
    case 'weekly':
      return Math.round((months * 52) / 12);
    case 'biweekly':
      return Math.round((months * 26) / 12);
    case 'monthly':
      return months;
    case 'bimonthly':
      return Math.max(1, Math.round(months / 2));
    default:
      return months;
  }
}

export function getInteriorUnitPrice(vehicleId: FleetVehicleId): number | null {
  if (vehicleId === 'other') return null;
  return INTERIOR_BASE[vehicleId];
}

export function getExteriorUnitPrice(vehicleId: FleetVehicleId): number | null {
  if (vehicleId === 'other') return null;
  const v = EXTERIOR_BASE[vehicleId];
  return typeof v === 'number' ? v : null;
}

export type FleetLineBreakdown = {
  vehicleId: FleetVehicleId;
  label: string;
  quantity: number;
  interior: boolean;
  exterior: boolean;
  interiorUnit: number | null;
  exteriorUnit: number | null;
  linePerVisit: number | null;
  needsCustom: boolean;
};

/** Total vehicles in scope: sum of quantities on priced rows (interior and/or exterior, non-custom). */
export function countFleetUnitsForVolume(lines: FleetLineBreakdown[]): number {
  let n = 0;
  for (const l of lines) {
    if (l.linePerVisit !== null && l.linePerVisit > 0) {
      n += Math.max(1, l.quantity);
    }
  }
  return n;
}

/** 1–10 regular, 11–20 → 10% off, 21+ → 15% off (applied to per-visit subtotal before plan frequency). */
export function fleetVolumeMultiplier(totalUnits: number): { multiplier: number; tierLabel: string } {
  if (totalUnits <= 0) return { multiplier: 1, tierLabel: '—' };
  if (totalUnits <= 10) return { multiplier: 1, tierLabel: 'Fleet 1–10 units (regular)' };
  if (totalUnits <= 20) return { multiplier: 0.9, tierLabel: 'Fleet 11–20 units (10% off)' };
  return { multiplier: 0.85, tierLabel: 'Fleet 21+ units (15% off)' };
}

export type FleetQuoteBreakdown = {
  lines: FleetLineBreakdown[];
  needsCustom: boolean;
  fleetUnitCount: number;
  volumeTierLabel: string;
  volumeMultiplier: number;
  perVisitBase: number | null;
  perVisitAfterVolume: number | null;
  frequency: FleetFrequency;
  frequencyLabel: string;
  frequencyPayMultiplier: number;
  perVisitAfterFrequency: number | null;
  contractLength: FleetContractLength;
  contractMonths: number;
  visitCount: number;
  subtotalBeforeContractDiscount: number | null;
  contractDiscountRate: number;
  contractTotal: number | null;
};

export function computeFleetQuote(input: FleetQuoteInput): FleetQuoteBreakdown {
  const lines: FleetLineBreakdown[] = input.lines.map((line) => {
    const opt = FLEET_VEHICLE_OPTIONS.find((o) => o.id === line.vehicleId);
    const label = opt?.label ?? line.vehicleId;
    const intU = line.interior ? getInteriorUnitPrice(line.vehicleId) : 0;
    const extU = line.exterior ? getExteriorUnitPrice(line.vehicleId) : 0;
    const needsCustom = line.vehicleId === 'other' && (line.interior || line.exterior);
    const intVal = line.interior ? intU : 0;
    const extVal = line.exterior ? extU : 0;
    let linePerVisit: number | null = null;
    if (line.interior || line.exterior) {
      if (line.vehicleId === 'other') {
        linePerVisit = null;
      } else {
        const a = typeof intVal === 'number' ? intVal : 0;
        const b = typeof extVal === 'number' ? extVal : 0;
        if (line.interior && intU === null) linePerVisit = null;
        else if (line.exterior && extU === null) linePerVisit = null;
        else linePerVisit = (a + b) * Math.max(1, line.quantity);
      }
    } else {
      linePerVisit = 0;
    }
    return {
      vehicleId: line.vehicleId,
      label,
      quantity: line.quantity,
      interior: line.interior,
      exterior: line.exterior,
      interiorUnit: line.interior ? intU : null,
      exteriorUnit: line.exterior ? extU : null,
      linePerVisit,
      needsCustom,
    };
  });

  const needsCustom = lines.some((l) => l.needsCustom || (l.linePerVisit === null && (l.interior || l.exterior)));

  let perVisitBase = 0;
  let hasPricedLine = false;
  for (const l of lines) {
    if (l.linePerVisit !== null && l.linePerVisit > 0) {
      perVisitBase += l.linePerVisit;
      hasPricedLine = true;
    }
  }

  const freqMult = FREQUENCY_PAY_MULTIPLIER[input.frequency];
  const months = CONTRACT_MONTHS[input.contractLength];
  const visitCount = visitsInContract(input.frequency, months);
  const contractDisc =
    input.frequency === 'once' ? 0 : CONTRACT_DISCOUNT[input.contractLength];

  const fleetUnitCount = countFleetUnitsForVolume(lines);
  const { multiplier: volMult, tierLabel: volumeTierLabel } = fleetVolumeMultiplier(fleetUnitCount);

  const perVisitBaseOrNull = !hasPricedLine && perVisitBase === 0 ? null : perVisitBase;
  const perVisitAfterVolume =
    perVisitBaseOrNull === null ? null : Math.round(perVisitBaseOrNull * volMult * 100) / 100;
  const perVisitAfterFrequency =
    perVisitAfterVolume === null ? null : Math.round(perVisitAfterVolume * freqMult * 100) / 100;
  const subtotalBeforeContractDiscount =
    perVisitAfterFrequency === null ? null : Math.round(perVisitAfterFrequency * visitCount * 100) / 100;
  const contractTotal =
    subtotalBeforeContractDiscount === null
      ? null
      : Math.round(subtotalBeforeContractDiscount * (1 - contractDisc) * 100) / 100;

  const needsAnySelection = hasPricedLine || lines.some((l) => l.interior || l.exterior);

  return {
    lines,
    needsCustom: needsCustom || !hasPricedLine || !needsAnySelection,
    fleetUnitCount,
    volumeTierLabel,
    volumeMultiplier: volMult,
    perVisitBase: perVisitBaseOrNull,
    perVisitAfterVolume,
    frequency: input.frequency,
    frequencyLabel: FREQUENCY_LABEL[input.frequency],
    frequencyPayMultiplier: freqMult,
    perVisitAfterFrequency,
    contractLength: input.contractLength,
    contractMonths: months,
    visitCount,
    subtotalBeforeContractDiscount,
    contractDiscountRate: contractDisc,
    contractTotal,
  };
}

export function formatCad(n: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);
}

export function buildFleetQuoteSummaryText(
  input: FleetQuoteInput,
  breakdown: FleetQuoteBreakdown,
  opts: { cityLabel: string; company?: string }
): string {
  const parts: string[] = [];
  parts.push('[FLEET QUOTE REQUEST]');
  parts.push(`Service area: ${opts.cityLabel}`);
  if (opts.company?.trim()) parts.push(`Company: ${opts.company.trim()}`);
  parts.push('');
  parts.push('--- Vehicles ---');
  for (const l of breakdown.lines) {
    if (!l.interior && !l.exterior) continue;
    const bits: string[] = [];
    bits.push(`${l.quantity}× ${l.label}`);
    if (l.interior) bits.push(l.interiorUnit != null ? `interior ${formatCad(l.interiorUnit)}/unit` : 'interior (custom)');
    if (l.exterior) bits.push(l.exteriorUnit != null ? `exterior ${formatCad(l.exteriorUnit)}/unit` : 'exterior (custom)');
    parts.push(bits.join(' · '));
  }
  parts.push('');
  parts.push(`Fleet units (volume tier): ${breakdown.fleetUnitCount} — ${breakdown.volumeTierLabel}`);
  parts.push(`Frequency: ${breakdown.frequencyLabel} (plan rate × ${breakdown.frequencyPayMultiplier})`);
  if (breakdown.frequency === 'once') {
    parts.push('Contract: one-time visit (no loyalty term discount)');
  } else {
    parts.push(
      `Contract: ${breakdown.contractMonths} mo (${Math.round(breakdown.contractDiscountRate * 100)}% loyalty discount)`
    );
  }
  parts.push(`Visits in scope (indicative): ${breakdown.visitCount}`);
  if (breakdown.perVisitBase != null) {
    parts.push(`Per visit (list, before volume): ${formatCad(breakdown.perVisitBase)}`);
  }
  if (breakdown.perVisitAfterVolume != null && breakdown.volumeMultiplier !== 1) {
    parts.push(`Per visit (after fleet volume): ${formatCad(breakdown.perVisitAfterVolume)}`);
  }
  if (breakdown.perVisitAfterFrequency != null) {
    parts.push(`Per visit (after plan frequency): ${formatCad(breakdown.perVisitAfterFrequency)}`);
  }
  if (breakdown.subtotalBeforeContractDiscount != null) {
    parts.push(`Subtotal before contract discount: ${formatCad(breakdown.subtotalBeforeContractDiscount)}`);
  }
  if (breakdown.contractTotal != null && !breakdown.needsCustom) {
    parts.push(`Indicative contract total: ${formatCad(breakdown.contractTotal)}`);
  }
  if (breakdown.needsCustom) {
    parts.push('Note: One or more lines need custom pricing — total shown is partial or N/A.');
  }
  parts.push('');
  parts.push('Final pricing confirmed after fleet walkthrough.');
  return parts.join('\n');
}
