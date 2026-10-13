import { StepHeader } from '../../../components/content/StepHeader';
import { Section } from '../../../components/content/Section';
import { Callout } from '../../../components/content/Callout';
import { Quiz } from '../../../components/content/Quiz';
import { KeyTakeaways } from '../../../components/content/KeyTakeaways';

export default function Step1_1_FinancialStatements() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.1 • Corporate Finance"
        title="The Three Financial Statements"
        summary="Deconstruct the Balance Sheet, Income Statement, and Cash Flow Statement, and understand how they interconnect."
      />

      <p>
        Financial statements provide a standardized window into the health, operational efficiency, and solvency of a business.
        Every financial analyst or investor relies on these core reports.
      </p>

      <Section title="1. The Core Equation: The Balance Sheet" />
      <div className="p-4 rounded-lg border border-border bg-card my-2">
        <div className="text-center font-mono font-bold text-primary text-base sm:text-lg">
          Assets = Liabilities + Shareholders' Equity
        </div>
        <p className="text-muted-foreground text-xs mt-2 text-center">
          A snapshot in time showing what a company owns (assets) versus what it owes (liabilities and equity).
        </p>
      </div>

      <Section title="2. Statement Comparative Overview" />
      <div className="space-y-3 text-sm">
        <div className="p-3.5 rounded-lg border border-border bg-background">
          <span className="font-semibold text-foreground">Income Statement (P&L):</span>
          <p className="text-muted-foreground text-xs mt-0.5">
            Measures economic profitability over a specific period (e.g. Quarter or Year).
            Calculates: <code>Revenue - Expenses = Net Income</code>.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-background">
          <span className="font-semibold text-foreground">Cash Flow Statement:</span>
          <p className="text-muted-foreground text-xs mt-0.5">
            Tracks actual physical cash entering and leaving the business, categorised into
            Operating Activities (CFO), Investing Activities (CFI), and Financing Activities (CFF).
          </p>
        </div>
      </div>

      <Callout type="tip" title="Accounting Note">
        Net Income on the Income Statement flows directly into Retained Earnings on the Balance Sheet, and serves as the starting point for Cash Flow from Operations.
      </Callout>

      <Quiz
        question="Which financial statement represents a snapshot of financial position at a single specific point in time?"
        options={['Income Statement', 'Cash Flow Statement', 'Balance Sheet', 'Statement of Comprehensive Income']}
        correctIndex={2}
        explanation="The Balance Sheet represents a snapshot at a specific calendar date, whereas the Income and Cash Flow statements measure activity over a period of time."
      />

      <KeyTakeaways
        items={[
          'The fundamental accounting equation dictates that Assets must always balance Liabilities plus Equity.',
          'Revenue recognition on the Income Statement does not always equate to immediate cash collection.',
          'The Cash Flow Statement reconciles net accounting profit with cash reality.',
        ]}
      />
    </div>
  );
}
