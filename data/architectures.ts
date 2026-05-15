export interface Architecture {
  id: string;
  title: string;
  description: string;
  category: 'Automation' | 'BI' | 'AI' | 'Data';
  diagram: string;
  template: string;
  promptChain: string[];
  outcomes: string[];
  caseStudySlug: string;
}

export const ARCHITECTURES: Architecture[] = [
  {
    id: 'surgical-content-engine',
    title: 'Surgical Content Engine',
    description: 'A multi-agent system for transforming raw data into high-fidelity technical articles and LinkedIn assets.',
    category: 'AI',
    diagram: `graph TD
    A[Raw Data Source] --> B[Surgical Parser]
    B --> C{Logic Gate}
    C -->|Technical| D[Deep Research Agent]
    C -->|Creative| E[Style Transfer Agent]
    D --> F[Content Assembly]
    E --> F
    F --> G[Multi-Platform Output]`,
    template: JSON.stringify({
      version: "1.0",
      type: "n8n-workflow",
      nodes: ["Webhook", "OpenAI-Agent", "Notion-Export"],
      trigger: "HTTP Request"
    }, null, 2),
    promptChain: [
      "Analyze the following technical input for core logic...",
      "Synthesize the logic into a surgical-style narrative...",
      "Generate platform-specific distribution assets..."
    ],
    outcomes: [
      "Reduced content turnaround from 48h to 2h.",
      "Achieved 99.5% schema consistency across 1k+ runs.",
      "Scalable distribution across 5+ platforms simultaneously."
    ],
    caseStudySlug: 'case-study-n8n-automated-authority-scaling'
  },
  {
    id: 'bi-data-orchestrator',
    title: 'BI Data Orchestrator',
    description: 'Infrastructure for real-time sales intelligence and revenue forecasting using SQL and Power BI integration.',
    category: 'BI',
    diagram: `graph LR
    A[Stripe/SQL] --> B[ETL Pipeline]
    B --> C[Data Warehouse]
    C --> D[Power BI Semantic Layer]
    D --> E[Interactive Dashboard]`,
    template: "-- SQL Schema for Revenue Intelligence\nCREATE TABLE revenue_metrics (\n  id SERIAL PRIMARY KEY,\n  source VARCHAR(50),\n  amount DECIMAL(10,2),\n  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);",
    promptChain: [
      "Write a SQL query to calculate MoM revenue growth...",
      "Optimize the query for indexing and performance..."
    ],
    outcomes: [
      "Eliminated 40+ manual reporting hours per week.",
      "Zero-latency visibility for global stakeholders.",
      "Identified $200k in unoptimized revenue leakage."
    ],
    caseStudySlug: 'case-study-workflow-automation-roi'
  }
];
