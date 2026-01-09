import { useEffect } from 'react'

const HOME_TITLE = 'AI Pools | AI-Driven Pool Design & Construction'

const HOME_STYLES = `
:root {
    --bg: #ffffff;
    --surface: #f4f5f7;
    --surface-strong: #eef0f3;
    --ink: #101218;
    --muted: #5f6773;
    --line: #e4e7ec;
    --accent: #111111;
    --accent-strong: #0a0a0a;
    --card: #ffffff;
    --radius-lg: 24px;
    --radius-md: 16px;
    --shadow-soft: 0 12px 24px rgba(15, 23, 42, 0.08);
    --shadow-strong: 0 24px 40px rgba(15, 23, 42, 0.12);
    --transition: all 0.25s ease;
    --font-body: 'Manrope', sans-serif;
    --font-display: 'Space Grotesk', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-body);
    color: var(--ink);
    background-color: var(--bg);
    line-height: 1.65;
    overflow-x: hidden;
}

img {
    max-width: 196%;
    display: block;
}

a {
    text-decoration: none;
    color: inherit;
}

.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

/* ==================== BUTTONS ==================== */
.btn-filled,
.btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 22px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.95rem;
    border: 1px solid transparent;
    transition: var(--transition);
    cursor: pointer;
}

.btn-filled {
    background-color: var(--accent);
    color: #ffffff;
}

.btn-outline {
    background-color: #ffffff;
    color: var(--accent);
    border-color: var(--accent);
}

.btn-filled:hover,
.btn-outline:hover {
    transform: translateY(-2px);
}

.btn-large {
    padding: 12px 28px;
    font-size: 1rem;
}

/* ==================== HEADER ==================== */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #ffffff;
    border-bottom: 1px solid var(--line);
    transition: var(--transition);
}

.header.scrolled {
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 0;
    gap: 16px;
}

.logo {
    font-family: Manrope;
    font-size: 22px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 22px;
}

.nav-link {
    font-size: 0.9rem;
    color: var(--muted);
    font-weight: 500;
    position: relative;
}

.nav-link:hover,
.nav-link.active {
    color: var(--ink);
}

.nav-link.active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 2px;
    background-color: var(--ink);
    border-radius: 999px;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
}

.menu-toggle span {
    width: 24px;
    height: 2px;
    background-color: var(--ink);
    transition: var(--transition);
    display: block;
}

.menu-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
    opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
}

/* ==================== BACK TO TOP BUTTON ==================== */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;
    border-radius: 999px;
    background-color: #111111;
    color: #ffffff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: var(--transition);
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.back-to-top:hover {
    transform: translateY(-4px);
}

.back-to-top.scrolling-up i {
    animation: bounce-up 0.7s ease infinite;
}

@keyframes bounce-up {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

/* ==================== HERO SECTION ==================== */
.hero {
    padding: 140px 0 90px;
    position: relative;
    background-color: #ffffff;
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top, rgba(15, 23, 42, 0.04), transparent 60%);
    pointer-events: none;
}

.hero-content {
    text-align: center;
    max-width: 780px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    border: 1px solid var(--line);
    padding: 6px 16px;
    border-radius: 999px;
    background-color: #ffffff;
    margin-bottom: 18px;
}

.hero-title {
    font-family: Manrope;
    font-size: 3rem;
    line-height: 1.1;
    margin-bottom: 18px;
}

.hero-subtitle {
    font-size: 1rem;
    color: var(--muted);
    margin-bottom: 16px;
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 10px;
}

.hero-media {
    margin-top: 48px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
}

// .media-card {
//     border-radius: 20px;
//     overflow: hidden;
//     box-shadow: var(--shadow-strong);
//     background-color: var(--surface-strong);
//     height: 280px;
// }

// .media-card img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// }

/* ==================== SECTION HEADERS ==================== */
.section-header {
    margin-bottom: 48px;
}

.section-header.split {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
}

.section-header.center {
    text-align: center;
}

.section-header.center .section-subtitle {
    margin-left: auto;
    margin-right: auto;
}

.section-kicker {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--muted);
    display: inline-block;
    margin-bottom: 12px;
}

.section-title {
    font-family: Manrope;
    font-size: 2.4rem;
    line-height: 1.2;
    margin-bottom: 12px;
}

.section-subtitle {
    color: var(--muted);
    max-width: 520px;
}

/* ==================== FEATURES SECTION ==================== */
.features {
    padding: 90px 0;
    background-color: #ffffff;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
}

.feature-card {
    background-color: #ffffff;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 22px;
    min-height: 220px;
    transition: var(--transition);
}

.feature-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-soft);
}

.feature-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background-color: var(--surface);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 18px;
}

.feature-icon img {
    width: 24px;
    height: 24px;
    object-fit: contain;
}

.feature-title {
    font-family: Manrope;
    font-size: 1.05rem;
    margin-bottom: 8px;
}

.feature-text {
    color: var(--muted);
    font-size: 0.95rem;
}

/* ==================== WORKFLOW SECTION ==================== */
.workflow {
    padding: 100px 0;
    background-color: var(--surface);
}

.workflow-layout {
    display: flex;
    gap: 50px;
    align-items: center;
}

.workflow-canvas {
    position: relative;
    flex: 1;
    min-height: 520px;
}

.workflow-card {
    position: absolute;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow-strong);
    background-color: #ffffff;
}

.workflow-card.primary {
    width: 62%;
    height: 52%;
    left: 0;
    top: 0;
}

.workflow-card.secondary {
    width: 62%;
    height: 38%;
    left: 0;
    bottom: 0;
}

.workflow-card.blueprint {
    width: 42%;
    height: 64%;
    right: 0;
    top: 18%;
    background-color: #1e3a5f;
}

.workflow-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.workflow-tag {
    position: absolute;
    padding: 6px 12px;
    border-radius: 999px;
    background-color: #ffffff;
    border: 1px solid var(--line);
    font-size: 0.75rem;
    color: var(--ink);
    box-shadow: var(--shadow-soft);
}

.workflow-tag.tag-1 {
    top: 10%;
    left: 6%;
}

.workflow-tag.tag-2 {
    top: 45%;
    left: 10%;
}

.workflow-tag.tag-3 {
    bottom: 16%;
    left: 12%;
}

.workflow-tag.tag-4 {
    top: 38%;
    right: 8%;
}

.workflow-steps {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.step-card {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 16px 18px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background-color: #ffffff;
    box-shadow: var(--shadow-soft);
}

.step-number {
    font-family: Manrope;
    font-weight: 600;
    color: var(--muted);
    min-width: 32px;
}

.step-content h4 {
    font-family: Manrope;
    font-size: 1.05rem;
    margin-bottom: 6px;
}

.step-content p {
    color: var(--muted);
    font-size: 0.92rem;
}

/* ==================== EXPERTISE SECTION ==================== */
.expertise {
    padding: 90px 0;
    background-color: #ffffff;
}

.expertise-panel {
    position: relative;
    border-radius: 26px;
    overflow: hidden;
    min-height: 360px;
    display: flex;
    align-items: center;
}

.expertise-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.expertise-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(9, 15, 24, 0.92) 0%, rgba(9, 15, 24, 0.65) 45%, rgba(9, 15, 24, 0.25) 100%);
}

.expertise-content {
    position: relative;
    padding: 48px;
    max-width: 520px;
    color: #ffffff;
}

.expertise-content .section-title {
    color: #ffffff;
}

.expertise-content .section-kicker {
    color: rgba(255, 255, 255, 0.7);
}

.expertise-list {
    list-style: none;
    margin-top: 24px;
    display: grid;
    gap: 10px;
}

.expertise-list li {
    display: flex;
    gap: 12px;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.85);
}

.expertise-list span {
    font-weight: 700;
    color: #ffffff;
}

/* ==================== TESTIMONIALS SECTION ==================== */
.testimonials {
    padding: 90px 0;
    background-color: var(--surface);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
}

.testimonial-card {
    background-color: #ffffff;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 22px;
    box-shadow: var(--shadow-soft);
}

.testimonial-text {
    color: var(--muted);
    font-size: 0.95rem;
    margin-bottom: 18px;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
}

.author-image {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
}

.author-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.author-name {
    font-weight: 600;
}

.author-role {
    font-size: 0.85rem;
    color: var(--muted);
}

/* ==================== CTA SECTION ==================== */
.cta {
    padding: 90px 0;
    background-color: #ffffff;
}

.cta-panel {
    position: relative;
    border-radius: 26px;
    overflow: hidden;
    text-align: center;
    color: #ffffff;
    padding: 70px 40px;
    background-color: #0b0f16;
}

.cta-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.35;
}

.cta-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(8, 12, 18, 0.35) 0%, rgba(8, 12, 18, 0.75) 100%);
}

.cta-content {
    position: relative;
    max-width: 720px;
    margin: 0 auto;
}

.cta .section-title,
.cta .section-subtitle {
    color: #ffffff;
}

.cta-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
    flex-wrap: wrap;
}

.cta .btn-filled {
    background-color: #ffffff;
    color: #111111;
}

.cta .btn-outline {
    background-color: transparent;
    color: #ffffff;
    border-color: #ffffff;
}

/* ==================== FOOTER ==================== */
.footer {
    background-color: #0b0f16;
    color: #ffffff;
    padding: 70px 0 30px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 40px;
}

.footer-logo {
    font-family: Manrope;
    font-size: 20px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.footer-text {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 20px;
    max-width: 320px;
}

.footer-title {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin-bottom: 14px;
    color: rgba(255, 255, 255, 0.6);
}

.footer-link {
    display: block;
    color: rgba(255, 255, 255, 0.75);
    margin-bottom: 10px;
    font-size: 0.9rem;
    transition: var(--transition);
}

.footer-link:hover {
    color: #ffffff;
}

.footer-bottom {
    margin-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
}

.copyright {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
}

.footer-links {
    display: flex;
    gap: 16px;
}

/* ==================== ANIMATIONS ==================== */
.fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-up.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ==================== RESPONSIVE STYLES ==================== */
@media (max-width: 1024px) {
    .features-grid,
    .testimonials-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .workflow-layout {
        gap: 36px;
    }
}

@media (max-width: 900px) {
    .section-header.split {
        flex-direction: column;
        align-items: flex-start;
    }

    .hero-media {
        grid-template-columns: 1fr;
    }

    .workflow-layout {
        flex-direction: column;
    }

    .workflow-canvas {
        width: 100%;
        min-height: 480px;
    }
}

@media (max-width: 768px) {
    .menu-toggle {
        display: flex;
    }

    .nav-menu {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        height: 100vh;
        background-color: #ffffff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: var(--transition);
        z-index: 1000;
        box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
        gap: 20px;
    }

    .nav-menu.active {
        right: 0;
    }

    .hero {
        padding: 120px 0 70px;
    }

    .hero-title {
        font-size: 2.4rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .features-grid,
    .testimonials-grid {
        grid-template-columns: 1fr;
    }

    .footer-content {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 600px) {
    .hero-title {
        font-size: 2.1rem;
    }

    .hero-buttons {
        flex-direction: column;
    }

    .media-card {
        height: 220px;
    }

    .workflow-canvas {
        min-height: 420px;
    }

    .expertise-content {
        padding: 32px;
    }
}

@media (max-width: 480px) {
    .hero-title {
        font-size: 1.9rem;
    }

    .section-title {
        font-size: 1.7rem;
    }

    .cta-panel {
        padding: 50px 24px;
    }

    .back-to-top {
        bottom: 20px;
        right: 20px;
    }
}
`

