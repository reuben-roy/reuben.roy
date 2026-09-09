# Reuben Roy

Software Engineer | AI & Agentic Systems | Generalist creating web solutions

## Links

- Website: https://explosion.fun
- LinkedIn: https://linkedin.com/in/reuben-roy
- GitHub: https://github.com/reuben-roy

## Summary

Software engineer and generalist who builds autonomous, agentic systems on top of production-grade backends. Current focus is applied AI: local-first LLM pipelines, retrieval-augmented answer resolution, and long-running unattended agents that make consequential decisions with explicit confidence gates, verification, and failover rather than optimism. Also builds interactive websites, data visualizations, mobile experiences, and backend microservices at scale. Always learning, always building.

## Education

- Arizona State University (ASU) (2024-2026)
- National Institute of Technology, Calicut (NITC) (2017-2021)

## Skills

- AI and Agentic Systems: LLM orchestration, Local inference (Ollama), Structured JSON output, RAG, Semantic retrieval and embeddings, Confidence gating, Prompt verification, Browser automation agents (Playwright, Patchright, browser-use), Tool-using agents, Autonomous task queues with retry and dead-lettering, OpenRouter, Anthropic, Gemini, Claude Code
- Backend Development: Java, Spring Boot, Python, .NET, Microservices, REST APIs, Maven, JUnit5, Mockito, Unit Testing, Fastify, Go, Kotlin, Node.js, Prisma, REST, GraphQL
- Frontend Development: HTML, CSS, JavaScript, React.js, Three.js, Bootstrap, MUI, D3.js, Next.js, React, React Native, Tailwind CSS, TypeScript, Vite
- Databases: PostgreSQL, Redis, MySQL, SQL, NoSQL, SQLite
- Cloud and Infrastructure: AWS, Google Cloud, Azure, Docker, Heroku, Vercel, Firebase
- Version Control and DevOps: Git, GitHub, BitBucket, GitHub Actions
- Data Science and Analytics: Data Visualization (D3.js, Matplotlib), Data Mining, Data Modeling, Machine Learning, NumPy, Pandas
- Project Management: Agile, Jira/Kanban, Confluence, Postman
- Content Management: WordPress, iText, Poetry
- Development Tools: VS Code, Postman, SonarQube
- Soft Skills: Written Communication, Verbal Communication, Problem Solving, Software Development, Web Development

## Work Experience

### Full-Stack Developer, Tata Consultancy Services (IKEA Client Project)

- Built the microservices powering the IKEA websites, processing millions of transactions annually.
- Primary focus on the Quotation Management initiative: created services to generate quotes, manage revisions and approvals, and automatically notify customers and internal stakeholders about order status updates.
- Also contributed to the 3D "Planner" tool that lets users build their rooms in 3D.
- Worked closely with cross-functional teams in an agile environment, adopting corporate tooling and processes.
- Skills: Java, Spring Boot, Python, REST APIs, Microservices, Maven, Gradle, JUnit5, Mockito, Node.js, Express, OAuth, OIDC, JWT, WebSockets, HTML, CSS, JavaScript, React.js, Bootstrap, PostgreSQL, GCP, Docker, CI/CD, GitHub Actions, ESLint, Prettier, SonarQube, Agile/Scrum, Jira, Confluence, Postman

### Full-Stack Developer, RCKR Software (CPSI/ Trubridge Client Project)

- Developed secure backend systems for the Unify service, following the FHIR specification, allowing hospitals USA wide to exchange information seamlessly, reducing cost of patient care significantly.
- Skills: .NET, REST APIs, Microservices, FHIR, HL7, Mockito, OAuth, JWT, HTML, CSS, JavaScript, PostgreSQL, Redis, SQL, NoSQL, Azure, Docker, CI/CD, Bitbucket Pipelines, SonarQube, Agile/Scrum, Jira, Confluence, Postman, Performance Optimization

## Internships

### ElectroBiosonics, Cochin

- Date: December 2018
- Worked under Dr Cherian for PCB designing using MPLabX and fabrication, electronic equipment assembly, commercial electroplating, transformers and power systems manufacturing, etc.

### Keltron, Thrissur, Kerala

- Date: May 2019
- Worked with Arduino to make connected devices and electronics to understand more about the internet of things.

### Geo-Enterprises, Kerala

- Date: December 2020
- Developed comprehensive e-commerce solutions using the WordPress ecosystem, implementing payment gateways, performance optimization, and digital marketing strategies to drive business growth.
- Skills: WordPress, WooCommerce, Jetpack, Razorpay Integration, Payment Gateways, HTML, CSS, SEO Optimization, Digital Marketing, Google Analytics, Performance Optimization, Security Implementation, SSL/TLS, REST API Integration, Custom Theme Development, Responsive Design, User Experience Design (UX)

