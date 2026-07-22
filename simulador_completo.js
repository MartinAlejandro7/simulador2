
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
function ocultarSecciones() {
  document.getElementById("parametros").classList.remove("activa")
  document.getElementById("clientes").classList.remove("activa")
  document.getElementById("credito").classList.remove("activa")

}

function mostrarSeccion(id) {
  ocultarSecciones()
  document.getElementById(id).classList.add("activa")
}

function guardarTasa() {
  let tasa = recuperarInt("tasaInteres")
  let cmpMensaje = document.getElementById("mensajeTasa")
  if (tasa >= 10 && tasa <= 20) {
    tasaInteres = tasa;
    cmpMensaje.innerHTML = ("tasa configurada correctamente: " + tasa + "%")
  } else {
    cmpMensaje.innerHTML = ("La tasa debe estar entre 10% y 20%")
  }
}

function guardarCliente() {
  let caja1Cedula = recuperaraTexto("txtCedula");
  let caja2Nombre = recuperaraTexto("textNombre");
  let caja3Apellido = recuperaraTexto("textApellido");
  let numIngresos = recuperarInt("numIngresos");
  let numEgresos = recuperarInt("numEgresos");
  let cliente = {}

  cliente.cedula = caja1Cedula;
  cliente.nombre = caja2Nombre;
  cliente.apellido = caja3Apellido;
  cliente.ingresos = numIngresos;
  cliente.egresos = numEgresos;



  let modificarCliente = buscarCliente(caja1Cedula)
  if (modificarCliente != null) {
    modificarCliente.nombre = caja2Nombre
    modificarCliente.apellido = caja3Apellido
    modificarCliente.ingresos = numIngresos
    modificarCliente.egresos = numEgresos
  } else {
    clientes.push(cliente)
  }
  pintarClientes();

}

function pintarClientes() {
  let cmpClientes = document.getElementById("tablaClientes");
  let contenido = "";
  let infoCliente;

  for (let i = 0; i < clientes.length; i++) {
    infoCliente = clientes[i];
    contenido = contenido + "<tr>" +
      "<td>" + infoCliente.cedula + "</td>" +
      "<td>" + infoCliente.nombre + "</td>" + "<td>" + infoCliente.apellido + "</td>" +
      "<td>" + infoCliente.ingresos + "</td>" + "<td>" + infoCliente.egresos + "</td>" +
      "<td><button onclick=\"seleccionarCliente('" + infoCliente.cedula + "')\">Actualizar</button></td>" +
      "</tr>"
  }
  cmpClientes.innerHTML = contenido
}

function buscarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    let cliente = clientes[i]

    if (cliente.cedula == cedula) {
      return cliente
    }
  }
  return null
}

