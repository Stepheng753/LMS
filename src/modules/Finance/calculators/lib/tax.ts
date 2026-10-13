// 2026 tax figures. Federal: IRS Rev. Proc. 2025-32 (Oct 2025) and the One Big Beautiful Bill Act.
// California: FTB 2026 indexed amounts (Oct 2026). First four CA thresholds are quoted by the FTB;
// the rest follow the same 3.4% indexing and match published tables. Full FTB schedules post in late December.

export type Status = 'single' | 'married';

export interface Bracket {
  upTo: number; // top of the bracket (Infinity for the last)
  rate: number; // percent
}

export const FED_BRACKETS: Record<Status, Bracket[]> = {
  single: [
    { upTo: 12400, rate: 10 },
    { upTo: 50400, rate: 12 },
    { upTo: 105700, rate: 22 },
    { upTo: 201775, rate: 24 },
    { upTo: 256225, rate: 32 },
    { upTo: 640600, rate: 35 },
    { upTo: Infinity, rate: 37 },
  ],
  married: [
    { upTo: 24800, rate: 10 },
    { upTo: 100800, rate: 12 },
    { upTo: 211400, rate: 22 },
    { upTo: 403550, rate: 24 },
    { upTo: 512450, rate: 32 },
    { upTo: 768700, rate: 35 },
    { upTo: Infinity, rate: 37 },
  ],
};

export const FED_STD_DEDUCTION: Record<Status, number> = { single: 16100, married: 32200 };

const CA_SINGLE: Bracket[] = [
  { upTo: 11456, rate: 1 },
  { upTo: 27157, rate: 2 },
  { upTo: 42861, rate: 4 },
  { upTo: 59498, rate: 6 },
  { upTo: 75197, rate: 8 },
  { upTo: 384109, rate: 9.3 },
  { upTo: 460927, rate: 10.3 },
  { upTo: 768213, rate: 11.3 },
  { upTo: Infinity, rate: 12.3 },
];

// California joint brackets are exactly double the single ones.
export const CA_BRACKETS: Record<Status, Bracket[]> = {
  single: CA_SINGLE,
  married: CA_SINGLE.map((b) => ({ ...b, upTo: b.upTo * 2 })),
};

export const CA_STD_DEDUCTION: Record<Status, number> = { single: 5900, married: 11800 };
export const CA_PERSONAL_CREDIT: Record<Status, number> = { single: 158, married: 316 };
export const CA_DEPENDENT_CREDIT = 491;
export const CA_SDI_RATE = 1.3; // percent, no wage cap since 2024

export const SS_RATE = 6.2;
export const SS_WAGE_BASE = 184500;
export const MEDICARE_RATE = 1.45;
export const ADDL_MEDICARE_RATE = 0.9;
export const ADDL_MEDICARE_THRESHOLD: Record<Status, number> = { single: 200000, married: 250000 };

export const CHILD_TAX_CREDIT = 2200; // per child under 17
export const OTHER_DEPENDENT_CREDIT = 500;

export interface BracketSlice {
  from: number;
  to: number; // top of bracket
  rate: number;
  amountInBracket: number;
  tax: number;
}

export function bracketTax(taxable: number, brackets: Bracket[]): { tax: number; slices: BracketSlice[] } {
  const slices: BracketSlice[] = [];
  let prev = 0;
  let tax = 0;
  const income = Math.max(0, taxable);
  for (const b of brackets) {
    const inBracket = Math.max(0, Math.min(income, b.upTo) - prev);
    const t = (inBracket * b.rate) / 100;
    slices.push({ from: prev, to: b.upTo, rate: b.rate, amountInBracket: inBracket, tax: t });
    tax += t;
    prev = b.upTo;
    if (income <= b.upTo) break;
  }
  return { tax, slices };
}

export function marginalRate(taxable: number, brackets: Bracket[]): number {
  const income = Math.max(0, taxable);
  for (const b of brackets) if (income <= b.upTo) return b.rate;
  return brackets[brackets.length - 1].rate;
}

export interface IncomeTax {
  taxableFed: number;
  federalBeforeCredits: number;
  childCredit: number;
  federal: number;
  federalSlices: BracketSlice[];
  federalMarginal: number;
  taxableCA: number;
  caBeforeCredits: number;
  caCredits: number;
  ca: number;
  caSlices: BracketSlice[];
  caMarginal: number;
}

export interface IncomeTaxInput {
  status: Status;
  fedIncome: number; // income after pre-tax deductions, before the standard deduction
  caIncome: number; // California income (HSA is NOT deducted in CA)
  kids?: number; // children under 17
  otherDependents?: number;
  itemizedFed?: number; // if larger than the standard deduction, used instead
  itemizedCA?: number;
}

