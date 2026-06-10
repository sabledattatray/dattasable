export interface Template {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'LinkedIn' | 'AI Prompts' | 'SEO' | 'Creator';
  targetModule: string; // The tool this template injects into
  content: any; // The data to inject
  detailedExplanation: string;
  bestPractices: string[];
  useCases: string[];
}

export const TEMPLATES: Template[] = [
  // LINKEDIN PACKS
  {
    id: 'li-viral-hook-1',
    slug: 'viral-linkedin-hooks-pack',
    title: 'The Viral Hook Pack',
    description: 'Unlock 10+ high-conversion, copy-pasteable LinkedIn hooks engineered specifically for technical founders, data analysts, and software engineers to drive organic reach.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "🚀 [Insert Big Achievement]\n\nMost people think [Common Myth] is the key to success.\n\nThey're wrong.\n\nHere is the surgical breakdown of how I [Result] in [Timeframe]:\n\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nComplexity is the enemy of execution. Keep it precise."
    },
    detailedExplanation: "This template leverages cognitive dissonance to disrupt the reader's scroll. By immediately introducing a contrarian claim about a widely accepted industry standard, it forces the reader to pay attention. The subsequent breakdown presents a clean, logical solution that builds immediate author authority. It is designed to format cleanly on mobile screens using surgical spacing.",
    useCases: [
      "Announcing a major software release or milestone",
      "Debunking common industry myths in data science or AI",
      "Providing a step-by-step tutorial based on a recent engineering success"
    ],
    bestPractices: [
      "Ensure the myth you are debunking is something your target audience actually believes.",
      "Keep steps concise, ideally under 10 words per line.",
      "Conclude with a high-impact, one-sentence takeaway."
    ]
  },
  {
    id: 'li-founder-auth',
    slug: 'founder-authority-system',
    title: 'Founder Authority System',
    description: 'Elevate your professional brand with this structural blueprint designed to translate complex engineering feats and system architectures into founder authority.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "Building in public isn't about sharing wins.\n\nIt's about sharing the architecture of your failures.\n\nToday I'm breaking down the [System Name] we built at [Company].\n\nThe Problem:\n- [Pain Point 1]\n- [Pain Point 2]\n\nThe Solution:\n- [Tech Choice 1]\n- [Tech Choice 2]\n\nOutcome: [Metric Improvement]%\n\nIf you're building in the [Niche] space, stop optimizing for vanity and start optimizing for infrastructure."
    },
    detailedExplanation: "True technical authority is built on transparent sharing of engineering decisions. This system focuses on the 'behind-the-scenes' architecture, describing the trade-offs, issues, and specific resolutions. It appeals to other developers and technical decision-makers by avoiding marketing hype and focusing entirely on metrics and architectural patterns.",
    useCases: [
      "Sharing post-mortems of system outages or scaling challenges",
      "Explaining technical choices (e.g., PostgreSQL vs MongoDB) for a new service",
      "Showcasing performance metrics after a code refactoring phase"
    ],
    bestPractices: [
      "Be honest about the failure point; it makes the solution much more credible.",
      "Use exact numbers for metrics (e.g., '42.3% drop in latency' instead of 'large improvement').",
      "Link the tech choices directly to how they resolved the initial pain points."
    ]
  },

  // AI PROMPT PACKS
  {
    id: 'prompt-gemini-research',
    slug: 'gemini-research-pipeline',
    title: 'Gemini Research Pipeline',
    description: 'A comprehensive, high-fidelity system prompt designed to orchestrate Gemini for deep technical research, literature synthesis, and structured report output.',
    category: 'AI Prompts',
    targetModule: '/tools/ai-prompt-generator',
    content: {
      topic: "Analyze the current state of [Technology] including top 3 competitors, core technical bottlenecks, and 2026 growth projections.",
      persona: "scientist",
      platform: "gemini"
    },
    detailedExplanation: "This prompt structure forces the Gemini model to operate as a rigorous technical researcher. It establishes a 'scientific persona' to discourage high-level conversational summaries and enforce data-driven analysis. It includes instructions for analyzing competitors, defining architectural hurdles, and outlining growth projections.",
    useCases: [
      "Analyzing a new technology stack before committing development resources",
      "Performing competitive intelligence on direct product competitors",
      "Generating technical briefs for product management and design teams"
    ],
    bestPractices: [
      "Specify the exact technology domain in detail to narrow the model's focus.",
      "Ask for specific sources or references if looking for academic research.",
      "Add constraints to exclude common blog-post level advice."
    ]
  },
  {
    id: 'prompt-token-optimizer',
    slug: 'token-saving-system-prompt',
    title: 'Token-Saving System Prompt',
    description: 'Optimize your LLM billing and prompt latency. Shrink your system instruction token usage by up to 40% with this highly-condensed technical instruction set.',
    category: 'AI Prompts',
    targetModule: '/tools/ai-prompt-generator',
    content: {
      topic: "Act as a technical optimizer. Refactor the following input for maximum information density. Use symbolic logic where possible to save tokens.",
      persona: "engineer",
      platform: "claude"
    },
    detailedExplanation: "Large language models often output unnecessary conversational filler. This token-saving blueprint acts as a system instruction filter that compresses the model's output to raw, functional code or structured key-value data. It is highly effective for reducing context cost in long chat histories.",
    useCases: [
      "Refactoring long user prompts before sending them to high-cost APIs",
      "Optimizing database schemas or raw logs for ingestion into an LLM",
      "Creating highly concise summaries of technical transcripts"
    ],
    bestPractices: [
      "Set strict output formatting boundaries like 'no introductory text'.",
      "Define exactly what symbols or notations should be used for compression.",
      "Verify that the compressed output retains the complete original context."
    ]
  },
  {
    id: 'prompt-agent-chain',
    slug: 'ai-agent-chain-blueprint',
    title: 'AI Agent Chain Blueprint',
    description: 'Implement deterministic, multi-step agentic workflows with this comprehensive blueprint for planning, self-correction, execution, and output validation.',
    category: 'AI Prompts',
    targetModule: '/tools/ai-prompt-generator',
    content: {
      topic: "Design a multi-agent system for [Task]. Define the Planner, Executor, and Critic roles. Specify the communication protocol between agents.",
      persona: "engineer",
      platform: "claude"
    },
    detailedExplanation: "This blueprint facilitates the orchestration of multi-agent collaborations. It separates responsibilities into three distinct roles: the Planner (decides what to do), the Executor (writes and runs code), and the Critic (tests and verifies the output). This division of labor mimics software development teams and improves reliability.",
    useCases: [
      "Designing complex autonomous coding assistants",
      "Automating code quality assurance pipelines",
      "Orchestrating complex data gathering and reporting cycles"
    ],
    bestPractices: [
      "Specify clear inputs and outputs for each agent role in the system.",
      "Design a loop counter to prevent agents from getting stuck in feedback loops.",
      "Ensure the Critic has independent, objective tools to verify the Executor's work."
    ]
  },

  // LINKEDIN PACKS (ADVANCED)
  {
    id: 'li-b2b-retention',
    slug: 'b2b-retention-post-blueprint',
    title: 'B2B Retention Blueprint',
    description: 'Learn the exact post structure and psychological angles to showcase B2B client success stories, retention rates, and ROI metrics to generate inbound leads.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "Why do 90% of SaaS companies struggle with churn?\n\nBecause they focus on acquisition, not infrastructure.\n\nWe recently helped [Client] achieve a [Percentage]% retention rate increase.\n\nThe Secret: [Specific technical move].\n\nHere's the data: [Data Point 1], [Data Point 2].\n\nConsistency > Intensity."
    },
    detailedExplanation: "Retention metrics are the ultimate signal of product-market fit. This blueprint helps enterprise founders and marketers showcase client successes through a technical lens. By explaining the exact engineering or operational change that led to the metric boost, it attracts high-value enterprise leads.",
    useCases: [
      "Sharing client success stories and case studies",
      "Highlighting product improvements that reduced user friction and churn",
      "Educating the market on the business value of technical infrastructure stability"
    ],
    bestPractices: [
      "Anonymize client names if necessary, but keep the data points 100% real.",
      "Clearly link the retention metric to a technical change rather than marketing.",
      "Keep the explanation of the solution simple enough for a non-technical manager."
    ]
  },

  // SEO PACKS
  {
    id: 'seo-high-ctr',
    slug: 'high-ctr-meta-structures',
    title: 'High-CTR Meta Structures',
    description: 'Deploy these pre-tested search engine optimization templates for titles and meta descriptions engineered to capture maximum clicks and dominate search results.',
    category: 'SEO',
    targetModule: '/tools/seo-meta-generator',
    content: {
      title: "How to [Action] in 2026: The Surgical Guide for [Audience]",
      description: "Stop wasting time on [Common Mistake]. Learn the precision-engineered system to [Result] with 100% accuracy. Read the expert breakdown now.",
    },
    detailedExplanation: "Winning clicks on Google Search requires meta tags that promise speed, specificity, and authority. This structure utilizes active verbs and defines a specific target audience. It is optimized to stay within search engine display limits while maximizing search engine click-through rates.",
    useCases: [
      "Optimizing landing page title tags for search rankings",
      "Updating old blog post meta descriptions to improve CTR",
      "Structuring content distribution assets for technical target keywords"
    ],
    bestPractices: [
      "Keep titles under 60 characters and descriptions under 155 characters to avoid truncation.",
      "Include the primary keyword near the beginning of both the title and description.",
      "Add a clear, compelling call to action at the end of the description."
    ]
  },
  {
    id: 'seo-jsonld-product',
    slug: 'saas-product-schema-blueprint',
    title: 'SaaS Product Schema',
    description: 'Optimize your software landing pages with this compliant JSON-LD schema blueprint designed to secure rich search results snippets and boost click-through rates.',
    category: 'SEO',
    targetModule: '/tools/seo-meta-generator',
    content: {
      title: "Product Schema for [Product Name]",
      description: "Generate structured data for products including price, rating, and availability to dominate Google search results.",
    },
    detailedExplanation: "JSON-LD schema structured data translates your product features directly into search engine syntax. This helps search engine crawlers understand your product's pricing model, user reviews, and brand details, which can trigger rich snippet placements like review stars and pricing badges in Google search results.",
    useCases: [
      "Adding structured data to SaaS marketing homepages",
      "Improving the organic search visibility of product pages",
      "Enforcing search engine readability for product features and reviews"
    ],
    bestPractices: [
      "Ensure all properties defined in the schema are visible to users on the page.",
      "Use valid schema.org types and test output with Google's Rich Results Test tool.",
      "Update the schema dynamically if pricing or review ratings change."
    ]
  }
];
