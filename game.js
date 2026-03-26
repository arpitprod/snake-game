// Game Constants
const GRID_SIZE = 20;
const COLORS = {
    snakeHead: '#00ff88',
    snakeBody: '#00cc6a',
    food: '#ff6b6b',
    obstacle: '#ff8c00',
    powerUpSpeed: '#00d4ff',
    powerUpInvincible: '#ff00ff',
    gridLines: 'rgba(255, 255, 255, 0.05)',
    background: 'rgba(0, 0, 0, 0.3)'
};

// Speed levels (in milliseconds per frame)
const SPEEDS = {
    level1: 200,
    level2: 180,
    level3: 160,
    level4: 140,
    level5: 120,
    level6: 100,
    level7: 90,
    level8: 80,
    level9: 70,
    level10: 60
};

// Game States
const GAME_STATES = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAMEOVER: 'GAMEOVER'
};

// Game State
let gameState = GAME_STATES.MENU;
let currentSpeed = SPEEDS.level1;
let gameLoop = null;
let lastUpdateTime = 0;
let isSoundEnabled = true;

// Game Data
let snake = [];
let food = null;
let obstacles = [];
let powerUps = [];
let score = 0;
let highScore = 0;
let level = 1;
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let isInvincible = false;
let powerUpTimer = null;
let gridWidth = 20;
let gridHeight = 20;

// DOM Elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
const highScoreDisplay = document.getElementById('high-score-display');
const levelDisplay = document.getElementById('level-display');
const startMenu = document.getElementById('start-menu');
const gameOverScreen = document.getElementById('game-over');
const mobileControls = document.getElementById('mobile-controls');
const pauseBtn = document.getElementById('pause-btn');
const pauseMenu = document.getElementById('pause-menu');

// Initialize Game
function init() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setupInputHandlers();
    loadHighScore();
    renderStartMenu();
}

// Resize Canvas
function resizeCanvas() {
    const maxSize = Math.min(window.innerWidth - 40, window.innerHeight - 100);
    const size = Math.floor(maxSize / GRID_SIZE) * GRID_SIZE;
    canvas.width = size;
    canvas.height = size;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';

    // Calculate grid dimensions based on canvas size
    gridWidth = Math.floor(canvas.width / GRID_SIZE);
    gridHeight = Math.floor(canvas.height / GRID_SIZE);
}

// Setup Input Handlers
function setupInputHandlers() {
    // Keyboard controls
    document.addEventListener('keydown', handleKeyDown);

    // Mobile controls
    document.querySelectorAll('.control-btn[data-direction]').forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            handleDirection(btn.dataset.direction);
        });
        btn.addEventListener('click', () => {
            handleDirection(btn.dataset.direction);
        });
    });

    // Speed selection
    const difficultySelect = document.getElementById('difficulty');
    difficultySelect.addEventListener('change', () => {
      currentSpeed = SPEEDS[difficultySelect.value];
    });

    // Start button
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', startGame);
    document.getElementById('back-menu-btn').addEventListener('click', backToMenu);

    // Sound toggle
    document.getElementById('sound-toggle').addEventListener('change', (e) => {
        isSoundEnabled = e.target.checked;
        if (!isSoundEnabled) {
            document.querySelector('.sound-toggle span').textContent = '🔇 Sound Off';
        } else {
            document.querySelector('.sound-toggle span').textContent = '🔊 Sound On';
        }
    });

    // Pause button
    pauseBtn.addEventListener('click', togglePause);

    // Pause menu buttons
    document.getElementById('pause-resume').addEventListener('click', () => {
        if (gameState === GAME_STATES.PAUSED) {
            togglePause();
        }
    });
    document.getElementById('pause-restart').addEventListener('click', () => {
        if (gameState === GAME_STATES.PAUSED) {
            togglePause();
            startGame();
        }
    });
    document.getElementById('pause-quit').addEventListener('click', () => {
        if (gameState === GAME_STATES.PAUSED) {
            backToMenu();
        }
    });
}

