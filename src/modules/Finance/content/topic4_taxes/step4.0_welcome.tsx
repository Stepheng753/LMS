import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step4_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Start Here"
        title="Taxes: How They Really Work"
        summary="The biggest expense most people ever have, and the one they understand least."
      />

      <p>
        For most workers, taxes are the largest bill of their life, bigger than rent. A person earning $100,000 in
        California hands over about $35,000 a year in various taxes. Understanding how they work is not about dodging
        them. It is about using the rules that are written for you.
      </p>

      <Callout type="warning" title="Numbers in this topic are for 2026">
        Federal figures come from the IRS (Revenue Procedure 2025-32 and the 2026 law). California figures come from the
        Franchise Tax Board&apos;s 2026 indexed amounts. Tax numbers move every year, so check irs.gov and ftb.ca.gov
        before you file. When something is an estimate, the lesson says so.
      </Callout>

      <Section title="The taxes you will meet" />
      <Table
        headers={['Tax', 'Who charges it', 'On what', 'Where you meet it']}
        rows={[
          [<strong key="a">Federal income tax</strong>, 'IRS', 'Income, in brackets', '4.1 to 4.2'],
          [<strong key="b">California income tax</strong>, 'FTB', 'Income, in its own brackets', '4.3'],
          [<strong key="c">Social Security and Medicare (FICA)</strong>, 'IRS', 'Wages (and 1099 profit)', 'Topic 5'],
          [<strong key="d">Self-employment tax</strong>, 'IRS', '1099 profit', '4.7'],
          [<strong key="e">Capital gains and dividends</strong>, 'IRS and FTB', 'Profit on investments', '4.8'],
          [<strong key="f">Sales tax</strong>, 'State and local', 'Purchases (7.25% base in California, up to 10.75% locally)', 'Every receipt'],
          [<strong key="g">Property tax</strong>, 'County', 'Real estate', 'Topic 10'],
        ]}
      />

      <Section title="Where this topic goes" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>4.1</strong> How brackets work: marginal vs effective rate (the most misunderstood idea in money).</li>
        <li><strong>4.2</strong> Federal 2026 brackets, with a $100,000 example.</li>
        <li><strong>4.3</strong> California 2026 brackets and where California differs.</li>
        <li><strong>4.4</strong> Deductions and credits.</li>
        <li><strong>4.5</strong> Single vs married.</li>
        <li><strong>4.6</strong> Dependents.</li>
        <li><strong>4.7</strong> Self-employment tax and quarterly payments.</li>
        <li><strong>4.8</strong> Taxes on investments.</li>
        <li><strong>4.9</strong> Filing: forms, deadlines and records.</li>
      </ul>

      <KeyTakeaways
        items={[
          'Taxes are the largest bill for most workers. Learning the rules is the highest-return reading in the course.',
          'Numbers here are for 2026. Verify at irs.gov and ftb.ca.gov before filing.',
          'Income tax is the big one, then payroll tax. Both are explained with real examples.',
        ]}
      />
    </div>
  );
}
