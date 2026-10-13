import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_5_Topics10to11() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Recap"
        title="Recap: Real Estate and Businesses"
        summary="Topics 10 and 11: the true cost of a home, rental income, and business structures."
      />

      <Section title="Topic 10: Real Estate (the $500,000 San Diego condo)" />
      <Table
        headers={['Idea', 'Rule or number']}
        rows={[
          ['When to buy', 'After the foundation: no bad debt, emergency fund, retirement accounts started'],
          ['The mortgage', '$400,000 at 6.5% for 30 years: $2,528 a month. Interest over 30 years $510,178'],
          ['All-in cost', '$3,724 a month: P&I $2,528, tax $479, insurance $58, HOA $450, upkeep $208'],
          ['Affordability', 'Housing at or below 28% of gross income. This condo needs about $150,000'],
          ['Amortization', 'Month 1: $2,167 interest and $362 principal. Principal beats interest around year 19'],
          ['PMI', 'Under 20% down: $238 a month at 5% down, ending near 80% of the original value'],
          ['Property tax', 'About 1.15% of assessed value. Prop 13 caps assessed growth at 2% a year'],
          ['Supplemental tax', 'One-time bill after you buy, about $1,380 with a November close. Plan the cash'],
          ['Value vs cost', 'After 10 years: value $740,122, equity $401,018. After 30 years: $1.62 million, loan zero'],
          ['Owning vs renting', 'Owning costs a bit more for about 12 years, then pulls ahead, if you stay'],
          ['Rental income', 'Needs about $3,975 of rent to break even. At $2,900 it loses $967 a month'],
        ]}
      />

      <Section title="Topic 11: Business Structures" />
      <Table
        headers={['Type', 'Rule']}
        rows={[
          ['Sole proprietor / IC', 'Simplest, no protection, taxed on your return plus about 14.1% SE tax'],
          ['LLC', 'Adds liability protection. California charges at least $800 a year'],
          ['S-corp election', 'Can save payroll tax once profit is steady (about $4,950 on $100,000 before extra costs)'],
          ['C-corp', 'Double taxation. For raising investor money'],
        ]}
      />

      <Callout type="success" title="The thread">
        A home is shelter first, investment second. Count every cost, stay long enough to win, and compare any investment
        property with a no-work index fund. Grow a business in steps: simple first, protection next, optimization last.
      </Callout>

      <QuizSet title="Quick check">
        <Quiz
          question="Which is the better number to compare homes?"
          options={['The mortgage payment', 'The all-in monthly cost', 'The price per square foot', 'The down payment']}
          correctIndex={1}
          explanation="Tax, insurance, HOA and upkeep add about 47% to the mortgage payment here."
        />
        <Quiz
          question="What is the supplemental tax bill?"
          options={['A late fee', 'A one-time prorated tax after the county reassesses at your price', 'The HOA fee', 'PMI']}
          correctIndex={1}
          explanation="It covers the rest of the fiscal year at the new value."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The condo costs $3,724 a month all-in and $115,000 or more to start.',
          'Prop 13 caps tax growth at 2%. Plan for the supplemental bill.',
          'Rental income often starts negative. House hacking is the gentle way in.',
          'Start as a sole proprietor, add an LLC, then consider the S-corp.',
        ]}
      />
    </div>
  );
}
