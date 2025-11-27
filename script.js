document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const btn1 = document.getElementById("btn1");
  const btn2 = document.getElementById("btn2");
  const btn3 = document.getElementById("btn3");
  const modal = document.getElementById("modal");
  const cardText = document.getElementById("cardText");
  const closeCard = document.getElementById("closeCard");
  const msg = document.getElementById("msg");

  // garantir que a msg e modal estão escondidos inicialmente
  if (msg) msg.classList.remove("show"); // começa invisível
  modal.classList.add("hidden");

  // tocar música só uma vez e NÃO reiniciar depois
  let musicStarted = false;
  document.addEventListener("click", () => {
    if (!musicStarted) {
      music.play().catch(()=>{});
      musicStarted = true;
    }
  }, { once: true });

  // textos das cartas
  const textos = {
    1: "Eu amo muito você. Me desculpe por, às vezes, não ser alguém ideal para ti.",
    2: "Eu quero passar os meus dias ao seu lado, todos os dias, até o último dia da minha vida.",
    3: "Eu quero que nosso futuro seja próspero e cheio de amor."
  };

  function openCard(num) {
    cardText.innerText = textos[num];
    modal.classList.remove("hidden");
    // mostra mensagem pequena também (se quiser)
    if (msg) msg.classList.add("show");
  }

  btn1 && btn1.addEventListener("click", () => openCard(1));
  btn2 && btn2.addEventListener("click", () => openCard(2));
  btn3 && btn3.addEventListener("click", () => openCard(3));

  // fechar modal
  closeCard && closeCard.addEventListener("click", () => modal.classList.add("hidden"));
  // fechar clicando fora da carta
  modal && modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
});
