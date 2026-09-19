// ---- Conteúdo: troca aqui os textos e os nomes dos ficheiros ----
/* . 


*/

// Nome de quem vai receber o presente — muda aqui e atualiza-se sozinho no ecrã inicial.
const NOME_PRESENTEADA = "Shelcia";

const GALERIA = [
  {
    src: "fotos/foto-2.jpeg",
    texto:
      "Que não sejam só em datas especiais como essa para poder exprimir o que eu sinto por ti e o quão sou grata pela sua amizade",
  },
  {
    src: "fotos/foto-3.jpeg",
    texto:
      "Hoje celebramos por dois, e é sempre uma bênção poder fazer isso com você. Que o seu dia seja bom, mas muitooooo bom mesmooooo e, sobretudo, abençoado tal como tu. ❤️😍",
  },
  {
    src: "fotos/foto-4.jpeg",
    texto:
      "Muitas vezes fiz menção do quão tu és maravilhosa em tudo, quer como amiga, mulher e agora como mãe da nossa menina.",
  },
  { src: "fotos/foto-5.jpeg", texto: "Que Deus esteja sempre contigo e em tudo que for feito por ti." },
  { src: "fotos/foto-6.jpeg", texto: "E eu como amiga que sirva sempre como um impulso para ti." },
  { src: "fotos/foto-7.jpeg", texto: "Já sei que continuarei  sendo a sua escolhida " },
  { src: "fotos/foto-8.jpeg", texto: "Porque também sou menina dos teus olhos, terei sempre o teu cuidado (Exageradinho as vezes kkk) o teu amor incondicional e o teu apoio sempre." },
  { src: "fotos/foto-9.jpeg", texto: "E de mim tu sempre terás o mesmo, meu amor." },
  { src: "fotos/foto-10.jpeg", texto: "Te amo muito hoje e sempre como sempre. Para sempre minha melhor amiga ❤️" },
  {
    src: "fotos/foto-11.jpeg",
    texto:
      "Terei sempre a melhor memória e gratidão, do dia em que você me ligou aflita porque descobriu que um novo ser estava crescendo dentro de ti. Estávamos com medo, mas felizes também… Entre choros, medo, risos e conselhos, Deus nos concedeu a nossa primogênita. 🩷🩷🩷",
  },
  { src: "fotos/foto-12.jpeg", texto: "Hoje é Luz para nós, te amamos Andrea por ser nossa mãe 🩷🥳" },
];

// Coloca os ficheiros em videos/ com estes nomes e troca as legendas.
// A ordem aqui é a ordem em que os vídeos vão aparecer, distribuídos
// entre as fotos da galeria (ver função `intercalar` mais abaixo).
const VIDEOS = [
  { src: "videos/Video-1.mp4", texto: "Momentos simples ao teu lado tornam-se inesquecíveis." },
  { src: "videos/Video-2.mp4", texto: "Rir contigo é o meu passatempo favorito. ❤️" },
  { src: "videos/Video-3.mp4", texto: "O teu abraço é o meu lugar favorito no mundo. 🤍" },
];

const START_DATE = new Date("2017-02-20T00:00:00");

// ---- Ecrã de presente ----
const telaPresente = document.getElementById("tela-presente");
const conteudoPrincipal = document.getElementById("conteudo-principal");
const btnAbrir = document.getElementById("btn-abrir");
const nomePresente = document.getElementById("presente-nome");

if (nomePresente) nomePresente.textContent = NOME_PRESENTEADA;

btnAbrir.addEventListener("click", () => {
  telaPresente.classList.add("is-fechado");
  conteudoPrincipal.classList.add("is-aberto");
  document.body.style.overflow = "";
  setTimeout(() => {
    telaPresente.style.display = "none";
  }, 650);
  // Garante que quem abre começa sempre do topo da página.
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
});

// Impede scroll da página por trás enquanto o presente ainda não foi aberto.
document.body.style.overflow = "hidden";

// ---- Revelação ao entrar no ecrã ----
const revelador = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revelador.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);

function revelar(el) {
  el.classList.add("reveal");
  revelador.observe(el);
}

// ---- Vídeos: tocam ao entrar no ecrã, pausam ao sair ----
const observadorVideo = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      const v = e.target.querySelector("video");
      if (!v) return;
      if (e.isIntersecting) v.play().catch(() => { });
      else v.pause();
    });
  },
  { threshold: 0.5 },
);

// ---- Intercala os vídeos entre as fotos, em grupos ao longo da galeria ----
function intercalar(fotos, videos) {
  const itens = [];
  const grupos = videos.length + 1;
  const porGrupo = Math.ceil(fotos.length / grupos);
  let indice = 0;

  for (let g = 0; g < grupos; g++) {
    for (let i = 0; i < porGrupo && indice < fotos.length; i++) {
      itens.push({ tipo: "foto", ...fotos[indice] });
      indice++;
    }
    if (g < videos.length) {
      itens.push({ tipo: "video", ...videos[g] });
    }
  }
  // Sobra alguma foto (por causa de arredondamentos), acrescenta no fim.
  while (indice < fotos.length) {
    itens.push({ tipo: "foto", ...fotos[indice] });
    indice++;
  }
  return itens;
}

