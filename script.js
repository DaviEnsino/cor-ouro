// Game Modes Configuration (ml->g, g->kg, kg->t)
        const gameModes = {
            'ml-g': {
                label: 'ml → g',
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
                label: 'g → kg',
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
                label: 'kg → t',
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

        // Game State Variables
        let currentModeKey = 'kg-t';
        let isModeSelected = false;
        let steps = { 1: 0, 2: 0 };
        const totalSteps = 10;
        let isGameFinished = false;

        // DOM Elements
        const skyBody = document.getElementById('sky-body');
        const cloudOutlines = document.querySelectorAll('.cloud-outline');
        const modeModal = document.getElementById('mode-modal');
        const modeSubtitle = document.getElementById('mode-subtitle');
        const changeModeBtn = document.getElementById('change-mode-btn');
        const victoryChangeModeBtn = document.getElementById('victory-change-mode-btn');
        const finishGoalLabel = document.getElementById('finish-goal-label');
        const conversionBadge = document.getElementById('conversion-badge');
        const stepIncrementLabels = document.querySelectorAll('.step-increment-label');
        const victoryHeadline = document.getElementById('victory-headline');
        const victoryFormula = document.getElementById('victory-formula');
        const scoreDisplays = {
            1: document.getElementById('score-display-1'),
            2: document.getElementById('score-display-2')
        };
        const promptMessage = document.getElementById('prompt-message');
        const avatars = {
            1: document.getElementById('avatar-1'),
            2: document.getElementById('avatar-2')
        };
        const avatarIcons = {
            1: document.getElementById('avatar-icon-1'),
            2: document.getElementById('avatar-icon-2')
        };
        const trackMarkers = document.getElementById('track-markers');
        const mobileStepBtn1 = document.getElementById('mobile-step-btn-1');
        const mobileStepBtn2 = document.getElementById('mobile-step-btn-2');
        const victoryModal = document.getElementById('victory-modal');
        const winnerTitle = document.getElementById('winner-title');
        const winnerSubtitle = document.getElementById('winner-subtitle');
        const restartBtn = document.getElementById('restart-btn');
        const confettiCanvas = document.getElementById('confetti-canvas');

        // Select Mode and start/reset game
        function selectMode(modeKey) {
            currentModeKey = modeKey;
            isModeSelected = true;
            const cfg = gameModes[currentModeKey];

            // Atualiza a cor do céu e contorno das nuvens conforme a modalidade
            const allSkyClasses = Object.values(gameModes).flatMap(m => m.skyClasses);
            skyBody.classList.remove(...allSkyClasses);
            skyBody.classList.add(...cfg.skyClasses);
            cloudOutlines.forEach(path => path.setAttribute('stroke', cfg.cloudStroke));

            modeSubtitle.textContent = `Matemática • 6º Ano • ${cfg.label}`;
            finishGoalLabel.innerHTML = cfg.finishLabel;
            conversionBadge.textContent = cfg.badgeText;
            stepIncrementLabels.forEach(el => el.textContent = `100 ${cfg.smallUnit}`);

            modeModal.classList.add('hidden');
            resetGame();
        }

        function openModeSelector() {
            if (confettiAnimationId) {
                cancelAnimationFrame(confettiAnimationId);
            }
            isModeSelected = false;
            victoryModal.classList.add('hidden');
            modeModal.classList.remove('hidden');
        }

        // Animate Character Limbs on Step
        function animateCharacterStep(player, stepNum) {
            const legLeft = document.getElementById(`leg-left-${player}`);
            const shoeLeft = document.getElementById(`shoe-left-${player}`);
            const legRight = document.getElementById(`leg-right-${player}`);
            const shoeRight = document.getElementById(`shoe-right-${player}`);
            const armLeft = document.getElementById(`arm-left-${player}`);
            const armRight = document.getElementById(`arm-right-${player}`);

            if (!legLeft || !legRight) return;

            const isOdd = stepNum % 2 === 1;
            if (isOdd) {
                legLeft.setAttribute('d', 'M28 56 L39 74 L44 74');
                shoeLeft.setAttribute('d', 'M38 74 L46 74');
                legRight.setAttribute('d', 'M35 56 L21 75 L16 75');
                shoeRight.setAttribute('d', 'M15 75 L23 75');
                armLeft.setAttribute('d', 'M26 36 L41 44');
                armRight.setAttribute('d', 'M36 36 L22 48');
            } else {
                legLeft.setAttribute('d', 'M28 56 L22 76 L17 76');
                shoeLeft.setAttribute('d', 'M16 76 L24 76');
                legRight.setAttribute('d', 'M35 56 L42 76 L47 76');
                shoeRight.setAttribute('d', 'M41 76 L49 76');
                armLeft.setAttribute('d', 'M26 36 L18 48');
                armRight.setAttribute('d', 'M36 36 L45 46');
            }

            avatarIcons[player].classList.remove('avatar-stepping');
            void avatarIcons[player].offsetWidth;
            avatarIcons[player].classList.add('avatar-stepping');
        }

        // Initialize Track Markers (0 to 10)
        function initTrackMarkers() {
            trackMarkers.innerHTML = '';
            for (let i = 0; i <= totalSteps; i++) {
                const marker = document.createElement('div');
                marker.className = `flex flex-col items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-700 border-2 border-slate-600 text-white text-xs font-bold transition-all duration-300`;
                marker.id = `marker-${i}`;
                marker.innerHTML = `<span>${i}</span>`;
                trackMarkers.appendChild(marker);
            }
        }

        // Update Avatars Positions aligned with markers 0 to 10
        function updateAvatarPositions() {
            const trackContainer = avatars[1].parentElement;
            const maxStep = Math.max(steps[1], steps[2]);

            [1, 2].forEach(player => {
                const currentMarker = document.getElementById(`marker-${steps[player]}`);
                if (currentMarker && trackContainer) {
                    const containerRect = trackContainer.getBoundingClientRect();
                    const markerRect = currentMarker.getBoundingClientRect();
                    const centerOffset = (markerRect.left - containerRect.left) + (markerRect.width / 2);
                    avatars[player].style.left = `${centerOffset}px`;
                }
            });

            // Update marker styles up to the leading player
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

        // Advance Step Logic for Player 1 or Player 2
        function makeStep(player) {
            if (!isModeSelected || isGameFinished) return;

            const cfg = gameModes[currentModeKey];

            if (steps[player] < totalSteps) {
                steps[player]++;
                
                // Update Score (+100 units per step)
                const amount = steps[player] * 100;
                scoreDisplays[player].textContent = `${amount.toLocaleString('pt-BR')} ${cfg.smallUnit}`;

                // Update Prompt Message with leading player context
                const playerName = player === 1 ? 'Jogador 1' : 'Jogador 2';
                promptMessage.textContent = `${playerName} (Passo ${steps[player]}): ${cfg.prompts[steps[player]]}`;

                // Animate limbs & Update Position
                animateCharacterStep(player, steps[player]);
                updateAvatarPositions();

                // Check Victory Condition
                if (steps[player] === totalSteps) {
                    isGameFinished = true;
                    setTimeout(() => showVictoryModal(player), 600);
                }
            }
        }

        // Reset Game
        function resetGame() {
            const cfg = gameModes[currentModeKey];
            steps = { 1: 0, 2: 0 };
            isGameFinished = false;
            scoreDisplays[1].textContent = `0 ${cfg.smallUnit}`;
            scoreDisplays[2].textContent = `0 ${cfg.smallUnit}`;
            promptMessage.innerHTML = `<span class="text-amber-600 font-bold">Jogador 1 (J)</span> vs <span class="text-emerald-600 font-bold">Jogador 2 (F)</span>: Quem chega primeiro a 1.000 ${cfg.smallUnit} (1 ${cfg.largeUnit})?`;
            updateAvatarPositions();
            victoryModal.classList.add('hidden');
        }

        // Show Victory Modal and run Confetti
        function showVictoryModal(winnerPlayer) {
            const cfg = gameModes[currentModeKey];
            const otherPlayer = winnerPlayer === 1 ? 2 : 1;
            const otherAmount = steps[otherPlayer] * 100;

            winnerTitle.textContent = `Parabéns, Jogador ${winnerPlayer}!`;
            winnerTitle.className = winnerPlayer === 1
                ? 'font-fredoka text-2xl sm:text-3xl text-amber-600 font-bold mb-2'
                : 'font-fredoka text-2xl sm:text-3xl text-emerald-600 font-bold mb-2';
            victoryHeadline.textContent = `VOCÊ GANHOU ${cfg.largeNameUpper}!`;
            victoryFormula.textContent = cfg.formulaText;
            winnerSubtitle.textContent = `Você completou os 10 passos primeiro! O Jogador ${otherPlayer} acumulou ${otherAmount} ${cfg.smallUnit} de ouro.`;

            victoryModal.classList.remove('hidden');
            startConfetti();
        }

        // Simple Canvas Confetti Fireworks Effect
        let confettiAnimationId;
        function startConfetti() {
            confettiCanvas.width = confettiCanvas.parentElement.clientWidth;
            confettiCanvas.height = confettiCanvas.parentElement.clientHeight;
            const ctx = confettiCanvas.getContext('2d');

            let particles = [];
            const colors = ['#f59e0b', '#fbbf24', '#38bdf8', '#4ade80', '#f43f5e', '#a855f7'];

            for (let i = 0; i < 100; i++) {
                particles.push({
                    x: confettiCanvas.width / 2,
                    y: confettiCanvas.height / 2,
                    vx: (Math.random() - 0.5) * 12,
                    vy: (Math.random() - 0.7) * 12 - 3,
                    size: Math.random() * 8 + 4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 10
                });
            }

            function updateConfetti() {
                ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.3; // gravity
                    p.rotation += p.rotationSpeed;

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                });

                confettiAnimationId = requestAnimationFrame(updateConfetti);
            }

            updateConfetti();
        }

        // Event Listeners
        window.addEventListener('keydown', (e) => {
            if (e.repeat) return; // Evita segurar a tecla para correr sozinho
            if (e.code === 'KeyJ' || e.key.toLowerCase() === 'j') {
                e.preventDefault();
                makeStep(1);
            } else if (e.code === 'KeyF' || e.key.toLowerCase() === 'f') {
                e.preventDefault();
                makeStep(2);
            }
        });

        window.addEventListener('resize', () => {
            updateAvatarPositions();
        });

        mobileStepBtn1.addEventListener('click', () => {
            makeStep(1);
        });

        mobileStepBtn2.addEventListener('click', () => {
            makeStep(2);
        });

        restartBtn.addEventListener('click', () => {
            if (confettiAnimationId) {
                cancelAnimationFrame(confettiAnimationId);
            }
            resetGame();
        });

        changeModeBtn.addEventListener('click', openModeSelector);
        victoryChangeModeBtn.addEventListener('click', openModeSelector);

        // Initialize on load
        window.onload = () => {
            initTrackMarkers();
            updateAvatarPositions();
        };