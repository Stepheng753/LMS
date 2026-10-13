import { useMemo, useState } from 'react';
import { CalcFrame, NumField, Stat, Stats, MathBlock, Note, GroupLabel } from './ui';
import { StackedBar } from './charts';
import { rentalCashFlow, RentalInput } from './lib/mortgage';
import { money, pct } from './lib/fmt';

const BASE: RentalInput & { price: number; cashInvested: number } = {
  rent: 2900,
  vacancyPct: 5,
  mortgagePI: 2528,
  propertyTax: 479,
  insurance: 120,
  hoa: 450,
  maintenancePct: 5,
  managementPct: 0,
  utilities: 0,
  price: 500000,
  cashInvested: 110000,
};

// Does rent cover the mortgage? What is left after every cost?
export const RentalCashFlow: React.FC = () => {
  const [x, setX] = useState(BASE);
  const set = (patch: Partial<typeof BASE>) => setX((v) => ({ ...v, ...patch }));
  const r = useMemo(() => rentalCashFlow(x), [x]);
  const coveredPct = x.mortgagePI + x.propertyTax + x.insurance + x.hoa > 0 ? (r.collected / (x.mortgagePI + x.propertyTax + x.insurance + x.hoa)) * 100 : 0;
  const capRate = (r.noi * 12) / Math.max(1, x.price) * 100;
  const coc = (r.cash * 12) / Math.max(1, x.cashInvested) * 100;

  return (
    <CalcFrame
      title="Rental income vs the mortgage"
      subtitle="Default: the $500k San Diego condo, rented out."
      presets={[
        { label: 'Whole condo rented', apply: () => setX(BASE) },
        { label: 'Rent a room (house-hacking)', apply: () => set({ rent: 1300, hoa: 450, maintenancePct: 3 }) },
        { label: 'Two empty months a year', apply: () => set({ vacancyPct: 17 }) },
        { label: 'Hire a property manager (8%)', apply: () => set({ managementPct: 8 }) },
        { label: 'Duplex: $5,600 rent', apply: () => set({ price: 900000, rent: 5600, mortgagePI: 4550, propertyTax: 860, insurance: 190, hoa: 0, maintenancePct: 6, cashInvested: 200000 }) },
      ]}
      inputs={
        <>
          <GroupLabel>Income</GroupLabel>
          <NumField label="Rent per month" value={x.rent} onChange={(n) => set({ rent: n })} prefix="$" min={0} step={50} slider max={10000} />
          <NumField label="Vacancy (empty months)" value={x.vacancyPct} onChange={(n) => set({ vacancyPct: n })} suffix="%" min={0} max={50} step={1} help="5% is about 2.5 weeks a year" />
          <GroupLabel>Costs per month</GroupLabel>
          <div className="grid grid-cols-2 gap-2">
            <NumField label="Mortgage (principal + interest)" value={x.mortgagePI} onChange={(n) => set({ mortgagePI: n })} prefix="$" min={0} step={50} />
            <NumField label="Property tax" value={x.propertyTax} onChange={(n) => set({ propertyTax: n })} prefix="$" min={0} step={10} />
            <NumField label="Insurance (landlord policy)" value={x.insurance} onChange={(n) => set({ insurance: n })} prefix="$" min={0} step={10} />
            <NumField label="HOA" value={x.hoa} onChange={(n) => set({ hoa: n })} prefix="$" min={0} step={25} />
            <NumField label="Repairs and upkeep" value={x.maintenancePct} onChange={(n) => set({ maintenancePct: n })} suffix="% of rent" min={0} max={30} step={1} />
            <NumField label="Property manager" value={x.managementPct} onChange={(n) => set({ managementPct: n })} suffix="% of rent" min={0} max={15} step={1} />
            <NumField label="Utilities you pay" value={x.utilities} onChange={(n) => set({ utilities: n })} prefix="$" min={0} step={25} />
          </div>
          <GroupLabel>For the returns</GroupLabel>
          <NumField label="Price of the property" value={x.price} onChange={(n) => set({ price: n })} prefix="$" min={0} step={10000} />
          <NumField label="Cash you put in (down payment + closing)" value={x.cashInvested} onChange={(n) => set({ cashInvested: n })} prefix="$" min={0} step={5000} />
        </>
      }
      results={
        <>
          <Stats>
            <Stat label="Cash flow per month" value={`${r.cash >= 0 ? '+' : ''}${money(r.cash)}`} tone={r.cash >= 0 ? 'good' : 'bad'} sub={r.cash >= 0 ? 'the tenant pays you to own it' : 'you top it up every month'} />
            <Stat label="Cash flow per year" value={money(r.cash * 12)} tone={r.cash >= 0 ? 'good' : 'bad'} />
            <Stat label="Rent covers the housing bill" value={pct(coveredPct, 0)} sub="mortgage + tax + insurance + HOA" />
            <Stat label="Cash-on-cash return" value={pct(coc)} sub="yearly cash flow / cash you put in" />
            <Stat label="Cap rate" value={pct(capRate)} sub="yearly NOI / price, ignores the loan" />
          </Stats>
          <MathBlock
            lines={[
              { label: 'Rent actually collected', formula: `${money(x.rent)} x (1 - ${x.vacancyPct}%)`, value: money(r.collected) },
              { label: 'Operating costs', formula: 'tax + insurance + HOA + repairs + manager + utilities', value: `-${money(r.expenses)}` },
              { label: 'Net operating income (NOI)', value: money(r.noi), strong: true },
              { label: 'Mortgage payment', value: `-${money(x.mortgagePI)}` },
              { label: 'Cash flow', value: money(r.cash), strong: true },
            ]}
          />
        </>
      }
      below={
        <>
          <StackedBar
            title="Where a month of rent goes"
            format={money}
            parts={[
              { label: 'Mortgage', value: x.mortgagePI, color: '#475569' },
              { label: 'Property tax', value: x.propertyTax, color: '#b45309' },
              { label: 'Insurance', value: x.insurance, color: '#6d28d9' },
              { label: 'HOA', value: x.hoa, color: '#2563eb' },
              { label: 'Repairs', value: r.maintenance, color: '#be185d' },
              { label: 'Manager + utilities', value: r.management + x.utilities, color: '#0f766e' },
              { label: 'Left for you', value: Math.max(0, r.cash), color: '#15803d' },
            ]}
          />
          <Note>Rental income is taxable, reduced by depreciation and expenses. Principal payments are not an expense but build equity, so true returns include that and appreciation. Being a landlord is a job: vacancies, repairs and tenants. This is a simplified monthly view.</Note>
        </>
      }
    />
  );
};
