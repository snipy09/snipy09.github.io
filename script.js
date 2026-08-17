/**
 * Sajal Portfolio Preloader & Digital Text Scramble Sequence
 */

// Roles sequence configuration as specified
const PRELOADER_ROLES = [
    {
        text: 'sajal.dev',
        badge: 'ENGINEERING // SYSTEMS ARCHITECT',
        description: 'CORE INFRASTRUCTURE & FULL-STACK SYSTEMS',
        duration: 1600,
        progress: 18
    },
    {
        text: 'sajal.quant',
        badge: 'QUANTITATIVE // ALGORITHMIC TRADING',
        description: 'STATISTICAL ARBITRAGE & HIGH-FREQUENCY RESEARCH',
        duration: 1600,
        progress: 38
    },
    {
        text: 'sajal.ai_engineer',
        badge: 'ARTIFICIAL INTELLIGENCE // NEURAL AGENTS',
        description: 'AUTONOMOUS AGENTS & LARGE FOUNDATION MODELS',
        duration: 1600,
        progress: 58
    },
    {
        text: 'sajal.automation_engineer',
        badge: 'AUTOMATION // ENTERPRISE PIPELINES',
        description: 'DISTRIBUTED WORKFLOWS & ARCHITECTURE',
        duration: 1600,
        progress: 78
    },
    {
        text: 'sajal.founder',
        badge: 'VENTURES // PRODUCT INNOVATION',
        description: 'BUILDING NEXT-GENERATION INTELLIGENT PRODUCTS',
        duration: 1700,
        progress: 92
    },
    {
        text: 'COMING SOON',
        badge: 'PORTFOLIO // LAUNCH PROTOCOL',
        description: 'ALL SYSTEMS COMPILED. STAND BY FOR LAUNCH.',
        duration: 0, // Final state stays indefinitely
        progress: 100
    }
];

// Glitch character palette
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Text Scrambler Class for digital decrypt animations
 */
class TextScrambler {
    constructor(element) {
        this.el = element;
        this.chars = SCRAMBLE_CHARS;
        this.update = this.update.bind(this);
    }

    setText(newText, scrambleDuration = 800) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * (scrambleDuration / 40));
            const end = start + Math.floor(Math.random() * (scrambleDuration / 30)) + 15;
            this.queue.push({ from, to, start, end, char: '' });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                    if (audioController && audioController.enabled && Math.random() < 0.3) {
                        audioController.playTick();
                    }
                }
                output += `<span class="glitch-char" style="color: rgba(255,255,255,${Math.random() * 0.7 + 0.3})">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/**
 * Web Audio Synthesizer for high-tech digital clicks
 */
class SoundController {
    constructor() {
        this.enabled = false;
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.init();
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playTick() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800 + Math.random() * 1200, this.ctx.currentTime);
            gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.03);
        } catch (e) {}
    }

    playLock() {
        if (!this.enabled || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.09);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.09);
        } catch (e) {}
    }
}

// Global instances
let audioController = new SoundController();
let scrambler = null;
let currentProgress = 0;
let animationTimeoutId = null;

// DOM Elements
const scrambleTextEl = document.getElementById('scramble-text');
const roleBadgeEl = document.getElementById('role-badge');
const roleDescEl = document.getElementById('role-description');
const progressFillEl = document.getElementById('progress-bar-fill');
const progressPercentEl = document.getElementById('progress-percent');
const progressStatusEl = document.getElementById('progress-status');
const soundBtn = document.getElementById('sound-btn');
const replayBtn = document.getElementById('replay-btn');
const telemetryHashEl = document.getElementById('telemetry-hash');
const telemetryModuleEl = document.getElementById('telemetry-module');

/**
 * Animate progress bar smoothly to target percentage
 */
function animateProgress(targetPercent, duration = 800) {
    const start = currentProgress;
    const startTime = performance.now();

    function updateProgress(now) {
        const elapsed = now - startTime;
        const progressFactor = Math.min(elapsed / duration, 1);
        
        currentProgress = Math.floor(start + (targetPercent - start) * progressFactor);
        if (progressFillEl) progressFillEl.style.width = `${currentProgress}%`;
        if (progressPercentEl) progressPercentEl.textContent = `${currentProgress < 10 ? '0' : ''}${currentProgress}%`;

        if (progressFactor < 1) {
            requestAnimationFrame(updateProgress);
        }
    }
    requestAnimationFrame(updateProgress);
}

/**
 * Update telemetry hash
 */
function updateTelemetry(moduleName) {
    if (telemetryHashEl) {
        const hex = Math.random().toString(16).substring(2, 10).toUpperCase();
        telemetryHashEl.textContent = `0x${hex}`;
    }
    if (telemetryModuleEl && moduleName) {
        telemetryModuleEl.textContent = `MODULE: ${moduleName.toUpperCase()}`;
    }
}

/**
 * Run the preloader sequence
 */
async function runPreloaderSequence() {
    clearTimeout(animationTimeoutId);
    currentProgress = 0;
    
    if (replayBtn) replayBtn.classList.add('hidden');
    scrambleTextEl.classList.remove('is-final');

    // Step 0: Random chaotic initial boot scramble
    roleBadgeEl.textContent = 'BOOT_SEQUENCE';
    roleDescEl.textContent = 'INITIALIZING DIGITAL REPOSITORY...';
    animateProgress(5, 500);
    updateTelemetry('INIT_BOOT');
    
    await scrambler.setText('010101010101', 600);
    await new Promise(r => animationTimeoutId = setTimeout(r, 250));

    // Iterate through all roles
    for (let i = 0; i < PRELOADER_ROLES.length; i++) {
        const role = PRELOADER_ROLES[i];
        const isFinal = (i === PRELOADER_ROLES.length - 1);
        
        // Update badges and descriptions
        roleBadgeEl.textContent = role.badge;
        roleDescEl.textContent = role.description;
        progressStatusEl.textContent = isFinal ? 'STATUS // LOCKED' : `LOADING // ${role.text.toUpperCase()}`;
        updateTelemetry(role.text.replace('.', '_'));

        // Animate progress
        animateProgress(role.progress, 700);

        // Flash glitch class
        scrambleTextEl.classList.add('glitch-flash');
        setTimeout(() => scrambleTextEl.classList.remove('glitch-flash'), 220);

        // Run character scramble morph
        await scrambler.setText(role.text, isFinal ? 850 : 650);
        audioController.playLock();

        if (isFinal) {
            // Reached final state (COMING SOON)
            scrambleTextEl.classList.add('is-final');
            if (replayBtn) replayBtn.classList.remove('hidden');
            break;
        }

        // Pause before morphing to next role
        await new Promise(r => animationTimeoutId = setTimeout(r, role.duration));
    }
}

/**
 * Ambient Background Particles
 */
function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(width > 768 ? 40 : 20, 45);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.3 + 0.08
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(render);
    }
    render();
}

/**
 * Event Listeners
 */
function setupEvents() {
    // Sound toggle
    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            const isOn = audioController.toggle();
            const btnText = soundBtn.querySelector('.btn-label');
            if (btnText) {
                btnText.textContent = isOn ? 'SOUND [ON]' : 'SOUND [OFF]';
            }
            soundBtn.classList.toggle('active', isOn);
            if (isOn) audioController.playLock();
        });
    }

    // Replay button
    if (replayBtn) {
        replayBtn.addEventListener('click', () => {
            runPreloaderSequence();
        });
    }
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    scrambler = new TextScrambler(scrambleTextEl);
    initAmbientCanvas();
    setupEvents();
    runPreloaderSequence();
});
