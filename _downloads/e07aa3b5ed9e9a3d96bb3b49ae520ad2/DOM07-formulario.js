window.onload = function(e) {
    const otras = document.querySelector('[value=otr]'),
          otrasd = document.querySelector('[name="aficionp"]'),
          form = document.querySelector("form"),
          eye = document.querySelector('.fa-eye'),
          reset = document.querySelector('button[type=reset]');

    
    otras.addEventListener("change", e => {
        // Habilitamos/deshabilitamos el cuadro de texto.
        otrasd.disabled = !e.target.checked;
    });

    eye.addEventListener('click', e => {
        const input = e.target.parentElement.querySelector('input');
        if(input.type === "password") {
            input.type = "text";
            e.target.title = "Ocultar contraseña";
        }
        else {
            input.type = "password";
            e.target.title = "Ocultar contraseña";
        }
    });

    reset.addEventListener("click", e=> {
        e.preventDefault();
        confirm("¿De veras quiere limpiar el formulario?") && form.reset();
    });

    form.onsubmit = function (e) {
        alert("Esta información debe enviarse a algún sitio.")
        return false;
    }
}