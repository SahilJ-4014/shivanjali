/* 
  Shivanjali Agro Tourism - Advanced Scripts with Video Support
  Optimized JavaScript for navbar effects, carousel with video support, and interactions.
*/

// Carousel Functionality with Image and Video Support
class CarouselManager {
    constructor(carousel) {
        this.carousel = carousel;
        this.items = carousel.querySelectorAll('.carousel-item');
        this.dots = carousel.querySelectorAll('.dot');
    }

    getCurrentIndex() {
        return Array.from(this.items).findIndex(item => item.classList.contains('active'));
    }

    changeSlide(direction) {
        let currentIndex = this.getCurrentIndex();
        let newIndex = currentIndex + direction;
        
        if (newIndex < 0) newIndex = this.items.length - 1;
        if (newIndex >= this.items.length) newIndex = 0;
        
        this.showSlide(newIndex);
    }

    showSlide(index) {
        // Pause all videos and remove active class
        this.items.forEach(item => {
            if (item.tagName === 'VIDEO') item.pause();
            item.classList.remove('active');
        });
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        // Activate new item
        if (this.items[index]) {
            this.items[index].classList.add('active');
            if (this.items[index].tagName === 'VIDEO') {
                this.items[index].play();
            }
        }
        if (this.dots[index]) {
            this.dots[index].classList.add('active');
        }
    }
}

// Bridge functions for HTML onclick handlers
function changeSlide(button, direction) {
    const carousel = button.closest('.service-carousel');
    const manager = new CarouselManager(carousel);
    manager.changeSlide(direction);
}

function currentSlide(dot, index) {
    const carousel = dot.closest('.service-carousel');
    const manager = new CarouselManager(carousel);
    manager.showSlide(index);
}

// Initialize carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all carousels
    document.querySelectorAll('.service-carousel').forEach(carousel => {
        const manager = new CarouselManager(carousel);
        const firstItem = manager.items[0];
        const firstDot = manager.dots[0];
        
        if (firstItem) {
            firstItem.classList.add('active');
            if (firstItem.tagName === 'VIDEO') {
                firstItem.play();
            }
        }
        if (firstDot) firstDot.classList.add('active');
    });

    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link - Event delegation
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            
            if (target && href !== '#') {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form Submission Handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
