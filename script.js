document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Handle mobile submenu toggles
    hasSubmenuItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && !e.target.closest('.mobile-menu')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle search functionality
    const searchToggles = document.querySelectorAll('.search-toggle');
    const searchPanels = document.querySelectorAll('.search-panel');
    const searchInputs = document.querySelectorAll('.search-container input');

    searchToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const panel = searchPanels[index];
            const input = searchInputs[index];

            // Close other dropdowns
            closeAllDropdowns();

            if (window.innerWidth <= 768) {
                mobileMenu.classList.add('active');
                document.querySelector('.mobile-menu .search-bar input').focus();
            } else {
                panel.style.opacity = '1';
                panel.style.visibility = 'visible';
                panel.style.transform = 'translateY(0)';
                input.focus();
            }
        });
    });

    // Handle search submission
    const searchForms = document.querySelectorAll('.search-container');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            if (input.value.trim()) {
                // Implement search functionality here
                console.log('Searching for:', input.value);
                input.value = '';
            }
        });
    });

    // Handle newsletter signup
    const newsletterForms = document.querySelectorAll('.signup-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const email = input.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter signup
                showNotification('Thank you for subscribing!', 'success');
                input.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-section.right')) {
            closeAllDropdowns();
        }
    });

    // Handle window resize
    let windowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== windowWidth) {
            windowWidth = window.innerWidth;
            if (windowWidth > 768) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            closeAllDropdowns();
        }
    });

    // Utility functions
    function closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.search-panel, .mega-menu');
        dropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(10px)';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add notification styles
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '14px',
            zIndex: '9999',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        // Set background color based on type
        notification.style.background = type === 'success' ? '#2ecc71' : '#e74c3c';

        // Add to document
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.collections-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Function to move to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Function to move to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // Add click event listeners to arrows
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Auto-advance slides
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Start the carousel
    startInterval();

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        startInterval();
    });
}); 

