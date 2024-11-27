const imagens = [
    'IMG/card_olho.png',
    'IMG/card_nariz.png',
    'IMG/card_boca.png',
    'IMG/card_ouvido.png'  
];

let indiceAtual = 0;

const botoes = {
    'bolho': 0,  
    'bnariz': 1, 
    'bboca': 2,  
    'bouvido': 3 
};

function mudarImagem() {
    
    indiceAtual = (indiceAtual + 1) % imagens.length;;
    document.getElementById('imagem_trocada').style.backgroundImage = `url(${imagens[indiceAtual]})`;
}

function verificarCorreto(botaoId) {
    const indiceBotao = botoes[botaoId]; 
    if (indiceBotao === indiceAtual) { 
        mudarImagem();  
    }
}

function tocarSom(botaoId) {
    const som = document.getElementById(`audio_${botaoId}`);
    som.play();
}

    document.getElementById('bolho').addEventListener('click', function(){
        tocarSom('olho');
        verificarCorreto('bolho');
      });
      document.getElementById('bnariz').addEventListener('click', function(){
        tocarSom('nariz');
        verificarCorreto('bnariz');
      });
      document.getElementById('bboca').addEventListener('click', function(){
        tocarSom('boca');
        verificarCorreto('bboca');
      });
      document.getElementById('bouvido').addEventListener('click', function(){
        tocarSom('ouvido');
        verificarCorreto('bouvido');
    });

     // Controle de áudio de fundo
     const controlButton = document.getElementById('audio-control');
     const iframe = document.getElementById('audio-iframe');
 
     // Atualiza o texto do botão (Tocar ou Pausar)
     function updateButton(status) {
         controlButton.textContent = status === 'paused' ? 'Tocar Música' : 'Pausar Música';
     }
 
     // Alterna entre pausar e tocar a música
     controlButton.addEventListener('click', () => {
         const action = controlButton.textContent === 'Pausar Música' ? 'pause' : 'play';
         iframe.contentWindow.postMessage({ action }, '*'); // Envia comando para o iframe
         updateButton(action === 'pause' ? 'paused' : 'playing');
     });
 
     // Solicita o status do áudio ao carregar a página
     iframe.onload = () => {
         iframe.contentWindow.postMessage({ action: 'getStatus' }, '*');
     };
 
     // Atualiza o botão com base no status do áudio retornado do iframe
     window.addEventListener('message', (event) => {
         if (event.data.status) {
             updateButton(event.data.status);
         }
     });