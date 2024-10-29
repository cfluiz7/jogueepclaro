let numPlayers = 0;
let currentPlayer = 1;
let selectedCourses = [];
let selectedSkills = [];

// Função para iniciar o jogo
document.getElementById('playBtn').addEventListener('click', () => {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('playerSelection').style.display = 'block';
});

// Função para selecionar o número de jogadores
const playerButtons = document.querySelectorAll('.player-btn');
playerButtons.forEach(button => {
    button.addEventListener('click', function () {
        numPlayers = parseInt(this.getAttribute('data-players'));
        document.getElementById('confirmPlayers').style.display = 'block';
    });
});

// Confirmar número de jogadores
document.getElementById('confirmPlayers').addEventListener('click', () => {
    document.getElementById('playerSelection').style.display = 'none';
    document.getElementById('courseSelection').style.display = 'block';
    document.getElementById('playerTitle').textContent = `Escolha o curso para o Jogador ${currentPlayer}`;
});

// Função para selecionar o curso, sem repetição
const courseImages = document.querySelectorAll('.course-img');
courseImages.forEach(img => {
    img.addEventListener('click', function () {
        const selectedCourse = this.getAttribute('data-course');
        if (selectedCourses.includes(selectedCourse)) {
            alert('Este curso já foi selecionado. Escolha outro.');
        } else {
            selectedCourses.push(selectedCourse);
            document.getElementById('confirmCourse').style.display = 'block';
        }
    });
});

// Confirmar curso selecionado e ir para escolha de competências
document.getElementById('confirmCourse').addEventListener('click', () => {
    document.getElementById('courseSelection').style.display = 'none';
    document.getElementById('skillSelection').style.display = 'block';
    document.getElementById('skillTitle').textContent = `Escolha a competência do Jogador ${currentPlayer}`;
});

// Função para selecionar a competência, sem repetição
const skillImages = document.querySelectorAll('.skill-img');
skillImages.forEach(img => {
    img.addEventListener('click', function () {
        const selectedSkill = this.getAttribute('data-skill');
        if (selectedSkills.includes(selectedSkill)) {
            alert('Esta competência já foi selecionada. Escolha outra.');
        } else {
            selectedSkills.push(selectedSkill);
            document.getElementById('confirmSkill').style.display = 'block';
        }
    });
});

// Confirmar competência selecionada e passar para o próximo jogador ou começar o jogo
document.getElementById('confirmSkill').addEventListener('click', () => {
    if (currentPlayer < numPlayers) {
        currentPlayer++;
        document.getElementById('skillSelection').style.display = 'none';
        document.getElementById('courseSelection').style.display = 'block';
        document.getElementById('playerTitle').textContent = `Escolha o curso para o Jogador ${currentPlayer}`;
        document.getElementById('confirmCourse').style.display = 'none';
        document.getElementById('confirmSkill').style.display = 'none';
    } else {
        document.getElementById('skillSelection').style.display = 'none';
        document.getElementById('game1').style.display = 'block';
        startGame();
    }
});

// Declaração de variáveis para controlar o número de rodadas e o tempo de jogo
let numeroRodadas = 1;
let tempo = 0;
let timer; // Variável para armazenar o temporizador

// Função que inicia o temporizador e atualiza o tempo na tela a cada segundo
function iniciarTemporizador() {
    // Cria um intervalo que incrementa o tempo a cada 1000ms (1 segundo)
    timer = setInterval(() => {
        tempo++; // Incrementa o tempo
        // Calcula os minutos e segundos com base no valor de 'tempo'
        const minutos = String(Math.floor(tempo / 60)).padStart(2, '0'); // Converte minutos para string e adiciona zero à esquerda se necessário
        const segundos = String(tempo % 60).padStart(2, '0'); // Converte segundos para string e adiciona zero à esquerda se necessário
        // Atualiza o elemento HTML com o tempo formatado
        document.getElementById('tempo').innerText = `${minutos}:${segundos}`;
    }, 1000);
}

// Função para simular o lançamento de um dado
function jogarDado() {
    // Gera um número aleatório entre 1 e 6, como se fosse um dado
    const dado = Math.floor(Math.random() * 6) + 1;
    alert(`Dado jogado: ${dado}`); // Mostra o valor do dado em um alerta
    // A lógica de pontos pode ser implementada aqui (dependendo do jogo)
}

// Função para reiniciar o jogo, restaurando as variáveis e resetando o temporizador
function reiniciarJogo() {
    clearInterval(timer); // Para o temporizador atual
    tempo = 0; // Reseta o tempo para zero
    numeroRodadas = 1; // Reseta o número de rodadas para 1
    document.getElementById('tempo').innerText = "00:00"; // Atualiza o elemento do tempo para "00:00"
    document.getElementById('numeroRodadas').innerText = "1/12"; // Atualiza o elemento de rodadas para mostrar 1/12
    // Reseta a pontuação dos jogadores
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`trofeuJogador${i}`).innerText = "0"; // Zera os troféus de cada jogador
        document.getElementById(`pontosJogador${i}`).innerText = "0"; // Zera os pontos de cada jogador
    }
    iniciarTemporizador(); // Reinicia o temporizador
}

// Inicia o temporizador automaticamente quando a página é carregada
window.onload = () => {
    iniciarTemporizador(); // Chama a função para iniciar o temporizador
};
