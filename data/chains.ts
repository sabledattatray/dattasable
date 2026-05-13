export interface ExecutionChain {
  id: string;
  slug: string;
  title: string;
  description: string;
  nodes: string[]; // The modules involved: 'prompt', 'seo', 'linkedin', 'schema'
  inputLabel: string;
  placeholder: string;
}

export const CHAINS: ExecutionChain[] = [
  {
    id: 'authority-launch',
    slug: 'authority-content-launch',
    title: 'Authority Content Launch',
    description: 'The ultimate creator pipeline. Topic → Mega-Prompt → SEO Meta → LinkedIn Authority Post → JSON-LD Schema.',
    nodes: ['prompt', 'seo', 'linkedin', 'schema'],
    inputLabel: 'Main Technical Topic / Idea',
    placeholder: 'e.g. Building a real-time data orchestration platform...'
  },
  {
    id: 'ai-research-chain',
    slug: 'technical-research-deepdive',
    title: 'Technical Research Deep-Dive',
    description: 'Deep synthesis pipeline. Concept → Gemini Research Pipeline → Structural Summary → Technical Outline.',
    nodes: ['prompt', 'word-counter'],
    inputLabel: 'Research Objective',
    placeholder: 'e.g. Modern state of Vector Databases and RAG architectures...'
  },
  {
    id: 'social-seo-bridge',
    slug: 'social-to-search-bridge',
    title: 'Social-to-Search Bridge',
    description: 'Distribution pipeline. Article Draft → High-CTR SEO Meta → Viral LinkedIn Hook Stack → Schema Forge.',
    nodes: ['seo', 'linkedin', 'schema'],
    inputLabel: 'Article Content or Draft',
    placeholder: 'Paste your long-form content here...'
  }
];