// ---- Galeria (fotos + vídeos intercalados) ----
const galeria = document.getElementById("galeria");
const itens = intercalar(GALERIA, VIDEOS);
let contadorFotos = 0;

itens.forEach((item) => {
  const bloco = document.createElement("div");

  if (item.tipo === "foto") {
    contadorFotos++;
    bloco.innerHTML = `
      <figure class="moldura">
        <img src="${item.src}" alt="Memória especial de Kelsia e Shelcia ${contadorFotos + 1}" loading="lazy" width="768" height="1024" />
      </figure>
      <p class="legenda"></p>`;
    bloco.querySelector(".legenda").textContent = item.texto;
    galeria.appendChild(bloco);
    revelar(bloco);
    return;
  }

  // item.tipo === "video"
  bloco.innerHTML = `
    <figure class="moldura">
      <video src="${item.src}" muted loop playsinline preload="metadata"></video>
    </figure>
    <p class="legenda"></p>`;
  bloco.querySelector(".legenda").textContent = item.texto;

  const video = bloco.querySelector("video");
  video.addEventListener("error", () => {
    const fig = bloco.querySelector("figure");
    if (!fig) return;
    const aviso = document.createElement("div");
    aviso.className = "video-vazio";
    aviso.innerHTML = `<span aria-hidden="true">🎞️</span><p></p>`;
    aviso.querySelector("p").textContent =
      `Vídeo ainda não adicionado — coloca o ficheiro em ${item.src}`;
    fig.replaceWith(aviso);
  });

  galeria.appendChild(bloco);
  revelar(bloco);
  observadorVideo.observe(bloco);
});

// ---- Contador ----
function diffFrom(start, now) {
  let anos = now.getFullYear() - start.getFullYear();
  let meses = now.getMonth() - start.getMonth();
  let dias = now.getDate() - start.getDate();
  let horas = now.getHours() - start.getHours();
  let minutos = now.getMinutes() - start.getMinutes();
  let segundos = now.getSeconds() - start.getSeconds();

  if (segundos < 0) {
    segundos += 60;
    minutos--;
  }
  if (minutos < 0) {
    minutos += 60;
    horas--;
  }
  if (horas < 0) {
    horas += 24;
    dias--;
  }
  if (dias < 0) {
    dias += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    meses--;
  }
  if (meses < 0) {
    meses += 12;
    anos--;
  }
  return { anos, meses, dias, horas, minutos, segundos };
}

const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
const grelha = document.getElementById("contador-grelha");
const ROTULOS = ["Anos", "Meses", "Dias", "Horas", "Minutos", "Segundos"];
const celulas = ROTULOS.map((rotulo) => {
  const div = document.createElement("div");
  div.innerHTML = `<p class="valor">00</p><p class="eyebrow">${rotulo}</p>`;
  grelha.appendChild(div);
  return div.querySelector(".valor");
});

function atualizarContador() {
  const t = diffFrom(START_DATE, new Date());
  [t.anos, t.meses, t.dias, t.horas, t.minutos, t.segundos].forEach((v, i) => {
    celulas[i].textContent = pad(v);
  });
}
atualizarContador();
setInterval(atualizarContador, 1000);

document.querySelectorAll(".reveal").forEach((el) => revelador.observe(el));

// ---- Partilhar ----
const btnPartilhar = document.getElementById("btn-partilhar");
const txtPartilhar = document.getElementById("txt-partilhar");
btnPartilhar.addEventListener("click", async () => {
  const dados = {
    title: "Kelsia & Shelcia",
    text: "Abre a nossa homenagem à amizade ❤️",
    url: window.location.href,
  };
  if (navigator.share) {
    try {
      await navigator.share(dados);
      return;
    } catch {
      /* cancelado */
    }
  }
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(dados.url);
    txtPartilhar.textContent = "Link copiado";
    setTimeout(() => (txtPartilhar.textContent = "Partilhar"), 2200);
  }
});

// ---- Música (coloca o ficheiro em musica/nossa-musica.mp3) ----
const audio = new Audio("musica/nossa-musica.mp3");
audio.loop = true;
const btnMusica = document.getElementById("btn-musica");
const estadoMusica = document.getElementById("estado-musica");
let aTocar = false;

btnMusica.addEventListener("click", () => {
  aTocar = !aTocar;
  if (aTocar) audio.play().catch(() => { });
  else audio.pause();
  btnMusica.textContent = aTocar ? "❚❚" : "▶";
  btnMusica.setAttribute("aria-label", aTocar ? "Pausar música" : "Tocar música");
  estadoMusica.textContent = aTocar ? "A tocar…" : "Toca para ouvir";
});