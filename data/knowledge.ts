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
}

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'ai-context-opt-guide',
    slug: 'optimizing-ai-context-windows',
    title: 'How to Optimize AI Context Windows for Complex Reasoning',
    description: 'Learn the technical art of semantic compression and token density to fit massive logic into narrow LLM windows.',
    category: 'AI Workflow',
    content: `
      ### The Context Window Bottleneck
      Every Large Language Model (LLM) like GPT-4, Claude 3, or Gemini has a finite "context window." When you exceed this window, the model loses its "memory" of the early part of the conversation, leading to hallucinations or logic failure.

      ### Semantic Compression Techniques
      To fit more into less, you must master semantic compression:
      1. **Abbreviation mapping**: Replace long terms (implementation -> impl)
      2. **Structural collapse**: Remove boilerplate headers
      3. **Deduplication**: Prune repetitive instructions

      ### The Operator Advantage
      By surgically condensing your prompts, you don't just save money—you improve reasoning fidelity. A lean prompt allows the model's attention mechanism to focus on core technical constraints rather than parsing linguistic fluff.
    `,
    associatedBlueprint: 'token-saving-system-prompt',
    associatedTool: '/tools/context-optimizer',
    readingTime: '5 min'
  },
  {
    id: 'li-authority-storytelling',
    slug: 'technical-storytelling-for-founders',
    title: 'Technical Storytelling: The Founder Authority Framework',
    description: 'A surgical breakdown of how to turn messy technical wins into viral LinkedIn authority assets.',
    category: 'LinkedIn Authority',
    content: `
      ### Why Technical Posts Fail
      Most technical founders post updates that are too dry or too vague. To build authority, you must bridge the gap between "Architecture" and "Business Impact."

      ### The "Surgical Hook" Method
      Start with the failure, not the win. 
      *Bad Hook*: "We just finished our new database migration."
      *Surgical Hook*: "Most people think database migrations are about speed. They're wrong. They're about infrastructure survival."

      ### Structuring for Mobile Readability
      LinkedIn is a mobile-first platform. Use "Surgical Spacing" (double line breaks) to ensure your technical breakdown is readable during a high-speed scroll.
    `,
    associatedBlueprint: 'founder-authority-system',
    associatedTool: '/tools/linkedin-formatter',
    readingTime: '4 min'
  }
];