export function incomeTax(i: IncomeTaxInput): IncomeTax {
  const kids = i.kids ?? 0;
  const others = i.otherDependents ?? 0;
  const fedDed = Math.max(FED_STD_DEDUCTION[i.status], i.itemizedFed ?? 0);
  const caDed = Math.max(CA_STD_DEDUCTION[i.status], i.itemizedCA ?? 0);
  const taxableFed = Math.max(0, i.fedIncome - fedDed);
  const fed = bracketTax(taxableFed, FED_BRACKETS[i.status]);

  // Child tax credit phases out $50 per $1,000 over $200k (single) / $400k (married), on AGI.
  const threshold = i.status === 'married' ? 400000 : 200000;
  const over = Math.max(0, i.fedIncome - threshold);
  const phaseOut = Math.ceil(over / 1000) * 50;
  const creditGross = kids * CHILD_TAX_CREDIT + others * OTHER_DEPENDENT_CREDIT;
  const childCredit = Math.min(fed.tax, Math.max(0, creditGross - phaseOut));

  const taxableCA = Math.max(0, i.caIncome - caDed);
  const ca = bracketTax(taxableCA, CA_BRACKETS[i.status]);
  const caCredits = CA_PERSONAL_CREDIT[i.status] + (kids + others) * CA_DEPENDENT_CREDIT;
  const caMhst = taxableCA > 1_000_000 ? (taxableCA - 1_000_000) * 0.01 : 0;
  const caTax = Math.max(0, ca.tax - caCredits) + caMhst;

  return {
    taxableFed,
    federalBeforeCredits: fed.tax,
    childCredit,
    federal: fed.tax - childCredit,
    federalSlices: fed.slices,
    federalMarginal: marginalRate(taxableFed, FED_BRACKETS[i.status]),
    taxableCA,
    caBeforeCredits: ca.tax + caMhst,
    caCredits: Math.min(caCredits, ca.tax),
    ca: caTax,
    caSlices: ca.slices,
    caMarginal: marginalRate(taxableCA, CA_BRACKETS[i.status]) + (taxableCA > 1_000_000 ? 1 : 0),
  };
}

// ---- FICA ----
export interface Fica {
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  total: number;
}

export function fica(ficaWages: number, status: Status): Fica {
  const w = Math.max(0, ficaWages);
  const ss = (Math.min(w, SS_WAGE_BASE) * SS_RATE) / 100;
  const med = (w * MEDICARE_RATE) / 100;
  const add = (Math.max(0, w - ADDL_MEDICARE_THRESHOLD[status]) * ADDL_MEDICARE_RATE) / 100;
  return { socialSecurity: ss, medicare: med, additionalMedicare: add, total: ss + med + add };
}

// ---- Self-employment (1099) ----
export interface SelfEmployment {
  netProfit: number;
  seBase: number;
  socialSecurity: number;
  medicare: number;
  seTax: number;
  halfSeDeduction: number;
  qbiDeduction: number;
  federal: number;
  ca: number;
  total: number;
  quarterly: number;
  taxableFed: number;
  taxableCA: number;
  childCredit: number;
}

export function selfEmployment(opts: {
  revenue: number;
  expenses: number;
  status: Status;
  kids?: number;
  qbi?: boolean;
  otherW2Wages?: number; // W-2 wages already using up Social Security wage base
}): SelfEmployment {
  const net = Math.max(0, opts.revenue - opts.expenses);
  const seBase = net * 0.9235;
  const ssRoom = Math.max(0, SS_WAGE_BASE - (opts.otherW2Wages ?? 0));
  const ss = Math.min(seBase, ssRoom) * 0.124;
  const med = seBase * 0.029;
  const seTax = ss + med;
  const half = seTax / 2;
  const w2 = opts.otherW2Wages ?? 0;
  const fedIncomeBeforeQbi = net - half + w2;
  const stdDed = FED_STD_DEDUCTION[opts.status];
  const taxableBeforeQbi = Math.max(0, fedIncomeBeforeQbi - stdDed);
  const qbiDeduction = opts.qbi ? Math.min(0.2 * Math.max(0, net - half), 0.2 * taxableBeforeQbi) : 0;
  const tax = incomeTax({ status: opts.status, fedIncome: fedIncomeBeforeQbi - qbiDeduction, caIncome: net - half + w2, kids: opts.kids });
  const total = seTax + tax.federal + tax.ca;
  return {
    netProfit: net,
    seBase,
    socialSecurity: ss,
    medicare: med,
    seTax,
    halfSeDeduction: half,
    qbiDeduction,
    federal: tax.federal,
    ca: tax.ca,
    total,
    quarterly: total / 4,
    taxableFed: tax.taxableFed,
    taxableCA: tax.taxableCA,
    childCredit: tax.childCredit,
  };
}

// ---- Long-term capital gains (federal, 2026) ----
export const LTCG_BRACKETS: Record<Status, { zeroTo: number; fifteenTo: number }> = {
  single: { zeroTo: 49450, fifteenTo: 545500 },
  married: { zeroTo: 98900, fifteenTo: 613700 },
};
