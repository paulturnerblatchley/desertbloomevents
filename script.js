// Add parallax effect for mountains only (not circles)
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    
    const mountains = document.querySelector('.mountain-svg');
    
    if (mountains) {
        mountains.style.transform = `translateX(${(x - 0.5) * 20}px)`;
    }
});

// Add floating animation to random speckles
window.addEventListener('load', () => {
    const speckles = document.querySelectorAll('.floating-speckles circle');
    
    speckles.forEach((speckle, index) => {
        // Add random delay to each speckle
        speckle.style.animationDelay = `${Math.random() * 2}s`;
        
        // Create individual floating animation
        const animationName = `float-${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-${5 + Math.random() * 10}px) translateX(${-5 + Math.random() * 10}px);
                }
                50% {
                    transform: translateY(-${10 + Math.random() * 15}px) translateX(${-10 + Math.random() * 20}px);
                }
                75% {
                    transform: translateY(-${5 + Math.random() * 10}px) translateX(${5 - Math.random() * 10}px);
                }
            }
        `;
        
        // Add keyframes to page
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        // Apply animation
        speckle.style.animation = `${animationName} ${4 + Math.random() * 4}s ease-in-out infinite`;
    });
});

// Optional: Add click ripple effect to button
document.querySelector('.event-button').addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    this.appendChild(ripple);
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    setTimeout(() => ripple.remove(), 600);
});

// Add ripple styles dynamically
const rippleStyles = `
    .event-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);