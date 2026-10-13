import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_2_Federal() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="Federal Tax Brackets: 2026"
        summary="The seven brackets, the standard deduction, and the path from salary to tax."
      />

      <Section title="The brackets for 2026 (taxable income)" />
      <Table
        headers={['Rate', 'Single', 'Married filing jointly']}
        rows={[
          ['10%', 'up to $12,400', 'up to $24,800'],
          ['12%', '$12,401 to $50,400', '$24,801 to $100,800'],
          ['22%', '$50,401 to $105,700', '$100,801 to $211,400'],
          ['24%', '$105,701 to $201,775', '$211,401 to $403,550'],
          ['32%', '$201,776 to $256,225', '$403,551 to $512,450'],
          ['35%', '$256,226 to $640,600', '$512,451 to $768,700'],
          ['37%', 'over $640,600', 'over $768,700'],
        ]}
      />
      <p className="text-sm text-muted-foreground">Source: IRS Revenue Procedure 2025-32 (October 2025), reflecting the One Big Beautiful Bill Act. These apply to income earned in 2026 and returns filed in 2027. Head of household has its own brackets (not shown here).</p>

      <Section title="The standard deduction, 2026" />
      <Table
        headers={['Filing status', 'Standard deduction']}
        align={['left', 'right']}
        rows={[
          ['Single', '$16,100'],
          ['Married filing jointly', '$32,200'],
          ['Head of household', '$24,150'],
        ]}
      />
      <p>The standard deduction is income you never pay federal tax on. It is applied automatically unless you itemize (step 4.4).</p>

      <Section title="From salary to federal tax: the path" />
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>Gross pay.</strong> Your salary, $100,000.</li>
        <li><strong>Subtract pre-tax deductions.</strong> Traditional 401k, HSA, health insurance premiums. (A Roth 401k is not one of them.)</li>
        <li><strong>Subtract the standard deduction.</strong> That gives taxable income.</li>
        <li><strong>Run it through the brackets</strong> (step 4.1).</li>
        <li><strong>Subtract credits</strong> such as the child tax credit.</li>
        <li>The result is your <strong>federal income tax</strong>.</li>
      </ol>

      <Section title="A $100,000 salary, three ways" />
      <Table
        headers={['Scenario (single)', 'Taxable income', 'Federal tax', 'Marginal rate']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['No pre-tax deductions', '$83,900', '$13,170', '22%'],
          ['$24,500 traditional 401k', '$59,400', '$7,780', '22%'],
          ['$100,000 married filing jointly, no kids', '$67,800', '$7,640', '12%'],
        ]}
      />
      <Callout type="info" title="Notice what happens with a traditional 401k">
        Putting $24,500 into a traditional 401k lowers federal tax by about $5,390 and California tax by about $2,200,
        so around $7,600 in total. That is the tax break of the traditional account. A Roth gives it up now in exchange
        for tax-free growth later. Topic 7 builds that choice in detail.
      </Callout>

      <Section title="What the federal tax does NOT include" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Social Security and Medicare</strong> (7.65% of wages): a separate payroll tax (Topic 5).</li>
        <li><strong>California income tax and SDI</strong> (step 4.3).</li>
        <li><strong>Self-employment tax</strong> on 1099 income (step 4.7).</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="A single person has taxable income of $40,000 in 2026. What is their marginal federal rate?"
          options={['10%', '12%', '22%', '24%']}
          correctIndex={1}
          explanation="$40,000 is between $12,400 and $50,400, which is the 12% bucket."
        />
        <Quiz
          question="What is the 2026 federal standard deduction for a single filer?"
          options={['$12,400', '$16,100', '$24,150', '$32,200']}
          correctIndex={1}
          explanation="$16,100 for single filers in 2026."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Seven brackets, 10% to 37%. Single standard deduction $16,100, married $32,200 for 2026.',
          'Path: gross pay, minus pre-tax deductions, minus the standard deduction, through the brackets, minus credits.',
          '$100,000 single: $13,170 federal tax. Traditional 401k at $24,500 cuts about $7,600 across federal and California.',
          'Payroll tax and state tax are separate.',
        ]}
      />
    </div>
  );
}
