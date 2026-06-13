document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        observer.observe(el);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // Floating CTA visibility toggle
    const floatingCta = document.getElementById('floating-cta');
    const heroButton = document.querySelector('.hero .cta-button');
    
    if (floatingCta && heroButton) {
        window.addEventListener('scroll', () => {
            const heroButtonRect = heroButton.getBoundingClientRect();
            // Show floating button when the hero button is scrolled out of view
            if (heroButtonRect.top < 0) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
        
        // Trigger once on load in case the user loads halfway down the page
        window.dispatchEvent(new Event('scroll'));
    }

    // UTM Parameter Forwarding for ad tracking
    const urlParams = window.location.search;
    if (urlParams) {
        const ctaButtons = document.querySelectorAll('a[href*="trymensch.com/products/mensch-v7"]');
        ctaButtons.forEach(button => {
            const currentHref = button.getAttribute('href');
            if (currentHref.includes('?')) {
                button.setAttribute('href', currentHref + '&' + urlParams.substring(1));
            } else {
                button.setAttribute('href', currentHref + urlParams);
            }
        });
    }
});
