import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { LimitsTable } from '../../calculators';

export default function Step7_11_Limits() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Limits"
        title="Maxes, Limits and Phase-Outs"
        summary="How much you can put in each account in 2026, how to hit the maximum, and what happens at higher incomes."
      />

      <Section title="The 2026 numbers" />
      <LimitsTable />
      <p className="text-sm text-muted-foreground">
        Sources: IRS notices for 2026 (401k, IRA, HSA, FSA limits and HDHP thresholds; Roth IRA phase-outs). Catch-up amounts
        shown are the standard figures. Verify at irs.gov before relying on any of these for a tax filing.
      </p>

      <Section title="How to hit each max" />
      <Table
        headers={['Account', 'Yearly limit', 'Per month', 'Per paycheck (26)']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['Roth IRA', '$7,500', '$625.00', '$288.46'],
          ['401k (Roth or traditional)', '$24,500', '$2,041.67', '$942.31'],
          ['HSA, single', '$4,400', '$366.67', '$169.23'],
          ['HSA, family', '$8,750', '$729.17', '$336.54'],
          ['Health FSA', '$3,400', '$283.33', '$130.77'],
          [<strong key="a">All together (single, with HSA and FSA)</strong>, <strong key="b">$39,800</strong>, <strong key="c">$3,316.67</strong>, <strong key="d">$1,530.77</strong>],
        ]}
      />
      <p>
        Hitting every limit takes about $40,000 a year, more than many people earn after tax. The ladder tells you where
        the next dollar goes. You do not need to hit every max to do well. You only need to climb.
      </p>

      <Section title="The Roth IRA income phase-out" />
      <p>
        If your income (modified adjusted gross income, MAGI) is above a threshold, you cannot put the full $7,500 into a
        Roth IRA. The allowed amount shrinks in a straight line across the phase-out range, then reaches zero.
      </p>
      <Table
        headers={['Filing status', 'Full contribution up to', 'Phase-out range', 'Zero above']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['Single, head of household', '$153,000', '$153,000 to $168,000', '$168,000'],
          ['Married filing jointly', '$242,000', '$242,000 to $252,000', '$252,000'],
          ['Married filing separately', '$0', '$0 to $10,000', '$10,000'],
        ]}
      />
      <p>
        Example: a single filer with MAGI of $160,500 is exactly halfway through the range ($7,500 of a $15,000 range). The
        limit is cut in half, to about <strong>$3,750</strong>. The Roth 401k has <strong>no income limit</strong>.
      </p>

      <Section title="Who counts: the rules that catch people" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>You need earned income</strong> (wages or self-employment profit) at least as large as your contribution. A spouse without income can use a spousal IRA from the other spouse&apos;s income.</li>
        <li><strong>The limit is per person</strong>, so a married couple can each put $7,500 in their own IRA.</li>
        <li><strong>One limit for all IRAs</strong>: Roth and traditional combined. It is $7,500, not $7,500 each.</li>
        <li><strong>You can contribute for last year until the tax deadline</strong> (usually April 15). Be sure the broker marks it for the right year.</li>
        <li><strong>Overcontributing</strong> triggers a 6% penalty each year the excess stays in. Fix it before the filing deadline.</li>
      </ul>

      <Callout type="info" title="The combined picture for a married couple">
        Two spouses can each contribute $24,500 to a 401k, $7,500 to an IRA, and share one family HSA of $8,750. That is
        up to $72,750 a year. The couple&apos;s combined income decides the Roth IRA limit, not each person&apos;s.
      </Callout>

      <Exercise
        title="Count the monthly cost of the maxes"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Roth IRA $625 + 401k $2,041.67 = <strong>$2,666.67 a month</strong>.</li>
            <li>Adding a single HSA ($366.67) makes <strong>$3,033.34 a month</strong>.</li>
            <li>With $2,000 to invest each month, you fill the IRA and put about $1,375 into the 401k, and the HSA and brokerage wait.</li>
          </ul>
        }
      >
        <p>How much per month do you need to max both the Roth IRA and the 401k? Add a single HSA. If you have $2,000 a month to invest, how far down the ladder do you get?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="A single filer has MAGI of $170,000. How much can go into a Roth IRA directly in 2026?"
          options={['$7,500', '$3,750', '$0', '$24,500']}
          correctIndex={2}
          explanation="At $168,000 and above the direct Roth IRA contribution is zero for a single filer. The backdoor (step 7.12) is the workaround."
        />
        <Quiz
          question="Does the Roth 401k have an income limit?"
          options={['Yes, same as the IRA', 'No', 'Only above $250,000', 'Only for married filers']}
          correctIndex={1}
          explanation="The Roth 401k has no income limit."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          '2026 limits: IRA $7,500, 401k $24,500, HSA $4,400 single or $8,750 family, FSA $3,400.',
          'Per month: IRA $625, 401k about $2,042, HSA about $367.',
          'The Roth IRA phases out at $153,000 to $168,000 single and $242,000 to $252,000 married. The Roth 401k does not.',
          'You need earned income. One IRA limit covers Roth and traditional together. Overcontributing costs 6% a year.',
        ]}
      />
    </div>
  );
}
