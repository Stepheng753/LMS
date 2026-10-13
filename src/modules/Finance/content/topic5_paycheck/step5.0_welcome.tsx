import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Flow } from '../../../../components/content/Flow';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Start Here"
        title="Your Paycheck: From Gross to Net"
        summary="Why a $100,000 salary does not put $100,000 in your bank account, and exactly where every dollar goes."
      />

      <p>
        Your salary is a promise. Your paycheck is what actually arrives, after a stack of subtractions. Most people
        never learn what those subtractions are, so they cannot plan, or check that they are correct.
      </p>

      <Flow
        steps={[
          { title: 'Gross pay', sub: '$100,000 a year, $3,846 a paycheck' },
          { title: 'Benefits and 401k', sub: 'Health, dental, retirement', via: 'minus' },
          { title: 'Taxes', sub: 'Federal, California, Social Security, Medicare, SDI', via: 'minus' },
          { title: 'Net pay', sub: 'What lands in your account', via: 'equals' },
        ]}
      />

      <Callout type="info" title="What you will build in this topic">
        One concrete paycheck for a <strong>$100,000 salary in California</strong>, paid every two weeks (26 paychecks a
        year), with health benefits, a <strong>maxed-out Roth 401k</strong>, federal and California income tax, Social
        Security, Medicare and SDI. Then you will change every number to see what happens.
      </Callout>

      <Section title="Words you will need" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Gross pay:</strong> your pay before anything is taken out.</li>
        <li><strong>Net pay (take-home):</strong> what you actually receive.</li>
        <li><strong>Pre-tax deduction:</strong> taken out before income tax is calculated, so it lowers your tax.</li>
        <li><strong>Post-tax deduction:</strong> taken out after tax (a Roth 401k is one).</li>
        <li><strong>Withholding:</strong> the tax your employer sends to the government from each paycheck.</li>
        <li><strong>FICA:</strong> Social Security plus Medicare payroll tax.</li>
        <li><strong>W-4:</strong> the form that tells your employer how much to withhold.</li>
      </ul>

      <Section title="The lessons" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>5.1</strong> Anatomy of a paycheck stub.</li>
        <li><strong>5.2</strong> The $100,000 paycheck, line by line.</li>
        <li><strong>5.3</strong> Social Security and Medicare.</li>
        <li><strong>5.4</strong> Benefits: pre-tax vs post-tax.</li>
        <li><strong>5.5</strong> A maxed-out Roth 401k on a paycheck.</li>
        <li><strong>5.6</strong> The paycheck lab: change everything.</li>
        <li><strong>5.7</strong> The W-4 and dependents.</li>
        <li><strong>5.8</strong> Why a paycheck is only an estimate.</li>
      </ul>

      <KeyTakeaways
        items={[
          'Gross pay minus benefits, retirement and taxes equals net pay.',
          'The example: $100,000 in California, 26 paychecks, benefits, a maxed Roth 401k.',
          'You will change every number in a calculator to see the effect.',
        ]}
      />
    </div>
  );
}
