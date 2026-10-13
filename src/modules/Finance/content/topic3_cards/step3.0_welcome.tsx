import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Start Here"
        title="Credit Cards: A Tool, Not a Loan"
        summary="Used one way, a credit card is free and pays you. Used the other way, it is the most expensive debt you can have."
      />

      <p>
        In Topic 1 you saw the damage a carried balance does. This topic is about the other side: a credit card used
        correctly is a free short-term tool that gives you protection and rewards. The difference between the two is a
        single habit.
      </p>

      <Callout type="success" title="The one rule">
        <strong>Never carry a balance.</strong> Pay the full statement every month, automatically. If you follow that
        rule, a credit card costs you nothing and earns rewards. If you break it, the card costs 20% a year or more.
      </Callout>

      <Section title="The two ways to use a card" />
      <Table
        headers={['', 'Pay in full every month', 'Carry a balance']}
        rows={[
          [<strong key="a">Interest</strong>, '$0', '20% to 29% a year'],
          [<strong key="b">Rewards</strong>, 'About 1% to 2% back', 'Wiped out by interest many times over'],
          [<strong key="c">Fraud protection</strong>, 'Strong', 'Strong'],
          [<strong key="d">Credit score</strong>, 'Builds it', 'Hurts it (high utilization)'],
          [<strong key="e">Feels like</strong>, 'A debit card with perks', 'A loan you did not plan for'],
        ]}
      />

      <Section title="What this topic covers" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>3.1</strong> What really happens when you swipe.</li>
        <li><strong>3.2</strong> The billing period, the statement date and the due date.</li>
        <li><strong>3.3</strong> The grace period, interest and the minimum-payment trap.</li>
        <li><strong>3.4</strong> Rewards: what a point is really worth.</li>
        <li><strong>3.5</strong> Debit vs credit: why in practice they should be the same.</li>
        <li><strong>3.6</strong> Your credit score.</li>
      </ul>

      <KeyTakeaways
        items={[
          'A credit card is a free short-term tool if you pay in full.',
          'Carrying a balance turns it into the most expensive debt you own.',
          'The whole topic is one habit: pay the full statement, automatically.',
        ]}
      />
    </div>
  );
}
