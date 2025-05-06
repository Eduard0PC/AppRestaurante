//FUNCIONALIDADES DEPENDIENDO DEL ROL DEL USUARIO (ADMIN, USER)
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/usuario');
        const data = await response.json();

        if (data.success) {
            const welcomeText = document.getElementById("welcome");
            const username = data.nombre;
            const role = data.rol;

            welcomeText.textContent = `Bienvenid@ ${username} (${role})`;

            // Ajuste dinámico del min-width
            const tempSpan = document.createElement("span");
            tempSpan.style.visibility = "hidden";
            tempSpan.style.position = "absolute";
            tempSpan.style.whiteSpace = "nowrap"; // Evita el salto de línea
            tempSpan.style.font = window.getComputedStyle(welcomeText).font; // Asegura la misma fuente
            tempSpan.textContent = welcomeText.textContent;
            document.body.appendChild(tempSpan);

            // Ajusta el min-width correctamente
            const textWidth = tempSpan.getBoundingClientRect().width;
            welcomeText.style.minWidth = `${Math.ceil(textWidth) + 20}px`; // 20px extra de margen pa que no explote

            // Elimina el span temporal
            document.body.removeChild(tempSpan);

            if (role.toLowerCase() === "user") {
                // Eliminar la tarjeta de empleados
                const empleadoCard = document.querySelector('.card-empleados');
                const allcards = document.querySelector(".allcards");

                if (empleadoCard) {
                    empleadoCard.remove(); //Borra, elimina, desintala, fulmina, destruye, aniquila, extermina, erradica, extingue, suprime, liquida, acaba, remueve, desinstala, desmonta, desarma, descompone la tarjeta de empleados
                    setTimeout(() => {
                        allcards.classList.add("no-empleados"); // Aplica la estructura de grid
                    }, 50);
                }
            }
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        console.error("Error obteniendo el usuario:", error);
        window.location.href = '/';
    }
});

//MANEJO DEL BOTON DE CERRAR SESION
document.getElementById('salirCard').addEventListener('click', async () => {
    const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    if (data.success) {
        window.location.href = '/';
    } else {
        alert('Error al cerrar sesión');
    }
});


//MANEJO DEL BOTON DE GENERAR QR
document.addEventListener('DOMContentLoaded', () => {
    const qrCard = document.querySelector('.card-qr');

    qrCard.addEventListener('click', async () => {
        try {
            const response = await fetch('/generate-qr', {
                method: 'POST'
            });

            const data = await response.json();
            if (data.qrCode) {
                document.getElementById('qrImage').src = data.qrCode;
                document.getElementById('qrModal').style.display = 'flex';
            } else {
                alert('No se pudo generar el QR');
            }
        } catch (err) {
            console.error(err);
            alert('Error al contactar el servidor');
        }
    });
});

function cerrarQR() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'none';
}
window.cerrarQR = cerrarQR;
