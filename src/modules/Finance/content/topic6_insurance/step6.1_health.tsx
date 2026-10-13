import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step6_1_Health() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Insurance"
        title="How Health Insurance Works"
        summary="Where you get it, what the plan types mean, and what a $9,000 bill actually costs you."
      />

      <Section title="Where you get it" />
      <Table
        headers={['Source', 'Notes']}
        rows={[
          [<strong key="a">Your employer</strong>, 'Usually the best deal: the employer pays a large share of the premium, and you pay with pre-tax money'],
          [<strong key="b">A spouse or parent’s plan</strong>, 'Compare it with your own. Children can stay on a parent’s plan until 26'],
          [<strong key="c">Covered California</strong>, 'The state marketplace for people without an employer plan. Subsidies depend on income'],
          [<strong key="d">Medi-Cal / Medicare</strong>, 'Public coverage for low incomes (Medi-Cal) or age 65 and over (Medicare)'],
        ]}
      />
      <p>Open enrollment is once a year. Outside it you can only change plans after a qualifying life event: marriage, a baby, a job loss, a move.</p>

      <Section title="The plan types" />
      <Table
        headers={['Type', 'How it works', 'Trade-off']}
        rows={[
          [<strong key="a">HMO</strong>, 'You pick a primary doctor who refers you to specialists. Stay in network', 'Lower cost, less choice'],
          [<strong key="b">PPO</strong>, 'See any doctor, in-network costs less. No referrals needed', 'Higher premium, more freedom'],
          [<strong key="c">EPO</strong>, 'Like a PPO but no coverage outside the network, except emergencies', 'In between'],
          [<strong key="d">HDHP (high-deductible)</strong>, 'Low premium, high deductible. You can open an HSA with it', 'Lower premium, more out of pocket early in the year'],
        ]}
      />

      <Section title="A $9,000 bill, step by step" />
      <p>Your plan has a $3,200 deductible, 20% coinsurance and a $6,000 out-of-pocket maximum. You have a surgery that is billed at $9,000 (the in-network negotiated price).</p>
      <Steps
        steps={[
          { title: 'You pay the deductible first: $3,200', children: <p>The insurer pays nothing until you have paid $3,200 in a year.</p> },
          { title: 'Then coinsurance on the rest: $1,160', children: <p>$9,000 − $3,200 = $5,800 remaining. You pay 20% = $1,160. The insurer pays $4,640.</p> },
          { title: 'Your total for this surgery: $4,360', children: <p>That is below your $6,000 out-of-pocket maximum, so you pay it all.</p> },
          { title: 'If it had been a $40,000 bill', children: <p>Deductible and coinsurance would add up to $10,560, but the out-of-pocket maximum caps it. You would pay <strong>$6,000</strong>, and the insurer pays everything above that for the rest of the year.</p> },
        ]}
      />
      <Callout type="info" title="The out-of-pocket maximum is the real number">
        When comparing plans, the premium and the out-of-pocket maximum together are your <strong>worst case for a
        year</strong>. The deductible only tells you how quickly you reach the insurance paying.
      </Callout>

      <Section title="Free and cheap care" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Preventive care</strong> (annual checkups, many screenings, vaccines) is covered at no cost in-network.</li>
        <li><strong>In-network</strong> always costs less. Check before every non-emergency visit.</li>
        <li><strong>Emergency care</strong> is covered, even out of network, in an emergency.</li>
        <li><strong>Ask for the price</strong> before a procedure. Ask for an itemized bill after. Billing errors are common.</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="Deductible $2,000, coinsurance 20%, out-of-pocket maximum $5,000. A $10,000 in-network bill. What do you pay?"
          options={['$2,000', '$3,600', '$5,000', '$10,000']}
          correctIndex={1}
          explanation="$2,000 deductible plus 20% of the remaining $8,000 ($1,600) = $3,600, which is below the maximum."
        />
        <Quiz
          question="What is the most you can pay in a year, apart from premiums?"
          options={['The deductible', 'The out-of-pocket maximum', 'The copay', 'The coinsurance']}
          correctIndex={1}
          explanation="After you hit the out-of-pocket maximum, the plan pays 100% of covered care."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Employer plans are usually best: the employer pays a large share and you pay with pre-tax money.',
          'HMO, PPO, EPO and HDHP trade premium against freedom and deductible.',
          'A $9,000 bill with a $3,200 deductible and 20% coinsurance costs you $4,360.',
          'Premium plus the out-of-pocket maximum is your worst-case year.',
        ]}
      />
    </div>
  );
}
