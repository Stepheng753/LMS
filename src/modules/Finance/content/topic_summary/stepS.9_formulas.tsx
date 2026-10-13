import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_9_Formulas() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Reference"
        title="The Formula Sheet"
        summary="Every formula from the course, with a worked example, in one table."
      />

      <Section title="Debt, cards and income" />
      <Table
        headers={['What', 'Formula', 'Example']}
        rows={[
          ['Monthly interest', 'balance × APR ÷ 12', '$5,000 × 22% ÷ 12 = $91.67'],
          ['Savings', 'income − expenses', '$5,200 − $2,590 − $1,250 = $1,360'],
          ['Rewards value', 'spend × points per $ × value per point', '$30,000 × 2 × 1¢ = $600'],
          ['Utilization', 'balance ÷ limit', '$500 ÷ $5,000 = 10%'],
        ]}
      />

      <Section title="Taxes and pay" />
      <Table
        headers={['What', 'Formula', 'Example']}
        rows={[
          ['Effective tax rate', 'total tax ÷ income', '$13,170 ÷ $100,000 = 13.2%'],
          ['Deduction value', 'amount × marginal rate', '$1,000 × 22% = $220'],
          ['Social Security', 'wages × 6.2% (to $184,500)', '$95,450 × 6.2% = $5,918'],
          ['Medicare', 'wages × 1.45%', '$95,450 × 1.45% = $1,384'],
          ['Self-employment tax', 'profit × 92.35% × 15.3%', '$100,000 → $14,130'],
          ['Per paycheck', 'annual ÷ number of paychecks', '$100,000 ÷ 26 = $3,846.15'],
        ]}
      />

      <Section title="Growth, inflation and retirement" />
      <Table
        headers={['What', 'Formula', 'Example']}
        rows={[
          ['Growth factor', 'new = old × (1 + rate)', '$10,000 × 1.10 = $11,000'],
          ['Compound growth', 'FV = P × (1 + r)^n', '$10,000 at 10% for 40 years = $452,593'],
          ['Yearly deposits', 'FV = deposit × ((1 + r)^n − 1) ÷ r', '$6,000, 10.5%, 40 years = $3,043,509'],
          ['Rule of 72', 'years to double ≈ 72 ÷ rate', '72 ÷ 10 = 7.2'],
          ['Future price', 'price × (1 + i)^n', '$100 × 1.03^40 = $326'],
          ['Real return', '(1 + nominal) ÷ (1 + inflation) − 1', '1.105 ÷ 1.03 − 1 = 7.3%'],
          ['Deflate', 'future amount ÷ (1 + i)^n', '$3,043,509 ÷ 3.26 = $933,009'],
          ['CAGR', '(end ÷ start)^(1/n) − 1', '1,000 to 5,000 in 25 years = 6.65%'],
          ['Retirement pile', 'yearly expenses ÷ 4%', '$60,000 ÷ 0.04 = $1,500,000'],
          ['Yearly saving to reach a goal', 'goal × r ÷ ((1 + r)^n − 1)', '$4,893,057, 10.5%, 40 years = $9,646'],
        ]}
      />

      <Section title="Mortgage and real estate" />
      <Table
        headers={['What', 'Formula', 'Example']}
        rows={[
          ['Mortgage payment', 'L × r ÷ (1 − (1 + r)^−n)', '$400,000, 6.5%, 360 months = $2,528'],
          ['Month 1 interest', 'loan × rate ÷ 12', '$400,000 × 6.5% ÷ 12 = $2,167'],
          ['Property tax', 'assessed value × 1.15%', '$500,000 → $5,750 a year'],
          ['Supplemental tax', '(price − old assessed) × rate × months left ÷ 12', '$180,000 × 1.15% × 8 ÷ 12 = $1,380'],
          ['NOI', 'rent collected − operating costs', '$2,755 − $1,194 = $1,561'],
          ['Cap rate', 'NOI × 12 ÷ price', '$18,730 ÷ $500,000 = 3.7%'],
          ['Cash-on-cash', 'yearly cash flow ÷ cash invested', '−$11,604 ÷ $110,000 = −10.6%'],
        ]}
      />

      <Callout type="tip" title="You do not need to memorize these">
        The calculators do the arithmetic. What matters is knowing which formula answers which question, and checking that
        a result makes sense.
      </Callout>

      <KeyTakeaways
        items={[
          'Growth, discounting, deposits and payments all come from the same few formulas.',
          'Know the question first, then the formula, then let a calculator do the arithmetic.',
        ]}
      />
    </div>
  );
}
