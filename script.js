/**
 * RATHTALA M.D. VIDYANIKETAN - JavaScript
 * Features: Scroll blur effect, Intersection Observer animations, Mobile navigation
 */

// Prevent browser from restoring scroll position on reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroBg = document.getElementById('heroBg');
    const revealElements = document.querySelectorAll('.reveal');

    // ========================================
    // Hero Background Blur on Scroll
    // ========================================
    const handleHeroBlur = () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;
        const blurAmount = Math.min((scrollY / heroHeight) * 15, 15);

        if (heroBg) {
            heroBg.style.filter = `blur(${blurAmount}px)`;
        }
    };

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const handleNavbarScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    // ========================================
    // Mobile Navigation Toggle
    // ========================================
    const toggleMobileNav = () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    const closeMobileNav = () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event Listeners for Navigation
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // ========================================
    // Intersection Observer for Reveal Animations
    // ========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ========================================
    // Smooth Scroll for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Scroll Event Listener (Throttled)
    // ========================================
    let ticking = false;

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleHeroBlur();
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial calls
    handleNavbarScroll();
    handleHeroBlur();

    // ========================================
    // Active Navigation Link Highlight
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    const highlightNavOnScroll = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

    console.log('RATHTALA M.D. VIDYANIKETAN - Website Loaded Successfully');
});
