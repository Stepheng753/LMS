import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_3_Topic7() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Recap"
        title="Recap: Investing Accounts"
        summary="Topic 7: the order of operations, Roth vs Traditional, the limits, and the S&P 500 strategy."
      />

      <Section title="The order of operations" />
      <Table
        headers={['#', 'Step', 'Reason']}
        rows={[
          ['1', 'Pay off bad debt, taking the full employer match', 'The match is an instant 100% return'],
          ['2', 'Emergency fund (3 to 6 months)', 'Stops surprises becoming debt'],
          ['3', 'Max a Roth IRA ($7,500)', 'Tax-free growth, widest investment choice'],
          ['4', 'Max the 401k ($24,500), Roth if offered', 'Large limit'],
          ['5', 'Max the HSA ($4,400 / $8,750) and FSA ($3,400)', 'Tax breaks on health costs'],
          ['6', 'Taxable brokerage', 'No limit, no tax break'],
        ]}
      />

      <Section title="Roth vs Traditional" />
      <Table
        headers={['Idea', 'Rule']}
        rows={[
          ['The only difference', 'When the tax is paid: Roth now, traditional later'],
          ['Equal rates', 'Identical results'],
          ['Rate higher later', 'Roth wins. Lower later: traditional wins'],
          ['Hidden Roth edges', 'Bigger effective limit, no required withdrawals, access to contributions, tax-free heirs'],
          ['The playbook', 'Roth: pay the tax, then the money is yours, like everything else you buy'],
          ['Over the income limit', 'Backdoor Roth, or the Roth 401k (no income limit)'],
          ['The match', 'Always pre-tax, always take all of it'],
        ]}
      />

      <Section title="What to hold" />
      <Table
        headers={['Rule', 'Detail']}
        rows={[
          ['The fund', 'A low-cost S&P 500 index fund in every account'],
          ['The method', 'Automatic monthly purchase, dividends reinvested, never sell in a crash'],
          ['The history', 'About 10% to 10.5% a year, about 7% after inflation, with drops of 25% to 57%'],
          ['Fees', '0.03% vs 1% costs about $163,000 over 30 years on $500 a month'],
          ['Caution', 'Never invest money you need within about 5 years. This is a personal strategy with real risk'],
        ]}
      />

      <Callout type="success" title="The thread">
        Use the accounts in order, pay tax on your terms, put everything into one simple low-fee fund, and automate it.
      </Callout>

      <QuizSet title="Quick check">
        <Quiz
          question="If your tax rate is the same now and in retirement, which wins: Roth or traditional?"
          options={['Roth', 'Traditional', 'A tie', 'Depends on the fund']}
          correctIndex={2}
          explanation="The same percentage is taken either way."
        />
        <Quiz
          question="Which account comes first after the match, debt and emergency fund?"
          options={['The 401k', 'The Roth IRA', 'The brokerage', 'The HSA']}
          correctIndex={1}
          explanation="Step 3 is the Roth IRA."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Debt and match, emergency fund, Roth IRA, 401k, HSA and FSA, brokerage.',
          'Roth vs traditional is only about when you pay tax. The playbook picks Roth.',
          'S&P 500 index fund, automatic, low fee, held through crashes.',
        ]}
      />
    </div>
  );
}
