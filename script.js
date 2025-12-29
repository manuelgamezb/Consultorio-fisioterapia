//arrays para guardar pacientes//
let pacientes = [];
//cargar pacientes al iniciar la pagina//
window.onload = function(){
    cargarPacientes();

};
function cargarPacientes(){
    //obtener datos de localstorage
    let datosGuardados = localStorage.getItem("pacientes");

    if(datosGuardados) {
        //convertir de texto a array
        pacientes = JSON.parse(datosGuardados);
        mostrarPacientes();
    }

}

function guardarEnLocalStorage(){
    //convertir array en texto y guardar

    localStorage.setItem("pacientes",JSON.stringify(pacientes));

}
function irAPacientes(){
    document.getElementById("seccionPacientes").style.display = "block";

}

function cerrarFormulario(){
    document.getElementById("seccionPacientes").style.display = "none";
}
function guardarPaciente(){

    let nombre = document.getElementById("nombrePaciente").value;
    let telefono = document.getElementById("telefonoPaciente").value;

    if (nombre === ""|| telefono === "") {
        alert("por favor llene todos los campos");
        return;
}
let paciente = {
    nombre : nombre,
    telefono : telefono


};
pacientes.push(paciente);

//guardar localStorage
guardarEnLocalStorage();

mostrarPacientes();

document.getElementById("nombrePaciente").value = "";
document.getElementById("telefonoPaciente").value = "";

alert("Paciente guardado exitosamente");

}

function mostrarPacientes(){

    let tbody = document.getElementById("listaPacientes");
    tbody.innerHTML = "";

    for (let i = 0; i <pacientes.length; i++){
        let fila = "<tr><td>" + pacientes[i].nombre + "</td><td>" + pacientes[i].telefono + "</td></tr>";
        tbody.innerHTML += fila;

    }

}