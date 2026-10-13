import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_4_Ira() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Accounts"
        title="The IRA"
        summary="An Individual Retirement Account: a personal account you open yourself, in Roth or traditional flavor, with a $7,500 limit in 2026."
      />

      <Section title="What it is" />
      <p>
        An <strong>IRA</strong> is a retirement account you open <em>yourself</em> at a brokerage, separate from any job.
        You choose what is inside it. It comes in two types, <strong>Roth</strong> and <strong>traditional</strong>, with
        the same contribution limit shared between them.
      </p>

      <Table
        headers={['', 'Roth IRA', 'Traditional IRA']}
        rows={[
          [<strong key="a">Money going in</strong>, 'After-tax. No deduction', 'Pre-tax: you may deduct it, depending on income and a workplace plan'],
          [<strong key="b">Growth</strong>, 'Tax-free', 'Tax-deferred'],
          [<strong key="c">Money coming out (59½+)</strong>, 'Tax-free', 'Taxed as ordinary income'],
          [<strong key="d">Required withdrawals</strong>, 'None during your life', 'Yes, from age 73 (Required Minimum Distributions)'],
          [<strong key="e">Income limit to contribute</strong>, 'Yes: $153,000 to $168,000 single, $242,000 to $252,000 married (2026)', 'None to contribute, but the deduction can phase out'],
        ]}
      />

      <Section title="The 2026 limit" />
      <Table
        headers={['', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Total across all your IRAs, Roth and traditional combined', '$7,500'],
          ['Extra if you are 50 or older', '+$1,100'],
          ['Per month to hit the limit', '$625'],
          ['Per paycheck (26)', '$288.46'],
        ]}
      />
      <p>
        You have until <strong>April 15 of the next year</strong> to contribute for a given year. A spouse who does not work
        can still have an IRA (a spousal IRA) funded from the working spouse&apos;s income, each with their own $7,500.
      </p>

      <Callout type="info" title="Why the IRA comes before the 401k">
        An IRA lets you pick from every investment at the broker, including very low-cost index funds. A 401k only offers the
        funds the plan chose, and sometimes with higher fees. For the same dollar, the IRA often has the better menu.
      </Callout>

      <Section title="How to open and fund one" />
      <Steps
        steps={[
          { title: 'Choose a broker', children: <p>Fidelity, Schwab and Vanguard are large, low-cost providers.</p> },
          { title: 'Open a Roth IRA', children: <p>You will need your Social Security number, your bank details and a few minutes.</p> },
          { title: 'Set up a monthly automatic transfer', children: <p>$625 a month reaches the $7,500 limit. Start with whatever fits your budget and raise it.</p> },
          { title: 'Buy the investment inside it', children: <p><strong>Important:</strong> a deposit is just cash until you buy something. After the money arrives, buy your chosen fund (step 7.14). Many people forget this step.</p> },
          { title: 'Automate the purchase', children: <p>Set the fund to buy automatically with every deposit.</p> },
        ]}
      />

      <Callout type="warning" title="The cash trap">
        Money deposited in an IRA is <strong>uninvested</strong> until you buy something. Check the account a week after
        you open it: if the balance says &quot;cash&quot;, it is not working for you yet.
      </Callout>

      <Section title="Taking money out early" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Roth IRA contributions</strong> (the money you put in) can be withdrawn <em>at any time</em>, tax- and penalty-free. This makes the Roth a backup emergency fund of last resort.</li>
        <li><strong>Roth IRA earnings</strong> are tax-free after age 59½ and after the account is at least 5 years old.</li>
        <li><strong>Traditional IRA</strong> withdrawals before 59½ face a 10% penalty plus income tax, with a few exceptions.</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is the 2026 total IRA contribution limit for someone under 50?"
          options={['$3,500', '$7,500', '$24,500', '$72,000']}
          correctIndex={1}
          explanation="$7,500 across all IRAs combined."
        />
        <Quiz
          question="You deposited $7,500 into a new Roth IRA. What must you also do?"
          options={['Nothing, it is invested', 'Buy an investment with the cash', 'Wait for April', 'Close the account']}
          correctIndex={1}
          explanation="A deposit sits in cash until you buy a fund."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'An IRA is an account you open yourself. 2026 limit $7,500, Roth and traditional combined.',
          'Roth IRA: after-tax in, tax-free out. Contributions can be withdrawn anytime.',
          'The IRA comes before the 401k because you pick from every investment.',
          'Deposit, then buy the fund. Automate both.',
        ]}
      />
    </div>
  );
}
