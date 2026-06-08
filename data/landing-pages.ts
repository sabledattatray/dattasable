export interface LandingPage {
  id: string;
  slug: string;
  title: string;
  keyword: string;
  description: string;
  persona: string;
  intent: 'Execution' | 'Discovery' | 'Tutorial';
  associatedTemplate?: string; // Slug of the template
  associatedTool: string; // Path to the tool
  benefitPoints: string[];
  detailedStrategy: string;
  realWorldScenario: string;
}

export const LANDING_PAGES: LandingPage[] = [
  {
    id: 'lp-li-data-analysts',
    slug: 'linkedin-hooks-for-data-analysts',
    title: 'Viral LinkedIn Hooks for Data Analysts & Scientists',
    keyword: 'linkedin hooks for data analysts',
    description: 'Stop posting dry technical updates. Learn the surgical framework to turn complex data insights into high-authority LinkedIn posts.',
    persona: 'Data Analysts',
    intent: 'Execution',
    associatedTemplate: 'viral-linkedin-hooks-pack',
    associatedTool: '/tools/linkedin-formatter',
    benefitPoints: [
      'Technical storytelling frameworks',
      'Data-driven hook structures',
      'Mobile-optimized surgical spacing',
      '1-Click deployment to Formatter'
    ],
    detailedStrategy: "Data professionals often struggle with reach because they share tables and statistics without a narrative hook. The strategy here is to frame a specific data insight as a solution to a widespread industry misconception. By contrasting a common belief with what the data actually reveals, you capture the reader's attention instantly. Use the LinkedIn Formatter tool to clean up spacing so the structure remains clean on mobile devices.",
    realWorldScenario: "A senior analytics engineer discovers that 30% of their company's cloud budget is wasted on idle databases. Instead of posting a dry summary, they use our framework: 'Most teams think database scaling is automatic. It isn't. We just saved $14,000/month by altering a single Cron job. Here is the step-by-step breakdown...'"
  },
  {
    id: 'lp-li-saas-founders',
    slug: 'linkedin-hooks-for-saas-launches',
    title: 'High-Authority LinkedIn Hooks for SaaS Product Launches',
    keyword: 'linkedin hooks for saas launch',
    description: 'The precision-engineered system to announce your software launch without sounding like a generic sales pitch.',
    persona: 'SaaS Founders',
    intent: 'Execution',
    associatedTemplate: 'li-viral-hook-1',
    associatedTool: '/tools/linkedin-formatter',
    benefitPoints: [
      'Product Hunt launch frameworks',
      'Founder authority positioning',
      'Conversion-focused CTA structures',
      'Surgical spacing for mobile readability'
    ],
    detailedStrategy: "Generic product announcements fail because they sound like ads. SaaS founders should build authority by telling the story of the problem they solved and the technical failures they overcame to get there. Focus the copy on the 'why' and 'how' of the build process rather than just features, creating a narrative that other builders and potential users will want to follow and support.",
    realWorldScenario: "A bootstrapped founder launches an AI scheduling tool. Instead of saying 'Check out my new app!', they write: 'We spent 9 months building a scheduling algorithm that doesn't rely on calendar polling. The initial build failed under load, but we refactored it using Webhook streams. Today, we are live. Here is how we did it...'"
  },
  {
    id: 'lp-ai-seo-pipelines',
    slug: 'gemini-seo-pipelines-for-marketers',
    title: 'Expert Gemini AI Prompt Pipelines for Technical SEO',
    keyword: 'gemini seo prompts',
    description: 'Scale your content infrastructure with expert-grade Gemini prompts designed for deep research and metadata automation.',
    persona: 'SEO Marketers',
    intent: 'Discovery',
    associatedTemplate: 'gemini-research-pipeline',
    associatedTool: '/tools/ai-prompt-generator',
    benefitPoints: [
      'Deep research synthesis prompts',
      'Metadata automation workflows',
      'Token-optimized instruction sets',
      'Direct injection into Prompt Engineer'
    ],
    detailedStrategy: "AI prompt templates for search marketing are often too generic to rank. To build true organic authority, you must structure prompts that guide models to act as technical research analysts. These prompts instruct the LLM to analyze competitor structures, extract semantic keywords, and output structured metadata. This structured approach ensures that the content generated is high-value, factually accurate, and optimized for search engine crawlability.",
    realWorldScenario: "An SEO specialist wants to rank for 'data pipeline security'. They use the Gemini Research Pipeline to analyze search intent, outline the security requirements of modern data warehouses, and generate structured schema tags, all within a single, unified execution chain."
  }
];
