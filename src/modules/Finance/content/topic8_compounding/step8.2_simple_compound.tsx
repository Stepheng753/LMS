import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { CompoundCalculator } from '../../calculators';

export default function Step8_2_SimpleCompound() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Compounding"
        title="Simple Interest vs Compound Interest"
        summary="Two ways to earn 10%. One grows in a straight line. The other curves upward, and the gap becomes enormous."
      />

      <Section title="Simple interest: earn on the original only" />
      <p>
        With simple interest you earn 10% of the <strong>original $10,000</strong> every year: $1,000 each year, forever.
        After 10 years you have $10,000 + 10 × $1,000 = <strong>$20,000</strong>.
      </p>

      <Section title="Compound interest: earn on the original and on past earnings" />
      <p>
        With compound interest the $1,000 you earn in year 1 is added to the balance. In year 2 you earn 10% on
        $11,000, not on $10,000. Each year you earn on a bigger number.
      </p>
      <Formula label="Compound growth" where={[{ symbol: 'P', meaning: 'the starting amount' }, { symbol: 'r', meaning: 'the yearly rate as a decimal' }, { symbol: 'n', meaning: 'the number of years' }]}>
        future value = P × (1 + r)^n
      </Formula>

      <Section title="Side by side, $10,000 at 10%" />
      <Table
        headers={['Year', 'Simple interest', 'Compound interest', 'Compound ahead by']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['1', '$11,000', '$11,000', '$0'],
          ['2', '$12,000', '$12,100', '$100'],
          ['3', '$13,000', '$13,310', '$310'],
          ['4', '$14,000', '$14,641', '$641'],
          ['5', '$15,000', '$16,105', '$1,105'],
          ['10', '$20,000', '$25,937', '$5,937'],
          ['20', '$30,000', '$67,275', '$37,275'],
          ['30', '$40,000', '$174,494', '$134,494'],
          ['40', '$50,000', '$452,593', '$402,593'],
        ]}
      />
      <Callout type="success" title="Look at the gap">
        In year 1 the two are identical. In year 40, compound interest has made nine times as much as simple interest
        ($452,593 vs $50,000). Nothing changed but one rule: earnings are allowed to earn.
      </Callout>

      <Section title="Where each shows up" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Compound interest works for you</strong> in investments, retirement accounts and savings.</li>
        <li><strong>Compound interest works against you</strong> on credit card debt (Topic 1). The same math, in reverse: interest charged on interest.</li>
        <li>Almost nothing in the real world pays <em>simple</em> interest over decades. Understand compound, and you understand both.</li>
      </ul>

      <Section title="Try it" />
      <p>
        A single $10,000 at 10%, no deposits after the start. Change the years and the rate. Watch the year-by-year table.
      </p>
      <CompoundCalculator start={10000} yearly={0} rate={10} years={10} title="One $10,000 deposit, compounding" />

      <QuizSet title="Check yourself">
        <Quiz
          question="$10,000 earns 10% simple interest for 10 years. What is the total?"
          options={['$11,000', '$20,000', '$25,937', '$100,000']}
          correctIndex={1}
          explanation="$1,000 a year for 10 years added to the original $10,000."
        />
        <Quiz
          question="What makes compound interest different?"
          options={['A higher rate', 'You earn interest on your past interest too', 'It lasts longer', 'It is taxed less']}
          correctIndex={1}
          explanation="Each year the base grows, so each year's earnings grow."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Simple: the same dollars every year. Compound: a bigger and bigger amount each year.',
          'Future value = P × (1 + r)^n.',
          '$10,000 at 10% for 40 years: simple $50,000, compound $452,593.',
          'The same math makes credit card debt explode. Know both sides.',
        ]}
      />
    </div>
  );
}
