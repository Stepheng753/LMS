import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { QuizSet, Quiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_2_BadDebt() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 1 • Debt"
        title="Bad Debt: Cars, Cards and Loans"
        summary="Which debt to destroy first, why a car loan is a trap, and the one caveat to the rule."
      />

      <p>
        Debt is not all the same. The playbook rule is simple: <strong>if it buys something that loses value or that you
        consume, it is bad debt, and you get out of it</strong>.
      </p>

      <Section title="The bad-debt list" />
      <Table
        headers={['Debt', 'Typical rate', 'What it bought', 'Verdict']}
        rows={[
          [<strong key="a">Credit cards (carried balance)</strong>, '20% to 29%', 'Things already eaten, worn out or forgotten', 'Destroy it'],
          [<strong key="b">Store cards</strong>, '25% to 30%', 'A discount you paid back with interest', 'Destroy it. Never open one'],
          [<strong key="c">Car loans</strong>, '6% to 12%', 'A machine that loses value every year', 'Pay off fast. Avoid long loans'],
          [<strong key="d">Personal loans</strong>, '10% to 20%', 'Usually yesterday’s overspending', 'Destroy it'],
          [<strong key="e">Payday loans</strong>, '300% and more', 'A few days of cash', 'Never. Ask for help first'],
          [<strong key="f">Buy now, pay later</strong>, '0% to 30%', 'Small purchases that add up to a hidden monthly bill', 'Treat like a credit card'],
          [<strong key="g">Medical debt</strong>, 'often 0%', 'Care you needed', 'Negotiate, ask for a payment plan, pay it off'],
        ]}
      />

      <Section title="The car, in dollars" />
      <p>A car is the most common bad debt, because it feels necessary. Look at a $35,000 car on a 72-month loan at 7%:</p>
      <Table
        headers={['', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Monthly payment', '$597'],
          ['Total paid over 6 years', 'about $43,000'],
          ['Interest alone', 'about $8,000'],
          ['What the car is worth after 6 years', 'about $15,000 (it lost roughly $20,000)'],
          ['What you paid, minus what it is worth', 'about $28,000 to use it for 6 years'],
        ]}
      />
      <Callout type="tip" title="The car rule">
        Buy a reliable used car with cash if you can. If you must borrow, take the shortest loan you can handle, pay it
        off early, and keep the car for ten years. The goal is never to spend your life making a payment on something that
        is shrinking in value.
      </Callout>

      <Section title="The one caveat" />
      <p>
        The rule is about <strong>bad</strong> debt. A few kinds of borrowing can make sense, because the thing you buy
        grows in value or earns more than the interest costs. These are covered later, and they are the exception, not
        the habit:
      </p>
      <Compare
        goodLabel="Debt that can be reasonable"
        badLabel="Debt to avoid"
        good={
          <>
            <p><strong>A mortgage</strong> on a home you can comfortably afford (Topic 10).</p>
            <p><strong>Low-rate education</strong> that clearly raises what you earn.</p>
            <p><strong>A business loan</strong> with a plan that earns more than the interest.</p>
          </>
        }
        bad={
          <>
            <p><strong>Credit card balances</strong>, always.</p>
            <p><strong>A newer car than you can pay for in cash.</strong></p>
            <p><strong>Loans for vacations, weddings, furniture and clothes.</strong></p>
          </>
        }
      />
      <Callout type="info" title="Even “good” debt has a limit">
        Even good debt is dangerous if the payment is too big. A mortgage payment that eats half your take-home pay is
        bad debt wearing a good costume. The rule: the total of all your debt payments should leave you room to save.
      </Callout>

      <Exercise
        title="Sort these debts"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>$6,000 card at 24%: <strong>bad</strong>. Pay first.</li>
            <li>$22,000 car loan at 7%: <strong>bad</strong>. Pay down fast.</li>
            <li>$350,000 mortgage at 6.5% on a home that is 25% of take-home pay: <strong>acceptable</strong>, if the payment is comfortable.</li>
            <li>$2,500 buy-now-pay-later: <strong>bad</strong>. Pay off, stop using.</li>
          </ul>
        }
      >
        <p>Label each one good, acceptable or bad: a $6,000 card at 24%, a $22,000 car loan at 7%, a $350,000 mortgage on a home that is 25% of your take-home pay, and $2,500 of buy-now-pay-later.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which is the best reason a car loan counts as bad debt?"
          options={['It has an interest rate', 'The car loses value while you are paying for it', 'Banks make money from it', 'It needs insurance']}
          correctIndex={1}
          explanation="You pay interest on something that is worth less every year."
        />
        <Quiz
          question="You have a $6,000 balance at 24% and a $20,000 car loan at 7%. Which do you attack first?"
          options={['The car loan, it is bigger', 'The card, it costs far more per dollar', 'Neither', 'Both equally']}
          correctIndex={1}
          explanation="The higher rate costs more every month. (The snowball method in step 1.4 offers another order for motivation.)"
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Bad debt buys things that lose value or that you consume: cards, store cards, car loans, personal loans, buy-now-pay-later.',
          'A $35,000 car loan can cost about $43,000 and leave you with a $15,000 car.',
          'Caveat: a mortgage you can afford, or low-rate education that raises your pay, can be reasonable.',
          'Even good debt is bad if the payment crowds out saving.',
        ]}
      />
    </div>
  );
}