function seleccionarCliente(cedula) {
  clienteSeleccionado = buscarCliente(cedula)
  if (clienteSeleccionado != null) {
    mostrarTextoEnCaja("txtCedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("textNombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("textApellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("numIngresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("numEgresos", clienteSeleccionado.egresos);

    document.getElementById("btnGuardar").innerText = "Actualizar Cliente"
    document.getElementById("txtCedula").readOnly = true

  } else {
    alert("no existe")
  }

}

function limpiar() {
  mostrarTextoEnCaja("txtCedula", "")
  mostrarTextoEnCaja("textNombre", "")
  mostrarTextoEnCaja("textApellido", "")
  mostrarTextoEnCaja("numIngresos", "")
  mostrarTextoEnCaja("numEgresos", "")


}
function buscarClienteCredito() {
  let recuperarCedula = recuperaraTexto("buscarCedulaCredito");
  let cliente = buscarCliente(recuperarCedula);

  if (cliente != null) {
    let datosClienteCredito = "<h3>Datos del Cliente</h3>" +
      "<p><strong>Cédula:</strong>" + cliente.cedula + "</p>" +
      "<p><strong>Nombre:</strong>" + cliente.nombre + "</p>" +
      "<p><strong>Apellido:</strong>" + cliente.apellido + "</p>" +
      "<p><strong>Ingresos:</strong>" + cliente.ingresos + "</p>" +
      "<p><strong>Egresos:</strong>" + cliente.egresos + "</p>";

    mostrarTexto("datosClienteCredito", datosClienteCredito);
  } else {
    mostrarTexto("datosClienteCredito", "Cliente no encontrado");
  }
}
function calcularDisponibilidad(ingresos, egresos) {
  return ingresos - egresos;
}

function calcularCapacidadPago(disponibilidad) {
  return disponibilidad * 0.4;
}

function calcularInteresSimple(monto, tasa, plazo) {
  return monto * (tasa / 100) * plazo;
}

function calcularTotalPagar(monto, interes) {
  return monto + interes;
}

function calcularCuotaMensual(totalPagar, plazo) {
  return totalPagar / (plazo * 12);
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  return cuotaMensual <= capacidadPago;
}

// Función para calcular el credito
function calcularCredito() {

  // Recuperamos los datos que puso el usuario
  let monto = recuperarFloat("montoCredito");
  let plazo = recuperarInt("plazoCredito");

  // Buscamos el cliente por su cédula
  let cedula = recuperaraTexto("buscarCedulaCredito");
  clienteSeleccionado = buscarCliente(cedula);

  // Si no se encontro ningn cliente
  if (clienteSeleccionado == null) {
    alert("Tienes que buscar un cliente primero");
    return; // Terminamos la función aquí si no hay cliente
  }

  // Sacamos los datos de ingresos y gastos
  let ingresos = clienteSeleccionado.ingresos;
  let egresos = clienteSeleccionado.egresos;

  // Calculamos cada cosa paso a paso
  let disponibilidad = calcularDisponibilidad(ingresos, egresos);

  let capacidadPago = calcularCapacidadPago(disponibilidad);

  let interes = calcularInteresSimple(
    monto,
    tasaInteres,
    plazo
  );

  let totalPagar = calcularTotalPagar(monto, interes);

  let cuotaMensual = calcularCuotaMensual(
    totalPagar,
    plazo
  );

  // Vemos si aprueban o no
  let aprobado = aprobarCredito(
    capacidadPago,
    cuotaMensual
  );

  // Donde vamos a mostrar el resultado
  let resultadoCredito = document.getElementById("resultadoCredito");

  // Empezamos a armar el mensaje
  let mensaje = "";

  mensaje = mensaje + "Disponibilidad: USD " + disponibilidad.toFixed(2) + "<br>";

  mensaje = mensaje + "Capacidad de pago: USD " + capacidadPago.toFixed(2) + "<br>";

  mensaje = mensaje + "Interés total: USD " + interes.toFixed(2) + "<br>";

  mensaje = mensaje + "Total que vas a pagar: USD " + totalPagar.toFixed(2) + "<br>";

  mensaje = mensaje + "Cuota cada mes: USD " + cuotaMensual.toFixed(2) + "<br>";

  // Agregamos si es aprobado o rechazado
  if (aprobado == true) {
    mensaje = mensaje + "✅ RESULTADO: APROBADO";
  } else {
    mensaje = mensaje + "❌ RESULTADO: RECHAZADO";
  }

  // Mostramos todo en la pagina
  resultadoCredito.innerHTML = mensaje;

  // Cambiamos el color y activamos el boton si es aprobado
  if (aprobado == true) {
    resultadoCredito.className = "aprobado";
    creditoAprobado = true;

    let boton = document.getElementById("btnSolicitarCredito");
    boton.disabled = false;
  } else {
    resultadoCredito.className = "rechazado";
    creditoAprobado = false;

    let boton = document.getElementById("btnSolicitarCredito");
    boton.disabled = true;
  }

  // Guardamos los valores calculados por si se necesitan despues
  cuotaCalculada = cuotaMensual;
  montoCalculado = monto;
  plazoCalculado = plazo;
}
function solicitarCredito() {

  if (creditoAprobado == false) {
    alert("El crédito no ha sido aprobado");
    return;
  }

  let credito = {};

  credito.cedula = clienteSeleccionado.cedula;
  credito.monto = montoCalculado;
  credito.plazo = plazoCalculado;
  credito.cuota = cuotaCalculada;

  creditos.push(credito);

  alert("Crédito registrado correctamente");
}