import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { PaycheckCalculator } from '../../calculators';

export default function Step5_2_100kPaycheck() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="The $100,000 Paycheck, Line by Line"
        summary="One California salary, every subtraction explained with the math, from $100,000 gross to $1,759.64 net per paycheck."
      />

      <Section title="The setup" />
      <Table
        headers={['Fact', 'Value']}
        rows={[
          ['Salary', '$100,000 a year'],
          ['Paid', 'Every 2 weeks: 26 paychecks, $3,846.15 each'],
          ['Filing status', 'Single, no dependents'],
          ['Health premium (your share)', '$150 per paycheck'],
          ['Dental and vision (your share)', '$25 per paycheck'],
          ['401k', 'Roth 401k at the 2026 maximum of $24,500'],
          ['Employer match', '4% of salary ($4,000), paid by the employer on top of your pay'],
          ['State', 'California (income tax and 1.3% SDI)'],
        ]}
      />

      <Section title="Step by step, with the math" />
      <Steps
        steps={[
          {
            title: 'Start with gross pay: $100,000',
            children: <p>$100,000 ÷ 26 = <strong>$3,846.15</strong> per paycheck.</p>,
          },
          {
            title: 'Subtract pre-tax benefits: $4,550',
            children: <p>($150 + $25) × 26 = $4,550. These come out <em>before</em> income tax and Social Security, so they lower both. Wages for tax purposes are now <strong>$95,450</strong>. The Roth 401k does <strong>not</strong> lower these wages, because it is after-tax.</p>,
          },
          {
            title: 'Federal income tax: $12,169',
            children: (
              <>
                <p>Taxable income = $95,450 − $16,100 standard deduction = <strong>$79,350</strong>.</p>
                <p>10% × $12,400 = $1,240. 12% × $38,000 = $4,560. 22% × $28,950 = $6,369. Total <strong>$12,169</strong>, or $468.04 per paycheck.</p>
              </>
            ),
          },
          {
            title: 'Social Security: $5,918',
            children: <p>6.2% × $95,450 = <strong>$5,917.90</strong>, or $227.61 per paycheck. (The tax stops at $184,500 of wages, not an issue at $100,000.)</p>,
          },
          {
            title: 'Medicare: $1,384',
            children: <p>1.45% × $95,450 = <strong>$1,384.03</strong>, or $53.23 per paycheck. No cap.</p>,
          },
          {
            title: 'California income tax: $4,488',
            children: (
              <>
                <p>Taxable income = $95,450 − $5,900 California standard deduction = <strong>$89,550</strong>.</p>
                <p>Bucket tax of $4,645.71 (1% to 9.3% brackets), minus the $158 personal credit = <strong>$4,487.71</strong>, or $172.60 per paycheck.</p>
              </>
            ),
          },
          {
            title: 'California SDI: $1,241',
            children: <p>1.3% × $95,450 = <strong>$1,240.85</strong>, or $47.72 per paycheck. No wage cap in 2026.</p>,
          },
          {
            title: 'Roth 401k: $24,500',
            children: <p>$24,500 ÷ 26 = <strong>$942.31</strong> per paycheck (24.5% of salary). This is your money, saved. It is deducted, but not lost.</p>,
          },
          {
            title: 'What is left: net pay $45,750.52 a year',
            children: <p>$100,000 − $4,550 − $12,169 − $5,918 − $1,384 − $4,488 − $1,241 − $24,500 = <strong>$45,751</strong>. Per paycheck: <strong>$1,759.64</strong>.</p>,
          },
        ]}
      />

      <Section title="The year in one table" />
      <Table
        headers={['Where the $100,000 goes', 'Per year', 'Per paycheck', '% of gross']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['Net pay (your spending money)', '$45,751', '$1,759.64', '45.8%'],
          ['Roth 401k (your future)', '$24,500', '$942.31', '24.5%'],
          ['Federal income tax', '$12,169', '$468.04', '12.2%'],
          ['Social Security', '$5,918', '$227.61', '5.9%'],
          ['California income tax', '$4,488', '$172.60', '4.5%'],
          ['Health, dental and vision', '$4,550', '$175.00', '4.6%'],
          ['Medicare', '$1,384', '$53.23', '1.4%'],
          ['California SDI', '$1,241', '$47.72', '1.2%'],
        ]}
      />
      <Callout type="success" title="Look at the real tax rate">
        Total taxes (federal, California, Social Security, Medicare, SDI) are about <strong>$25,199, or 25.2%</strong> of
        gross. The federal marginal bracket is 22% and California&apos;s is 9.3%, but those only apply to the last dollars.
        And the biggest single piece is not tax. It is the $24,500 you are paying yourself.
      </Callout>

      <Section title="Open the calculator" />
      <p>
        This is the paycheck above. Every number is live. You will experiment more in step 5.6. For now, compare the
        stub against the math you just did, and nudge the Roth amount to see its effect on net pay.
      </p>
      <PaycheckCalculator compare={false} title="The $100,000 paycheck" />

      <QuizSet title="Check yourself">
        <Quiz
          question="Why do Social Security and income tax wages differ from gross pay?"
          options={['They do not', 'Pre-tax benefits are subtracted first', 'Roth 401k is subtracted first', 'Bonuses are removed']}
          correctIndex={1}
          explanation="Health premiums, HSA and FSA come out before taxes are calculated. A Roth 401k does not."
        />
        <Quiz
          question="In this example, which is bigger: federal income tax or the Roth 401k contribution?"
          options={['Federal income tax', 'The Roth 401k', 'They are equal', 'Social Security']}
          correctIndex={1}
          explanation="$24,500 into the Roth is more than twice the $12,169 of federal income tax."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          '$100,000 gross becomes $45,751 net when you also max a Roth 401k and pay for benefits.',
          'Federal $12,169, Social Security $5,918, California $4,488, Medicare $1,384, SDI $1,241.',
          'Total taxes about 25.2% of gross, although the top federal bracket is 22%.',
          'The largest piece is the $24,500 you save: a deduction, but not a loss.',
        ]}
      />
    </div>
  );
}