const HOME_HTML = `
    <!-- Header / Navigation -->
    <header class="header">
        <div class="container">
            <nav class="navbar">
                <a href="/" class="logo">AI POOLS</a>

                <div class="nav-menu" id="navMenu">
                    <a href="/" class="nav-link active">Home</a>
                    <a href="#" class="nav-link">About Us</a>
                    <a href="#" class="nav-link">Our Work Process</a>
                    <a href="#" class="btn-outline">See Builder Features</a>
                    <a href="/login" class="btn-filled" id="homeLoginLink">Login</a>
                </div>

                <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content fade-up">
                <span class="hero-badge">AI POOLS PLATFORM</span>
                <h1 class="hero-title">AI-Driven Design. Precision Project Management. World-Class Results.</h1>
                <p class="hero-subtitle">A fully autonomous pool-builder platform that generates and qualifies leads, cultivates sales, manages construction, orchestrates subcontractors, executes quality control, and supports homeowners long after the build is complete.</p>
                <p class="hero-subtitle">Our AI pool builder platform streamlines the entire pool creation journey, from initial design and lead qualification to construction management and customer support. Every project is optimized for efficiency, cost accuracy, and premium quality.</p>

                <div class="hero-buttons">
                    <a href="#" class="btn-filled btn-large">Request Early Access</a>
                    <a href="#" class="btn-outline btn-large">See How It Works</a>
                </div>
            </div>

            <div class="hero-media fade-up">
              
                    <img src="img1.png" alt="Luxury swimming pool">
                
                
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <div class="section-header split fade-up">
                <div>
                    <span class="section-kicker">AI POOLS FEATURES</span>
                    <h2 class="section-title">Transform Your Pool Business With AI</h2>
                </div>
                <p class="section-subtitle">As a pool builder, managing multiple crews and client expectations is complex. Our platform orchestrates the entire lifecycle so you can deliver consistent, premium builds.</p>
            </div>

            <div class="features-grid">
                <div class="feature-card fade-up">
                    <div class="feature-icon">
                        <img src="i1.png" alt="Lead generation icon">
                    </div>
                    <h3 class="feature-title">Lead Generation + Lead Qualification</h3>
                    <p class="feature-text">Attract and score high-intent homeowners automatically with AI-driven intake.</p>
                </div>

                <div class="feature-card fade-up">
                    <div class="feature-icon">
                        <img src="i2.png" alt="Sales automation icon">
                    </div>
                    <h3 class="feature-title">Intelligent Sales Automation</h3>
                    <p class="feature-text">Nurture leads, follow up, and move prospects through the pipeline without delays.</p>
                </div>

                <div class="feature-card fade-up">
                    <div class="feature-icon">
                        <img src="i3.png" alt="Project scheduling icon">
                    </div>
                    <h3 class="feature-title">AI Project Scheduling + Build Management</h3>
                    <p class="feature-text">Align crews, permits, and inspections with real-time scheduling intelligence.</p>
                </div>

                <div class="feature-card fade-up">
                    <div class="feature-icon">
                        <img src="i4.png" alt="Subcontractor icon">
                    </div>
                    <h3 class="feature-title">Subcontractor Orchestration</h3>
                    <p class="feature-text">Assign, notify, and coordinate subcontractors with automated workflows.</p>
                </div>

                <div class="feature-card fade-up">
                    <div class="feature-icon">
                        <img src="i5.png" alt="Quality assurance icon">
                    </div>
                    <h3 class="feature-title">Quality Assurance Engine</h3>
                    <p class="feature-text">Keep builds on spec with automated inspections, checklists, and QA alerts.</p>
                </div>

                <div class="feature-card fade-up">
                    <div class="feature-icon">
                        <img src="i6.png" alt="Homeowner communication icon">
                    </div>
                    <h3 class="feature-title">Homeowner Communication Automation</h3>
                    <p class="feature-text">Send updates, approvals, and progress reports without manual follow-up.</p>
                </div>

                <div class="feature-card fade-up">
                    <div class="feature-icon">
                        <img src="i7.png" alt="Warranty icon">
                    </div>
                    <h3 class="feature-title">Warranty + Troubleshooting</h3>
                    <p class="feature-text">Post-build support keeps homeowners happy and protects your reputation.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Workflow Section -->
    <section class="workflow">
        <div class="container">
            <div class="section-header split fade-up">
                <div>
                    <span class="section-kicker">AI POOLS WORKFLOW</span>
                    <h2 class="section-title">A Smarter, Faster, More Profitable Pool-Building Workflow</h2>
                </div>
                <p class="section-subtitle">Capture, design, build, and support in one continuous AI-driven flow that eliminates bottlenecks.</p>
            </div>

            <div class="workflow-layout">
                <div class="workflow-canvas fade-up">
                    <div class="workflow-card primary">
                        <img src="img2.png" alt="Pool overview">
                    </div>
                    <div class="workflow-card secondary">
                        <img src="img1.png" alt="Finished pool">
                    </div>
                    <div class="workflow-card blueprint">
                        <img src="img4.png" alt="Engineering plan">
                    </div>
                    <div class="workflow-tag tag-1">Fast lead capture</div>
                    <div class="workflow-tag tag-2">Live schedule updates</div>
                    <div class="workflow-tag tag-3">Post-build support</div>
                    <div class="workflow-tag tag-4">AI design review</div>
                </div>

                <div class="workflow-steps fade-up">
                    <div class="step-card">
                        <div class="step-number">01</div>
                        <div class="step-content">
                            <h4>Capture Opportunities</h4>
                            <p>AI captures homeowner intent and qualifies opportunities in real time.</p>
                        </div>
                    </div>

                    <div class="step-card">
                        <div class="step-number">02</div>
                        <div class="step-content">
                            <h4>Win the Sale</h4>
                            <p>Generate AI-assisted proposals, pricing, and timelines instantly.</p>
                        </div>
                    </div>

                    <div class="step-card">
                        <div class="step-number">03</div>
                        <div class="step-content">
                            <h4>Build With Engineering Precision</h4>
                            <p>Scheduling, permits, and inspections are managed with zero manual coordination.</p>
                        </div>
                    </div>

                    <div class="step-card">
                        <div class="step-number">04</div>
                        <div class="step-content">
                            <h4>Deliver Superior Quality</h4>
                            <p>Quality checkpoints keep every build aligned to design intent and safety.</p>
                        </div>
                    </div>

                    <div class="step-card">
                        <div class="step-number">05</div>
                        <div class="step-content">
                            <h4>Reduce Warranty Burden</h4>
                            <p>Automated follow-ups and service workflows protect long-term satisfaction.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Expertise Section -->
    <section class="expertise">
        <div class="container">
            <div class="expertise-panel fade-up">
                <img class="expertise-bg" src="img3.png" alt="Pool engineering visualization">
                <div class="expertise-overlay"></div>
                <div class="expertise-content">
                    <span class="section-kicker">AI POOLS SYSTEM</span>
                    <h2 class="section-title">Engineering, Project Management, and Real Pool-Building Expertise Combined</h2>
                    <ul class="expertise-list">
                        <li><span>01.</span> DFMEA and PFMEA methodologies</li>
                        <li><span>02.</span> Control plans and risk scoring</li>
                        <li><span>03.</span> Predictive scheduling</li>
                        <li><span>04.</span> Subcontractor performance analytics</li>
                        <li><span>05.</span> RAG and CoRA expert knowledge models</li>
                        <li><span>06.</span> Best-practice pool builder methodology based on real-world data</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div class="container">
            <div class="section-header center fade-up">
                <span class="section-kicker">Testimonials</span>
                <h2 class="section-title">What our clients say</h2>
                <p class="section-subtitle">Builders across the country use AI Pools to simplify operations and increase margins.</p>
            </div>

            <div class="testimonials-grid">
                <div class="testimonial-card fade-up">
                    <p class="testimonial-text">We closed 5x more pool contracts in the first month. The system runs the entire business.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Rodriguez">
                        </div>
                        <div>
                            <div class="author-name">Michael Rodriguez</div>
                            <div class="author-role">Pool Builder, Texas</div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-card fade-up">
                    <p class="testimonial-text">AI Pools transformed our lead pipeline. The quality of leads is unreal.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Chen">
                        </div>
                        <div>
                            <div class="author-name">Sarah Chen</div>
                            <div class="author-role">Pool Contractor, California</div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-card fade-up">
                    <p class="testimonial-text">We reduced overhead by 40 percent while delivering more projects per quarter.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="David Wilson">
                        </div>
                        <div>
                            <div class="author-name">David Wilson</div>
                            <div class="author-role">General Contractor, Florida</div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-card fade-up">
                    <p class="testimonial-text">The automated scheduling alone saved our team hours every week.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Emily Carter">
                        </div>
                        <div>
                            <div class="author-name">Emily Carter</div>
                            <div class="author-role">Construction Ops, Arizona</div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-card fade-up">
                    <p class="testimonial-text">Our homeowners now receive consistent updates without extra work from staff.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="https://randomuser.me/api/portraits/men/18.jpg" alt="Luis Gomez">
                        </div>
                        <div>
                            <div class="author-name">Luis Gomez</div>
                            <div class="author-role">Build Manager, Nevada</div>
                        </div>
                    </div>
                </div>

                <div class="testimonial-card fade-up">
                    <p class="testimonial-text">Our close rate improved immediately once we adopted AI Pools proposals.</p>
                    <div class="testimonial-author">
                        <div class="author-image">
                            <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Natalie Brooks">
                        </div>
                        <div>
                            <div class="author-name">Natalie Brooks</div>
                            <div class="author-role">Owner, Georgia</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="container">
            <div class="cta-panel fade-up">
                <img class="cta-bg" src="img4.png" alt="Blueprint background">
                <div class="cta-overlay"></div>
                <div class="cta-content">
                    <h2 class="section-title">Become One of the First Builders to Use AI as Your Competitive Advantage</h2>
                    <p class="section-subtitle">Join the AI Pools network to secure early access, premium leads, and an automated build engine.</p>
                    <div class="cta-buttons">
                        <a href="#" class="btn-filled btn-large">Request Early Access</a>
                        <a href="#" class="btn-outline btn-large">Talk With Our Team</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-column">
                    <div class="footer-logo">AI POOLS</div>
                    <p class="footer-text">Smarter builds through AI-powered design, scheduling, and quality control.</p>
                    <span class="footer-link">hello@aipools.com</span>
                    <span class="footer-link">+1 (512) 555-0199</span>
                    <span class="footer-link">Austin, TX</span>
                </div>

                <div class="footer-column">
                    <h3 class="footer-title">Smarter Builds Through AI</h3>
                    <a href="#" class="footer-link">Smart Design & Drawing Interpretation</a>
                    <a href="#" class="footer-link">Automated Material and Costing</a>
                    <a href="#" class="footer-link">Subcontractor Communication</a>
                    <a href="#" class="footer-link">Quality Control & Real-Time Insights</a>
                </div>

                <div class="footer-column">
                    <h3 class="footer-title">Solutions</h3>
                    <a href="#" class="footer-link">Smart Subcontractor Coordination</a>
                    <a href="#" class="footer-link">Clear Customer Communication</a>
                    <a href="#" class="footer-link">Automated Leads & Sales</a>
                    <a href="#" class="footer-link">AI Drawing Interpretation</a>
                    <a href="#" class="footer-link">Instant Costing & Quotes</a>
                </div>
            </div>

            <div class="footer-bottom">
                <p class="copyright">Copyright &copy; 2026 - AI Pools. All rights reserved.</p>
                <div class="footer-links">
                    <a href="#" class="footer-link">Instagram</a>
                    <a href="#" class="footer-link">Facebook</a>
                    <a href="#" class="footer-link">Youtube</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="backToTop" aria-label="Back to top">
        <i class="fas fa-chevron-up"></i>
    </button>
`

