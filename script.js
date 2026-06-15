const divCards = document.querySelector(".cards");
const btn = document.querySelector("#btn");

let paginaAtual = 0;
let totalPaginas = Infinity;
let carregando = false;

function criaStatus(icone, texto) {
  return `
    <div class="status">
      <img src="./img/${icone}" alt="">
      <p>${texto}</p>
    </div>
  `;
}

function criaCard(personagem) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <header>
      <img src="${personagem.image}" alt="${personagem.name}">
      <p>${personagem.name}</p>
    </header>
    <div class="content">
      ${criaStatus("status.svg", personagem.status)}
      ${criaStatus("status02.svg", personagem.species)}
      ${criaStatus("status03.svg", personagem.origin.name)}
    </div>
  `;

  return card;
}

async function carregarPersonagens() {
  if (carregando || paginaAtual >= totalPaginas) return;

  carregando = true;
  btn.disabled = true;

  try {
    const proximaPagina = paginaAtual + 1;
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${proximaPagina}`
    );

    if (!response.ok) {
      throw new Error("Não foi possível carregar os personagens.");
    }

    const data = await response.json();

    totalPaginas = data.info.pages;
    paginaAtual = proximaPagina;
    divCards.append(...data.results.map(criaCard));
  } catch (error) {
    console.error(error);
  } finally {
    carregando = false;
    btn.disabled = paginaAtual >= totalPaginas;
  }
}

btn.addEventListener("click", carregarPersonagens);

carregarPersonagens();
