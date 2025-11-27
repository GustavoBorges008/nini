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
  modal.setAttribute("aria-hidden", "true");

  // tocar música só uma vez e NÃO reiniciar depois
  let musicStarted = false;
  document.addEventListener("click", () => {
    if (!musicStarted) {
      music.play().catch(()=>{});
      musicStarted = true;
    }
  }, { once: true });

  // textos de fallback (caso data-text não exista por algum motivo)
  const textos = {
    1: "Eu amo muito você. Me desculpe por, às vezes, não ser alguém ideal para ti.",
    2: "Eu quero passar os meus dias ao seu lado, todos os dias, até o último dia da minha vida.",
    3: "Eu quero que nosso futuro seja próspero e cheio de amor."
  };

  function openCardFromButton(btn, index) {
    // prioridade: usar o texto que está no data-text do botão (garante que está no HTML)
    const fromAttr = btn?.getAttribute("data-text");
    const text = fromAttr && fromAttr.trim().length ? fromAttr : textos[index];
    cardText.innerText = text;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    if (msg) msg.classList.add("show");
  }

  // eventos seguros (verifica existência antes)
  if (btn1) btn1.addEventListener("click", () => openCardFromButton(btn1, 1));
  if (btn2) btn2.addEventListener("click", () => openCardFromButton(btn2, 2));
  if (btn3) btn3.addEventListener("click", () => openCardFromButton(btn3, 3));

  // fechar modal
  if (closeCard) closeCard.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });

  // fechar clicando fora da carta
  if (modal) modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  // DEBUG opcional: mostra no console quando os botões são clicados
  // (descomente para testar)
  // btn1 && btn1.addEventListener("click", () => console.log("clicou btn1"));
  // btn2 && btn2.addEventListener("click", () => console.log("clicou btn2"));
  // btn3 && btn3.addEventListener("click", () => console.log("clicou btn3"));
});
