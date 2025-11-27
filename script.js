const btn = document.getElementById("btn");
const msg = document.getElementById("msg");
const cartas = document.getElementById("cartas");
const heartsContainer = document.querySelector(".hearts-container");

/* Botão clicado */
btn.addEventListener("click", () => {
    msg.classList.add("show");
    cartas.classList.remove("hidden");

    btn.style.display = "none";

    criarCoracoes();
});

/* Corações infinitos */
function criarCoracoes() {
    setInterval(() => {
        const heart = document.createElement("span");
        heart.innerHTML = "❤";
        heart.style.left = Math.random() * 90 + "%";
        heart.style.fontSize = Math.random() * 20 + 20 + "px";
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }, 300);
}
