import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Steps } from '../../../../components/content/Steps';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { RetirementSustainability } from '../../calculators';

export default function Step9_2_FourPercent() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 9 • The Right Way"
        title="4% In, 4% Out: Spend Only the Growth"
        summary="One year at a time: if the market grows your money 4% and you spend 4%, the balance does not move. That is how the money becomes unlimited."
      />

      <Callout type="info" title="The big idea">
        If your investments grow by <strong>4%</strong> a year and you withdraw <strong>4%</strong> a year, then what you
        spend is exactly what the pile earned. <strong>The pile itself never changes.</strong> You live on the fruit and the
        tree stays whole.
      </Callout>

      <Section title="Year by year, slowly" />
      <p>You retire with <strong>$1,000,000 invested</strong>. The market gives you 4% a year. You spend 4% a year.</p>
      <Steps
        steps={[
          { title: 'Year 1', children: <p>Growth: $1,000,000 × 4% = <strong>$40,000</strong>. You spend $1,000,000 × 4% = <strong>$40,000</strong>. The balance: $1,000,000 + $40,000 − $40,000 = <strong>$1,000,000</strong>.</p> },
          { title: 'Year 2', children: <p>The pile is still $1,000,000. Growth: $40,000. You spend $40,000. Balance: <strong>$1,000,000</strong>.</p> },
          { title: 'Year 3, 4, 5, ...', children: <p>The same. Growth $40,000, spending $40,000, balance $1,000,000. Nothing changes.</p> },
          { title: 'Year 30', children: <p>Growth $40,000, spending $40,000, balance still <strong>$1,000,000</strong>. You spent $1,200,000 over 30 years and still own the whole million.</p> },
        ]}
      />
      <Table
        headers={['Year', 'Start of year', 'Market adds (4%)', 'You spend (4%)', 'End of year']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={[
          ['1', '$1,000,000', '+$40,000', '−$40,000', '$1,000,000'],
          ['2', '$1,000,000', '+$40,000', '−$40,000', '$1,000,000'],
          ['3', '$1,000,000', '+$40,000', '−$40,000', '$1,000,000'],
          ['4', '$1,000,000', '+$40,000', '−$40,000', '$1,000,000'],
          ['5', '$1,000,000', '+$40,000', '−$40,000', '$1,000,000'],
          ['30', '$1,000,000', '+$40,000', '−$40,000', '$1,000,000'],
        ]}
      />

      <Section title="Why it feels like unlimited money" />
      <p>
        You never run out, because you never touch the principal. You spend only the growth, and the growth comes back every
        year. In this simple picture, you could do it for 30 years, 60 years, forever. Your children could inherit the same
        $1,000,000. This is why people call it <strong>financial independence</strong>: the pile pays for your life.
      </p>

      <Section title="What if the market does better?" />
      <Table
        headers={['Market return', 'Year 1 growth', 'You spend (4%)', 'Balance after year 1', 'What it means']}
        align={['left', 'right', 'right', 'right', 'left']}
        rows={[
          ['2%', '$20,000', '$40,000', '$980,000', 'The pile shrinks a little'],
          ['4%', '$40,000', '$40,000', '$1,000,000', 'Exactly flat'],
          ['7%', '$70,000', '$40,000', '$1,030,000', 'The pile grows $30,000'],
          ['10.5%', '$105,000', '$40,000', '$1,065,000', 'The pile grows $65,000'],
        ]}
      />
      <p>
        The S&amp;P 500 has historically earned much more than 4%. So in a typical year the pile <em>grows</em> even after you
        spend. A 4% withdrawal is a cautious percentage chosen to survive the bad years too (step 9.5).
      </p>

      <Callout type="warning" title="One honest caution, before the next lesson">
        In this simple picture the balance stays at $1,000,000 in dollars. But prices rise, so $1,000,000 in 30 years buys
        less. The next lessons fix that. The core idea remains: <strong>a modest percentage, supported by growth</strong>.
      </Callout>

      <Section title="See it yourself" />
      <p>
        The calculator is set to 4% out, 4% growth, no inflation. The balance line is flat. Change the market return and see the
        line rise or sink.
      </p>
      <RetirementSustainability portfolio={1000000} withdrawPct={4} rate={4} inflation={0} years={30} title="4% out, 4% growth: the pile never moves" />

      <Exercise
        title="Try a different pile"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>4% × $1,500,000 = <strong>$60,000</strong> a year to spend.</li>
            <li>If the market grows exactly 4%, the growth is also $60,000, and the balance stays at $1,500,000.</li>
            <li>If the market grows 7%, growth is $105,000, you spend $60,000, and the pile grows by $45,000.</li>
          </ul>
        }
      >
        <p>You retire with $1,500,000. How much can you spend at 4%? If the market gives 4%, what is the balance after a year? If it gives 7%?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="You have $800,000. The market returns 4% and you spend 4%. After one year the balance is:"
          options={['$768,000', '$800,000', '$832,000', '$0']}
          correctIndex={1}
          explanation="Growth of $32,000 equals spending of $32,000."
        />
        <Quiz
          question="Why does the pile not shrink in the 4% in, 4% out picture?"
          options={['You are not spending anything', 'You spend only the growth and never touch the principal', 'The bank guarantees it', 'Taxes cancel out']}
          correctIndex={1}
          explanation="Spending equals growth, so the balance is unchanged."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'If growth equals the percentage you spend, the balance never changes: $1,000,000 stays $1,000,000.',
          'You live on the fruit and the tree stays whole. That is why the money feels unlimited.',
          'Anything the market earns above your withdrawal rate grows the pile.',
          'This is a simplified picture. Inflation and bad years come next.',
        ]}
      />
    </div>
  );
}
