import { StepHeader } from '../../../../components/content/StepHeader';
import { Callout } from '../../../../components/content/Callout';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_13_ExamB() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Exam B"
        title="Checkpoint Exam B: Topics 7 to 11"
        summary="Twelve questions on investing, compounding, retirement, real estate and businesses."
      />
      <Callout type="tip" title="How to take it">
        Cover the notes and answer from memory. Under 8 of 12 means reread the topics named in the explanations, then
        retake it tomorrow.
      </Callout>
      <QuizSet title="Checkpoint Exam B: Topics 7 to 11">
        <Quiz
          question="Employer matches 100% of the first 4%. You earn $100,000 and contribute 4%. Free money received:"
          options={["$0", "$400", "$4,000", "$8,000"]}
          correctIndex={2}
          explanation="4% of $100,000 is $4,000."
        />
        <Quiz
          question="Tax rate 24% now and 12% in retirement. Which wins?"
          options={["Roth", "Traditional", "Tie", "Neither"]}
          correctIndex={1}
          explanation="You pay tax at the lower rate with traditional."
        />
        <Quiz
          question="After the match, debt and the emergency fund, where does the next dollar go?"
          options={["The 401k", "The Roth IRA", "The brokerage", "The HSA"]}
          correctIndex={1}
          explanation="Step 3 is the Roth IRA."
        />
        <Quiz
          question="What reduces future value to purchasing power?"
          options={["Taxes", "Inflation", "Fees", "Dividends"]}
          correctIndex={1}
          explanation="Divide by (1 + inflation)^years."
        />
        <Quiz
          question="About how long does money take to double at 9%?"
          options={["6 years", "8 years", "12 years", "18 years"]}
          correctIndex={1}
          explanation="72 \u00f7 9 = 8."
        />
        <Quiz
          question="$500 a month at 10.5% from age 25 to 65 becomes about:"
          options={["$240,000", "$1,000,000", "$3,043,509", "$30,000,000"]}
          correctIndex={2}
          explanation="Deposits of $240,000 grow to about $3.04 million."
        />
        <Quiz
          question="You spend $60,000 a year. At 4%, what pile do you need?"
          options={["$600,000", "$1,500,000", "$2,400,000", "$6,000,000"]}
          correctIndex={1}
          explanation="$60,000 \u00f7 0.04 = $1,500,000."
        />
        <Quiz
          question="With a 4% withdrawal that rises 3% a year, what return keeps buying power flat?"
          options={["3%", "4%", "7%", "10%"]}
          correctIndex={2}
          explanation="Withdrawal plus inflation: 4% + 3%."
        />
        <Quiz
          question="What is sequence risk?"
          options={["A fee", "Bad returns early in retirement that do lasting damage", "A type of bond", "A tax"]}
          correctIndex={1}
          explanation="Selling in an early crash leaves fewer shares to recover."
        />
        <Quiz
          question="A $400,000 loan at 6.5% for 30 years has a monthly payment of about:"
          options={["$1,500", "$2,528", "$4,000", "$6,500"]}
          correctIndex={1}
          explanation="$2,528.27."
        />
        <Quiz
          question="Under Prop 13, your assessed value can rise at most how much per year?"
          options={["0%", "2%", "5%", "The market rate"]}
          correctIndex={1}
          explanation="At most 2% until a sale."
        />
        <Quiz
          question="Which structure gives limited liability and is the most common first business step?"
          options={["Sole proprietor", "LLC", "C-corp", "General partnership"]}
          correctIndex={1}
          explanation="An LLC protects personal assets at modest cost."
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
