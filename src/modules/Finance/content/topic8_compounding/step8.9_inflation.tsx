import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step8_9_Inflation() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • Inflation"
        title="Inflation: The Quiet Tax on Cash"
        summary="Prices rise about 3% a year. Money that does not grow loses buying power, even while the number on the statement stays the same."
      />

      <Callout type="info" title="What inflation is">
        Inflation is the average rise in prices over time. If inflation is 3%, something that costs $100 this year costs
        $103 next year. Your money buys less. Compounding works on prices the same way it works on investments.
      </Callout>

      <Formula label="Prices after n years" where={[{ symbol: 'i', meaning: 'yearly inflation, as a decimal' }, { symbol: 'n', meaning: 'number of years' }]}>
        future price = today&apos;s price × (1 + i)^n
      </Formula>

      <Section title="What 3% inflation does to prices" />
      <Table
        headers={['Years from now', 'Prices multiply by', 'A $100 item costs', 'A $60,000-a-year life costs']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['10', '1.34', '$134', '$80,635'],
          ['20', '1.81', '$181', '$108,367'],
          ['30', '2.43', '$243', '$145,636'],
          ['40', '3.26', '$326', '$195,722'],
        ]}
      />
      <p>
        In 40 years, a lifestyle that costs $60,000 a year today costs about <strong>$195,700</strong> a year. A dollar
        then buys only about 31 cents of what it buys today. This is why retirement targets are always built in today&apos;s
        dollars first (Topic 9).
      </p>

      <Section title="What inflation does to cash" />
      <p>$10,000 sits in a savings account paying 1% for 40 years, while prices rise 3% a year:</p>
      <Table
        headers={['', 'Amount']}
        align={['left', 'right']}
        rows={[
          ['Balance on the statement after 40 years (1% growth)', '$14,889'],
          ['What it can buy, in today’s dollars', '$4,564'],
          ['Loss of buying power', 'about 54%'],
          ['Under a mattress (0% growth)', '$10,000 on paper, $3,066 in today’s dollars'],
        ]}
      />
      <Callout type="warning" title="Cash is not safe from inflation">
        An account that earns less than inflation loses buying power every year, even if the balance never falls. A savings
        account is <em>safe from market drops</em>, not from inflation. Keep emergency money there. Keep long-term money in
        investments that outpace inflation.
      </Callout>

      <Section title="The real return" />
      <Formula label="Real return (the Fisher equation)">real return = (1 + nominal) ÷ (1 + inflation) − 1</Formula>
      <Table
        headers={['Where the money is', 'Nominal return', 'Inflation', 'Real return']}
        align={['left', 'right', 'right', 'right']}
        rows={[
          ['Savings account', '1%', '3%', '−1.9%'],
          ['Bonds', '4.5%', '3%', '+1.5%'],
          ['S&P 500', '10.5%', '3%', '+7.3%'],
        ]}
      />
      <p>
        The simple subtraction (10.5 − 3 = 7.5) is close, but the exact answer is 7.28%. For planning, the real return is
        the number that counts: it tells you how fast your <em>buying power</em> grows.
      </p>

      <Section title="Inflation is not constant" />
      <ul className="list-disc pl-5 space-y-1">
        <li>The long-run US average is about 3% a year (Bureau of Labor Statistics CPI).</li>
        <li>It has been much higher: above 13% at the end of the 1970s, and 9.1% at its peak in June 2022.</li>
        <li>It has been much lower: around 1.5% to 2% for most of the 2010s.</li>
        <li>That is one more reason to plan with a margin: use 3% as the base and test 4%.</li>
      </ul>

      <Exercise
        title="Inflate a price"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>$4,000 × 1.03^20 = $4,000 × 1.806 = <strong>$7,224</strong>.</li>
            <li>$1,000 now buys what $1,000 ÷ 1.806 = <strong>$554</strong> buys in 20 years.</li>
            <li>Real return of an account paying 5% with 3% inflation: 1.05 ÷ 1.03 − 1 = <strong>1.94%</strong>.</li>
          </ul>
        }
      >
        <p>(a) A $4,000 vacation today costs how much in 20 years at 3% inflation? (b) $1,000 saved today buys how much of today’s goods in 20 years? (c) What is the real return of a 5% account with 3% inflation?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="At 3% inflation, a $100 basket of goods costs about how much in 40 years?"
          options={['$120', '$220', '$326', '$1,000']}
          correctIndex={2}
          explanation="1.03^40 = 3.26."
        />
        <Quiz
          question="A savings account pays 1% while inflation is 3%. What happens to your buying power?"
          options={['It grows 1%', 'It stays the same', 'It falls about 2% a year', 'It doubles']}
          correctIndex={2}
          explanation="The real return is about −1.9% a year."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Inflation of 3% multiplies prices by 3.26 in 40 years. A dollar then buys about 31 cents of today’s goods.',
          'Cash earning less than inflation loses buying power. Keep only emergency money there.',
          'Real return = (1 + nominal) ÷ (1 + inflation) − 1. S&P 500: 10.5% nominal is about 7.3% real.',
          'Inflation varies from under 2% to over 13%. Plan with a margin.',
        ]}
      />
    </div>
  );
}
