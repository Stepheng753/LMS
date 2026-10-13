import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step6_3_Auto() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Insurance"
        title="Auto Insurance"
        summary="The coverages that matter, the one that really protects your savings, and four ways to pay less."
      />

      <Section title="The coverages" />
      <Table
        headers={['Coverage', 'Pays for', 'Notes']}
        rows={[
          [<strong key="a">Liability (bodily injury + property damage)</strong>, 'Injuries and damage <em>you</em> cause to other people', 'Required by law. The most important coverage, because it protects your savings'],
          [<strong key="b">Collision</strong>, 'Repair or replace <em>your</em> car after a crash, whoever is at fault', 'Optional unless you have a loan or lease'],
          [<strong key="c">Comprehensive</strong>, 'Theft, fire, hail, glass, animals, vandalism', 'Optional unless you have a loan'],
          [<strong key="d">Uninsured / underinsured motorist</strong>, 'Your injuries when the other driver has no insurance or too little', 'Cheap and valuable. Keep it'],
          [<strong key="e">Medical payments</strong>, 'Your medical costs after a crash, regardless of fault', 'Small add-on'],
          [<strong key="f">Rental and roadside</strong>, 'A rental car and towing', 'Cheap extras. Optional'],
        ]}
      />

      <Section title="Liability limits: the number that matters" />
      <p>
        California requires at least <strong>30/60/15</strong>: $30,000 per person injured, $60,000 per accident, $15,000
        for property damage. That is the legal minimum. Look at what it means when a crash is bad: a serious injury can easily
        cost hundreds of thousands. If your limit is $30,000 and the other driver&apos;s bills are $200,000, you can be sued for
        the difference, and your savings, and even future wages, are exposed.
      </p>
      <Callout type="success" title="The playbook recommendation">
        Carry at least <strong>100/300/100</strong>, and more as your assets grow. The extra cost is small compared with the
        protection. When your net worth is high, add an umbrella policy (step 6.6).
      </Callout>

      <Section title="What affects the price" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Your age, driving record and the cars you drive. A newer, faster car costs more to insure.</li>
        <li>Where you park and how far you drive. Rural and low-mileage drivers pay less.</li>
        <li>The limits and deductibles you choose.</li>
        <li>Your claims history and, in many states, your credit-based insurance score.</li>
        <li>Accidents and tickets raise the price for 3 to 5 years.</li>
      </ul>

      <Section title="Four ways to pay less" />
      <Compare
        goodLabel="Savings that make sense"
        badLabel="Savings that do not"
        good={
          <>
            <p><strong>Raise your deductible</strong> from $500 to $1,000 and keep that amount in your emergency fund.</p>
            <p><strong>Shop every year or two.</strong> Loyalty is rarely rewarded.</p>
            <p><strong>Bundle</strong> auto with renters or home insurance.</p>
            <p><strong>Drop collision on an old car</strong> worth less than about 10 times the yearly collision premium.</p>
          </>
        }
        bad={
          <>
            <p>Lowering liability limits to save a few dollars.</p>
            <p>Skipping uninsured motorist coverage.</p>
            <p>Driving uninsured. The fines are large, and one crash can end your finances.</p>
          </>
        }
      />
      <Callout type="info" title="Usage-based plans">
        Some insurers offer discounts if a phone app tracks your driving. Good drivers can save. Understand what is
        tracked, and that bad data can raise your rate at renewal.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which coverage protects your savings from a lawsuit after you injure someone in a crash?"
          options={['Collision', 'Comprehensive', 'Liability', 'Roadside']}
          correctIndex={2}
          explanation="Liability pays for injuries and damage you cause to others."
        />
        <Quiz
          question="Your car is worth $2,500 and collision costs $600 a year. What does the rule of thumb suggest?"
          options={['Keep collision', 'Drop collision: a $2,500 car is worth less than about 10 times the premium', 'Raise the car’s value', 'Switch to liability only on a new car']}
          correctIndex={1}
          explanation="You would pay $600 a year to protect a car worth $2,500 (before your deductible). Self-insure it."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Liability protects your savings. California minimum is 30/60/15. The playbook is at least 100/300/100.',
          'Collision and comprehensive protect your own car. Drop them on old cars worth little.',
          'Keep uninsured-motorist coverage. Shop each year or two. Bundle. Raise the deductible.',
          'Never drive uninsured.',
        ]}
      />
    </div>
  );
}
