const localPokemons = document.querySelector('.local-pokemon');
const localLoading = document.querySelector('.local-loading');
const localChances = document.querySelector('.container-chances');
const localRespostas = document.querySelector('.container-resposta');
const localTimer = document.querySelector('.local-timer');
const localInicio = document.querySelector('.local-inicio');
const localFooter = document.querySelector('#local-footer');
const localBtnInicio = document.querySelector('.local-buttons-inicio');
const comoJogar = document.querySelector('.local-como-jogar');
const localCreditos = document.querySelector('.local-creditos');

//Btns de inicio
const btnIniciarJogo = document.querySelector('#btnModal');
const logoPokemon = document.querySelector('#logo-pokemon');
const btnInicio = document.querySelector('#btn-iniciar');
const btnFaq = document.querySelector('#btn-faq');
const btnCreditos = document.querySelector('#btn-creditos');

//Area Crediso
const iconeLinkedin = document.querySelector('#icon-linkendin');
const iconeGithub = document.querySelector('#icon-github');

const timerP = document.querySelector('#timer')
const localPrimeira = document.querySelector('.local-primeira');
const localSegunda = document.querySelector('.local-segunda');

const localErros = document.querySelector('#local-erros');
const localAcertos = document.querySelector('#local-acertos');

let v = '', chancesV = [], posi = 3, acertos = 0, erros = 0, check = false;

const criarPokemons = (number, chances) => {
  const api = `https://pokeapi.co/api/v2/pokemon/${number}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const imagem = data['sprites']['other']['official-artwork']['front_default'];
      const nome = data['name'];
      chancesV.push(nome);
      if (chances !== 1) { criarPokemonUx(imagem, nome); }
      if (chancesV.length === 4) { criarChances(); }
    })
    .catch(() => {
      resetarPartida();
      localInicio.classList.add('class-hide');
      localLoading.classList.remove('class-hide');
      localFooter.classList.remove('class-hide');
    })
};

// Cria as chances
const criarChances = () => {
  for (let i = 1; i <= 4; i += 1) {
    const name = Math.trunc(Math.random() * chancesV.length);
    const chance = document.createElement('button');
    chance.className = 'btn btn-outline-light chances';
    chance.innerText = chancesV[name].toUpperCase();
    (i > 2) ? localPrimeira.appendChild(chance) : localSegunda.appendChild(chance);
    chance.addEventListener('click', clickBtn);
    chancesV.splice(name, 1);
  }
};

// Cria a imagem
const criarPokemonUx = (imagem, nome) => {
  v = nome;
  const imgE = document.createElement('img');
  imgE.className = 'pokemons pokemon-filter'
  imgE.setAttribute('src', imagem);
  imgE.setAttribute('draggable', 'false')
  localPokemons.appendChild(imgE);
};

// Gera a batalha , dos dois
const gerarBatalha = () => {
  let conta = 0;
  const c = Math.trunc(Math.random() * 898);
  criarPokemons(c, 0);
  for (let i = 0; i < posi; i += 1) {
    const c = Math.trunc(Math.random() * 898);
    criarPokemons(c, 1);
    conta += 1;
  }
  if (conta === 3) { loadingEfect(); }
};

// Reseta partida
const resetarPartida = () => {
  localPokemons.innerHTML = '';
  localPrimeira.innerHTML = '';
  localSegunda.innerHTML = '';
  localRespostas.innerHTML = '';
  addHide();
  gerarBatalha();
};

// Dar Hide nas propriedades
const addHide = () => {
  localTimer.classList.add('class-hide');
  localPokemons.classList.add('class-hide');
  localChances.classList.add('class-hide');
  localRespostas.classList.add('class-hide');
  localLoading.classList.remove('class-hide');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Timer do loading
async function loadingEfect() {
  await sleep(2000);
  localTimer.classList.remove('class-hide');
  localPokemons.classList.remove('class-hide');
  localChances.classList.remove('class-hide');
  localRespostas.classList.remove('class-hide');
  localLoading.classList.add('class-hide');
  timerZ();
};

// Efeito de opacidade do pokemon
async function efect(verificar) {
  check = true;
  timerP.innerHTML = ``;
  localPrimeira.innerHTML = '';
  localSegunda.innerHTML = '';
  const imgPoke = document.querySelector('.pokemons');
  for (let i = 10; i <= 100; i += 10) {
    imgPoke.style.opacity = `${i}%`
    await sleep(150);
  }
  const nameDoCerto = document.createElement('p');
  if (verificar === 'acertou') {
    nameDoCerto.style.backgroundColor = 'rgba(9, 255, 0, 0.300)';
    localAcertos.innerText = acertos;
  } else {
    nameDoCerto.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    localErros.innerText = erros;
  }
  nameDoCerto.innerText = v.toUpperCase();
  nameDoCerto.className = 'text-container';
  localRespostas.appendChild(nameDoCerto);
  await sleep(2000);
  resetarPartida();
  check = false;
};

// Aqui e o tempo
async function timerZ() {
  timerP.innerHTML = `00:20`;
  await sleep(1000);
  for (let i = 19; i >= 0; i -= 1) {
    if (check === true) { return; }
    (i < 10) ? timerP.innerHTML = `00:0${i}` : timerP.innerHTML = `00:${i}`;
    await sleep(1000);
  }
  const imgPoke = document.querySelector('.pokemons');
  imgPoke.classList.remove('pokemon-filter');
  efect();
  erros += 1;
  localErros.innerText = erros;
  timerP.innerHTML = ``;
};

const clickBtn = (event) => {
  const element = event.target;
  const imgPoke = document.querySelector('.pokemons');
  imgPoke.classList.remove('pokemon-filter');
  if (element.innerText.toLowerCase() === v) {
    efect('acertou');
    acertos += 1;
    return;
  }
  efect('errou');
  erros += 1;
};

// Inicio do jogo

let myModal = new bootstrap.Modal(document.getElementById('menuInicio'), { backdrop: 'static', keyboard: false });

logoPokemon.addEventListener('click', () => {
  window.location.href = 'index.html';
});

btnInicio.addEventListener('click', () => {
  myModal.hide();
  gerarBatalha();
  localLoading.classList.remove('class-hide');
  localFooter.classList.remove('class-hide');
  localInicio.classList.add('class-hide');
  comoJogar.classList.add('class-hide');
});

btnFaq.addEventListener('click', () => {
  comoJogar.classList.remove('class-hide');
  localBtnInicio.classList.add('class-hide');
  localBtnInicio.classList.add('class-hide');
});

btnCreditos.addEventListener('click', () => {
  localCreditos.classList.remove('class-hide');
  localBtnInicio.classList.add('class-hide');
  comoJogar.classList.add('class-hide');
});


const pausarJogo = () => {
  window.location.href = './index.html';
};

document.addEventListener('keypress', (e) => (e.key === 'p' || e.key === 'P') ? 
  pausarJogo() : 1);

// Area creditos

iconeLinkedin.addEventListener('click', () => {
  window.location.href = 'https://www.linkedin.com/in/luizwanderson/';
});

iconeGithub.addEventListener('click', () => {
  window.location.href = 'https://github.com/ProHatp';
});

myModal.show();
