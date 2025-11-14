/**
 * For Vashuu - Complete Restructure
 * Following Final Developer Brief specifications
 */

// ============================================
// ScreenManager Module
// ============================================
class ScreenManager {
    constructor() {
        this.screens = {
            'screen-landing': document.getElementById('screen-landing'),
            'screen-q1': document.getElementById('screen-q1'),
            'screen-unlock': document.getElementById('screen-unlock'),
            'screen-q2': document.getElementById('screen-q2'),
            'screen-q3': document.getElementById('screen-q3'),
            'screen-game': document.getElementById('screen-game'),
            'screen-q4': document.getElementById('screen-q4'),
            'screen-final': document.getElementById('screen-final')
        };
        this.currentScreen = 'screen-landing';
    }

    show(screenId) {
        if (!this.screens[screenId]) {
            console.error(`Screen "${screenId}" not found`);
            return Promise.reject(new Error(`Screen "${screenId}" not found`));
        }

        return new Promise((resolve) => {
            // Hide all screens with fade out
        Object.values(this.screens).forEach(screen => {
                if (screen) {
                    screen.classList.remove('active');
                    screen.style.opacity = '0';
                    screen.style.transform = 'translateY(20px)';
                }
            });

            // Show target screen with fade in - no delay
            const targetScreen = this.screens[screenId];
            if (targetScreen) {
                targetScreen.classList.add('active');
                targetScreen.style.opacity = '1';
                targetScreen.style.transform = 'translateY(0)';
                this.currentScreen = screenId;
                
                // Focus management - immediate
                const firstInput = targetScreen.querySelector('input');
                if (firstInput) {
                    setTimeout(() => firstInput.focus(), 50);
                }
            }
            resolve();
        });
    }
}

// ============================================
// LottieLoader Module
// ============================================
class LottieLoader {
    static load(containerId, jsonPath, options = {}) {
    const {
        loop = true,
        autoplay = true,
        renderer = 'svg',
        width = null,
            height = null
    } = options;

        const container = typeof containerId === 'string' 
            ? document.getElementById(containerId) 
            : containerId;

    if (!container) {
            console.error(`Container "${containerId}" not found`);
        return null;
    }

        // Clear container
        container.innerHTML = '';

        // Apply sizing
    if (width) container.style.width = width;
    if (height) container.style.height = height;

    const animation = lottie.loadAnimation({
        container: container,
        renderer: renderer,
        loop: loop,
        autoplay: autoplay,
        path: jsonPath
    });

    return animation;
    }
}

// ============================================
// ParticleSystem Module
// ============================================
class ParticleSystem {
    constructor() {
        this.activeSystems = new Map();
    }

