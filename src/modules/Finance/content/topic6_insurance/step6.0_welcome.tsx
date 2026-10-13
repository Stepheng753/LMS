import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step6_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Start Here"
        title="Insurance: Protect What You Built"
        summary="One bad event can erase years of saving. Insurance is how you hand that risk to someone else for a small, predictable price."
      />

      <p>
        You can do everything right in this course and still lose it all to a single accident, illness or lawsuit.
        Insurance is the layer under the whole plan. It is not an investment. It is a fence.
      </p>

      <Callout type="success" title="The rule for deciding what to insure">
        <strong>Insure what you cannot afford to lose. Do not insure what you can afford to replace.</strong> A hospital
        stay, a car crash with injuries, a house fire and losing your income can each cost more than you could pay. A
        broken phone or a toaster you can replace yourself, so skip the extended warranty.
      </Callout>

      <Section title="The vocabulary of every policy" />
      <Table
        headers={['Word', 'Meaning', 'Example']}
        rows={[
          [<strong key="a">Premium</strong>, 'What you pay to keep the policy, monthly or yearly', '$150 a month'],
          [<strong key="b">Deductible</strong>, 'What you pay first, before the insurer starts paying', '$3,200'],
          [<strong key="c">Copay</strong>, 'A flat fee for a service', '$30 for a doctor visit'],
          [<strong key="d">Coinsurance</strong>, 'Your percentage of the bill after the deductible', '20%'],
          [<strong key="e">Out-of-pocket maximum</strong>, 'The most you can pay in a year. After that the insurer pays 100%', '$6,000'],
          [<strong key="f">Network</strong>, 'The doctors and hospitals your plan has deals with', 'In-network costs less'],
          [<strong key="g">Claim</strong>, 'Your request that the insurer pays', ''],
          [<strong key="h">Exclusion</strong>, 'What the policy does not cover', 'Earthquakes in a home policy'],
        ]}
      />

      <Section title="The policies in this topic" />
      <Table
        headers={['Policy', 'Protects against', 'Need it?']}
        rows={[
          [<strong key="a">Health</strong>, 'Medical bills that can reach six figures', 'Yes, always'],
          [<strong key="b">Auto</strong>, 'Crashes, liability, theft', 'Yes, it is the law'],
          [<strong key="c">Renters or homeowners</strong>, 'Fire, theft, liability, losing your home', 'Yes'],
          [<strong key="d">Term life</strong>, 'Your family losing your income', 'If anyone depends on your income'],
          [<strong key="e">Disability</strong>, 'You being unable to work', 'Yes, if you live on your income'],
          [<strong key="f">Umbrella</strong>, 'A large lawsuit', 'Once you have assets to protect'],
        ]}
      />

      <KeyTakeaways
        items={[
          'Insurance is a fence, not an investment.',
          'Insure what you cannot afford to lose. Skip what you can replace.',
          'Know the words: premium, deductible, copay, coinsurance, out-of-pocket maximum.',
          'Six policies to review: health, auto, renters or home, term life, disability, umbrella.',
        ]}
      />
    </div>
  );
}
