import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { LimitsTable } from '../../calculators';

export default function StepS_8_Numbers() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Reference"
        title="The 2026 Numbers Sheet"
        summary="Every tax and limit number in the course on one page. Check irs.gov and ftb.ca.gov each year."
      />

      <Callout type="warning" title="These change every year">
        2026 figures from IRS Revenue Procedure 2025-32 and IRS retirement notices, and California FTB 2026 indexed amounts.
        California publishes its full 2026 schedules in late December, so confirm the upper brackets. Always check the
        current year.
      </Callout>

      <Section title="Federal income tax (taxable income)" />
      <Table
        headers={['Rate', 'Single', 'Married filing jointly']}
        rows={[
          ['10%', 'up to $12,400', 'up to $24,800'],
          ['12%', 'to $50,400', 'to $100,800'],
          ['22%', 'to $105,700', 'to $211,400'],
          ['24%', 'to $201,775', 'to $403,550'],
          ['32%', 'to $256,225', 'to $512,450'],
          ['35%', 'to $640,600', 'to $768,700'],
          ['37%', 'over $640,600', 'over $768,700'],
        ]}
      />

      <Section title="California income tax (taxable income, single)" />
      <Table
        headers={['Rate', 'Single', 'Joint = double']}
        rows={[
          ['1%', 'up to $11,456', '$22,912'],
          ['2%', 'to $27,157', '$54,314'],
          ['4%', 'to $42,861', '$85,722'],
          ['6%', 'to $59,498', '$118,996'],
          ['8%', 'to $75,197', '$150,394'],
          ['9.3%', 'to $384,109', '$768,218'],
          ['10.3%, 11.3%, 12.3%', 'to $460,927, $768,213, above', 'double'],
        ]}
      />

      <Section title="Deductions, credits, payroll" />
      <Table
        headers={['Item', 'Number']}
        rows={[
          ['Federal standard deduction', '$16,100 single, $32,200 married, $24,150 head of household'],
          ['California standard deduction', '$5,900 single, $11,800 joint'],
          ['Child tax credit', '$2,200 per child under 17 ($500 other dependents)'],
          ['California exemption credits', '$158 single, $316 joint, $491 per dependent'],
          ['Social Security', '6.2% up to $184,500 of wages'],
          ['Medicare', '1.45% on all wages, plus 0.9% over $200,000 (single) or $250,000 (married)'],
          ['California SDI', '1.3% of all wages, no cap'],
          ['Self-employment tax', '15.3% of 92.35% of profit'],
          ['Long-term capital gains', '0% to $49,450 single, $98,900 married. 15% to $545,500 / $613,700. 20% above'],
        ]}
      />

      <Section title="Accounts and limits" />
      <LimitsTable />

      <Section title="Other numbers from the course" />
      <Table
        headers={['Item', 'Number']}
        rows={[
          ['S&P 500 long-run return', 'about 10% to 10.5%'],
          ['Inflation', 'about 3%'],
          ['Real return', 'about 7%'],
          ['Safe withdrawal rate', '4% of invested, raised with inflation'],
          ['Credit utilization target', 'under 10%'],
          ['Housing cost guide', '28% of gross income or less'],
          ['Emergency fund', '3 to 6 months of essentials'],
          ['California property tax', 'about 1.15% of assessed value, assessed growth capped at 2%'],
          ['California LLC / corporation minimum', '$800 a year'],
        ]}
      />

      <KeyTakeaways
        items={[
          'Brackets, deductions, credits, payroll taxes and limits for 2026 in one place.',
          'Verify at irs.gov and ftb.ca.gov each year.',
        ]}
      />
    </div>
  );
}