    start(type, containerId, options = {}) {
        const {
            count = 15,
            speed = 'medium',
            emoji = null
        } = options;

        const container = typeof containerId === 'string' 
            ? document.getElementById(containerId) 
            : containerId;

        if (!container) {
            console.error(`Container "${containerId}" not found`);
            return;
        }

        const systemId = `${type}-${containerId}`;
        
        // Stop existing system if any
        this.stop(containerId);

        const particles = [];
        const interval = speed === 'fast' ? 300 : speed === 'slow' ? 800 : 500;

        const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = `particle ${type}-particle`;

        if (emoji) {
            particle.textContent = emoji;
            } else if (type === 'heart') {
                particle.textContent = '💖';
            } else if (type === 'butterfly') {
                particle.textContent = '🦋';
            } else if (type === 'petal') {
                particle.style.cssText = `
                    width: 8px;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 50% 0 50% 0;
                    box-shadow: 0 0 10px rgba(255, 192, 203, 0.5);
                `;
            } else if (type === 'sparkle') {
                particle.style.cssText = `
                    width: 4px;
                    height: 4px;
                    background: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
                `;
        }

        const startX = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 8 + Math.random() * 4;

        particle.style.left = `${startX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
            particle.style.position = 'absolute';
            particle.style.pointerEvents = 'none';

            container.appendChild(particle);
            particles.push(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, (duration + delay) * 1000);
        };

        // Create initial batch
        for (let i = 0; i < count; i++) {
            setTimeout(() => createParticle(), i * interval);
        }

        // Continuous generation
        const continuousInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                createParticle();
            }
        }, interval * 2);

        this.activeSystems.set(containerId, { particles, interval: continuousInterval });
    }

    burst(containerId, count = 40, options = {}) {
        const {
            color = '#ffd6e0',
            minDistance = 200,
            maxDistance = 300
        } = options;

        const container = typeof containerId === 'string' 
            ? document.getElementById(containerId) 
            : containerId;

        if (!container) {
            console.error(`Container "${containerId}" not found`);
            return;
        }

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 50%;
            top: 50%;
            left: 50%;
                pointer-events: none;
            box-shadow: 0 0 10px ${color};
        `;

            const angle = (Math.PI * 2 * i) / count;
            const distance = minDistance + Math.random() * (maxDistance - minDistance);
            const duration = 1 + Math.random() * 0.5;

        particle.style.setProperty('--angle', angle);
        particle.style.setProperty('--distance', `${distance}px`);
            particle.style.animation = `burst ${duration}s ease-out forwards`;

            container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000);
    }
}

    stop(containerId) {
        const system = this.activeSystems.get(containerId);
        if (system) {
            clearInterval(system.interval);
            system.particles.forEach(p => {
                if (p.parentNode) p.remove();
            });
            this.activeSystems.delete(containerId);
        }
    }
}

// ============================================
// MusicController Module
// ============================================
class MusicController {
    constructor(audioElement) {
        this.audio = audioElement;
        this.isPlaying = false;
        this.targetVolume = 0.7;
        this.fadeInterval = null;
        this.audioUnlocked = false;

        if (this.audio) {
            this.audio.volume = 0;
            this.audio.preload = 'auto';
        }
    }

    load(path) {
        return new Promise((resolve, reject) => {
        if (!this.audio) {
                reject(new Error('Audio element not found'));
            return;
        }

            const audioSource = this.audio.querySelector('source');
            if (audioSource) {
                const baseSrc = path.split('?')[0];
                const newSrc = baseSrc + '?v=' + Date.now() + '&r=' + Math.random().toString(36).substring(7);
                audioSource.setAttribute('src', newSrc);
            }

            this.audio.load();
            
            this.audio.addEventListener('canplaythrough', () => {
                    resolve();
            }, { once: true });

            this.audio.addEventListener('error', (e) => {
                reject(e);
            }, { once: true });
        });
    }

    playFade(targetVol = 0.7, durationMs = 1400) {
        if (!this.audio || this.isPlaying) return Promise.resolve();

        return new Promise((resolve, reject) => {
            if (!this.audioUnlocked) {
                reject(new Error('Audio not unlocked - user interaction required'));
                return;
            }

            this.targetVolume = targetVol;
            this.audio.volume = 0;

            this.audio.play().then(() => {
                this.isPlaying = true;
                this._fadeIn(durationMs, resolve);
            }).catch(reject);
        });
    }

    pauseFade(durationMs = 800) {
        if (!this.audio || !this.isPlaying) return Promise.resolve();

        return new Promise((resolve) => {
            this._fadeOut(durationMs, () => {
        this.audio.pause();
        this.isPlaying = false;
                resolve();
            });
        });
    }

    unlock() {
        if (this.audio) {
            // Mark as unlocked immediately on user interaction
            this.audioUnlocked = true;
            
            // Try to play/pause to unlock browser autoplay restrictions
            this.audio.play().then(() => {
                this.audio.pause();
                this.audio.currentTime = 0;
            }).catch(() => {
                // Still mark as unlocked - browser may allow it later
                this.audioUnlocked = true;
            });
        } else {
            // If audio element doesn't exist yet, still mark as unlocked
            this.audioUnlocked = true;
        }
    }

