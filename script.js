// Game Modes Configuration
const GAME_MODES = {
    'ml-g': {
        key: 'ml-g',
        label: 'ml → g',
        page: 'ml-g.html',
        colorName: 'Azul Celeste',
        skyClasses: ['from-sky-400', 'via-sky-300', 'to-sky-200'],
        cloudStroke: '#0284C7',
        smallUnit: 'ml',
        largeUnit: 'g',
        largeNameUpper: 'UM GRAMA DE OURO',
        finishLabel: '1 g<br>Ouro',
        badgeText: 'Desafio em Dupla • 1 Grama (g) = 1.000 ml (mg)',
        formulaText: '(1 g = 1.000 ml / mg)',
        prompts: [
            "Jogador 1 (J) vs Jogador 2 (F): Quem chega primeiro a 1.000 ml (1 g)?",
            "100 ml coletados! Sabia que 1 grama equivale a 1.000 partes (ml/mg)?",
            "200 ml! Excelente ritmo. Quanto falta para 500 ml (meio grama = 0,5 g)?",
            "300 ml no frasco! Cada 100 ml representa 10% de 1 grama completo.",
            "400 ml! Estamos quase na metade da nossa jornada dourada.",
            "Metade do caminho! 500 ml conquistados (= 0,5 g). Continue!",
            "600 ml! O ouro líquido brilha forte e a linha de chegada se aproxima.",
            "700 ml coletados! Faltam apenas 300 ml para completar 1 grama.",
            "800 ml! Reta final, disputa acirrada no laboratório!",
            "900 ml! Apenas mais um passo para alcançar 1 g (1.000 ml)!",
            "1.000 ml atingidos! Chegamos a 1 grama completo!"
        ]
    },
    'g-kg': {
        key: 'g-kg',
        label: 'g → kg',
        page: 'g-kg.html',
        colorName: 'Esmeralda & Âmbar',
        skyClasses: ['from-amber-400', 'via-yellow-300', 'to-amber-100'],
        cloudStroke: '#D97706',
        smallUnit: 'g',
        largeUnit: 'kg',
        largeNameUpper: 'UM QUILOGRAMA DE OURO',
        finishLabel: '1 kg<br>Ouro',
        badgeText: 'Desafio em Dupla • 1 Quilograma (kg) = 1.000 g',
        formulaText: '(1 kg = 1.000 g)',
        prompts: [
            "Jogador 1 (J) vs Jogador 2 (F): Quem chega primeiro a 1.000 g (1 kg)?",
            "100 g coletados! Sabia que 1 quilograma (kg) tem 1.000 gramas?",
            "200 g! Excelente ritmo. Quanto falta para 500 g (meio quilo = 0,5 kg)?",
            "300 g na balança! Cada 100 g representa 10% de 1 quilograma.",
            "400 g! Estamos quase na metade da nossa jornada dourada.",
            "Metade do caminho! 500 g conquistados (= 0,5 kg). Continue!",
            "600 g! As pepitas de ouro estão pesando e a chegada se aproxima.",
            "700 g coletados! Faltam apenas 300 g para completar 1 kg.",
            "800 g! Reta final, disputa acirrada na balança de ouro!",
            "900 g! Apenas mais um passo para alcançar 1 kg (1.000 g)!",
            "1.000 g atingidos! Chegamos a 1 quilograma completo!"
        ]
    },
    'kg-t': {
        key: 'kg-t',
        label: 'kg → t',
        page: 'kg-t.html',
        colorName: 'Ouro Real',
        skyClasses: ['from-red-500', 'via-rose-400', 'to-amber-200'],
        cloudStroke: '#DC2626',
        smallUnit: 'kg',
        largeUnit: 't',
        largeNameUpper: 'UMA TONELADA DE OURO',
        finishLabel: '1 Ton<br>Ouro',
        badgeText: 'Desafio em Dupla • 1 Tonelada (t) = 1.000 kg',
        formulaText: '(1 Tonelada = 1.000 kg)',
        prompts: [
            "Jogador 1 (J) vs Jogador 2 (F): Quem chega primeiro a 1.000 kg (1 t)?",
            "100 kg coletados! Sabia que 1 tonelada (t) tem 1.000 kg?",
            "200 kg! Excelente ritmo. Quanto falta para 500 kg (meia tonelada = 0,5 t)?",
            "300 kg no baú! Cada 100 kg é 10% de uma tonelada completa.",
            "400 kg! Estamos quase na metade da nossa jornada dourada.",
            "Metade do caminho! 500 kg conquistados (= 0,5 t). Continue!",
            "600 kg! O ouro está brilhando forte e a linha de chegada se aproxima.",
            "700 kg coletados! Faltam apenas 300 kg para a meta épica.",
            "800 kg! Reta final, disputa acirrada na mina de ouro!",
            "900 kg! Apenas mais um passo para alcançar 1 tonelada!",
            "1.000 kg atingidos! Chegamos a 1 tonelada completa!"
        ]
    }
};

