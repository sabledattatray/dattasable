export interface GlossaryTerm {
  id: string;
  slug: string;
  term: string;
  definition: string;
  category: 'AI' | 'Data' | 'Workflow' | 'SEO';
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'g-semantic-compression',
    slug: 'semantic-compression',
    term: 'Semantic Compression',
    definition: 'The technical process of reducing prompt token count while preserving core logical meaning. Critical for optimizing Large Language Model (LLM) context windows.',
    category: 'AI'
  },
  {
    id: 'g-operator-intent',
    slug: 'operator-intent-mapping',
    term: 'Operator Intent Mapping',
    definition: 'A framework for aligning AI system outputs with professional technical personas to ensure execution fidelity and brand consistency.',
    category: 'Workflow'
  },
  {
    id: 'g-token-density',
    slug: 'token-density-optimization',
    term: 'Token Density',
    definition: 'The measurement of information per token in a system prompt. High density reduces costs and increases reasoning accuracy.',
    category: 'AI'
  },
  {
    id: 'g-prompt-chaining',
    slug: 'prompt-chaining-architecture',
    term: 'Prompt Chaining',
    definition: 'A surgical workflow technique where the output of one AI model call is used as the input for the next to solve complex, multi-step tasks.',
    category: 'Workflow'
  },
  {
    id: 'g-agentic-workflow',
    slug: 'agentic-workflow-engineering',
    term: 'Agentic Workflow',
    definition: 'A system architecture where AI models act as autonomous agents with specific roles, communication protocols, and tool-use capabilities.',
    category: 'AI'
  },
  {
    id: 'g-surgical-spacing',
    slug: 'surgical-spacing-method',
    term: 'Surgical Spacing',
    definition: 'The formatting technique of using double line breaks and minimalist characters to ensure high mobile readability for technical LinkedIn content.',
    category: 'Workflow'
  },
  {
    id: 'g-context-window',
    slug: 'llm-context-window-limits',
    term: 'Context Window',
    definition: 'The maximum amount of information (tokens) an AI model can process at one time before losing logical continuity or history.',
    category: 'AI'
  },
  {
    id: 'g-zero-shot-prompting',
    slug: 'zero-shot-prompting-execution',
    term: 'Zero-Shot Prompting',
    definition: 'Providing an AI model with a task description without any previous examples. Requires high-fidelity instruction mapping.',
    category: 'AI'
  },
  {
    id: 'g-few-shot-prompting',
    slug: 'few-shot-prompting-strategies',
    term: 'Few-Shot Prompting',
    definition: 'A method of providing a small set of examples to a model to guide its output style and logical constraints.',
    category: 'AI'
  },
  {
    id: 'g-technical-authority',
    slug: 'technical-authority-signals',
    term: 'Technical Authority',
    definition: 'The collection of EEAT signals (Expertise, Experience, Authoritativeness, Trustworthiness) that establish professional domain dominance on LinkedIn and Search.',
    category: 'SEO'
  },
  {
    id: 'g-ai-hallucination',
    slug: 'ai-hallucination-risks',
    term: 'AI Hallucination',
    definition: 'The phenomenon where a Large Language Model generates information that is factually incorrect or logically inconsistent while maintaining a confident tone. Solved via Surgical Architecture.',
    category: 'AI'
  },
  {
    id: 'g-data-fidelity',
    slug: 'data-fidelity-benchmarks',
    term: 'Data Fidelity',
    definition: 'The degree of accuracy and consistency in a data set or AI output. High fidelity ensures that automated systems can be trusted for enterprise decision-making.',
    category: 'Data'
  },
  {
    id: 'g-n8n-workflow-automation',
    slug: 'n8n-workflow-orchestration',
    term: 'n8n',
    definition: 'A powerful, source-available workflow automation tool that allows for complex, multi-node technical orchestrations. Used for building the "Auto-Operator" infrastructure.',
    category: 'Workflow'
  },
  {
    id: 'g-workflow-orchestration',
    slug: 'workflow-orchestration-logic',
    term: 'Workflow Orchestration',
    definition: 'The coordination of multiple automated tasks and AI agents into a single, cohesive system that executes professional-grade business logic without human intervention.',
    category: 'Workflow'
  }
];
