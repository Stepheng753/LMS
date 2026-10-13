import { StepHeader } from '../../../components/content/StepHeader';
import { Section } from '../../../components/content/Section';
import { Callout } from '../../../components/content/Callout';
import { Quiz } from '../../../components/content/Quiz';
import { KeyTakeaways } from '../../../components/content/KeyTakeaways';

export default function Step1_0_IntroMarkets() {
  return (
    <div>
      <StepHeader
        eyebrow="Step 1.0 • Capital Markets Fundamentals"
        title="Introduction to Financial Markets"
        summary="An overview of global market structures, primary vs secondary markets, and the fundamental asset classes."
      />

      <p>
        Financial markets facilitate the allocation of capital from savers and investors to institutions,
        governments, and corporations that require financing for innovation, infrastructure, and operations.
      </p>

      <Section title="1. Primary vs Secondary Markets" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 text-sm">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-primary mb-1">Primary Market</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Where securities are created and sold for the first time directly by the issuing entity (e.g., IPOs or corporate debt offerings).
          </p>
        </div>

        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="font-semibold text-primary mb-1">Secondary Market</h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Where previously issued securities are exchanged between participants without capital flowing directly to the issuer (e.g., NYSE, NASDAQ).
          </p>
        </div>
      </div>

      <Section title="2. Core Asset Classes" />
      <div className="space-y-3 text-sm">
        <div className="p-3.5 rounded-lg border border-border bg-background">
          <span className="font-semibold text-foreground">Equities (Stocks):</span>
          <p className="text-muted-foreground text-xs mt-0.5">
            Represents proportional ownership (equity) in a corporation. Holders have residual claims on assets and potential dividend distributions.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-background">
          <span className="font-semibold text-foreground">Fixed Income (Bonds):</span>
          <p className="text-muted-foreground text-xs mt-0.5">
            Debt obligations where an investor loans funds to an entity which borrows the funds for a defined period at a fixed or variable coupon rate.
          </p>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-background">
          <span className="font-semibold text-foreground">Derivatives:</span>
          <p className="text-muted-foreground text-xs mt-0.5">
            Contracts whose value is derived from an underlying asset (options, futures, swaps) commonly used for risk hedging or speculation.
          </p>
        </div>
      </div>

      <Callout type="info" title="Market Liquidity">
        Liquidity refers to how quickly an asset can be converted into cash without impacting its market price significantly. Highly liquid markets feature narrow bid-ask spreads.
      </Callout>

      <Quiz
        question="In which market does an entity receive proceeds directly from an Initial Public Offering (IPO)?"
        options={['Secondary Market', 'Primary Market', 'Derivatives Market', 'Money Market']}
        correctIndex={1}
        explanation="The primary market is where new securities are issued and capital flows directly to the issuing company."
      />

      <KeyTakeaways
        items={[
          'Financial markets efficiently channel investment capital to productive economic activities.',
          'The primary market creates securities; the secondary market provides ongoing price discovery and liquidity.',
          'Equities represent ownership claims, while bonds represent contractual debt claims.',
        ]}
      />
    </div>
  );
}
