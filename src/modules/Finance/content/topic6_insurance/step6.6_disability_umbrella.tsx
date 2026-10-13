import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step6_6_DisabilityUmbrella() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Insurance"
        title="Disability, Umbrella, and What to Skip"
        summary="Protect your income, your savings from lawsuits, and your wallet from insurance you do not need."
      />

      <Section title="Disability insurance: protect your income" />
      <p>
        Your ability to earn is your biggest asset. Over a career, being unable to work for months or years from an
        illness or injury is <strong>more likely than dying early</strong>, and it is far more common than most people
        expect. Social Security disability is hard to get and pays little.
      </p>
      <Table
        headers={['Type', 'How long it pays', 'Notes']}
        rows={[
          [<strong key="a">Short-term disability</strong>, 'A few weeks to a few months', 'Often through work. California also has State Disability Insurance (SDI), which you pay through your paycheck'],
          [<strong key="b">Long-term disability</strong>, 'Years, or until retirement', 'Typically 50% to 70% of your salary. Offered by many employers. Individual policies are available too'],
        ]}
      />
      <Callout type="info" title="A subtle tax rule">
        If your employer pays the premium, the benefit you receive is <strong>taxable</strong>. If you pay the premium with
        after-tax money, the benefit is tax-free. If the work plan is good and cheap, take it. If you are a 1099 worker
        or your plan is thin, price an individual policy.
      </Callout>
      <p>
        Do you need it? If you would have trouble paying bills within a few months without your paycheck, yes. A
        1099 worker needs it even more, because there is no employer plan.
      </p>

      <Section title="Umbrella insurance: protect your savings from a lawsuit" />
      <p>
        An umbrella policy adds <strong>$1 million or more of liability coverage on top of your auto and home policies</strong>.
        It costs roughly $150 to $300 a year for the first million. It covers things like a serious car crash, or an
        injury at your home. It matters once you have savings, a home or high future earnings that a lawsuit could target.
      </p>
      <Table
        headers={['Net worth and exposure', 'Umbrella?']}
        rows={[
          ['Just starting out, little to lose', 'Not yet. Carry strong auto and home liability'],
          ['Savings, a home, rising income', 'Yes, $1 million'],
          ['Rental property, a business, a teen driver', 'Yes, and consider $2 million or more'],
        ]}
      />
      <p>Insurers usually require you to carry high underlying limits (like 250/500 auto) before they sell an umbrella.</p>

      <Section title="What to skip" />
      <Compare
        goodLabel="Worth it"
        badLabel="Skip these"
        good={
          <>
            <p>Health, auto liability, renters or home, term life (if dependents), disability, umbrella (when you have assets).</p>
          </>
        }
        bad={
          <>
            <p><strong>Extended warranties</strong> on phones, appliances and cars. You can afford to replace the item.</p>
            <p><strong>Credit life and mortgage life insurance.</strong> Term life is cheaper and better.</p>
            <p><strong>Cancer-only, accident-only and hospital-indemnity policies.</strong> Good health insurance already covers these.</p>
            <p><strong>Life insurance on children.</strong> Nobody depends on a child’s income.</p>
            <p><strong>Whole life, universal life, and investment-linked insurance.</strong></p>
            <p><strong>Rental-car collision at the counter,</strong> if your own auto or credit card covers it.</p>
          </>
        }
      />

      <Callout type="tip" title="The rule again">
        If you could replace it from your emergency fund without much pain, skip the insurance. Insure only what would
        really hurt.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which is the biggest asset that disability insurance protects?"
          options={['Your car', 'Your ability to earn an income', 'Your phone', 'Your home']}
          correctIndex={1}
          explanation="Losing the ability to work for years would damage your finances more than almost anything else."
        />
        <Quiz
          question="Which of these is usually NOT worth buying?"
          options={['Term life with dependents', 'An extended warranty on a $400 phone', 'Renters insurance', 'Umbrella insurance with a house and savings']}
          correctIndex={1}
          explanation="You can afford to replace a $400 phone, so extended warranties are poor value."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Disability insurance protects your income. It is more likely to be needed than life insurance.',
          'An umbrella adds $1 million of liability coverage for about $150 to $300 a year once you have assets.',
          'Skip extended warranties, credit life, cancer-only policies, child life policies and whole life.',
          'Insure what would really hurt. Self-insure the rest with your emergency fund.',
        ]}
      />
    </div>
  );
}
