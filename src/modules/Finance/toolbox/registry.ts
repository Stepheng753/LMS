import type { DownloadItem } from '../../../components/content/ToolkitDownloads';

const file = (id: string, group: string, title: string, description: string, filename: string, text: string): DownloadItem => ({
  id,
  group,
  title,
  description,
  installTo: '',
  zipPath: `${group.toLowerCase().replace(/[^a-z]+/g, '-')}/${filename}`,
  filename,
  text,
});

export const TOOLBOX: DownloadItem[] = [
  file('budget', 'Spreadsheets (open in Excel or Google Sheets)', 'Monthly budget', 'Fixed and variable income and expenses, with the savings left over.', 'budget.csv',
`Section,Item,Monthly amount
Fixed income,Take-home pay from the 9-to-5,
Variable income,Side work / freelance / bonus,
Fixed expenses,Rent or mortgage,
Fixed expenses,Insurance,
Fixed expenses,Phone and internet,
Fixed expenses,Debt minimums,
Fixed expenses,Subscriptions,
Variable expenses,Groceries,
Variable expenses,Eating out,
Variable expenses,Fun,
Variable expenses,Shopping,
Variable expenses,Gifts and travel,
Result,Fixed income minus fixed expenses,=SUM(C2)-SUM(C4:C8)
Result,Variable income minus variable expenses,=SUM(C3)-SUM(C9:C13)
Result,Left to save and invest,=C14+C15`),
  file('debt-list', 'Spreadsheets (open in Excel or Google Sheets)', 'Debt snowball list', 'Every debt, smallest balance first, with the payoff order.', 'debt-snowball.csv',
`Order (smallest balance first),Debt name,Balance,APR %,Minimum payment,Extra payment,Month paid off
1,,,,,,
2,,,,,,
3,,,,,,
4,,,,,,
5,,,,,,
Total,,=SUM(C2:C6),,=SUM(E2:E6),,`),
  file('emergency-fund', 'Spreadsheets (open in Excel or Google Sheets)', 'Emergency fund tracker', 'Your target and your progress, month by month.', 'emergency-fund.csv',
`Essentials per month,,
Months of cover,,
Target,=B1*B2,
Month,Deposit,Balance
1,,
2,,
3,,
4,,
5,,
6,,`),
  file('net-worth', 'Spreadsheets (open in Excel or Google Sheets)', 'Net worth sheet', 'What you own minus what you owe. Update twice a year.', 'net-worth.csv',
`Type,Item,Amount
Asset,Checking and savings,
Asset,Emergency fund,
Asset,Roth IRA,
Asset,401k,
Asset,HSA,
Asset,Brokerage,
Asset,Home value,
Asset,Other,
Liability,Mortgage,
Liability,Credit cards,
Liability,Car loan,
Liability,Student and other loans,
Net worth,Assets minus liabilities,`),
  file('side-income', 'Spreadsheets (open in Excel or Google Sheets)', '1099 income and expense tracker', 'Track every payment and expense, and the tax set aside.', 'side-income-tracker.csv',
`Date,Type (income or expense),Description,Amount,Set aside for tax (25% to 30% of income)
,,,,`),
  file('retirement-number', 'Worksheets (plain text)', 'Retirement number worksheet', 'From yearly spending to the pile and the monthly saving.', 'retirement-number.md',
`# Retirement number worksheet

1. Yearly spending in today's dollars: $__________
2. Minus Social Security and any pension (from ssa.gov): $__________
3. Amount your investments must cover: $__________
4. Divide by 0.04 (or 0.035 to be cautious): pile needed = $__________
5. Years until you stop working: ______
6. Expected return (try 10.5% and 7%): ______%
7. Use the calculator in Topic 9 to find the monthly saving: $__________ at 10.5%, $__________ at 7%
8. Where it goes in the order of operations: __________________________
9. Date of my next review: ______________
`),
  file('order-of-operations', 'Worksheets (plain text)', 'Order of operations card', 'The six steps and where you are today. Print and keep.', 'order-of-operations.md',
`# Order of operations

[ ] 1. Pay off bad debt (snowball) while taking the full employer match
[ ] 2. Emergency fund: 3 to 6 months of essentials
[ ] 3. Max a Roth IRA ($7,500 in 2026)
[ ] 4. Max the 401k ($24,500 in 2026), Roth if offered
[ ] 5. Max the HSA ($4,400 single / $8,750 family) and FSA ($3,400)
[ ] 6. Invest the rest in a taxable brokerage account (S&P 500 index fund)

I am on step: ____
Monthly amount I can put to work: $__________
Raise rule: half of every raise goes to investing.
`),
  file('insurance-review', 'Worksheets (plain text)', 'Yearly insurance review', 'A checklist for open enrollment and each life change.', 'insurance-review.md',
`# Yearly insurance review

Health
[ ] Compared plans at several levels of medical bills (break-even)
[ ] Emergency fund covers my highest deductible
Auto
[ ] Liability at least 100/300/100
[ ] Uninsured motorist kept
[ ] Collision dropped on an old car if the premium is high
Home or renters
[ ] Replacement cost, not actual cash value
[ ] Condo owners: HO-6 policy
[ ] Decided on earthquake coverage on purpose
Life and disability
[ ] Term life only if someone depends on me (10 to 12 times income)
[ ] Disability insurance replaces 50% to 70% of income
Umbrella
[ ] $1 million once I own assets
Beneficiaries
[ ] Named and current on every account and policy
`),
  file('home-checklist', 'Worksheets (plain text)', 'Home purchase checklist', 'Before you buy: the foundation, the cash and the all-in cost.', 'home-purchase-checklist.md',
`# Home purchase checklist

Foundation
[ ] No bad debt
[ ] Emergency fund full (3 to 6 months of the all-in cost)
[ ] Retirement accounts started
Money
[ ] Down payment (20% to avoid PMI): $__________
[ ] Closing costs (about 2% to 3%): $__________
[ ] Supplemental property tax (California): $__________
[ ] Moving and repairs reserve: $__________
Monthly (all-in)
Mortgage P&I $______ + property tax $______ + insurance $______ + HOA $______ + upkeep $______ = $______
[ ] All-in housing at or below 28% of gross income
[ ] I can still afford it at a rate 1 point higher
Plan
[ ] I expect to stay at least 5 to 7 years
`),
  file('tax-calendar', 'Worksheets (plain text)', 'Tax and money calendar', 'The dates that matter in a year.', 'tax-calendar.md',
`# Tax and money calendar

January 15    Q4 estimated tax payment (federal and California) for the prior year
January 31    W-2 and 1099-NEC forms arrive
February      1099-INT, 1099-DIV, 1099-B forms arrive
April 15      File federal and California returns (or extend). Pay what you owe.
April 15      Q1 estimated payment. Last day to fund last year's IRA and HSA.
June 15       Q2 estimated payment
September 15  Q3 estimated payment (federal only; California has none)
Open enrollment (usually fall)  Choose a health plan, set the FSA amount, review 401k contributions
December      Review: raise the 401k, use the FSA, harvest any losses, check beneficiaries
`),
  file('annual-review', 'Worksheets (plain text)', 'Annual money review', 'One page, once a year.', 'annual-money-review.md',
`# Annual money review

Date: ____________

[ ] Income vs last year: $______ (raise rule applied: half to investing)
[ ] Savings rate: ______%
[ ] Debt balance: $______ (snowball on track)
[ ] Emergency fund: $______ (target $______)
[ ] Roth IRA filled for the year
[ ] 401k percentage raised, match captured
[ ] HSA / FSA set for next year
[ ] Funds still the S&P 500 index fund, cash not sitting uninvested
[ ] Net worth updated: $______
[ ] Insurance reviewed
[ ] Beneficiaries current
[ ] W-4 checked (aim for a small refund)
[ ] Next year's goal: ______________________
`),
];

export const TOOLBOX_ZIP_README = `Your money toolbox

Spreadsheets: open the .csv files in Excel or Google Sheets.
Worksheets: plain text, print them or keep them in a notes app.

Use them with the Personal Finance course. Tax numbers are for 2026, so check irs.gov and ftb.ca.gov each year.
This is a personal playbook, not licensed financial or tax advice.`;
