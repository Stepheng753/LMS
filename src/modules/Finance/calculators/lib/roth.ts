export interface RothInput {
  yearlyPreTax: number; // pre-tax dollars of pay you set aside each year
  years: number;
  rate: number; // % return
  taxNow: number; // % marginal tax rate today (federal + state)
  taxLater: number; // % marginal tax rate when you withdraw
}

export interface RothResult {
  traditional: number; // after-tax value at the end
  traditionalBeforeTax: number;
  roth: number;
  difference: number; // roth - traditional
  rothInvestedYearly: number;
  taxPaidNowRoth: number;
  taxPaidLaterTrad: number;
}

function fv(yearly: number, rate: number, years: number) {
  const r = rate / 100;
  let b = 0;
  for (let y = 0; y < years; y++) b = (b + yearly) * (1 + r); // contributions at the start of each year
  return b;
}

export function rothVsTraditional(i: RothInput): RothResult {
  const tradBefore = fv(i.yearlyPreTax, i.rate, i.years);
  const trad = tradBefore * (1 - i.taxLater / 100);
  const rothYearly = i.yearlyPreTax * (1 - i.taxNow / 100);
  const roth = fv(rothYearly, i.rate, i.years);
  return {
    traditional: trad,
    traditionalBeforeTax: tradBefore,
    roth,
    difference: roth - trad,
    rothInvestedYearly: rothYearly,
    taxPaidNowRoth: i.yearlyPreTax * (i.taxNow / 100) * i.years,
    taxPaidLaterTrad: tradBefore * (i.taxLater / 100),
  };
}

// Same dollar limit instead of the same paycheck: the account limit buys more with Roth.
export function sameLimitComparison(limit: number, years: number, rate: number, taxLater: number) {
  const gross = fv(limit, rate, years);
  return { traditionalAfterTax: gross * (1 - taxLater / 100), rothAfterTax: gross, gross };
}
