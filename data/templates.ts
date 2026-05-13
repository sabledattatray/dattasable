export interface Template {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'LinkedIn' | 'AI Prompts' | 'SEO' | 'Creator';
  targetModule: string; // The tool this template injects into
  content: any; // The data to inject
}

export const TEMPLATES: Template[] = [
  // LINKEDIN PACKS
  {
    id: 'li-viral-hook-1',
    slug: 'viral-linkedin-hooks-pack',
    title: 'The Viral Hook Pack',
    description: '10+ High-conversion hooks for technical founders and data specialists.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "🚀 [Insert Big Achievement]\n\nMost people think [Common Myth] is the key to success.\n\nThey're wrong.\n\nHere is the surgical breakdown of how I [Result] in [Timeframe]:\n\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nComplexity is the enemy of execution. Keep it precise."
    }
  },
  {
    id: 'li-founder-auth',
    slug: 'founder-authority-system',
    title: 'Founder Authority System',
    description: 'Position yourself as a technical expert with this structural blueprint.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "Building in public isn't about sharing wins.\n\nIt's about sharing the architecture of your failures.\n\nToday I'm breaking down the [System Name] we built at [Company].\n\nThe Problem:\n- [Pain Point 1]\n- [Pain Point 2]\n\nThe Solution:\n- [Tech Choice 1]\n- [Tech Choice 2]\n\nOutcome: [Metric Improvement]%\n\nIf you're building in the [Niche] space, stop optimizing for vanity and start optimizing for infrastructure."
    }
  },

  // AI PROMPT PACKS
  {
    id: 'prompt-gemini-research',
    slug: 'gemini-research-pipeline',
    title: 'Gemini Research Pipeline',
    description: 'High-fidelity prompt for deep technical research and data synthesis.',
    category: 'AI Prompts',
    targetModule: '/tools/ai-prompt-generator',
    content: {
      topic: "Analyze the current state of [Technology] including top 3 competitors, core technical bottlenecks, and 2026 growth projections.",
      persona: "scientist",
      platform: "gemini"
    }
  },
  {
    id: 'prompt-token-optimizer',
    slug: 'token-saving-system-prompt',
    title: 'Token-Saving System Prompt',
    description: 'Reduce context window usage by 40% with this hyper-concise technical instruction set.',
    category: 'AI Prompts',
    targetModule: '/tools/ai-prompt-generator',
    content: {
      topic: "Act as a technical optimizer. Refactor the following input for maximum information density. Use symbolic logic where possible to save tokens.",
      persona: "engineer",
      platform: "claude"
    }
  },
  {
    id: 'prompt-agent-chain',
    slug: 'ai-agent-chain-blueprint',
    title: 'AI Agent Chain Blueprint',
    description: 'A multi-step reasoning chain for building autonomous agentic workflows.',
    category: 'AI Prompts',
    targetModule: '/tools/ai-prompt-generator',
    content: {
      topic: "Design a multi-agent system for [Task]. Define the Planner, Executor, and Critic roles. Specify the communication protocol between agents.",
      persona: "engineer",
      platform: "claude"
    }
  },

  // LINKEDIN PACKS
  {
    id: 'li-viral-hook-1',
    slug: 'viral-linkedin-hooks-pack',
    title: 'The Viral Hook Pack',
    description: '10+ High-conversion hooks for technical founders and data specialists.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "🚀 [Insert Big Achievement]\n\nMost people think [Common Myth] is the key to success.\n\nThey're wrong.\n\nHere is the surgical breakdown of how I [Result] in [Timeframe]:\n\n1. [Step 1]\n2. [Step 2]\n3. [Step 3]\n\nComplexity is the enemy of execution. Keep it precise."
    }
  },
  {
    id: 'li-founder-auth',
    slug: 'founder-authority-system',
    title: 'Founder Authority System',
    description: 'Position yourself as a technical expert with this structural blueprint.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "Building in public isn't about sharing wins.\n\nIt's about sharing the architecture of your failures.\n\nToday I'm breaking down the [System Name] we built at [Company].\n\nThe Problem:\n- [Pain Point 1]\n- [Pain Point 2]\n\nThe Solution:\n- [Tech Choice 1]\n- [Tech Choice 2]\n\nOutcome: [Metric Improvement]%\n\nIf you're building in the [Niche] space, stop optimizing for vanity and start optimizing for infrastructure."
    }
  },
  {
    id: 'li-b2b-retention',
    slug: 'b2b-retention-post-blueprint',
    title: 'B2B Retention Blueprint',
    description: 'A strategic post structure for highlighting client success and retention metrics.',
    category: 'LinkedIn',
    targetModule: '/tools/linkedin-formatter',
    content: {
      text: "Why do 90% of SaaS companies struggle with churn?\n\nBecause they focus on acquisition, not infrastructure.\n\nWe recently helped [Client] achieve a [Percentage]% retention rate increase.\n\nThe Secret: [Specific technical move].\n\nHere's the data: [Data Point 1], [Data Point 2].\n\nConsistency > Intensity."
    }
  },

  // SEO PACKS
  {
    id: 'seo-high-ctr',
    slug: 'high-ctr-meta-structures',
    title: 'High-CTR Meta Structures',
    description: 'Proven meta title and description templates to win the SERP click.',
    category: 'SEO',
    targetModule: '/tools/seo-meta-generator',
    content: {
      title: "How to [Action] in 2026: The Surgical Guide for [Audience]",
      description: "Stop wasting time on [Common Mistake]. Learn the precision-engineered system to [Result] with 100% accuracy. Read the expert breakdown now.",
    }
  },
  {
    id: 'seo-jsonld-product',
    slug: 'saas-product-schema-blueprint',
    title: 'SaaS Product Schema',
    description: 'Technical JSON-LD structure to get rich snippets for your software product.',
    category: 'SEO',
    targetModule: '/tools/seo-meta-generator',
    content: {
      title: "Product Schema for [Product Name]",
      description: "Generate structured data for products including price, rating, and availability to dominate Google search results.",
    }
  }
];
