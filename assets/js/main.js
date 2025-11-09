/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId, overlayId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        overlay = document.getElementById(overlayId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isMenuOpen = nav.classList.contains('show')

            nav.classList.toggle('show')
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
showMenu('nav-toggle', 'nav-menu', 'nav-overlay')

/*===== MENU CLOSE =====*/
const closeMenu = () => {
    const navMenu = document.getElementById('nav-menu'),
        navOverlay = document.getElementById('nav-overlay'),
        navClose = document.getElementById('nav-close')

    const hideMenu = () => {
        navMenu.classList.remove('show')
        if (navOverlay) {
            navOverlay.classList.remove('show')
        }
        document.body.classList.remove('menu-open')
    }

    // Close button functionality
    if (navClose && navMenu) {
        navClose.addEventListener('click', hideMenu)
    }

    // Overlay click to close
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
closeMenu()

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(e) {
    const navMenu = document.getElementById('nav-menu'),
        navOverlay = document.getElementById('nav-overlay')

    // Remove active-link from all links first
    navLink.forEach(link => link.classList.remove('active-link'))

    // Add active-link to the clicked link
    e.currentTarget.classList.add('active-link')

    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
    if (navOverlay) {
        navOverlay.classList.remove('show')
    }
    document.body.classList.remove('menu-open')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY
    const headerHeight = document.querySelector('.l-header').offsetHeight

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - headerHeight - 10,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href="#' + sectionId + '"]')

        if (sectionsClass) {
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link')
            } else {
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });
sr.reveal('.education__content', { origin: 'top', distance: '40px', duration: 1000, delay: 300, interval: 200 });

/*===== EDUCATION SECTION ANIMATION =====*/
sr.reveal('#education li', {
    origin: 'top',
    distance: '40px',
    duration: 1000,
    delay: 300,
    interval: 200
});

/*===== HOBBIES SECTION ANIMATION =====*/
sr.reveal('#hobbies li', {
    origin: 'top',
    distance: '40px',
    duration: 1000,
    delay: 300,
    interval: 200
});



/*===== DROPDOWN MENU TOGGLE (MOBILE) =====*/
const dropdown = document.querySelector('.nav__dropdown')
if (dropdown) {
    const dropdownLink = dropdown.querySelector('.nav__link')

    dropdownLink.addEventListener('click', (e) => {
        // Only prevent default and toggle on mobile
        if (window.innerWidth <= 767) {
            e.preventDefault()
            dropdown.classList.toggle('show')
        }
    })
}

// Close dropdown when clicking dropdown links
const dropdownLinks = document.querySelectorAll('.nav__dropdown-link')
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.getElementById('nav-menu')
        const dropdown = document.querySelector('.nav__dropdown')

        navMenu.classList.remove('show')
        if (dropdown) {
            dropdown.classList.remove('show')
        }
    })
})
