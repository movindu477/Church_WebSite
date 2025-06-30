document.addEventListener('DOMContentLoaded', function () {
  const heroHeading = document.getElementById('hero-heading');
  const heroParagraph = document.getElementById('hero-paragraph');
  const desktopBreakpoint = 1024;

  function checkScreenSize() {
    return window.innerWidth >= desktopBreakpoint;
  }

  function animateElements() {
    // Reset state
    if (checkScreenSize()) {
      // Desktop animation
      heroHeading.style.opacity = '0';
      heroHeading.style.transform = 'translate(-50%, 100px)';
      heroParagraph.style.opacity = '0';
      heroParagraph.style.transform = 'translate(-50%, 100px)';
    } else {
      // Mobile animation (only heading)
      heroHeading.style.opacity = '0';
      heroHeading.style.transform = 'translate(-50%, 30px)';
      heroParagraph.style.opacity = '0';
      heroParagraph.style.transform = 'translate(-50%, 30px)';
    }

    // Animate heading
    setTimeout(() => {
      heroHeading.style.opacity = '1';
      heroHeading.style.transform = 'translate(-50%, 0)';
    }, 100);

    // Animate paragraph on both desktop and mobile
    setTimeout(() => {
      heroParagraph.style.opacity = '1';
      heroParagraph.style.transform = 'translate(-50%, 0)';
    }, 300);

    // Hide after delay
    setTimeout(() => {
      heroHeading.style.opacity = '0';
      heroHeading.style.transform = checkScreenSize() ?
        'translate(-50%, -100px)' : 'translate(-50%, -30px)';

      heroParagraph.style.opacity = '0';
      heroParagraph.style.transform = checkScreenSize() ?
        'translate(-50%, -100px)' : 'translate(-50%, -30px)';

      // Restart animation
      setTimeout(animateElements, 2000);
    }, 5000);
  }

  function handleResize() {
    // Show paragraph always
    heroParagraph.style.display = 'block';

    if (checkScreenSize()) {
      // Desktop positioning
      heroHeading.style.top = '25%';
      heroHeading.style.bottom = 'auto';
    } else {
      // Mobile positioning
      heroHeading.style.top = 'auto';
      heroHeading.style.bottom = window.innerWidth <= 480 ? '15%' : '20%';
    }
  }

  // Start animation
  animateElements();

  // Add resize listener
  window.addEventListener('resize', handleResize);

  // Initial check
  handleResize();
});


// top button functionality
// Get the button element
const backToTopBtn = document.getElementById("backToTopBtn");

// Show the button when user scrolls down 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

// Scroll to top smoothly when button is clicked
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    // Remove active class from all links first
    navLinks.forEach(link => link.classList.remove('active'));

    // Check current page
    const currentPath = window.location.pathname;
    let activeLink = null;

    // First try to find exact match
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (currentPath.endsWith(linkPath)) {
        activeLink = link;
      }
    });

    // If no exact match, try partial match
    if (!activeLink) {
      navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath)) {
          activeLink = link;
        }
      });
    }

    // If still no match, use stored link
    if (!activeLink) {
      const storedLink = localStorage.getItem('activeNavLink');
      activeLink = document.querySelector(`.nav-link[href="${storedLink}"]`);
    }

    // Set active class
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  // Set initial active link
  setActiveLink();

  // Add click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      localStorage.setItem('activeNavLink', this.getAttribute('href'));
      setActiveLink();
    });
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
      // Toggle the active class
      navLinks.classList.toggle('active');

      // Update aria-expanded attribute
      const isExpanded = navLinks.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);

      // Optional: Change icon when menu is open
      mobileMenuBtn.innerHTML = isExpanded ? '&times;' : '&#9776;';
    });

    // Close menu when clicking on links (for mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.innerHTML = '&#9776;';
        }
      });
    });
  }
});