const HomePage = ({ onLogin }) => {
  useEffect(() => {
    const previousTitle = document.title
    document.title = HOME_TITLE

    const links = []
    const addLink = (attrs) => {
      const link = document.createElement('link')
      Object.entries(attrs).forEach(([key, value]) => {
        link[key] = value
      })
      document.head.appendChild(link)
      links.push(link)
    }

    addLink({ rel: 'preconnect', href: 'https://fonts.googleapis.com' })
    addLink({ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' })
    addLink({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
    })
    addLink({
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    })

    return () => {
      links.forEach((link) => link.remove())
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    const menuToggle = document.getElementById('menuToggle')
    const navMenu = document.getElementById('navMenu')
    const header = document.querySelector('.header')
    const backToTopBtn = document.getElementById('backToTop')
    const loginLink = document.getElementById('homeLoginLink')

    const closeMenu = () => {
      if (!navMenu || !menuToggle) {
        return
      }
      navMenu.classList.remove('active')
      menuToggle.classList.remove('active')
      document.body.style.overflow = ''
    }

    const toggleMenu = () => {
      if (!navMenu || !menuToggle) {
        return
      }
      navMenu.classList.toggle('active')
      menuToggle.classList.toggle('active')
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : ''
    }

    const handleDocumentClick = (event) => {
      if (!navMenu || !menuToggle) {
        return
      }
      const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target)
      if (!isClickInsideNav && navMenu.classList.contains('active')) {
        closeMenu()
      }
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape' && navMenu?.classList.contains('active')) {
        closeMenu()
      }
    }

    let lastScrollTop = 0

    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
        }
      }

      if (!backToTopBtn) {
        return
      }

      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible')
        if (!backToTopBtn.classList.contains('has-pulsed')) {
          backToTopBtn.classList.add('pulse')
          backToTopBtn.classList.add('has-pulsed')
          setTimeout(() => {
            backToTopBtn.classList.remove('pulse')
          }, 3000)
        }
      } else {
        backToTopBtn.classList.remove('visible')
        backToTopBtn.classList.remove('pulse')
      }

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop
      if (currentScroll > lastScrollTop) {
        backToTopBtn.classList.remove('scrolling-up')
      } else if (currentScroll > 300) {
        backToTopBtn.classList.add('scrolling-up')
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll
    }

    const handleBackToTop = (event) => {
      event.preventDefault()
      backToTopBtn?.classList.add('scrolling-up')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        backToTopBtn?.classList.remove('scrolling-up')
      }, 1000)
    }

    const handleAnchorClick = (event) => {
      const targetId = event.currentTarget.getAttribute('href')
      if (!targetId || targetId === '#') {
        return
      }
      const targetElement = document.querySelector(targetId)
      if (!targetElement) {
        return
      }
      event.preventDefault()
      window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' })
    }

    const handleNewsletterClick = () => {
      const input = document.querySelector('.newsletter-input')
      if (!input) {
        return
      }
      const email = input.value.trim()
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      if (email && isValidEmail) {
        alert('Thank you for subscribing to our newsletter!')
        input.value = ''
      } else {
        alert('Please enter a valid email address.')
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu()
      }
    }

    const handleLoginClick = (event) => {
      if (!onLogin) {
        return
      }
      event.preventDefault()
      onLogin()
    }

    const navLinks = document.querySelectorAll('.nav-link, .btn-outline, .btn-filled')
    navLinks.forEach((link) => link.addEventListener('click', closeMenu))
    menuToggle?.addEventListener('click', toggleMenu)
    document.addEventListener('click', handleDocumentClick)
    document.addEventListener('keydown', handleKeydown)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    backToTopBtn?.addEventListener('click', handleBackToTop)
    loginLink?.addEventListener('click', handleLoginClick)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    )

    const fadeElements = document.querySelectorAll('.fade-up')
    fadeElements.forEach((el) => observer.observe(el))

    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    anchorLinks.forEach((link) => link.addEventListener('click', handleAnchorClick))

    const newsletterBtn = document.querySelector('.newsletter-btn')
    newsletterBtn?.addEventListener('click', handleNewsletterClick)

    handleScroll()

    return () => {
      navLinks.forEach((link) => link.removeEventListener('click', closeMenu))
      menuToggle?.removeEventListener('click', toggleMenu)
      document.removeEventListener('click', handleDocumentClick)
      document.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      backToTopBtn?.removeEventListener('click', handleBackToTop)
      loginLink?.removeEventListener('click', handleLoginClick)
      anchorLinks.forEach((link) => link.removeEventListener('click', handleAnchorClick))
      newsletterBtn?.removeEventListener('click', handleNewsletterClick)
      observer.disconnect()
      document.body.style.overflow = ''
    }
  }, [onLogin])

  return (
    <div>
      <style>{HOME_STYLES}</style>
      <div dangerouslySetInnerHTML={{ __html: HOME_HTML }} />
    </div>
  )
}

export default HomePage
