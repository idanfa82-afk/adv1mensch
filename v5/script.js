const totalQuestions = 6;
let currentStep = 0;

function nextStep(stepNumber) {
    // Hide current step
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    
    // Show progress bar if moving from welcome screen
    if (currentStep === 0) {
        document.getElementById('progress-container').style.display = 'block';
    }

    // Update current step
    currentStep = stepNumber;

    // Show next step
    document.getElementById(`step-${currentStep}`).classList.add('active');

    // Update progress bar
    const progressPercentage = ((currentStep - 1) / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
}

function analyzeResults() {
    // Hide question 6
    document.getElementById('step-6').classList.remove('active');
    
    // Max progress bar
    document.getElementById('progress-bar').style.width = '100%';
    
    // Show analyzing screen
    document.getElementById('step-analyzing').classList.add('active');

    const analyzingText = document.getElementById('analyzing-text');
    
    // Fake loading sequence
    setTimeout(() => {
        analyzingText.textContent = "Matching your profile...";
    }, 1200);

    setTimeout(() => {
        analyzingText.textContent = "Generating custom offer...";
    }, 2400);

    setTimeout(() => {
        // Hide analyzing, show result
        document.getElementById('step-analyzing').classList.remove('active');
        document.getElementById('step-result').classList.add('active');
        
        // Hide progress bar on result page
        document.getElementById('progress-container').style.display = 'none';
        
        // Try to fire Facebook Lead/Quiz Complete event if fbq is loaded
        if (typeof fbq === 'function') {
            fbq('track', 'Lead', { content_name: 'Quiz_Completed' });
        }
    }, 3600);
}

// UTM Forwarding Logic for the final CTA button
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = window.location.search;
    if (urlParams) {
        const finalCta = document.getElementById('final-cta');
        if (finalCta) {
            try {
                const linkUrl = new URL(finalCta.href);
                const currentParams = new URLSearchParams(urlParams);
                for (const [key, value] of currentParams.entries()) {
                    linkUrl.searchParams.set(key, value);
                }
                finalCta.href = linkUrl.toString();
            } catch (e) {
                console.error('Error parsing URL for UTMs', e);
            }
        }
    }
});