// Identify mode based on body dataset or path
function detectCurrentMode() {
    const bodyMode = document.body.dataset.mode;
    if (bodyMode && GAME_MODES[bodyMode]) return bodyMode;

    const path = window.location.pathname.toLowerCase();
    if (path.includes('ml-g')) return 'ml-g';
    if (path.includes('g-kg')) return 'g-kg';
    if (path.includes('kg-t')) return 'kg-t';

    return 'kg-t';
}

const currentModeKey = detectCurrentMode();
const currentConfig = GAME_MODES[currentModeKey];

// Game State
let steps = { 1: 0, 2: 0 };
const totalSteps = 10;
let isGameFinished = false;
let confettiAnimationId = null;

// Sound Effects via Web Audio API (zero external assets, ultralight)
let audioCtx = null;
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playStepSound(player) {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        // Player 1 higher pitch, Player 2 lower pitch
        osc.frequency.setValueAtTime(player === 1 ? 440 : 330, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(player === 1 ? 580 : 440, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
    } catch {
        // ignore audio errors
    }
}

function playWinSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const notes = [392, 523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            const startTime = ctx.currentTime + (idx * 0.1);
            osc.frequency.setValueAtTime(freq, startTime);
            gain.gain.setValueAtTime(0.15, startTime);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
            osc.start(startTime);
            osc.stop(startTime + 0.25);
        });
    } catch {
        // ignore audio errors
    }
}

// DOM References
const elements = {
    score1: document.getElementById('score-display-1'),
    score2: document.getElementById('score-display-2'),
    promptMessage: document.getElementById('prompt-message'),
    avatar1: document.getElementById('avatar-1'),
    avatar2: document.getElementById('avatar-2'),
    avatarIcon1: document.getElementById('avatar-icon-1'),
    avatarIcon2: document.getElementById('avatar-icon-2'),
    trackMarkers: document.getElementById('track-markers'),
    mobileBtn1: document.getElementById('mobile-step-btn-1'),
    mobileBtn2: document.getElementById('mobile-step-btn-2'),
    victoryModal: document.getElementById('victory-modal'),
    winnerTitle: document.getElementById('winner-title'),
    winnerSubtitle: document.getElementById('winner-subtitle'),
    victoryHeadline: document.getElementById('victory-headline'),
    victoryFormula: document.getElementById('victory-formula'),
    restartBtn: document.getElementById('restart-btn'),
    confettiCanvas: document.getElementById('confetti-canvas'),
    navModal: document.getElementById('mode-nav-modal'),
    openNavBtn: document.getElementById('change-mode-btn'),
    victoryNavBtn: document.getElementById('victory-change-mode-btn'),
    closeNavBtn: document.getElementById('close-nav-btn')
};

// Character Limbs Animation
function animateCharacterStep(player, stepNum) {
    const legLeft = document.getElementById(`leg-left-${player}`);
    const shoeLeft = document.getElementById(`shoe-left-${player}`);
    const legRight = document.getElementById(`leg-right-${player}`);
    const shoeRight = document.getElementById(`shoe-right-${player}`);
    const armLeft = document.getElementById(`arm-left-${player}`);
    const armRight = document.getElementById(`arm-right-${player}`);

    if (legLeft && legRight) {
        const isOdd = stepNum % 2 === 1;
        if (isOdd) {
            legLeft.setAttribute('d', 'M28 56 L39 74 L44 74');
            shoeLeft.setAttribute('d', 'M38 74 L46 74');
            legRight.setAttribute('d', 'M35 56 L21 75 L16 75');
            shoeRight.setAttribute('d', 'M15 75 L23 75');
            if (armLeft) armLeft.setAttribute('d', 'M26 36 L41 44');
            if (armRight) armRight.setAttribute('d', 'M36 36 L22 48');
        } else {
            legLeft.setAttribute('d', 'M28 56 L22 76 L17 76');
            shoeLeft.setAttribute('d', 'M16 76 L24 76');
            legRight.setAttribute('d', 'M35 56 L42 76 L47 76');
            shoeRight.setAttribute('d', 'M41 76 L49 76');
            if (armLeft) armLeft.setAttribute('d', 'M26 36 L18 48');
            if (armRight) armRight.setAttribute('d', 'M36 36 L45 46');
        }
    }

    const icon = player === 1 ? elements.avatarIcon1 : elements.avatarIcon2;
    if (icon) {
        icon.classList.remove('avatar-stepping');
        void icon.offsetWidth;
        icon.classList.add('avatar-stepping');
    }
}

