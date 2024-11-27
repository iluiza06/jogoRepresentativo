const grid = document.querySelector('.grid')

const character = [
    'FELIZ',
    'MEDO',
    'RAIVA',
    'DUVIDA',
    'SURPRESA',
    'TEDIO',
    'TRISTE',
    'VERGONHA',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 16){
        alert('Parabéns, você conseguiu!');
    }
}


const checkCards = () =>{
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    

    if(firstCharacter == secondCharacter){
      
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    }else{

        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500)

       
    } 
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if(firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if(secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const creatCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url("./imagens/${character}.svg")`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...character, ...character];

    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = creatCard(character);
        grid.appendChild(card);
    })

}

loadGame();


    // Funções de áudio para interações (já existentes)
    function playAudio(audioFile) {
        const audio = new Audio(audioFile);
        audio.play();
    }

    function playAudioWithRedirect(audioFile, redirectUrl) {
        const audio = new Audio(audioFile);
        audio.play();
        audio.onended = () => {
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        };
    }

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
