// Enhanced scroll reveal functionality with bidirectional page inversion
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const headline = document.querySelector('.headline');
    const blackViewport = document.querySelector('.black-viewport');
    const fadeTrigger = document.querySelector('.fade-trigger');
    const body = document.body;
    const heroVideo = document.getElementById('hero-video');
    
    // Ping-pong video playback for seamless looping
    if (heroVideo) {
        let isPlayingForward = true;
        let animationId;
        let lastTime = 0;
        let isReversing = false;
        
        // Function to simulate reverse playback by manually controlling currentTime
        function simulateReversePlayback() {
            if (isReversing) {
                const currentTime = heroVideo.currentTime;
                
                // Calculate new time (moving backward)
                const newTime = Math.max(0, currentTime - (1/30)); // 30fps for smoother reverse
                
                if (newTime <= 0.1) { // Small buffer to avoid precision issues
                    // Reached beginning, switch to forward
                    console.log('Reached beginning, switching to forward');
                    isPlayingForward = true;
                    isReversing = false;
                    heroVideo.currentTime = 0;
                    heroVideo.play();
                } else {
                    heroVideo.currentTime = newTime;
                    animationId = requestAnimationFrame(simulateReversePlayback);
                }
            }
        }
        
        // Check for video end manually since 'ended' event might not fire reliably
        function checkVideoProgress() {
            if (isPlayingForward && !isReversing) {
                const currentTime = heroVideo.currentTime;
                const duration = heroVideo.duration;
                
                // Check if we're near the end (within 0.1 seconds)
                if (duration - currentTime <= 0.1) {
                    console.log('Video near end, switching to reverse');
                    isPlayingForward = false;
                    isReversing = true;
                    heroVideo.pause();
                    simulateReversePlayback();
                }
            }
        }
        
        // Monitor video progress
        heroVideo.addEventListener('timeupdate', checkVideoProgress);
        
        // Backup ended event listener
        heroVideo.addEventListener('ended', function() {
            console.log('Video ended event fired');
            if (isPlayingForward && !isReversing) {
                isPlayingForward = false;
                isReversing = true;
                heroVideo.pause();
                simulateReversePlayback();
            }
        });
        
        // Ensure video starts playing forward
        heroVideo.addEventListener('loadeddata', function() {
            console.log('Video loaded, duration:', heroVideo.duration);
            heroVideo.playbackRate = 1;
            heroVideo.currentTime = 0;
            isPlayingForward = true;
            isReversing = false;
            heroVideo.play();
        });
        
        // Handle video errors
        heroVideo.addEventListener('error', function(e) {
            console.error('Video error:', e);
            // Fallback: just loop normally
            heroVideo.loop = true;
        });
        
        // Clean up animation frame on page unload
        window.addEventListener('beforeunload', function() {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        });
    }
    
    // Page inversion observer - handles both directions
    const inversionOptions = {
        root: null,
        threshold: 0,
        rootMargin: '0px 0px 0px 0px'
    };
    
    const inversionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fade trigger is in viewport, remove inversion (back to black)
                body.classList.remove('inverted');
            } else {
                // Fade trigger has left the viewport, trigger inversion (to white)
                body.classList.add('inverted');
            }
        });
    }, inversionOptions);
    
    // Observe fade trigger for bidirectional page inversion
    if (fadeTrigger) {
        inversionObserver.observe(fadeTrigger);
    }
    
    // Interactive text functionality with image display
    const interactiveTexts = document.querySelectorAll('.interactive-text');
    
    // Create image overlay element
    const imageOverlay = document.createElement('div');
    imageOverlay.className = 'image-overlay';
    imageOverlay.innerHTML = '<img class="overlay-image" src="" alt="">';
    document.body.appendChild(imageOverlay);
    
    // Function to position image overlay optimally relative to triggering text
    function positionImageOverlay(triggerElement, overlay) {
        const triggerRect = triggerElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Dynamic sizing based on screen size
        const isMobile = viewportWidth <= 480;
        const overlayWidth = isMobile ? 300 : 400;
        const overlayHeight = isMobile ? 300 : 400;
        const margin = isMobile ? 15 : 20; // smaller margin on mobile
        
        // Calculate available space in each direction
        const spaceAbove = triggerRect.top;
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceLeft = triggerRect.left;
        const spaceRight = viewportWidth - triggerRect.right;
        
        let top, left;
        
        // Determine vertical position - prefer above, fallback to below
        if (spaceAbove >= overlayHeight + margin) {
            // Position above the text
            top = triggerRect.top - overlayHeight - margin;
        } else if (spaceBelow >= overlayHeight + margin) {
            // Position below the text
            top = triggerRect.bottom + margin;
        } else {
            // Center vertically if neither above nor below has enough space
            top = Math.max(margin, (viewportHeight - overlayHeight) / 2);
        }
        
        // Determine horizontal position - prefer right, fallback to left
        if (spaceRight >= overlayWidth + margin) {
            // Position to the right of the text
            left = triggerRect.right + margin;
        } else if (spaceLeft >= overlayWidth + margin) {
            // Position to the left of the text
            left = triggerRect.left - overlayWidth - margin;
        } else {
            // Center horizontally if neither side has enough space
            left = Math.max(margin, (viewportWidth - overlayWidth) / 2);
        }
        
        // Ensure the overlay stays within viewport bounds
        left = Math.max(margin, Math.min(left, viewportWidth - overlayWidth - margin));
        top = Math.max(margin, Math.min(top, viewportHeight - overlayHeight - margin));
        
        // Apply the calculated position
        overlay.style.top = `${top}px`;
        overlay.style.left = `${left}px`;
        overlay.style.transform = 'none'; // Remove any existing transform
    }
    
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
                
                // Calculate optimal position for the image
                positionImageOverlay(this, imageOverlay);
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
