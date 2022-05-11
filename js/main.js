const playerOneWins = document.querySelector('.player-one')
const currentTurn = document.querySelector('.current')
const playerTwoWins = document.querySelector('.player-two')
const result = document.querySelector('.result')
let endGame = false

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']
    return { board }
})()

const playerFactorty = (name, move) => {
    let wins = 0
    const play = (something) => {
        if (endGame == false) {
            Gameboard.board.splice(something.getAttribute('data-box'), 1, move)
            gameControll.printstuff()
            if (gameControll.gameOver()) {
                result.textContent = ` Winner ! ${name}`
                endGame = true
            }
            else {
                gameControll.printstuff()
                gameControll.swap()
            }

        }
    }

    return { name, move, play }
}

const players = {

    player1: playerFactorty('Player 1', '❌'),
    player2: playerFactorty('Player 2', '⭕')

}

let currentplayer = players.player1
const gameControll = (() => {
    let currentTurn = 1
    const swap = () => {
        if (currentTurn == 0) {
            currentplayer = players.player1
            currentTurn++
        }
        else if (currentTurn == 1) {
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

    let combos = [

        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    const gameOver = () => {
        return combos.some(things => {
            return things.every(index => {
                return Gameboard.board[index].includes(currentplayer.move)
            })
        })

    }

    return { printstuff, getGrids, swap, gameOver, createBoard }
})()


