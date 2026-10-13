import { StepHeader } from '../../../components/content/StepHeader';
import { Section } from '../../../components/content/Section';
import { Callout } from '../../../components/content/Callout';
import { Quiz } from '../../../components/content/Quiz';
import { Formula } from '../../../components/content/Formula';
import { Chart } from '../../../components/content/Chart';
import { Table } from '../../../components/content/Table';
import { Exercise } from '../../../components/content/Exercise';
import { KeyTakeaways } from '../../../components/content/KeyTakeaways';

export default function Step1_2_ValuationBasics() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.2 • Corporate Valuation"
        title="Valuation Methodologies"
        summary="Understand how analysts determine the intrinsic and market value of enterprises and securities."
      />

      <p>
        Valuation is both an art and a science. It answers the fundamental question:
        <em>"What is a given asset or company truly worth today?"</em>
      </p>

      <Section title="1. Intrinsic vs Relative Valuation" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 text-sm">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-primary mb-1">Discounted Cash Flow (DCF)</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Intrinsic approach: Forecasts future free cash flows and discounts them back to the present value using the Weighted Average Cost of Capital (WACC).
          </p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-primary mb-1">Trading Multiples (Comps)</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Relative approach: Compares the company against peer valuations using standardized multiples such as EV/EBITDA or Price/Earnings (P/E).
          </p>
        </div>
      </div>

      <Section title="2. Enterprise Value vs Equity Value" />
      <Formula
        label="Enterprise Value"
        where={[
          { symbol: 'EV', meaning: 'Value of the whole business operations' },
          { symbol: 'Equity Value', meaning: 'Market capitalisation' },
        ]}
      >
        EV = Equity Value + Total Debt − Cash
      </Formula>

      <Exercise
        kind="example"
        title="Compute Enterprise Value"
        solution={
          <p>
            EV = 800 + 200 − 50 = <strong>$950M</strong>
          </p>
        }
      >
        <p>A company has an equity value of $800M, $200M of debt and $50M of cash. What is its enterprise value?</p>
      </Exercise>

      <Chart
        title="EV / EBITDA by peer"
        subtitle="Trading multiples, last twelve months"
        data={[
          { label: 'Alpha', value: 9.2 },
          { label: 'Beta', value: 11.5 },
          { label: 'Gamma', value: 8.1 },
          { label: 'Delta', value: 13.4 },
        ]}
        format={(v) => `${v.toFixed(1)}x`}
      />

      <Chart
        type="line"
        title="Free cash flow forecast"
        subtitle="$ millions"
        data={[
          { label: 'Y1', value: 40 },
          { label: 'Y2', value: 52 },
          { label: 'Y3', value: 63 },
          { label: 'Y4', value: 71 },
          { label: 'Y5', value: 80 },
        ]}
        format={(v) => `$${v}M`}
      />

      <Table
        caption="Valuation approaches compared"
        headers={['Method', 'Type', 'Best for']}
        rows={[
          ['DCF', 'Intrinsic', 'Stable, forecastable cash flows'],
          ['Trading comps', 'Relative', 'Quick market sanity check'],
        ]}
      />

      <Callout type="info" title="Terminal Value Impact">
        In most DCF models, the Terminal Value accounts for 60% to 80% of total estimated enterprise value, making long-term growth rate assumptions critical.
      </Callout>

      <Quiz
        question="Which valuation metric measures the value of a firm's core operations regardless of its capital structure?"
        options={['Market Capitalization', 'Enterprise Value', 'Book Value', 'Net Asset Value']}
        correctIndex={1}
        explanation="Enterprise Value measures total operational value attributable to both debt and equity holders."
      />

      <KeyTakeaways
        items={[
          'DCF valuation relies on intrinsic cash-generating capability and discount rates.',
          'Comparable multiples provide market-based relative sanity checks.',
          'Enterprise Value represents operational value; Equity Value represents shareholder value.',
        ]}
      />
    </div>
  );
}
