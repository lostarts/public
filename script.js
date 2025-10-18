// Enhanced scroll reveal functionality with bidirectional page inversion
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const headline = document.querySelector('.headline');
    const body = document.body;
    const fadeTexts = document.querySelectorAll('.fade-text');
    
    // Page inversion observer - handles both directions
    const inversionOptions = {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
    };
    
    const inversionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Headline is back in viewport, remove inversion (back to black)
                body.classList.remove('inverted');
            } else {
                // Headline has left the viewport, trigger inversion (to white)
                body.classList.add('inverted');
            }
        });
    }, inversionOptions);
    
    // Content reveal observer
    const contentOptions = {
        threshold: 0.15,
        rootMargin: '-50px 0px -50px 0px'
    };
    
    const contentObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: hide content when scrolling back up
                // entry.target.classList.remove('visible');
            }
        });
    }, contentOptions);
    
    // Observe headline for bidirectional page inversion
    if (headline) {
        inversionObserver.observe(headline);
    }
    
    
    // Observe text for content reveal
    fadeTexts.forEach(text => {
        contentObserver.observe(text);
    });
});
