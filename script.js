/* Script tema Dark Love
   - corações caindo até ~50vh
   - quando total alcançado, formam um coração final (pontos)
   - modal pausa corações
*/

document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const modal = document.getElementById("modal");
  const cardText = document.getElementById("cardText");
  const cardBox = document.getElementById("cardBox");
  const closeCard = document.getElementById("closeCard");
  const heartsContainer = document.getElementById("hearts-container");

  // configs
  let fallCount = 0;
  const totalFalls = 22; // quantos corações precisam cair para formar o coração final
  const fallIntervalMs = 420;

  // init modal hidden
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");

  // start music at first click (evita bloqueio do navegador)
  let started = false;
  document.addEventListener("click", () => {
    if (!started) {
      music.play().catch(()=>{});
      started = true;
    }
  }, { once: true });

  // abrir modal
  function open(btn) {
    const text = btn.getAttribute("data-text") || "";
    cardText.innerText = text;

    document.body.classList.add("modal-open");
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => cardBox.classList.add("show"), 30);

    // abaixa música suavemente
    try { music.volume = 0.18; } catch(e) {}
  }

  // fechar modal
  function close() {
    cardBox.classList.remove("show");
    document.body.classList.remove("modal-open");
    try { music.volume = 0.35; } catch(e) {}
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }, 270);

    // reinicia contagem caso já tenha mostrado o coração final
    if (fallCount >= totalFalls) {
      fallCount = 0;
      removeFinalHeart();
      // allow new final after small delay
      setTimeout(() => { fallCount = 0; }, 400);
    }
  }

  // events
  document.getElementById("btn1").addEventListener("click", (e) => open(e.currentTarget));
  document.getElementById("btn2").addEventListener("click", (e) => open(e.currentTarget));
  document.getElementById("btn3").addEventListener("click", (e) => open(e.currentTarget));
  closeCard.addEventListener("click", close);
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });

  // cria um coração que cai até metade da tela
  function createFallHeart() {
    // se modal aberto, não criar
    if (document.body.classList.contains('modal-open')) return;

    const h = document.createElement("div");
    h.className = "heart-down";

    // size classes
    const r = Math.random();
    if (r < 0.35) h.classList.add("small");
    else if (r < 0.78) h.classList.add("medium");
    else h.classList.add("large");

    // posição horizontal (com padding lateral)
    h.style.left = (6 + Math.random() * 88) + "vw";

    // variação duração e sway
    const dur = (4 + Math.random() * 3).toFixed(2) + "s";
    const sway = (2 + Math.random() * 2).toFixed(2) + "s";
    h.style.setProperty('--dur', dur);
    h.style.setProperty('--sway', sway);

    h.innerText = "💗";
    heartsContainer.appendChild(h);

    // quando animação 'fall' terminar (chegou em ~50vh)
    const onEnd = (ev) => {
      // contar apenas o fim do "fall"
      fallCount++;
      // remover evento
      h.removeEventListener('animationend', onEnd);

      // deixa o elemento por um tempo curto, depois remove (visual)
      setTimeout(() => {
        if (h.parentElement) h.remove();
      }, 900);

      // se atingiu total, criar o coração final
      if (fallCount >= totalFalls) {
        setTimeout(createFinalHeart, 250);
      }
    };

    h.addEventListener('animationend', onEnd);
  }

  // cria corações caindo em intervalos
  const fallTimer = setInterval(createFallHeart, fallIntervalMs);

  // === formação do coração final (pontos usando curva paramétrica) ===
  let finalDots = [];
  function createFinalHeart() {
    // evita criar duas vezes
    if (finalDots.length) return;

    const numPoints = 80; // quantos pontos compõem o coração final
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.48; // metade da tela aproximadamente
    const scale = Math.min(window.innerWidth, window.innerHeight) / 40; // ajusta tamanho

    // usa equação clássica do heart (paramétrica)
    // x = 16 sin^3(t)
    // y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
    for (let i = 0; i < numPoints; i++) {
      const t = Math.PI * 2 * (i / numPoints);
      const xRaw = 16 * Math.pow(Math.sin(t), 3);
      const yRaw = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

      const x = cx + xRaw * scale;
      const y = cy - yRaw * scale; // invert y

      const dot = document.createElement("div");
      dot.className = "heart-dot";
      dot.style.left = x + "px";
      dot.style.top = y + "px";
      heartsContainer.appendChild(dot);
      finalDots.push(dot);
    }

    // anima a aparição dos pontos sequencialmente (pequeno stagger)
    finalDots.forEach((d, idx) => {
      setTimeout(() => d.classList.add('show'), 40 + idx * 12);
    });
  }

  // remove o coração final (usado ao fechar)
  function removeFinalHeart() {
    if (!finalDots.length) return;
    finalDots.forEach((d, idx) => {
      setTimeout(() => {
        d.classList.remove('show');
        setTimeout(() => { if (d.parentElement) d.remove(); }, 400);
      }, idx * 6);
    });
    finalDots = [];
  }

  // Observador: pausa animações quando modal abre (garantia)
  const obs = new MutationObserver(() => {
    const paused = document.body.classList.contains('modal-open');
    heartsContainer.querySelectorAll('.heart-down').forEach(el => {
      el.style.animationPlayState = paused ? 'paused' : 'running';
    });
    finalDots.forEach(el => {
      // deixar final dots visíveis mesmo com modal aberto? aqui respeitamos sua preferência:
      // se modal opened, manter final visível mas com opacidade reduzida
      if (paused) el.style.opacity = 0.35;
      else el.style.opacity = 1;
    });
  });
  obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  // limpa timers se página for descarregada
  window.addEventListener('beforeunload', () => clearInterval(fallTimer));
});
