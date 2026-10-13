import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step10_1_Types() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Types"
        title="The Types of Real Estate"
        summary="Single-family, condo, townhouse, multi-family, apartments, land and REITs. What each is, and what it asks of you."
      />

      <Section title="Residential: where people live" />
      <Table
        headers={['Type', 'What it is', 'Upside', 'Watch out for']}
        rows={[
          [<strong key="a">Single-family house</strong>, 'A detached home on its own lot', 'Land (which tends to rise), privacy, no HOA in many areas', 'Highest price per home. You pay for all repairs, roof to plumbing'],
          [<strong key="b">Condo</strong>, 'You own the inside of a unit in a shared building', 'Cheaper entry. Exterior and grounds handled by the HOA', 'HOA dues rise, special assessments, little land, rules'],
          [<strong key="c">Townhouse</strong>, 'A home that shares walls, often with a small yard and an HOA', 'In between a condo and a house', 'HOA dues, shared walls'],
          [<strong key="d">Multi-family (2 to 4 units)</strong>, 'A duplex, triplex or fourplex under one deed', 'Live in one unit and rent the rest. Residential loans still apply', 'You are a landlord. Several systems to maintain'],
          [<strong key="e">Apartment building (5+ units)</strong>, 'A larger rental building', 'Scale, income from many tenants', 'Commercial loans, more capital and management, a business more than a home'],
          [<strong key="f">Mobile or manufactured home</strong>, 'A factory-built home, often on rented land', 'Lowest price', 'Often loses value, and land rent can rise'],
        ]}
      />

      <Section title="Other ways to own real estate" />
      <Table
        headers={['Type', 'What it is', 'Playbook note']}
        rows={[
          [<strong key="a">Land</strong>, 'Empty ground', 'No income and property tax every year. Speculative'],
          [<strong key="b">Commercial</strong>, 'Offices, stores, warehouses', 'Business-like. Leases are long, vacancies are costly. A later step for most people'],
          [<strong key="c">REIT</strong>, 'A fund that owns many properties. You buy shares like a stock', 'Real estate exposure with no tenants and no repairs. Pays dividends. Holdable in a Roth IRA'],
          [<strong key="d">Real estate crowdfunding</strong>, 'Pooling money into a deal online', 'High fees, illiquid, and real risk. Be careful'],
        ]}
      />
      <Callout type="info" title="Your S&amp;P 500 already holds some">
        The S&amp;P 500 includes real estate companies. A dedicated REIT index fund adds more. But a broad stock fund is
        enough diversification for most people, and it does not need a down payment, a mortgage or a plumber.
      </Callout>

      <Section title="Own your home vs own an investment property" />
      <Table
        headers={['', 'Your home (primary residence)', 'An investment property']}
        rows={[
          ['Down payment', 'As low as 3% to 5%, usually 20% to avoid PMI', 'Usually 20% to 25%'],
          ['Mortgage rate', 'Lowest', 'About 0.5% to 1% higher'],
          ['Tax breaks', 'Mortgage interest and property tax (if you itemize). Large exclusion of gain when you sell after 2 years of living there', 'Depreciation, expense deductions, but also income tax on rent'],
          ['Return comes from', 'A place to live, appreciation, rent you do not pay', 'Rent and appreciation, minus every cost'],
          ['Work', 'Maintenance', 'Maintenance, tenants, vacancies, rules'],
        ]}
      />

      <QuizSet title="Check yourself">
        <Quiz
          question="What does a condo owner own?"
          options={['The whole building', 'The inside of a unit, plus a share of common areas through the HOA', 'Only the land', 'Nothing']}
          correctIndex={1}
          explanation="The HOA manages the shared parts and charges monthly dues."
        />
        <Quiz
          question="Which gives real estate exposure with no tenants or repairs?"
          options={['A fourplex', 'A REIT fund', 'Raw land', 'A mobile home']}
          correctIndex={1}
          explanation="A REIT owns many properties and pays you dividends."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'House, condo, townhouse, 2 to 4 unit multi-family, apartments, land, commercial, REITs.',
          'Condos are cheaper to enter but come with HOA dues and assessments.',
          'A REIT fund is real estate without tenants. Your S&P 500 already holds some.',
          'A primary home and an investment property are financed and taxed differently.',
        ]}
      />
    </div>
  );
}
