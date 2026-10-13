import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_9_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Cheat Sheet"
        title="Topic 5 Cheat Sheet and Quiz"
        summary="The paycheck on one page, then a check."
      />

      <Section title="The $100,000 paycheck (California, single, 26 paychecks, Roth 401k maxed)" />
      <Table
        headers={['Line', 'Per year', 'Per paycheck']}
        align={['left', 'right', 'right']}
        rows={[
          ['Gross pay', '$100,000', '$3,846.15'],
          ['Health, dental, vision (pre-tax)', '−$4,550', '−$175.00'],
          ['Federal income tax', '−$12,169', '−$468.04'],
          ['Social Security 6.2%', '−$5,918', '−$227.61'],
          ['Medicare 1.45%', '−$1,384', '−$53.23'],
          ['California income tax', '−$4,488', '−$172.60'],
          ['California SDI 1.3%', '−$1,241', '−$47.72'],
          ['Roth 401k (post-tax)', '−$24,500', '−$942.31'],
          [<strong key="a">Net pay</strong>, <strong key="b">$45,751</strong>, <strong key="c">$1,759.64</strong>],
        ]}
      />

      <Section title="The rules" />
      <Table
        headers={['Rule', 'In one line']}
        rows={[
          ['Pre-tax vs post-tax', 'Pre-tax lowers income tax now. A Roth is post-tax and tax-free later'],
          ['FICA', 'Social Security 6.2% up to $184,500, Medicare 1.45% with no cap. A 401k does not reduce it'],
          ['Benefits', 'Premiums, HSA and FSA reduce income tax and FICA'],
          ['The match', 'Always take it. $153.85 per paycheck brings $4,000'],
          ['W-4', 'Sets withholding, not your tax. Aim for a small refund'],
          ['Estimate', 'A stub assumes the paycheck repeats. Other income, bonuses and life changes cause drift'],
          ['Budgeting', '26 paychecks: budget by 2 a month, send the third to your goals'],
        ]}
      />

      <Callout type="success" title="The big idea">
        Gross is a promise. Net is reality. Know the difference, check every line, and decide on purpose how much of the
        paycheck goes to your future before you ever see it.
      </Callout>

      <QuizSet title="Topic 5 Quiz">
        <Quiz
          question="Which of these lowers your Social Security tax?"
          options={['A traditional 401k', 'A Roth 401k', 'Health insurance premiums', 'A bonus']}
          correctIndex={2}
          explanation="Premiums, HSA and FSA are taken out before FICA is calculated. A 401k is not."
        />
        <Quiz
          question="What is the difference in take-home between a traditional and a Roth 401k at $24,500, in the example?"
          options={['$0', 'About $290 per paycheck', 'About $2,900 per paycheck', 'About $29 per paycheck']}
          correctIndex={1}
          explanation="$2,049.50 vs $1,759.64: the tax paid now with the Roth."
        />
        <Quiz
          question="You have $20,000 of freelance income with no withholding. How do you avoid a surprise bill?"
          options={['Do nothing', 'Add withholding on the W-4 or make quarterly estimated payments', 'Wait for April', 'Quit the job']}
          correctIndex={1}
          explanation="Withholding does not see income outside the paycheck."
        />
        <MultiSelectQuiz
          question="Which of these are pre-tax? (Pick all)"
          options={['Health premium', 'Roth 401k', 'HSA', 'Health FSA']}
          correctIndexes={[0, 2, 3]}
          explanation="A Roth 401k is taken out after tax."
        />
        <FillInQuiz
          question="With a paycheck every two weeks you get ___ paychecks a year."
          answer="26"
          explanation="52 weeks divided by 2."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Gross $100,000 becomes $1,759.64 per paycheck with a maxed Roth 401k, benefits and California taxes.',
          'Pre-tax items cost less than a dollar of take-home. A Roth costs a full dollar now.',
          'The W-4 and withholding are estimates. Update after life changes.',
          'Always take the match.',
        ]}
      />
    </div>
  );
}
