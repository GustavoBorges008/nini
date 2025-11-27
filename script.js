const music = document.getElementById("music");
const modal = document.getElementById("modal");
const cardText = document.getElementById("cardText");
const closeCard = document.getElementById("closeCard");

// Botões das cartas
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

// Evita música reiniciar
document.addEventListener("click", () => {
    if (!music.playedOnce) {
        music.play().catch(() => {});
        music.playedOnce = true;
    }
}, { once: true });

// Textos das cartas
btn1.onclick = () => openCard("Eu amo muito você. Me desculpe por não ser alguém ideal para ti.");
btn2.onclick = () => openCard("Eu quero passar os meus dias ao seu lado, todos os dias, até o dia da minha morte.");
btn3.onclick = () => openCard("Eu quero que nosso futuro seja próspero.");

function openCard(text) {
    cardText.innerText = text;
    modal.classList.add("show");
}

closeCard.onclick = () => modal.classList.remove("show");
