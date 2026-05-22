// ========================================
// HERO BEHAVIORS 
// ========================================

// Click ripple on the hero buttons
document.querySelectorAll('.hero-btn').forEach((btn) => {
    btn.addEventListener('click', function(e) {
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
});

// Ripple styles — tinted differently for primary (dark on light) vs ghost (light on dark)
const rippleStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    .hero-btn-primary .ripple {
        background: rgba(0, 0, 0, 0.12);
    }

    .hero-btn-ghost .ripple {
        background: rgba(255, 255, 255, 0.18);
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


// ========================================
// SCROLL REVEALS (new for year two)
// ========================================

// Reveal elements as they enter the viewport. Staggers items inside groups
// (awards, selections, gallery, years) so they cascade in rather than
// appearing all at once.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;

            // Stagger: figure out the element's index among its visible siblings
            // for a more organic cascade.
            const parent = el.parentElement;
            if (parent && (
                parent.classList.contains('awards-grid') ||
                parent.classList.contains('selections-list') ||
                parent.classList.contains('gallery-grid') ||
                parent.classList.contains('years')
            )) {
                const siblings = Array.from(parent.children).filter(s => s.classList.contains('reveal'));
                const index = siblings.indexOf(el);
                el.style.transitionDelay = `${Math.min(index * 80, 600)}ms`;
            }

            el.classList.add('in-view');
            revealObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
});

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});


// ========================================
// SUBTLE MOUSE-LIFT ON AWARD CARDS
// ========================================

// Adds a small parallax tilt to award poster cards on hover — keeps motion
// restrained so it reads as craft, not a gimmick.
document.querySelectorAll('.award').forEach((card) => {
    const poster = card.querySelector('.poster');
    if (!poster) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        poster.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(0)`;
    });

    card.addEventListener('mouseleave', () => {
        poster.style.transform = 'perspective(900px) rotateY(0) rotateX(0) translateZ(0)';
    });
});
