import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { OrderOfOperations } from '../../calculators';

export default function StepS_6_MasterLadder() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • The Big Picture"
        title="The Master Order of Operations and the Twelve Rules"
        summary="Everything you learned as one ladder and twelve rules to live by."
      />

      <Section title="The ladder" />
      <Flow
        steps={[
          { title: '1 Bad debt + match', sub: 'Snowball it. Take all the free money' },
          { title: '2 Emergency fund', sub: '3 to 6 months', via: 'then' },
          { title: '3 Roth IRA', sub: '$7,500', via: 'then' },
          { title: '4 401k', sub: '$24,500, Roth if offered', via: 'then' },
          { title: '5 HSA and FSA', sub: '$4,400 / $8,750 and $3,400', via: 'then' },
          { title: '6 Brokerage', sub: 'The rest, S&P 500', via: 'then' },
        ]}
      />
      <p>
        Alongside the ladder: insurance in place (Topic 6), taxes understood (Topics 4 and 5), a variable income growing
        (Topic 2), and, when the foundation is done, a home you can afford (Topic 10).
      </p>

      <Section title="The twelve rules" />
      <Table
        headers={['#', 'Rule', 'Where']}
        rows={[
          ['1', 'Get out of bad debt. Snowball: smallest balance first', 'Topic 1'],
          ['2', 'Fixed income covers fixed expenses. Variable income covers variable expenses. Save the rest', 'Topic 2'],
          ['3', 'You must have a variable income alongside your 9-to-5', 'Topic 2'],
          ['4', 'Never carry a credit card balance. Autopay the full statement', 'Topic 3'],
          ['5', 'Know your marginal and effective tax rate. Use credits and the accounts that lower tax', 'Topic 4'],
          ['6', 'Always take the full employer match', 'Topics 5, 7'],
          ['7', 'Insure what you cannot afford to lose. Skip the rest', 'Topic 6'],
          ['8', 'Roth by preference: pay the tax now, then the money is yours', 'Topic 7'],
          ['9', 'S&P 500 index fund, automatic, low fee, never sell in a crash', 'Topic 7'],
          ['10', 'Start early. Time and rate do 90% of the work. Measure in today’s dollars', 'Topic 8'],
          ['11', 'Retire on about 4%: invested = yearly expenses ÷ 4%', 'Topic 9'],
          ['12', 'A home is shelter first. Count the all-in cost and stay long enough to win', 'Topic 10'],
        ]}
      />

      <Callout type="success" title="The pattern behind it all">
        Spend less than you earn, keep the interest you pay near zero, put the difference into low-cost investments in the
        right accounts, automate it, and give it time.
      </Callout>

      <Section title="Run your ladder one more time" />
      <OrderOfOperations />

      <KeyTakeaways
        items={[
          'Six steps: debt and match, emergency fund, Roth IRA, 401k, HSA and FSA, brokerage.',
          'Twelve rules cover debt, income, cards, taxes, insurance, investing, compounding, retirement and a home.',
          'Automate it, and revisit it once a year.',
        ]}
      />
    </div>
  );
}
