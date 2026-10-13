import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_8_RothTrad3() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Roth vs Traditional (3 of 4)"
        title="Beyond the Tax Rate: What Else Tips the Scale"
        summary="The rate comparison is the core, but the account rules add real advantages on each side. Here is the honest list."
      />

      <Section title="The hidden Roth advantages" />
      <Table
        headers={['Advantage', 'Why it matters']}
        rows={[
          [<strong key="a">A bigger effective limit</strong>, 'The $24,500 and $7,500 limits count dollars, not their tax status. A Roth dollar is already taxed; a traditional dollar is only worth 69% to 78% after tax. A maxed Roth shelters more real wealth than a maxed traditional'],
          [<strong key="b">No required withdrawals</strong>, 'A traditional account forces you to withdraw from age 73, whether you need the money or not, and you pay tax on it. The Roth IRA has no required minimum distributions, and a Roth 401k no longer does either'],
          [<strong key="c">Tax-free for life and for heirs</strong>, 'Heirs generally inherit Roth money income-tax free (they must empty it within 10 years)'],
          [<strong key="d">Access to contributions</strong>, 'You can pull your original Roth IRA contributions out at any time, tax- and penalty-free, a backup for true emergencies'],
          [<strong key="e">Protection against higher future rates</strong>, 'Tax rates rise and fall. A Roth balance is protected from every future tax change on that money'],
          [<strong key="f">Control over your retirement tax bracket</strong>, 'Roth withdrawals do not count as income. They do not raise tax on Social Security or the cost of Medicare premiums'],
          [<strong key="g">Simple to know your wealth</strong>, 'A $500,000 Roth is $500,000. A $500,000 traditional balance is $500,000 minus an unknown tax bill'],
        ]}
      />

      <Section title="The fair case for traditional" />
      <Table
        headers={['Advantage', 'Why it matters']}
        rows={[
          [<strong key="a">A deduction when your rate is highest</strong>, 'If you are in the 32% or 35% bracket now and will drop to 12% to 22% later, deferring is a real win (step 7.7)'],
          [<strong key="b">Lower income now can unlock benefits</strong>, 'A lower taxable income can help you qualify for credits, student loan repayment plans, health-care subsidies and the saver’s credit'],
          [<strong key="c">Cash flow now</strong>, 'A traditional contribution leaves more take-home pay today (Topic 5: $2,049.50 vs $1,759.64 per paycheck)'],
          [<strong key="d">Leaving California in retirement</strong>, 'A traditional dollar escapes California tax now (9.3% at $100,000) and may be taxed at 0% state income tax later'],
          [<strong key="e">Over the Roth IRA income limit</strong>, 'Direct Roth IRA contributions are blocked at high incomes (step 7.12)'],
        ]}
      />

      <Section title="The “traditional plus invest the savings” idea" />
      <p>
        A common argument is: &quot;Choose traditional, then invest the tax you saved in a brokerage account, and you come out ahead
        or equal.&quot; In theory that can work. In practice:
      </p>
      <Compare
        goodLabel="What has to go right"
        badLabel="What usually happens"
        good={
          <>
            <p>You really do invest every dollar of the tax savings, every year.</p>
            <p>The brokerage earns the same return and you hold it long term.</p>
            <p>Your tax rate in retirement is not higher.</p>
          </>
        }
        bad={
          <>
            <p>The extra take-home pay gets spent. The refund is a vacation.</p>
            <p>The brokerage is taxed on dividends each year and on gains when sold, so it is less efficient than a Roth.</p>
            <p>Lifestyle creep (Topic 2) swallows the difference.</p>
          </>
        }
      />
      <Callout type="warning" title="The behavior gap">
        The Roth quietly forces the habit. The money leaves your paycheck taxed, goes into an account you cannot easily
        touch, and grows tax-free. For most people, the account that is hardest to spend is the one that makes them
        wealthy.
      </Callout>

      <Section title="A balanced scorecard" />
      <Table
        headers={['Factor', 'Roth', 'Traditional']}
        align={['left', 'center', 'center']}
        rows={[
          ['Better if the tax rate is higher later', 'Yes', ''],
          ['Better if the tax rate is lower later', '', 'Yes'],
          ['More real money sheltered under the limit', 'Yes', ''],
          ['No required withdrawals', 'Yes', ''],
          ['Larger paycheck today', '', 'Yes'],
          ['Immediate tax deduction', '', 'Yes'],
          ['Backup access to contributions', 'Yes (IRA)', ''],
          ['Simplest to plan', 'Yes', ''],
          ['Not blocked at high incomes', '', 'Yes'],
        ]}
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="Why does a Roth shelter more real wealth under the same contribution limit?"
          options={['It has a bigger limit', 'Roth dollars are already taxed, so the same dollar amount holds more after-tax value', 'It has no fees', 'The employer adds more']}
          correctIndex={1}
          explanation="A traditional dollar is only worth what is left after tax is paid later."
        />
        <Quiz
          question="Which is a real advantage of traditional?"
          options={['Tax-free withdrawals', 'A larger paycheck and a deduction today', 'No required distributions', 'Tax-free inheritance']}
          correctIndex={1}
          explanation="The deduction gives more cash today, which can matter a lot."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Roth: a bigger effective limit, no required withdrawals, tax-free heirs, access to contributions, protection from future rate hikes.',
          'Traditional: a deduction at your highest rate, a bigger paycheck now, and possibly lower taxes if you move.',
          '“Traditional plus invest the savings” works only if you actually invest them, every year.',
          'The Roth forces the habit, which is half the battle.',
        ]}
      />
    </div>
  );
}
