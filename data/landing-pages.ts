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
    ]
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
    ]
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
    ]
  }
];
