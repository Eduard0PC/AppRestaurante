const empCard = document.getElementById('empCard');
const empleadosModal = document.getElementById('empleadosModal');
const cerrarEmpBtn = document.getElementById('cerrarEmpleadosBtn');
const tablaContainer = document.getElementById('tablaContainer');

empCard.addEventListener('click', async () => {
    try {
        const res = await fetch('/registros');
        const data = await res.json();

        if (!data.success) {
            alert('Error al obtener registros');
            return;
        }

        const registros = data.registros;
        let tablaHTML = `
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Usuario</th>
                        <th>Entrada</th>
                        <th>Salida</th>
                    </tr>
                </thead>
                <tbody>
        `;

        registros.forEach(reg => {
            tablaHTML += `
                <tr>
                    <td>${reg.id_registro}</td>
                    <td>${reg.nombre_usuario}</td>
                    <td>${new Date(reg.entrada).toLocaleString()}</td>
                    <td>${reg.salida ? new Date(reg.salida).toLocaleString() : '—'}</td>
                </tr>
            `;
        });

        tablaHTML += `</tbody></table>`;
        tablaContainer.innerHTML = tablaHTML;
        empleadosModal.style.display = 'flex';

    } catch (err) {
        console.error('Error al obtener registros:', err);
        alert('Fallo al obtener datos');
    }
});

cerrarEmpBtn.addEventListener('click', () => {
    empleadosModal.style.display = 'none';
});
