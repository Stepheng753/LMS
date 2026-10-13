import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_7_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Cheat Sheet"
        title="Topic 3 Cheat Sheet and Quiz"
        summary="Credit cards on one page, then a check."
      />

      <Section title="The rules" />
      <Table
        headers={['Rule', 'In one line']}
        rows={[
          ['The one rule', 'Never carry a balance. Pay the full statement every month'],
          ['Autopay', 'On, set to the statement balance, with a buffer in checking'],
          ['Debit vs credit', 'In practice the same: only spend what is in checking'],
          ['Billing', 'Billing period, statement closing date, due date at least 21 days later'],
          ['Grace period', 'All or nothing: pay in full for $0 interest'],
          ['Rewards', '1 point is about 1 cent. Never spend extra for rewards'],
          ['Score', 'Pay on time, utilization under 10%, keep old cards open'],
          ['Never', 'Cash advances, store cards at checkout, carrying a balance for rewards'],
        ]}
      />

      <Callout type="success" title="The big idea">
        A credit card is free if you pay it in full and costly if you do not. Everything in this topic is a way to make
        the first path automatic.
      </Callout>

      <QuizSet title="Topic 3 Quiz">
        <Quiz
          question="What should your credit card autopay be set to?"
          options={['The minimum', 'The statement balance', 'A random amount', 'Off']}
          correctIndex={1}
          explanation="The full statement balance keeps the grace period and costs $0."
        />
        <Quiz
          question="What is the value of 1 reward point, as a rule of thumb?"
          options={['1 dollar', '1 cent', '10 cents', '0.1 cent']}
          correctIndex={1}
          explanation="1 point is about 1 cent."
        />
        <Quiz
          question="Which is the best reason to pay down a card before the statement closes?"
          options={['It earns more rewards', 'It lowers the utilization reported to the credit bureaus', 'It cancels the card', 'It stops fraud']}
          correctIndex={1}
          explanation="The balance on the statement date is what is reported."
        />
        <MultiSelectQuiz
          question="Which of these make a credit card behave like a debit card? (Pick all)"
          options={['Only spending what is in checking', 'Autopay on the full statement', 'Treating the limit as extra income', 'Keeping a buffer in checking']}
          correctIndexes={[0, 1, 3]}
          explanation="Treating the limit as income is how people end up in debt."
        />
        <Quiz
          question="You miss a payment by a day. What can happen?"
          options={['Nothing', 'A late fee, a possible penalty APR, and a hit to your score', 'You win a reward', 'The card is paid off']}
          correctIndex={1}
          explanation="That is why autopay matters."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Pay in full, automatically. That is the whole topic.',
          'Rewards are a bonus, never a reason to spend.',
          'A strong score saves tens of thousands of dollars on a mortgage.',
          'Debit or credit, only spend what you already have.',
        ]}
      />
    </div>
  );
}
