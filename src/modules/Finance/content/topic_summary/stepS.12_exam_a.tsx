import { StepHeader } from '../../../../components/content/StepHeader';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_12_ExamA() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Exam A"
        title="Checkpoint Exam A: Topics 1 to 6"
        summary="Twelve questions on debt, income, cards, taxes, your paycheck and insurance."
      />
      <Callout type="tip" title="How to take it">
        Cover the notes and answer from memory. Under 8 of 12 means reread the topics named in the explanations, then
        retake it tomorrow.
      </Callout>
      <QuizSet title="Checkpoint Exam A: Topics 1 to 6">
        <Quiz
          question="$3,000 at 18% APR. About how much interest is charged in the first month?"
          options={["$18", "$45", "$54", "$540"]}
          correctIndex={1}
          explanation="$3,000 \u00d7 18% \u00f7 12 = $45."
        />
        <Quiz
          question="In the snowball method, which debt gets the extra money first?"
          options={["Highest rate", "Smallest balance", "Newest debt", "Biggest balance"]}
          correctIndex={1}
          explanation="Smallest balance first, for quick wins."
        />
        <Quiz
          question="Fixed income is $5,000 and fixed expenses are $3,800. What share of fixed income is that?"
          options={["38%", "50%", "76%", "100%"]}
          correctIndex={2}
          explanation="$3,800 \u00f7 $5,000 = 76%, above the comfortable 50%."
        />
        <Quiz
          question="On a W-2, who pays the employer share of Social Security and Medicare?"
          options={["You", "The employer", "Nobody", "The IRS"]}
          correctIndex={1}
          explanation="The employer matches the 7.65% you pay."
        />
        <Quiz
          question="What should credit card autopay be set to?"
          options={["The minimum", "The statement balance", "The current balance", "Off"]}
          correctIndex={1}
          explanation="The full statement balance costs $0 in interest."
        />
        <Quiz
          question="About how much is 1 reward point worth?"
          options={["1 dollar", "1 cent", "10 cents", "0.1 cent"]}
          correctIndex={1}
          explanation="The rule of thumb is 1 cent."
        />
        <Quiz
          question="A single filer has $83,900 of federal taxable income in 2026. The marginal rate is:"
          options={["12%", "22%", "24%", "32%"]}
          correctIndex={1}
          explanation="$83,900 is in the 22% bucket ($50,400 to $105,700)."
        />
        <Quiz
          question="Which saves more: a $1,000 deduction at 22%, or a $300 credit?"
          options={["The deduction ($220)", "The credit ($300)", "Equal", "Neither"]}
          correctIndex={1}
          explanation="A credit reduces tax dollar for dollar."
        />
        <Quiz
          question="Which of these lowers your Social Security tax?"
          options={["Traditional 401k", "Roth 401k", "Health insurance premiums", "A bonus"]}
          correctIndex={2}
          explanation="Premiums, HSA and FSA lower FICA wages. A 401k does not."
        />
        <Quiz
          question="In the $100,000 California example, net pay per biweekly paycheck with a maxed Roth 401k is about:"
          options={["$1,760", "$2,700", "$3,846", "$900"]}
          correctIndex={0}
          explanation="$1,759.64."
        />
        <Quiz
          question="Deductible $1,000, 20% coinsurance, out-of-pocket maximum $4,000. A $6,000 bill costs you:"
          options={["$1,000", "$2,000", "$4,000", "$6,000"]}
          correctIndex={1}
          explanation="$1,000 + 20% of $5,000 = $2,000."
        />
        <Quiz
          question="Which auto coverage protects your savings from a lawsuit after a crash you cause?"
          options={["Collision", "Comprehensive", "Liability", "Roadside"]}
          correctIndex={2}
          explanation="Liability pays for injuries and damage you cause to others."
        />
      </QuizSet>
      <KeyTakeaways
        items={[
          'A wrong answer is a map to the topic you should reread.',
          'Retake it after a day: spaced repetition makes it stick.',
        ]}
      />
    </div>
  );
}
