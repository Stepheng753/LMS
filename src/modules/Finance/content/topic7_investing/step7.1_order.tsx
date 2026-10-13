import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { OrderOfOperations } from '../../calculators';

export default function Step7_1_Order() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Order of Operations"
        title="The Order of Operations, With Reasons"
        summary="Six steps. Every dollar goes to the first one that is not yet full. Here is why each step comes where it does."
      />

      <Section title="The six steps, and the reason for each" />
      <Table
        headers={['#', 'Step', 'Why it sits here']}
        rows={[
          [<strong key="1">1</strong>, 'Pay off bad debt while taking the full employer match', 'Bad debt costs 20% or more, a guaranteed loss. The match returns 50% to 100% instantly, better than any debt payoff. So you do both: the match first, every dollar after to debt'],
          [<strong key="2">2</strong>, 'Emergency fund', 'Without it, the next surprise becomes new debt. It protects every step below'],
          [<strong key="3">3</strong>, 'Max a Roth IRA', 'Tax-free growth, you pick the investments, and you can withdraw contributions in a real emergency. Smaller limit, so it fills fast'],
          [<strong key="4">4</strong>, 'Max the 401k', 'A big limit ($24,500). Often costly funds and fewer choices than an IRA, so it comes after the IRA'],
          [<strong key="5">5</strong>, 'Max the HSA and FSA', 'Tax breaks on health costs you will have anyway. HSA needs a high-deductible plan. FSA is use-it-or-lose-it, so size it carefully'],
          [<strong key="6">6</strong>, 'Taxable brokerage', 'No limit and no tax break. Flexible. Everything above has a tax advantage, so it gets filled first'],
        ]}
      />
      <Callout type="info" title="HSA before the 401k?">
        Many planners put the HSA ahead of the 401k because of its triple tax break. This playbook puts it fifth because
        it is small ($4,400 a year), only works with a high-deductible plan, and you will want to build the retirement
        habit first. If you have an HDHP and the room, funding it earlier is reasonable.
      </Callout>

      <Section title="What the ladder looks like in dollars" />
      <p>Suppose you earn $100,000, get a 4% match, and have $2,500 a month to put to work. The match costs $333 a month. The ladder fills in order:</p>
      <Table
        headers={['Where you are', 'Match', 'Debt / emergency fund', 'Roth IRA', '401k above match', 'HSA + FSA', 'Brokerage']}
        align={['left', 'right', 'right', 'right', 'right', 'right', 'right']}
        rows={[
          ['$6,000 of debt', '$333', '$2,167 to debt', '$0', '$0', '$0', '$0'],
          ['Debt gone, $12,000 to the emergency fund', '$333', '$2,167 to the fund', '$0', '$0', '$0', '$0'],
          ['Emergency fund full', '$333', '$0', '$625', '$1,542', '$0', '$0'],
          ['$4,000 a month, all rungs full above the brokerage', '$333', '$0', '$625', '$1,708', '$650', '$683'],
        ]}
      />
      <p>
        Notice how the same money flows further down the ladder as each step fills up. A person starting with debt
        reaches the Roth IRA in a few months to a few years, and from then on every raise flows to the lower rungs.
      </p>

      <Section title="Try your own ladder" />
      <p>Change the monthly amount, your debt, your emergency fund and your match. Watch which steps fill and how many months each takes.</p>
      <OrderOfOperations />

      <QuizSet title="Check yourself">
        <Quiz
          question="You owe $4,000 on a 24% card and your employer matches 4%. What do you do first?"
          options={['Skip the match and pay all the debt', 'Take the full match, send everything else to the card', 'Invest in a brokerage account', 'Build a 6-month emergency fund']}
          correctIndex={1}
          explanation="The match is an instant 100% return, better than paying 24% interest. Take it, then attack the debt."
        />
        <Quiz
          question="Where does a dollar go after the 401k is maxed?"
          options={['The brokerage', 'The HSA and FSA, then the brokerage', 'Debt', 'The emergency fund']}
          correctIndex={1}
          explanation="Step 5 is the HSA and FSA, then the taxable brokerage."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Debt and match, emergency fund, Roth IRA, 401k, HSA and FSA, brokerage.',
          'Each step has a reason: returns, safety, flexibility, limits, tax breaks.',
          'The same monthly amount flows further down the ladder as each rung fills.',
          'The brokerage comes last because it has no tax advantage.',
        ]}
      />
    </div>
  );
}
