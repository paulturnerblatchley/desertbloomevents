// Add typewriter effect to title on load
document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.festival-title h1');
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
});

/* Parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Random flicker for index cards
const cards = document.querySelectorAll('.index-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'flicker 0.5s';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
}); */

// Sticky button on scroll
window.addEventListener('scroll', () => {
    const button = document.querySelector('.event-button');
    const buttonRect = button.getBoundingClientRect();
    const buttonParent = button.parentElement;
    const parentRect = buttonParent.getBoundingClientRect();
    
    // Check if the bottom bar has scrolled past the top of viewport
    if (parentRect.top <= 0 && !button.classList.contains('sticky')) {
        button.classList.add('sticky');
    } else if (parentRect.top > 0 && button.classList.contains('sticky')) {
        button.classList.remove('sticky');
    }
});

// Add creepy cursor trail
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.98) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.background = '#ff0000';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.opacity = '0.6';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.transition = 'all 1s ease-out';
            trail.style.transform = 'translateY(20px)';
            trail.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            trail.remove();
        }, 1000);
    }
});

// Countdown timer
const eventDate = new Date('October 30, 2025 00:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    
    if (distance > 0) {
        const countdownEl = document.createElement('div');
        countdownEl.style.position = 'fixed';
        countdownEl.style.bottom = '20px';
        countdownEl.style.right = '20px';
        countdownEl.style.background = 'rgba(0,0,0,0.8)';
        countdownEl.style.color = '#ff0000';
        countdownEl.style.padding = '10px';
        countdownEl.style.borderRadius = '5px';
        countdownEl.style.fontFamily = 'Creepster, cursive';
        countdownEl.style.fontSize = '18px';
        countdownEl.style.border = '2px solid #ff0000';
        countdownEl.textContent = `${days} DAYS UNTIL NIGHTMARE`;
        
        const existing = document.querySelector('.countdown-timer');
        if (existing) existing.remove();
        
        countdownEl.className = 'countdown-timer';
        document.body.appendChild(countdownEl);
    }
}

updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60); // Update every hour