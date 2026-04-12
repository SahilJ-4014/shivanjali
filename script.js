/* 
  Shivanjali Agro Tourism - Advanced Scripts with Video Support
  Enhanced JavaScript for navbar effects, carousel with video support, and interactions.
*/

// Carousel Functionality with Image and Video Support
function changeSlide(button, direction) {
    const carousel = button.closest('.service-carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.dot');
    
    let currentIndex = 0;
    items.forEach((item, index) => {
        if (item.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
        newIndex = items.length - 1;
    } else if (newIndex >= items.length) {
        newIndex = 0;
    }
    
    showSlide(carousel, newIndex);
}

function currentSlide(dot, index) {
    const carousel = dot.closest('.service-carousel');
    showSlide(carousel, index);
}

function showSlide(carousel, index) {
    const items = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.dot');
    
    // Pause all videos
    items.forEach(item => {
        if (item.tagName === 'VIDEO') {
            item.pause();
        }
        item.classList.remove('active');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Activate new item
    if (items[index]) {
        items[index].classList.add('active');
        // Auto-play video if it's a video element
        if (items[index].tagName === 'VIDEO') {
            items[index].play();
        }
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// Initialize carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-carousel').forEach(carousel => {
        const firstItem = carousel.querySelector('.carousel-item');
        const firstDot = carousel.querySelector('.dot');
        if (firstItem) {
            firstItem.classList.add('active');
            // Auto-play video if first item is a video
            if (firstItem.tagName === 'VIDEO') {
                firstItem.play();
            }
        }
        if (firstDot) firstDot.classList.add('active');
    });

    // Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission (Mock)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
