/*==========================================
  PORTFOLIO WEBSITE - MAIN JAVASCRIPT
  Author: Het Dabhi
  Description: Main JavaScript functionality for portfolio website
  
  FEATURES:
  - Mobile navigation menu toggle
  - Active link highlighting on scroll
  - Smooth scroll animations with ScrollReveal
  - Dropdown menu functionality
  - Dark mode toggle (inline script in HTML)
==========================================*/

/*===== MOBILE MENU SHOW FUNCTIONALITY =====*/
/**
 * Shows/hides the mobile navigation menu
 * @param {string} toggleId - ID of the toggle button element
 * @param {string} navId - ID of the navigation menu element
 * @param {string} overlayId - ID of the overlay element
 */
const showMenu = (toggleId, navId, overlayId) => {
    // Get DOM elements
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        overlay = document.getElementById(overlayId)

    // Check if elements exist
    if (toggle && nav) {
        // Add click event listener to toggle button
        toggle.addEventListener('click', () => {
            // Check if menu is currently open
            const isMenuOpen = nav.classList.contains('show')

            // Toggle menu visibility
            nav.classList.toggle('show')

            // Toggle overlay if it exists
            if (overlay) {
                overlay.classList.toggle('show')
            }

            // Prevent body scroll when menu is open
            if (!isMenuOpen) {
                document.body.classList.add('menu-open')
            } else {
                document.body.classList.remove('menu-open')
            }
        })
    }
}

// Initialize menu functionality
showMenu('nav-toggle', 'nav-menu', 'nav-overlay')

/*===== MOBILE MENU CLOSE FUNCTIONALITY =====*/
/**
 * Handles closing the mobile navigation menu
 * Supports close button, overlay click, and ESC key
 */
const closeMenu = () => {
    // Get DOM elements
    const navMenu = document.getElementById('nav-menu'),
        navOverlay = document.getElementById('nav-overlay'),
        navClose = document.getElementById('nav-close')

    /**
     * Helper function to hide the menu
     */
    const hideMenu = () => {
        // Remove show class from menu
        navMenu.classList.remove('show')

        // Remove show class from overlay if it exists
        if (navOverlay) {
            navOverlay.classList.remove('show')
        }

        // Re-enable body scroll
        document.body.classList.remove('menu-open')
    }

    // Close button functionality
    if (navClose && navMenu) {
        navClose.addEventListener('click', hideMenu)
    }

    // Overlay click to close menu
    if (navOverlay && navMenu) {
        navOverlay.addEventListener('click', hideMenu)
    }

    // ESC key to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('show')) {
            hideMenu()
        }
    })
}

// Initialize close menu functionality
closeMenu()

/*==================== REMOVE MENU ON LINK CLICK (MOBILE) ====================*/
/**
 * Closes mobile menu when a navigation link is clicked
 * Also handles active link highlighting
 */
const navLink = document.querySelectorAll('.nav__link')

/**
 * Handles navigation link click events
 * @param {Event} e - Click event object
 */
function linkAction(e) {
    // Get menu and overlay elements
    const navMenu = document.getElementById('nav-menu'),
        navOverlay = document.getElementById('nav-overlay')

    // Remove active-link class from all navigation links
    navLink.forEach(link => link.classList.remove('active-link'))

    // Add active-link class to the clicked link
    e.currentTarget.classList.add('active-link')

    // Close the mobile menu
    navMenu.classList.remove('show')

    // Hide overlay if it exists
    if (navOverlay) {
        navOverlay.classList.remove('show')
    }

    // Re-enable body scroll
    document.body.classList.remove('menu-open')
}

// Add click event listener to all navigation links
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
/**
 * Highlights the active navigation link based on scroll position
 * Updates as user scrolls through different sections
 */
const sections = document.querySelectorAll('section[id]')

/**
 * Determines which section is currently in view and highlights corresponding nav link
 */
const scrollActive = () => {
    // Get current scroll position
    const scrollDown = window.scrollY

    // Get header height for offset calculation
    const headerHeight = document.querySelector('.l-header').offsetHeight

    // Loop through all sections
    sections.forEach(current => {
        // Calculate section dimensions and position
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - headerHeight - 10,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href="#' + sectionId + '"]')

        // Check if corresponding nav link exists
        if (sectionsClass) {
            // Add active class if section is in viewport
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link')
            } else {
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}

// Add scroll event listener
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION CONFIGURATION =====*/
/**
 * Initialize ScrollReveal library with default settings
 * Creates smooth scroll-triggered animations throughout the page
 */
const sr = ScrollReveal({
    origin: 'top',          // Animation origin direction
    distance: '60px',       // Distance elements travel during animation
    duration: 2000,         // Animation duration in milliseconds
    delay: 200,             // Delay before animation starts
    // reset: true          // Uncomment to repeat animations on scroll
});

// Reveal all section titles
sr.reveal('.section-title', {
    origin: 'top',
    distance: '40px',
    duration: 1000,
    delay: 100
});

// Reveal home, about, and skills sections
sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});

// Reveal with additional delay for staggered effect
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });

// Reveal social icons with interval between each
sr.reveal('.home__social-icon', { interval: 200 });

// Reveal skills data, work items, and contact inputs with interval
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });

// Reveal project gallery items
sr.reveal('.project-detail__gallery-item', {
    origin: 'top',
    distance: '40px',
    duration: 1000,
    interval: 200
});

// Reveal contact form
sr.reveal('.contact__container', {
    origin: 'top',
    distance: '50px',
    duration: 1200,
    delay: 200
});

// Reveal education content with custom settings
sr.reveal('.education__content', {
    origin: 'top',
    distance: '40px',
    duration: 1000,
    delay: 300,
    interval: 200
});

/*===== EDUCATION SECTION ANIMATION =====*/
// Animate education list items
sr.reveal('#education li', {
    origin: 'top',
    distance: '40px',
    duration: 1000,
    delay: 300,
    interval: 200
});

/*===== HOBBIES SECTION ANIMATION =====*/
// Animate hobbies list items
sr.reveal('#hobbies li', {
    origin: 'top',
    distance: '40px',
    duration: 1000,
    delay: 300,
    interval: 200
});



/*===== DROPDOWN MENU TOGGLE (MOBILE) =====*/
/**
 * Handles dropdown menu functionality for mobile devices
 * Prevents default link behavior and toggles dropdown visibility
 */
const dropdown = document.querySelector('.nav__dropdown')

if (dropdown) {
    const dropdownLink = dropdown.querySelector('.nav__link')

    // Add click event to dropdown trigger
    dropdownLink.addEventListener('click', (e) => {
        // Only prevent default and toggle on mobile devices
        if (window.innerWidth <= 767) {
            e.preventDefault()
            dropdown.classList.toggle('show')
        }
    })
}

/*===== CLOSE DROPDOWN ON LINK CLICK =====*/
/**
 * Closes dropdown and mobile menu when a dropdown link is clicked
 */
const dropdownLinks = document.querySelectorAll('.nav__dropdown-link')

dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Get menu and dropdown elements
        const navMenu = document.getElementById('nav-menu')
        const dropdown = document.querySelector('.nav__dropdown')

        // Close mobile menu
        navMenu.classList.remove('show')

        // Close dropdown if it exists
        if (dropdown) {
            dropdown.classList.remove('show')
        }
    })
})
