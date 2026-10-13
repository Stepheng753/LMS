import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step7_10_RothBoth() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 7 • Roth in Each Account"
        title="Roth in the IRA and in the 401k"
        summary="The same idea in two containers: after-tax in, tax-free out. Here is how each one works, side by side."
      />

      <p>
        Roth is not a type of investment. It is a <strong>tax rule that can be applied to two containers</strong>: an IRA
        (the account you open yourself) and a 401k (the account at your job). The idea is identical: pay the tax now and the
        growth is yours. The rules around the edges differ.
      </p>

      <Section title="Roth IRA vs Roth 401k, side by side" />
      <Table
        headers={['', 'Roth IRA', 'Roth 401k']}
        rows={[
          [<strong key="a">Where you get it</strong>, 'You open it at a broker', 'Only if your employer offers it'],
          [<strong key="b">2026 limit</strong>, '$7,500 (+$1,100 at 50+)', '$24,500 (+$8,000 at 50+)'],
          [<strong key="c">Limit shared with traditional?</strong>, 'Yes, with all your IRAs', 'Yes, with your traditional 401k'],
          [<strong key="d">Income limit</strong>, 'Yes: phase-out at $153,000 to $168,000 single, $242,000 to $252,000 married', <strong key="e">None</strong>],
          [<strong key="f">Employer match</strong>, 'No', 'Yes, deposited pre-tax in the traditional side'],
          [<strong key="g">Investment choices</strong>, 'Everything at your broker', 'Only the plan menu'],
          [<strong key="h">Withdraw contributions early</strong>, 'Yes, any time, tax and penalty free', 'Not as simply: contributions and earnings come out in proportion'],
          [<strong key="i">Required withdrawals</strong>, 'None', 'None (since 2024)'],
          [<strong key="j">Tax-free earnings</strong>, 'After 59½ and the account is 5 years old', 'After 59½ and the account is 5 years old'],
          [<strong key="k">If you change jobs</strong>, 'Stays with you', 'Roll it into a Roth IRA'],
        ]}
      />

      <Section title="The withdrawal rules, in plain words" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Contributions</strong> (what you put in) from a Roth IRA are always yours to take out, tax- and penalty-free. This is why the Roth IRA doubles as a backup emergency fund of last resort.</li>
        <li><strong>Earnings</strong> (the growth) are tax-free only if you are <strong>at least 59½ and the account has been open at least 5 years</strong>. Take earnings out earlier and you owe tax plus a 10% penalty, with some exceptions.</li>
        <li><strong>The 5-year clock</strong> starts on January 1 of the year of your first Roth IRA contribution. Open one early, even with a small amount, to start the clock.</li>
        <li><strong>Ordering rule:</strong> withdrawals from a Roth IRA come out in a fixed order: contributions first, then conversions, then earnings. So small early withdrawals are almost always just contributions.</li>
      </ul>

      <Callout type="warning" title="Do not treat the Roth as a savings account">
        You <em>can</em> take contributions out. But every dollar you withdraw loses decades of tax-free growth, and you cannot
        put it back above the yearly limit. Use it only for a real emergency, after your actual emergency fund.
      </Callout>

      <Section title="Roth conversions (a brief note)" />
      <p>
        You can move money from a traditional IRA or 401k into a Roth. The amount moved is added to your income that year
        and taxed, so you pay tax now on money that will then grow tax-free. People do it in low-income years. It is an
        advanced tool. The only time you will need it in this course is the backdoor Roth (step 7.12).
      </p>

      <Section title="How the playbook uses them together" />
      <Steps
        steps={[
          { title: '401k up to the match', children: <p>Contribute enough to get the full employer match. Choose Roth for your own money if offered. The match goes in pre-tax.</p> },
          { title: 'Roth IRA to the limit', children: <p>$625 a month reaches $7,500. This is the best container: the widest choice of investments and the most flexibility.</p> },
          { title: 'Roth 401k above the match', children: <p>After the IRA is full, raise the 401k contribution toward $24,500, again Roth if offered.</p> },
          { title: 'If the 401k has no Roth option', children: <p>Use the traditional 401k, and rely on the Roth IRA as your Roth money. A mix is fine.</p> },
          { title: 'Check once a year', children: <p>On each raise, bump the contribution. Confirm the money is invested and the match is arriving.</p> },
        ]}
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="Which Roth account has an income limit for contributing?"
          options={['Roth 401k', 'Roth IRA', 'Both', 'Neither']}
          correctIndex={1}
          explanation="The Roth IRA phases out at higher incomes. The Roth 401k has no income limit."
        />
        <Quiz
          question="You contributed $20,000 to a Roth IRA over four years. Can you withdraw $5,000 of it tax- and penalty-free?"
          options={['No, never', 'Yes, contributions can always be withdrawn', 'Only after 59½', 'Only with a penalty']}
          correctIndex={1}
          explanation="Your own contributions come out first and are tax- and penalty-free."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Roth is a tax rule applied to two containers: the IRA (limit $7,500) and the 401k (limit $24,500).',
          'The Roth IRA has an income limit and the widest investment choice. The Roth 401k has no income limit and a big limit.',
          'Contributions come out freely. Earnings are tax-free after 59½ and 5 years.',
          'Neither Roth has required withdrawals. Open a Roth IRA early to start the 5-year clock.',
        ]}
      />
    </div>
  );
}
