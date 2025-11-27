document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const modal = document.getElementById("modal");
  const cardText = document.getElementById("cardText");
  const cardBox = document.getElementById("cardBox");
  const msg = document.getElementById("msg");
  const closeCard = document.getElementById("closeCard");

  const heartsContainer = document.getElementById("hearts-container");
  const bigHeart = document.getElementById("big-heart");

  // esconder no início
  modal.classList.add("hidden");

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

    document.body.classList.add("modal-open");
    modal.classList.remove("hidden");

    setTimeout(() => {
      cardBox.classList.add("show");
    }, 30);
  }

  document.getElementById("btn1").onclick = e => open(e.target);
  document.getElementById("btn2").onclick = e => open(e.target);
  document.getElementById("btn3").onclick = e => open(e.target);

  closeCard.onclick = () => {
    cardBox.classList.remove("show");

    document.body.classList.remove("modal-open");

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  };

  modal.addEventListener("click", e => {
    if (e.target === modal) closeCard.click();
  });

  // ----- CORAÇÕES SUBINDO -----
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart-up";
    h.innerHTML = "💗";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }, 350);

  // ----- CORAÇÕES CAINDO -----
  let fallCount = 0;
  const totalFalls = 25;

  const createFallHeart = () => {
    const h = document.createElement("div");
    h.className = "heart-down";
    h.innerHTML = "💗";
    h.style.left = Math.random() * 100 + "vw";

    heartsContainer.appendChild(h);

    h.addEventListener("animationend", () => {
      fallCount++;

      if (fallCount >= totalFalls) {
        bigHeart.classList.add("active");
      }

      setTimeout(() => h.remove(), 2000);
    });
  };

  setInterval(createFallHeart, 500);
});
