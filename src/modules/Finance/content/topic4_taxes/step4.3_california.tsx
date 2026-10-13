import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Compare } from '../../../../components/content/Compare';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';
import { TaxBrackets } from '../../calculators';

export default function Step4_3_California() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 4 • Income Tax"
        title="California Income Tax: 2026"
        summary="California has its own nine brackets, its own deduction, and a few rules that surprise people."
      />

      <Section title="The brackets for 2026 (taxable income)" />
      <Table
        headers={['Rate', 'Single (and married filing separately)', 'Married filing jointly']}
        rows={[
          ['1%', 'up to $11,456', 'up to $22,912'],
          ['2%', '$11,456 to $27,157', '$22,912 to $54,314'],
          ['4%', '$27,157 to $42,861', '$54,314 to $85,722'],
          ['6%', '$42,861 to $59,498', '$85,722 to $118,996'],
          ['8%', '$59,498 to $75,197', '$118,996 to $150,394'],
          ['9.3%', '$75,197 to $384,109', '$150,394 to $768,218'],
          ['10.3%', '$384,109 to $460,927', '$768,218 to $921,854'],
          ['11.3%', '$460,927 to $768,213', '$921,854 to $1,536,426'],
          ['12.3%', 'over $768,213', 'over $1,536,426'],
        ]}
      />
      <p className="text-sm text-muted-foreground">
        Source: California Franchise Tax Board, 2026 indexed amounts (October 2026). The FTB quotes the first brackets
        directly. The upper brackets follow the same inflation index and match published tables, and joint brackets are
        exactly double the single ones. The official full schedule is posted in late December, so verify at ftb.ca.gov
        before you file. There is also a 1% mental health services tax on taxable income over $1 million.
      </p>

      <Section title="California 2026 deduction and credits" />
      <Table
        headers={['Item', 'Single', 'Married filing jointly']}
        align={['left', 'right', 'right']}
        rows={[
          ['Standard deduction', '$5,900', '$11,800'],
          ['Personal exemption credit', '$158', '$316'],
          ['Dependent exemption credit (each)', '$491', '$491'],
          ['State Disability Insurance (SDI), withheld from pay', '1.3% of all wages', '1.3% of all wages'],
        ]}
      />
      <p>
        The standard deduction is much smaller than the federal one. The personal and dependent credits reduce the tax
        itself, dollar for dollar.
      </p>

      <Section title="The $100,000 example, bucket by bucket (California, single)" />
      <p>Taxable income = $100,000 − $5,900 = <strong>$94,100</strong>.</p>
      <Table
        headers={['Bucket (rate)', 'Dollars in it', 'Tax']}
        align={['left', 'right', 'right']}
        rows={[
          ['1%', '$11,456', '$115'],
          ['2%', '$15,701', '$314'],
          ['4%', '$15,704', '$628'],
          ['6%', '$16,637', '$998'],
          ['8%', '$15,699', '$1,256'],
          ['9.3%', '$18,903', '$1,758'],
          [<strong key="a">Total before credits</strong>, <strong key="b">$94,100</strong>, <strong key="c">$5,069</strong>],
          ['Minus personal exemption credit', '', '−$158'],
          [<strong key="d">California income tax</strong>, '', <strong key="e">$4,911</strong>],
        ]}
      />
      <p>
        That is 4.9% of the $100,000 salary, plus SDI of 1.3% ($1,300). Notice that most of the income was taxed at
        6% or less. Only the top $18,903 was in the 9.3% bucket.
      </p>

      <Section title="Where California differs from the federal system" />
      <Compare
        goodLabel="California is kinder here"
        badLabel="California is harsher here"
        good={
          <>
            <p><strong>Social Security benefits</strong> are not taxed by California.</p>
            <p>No tax on <strong>unemployment-type</strong> payments from some programs (varies).</p>
            <p>Joint brackets are exactly double the single ones.</p>
          </>
        }
        bad={
          <>
            <p><strong>No special capital gains rate.</strong> Gains are taxed as ordinary income, up to 12.3%.</p>
            <p><strong>HSA contributions are taxed.</strong> California does not recognize the HSA deduction.</p>
            <p>No federal-style qualified business income deduction.</p>
            <p>A much higher top rate, 12.3% (13.3% over $1 million with the mental health tax).</p>
            <p>SDI of 1.3% on all wages, with no cap.</p>
          </>
        }
      />
      <Callout type="warning" title="HSA surprise">
        Money you put in a Health Savings Account lowers your federal tax but <strong>not</strong> your California tax, and
        interest or gains in it are taxable in California each year. The HSA is still strong (Topic 7). Just do not
        expect a California deduction.
      </Callout>

      <Section title="The calculator, California on" />
      <p>Try a single $100,000 earner, then a married couple, and see both taxes side by side.</p>
      <TaxBrackets />

      <QuizSet title="Check yourself">
        <Quiz
          question="California taxable income of $50,000 for a single filer is taxed at what marginal rate?"
          options={['1%', '4%', '6%', '9.3%']}
          correctIndex={2}
          explanation="$50,000 is between $42,861 and $59,498, the 6% bracket."
        />
        <Quiz
          question="Which of these is true about California and capital gains?"
          options={['They are taxed at 0%', 'They are taxed as ordinary income', 'They are not taxed', 'They are taxed at 15% flat']}
          correctIndex={1}
          explanation="California has no special capital gains rate."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'California has nine brackets from 1% to 12.3%. Joint brackets are double the single ones.',
          'Standard deduction $5,900 single, $11,800 joint. Personal credit $158 or $316. Dependent credit $491.',
          'A $100,000 single earner owes about $4,911 in California income tax plus $1,300 SDI.',
          'California taxes capital gains as ordinary income and does not allow the HSA deduction.',
        ]}
      />
    </div>
  );
}
