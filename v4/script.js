document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Set current date dynamically in header
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // 2. Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });



    // 4. UTM Parameter Forwarding for ad tracking
    // This script takes any UTMs from the URL (e.g. ?utm_source=fb) and appends them
    // to all links pointing to trymensch.com
    const urlParams = window.location.search;
    if (urlParams) {
        const links = document.querySelectorAll('a[href*="trymensch.com"]');
        links.forEach(link => {
            try {
                const linkUrl = new URL(link.href);
                // Parse current params
                const currentParams = new URLSearchParams(urlParams);
                // Append them to the link
                for (const [key, value] of currentParams.entries()) {
                    linkUrl.searchParams.set(key, value);
                }
                link.href = linkUrl.toString();
            } catch (e) {
                console.error('Error parsing URL for UTMs', e);
            }
        });
    }
});
