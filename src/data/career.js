export const EXPERIENCE = [
  {
    role: 'AI Engineer (Capstone)',
    company: 'Aligned Rewards',
    period: 'Recent',
    summary:
      'Built production retrieval-augmented features with a fallback path that keeps the product available on a local model.',
    stack: ['Python', 'LangChain', 'FastAPI', 'Pinecone', 'Ollama', 'OpenRouter', 'RAG'],
  },
  {
    role: 'Graduate Teaching Assistant / AI Engineer',
    company: 'Arizona State University',
    period: '2024—2026',
    summary:
      'Built a privacy-focused grading system that runs on the university’s own infrastructure.',
    stack: ['Python', 'Structured output', 'REST APIs', 'Ollama', 'Local LLMs', 'Privacy engineering'],
  },
  {
    role: 'Software Engineer',
    company: 'RCKR Software · Trubridge / CPSI',
    period: 'Earlier',
    summary:
      'Built secure backend services for a national health-information exchange, including FHIR interoperability and a 64 TB data migration.',
    stack: ['.NET', 'C#', 'FHIR', 'PostgreSQL', 'Redis', 'Azure', 'Docker', 'CI/CD'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Tata Consultancy Services · IKEA',
    period: 'Earlier',
    summary:
      'Worked on the microservices behind IKEA’s websites, including quotation management and the 3D room planner.',
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Redis', 'GCP', 'Docker'],
  },
];

export const SKILL_GROUPS = [
  {
    label: 'AI & agentic systems',
    items: [
      'LLM orchestration',
      'RAG',
      'Embeddings',
      'Structured output',
      'Confidence gating',
      'Browser automation',
      'Local inference',
      'Prompt verification',
    ],
  },
  {
    label: 'Languages',
    items: ['Python', 'Java', 'C#', 'TypeScript', 'JavaScript', 'Swift', 'Go', 'Kotlin', 'SQL'],
  },
  {
    label: 'Backend & data',
    items: [
      'Spring Boot',
      '.NET',
      'FastAPI',
      'Fastify',
      'Hono',
      'REST',
      'GraphQL',
      'PostgreSQL',
      'Redis',
      'SQLite',
    ],
  },
  {
    label: 'Frontend & native',
    items: [
      'React',
      'Next.js',
      'React Native',
      'SwiftUI',
      'Electron',
      'D3.js',
      'Three.js',
      'CSS',
    ],
  },
  {
    label: 'Cloud & operations',
    items: [
      'AWS',
      'GCP',
      'Azure',
      'Docker',
      'Vercel',
      'GitHub Actions',
      'CI/CD',
      'Auth0 / OIDC',
    ],
  },
  {
    label: 'Practices',
    items: [
      'Testing',
      'Observability',
      'Failure handling',
      'Privacy engineering',
      'Technical writing',
    ],
  },
];
