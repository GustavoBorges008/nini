document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const modal = document.getElementById("modal");
  const cardText = document.getElementById("cardText");
  const cardBox = document.getElementById("cardBox");
  const closeCard = document.getElementById("closeCard");
  const heartsContainer = document.getElementById("hearts-container");
  const bigHeart = document.getElementById("big-heart");

  // inicial
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  // evitar autoplay bloqueado: tocar na 1ª interação do usuário
  let started = false;
  document.addEventListener("click", () => {
    if (!started) {
      music.play().catch(()=>{});
      started = true;
    }
  }, { once: true });

  // abrir modal com texto da carta
  function open(btn) {
    const text = btn.getAttribute("data-text") || "";
    cardText.innerText = text;

    document.body.classList.add("modal-open");
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");

    // anima
    setTimeout(() => {
      cardBox.classList.add("show");
      cardBox.setAttribute("aria-hidden", "false");
    }, 30);

    // opcional: quando modal abre, diminuímos volume suave
    try {
      music.volume = 0.18;
    } catch (e) {}
  }

  // fechar
  function close() {
    cardBox.classList.remove("show");
    document.body.classList.remove("modal-open");

    // volta volume
    try { music.volume = 0.35; } catch (e) {}

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }, 260);

    // se o big-heart estava ativo, remover e reiniciar contagem para novo ciclo
    if (bigHeart.classList.contains("active")) {
      bigHeart.classList.remove("active");
      // reiniciar contadores:
      fallCount = 0;
    }
  }

  // eventos dos botões
  document.getElementById("btn1").addEventListener("click", (e) => open(e.currentTarget));
  document.getElementById("btn2").addEventListener("click", (e) => open(e.currentTarget));
  document.getElementById("btn3").addEventListener("click", (e) => open(e.currentTarget));
  closeCard.addEventListener("click", close);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });

  // -----------------------
  // CORAÇÕES CAINDO (principal)
  // -----------------------
  let fallCount = 0;
  const totalFalls = 20; // quantos corações precisamos pra mostrar o grande

  // gera um coração caindo
  function createFallHeart() {
    const h = document.createElement("div");
    h.className = "heart-down";

    // variação de tamanho
    const sizeClass = Math.random();
    if (sizeClass < 0.35) h.classList.add("small");
    else if (sizeClass < 0.78) h.classList.add("medium");
    else h.classList.add("large");

    // posição horizontal
    h.style.left = (5 + Math.random() * 90) + "vw";

    // leve variação na duração e sway
    const dur = (4 + Math.random() * 3).toFixed(2) + "s";
    const sway = (2 + Math.random() * 2).toFixed(2) + "s";
    h.style.setProperty('--dur', dur);
    h.style.setProperty('--sway', sway);

    h.innerHTML = "💗";

    heartsContainer.appendChild(h);

    // quando terminar a animação 'fall', contamos
    const onEnd = (ev) => {
      // ev.animationName pode variar; garantimos que seja o fall
      // contagem simples:
      fallCount++;
      // se atingir total, mostra o big-heart
      if (fallCount >= totalFalls && !bigHeart.classList.contains("active")) {
        // pequeno atraso pra garantir visibilidade
        setTimeout(() => bigHeart.classList.add("active"), 200);
      }

      // remove o elemento depois de um curto delay (deixa o big heart aparecer)
      setTimeout(() => {
        h.remove();
      }, 900);

      h.removeEventListener('animationend', onEnd);
    };

    h.addEventListener('animationend', onEnd);
  }

  // cria corações caindo em intervalos
  const fallInterval = setInterval(createFallHeart, 420);

  // -----------------------
  // CORAÇÕES SUBINDO (se quiser manter o efeito que você tinha)
  // -----------------------
  setInterval(() => {
    const up = document.createElement("div");
    up.className = "heart-up";
    up.innerHTML = "💗";
    up.style.left = Math.random() * 100 + "vw";
    // cores / pequenas variações via style
    up.style.opacity = 0.95 - Math.random() * 0.25;
    up.style.fontSize = (12 + Math.random()*16) + "px";
    document.body.appendChild(up);
    setTimeout(() => up.remove(), 4200);
  }, 650);

  // segura: quando o modal estiver aberto pausamos as animações (CSS faz a maior parte),
  // mas também podemos forçar pausar elementos recém-criados:
  const observer = new MutationObserver(() => {
    const paused = document.body.classList.contains('modal-open');
    // se necessário, pode iterar pelos corações e ajustar animationPlayState
    heartsContainer.querySelectorAll('.heart-down').forEach(el => {
      el.style.animationPlayState = paused ? 'paused' : 'running';
    });
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // se usuário fechar e quiser reiniciar a cena: ao fechar já reiniciamos fallCount.
  // (fallCount já é resetado no close())

  // segurança: limpar intervalos caso a página seja descarregada
  window.addEventListener('beforeunload', () => {
    clearInterval(fallInterval);
  });
});
