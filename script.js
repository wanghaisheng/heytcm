document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    function checkScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
    
    // Active Menu Link Update on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Check if we're at the top of the page
        if (scrollPosition < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Check on load
    
    // Simulator Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const panelId = button.getAttribute('data-tab');
            document.getElementById(panelId).classList.add('active');
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Toggle active class on clicked item
            item.classList.toggle('active');
            
            // Update toggle icon
            const icon = question.querySelector('.toggle-icon i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Calendar Generator
    function generateCalendar() {
        const calendarDays = document.querySelector('.calendar-days');
        if (!calendarDays) return;
        
        const date = new Date();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();
        
        // Clear previous calendar
        calendarDays.innerHTML = '';
        
        // Get first day of month and number of days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Add empty cells for days before first day of month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarDays.appendChild(emptyDay);
        }
        
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElem = document.createElement('div');
            dayElem.classList.add('calendar-day');
            dayElem.textContent = i;
            
            // Highlight current day
            if (i === date.getDate()) {
                dayElem.classList.add('current');
            }
            
            // Add fake events
            if (i === 15 || i === 22 || i === 1) {
                dayElem.classList.add('has-event');
                
                const eventDot = document.createElement('span');
                eventDot.classList.add('event-dot');
                dayElem.appendChild(eventDot);
                
                // Add tooltip with event name
                dayElem.setAttribute('title', '社区活动');
            }
            
            calendarDays.appendChild(dayElem);
        }
    }
    
    generateCalendar();
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                nameInput.classList.add('error');
                isValid = false;
            } else {
                nameInput.classList.remove('error');
            }
            
            if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                emailInput.classList.add('error');
                isValid = false;
            } else {
                emailInput.classList.remove('error');
            }
            
            if (!messageInput.value.trim()) {
                messageInput.classList.add('error');
                isValid = false;
            } else {
                messageInput.classList.remove('error');
            }
            
            if (isValid) {
                // Simulate form submission
                contactForm.innerHTML = `<div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h4>谢谢您的反馈！</h4>
                    <p>我们会尽快回复您的留言。</p>
                </div>`;
            }
        });
    }
    
    // Add Calendar Styling
    const style = document.createElement('style');
    style.textContent = `
        .calendar-day {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            font-size: 0.9rem;
            color: #333;
            border-radius: 50%;
            cursor: pointer;
        }
        
        .calendar-day.empty {
            visibility: hidden;
        }
        
        .calendar-day.current {
            background-color: #4682B4;
            color: white;
            font-weight: 500;
        }
        
        .calendar-day.has-event {
            font-weight: 500;
        }
        
        .event-dot {
            position: absolute;
            bottom: 2px;
            width: 5px;
            height: 5px;
            background-color: #4682B4;
            border-radius: 50%;
        }
        
        .form-success {
            text-align: center;
            color: #4682B4;
            padding: 2rem 0;
        }
        
        .form-success i {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #d9534f;
        }
        
        header.scrolled {
            padding: 0.5rem 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .game-card, .tool-card, .community-feature, .news-item, .join-option, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on load
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card, .game-card, .tool-card, .community-feature, .news-item, .join-option, .project-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .feature-card.animated, .game-card.animated, .tool-card.animated, .community-feature.animated, .news-item.animated, .join-option.animated, .project-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Animation for value tags
    const valueTags = document.querySelectorAll('.value-tag');
    if (valueTags) {
        valueTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Staggered animation for belief items
    const beliefItems = document.querySelectorAll('.belief-item');
    if (beliefItems) {
        beliefItems.forEach((item, index) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            item.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                            item.style.opacity = "1";
                            item.style.transform = "translateY(0)";
                        }, index * 100);
                        observer.unobserve(item);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(item);
        });
    }
    
    // Ring Preorder Modal
    const ringCtaButtons = document.querySelectorAll('.ring-cta-btn');
    const preorderModal = document.getElementById('ringPreorderModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (ringCtaButtons) {
        ringCtaButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (preorderModal) {
                    preorderModal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
                }
            });
        });
    }
    
    if (closeModal && preorderModal) {
        closeModal.addEventListener('click', function() {
            preorderModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }
    
    // Close modal if clicked outside of content
    if (preorderModal) {
        window.addEventListener('click', function(event) {
            if (event.target == preorderModal) {
                preorderModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
