import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_5_DebitVsCredit() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Credit Cards"
        title="Debit vs Credit: In Practice, No Difference"
        summary="If you only spend money you already have, a credit card is just a better debit card."
      />

      <Callout type="success" title="The playbook position">
        In practice there should be <strong>no difference</strong> between spending on a debit card and a credit card.
        You only swipe what you already have in your checking account. The credit card simply adds protection, rewards
        and a month of float on top.
      </Callout>

      <Section title="What really differs" />
      <Table
        headers={['', 'Debit card', 'Credit card']}
        rows={[
          [<strong key="a">Whose money you spend</strong>, 'Yours, immediately, from checking', 'The bank’s, for a few weeks, then you pay'],
          [<strong key="b">Fraud</strong>, 'A thief empties your account. Getting it back can take days or weeks', 'You dispute a charge on the bank’s money. Liability capped at $50, usually $0'],
          [<strong key="c">Disputes</strong>, 'Harder, you are asking for your money back', 'Easier: you simply do not pay the disputed amount while it is investigated'],
          [<strong key="d">Rewards</strong>, 'Usually none', 'Often 1% to 2%'],
          [<strong key="e">Credit score</strong>, 'Does not build it', 'Builds it when paid on time'],
          [<strong key="f">Hotels, rentals, gas</strong>, 'May place a large hold on your checking account', 'A hold on your credit limit, not your cash'],
          [<strong key="g">Risk of overspending</strong>, 'Low: it stops when your money is gone', 'High if you treat the limit as income'],
        ]}
      />
      <p>
        The only row where debit wins is the last one. The credit card makes it <em>possible</em> to spend money you do not
        have. If you can follow the rules below, you get every advantage of the credit card without that danger.
      </p>

      <Section title="The rules that make credit = debit" />
      <Steps
        steps={[
          { title: 'Only spend what is already in checking', children: <p>Before you swipe, ask: &quot;Could I pay this from my bank balance today?&quot; If not, do not buy it.</p> },
          { title: 'Use the same budget', children: <p>Your variable spending limit (Topic 2) applies to the card exactly as it would to a debit card.</p> },
          { title: 'Turn on autopay for the full statement', children: <p>The card pays itself from checking on the due date. Nothing to remember.</p> },
          { title: 'Keep a buffer in checking', children: <p>A balance larger than your statement so autopay never bounces.</p> },
          { title: 'Check the app weekly', children: <p>A two-minute look at the current balance. If it is higher than you expected, slow down.</p> },
        ]}
      />

      <Callout type="warning" title="If you cannot follow these rules, use a debit card">
        This works only for people who really treat the credit limit as a number they never approach. If you tend to
        spend what is available, switch to a debit card until the habit is fixed. A card that costs you interest is much
        worse than a card without rewards.
      </Callout>

      <Section title="How many cards?" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>One or two no-annual-fee cards</strong> are plenty for most people. A flat 2% cash back card is a strong core.</li>
        <li>Keep your oldest card open, even if you rarely use it. It helps the age of your credit (step 3.6).</li>
        <li>Never open a store card at a checkout for a $10 discount.</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="Why can a credit card be safer than a debit card for online shopping?"
          options={['It has a bigger limit', 'A thief spends the bank\'s money, not the cash in your checking account', 'It is always free', 'It never expires']}
          correctIndex={1}
          explanation="With a credit card, your own cash is not at risk while a fraud dispute is resolved."
        />
        <Quiz
          question="When does using a credit card make sense in this playbook?"
          options={['When you want to buy things you cannot afford', 'Only for money you could pay from checking today, with autopay on the full statement', 'To build debt', 'Never']}
          correctIndex={1}
          explanation="That is what makes it equivalent to debit, with protection and rewards added."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'In practice a credit card should be the same as debit: only spend money you already have.',
          'Credit adds fraud protection, easier disputes, rewards and score-building.',
          'Autopay the full statement and keep a buffer in checking.',
          'If you cannot follow the rules, use a debit card until the habit is fixed.',
        ]}
      />
    </div>
  );
}
