import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_16_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Cheat Sheet"
        title="Topic 7 Cheat Sheet and Quiz"
        summary="Investing accounts on one page, then a check."
      />

      <Section title="The order of operations" />
      <Table
        headers={['#', 'Step']}
        rows={[
          ['1', 'Pay off bad debt, while taking the full employer match'],
          ['2', 'Emergency fund (3 to 6 months)'],
          ['3', 'Max a Roth IRA ($7,500)'],
          ['4', 'Max the 401k ($24,500), Roth if offered'],
          ['5', 'Max the HSA ($4,400 / $8,750) and FSA ($3,400)'],
          ['6', 'Invest the rest in a taxable brokerage'],
        ]}
      />

      <Section title="Roth vs traditional" />
      <Table
        headers={['Idea', 'In one line']}
        rows={[
          ['The only difference', 'When tax is paid: Roth now, traditional later'],
          ['Equal rates', 'Identical results'],
          ['Rate higher later', 'Roth wins'],
          ['Rate lower later', 'Traditional wins'],
          ['Hidden Roth edges', 'Bigger effective limit, no required withdrawals, access to contributions, tax-free heirs'],
          ['The playbook', 'Roth: pay the tax, then the money is yours, like everything else you buy'],
          ['Over the income limit', 'Backdoor Roth, or the Roth 401k (no income limit)'],
        ]}
      />

      <Section title="The strategy" />
      <Table
        headers={['Rule', 'In one line']}
        rows={[
          ['What to hold', 'A low-cost S&P 500 index fund in every account'],
          ['How to buy', 'Automatically, every month, dividends reinvested'],
          ['When to sell', 'Not in a crash, and not before you need the money'],
          ['Fees', 'About 0.03%. A 1% fund can cost $160,000 over 30 years on $500 a month'],
          ['Risk', 'Falls of 25% to 57% have happened. Never invest money you need within 5 years'],
        ]}
      />

      <Callout type="success" title="The big idea">
        Use the accounts in order, pay the tax on your terms, put everything into the same simple fund, automate it, and
        leave it alone.
      </Callout>

      <QuizSet title="Topic 7 Quiz">
        <Quiz
          question="Your employer matches 100% of the first 4%. You earn $100,000. You contribute 4%. How much free money do you receive?"
          options={['$0', '$400', '$4,000', '$8,000']}
          correctIndex={2}
          explanation="4% of $100,000 is $4,000, and the employer matches it dollar for dollar."
        />
        <Quiz
          question="If your tax rate is 24% now and 12% in retirement, which account wins?"
          options={['Roth', 'Traditional', 'Tie', 'Neither']}
          correctIndex={1}
          explanation="You pay tax at the lower rate with traditional."
        />
        <Quiz
          question="Which account has no income limit and a $24,500 limit?"
          options={['Roth IRA', 'Roth 401k', 'HSA', 'FSA']}
          correctIndex={1}
          explanation="The Roth 401k has no income limit."
        />
        <MultiSelectQuiz
          question="Which come before the taxable brokerage in the order of operations? (Pick all)"
          options={['Roth IRA', 'The 401k', 'The HSA and FSA', 'A speculative stock']}
          correctIndexes={[0, 1, 2]}
          explanation="Every tax-advantaged account fills before the brokerage."
        />
        <FillInQuiz
          question="The 2026 Roth IRA contribution limit for someone under 50 is $___."
          answer="7500"
          explanation="$7,500, shared with traditional IRAs."
        />
        <Quiz
          question="In a stock market crash, the playbook strategy is to:"
          options={['Sell', 'Keep buying on schedule and hold', 'Go to cash', 'Time the bottom']}
          correctIndex={1}
          explanation="Never sell in a crash, and keep buying."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Debt and match, emergency fund, Roth IRA, 401k, HSA and FSA, brokerage.',
          'Roth vs traditional: only the timing of tax differs. The playbook picks Roth.',
          'S&P 500 index fund, automatic, low fee, never sell in a crash.',
          'Automate once, review once a year.',
        ]}
      />
    </div>
  );
}
