// JavaScript for FRES Website Interactions

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinkItems = document.querySelectorAll('.nav-links a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.nav');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Floating elements animation on scroll
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-card, .timeline-item, .instrument-card, .boundary-item, .vision-step');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Timeline items stagger animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Vision steps horizontal scroll interaction
    const visionSteps = document.querySelectorAll('.vision-step');
    const visionScroll = document.querySelector('.vision-scroll');

    if (visionScroll) {
        const visionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remove active class from all steps
                    visionSteps.forEach(step => step.classList.remove('active'));
                    // Add active class to the intersecting step
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: visionScroll,
            threshold: 0.6
        });

        visionSteps.forEach(step => {
            visionObserver.observe(step);
        });
    }

    // Stats counter animation
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / 60; // 60 frames for smooth animation
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '%';
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(currentValue) + '%';
                    }
                }, 16); // ~60fps
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Instrument cards hover effect enhancement
    const instrumentCards = document.querySelectorAll('.instrument-card');
    instrumentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        });
    });

    // About cards stagger hover effect
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            aboutCards.forEach((otherCard, otherIndex) => {
                if (otherIndex !== index) {
                    otherCard.style.transform = 'scale(0.95)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            aboutCards.forEach(otherCard => {
                otherCard.style.transform = 'scale(1)';
                otherCard.style.opacity = '1';
            });
        });
    });

    // Parallax effect for hero section
    const heroContainer = document.querySelector('.hero-container');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroContainer) {
            heroContainer.style.transform = `translateY(${rate}px)`;
        }
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-explore');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary, .btn-secondary, .btn-explore {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add loading animation for the page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Enhanced mobile touch interactions
    function addTouchInteraction(selector, activeClass = 'touch-active') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add(activeClass);
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove(activeClass);
                }, 150);
            });
            
            element.addEventListener('touchcancel', function() {
                this.classList.remove(activeClass);
            });
        });
    }

    // Apply touch interactions to interactive elements
    addTouchInteraction('.about-card');
    addTouchInteraction('.instrument-card');
    addTouchInteraction('.boundary-item');
    addTouchInteraction('.btn-primary, .btn-secondary, .btn-explore');

    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
        // Disable complex animations on mobile for better performance
        const style = document.createElement('style');
        style.textContent = `
            .floating-element {
                animation: none !important;
            }
            
            .pulse-circle {
                animation: none !important;
            }
            
            .touch-active {
                transform: scale(0.95) !important;
                transition: transform 0.1s ease !important;
            }
        `;
        document.head.appendChild(style);

        // Optimize scroll performance
        let ticking = false;
        
        function updateOnScroll() {
            // Simplified scroll effects for mobile
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            ticking = false;
        }
        
        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        }
        
        // Replace the original scroll listener for mobile
        window.removeEventListener('scroll', arguments.callee);
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }

    // Language switching functionality
    const langToggle = document.getElementById('lang-toggle');
    const langEn = document.querySelector('.lang-en');
    const langRu = document.querySelector('.lang-ru');

    if (langToggle && langEn && langRu) {
        // Get saved language or default to English
        const savedLanguage = localStorage.getItem('language') || 'en';
        let currentLanguage = savedLanguage;
        
        function setLanguage(lang) {
            currentLanguage = lang;
            
            // Update active state
            langEn.classList.toggle('active', lang === 'en');
            langRu.classList.toggle('active', lang === 'ru');

            // Update document lang attributes
            document.documentElement.setAttribute('data-lang', lang);
            document.documentElement.setAttribute('lang', lang);

            // Update all elements with data attributes
            const elements = document.querySelectorAll('[data-en], [data-ru]');
            
            elements.forEach(element => {
                const text = element.getAttribute(`data-${lang}`);
                if (text) {
                    // Handle HTML content in data attributes
                    if (text.includes('<')) {
                        element.innerHTML = text;
                    } else {
                        element.textContent = text;
                    }
                }
            });

            // Save language preference
            localStorage.setItem('language', lang);
        }

        // Set initial language
        setLanguage(currentLanguage);

        // Language toggle event listeners
        langEn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLanguage('en');
        });
        
        langRu.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            setLanguage('ru');
        });

        // Also listen on the button itself
        langToggle.addEventListener('click', (e) => {
            e.preventDefault();
            // Toggle between languages when clicking the button
            const newLang = currentLanguage === 'en' ? 'ru' : 'en';
            setLanguage(newLang);
        });
    }

});