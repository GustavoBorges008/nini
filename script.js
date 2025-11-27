document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");
  const modal = document.getElementById("modal");
  const cardText = document.getElementById("cardText");
  const closeCard = document.getElementById("closeCard");
  const msg = document.getElementById("msg");

  // garantir modal fechado
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  // tocar música só uma vez
  let musicStarted = false;
  document.addEventListener("click", () => {
    if (!musicStarted) {
      music.play().catch(() => {});
      musicStarted = true;
    }
  }, { once: true });

  const textos = {
    1: "Eu amo muito você. Me desculpe por, às vezes, não ser alguém ideal para ti.",
    2: "Eu quero passar os meus dias ao seu lado, todos os dias, até o último dia da minha vida.",
    3: "Eu quero que nosso futuro seja próspero e cheio de amor."
  };

  function openCardFromButton(btn, index) {
    const fromAttr = btn?.getAttribute("data-text");
    const text = fromAttr && fromAttr.trim().length ? fromAttr : textos[index];
    cardText.innerText = text;

    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");

    if (msg) msg.classList.add("show");
  }

  if (btn1) btn1.addEventListener("click", () => openCardFromButton(btn1, 1));
  if (btn2) btn2.addEventListener("click", () => openCardFromButton(btn2, 2));
  if (btn3) btn3.addEventListener("click", () => openCardFromButton(btn3, 3));

  if (closeCard)
    closeCard.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      if (msg) msg.classList.remove("show");
    });

  // fechar clicando fora
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      if (msg) msg.classList.remove("show");
    }
  });
});
// Criar corações caindo continuamente
setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💗";

  // posição aleatória horizontal
  heart.style.left = Math.random() * 100 + "vw";

  document.body.appendChild(heart);

  // remover depois de cair
  setTimeout(() => {
    heart.remove();
  }, 4000);
}, 350);

// Criar coração grande ao fundo (1 vez a cada 5 segundos)
setInterval(() => {
  const big = document.createElement("div");
  big.classList.add("big-heart");
  big.innerHTML = "❤️";

  document.body.appendChild(big);

  // remover depois da animação
  setTimeout(() => big.remove(), 2000);
}, 5000);
// Corações subindo continuamente
setInterval(() => {
  const heart = document.createElement("div");
  heart.classList.add("heart-up");
  heart.innerHTML = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 4000);
}, 350);

// Quando abrir a carta → animação suave + brilho
function showCardAnimation() {
  const card = document.querySelector(".card");
  if (card) card.classList.add("show");
}

// Mostrar carta = já existe no seu script, só adicionar:
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    setTimeout(showCardAnimation, 50);
  }
});

// Remover animação ao fechar
document.getElementById("closeCard").addEventListener("click", () => {
  const card = document.querySelector(".card");
  if (card) card.classList.remove("show");
});
