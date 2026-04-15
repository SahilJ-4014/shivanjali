/* 
  Shivanjali Agro Tourism - Advanced Scripts with Video Support
  jQuery Implementation for navbar effects, carousel with video support, and interactions.
*/

// Carousel Functionality with Image and Video Support
class CarouselManager {
    constructor(carousel) {
        this.$carousel = $(carousel);
        this.$items = this.$carousel.find('.carousel-item');
        this.$dots = this.$carousel.find('.dot');
    }

    getCurrentIndex() {
        let currentIndex = 0;
        this.$items.each((index, item) => {
            if ($(item).hasClass('active')) {
                currentIndex = index;
            }
        });
        return currentIndex;
    }

    changeSlide(direction) {
        let currentIndex = this.getCurrentIndex();
        let newIndex = currentIndex + direction;
        
        if (newIndex < 0) newIndex = this.$items.length - 1;
        if (newIndex >= this.$items.length) newIndex = 0;
        
        this.showSlide(newIndex);
    }

    showSlide(index) {
        // Pause all videos and remove active class
        this.$items.each((idx, item) => {
            if ($(item).prop('tagName') === 'VIDEO') {
                $(item)[0].pause();
            }
            $(item).removeClass('active');
        });
        this.$dots.removeClass('active');
        
        // Activate new item
        if (this.$items.eq(index).length) {
            this.$items.eq(index).addClass('active');
            if (this.$items.eq(index).prop('tagName') === 'VIDEO') {
                this.$items.eq(index)[0].play();
            }
        }
        if (this.$dots.eq(index).length) {
            this.$dots.eq(index).addClass('active');
        }
    }
}

// Bridge functions for HTML onclick handlers
function changeSlide(button, direction) {
    const $carousel = $(button).closest('.service-carousel');
    const manager = new CarouselManager($carousel[0]);
    manager.changeSlide(direction);
}

function currentSlide(dot, index) {
    const $carousel = $(dot).closest('.service-carousel');
    const manager = new CarouselManager($carousel[0]);
    manager.showSlide(index);
}

// Initialize on document ready
$(document).ready(function() {
    
    // Initialize Theme Switcher
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        htmlElement.setAttribute('data-theme', 'dark');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        body.classList.remove('dark-theme');
        htmlElement.setAttribute('data-theme', 'light');
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
    
    // Theme Toggle Button Event Listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (body.classList.contains('dark-theme')) {
                // Switch to light theme
                body.classList.remove('dark-theme');
                htmlElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                themeToggle.title = 'Switch to Dark Mode';
            } else {
                // Switch to dark theme
                body.classList.add('dark-theme');
                htmlElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                themeToggle.title = 'Switch to Light Mode';
            }
        });
    }
    
    // Initialize all carousels
    $('.service-carousel').each(function() {
        const manager = new CarouselManager(this);
        const $firstItem = manager.$items.first();
        const $firstDot = manager.$dots.first();
        
        if ($firstItem.length) {
            $firstItem.addClass('active');
            if ($firstItem.prop('tagName') === 'VIDEO') {
                $firstItem[0].play();
            }
        }
        if ($firstDot.length) {
            $firstDot.addClass('active');
        }
    });

    // Navbar Scroll Effect (Bootstrap navbar)
    const $navbar = $('.navbar');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });

    // Close mobile menu when clicking on a link - Bootstrap offcanvas
    $('.navbar-collapse a').on('click', function() {
        const navbarToggle = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            navbarToggle.click();
        }
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');
        const $target = $(href);
        
        if ($target.length && href !== '#') {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $target.offset().top
            }, 'smooth');
        }
    });

    // Form Submission Handler
    const $contactForm = $('.contact-form');
    if ($contactForm.length) {
        $contactForm.on('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            $contactForm[0].reset();
        });
    }
});
