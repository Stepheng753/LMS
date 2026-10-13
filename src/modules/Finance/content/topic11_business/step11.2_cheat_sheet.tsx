import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step11_2_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 11 • Cheat Sheet"
        title="Topic 11 Cheat Sheet and Quiz"
        summary="Business structures on one page, then a check."
      />

      <Section title="At a glance" />
      <Table
        headers={['Type', 'Liability', 'Tax', 'Use when']}
        rows={[
          ['Sole proprietor / IC', 'None', 'Personal return, SE tax about 14.1%', 'Starting out'],
          ['LLC', 'Limited', 'Same as a sole proprietor by default', 'Real clients and real risk'],
          ['S-corp (election)', 'Limited', 'Salary taxed for payroll, rest as distributions', 'Steady profit of about $60,000 to $80,000+'],
          ['C-corp', 'Limited', '21% federal (8.84% California), then dividends taxed again', 'Raising investor money'],
          ['Partnership', 'Unlimited, shared', 'Passes through', 'Usually use an LLC instead'],
        ]}
      />

      <Callout type="success" title="The big idea">
        Start simple, protect yourself as you grow, optimize tax once the numbers justify it. Never form a company just
        because it sounds impressive.
      </Callout>

      <QuizSet title="Topic 11 Quiz">
        <Quiz
          question="Which structure offers limited liability and is the most common first step?"
          options={['Sole proprietor', 'LLC', 'C-corp', 'General partnership']}
          correctIndex={1}
          explanation="An LLC is simple and protects personal assets."
        />
        <Quiz
          question="What is the minimum yearly California franchise tax for an LLC or corporation?"
          options={['$0', '$80', '$800', '$8,000']}
          correctIndex={2}
          explanation="California charges at least $800 a year."
        />
        <MultiSelectQuiz
          question="Which are true of an S-corp? (Pick all)"
          options={['It is a tax election, not a separate entity type', 'It requires a reasonable salary', 'It can save payroll tax on distributions', 'It avoids all taxes']}
          correctIndexes={[0, 1, 2]}
          explanation="An S-corp does not avoid tax."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Sole proprietor, LLC, S-corp election, C-corp: protection and tax rise with complexity.',
          'California charges at least $800 a year to LLCs and corporations.',
          'Use the S-corp when the payroll savings beat the extra cost.',
        ]}
      />
    </div>
  );
}
