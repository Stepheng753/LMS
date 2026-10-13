import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Flow } from '../../../../components/content/Flow';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step10_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Start Here"
        title="Real Estate: The Biggest Purchase of Your Life"
        summary="A home is a place to live, a loan, a tax bill and an investment, all at once. This topic puts real numbers on every part, using a $500,000 San Diego condo."
      />

      <p>
        For most people a home is the largest purchase they will ever make and the largest debt they will ever carry. It is
        also the investment they understand least. People buy based on a monthly payment and a feeling, and miss most of the
        costs. This topic opens the whole box.
      </p>

      <Callout type="warning" title="Where a home sits in the playbook">
        Buying a home is <strong>not</strong> a step on the order of operations. It is a big choice you make <em>after</em> the
        foundation exists: no bad debt, an emergency fund, and the retirement accounts started. A home bought with a thin
        cushion is how people fall back into debt. The rule: a home should fit your budget with room left to keep investing.
      </Callout>

      <Section title="The example we will follow" />
      <Flow
        steps={[
          { title: '$500,000 condo', sub: 'San Diego, California' },
          { title: '20% down', sub: '$100,000 down, $400,000 loan', via: 'buy' },
          { title: '6.5% for 30 years', sub: '$2,528 a month, principal and interest', via: 'borrow' },
          { title: 'All-in cost', sub: 'about $3,724 a month with tax, HOA, insurance, upkeep', via: 'own' },
          { title: 'After 1 to 30 years', sub: 'value vs cost, equity vs rent', via: 'hold' },
        ]}
      />

      <Section title="What you will learn" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>10.1 to 10.2</strong> The types of real estate and the returns each can earn.</li>
        <li><strong>10.3 to 10.5</strong> How a mortgage works, amortization, and PMI.</li>
        <li><strong>10.6 to 10.7</strong> San Diego property tax, Prop 13, and the supplemental tax bill.</li>
        <li><strong>10.8 to 10.9</strong> The condo: the monthly cost, and total cost vs value after 1, 2, 5, 10, 15 and 30 years.</li>
        <li><strong>10.10 to 10.11</strong> Rental income: how it works, and whether it can offset or beat the mortgage.</li>
      </ul>

      <KeyTakeaways
        items={[
          'A home is a place, a loan, a tax bill and an investment.',
          'Buy after the foundation exists, not before.',
          'The example: $500,000 condo, 20% down, 6.5%, 30 years, all-in about $3,724 a month.',
          'You will see total cost vs value, and rent vs own, over 30 years.',
        ]}
      />
    </div>
  );
}
