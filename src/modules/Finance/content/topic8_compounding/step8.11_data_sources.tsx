import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Formula } from '../../../../components/content/Formula';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

const A: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
    {children}
  </a>
);

export default function Step8_11_DataSources() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 8 • The Data"
        title="Where the 10.5% and the 3% Come From"
        summary="Every number in this topic has a source you can check yourself. Learn where to find them and how to calculate them."
      />

      <Callout type="info" title="Never trust a number you cannot trace">
        Financial articles, ads and advisors quote returns all the time. Knowing where the data lives, and how to compute
        the average yourself, is the best protection against exaggeration.
      </Callout>

      <Section title="The sources" />
      <Table
        headers={['Number', 'Where to get it', 'What it contains']}
        rows={[
          [<strong key="a">S&amp;P 500 returns since 1928</strong>, <A key="a1" href="https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histret.html">NYU Stern, Aswath Damodaran: Historical Returns on Stocks, Bonds and Bills</A>, 'Yearly returns for the S&P 500 (with dividends), 10-year Treasury bonds, T-bills, real estate, gold and inflation, in a free Excel file'],
          [<strong key="b">S&amp;P 500 since 1957</strong>, <A key="b1" href="https://www.spglobal.com/spdji/en/indices/equity/sp-500/">S&P Dow Jones Indices: S&P 500</A>, 'The official index, its history and its methodology. The 10.5% since-inception figure refers to this index'],
          [<strong key="c">Long monthly history back to 1871</strong>, <A key="c1" href="http://www.econ.yale.edu/~shiller/data.htm">Robert Shiller’s data (Yale)</A>, 'Monthly S&P prices, dividends, earnings and CPI back to 1871'],
          [<strong key="d">Inflation (CPI)</strong>, <A key="d1" href="https://www.bls.gov/cpi/">US Bureau of Labor Statistics: Consumer Price Index</A>, 'The official inflation measure, monthly, back to 1913'],
          [<strong key="e">Inflation and many other series, in charts</strong>, <A key="e1" href="https://fred.stlouisfed.org/series/CPIAUCSL">FRED, Federal Reserve Bank of St. Louis (CPIAUCSL)</A>, 'Free charts and downloads of CPI, interest rates and economic data'],
          [<strong key="f">Do professionals beat the index?</strong>, <A key="f1" href="https://www.spglobal.com/spdji/en/research-insights/spiva/">S&P SPIVA scorecards</A>, 'Twice-yearly reports on how many active funds beat their index'],
        ]}
      />
      <p className="text-sm text-muted-foreground">
        These are the sites at the time of writing. Web addresses change, so if a link is out of date, search for the name
        in quotes. The Damodaran file is free, updated yearly, and used by many universities.
      </p>

      <Section title="How to compute the average yourself" />
      <Formula label="Compound annual growth rate (CAGR)" where={[{ symbol: 'start', meaning: 'value at the beginning' }, { symbol: 'end', meaning: 'value at the end' }, { symbol: 'n', meaning: 'number of years between them' }]}>
        CAGR = (end ÷ start)^(1 ÷ n) − 1
      </Formula>
      <Table
        headers={['Example', 'Calculation', 'CAGR']}
        rows={[
          ['An index goes from 1,000 to 5,000 in 25 years', '(5,000 ÷ 1,000)^(1/25) − 1', '6.65% a year (price only)'],
          ['$10,000 grows to $452,593 in 40 years', '(452,593 ÷ 10,000)^(1/40) − 1', '10.0% a year'],
          ['CPI rises from 130.7 (1990) to about 313.7 (2024)', '(313.7 ÷ 130.7)^(1/34) − 1', 'about 2.6% a year inflation'],
        ]}
      />
      <p>
        A spreadsheet does it with one formula: <code>=(END/START)^(1/YEARS)-1</code>. Download the Damodaran file, pick any start
        and end year, and compute the S&amp;P 500&apos;s yearly growth for that window.
      </p>

      <Section title="Traps that make the numbers differ" />
      <Table
        headers={['Trap', 'What it does', 'How to avoid it']}
        rows={[
          [<strong key="a">Price return vs total return</strong>, 'Price return ignores dividends. Dividends add roughly 1.5% to 2% a year, which is a big part of the 10%', 'Always use total return (dividends reinvested)'],
          [<strong key="b">The start and end dates</strong>, 'Results change a lot with the window. 1982 to 2000 was a boom. 2000 to 2012 was roughly flat', 'Look at several windows. Prefer 20 to 30 years or longer'],
          [<strong key="c">Nominal vs real</strong>, 'A 10% nominal return is about 7% real', 'Say which one you mean'],
          [<strong key="d">Average vs compound</strong>, 'A simple average of yearly returns overstates growth (step 8.12)', 'Use CAGR'],
          [<strong key="e">Survivorship</strong>, 'Funds that failed are removed from the list, so the survivors look better', 'Use the index, not a list of current funds'],
          [<strong key="f">Fees and taxes</strong>, 'The index return is before them. Your own return is lower', 'Use low-cost funds in tax-advantaged accounts'],
        ]}
      />

      <Section title="What the numbers in this course are" />
      <Table
        headers={['Number', 'Value', 'Definition']}
        rows={[
          ['S&P 500, since the index began (1957)', 'about 10.5%', 'Total return (dividends reinvested), compound annual rate'],
          ['S&P 500, 1928 to 2024', 'about 10%', 'Total return, from the Damodaran dataset'],
          ['Inflation, long-run average', 'about 3%', 'US CPI, compound annual rate'],
          ['Real return', 'about 7%', '1.105 ÷ 1.03 − 1'],
        ]}
      />
      <Callout type="warning" title="The past does not promise the future">
        These are long-run history, not forecasts. The next 40 years may be better or worse. That is why the course shows
        lower rates, such as 7%, next to 10.5%.
      </Callout>

      <Exercise
        title="Check a claim yourself"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>(2 ÷ 1)^(1/7) − 1 = 2^0.1429 − 1 = <strong>10.4%</strong> a year. It matches the S&amp;P 500 long-run average.</li>
            <li>(150 ÷ 100)^(1/10) − 1 = 1.5^0.1 − 1 = <strong>4.1%</strong> a year.</li>
            <li>(300 ÷ 100)^(1/20) − 1 = <strong>5.7%</strong>, so prices rose about 5.7% a year. That is double the long-run average.</li>
          </ul>
        }
      >
        <p>Compute the CAGR: (a) an investment doubles in 7 years, (b) $100 becomes $150 in 10 years, (c) a price index goes from 100 to 300 in 20 years.</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which is the most appropriate measure to compare with the 10.5% S&P 500 figure?"
          options={['Price return only', 'Total return with dividends reinvested', 'The simple average of yearly returns', 'A single great year']}
          correctIndex={1}
          explanation="The 10.5% figure includes dividends and is a compound annual rate."
        />
        <Quiz
          question="An investment grows from $20,000 to $80,000 in 14 years. About what is the yearly growth rate?"
          options={['5%', '10%', '25%', '30%']}
          correctIndex={1}
          explanation="It quadrupled, which is two doublings in 14 years, so a doubling every 7 years: about 10% a year."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Check the data: NYU Stern (Damodaran) for returns, S&P Dow Jones for the index, Shiller for the long history, BLS and FRED for inflation.',
          'CAGR = (end ÷ start)^(1 ÷ years) − 1.',
          'Use total return, long windows and real figures. Beware of start dates and survivorship.',
          'History is a guide, not a promise. Plan with lower rates too.',
        ]}
      />
    </div>
  );
}
