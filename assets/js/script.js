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
    /* -----------------------------------------------------------
       5. CINEMATIC PRELOADER (The "0-100" Count)
       ----------------------------------------------------------- */
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.counter');

    if (preloader && counter) {
        let count = 0;

        // Disable scrolling while loading
        document.body.style.overflow = 'hidden';

        const updateCounter = () => {
            // Logic to count up. Slower at the end for realism.
            const increment = Math.floor(Math.random() * 10) + 1;
            count += increment;

            if (count > 100) count = 100;

            counter.textContent = count;

            if (count < 100) {
                // Random speed to simulate "calculating"
                setTimeout(updateCounter, Math.random() * 50 + 20);
            } else {
                // Animation Complete
                setTimeout(() => {
                    preloader.classList.add('hide'); // Slide up
                    document.body.style.overflow = 'auto'; // Re-enable scroll

                    // Optional: Trigger your hero animations here if you want them strictly after load
                }, 500); // Wait half a second at 100%
            }
        };

        updateCounter();
    }

    /* -----------------------------------------------------------
       6. MAGNETIC BUTTONS (High-End Feel)
       ----------------------------------------------------------- */
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X relative to button
            const y = e.clientY - rect.top;  // Mouse Y relative to button

            // Calculate how far to move (the "pull" strength)
            // 0.2 means the button moves 20% of the distance to your mouse
            const xMove = (x - rect.width / 2) * 0.2;
            const yMove = (y - rect.height / 2) * 0.2;

            btn.style.transform = `translate(${xMove}px, ${yMove}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            // Snap back to center when mouse leaves
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
    /* -----------------------------------------------------------
   7. LENIS SMOOTH SCROLL (The "Heavy" Feel)
   ----------------------------------------------------------- */
    const lenis = new Lenis({
        duration: 1.2, // The "heaviness" of the scroll
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    /* -----------------------------------------------------------
       8. AJAX FORM SUBMISSION (No Reload)
       ----------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');
    const submitBtn = document.getElementById('form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // STOP the page reload

            // Show "Sending..." state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending Request...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    if (response.status == 200) {
                        // SUCCESS: Hide form, show success message
                        contactForm.style.display = 'none';
                        successMessage.style.display = 'block';

                        // Optional: Smoothly fade it in
                        successMessage.style.opacity = 0;
                        setTimeout(() => {
                            successMessage.style.transition = 'opacity 0.5s ease';
                            successMessage.style.opacity = 1;
                        }, 10);
                    } else {
                        console.log(response);
                        submitBtn.textContent = "Error. Please try again.";
                    }
                })
                .catch(error => {
                    console.log(error);
                    submitBtn.textContent = "Something went wrong.";
                })
                .then(function () {
                    // Reset button state (just in case)
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.opacity = "1";
                    }, 3000);
                });
        });
    }
    /* -----------------------------------------------------------
       9. FAQ ACCORDION LOGIC
       ----------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQs first (optional, makes it cleaner)
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                // Calculate the exact height of the text to slide it open smoothly
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});