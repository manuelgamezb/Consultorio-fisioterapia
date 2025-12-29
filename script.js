//arrays para guardar pacientes//
let pacientes = [];
let citas = [];

//cargar pacientes al iniciar la pagina//
window.onload = function(){
    cargarPacientes();
    cargarCitas();


};

function cargarPacientes(){

    let datosGuardados = localStorage.getItem("pacientes");

    if(datosGuardados) {
        //convertir de texto a array
        pacientes = JSON.parse(datosGuardados);
        mostrarPacientes();
    }

}

function cargarCitas(){
    let datosGuardados = localStorage.getItem("citas");
    if (datosGuardados){
        citas = JSON.parse(datosGuardados);
        mostrarCitas();

    }
}





function guardarEnLocalStorage(){


    localStorage.setItem("pacientes",JSON.stringify(pacientes));
    localStorage.setItem("citas", JSON.stringify(citas));


}

function irAPacientes(){
    document.getElementById("seccionPacientes").style.display = "block";
    document.getElementById("seccionCitas").style.display = "none";


}

function irACitas(){

    document.getElementById("seccionCitas").style.display = "block";
    document.getElementById("seccionPacientes").style.display = "none";
    cargarSelectorPacientes();

}

function cerrarFormulario(){
    document.getElementById("seccionPacientes").style.display = "none";
}

function cerrarCitas(){
    document.getElementById("seccionCitas").style.display = "none";



}
//          ===== pacientes ======     >


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

// citas//

function cargarSelectorPacientes(){
    let select = document.getElementById("citaPacientes");
    select.innerHTML = '<option value="">Seleccionar paciente...</option>';

    for (let i=0; i< pacientes.length; i++){
        select.innerHTML += 'option value ="' + pacientes[i].nombre + '">' + pacientes[i].nombre + '</option>';

    }


}
function agendarCita(){
    let paciente = document.getElementById("citaPaciente").value;
    let fecha = document.getElementById("citaFecha").value;
    let hora = document.getElementById("citaHora").value;
    let tipo = document.getElementById("citaTipo").value;
    let notas = document.getElementById("citaNotas").value;

    if (paciente === "" || fecha === "" || hora === "") {
        alert("Por favor llena los campos obligatorios  (Paciente, Fecha, Hora)");
        return;
     }

     let cita = {
        paciente: paciente,
        fecha: fecha,
        hora: hora,
        tipo: tipo,
        notas: notas,
        estado: "programada"
     };

     citas.push(cita);
     guardarEnLocalStorage();
     mostrarCitas();

        document.getElementById("citaPaciente").value = "";
        document.getElementById("citaFecha").value = "";
        document.getElementById("citaHora").value = "";
        document.getElementById("citaNotas").value = "";

        alert("Cita Agendada exitosamente");


}

function mostrarCitas(){
    let tbody = document.getElementById("listaCitas");
    tbody.innerHTML = "";

    for (let i=0; i <citas,length; i++){
        let fila = "<tr>" +
             "<td>" + citas[i].paciente + "</td>"+
             "<td>" + citas[i].fecha + "</td>"+
              "<td>" + citas[i].hora + "</td>"+
              "<td>" + citas[i].tipo + "</td>"+
             "</tr>";
            
        tbody.innerHTML += fila;
        





    }
}