import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { QuizSet, Quiz, MultiSelectQuiz } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step6_7_CheatSheet() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Cheat Sheet"
        title="Topic 6 Cheat Sheet and Quiz"
        summary="Insurance on one page, then a check."
      />

      <Section title="The rules" />
      <Table
        headers={['Policy', 'The playbook rule']}
        rows={[
          [<strong key="a">Health</strong>, 'Compare total yearly cost at several levels of care. Healthy people usually win with an HDHP + HSA'],
          [<strong key="b">Auto</strong>, 'Liability 100/300/100 or more. Keep uninsured motorist. Drop collision on an old car'],
          [<strong key="c">Renters / home</strong>, 'Renters is $10 to $25 a month. Replacement cost. HO-6 for a condo. Decide on earthquake'],
          [<strong key="d">Term life</strong>, 'Only if someone depends on you. 10 to 12 times income. 20 to 30 year term. No whole life'],
          [<strong key="e">Disability</strong>, 'Replace 50% to 70% of income. Take the work plan. Price individual if self-employed'],
          [<strong key="f">Umbrella</strong>, '$1 million for about $150 to $300 a year once you own assets'],
          [<strong key="g">Skip</strong>, 'Extended warranties, credit life, cancer-only, child life, whole life'],
        ]}
      />

      <Section title="The annual insurance review" />
      <ul className="list-disc pl-5 space-y-1">
        <li>During open enrollment: compare the health plans at several levels of care.</li>
        <li>Once a year: get two or three quotes for auto and renters or home.</li>
        <li>After any life event (marriage, baby, home, job change): re-check life, disability and beneficiaries.</li>
        <li>Check that the emergency fund covers your highest deductible.</li>
      </ul>

      <Callout type="success" title="The big idea">
        Insure what you cannot afford to lose, and nothing else. A few cheap policies protect a lifetime of saving.
      </Callout>

      <QuizSet title="Topic 6 Quiz">
        <Quiz
          question="Deductible $1,000, coinsurance 20%, out-of-pocket maximum $4,000. A $6,000 bill. What do you pay?"
          options={['$1,000', '$2,000', '$4,000', '$6,000']}
          correctIndex={1}
          explanation="$1,000 + 20% of $5,000 ($1,000) = $2,000."
        />
        <Quiz
          question="Which auto coverage protects your savings from a lawsuit?"
          options={['Collision', 'Comprehensive', 'Liability', 'Roadside']}
          correctIndex={2}
          explanation="Liability pays for what you owe others after a crash you cause."
        />
        <Quiz
          question="Why is term life better than whole life for most people?"
          options={['It pays more', 'It is far cheaper for the coverage, and you invest the difference', 'It never ends', 'It is required']}
          correctIndex={1}
          explanation="Term gives the same protection for a fraction of the cost."
        />
        <MultiSelectQuiz
          question="Which of these are usually worth skipping? (Pick all)"
          options={['Extended warranty on a phone', 'Renters insurance', 'Life insurance on a child', 'Cancer-only policy']}
          correctIndexes={[0, 2, 3]}
          explanation="Renters insurance is cheap and valuable."
        />
        <Quiz
          question="Does standard home insurance in California cover earthquakes?"
          options={['Yes', 'No', 'Only in new homes', 'Only above $500,000']}
          correctIndex={1}
          explanation="Earthquake needs a separate policy."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Insure what you cannot afford to lose. Self-insure the rest.',
          'Health, auto liability, renters or home, term life, disability, umbrella.',
          'Skip warranties, credit life, cancer-only, child life and whole life.',
          'Review once a year and after every life event.',
        ]}
      />
    </div>
  );
}
