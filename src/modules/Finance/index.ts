import Step1_0_IntroMarkets from './content/step1.0_intro_markets';
import Step1_1_FinancialStatements from './content/step1.1_financial_statements';
import Step1_2_ValuationBasics from './content/step1.2_valuation_basics';
import { ModuleDefinition } from '../../types/lms';

export const financeModule: ModuleDefinition = {
  id: 'Finance',
  slug: 'finance',
  title: 'Finance & Valuation',
  category: 'Capital Markets & Corporate Finance',
  description:
    'Comprehensive principles in financial markets, statement analysis, corporate accounting, and valuation mechanics.',
  icon: 'DollarSign',
  badge: 'Business Core',
  difficulty: 'Intermediate',
  stages: [
    {
      id: 'finance-stage-1',
      title: 'Stage 1: Markets & Financial Statements',
      description: 'Foundational financial ecosystem, core accounting statements, and valuation models.',
      steps: [
        {
          id: 'fin-1-0',
          order: '1.0',
          title: 'Financial Markets',
          description: 'Market structure, primary vs secondary markets, and asset classes.',
          estimatedMinutes: 10,
          component: Step1_0_IntroMarkets,
        },
        {
          id: 'fin-1-1',
          order: '1.1',
          title: 'Three Financial Statements',
          description: 'Balance sheet, income statement, and cash flow statement dynamics.',
          estimatedMinutes: 15,
          component: Step1_1_FinancialStatements,
        },
        {
          id: 'fin-1-2',
          order: '1.2',
          title: 'Valuation Methodologies',
          description: 'DCF modeling, enterprise value, and trading multiples.',
          estimatedMinutes: 12,
          component: Step1_2_ValuationBasics,
        },
      ],
    },
  ],
};
