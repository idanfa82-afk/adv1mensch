// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it has become visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        // Add a slight stagger effect based on the DOM order if needed
        el.style.transitionDelay = `${(index % 3) * 0.1}s`;
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
