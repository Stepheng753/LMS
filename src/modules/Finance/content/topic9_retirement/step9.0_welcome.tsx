import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Flow } from '../../../../components/content/Flow';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step9_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • Start Here"
        title="Retirement: Living Off the Growth"
        summary="You do not retire on a pile you hope is big enough. You retire on an engine that keeps producing income, and you only spend what it produces."
      />

      <p>
        Every plan so far was about <strong>accumulating</strong>: earning, saving and investing for decades. Retirement is
        the second half: turning the pile into a paycheck. Most people get this half wrong, because they treat the pile
        like a bucket of water that drains. The playbook treats it like an orchard that keeps growing fruit.
      </p>

      <Flow
        steps={[
          { title: 'Accumulate (25 to 65)', sub: 'Save and invest. Growth does 90% of the work' },
          { title: 'The number', sub: 'How much invested do you need?', via: 'calculate' },
          { title: 'Distribute (65 onward)', sub: 'Withdraw about 4% a year', via: 'retire' },
          { title: 'The orchard keeps growing', sub: 'You spend the growth, not the tree', via: 'sustain' },
        ]}
      />

      <Callout type="success" title="The two ideas of this topic">
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>You do not pull out the huge sum and hope it lasts.</strong> You withdraw a small percentage, about 4% a year.</li>
          <li><strong>Think in percentages:</strong> if 4% of what you have invested equals one year of your spending, and the market grows that money about 4% a year, then <em>the growth pays for your life and the balance does not shrink</em>.</li>
        </ol>
      </Callout>

      <Section title="What you will learn" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>9.1</strong> The wrong way: spending down a lump sum.</li>
        <li><strong>9.2</strong> The right way, slowly: 4% in, 4% out, year by year.</li>
        <li><strong>9.3</strong> How much do you need? 4% of what equals your yearly expenses.</li>
        <li><strong>9.4</strong> The honest version: what inflation changes.</li>
        <li><strong>9.5</strong> Why 4% and not 8%, and the danger of a bad start (sequence risk).</li>
        <li><strong>9.6</strong> The timeline: ages 59½, 62, 65, 67, 70, 73 and which account to spend first.</li>
        <li><strong>9.7</strong> Social Security, health care and taxes in retirement.</li>
        <li><strong>9.8</strong> Build your number and the monthly savings to get there.</li>
      </ul>

      <KeyTakeaways
        items={[
          'Retirement is turning a pile into a paycheck: withdraw a small percentage, not a big lump.',
          'If you spend only the growth, the balance stays whole and the money lasts.',
          'Think in percentages: 4% of invested = one year of expenses.',
          'The honest version accounts for inflation and bad early years.',
        ]}
      />
    </div>
  );
}
