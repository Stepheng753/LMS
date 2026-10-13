import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { MortgageCalculator } from '../../calculators';

export default function Step10_4_Amortization() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • The Mortgage"
        title="Amortization: Where Each Payment Goes"
        summary="The same payment every month, but at first almost all of it is interest. It takes 19 years before more goes to principal than to interest."
      />

      <Callout type="info" title="What amortization means">
        Amortization is the schedule that splits every payment into <strong>interest</strong> (the bank&apos;s fee) and
        <strong> principal</strong> (paying down the loan). The payment stays the same. The split changes every month.
      </Callout>

      <Section title="Month 1, in dollars" />
      <p>$400,000 at 6.5%. Interest this month is $400,000 × 6.5% ÷ 12 = <strong>$2,166.67</strong>.</p>
      <Table
        headers={['', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Your payment', '$2,528.27'],
          ['Goes to interest', '$2,166.67 (86%)'],
          ['Goes to principal', '$361.60 (14%)'],
          ['The loan after month 1', '$399,638.40'],
        ]}
      />
      <p>
        Next month interest is charged on $399,638, so it is a few dollars lower and principal is a few dollars higher. The
        change is tiny each month, but over 30 years it adds up.
      </p>

      <Section title="The split over 30 years" />
      <Table
        headers={['Year', 'Interest paid that year', 'Principal paid that year', 'Loan left at year end']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['1', '$25,868', '$4,471', '$395,529'],
          ['5', '$24,545', '$5,794', '$374,444'],
          ['10', '$22,327', '$8,013', '$339,105'],
          ['15', '$19,259', '$11,080', '$290,237'],
          ['20', '$15,018', '$15,322', '$222,661'],
          ['25', '$9,152', '$21,187', '$129,217'],
          ['30', '$1,042', '$29,298', '$0'],
        ]}
      />
      <Callout type="warning" title="Five years in, you have paid off only 6.4% of the loan">
        After 5 years of payments totalling about $151,700, the loan has fallen from $400,000 to $374,444: only
        $25,556 of principal. Almost all of what you paid went to interest. Principal first beats interest in month 233, about
        19.4 years in. Over the full loan you will pay <strong>$510,178 of interest</strong>, more than the $400,000 you borrowed.
      </Callout>

      <Section title="What extra payments do" />
      <p>Every extra dollar goes straight to principal, so it stops charging interest for the rest of the loan.</p>
      <Table
        headers={['Extra per month', 'Payoff time', 'Total interest', 'Interest saved']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['$0', '30 years', '$510,178', '—'],
          ['$200', '24 years 5 months', '$398,286', '$111,892'],
          ['$500', '19 years 5 months', '$304,621', '$205,557'],
        ]}
      />
      <p>
        $200 extra a month saves almost $112,000 and about 5.6 years. But compare it with investing: $200 a month invested at
        10.5% for 30 years becomes about $434,000. With a 6.5% mortgage, paying it off early is a guaranteed 6.5% return,
        which is less than the stock market&apos;s long-run average but with no risk. Playbook rule: get the match and the tax-advantaged
        accounts first (Topic 7). Extra mortgage payments come after, or when the rate is high.
      </p>

      <Section title="See the whole schedule" />
      <p>The calculator shows the year-by-year interest, principal and balance. Change the rate or the loan term and watch the split move.</p>
      <MortgageCalculator mode="full" title="Amortization of the $400,000 loan" />

      <Exercise
        title="Work out month 2"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>Interest = $399,638.40 × 6.5% ÷ 12 = <strong>$2,164.71</strong>.</li>
            <li>Principal = $2,528.27 − $2,164.71 = <strong>$363.56</strong>.</li>
            <li>The loan is now $399,274.84.</li>
          </ul>
        }
      >
        <p>After month 1 the loan is $399,638.40. What are the interest and the principal portions of the month 2 payment?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="In the first year of a 30-year mortgage at 6.5%, about what share of payments goes to interest?"
          options={['14%', '50%', '85%', '100%']}
          correctIndex={2}
          explanation="About $25,868 of $30,339 paid in year 1 is interest."
        />
        <Quiz
          question="What does an extra payment do?"
          options={['Lowers the rate', 'Goes entirely to principal, cutting future interest', 'Pays the tax', 'Nothing until the end']}
          correctIndex={1}
          explanation="Extra money reduces the balance, so interest falls from then on."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The payment is fixed. The split between interest and principal changes every month.',
          'Month 1: $2,167 interest and $362 principal. Principal first exceeds interest around year 19.',
          'Total interest on $400,000 at 6.5% over 30 years is $510,178.',
          'Extra payments save a lot of interest, but tax-advantaged investing usually comes first.',
        ]}
      />
    </div>
  );
}
