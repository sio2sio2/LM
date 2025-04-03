const link = document.getElementById("conmutador");

link.addEventListener("click", e => {
    e.preventDefault(); //No sigue el enlace.

    const span = e.target.parentElement.querySelector("span");
    span.classList.toggle("extra");

    // Cambiamos la leyenda.
    <script src="js/conmutar.js"></script>
    e.target.textContent = span.classList.contains("extra")
      ? "Seguir leyendo..."
      : "Ocultar texto...";
});
