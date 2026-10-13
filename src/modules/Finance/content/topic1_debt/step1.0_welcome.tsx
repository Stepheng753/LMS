import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step1_0_Welcome() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 1 • Start Here"
        title="Welcome: Your Money Playbook"
        summary="A plain-English course on how money works, built around one idea: keep more, owe nothing, and let time do the heavy lifting."
      />

      <p>
        Most people are never taught how money works. They learn it by accident, usually by making expensive mistakes.
        This course is the shortcut: eleven topics, in the order that actually matters, with real numbers in every
        lesson and calculators you can change to see what happens.
      </p>

      <Callout type="warning" title="Read this first: this is personal advice">
        This is not generic advice written for everyone. It is a <strong>personal playbook</strong>: the money rules
        written down for you, built on strong opinions (get out of bad debt, never carry a credit card balance, invest in
        the S&amp;P 500 and leave it alone, prefer Roth). Where reasonable people disagree, the lesson shows both sides and
        then says which way this playbook goes. The author is not a licensed financial advisor or tax professional. Tax
        numbers are for 2026 and change every year, so check the source linked in the lesson before you file anything.
      </Callout>

      <Section title="The whole journey" />
      <Flow
        steps={[
          { title: '1 Debt', sub: 'Get out of it' },
          { title: '2 Income and expenses', sub: 'Earn more, keep more', via: 'then' },
          { title: '3 Credit cards', sub: 'A tool, not a loan', via: 'then' },
          { title: '4 Taxes', sub: 'How they really work', via: 'then' },
          { title: '5 Your paycheck', sub: 'Gross to net', via: 'then' },
          { title: '6 Insurance', sub: 'Protect it all', via: 'then' },
          { title: '7 Investing accounts', sub: 'Roth, 401k, IRA, HSA', via: 'then' },
          { title: '8 Compounding', sub: 'Time and percentages', via: 'then' },
          { title: '9 Retirement', sub: 'When is it enough', via: 'then' },
          { title: '10 Real estate', sub: 'Buying a home', via: 'then' },
          { title: '11 Businesses', sub: 'Brief and light', via: 'then' },
        ]}
      />

      <Section title="The order of operations" />
      <p>
        Every dollar you will ever earn above your bills has a place to go, and the order matters. This is the whole
        course in six lines. You will keep coming back to it.
      </p>
      <Table
        headers={['Step', 'Where the next dollar goes', 'Why this order']}
        rows={[
          [<strong key="1">1</strong>, 'Pay off bad debt, while still taking the full employer match', 'Debt at 20% costs more than investing earns. The match is an instant return of 50% or more, so never skip it'],
          [<strong key="2">2</strong>, 'Build an emergency fund', 'So the next surprise does not become new debt'],
          [<strong key="3">3</strong>, 'Max out a Roth IRA', 'Tax-free growth, and you control where it is invested'],
          [<strong key="4">4</strong>, 'Max out the 401k', 'Large limit, tax-advantaged'],
          [<strong key="5">5</strong>, 'Max out the HSA and FSA', 'Tax breaks on health spending you will have anyway'],
          [<strong key="6">6</strong>, 'Invest the rest in a taxable brokerage account', 'No limit, no special tax break, full flexibility'],
        ]}
      />

      <Section title="How the lessons work" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Real dollar examples.</strong> Every idea starts with a small number you can do in your head, then grows.</li>
        <li><strong>Calculators.</strong> Inputs on the left, results and the math on the right. Change anything. Use the buttons at the top for ready-made scenarios.</li>
        <li><strong>Quizzes and a cheat sheet</strong> at the end of each topic.</li>
        <li><strong>The Summary (S)</strong> at the end reviews everything. The Toolbox (T) has worksheets you can keep.</li>
      </ul>

      <Callout type="info" title="You do not need any numbers yet">
        You do not have to know your income, debts or accounts to start. Examples use made-up numbers, and you will
        plug in your own later.
      </Callout>

      <KeyTakeaways
        items={[
          'The course is a personal playbook, not neutral advice. Verify tax numbers for the year you file.',
          'Eleven topics, then a Summary and a Toolbox.',
          'The order of operations: debt and match, emergency fund, Roth IRA, 401k, HSA and FSA, then brokerage.',
          'Change the numbers in every calculator. Seeing it move is how it sticks.',
        ]}
      />
    </div>
  );
}
