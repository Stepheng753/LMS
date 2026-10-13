import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step6_5_Life() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Insurance"
        title="Term Life Insurance"
        summary="Who needs it, how much, which kind, and why the playbook buys term and invests the difference."
      />

      <Section title="Who needs it?" />
      <p>
        Life insurance replaces your income if you die. <strong>If nobody depends on your income, you do not need it.</strong>
        You need it if a spouse, child or parent would suffer financially without your paycheck, or if a co-signed debt
        would fall to someone else.
      </p>

      <Section title="How much?" />
      <Table
        headers={['Method', 'Calculation', 'Example']}
        rows={[
          [<strong key="a">Rule of thumb</strong>, '10 to 12 times your yearly income', '$80,000 income gives $800,000 to $960,000'],
          [<strong key="b">Needs-based</strong>, 'Debts + years of income to replace + future costs (college) − savings', 'Mortgage $350,000 + 10 years of income $800,000 + college $150,000 − savings $100,000 = $1.2 million'],
        ]}
      />
      <p>Use the larger number if your family would struggle. Re-check after any major life event: a baby, a home, a raise.</p>

      <Section title="Term vs permanent: the playbook picks term" />
      <Compare
        goodLabel="Term life (the playbook)"
        badLabel="Whole and universal life"
        good={
          <>
            <p>Covers a fixed number of years: 10, 20 or 30.</p>
            <p><strong>Cheap.</strong> A healthy 30-year-old can often buy $500,000 of 20-year coverage for roughly $20 to $35 a month.</p>
            <p>Pays only if you die within the term. That is the point: you need it only while others depend on you.</p>
            <p>Simple: no investment component to understand.</p>
          </>
        }
        bad={
          <>
            <p>Covers your whole life and builds a &quot;cash value&quot;.</p>
            <p><strong>Many times the price</strong> of term for the same death benefit.</p>
            <p>The cash value grows slowly and has fees and commissions, so it is a poor investment.</p>
            <p>Complex, and heavily sold because agents earn large commissions.</p>
          </>
        }
      />
      <Callout type="success" title="Buy term, invest the difference">
        The playbook: buy a 20- to 30-year term policy sized to your needs. Put the money you save compared with whole
        life into the order of operations (Topic 7). By the time the term ends, you should be self-insured: your
        investments are the safety net.
      </Callout>

      <Section title="How to buy it" />
      <ol className="list-decimal pl-5 space-y-1">
        <li>Decide on the amount and the term (a 30-year-old with a baby: about 20 to 30 years).</li>
        <li>Get quotes from several insurers, or a licensed independent broker. Rates for healthy people vary a lot.</li>
        <li>Apply while you are healthy: price is based on age and health. Waiting costs more.</li>
        <li>Name <strong>beneficiaries</strong> and a backup, and keep them updated.</li>
        <li>Tell your family where the policy is.</li>
      </ol>
      <p>
        Group life insurance through work is often a small amount (1 to 2 times salary) and ends when you leave the job.
        Treat it as a bonus, not a plan.
      </p>

      <Exercise
        title="Work out the coverage"
        solution={
          <p>
            Income $90,000 × 10 = <strong>$900,000</strong> by the rule of thumb. Needs-based: $300,000 debt + $450,000
            (5 years of income) − $120,000 savings = <strong>$630,000</strong>. A policy of $750,000 to $900,000 is a
            reasonable choice, covering a family that would need the income for a decade.
          </p>
        }
      >
        <p>A parent earns $90,000, has $300,000 of debt, and has $120,000 saved. The family would need about 5 years of income to adjust. How much coverage by the rule of thumb and by the needs method?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Who most clearly needs life insurance?"
          options={['A single person with no debts', 'A parent whose partner and child rely on their income', 'A retiree with plenty of savings', 'A college student']}
          correctIndex={1}
          explanation="Life insurance replaces income that others depend on."
        />
        <Quiz
          question="Why does the playbook choose term over whole life?"
          options={['Whole life is illegal', 'Term is far cheaper for the same coverage, and you can invest the difference', 'Term lasts forever', 'Whole life pays less']}
          correctIndex={1}
          explanation="Term gives the protection you need at a fraction of the price."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'You need life insurance only if someone depends on your income or shares your debts.',
          'Rule of thumb: 10 to 12 times your yearly income, or use the needs method.',
          'Buy 20- to 30-year term. Skip whole and universal life.',
          'Invest the difference. Keep beneficiaries current. Apply while you are healthy.',
        ]}
      />
    </div>
  );
}
