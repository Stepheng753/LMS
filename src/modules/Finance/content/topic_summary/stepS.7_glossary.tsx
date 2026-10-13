import { StepHeader } from '../../../../components/content/StepHeader';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

// term, plain meaning, topic where it was taught
const TERMS: [string, string, string][] = [
  ["1099", "Form for contractors: you pay full price for taxes and benefits", "2"],
  ["Amortization", "The schedule splitting each loan payment into interest and principal", "10"],
  ["Appreciation", "A rise in the value of an asset", "10"],
  ["APR", "Annual percentage rate: the yearly cost of a loan", "1"],
  ["Assessed value", "The value the county uses for property tax (California: capped growth under Prop 13)", "10"],
  ["Asset allocation", "How your money is split among stocks, bonds and cash", "7"],
  ["Backdoor Roth", "Non-deductible traditional IRA contribution converted to Roth, for high earners", "7"],
  ["Bad debt", "Debt that buys things that lose value or are consumed", "1"],
  ["Beneficiary", "The person who inherits an account or policy", "6"],
  ["Bracket (tax)", "A range of income taxed at one rate", "4"],
  ["Brokerage account", "A taxable investment account with no limits", "7"],
  ["C-corp", "A company taxed separately; shareholders are taxed again on dividends", "11"],
  ["CAGR", "Compound annual growth rate: (end \u00f7 start)^(1/years) \u2212 1", "8"],
  ["Cap rate", "Net operating income \u00d7 12 \u00f7 price", "10"],
  ["Capital gain", "Profit from selling an investment for more than you paid", "4"],
  ["Cash-on-cash", "Yearly cash flow \u00f7 cash you invested", "10"],
  ["Closing costs", "Fees paid at a home purchase, about 2% to 3%", "10"],
  ["Coinsurance", "Your percentage of a bill after the deductible", "6"],
  ["Compound interest", "Interest earned on past interest", "8"],
  ["Copay", "A flat fee for a service", "6"],
  ["Credit", "A dollar-for-dollar reduction of your tax", "4"],
  ["Credit score", "A 300 to 850 grade of how reliably you repay", "3"],
  ["Credit utilization", "Balance as a percent of your credit limit", "3"],
  ["Deductible (insurance)", "What you pay first before insurance pays", "6"],
  ["Deduction (tax)", "An amount that lowers taxable income", "4"],
  ["Dependent", "A person you mainly support, who may qualify you for a credit", "4"],
  ["Depreciation", "A tax deduction for a building\u2019s wear over 27.5 years", "10"],
  ["Diversification", "Spreading money across many investments", "7"],
  ["Dividend", "A payment a company makes to shareholders", "4"],
  ["Dollar-cost averaging", "Investing a fixed amount on a schedule", "7"],
  ["Effective tax rate", "Total tax \u00f7 income", "4"],
  ["Emergency fund", "3 to 6 months of essentials in cash", "2"],
  ["Employer match", "Money your employer adds to your 401k", "7"],
  ["Equity", "Home value minus the loan you owe", "10"],
  ["Escrow", "An account where the lender holds tax and insurance money", "10"],
  ["Expense ratio", "The yearly fee of a fund, as a percent", "7"],
  ["FICA", "Social Security and Medicare payroll taxes", "5"],
  ["Fixed expense", "A bill that is the same every month", "2"],
  ["FSA", "Pre-tax account for medical or dependent care costs, mostly use-it-or-lose-it", "7"],
  ["Grace period", "The interest-free time on a card if you pay in full", "3"],
  ["Gross pay", "Pay before anything is taken out", "5"],
  ["HDHP", "High-deductible health plan, required for an HSA", "6"],
  ["HOA", "Homeowners association dues for shared parts of a condo or community", "10"],
  ["HSA", "Health savings account: tax-free in, growth and out for medical", "7"],
  ["Index fund", "A fund that copies a market index at low cost", "7"],
  ["Inflation", "The general rise in prices over time", "8"],
  ["IRA", "Individual retirement account you open yourself. 2026 limit $7,500", "7"],
  ["401k", "Retirement account through your employer. 2026 limit $24,500", "7"],
  ["Leverage", "Using borrowed money to control a bigger asset", "10"],
  ["LLC", "A legal wrapper giving limited liability", "11"],
  ["MAGI", "Modified adjusted gross income, used for Roth limits", "7"],
  ["Marginal tax rate", "The rate on your last dollar of income", "4"],
  ["Net pay", "What you actually receive", "5"],
  ["NOI", "Net operating income: rent collected minus operating costs, before the mortgage", "10"],
  ["Order of operations", "The ranked list of where each dollar goes", "7"],
  ["Out-of-pocket maximum", "The most you pay in a year for covered health care", "6"],
  ["PITI", "Principal, interest, taxes and insurance", "10"],
  ["PMI", "Mortgage insurance charged under 20% down", "10"],
  ["Premium", "What you pay to keep an insurance policy", "6"],
  ["Principal", "The amount borrowed, or the part of a payment that reduces the loan", "1"],
  ["Prop 13", "California law that caps assessed value growth at 2% a year", "10"],
  ["Real return", "Return after inflation", "8"],
  ["REIT", "A fund that owns many properties", "10"],
  ["RMD", "Required minimum distribution from traditional accounts, starting at 73", "9"],
  ["Roth", "Account taxed now, tax-free later", "7"],
  ["Rule of 72", "Years to double \u2248 72 \u00f7 rate", "8"],
  ["S&P 500", "Index of about 500 of the largest US companies", "7"],
  ["S-corp", "A tax election that can lower payroll tax", "11"],
  ["Self-employment tax", "About 15.3% of 92.35% of profit, both halves of payroll tax", "4"],
  ["Sequence risk", "Bad returns early in retirement, which do lasting damage", "9"],
  ["Snowball", "Debt payoff: smallest balance first", "1"],
  ["Standard deduction", "The automatic deduction: $16,100 single, $32,200 married (2026)", "4"],
  ["Supplemental tax", "California one-time bill after a purchase reassesses the home", "10"],
  ["Term life", "Life insurance for a set number of years", "6"],
  ["Variable expense", "A cost that changes with your choices", "2"],
  ["Vesting", "When employer match money becomes yours", "7"],
  ["W-2", "Form for employees: the employer shares taxes and benefits", "2"],
  ["W-4", "Form that tells your employer how much tax to withhold", "5"],
];

export default function StepS_7_Glossary() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Glossary"
        title="Glossary"
        summary="Every money term from the course in plain words, with the topic where you met it."
      />
      <Callout type="tip" title="How to use it">
        Cover the middle column, say what each term means, then check. The last column is the topic with the full lesson.
      </Callout>
      <Table headers={['Term', 'Plain meaning', 'Topic']} rows={TERMS.map(([a, b, c]) => [<strong key={a}>{a}</strong>, b, c])} />
      <KeyTakeaways
        items={[
          'Knowing the words lets you read any statement, contract or article.',
          'If a term feels vague, reread the topic listed beside it.',
        ]}
      />
    </div>
  );
}
