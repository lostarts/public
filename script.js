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
    
    // Interactive text functionality with image display
    const interactiveTexts = document.querySelectorAll('.interactive-text');
    
    // Create image overlay element
    const imageOverlay = document.createElement('div');
    imageOverlay.className = 'image-overlay';
    imageOverlay.innerHTML = '<img class="overlay-image" src="" alt="">';
    document.body.appendChild(imageOverlay);
    
    // Image mapping - random assignments for now
    const imageMap = {
        'youtube-tutorials': 'assets/images/failed.jpg',
        'portfolio-shot': 'assets/images/LostArts_Eye_White.png',
        'tools': 'assets/images/AoT.jpg',
        'workspace': 'assets/images/Beth Corzo-Duchardt - Cube_07_31_15a.JPG',
        'woodworking': 'assets/images/Center for the Lost Arts_85.jpg',
        'chair': 'assets/images/changchair.jpg',
        'website': 'assets/images/craightonhead.jpg',
        'song': 'assets/images/graciecoudla.jpg',
        'prototype': 'assets/images/img_9823.jpg',
        'studio': 'assets/images/LostArts_Stack_White.png',
        'community': 'assets/images/AoT.jpg',
        'backyard': 'assets/images/failed.jpg',
        'rough-draft': 'assets/images/Beth Corzo-Duchardt - Cube_07_31_15a.JPG',
        'failed-attempt': 'assets/images/Center for the Lost Arts_85.jpg'
    };
    
    interactiveTexts.forEach(text => {
        const imageId = text.dataset.imageId;
        
        // Mouse enter - show image
        text.addEventListener('mouseenter', function() {
            if (imageMap[imageId]) {
                const img = imageOverlay.querySelector('.overlay-image');
                img.src = imageMap[imageId];
                img.alt = `Image for ${this.textContent.trim()}`;
                imageOverlay.classList.add('visible');
            }
        });
        
        // Mouse leave - hide image
        text.addEventListener('mouseleave', function() {
            imageOverlay.classList.remove('visible');
        });
        
        // Click functionality
        text.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add a subtle animation feedback
            this.style.transform = 'translateY(-2px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            console.log('Interactive text clicked:', this.textContent.trim());
        });
        
        // Keyboard accessibility
        text.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make it focusable for keyboard navigation
        text.setAttribute('tabindex', '0');
        text.setAttribute('role', 'button');
        text.setAttribute('aria-label', 'View additional content');
    });
});
