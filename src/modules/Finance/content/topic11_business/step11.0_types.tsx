import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step11_0_Types() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 11 • Business Structures"
        title="Business Types: IC, Sole Proprietor, LLC, S-Corp, C-Corp"
        summary="A short, simple map. A business structure answers two questions: who is liable if something goes wrong, and how is the profit taxed."
      />

      <Callout type="info" title="Keep it light">
        This is a short introduction, not legal or tax advice. When your variable income (Topic 2) grows into a real
        business, a few hundred dollars for a lawyer or accountant is well spent. For now, learn the names and the one-line
        difference.
      </Callout>

      <Section title="The two questions" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Liability:</strong> if the business is sued or owes money, can they come after your personal savings and home?</li>
        <li><strong>Tax:</strong> is the profit taxed on your personal return only, or also at a company level?</li>
      </ul>

      <Section title="The five names" />
      <Table
        headers={['Type', 'What it is', 'Personal liability', 'How profit is taxed', 'Cost and paperwork']}
        rows={[
          [<strong key="a">Independent contractor (IC) / sole proprietor</strong>, 'You, working for yourself. No filing needed to begin. IC is how the client treats you (1099), sole proprietor is the legal form', 'Unlimited: your personal assets are exposed', 'On your personal return (Schedule C), plus self-employment tax of about 14.1%', 'Lowest. Maybe a local business license and a DBA name'],
          [<strong key="b">LLC (limited liability company)</strong>, 'A legal wrapper you file with the state. One owner or many', 'Limited: the business is separate, with caveats', 'By default the same as a sole proprietor (or a partnership if more owners)', 'State filing fee. California charges a minimum $800 a year, plus a fee on larger revenue'],
          [<strong key="c">S corporation (S-corp)</strong>, 'Not a separate entity type: a tax election an LLC or corporation can make', 'Limited (if run as an LLC or corporation)', 'Profit passes to your return. You pay yourself a salary (taxed for payroll) and take the rest as distributions without self-employment tax', 'Payroll, an extra tax return and rules. California 1.5% tax with an $800 minimum'],
          [<strong key="d">C corporation (C-corp)</strong>, 'A true separate company with shareholders', 'Limited', 'Taxed at 21% federal (8.84% California) on profit. Then dividends are taxed again on your return: double taxation', 'Highest: bylaws, board, minutes, two tax returns'],
          [<strong key="e">Partnership</strong>, 'Two or more people in business together without forming a company', 'Unlimited, and you are liable for your partner too', 'Passes through to each partner', 'Low, but risky. An LLC is usually safer'],
        ]}
      />

      <Section title="One-line summaries" />
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Sole proprietor / IC:</strong> simplest, cheapest, no protection.</li>
        <li><strong>LLC:</strong> adds liability protection for a modest cost. The most common first step.</li>
        <li><strong>S-corp:</strong> can lower payroll tax once profit is steady and high enough.</li>
        <li><strong>C-corp:</strong> for raising investor money or building a company to sell. Rarely right for a small side business.</li>
      </ul>

      <Callout type="warning" title="An LLC is not magic">
        An LLC protects you from business debts and many lawsuits, but not from your own mistakes, personal guarantees on loans, or
        mixing personal and business money. Keep a separate bank account and records. Insurance (Topic 6) still matters.
      </Callout>

      <QuizSet title="Check yourself">
        <Quiz
          question="Which structure gives limited liability with the simplest taxes?"
          options={['Sole proprietor', 'LLC with the default tax treatment', 'C-corp', 'Partnership']}
          correctIndex={1}
          explanation="An LLC protects personal assets while profit is still taxed on your personal return."
        />
        <Quiz
          question="What is double taxation?"
          options={['Paying sales tax twice', 'A C-corp pays tax on profit, and shareholders pay tax again on dividends', 'Paying federal and state tax', 'Paying tax on both income and savings']}
          correctIndex={1}
          explanation="That is why small businesses rarely choose a C-corp."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'A structure decides liability and tax. IC/sole proprietor: simplest, no protection. LLC: adds protection.',
          'An S-corp is a tax election, useful once profit is steady. A C-corp is for raising money, with double taxation.',
          'California charges at least $800 a year to LLCs and corporations.',
          'Keep business money separate, and get advice as the business grows.',
        ]}
      />
    </div>
  );
}
