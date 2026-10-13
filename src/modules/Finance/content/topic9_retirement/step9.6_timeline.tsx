import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step9_6_Timeline() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • The Timeline"
        title="The Retirement Timeline and Which Account to Spend First"
        summary="The ages that matter, the order to draw from your accounts, and why Roth money is the last to spend."
      />

      <Section title="The ages" />
      <Table
        headers={['Age', 'What happens']}
        rows={[
          [<strong key="a">50</strong>, 'Catch-up contributions: +$8,000 to the 401k and +$1,100 to an IRA (2026)'],
          [<strong key="b">55</strong>, 'Extra $1,000 allowed in an HSA'],
          [<strong key="c">59½</strong>, 'Withdrawals from 401ks and IRAs have no 10% early penalty. Roth earnings become tax-free (after 5 years)'],
          [<strong key="d">62</strong>, 'Earliest Social Security. Benefits are permanently reduced (about 30% less than at full age)'],
          [<strong key="e">65</strong>, 'Medicare starts. Eligible for HSA use on any purpose (taxed if non-medical)'],
          [<strong key="f">67</strong>, 'Full retirement age for Social Security for people born in 1960 or later'],
          [<strong key="g">70</strong>, 'Social Security benefits stop growing. Waiting from 67 to 70 raises the monthly check by about 24%'],
          [<strong key="h">73</strong>, 'Required minimum distributions (RMDs) start on traditional 401ks and IRAs. Roth IRAs have none'],
        ]}
      />
      <Flow
        steps={[
          { title: '59½', sub: 'penalty-free withdrawals' },
          { title: '62 to 70', sub: 'choose when to claim Social Security', via: 'later = more' },
          { title: '65', sub: 'Medicare', via: 'health coverage' },
          { title: '73', sub: 'RMDs begin on traditional accounts', via: 'forced withdrawals' },
        ]}
      />

      <Section title="Which account do you spend first?" />
      <p>
        If you have money in three kinds of accounts, the order you draw from them can change your taxes for decades. A
        common order:
      </p>
      <Table
        headers={['Order', 'Account', 'Why']}
        rows={[
          [<strong key="1">1</strong>, 'Taxable brokerage', 'Only the gains are taxed, at lower long-term rates. Uses up the least tax-efficient money first'],
          [<strong key="2">2</strong>, 'Traditional 401k and IRA', 'Taxed as ordinary income. Fill the low tax brackets each year, and avoid the forced RMDs at 73'],
          [<strong key="3">3</strong>, <strong key="3b">Roth accounts, last</strong>, 'Tax-free forever and the only accounts with no required withdrawals. Let them grow the longest, leave them to heirs, or use them in a crunch'],
        ]}
      />
      <Callout type="success" title="Why this supports the Roth preference">
        A pile in a Roth gives you <strong>control</strong>: money you can use without raising your taxable income, no required
        withdrawals, and the best asset to leave to children. The less traditional money you have, the less the government
        controls your retirement tax bracket. That is part of why the playbook builds Roth first.
      </Callout>

      <Section title="Retiring early" />
      <Table
        headers={['Goal', 'The bridge before 59½']}
        rows={[
          ['Retire at 45 or 50', 'Live off the taxable brokerage account. Roth IRA contributions can be withdrawn at any time. A rule called 72(t) lets you take penalty-free payments from an IRA, with strict rules'],
          ['Retire at 55', 'If you leave your job in or after the year you turn 55, you can often withdraw from that employer’s 401k without the 10% penalty (the “Rule of 55”)'],
          ['Retire at 60 or 65', 'Access to everything is simple. Mind the Social Security claim age and Medicare at 65'],
        ]}
      />
      <p>
        An earlier retirement needs a larger pile, because the money has to last longer. For a 40-year retirement, many planners use a
        cautious 3.5% instead of 4%. At $60,000 a year that means $1,714,286 instead of $1,500,000.
      </p>

      <QuizSet title="Check yourself">
        <Quiz
          question="At what age do required minimum distributions start on a traditional IRA?"
          options={['59½', '65', '70', '73']}
          correctIndex={3}
          explanation="RMDs start at 73. Roth IRAs have none."
        />
        <Quiz
          question="Which account does the common order suggest spending last?"
          options={['The brokerage account', 'The traditional 401k', 'Roth accounts', 'The HSA']}
          correctIndex={2}
          explanation="Roth money is tax-free forever and has no required withdrawals, so it is best left to grow."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Key ages: 59½ (penalty-free), 62 to 70 (Social Security), 65 (Medicare), 73 (RMDs).',
          'Common order to spend: brokerage, then traditional, then Roth last.',
          'Roth money keeps your taxable income low and is the best to leave to heirs.',
          'Early retirement needs a bigger pile and a bridge before 59½.',
        ]}
      />
    </div>
  );
}
