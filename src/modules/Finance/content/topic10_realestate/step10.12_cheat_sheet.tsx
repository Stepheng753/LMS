import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz, FillInQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step10_12_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 10 • Cheat Sheet"
        title="Topic 10 Cheat Sheet and Quiz"
        summary="Real estate on one page, then a check."
      />

      <Section title="The $500,000 San Diego condo" />
      <Table
        headers={['Item', 'Number']}
        rows={[
          ['Price / down payment / loan', '$500,000 / $100,000 (20%) / $400,000'],
          ['Rate and term', '6.5%, 30 years'],
          ['Principal and interest', '$2,528 a month'],
          ['All-in monthly cost, year 1', '$3,724 (P&I $2,528, tax $479, insurance $58, HOA $450, upkeep $208)'],
          ['Cash to start', 'about $115,000 to $120,000'],
          ['Interest over 30 years', '$510,178'],
          ['Value after 10 years (4% a year)', '$740,122, with $401,018 equity'],
          ['Value after 30 years', '$1,621,699, loan paid off'],
          ['Rent to break even as a rental', 'about $3,975 a month'],
        ]}
      />

      <Section title="The rules" />
      <Table
        headers={['Rule', 'In one line']}
        rows={[
          ['When to buy', 'After the foundation: no bad debt, emergency fund, retirement accounts started'],
          ['Affordability', 'Housing (PITI + HOA) at or below 28% of gross income'],
          ['Down payment', '20% avoids PMI. Never drain the emergency fund for it'],
          ['Mortgage', 'Fixed rate. A 1-point change moves the payment about $260 a month'],
          ['Amortization', 'Early payments are mostly interest. Principal beats interest around year 19'],
          ['Property tax', 'About 1.15% of assessed value. Prop 13 caps the rise at 2% a year'],
          ['Supplemental tax', 'A one-time bill after you buy, prorated to June 30. Plan the cash'],
          ['Time horizon', 'Never buy a home you may sell within 2 to 3 years. Break-even vs rent is about year 12'],
          ['Rental', 'Rent minus vacancy, costs and mortgage is cash flow. It often starts negative'],
        ]}
      />

      <Callout type="success" title="The big idea">
        A home is a place to live first and an investment second. Count the all-in cost, plan the cash, stay long enough to
        win, and compare any investment property with a no-work index fund.
      </Callout>

      <QuizSet title="Topic 10 Quiz">
        <Quiz
          question="A $300,000 loan at 6% for 30 years has interest in month 1 of about:"
          options={['$150', '$1,500', '$15,000', '$18,000']}
          correctIndex={1}
          explanation="$300,000 × 6% ÷ 12 = $1,500."
        />
        <Quiz
          question="Under Prop 13, your assessed value can rise at most how much per year?"
          options={['0%', '2%', '5%', 'The market rate']}
          correctIndex={1}
          explanation="At most 2% a year until a sale resets it."
        />
        <Quiz
          question="What does PMI protect?"
          options={['The buyer', 'The lender', 'The HOA', 'The seller']}
          correctIndex={1}
          explanation="PMI protects the lender and is charged when you put down under 20%."
        />
        <MultiSelectQuiz
          question="Which are part of the all-in monthly cost of owning? (Pick all)"
          options={['Mortgage principal and interest', 'Property tax', 'HOA dues', 'Your income tax']}
          correctIndexes={[0, 1, 2]}
          explanation="Income tax is not a housing cost."
        />
        <FillInQuiz
          question="Cap rate = net operating income × 12 ÷ ___."
          answer="price"
          explanation="It measures the property's return, ignoring the loan."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'The $500,000 condo: $3,724 a month all-in, $115,000 to start, owning beats renting after about 12 years.',
          'Mortgage interest dominates early. Prop 13 caps tax growth at 2%.',
          'Rental income often starts negative. House hacking is the gentle way in.',
          'Buy after the foundation, and stay long enough to win.',
        ]}
      />
    </div>
  );
}
