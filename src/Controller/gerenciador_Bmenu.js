const botaoMenu = document.getElementById("botaoMenu");
const botoes = document.getElementById("botoes");

botaoMenu.addEventListener("click", function () {
    botoes.classList.toggle("ativo");
});