// Handle Keyboard Input
function handleKeyDown(e) {
    if (gameState === GAME_STATES.MENU) {
        if (e.key === 'Enter' || e.key === ' ') {
            startGame();
        }
        return;
    }

    if (gameState === GAME_STATES.GAMEOVER) {
        if (e.key === 'Enter' || e.key === ' ') {
            startGame();
        }
        return;
    }

    if (gameState === GAME_STATES.PAUSED) {
        if (e.key === ' ' || e.key === 'Escape') {
            togglePause();
        }
        return;
    }

    // Direction controls (prevent 180-degree turns)
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            handleDirection('up');
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            handleDirection('down');
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            handleDirection('left');
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            handleDirection('right');
            break;
        case ' ':
        case 'Escape':
            togglePause();
            break;
    }
}

// Handle Direction Changes
function handleDirection(dir) {
    if (gameState !== GAME_STATES.PLAYING) return;

    switch(dir) {
        case 'up':
            if (direction.y !== 1) nextDirection = { x: 0, y: -1 };
            break;
        case 'down':
            if (direction.y !== -1) nextDirection = { x: 0, y: 1 };
            break;
        case 'left':
            if (direction.x !== 1) nextDirection = { x: -1, y: 0 };
            break;
        case 'right':
            if (direction.x !== -1) nextDirection = { x: 1, y: 0 };
            break;
    }
}

// Start Game
function startGame() {
    // Reset game state
    snake = [
        { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) },
        { x: Math.floor(gridWidth / 2) - 1, y: Math.floor(gridHeight / 2) },
        { x: Math.floor(gridWidth / 2) - 2, y: Math.floor(gridHeight / 2) }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    level = 1;
    isInvincible = false;
    obstacles = [];
    powerUps = [];

    // Update UI
    updateHUD();
    startMenu.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    mobileControls.classList.remove('hidden');

    // Generate initial content
    spawnFood();
    generateObstacles();

    // Start game loop
    gameState = GAME_STATES.PLAYING;
    lastUpdateTime = performance.now();
    gameLoop = requestAnimationFrame(update);
}

// Game Loop
function update(currentTime) {
    if (gameState !== GAME_STATES.PLAYING) return;

    gameLoop = requestAnimationFrame(update);

    const deltaTime = currentTime - lastUpdateTime;

    if (deltaTime >= currentSpeed) {
        lastUpdateTime = currentTime;
        moveSnake();
    }

    render();
}

// Move Snake
function moveSnake() {
    direction = { ...nextDirection };

    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    // Check wall collision
    if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
        handleGameOver();
        return;
    }

    // Check self collision (unless invincible)
    if (!isInvincible) {
        for (let segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                handleGameOver();
                return;
            }
        }
    }

    // Add new head
    snake.unshift(head);

    // Check power-up collision
    const powerUpIndex = powerUps.findIndex(p => p.x === head.x && p.y === head.y);
    if (powerUpIndex !== -1) {
        activatePowerUp(powerUps[powerUpIndex]);
        showPowerUpNotification(powerUps[powerUpIndex]);
        powerUps.splice(powerUpIndex, 1);
    }

    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10 * level;
        playSound('eat');
        spawnFood();

        // Level up every 50 points
        if (score > 0 && score % 50 === 0) {
            level++;
            currentSpeed = Math.max(50, currentSpeed - 10);
        }

        updateHUD();
    } else {
        snake.pop();
    }

    // Check obstacle collision
    for (let obstacle of obstacles) {
        if (head.x === obstacle.x && head.y === obstacle.y) {
            handleGameOver();
            return;
        }
    }
}

// Spawn Food
function spawnFood() {
    let validPosition = false;
    while (!validPosition) {
        food = {
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight),
            type: 'normal'
        };

        // Check if on snake or obstacles
        validPosition = true;
        for (let segment of snake) {
            if (segment.x === food.x && segment.y === food.y) {
                validPosition = false;
                break;
            }
        }
        for (let obstacle of obstacles) {
            if (obstacle.x === food.x && obstacle.y === food.y) {
                validPosition = false;
                break;
            }
        }
    }

    // 10% chance to spawn power-up
    if (Math.random() < 0.1) {
        spawnPowerUp();
    }
}

