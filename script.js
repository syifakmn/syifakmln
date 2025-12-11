// ===================================
// Load Portfolio Items Dynamically
// ===================================

// Load portfolio items from projects-data.js
function loadPortfolioItems() {
    const portfolioGrid = document.getElementById('portfolioGrid');

    if (!portfolioGrid || typeof projectsData === 'undefined') {
        console.error('Portfolio grid or projects data not found');
        return;
    }

    portfolioGrid.innerHTML = '';

    projectsData.forEach(project => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', project.category);

        portfolioItem.innerHTML = `
            <div class="portfolio-image">
                <img src="${project.thumbnail}" alt="${project.title}">
                <div class="portfolio-overlay">
                    <div class="portfolio-info">
                        <h3>${project.title}</h3>
                        <p>${project.categoryLabel}</p>
                        <a href="project-detail.html?id=${project.id}" class="view-project">Lihat Detail →</a>
                    </div>
                </div>
            </div>
        `;

        portfolioGrid.appendChild(portfolioItem);
    });

    // Re-initialize reveal animation for new items
    initializeRevealAnimation();
}

// Initialize reveal animation for portfolio items
function initializeRevealAnimation() {
    const revealElements = document.querySelectorAll('.portfolio-item, .skill-item, .stat-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
}

// Load portfolio items when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioItems();
});

// ===================================
// Smooth Scroll & Navigation
// ===================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// Portfolio Filter
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.5s ease';
                }, 100);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.5s ease';
                    }, 100);
                } else {
                    item.classList.add('hide');
                }
            }
        });
    });
});

// ===================================
// Animated Counter for Stats
// ===================================

const statNumbers = document.querySelectorAll('.stat-number');
let animated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            statNumbers.forEach(stat => animateCounter(stat));
            animated = true;
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) {
    observer.observe(aboutSection);
}

// ===================================
// Web3Forms Contact Form Handling
// ===================================

const web3ContactForm = document.getElementById('web3ContactForm');
const formResponse = document.getElementById('formResponse');

if (web3ContactForm) {
    web3ContactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = web3ContactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        formResponse.style.display = 'none';

        // Get form data
        const formData = new FormData(web3ContactForm);

        try {
            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                formResponse.textContent = '✅ Thank you! Your message has been sent successfully.';
                formResponse.className = 'form-response success';
                formResponse.style.display = 'block';

                // Reset form
                web3ContactForm.reset();
            } else {
                // Show error message
                formResponse.textContent = '❌ Oops! Something went wrong. Please try again.';
                formResponse.className = 'form-response error';
                formResponse.style.display = 'block';
            }
        } catch (error) {
            // Show error message
            formResponse.textContent = '❌ Network error. Please check your connection and try again.';
            formResponse.className = 'form-response error';
            formResponse.style.display = 'block';
        } finally {
            // Reset button state
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Parallax Effect for Hero Background
// ===================================

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ===================================
// Image Placeholder Handler
// ===================================

// Handle missing images gracefully
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('error', function () {
        // Create a placeholder gradient background
        this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        this.style.minHeight = '300px';
        this.style.display = 'flex';
        this.style.alignItems = 'center';
        this.style.justifyContent = 'center';

        // Add text overlay
        const parent = this.parentElement;
        if (!parent.querySelector('.image-placeholder-text')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder-text';
            placeholder.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 1rem;
                font-weight: 600;
                text-align: center;
                z-index: 10;
            `;
            placeholder.textContent = 'Ganti dengan foto Anda';
            parent.style.position = 'relative';
            parent.appendChild(placeholder);
        }
    });
});

// ===================================
// Console Message
// ===================================

console.log('%c🎨 Portfolio Template for DKV Students', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cCustomize this template by:', 'color: #764ba2; font-size: 14px;');
console.log('%c1. Replacing "NAMA ANDA" with your name', 'color: #4a5568; font-size: 12px;');
console.log('%c2. Adding your photos to the assets folder', 'color: #4a5568; font-size: 12px;');
console.log('%c3. Updating contact information', 'color: #4a5568; font-size: 12px;');
console.log('%c4. Adding your portfolio projects', 'color: #4a5568; font-size: 12px;');
