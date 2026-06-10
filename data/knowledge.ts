export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'AI Workflow' | 'LinkedIn Authority' | 'SEO Infrastructure';
  content: string;
  associatedBlueprint?: string; // Slug of the template
  associatedTool: string; // Path to the tool
  readingTime: string;
  operatorNote?: string;
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'ai-context-opt-guide',
    slug: 'optimizing-ai-context-windows',
    title: 'Surgical Prompt Architecture™: Optimizing Context Windows',
    description: 'Learn the technical art of semantic compression, token density optimization, and prompt engineering to fit massive code logic into narrow LLM context windows.',
    category: 'AI Workflow',
    content: `
      ### The Context Window Bottleneck
      Every Large Language Model (LLM) like GPT-4, Claude 3, or Gemini has a finite "context window." When you exceed this window, the model loses its "memory" of the early part of the conversation, leading to hallucinations or logic failure.

      ### Context Compression Framework™
      To fit more into less, you must master semantic compression:
      1. **Abbreviation mapping**: Replace long terms (implementation -> impl)
      2. **Structural collapse**: Remove boilerplate headers
      3. **Deduplication**: Prune repetitive instructions

      ### The Operator Advantage
      By surgically condensing your prompts, you don't just save money—you improve reasoning fidelity. A lean prompt allows the model's attention mechanism to focus on core technical constraints rather than parsing linguistic fluff.
    `,
    associatedBlueprint: 'token-saving-system-prompt',
    associatedTool: '/tools/context-optimizer',
    readingTime: '5 min',
    operatorNote: "I use this exact method to fit 2000-line database schemas into Gemini 1.5 Flash prompts. The secret is the abbreviations—models understand them perfectly, but you save thousands of tokens over a long session."
  },
  {
    id: 'li-authority-storytelling',
    slug: 'technical-storytelling-for-founders',
    title: 'Operator Intent Mapping™: Technical Storytelling for Founders',
    description: 'Discover the Operator Intent Mapping framework to translate complex codebases, software architectures, and engineering milestones into high-authority LinkedIn posts.',
    category: 'LinkedIn Authority',
    content: `
      ### Why Technical Posts Fail
      Most technical founders post updates that are too dry or too vague. To build authority, you must bridge the gap between "Architecture" and "Business Impact."

      ### The Authority Distribution Matrix™
      Start with the failure, not the win. 
      *Bad Hook*: "We just finished our new database migration."
      *Surgical Hook*: "Most people think database migrations are about speed. They're wrong. They're about infrastructure survival."

      ### Structuring for Mobile Readability
      LinkedIn is a mobile-first platform. Use "Surgical Spacing" (double line breaks) to ensure your technical breakdown is readable during a high-speed scroll.
    `,
    associatedBlueprint: 'founder-authority-system',
    associatedTool: '/tools/linkedin-formatter',
    readingTime: '4 min',
    operatorNote: "Authenticity is the only thing AI can't fake. Use my spacing method to let your personality breathe between the lines of code. It follows natural speech patterns."
  }
];