// Spawn Power-up
function spawnPowerUp() {
    let validPosition = false;
    while (!validPosition) {
        const type = Math.random() < 0.5 ? 'speed' : 'invincible';
        powerUps.push({
            x: Math.floor(Math.random() * gridWidth),
            y: Math.floor(Math.random() * gridHeight),
            type: type,
            spawnedAt: Date.now()
        });

        validPosition = true;
        for (let segment of snake) {
            if (segment.x === powerUps[powerUps.length - 1].x &&
                segment.y === powerUps[powerUps.length - 1].y) {
                validPosition = false;
                break;
            }
        }
        for (let obstacle of obstacles) {
            if (obstacle.x === powerUps[powerUps.length - 1].x &&
                obstacle.y === powerUps[powerUps.length - 1].y) {
                validPosition = false;
                break;
            }
        }
    }
}

// Show Power-up Notification
function showPowerUpNotification(powerUp) {
    const container = document.getElementById('powerup-notifications');
    if (!container) return;

    const notification = document.createElement('div');
    notification.className = `powerup-notification ${powerUp.type}`;

    if (powerUp.type === 'speed') {
        notification.innerHTML = `
            <div class="powerup-icon">⚡</div>
            <div class="powerup-content">
                <h3>⚡ SPEED BOOST!</h3>
                <p>Snake moves super fast for 5 seconds</p>
            </div>
        `;
    } else if (powerUp.type === 'invincible') {
        notification.innerHTML = `
            <div class="powerup-icon">🛡️</div>
            <div class="powerup-content">
                <h3>🛡️ INVINCIBLE!</h3>
                <p>You can't die for 5 seconds - flash the screen!</p>
            </div>
        `;
    }

    container.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

// Activate Power-up
function activatePowerUp(powerUp) {
    playSound('powerup');

    if (powerUp.type === 'speed') {
        currentSpeed = SPEEDS.level1;
    } else if (powerUp.type === 'invincible') {
        isInvincible = true;
        if (powerUpTimer) clearTimeout(powerUpTimer);
        powerUpTimer = setTimeout(() => {
            isInvincible = false;
        }, 5000);
    }

    score += 50;
    updateHUD();
}

// Generate Obstacles
function generateObstacles() {
    obstacles = [];
    const numObstacles = level * 2;

    for (let i = 0; i < numObstacles; i++) {
        let validPosition = false;
        while (!validPosition) {
            obstacles.push({
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight)
            });

            validPosition = true;
            // Don't spawn near snake head
            for (let segment of snake) {
                if (segment.x === obstacles[obstacles.length - 1].x &&
                    segment.y === obstacles[obstacles.length - 1].y) {
                    validPosition = false;
                    break;
                }
            }
        }
    }
}

// Handle Game Over
function handleGameOver() {
    gameState = GAME_STATES.GAMEOVER;
    cancelAnimationFrame(gameLoop);
    playSound('die');

    // Update high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeGameHighScore', highScore);
        document.getElementById('new-high-score').classList.remove('hidden');
    } else {
        document.getElementById('new-high-score').classList.add('hidden');
    }

    // Update final score display
    document.getElementById('final-score').textContent = score;
    document.getElementById('final-level').textContent = level;

    // Show game over screen
    mobileControls.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
}

// Toggle Pause
function togglePause() {
    if (gameState === GAME_STATES.PLAYING) {
        gameState = GAME_STATES.PAUSED;
        cancelAnimationFrame(gameLoop);
        pauseBtn.textContent = '▶';
        pauseMenu.classList.remove('hidden');
    } else if (gameState === GAME_STATES.PAUSED) {
        gameState = GAME_STATES.PLAYING;
        lastUpdateTime = performance.now();
        gameLoop = requestAnimationFrame(update);
        pauseBtn.textContent = '⏸';
        pauseMenu.classList.add('hidden');
    }
}

// Back to Menu
function backToMenu() {
    gameState = GAME_STATES.MENU;
    cancelAnimationFrame(gameLoop);
    gameOverScreen.classList.add('hidden');
    mobileControls.classList.add('hidden');
    renderStartMenu();
}

// Update HUD
function updateHUD() {
    scoreDisplay.textContent = `Score: ${score}`;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    levelDisplay.textContent = `Level: ${level}`;
}

