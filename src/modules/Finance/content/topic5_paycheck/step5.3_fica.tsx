import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step5_3_Fica() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="Social Security and Medicare (FICA)"
        summary="The payroll taxes that fund retirement and healthcare for older Americans. Where they come from and where they stop."
      />

      <Section title="The rates (2026)" />
      <Table
        headers={['Tax', 'You pay', 'Your employer pays', 'Limit']}
        rows={[
          [<strong key="a">Social Security</strong>, '6.2% of wages', '6.2% more', 'Only on the first $184,500 of wages'],
          [<strong key="b">Medicare</strong>, '1.45% of wages', '1.45% more', 'No limit'],
          [<strong key="c">Additional Medicare</strong>, '0.9% extra', 'nothing', 'On wages over $200,000 (single) or $250,000 (married)'],
          [<strong key="d">Total, both sides</strong>, '7.65%', '7.65%', 'The employer share never shows on your stub'],
        ]}
      />
      <Formula label="Payroll tax per paycheck" where={[{ symbol: 'wages', meaning: 'gross pay minus pre-tax benefits' }]}>
        Social Security = wages × 6.2%    Medicare = wages × 1.45%
      </Formula>

      <Section title="What reduces the wages FICA is calculated on" />
      <Table
        headers={['Deduction', 'Lowers income tax?', 'Lowers FICA wages?']}
        rows={[
          [<strong key="a">Health, dental, vision premiums</strong>, 'Yes', 'Yes'],
          [<strong key="b">HSA (through payroll)</strong>, 'Yes (federal)', 'Yes'],
          [<strong key="c">Health FSA</strong>, 'Yes', 'Yes'],
          [<strong key="d">Traditional 401k</strong>, 'Yes', <strong key="e">No</strong>],
          [<strong key="f">Roth 401k</strong>, 'No', 'No'],
        ]}
      />
      <Callout type="info" title="A surprising fact about the 401k">
        A traditional 401k lowers your <em>income tax</em> but <strong>not</strong> your Social Security and Medicare tax.
        You pay payroll tax on every dollar of pay, even the ones you put into the 401k. HSA and FSA are different: they
        lower both. That is part of why the HSA is such a strong account (Topic 7).
      </Callout>

      <Section title="Examples" />
      <Table
        headers={['Salary', 'Social Security', 'Medicare', 'Total FICA', 'Note']}
        align={['left', 'right', 'right', 'right', 'left']}
        rows={[
          ['$50,000', '$3,100', '$725', '$3,825', '7.65%'],
          ['$100,000', '$6,200', '$1,450', '$7,650', '7.65% (the first number if no pre-tax benefits)'],
          ['$184,500', '$11,439', '$2,675', '$14,114', 'Social Security tax reaches its cap'],
          ['$250,000', '$11,439', '$3,625', '$15,064', 'SS capped. Medicare keeps going. Plus $450 additional Medicare over $200,000'],
        ]}
      />
      <p>
        At $250,000, Social Security has stopped, so the later paychecks of the year are noticeably bigger. A high
        earner&apos;s FICA is a <strong>smaller percentage</strong> of income than a middle earner&apos;s, because of the cap.
      </p>

      <Section title="Why you pay it, and what you get" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Social Security</strong> pays retirement, disability and survivor benefits. Your future benefit depends on your 35 highest-earning years. Check your estimate at ssa.gov.</li>
        <li><strong>Medicare</strong> pays for health coverage starting at age 65.</li>
        <li>Social Security is a safety net, <strong>not enough by itself</strong> for most people. The investing accounts (Topic 7) are what close the gap.</li>
        <li>California does <strong>not</strong> tax Social Security benefits.</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="A W-2 employee earns $80,000 with no pre-tax benefits. What is the Social Security tax?"
          options={['$1,160', '$4,960', '$6,120', '$12,400']}
          correctIndex={1}
          explanation="$80,000 × 6.2% = $4,960."
        />
        <Quiz
          question="Does a traditional 401k contribution reduce Social Security tax?"
          options={['Yes', 'No', 'Only above $100,000', 'Only for married filers']}
          correctIndex={1}
          explanation="A traditional 401k only lowers income tax. FICA is charged on the full wages."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Social Security 6.2% (up to $184,500) plus Medicare 1.45% (no cap): 7.65% for you, and 7.65% more from your employer.',
          'Additional Medicare of 0.9% applies over $200,000 single or $250,000 married.',
          'Premiums, HSA and FSA lower FICA wages. A traditional or Roth 401k does not.',
          'Social Security is a floor, not a full retirement plan.',
        ]}
      />
    </div>
  );
}
