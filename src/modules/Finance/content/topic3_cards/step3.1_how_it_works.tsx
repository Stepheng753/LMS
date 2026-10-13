import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Flow } from '../../../../components/content/Flow';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step3_1_HowItWorks() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 3 • Credit Cards"
        title="What Happens When You Swipe"
        summary="Who is involved, who gets paid, and why the bank can afford to give you rewards."
      />

      <Section title="You are borrowing the bank's money for a few weeks" />
      <p>
        When you pay with a credit card, <strong>the bank pays the store for you</strong>, and you owe the bank. The
        bank then sends you a bill at the end of the billing period. If you pay that bill in full by the due date, the
        loan cost you nothing.
      </p>

      <Flow
        steps={[
          { title: 'You swipe', sub: 'A $50 dinner' },
          { title: 'The card network', sub: 'Visa, Mastercard, Amex, Discover', via: 'asks permission' },
          { title: 'Your bank (the issuer)', sub: 'Approves and pays the store', via: 'approved' },
          { title: 'The store gets $48.50', sub: 'minus a processing fee', via: 'paid in 1 to 2 days' },
          { title: 'You get a bill', sub: 'at the end of the billing period', via: 'later' },
        ]}
      />

      <Section title="Who makes money?" />
      <Table
        headers={['Who', 'How they earn']}
        rows={[
          [<strong key="a">The store</strong>, 'Pays a fee of about 1.5% to 3.5% of every card sale, called the interchange and processing fee'],
          [<strong key="b">Your bank (issuer)</strong>, 'Gets most of that fee, plus interest and fees from people who carry balances'],
          [<strong key="c">The network</strong>, 'A small cut of each transaction'],
          [<strong key="d">You</strong>, 'Pay nothing if you pay in full. You may even earn rewards'],
        ]}
      />
      <Callout type="info" title="Why rewards exist">
        Part of the store&apos;s fee funds your rewards. The bank gives some of it back to you so you will use the card.
        The real profit comes from people who carry balances. That is why rewards are a bonus for those who pay in
        full, and a bait for people who do not.
      </Callout>

      <Section title="A few words you will see" />
      <Table
        headers={['Word', 'Meaning']}
        rows={[
          [<strong key="a">Credit limit</strong>, 'The most the bank will let you owe at once'],
          [<strong key="b">Balance</strong>, 'What you owe right now'],
          [<strong key="c">Available credit</strong>, 'Limit minus balance'],
          [<strong key="d">Pending vs posted</strong>, 'Pending: approved but not final. Posted: settled and counted on your statement'],
          [<strong key="e">Issuer</strong>, 'The bank that gave you the card (Chase, Citi, Capital One)'],
          [<strong key="f">Network</strong>, 'Visa, Mastercard, American Express, Discover: the system that moves the money'],
        ]}
      />

      <Section title="Fraud protection: a big advantage" />
      <p>
        If someone steals your card number, federal law caps your liability at <strong>$50</strong>, and most issuers
        charge you $0. The money at stake is the bank&apos;s, not yours. With a debit card, a thief drains <em>your own
        checking account</em>, and getting it back can take time even when the bank eventually refunds you.
      </p>

      <QuizSet title="Check yourself">
        <Quiz
          question="When you swipe a credit card, whose money pays the store first?"
          options={['Yours', 'The bank\'s', 'The network\'s', 'The store\'s']}
          correctIndex={1}
          explanation="The bank fronts the money, then bills you."
        />
        <Quiz
          question="Where does most of the bank's profit from cards come from?"
          options={['People who pay in full', 'People who carry balances (interest and fees)', 'Annual taxes', 'Rewards']}
          correctIndex={1}
          explanation="Interest and fees on carried balances are the bank's real profit, which is why rewards are bait for them."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A credit card is a bank loan for a few weeks, free if you pay in full.',
          'Stores pay a 1.5% to 3.5% fee, which funds your rewards.',
          'Banks profit from people who carry balances.',
          'Fraud liability is capped at $50, usually $0. Your own money is not at risk, unlike a debit card.',
        ]}
      />
    </div>
  );
}
