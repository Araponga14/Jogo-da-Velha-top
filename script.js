alert("A cada três jogadas, uma casa preenchida explode. Cuidado!");

let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let vez = 'X';
let jogoAtivo = true;
let turnos = 0;

const squares = document.querySelectorAll('.square');
const resetButton = document.getElementById('reset');

squares.forEach(square => {
    square.addEventListener('click', () => handleSquareClick(square));
});

resetButton.addEventListener('click', reset);

function handleSquareClick(square) {
    const index = parseInt(square.id);
    if (tabuleiro[index] !== '' || !jogoAtivo) return;
    
    tabuleiro[index] = vez;
    square.textContent = vez;
    square.style.fontWeight = 'bold';

    if (checkWinner()) {
        setTimeout(() => alert("Jogador " + vez + " venceu!"), 1000);
        jogoAtivo = false;
        return;
    }
    
    if (tabuleiro.every(cell => cell !== '')) {
        setTimeout(() => alert('Empate!'), 500);
        jogoAtivo = false;
        return;
    }
    
    vez = vez === 'X' ? 'O' : 'X';

    turnos++;

    if (turnos % 3 === 0) {
        let occupiedSquares = tabuleiro.map((value, idx) => value !== '' ? idx : -1).filter(idx => idx !== -1);
        if (occupiedSquares.length > 0) {
            let randomIndex = Math.floor(Math.random() * occupiedSquares.length);
            let random = occupiedSquares[randomIndex];

            let cell = document.getElementById(random);
            cell.style.backgroundColor = 'red';

            setTimeout(() => {
                tabuleiro[random] = '';
                cell.textContent = '';
                cell.style.backgroundColor = '';
                if (turnos == 3) {
                    setTimeout(() => alert("Casa " + random + " foi apagada!"), 500);
                }
            }, 1000);
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            setTimeout(() => fadeInSequence([a, b, c]), 300);
            return true;
        }
    }
    return false;
}

function fadeInSequence(indices) {
    indices.forEach((index, i) => {
        setTimeout(() => {
            let cell = document.getElementById(index);
            cell.style.backgroundColor = 'lightgreen';
            cell.style.transition = 'opacity 0.5s';
            cell.style.opacity = '0';
            setTimeout(() => cell.style.opacity = '1', 50);
        }, i * 300);
    });
}

function reset() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogoAtivo = true;
    vez = 'X';
    turnos = 0;
    
    squares.forEach(square => {
        square.textContent = '';
        square.style.backgroundColor = ''; // Reseta a cor das células
        square.style.opacity = '1';
    });
}
