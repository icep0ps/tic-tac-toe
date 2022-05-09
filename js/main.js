const Gameboard = (() => {
    const board = [null, undefined, undefined, undefined, null, null, null, undefined, undefined]
    return { board }
})()


const playerFactorty = (name, move) => {
    let wins = 0
    const play = (something) => {
        if (something.textContent == '' && gameControll.gameOver() != true) {
            Gameboard.board.splice(something.getAttribute('data-box'), 1, move)
            gameControll.printstuff()
            gameControll.checkTurn()
        }
        else {
            alert('gameover')
            wins++
            console.log(name + wins)
        }
    }

    return { name, move, play }
}

const players = {

    player1: playerFactorty('Player 1', '❌'),
    player2: playerFactorty('Player 2', '⭕')

}

const gameControll = (() => {
    let currentplayer = players.player1
    let currentTurn = 1
    const checkTurn = () => {
        if (currentTurn == 0 && gameOver() != true) {
            currentplayer = players.player1
            currentTurn++
        } 
        else if (currentTurn == 1 && gameOver() != true) {
            currentplayer = players.player2
            currentTurn--
        }
    }
    const getGrids = document.querySelectorAll('.box')
    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            getGrids[i].addEventListener('click',
                e => { currentplayer.play(e.target) }, { once: true })
        }
    }
    createBoard()
    const printstuff = () => {
        for (let i = 0; i < 9; i++) {
            getGrids[i].textContent = Gameboard.board[i]
        }
    }

    const gameOver = () => {

        const board = Gameboard.board;
        if (board[0] === board[1] && board[2] === board[1]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')
            return game
        }
        else if (board[3] === board[4] && board[5] === board[4]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')
            return game
        }
        else if (board[6] === board[7] && board[8] === board[7]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')

            return game
        }
        else if (board[2] === board[4] && board[6] === board[4]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')
            return game
        }
        else if (board[0] === board[4] && board[8] === board[4]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')
            return game
        }
        else if (board[0] === board[3] && board[6] === board[3]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')

            return game
        }
        else if (board[1] === board[4] && board[7] === board[4]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')
            return game
        }
        else if (board[2] === board[5] && board[8] === board[5]) {
            let game = true
            console.log('game over ' + currentplayer.name + ' wins')
            return game
        }

    }

    return { printstuff, getGrids, checkTurn, gameOver, createBoard }
})()

