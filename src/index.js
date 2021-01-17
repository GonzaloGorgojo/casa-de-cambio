let $fecha = document.querySelector('#fecha');
let $monedas = document.querySelector('#moneda');
let $botonBusqueda = document.querySelector('#botonBusqueda');


function mostrarFechaActual() {
    let hoy = (new Date()).toISOString().split('T')[0];
    $fecha.value = hoy;
    $fecha.setAttribute('max', hoy);
}

function obtenerDatos() {
    return fetch('https://api.exchangeratesapi.io/latest')
        .then((respuesta) => respuesta.json())
        .then((respuesta) => respuesta.rates)
        .then((monedas) => Object.keys(monedas).concat('EUR'))
        .then((monedas) => mostrarMonedas(monedas))
}

function mostrarMonedas(monedas) {
    monedas.sort().forEach(base => {
        const $item = document.createElement('option');
        $item.value = base;
        $item.textContent = base;

        $item.addEventListener('click', () => {
        });
        $monedas.appendChild($item);
    });

}

obtenerDatos();
mostrarFechaActual();

$botonBusqueda.onclick = function () {
    let fechaSeleccionada = $fecha.value
    let monedaSeleccionada = $monedas.value

    pedirCambios(monedaSeleccionada, fechaSeleccionada)
}



function pedirCambios(monedaSeleccionada, fechaSeleccionada) {

    return fetch(`https://api.exchangeratesapi.io/${fechaSeleccionada}?base=${monedaSeleccionada}`)
        .then(response => response.json())
        .then((respuesta) => respuesta.rates)
        .then((valor) => {
            crearTabla(valor, monedaSeleccionada);
        });
}

function crearTabla(valor, monedaSeleccionada) {
    if (monedaSeleccionada == 'EUR') {
        let eur = { 'EUR': "1" };
        valor = { ...valor, ...eur };
    }
    const $tabla = document.querySelector('#tabla tbody');
    $tabla.innerHTML = '';
    Object.keys(valor).sort().forEach((moneda, i) => {
        const $fila = document.createElement('tr');
        const $indice = document.createElement('td');
        const $moneda = document.createElement('td');
        const $cambio = document.createElement('td');
        const $br = document.createElement('br');
        $indice.textContent = i + 1;
        $moneda.textContent = moneda;
        $cambio.textContent = valor[moneda];
        $fila.appendChild($indice);
        $fila.appendChild($moneda);
        $fila.appendChild($cambio);
        $fila.appendChild($br);
        $tabla.appendChild($fila);

    })
}

