import { useEffect } from 'react'

const HOME_TITLE = 'AI Pools | AI-Driven Pool Design & Construction'

const HOME_STYLES = `
        /* ==================== CSS RESET & VARIABLES ==================== */
        :root {
            --bg-white: #ffffff;
            --menu: #747474;
            --active-menu: #000;
            --bg-light: #f6f7f9;
            --primary-black: #000;
            --primary-blue: #0b5ed7;
            --deep-navy: #0f172a;
            --aqua-blue: #1ecbe1;
            --text-dark: #1f2933;
            --text-light: #6b7280;
            --body-bg: #FAFAFA;
            --border-radius: 12px;
            --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            color: var(--text-dark);
            background-color: var(--body-bg);
            line-height: 1.6;
            overflow-x: hidden;
        }

        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* ==================== TYPOGRAPHY ==================== */
        h1, h2, h3, h4 {
            font-weight: 700;
            line-height: 1.2;
            color: var(--deep-navy);
        }

        p {
            color: var(--text-light);
            margin-bottom: 1rem;
        }

        /* ==================== BUTTONS ==================== */
        .btn-filled, .btn-outline {
            display: inline-block;
            padding: 12px 28px;
            border-radius: 50px;
            font-weight: 600;
            text-decoration: none;
            transition: var(--transition);
            cursor: pointer;
            border: 2px solid transparent;
            text-align: center;
            font-size: 16px;
        }

        .btn-filled {
            background-color: var(--primary-black);
            color: white;
        }

        .btn-filled:hover {
            background-color: #000000;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(11, 94, 215, 0.2);
        }

        .btn-outline {
            background-color: white;
            color: var(--primary-black);
            border-color: var(--primary-black);
        }

        .btn-outline:hover {
            background-color: rgba(11, 94, 215, 0.05);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(11, 94, 215, 0.1);
        }

        .btn-large {
            padding: 15px 35px;
            font-size: 18px;
        }

        /* ==================== HEADER ==================== */
        .header {
            box-shadow: 0 1px 42px 0 rgba(0, 0, 0, 0.05);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background-color: var(--bg-white);
            padding: 20px 0;
            transition: var(--transition);
        }

        .header.scrolled {
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
            padding: 15px 0;
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
        }

        .logo {
            font-size: 28px;
            font-weight: 700;
            color: var(--deep-navy);
            text-decoration: none;
            letter-spacing: -0.5px;
            z-index: 1001;
        }

        .nav-menu {
            display: flex;
            align-items: center;
            gap: 30px;
        }

        .nav-link {
            color: var(--menu);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
            position: relative;
        }

        .nav-link:hover {
            color: var(--primary-black);
        }

        .nav-link.active {
            color: var(--primary-black);
        }

        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-black);
        }

        .menu-toggle {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 1001;
            padding: 5px;
        }

        .menu-toggle span {
            width: 25px;
            height: 3px;
            background-color: var(--text-dark);
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
            transform: rotate(-45deg) translate(7px, -6px);
        }

        /* ==================== BACK TO TOP BUTTON ==================== */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary-black), var(--deep-navy));
            color: white;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            cursor: pointer;
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .back-to-top:hover {
            background: linear-gradient(135deg, var(--deep-navy), var(--primary-black));
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
        }

        .back-to-top:active {
            transform: translateY(-2px) scale(0.98);
        }

        .back-to-top::after {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--aqua-blue), var(--primary-blue));
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .back-to-top:hover::after {
            opacity: 0.3;
        }

        .back-to-top i {
            transition: all 0.3s ease;
        }

        .back-to-top:hover i {
            transform: translateY(-3px);
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

        @keyframes pulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(30, 203, 225, 0.4);
            }
            70% {
                transform: scale(1.05);
                box-shadow: 0 0 0 10px rgba(30, 203, 225, 0);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(30, 203, 225, 0);
            }
        }

        .back-to-top.pulse {
            animation: pulse 2s infinite;
        }

        /* ==================== HERO SECTION ==================== */
        .hero {
            padding: 160px 0 100px;
            background-color: var(--bg-white);
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 60%;
            height: 100%;
            background-color: var(--bg-light);
            border-radius: 0 0 0 100px;
            z-index: 0;
        }

        .hero-content {
            position: relative;
            z-index: 1;
            max-width: 600px;
        }

        .hero-title {
            font-size: 3.2rem;
            margin-bottom: 1.5rem;
        }

        .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }

        .hero-buttons {
            display: flex;
            gap: 15px;
        }

        .hero-images {
            position: absolute;
            right: 5%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
        }

        .image-card {
            width: 450px;
            height: 320px;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--box-shadow);
        }

        .image-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: var(--transition);
        }

        /* ==================== FEATURES SECTION ==================== */
        .features {
            padding: 100px 0;
            background-color: var(--bg-light);
        }

        .section-header {
            text-align: center;
            max-width: 700px;
            margin: 0 auto 60px;
        }

        .section-title {
            font-size: 2.8rem;
            margin-bottom: 1rem;
        }

        .section-subtitle {
            font-size: 1.1rem;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }

        .feature-card {
            background-color: var(--bg-white);
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            transition: var(--transition);
        }

        .feature-card:hover {
            transform: translateY(-10px);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: rgba(11, 94, 215, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            font-size: 24px;
            color: var(--primary-blue);
        }

        .feature-title {
            font-size: 1.3rem;
            margin-bottom: 15px;
        }

        /* ==================== WORKFLOW SECTION ==================== */
        .workflow {
            padding: 100px 0;
            background-color: var(--bg-white);
        }

        .workflow-content {
            display: flex;
            align-items: center;
            gap: 50px;
        }

        .workflow-images {
            flex: 1;
        }

        .workflow-images img {
            width: 100%;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            transition: var(--transition);
        }

        .workflow-steps {
            flex: 1;
        }

        .step-item {
            display: flex;
            gap: 20px;
            margin-bottom: 25px;
        }

        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--primary-blue);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            flex-shrink: 0;
        }

        .step-content h4 {
            margin-bottom: 8px;
        }

        /* ==================== TESTIMONIALS SECTION ==================== */
        .testimonials {
            padding: 100px 0;
            background-color: var(--bg-light);
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }

        .testimonial-card {
            background-color: var(--bg-white);
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            position: relative;
        }

        .testimonial-card::before {
            content: '\"';
            position: absolute;
            top: 20px;
            left: 20px;
            font-size: 70px;
            color: rgba(11, 94, 215, 0.1);
            font-family: serif;
            line-height: 1;
        }

        .testimonial-text {
            margin-top: 20px;
            margin-bottom: 20px;
            font-style: italic;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .author-image {
            width: 50px;
            height: 50px;
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
            font-size: 0.9rem;
            color: var(--text-light);
        }

        /* ==================== CTA SECTION ==================== */
        .cta {
            padding: 100px 0;
            background-color: var(--deep-navy);
            color: white;
            text-align: center;
        }

        .cta .section-title,
        .cta .section-subtitle {
            color: white;
        }

        .cta-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 30px;
        }

        /* ==================== FOOTER ==================== */
        .footer {
            background-color: var(--deep-navy);
            color: white;
            padding: 70px 0 30px;
        }

        .footer-content {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 50px;
        }

        .footer-logo {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .footer-text {
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 20px;
        }

        .footer-title {
            font-size: 18px;
            margin-bottom: 20px;
            position: relative;
            padding-bottom: 10px;
        }

        .footer-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background-color: var(--aqua-blue);
        }

        .footer-link {
            display: block;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            margin-bottom: 12px;
            transition: var(--transition);
        }

        .footer-link:hover {
            color: white;
            transform: translateX(5px);
        }

        .newsletter {
            margin-top: 15px;
            display: flex;
        }

        .newsletter-input {
            flex: 1;
            padding: 10px 15px;
            border-radius: 4px 0 0 4px;
            border: none;
            outline: none;
        }

        .newsletter-input::placeholder {
            color: var(--text-light);
        }

        .newsletter-btn {
            background-color: var(--aqua-blue);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
            transition: var(--transition);
        }

        .newsletter-btn:hover {
            background-color: var(--primary-blue);
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .copyright {
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.9rem;
        }

        .footer-links {
            display: flex;
            gap: 25px;
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

        .image-zoom img:hover {
            transform: scale(1.05);
        }

        /* ==================== RESPONSIVE STYLES ==================== */
        @media (max-width: 1024px) {
            .features-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .testimonials-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .footer-content {
                grid-template-columns: repeat(2, 1fr);
            }

            .hero-title {
                font-size: 2.8rem;
            }

            .section-title {
                font-size: 2.4rem;
            }
        }

        @media (max-width: 900px) {
            .hero::before {
                display: none;
            }

            .hero {
                padding: 140px 0 80px;
            }

            .hero-content {
                max-width: 100%;
                text-align: center;
            }

            .hero-buttons {
                justify-content: center;
            }

            .hero-images {
                position: static;
                transform: none;
                margin-top: 40px;
                display: flex;
                justify-content: center;
            }

            .image-card {
                width: 100%;
                max-width: 500px;
            }

            .workflow-content {
                flex-direction: column;
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
                background-color: var(--bg-white);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                transition: var(--transition);
                z-index: 1000;
                box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
                gap: 25px;
            }

            .nav-menu.active {
                right: 0;
            }

            .features-grid,
            .testimonials-grid {
                grid-template-columns: 1fr;
            }

            .footer-content {
                grid-template-columns: 1fr;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }

            .hero-title {
                font-size: 2.4rem;
            }

            .section-title {
                font-size: 2.2rem;
            }
        }

        @media (max-width: 480px) {
            .hero-buttons,
            .cta-buttons {
                flex-direction: column;
            }

            .btn-filled,
            .btn-outline {
                width: 100%;
            }

            .hero-title {
                font-size: 2rem;
            }

            .section-title {
                font-size: 1.8rem;
            }

            .image-card {
                height: 250px;
            }

            .feature-card {
                padding: 20px;
            }

            .testimonial-card {
                padding: 20px;
            }

            .testimonial-text {
                margin-top: 10px;
            }

            .workflow-images {
                margin-bottom: 30px;
            }

            .step-item {
                gap: 15px;
            }

            .step-number {
                width: 35px;
                height: 35px;
            }

            .footer-links {
                flex-direction: column;
                gap: 10px;
            }

            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                font-size: 18px;
            }
        }

        @media (max-width: 360px) {
            .hero {
                padding: 120px 0 60px;
            }

            .hero-title {
                font-size: 1.8rem;
            }

            .hero-subtitle {
                font-size: 1rem;
            }

            .image-card {
                height: 220px;
            }

            .feature-card,
            .testimonial-card {
                padding: 18px;
            }

            .feature-title {
                font-size: 1.2rem;
            }

            .newsletter {
                flex-direction: column;
            }

            .newsletter-input,
            .newsletter-btn {
                width: 100%;
                border-radius: 4px;
            }

            .newsletter-btn {
                margin-top: 10px;
            }

            .back-to-top {
                width: 45px;
                height: 45px;
                font-size: 16px;
            }
        }

        .section-title, .section-subtitle {
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .display-flex-section {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .feature-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }

        .feature-title {
            text-align: center;
        }

        .feature-text {
            text-align: center;
        }

        .feature-icon {
            margin-left: auto;
            margin-right: auto;
        }

        .hero-content {
            max-width: 660px;
        }

        .hero-title {
            margin-bottom: 20px;
            font-size: 3rem;
            line-height: 1.3;
        }

        .hero-subtitle {
            font-size: 1.05rem;
            margin-bottom: 20px;
            line-height: 1.6;
            color: var(--text-dark);
        }

        .hero-subtitle:last-of-type {
            margin-bottom: 30px;
        }

        .hero-buttons {
            gap: 20px;
        }

        .hero-buttons .btn-filled {
            background-color: #000;
            color: #fff;
        }

        .hero-buttons .btn-outline {
            border-color: #000;
            color: #000;
        }

        .hero-buttons .btn-filled:hover,
        .hero-buttons .btn-outline:hover {
            transform: translateY(-2px);
        }

        .features-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
        }

        .feature-card {
            padding: 30px 25px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: #000;
            margin-bottom: 20px;
        }

        .feature-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .feature-text {
            font-size: 0.95rem;
            color: #555;
        }

        .workflow-content {
            display: flex;
            gap: 40px;
            align-items: center;
        }

        .workflow-images img {
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .workflow-steps {
            flex: 1;
        }

        .step-item {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
        }

        .step-number {
            width: 35px;
            height: 35px;
            background-color: #000;
            color: #fff;
            font-weight: bold;
        }

        .step-content h4 {
            margin-bottom: 5px;
            font-size: 1.1rem;
        }

        .step-content p {
            font-size: 0.95rem;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
        }

        .testimonial-card {
            padding: 25px;
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .testimonial-text {
            font-style: italic;
            font-size: 0.95rem;
            color: #555;
        }

        .author-name {
            font-weight: bold;
            font-size: 1rem;
        }

        .author-role {
            font-size: 0.85rem;
            color: #777;
        }

        .cta {
            padding: 80px 0;
            background-color: #000;
            color: #fff;
        }

        .cta .section-title, .cta .section-subtitle {
            color: #fff;
        }

        .cta-buttons {
            margin-top: 25px;
            gap: 15px;
        }

        .cta .btn-filled {
            background-color: #fff;
            color: #000;
        }

        .cta .btn-outline {
            border-color: #fff;
            color: #fff;
        }

        .footer {
            background-color: #000;
            color: #fff;
        }

        .footer-text {
            color: rgba(255, 255, 255, 0.7);
        }

        .footer-link {
            color: rgba(255, 255, 255, 0.7);
        }

        .footer-link:hover {
            color: #fff;
        }

        .copyright {
            color: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 1024px) {
            .features-grid, .testimonials-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 768px) {
            .features-grid, .testimonials-grid {
                grid-template-columns: 1fr;
            }
        }

        .hero {
            position: relative;
            background: linear-gradient(to right, #ffffff, #f7f7f7);
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 60%;
            height: 100%;
            background-image: url("img3.png");
            background-size: cover;
            background-position: center;
            opacity: 0.12;
            z-index: 0;
        }

        .hero-content,
        .hero-buttons,
        .hero-title,
        .hero-subtitle {
            position: relative;
            z-index: 2;
        }

        .hero-images {
            position: absolute;
            right: 5%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 3;
        }

        .image-card img {
            border-radius: 12px;
        }

        .workflow {
            background-color: #f7f7f7;
        }

        .workflow::before {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("img4.png");
            background-size: cover;
            background-position: center;
            opacity: 0.04;
            z-index: 0;
        }

        .workflow-content {
            position: relative;
            z-index: 1;
        }

        @media (max-width: 768px) {
            .hero::before {
                display: none;
            }
            .hero-images {
                position: static;
                transform: none;
                margin-top: 30px;
            }
            .workflow::before {
                display: none;
            }
        }

        @media (max-width: 600px) {
            .hero-title {
                font-size: 2rem;
            }
            .hero-subtitle {
                font-size: 1rem;
            }
            .image-card {
                width: 100%;
                height: auto;
            }
        }

        .features {
            background-color: #ffffff;
        }

        .workflow {
            background-color: #ffffff;
            position: relative;
        }

        .features .section-header,
        .workflow .section-header,
        .testimonials .section-header,
        .cta .section-header {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-title {
            font-size: 2.6rem;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .section-subtitle {
            font-size: 1.1rem;
            color: #555;
        }

        .feature-card,
        .testimonial-card {
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
        }

        .workflow-images img {
            width: 100%;
            border-radius: 12px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
        }

        .step-number {
            background-color: #111;
            font-size: 1rem;
        }

        .cta {
            background-color: #111;
        }

        .cta .btn-filled {
            background-color: white;
            color: #111;
        }

        .cta .btn-outline {
            border-color: white;
            color: white;
        }

        .footer {
            background-color: #111;
        }

        .footer-link:hover {
            color: #1ecbe1;
        }

        .footer-title::after {
            background-color: #1ecbe1;
        }

        .newsletter-btn {
            background-color: #1ecbe1;
        }

        .newsletter-btn:hover {
            background-color: #0b5ed7;
        }

        .hero-images {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .hero-images .image-card:first-child {
            margin-bottom: 0;
        }

        @media (max-width: 900px) {
            .hero-images {
                position: static;
                transform: none;
                margin-top: 40px;
                align-items: center;
            }
        }

        .cta-content {
            max-width: 700px;
            margin: 0 auto;
            text-align: center;
        }

        .testimonial-card::before {
            content: "\"";
        }

        .hero-subtitle {
            color: #444;
        }

        .hero-buttons .btn-filled {
            background-color: #111;
        }

        .hero-buttons .btn-outline {
            border-color: #111;
            color: #111;
        }

        .features {
            padding: 90px 0;
        }

        .workflow {
            padding: 90px 0;
        }

        .testimonials {
            padding: 90px 0;
        }

        .cta {
            padding: 80px 0;
        }

        .footer {
            padding-top: 60px;
        }

        .navbar {
            gap: 10px;
        }

        .logo {
            font-size: 26px;
        }

        .hero-title {
            font-weight: 800;
        }

        .feature-icon {
            font-weight: bold;
        }

        .step-content p {
            color: #444;
        }

        .testimonial-text {
            color: #444;
        }

        .testimonial-card::before {
            color: rgba(0, 0, 0, 0.08);
        }

        .footer-links {
            gap: 15px;
        }

        .footer-link {
            font-size: 0.95rem;
        }

        .newsletter-input {
            font-size: 0.9rem;
        }

        .newsletter-btn {
            font-size: 0.9rem;
        }

        .feature-text {
            line-height: 1.6;
        }

        .step-content h4 {
            font-size: 1.1rem;
        }

        .testimonial-card {
            text-align: left;
        }

        .author-name {
            margin-bottom: 3px;
        }

        .section-header {
            padding: 0 20px;
        }

        .testimonial-card .testimonial-author {
            margin-top: 15px;
        }

        .hero-buttons .btn-filled,
        .hero-buttons .btn-outline {
            min-width: 180px;
        }

        .cta-buttons .btn-filled,
        .cta-buttons .btn-outline {
            min-width: 200px;
        }

        .feature-card {
            min-height: 300px;
        }

        .features-grid {
            align-items: stretch;
        }

        .nav-link {
            font-size: 0.95rem;
        }

        .nav-link.active::after {
            bottom: -6px;
        }

        .image-card img {
            object-fit: cover;
        }

        .workflow-images {
            max-width: 500px;
        }

        .workflow-images img {
            width: 100%;
        }

        .hero-images .image-card {
            width: 420px;
            height: 280px;
        }

        @media (max-width: 1024px) {
            .hero-images .image-card {
                width: 360px;
                height: 240px;
            }
        }

        @media (max-width: 768px) {
            .hero-images .image-card {
                width: 100%;
                height: auto;
            }
        }

        .feature-card img {
            width: 100px;
            height: auto;
            margin-bottom: 20px;
        }

        .features-grid .feature-card:nth-child(1) img {
            width: 100px;
        }

        .features-grid .feature-card:nth-child(2) img,
        .features-grid .feature-card:nth-child(3) img,
        .features-grid .feature-card:nth-child(4) img,
        .features-grid .feature-card:nth-child(5) img,
        .features-grid .feature-card:nth-child(6) img,
        .features-grid .feature-card:nth-child(7) img {
            width: 100px;
        }

        .workflow-images img {
            width: 100%;
            max-width: 500px;
        }

        @media (max-width: 768px) {
            .workflow-images img {
                max-width: 100%;
            }
        }

        .testimonial-card .author-image img {
            width: 100%;
            height: auto;
        }

        @media (max-width: 600px) {
            .feature-card img {
                width: 80px;
            }
        }

        @media (max-width: 480px) {
            .feature-card {
                padding: 16px 0;
            }

            .feature-card img {
                width: 70px;
            }

            .feature-title {
                font-size: 1rem;
            }

            .feature-text {
                font-size: 0.85rem;
            }

            .section-title {
                font-size: 1.6rem;
            }

            .section-subtitle {
                font-size: 0.9rem;
            }

            .hero-title {
                font-size: 1.8rem;
            }

            .hero-subtitle {
                font-size: 0.9rem;
            }

            .btn-filled, .btn-outline {
                font-size: 0.9rem;
            }

            .workflow-images img {
                max-width: 100%;
            }

            .testimonials-grid {
                gap: 20px;
            }

            .testimonial-card {
                padding: 20px;
            }

            .author-name {
                font-size: 0.9rem;
            }

            .author-role {
                font-size: 0.8rem;
            }

            .step-number {
                width: 30px;
                height: 30px;
                font-size: 0.8rem;
            }

            .step-content h4 {
                font-size: 1rem;
            }

            .step-content p {
                font-size: 0.85rem;
            }

            .cta-buttons .btn-filled, .cta-buttons .btn-outline {
                font-size: 0.9rem;
            }

            .footer-title {
                font-size: 1rem;
            }

            .footer-link {
                font-size: 0.85rem;
            }

            .newsletter-input {
                font-size: 0.8rem;
            }

            .newsletter-btn {
                font-size: 0.8rem;
            }

            .footer-bottom {
                flex-direction: column;
                gap: 10px;
            }

            .copyright {
                font-size: 0.8rem;
            }

            .footer-links {
                flex-direction: column;
                gap: 10px;
            }

            .back-to-top {
                width: 45px;
                height: 45px;
            }

            .back-to-top i {
                font-size: 0.8rem;
            }

            .hero-buttons {
                flex-direction: column;
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
                <h1 class="hero-title">AI-Driven Design. Precision Project Management. World-Class Results.</h1>
                <p class="hero-subtitle">A fully autonomous pool-builder platform that generates and qualifies leads, cultivates sales, manages construction, orchestrates subcontractors, executes quality control, and supports homeowners long after the build is complete. Completely autonomous.
</p>
  <p class="hero-subtitle">
    Our pool builder platform  leverages artificial intelligence to streamline the entire pool creation journey&mdash;from initial design and lead qualification to construction management and customer support. With intelligent automation, we ensure seamless coordination between sales teams, contractors, and homeowners. Every project is optimized for efficiency, cost accuracy, and premium quality, delivering a smooth, end-to-end experience with minimal manual intervention.
  </p>

                <div class="hero-buttons">
                    <a href="#" class="btn-filled btn-large">Request Early Access</a>
                    <a href="#" class="btn-outline btn-large">See How It Works</a>
                </div>
            </div>

            <div class="hero-images fade-up">
                <div class="image-card image-zoom">
                    <img src="img1.png" alt="Luxury Swimming Pool">
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features">
        <div class="container">
            <div class="section-header fade-up display-flex-section">
                <h2 class="section-title">Automated Projects. High-Value Leads. Superior Results.</h2>
                <p class="section-subtitle">This is more than software. It's a fully managed pool-builder business system. 
You bring the vision&mdash;we run the engine. Our AI builds entire workflows, qualifies leads, and drives build execution.
</p>
            </div>

            <div class="features-grid">
                <div class="feature-card fade-up">
                    <img src="i1.png" alt="Luxury Swimming Pool">
                    <h3 class="feature-title">AI-Driven Lead Generation</h3>
                    <p class="feature-text">Attract pre-qualified homeowners actively seeking pool construction. Our AI scores each lead and hands you high-intent clients.</p>
                </div>

                <div class="feature-card fade-up">
                   <img src="i2.png" alt="Luxury Swimming Pool">
                    <h3 class="feature-title">Autonomous Project Management</h3>
                    <p class="feature-text">Manage multiple builds at once. The platform automatically schedules crews, timelines, inspections, and payments without manual coordination.</p>
                </div>

                <div class="feature-card fade-up">
                     <img src="i3.png" alt="Luxury Swimming Pool">
                    <h3 class="feature-title">AI Design & Engineering</h3>
                    <p class="feature-text">Generate beautiful custom pool designs in seconds. Client preferences and property constraints are handled automatically.</p>
                </div>

                <div class="feature-card fade-up">
                      <img src="i4.png" alt="Luxury Swimming Pool">
                    <h3 class="feature-title">Instant Bids & Costing</h3>
                    <p class="feature-text">Accurate pricing and bids generated instantly using material data, vendor pricing, and labor cost algorithms.</p>
                </div>

                <div class="feature-card fade-up">
                   <img src="i5.png" alt="Luxury Swimming Pool">
                    <h3 class="feature-title">Subcontractor Automation</h3>
                    <p class="feature-text">Assign, notify, and manage subcontractors through smart automation. No phone calls needed.</p>
                </div>

                <div class="feature-card fade-up">
                     <img src="i6.png" alt="Luxury Swimming Pool">
                    <h3 class="feature-title">Post-Install Client Support</h3>
                    <p class="feature-text">AI-powered customer care continues after completion&mdash;automated maintenance reminders, service scheduling, and satisfaction tracking.</p>
                </div>

                <div class="feature-card fade-up">
                       <img src="i7.png" alt="Luxury Swimming Pool">
                    <h3 class="feature-title">Fully Scalable Platform</h3>
                    <p class="feature-text">Run your entire pool-building business like a franchise operation. Scale into new cities with confidence.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Workflow Section -->
    <section class="workflow">
        <div class="container">
            <div class="section-header fade-up">
                <h2 class="section-title">How It Works: Fully Autonomous Pool Construction</h2>
                <p class="section-subtitle">From inquiry to completed pool, every step is automated by AI.</p>
            </div>

            <div class="workflow-content">
                <div class="workflow-images fade-up">
                        <div class="image-zoom">
                            <img src="img2.png" alt="Pool Construction">
                        </div>
                </div>

                <div class="workflow-steps fade-up">
                    <div class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <h4>Lead Intake & Qualification</h4>
                            <p>AI captures homeowner interest and filters only high-intent leads for immediate follow-up.</p>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <h4>Design & Cost Proposal</h4>
                            <p>Homeowners receive a full design + cost breakdown instantly, generated by AI.</p>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <h4>Build Management</h4>
                            <p>Schedules, permits, subcontractors, and inspections are all assigned and tracked automatically.</p>
                        </div>
                    </div>

                    <div class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <h4>Completion & Support</h4>
                            <p>After install, AI handles post-build support, service, and follow-up to increase referrals.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div class="container">
            <div class="section-header fade-up">
                <h2 class="section-title">Built by AI. Trusted by Builders.</h2>
                <p class="section-subtitle">Here's what industry experts and early adopters are saying about AI Pools.</p>
            </div>

            <div class="testimonials-grid">
                <div class="testimonial-card fade-up">
                    <p class="testimonial-text">&ldquo;We closed 5x more pool contracts in the first month. The system literally runs the entire business.&rdquo;</p>
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
                    <p class="testimonial-text">&ldquo;AI Pools transformed our lead pipeline. The quality of leads is unbelievable.&rdquo;</p>
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
                    <p class="testimonial-text">&ldquo;I've never seen a platform automate this much. We reduced overhead by 40%.&rdquo;</p>
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
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
        <div class="container">
            <div class="cta-content fade-up">
                <h2 class="section-title">Want to Dominate the Pool Industry?</h2>
                <p class="section-subtitle">Join the first AI-driven pool builder network and scale your business without scaling your stress.</p>
                <div class="cta-buttons">
                    <a href="#" class="btn-filled btn-large">Request Early Access</a>
                    <a href="#" class="btn-outline btn-large">Talk With Our Team</a>
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
                    <p class="footer-text">The world's first fully autonomous pool builder platform.</p>
                    <div class="newsletter">
                        <input type="email" class="newsletter-input" placeholder="Your email address">
                        <button class="newsletter-btn">Subscribe</button>
                    </div>
                </div>

                <div class="footer-column">
                    <h3 class="footer-title">Company</h3>
                    <a href="#" class="footer-link">About Us</a>
                    <a href="#" class="footer-link">Careers</a>
                    <a href="#" class="footer-link">Contact</a>
                    <a href="#" class="footer-link">Support</a>
                    <a href="#" class="footer-link">Privacy Policy</a>
                </div>

               <div class="footer-column">
                    <h3 class="footer-title">Smarter Builds Through AI</h3>
                    <a href="#" class="footer-link">Smart Design & Drawing Interpretation</a>
                    <a href="#" class="footer-link">Automated Material, Cost </a>
                    <a href="#" class="footer-link">Subcontractor Communication</a>
                    <a href="#" class="footer-link">Intelligent Subcontractor Coordination</a>
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
                <p class="copyright">Copyright &copy; 2026 - Findit by aipools. All rights reserved.</p>
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
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
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
