export const PROJECTS = [
    {
        id: 'explosion-fun',
        title: 'explosion.fun',
        tagline: 'Personal blog, portfolio, and interactive tools hub',
        featured: true,
        featuredOrder: 1,
        why: [
            'A creative and interactive portfolio website featuring dynamic visual effects and engaging user experiences.',
            'Demonstrates front-end development capabilities, creative coding, and performance-conscious interactions.'
        ],
        highlights: [
            'Next.js App Router with SSR & SSG',
            'Headless WordPress GraphQL CMS',
            'Interactive 3D and data visualizations',
            'Core Web Vitals optimization'
        ],
        awards: [],
        techStack: ['Next.js', 'React', 'Three.js', 'D3.js', 'GraphQL', 'WordPress', 'Vercel'],
        liveUrl: 'https://explosion.fun/',
        previewPath: null,
        embedAllowed: true,
        githubUrl: 'https://github.com/reuben-roy/reuben.roy',
        links: [
            { label: 'Live site', href: 'https://explosion.fun/' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/reuben.roy' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'time-management',
        title: 'Time Management Analysis',
        tagline: '31 days of screen-time analytics',
        featured: true,
        featuredOrder: 2,
        why: [
            'I wanted to understand where my attention actually goes — not where I think it goes.',
            'This D3 dashboard turns raw activity logs into actionable patterns: focus fragmentation, distraction gravity, circadian rhythms, and sleep-productivity correlations.'
        ],
        highlights: [
            'D3.js interactive dashboard',
            'Focus fragmentation analysis',
            'Sleep-productivity correlations',
            'Distraction gravity mapping'
        ],
        awards: [],
        techStack: ['D3.js', 'Next.js', 'Python'],
        liveUrl: null,
        previewPath: '/projects/time-management/view',
        embedAllowed: true,
        githubUrl: null,
        links: [
            { label: 'View Dashboard', href: '/projects/time-management' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'youtube-scholar',
        title: 'YouTube Scholar',
        tagline: 'Curiosity velocity from YouTube Takeout data',
        featured: true,
        featuredOrder: 3,
        why: [
            'My YouTube history is a map of how I learn — rabbit holes, research spirals, and format-driven curiosity.',
            'This case study turns Takeout data into a dark-theme research dashboard about learning loops and information diet.'
        ],
        highlights: [
            'YouTube Takeout data pipeline',
            'D3 curiosity visualizations',
            'Channel and topic analysis',
            'Learning loop detection'
        ],
        awards: [],
        techStack: ['D3.js', 'Next.js', 'JavaScript'],
        liveUrl: null,
        previewPath: '/projects/youtube-scholar/view',
        embedAllowed: true,
        githubUrl: null,
        links: [
            { label: 'View Experience', href: '/projects/youtube-scholar' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'side-track',
        title: 'Side-Track',
        tagline: 'iOS weight-training with smart fatigue tracking',
        featured: true,
        featuredOrder: 4,
        why: [
            'Generic workout apps don\'t account for muscle-specific fatigue or the chaos of picking what to train next.',
            'Side-Track uses a random workout picker, per-muscle fatigue tracking, local leaderboards, and Apple Health integration.'
        ],
        highlights: [
            'React Native iOS app',
            'Muscle-specific fatigue model',
            'Random workout picker',
            'Apple Health integration'
        ],
        awards: [],
        techStack: ['React Native', 'TypeScript', 'Go', 'PostgreSQL', 'SQLite'],
        liveUrl: 'https://apps.apple.com/app/side-track/id6755348971',
        previewPath: '/side-track',
        embedAllowed: true,
        githubUrl: 'https://github.com/reuben-roy/side-track',
        links: [
            { label: 'App Store', href: 'https://apps.apple.com/app/side-track/id6755348971' },
            { label: 'Release Notes', href: '/side-track' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/side-track' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'interactive-visualizations',
        title: 'Interactive Visualizations',
        tagline: '3D and data viz explorations',
        why: [
            'Complex concepts are easier to grasp when you can interact with them.',
            'A collection of immersive WebGL and D3 visualizations — from stork migration paths to an accelerated solar system model.'
        ],
        highlights: [
            'Three.js / React Three Fiber',
            'D3.js & TopoJSON',
            'Physics engine integration',
            'Performance-optimized rendering'
        ],
        awards: [],
        techStack: ['Three.js', 'D3.js', 'React', 'Next.js'],
        liveUrl: null,
        previewPath: '/blog/post/interactive/solar-system',
        embedAllowed: true,
        githubUrl: null,
        links: [
            { label: '3D Solar System', href: '/blog/post/interactive/solar-system' },
            { label: 'Flight of the Storks', href: '/blog/post/interactive/bird-migration' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'lofty',
        title: 'Lofty',
        tagline: 'Real-estate CRM demo with hybrid AI onboarding and full Learning Hub',
        why: [
            'Built as a product-fidelity demo of Lofty\'s real-estate CRM to prove agents can onboard faster and find answers without leaving the app — 40 synthetic leads, dashboard KPIs, calendar seeds, and profile fixtures give stakeholders a complete walkthrough with no real API or auth required.',
            'The AI assistant is hybrid: a deterministic rule-based guide layer fires first and handles high-confidence setup tasks entirely in the client (no LLM call). When confidence falls below 0.75, it falls back to a RAG pipeline — OpenAI embeddings over FAQ, glossary, tutorial, and guide-flow records — with live Zendesk doc fetching as a last resort.',
            'Instructions are authored once: the same TypeScript guide catalog drives both the DOM overlay tours and the RAG semantic index, so a change to a flow definition propagates to both the UI walkthrough and the AI answer without maintaining a second index.',
            'The retrieval algorithm blends two signals: 65% lexical (TF-IDF-style token overlap with title/keyword weighting and a phrase-match bonus) and 35% cosine vector similarity on precomputed OpenAI text-embedding-3-small embeddings. When local content is weak but an official Zendesk article scores strongly, the pipeline promotes doc hits to the answer context and fetches the full body on demand.',
            'Nine deterministic guide flows cover the core onboarding surface: profile name, email, and photo; account password and 2FA; notification preferences and SMS; CRM contact search and stage filtering. Every flow\'s DOM targets are validated against data-guide selectors at build time — a guide can never point at a non-existent element.',
            'Embeddings are precomputed at build time via npm run build:rag-corpus so the runtime only embeds the user\'s query, not the entire corpus. Without an OpenAI API key the assistant falls back to lexical-only retrieval, keeping the demo functional at zero API cost.',
        ],
        highlights: [
            'Hybrid assistant: deterministic guides (≥ 0.75 confidence) skip the LLM entirely',
            'RAG pipeline: OpenAI embeddings + lexical blend over FAQ, glossary, tutorials, and guide flows',
            '9 onboarding tour flows with DOM overlay (data-guide targets)',
            '40 synthetic CRM leads, dashboard KPIs, and calendar fixtures — no auth, no real API',
            'Full Learning Hub: FAQ, glossary, tutorials, ⌘K command palette, and live Zendesk doc fetch',
            'Single guide catalog drives both overlay tours and the RAG semantic index',
            'Retrieval: lexical 65% (token overlap, phrase bonus) + cosine vector 35%',
            'Build-time embedding precompute — runtime only embeds the query, not the corpus',
            'Confidence formula: min(0.95, 0.4 + score/25) · ambiguity flag when gap < 1.5',
            'SSRF-safe doc fetch: help.lofty.com allowlist, 5 s timeout, 4 000-char truncation',
        ],
        awards: [],
        techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'OpenAI', 'FullCalendar', 'Vercel'],
        liveUrl: 'https://lofty.explosion.fun/',
        previewPath: null,
        embedAllowed: true,
        githubUrl: 'https://github.com/reuben-roy/blistering-barnacles',
        links: [
            { label: 'Live demo', href: 'https://lofty.explosion.fun/' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/blistering-barnacles' },
        ],
        mermaid: null,
        architectureFallback: null,
        diagrams: [
            {
                label: 'System Architecture',
                chart: `flowchart TB
  subgraph Client["Browser (Client)"]
    APP["App Shell /app/*"]
    GP["GuideProvider"]
    LS["localStorage adapters"]
  end
  subgraph Next["Next.js 15 App Router"]
    RSC["Server Components"]
    API["POST /api/chat"]
  end
  subgraph Lib["lib/ — Core logic"]
    GUIDE["guide/ resolve · catalog · session"]
    RAG["rag/ retrieve · corpus · prompt"]
    HELP["help/ content + docs.raw.json"]
    FIX["fixtures/ synthetic CRM"]
  end
  subgraph External["External (optional)"]
    OAI["OpenAI Embeddings + Chat"]
    ZD["Zendesk / help.lofty.com"]
  end
  APP --> GP
  GP -->|"confidence ≥ 0.75"| GUIDE
  GP -->|"confidence < 0.75"| API
  API --> RAG
  RAG --> OAI
  RAG --> ZD
  APP --> FIX
  APP --> HELP
  GP --> LS
  RSC --> APP`,
            },
            {
                label: 'RAG Pipeline',
                chart: `flowchart TB
  subgraph Build["Build-time"]
    SRC["Content sources"]
    MAP["buildAnswerCorpusRecords"]
    EMB["OpenAI text-embedding-3-small"]
    ART["local-answer-corpus.generated.json"]
    SRC --> MAP --> EMB --> ART
  end
  subgraph Runtime["Runtime — POST /api/chat"]
    Q["User question"]
    QE["createQueryEmbedding"]
    RET["retrieveLocalContext"]
    PROMO{"insufficientContext + docHits?"}
    GPT["createGroundedAnswer + tools"]
    OUT["RAGResult + source chips"]
    Q --> QE --> RET --> PROMO
    PROMO -->|"yes — promote docs"| GPT
    PROMO -->|no| GPT
    GPT --> OUT
  end
  subgraph Fetch["Live doc enrichment"]
    FD["fetch_doc_content x3 max"]
    ZD["Zendesk API / HTML scrape"]
    FD --> ZD
  end
  ART -.->|"load answer records"| RET
  DOCS["docs.raw.json"] -.->|"runtime doc refs"| RET
  GPT --> FD`,
            },
            {
                label: 'Instruction Mapping',
                chart: `flowchart LR
  subgraph Sources["Authoring sources — one place"]
    CAT["lib/guide/catalog.ts"]
    FAQ["lib/help/faq.content.ts"]
    GLO["lib/help/glossary.content.ts"]
    TUT["lib/help/tutorials.content.ts"]
    RAW["lib/help/docs.raw.json"]
  end
  subgraph Projector["lib/rag/build.ts"]
    BAR["buildAnswerCorpusRecords"]
    BDR["buildDocReferenceRecords"]
  end
  subgraph Consumers["Consumers"]
    RAGIDX["RAG semantic index"]
    GUIDE["resolveGuideIntent"]
    OVERLAY["Guide overlay — DOM + routes"]
  end
  CAT --> BAR
  FAQ --> BAR
  GLO --> BAR
  TUT --> BAR
  RAW --> BDR
  BAR --> RAGIDX
  CAT --> GUIDE
  CAT --> OVERLAY
  RAGIDX --> GPT["Grounded GPT answer"]
  GUIDE -->|"confidence ≥ 0.75"| OVERLAY
  GUIDE -->|"confidence < 0.75"| GPT`,
            },
            {
                label: 'Hybrid Finding — Two Tracks',
                chart: `flowchart TD
  Q["Natural-language query"]
  Q --> G["Track A — resolveGuideIntent"]
  Q --> R["Track B — queryRAG"]
  G --> GS["scoreGuideFlow on 9 flows"]
  GS --> GM{"confidence >= 0.75?"}
  GM -->|yes| GO["Guide overlay + DOM steps"]
  GM -->|no| R
  R --> EMB["createQueryEmbedding"]
  EMB --> RK["rankRecord: lexical 65% + vector 35%"]
  RK --> TOP["Top 4 answer hits + 3 doc hits"]
  TOP --> INS{"insufficientContext?"}
  INS -->|"yes + docs"| PROMO["Promote docHits to answer context"]
  INS -->|no| CTX["Split answer vs reference docs"]
  PROMO --> GPT["GPT + fetch_doc_content x3"]
  CTX --> GPT
  GPT --> SA["submit_answer"]
  SA --> RES["Answer + source chips"]`,
            },
            {
                label: 'Assistant Decision Tree',
                chart: `flowchart TD
  Q["User submits query"] --> RES["resolveGuideIntent"]
  RES --> EMPTY{"Empty query?"}
  EMPTY -->|yes| NM1["no-match + example prompts"]
  EMPTY -->|no| USER{"Contains username?"}
  USER -->|yes| AMB1["ambiguous — profile-name at 0.78"]
  USER -->|no| SCORE["scoreGuideFlow x 9 flows"]
  SCORE --> LOW{"best score < 5?"}
  LOW -->|yes| NM2["no-match"]
  LOW -->|no| GAP{"gap < 1.5 AND best < 10?"}
  GAP -->|yes| AMB2["ambiguous at ~0.62"]
  GAP -->|no| MATCH["match — confidence up to 0.95"]
  MATCH --> TH{"confidence >= 0.75?"}
  TH -->|yes| GUIDE["Guide reply — no API call"]
  TH -->|no| RAG["POST /api/chat"]
  RAG --> ERR{"Error?"}
  ERR -->|yes| FB["buildSupportFallback"]
  ERR -->|no| UI["Sources + answer chips"]`,
            },
            {
                label: 'Question Submitted Pipeline',
                chart: `sequenceDiagram
  participant U as User
  participant GP as GuideProvider
  participant R as resolveGuideIntent
  participant API as /api/chat
  participant Q as queryRAG
  participant O as OpenAI
  U->>GP: submitQuery
  GP->>R: sync intent check
  alt guide confidence >= 0.75
    GP-->>U: guide message + DOM overlay
  else RAG path
    GP->>API: POST + history + onboarding context
    API->>Q: embed + retrieve + ground
    Q->>O: chat completion + tool calls
    Q-->>GP: RAGResult + sourceIds
    GP-->>U: answer card + source chips
  end`,
            },
        ],
    },
    {
        id: 'kali',
        title: 'Kali',
        tagline: 'Fitness progression like version control',
        why: [
            'Physical training lacks the structured progression tracking that developers get from version control.',
            'Kali treats workouts like commits — a fitness platform with a landing page and waitlist for structured physical progression.'
        ],
        highlights: [
            'Waitlist landing page',
            'Version-control metaphor for fitness',
            'PostgreSQL backend'
        ],
        awards: [],
        techStack: ['Next.js', 'Go', 'PostgreSQL', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
        liveUrl: 'https://kali.aureole10.com',
        previewPath: null,
        embedAllowed: true,
        githubUrl: 'https://github.com/reuben-roy/kali',
        links: [
            { label: 'Live site', href: 'https://kali.aureole10.com/' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/kali' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'window',
        title: 'Window',
        tagline: 'On-device AI screen activity summarizer',
        why: [
            'I wanted to understand my digital habits without sending screen content to the cloud.',
            'An Android app that tracks app usage, scrapes visible UI text, and runs on-device Gemini Nano AI to summarize activity.'
        ],
        highlights: [
            'On-device Gemini Nano AI',
            'Screen text extraction',
            'App usage tracking',
            'Privacy-first design'
        ],
        awards: [],
        techStack: ['Kotlin', 'Gemini', 'Go', 'Gradle', 'SQLite'],
        liveUrl: null,
        previewPath: null,
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/window',
        links: [
            { label: 'GitHub', href: 'https://github.com/reuben-roy/window' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'window-extension',
        title: 'Window Extension',
        tagline: 'Browser productivity co-pilot',
        why: [
            'Focus sessions break when distractions are one click away.',
            'A Chrome extension connecting to Google Calendar and blocking distractions during focus sessions.'
        ],
        highlights: [
            'Google Calendar integration',
            'Focus session blocking',
            'Chrome extension architecture'
        ],
        awards: [],
        techStack: ['JavaScript', 'Chrome Extension API'],
        liveUrl: null,
        previewPath: null,
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/window-extension',
        links: [
            { label: 'GitHub', href: 'https://github.com/reuben-roy/window-extension' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'job-answer-app',
        title: 'Job Answer App',
        tagline: 'AI-tailored job application answers',
        why: [
            'Writing unique application answers for every role is repetitive but requires personal context.',
            'Uses Google Gemini to generate tailored answers from your resume and writing rules.'
        ],
        highlights: [
            'Gemini-powered generation',
            'Resume-aware prompting',
            'Single-page tool'
        ],
        awards: [],
        techStack: ['Gemini', 'Node.js', 'JavaScript', 'Vercel'],
        liveUrl: 'https://answers.explosion.fun/',
        previewPath: null,
        embedAllowed: true,
        githubUrl: 'https://github.com/reuben-roy/job-answer-app',
        links: [
            { label: 'Live demo', href: 'https://answers.explosion.fun/' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/job-answer-app' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'auto-explosion',
        title: 'Auto Explosion',
        tagline: 'Data-driven storytelling playground',
        why: [
            'An experimental hub for portfolio, blog, and interactive tools — a digital playground for data-driven storytelling.'
        ],
        highlights: [
            'Next.js multi-tool hub',
            'D3 and Three.js integrations',
            'PostHog analytics'
        ],
        awards: [],
        techStack: ['Next.js', 'D3.js', 'Three.js', 'GraphQL', 'Firebase', 'PostHog', 'Vercel'],
        liveUrl: 'https://auto.explosion.fun',
        previewPath: null,
        embedAllowed: true,
        githubUrl: 'https://github.com/reuben-roy/Auto-Explosion',
        links: [
            { label: 'Live site', href: 'https://auto.explosion.fun' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/Auto-Explosion' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'ranker',
        title: 'Ranker',
        tagline: 'Career exploration via skill mapping',
        why: [
            'Choosing a career path is overwhelming when options aren\'t ranked against your actual skills and interests.',
            'Maps skills, interests, and traits against a hierarchical job database to surface best-fit roles.'
        ],
        highlights: [
            'Dynamic job hierarchy',
            'Skill-interest matching',
            'OAuth authentication'
        ],
        awards: [],
        techStack: ['React', 'React Native', 'Go', 'PostgreSQL', 'TypeScript', 'Vite', 'Tailwind CSS'],
        liveUrl: null,
        previewPath: null,
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/ranker',
        links: [
            { label: 'GitHub', href: 'https://github.com/reuben-roy/ranker' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'clackinator',
        title: 'Clackinator',
        tagline: 'Mechanical keyboard sounds for macOS',
        why: [
            'Typing satisfaction shouldn\'t require an expensive keyboard.',
            'A native macOS menu bar utility that plays mechanical keyboard sounds as you type.'
        ],
        highlights: [
            'Native macOS menu bar app',
            'AVAudioEngine sound synthesis',
            'Swift implementation'
        ],
        awards: [],
        techStack: ['Swift', 'AVAudioEngine'],
        liveUrl: null,
        previewPath: null,
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/clackinator',
        links: [
            { label: 'GitHub', href: 'https://github.com/reuben-roy/clackinator' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'switch-market',
        title: 'Switch Market',
        tagline: 'D3-powered shopping demo',
        why: [
            'Exploring how data visualization can make e-commerce data tangible.',
            'A vanilla-JS shopping demo with D3 visualizations, real-time search, and CSV sales data on Firebase.'
        ],
        highlights: [
            'D3.js visualizations',
            'Real-time search',
            'Firebase hosting'
        ],
        awards: [],
        techStack: ['D3.js', 'JavaScript', 'Firebase', 'Python', 'Java'],
        liveUrl: null,
        previewPath: null,
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/switch-market',
        links: [
            { label: 'GitHub', href: 'https://github.com/reuben-roy/switch-market' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'freelance-ecommerce',
        title: 'Freelance E-Commerce',
        tagline: 'WordPress sites for small businesses',
        why: [
            'Small businesses need affordable, SEO-optimized online stores without enterprise complexity.',
            'Built responsive WooCommerce sites for Natura Bags and Serah Design with payment gateways and performance optimization.'
        ],
        highlights: [
            'WooCommerce & WordPress',
            'Payment gateway integration',
            'SEO optimization',
            'Responsive product catalogs'
        ],
        awards: [],
        techStack: ['WordPress', 'WooCommerce', 'PHP', 'CSS', 'JavaScript'],
        liveUrl: null,
        previewPath: null,
        embedAllowed: false,
        githubUrl: null,
        links: [
            { label: 'Natura Bags', href: 'https://naturabags.com/' },
            { label: 'Serah Design', href: 'https://serahdesign.com/' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
];

export function getProjectById(id) {
    return PROJECTS.find((p) => p.id === id);
}
