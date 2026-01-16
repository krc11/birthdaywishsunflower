document.addEventListener('DOMContentLoaded', () => {
    // Music Controls
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && bgMusic) {
        const toggleMusic = () => {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.textContent = '🎵';
                musicBtn.classList.remove('playing');
                musicBtn.title = "Play Music";
            } else {
                bgMusic.play().then(() => {
                    musicBtn.textContent = '⏸';
                    musicBtn.classList.add('playing');
                    musicBtn.title = "Pause Music";
                }).catch(e => {
                    console.log("Play failed:", e);
                    alert("Please add a file named 'music.mp3' to the folder to play music! 🎵");
                });
            }
            isPlaying = !isPlaying;
        };

        musicBtn.addEventListener('click', toggleMusic);

        // Attempt Autoplay
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.textContent = '⏸';
            musicBtn.classList.add('playing');
            musicBtn.title = "Pause Music";
        }).catch(error => {
            console.log("Autoplay blocked by browser policy. Interaction required.");
        });
    }

    // Confetti Effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const gallerySection = document.querySelector('.gallery-section');
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Add slight parallax to hero
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });
});