    _fadeIn(durationMs, callback) {
        this._stopFade();
        const steps = 20;
        const stepTime = durationMs / steps;
        const volumeStep = this.targetVolume / steps;
        let currentStep = 0;

        this.fadeInterval = setInterval(() => {
            currentStep++;
            this.audio.volume = Math.min(volumeStep * currentStep, this.targetVolume);
            
            if (currentStep >= steps) {
                this._stopFade();
                if (callback) callback();
            }
        }, stepTime);
    }

    _fadeOut(durationMs, callback) {
        this._stopFade();
        const steps = 20;
        const stepTime = durationMs / steps;
        const initialVolume = this.audio.volume;
        const volumeStep = initialVolume / steps;
        let currentStep = 0;

        this.fadeInterval = setInterval(() => {
            currentStep++;
            this.audio.volume = Math.max(initialVolume - (volumeStep * currentStep), 0);
            
            if (currentStep >= steps) {
                this._stopFade();
                if (callback) callback();
            }
        }, stepTime);
    }

    _stopFade() {
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
        }
    }
}

// ============================================
// Auth Module (Local Credentials)
// ============================================
class Auth {
    static saveLocalUser(userObj) {
        try {
            const userData = {
                nickname: userObj.nickname || 'vashuu',
                passHash: btoa(userObj.password || userObj.pin || '1410'),
                createdAt: Date.now()
            };
            localStorage.setItem('vashuu_user', JSON.stringify(userData));
            return true;
        } catch (e) {
            console.error('Failed to save user:', e);
            return false;
        }
    }

    static loadLocalUser() {
        try {
            const userData = localStorage.getItem('vashuu_user');
            if (userData) {
                return JSON.parse(userData);
            }
            // Default credentials
            return {
                nickname: 'vashuu',
                passHash: btoa('1410')
            };
        } catch (e) {
            console.error('Failed to load user:', e);
            return null;
        }
    }

    static verifyPassword(inputPassword) {
        const user = this.loadLocalUser();
        if (!user) return false;
        
        const inputHash = btoa(inputPassword);
        return inputHash === user.passHash;
    }
}

