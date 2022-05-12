const playerOneWins = document.querySelector('.player-one')
const currentTurn = document.querySelector('.current')
const playerTwoWins = document.querySelector('.player-two')
const result = document.querySelector('.result')
const restartBtn = document.querySelector('button')
const winner = document.querySelector('#results')
let endGame = false

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']
    return { board }
})()

const playerFactorty = (name, move, div) => {
    const text = div
    let wins = 0
    const play = (something) => {
        if (endGame == false) {

            currentTurn.textContent = currentplayer.name
            Gameboard.board.splice(something.getAttribute('data-box'), 1, move)
            gameControll.printstuff()
            if (gameControll.gameOver()) {
                gameControll.addScreen()
                endGame = true
                wins++
                text.textContent = wins
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

    player1: playerFactorty('Player 1', '❌', playerOneWins),
    player2: playerFactorty('Player 2', '⭕', playerTwoWins)

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

    const addScreen = () =>{

        winner.classList.add('info')
        result.textContent = ` Winner ! ${currentplayer.name}`
    }

    const restart = () => {
        Gameboard.board = ['', '', '', '', '', '', '', '', '']
        currentplayer = players.player1
        endGame = false
        winner.classList.remove('info')
        result.textContent = ''
        printstuff()
        createBoard()
    }
    restartBtn.addEventListener('click', e => { restart() })

    return { printstuff, getGrids, swap, gameOver, createBoard, addScreen }
})()


