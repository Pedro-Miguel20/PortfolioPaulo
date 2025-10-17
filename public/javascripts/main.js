ScrollReveal().reveal('header, .more-photo, .more-wrapper, control, .img-container, .presentation, .odonto-img, .carousel', {
  duration: 1000,
  reset: true,// stagger each element by 200ms
});

ScrollReveal().reveal('.animate, .user, .skills, .socials', {
  duration: 1000,
  reset: true,
  origin: 'bottom',   // animation comes from bottom
  distance: '50px',
  interval: 200       // stagger each element by 200ms
});

ScrollReveal().reveal('.title-sobre, .qualifications, .nav-tabs, .work-feedback', {
  duration: 1000,
  reset: true,
  origin: 'left',   // animation comes from bottom
  distance: '100px',
  interval: 200       // stagger each element by 200ms
});

let lastWidth = window.innerWidth;

function updateHeaderZIndex(){

    var horizontalScroll = window.scrollY;
    console.log(horizontalScroll)
    if(horizontalScroll > 0){
        document.querySelector('header').style.zIndex = '3';
        navegateHeader(2);
    }
    else{
        document.querySelector('header').style.zIndex = '0';
    }

    

    var inicio = document.getElementById('inicio').offsetHeight;
    var sobre = document.getElementById('sobre').offsetHeight;
    var servicos = document.getElementById('servicos').offsetHeight;

    if(horizontalScroll > inicio){
      navegateHeader(25);
      document.querySelector('header').style.boxShadow="none";
    } else {
      document.querySelector('header').style.boxShadow="#909090 0px 5px 10px 0px";
    }
    if(horizontalScroll > inicio + sobre){
      navegateHeader(50);
      document.querySelector('header').style.boxShadow="none";
    }
    
    if(horizontalScroll > inicio + sobre + servicos+100){
      navegateHeader(75);
      document.querySelector('header').style.boxShadow="none";
      document.querySelector('header').style.backgroundColor="#2b2b2b";
      document.querySelector('.focused').style.backgroundColor="#2b2b2b";
      document.getElementById('75').style.color="ghostwhite";
      document.querySelector('header').style.transition=".5s";
    }else{
      document.querySelector('header').style.backgroundColor="#a8c4c3";
      document.querySelector('.focused').style.backgroundColor="#a8c4c3";
      document.getElementById('75').style.color="#2b2b2b";
    }
};

window.addEventListener('load', () => {
  updateHeaderZIndex(); // Aplica logo no reload
});

// Também executa toda vez que houver scroll
window.addEventListener('scroll', () => {
  updateHeaderZIndex();
});


const audioElement = new Audio("assets/audio/audio.mp3");

const icon = document.getElementById("icon");
const fillBar = document.querySelector(".fill-bar");

audioElement.addEventListener("play", () => {
  const duration = audioElement.duration;
  fillBar.style.animation = `mymove linear ${duration}s forwards`;
});

audioElement.addEventListener("pause", () => {
  fillBar.style.animationPlayState = "paused";
});

audioElement.addEventListener("playing", () => {
  fillBar.style.animationPlayState = "running";
});

function playSong() {
  if (audioElement.paused || audioElement.ended) {
    audioElement.play();
    icon.classList.remove("bi-play-fill");
    icon.classList.add("bi-pause-fill");
  } else {
    audioElement.pause();
    icon.classList.remove("bi-pause-fill");
    icon.classList.add("bi-play-fill");
  }
}

var navegates = document.querySelectorAll('.navegate');

function navegateHeader(position){
        document.querySelector('.focused').style.left = position + "%";
}

const odontoAside = document.querySelector('.odonto-aside');
const odontoImg = document.querySelector('.odonto-aside img');
const sobreText = document.querySelector('.sobre-text');

function ajustarOdonto() {
  const altura = sobreText.offsetHeight;
  odontoAside.style.height = altura + 'px';
  odontoAside.style.width = altura + 'px'; // mantém 1:1
  odontoImg.style.height = altura + 'px';
  odontoImg.style.width = altura + 'px';
  window.relpad
}

// Ajuste inicial e ao redimensionar a tela
window.addEventListener('load', ajustarOdonto);
window.addEventListener('resize', ajustarOdonto);

// Ajusta automaticamente se o texto mudar de altura
const observer = new ResizeObserver(ajustarOdonto);
observer.observe(sobreText);

document.addEventListener("DOMContentLoaded", () => {
  const socials = document.querySelector(".socials");
  const aside = document.querySelector("aside");
  const music = document.querySelector(".music-player");

  if (window.innerWidth < 500 && socials && aside) {
    // move o .socials para antes do <aside>
    aside.insertAdjacentElement("beforebegin", socials);
  } else {
    music.insertAdjacentElement("afterend", socials);
  }
});


