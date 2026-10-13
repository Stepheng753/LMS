import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { TaxBrackets } from '../../calculators';

export default function Step4_1_Brackets() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="How Brackets Work: Marginal vs Effective"
        summary="A higher bracket does not tax all your income at the higher rate. Only the dollars above the line."
      />

      <Callout type="warning" title="The most common tax myth">
        &quot;If I earn more, I will jump into a higher bracket and take home <em>less</em>.&quot; This is false. A bracket taxes
        only the dollars <strong>inside it</strong>. A raise can never make you earn less after tax.
      </Callout>

      <Section title="Buckets, not a ladder" />
      <p>
        Think of your income filling a row of buckets. The first bucket is taxed at 10%. When it is full, the next
        dollars spill into a 12% bucket, then 22%, and so on. Each dollar is taxed at the rate of the bucket it lands in.
        Only the very last dollars are taxed at your top rate.
      </p>
      <Table
        headers={['Vocabulary', 'Meaning', 'Example (single, $100,000 salary)']}
        rows={[
          [<strong key="a">Taxable income</strong>, 'Income after deductions. The amount that fills the buckets', '$83,900'],
          [<strong key="b">Marginal rate</strong>, 'The rate on your last dollar: the bucket you are in', '22%'],
          [<strong key="c">Effective rate</strong>, 'Total tax divided by income: your true average', '13.2% of gross for federal income tax'],
        ]}
      />
      <Formula label="Effective rate">effective rate = total tax ÷ income</Formula>

      <Section title="The $100,000 example, bucket by bucket (federal, 2026, single)" />
      <p>The standard deduction for a single filer in 2026 is $16,100. So taxable income is $100,000 − $16,100 = <strong>$83,900</strong>.</p>
      <Table
        headers={['Bucket (rate)', 'Dollars in it', 'Tax']}
        align={['left', 'right', 'right']}
        rows={[
          ['10% (first $12,400)', '$12,400', '$1,240'],
          ['12% ($12,400 to $50,400)', '$38,000', '$4,560'],
          ['22% ($50,400 to $105,700)', '$33,500', '$7,370'],
          [<strong key="a">Total</strong>, <strong key="b">$83,900</strong>, <strong key="c">$13,170</strong>],
        ]}
      />
      <p>
        Federal income tax is $13,170. That is <strong>13.2% of the $100,000</strong> you earned and 15.7% of the
        taxable income. Only $33,500 was taxed at 22%. The first $50,400 was taxed at 10% and 12%.
      </p>

      <Section title="Why a raise always helps" />
      <p>
        A raise from $100,000 to $101,000 puts the extra $1,000 in the 22% bucket (plus about 9.3% California and 7.65%
        payroll tax). You keep roughly 60 cents of every extra dollar. You do not lose money on the dollars you already
        had. Even jumping from the 22% bucket to the 24% bucket only taxes <em>the dollars above the line</em> at 24%.
      </p>

      <Section title="Try it" />
      <p>
        The calculator shows your federal and California tax, bracket by bracket. Try different incomes, filing statuses
        and pre-tax amounts. Watch the &quot;next $1,000&quot; box: that is the marginal rate in dollars.
      </p>
      <TaxBrackets />

      <QuizSet title="Check yourself">
        <Quiz
          question="You earn $1 more and cross into the next bracket. What happens?"
          options={['All your income is taxed at the higher rate', 'Only that extra dollar is taxed at the higher rate', 'You pay less tax', 'Nothing']}
          correctIndex={1}
          explanation="Brackets tax only the dollars inside each one."
        />
        <Quiz
          question="Total federal tax of $10,000 on income of $80,000. What is the effective rate?"
          options={['10%', '12.5%', '22%', '8%']}
          correctIndex={1}
          explanation="$10,000 ÷ $80,000 = 12.5%."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Income fills buckets. Each bucket has its own rate.',
          'Marginal rate: the bucket your last dollar lands in. Effective rate: total tax ÷ income.',
          'A single $100,000 earner pays about $13,170 in federal income tax: 13.2% of gross, not 22%.',
          'A raise can never reduce your take-home pay.',
        ]}
      />
    </div>
  );
}
