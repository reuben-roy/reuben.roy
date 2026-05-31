export const PROJECTS = [
    {
        id: 'explosion-fun',
        title: 'explosion.fun',
        tagline: 'Personal blog, portfolio, and interactive tools hub',
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
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/explosion.fun',
        links: [
            { label: 'Live site', href: 'https://explosion.fun/' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/explosion.fun' },
        ],
        mermaid: null,
        architectureFallback: null,
    },
    {
        id: 'time-management',
        title: 'Time Management Analysis',
        tagline: '31 days of screen-time analytics',
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
        previewPath: '/projects/time-management',
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
        previewPath: '/projects/youtube-scholar',
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
        tagline: 'LLM-powered scheduling rebuild',
        why: [
            'Exploring how LLMs and modern calendar UX can work together for smarter personal planning.',
            'Built with Anthropic, FullCalendar, and a Go backend.'
        ],
        highlights: [
            'LLM-assisted scheduling',
            'FullCalendar integration',
            'Go backend API'
        ],
        awards: [],
        techStack: ['Next.js', 'Go', 'Anthropic', 'OpenAI', 'FullCalendar', 'TypeScript', 'Tailwind CSS'],
        liveUrl: 'https://lofty.explosion.fun/',
        previewPath: null,
        embedAllowed: false,
        githubUrl: 'https://github.com/reuben-roy/blistering-barnacles',
        links: [
            { label: 'Live demo', href: 'https://lofty.explosion.fun/' },
            { label: 'GitHub', href: 'https://github.com/reuben-roy/blistering-barnacles' },
        ],
        mermaid: null,
        architectureFallback: null,
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
        embedAllowed: false,
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
        embedAllowed: false,
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
        embedAllowed: false,
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
