export const posts = [
  {
    slug: 'tableau-vs-powerbi-2024',
    title: 'Tableau vs Power BI in 2024: The Definitive Guide for BI Professionals',
    category: 'BI Tools',
    excerpt: 'Both Tableau and Power BI are best-in-class. But the right choice depends on your data stack, team, and use case. Here is an honest, experience-backed comparison.',
    content: `
      <p>After 5+ years of building dashboards in both Tableau and Power BI, I get this question constantly: <em>"Which should we use?"</em></p>
      <p>The honest answer: it depends. But let me break down the real-world differences so you can make an informed decision.</p>
      <h3>Visualization Power</h3>
      <p>Tableau wins on pure visualization flexibility. Its drag-and-drop interface and pixel-perfect chart customization are unmatched. Power BI has caught up significantly, but Tableau still feels more natural for complex custom visuals.</p>
      <h3>Data Connectivity</h3>
      <p>Power BI wins here for Microsoft-heavy environments. Native connectors to Azure, SharePoint, Dynamics, and Teams are seamless. Tableau's connectors are robust but require more configuration in M365 ecosystems.</p>
      <h3>Pricing</h3>
      <p>Power BI Pro is significantly cheaper at $10/user/month vs Tableau Creator at $70/user/month. For large teams, this difference is massive.</p>
      <h3>My Recommendation</h3>
      <p>Choose Tableau if: visualization quality is paramount, you have a data-mature team, or you need advanced analytics. Choose Power BI if: you are in a Microsoft ecosystem, budget is a constraint, or self-service BI is the priority.</p>
    `,
    readTime: 8,
    date: 'Apr 20, 2026',
    color: 'var(--accent)',
    icon: '📊',
    image: '/images/blog/tableau-vs-powerbi.png'
  },
  {
    slug: 'sql-window-functions-for-analytics',
    title: 'SQL Window Functions Every Data Analyst Must Know',
    category: 'SQL',
    excerpt: 'ROW_NUMBER, RANK, LAG, LEAD, NTILE — these window functions will transform the way you analyze data. Real examples with actual analytics use cases.',
    content: `
      <p>Window functions are the single biggest productivity boost for data analysts. Once you master them, you wonder how you ever survived without them.</p>
      <h3>ROW_NUMBER() — Deduplication</h3>
      <pre><code>SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) as rn
FROM orders
WHERE rn = 1; -- Latest order per customer</code></pre>
      <h3>LAG() / LEAD() — Period Comparisons</h3>
      <p>Use LAG() to compare current period vs previous period without self-joins. Essential for MoM, QoQ, YoY analysis.</p>
      <h3>NTILE() — Cohort Analysis</h3>
      <p>Divide your customers into quartiles by revenue. The top quartile is your VIP segment — target them differently.</p>
      <p>These 5 functions will cover 90% of your analytics window function needs. Practice them on real datasets and you will never go back to subqueries.</p>
    `,
    readTime: 6,
    date: 'Apr 14, 2026',
    color: 'var(--accent2)',
    icon: '🗄️',
    image: '/images/blog/sql-window.png'
  },
  {
    slug: 'python-pandas-for-bi-analysts',
    title: 'Python Pandas for BI Analysts: From Excel to DataFrames',
    category: 'Python',
    excerpt: 'If you live in Excel, Python Pandas will feel familiar but 10x more powerful. Here is a practical guide to making the switch without the headache.',
    content: `
      <p>The biggest mental shift when moving from Excel to Pandas is thinking in operations on entire columns, not cell-by-cell.</p>
      <h3>Reading Data</h3>
      <pre><code>import pandas as pd
df = pd.read_excel('sales_data.xlsx')
df = pd.read_csv('data.csv')</code></pre>
      <h3>The Excel SUMIF Equivalent</h3>
      <pre><code>df.groupby('region')['revenue'].sum()</code></pre>
      <h3>VLOOKUP Equivalent</h3>
      <pre><code>merged = pd.merge(orders, customers, on='customer_id', how='left')</code></pre>
      <p>The transition takes about 2 weeks of daily practice. After that, you will process in seconds what used to take hours.</p>
    `,
    readTime: 10,
    date: 'Apr 7, 2026',
    color: 'var(--accent3)',
    icon: '🐍',
    image: '/images/blog/python-pandas.png'
  },
  {
    slug: 'data-storytelling-executive-dashboards',
    title: 'Data Storytelling: How to Build Dashboards Executives Actually Use',
    category: 'Data',
    excerpt: 'Most dashboards are ignored. Learn the design principles and communication strategies that make executives not just look at your dashboard — but act on it.',
    content: `
      <p>I have built 100+ dashboards. The ones that drive action share 5 common traits.</p>
      <h3>1. Answer One Question Per View</h3>
      <p>Every dashboard page should answer a single business question. "How is revenue trending?" — not "Here is all our data."</p>
      <h3>2. Lead with the Exception</h3>
      <p>Show what is broken or at risk first. Executives need to know where to focus, not admire what is working.</p>
      <h3>3. Use Traffic Light Colors Consistently</h3>
      <p>Red = problem, yellow = warning, green = good. Never use these colors for decoration. Train your audience's eyes.</p>
      <h3>4. Mobile-First Design</h3>
      <p>70% of my executive clients check dashboards on their phone. Design for mobile, then enhance for desktop.</p>
    `,
    readTime: 7,
    date: 'Mar 30, 2026',
    color: 'var(--accent)',
    icon: '📖',
    image: '/images/blog/data-storytelling.png'
  },
  {
    slug: 'advanced-excel-tips-analysts',
    title: '10 Advanced Excel Features That Make Analysts Faster',
    category: 'Excel',
    excerpt: 'Power Query, dynamic arrays, XLOOKUP, and 7 more features most analysts overlook. Master these and you will cut your Excel time in half.',
    content: `
      <p>Advanced Excel is not about knowing more functions — it is about knowing the right ones and combining them powerfully.</p>
      <h3>1. Power Query — The Game Changer</h3>
      <p>If you are still copying and pasting data to combine sources, Power Query will change your life. It is a repeatable, auditable ETL tool built into Excel.</p>
      <h3>2. XLOOKUP — VLOOKUP's Replacement</h3>
      <p>XLOOKUP handles left lookups, returns arrays, and has a cleaner syntax. There is no reason to use VLOOKUP anymore.</p>
      <h3>3. Dynamic Arrays (FILTER, SORT, UNIQUE)</h3>
      <p>These three functions alone replace dozens of complex array formulas. FILTER with dynamic criteria is especially powerful for dashboards.</p>
    `,
    readTime: 9,
    date: 'Mar 22, 2026',
    color: 'var(--accent2)',
    icon: '📈',
    image: '/images/blog/advanced-excel.png'
  },
  {
    slug: 'bi-career-roadmap-2024',
    title: 'BI Career Roadmap: How to Become a Business Intelligence Expert in 2024',
    category: 'Career',
    excerpt: 'The BI field is booming. Here is the honest skills roadmap, certifications, and project portfolio you need to land your first or next BI role.',
    content: `
      <p>BI is one of the fastest-growing fields in tech, and the barrier to entry is lower than people think.</p>
      <h3>Phase 1: Foundation (0–3 months)</h3>
      <p>Learn SQL. This is non-negotiable. Start with SELECT, WHERE, GROUP BY, JOIN. Platforms: Mode Analytics, SQLZoo, LeetCode SQL.</p>
      <h3>Phase 2: Visualization (3–6 months)</h3>
      <p>Pick one tool — Tableau Public is free and excellent. Build 5 public dashboards on real datasets (Kaggle, government data).</p>
      <h3>Phase 3: Python (6–12 months)</h3>
      <p>Add Pandas and basic data cleaning. You do not need to be a programmer — you need to be a data wrangler.</p>
      <h3>Getting Your First Job</h3>
      <p>Your portfolio matters more than your degree. 5 solid, documented projects beat a master's degree every time.</p>
    `,
    readTime: 12,
    date: 'Mar 15, 2026',
    color: 'var(--accent3)',
    icon: '🚀',
    image: '/images/blog/bi-career.png'
  },
];
