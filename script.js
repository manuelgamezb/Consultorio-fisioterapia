//arrays para guardar pacientes//
let pacientes = [];
let citas = [];
let sesiones =[];

//cargar pacientes al iniciar la pagina//
window.onload = function(){
    cargarPacientes();
    cargarCitas();
    cargarSesiones();
};

function cargarPacientes(){
    let datosGuardados = localStorage.getItem("pacientes");
    if(datosGuardados) {
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
function cargarSesiones(){
    let datosGuardados = localStorage.getItem("sesiones");
    if(datosGuardados){
        sesiones = JSON.parse(datosGuardados);
        mostrarSesiones();
    }

}




function guardarEnLocalStorage(){


    localStorage.setItem("pacientes",JSON.stringify(pacientes));
    localStorage.setItem("citas", JSON.stringify(citas));
    localStorage.setItem("sesiones",JSON.stringify(sesiones));
}

//===== NAVEGACION ========//
function irAPacientes(){
    document.getElementById("seccionPacientes").style.display = "block";
    document.getElementById("seccionCitas").style.display = "none";
    document.getElementById("seccionSesiones").style.display = "none";



}

function irACitas(){

    document.getElementById("seccionCitas").style.display = "block";
    document.getElementById("seccionPacientes").style.display = "none";
    document.getElementById("seccionSesiones").style.display = "none";
    cargarSelectorPacientes();

}

function irASesiones(){
    document.getElementById("seccionSesiones").style.display ="block";
    document.getElementById("seccionPacientes").style.display ="none";
    document.getElementById("seccionCitas").style.display = "none";
    cargarSelectorPacientesSesion();

}  

function cerrarFormulario(){
    document.getElementById("seccionPacientes").style.display = "none";
}

function cerrarCitas(){
    document.getElementById("seccionCitas").style.display = "none";
}

function cerrarSesiones(){
    document.getElementById("seccionSesiones").style.display = "none";

}
//          ===== pacientes ======  aqui me quede 12/30   >


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
    let select = document.getElementById("citaPaciente");
    select.innerHTML = '<option value="">Seleccionar paciente...</option>';

    for (let i=0; i< pacientes.length; i++){
        select.innerHTML += '<option value ="' + pacientes[i].nombre + '">' + pacientes[i].nombre + '</option>';

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

    for (let i=0; i <citas.length; i++){
        let fila = "<tr>" +
             "<td>" + citas[i].paciente + "</td>"+
             "<td>" + citas[i].fecha + "</td>"+
              "<td>" + citas[i].hora + "</td>"+
              "<td>" + citas[i].tipo + "</td>"+
             "</tr>";
            
        tbody.innerHTML += fila;
    }
}
    // ------ Sesiones -------//

    function cargarSelectorPacientesSesion(){
        let select = document.getElementById("sesionPaciente");
        select.innerHTML = '<option value="">Seleccionar Paciente...</option>';

        for (let i=0; i< pacientes.length; i++){
            select.innerHTML += '<option value="' + pacientes[i].nombre + '">' + pacientes[i].nombre + '</option>';

        }

    }
    function registrarSesion(){
        let paciente = document.getElementById("sesionPaciente").value;
        let fecha = document.getElementById("sesionFecha").value;
        let tratamiento = document.getElementById("sesionTratamiento").value;
        let ejercicios = document.getElementById("sesionEjercicios").value;
        let observaciones = document.getElementById("sesionObservaciones").value;
        let evolucion = document.getElementById("sesionEvolucion").value;
        let proximos = document.getElementById("sesionProximos").value;
        
        if (paciente === "" || fecha === "") {
            alert("Por favor llena los campos obligatorios (Paciente y Fecha)");
            return;
        }
    
    let sesion = {
        paciente: paciente,
        fecha:  fecha,
        tratamiento: tratamiento,
        ejercicios : ejercicios,
        observaciones: observaciones,
        evolucion: evolucion,
        proximos: proximos
    };

    sesiones.push(sesion);
    guardarEnLocalStorage();
    mostrarSesiones();

    document.getElementById("sesionPaciente").value = "";
    document.getElementById("sesionFecha").value = "";
    document.getElementById("sesionTratamiento").value = "";
    document.getElementById("sesionEjercicios").value = "";
    document.getElementById("sesionObservaciones").value = "";
    document.getElementById("sesionEvolucion").value = "";
    document.getElementById("sesionProximos").value = "";

    alert("Sesion registrada exitosamente");
    }

    function mostrarSesiones(){
        let tbody = document.getElementById("listaSesiones");
        tbody.innerHTML = "";

        for (let i= 0; i< sesiones.length; i++){
            let tratamientoCorto = sesiones[i].tratamiento.substring(0,50) + "....";
            let fila = "<tr>" +
                "<td>" + sesiones[i].paciente + "</td>" +
                "<td>" + sesiones[i].fecha + "</td>" +
                "<td>" + tratamientoCorto + "</td>" +
                "<td><button onclick= 'verDetalleSesion(" + i + ")'>ver</button></td>" +
                "</tr>";
            tbody.innerHTML += fila;

        }

    }

    function verDetalleSesion(index){
        let sesion = sesiones[index];
        let mensaje = "SESION COMPLETA:\n\n" +
            "Paciente: " + sesion.paciente + "\n\n" +
            "Fecha:" + sesion.fecha + "\n\n" +
            "Tratamiento: " + sesion.tratamiento + "\n\n" +
            "Ejercicios:" + sesion.ejercicios + "\n\n" +
            "Observaciones:" + sesion.observaciones + "\n\n" +
            "Evolucion:" + sesion.evolucion + "\n\n" +
            "Proximos pasos :" + sesion.proximos;

        alert(mensaje);


        
    }












































