document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn");
    const msg = document.getElementById("msg");
    const music = document.getElementById("music");

    /* Deixa a música mais baixa para ficar agradável */
    music.volume = 0.4;

    /* Alguns celulares bloqueiam autoplay — forço ativação ao clicar */
    document.addEventListener("click", () => {
        music.play().catch(() => {});
    }, { once: true });

    /* Botão clicado */
    btn.addEventListener("click", () => {
        msg.classList.add("show");
        btn.style.display = "none";
    });
});
