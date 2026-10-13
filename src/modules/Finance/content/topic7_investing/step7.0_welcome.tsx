import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Start Here"
        title="Investing Accounts: Where Your Money Lives"
        summary="Investing is two decisions: which account to use, and what to put inside it. This topic is the account decision, in the right order."
      />

      <p>
        Cash loses value to inflation (about 3% a year). Investing in a broad group of companies has historically
        grown about 10% a year, over long periods, with scary drops along the way. The account you use decides how much
        of that growth you keep after tax.
      </p>

      <Callout type="info" title="An account is a container, not an investment">
        A <strong>401k, IRA, Roth, HSA and brokerage account are containers</strong> with different tax rules. What you
        buy <em>inside</em> them (the S&amp;P 500, for example) is a separate choice, covered in step 7.14. The same
        investment can be taxed very differently depending on the container.
      </Callout>

      <Section title="The map" />
      <Table
        headers={['Account', 'Tax on the way in', 'Tax on growth', 'Tax on the way out', 'Limit (2026)']}
        rows={[
          [<strong key="a">Taxable brokerage</strong>, 'None (after-tax money)', 'Yes: dividends and gains', 'Gains taxed when sold', 'None'],
          [<strong key="b">Traditional 401k / IRA</strong>, 'Deduction now', 'None', 'All taxed as income', '$24,500 / $7,500'],
          [<strong key="c">Roth 401k / IRA</strong>, 'None (after-tax money)', 'None', 'None, if rules are followed', '$24,500 / $7,500'],
          [<strong key="d">HSA</strong>, 'Deduction now', 'None (CA taxes it)', 'None for medical', '$4,400 / $8,750'],
          [<strong key="e">FSA</strong>, 'Deduction now', 'n/a (spend it)', 'None for medical', '$3,400'],
        ]}
      />

      <Section title="Your order of operations, again" />
      <Flow
        steps={[
          { title: '1 Bad debt + the match', sub: 'The match is free money' },
          { title: '2 Emergency fund', sub: '3 to 6 months', via: 'then' },
          { title: '3 Roth IRA', sub: 'Max it', via: 'then' },
          { title: '4 401k', sub: 'Max it', via: 'then' },
          { title: '5 HSA and FSA', sub: 'Max them', via: 'then' },
          { title: '6 Brokerage', sub: 'The rest', via: 'then' },
        ]}
      />

      <Section title="The lessons" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>7.1</strong> The order of operations, with reasons.</li>
        <li><strong>7.2 to 7.5</strong> The employer match, the brokerage, the IRA and the 401k.</li>
        <li><strong>7.6 to 7.9</strong> Roth vs Traditional: the big four-step build.</li>
        <li><strong>7.10 to 7.12</strong> Roth in each account, the limits and phase-outs, and the backdoor Roth.</li>
        <li><strong>7.13</strong> HSA and FSA.</li>
        <li><strong>7.14</strong> What to hold: the S&amp;P 500, set it and forget it.</li>
        <li><strong>7.15</strong> Your automatic monthly system.</li>
      </ul>

      <KeyTakeaways
        items={[
          'An account is a tax container. What you hold inside it is a separate choice.',
          'Brokerage, traditional, Roth, HSA and FSA each tax money at different moments.',
          'The order of operations: debt and match, emergency fund, Roth IRA, 401k, HSA and FSA, brokerage.',
        ]}
      />
    </div>
  );
}