const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 2; // começa no meio
updateCarousel();

function updateCarousel() {


  const cardWidth = cards[0].offsetWidth + 30; // largura + margin
  const offset =
    -(index * cardWidth) +
    (track.parentElement.offsetWidth / 2 - cards[0].offsetWidth / 2 - 14.5);

  track.style.transform = `translateX(${offset}px)`;

  // ativa/desativa destaque
  cards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

// Navegação por botões
nextBtn.addEventListener("click", () => {
  index = (index + 1) % cards.length; // loop infinito
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + cards.length) % cards.length;
  updateCarousel();
});

// --- Swipe no celular ---
let startX = 0;
let endX = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => {
  let diff = endX - startX;

  if (Math.abs(diff) > 50) { // só conta se for um arrasto razoável
    if (diff < 0) {
      // deslizou para a esquerda → próximo
      index = (index + 1) % cards.length;
    } else {
      // deslizou para a direita → anterior
      index = (index - 1 + cards.length) % cards.length;
    }
    updateCarousel();
  }
  startX = 0;
  endX = 0;
});

document.addEventListener('DOMContentLoaded', () => {
  const bigger = document.querySelectorAll('.bigger-img');
  const myDiv = document.querySelector('.container-bigger-img');
  const closeBtn = document.querySelector('.out-container');
  const showImg = document.querySelector('.show-img');

  bigger.forEach(img => {
    img.addEventListener('click', () => {
      showImg.src = img.src;
      myDiv.style.display = 'flex';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      myDiv.style.display = 'none';
      showImg.src = '';
    });
  }

  myDiv.addEventListener('click', (e) => {
    if (e.target === myDiv) {
      myDiv.style.display = 'none';
      showImg.src = '';
    }
  });
});

// PDF.js para pré-visualização de PDFs
document.addEventListener("DOMContentLoaded", () => {

  const pdfs = [
    { name: "Quadrinho 1", url: "https://wascdflmlgijvjgxogdv.supabase.co/storage/v1/object/public/docs/PROPRIEDADE%20iNDUSTRIAL%20(1).pdf" },
    { name: "Quadrinho 2", url: "https://wascdflmlgijvjgxogdv.supabase.co/storage/v1/object/public/docs/copiatestete.pdf" },
  ];

  const contentDiv = document.querySelector("#quadrinhos .content");
  const container = document.querySelector(".container-bigger-img");

  // 🔹 Cria a estrutura do container apenas uma vez
  container.innerHTML = `
    <button class="out-container position-absolute top-0 z-3"
            style="top:20px; right:20px; color:ghostwhite; background-color: transparent; border:none; font-size: 40px; font-weight: bolder;">⛌</button>
    <div class="pdf-preview"
         style="overflow-y:auto; max-height:100%; height: 100%; width:95%; display:flex; flex-direction:column; align-items:center; scale: 0.85; gap: 10px;">
    </div>
  `;

  const previewDiv = container.querySelector(".pdf-preview");
  const closeBtn = container.querySelector(".out-container");

  // 🔹 Fecha o container
  closeBtn.addEventListener("click", () => {
    previewDiv.innerHTML = ""; // limpa páginas
    container.style.display = "none";
  });

  // 🔹 Gera miniaturas
  pdfs.forEach(pdf => {
    const canvas = document.createElement("canvas");
    canvas.classList.add("pdf-preview-thumb");
    canvas.title = pdf.name;
    canvas.style.cursor = "pointer";
    canvas.style.border = "1px solid #ccc";
    contentDiv.appendChild(canvas);

    // Renderiza capa
    pdfjsLib.getDocument(pdf.url).promise.then(pdfDoc => {
      pdfDoc.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 0.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");
        page.render({ canvasContext: ctx, viewport: viewport });
      });
    });

    // Clique para abrir o PDF completo
    canvas.addEventListener("click", () => {
      previewDiv.innerHTML = ""; // limpa antes de renderizar outro
      container.style.display = "flex";

      pdfjsLib.getDocument(pdf.url).promise.then(pdfDoc => {
        for (let pageNum = 1; pageNum <= Math.min(5, pdfDoc.numPages); pageNum++) {
          pdfDoc.getPage(pageNum).then(page => {
            const pageCanvas = document.createElement("canvas");
            const viewport = page.getViewport({ scale: 1 });
            pageCanvas.width = viewport.width;
            pageCanvas.height = viewport.height;
            pageCanvas.style.height = "inherit";
            const ctx = pageCanvas.getContext("2d");
            page.render({ canvasContext: ctx, viewport: viewport });
            previewDiv.appendChild(pageCanvas);
          });
        }
      });
    });
  });
});

