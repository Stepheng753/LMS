import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Flow } from '../../../../components/content/Flow';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_9_RothTrad4() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Roth vs Traditional (4 of 4)"
        title="Why This Playbook Prefers Roth"
        summary="The personal choice, in plain words. Roth is just like everything else you buy: the money comes out of your paycheck, you pay the tax, and then it is yours."
      />

      <Callout type="success" title="The preference">
        This playbook picks <strong>Roth</strong>. It is a personal preference, not the mathematically best answer for
        every person. The math says it is a tie when rates match, and the better answer depends on a future nobody
        knows. Here is why Roth wins for this playbook anyway.
      </Callout>

      <Section title="The argument: it works like everything else you buy" />
      <Flow
        steps={[
          { title: 'You earn money', sub: 'a paycheck' },
          { title: 'Tax is taken', sub: 'federal, California, FICA', via: 'now' },
          { title: 'What is left is yours', sub: 'to spend, save, or invest', via: 'free and clear' },
        ]}
      />
      <p>
        When you buy groceries, a car or a vacation, you pay with money that has <em>already been taxed</em>. Nobody
        sends you a surprise tax bill when you eat the dinner. A Roth account follows the same rule: the money leaves your
        paycheck after tax, goes into the account, and from that moment <strong>you never owe tax on it again</strong>.
        The growth, the withdrawal and what your heirs get are all yours.
      </p>
      <p>
        A traditional account is different. Part of every dollar in it belongs to the government, and you do not know how
        much. You carry an unknown tax bill for decades.
      </p>

      <Section title="The five reasons, in one place" />
      <Table
        headers={['Reason', 'In plain words']}
        rows={[
          [<strong key="a">1. A known tax now beats an unknown tax later</strong>, 'You can see today’s rate and pay it. Future rates are a guess, and history says they can be much higher'],
          [<strong key="b">2. It is simple</strong>, 'Pay the tax, put the money away, never think about it again. No planning for withdrawals, no required minimums, no bracket tricks'],
          [<strong key="c">3. A bigger effective limit</strong>, 'Maxing a Roth shelters more real money than maxing a traditional account'],
          [<strong key="d">4. It forces the habit</strong>, 'You cannot spend a refund you never received. The money is gone from your paycheck and growing tax-free'],
          [<strong key="e">5. Freedom</strong>, 'Contributions can be withdrawn anytime in a true emergency. No tax on the growth. No tax for heirs'],
        ]}
      />

      <Section title="The playbook's rules for choosing" />
      <Table
        headers={['Your situation', 'Choose', 'Why']}
        rows={[
          ['Default: most people, most years', <strong key="a">Roth</strong>, 'The reasons above'],
          ['Early in your career, low bracket', <strong key="b">Roth</strong>, 'You pay a low rate today on money that could grow for 40 years'],
          ['Peak earnings in the 32% or higher bracket, expecting far lower income later', 'Traditional (at least part)', 'The deduction is worth the most when your rate is highest'],
          ['Over the Roth IRA income limit', 'Backdoor Roth (step 7.12) or traditional', 'Direct contributions are blocked'],
          ['Employer match', 'Takes whatever the plan gives', 'The match goes in pre-tax either way'],
          ['You need a bigger paycheck now to avoid debt', 'Traditional or just the match for now', 'Staying out of debt matters more than the tax type'],
          ['You are unsure', 'Split 50/50', 'A hedge against not knowing future rates'],
        ]}
      />

      <Callout type="warning" title="Do not let this decision stop you">
        The difference between Roth and traditional is small compared with the difference between investing and not
        investing. Someone who contributes to <em>either</em> for 30 years does far better than someone who spends a year
        deciding and starts late. Pick one, automate it, and revisit once a year.
      </Callout>

      <Section title="Where the playbook puts Roth" />
      <ol className="list-decimal pl-5 space-y-1">
        <li><strong>Roth IRA</strong> first, up to $7,500 (step 3 of the order of operations).</li>
        <li><strong>Roth 401k</strong>, if your plan offers it, for the contribution above the match (step 4).</li>
        <li>If there is no Roth 401k option, choose traditional and keep the Roth IRA as the main account.</li>
        <li>The <strong>HSA</strong> is the one account with a deduction going in and tax-free coming out, so it is the exception that is better than either.</li>
      </ol>

      <QuizSet title="Check yourself">
        <Quiz
          question="What is the playbook's main reason for choosing Roth?"
          options={['The math always favors Roth', 'You pay a known tax now instead of an unknown tax later, and the money is then fully yours', 'The government requires it', 'Roth has lower fees']}
          correctIndex={1}
          explanation="The math is a tie at equal rates. The choice is about certainty, simplicity and forcing the habit."
        />
        <Quiz
          question="Which person might reasonably choose traditional?"
          options={['A 23-year-old in the 12% bracket', 'Someone in the 35% bracket who will retire to far lower income', 'Anyone who dislikes taxes', 'Everyone']}
          correctIndex={1}
          explanation="The deduction is worth the most when your current rate is highest and your later rate is low."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The playbook prefers Roth: pay the tax, then the money is yours, like everything else you buy.',
          'A known rate now beats an unknown rate later, and the Roth forces the saving habit.',
          'Traditional is reasonable at peak income with a much lower income expected later.',
          'Pick one and automate it. Not investing costs far more than choosing the wrong type.',
        ]}
      />
    </div>
  );
}