## Certifications and Workshops

- [JavaScript Algorithms and Data Structures](https://www.freecodecamp.org/certification/ReubenRoy/javascript-algorithms-and-data-structures) - freeCodeCamp.org
- [Responsive Web Design](https://www.freecodecamp.org/certification/ReubenRoy/responsive-web-design) - freeCodeCamp.org
- [Introduction to Data Science in Python](https://www.coursera.org/account/accomplishments/certificate/PP9R2W2SGRXH) - University of Michigan & Coursera
- [Google AI|Explore ML Workshop](https://drive.google.com/file/d/1-dm9rRxr2olYYuFQeU1J7owzvZSl3wUa/view?usp=sharing) - Google
- Astrophysics Workshop Conductor - NIT Calicut

## Projects

### Auto-Apply — Autonomous Job-Application Agent

- A local-first agentic system that applies to jobs end-to-end while nobody is at the keyboard. Paired with a companion scraping agent (Hermes) that pulls the day's recommended listings from Jobright, it forms a complete unattended pipeline: discover postings → resolve every form question → fill → decide whether to submit → verify → report. Runs overnight on a personal Mac against local models; no cloud inference required.
- Scale: ~21,700 lines of Python across 69 modules, backed by ~9,800 lines of tests (724 tests in 48 modules). Supports Greenhouse, Lever, Ashby, and Workday (multi-step, with per-tenant account creation).
- Core architectural decision: **the model never drives the browser and never decides whether to submit.** It only answers questions. The form's schema is fetched from the ATS's own public API/GraphQL, each field is resolved by a trust order (profile = confidence 1.0 → persistent answer cache = 0.9 → LLM structured JSON = self-reported confidence), Playwright fills it deterministically against stable selectors, and a confidence gate decides submit vs. hand-to-human. Everything except the answers themselves is deterministic code with a number attached.
- Local inference: Ollama running `qwen3.6:35b-a3b` in no-think mode, with `nomic-embed-text` for embeddings. Optional OpenRouter provider for faster/cheaper hosted inference, selectable per run.
- Local RAG / semantic recall: two-tier retrieval over the answer cache — near-duplicates (cosine ≥ 0.85) fill directly, grey-zone paraphrases (≥ 0.55) are retrieved into the prompt as previously approved answers that the model must explicitly claim before they are trusted. Retrieval supplies recall, the model supplies the precision a flat threshold cannot. Knowledge-topic grounding works the same way and requires the model to name the topic it drew from. Embeddings live as blobs in the existing SQLite cache with brute-force cosine — no vector database.
- Self-improvement loop: questions the engine could not answer confidently are parked, deduplicated across jobs with a `times_seen` counter so the highest-leverage questions surface first. Answer one by hand (or from a phone) and it enters the cache permanently, resolving that question and every future paraphrase of it. The system becomes strictly more autonomous with every batch triaged.
- Generated cover letters: two model passes (read posting → write) followed by a **deterministic verifier with no LLM involved** — every company-specific claim must trace to the posting text, any numeral absent from the profile/resume/posting is treated as an invented metric, and clichés or phrasing copied from tone exemplars fail the letter. A failed letter is not attached. Voice is expressed as two independent dials (formality, warmth) over a preset, with a three-letter warm-up that forces human review before any new voice is trusted.
- Tailored resumes: the model never writes a bullet — a resume is a record, so tailoring *selects* from a corpus of pre-written blocks and only the three-line summary is generated (and verified clause-by-clause against the corpus). Ranking is deterministic Python: posting terms weighted by position (title > requirements > body), matched against a lexicon closed to what the corpus actually claims, then greedy *coverage* selection rather than top-N. A monotone ladder drops and re-grows content until the render measures exactly one page. Every render is read back with a PDF text extractor and checked the way an ATS parser would read it — contact details round-trip, section headings present and ordered, date ranges match, every printed bullet findable in the text layer, nothing living only inside a link annotation. A resume that fails is not attached; the static PDF goes instead.
- Reliability and failover (production-quality behaviour, not a demo):
  - **Graceful degradation everywhere.** Unknown ATS falls back to a browser-use agent that fills but never submits. Missing embedding model silently reverts to regex/fuzzy matching. An unreachable or unhelpful model leaves the deterministic keyword ranking standing — tailoring degrades to "keyword-ranked", never to "no resume". A hosted model that rejects strict JSON schema is retried with a looser JSON mode.
  - **Bounded transient retries** on ATS schema fetches, scoped to the status codes where a retry can plausibly change the result.
  - **"Submitted" means verified.** After the click, the resulting page is classified: ATS confirmation → success; verification/CAPTCHA/login wall or validation errors → failed; anything unrecognisable → *unverified*, which is treated as **not submitted**. Deduplication only skips confirmed submits, so unverified work stays retryable — but a retry is forced into human review so a person clicks the final button, which is what prevents duplicate applications.
  - **Durable queue with dead-lettering.** The unattended daemon runs an on-disk SQLite task queue: 3 attempts, exponential backoff from 5 minutes, then a dead-letter queue inspectable and requeueable from the phone.
  - **Never guess a credential.** A rejected Workday password routes to the reset flow, never to a retry loop; an account created but not yet email-verified stays retryable and is never re-signed-up.
  - **Consent escalation.** Background checks, arbitration agreements, drug tests, and credit checks are never agreed to automatically — the run stops and asks, and the answer is remembered per category for every company thereafter.
  - **An issue log as the single place to look.** Every wall — CAPTCHA, email-code gate, closed posting, silent upload failure — is detected, classified blocking/warning/info, and appended with the job URL and a screenshot.
  - **Sleep is a latency cost, never a data-loss event.** The daemon holds a `caffeinate` assertion on AC power and, on battery, lets the Mac sleep while arming an RTC wake every 15 minutes to drain the backlog. The queue is on disk and inbound messages are retained upstream, so nothing is lost either way.
  - **Untrusted input is data, not instructions.** In the phone-controlled mode only one allowlisted chat is obeyed, and only a fixed set of slash commands and URLs on a supported ATS are actionable — free text claiming urgency or authority does nothing.
- Bot-detection posture: every session is driven by Patchright (Playwright with the DevTools-protocol automation leaks removed) against installed Chrome with a persistent profile. That is what allows Workday's noCaptcha-wrapped forms to accept automated submits. A challenge that is actually *shown* is never solved or bypassed — it is handed to the human, who solves it once into the persistent profile.
- Privacy: with the default local provider, resume, profile, and answers never leave the machine. Gmail access for post-submit verification codes uses the single read-only scope; message bodies, codes, and credentials are never written to the audit log.
- Observability: every run — including crashes — writes a row to a structured SQLite run log capturing the posting snapshot, every question and answer with its source and confidence, fill outcome, submit decision, confirmation state, timeline, issues, and screenshots. Searchable from the CLI and exportable to JSON/CSV.
- How it was built, and what was hard: v1 was the obvious thing — a browser-use agent on a local model clicking its way through forms. It was slow, non-reproducible, and worst of all could not tell you whether an application had actually been submitted. The rewrite inverted the design: fetch the form schema from the ATS's own API, let the model answer questions only, and make every other step deterministic. From there the hard problems were mostly about honesty and detection rather than intelligence — distinguishing "clicked submit" from "application received"; invisible reCAPTCHA v3 scoring the automation stack, which forced the move to Patchright and a real Chrome profile; CAPTCHA false-positive classification; email-verification walls appearing *after* submit, solved with read-only Gmail matching on server receive time, trusted sender domains, and the current company/role, with any ambiguity refusing to guess; and a long tail of per-ATS behaviour (Greenhouse's location typeahead, Ashby multiselects that only group by id prefix, forms that must be answered the page's own way rather than the walk's). The recurring principle: when the system is unsure, it must fail loudly into a review queue rather than quietly submit something wrong under a real person's name.
- Technology stack: Python 3.11, Playwright/Patchright, Ollama (qwen3.6, nomic-embed-text), OpenRouter, browser-use, SQLite (7 stores), Typer CLI, Gmail API (read-only OAuth), Telegram Bot API, macOS LaunchAgent, uv, pytest.
- Status: private repository — architecture walkthrough and demo available on request.

### Explosion.fun Interactive Website

- A creative and interactive portfolio website featuring dynamic visual effects and engaging user experiences.
- Demonstrates front-end development capabilities, creative coding, and performance-conscious interactions.
- Highlights: Next.js App Router, SSR and SSG, file-based routing, API routes, automatic code splitting, Core Web Vitals optimization, lazy loading, image optimization, ESLint and Prettier, responsive design, CSS Modules, accessible interactions, creative coding demos, Vercel CI/CD, custom domain, preview deployments.
- Link: https://explosion.fun/

### Interactive Visualizations

- A collection of immersive 3D and data visualizations exploring complex concepts through code.
- Demonstrates proficiency in WebGL (Three.js) and data visualization (D3.js).
- Technologies: Three.js / React Three Fiber, D3.js and TopoJSON, physics engine integration, SVG animations, performance optimization.
- Preview links: /blog/post/interactive/bird-migration, /blog/post/interactive/solar-system

### Freelance E-Commerce Projects

- Built responsive websites for small businesses including Natura Bags and Serah Design, focusing on product showcasing, SEO optimization, and seamless e-commerce functionality.
- Highlights: WooCommerce and WordPress, payment gateway integration, SEO optimization, product catalogs, responsive design, image optimization.
- Links: https://naturabags.com/, https://serahdesign.com/

### Kali

- Landing page and waitlist for Kali, a fitness platform that treats physical progression like version control.
- Technology stack: Go, Lucide, Next.js, PostgreSQL, React, SQL, Tailwind CSS, TypeScript, Vercel.
- Links: https://kali.aureole10.com, https://github.com/reuben-roy/kali

### Side-Track

- A React Native iOS weight-training app with a random workout picker, muscle-specific fatigue tracking, local leaderboard rankings, and Apple Health integration.
- Technology stack: Go, PostgreSQL, RAG, React, React Native, SQL, SQLite, TypeScript.
- Links: https://apps.apple.com/app/side-track/id6755348971, https://github.com/reuben-roy/side-track

### Window

- An Android app that watches your screen, tracking app usage, scraping visible UI text, and running on-device Gemini Nano AI to summarize your digital activity.
- Technology stack: Gemini, Go, Gradle, Kotlin, RAG, SQL, SQLite.
- Link: https://github.com/reuben-roy/window

### Window Extension

- A Chrome extension that turns the browser into a calendar-aware productivity co-pilot: Google Calendar sync, event-specific site whitelisting, distraction blocking during focus sessions, and an OpenClaw-powered assistant for idea capture and evaluation.
- Monorepo with a Manifest V3 extension (popup, options calendar workspace, blocked page, side panel, service worker) and a self-hosted backend (Fastify API, background worker, PostgreSQL) for auth, persistence, and async AI jobs.
- Highlights: declarativeNetRequest blocking with per-event allowlists and keyword fallbacks, timed break/snooze handling, idea outbox with background OpenClaw evaluation, focus analytics and activity session tracking, spaced-repetition learning quiz subsystem, cross-device account sync.
- Technology stack: TypeScript, React, Vite, Chrome Extension Manifest V3, FullCalendar, Fastify, Node.js, Prisma, PostgreSQL, Zod, OpenClaw.
- Link: https://github.com/reuben-roy/window-extension

### blistering-barnacles

- A project built with Anthropic, FullCalendar, Go, LLMs, Lucide, and Next.js.
- Technology stack: Anthropic, FullCalendar, Go, LLMs, Lucide, Next.js, OpenAI, RAG, React, Tailwind CSS, Turbopack, TypeScript.
- Links: http://lofty.explosion.fun/, https://github.com/reuben-roy/blistering-barnacles

### Clackinator

- A native macOS menu bar utility that plays satisfying mechanical keyboard sounds as you type.
- Technology stack: AVAudioEngine, Swift.
- Link: https://github.com/reuben-roy/clackinator

### Ranker

- A career exploration and ranking app that maps your skills, interests, and traits against a dynamic hierarchical job database to surface the best-fit roles.
- Technology stack: Go, Lucide, OAuth, PostgreSQL, RAG, React, React Native, SQL, Tailwind CSS, TypeScript, Vite.
- Link: https://github.com/reuben-roy/ranker

### Switch-Market

- A lightweight, vanilla-JS shopping demo with D3-powered visualizations, real-time search, and CSV sales data integration hosted on Firebase.
- Technology stack: D3.js, Firebase, Go, Java, JavaScript, Python.
- Link: https://github.com/reuben-roy/switch-market

### Auto Explosion

- Personal portfolio, blog, and interactive tools hub built with Next.js, a digital playground for data-driven storytelling.
- Technology stack: D3.js, Firebase, Go, GraphQL, Next.js, PostHog, React, Three.js, Turbopack, Vercel, WordPress.
- Links: https://auto.explosion.fun, https://github.com/reuben-roy/Auto-Explosion

### Job Answer App

- A single-page tool that uses Google Gemini to generate tailored job-application answers from your resume and writing rules.
- Technology stack: Gemini, Go, Java, JavaScript, LLMs, Node.js, OpenAI, Vercel.
- Links: https://answers.explosion.fun, https://github.com/reuben-roy/job-answer-app
