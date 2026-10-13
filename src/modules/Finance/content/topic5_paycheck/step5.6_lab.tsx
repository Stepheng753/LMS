import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { PaycheckCalculator } from '../../calculators';

export default function Step5_6_Lab() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 5 • Your Paycheck"
        title="The Paycheck Lab: Change Everything"
        summary="Twelve experiments on the $100,000 paycheck. Change one number at a time and predict the result before you look."
      />

      <Callout type="tip" title="How to use the lab">
        Each experiment below tells you what to change and what you should see. The buttons at the top of the calculator
        set many of them in one click. Before you click, <strong>guess the answer</strong>. Then check. Guessing and being
        wrong is how the numbers stick.
      </Callout>

      <PaycheckCalculator title="The paycheck lab" />

      <Section title="Twelve experiments (the base is the $100,000 Roth 401k paycheck: $1,759.64 net)" />
      <Table
        headers={['#', 'Change this', 'You should see', 'What it teaches']}
        rows={[
          ['1', 'Switch the max from Roth to traditional (4,500)', 'Net rises to $2,049.50. Total taxes fall from $25,199 to $17,663', 'A traditional contribution defers tax. The Roth pays it now'],
          ['2', 'Cut the Roth to 4% ($4,000, the match)', 'Net rises to $2,548.10. Saved for you $8,000 including the match', 'The match is the most valuable $153.85 per paycheck'],
          ['3', 'Set both 401k boxes to zero', 'Net rises to $2,701.94. You save and receive no match', 'Take-home is not the same as wealth'],
          ['4', 'Add an HSA of $4,400 (Roth maxed)', 'Net falls to $1,642.78 (about $117), federal tax falls, California tax does not', 'The HSA lowers federal and payroll tax, but not California tax'],
          ['5', 'Add the HSA and an FSA of $3,400', 'Net $1,564.65. Total taxes $22,469', 'Pre-tax accounts lower Social Security and Medicare too'],
          ['6', 'Switch to paid monthly (premiums scale to match)', 'Net per paycheck $3,812.54. Yearly net the same: $45,750', 'Pay frequency changes the stub, not the year'],
          ['7', 'Switch to married, 2 kids, family health, HSA at the family limit', 'Federal withholding drops to $35.63 per paycheck. Net $1,829.84', 'Credits are powerful, and filing status matters (a one-earner family)'],
          ['8', 'Change salary to $250,000', 'Net per paycheck $5,156.40. Taxes 34.8% of gross. Match becomes $10,000', 'Higher brackets, but Social Security stops at $184,500'],
          ['9', 'Add $20,000 of other income with no tax withheld', 'Stub is unchanged, but at tax time you owe about $6,260', 'Income outside the paycheck is not withheld on'],
          ['10', 'Add $100 of extra federal withholding per paycheck', 'Net falls to $1,659.64. Refund of $2,600', 'Extra withholding is a refund: an interest-free loan to the government'],
          ['11', 'Move health, dental and vision premiums to zero', 'Net rises only $104.56, to $1,864.20, not by $175. Total taxes rise from $25,199 to $27,031', 'Premiums are pre-tax, so each $1 of premium costs you only about 60 cents of take-home pay'],
          ['12', 'Max traditional 401k and zero benefits', 'Net $2,156.34. Federal tax falls to $299.23 per paycheck', 'Stacking pre-tax deductions has the biggest impact on taxes'],
        ]}
      />
      <p className="text-sm text-muted-foreground">
        Estimates for 2026 using IRS and California FTB figures. Real withholding depends on your employer&apos;s payroll
        system and your W-4, so your actual stub will differ slightly.
      </p>

      <Section title="Questions to answer from the lab" />
      <Exercise
        title="Find the paycheck that fits you"
        hint={<p>Start from the base, then adjust the 401k until the net pay matches your monthly budget from Topic 2.</p>}
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>The match is always the first move: 4% costs $153.85 per paycheck and adds $4,000 of free money.</li>
            <li>Pick the highest contribution you can sustain after your fixed expenses and debt payments.</li>
            <li>Check whether you also want an HSA (needs a high-deductible plan) and an FSA.</li>
            <li>Write down: net pay per paycheck, taxes per year, and total saved per year including the match.</li>
          </ul>
        }
      >
        <p>Suppose your fixed expenses are $2,500 a month and you want to keep $500 a month for fun. How much could you put in a Roth 401k each paycheck and still cover everything on a $100,000 salary?</p>
      </Exercise>
      <Exercise
        title="Predict, then check"
        solution={
          <p>
            Dropping from the max to the match raises take-home by <strong>$788.46 per paycheck</strong> ($2,548.10 −
            $1,759.64) but costs $20,500 of retirement saving a year. Each $1 of take-home you gain by skipping the Roth
            is a dollar you will not have invested.
          </p>
        }
      >
        <p>Before you try it: if you cut the Roth from the maximum to just the 4% match, how much does take-home pay rise per paycheck, and how much less do you save each year?</p>
      </Exercise>

      <KeyTakeaways
        items={[
          'Every number is a dial. Guess first, then check.',
          'The match is the best deal. HSA and FSA lower payroll taxes too.',
          'Pay frequency changes the stub, not the year.',
          'Credits, dependents and filing status can change withholding dramatically.',
          'Income that is not withheld on is owed at tax time.',
        ]}
      />
    </div>
  );
}
