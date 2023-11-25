function showMentalistaGame() {
    
    var mentalistaGame = document.getElementById("mentalistaGame");
    var playGame = document.getElementById("playGame");

    mentalistaGame.style.display = "block";
    playGame.style.display = "none";
    startOrRestartGame();
  }

  function goBackToPlayGame() {
    var mentalistaGame = document.getElementById("mentalistaGame");
    var playGame = document.getElementById("playGame");

    mentalistaGame.style.display = "none";
    playGame.style.display = "block";
  }


let numeroSorteado;
let tentativas;


function startOrRestartGame() {
  numeroSorteado = Math.floor(Math.random() * 100);
  tentativas = 0;

  const inputNumero = document.querySelector('.mentalistaGame .col input');
  const resultadosDiv = document.querySelector('.mentalistaGame .resultados');
  inputNumero.value = '';
  resultadosDiv.innerHTML = '';

  inputNumero.disabled = false;
  const enviarButton = document.querySelector('.mentalistaGame .icon');
  enviarButton.disabled = false;

  enviarButton.removeEventListener('click', verificarPalpite);

  enviarButton.addEventListener('click', verificarPalpite);
  const contadorTentativasDiv = document.querySelector('.mentalistaGame .w-100');
  contadorTentativasDiv.innerHTML = `Tentativas Restantes: ${tentativas+7}`;
}

function verificarPalpite() {

    const enviarButton = document.querySelector('.mentalistaGame .icon');
    if (enviarButton.disabled) {
      return;
    }
  
    const inputNumero = document.querySelector('.mentalistaGame .col input');
    const valorInserido = parseInt(inputNumero.value);
  
    const resultadosDiv = document.querySelector('.mentalistaGame .resultados');

    if (isNaN(valorInserido) || valorInserido <= 0 || valorInserido !== Math.floor(valorInserido) || valorInserido > 1001) {
      resultadosDiv.innerHTML = 'Por favor, insira um número inteiro positivo válido menor ou igual a 1000.';
      return;
    
    }

    tentativas++;

    const contadorTentativasDiv = document.querySelector('.mentalistaGame .w-100');
    contadorTentativasDiv.innerHTML = `Tentativas Restantes: ${7- tentativas}`;
  
  
    if (valorInserido === numeroSorteado) {
      resultadosDiv.innerHTML = `Parabéns, você acertou em ${tentativas} tentativas!`;
      inputNumero.disabled = true;
      enviarButton.disabled = true;
      resultadosDiv.innerHTML += ` <button class="btn btn-primary btn-restart" onclick="startOrRestartGame()">Jogar Novamente</button>`;
    } else if (tentativas >= 7) {
      resultadosDiv.innerHTML = `Fim de Jogo. Você não acertou em 7 tentativas. O número correto era ${numeroSorteado}.`;
      inputNumero.disabled = true;
      enviarButton.disabled = true;
      resultadosDiv.innerHTML += ` <button class="btn btn-primary btn-restart" onclick="startOrRestartGame()">Jogar Novamente</button>`;
    } else {
      if (valorInserido > numeroSorteado) {
        resultadosDiv.innerHTML = 'O valor é menor!';
      } else {
        resultadosDiv.innerHTML = 'O valor é maior!';
      }
    }
  }

document.querySelector('.mentalistaGame .col input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    verificarPalpite();
  }
});

startOrRestartGame();
