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

