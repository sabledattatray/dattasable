import React from 'react';
import {
  BarChart3, Database, Code2, Globe, Shield, Zap, TrendingUp,
  Activity, Box, Layers, Briefcase, FileText, Sparkles,
  PenTool, Library, LayoutGrid, UserCog, Scale, Book
} from 'lucide-react';

export const navLinks = [
  { label: 'Services', href: '/services', mega: true },
  { label: 'Portfolio', href: '/portfolio', mega: true },
  { label: 'Dashboards', href: '/dashboards', mega: true },
  { label: 'Blog', href: '/blog', mega: true },
  { label: 'Knowledge', href: '/knowledge/architecture', mega: true },
  { label: 'Workspace', href: '/tools', mega: true },
  { label: 'Templates', href: '/templates' },
];

export const megaMenuData: Record<string, any> = {
  Services: {
    items: [
      { title: 'BI Strategy', desc: 'Enterprise data roadmap planning.', icon: <Layers size={20} />, href: '/services#consulting' },
      { title: 'Dashboard Design', desc: 'Tableau & Power BI expert builds.', icon: <BarChart3 size={20} />, href: '/services#dashboards' },
      { title: 'Data Automation', desc: 'Python & SQL based pipelines.', icon: <Zap size={20} />, href: '/services#automation' },
      { title: 'Synthetic Data Forge', desc: 'High-fidelity dataset generation.', icon: <Database size={20} className="text-[var(--accent)]" />, href: '/data-forge' },
      { title: 'Enterprise Web Dev', desc: 'WordPress & Next.js solutions.', icon: <Globe size={20} />, href: '/services#web-solutions' },
      { title: 'Technical SEO', desc: 'On-page & technical ranking.', icon: <Sparkles size={20} />, href: '/services#seo-optimization' },
      { title: 'Premium Web Design', desc: 'Bespoke UI/UX experiences.', icon: <Layers size={20} />, href: '/services#web-design' },
      { title: 'Live Analytics Feed', desc: 'Real-time platform monitoring.', icon: <Activity size={20} className="text-[var(--accent)]" />, href: '/analytics-live' },
      { title: 'n8n Workflows', desc: 'Self-hosted app connectivity.', icon: <Zap size={20} />, href: '/services#n8n-automation' },
      { title: 'Graphic Design', desc: 'CorelDRAW vector solutions.', icon: <PenTool size={20} />, href: '/services#graphic-design' },
      { title: 'Predictive Modeling', desc: 'Statistical forecasting & AI.', icon: <Activity size={20} />, href: '/services#consulting' },
      { title: 'Data Governance', desc: 'Security, compliance & quality.', icon: <Shield size={20} />, href: '/services#consulting' },
    ]
  },
  Portfolio: {
    items: [
      { title: 'Interactive Dashboards', desc: 'Live visual experiences.', icon: <Box size={20} />, href: '/portfolio?category=Dashboard' },
      { title: 'Technical Analysis', desc: 'Detailed project breakdowns.', icon: <Briefcase size={20} />, href: '/portfolio?category=Analysis' },
      { title: 'Report Engineering', desc: 'High-fidelity data storytelling.', icon: <FileText size={20} />, href: '/portfolio?category=Report' },
      { title: 'Automation Assets', desc: 'Scalable backend data logic.', icon: <Zap size={20} />, href: '/portfolio?category=Automation' },
      { title: 'Success Metrics', desc: 'Impact analysis & ROI data.', icon: <TrendingUp size={20} />, href: '/portfolio' },
    ]
  },
  Blog: {
    items: [
      { title: 'Engineering', desc: 'Core tech stack & methodologies.', icon: <Code2 size={20} />, href: '/blog?category=Engineering' },
      { title: 'Data Analysis', desc: 'Market trends & production insights.', icon: <Sparkles size={20} />, href: '/blog?category=Analysis' },
      { title: 'Tutorials', desc: 'Step-by-step technical guides.', icon: <FileText size={20} />, href: '/blog?category=Tutorials' },
      { title: 'AI Research', desc: 'Exploring LLMs and GPT in BI.', icon: <Activity size={20} />, href: '/blog?category=AI' },
      { title: 'Architecture', desc: 'Enterprise design & standards.', icon: <TrendingUp size={20} />, href: '/blog?category=Architecture' },
    ]
  },
  Dashboards: {
    items: [
      { title: 'Global Sales', desc: 'Real-time revenue monitoring.', icon: <Globe size={20} className="text-[#9b59ff]" />, href: '/dashboards/global-sales-intelligence' },
      { title: 'EMI Intelligence', desc: 'Real-time collection monitoring.', icon: <Activity size={20} className="text-[var(--accent)]" />, href: '/dashboards/collection-intelligence' },
      { title: 'Revenue Intelligence', desc: 'SQL & Power BI MoM forecasting.', icon: <TrendingUp size={20} className="text-blue-500" />, href: '/dashboards/revenue-intelligence' },
      { title: 'Sales Pipeline', desc: 'Deal velocity & CRM conversion.', icon: <BarChart3 size={20} className="text-emerald-500" />, href: '/dashboards/sales-pipeline' },
      { title: 'Blinkit Sales', desc: '10M+ row quick-commerce metrics.', icon: <Box size={20} className="text-amber-500" />, href: '/dashboards/blinkit-sales' },
      { title: 'Surgical AI', desc: 'Executive C-suite command center.', icon: <Sparkles size={20} className="text-[var(--accent)]" />, href: '/dashboards/surgical-ai' },
      { title: 'Interactive Demo', desc: 'Live embedded BI experience.', icon: <Layers size={20} className="text-cyan-500" />, href: '/dashboards/interactive' },
      { title: 'All Dashboards', desc: 'Explore the full BI portfolio hub.', icon: <LayoutGrid size={20} />, href: '/dashboards' },
      { title: 'Custom Solutions', desc: 'Bespoke SQL/DAX reporting architectures.', icon: <Shield size={20} className="text-[#9b59ff]" />, href: '/contact' },
    ]
  },
  Workspace: {
    items: [
      { title: 'Templates Hub', desc: 'Downloadable system blueprints.', icon: <Library size={20} className="text-[var(--accent)]" />, href: '/templates' },
      { title: 'Prompt Auditor', desc: 'Surgical audit for LLM prompts.', icon: <Shield size={20} />, href: '/tools/prompt-auditor' },
      { title: 'Context Optimizer', desc: 'Token density & bloat analysis.', icon: <Zap size={20} />, href: '/tools/context-optimizer' },
      { title: 'Data Forge', desc: 'Synthetic dataset generation.', icon: <Database size={20} />, href: '/data-forge' },
      { title: 'Analytics Feed', desc: 'Real-time performance metrics.', icon: <Activity size={20} />, href: '/analytics-live' },
    ]
  },
  Knowledge: {
    items: [
      { title: 'Architecture Library', desc: 'Downloadable system blueprints.', icon: <Layers size={20} className="text-[var(--accent)]" />, href: '/knowledge/architecture' },
      { title: 'RFC Directory', desc: 'Technical Requests for Comments.', icon: <FileText size={20} className="text-blue-500" />, href: '/knowledge/rfc' },
      { title: 'Workflow Patterns', desc: 'Canonical design frameworks.', icon: <LayoutGrid size={20} className="text-cyan-500" />, href: '/knowledge/patterns' },
      { title: 'Hardening Standards', desc: 'Prompt engineering benchmarks.', icon: <Shield size={20} className="text-emerald-500" />, href: '/knowledge/standards' },
      { title: 'System Glossary', desc: 'Technical terminology index.', icon: <Book size={20} />, href: '/glossary' },
      { title: 'Framework Analysis', desc: 'Methodology comparisons.', icon: <Scale size={20} className="text-amber-500" />, href: '/knowledge/comparisons' },
      { title: 'Reference Release', desc: 'Surgical AI v2026.1 Release.', icon: <Activity size={20} className="text-[var(--accent)]" />, href: '/knowledge/architecture' },
      { title: 'Intent Protocols', desc: 'Operator alignment frameworks.', icon: <UserCog size={20} />, href: '/knowledge/protocols' },
    ]
  }
};
