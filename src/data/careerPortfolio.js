/** Legacy portfolio entries used on /career only (iframe wall). */
export const careerPortfolio = [
    {
        title: "Explosion.fun Interactive Website",
        overview: [
            "A creative and interactive portfolio website featuring dynamic visual effects and engaging user experiences.",
            "Demonstrates front-end development capabilities, creative coding, and performance-conscious interactions."
        ],
        features: [
            {
                title: "Platform & Architecture",
                items: [
                    "Next.js App Router", "SSR & SSG", "File-based routing", "API Routes", "Automatic code splitting"
                ]
            },
            {
                title: "Performance & Quality",
                items: [
                    "Core Web Vitals optimization", "Bundle optimization", "Lazy loading", "Image optimization", "ESLint & Prettier"
                ]
            },
            {
                title: "UI/UX & Accessibility",
                items: [
                    "Responsive design", "CSS Modules", "Accessible interactions", "Subtle motion/animation", "Creative coding demos"
                ]
            },
            {
                title: "Deployment",
                items: [
                    "Vercel CI/CD", "Edge functions", "Custom domain", "Preview deployments"
                ]
            },
        ],
        url: "https://explosion.fun/"
    },
    {
        title: "Interactive Visualizations",
        overview: [
            "A collection of immersive 3D and data visualizations exploring complex concepts through code.",
            "Demonstrating proficiency in WebGL (Three.js) and Data Visualization (D3.js)."
        ],
        features: [
            {
                title: "Technologies Used",
                items: [
                    "Three.js / React Three Fiber", "D3.js & TopoJSON", "Physics Engine Integration", "SVG Animations", "Performance Optimization"
                ]
            },
        ],
        interactivePreviews: [
            {
                title: "Flight of the Storks",
                url: "/blog/post/interactive/bird-migration",
                height: 500
            },
            {
                title: "3D Solar System",
                url: "/blog/post/interactive/solar-system",
                height: 500
            },
        ]
    },
    {
        title: "Freelance E-Commerce Projects",
        overview: [
            "Built responsive websites for small businesses including Natura Bags and Serah Design, focusing on product showcasing, SEO optimization, and seamless e-commerce functionality."
        ],
        features: [
            {
                title: "Key Features",
                items: [
                    "WooCommerce & WordPress", "Payment gateway integration", "SEO optimization", "Product catalogs", "Responsive design", "Image optimization"
                ]
            },
        ],
        urls: [
            { name: "Natura Bags", url: "https://naturabags.com/" },
            { name: "Serah Design", url: "https://serahdesign.com/" },
        ]
    },
    {
        title: "Kali",
        overview: [
            "Landing page and waitlist for Kali — a fitness platform that treats physical progression like version control."
        ],
        features: [{ title: "Technology Stack", items: ["Go", "Lucide", "Next.js", "PostgreSQL", "React", "SQL", "Tailwind CSS", "TypeScript", "Vercel"] }],
        url: "https://kali.aureole10.com",
        urls: [{ name: "Visit Kali", url: "https://kali.aureole10.com/" }, { name: "GitHub Repository", url: "https://github.com/reuben-roy/kali" }]
    },
    {
        title: "Side-Track",
        overview: [
            "A React Native iOS weight-training app with a random workout picker, muscle-specific fatigue tracking, local leaderboard rankings, and Apple Health integration."
        ],
        features: [{ title: "Technology Stack", items: ["Go", "PostgreSQL", "RAG", "React", "React Native", "SQL", "SQLite", "TypeScript"] }],
        url: "https://apps.apple.com/app/side-track/id6755348971",
        urls: [{ name: "Visit Side-Track", url: "https://apps.apple.com/app/side-track/id6755348971" }, { name: "GitHub Repository", url: "https://github.com/reuben-roy/side-track" }]
    },
    {
        title: "Window",
        overview: [
            "An Android app that watches your screen — tracking app usage, scraping visible UI text, and running on-device Gemini Nano AI to summarize your digital activity."
        ],
        features: [{ title: "Technology Stack", items: ["Gemini", "Go", "Gradle", "Kotlin", "RAG", "SQL", "SQLite"] }],
        urls: [{ name: "GitHub Repository", url: "https://github.com/reuben-roy/window" }]
    },
    {
        title: "Lofty rebuild",
        overview: [
            "A project built with Anthropic, FullCalendar, Go, LLMs, Lucide, Next.js."
        ],
        features: [{ title: "Technology Stack", items: ["Anthropic", "FullCalendar", "Go", "LLMs", "Lucide", "Next.js", "OpenAI", "RAG", "React", "Tailwind CSS", "Turbopack", "TypeScript"] }],
        url: "https://lofty.explosion.fun/",
        urls: [{ name: "Visit Lofty rebuild", url: "https://lofty.explosion.fun/" }, { name: "GitHub Repository", url: "https://github.com/reuben-roy/blistering-barnacles" }]
    },
    {
        title: "Clackinator",
        overview: [
            "A native macOS menu bar utility that plays satisfying mechanical keyboard sounds as you type."
        ],
        features: [{ title: "Technology Stack", items: ["AVAudioEngine", "Swift"] }],
        urls: [{ name: "GitHub Repository", url: "https://github.com/reuben-roy/clackinator" }]
    },
    {
        title: "Ranker",
        overview: [
            "A career exploration and ranking app that maps your skills, interests, and traits against a dynamic hierarchical job database to surface the best-fit roles."
        ],
        features: [{ title: "Technology Stack", items: ["Go", "Lucide", "OAuth", "PostgreSQL", "RAG", "React", "React Native", "SQL", "Tailwind CSS", "TypeScript", "Vite"] }],
        urls: [{ name: "GitHub Repository", url: "https://github.com/reuben-roy/ranker" }]
    },
    {
        title: "Switch-Market",
        overview: [
            "A lightweight, vanilla-JS shopping demo with D3-powered visualizations, real-time search, and CSV sales data integration — hosted on Firebase."
        ],
        features: [{ title: "Technology Stack", items: ["D3.js", "Firebase", "Go", "Java", "JavaScript", "Python"] }],
        urls: [{ name: "GitHub Repository", url: "https://github.com/reuben-roy/switch-market" }]
    },
    {
        title: "Auto Explosion",
        overview: [
            "Personal portfolio, blog, and interactive tools hub built with Next.js — a digital playground for data-driven storytelling."
        ],
        features: [{ title: "Technology Stack", items: ["D3.js", "Firebase", "Go", "GraphQL", "Next.js", "PostHog", "React", "Three.js", "Turbopack", "Vercel", "WordPress"] }],
        url: "https://auto.explosion.fun",
        urls: [{ name: "Visit Auto Explosion", url: "https://auto.explosion.fun" }, { name: "GitHub Repository", url: "https://github.com/reuben-roy/Auto-Explosion" }]
    },
    {
        title: "Job Answer App",
        overview: [
            "A single-page tool that uses Google Gemini to generate tailored job-application answers from your resume and writing rules."
        ],
        features: [{ title: "Technology Stack", items: ["Gemini", "Go", "Java", "JavaScript", "LLMs", "Node.js", "OpenAI", "Vercel"] }],
        url: "https://answers.explosion.fun/",
        urls: [{ name: "Visit Job Answer App", url: "https://answers.explosion.fun/" }, { name: "GitHub Repository", url: "https://github.com/reuben-roy/job-answer-app" }]
    },
];
