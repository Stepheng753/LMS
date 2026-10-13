import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RewardsValue } from '../../calculators';

export default function Step3_4_Rewards() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Credit Cards"
        title="Rewards: What a Point Is Really Worth"
        summary="1 point is about 1 cent. Use that rule and you will never be fooled by a flashy offer."
      />

      <Callout type="success" title="The rule of thumb">
        <strong>1 point ≈ 1 cent.</strong> A card that earns 1.5 points per dollar gives you about 1.5% back. A card that
        earns 3 points per dollar on dining gives you about 3% back on dining.
      </Callout>

      <Section title="The three kinds of rewards" />
      <Table
        headers={['Type', 'How it works', 'Playbook view']}
        rows={[
          [<strong key="a">Cash back</strong>, 'A percent of spending returned as cash or a statement credit (1.5% to 2% is common)', 'Simple and honest. A great default'],
          [<strong key="b">Points</strong>, 'Points per dollar, redeemed for travel, gift cards or cash', 'Treat each as 1 cent unless you have proof of more'],
          [<strong key="c">Miles</strong>, 'Airline-specific points', 'Can be worth more or less than 1 cent. Only for frequent flyers'],
        ]}
      />

      <Section title="The math, with real money" />
      <Table
        headers={['Monthly spend', 'Per year', 'At 1 point per $ (1%)', 'At 2 points per $ (2%)']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['$1,500', '$18,000', '$180', '$360'],
          ['$2,500', '$30,000', '$300', '$600'],
          ['$4,000', '$48,000', '$480', '$960'],
        ]}
      />
      <p>
        These are real, but they are modest. A $600 reward on $30,000 of spending only helps if the $30,000 would have
        been spent anyway. <strong>Never spend extra to chase points.</strong> Spending $100 to earn $2 back is a $98 loss.
      </p>

      <Section title="Annual fees and bonuses" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Annual fee cards</strong> earn more points but cost $95 to $695 a year. Do the math: rewards earned minus the fee, compared with a no-fee 2% card.</li>
        <li><strong>Sign-up bonuses</strong> (for example $200 or more after spending $3,000 in 3 months) can be good, but only if you would spend that much anyway.</li>
        <li><strong>Rotating categories</strong> (5% in certain stores each quarter) need effort and attention. A flat 2% card is easier.</li>
      </ul>

      <Section title="Try the numbers yourself" />
      <p>
        Change your spending, points per dollar, the value of a point, the annual fee and an average balance you carry.
        Notice what happens to the &quot;after rewards&quot; number when you carry a balance.
      </p>
      <RewardsValue />

      <Callout type="warning" title="Interest erases rewards, instantly">
        A $3,000 balance at 24% costs $720 a year in interest. The rewards on $30,000 of spending at 2% are $600. If you
        carry a balance, the card loses you money, no matter how good the rewards are.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="A card earns 2 points per dollar, and a point is worth 1 cent. What is the return?"
          options={['0.2%', '2%', '20%', '200%']}
          correctIndex={1}
          explanation="2 points × 1 cent = 2 cents back per dollar, which is 2%."
        />
        <Quiz
          question="You spend an extra $200 to earn 3% back. What is the net result?"
          options={['You gained $6', 'You lost $194', 'Break even', 'You gained $200']}
          correctIndex={1}
          explanation="You spent $200 to earn $6, a loss of $194 compared with not buying."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          '1 point is about 1 cent. 1.5 points per dollar is about 1.5% back.',
          'A flat 2% card is simple and strong. A $30,000 spend earns about $600.',
          'Never spend extra for rewards. Never carry a balance.',
          'Annual fee cards only win if the extra rewards exceed the fee.',
        ]}
      />
    </div>
  );
}
