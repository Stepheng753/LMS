import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Flow } from '../../../../components/content/Flow';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step8_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Start Here"
        title="Percentages and Compounding: The Engine of Wealth"
        summary="Money that earns money that earns money. The one idea that turns ordinary savings into millions, and why starting early matters more than starting big."
      />

      <Callout type="success" title="The whole topic in one sentence">
        Each year you earn a <strong>percentage</strong> not just on what you put in, but on all the earnings from every
        earlier year. Do that for decades, and the growth outweighs your own contributions many times over.
      </Callout>

      <Section title="How we will build it" />
      <Flow
        steps={[
          { title: 'Percentages', sub: 'What 10% of a number means' },
          { title: 'Year 1 and year 2', sub: 'Slow, one step at a time', via: 'then' },
          { title: '5, 10, 20, 40 years', sub: 'Blow it up', via: 'then' },
          { title: 'Age 25 to 65', sub: 'A real scenario', via: 'then' },
          { title: 'Inflation', sub: 'What it can actually buy', via: 'then' },
          { title: 'The data', sub: 'Where the numbers come from', via: 'then' },
        ]}
      />

      <Section title="The promise" />
      <p>
        By the end of this topic you will be able to estimate what any amount invested at any rate becomes over any
        number of years, in your head or with the calculator, and explain why the answer is so much bigger than the
        deposits.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>8.1 to 8.2</strong> Percentages, and simple vs compound interest.</li>
        <li><strong>8.3 to 8.4</strong> The slow build: year 1, year 2, then 5, 10, 20, 30 and 40 years.</li>
        <li><strong>8.5</strong> The rule of 72: how fast money doubles.</li>
        <li><strong>8.6</strong> The cost of waiting: starting at 25, 35 or 45.</li>
        <li><strong>8.7</strong> The scenario: you are 25 and want to retire at 65.</li>
        <li><strong>8.8</strong> Comparing rates side by side.</li>
        <li><strong>8.9 to 8.10</strong> Inflation: future value vs what the money can buy.</li>
        <li><strong>8.11</strong> Where the S&amp;P 500 and inflation numbers come from.</li>
        <li><strong>8.12</strong> Averages vs reality (volatility).</li>
      </ul>

      <KeyTakeaways
        items={[
          'Compounding is earning a percentage on your earnings, year after year.',
          'Growth, not deposits, does most of the work in the long run.',
          'This topic builds from year 1 to year 40, then adds inflation and real data.',
          'The calculators let you change every number.',
        ]}
      />
    </div>
  );
}
