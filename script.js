/* ==========================================
   IBTISAM's Birthday Website - Premium JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // AUDIO SETUP
    // ==========================================
    const happyBirthdayMusic = document.getElementById('happyBirthdayMusic');
    const bgMusic = document.getElementById('bgMusic');

    // Set initial volume
    happyBirthdayMusic.volume = 0.7;
    bgMusic.volume = 0.7;

    // Play Happy Birthday twice automatically
    let playCount = 0;

    // Function to play Happy Birthday
    const playHappyBirthday = () => {
        happyBirthdayMusic.play().catch(error => {
            console.log('Autoplay prevented by browser:', error);
            // If autoplay is blocked, play on first user interaction
            document.addEventListener('click', function playOnce() {
                happyBirthdayMusic.play();
                document.removeEventListener('click', playOnce);
            }, { once: true });
        });
    };

    // Listen for when the song ends
    happyBirthdayMusic.addEventListener('ended', function () {
        playCount++;
        if (playCount < 2) {
            // Play again (second time)
            happyBirthdayMusic.play();
        }
        // After 2 plays, it stops automatically
    });

    // Start playing after loading screen
    setTimeout(() => {
        playHappyBirthday();
    }, 2600);

    // ==========================================
    // LOADING SCREEN
    // ==========================================
    const loadingScreen = document.getElementById('loadingScreen');
    const loaderProgress = document.getElementById('loaderProgress');

    // Simulate loading progress
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2500);

    // ==========================================
    // ENVELOPE CLICK - REVEAL BIRTHDAY CONTENT
    // ==========================================
    const envelope = document.getElementById('envelope');
    const introScreen = document.getElementById('intro');
    const birthdayContent = document.getElementById('birthdayContent');
    const confettiContainer = document.getElementById('confetti');

    envelope.addEventListener('click', function () {
        // Stop Happy Birthday music
        happyBirthdayMusic.pause();
        happyBirthdayMusic.currentTime = 0;

        // Hide intro screen
        introScreen.classList.add('hidden');

        // Show birthday content
        setTimeout(() => {
            birthdayContent.classList.add('active');
            createConfetti();
            createSparkles();
            startFloatingHearts();

            // Start playing Khair Mangda
            bgMusic.play().then(() => {
                playPauseBtn.innerHTML = '<span class="play-icon">⏸</span>';
                musicToggle.classList.add('playing');
            }).catch(error => {
                console.log('Auto-play prevented:', error);
            });
        }, 400);
    });

    // ==========================================
    // CONFETTI ANIMATION
    // ==========================================
    function createConfetti() {
        const colors = ['#800020', '#DC143C', '#FFD700', '#FFFFFF', '#FF4D6D', '#A52A4A'];
        const shapes = ['square', 'circle'];

        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';

                const color = colors[Math.floor(Math.random() * colors.length)];
                const shape = shapes[Math.floor(Math.random() * shapes.length)];

                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = color;
                confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.animationDuration = Math.random() * 3 + 3 + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';

                confettiContainer.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 6000);
            }, i * 20);
        }
    }

    // ==========================================
    // SPARKLES ANIMATION
    // ==========================================
    function createSparkles() {
        const sparklesContainer = document.getElementById('sparkles');

        setInterval(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';

            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDuration = Math.random() * 2 + 1 + 's';

            sparklesContainer.appendChild(sparkle);

            setTimeout(() => {
                sparkle.remove();
            }, 3000);
        }, 200);
    }

    // ==========================================
    // FLOATING HEARTS
    // ==========================================
    function startFloatingHearts() {
        const heartsContainer = document.getElementById('hearts');
        const heartEmojis = ['💖', '💝', '💗', '💕', '❤️', '💓', '🌹', '✨'];

        setInterval(() => {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heart.style.animationDuration = Math.random() * 5 + 5 + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 12000);
        }, 500);
    }

    // ==========================================
    // ADVANCED MUSIC PLAYER
    // ==========================================
    // bgMusic already declared at the top
    const musicToggle = document.getElementById('musicToggle');
    const musicPanel = document.getElementById('musicPanel');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');

    let isPanelOpen = false;

    // Set initial volume
    bgMusic.volume = 0.7;

    // Toggle music panel
    musicToggle.addEventListener('click', function () {
        isPanelOpen = !isPanelOpen;
        if (isPanelOpen) {
            musicPanel.classList.add('active');
        } else {
            musicPanel.classList.remove('active');
        }
    });

    // Play/Pause functionality
    playPauseBtn.addEventListener('click', function () {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                playPauseBtn.innerHTML = '<span class="play-icon">⏸</span>';
                musicToggle.classList.add('playing');
            }).catch(error => {
                console.log('Playback failed:', error);
                showToast('Please add khair-mangda.mp3 to play music! 🎵');
            });
        } else {
            bgMusic.pause();
            playPauseBtn.innerHTML = '<span class="play-icon">▶</span>';
            musicToggle.classList.remove('playing');
        }
    });

    // Volume control
    volumeSlider.addEventListener('input', function () {
        bgMusic.volume = this.value / 100;
    });

    // Update progress bar
    bgMusic.addEventListener('timeupdate', function () {
        if (bgMusic.duration) {
            const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressFill.style.width = progress + '%';
            currentTimeEl.textContent = formatTime(bgMusic.currentTime);
            totalTimeEl.textContent = formatTime(bgMusic.duration);
        }
    });

    // Seek functionality
    progressBar.addEventListener('click', function (e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        bgMusic.currentTime = pos * bgMusic.duration;
    });

    // Format time helper
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }



    // ==========================================
    // BLOW CANDLES GAME
    // ==========================================
    const gameCandles = document.querySelectorAll('.game-candle');
    const blowBtn = document.getElementById('blowBtn');
    const gameMessage = document.getElementById('gameMessage');

    let candlesBlown = 0;

    gameCandles.forEach(candle => {
        candle.addEventListener('click', function () {
            if (!this.classList.contains('blown')) {
                this.classList.add('blown');
                this.classList.remove('active');
                candlesBlown++;

                if (candlesBlown === gameCandles.length) {
                    setTimeout(() => {
                        gameMessage.textContent = '🎉 Wish granted! May all your dreams come true! ✨';
                        createConfettiBurst();
                    }, 500);
                }
            }
        });
    });

    blowBtn.addEventListener('click', function () {
        gameCandles.forEach(candle => {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blown');
                candle.classList.remove('active');
            }
        });
        candlesBlown = gameCandles.length;

        setTimeout(() => {
            gameMessage.textContent = '🎉 Wish granted! May all your dreams come true! ✨';
            createConfettiBurst();
        }, 500);
    });

    function createConfettiBurst() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = ['#FFD700', '#FF4D6D', '#DC143C'][Math.floor(Math.random() * 3)];
                confetti.style.width = '8px';
                confetti.style.height = '8px';
                confetti.style.borderRadius = '50%';
                confettiContainer.appendChild(confetti);

                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    }

    // ==========================================
    // BALLOON POP GAME - ENHANCED
    // ==========================================
    const balloonContainer = document.getElementById('balloonContainer');
    const balloonScore = document.getElementById('balloonScore');

    let score = 0;
    let combo = 0;
    let comboTimer = null;

    const balloonTypes = [
        { emoji: '🎈', color: 'red', points: 10 },
        { emoji: '🎈', color: 'blue', points: 10 },
        { emoji: '🎈', color: 'green', points: 10 },
        { emoji: '🎈', color: 'yellow', points: 10 },
        { emoji: '🎈', color: 'purple', points: 15 },
        { emoji: '🎈', color: 'pink', points: 15 },
        { emoji: '🎉', color: 'rainbow', points: 25, special: true },
        { emoji: '💝', color: 'gold', points: 50, special: true, message: true }
    ];

    const surpriseMessages = [
        "You're amazing, Shona Baby! 💖",
        "Keep shining bright! ⭐",
        "You make the world beautiful! 🌸",
        "Best friend ever! 🎉",
        "So grateful for you! 💕",
        "You deserve all the happiness! 🌈",
        "Never stop being awesome! ✨",
        "Lucky to have you! 🍀"
    ];

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';

        // Random balloon type with higher chance for regular balloons
        const random = Math.random();
        let balloonType;
        if (random < 0.7) {
            // 70% regular balloons
            balloonType = balloonTypes[Math.floor(Math.random() * 6)];
        } else if (random < 0.9) {
            // 20% rainbow
            balloonType = balloonTypes[6];
        } else {
            // 10% golden message balloon
            balloonType = balloonTypes[7];
        }

        balloon.textContent = balloonType.emoji;
        balloon.dataset.points = balloonType.points;
        balloon.dataset.special = balloonType.special || false;
        balloon.dataset.message = balloonType.message || false;

        balloon.style.left = Math.random() * 85 + 5 + '%';
        balloon.style.top = Math.random() * 70 + 10 + '%';
        balloon.style.fontSize = (Math.random() * 1.5 + 2) + 'rem';

        // Color filter
        if (balloonType.color === 'rainbow') {
            balloon.style.animation = 'rainbow 2s linear infinite, float 3s ease-in-out infinite';
        } else if (balloonType.color === 'gold') {
            balloon.style.filter = 'hue-rotate(45deg) brightness(1.3)';
            balloon.style.animation = 'pulse 1s ease-in-out infinite, float 3s ease-in-out infinite';
        } else {
            const colorRotations = {
                red: 0, blue: 200, green: 100, yellow: 60, purple: 280, pink: 320
            };
            balloon.style.filter = `hue-rotate(${colorRotations[balloonType.color]}deg)`;
        }

        balloon.addEventListener('click', function () {
            if (!this.classList.contains('popped')) {
                this.classList.add('popped');
                const points = parseInt(this.dataset.points);

                // Combo system
                clearTimeout(comboTimer);
                combo++;
                const multiplier = Math.min(combo, 5);
                const earnedPoints = points * multiplier;
                score += earnedPoints;
                balloonScore.textContent = score;

                // Reset combo after 2 seconds
                comboTimer = setTimeout(() => {
                    combo = 0;
                }, 2000);

                // Create pop effect
                const popText = document.createElement('span');
                popText.className = 'pop-effect';
                if (this.dataset.message === 'true') {
                    // Show surprise message
                    const message = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
                    popText.textContent = message;
                    popText.style.fontSize = '1.2rem';
                    popText.style.color = '#FFD700';
                    createConfettiBurst();
                } else {
                    popText.textContent = multiplier > 1 ? `+${earnedPoints} (x${multiplier})` : `+${earnedPoints}`;
                }

                popText.style.position = 'absolute';
                popText.style.left = this.style.left;
                popText.style.top = this.style.top;
                popText.style.fontWeight = 'bold';
                popText.style.animation = 'fadeOut 1s ease';
                popText.style.pointerEvents = 'none';
                balloonContainer.appendChild(popText);

                setTimeout(() => {
                    this.remove();
                    popText.remove();
                }, 400);
            }
        });

        balloonContainer.appendChild(balloon);

        // Auto-remove after 8 seconds if not popped
        setTimeout(() => {
            if (!balloon.classList.contains('popped') && balloon.parentElement) {
                balloon.style.animation = 'floatAway 1s ease-out forwards';
                setTimeout(() => balloon.remove(), 1000);
            }
        }, 8000);
    }

    // Create initial balloons
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createBalloon(), i * 600);
    }

    // Add new balloons periodically
    setInterval(() => {
        const currentBalloons = document.querySelectorAll('.balloon:not(.popped)').length;
        if (currentBalloons < 10) {
            createBalloon();
        }
    }, 2000);

    // ==========================================
    // VIRTUAL WISH BOX
    // ==========================================
    const wishBox = document.getElementById('wishBox');
    const wishSurprises = document.getElementById('wishSurprises');

    if (wishBox && wishSurprises) {
        wishBox.addEventListener('click', function () {
            if (!this.classList.contains('opened')) {
                this.classList.add('opened');

                setTimeout(() => {
                    wishSurprises.classList.add('revealed');
                    createConfettiBurst();
                }, 800);
            }
        });
    }



    // ==========================================
    // SCROLL ANIMATIONS
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('.message-card, .interest-card, .wish-item, .surprise-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // ==========================================
    // TOAST NOTIFICATION
    // ==========================================
    function showToast(message) {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: linear-gradient(135deg, #800020, #DC143C);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            font-size: 0.95rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            animation: slideUp 0.3s ease;
        `;

        document.body.appendChild(toast);

        if (!document.getElementById('toast-styles')) {
            const style = document.createElement('style');
            style.id = 'toast-styles';
            style.textContent = `
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; transform: scale(1); }
                    to { opacity: 0; transform: scale(0); }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // KEYBOARD INTERACTION
    // ==========================================
    document.addEventListener('keydown', function (e) {
        // Press Enter or Space to open envelope
        if ((e.key === 'Enter' || e.key === ' ') && !introScreen.classList.contains('hidden')) {
            envelope.click();
        }
    });

    // ==========================================
    // FLIP CARDS - SPECIAL MESSAGES
    // ==========================================
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        card.addEventListener('click', function () {
            this.classList.toggle('flipped');
        });
    });

    // ==========================================
    // PARALLAX EFFECT ON HERO SECTION
    // ==========================================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');

        if (heroSection) {
            const rate = scrolled * 0.3;
            heroSection.style.backgroundPositionY = rate + 'px';
        }
    });

    // ==========================================
    // ADD TOUCH SUPPORT FOR MOBILE
    // ==========================================
    envelope.addEventListener('touchstart', function (e) {
        e.preventDefault();
        this.click();
    });

    // Add swipe support for carousel
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.carousel-container').addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.carousel-container').addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }

    // ==========================================
    // CLICKABLE INTEREST CARDS WITH SPECIAL MESSAGES
    // ==========================================
    const specialModal = document.getElementById('specialModal');
    const modalClose = document.getElementById('modalClose');
    const modalEmoji = document.getElementById('modalEmoji');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const clickableCards = document.querySelectorAll('.clickable-card');

    const specialMessages = {
        netflix: {
            emoji: '🎬',
            title: 'My Special Promise',
            message: 'For one whole month, I will never tell you to not see Netflix and do conversation with me! 😊 Watch as much as you want, Shona Baby - your happiness matters more! I promise to never complain. Enjoy every show, every movie, guilt-free! This is my birthday gift to you! 🎁✨'
        },
        books: {
            emoji: '📚',
            title: 'A Gift From The Heart',
            message: 'Here\'s my special gift for you, Shona Baby - Tell me the novel name, and I will gift it to you! 💝 Any book you want, any story you wish to read, just name it and it\'s yours! Because seeing you happy with your favorite books brings me so much joy! 📖✨'
        },
        friendship: {
            emoji: '💝',
            title: 'Together Forever',
            message: 'Baki ab mil kar jo bi ho gaaaaa! 🌟💖 Whatever life brings our way, we\'ll face it together, Shona Baby! Through all the ups and downs, the laughter and tears, the adventures and challenges - we\'re in this together, always and forever! Here\'s to us and everything that awaits! ✨🤗'
        }
    };

    console.log('Found clickable cards:', clickableCards.length);
    console.log('Modal element:', specialModal);

    if (clickableCards.length > 0 && specialModal && modalClose) {
        clickableCards.forEach((card, index) => {
            console.log('Adding click listener to card', index, card.dataset.card);
            card.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const cardType = this.getAttribute('data-card');
                console.log('Card clicked:', cardType);
                const message = specialMessages[cardType];

                if (message) {
                    modalEmoji.textContent = message.emoji;
                    modalTitle.textContent = message.title;
                    modalMessage.textContent = message.message;
                    specialModal.classList.add('active');
                    createConfettiBurst();
                    console.log('Modal opened for:', cardType);
                } else {
                    console.error('No message found for card type:', cardType);
                }
            });
        });

        // Close modal when clicking X
        modalClose.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            specialModal.classList.remove('active');
            console.log('Modal closed via X button');
        });

        // Close modal when clicking outside
        specialModal.addEventListener('click', function (e) {
            if (e.target === specialModal) {
                specialModal.classList.remove('active');
                console.log('Modal closed via outside click');
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && specialModal.classList.contains('active')) {
                specialModal.classList.remove('active');
                console.log('Modal closed via Escape key');
            }
        });
    } else {
        console.error('Missing elements - Cards:', clickableCards.length, 'Modal:', !!specialModal, 'Close button:', !!modalClose);
    }

    // ==========================================
    // CONSOLE BIRTHDAY MESSAGE
    // ==========================================
    console.log('%c🎂 Happy Birthday IBTISAM! 🎂',
        'font-size: 24px; color: #DC143C; font-weight: bold; text-shadow: 2px 2px 4px #FFD700;');
    console.log('%cMade with 💖 by a best friend!',
        'font-size: 14px; color: #800020;');
    console.log('%c✨ Premium Birthday Experience ✨',
        'font-size: 16px; color: #FFD700; font-weight: bold;');
});
