export interface MortgageInput {
  price: number;
  downPct: number; // percent
  rate: number; // APR percent
  years: number; // term
  propertyTaxPct: number; // % of assessed value per year (CA: 1% + local, ~1.1-1.25%)
  insuranceYear: number; // $/yr (HO-6 for a condo, homeowners for a house)
  hoaMonth: number;
  maintenancePct: number; // % of home value per year
  pmiPct: number; // % of loan per year while loan > 80% of price
  appreciation: number; // % per year
  assessedGrowth: number; // % per year, Prop 13 cap is 2%
  closingPct: number; // % of price paid at closing
  sellingPct: number; // % of value lost when selling
}

export const DEFAULT_MORTGAGE: MortgageInput = {
  price: 500000,
  downPct: 20,
  rate: 6.5,
  years: 30,
  propertyTaxPct: 1.15,
  insuranceYear: 700,
  hoaMonth: 450,
  maintenancePct: 0.5,
  pmiPct: 0.6,
  appreciation: 4,
  assessedGrowth: 2,
  closingPct: 2,
  sellingPct: 6,
};

export function monthlyPayment(loan: number, rate: number, years: number): number {
  const n = years * 12;
  const r = rate / 100 / 12;
  if (loan <= 0) return 0;
  if (r === 0) return loan / n;
  return (loan * r) / (1 - Math.pow(1 + r, -n));
}

export interface AmortRow {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
}

export function amortization(loan: number, rate: number, years: number): AmortRow[] {
  const pay = monthlyPayment(loan, rate, years);
  const r = rate / 100 / 12;
  const rows: AmortRow[] = [];
  let bal = loan;
  for (let m = 1; m <= years * 12; m++) {
    const interest = bal * r;
    const principal = Math.min(bal, pay - interest);
    bal = Math.max(0, bal - principal);
    rows.push({ month: m, payment: pay, interest, principal, balance: bal });
  }
  return rows;
}

export interface Milestone {
  year: number;
  homeValue: number;
  loanBalance: number;
  equity: number;
  interestPaid: number;
  principalPaid: number;
  pmiPaid: number;
  propertyTaxPaid: number;
  otherPaid: number; // insurance + HOA + maintenance
  totalPaid: number; // everything out of pocket: down + closing + payments + costs
  netIfSold: number; // equity after selling costs
  goneMoney: number; // money that is spent and never comes back: interest, tax, PMI, upkeep, closing
}

export interface MortgageResult {
  loan: number;
  down: number;
  closing: number;
  payment: number; // principal + interest
  pmiMonthly: number;
  taxMonthly: number; // year 1
  insuranceMonthly: number;
  hoaMonthly: number;
  maintMonthly: number;
  allInMonthly: number; // year 1, with PMI
  allInNoPmi: number;
  pmiEndsMonth: number | null;
  milestones: Milestone[];
  totalInterest30: number;
  schedule: AmortRow[];
}

const YEARS = [1, 2, 5, 10, 15, 30];

export function computeMortgage(m: MortgageInput, milestoneYears = YEARS): MortgageResult {
  const down = (m.price * m.downPct) / 100;
  const loan = m.price - down;
  const closing = (m.price * m.closingPct) / 100;
  const payment = monthlyPayment(loan, m.rate, m.years);
  const schedule = amortization(loan, m.rate, m.years);
  const pmiYear = m.downPct < 20 ? (loan * m.pmiPct) / 100 : 0;

  let pmiEnd: number | null = null;
  if (m.downPct < 20) {
    const limit = m.price * 0.8;
    const idx = schedule.findIndex((r) => r.balance <= limit);
    pmiEnd = idx >= 0 ? idx + 1 : null;
  }

  const taxYear1 = (m.price * m.propertyTaxPct) / 100;
  const ins = m.insuranceYear / 12;
  const maint1 = (m.price * m.maintenancePct) / 100 / 12;

  const milestones: Milestone[] = milestoneYears
    .filter((y) => y <= m.years)
    .map((y) => {
      const months = y * 12;
      let interest = 0;
      let principal = 0;
      let pmiPaid = 0;
      let taxPaid = 0;
      let other = 0;
      for (let k = 1; k <= months; k++) {
        const row = schedule[k - 1];
        interest += row.interest;
        principal += row.principal;
        if (pmiEnd !== null && k <= pmiEnd) pmiPaid += pmiYear / 12;
        const yr = Math.ceil(k / 12);
        const assessed = m.price * Math.pow(1 + m.assessedGrowth / 100, yr - 1);
        taxPaid += (assessed * m.propertyTaxPct) / 100 / 12;
        const value = m.price * Math.pow(1 + m.appreciation / 100, yr - 1);
        other += ins * Math.pow(1.03, yr - 1) + m.hoaMonth * Math.pow(1.03, yr - 1) + (value * m.maintenancePct) / 100 / 12;
      }
      const homeValue = m.price * Math.pow(1 + m.appreciation / 100, y);
      const balance = schedule[months - 1].balance;
      const totalPaid = down + closing + interest + principal + pmiPaid + taxPaid + other;
      const equity = homeValue - balance;
      const netIfSold = equity - (homeValue * m.sellingPct) / 100;
      return {
        year: y,
        homeValue,
        loanBalance: balance,
        equity,
        interestPaid: interest,
        principalPaid: principal,
        pmiPaid,
        propertyTaxPaid: taxPaid,
        otherPaid: other,
        totalPaid,
        netIfSold,
        goneMoney: interest + pmiPaid + taxPaid + other + closing,
      };
    });

  const allNoPmi = payment + taxYear1 / 12 + ins + m.hoaMonth + maint1;
  return {
    loan,
    down,
    closing,
    payment,
    pmiMonthly: pmiYear / 12,
    taxMonthly: taxYear1 / 12,
    insuranceMonthly: ins,
    hoaMonthly: m.hoaMonth,
    maintMonthly: maint1,
    allInMonthly: allNoPmi + pmiYear / 12,
    allInNoPmi: allNoPmi,
    pmiEndsMonth: pmiEnd,
    milestones,
    totalInterest30: schedule.reduce((s, r) => s + r.interest, 0),
    schedule,
  };
}

// California supplemental tax: after a sale, the county reassesses and bills the difference
// between the new and old assessed value, prorated from the purchase month to the next July 1.
export function supplementalTax(opts: {
  newAssessed: number;
  oldAssessed: number;
  taxRatePct: number;
  monthsRemaining: number; // months from the purchase to June 30 (0-12)
}) {
  const diff = Math.max(0, opts.newAssessed - opts.oldAssessed);
  const full = (diff * opts.taxRatePct) / 100;
  return { diff, fullYear: full, bill: (full * Math.min(12, Math.max(0, opts.monthsRemaining))) / 12 };
}

export interface RentalInput {
  rent: number; // per month
  vacancyPct: number;
  mortgagePI: number;
  propertyTax: number; // per month
  insurance: number; // per month
  hoa: number; // per month
  maintenancePct: number; // % of rent
  managementPct: number; // % of rent
  utilities: number; // per month paid by owner
}

export function rentalCashFlow(r: RentalInput) {
  const collected = r.rent * (1 - r.vacancyPct / 100);
  const maintenance = (r.rent * r.maintenancePct) / 100;
  const management = (collected * r.managementPct) / 100;
  const expenses = r.propertyTax + r.insurance + r.hoa + maintenance + management + r.utilities;
  const noi = collected - expenses; // before mortgage
  const cash = noi - r.mortgagePI;
  return { collected, maintenance, management, expenses, noi, cash };
}
