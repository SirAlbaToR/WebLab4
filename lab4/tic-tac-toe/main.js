'use strict';

let turn = 0;
let gameOver = 0;

function initBoard() {
    let elem = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        elem.append(cell);
    }
    return elem;
}

function checkAvailableSteps() {
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        if (cell.innerHTML == '') {
            return true;
            console.log(cell);
        } 
    }
    return false;
}

function newGame(){
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.innerHTML = '';
    }
    turn = 0;
    gameOver = 0;
}

function findWinner() {
    let cells = document.querySelectorAll('.cell');
    // 0 1 2
    // 3 4 5
    // 6 7 8
    let row, column;
    let diag1 = cells[0].innerHTML == '' ? null : cells[0].innerHTML;
    let diag2 = cells[2].innerHTML == '' ? null : cells[2].innerHTML;
    for (let i = 0; i < 3; i++)
    {
        row = cells[i * 3].innerHTML == '' ? null : cells[i * 3].innerHTML;
        column = cells[i].innerHTML == '' ? null : cells[i].innerHTML;
        for (let j = 0; j < 3; j++)
        {
            if(column != cells[j * 3 + i].innerHTML) column = null;
            if(row != cells[i * 3 + j].innerHTML) row = null;
        }
        if(diag1 != cells[i*4].innerHTML) diag1 = null;
        if(diag2 != cells[i*3+2-i].innerHTML) diag2 = null;
        if(row || column) return row || column;
    }
    return diag1 || diag2;
}

function clickHandler(event) {
    if (gameOver == 1) {
        showMessage('Игра завершена, начните новую игру.');
        return;
    }

    if (event.target.innerHTML != '') {
        showMessage('Эта клетка уже занята!', 'danger');
        return;
    }

    event.target.innerHTML = turn == 0 ? 'X' : 'O';
    turn = (turn + 1) % 2;

    let winner = findWinner();
    if (winner != null || !checkAvailableSteps()) {
        showMessage(winner ? `${winner} одержал победу!` : 'Ничья!');
        gameOver = 1;
    }
}

function showMessage(text, category = 'success') {
    let messageContainer = document.querySelector('.messages');
    let message = document.createElement('div');
    message.classList.add('msg', category);
    message.innerHTML = text;
    messageContainer.append(message);
    setTimeout(() => {
        message.remove();
    }, 2000);
}

window.onload = function () {   
    let board = initBoard();
    let cells = document.querySelectorAll('.cell');
    console.log(cells);
    let reGame = document.querySelector('.new-game-btn');
    reGame.onclick = newGame;
    for (let cell of cells) {
        cell.onclick = clickHandler;
    }
};