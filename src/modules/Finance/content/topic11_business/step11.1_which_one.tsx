import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step11_1_WhichOne() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 11 • Business Structures"
        title="Which One Should You Use?"
        summary="Start simple, add protection as you grow, and add the S-corp only when the savings beat the cost."
      />

      <Section title="The path most people follow" />
      <Table
        headers={['Stage', 'Typical income', 'Structure', 'Why']}
        rows={[
          [<strong key="a">1. Testing an idea</strong>, 'Under $10,000 a year', 'Sole proprietor (independent contractor)', 'No cost. Learn if people will pay. Keep records and set aside taxes (Topic 4)'],
          [<strong key="b">2. Real clients and real risk</strong>, 'A few thousand dollars a month', 'Single-member LLC', 'Liability protection for about $800 a year in California. Open a business bank account'],
          [<strong key="c">3. Steady profit</strong>, 'Above about $60,000 to $80,000 profit', 'LLC taxed as an S-corp', 'Payroll tax savings can beat the extra cost'],
          [<strong key="d">4. Raising money or planning to sell</strong>, 'Varies', 'C-corp', 'Investors usually require it'],
        ]}
      />

      <Section title="The S-corp savings, in dollars" />
      <p>
        Suppose your business profit is <strong>$100,000</strong>. As a sole proprietor you pay self-employment tax on the
        whole profit. As an S-corp you pay yourself a <em>reasonable salary</em> (say $60,000) and take the other $40,000 as a
        distribution, which has no self-employment tax.
      </p>
      <Table
        headers={['', 'Sole proprietor / LLC', 'S-corp (salary $60,000)']}
        align={['left', 'right', 'right']}
        rows={[
          ['Profit', '$100,000', '$100,000'],
          ['Payroll or self-employment tax', '$14,130 (14.1% of profit)', '$9,180 (15.3% of the $60,000 salary)'],
          ['Saving', '—', '$4,950'],
          ['Extra costs: payroll service, second tax return, accountant', '$0', 'about $1,500 to $3,000 a year'],
          [<strong key="a">Net saving</strong>, '—', <strong key="b">about $2,000 to $3,500</strong>],
        ]}
      />
      <Callout type="warning" title="Two conditions">
        The IRS requires a <strong>reasonable salary</strong> for the work you do, so you cannot pay yourself $10,000 and take the rest as
        distributions. And the savings must exceed the extra cost. With a profit of $40,000 the savings shrink to a few hundred
        dollars, so the S-corp is not worth it yet. This is a decision to make with an accountant.
      </Callout>

      <Section title="A starter checklist" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Open a separate business checking account on day one, even as a sole proprietor.</li>
        <li>Track income and expenses in a simple spreadsheet (Toolbox).</li>
        <li>Set aside 25% to 30% of every payment for taxes (Topic 4).</li>
        <li>Check your city and county for a business license, and whether your work needs a permit.</li>
        <li>Buy liability insurance appropriate to your work (Topic 6).</li>
        <li>Form an LLC when clients, money or risk grow. Talk to an accountant about the S-corp election once profit is steady.</li>
        <li>Use a SEP-IRA or solo 401k for retirement (Topic 4 and 7).</li>
      </ul>

      <QuizSet title="Check yourself">
        <Quiz
          question="A freelancer is just starting and earning a few thousand dollars a year. The simplest sensible structure is:"
          options={['C-corp', 'Sole proprietor', 'S-corp', 'Partnership with a stranger']}
          correctIndex={1}
          explanation="Start simple and inexpensive. Add protection as risk and income grow."
        />
        <Quiz
          question="Why does the S-corp save payroll tax?"
          options={['Salary and distributions are taxed differently, and only the salary pays payroll tax', 'It lowers income tax to zero', 'It avoids all tax', 'The IRS gives a flat discount']}
          correctIndex={0}
          explanation="Distributions above a reasonable salary avoid self-employment tax."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Stages: sole proprietor, then LLC when risk or income grow, then S-corp when profit is steady, C-corp for investors.',
          'S-corp saving on $100,000 profit with a $60,000 salary: about $4,950 before $1,500 to $3,000 of extra costs.',
          'A reasonable salary is required, and the savings must beat the cost.',
          'Keep money separate, track everything, set aside taxes, and get advice as you grow.',
        ]}
      />
    </div>
  );
}
