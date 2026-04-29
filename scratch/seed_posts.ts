import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const postsData = [
  {
    slug: 'modern-bi-stack-2026',
    title: 'The 2026 Modern Data Stack: Orchestrating Intelligence at Scale',
    category: 'Tech Stack',
    excerpt: 'Explore the evolution of the data stack in 2026, focusing on modular architectures, unified semantic layers, and the decline of monolithic BI platforms.',
    readTime: 12,
    date: 'Apr 28, 2026',
    color: 'var(--accent)',
    icon: '🏗️',
    image: '/images/blog/tech_stack_2026_hero_1777409998596.webp',
    content: `The landscape of Business Intelligence has shifted dramatically as we move through 2026...`
  },
  {
    slug: 'postgres-vs-snowflake-speed',
    title: 'PostgreSQL vs Snowflake: When to Scale Your BI Database',
    category: 'Tech Stack',
    excerpt: 'A technical deep-dive into the performance benchmarks of PostgreSQL and Snowflake for BI workloads. Learn the exact tipping point for migration.',
    readTime: 15,
    date: 'Apr 25, 2026',
    color: 'var(--accent)',
    icon: '⚡',
    image: '/images/blog/postgres_vs_snowflake_hero_1777410017107.webp',
    content: `The choice between an Operational Database like PostgreSQL and a Cloud Data Warehouse like Snowflake is one of the most critical decisions a data architect will make...`
  },
  {
    slug: 'python-automation-pipelines',
    title: 'Building Robust Data Pipelines with Python and Prefect',
    category: 'Tech Stack',
    excerpt: 'Master the art of automated data engineering. Learn how to build resilient, self-healing pipelines using Python and the Prefect orchestration framework.',
    readTime: 18,
    date: 'Apr 22, 2026',
    color: 'var(--accent)',
    icon: '🐍',
    image: '/images/blog/python_automation_hero_1777410033671.webp',
    content: `In the world of Business Intelligence, your dashboards are only as good as the pipelines that feed them...`
  },
  {
    slug: 'retail-analytics-trends-2026',
    title: 'Predictive Retail: How Analytics is Reshaping Inventory Management',
    category: 'Data Insights',
    excerpt: 'Retail is no longer about responding to demand—it is about anticipating it. Discover the analytics strategies driving the leaders of 2026.',
    readTime: 14,
    date: 'Apr 19, 2026',
    color: 'var(--accent2)',
    icon: '🛍️',
    image: '/images/blog/retail_analytics_hero_1777410051638.webp',
    content: `Inventory management has traditionally been a game of "reactive replenishment..."`
  }
];

async function main() {
  console.log('Start seeding...');
  for (const p of postsData) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...p,
        published: true
      }
    });
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
