document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const modal = document.getElementById("modal");
  const cardText = document.getElementById("cardText");
  const cardBox = document.getElementById("cardBox");
  const msg = document.getElementById("msg");
  const closeCard = document.getElementById("closeCard");

  // esconde no início
  modal.classList.add("hidden");
  msg.classList.remove("show");

  // evitar música tocar várias vezes
  let started = false;
  document.addEventListener("click", () => {
    if (!started) {
      music.play().catch(()=>{});
      started = true;
    }
  }, { once: true });

  function open(btn) {
    const text = btn.getAttribute("data-text");
    cardText.innerText = text;

    modal.classList.remove("hidden");

    // animação suave
    setTimeout(() => {
      cardBox.classList.add("show");
    }, 30);
  }

  document.getElementById("btn1").onclick = e => open(e.target);
  document.getElementById("btn2").onclick = e => open(e.target);
  document.getElementById("btn3").onclick = e => open(e.target);

  closeCard.onclick = () => {
    cardBox.classList.remove("show");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  };

  // fechar clicando fora
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      closeCard.click();
    }
  });

  // Corações subindo
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart-up";
    h.innerHTML = "💗";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }, 350);
});
