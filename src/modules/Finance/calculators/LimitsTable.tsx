import { Table } from '../../../components/content/Table';

export const LimitsTable: React.FC = () => (
  <>
    <Table
      caption="2026 contribution limits and key numbers (IRS notices for 2026; verify at irs.gov before relying on them)"
      headers={['Account', 'You can put in (2026)', 'Catch-up', 'Notes']}
      rows={[
        [<strong key="a">401(k) / 403(b) (Roth or traditional)</strong>, '$24,500', '$8,000 if 50+, $11,250 if 60 to 63', 'The limit covers both types together. Employer match is on top. All sources combined cap: $72,000'],
        [<strong key="b">IRA (Roth or traditional)</strong>, '$7,500', '$1,100 if 50+', 'The limit covers both types together, across every IRA you own'],
        [<strong key="c">HSA</strong>, '$4,400 single, $8,750 family', '$1,000 if 55+', 'Requires a high-deductible health plan. Employer gifts count toward the limit'],
        [<strong key="d">Health FSA</strong>, '$3,400', 'none', 'Use it or lose it each year (small carryover allowed by some plans)'],
        [<strong key="e">Taxable brokerage</strong>, 'No limit', 'none', 'No tax break on contributions'],
      ]}
    />
    <Table
      headers={['Other 2026 numbers', 'Single', 'Married filing jointly']}
      rows={[
        ['Roth IRA income phase-out (MAGI)', '$153,000 to $168,000', '$242,000 to $252,000'],
        ['HDHP minimum deductible', '$1,700', '$3,400 (family)'],
        ['HDHP out-of-pocket maximum', '$8,500', '$17,000 (family)'],
        ['Social Security wage base', '$184,500', '$184,500 each worker'],
        ['Federal standard deduction', '$16,100', '$32,200'],
        ['Long-term capital gains: 0% up to', '$49,450', '$98,900'],
        ['Long-term capital gains: 15% up to', '$545,500', '$613,700'],
      ]}
    />
  </>
);
