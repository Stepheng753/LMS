import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { PaycheckCalculator } from '../../calculators';

export default function Step5_5_Roth401kMaxed() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="A Maxed-Out Roth 401k, on the Paycheck"
        summary="What it feels like when $24,500 a year leaves your paycheck on purpose, and what it buys."
      />

      <Section title="The same paycheck, two ways to max the 401k" />
      <p>Same $100,000 salary, same benefits, same California taxes. Both people put the full 2026 maximum, $24,500, into a 401k.</p>
      <Table
        headers={['Per paycheck (26 a year)', 'Traditional 401k', 'Roth 401k']}
        align={['left', 'right', 'right']}
        rows={[
          ['Gross pay', '$3,846.15', '$3,846.15'],
          ['401k contribution', '$942.31 (pre-tax)', '$942.31 (after-tax)'],
          ['Federal income tax', '$260.73', '$468.04'],
          ['California income tax', '$90.04', '$172.60'],
          ['Social Security + Medicare + SDI (same)', '$328.56', '$328.56'],
          ['Health, dental, vision (same)', '$175.00', '$175.00'],
          [<strong key="a">Take-home (net pay)</strong>, <strong key="b">$2,049.50</strong>, <strong key="c">$1,759.64</strong>],
          ['Total taxes per year', '$17,663 (17.7%)', '$25,199 (25.2%)'],
        ]}
      />
      <p>
        The Roth paycheck is <strong>$289.86 smaller every two weeks</strong>, or $7,537 a year. That is exactly the
        income tax the traditional 401k person has not paid <em>yet</em>: $5,390 of federal and $2,147 of California.
        The traditional person defers the tax. The Roth person pays it now and never pays it on this money again.
      </p>

      <Callout type="success" title="The playbook choice: Roth">
        The playbook prefers the Roth, for one reason: it works like everything else you buy. Money comes out of your
        paycheck, <strong>you pay the tax, and then it is yours to use however you want</strong>. No future tax bill, no
        rules about when to withdraw, no wondering what the tax rate will be. Topic 7 builds the full case, including the
        honest case for traditional.
      </Callout>

      <Section title="The hidden Roth advantage in this paycheck" />
      <p>
        To have the same take-home as the Roth paycheck ($1,759.64), the traditional person would have to contribute about
        <strong> $34,369</strong> a year. But the limit is $24,500. So at the same take-home, the Roth lets you put
        <em> more</em> real, after-tax money to work than the traditional account can. The $24,500 Roth limit is worth about
        $34,000 in pre-tax terms.
      </p>

      <Section title="But this is not the whole order of operations" />
      <Callout type="warning" title="Maxing the 401k is step 4, not step 1">
        This example maxes the 401k to show what a full contribution looks like. In your order of operations (Topic 1),
        the 401k max comes <em>after</em> the employer match, bad debt, the emergency fund and the Roth IRA. A person
        with debt or no emergency fund would take the match only (4%, or $153.85 per paycheck) and put the rest elsewhere.
      </Callout>

      <Section title="How much does each choice cost you per paycheck?" />
      <Table
        headers={['What you put in the Roth 401k', 'Per paycheck', 'Take-home per paycheck', 'Saved per year (+ $4,000 match)']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['Nothing', '$0', '$2,701.94', '$0'],
          ['4% (just the match)', '$153.85', '$2,548.10', '$8,000'],
          ['10%', '$384.62', '$2,317.33', '$14,000'],
          ['15%', '$576.92', '$2,125.02', '$19,000'],
          ['The max, $24,500 (24.5%)', '$942.31', '$1,759.64', '$28,500'],
        ]}
      />
      <p>
        Notice the match: giving up $153.85 per paycheck brings in $4,000 of free money. No other single decision pays
        that well. Notice too that each step from 0% to the max costs real take-home pay. Lifestyle and savings pull in
        opposite directions. That is why budgets (Topic 2) come first.
      </p>

      <Compare
        goodLabel="How people do it well"
        badLabel="Mistakes"
        good={
          <>
            <p>Start with the match, then raise the percentage with every raise (Topic 2: half of each raise).</p>
            <p>Automate it so you never see the money.</p>
            <p>Check that the match is actually arriving.</p>
          </>
        }
        bad={
          <>
            <p>Maxing the 401k while carrying 22% credit card debt.</p>
            <p>Contributing nothing because take-home pay looks smaller.</p>
            <p>Forgetting that employers may offer a Roth 401k option only if the plan allows it.</p>
          </>
        }
      />

      <Section title="Try it: Roth vs traditional on this paycheck" />
      <p>
        Move the Roth and traditional sliders against each other. Watch the take-home per paycheck, the taxes per year,
        and the &quot;saved for you&quot; total.
      </p>
      <PaycheckCalculator title="Roth vs traditional on a $100,000 paycheck" />

      <QuizSet title="Check yourself">
        <Quiz
          question="Why is a Roth 401k paycheck smaller than a traditional 401k paycheck at the same contribution?"
          options={['The Roth has fees', 'You pay income tax now instead of later', 'Roth contributions are lower', 'The employer takes a cut']}
          correctIndex={1}
          explanation="The traditional 401k defers the income tax. The Roth pays it now."
        />
        <Quiz
          question="What is the 2026 maximum an employee can put in a 401k?"
          options={['$7,500', '$24,500', '$72,000', '$100,000']}
          correctIndex={1}
          explanation="$24,500, with extra catch-up amounts at 50 and older."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A maxed Roth 401k is $24,500 a year, $942.31 per paycheck, 24.5% of a $100,000 salary.',
          'Roth take-home $1,759.64 vs traditional $2,049.50 per paycheck: the $289.86 gap is tax paid now vs later.',
          'The Roth limit shelters more real money, about $34,000 in pre-tax terms.',
          'The match costs $153.85 a paycheck and brings $4,000. Never skip it.',
          'Maxing the 401k is step 4 in the order of operations, not step 1.',
        ]}
      />
    </div>
  );
}
