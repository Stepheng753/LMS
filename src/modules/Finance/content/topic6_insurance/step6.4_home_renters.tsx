import { StepHeader } from '../../../../components/content/StepHeader';
import { Section } from '../../../../components/content/Section';
import { Callout } from '../../../../components/content/Callout';
import { Table } from '../../../../components/content/Table';
import { Exercise } from '../../../../components/content/Exercise';
import { Quiz, QuizSet } from '../../../../components/content/Quiz';
import { KeyTakeaways } from '../../../../components/content/KeyTakeaways';

export default function Step6_4_HomeRenters() {
  return (
    <div>
      <StepHeader
        eyebrow="Topic 6 • Insurance"
        title="Renters, Condo and Homeowners Insurance"
        summary="Cheap protection for your stuff, your place, and your liability. And the big thing California policies leave out."
      />

      <Section title="Renters insurance: the best deal in insurance" />
      <p>
        Your landlord insures the building, not your belongings. Renters insurance covers your things, your liability
        and a place to stay if you cannot live there. It usually costs about <strong>$10 to $25 a month</strong>.
      </p>
      <Table
        headers={['Part of the policy', 'Covers']}
        rows={[
          [<strong key="a">Personal property</strong>, 'Your belongings after fire, theft, water damage from a burst pipe'],
          [<strong key="b">Liability</strong>, 'A guest is hurt in your home, or you accidentally damage someone else’s property'],
          [<strong key="c">Loss of use</strong>, 'A hotel and extra food costs while your home is being repaired'],
          [<strong key="d">Medical payments to others</strong>, 'Small medical costs for a guest who is injured'],
        ]}
      />
      <Callout type="tip" title="Pick replacement cost">
        <strong>Replacement cost</strong> pays what it costs to buy a new version of an item. <strong>Actual cash value</strong>
        pays only what it was worth after years of use, which is far less. Replacement cost adds a little to the premium and
        is almost always worth it.
      </Callout>

      <Section title="The kinds of home policy" />
      <Table
        headers={['Policy', 'For', 'Covers']}
        rows={[
          [<strong key="a">HO-3</strong>, 'A single-family house you own', 'The building, your things, liability, living costs'],
          [<strong key="b">HO-6</strong>, 'A condo you own', 'Inside the walls, your things, liability. The HOA insures the outside of the building'],
          [<strong key="c">HO-4</strong>, 'Renters', 'Your things, liability, living costs'],
          [<strong key="d">Landlord (DP-3)</strong>, 'A property you rent out', 'The building and liability, not the tenant’s things'],
        ]}
      />
      <p>
        For the $500,000 San Diego condo in Topic 10, an HO-6 policy is a few hundred dollars a year. The HOA&apos;s master
        policy covers the building structure, so read what the HOA covers and what you must cover.
      </p>

      <Section title="What is NOT covered, and matters in California" />
      <Table
        headers={['Risk', 'Covered by a standard policy?', 'What to do']}
        rows={[
          [<strong key="a">Earthquake</strong>, 'No', 'Earthquake insurance from the California Earthquake Authority is a separate, costly policy with high deductibles. Many people go without. Decide on purpose'],
          [<strong key="b">Flood</strong>, 'No', 'Separate flood insurance (federal NFIP or private). Required in flood zones with a mortgage'],
          [<strong key="c">Wildfire</strong>, 'Usually yes, but fewer insurers will write policies in high-risk areas', 'Shop early. The California FAIR Plan is a last-resort option'],
          [<strong key="d">Sewer backup, mold</strong>, 'Often limited', 'Ask about endorsements'],
          [<strong key="e">High-value items</strong>, 'Limits on jewelry, art, electronics', 'Add a rider for specific items'],
        ]}
      />

      <Section title="Ways to keep it affordable" />
      <ul className="list-disc pl-5 space-y-1">
        <li>Choose a higher deductible, and keep the difference in your emergency fund.</li>
        <li>Bundle with auto insurance.</li>
        <li>Keep a simple home inventory (photos of rooms and valuables) to speed up any claim.</li>
        <li>Shop every year or two, but check the coverage, not just the price.</li>
      </ul>

      <Exercise
        title="Count your stuff"
        solution={
          <ul className="list-disc pl-5 space-y-1">
            <li>A rough total of what it would cost to replace everything you own, room by room.</li>
            <li>A coverage limit above that total, on a replacement-cost policy.</li>
            <li>Liability of at least $100,000, with an umbrella later (step 6.6).</li>
            <li>Photos of each room saved in the cloud.</li>
          </ul>
        }
      >
        <p>Walk through your home and estimate what it would cost to replace everything: clothes, furniture, electronics, kitchen. Most people are surprised at $30,000 to $50,000 or more. Does your coverage limit reach that?</p>
      </Exercise>

      <QuizSet title="Check yourself">
        <Quiz
          question="You own a condo. Which policy do you need?"
          options={['HO-3', 'HO-4', 'HO-6', 'No policy']}
          correctIndex={2}
          explanation="An HO-6 covers the inside of the condo. The HOA covers the outside of the building."
        />
        <Quiz
          question="Does a standard homeowners policy cover earthquake damage in California?"
          options={['Yes', 'No: it needs a separate policy', 'Only for condos', 'Only for new homes']}
          correctIndex={1}
          explanation="Earthquake and flood are standard exclusions."
        />
      </QuizSet>

      <KeyTakeaways
        items={[
          'Renters insurance is about $10 to $25 a month and covers your things and your liability.',
          'Choose replacement cost, not actual cash value.',
          'HO-3 for a house, HO-6 for a condo, HO-4 for renters.',
          'Earthquake and flood are not covered by standard policies. Decide on purpose.',
        ]}
      />
    </div>
  );
}
