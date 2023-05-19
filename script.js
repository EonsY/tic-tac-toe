const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const BOARD = document.getElementById('board')
const cellElements = document.querySelectorAll('[data-cell]')
const  WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningPageElement = document.getElementById('winning-page')
const winningMessageTextElement = document.getElementById('winning-text')
const restartButton = document.getElementById('restart-button')
const restartButtonPage = document.getElementById('restart-button-winning')
const player1Name = document.getElementById('player1-name')
const player2Name = document.getElementById('player2-name')
let turn
let turnCount = 0

const player1 = {
    type: 'x',
    name: '',
    combination: []
}

const player2 = {
    type: 'circle',
    name: '',
    combination: []
}

function startGame () {
    turn = false
    cellElements.forEach( cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHover()
}

startGame()

function handleClick (e) {
    const cell = e.target
    const currentClass = turn ? CIRCLE_CLASS : X_CLASS
    addMark(cell, currentClass)
    addCombination(cell)
    if (checkWin(player1)) {
        winningMessageTextElement.innerText = `${player1.name} has won`
        winningPageElement.classList.add('show')
    } else if (checkWin(player2)) {
        winningMessageTextElement.innerText = `${player2.name} has won`
        winningPageElement.classList.add('show')
    }
    checkDraw()
    turnSwap()
    setBoardHover()
    refreshPlayerName()
    turnCount++
}

function addMark (cell, currentClass) {
    cell.classList.add(currentClass)
}

function addCombination (cell) {
    if (!turn) {
        player1.combination.push(parseInt(cell.dataset.indexNumber))
    } else {
        player2.combination.push(parseInt(cell.dataset.indexNumber))
    }
}

function checkWin (player) {
    let playerArr = player.combination
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        if (containsAll(WINNING_COMBINATIONS[i], playerArr)) {
            return true
        }
    }
}

function checkDraw () {
    if (turnCount === 8) {
        console.log('Draw')
    }
}

function containsAll (arr1, arr2) {
    return arr1.every(element => {
        return arr2.includes(element)
    })
}

function turnSwap () {
    turn = !turn
}

function setBoardHover () {
    BOARD.classList.remove(CIRCLE_CLASS)
    BOARD.classList.remove(X_CLASS)
    if (!turn) {
        BOARD.classList.add(X_CLASS)
    } else {
        BOARD.classList.add(CIRCLE_CLASS)
    }
}

restartButton.addEventListener('click', restart)
restartButtonPage.addEventListener('click', restart)

function restart () {
    player1.combination = []
    player2.combination = []
    turnCount = 0
    winningPageElement.classList.remove('show')
    cellElements.forEach( cell => {
        if (cell.classList.contains('x')) {
            cell.classList.remove('x')
        } else if (cell.classList.contains('circle')) {
            cell.classList.remove('circle')
        }
    })
    startGame()
}

player1Name.addEventListener('keydown', refreshPlayerName)
player2Name.addEventListener('keydown', refreshPlayerName)

function refreshPlayerName () {
    player1.name = player1Name.value
    player2.name = player2Name.value
}