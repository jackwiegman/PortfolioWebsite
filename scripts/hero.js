document.addEventListener('DOMContentLoaded', () => {
    const greeting  = document.querySelector('.hero-greeting');
    const revealEls = document.querySelectorAll(
        '.hero-name, .hero-title, .hero-summary, .hero-actions, .hero-photo-wrap'
    );
    const text = 'whoami';

    // Hide everything below the greeting so it can fade in after typing
    revealEls.forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Start empty with the blinking cursor class
    greeting.textContent = '';
    greeting.classList.add('typing');

    let i = 0;

    function type() {
        if (i < text.length) {
            greeting.textContent = text.slice(0, i + 1);
            i++;
            // Slight randomness makes it feel human rather than mechanical
            setTimeout(type, 65 + Math.random() * 45);
        } else {
            // Hold the cursor for a beat, then remove it
            setTimeout(() => greeting.classList.remove('typing'), 550);

            // Stagger-reveal each hero element
            revealEls.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity   = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 120 + 200);
            });
        }
    }

    // Small pause before typing begins
    setTimeout(type, 350);
});
