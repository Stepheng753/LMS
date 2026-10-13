import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { Compare } from '../../../../components/content/Compare';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_11_RedFlags() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Safety"
        title="Mistakes and Red Flags"
        summary="The most expensive money mistakes, the warning signs of scams, and the questions that protect you."
      />

      <Section title="The costliest mistakes" />
      <Table
        headers={['Mistake', 'What it costs', 'The fix']}
        rows={[
          ['Carrying a card balance', '22% or more a year', 'Pay in full, automatic'],
          ['Skipping the employer match', 'Up to 100% return thrown away', 'Contribute enough for the full match'],
          ['Waiting to start investing', '10 years of delay can cost about $2 million', 'Start now, even small'],
          ['Lifestyle creep', 'A raise that vanishes', 'Half of every raise to investing'],
          ['No emergency fund', 'New debt with every surprise', '3 to 6 months in savings'],
          ['Paying high fund fees', 'About $163,000 over 30 years at 1%', 'Index funds at 0.03%'],
          ['Selling in a crash', 'Turns a drop into a permanent loss', 'Hold and keep buying'],
          ['Buying more house than you can carry', 'A payment that blocks investing', 'Housing at or below 28% of gross'],
          ['Ignoring taxes on 1099 income', 'A bill in April', 'Save 25% to 30% and pay quarterly'],
          ['Cashing out a 401k when changing jobs', 'Tax, a 10% penalty and lost growth', 'Roll it over directly'],
        ]}
      />

      <Section title="Scam and sales-pitch red flags" />
      <Compare
        goodLabel="Signs of a legitimate offer"
        badLabel="Red flags"
        good={
          <>
            <p>It explains the costs and the risks plainly.</p>
            <p>It is a regulated, well-known provider.</p>
            <p>You can take your time and ask questions.</p>
            <p>A fiduciary advisor charges a flat or hourly fee.</p>
          </>
        }
        bad={
          <>
            <p><strong>Guaranteed high returns.</strong> No one can promise them.</p>
            <p><strong>Pressure to act today.</strong></p>
            <p>You must recruit friends, or buy a kit.</p>
            <p>Payment by gift card, wire or crypto.</p>
            <p>A &quot;secret&quot; or &quot;insider&quot; strategy.</p>
            <p>An agent pushing whole life, annuities or products with high commissions.</p>
          </>
        }
      />

      <Callout type="warning" title="Ask these five questions before you buy anything financial">
        <ol className="list-decimal pl-5 space-y-1">
          <li>How do you get paid?</li>
          <li>What are all the fees, every year?</li>
          <li>What is the worst that can happen?</li>
          <li>Can I get my money out, and what does it cost?</li>
          <li>Is there a cheaper index fund or plain alternative that does the same?</li>
        </ol>
      </Callout>

      <Section title="Protect yourself" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Never share your Social Security number, passwords or account codes by phone, text or email you did not start.</li>
        <li>Use two-step verification on every bank and investment account.</li>
        <li>Freeze your credit with all three bureaus (free). Unfreeze it only when you need a loan.</li>
        <li>Check statements monthly. Review your credit reports once a year at annualcreditreport.com.</li>
        <li>The IRS and your bank will not call to demand immediate payment by gift card or crypto.</li>
      </ul>

      <KeyTakeaways
        items={[
          'The biggest mistakes: card balances, skipping the match, starting late, high fees, selling in a crash, too much house.',
          'Red flags: guaranteed returns, pressure, recruiting, odd payment methods, commission-driven products.',
          'Ask about pay, fees, worst case and exit before you buy. Freeze your credit.',
        ]}
      />
    </div>
  );
}