// Markers on the ground (0 to 10)
function initTrackMarkers() {
    if (!elements.trackMarkers) return;
    elements.trackMarkers.innerHTML = '';
    for (let i = 0; i <= totalSteps; i++) {
        const marker = document.createElement('div');
        marker.className = 'flex flex-col items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-slate-700 text-slate-800 text-xs font-bold transition-all duration-300';
        marker.id = `marker-${i}`;
        marker.innerHTML = `<span>${i}</span>`;
        elements.trackMarkers.appendChild(marker);
    }
}

// Position avatars along the markers
function updateAvatarPositions() {
    if (!elements.avatar1 || !elements.avatar2) return;
    const trackContainer = elements.avatar1.parentElement;
    if (!trackContainer) return;

    const maxStep = Math.max(steps[1], steps[2]);

    [1, 2].forEach(player => {
        const marker = document.getElementById(`marker-${steps[player]}`);
        const avatar = player === 1 ? elements.avatar1 : elements.avatar2;
        if (marker && avatar) {
            const containerRect = trackContainer.getBoundingClientRect();
            const markerRect = marker.getBoundingClientRect();
            const centerOffset = (markerRect.left - containerRect.left) + (markerRect.width / 2);
            avatar.style.left = `${centerOffset}px`;
        }
    });

    for (let i = 0; i <= totalSteps; i++) {
        const m = document.getElementById(`marker-${i}`);
        if (m) {
            if (i <= maxStep) {
                m.className = 'flex flex-col items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500 border-2 border-slate-800 text-white text-xs font-bold shadow-md transform scale-110 transition-all duration-300';
            } else {
                m.className = 'flex flex-col items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-slate-700 text-slate-800 text-xs font-bold transition-all duration-300';
            }
        }
    }
}

// Advance Step
function makeStep(player) {
    if (isGameFinished) return;

    if (steps[player] < totalSteps) {
        steps[player]++;

        playStepSound(player);

        const amount = steps[player] * 100;
        if (player === 1 && elements.score1) {
            elements.score1.textContent = `${amount.toLocaleString('pt-BR')} ${currentConfig.smallUnit}`;
        } else if (player === 2 && elements.score2) {
            elements.score2.textContent = `${amount.toLocaleString('pt-BR')} ${currentConfig.smallUnit}`;
        }

        if (elements.promptMessage) {
            const playerName = player === 1 ? 'Jogador 1' : 'Jogador 2';
            elements.promptMessage.textContent = `${playerName} (Passo ${steps[player]}): ${currentConfig.prompts[steps[player]]}`;
        }

        animateCharacterStep(player, steps[player]);
        updateAvatarPositions();

        if (steps[player] === totalSteps) {
            isGameFinished = true;
            playWinSound();
            setTimeout(() => showVictoryModal(player), 500);
        }
    }
}

// Reset Game on Current Page
function resetGame() {
    steps = { 1: 0, 2: 0 };
    isGameFinished = false;

    if (elements.score1) elements.score1.textContent = `0 ${currentConfig.smallUnit}`;
    if (elements.score2) elements.score2.textContent = `0 ${currentConfig.smallUnit}`;

    if (elements.promptMessage) {
        elements.promptMessage.innerHTML = `<span class="text-amber-600 font-bold">Jogador 1 (J)</span> vs <span class="text-emerald-600 font-bold">Jogador 2 (F)</span>: Quem chega primeiro a 1.000 ${currentConfig.smallUnit} (1 ${currentConfig.largeUnit})?`;
    }

    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }

    if (elements.victoryModal) {
        elements.victoryModal.classList.add('hidden');
    }

    updateAvatarPositions();
}

