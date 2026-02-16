document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------------
       1. SCROLL REVEAL ENGINE (Cinematic Entrance)
       ----------------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger animation when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that restores opacity and slides it up
                entry.target.classList.add('active');
                // Stop watching this element (runs only once)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Find all elements with class 'reveal' and start watching them
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    /* -----------------------------------------------------------
       2. MOBILE MENU LOGIC
       ----------------------------------------------------------- */
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Toggle Menu Open/Close
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active'); // Turns hamburger to X
            mobileNav.classList.toggle('active'); // Slides in the black glass overlay

            // Prevent background scrolling when menu is open
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when a link is clicked (UX Best Practice)
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    /* -----------------------------------------------------------
       3. DYNAMIC HEADER (Transparent -> Glass on Scroll)
       ----------------------------------------------------------- 
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        // If user scrolls down more than 50 pixels
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });*/
    /* -----------------------------------------------------------
       4. MOUSE SEARCHLIGHT EFFECT
       ----------------------------------------------------------- */
    const spotlight = document.querySelector('.cursor-spotlight');

    if (spotlight) {
        let mouseX = 0;
        let mouseY = 0;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Move the spotlight instantly (no lag for responsiveness)
            spotlight.style.left = mouseX + 'px';
            spotlight.style.top = mouseY + 'px';
        });

        // Hide spotlight when mouse leaves the window
        document.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            spotlight.style.opacity = '1';
        });
    }

});