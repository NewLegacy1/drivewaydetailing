/**
 * Rough direct-cost model for Manitoulin-style fleet quotes (owner sanity checks).
 * Tune hours and rates to match your real stopwatch + payroll — not shown to clients.
 *
 * Default story: ~2.5 h @ $20/hr per day-cab full in+out (~$50 labor) + ~4% of ticket
 * (subscriptions, fuel, chems). Target ~50% gross margin on revenue after direct costs,
 * or at least $3k/mo profit on recurring deals.
 */

import type {
  ManitoulinLine,
  ManitoulinQuoteBreakdown,
  ManitoulinQuoteInput,
  ManitoulinVehicleId,
} from './manitoulinQuotePricing';

export const MANITOULIN_LABOR_ASSUMPTIONS = {
  wagePerHour: 20,
  /** Full interior + exterior hours per truck (adjust after time studies). */
  hoursFullInOutByType: {
    day_cab: 2.5,
    sleeper_standard: 3.1,
    sleeper_extended: 3.35,
    super_sleeper: 3.65,
    other: 3,
  } as const satisfies Record<ManitoulinVehicleId, number>,
  /** Share of full-service labor when only interior or only exterior is selected. */
  scopeLaborShare: { interiorOnly: 0.58, exteriorOnly: 0.42, both: 1 },
  /** Subscriptions + fuel + chemicals as % of revenue (e.g. 2% + 2%). */
  variableOverheadPctOfRevenue: 0.04,
  /** Aim for gross margin (after direct labor + variable OH) at or above this. */
  targetGrossMarginPct: 0.5,
  /** Minimum acceptable average monthly profit on recurring programs (CAD). */
  minMonthlyProfitCad: 3000,
} as const;

function laborHoursForLine(line: ManitoulinLine): number {
  if (line.vehicleId === 'other' || (!line.interior && !line.exterior)) return 0;
  const base = MANITOULIN_LABOR_ASSUMPTIONS.hoursFullInOutByType[line.vehicleId];
  const { interiorOnly, exteriorOnly, both } = MANITOULIN_LABOR_ASSUMPTIONS.scopeLaborShare;
  const scope =
    line.interior && line.exterior ? both : line.interior ? interiorOnly : exteriorOnly;
  return base * scope * Math.max(1, line.quantity);
}

/** Direct labor cost for one service visit (all rows). */
export function estimateLaborCostPerVisitCAD(lines: ManitoulinLine[]): number {
  let h = 0;
  for (const line of lines) {
    h += laborHoursForLine(line);
  }
  return Math.round(h * MANITOULIN_LABOR_ASSUMPTIONS.wagePerHour * 100) / 100;
}

export type ManitoulinEconomicsAnalysis = {
  revenuePeriod: number;
  visits: number;
  laborCostPeriod: number;
  overheadCostPeriod: number;
  directCostPeriod: number;
  grossProfitPeriod: number;
  grossMarginPct: number;
  /** Avg monthly profit for recurring; single-visit profit for one-time. */
  profitPerMonthEquivalent: number | null;
  periodMonths: number;
  /** ~50% gross margin after modeled direct costs. */
  passesTargetMargin: boolean;
  /** Your rule: OK if margin hits target OR recurring profit ≥ min/mo. */
  structureOk: boolean;
};

/**
 * Compares contract revenue (after discounts in the quote) to modeled direct cost.
 * One-time: periodMonths = 1, profitPerMonthEquivalent = that job’s profit (not annualized).
 */
export function analyzeManitoulinEconomics(
  input: ManitoulinQuoteInput,
  b: ManitoulinQuoteBreakdown
): ManitoulinEconomicsAnalysis | null {
  if (b.contractTotal == null || b.needsCustom) return null;

  const revenuePeriod = b.contractTotal;
  const visits = Math.max(1, b.visitCount);
  const laborPerVisit = estimateLaborCostPerVisitCAD(input.lines);
  const laborCostPeriod = Math.round(laborPerVisit * visits * 100) / 100;
  const overheadCostPeriod = Math.round(revenuePeriod * MANITOULIN_LABOR_ASSUMPTIONS.variableOverheadPctOfRevenue * 100) / 100;
  const directCostPeriod = Math.round((laborCostPeriod + overheadCostPeriod) * 100) / 100;
  const grossProfitPeriod = Math.round((revenuePeriod - directCostPeriod) * 100) / 100;
  const grossMarginPct = revenuePeriod > 0 ? grossProfitPeriod / revenuePeriod : 0;

  const isOnce = input.frequency === 'once';
  let periodMonths = 1;
  if (!isOnce) {
    if (input.contract === '6mo') periodMonths = 6;
    else periodMonths = 12; // 12mo or none (illustrative 12)
  }

  const profitPerMonthEquivalent =
    isOnce ? grossProfitPeriod : periodMonths > 0 ? Math.round((grossProfitPeriod / periodMonths) * 100) / 100 : null;

  const passesTargetMargin = grossMarginPct >= MANITOULIN_LABOR_ASSUMPTIONS.targetGrossMarginPct - 0.005;
  const meetsMinMonthly =
    !isOnce &&
    profitPerMonthEquivalent != null &&
    profitPerMonthEquivalent >= MANITOULIN_LABOR_ASSUMPTIONS.minMonthlyProfitCad - 0.01;
  const structureOk = passesTargetMargin || meetsMinMonthly;

  return {
    revenuePeriod,
    visits,
    laborCostPeriod,
    overheadCostPeriod,
    directCostPeriod,
    grossProfitPeriod,
    grossMarginPct,
    profitPerMonthEquivalent,
    periodMonths,
    passesTargetMargin,
    structureOk,
  };
}
