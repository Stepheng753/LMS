import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Start Here"
        title="The Complete Money Review"
        summary="All eleven topics in one place: recaps, the master order of operations, every 2026 number, formulas, a glossary, exams and a 90-day plan."
      />

      <p>
        You have covered debt, income, credit cards, taxes, your paycheck, insurance, investing accounts, compounding,
        retirement, real estate and businesses. This section pulls it together so you can review, look things up, test
        yourself, and then act.
      </p>

      <Callout type="warning" title="A reminder: this is a personal playbook">
        The rules here are strong opinions, written down for you: get out of bad debt, pay cards in full, Roth by
        preference, S&amp;P 500 index funds, 4% withdrawals. Tax numbers are for 2026 and change every year, so check
        irs.gov and ftb.ca.gov before you file. This is not licensed financial or tax advice.
      </Callout>

      <Section title="What is here" />
      <Table
        headers={['Steps', 'What', 'Use it for']}
        rows={[
          [<strong key="a">S.1 to S.5</strong>, 'A recap of each topic: the rules, the numbers, the mistakes', 'Refreshing one topic'],
          [<strong key="b">S.6</strong>, 'The master order of operations and the 12 rules of the playbook', 'Seeing the whole system'],
          [<strong key="c">S.7 to S.10</strong>, 'Glossary, the 2026 numbers sheet, formulas, decision guides', 'Looking things up'],
          [<strong key="d">S.11</strong>, 'Mistakes and red flags, including scams', 'Staying safe'],
          [<strong key="e">S.12 to S.13</strong>, 'Two checkpoint exams', 'Testing yourself'],
          [<strong key="f">S.14</strong>, 'Your 90-day action plan', 'Actually doing it'],
        ]}
      />

      <Section title="Three passes" />
      <Steps
        steps={[
          { title: 'Skim', children: <p>Read each recap quickly. Mark anything that feels hazy.</p> },
          { title: 'Test', children: <p>Take both exams. Each wrong answer points to a topic to reread.</p> },
          { title: 'Act', children: <p>Do the 90-day plan. Reading about money does nothing until you move money.</p> },
        ]}
      />
      <Callout type="info" title="The Toolbox (T) comes next">
        The Toolbox holds worksheets you can download and keep: a budget, a debt list, an emergency fund tracker, a net
        worth sheet, a retirement number worksheet and more.
      </Callout>

      <KeyTakeaways
        items={[
          'The summary has recaps, the master ladder, references, exams and a 90-day plan.',
          'Use three passes: skim, test, act.',
          'Verify the year’s tax numbers before you file.',
        ]}
      />
    </div>
  );
}
