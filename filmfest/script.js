/* ============================================================
   CURSE — Desert Bloom Film Festival, Year Two
   Minimal scripting. No gimmicks. Just reveals and a few
   small interactive moments where they earn their keep.
   ============================================================ */

// ============================================
// SCROLL REVEALS
// ============================================

// Reveal elements as they enter the viewport with a light cascade
// inside grouped lists (awards, rules, dates).
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const parent = el.parentElement;

        // Stagger items inside known lists
        if (parent && (
            parent.classList.contains('awards-list') ||
            parent.classList.contains('rules-list') ||
            parent.classList.contains('dates-list')
        )) {
            const siblings = Array.from(parent.children).filter(s => s.classList.contains('reveal'));
            const index = siblings.indexOf(el);
            el.style.transitionDelay = `${Math.min(index * 90, 700)}ms`;
        }

        el.classList.add('in-view');
        revealObserver.unobserve(el);
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
});

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});


// ============================================
// CURSE TITLE — subtle drift on cursor proximity
// ============================================
// Very restrained — each letter shifts a degree or two when the
// cursor passes nearby. Reads as "alive" without feeling animated.
const curseTitle = document.querySelector('.curse-title');
if (curseTitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const letters = curseTitle.querySelectorAll('.curse-letter');

    // Cache each letter's baseline transform so we can layer on top
    const baselines = Array.from(letters).map((l) => l.style.transform);

    curseTitle.addEventListener('mousemove', (e) => {
        const rect = curseTitle.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        letters.forEach((letter, i) => {
            const letterX = (i + 0.5) / letters.length;
            const distance = Math.abs(letterX - x);
            const influence = Math.max(0, 1 - distance * 2.5);
            const lift = -y * 8 * influence;
            const rot = (x - letterX) * 6 * influence;

            letter.style.transform = `${baselines[i]} translateY(${lift}px) rotate(${rot}deg)`;
        });
    });

    curseTitle.addEventListener('mouseleave', () => {
        letters.forEach((letter, i) => {
            letter.style.transform = baselines[i];
        });
    });
}


// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
// Native CSS scroll-behavior covers most of this, but we add a tiny
// offset so anchors land below the top strip rather than under it.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const topStrip = document.querySelector('.top-strip');
        const offset = topStrip ? topStrip.offsetHeight + 20 : 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top, behavior: 'smooth' });
    });
});
