document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const modal = document.getElementById("modal");
  const cardText = document.getElementById("cardText");
  const cardBox = document.getElementById("cardBox");
  const closeCard = document.getElementById("closeCard");
  const heartsContainer = document.getElementById("hearts-container");

  // Música só toca uma vez
  let started = false;
  document.addEventListener("click", () => {
    if (!started) {
      music.play().catch(()=>{});
      started = true;
    }
  }, { once: true });


  /* abrir carta */
  function open(btn) {
    cardText.innerText = btn.getAttribute("data-text");
    modal.classList.remove("hidden");

    setTimeout(() => {
      cardBox.classList.add("show");
    }, 20);
  }

  document.getElementById("btn1").onclick = e => open(e.target);
  document.getElementById("btn2").onclick = e => open(e.target);
  document.getElementById("btn3").onclick = e => open(e.target);

  /* fechar carta */
  closeCard.onclick = () => {
    cardBox.classList.remove("show");
    setTimeout(() => modal.classList.add("hidden"), 250);
  };

  modal.onclick = e => {
    if (e.target === modal) closeCard.click();
  };


  /* -------------------------
     CORAÇÕES DESCENDO
     ------------------------- */
  function createFallHeart() {
    const h = document.createElement("div");
    h.className = "heart-down";

    // tamanho aleatório
    const r = Math.random();
    if (r < 0.35) h.classList.add("small");
    else if (r < 0.75) h.classList.add("medium");
    else h.classList.add("large");

    // posição horizontal
    h.style.left = Math.random() * 100 + "vw";

    // duração
    const fallTime = (4 + Math.random() * 3).toFixed(2);
    h.style.animationDuration = `${fallTime}s, 3s`;

    h.innerText = "💗";
    heartsContainer.appendChild(h);

    // remover após queda
    setTimeout(() => h.remove(), fallTime * 1000 + 500);
  }

  setInterval(createFallHeart, 300);
});
