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
        tagline: 'Local-first iOS workout app with muscle-specific fatigue engine and global leaderboard',
        featured: true,
        featuredOrder: 4,
        why: [
            'Generic workout apps don\'t account for muscle-specific fatigue or decision fatigue. The Randomize button solves both — it picks an exercise, weight, and rep target aligned to your training goal and current muscle freshness, filtering out any exercise targeting muscles below 30% capacity.',
            'Every set you log drains muscle capacity using a science-based formula: cost = involvement × C₀ × (%1RM²) × reps × MET. Capacity then recovers exponentially at different rates per muscle size — large muscles like quads at ~1.2%/hour, small muscles like biceps at ~2.5%/hour. Users can override both involvement maps and recovery rates from the settings.',
            'After each set, four 1RM estimation formulas (Epley, Brzycki, Lombardi, O\'Conner) run in parallel. If the new estimate beats the stored personal record it updates the exercise limit — which feeds back into the workout generator\'s weight targets and syncs debounced to Supabase to drive global and location-based leaderboard rankings with Wilks score and weekly calorie comparisons.',
            'All workout data, fatigue state, and 1RM estimates live in a per-user on-device SQLite database — the app is entirely local-first. Supabase handles Google OAuth and native Apple Sign-In alongside aggregated leaderboard scores only. A full JSON backup and restore system lets users migrate all history between devices.',
        ],
        highlights: [
            'Random workout generator filters exercises targeting muscles below 30% capacity',
            'Fatigue engine: exponential drain formula (C₀, %1RM², reps, MET) with per-muscle recovery rates',
            '1RM auto-estimation via 4 parallel formulas (Epley, Brzycki, Lombardi, O\'Conner) — updates every qualifying set',
            'Local-first: per-user SQLite on-device; Supabase for auth and leaderboard scores only',
            'Global leaderboard with Wilks score, weekly calories, and location-based filtering',
            'Apple HealthKit bi-directional sync (iOS); Android Health Connect support planned',
            '5-step onboarding wizard with experience-level 1RM scaling (beginner ×0.7 → advanced ×1.3)',
            '~30 exercises with per-muscle involvement maps and customizable recovery rates in settings',
        ],
        awards: [],
        techStack: ['React Native', 'Expo', 'TypeScript', 'SQLite', 'Supabase', 'HealthKit', 'Expo Router'],
        liveUrl: 'https://apps.apple.com/us/app/side-track/id6755348971',
        previewPath: 'https://apps.apple.com/us/app/side-track/id6755348971',
        embedAllowed: true,
        githubUrl: 'https://github.com/reuben-roy/side-track',
        links: [
            { label: 'App Store', href: 'https://apps.apple.com/app/side-track/id6755348971' },
            { label: 'Release Notes', href: '/side-track' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/side-track' },
        ],
        mermaid: null,
        architectureFallback: null,
        diagrams: [
            {
                label: 'System Architecture',
                chart: `flowchart TB
  subgraph Client["React Native App (Expo)"]
    UI["Screens & Components"]
    CTX["Context Providers"]
    LIB["lib/ — Database, Health, Leaderboard"]
    UI --> CTX --> LIB
  end
  subgraph Local["On-Device Storage"]
    SQLITE[("SQLite — sidetrack_userId.db")]
    LIB --> SQLITE
  end
  subgraph Remote["Supabase Cloud"]
    AUTH["Auth (Google / Apple)"]
    LB[("user_strength table")]
    LIB --> AUTH
    LIB --> LB
  end
  subgraph Platform["Native Platforms"]
    HK["Apple HealthKit (iOS)"]
    HC["Health Connect (Android)"]
    LOC["expo-location"]
    LIB --> HK
    LIB --> HC
    LIB --> LOC
  end`,
            },
            {
                label: 'Context Provider Hierarchy',
                chart: `flowchart TD
  ROOT["RootLayout"] --> SAUTH["SupabaseAuthProvider\nsession · user · databaseReady"]
  SAUTH --> PROT["ProtectedLayout"]
  PROT --> PROF["ProfileProvider\nweight · height · gender · goals"]
  PROF --> CAP["UserCapacityProvider\n1RM limits · Supabase sync"]
  CAP --> SCREENS["Screens: tabs · workout · settings · onboarding"]`,
            },
            {
                label: 'Random Workout Generator',
                chart: `flowchart TD
  A([User taps Randomize]) --> B["Load current muscle capacity from SQLite"]
  B --> C["Filter: skip exercises with any muscle below 30% capacity"]
  C --> D{Any exercises left?}
  D -->|No| E["Fallback: use all exercises"]
  D -->|Yes| F["Use filtered pool"]
  E --> G["Pick random exercise"]
  F --> G
  G --> H["Pick goal: strength / hypertrophy / endurance"]
  H --> I["Calculate target weight as % of user 1RM for goal"]
  I --> J["Snap to nearest available weight on plate list"]
  J --> K["Pick reps in goal rep range"]
  K --> L["Animate slot pickers → WorkoutScreen"]`,
            },
            {
                label: 'Fatigue Engine & Set Logging',
                chart: `flowchart TD
  A([Log Set]) --> B["addWorkoutLog() to workout_logs"]
  B --> C["calculateCapacityDrain() per muscle\ncost = involvement x C0 x pct1RM^p x reps^q x MET\ndrain = 100 x (1 - e^-cost)"]
  C --> D["Subtract drain from muscle_capacity"]
  D --> E["updateCapacityFromWorkout() — re-estimate 1RM"]
  E --> F{Health sync enabled?}
  F -->|Yes| G["Buffer set in session\nflushWorkoutSession() on close/background"]
  F -->|No| H["Done"]
  G --> I["Write aggregated workout to HealthKit"]
  I --> J["Debounced syncStrengthToSupabase()"]
  E --> J
  H --> J`,
            },
            {
                label: '1RM Estimation',
                chart: `flowchart TD
  A([New set logged]) --> B["Run 4 formulas on weight x reps"]
  B --> C["Epley: W x (1 + R/30)"]
  B --> D["Brzycki: W / (1.0278 - 0.0278R)"]
  B --> E["Lombardi: W x R^0.10"]
  B --> F["O'Conner: W x (1 + R/40)"]
  C --> G["Average formulas"]
  D --> G
  E --> G
  F --> G
  G --> H{New estimate > stored 1RM?}
  H -->|Yes| I["saveExerciseLimit()"]
  H -->|No| J["Keep existing"]
  I --> K["Recalculate total_score and wilks_score"]
  J --> K
  K --> L["Debounced upsert to Supabase user_strength"]`,
            },
            {
                label: 'Leaderboard System',
                chart: `flowchart TD
  A([Open Leaderboard]) --> B{Cache valid?}
  B -->|Yes| C["Return cached entries"]
  B -->|No| D["Query Supabase user_strength"]
  D --> E["Apply filters: sort / time / location / score type"]
  E --> F["Sort and display"]
  F --> G["Store in cache with configurable TTL"]
  H([1RM updated locally]) --> I["Wait debounce window (default 5 min)"]
  I --> J["Calculate total_score, wilks_score, weekly_calories"]
  J --> K["Upsert user_strength row"]
  K --> L["invalidateCache()"]`,
            },
            {
                label: 'Local Database Schema',
                chart: `erDiagram
  profile ||--o{ workout_logs : "has"
  profile ||--o{ exercise_limits : "has"
  profile ||--o{ muscle_capacity : "has"
  profile ||--o{ user_preferences : "has"
  profile {
    int id PK
    real weight
    text height
    int calorie_goal
    text gender
  }
  workout_logs {
    int id PK
    text exercise_name
    real weight
    int reps
    text created_at
  }
  exercise_limits {
    int id PK
    text exercise_name
    real one_rm
  }
  muscle_capacity {
    text muscle_name PK
    real capacity
    text updated_at
  }
  user_preferences {
    text key PK
    text value
  }`,
            },
        ],
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
        tagline: 'Native macOS menu bar utility that plays mechanical keyboard sounds via synthesized and sampled sound packs',
        why: [
            'Typing satisfaction shouldn\'t require an expensive mechanical keyboard. Clackinator is a native macOS menu bar utility that plays mechanical-style sounds as you type — with five built-in packs (three synthesized from timbre recipes, two sliced from real recordings) and support for custom packs built from any audio file you provide.',
            'The architecture is a thin SwiftUI shell over ClackinatorCore — all sound logic, key capture, permission handling, and pack rendering live in a shared framework powering both a Homebrew/notarized direct build and an App Store sandbox build. Key events are captured via a listen-only Quartz event tap on the direct build (never modifies events), with automatic fallback to NSEvent monitors if Input Monitoring permission is denied or the tap fails to initialize.',
            'Synthesized packs (Linear, Tactile, Clicky) are procedurally generated from timbre recipes at startup. Sampled packs (Burst, Workbench) slice bundled MP3s. Custom packs import any user-provided audio file and use transient detection to automatically build per-key-class, per-phase PCM buffers stored under Application Support. Volume, active pack, and launch-at-login persist to UserDefaults; the coordinator is a @MainActor ObservableObject that owns the full keyboard source lifecycle.',
        ],
        highlights: [
            'Dual distribution: ClackinatorDirect (Homebrew/notarized) and ClackinatorAppStore share one ClackinatorCore framework',
            'Listen-only Quartz event tap (direct build) — never modifies events; auto-fallback to NSEvent monitors',
            'Synthesized packs (Linear, Tactile, Clicky) generated procedurally from timbre recipes at startup',
            'Sampled packs (Burst, Workbench) and custom pack import with transient detection + PCM buffer slicing',
            'Per-key-class, per-phase AVAudioPlayerNode buffer pools with configurable master volume',
            'CI pipeline: project regen check + tests on every push; manual notarized release + Homebrew cask render',
        ],
        awards: [],
        techStack: ['Swift', 'SwiftUI', 'AVAudioEngine', 'AVAudioPlayerNode', 'Xcode', 'macOS'],
        liveUrl: null,
        previewPath: null,
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/clackinator',
        links: [
            { label: 'GitHub', href: 'https://github.com/reuben-roy/clackinator' },
        ],
        mermaid: null,
        architectureFallback: null,
        diagrams: [
            {
                label: 'High-Level Architecture',
                chart: `flowchart TB
  subgraph Apps["App targets"]
    Direct["ClackinatorDirect\nchannel: .direct"]
    AppStore["ClackinatorAppStore\nchannel: .appStore"]
  end
  subgraph Shell["App shell"]
    Delegate["NSApplicationDelegate"]
    MenuBar["MenuBarExtra + MenuBarContentView"]
    Settings["SettingsWindowController"]
  end
  subgraph Core["ClackinatorCore"]
    Coord["ClackinatorCoordinator"]
    Input["Keyboard event sources"]
    Audio["AudioPlaybackEngine"]
    Catalog["SoundPackCatalog"]
    Perm["KeyboardPermissionManager"]
    Login["LaunchAtLoginManager"]
  end
  Direct --> Delegate
  AppStore --> Delegate
  Delegate --> Coord
  MenuBar --> Coord
  Settings --> Coord
  Coord --> Input
  Coord --> Audio
  Coord --> Catalog
  Coord --> Perm
  Coord --> Login
  Catalog --> Audio`,
            },
            {
                label: 'Keystroke to Sound',
                chart: `flowchart TD
  Start([User types a key]) --> Enabled{isEnabled?}
  Enabled -->|no| End([No sound])
  Enabled -->|yes| Capture["KeyboardEventSource\nglobal + local monitors or event tap"]
  Capture --> Translate["Translate to KeyEvent\nkeyCode, phase, isRepeat, modifiers"]
  Translate --> Handler["ClackinatorCoordinator.handleKeyEvent"]
  Handler --> Play["AudioPlaybackEngine.play"]
  Play --> Classify["KeyClassifier — KeyClass\nstandard, space, return, delete..."]
  Classify --> Sample["SoundPack.randomBuffer\nfor key class + phase"]
  Sample --> Pool["Pick AVAudioPlayerNode slot\nskip repeats when pool is busy"]
  Pool --> Schedule["scheduleBuffer + play\nvolume = masterVolume x pack.gain"]
  Schedule --> End2([Sound heard])`,
            },
            {
                label: 'Keyboard Capture Backends',
                chart: `flowchart TD
  Factory([KeyboardEventSourceFactory.make]) --> Channel{channel.prefersEventTap?}
  Channel -->|"App Store: no"| Monitor["MonitorKeyboardEventSource\nNSEvent global + local monitors"]
  Channel -->|"Direct: yes"| Perm{permissionStatus == .granted?}
  Perm -->|no| Monitor
  Perm -->|yes| Tap["EventTapKeyboardEventSource\nlisten-only CGEvent tap"]
  Tap --> TapOK{tap.start succeeded?}
  TapOK -->|yes| UseTap([Use event tap])
  TapOK -->|no| Monitor
  Monitor --> UseMonitor([Use event monitors])`,
            },
            {
                label: 'Sound Pack Pipeline',
                chart: `flowchart LR
  subgraph BuiltIn["Built-in packs"]
    Synth["SoundSynthesizer\nLinear, Tactile, Clicky"]
    Bundled["Bundled MP3s\nBurst, Workbench"]
  end
  subgraph Custom["Custom packs"]
    Import["NSOpenPanel\nmp3, m4a, wav, aiff"]
    Store["CustomSoundPackStore\nApplication Support"]
    Slice["SampledSoundPackRenderer\ntransient detection + PCM buffers"]
  end
  Library["SoundPackLibrary.all"] --> Catalog["SoundPackCatalog"]
  Synth --> Library
  Bundled --> Library
  Import --> Store --> Slice --> Catalog
  Catalog --> Engine["AudioPlaybackEngine\nreplacePacks / activatePack"]`,
            },
            {
                label: 'Coordinator State Machine',
                chart: `stateDiagram-v2
  [*] --> Idle: init + load UserDefaults
  Idle --> Listening: start() — restartKeyboardEventSource
  Listening --> Listening: permission / pack / enable changes
  Listening --> SettingsOpen: presentSettings()
  SettingsOpen --> Listening: close window
  Listening --> [*]: shutdown() stops event source`,
            },
            {
                label: 'CI & Release Pipeline',
                chart: `flowchart TD
  subgraph CI["CI — push / PR"]
    Checkout --> Gen["generate_xcodeproj.rb"]
    Gen --> Diff["git diff --exit-code\nfail if regen changed project"]
    Diff --> TestDirect["xcodebuild test ClackinatorDirect"]
    TestDirect --> BuildStore["xcodebuild build ClackinatorAppStore (unsigned)"]
  end
  subgraph Release["Direct Release — workflow_dispatch"]
    RCheckout --> RGen["Regenerate project"]
    RGen --> Package["package_direct_release.sh\narchive + sign + notarize"]
    Package --> SHA["SHA256 zip"]
    SHA --> Cask["render_homebrew_cask.rb"]
    Cask --> GHRelease["GitHub release assets"]
  end`,
            },
        ],
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
