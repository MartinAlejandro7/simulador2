
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

}

function mostrarSeccion(id){
  ocultarSecciones()
  document.getElementById(id).classList.add("activa")
}

function guardarTasa(){
  let tasa = recuperarInt("tasaInteres")
  let cmpMensaje = document.getElementById("mensajeTasa")
  if(tasa>=10 && tasa<=20){
    cmpMensaje.innerHTML=("tasa configurada correctamente: "+ tasa +"%")
  }else{
    cmpMensaje.innerHTML=("La tasa debe estar entre 10% y 20%")
  }
}

function guardarCliente(){
  let caja1Cedula =recuperaraTexto("txtCedula");
  let caja2Nombre =recuperaraTexto("textNombre");
  let caja3Apellido =recuperaraTexto("textApellido");
  let numIngresos = recuperarInt("numIngresos");
  let numEgresos = recuperarInt("numEgresos");
  let cliente = {}

  cliente.cedula = caja1Cedula;
  cliente.nombre = caja2Nombre;
  cliente.apellido = caja3Apellido;
  cliente.ingresos = numIngresos;
  cliente.egresos = numEgresos;



  let modificarCliente =buscarCliente(caja1Cedula)
  if(modificarCliente != null){
    modificarCliente.nombre = caja2Nombre
    modificarCliente.apellido = caja3Apellido
    modificarCliente.ingresos = numIngresos
    modificarCliente.egresos= numEgresos
  }else {
    clientes.push(cliente)
  }
  pintarClientes();
  
  }

function pintarClientes(){
  let cmpClientes = document.getElementById("tablaClientes");
  let contenido = "";
  let infoCliente;
  
  for(let i=0; i<clientes.length; i++){
    infoCliente = clientes[i];
    contenido = contenido +"<tr>"+
    "<td>"+infoCliente.cedula+"</td>" +
    "<td>"+infoCliente.nombre+"</td>"+"<td>"+infoCliente.apellido+"</td>"+
    "<td>"+infoCliente.ingresos+"</td>"+"<td>"+infoCliente.egresos+"</td>"+
    "<td><button onclick=\"seleccionarCliente('" + infoCliente.cedula + "')\">Actualizar</button></td>"+
    "</tr>"
  }
  cmpClientes.innerHTML = contenido
}

function buscarCliente(cedula){
   for(let i = 0;i<clientes.length; i++){
    let cliente = clientes[i]

      if(cliente.cedula == cedula){
        return cliente
      }
   }
   return null
}

function seleccionarCliente(cedula){
  clienteSeleccionado = buscarCliente(cedula)
  if(clienteSeleccionado != null){
    mostrarTextoEnCaja("txtCedula",clienteSeleccionado.cedula);
    mostrarTextoEnCaja("textNombre",clienteSeleccionado.nombre);
    mostrarTextoEnCaja("textApellido",clienteSeleccionado.apellido);
    mostrarTextoEnCaja("numIngresos",clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("numEgresos",clienteSeleccionado.egresos);

    document.getElementById("btnGuardar").innerText= "Actualizar Cliente"
    document.getElementById("txtCedula").readOnly= true

  }else{
    alert("no existe")
  }

}

function limpiar (){
  mostrarTextoEnCaja("txtCedula","")
  mostrarTextoEnCaja("textNombre","")
  mostrarTextoEnCaja("textApellido","")
  mostrarTextoEnCaja("numIngresos","")
  mostrarTextoEnCaja("numEgresos","")


}