// Victory Display
function showVictoryModal(winnerPlayer) {
    if (!elements.victoryModal) return;
    const otherPlayer = winnerPlayer === 1 ? 2 : 1;
    const otherAmount = steps[otherPlayer] * 100;

    if (elements.winnerTitle) {
        elements.winnerTitle.textContent = `Parabéns, Jogador ${winnerPlayer}!`;
        elements.winnerTitle.className = winnerPlayer === 1
            ? 'font-fredoka text-2xl sm:text-3xl text-amber-600 font-bold mb-2'
            : 'font-fredoka text-2xl sm:text-3xl text-emerald-600 font-bold mb-2';
    }

    if (elements.victoryHeadline) {
        elements.victoryHeadline.textContent = `VOCÊ GANHOU ${currentConfig.largeNameUpper}!`;
    }

    if (elements.victoryFormula) {
        elements.victoryFormula.textContent = currentConfig.formulaText;
    }

    if (elements.winnerSubtitle) {
        elements.winnerSubtitle.textContent = `Você completou os 10 passos primeiro! O Jogador ${otherPlayer} acumulou ${otherAmount} ${currentConfig.smallUnit} de ouro.`;
    }

    elements.victoryModal.classList.remove('hidden');
    startConfetti();
}

// Fireworks Confetti Canvas
function startConfetti() {
    if (!elements.confettiCanvas) return;
    elements.confettiCanvas.width = elements.confettiCanvas.parentElement.clientWidth;
    elements.confettiCanvas.height = elements.confettiCanvas.parentElement.clientHeight;
    const ctx = elements.confettiCanvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    const colors = ['#f59e0b', '#fbbf24', '#38bdf8', '#4ade80', '#f43f5e', '#a855f7'];

    for (let i = 0; i < 90; i++) {
        particles.push({
            x: elements.confettiCanvas.width / 2,
            y: elements.confettiCanvas.height / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.7) * 12 - 3,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }

    function update() {
        ctx.clearRect(0, 0, elements.confettiCanvas.width, elements.confettiCanvas.height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.3;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        confettiAnimationId = requestAnimationFrame(update);
    }

    update();
}

// Modalidades Navigation Modal Helpers
let wasVictoryModalOpen = false;

function openModeNavModal() {
    if (elements.victoryModal && !elements.victoryModal.classList.contains('hidden')) {
        wasVictoryModalOpen = true;
        elements.victoryModal.classList.add('hidden');
    } else {
        wasVictoryModalOpen = false;
    }

    if (elements.navModal) {
        elements.navModal.classList.remove('hidden');
    }
}

function closeModeNavModal() {
    if (elements.navModal) {
        elements.navModal.classList.add('hidden');
    }

    if (wasVictoryModalOpen && isGameFinished && elements.victoryModal) {
        elements.victoryModal.classList.remove('hidden');
    }
}

// Event Listeners
window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.code === 'KeyJ' || e.key.toLowerCase() === 'j') {
        e.preventDefault();
        makeStep(1);
    } else if (e.code === 'KeyF' || e.key.toLowerCase() === 'f') {
        e.preventDefault();
        makeStep(2);
    } else if (e.key === 'Escape') {
        closeModeNavModal();
    }
});

window.addEventListener('resize', () => {
    updateAvatarPositions();
});

if (elements.mobileBtn1) {
    elements.mobileBtn1.addEventListener('click', () => makeStep(1));
}

if (elements.mobileBtn2) {
    elements.mobileBtn2.addEventListener('click', () => makeStep(2));
}

if (elements.restartBtn) {
    elements.restartBtn.addEventListener('click', resetGame);
}

if (elements.openNavBtn) {
    elements.openNavBtn.addEventListener('click', openModeNavModal);
}

if (elements.victoryNavBtn) {
    elements.victoryNavBtn.addEventListener('click', openModeNavModal);
}

if (elements.closeNavBtn) {
    elements.closeNavBtn.addEventListener('click', closeModeNavModal);
}

// Close nav modal on outside click
if (elements.navModal) {
    elements.navModal.addEventListener('click', (e) => {
        if (e.target === elements.navModal) {
            closeModeNavModal();
        }
    });
}

// Expose helpers globally
window.openModeNavModal = openModeNavModal;
window.closeModeNavModal = closeModeNavModal;
window.resetGame = resetGame;

// Initialize
function initGame() {
    initTrackMarkers();
    updateAvatarPositions();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    initGame();
}
window.addEventListener('load', initGame);