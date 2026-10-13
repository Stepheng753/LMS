import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { DebtPayoff } from '../../calculators';

export default function Step1_4_Snowball() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 1 • Debt"
        title="Snowball: Smallest Balance First"
        summary="The playbook method. Pay minimums on everything, throw every extra dollar at the smallest debt, and roll the freed-up payment forward."
      />

      <Callout type="success" title="The playbook choice: snowball">
        There are two famous ways to pay off several debts. The playbook picks <strong>snowball</strong>: smallest
        balance first. The reason is not the math. It is that you actually finish.
      </Callout>

      <Section title="How snowball works" />
      <Flow
        steps={[
          { title: 'List every debt', sub: 'Smallest balance to largest' },
          { title: 'Pay the minimum on all of them', sub: 'Never miss one', via: 'then' },
          { title: 'Extra money goes to the smallest', sub: 'Until it is gone', via: 'then' },
          { title: 'Roll its payment to the next', sub: 'The snowball grows', via: 'repeat' },
        ]}
      />

      <Section title="An example, with real numbers" />
      <Table
        headers={['Debt', 'Balance', 'Rate', 'Minimum']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['Store card', '$800', '26%', '$35'],
          ['Personal loan', '$3,200', '14%', '$120'],
          ['Credit card', '$4,500', '22%', '$110'],
          ['Car loan', '$14,000', '9%', '$340'],
        ]}
      />
      <p>Total owed: $22,500. Minimums total $605. Say you can add <strong>$300 extra</strong> a month, so $905 goes to debt each month.</p>
      <Table
        headers={['Month', 'What happens']}
        rows={[
          ['1 to 3', 'The $300 extra goes to the store card on top of its minimum. It is gone in month 3.'],
          ['4 to 10', 'The store card’s $335 now rolls to the personal loan. It is gone in month 10.'],
          ['11 to 18', 'That payment, now about $455, goes to the credit card. Gone in month 18.'],
          ['19 to 29', 'Everything, about $905, goes to the car loan. Debt-free in month 29: 2 years and 5 months.'],
        ]}
      />
      <p>
        Each time a debt dies, you feel it. Cards vanish. Statements shrink. That feeling is what keeps people going
        for two years, which is the real challenge.
      </p>

      <Section title="Snowball vs avalanche" />
      <Compare
        goodLabel="Snowball (the playbook)"
        badLabel="Avalanche (the math winner)"
        good={
          <>
            <p><strong>Order:</strong> smallest balance first.</p>
            <p><strong>Why:</strong> quick wins, fewer bills sooner, and motivation.</p>
            <p><strong>Example result:</strong> debt-free in 29 months, about $3,389 of interest.</p>
          </>
        }
        bad={
          <>
            <p><strong>Order:</strong> highest interest rate first.</p>
            <p><strong>Why:</strong> costs the least in interest.</p>
            <p><strong>Example result:</strong> also 29 months, about $3,217 of interest. Only $172 cheaper.</p>
          </>
        }
      />
      <Callout type="info" title="The gap is small">
        In the example, the cheaper method saves $172 over two and a half years. A method you quit costs far more.
        Snowball wins because following it is easier. If you are naturally disciplined and the rates are very different,
        avalanche is fine. The playbook says: pick snowball unless you have a strong reason.
      </Callout>

      <Section title="Run it yourself" />
      <p>
        The calculator below holds these four debts. Switch the numbers. Try the preset that makes snowball and avalanche
        differ more, and try different extra amounts. Notice how little the extra amount matters compared with starting.
      </p>
      <DebtPayoff />

      <QuizSet title="Check yourself">
        <Quiz
          question="In the snowball method, what do you do with the payment from a debt you just paid off?"
          options={['Spend it', 'Roll it into the next debt', 'Save it in a drawer', 'Stop paying']}
          correctIndex={1}
          explanation="The rolled payment is the snowball: it grows each time a debt dies."
        />
        <Quiz
          question="Why does the playbook choose snowball even though avalanche costs slightly less?"
          options={['It is always cheaper', 'Quick wins make people stick with it, and the cost difference is small', 'Banks require it', 'Avalanche is illegal']}
          correctIndex={1}
          explanation="The best plan is the one you finish."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Snowball: minimums on everything, extra money to the smallest balance, roll each freed-up payment forward.',
          'The example: $22,500 of debt gone in 29 months with $300 extra a month.',
          'Avalanche saves a little more interest, but the playbook picks the method you will finish.',
          'The first win comes fast. That motivation is the point.',
        ]}
      />
    </div>
  );
}
