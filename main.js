// Game Configuration
const FLIP_DURATION = 1000;

// DOM Elements
const startButton = document.querySelector(".control-buttons span");
const blocksContainer = document.querySelector(".game-container");
const blocks = Array.from(blocksContainer.children);
const orderRange = Array.from(Array(blocks.length).keys());

// Initialize game
function initializeGame() {
    shuffleArray(orderRange);
    setupBlocks();
}

// Event Listeners
startButton.addEventListener('click', handleGameStart);

// Game Logic Functions
function handleGameStart() {
    const playerName = prompt("What's your name?");
    const nameDisplay = document.querySelector(".name span");
    
    nameDisplay.innerHTML = playerName || 'Unknown';
    document.querySelector(".control-buttons").remove();
}

function setupBlocks() {
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];
        block.addEventListener('click', () => handleBlockClick(block));
    });
}

function handleBlockClick(selectedBlock) {
    selectedBlock.classList.add('is-flipped');
    
    const flippedBlocks = blocks.filter(block => block.classList.contains('is-flipped'));
    
    if (flippedBlocks.length === 2) {
        disableClicking();
        checkForMatch(flippedBlocks[0], flippedBlocks[1]);
    }
}

function disableClicking() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, FLIP_DURATION);
}

function checkForMatch(firstBlock, secondBlock) {
    const triesElement = document.querySelector('.tries span');
    
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        handleSuccessfulMatch(firstBlock, secondBlock);
    } else {
        handleFailedMatch(firstBlock, secondBlock, triesElement);
    }
}

function handleSuccessfulMatch(firstBlock, secondBlock) {
    firstBlock.classList.remove('is-flipped');
    secondBlock.classList.remove('is-flipped');
    
    firstBlock.classList.add('has-match');
    secondBlock.classList.add('has-match');
    
    const successSound = document.getElementById('success');
    successSound.currentTime = 0;
    successSound.play().catch(error => console.log('Audio play failed:', error));
}

function handleFailedMatch(firstBlock, secondBlock, triesElement) {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    
    setTimeout(() => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
    }, FLIP_DURATION);
    
    const failSound = document.getElementById('fail');
    failSound.currentTime = 0;
    failSound.play().catch(error => console.log('Audio play failed:', error));
}

// Utility Functions
function shuffleArray(array) {
    let current = array.length;
    let temp, random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    
    return array;
}

// Start the game
initializeGame();