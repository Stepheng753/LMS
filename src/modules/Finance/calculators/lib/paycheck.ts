import { CA_SDI_RATE, fica, incomeTax, Status } from './tax';

export const LIMIT_401K = 24500; // 2026 employee deferral limit
export const LIMIT_HSA_SELF = 4400;
export const LIMIT_HSA_FAMILY = 8750;
export const LIMIT_FSA = 3400;
export const LIMIT_IRA = 7500;

export interface PaycheckInput {
  salary: number;
  periods: number; // paychecks per year: 26, 24, 12, 52
  status: Status;
  kids: number; // under 17
  otherDependents: number;
  trad401k: number; // annual $, pre-tax
  roth401k: number; // annual $, after-tax
  matchPct: number; // employer match, % of salary (free money, pre-tax)
  healthPremium: number; // YOUR share, per paycheck (pre-tax)
  dentalVision: number; // per paycheck (pre-tax)
  hsa: number; // annual $
  fsa: number; // annual $
  otherIncome: number; // taxable income with no withholding (interest, side work)
  extraWithholding: number; // extra federal $ per paycheck (W-4 line 4c)
}

export const DEFAULT_PAYCHECK: PaycheckInput = {
  salary: 100000,
  periods: 26,
  status: 'single',
  kids: 0,
  otherDependents: 0,
  trad401k: 0,
  roth401k: LIMIT_401K,
  matchPct: 4,
  healthPremium: 150,
  dentalVision: 25,
  hsa: 0,
  fsa: 0,
  otherIncome: 0,
  extraWithholding: 0,
};

export interface PaycheckResult {
  gross: number;
  sec125: number; // premiums + FSA + HSA (pre-tax benefits)
  fedWages: number; // income-tax wages (after pre-tax benefits and traditional 401k)
  ficaWages: number;
  caWages: number; // HSA is taxed in California
  ss: number;
  medicare: number;
  addlMedicare: number;
  federalTaxWages: number; // tax on wages only (what withholding aims at)
  caTaxWages: number;
  sdi: number;
  federalActual: number; // tax on wages + other income
  caActual: number;
  roth401k: number;
  trad401k: number;
  employerMatch: number;
  takeHomeAnnual: number;
  takeHomePerCheck: number;
  withheldFed: number;
  withheldCA: number;
  owedOrRefund: number; // positive = refund
  taxableFed: number;
  taxableCA: number;
  federalMarginal: number;
  caMarginal: number;
  childCredit: number;
  totalTaxes: number;
  effectiveRate: number; // percent of gross
  perCheck: {
    gross: number;
    health: number;
    hsaFsa: number;
    trad401k: number;
    roth401k: number;
    fed: number;
    ss: number;
    medicare: number;
    ca: number;
    sdi: number;
    net: number;
  };
  investedPerYear: number; // 401k + HSA + match
}

export function computePaycheck(p: PaycheckInput): PaycheckResult {
  const premiums = (p.healthPremium + p.dentalVision) * p.periods;
  const sec125 = premiums + p.fsa + p.hsa;
  const ficaWages = Math.max(0, p.salary - sec125);
  const fedWages = Math.max(0, p.salary - sec125 - p.trad401k);
  const caWages = Math.max(0, p.salary - (premiums + p.fsa) - p.trad401k); // HSA not deductible in CA

  const f = fica(ficaWages, p.status);
  const wagesOnly = incomeTax({ status: p.status, fedIncome: fedWages, caIncome: caWages, kids: p.kids, otherDependents: p.otherDependents });
  const withOther = incomeTax({
    status: p.status,
    fedIncome: fedWages + p.otherIncome,
    caIncome: caWages + p.otherIncome,
    kids: p.kids,
    otherDependents: p.otherDependents,
  });
  const sdi = (ficaWages * CA_SDI_RATE) / 100;

  const extra = p.extraWithholding * p.periods;
  const withheldFed = wagesOnly.federal + extra;
  const withheldCA = wagesOnly.ca;
  const actualFed = withOther.federal;
  const actualCA = withOther.ca;

  // Money you actually receive: gross - pre-tax benefits - 401k - taxes withheld - FICA - SDI.
  const takeHomeAnnual =
    p.salary - sec125 - p.trad401k - p.roth401k - withheldFed - withheldCA - f.total - sdi;
  const totalTaxes = withheldFed + withheldCA + f.total + sdi;
  const refund = withheldFed + withheldCA - (actualFed + actualCA);

  const n = p.periods;
  return {
    gross: p.salary,
    sec125,
    fedWages,
    ficaWages,
    caWages,
    ss: f.socialSecurity,
    medicare: f.medicare,
    addlMedicare: f.additionalMedicare,
    federalTaxWages: wagesOnly.federal,
    caTaxWages: wagesOnly.ca,
    sdi,
    federalActual: actualFed,
    caActual: actualCA,
    roth401k: p.roth401k,
    trad401k: p.trad401k,
    employerMatch: Math.min((p.matchPct / 100) * p.salary, p.trad401k + p.roth401k),
    takeHomeAnnual,
    takeHomePerCheck: takeHomeAnnual / n,
    withheldFed,
    withheldCA,
    owedOrRefund: refund,
    taxableFed: wagesOnly.taxableFed,
    taxableCA: wagesOnly.taxableCA,
    federalMarginal: wagesOnly.federalMarginal,
    caMarginal: wagesOnly.caMarginal,
    childCredit: wagesOnly.childCredit,
    totalTaxes,
    effectiveRate: (totalTaxes / p.salary) * 100,
    perCheck: {
      gross: p.salary / n,
      health: premiums / n,
      hsaFsa: (p.hsa + p.fsa) / n,
      trad401k: p.trad401k / n,
      roth401k: p.roth401k / n,
      fed: withheldFed / n,
      ss: f.socialSecurity / n,
      medicare: (f.medicare + f.additionalMedicare) / n,
      ca: withheldCA / n,
      sdi: sdi / n,
      net: takeHomeAnnual / n,
    },
    investedPerYear: p.trad401k + p.roth401k + p.hsa,
  };
}
