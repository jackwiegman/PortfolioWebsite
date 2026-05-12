document.addEventListener('DOMContentLoaded', () => {
    const greeting  = document.querySelector('.hero-greeting');
    const title     = document.querySelector('.hero-title');
    const revealEls = document.querySelectorAll(
        '.hero-name, .hero-summary, .hero-actions, .hero-photo-wrap'
    );

    // Clear both typed elements and hide everything that will animate in
    greeting.textContent = '';
    title.textContent    = '';
    title.style.opacity  = '0';

    revealEls.forEach(el => {
        el.style.opacity    = '0';
        el.style.transform  = 'translateY(10px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Types text into el character by character, calls onDone when finished
    function typeInto(el, text, onDone) {
        let i = 0;
        el.classList.add('typing');
        (function step() {
            if (i < text.length) {
                el.textContent = text.slice(0, i + 1);
                i++;
                setTimeout(step, 65 + Math.random() * 45);
            } else {
                setTimeout(() => {
                    el.classList.remove('typing');
                    if (onDone) onDone();
                }, 550);
            }
        })();
    }

    // Fade in the title prefix ("> "), then type the text
    function revealTitle() {
        title.style.transition = 'opacity 0.25s ease';
        title.style.opacity    = '1';
        setTimeout(() => typeInto(title, 'Software Developer'), 150);
    }

    // Stagger-reveal name/summary/actions/photo, then type the title last
    function revealContent() {
        revealEls.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity   = '1';
                el.style.transform = 'translateY(0)';
            }, i * 120 + 200);
        });

        // Wait for the last element to finish fading before typing title
        const titleDelay = (revealEls.length - 1) * 120 + 200 + 700;
        setTimeout(revealTitle, titleDelay);
    }

    // Kick off: short pause, then type the greeting
    setTimeout(() => typeInto(greeting, 'whoami', revealContent), 350);
});
