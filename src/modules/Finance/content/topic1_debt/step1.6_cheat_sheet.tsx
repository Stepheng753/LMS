import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_6_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 1 • Cheat Sheet"
        title="Topic 1 Cheat Sheet and Quiz"
        summary="Everything about debt on one page, then a check."
      />

      <Section title="The formulas" />
      <Table
        headers={['What', 'Formula', 'Example']}
        rows={[
          ['Monthly interest', 'balance × APR ÷ 12', '$5,000 × 22% ÷ 12 = $91.67'],
          ['Part of a payment that reduces debt', 'payment − interest', '$125 − $91.67 = $33.33'],
          ['Cost of a loan', 'total of all payments − amount borrowed', '$43,000 − $35,000 = $8,000 on a car'],
        ]}
      />

      <Section title="The rules" />
      <Table
        headers={['Rule', 'In one line']}
        rows={[
          ['Bad debt', 'Cards, store cards, car loans, personal loans, buy-now-pay-later: get out'],
          ['Caveat', 'A comfortable mortgage or low-rate education that raises income can be reasonable'],
          ['Method', 'Snowball: smallest balance first, roll the payment forward'],
          ['Extra money', 'Every extra dollar to principal. Raises, bonuses and refunds go to debt'],
          ['While paying', 'Stop adding new debt. Keep the match. Hold a $1,000 starter cushion'],
          ['Never', 'Payday loans, settlement companies, 401k loans for cards'],
        ]}
      />

      <Callout type="success" title="The big idea">
        A paid-off 22% card is a guaranteed 22% return. Nothing else in finance guarantees that much. Get out of bad
        debt first. Everything else in the course gets easier after.
      </Callout>

      <QuizSet title="Topic 1 Quiz">
        <Quiz
          question="Which is the best example of bad debt?"
          options={['A comfortable mortgage', 'A credit card balance carried month to month', 'An affordable business loan with a plan', 'Low-rate student loan for a high-paying degree']}
          correctIndex={1}
          explanation="Cards charge the highest rates and buy things that are already used up."
        />
        <Quiz
          question="$2,400 at 15% APR. Interest charged this month?"
          options={['$3', '$30', '$360', '$300']}
          correctIndex={1}
          explanation="$2,400 × 15% ÷ 12 = $30."
        />
        <Quiz
          question="In snowball, which debt gets the extra money first?"
          options={['The highest rate', 'The smallest balance', 'The newest debt', 'The one you like']}
          correctIndex={1}
          explanation="Smallest balance first, for quick wins."
        />
        <MultiSelectQuiz
          question="Which of these help you get out of debt? (Pick all)"
          options={['Stop adding new debt', 'Send raises and refunds to the debt', 'Take out a payday loan for the minimums', 'Call and ask for a lower rate']}
          correctIndexes={[0, 1, 3]}
          explanation="A payday loan creates a much more expensive problem."
        />
        <FillInQuiz
          question="Paying off a card that charges 22% is like earning a guaranteed ___% return."
          answer="22"
          explanation="Every dollar you pay off stops charging 22% forever."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Interest this month = balance × APR ÷ 12.',
          'Bad debt: cards, car loans, personal loans, buy-now-pay-later. Get out.',
          'Snowball: smallest first, roll the payment forward.',
          'Then every freed-up dollar moves down the order of operations.',
        ]}
      />
    </div>
  );
}