// ============================================
// Typewriter Module - Spacing Preserving
// ============================================
class Typewriter {
    // Spacing-preserving typewriter function
    static typeWriterEffect(element, text, speed = 40) {
        return new Promise((resolve) => {
            // DO NOT trim, sanitize, replace, or modify the text
            const safeText = text; // preserves original spacing exactly
            
            // Clear before typing
            element.textContent = "";
            
            let index = 0;
            
            function type() {
                if (index < safeText.length) {
                    // Append the character exactly as it is - preserves ALL spaces
                    element.textContent += safeText[index];
                    index++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            }
            
            type();
        });
    }

    static async type(container, text, charDelayMs = 50) {
        const containerEl = typeof container === 'string' 
            ? document.getElementById(container) 
            : container;

        if (!containerEl) {
            console.error(`Container "${container}" not found`);
            return;
        }

        // Handle multi-line text - preserve spacing in each line
        const lines = text.split('\n');
        
        // Clear container
        containerEl.innerHTML = '';
        
        // Type each line with spacing preservation
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const lineEl = document.createElement('div');
            lineEl.className = 'typewriter-line';
            containerEl.appendChild(lineEl);
            
            // Type this line with exact spacing preservation
            await this.typeWriterEffect(lineEl, line, charDelayMs);
            
            // Small delay between lines
            if (lineIndex < lines.length - 1) {
                await this.sleep(charDelayMs * 3);
            }
        }

        return Promise.resolve();
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ============================================
// GameIntegration Module
// ============================================
class GameIntegration {
    static start() {
        // Initialize the existing catch hearts game
        const gameArea = document.getElementById('game-area');
        if (!gameArea) return;

        // This will be called when screen-game is shown
        // The actual game logic will be integrated here
        console.log('Game integration started');
    }

    static onComplete(score = 0, time = 0) {
        // Dispatch gameComplete event
        document.dispatchEvent(new CustomEvent('gameComplete', {
            detail: { score, time }
        }));
    }
}

// ============================================
// DataStore Module
// ============================================
class DataStore {
    static saveProgress(obj) {
        try {
            let progress = this.loadProgress();
            if (!progress) {
                progress = {
                    progress: [],
                    finalRevealed: false
                };
            }

            progress.progress.push({
                ...obj,
                ts: Date.now()
            });

            localStorage.setItem('vashuu_progress', JSON.stringify(progress));
            return true;
        } catch (e) {
            console.error('Failed to save progress:', e);
            return false;
        }
    }

    static loadProgress() {
        try {
            const progress = localStorage.getItem('vashuu_progress');
            return progress ? JSON.parse(progress) : null;
        } catch (e) {
            console.error('Failed to load progress:', e);
            return null;
        }
    }

    static exportProgress() {
        const progress = this.loadProgress();
        if (!progress) return null;

        const dataStr = JSON.stringify(progress, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `vashuu_progress_${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
}

// ============================================
// Main Application Controller
// ============================================
class App {
    constructor() {
        this.screenManager = new ScreenManager();
        this.particleSystem = new ParticleSystem();
        this.musicController = new MusicController(document.getElementById('background-music'));
        this.currentStep = 1;
        this.q1Tries = 0;
        this.gameScore = 0;

        this._init();
    }

    _init() {
        // Initialize landing screen
        this._initLanding();
        
        // Initialize questions
        this._initQ1();
        this._initQ2();
        this._initQ3();
        this._initQ4();
        
        // Initialize game
        this._initGame();
        
        // Initialize final screen
        this._initFinal();

        // Start landing particles
        this.particleSystem.start('butterfly', 'landing-particles', { count: 12, speed: 'small' });
    }

    _initLanding() {
        const startBtn = document.getElementById('start-btn');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                // Unlock audio first (required for autoplay)
                this.musicController.unlock();
                
                // Load and play music immediately when start button is clicked
                this.musicController.load('assets/music/this_is_for_u.mp3').then(() => {
                    // Small delay to ensure unlock completes
                    setTimeout(() => {
                        this.musicController.playFade(0.6, 1400).catch((error) => {
                            console.error('Music play error:', error);
                            // Retry once if it fails
                            setTimeout(() => {
                                this.musicController.playFade(0.6, 1400);
                            }, 100);
                        });
                    }, 100);
                }).catch((error) => {
                    console.error('Music load error:', error);
                });
                
                this.screenManager.show('screen-q1').then(() => {
                    this.particleSystem.start('heart', 'q1-particles', { count: 15 });
                });
            });
        }
    }

    _initQ1() {
        const dateSubmitBtn = document.getElementById('q1-date-submit');
        const dateInput = document.getElementById('q1-date-input');
        const nameSubmitBtn = document.getElementById('q1-name-submit');
        const nameInput = document.getElementById('q1-name-input');

        if (dateSubmitBtn) {
            dateSubmitBtn.addEventListener('click', () => this._handleQ1Date());
        }

        if (dateInput) {
            dateInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this._handleQ1Date();
            });
        }

        if (nameSubmitBtn) {
            nameSubmitBtn.addEventListener('click', () => this._handleQ1Name());
        }

        if (nameInput) {
            nameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this._handleQ1Name();
            });
        }
    }

    async _handleQ1Date() {
        const input = document.getElementById('q1-date-input');
        const errorMsg = document.getElementById('q1-date-error');
        const messageDiv = document.getElementById('q1-message');
        const answer = input.value.toLowerCase().trim();

        // Accept various formats: "14 oct", "14/10", "the day we met", "14-10", "1410", etc.
        const validAnswers = [
            '14 oct', '14/10', '14-10', '1410', '14 10',
            'the day we met', 'day we met', 'when we met',
            'october 14', '14th october', 'oct 14', '14th oct',
            'fourteenth october', 'october fourteenth'
        ];
        
        const isCorrect = validAnswers.some(valid => 
            answer.includes(valid) || 
            (answer.includes('14') && (answer.includes('oct') || answer.includes('10'))) ||
            answer.includes('day we met') ||
            answer.includes('we met')
        );

        if (isCorrect) {
            errorMsg.textContent = '';
            input.style.display = 'none';
            document.getElementById('q1-date-submit').style.display = 'none';
            
            // Burst animation on correct answer
            this.particleSystem.burst('q1-particles', 45, { color: '#FFB6C1' });
            
            // Show name question immediately - no delay
            document.getElementById('q1-name-section').style.display = 'block';
            setTimeout(() => {
                document.getElementById('q1-name-input')?.focus();
            }, 50);
            
            // Display sweet message with normal typing speed
            if (messageDiv) {
                Typewriter.type('q1-message', 
                    'Yesh... 14/10. The day we met. The day I first saw you, my princess.',
                    80  // Normal typing speed
                );
            }
        } else {
            errorMsg.textContent = 'Think about our special day... 💕';
            input.value = '';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => { input.style.animation = ''; }, 500);
        }
    }

    async _handleQ1Name() {
        const input = document.getElementById('q1-name-input');
        const errorMsg = document.getElementById('q1-name-error');
        const messageDiv = document.getElementById('q1-name-message');
        const answer = input.value.toLowerCase().trim();

        // Must be "queen"
        const isCorrect = answer === 'queen' || answer.includes('queen');

        if (isCorrect) {
            errorMsg.textContent = '';
            input.style.display = 'none';
            document.getElementById('q1-name-submit').style.display = 'none';
            
            // Display message with typewriter
            if (messageDiv) {
                await Typewriter.type('q1-name-message', 
                    'You are my queen.',
                    80
                );
            }
            
            // Save progress
            DataStore.saveProgress({ step: 1, date: '14/10', name: 'queen' });

            // Particle burst
            this.particleSystem.burst('unlock-container', 40, { color: '#ffd6e0' });

            // Load Lottie
            LottieLoader.load('unlock-lottie', 'assets/animations/hearts_bottom.json', {
                loop: false,
                autoplay: true
            });

            // Transition to unlock screen - instant with more particles
            this.particleSystem.burst('unlock-container', 60, { color: '#ffd6e0' });
            this.screenManager.show('screen-unlock').then(() => {
                // More particles on unlock
                this.particleSystem.start('heart', 'unlock-container', { count: 25 });
                // Quick transition to Q2
        setTimeout(() => {
                    this.screenManager.show('screen-q2').then(() => {
                        this.particleSystem.start('heart', 'q2-particles', { count: 20 });
                    });
                }, 800);
            });
        } else {
            errorMsg.textContent = 'Hint: It starts with Q... 💕';
            input.value = '';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    }

    _initQ2() {
        const submitBtn = document.getElementById('q2-submit');
        const input = document.getElementById('q2-input');
        const nextBtn = document.getElementById('q2-next');

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this._handleQ2());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this._handleQ2();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.screenManager.show('screen-q3').then(() => {
                    this.particleSystem.start('heart', 'q3-particles', { count: 15 });
                    LottieLoader.load('q3-rose', 'assets/animations/rose.json', {
                        loop: true,
                        autoplay: true
                    });
                });
            });
        }
    }

    async _handleQ2() {
        const input = document.getElementById('q2-input');
        const errorMsg = document.getElementById('q2-error');
        const rewardMsg = document.getElementById('q2-reward');
        const answer = input.value.toLowerCase().trim();

        // Accept answers with "melt" in them
        const isCorrect = answer.includes('melt');

        if (isCorrect) {
            errorMsg.textContent = '';
            input.style.display = 'none';
            document.getElementById('q2-submit').style.display = 'none';
            
            // Display message with typewriter
            const messageDiv = document.getElementById('q2-message');
            if (messageDiv) {
                await Typewriter.type('q2-message', 
                    'You melt me every time I see you, beautiful.',
                    80
                );
            }
            
            // Save progress
            DataStore.saveProgress({ step: 2, answer: answer });

            // Burst animation on correct answer
            this.particleSystem.burst('q2-particles', 50, { color: '#FF69B4' });

            // Load heart pulse
            LottieLoader.load('q2-lottie', 'assets/animations/heart_pulse.json', {
                loop: false,
                autoplay: true
            });

            // Show next button with animation
            const nextBtn = document.getElementById('q2-next');
            if (nextBtn) {
                nextBtn.style.display = 'block';
                nextBtn.style.animation = 'fadeInUp 0.5s ease';
            }
        } else {
            errorMsg.textContent = 'Try again, baby! 💕';
            input.value = '';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    }

    _initQ3() {
        const submitBtn = document.getElementById('q3-submit');
        const input = document.getElementById('q3-input');

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this._handleQ3());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this._handleQ3();
            });
        }
    }

    async _handleQ3() {
        const input = document.getElementById('q3-input');
        const errorMsg = document.getElementById('q3-error');
        const messageDiv = document.getElementById('q3-message');
        const answer = input.value.toLowerCase().trim();

        // Accept sunflower answers
        const correctAnswers = ['sunflower', 'sun flower', 'sun-flowers'];
        const isCorrect = correctAnswers.some(correct => 
            answer.includes(correct) || answer === 'sunflower'
        );

        if (isCorrect) {
            errorMsg.textContent = '';
            input.style.display = 'none';
            document.getElementById('q3-submit').style.display = 'none';
            
            // Save progress
            DataStore.saveProgress({ step: 3, answer: answer });

            // Typewriter message with proper styling
            if (messageDiv) {
                await Typewriter.type('q3-message', 
                    'You are my delicate and sweet sunflower.',
                    80
                );
            }

            // Auto transition to game - instant with burst
            this.particleSystem.burst('q3-particles', 50, { color: '#FFD700' });
        setTimeout(() => {
                this.screenManager.show('screen-game').then(() => {
                    this.particleSystem.start('heart', 'game-particles', { count: 20 });
                    GameIntegration.start();
                    this._startCatchHeartsGame();
                });
            }, 1500);
        } else {
            errorMsg.textContent = 'Hint: (ur fav flower, pookie) 💕';
            input.value = '';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    }

    _initQ4() {
        const submitBtn = document.getElementById('q4-submit');
        const input = document.getElementById('q4-input');

        if (submitBtn) {
            submitBtn.addEventListener('click', () => this._handleQ4());
        }

        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this._handleQ4();
            });
        }
    }

    async _handleQ4() {
        const input = document.getElementById('q4-input');
        const errorMsg = document.getElementById('q4-error');
        const answer = input.value.toLowerCase().trim();

        const isCorrect = /(you|kiss|hug|you baby|your kisses|me)/i.test(answer);

        if (isCorrect) {
            errorMsg.textContent = '';
            
            // Save progress
            DataStore.saveProgress({ step: 4, answer: answer });

            // Load rose2
            LottieLoader.load('q4-rose', 'assets/animations/rose2.json', {
                loop: true,
                autoplay: true
            });

            // Typewriter message
            await Typewriter.type('q4-typewriter', 
                'You\'re my sunflower and my rose.\nI can\'t wait to feel your warmth again.', 
                80
            );

            // Auto transition to final - instant with burst
            this.particleSystem.burst('q4-particles', 70, { color: '#FF69B4' });
        setTimeout(() => {
                this.screenManager.show('screen-final').then(() => {
                    this._showFinal();
                });
            }, 1200);
        } else {
            errorMsg.textContent = 'Think about what I want most... 💕';
            input.value = '';
            input.style.animation = 'shake 0.5s';
            setTimeout(() => {
                input.style.animation = '';
        }, 500);
        }
    }

    _initGame() {
        // Listen for gameComplete event
        document.addEventListener('gameComplete', (e) => {
            this._handleGameComplete(e.detail);
        });
    }

    _startCatchHeartsGame() {
        let gameArea = document.getElementById('game-area');
        if (!gameArea) {
            console.error('Game area not found!');
            return;
        }

        // Clear any existing content and listeners
        gameArea.innerHTML = '';
        
        // Reset game state
        let heartsCaught = 0;
        const targetHearts = 10;
        const hearts = [];
        let spawnInterval = null;
        const startTime = Date.now();
        let isGameActive = true;

        const updateScore = () => {
            const scoreEl = document.getElementById('hearts-caught');
            if (scoreEl) scoreEl.textContent = heartsCaught;
        };

        const spawnHeart = () => {
            if (!isGameActive || !gameArea) return;
            
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = '💖';
            
            // Random horizontal position (0-90% to keep within bounds)
            const randomLeft = 5 + Math.random() * 85;
            heart.style.left = `${randomLeft}%`;
            heart.style.top = '0px';
            heart.style.position = 'absolute';
            heart.style.fontSize = 'clamp(1.8rem, 5vw, 2.5rem)';
            heart.style.pointerEvents = 'auto';
            heart.style.cursor = 'pointer';
            heart.style.zIndex = '20';
            heart.style.userSelect = 'none';
            heart.style.animation = 'fallDown 3s linear forwards';
            heart.style.filter = 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.9))';
            heart.style.transition = 'none';
            
            gameArea.appendChild(heart);
            hearts.push(heart);

            // Remove heart after animation completes
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                    const index = hearts.indexOf(heart);
                    if (index > -1) hearts.splice(index, 1);
                }
            }, 3000);
        };

        const handleClick = (e) => {
            if (!isGameActive || !gameArea) return;
            
            const rect = gameArea.getBoundingClientRect();
            const clickX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
            const clickY = e.clientY || (e.touches && e.touches[0]?.clientY) || 0;
            
            const relativeX = clickX - rect.left;
            const relativeY = clickY - rect.top;

            // Check each heart (iterate backwards to safely remove)
            for (let i = hearts.length - 1; i >= 0; i--) {
                const heart = hearts[i];
                if (!heart.parentNode) continue;
                
                const heartRect = heart.getBoundingClientRect();
                const heartX = heartRect.left - rect.left + heartRect.width / 2;
                const heartY = heartRect.top - rect.top + heartRect.height / 2;

                const distance = Math.sqrt(
                    Math.pow(relativeX - heartX, 2) + Math.pow(relativeY - heartY, 2)
                );

                // Hit detection - larger hit area for mobile (60px radius)
                if (distance < 60) {
                    // Create burst effect
                    heart.style.animation = 'none';
                    heart.style.transform = 'scale(2.5)';
                    heart.style.opacity = '0';
                    heart.style.transition = 'all 0.2s ease';
                    
                    setTimeout(() => {
                        if (heart.parentNode) {
                            heart.remove();
                        }
                    }, 200);
                    
                    hearts.splice(i, 1);
                    heartsCaught++;
                    updateScore();

                    if (heartsCaught >= targetHearts) {
                        isGameActive = false;
                        if (spawnInterval) {
                            clearInterval(spawnInterval);
                            spawnInterval = null;
                        }
                        const gameTime = Date.now() - startTime;
                        setTimeout(() => {
                            GameIntegration.onComplete(heartsCaught, gameTime);
                        }, 500);
                    }
                    break; // Only catch one heart per click
                }
            }
        };

        // Add event listeners
        gameArea.addEventListener('click', handleClick);
        gameArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleClick(e);
        }, { passive: false });

        // Start spawning hearts immediately
        updateScore();
        spawnHeart(); // First heart
        
        // Continue spawning hearts every 1.2 seconds
        spawnInterval = setInterval(() => {
            if (isGameActive && heartsCaught < targetHearts && gameArea) {
                spawnHeart();
            } else {
                if (spawnInterval) {
                    clearInterval(spawnInterval);
                    spawnInterval = null;
                }
            }
        }, 1200);
    }

    async _handleGameComplete(detail) {
        const rewardMsg = document.getElementById('game-reward');
        if (rewardMsg) {
            rewardMsg.innerHTML = '<p>You\'re amazing, pookie!</p>';
        }

        // Load squeeze bunny
        LottieLoader.load('game-lottie', 'assets/animations/squeeze_bunny.json', {
            loop: false,
            autoplay: true
        });

        // Save progress
        DataStore.saveProgress({ step: 4, gameScore: detail.score, time: detail.time });

        // Transition to Q4 - instant with burst
        this.particleSystem.burst('game-particles', 60, { color: '#FF1493' });
        setTimeout(() => {
            this.screenManager.show('screen-q4').then(() => {
                this.particleSystem.start('heart', 'q4-particles', { count: 20 });
            });
        }, 600);
    }

    _initFinal() {
        const musicBtn = document.getElementById('final-music-btn');
        const replayBtn = document.getElementById('final-replay-btn');

        if (musicBtn) {
            musicBtn.addEventListener('click', () => {
                if (this.musicController.isPlaying) {
                    this.musicController.pauseFade(800);
                    musicBtn.querySelector('.music-text').textContent = 'Play Music';
                } else {
                    this.musicController.playFade(0.7, 1400);
                    musicBtn.querySelector('.music-text').textContent = 'Pause Music';
                }
            });
        }

        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                this._replay();
            });
        }
    }

    async _showFinal() {
        // Load final animations
        LottieLoader.load('final-heart-pulse', 'assets/animations/heart_pulse.json', {
            loop: true,
            autoplay: true
        });

        LottieLoader.load('final-squeeze-bunny', 'assets/animations/squeeze_bunny.json', {
            loop: true,
            autoplay: true
        });

        // Start particles
        this.particleSystem.start('heart', 'final-particles', { count: 20 });

        // Initialize heart message button
        this._initHeartMessage();

        // Mark final as revealed
        const progress = DataStore.loadProgress();
        if (progress) {
            progress.finalRevealed = true;
            localStorage.setItem('vashuu_progress', JSON.stringify(progress));
        }
    }

    _initHeartMessage() {
        const heartBtn = document.getElementById('heart-message-btn');
        const closeBtn = document.getElementById('close-message-btn');
        const modal = document.getElementById('message-modal');
        const typewriterContainer = document.getElementById('final-typewriter');

        if (heartBtn && modal) {
            heartBtn.addEventListener('click', async () => {
                // Show modal
                modal.classList.add('active');
                
                // If message not yet typed, type it now
                if (typewriterContainer && typewriterContainer.innerHTML.trim() === '') {
                    await Typewriter.type('final-typewriter', 
                        'You are so beautiful — I still can\'t believe I have you.\nYou melt me anytime I think about you, baby.\nYou\'re my sunflower, my rose, my pookie — forever.',
                        100
                    );
                }
                
                // Remove notification badge
                const badge = heartBtn.querySelector('.notification-badge');
                if (badge) {
                    badge.style.display = 'none';
                }
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close on backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }
    }

    _replay() {
        // Reset everything
        this.currentStep = 1;
        this.q1Tries = 0;
        this.gameScore = 0;

        // Clear progress (optional - or keep it)
        // localStorage.removeItem('vashuu_progress');

        // Stop music
        this.musicController.pauseFade(800);

        // Stop all particles
        Object.keys(this.screenManager.screens).forEach(screenId => {
            const screen = this.screenManager.screens[screenId];
            if (screen) {
                const container = screen.querySelector('.particle-container');
                if (container) {
                    this.particleSystem.stop(container.id);
                }
            }
        });

        // Return to landing
        this.screenManager.show('screen-landing');
        this.particleSystem.start('butterfly', 'landing-particles', { count: 12, speed: 'small' });
    }
}

// ============================================
// Initialize App
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new App();
    });
} else {
    window.app = new App();
}
