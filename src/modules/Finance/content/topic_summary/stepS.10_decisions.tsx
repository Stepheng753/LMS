import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Table } from '../../../../components/content/Table';
import { Callout } from '../../../../components/content/Callout';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function StepS_10_Decisions() {
  return (
    <div>
      <StepHeader
        eyebrow="Summary • Decisions"
        title="Decision Guides"
        summary="Short answers to the choices you will meet again and again: where the next dollar goes, which account, which plan, whether to buy."
      />

      <Callout type="info" title="Defaults, not laws">
        Each table gives the playbook default. Deviate only for a reason you can write down.
      </Callout>

      <Section title="Where does the next dollar go?" />
      <Table
        headers={['Your situation', 'Next dollar goes to']}
        rows={[
          ['Employer match not yet captured', 'The 401k, up to the full match'],
          ['Bad debt (cards, car, loans)', 'The snowball, smallest balance first'],
          ['Less than 3 to 6 months saved', 'The emergency fund'],
          ['Roth IRA under $7,500', 'The Roth IRA'],
          ['401k under $24,500', 'The 401k (Roth if offered)'],
          ['HSA available and not full', 'The HSA, then FSA for known costs'],
          ['All of the above full', 'A taxable brokerage account in the S&P 500 fund'],
        ]}
      />

      <Section title="Roth or traditional?" />
      <Table
        headers={['Situation', 'Choose']}
        rows={[
          ['Default', 'Roth'],
          ['Early career, low bracket', 'Roth'],
          ['Peak income in the 32%+ bracket, much lower income expected later', 'Traditional, at least in part'],
          ['Over the Roth IRA income limit', 'Backdoor Roth, or Roth 401k'],
          ['Need a bigger paycheck to avoid debt', 'Take the match first, then Roth when you can'],
          ['Unsure', 'Split 50/50'],
        ]}
      />

      <Section title="Which health plan?" />
      <Table
        headers={['Situation', 'Choose']}
        rows={[
          ['Healthy, few doctor visits, emergency fund in place', 'HDHP with an HSA'],
          ['Regular care, a planned procedure or a baby', 'Run the break-even. A low-deductible PPO often wins'],
          ['No emergency fund yet', 'A lower-deductible plan until the fund is built'],
        ]}
      />

      <Section title="Should I buy a home yet?" />
      <Table
        headers={['Check', 'Yes if']}
        rows={[
          ['Foundation', 'No bad debt, emergency fund full, retirement accounts started'],
          ['Time', 'You will stay at least 5 to 7 years (break-even vs renting is about 12)'],
          ['Payment', 'All-in housing is 28% of gross income or less'],
          ['Cash', 'Down payment, closing costs, supplemental tax and a repair reserve, without draining the emergency fund'],
          ['Rate', 'You can afford the payment at a 7% rate too'],
        ]}
      />

      <Section title="Business structure" />
      <Table
        headers={['Stage', 'Choose']}
        rows={[
          ['Testing an idea', 'Sole proprietor, separate bank account'],
          ['Real clients and risk', 'Single-member LLC ($800 a year in California)'],
          ['Steady profit above about $60,000 to $80,000', 'S-corp election, with an accountant'],
          ['Raising investor money', 'C-corp'],
        ]}
      />

      <KeyTakeaways
        items={[
          'The next dollar goes to the first unfilled step on the ladder.',
          'Roth by default. Traditional only at a high bracket now and a much lower one later.',
          'Buy a home only after the foundation, for the long term, at a payment that leaves room to invest.',
        ]}
      />
    </div>
  );
}
