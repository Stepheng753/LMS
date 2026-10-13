import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { EmergencyFund } from '../../calculators';

export default function Step2_5_EmergencyFund() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Safety Net"
        title="The Emergency Fund"
        summary="Cash for when life breaks something, so a bad month never becomes new debt."
      />

      <p>
        The emergency fund is step 2 of the order of operations. It is the barrier between a surprise and a credit card.
        Without it, every unexpected bill becomes debt, and you slide backwards.
      </p>

      <Section title="How big?" />
      <Table
        headers={['Your situation', 'Months of essential expenses', 'Why']}
        rows={[
          ['Steady W-2 job, no dependents', '3 months', 'Job loss is rare and you may find work quickly'],
          ['Steady job, a family or a mortgage', '4 to 6 months', 'More fixed bills, more risk'],
          ['1099 or variable income', '6 months or more', 'Your income can drop without warning'],
          ['Starter fund, while paying off debt', 'About $1,000', 'A first cushion, then attack the debt (Topic 1)'],
        ]}
      />
      <p>
        &quot;Essential expenses&quot; means only what you must pay to stay afloat: housing, food, utilities, insurance, minimum
        debt payments, transport. Not fun money. Example: if essentials are $3,200 a month, four months is $12,800.
      </p>

      <Section title="Where does it live?" />
      <ul className="list-disc pl-5 space-y-1">
        <li>In a <strong>high-yield savings account</strong> at an FDIC-insured online bank. FDIC insurance protects up to $250,000 per bank.</li>
        <li><strong>Separate from your checking account</strong>, so you do not spend it by accident.</li>
        <li><strong>Not in the stock market.</strong> You need it to be there at full value on the worst day. Safe and boring is the point.</li>
      </ul>

      <Callout type="warning" title="What counts as an emergency?">
        A lost job, a car repair you need to get to work, a medical bill, an urgent home repair. <strong>Not</strong> a sale,
        a vacation, or a gift. Rule of thumb: if it is unexpected, necessary and urgent, it is an emergency.
      </Callout>

      <Section title="How fast to build it" />
      <p>
        Interest on a savings account matters little. Your monthly deposit does the work. Use the calculator to see how
        many months until your target. Start with a small number of months (a pair of weeks of essentials) and grow it.
      </p>
      <EmergencyFund />

      <Callout type="info" title="When you use it, refill it">
        Using the fund is the point. After an emergency, rebuild before you go back to extra investing. Treat it like a
        fire extinguisher: you check the gauge, and replace it after use.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="Where should an emergency fund be kept?"
          options={['In stocks, for growth', 'In a separate high-yield savings account', 'In cash under the mattress', 'In a credit card']}
          correctIndex={1}
          explanation="You need it available at full value, and separate enough that you do not spend it."
        />
        <Quiz
          question="Which person should hold a bigger emergency fund?"
          options={['A salaried employee with a stable job', 'A freelancer with variable income', 'Both the same', 'Neither needs one']}
          correctIndex={1}
          explanation="Variable income can stop without warning, so six months or more is wise."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Order of operations step 2: a cushion before investing.',
          '3 to 6 months of essentials, 6 or more for variable income, a $1,000 starter while paying off debt.',
          'Keep it in a separate, FDIC-insured high-yield savings account.',
          'Emergency means unexpected, necessary and urgent. Refill it after use.',
        ]}
      />
    </div>
  );
}
