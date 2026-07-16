
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