import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step2_8_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 2 • Cheat Sheet"
        title="Topic 2 Cheat Sheet and Quiz"
        summary="Income and expenses on one page, then a check."
      />

      <Section title="The rules" />
      <Table
        headers={['Rule', 'In one line']}
        rows={[
          ['The equation', 'Savings = income − expenses'],
          ['The two levers', 'Spending has a floor. Income has no ceiling. Pull income harder'],
          ['The philosophy', 'Fixed income covers fixed expenses. Variable income covers variable expenses. Save the rest'],
          ['Variable income', 'You must have it next to your 9-to-5'],
          ['W-2', 'Employer shares the payroll taxes and the benefits with you: you carry about half'],
          ['1099', 'You pay full price for the taxes (about 14.1% of profit) and the benefits'],
          ['Fixed-expense test', 'Fixed expenses 50% or less of fixed income. Housing under about 30% of gross'],
          ['Emergency fund', '3 to 6 months of essentials, 6 or more for variable income, in a separate high-yield savings account'],
          ['Raises', 'Half to investing, half to enjoy. Delay new fixed expenses'],
        ]}
      />

      <Callout type="success" title="The big idea">
        Earn more with a variable income, pay fixed bills with fixed pay, and save the rest automatically. Everything
        in the next topics is about where that saved money goes.
      </Callout>

      <QuizSet title="Topic 2 Quiz">
        <Quiz
          question="On a W-2, who pays the employer share of Social Security and Medicare?"
          options={['You', 'Your employer', 'The IRS', 'Nobody']}
          correctIndex={1}
          explanation="The employer pays a matching share, so you carry about half of the total."
        />
        <Quiz
          question="What is the total payroll tax a 1099 contractor pays, as a rough percent of profit?"
          options={['About 7.65%', 'About 14.1%', 'About 30%', 'Zero']}
          correctIndex={1}
          explanation="15.3% applied to 92.35% of profit is about 14.1%."
        />
        <Quiz
          question="Your fixed income is $5,000 and your fixed expenses are $3,800. Is this comfortable under the 50% test?"
          options={['Yes', 'No: they are 76% of fixed income', 'Cannot tell', 'Only if you have a side income']}
          correctIndex={1}
          explanation="$3,800 ÷ $5,000 = 76%. One surprise could cause trouble. Cut a fixed cost or raise income."
        />
        <MultiSelectQuiz
          question="Which of these are variable expenses? (Pick all)"
          options={['Groceries', 'Rent', 'Eating out', 'Shopping']}
          correctIndexes={[0, 2, 3]}
          explanation="Rent is fixed. The others change with your choices."
        />
        <Quiz
          question="Why must you have a variable income?"
          options={['It is the law', 'A salary has a ceiling and is a single point of failure', 'It lowers taxes', 'To avoid saving']}
          correctIndex={1}
          explanation="Variable income has no ceiling and gives you a backup."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Savings = income − expenses. Earn more, with a variable income.',
          'Fixed covers fixed, variable covers variable, save the rest, automatically.',
          'W-2 shares the cost. 1099 pays full price.',
          'Emergency fund, then every raise split half and half.',
        ]}
      />
    </div>
  );
}