// Render Game
function render() {
    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = COLORS.gridLines;
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridWidth; i++) {
        const pos = (i * GRID_SIZE);
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }

    // Draw obstacles
    for (let obstacle of obstacles) {
        ctx.fillStyle = COLORS.obstacle;
        ctx.fillRect(
            obstacle.x * GRID_SIZE + 2,
            obstacle.y * GRID_SIZE + 2,
            GRID_SIZE - 4,
            GRID_SIZE - 4
        );

        // Add visual detail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(
            obstacle.x * GRID_SIZE + 4,
            obstacle.y * GRID_SIZE + 4,
            GRID_SIZE - 8,
            GRID_SIZE - 8
        );
    }

    // Draw power-ups
    const now = Date.now();
    for (let powerUp of powerUps) {
        const pulse = Math.sin((now - powerUp.spawnedAt) / 200) * 0.2 + 0.8;

        if (powerUp.type === 'speed') {
            ctx.fillStyle = COLORS.powerUpSpeed;
        } else {
            ctx.fillStyle = COLORS.powerUpInvincible;
        }

        ctx.beginPath();
        ctx.arc(
            powerUp.x * GRID_SIZE + GRID_SIZE / 2,
            powerUp.y * GRID_SIZE + GRID_SIZE / 2,
            (GRID_SIZE / 3) * pulse,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Glow effect
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // Draw food
    const foodPulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
    ctx.fillStyle = COLORS.food;
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        (GRID_SIZE / 3) * foodPulse,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Food glow
    ctx.shadowColor = COLORS.food;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    for (let i = snake.length - 1; i >= 0; i--) {
        const segment = snake[i];

        if (isInvincible && i === 0) {
            // Flash effect for invincible snake head
            const flash = Math.sin(Date.now() / 100) > 0;
            ctx.fillStyle = flash ? '#ffffff' : COLORS.snakeHead;
        } else if (i === 0) {
            ctx.fillStyle = COLORS.snakeHead;
        } else {
            ctx.fillStyle = COLORS.snakeBody;
        }

        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );

        // Draw eyes on head
        if (i === 0) {
            ctx.fillStyle = '#1a1a2e';
            const eyeSize = 3;
            const eyeOffset = 4;

            if (direction.x === 1) {
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - eyeOffset, segment.y * GRID_SIZE + eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - eyeOffset, segment.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            } else if (direction.x === -1) {
                ctx.fillRect(segment.x * GRID_SIZE + eyeOffset - eyeSize, segment.y * GRID_SIZE + eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + eyeOffset - eyeSize, segment.y * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            } else if (direction.y === 1) {
                ctx.fillRect(segment.x * GRID_SIZE + eyeOffset, segment.y * GRID_SIZE + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize, segment.y * GRID_SIZE + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
            } else {
                ctx.fillRect(segment.x * GRID_SIZE + eyeOffset, segment.y * GRID_SIZE + eyeOffset - eyeSize, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - eyeOffset - eyeSize, segment.y * GRID_SIZE + eyeOffset - eyeSize, eyeSize, eyeSize);
            }
        }
    }

}

// Render Start Menu
function renderStartMenu() {
    // Clear and render static start menu
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = COLORS.gridLines;
    ctx.lineWidth = 1;
    for (let i = 0; i <= gridWidth; i++) {
        const pos = (i * GRID_SIZE);
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }

    // Draw a demo snake
    const demoSnake = [
        { x: 8, y: 10 },
        { x: 7, y: 10 },
        { x: 6, y: 10 }
    ];
    const demoFood = { x: 15, y: 8 };

    for (let i = demoSnake.length - 1; i >= 0; i--) {
        const segment = demoSnake[i];
        ctx.fillStyle = i === 0 ? COLORS.snakeHead : COLORS.snakeBody;
        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
    }

    ctx.fillStyle = COLORS.food;
    ctx.beginPath();
    ctx.arc(
        demoFood.x * GRID_SIZE + GRID_SIZE / 2,
        demoFood.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Sound Management
function playSound(type) {
    if (!isSoundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
        case 'eat':
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;

        case 'die':
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            break;

        case 'powerup':
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1600, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
    }
}

// Load High Score
function loadHighScore() {
    const saved = localStorage.getItem('snakeGameHighScore');
    if (saved) {
        highScore = parseInt(saved, 10);
        updateHUD();
    }
}

// Start
init();