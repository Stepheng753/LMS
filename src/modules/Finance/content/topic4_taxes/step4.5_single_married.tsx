import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { TaxBrackets } from '../../calculators';

export default function Step4_5_SingleMarried() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="Single vs Married"
        summary="Your filing status changes the brackets, the deduction and the credits. For most couples, marriage costs nothing and often saves."
      />

      <Section title="The filing statuses" />
      <Table
        headers={['Status', 'Who', 'Brackets and deduction']}
        rows={[
          [<strong key="a">Single</strong>, 'Unmarried, no dependents qualifying you for another status', 'The single brackets. $16,100 standard deduction'],
          [<strong key="b">Married filing jointly</strong>, 'Married couples who combine their income on one return', 'Brackets about double the single ones. $32,200 deduction. Usually best'],
          [<strong key="c">Married filing separately</strong>, 'Married but each files alone', 'Usually costs more. Used in special cases, like some student loan plans'],
          [<strong key="d">Head of household</strong>, 'Unmarried and paying more than half the costs of a home for a dependent', 'In between: wider brackets than single, deduction $24,150'],
        ]}
      />

      <Section title="Two earners or one: the same, or better" />
      <p>For most incomes, the married brackets are exactly double the single ones (up to the 35% bracket). The standard deduction is double, too. Look at the numbers (federal, 2026, no kids, no pre-tax deductions):</p>
      <Table
        headers={['Who earns what', 'Filing', 'Federal tax', 'California tax']}
        align={['left', 'left', 'right', 'right']}
        rows={[
          ['Two people each earning $100,000', 'Two single returns', '$26,340', '$9,822'],
          ['The same two people, married', 'One joint return on $200,000', '$26,340', '$9,822'],
          ['One person earning $200,000', 'Single', '$36,734', '$14,211'],
          ['The same $200,000 earned by one spouse, married', 'Joint', '$26,340', '$9,822'],
        ]}
      />
      <Callout type="info" title="What this shows">
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>If both spouses earn about the same</strong>, marriage changes almost nothing. There is no &quot;marriage penalty&quot; at ordinary incomes.</li>
          <li><strong>If one spouse earns most of the money</strong>, marriage saves a lot: here $10,394 federal and $4,389 in California a year, because the single earner&apos;s income fills the married buckets more slowly.</li>
        </ul>
      </Callout>

      <Section title="Where a marriage penalty can show up" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>The top bracket.</strong> The 37% bracket starts at $768,700 for couples but $640,600 for each single person, so two very high earners pay slightly more together.</li>
        <li><strong>Credits that phase out</strong> at income thresholds that are not doubled, like some education and low-income credits.</li>
        <li><strong>Roth IRA limits.</strong> The joint Roth IRA income phase-out is $242,000 to $252,000, not double the single limit (Topic 7).</li>
        <li><strong>Itemized deduction caps</strong>, such as the state and local tax cap, are the same for a couple as for one person.</li>
      </ul>

      <Section title="Compare your own situation" />
      <p>Use the calculator. Set income to $100,000 and compare single with married, then try $200,000 on each.</p>
      <TaxBrackets income={200000} status="married" />

      <Section title="Other things that change when you marry" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Health plans:</strong> family coverage is often cheaper than two single plans, or the reverse. Compare. The HSA family limit is $8,750 in 2026 (vs $4,400 single).</li>
        <li><strong>Retirement accounts:</strong> each spouse has their own 401k and IRA limits. A non-working spouse can still have an IRA, called a spousal IRA.</li>
        <li><strong>Withholding:</strong> two incomes on one return can leave you under-withheld. Check the W-4 (Topic 5).</li>
        <li><strong>Insurance and legal:</strong> beneficiaries, wills and life insurance need an update (Topic 6).</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="Two spouses each earn $100,000. How does their combined federal tax compare with two single returns?"
          options={['Much higher', 'About the same', 'Much lower', 'Zero']}
          correctIndex={1}
          explanation="The married brackets and deduction are double the single ones at these incomes."
        />
        <Quiz
          question="When does marriage save the most tax?"
          options={['When both earn the same', 'When one spouse earns most of the income', 'Never', 'When both are unemployed']}
          correctIndex={1}
          explanation="One high income fills the wider joint buckets more slowly."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Filing statuses: single, married jointly, married separately, head of household.',
          'Married brackets and the standard deduction are double the single ones for most incomes.',
          'Equal earners pay the same. A single large earner often saves $10,000 or more at $200,000.',
          'Penalties appear at the top bracket and with certain phase-outs.',
        ]}
      />
    </div>
  );
}
