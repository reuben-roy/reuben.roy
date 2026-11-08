export const EXPERIENCE = [
  {
    role: 'AI Engineer (Capstone)',
    company: 'Aligned Rewards',
    period: 'Recent',
    summary:
      'Built production retrieval-augmented features with a fallback path that keeps the product available on a local model.',
    highlights: [
      'Developed RAG features with LangChain, FastAPI, OpenAI embeddings, and Pinecone.',
      'Implemented dynamic routing and fallbacks between OpenRouter and local Gemma 3 models via Ollama.',
      'Built backend interfaces for model steering and reliable AI workflow generation, and documented the failure behavior for the product team.',
    ],
    stack: ['Python', 'LangChain', 'FastAPI', 'Pinecone', 'Ollama', 'OpenRouter', 'RAG'],
  },
  {
    role: 'Graduate Teaching Assistant / AI Engineer',
    company: 'Arizona State University',
    period: '2024—2026',
    summary:
      'Built a privacy-focused grading system that runs on the university’s own infrastructure.',
    highlights: [
      'Integrated an AI auto-grader with the Canvas API and a schema-driven rubric engine that turns PDF lab results into consistent feedback.',
      'Kept student work inside the institution by routing grading through self-hosted models.',
      'Supported a graduate software engineering course through code review, office hours, and design feedback.',
    ],
    stack: ['Python', 'Structured output', 'REST APIs', 'Ollama', 'Local LLMs', 'Privacy engineering'],
  },
  {
    role: 'Software Engineer',
    company: 'RCKR Software · Trubridge / CPSI',
    period: 'Earlier',
    summary:
      'Built secure backend services for a national health-information exchange.',
    highlights: [
      'Developed C#/.NET services following the FHIR specification so hospitals across the US could exchange patient records directly.',
      'Engineered asynchronous services and SQL ETL pipelines to migrate 64+ TB of hospital data under HIPAA-compliant integrations.',
      'Reduced PostgreSQL reporting execution time by 90% with Entity Framework and index work; added Redis caching, OAuth, JWT, and SonarQube-gated CI.',
    ],
    stack: ['.NET', 'C#', 'FHIR', 'PostgreSQL', 'Redis', 'Azure', 'Docker', 'CI/CD'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Tata Consultancy Services · IKEA',
    period: 'Earlier',
    summary:
      'Worked on the microservices behind IKEA’s websites, including quotation management and the 3D room planner.',
    highlights: [
      'Built Java/Spring Boot microservices on GCP for quote generation, revisions, approvals, and order-status notifications.',
      'Cut Quote Management API latency by 70% with Redis caching and SQL index optimization; added multithreaded workers and scheduled jobs.',
      'Redesigned React checkout components and contributed to the 3D Planner; maintained 80%+ coverage with JUnit and Mockito.',
    ],
    stack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Redis', 'GCP', 'Docker'],
  },
];

export const EDUCATION = [
  {
    school: 'Arizona State University',
    qualification: 'MS in Software Engineering',
    period: '2024—2026',
  },
  {
    school: 'National Institute of Technology, Calicut',
    qualification: 'B.Tech',
    period: '2017—2021',
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

export const CERTIFICATIONS = [
  {
    title: 'JavaScript Algorithms and Data Structures',
    organization: 'freeCodeCamp.org',
    href: 'https://www.freecodecamp.org/certification/ReubenRoy/javascript-algorithms-and-data-structures',
  },
  {
    title: 'Responsive Web Design',
    organization: 'freeCodeCamp.org',
    href: 'https://www.freecodecamp.org/certification/ReubenRoy/responsive-web-design',
  },
  {
    title: 'Introduction to Data Science in Python',
    organization: 'University of Michigan & Coursera',
    href: 'https://www.coursera.org/account/accomplishments/certificate/PP9R2W2SGRXH',
  },
  {
    title: 'Google AI | Explore ML Workshop',
    organization: 'Google',
    href: 'https://drive.google.com/file/d/1-dm9rRxr2olYYuFQeU1J7owzvZSl3wUa/view?usp=sharing',
  },
  {
    title: 'Astrophysics Workshop Conductor',
    organization: 'NIT Calicut',
    href: null,
  },
];

export const INTERNSHIPS = [
  {
    organization: 'ElectroBiosonics',
    location: 'Cochin',
    period: 'December 2018',
    description:
      'PCB design with MPLabX and fabrication, electronic equipment assembly, electroplating, and power-system manufacturing.',
  },
  {
    organization: 'Keltron',
    location: 'Thrissur, Kerala',
    period: 'May 2019',
    description:
      'Built connected devices with Arduino and worked through the internet of things end to end.',
  },
  {
    organization: 'Geo-Enterprises',
    location: 'Kerala',
    period: 'December 2020',
    description:
      'Built e-commerce sites with WordPress and WooCommerce, including payment gateways, SEO, and performance work.',
  },
];
