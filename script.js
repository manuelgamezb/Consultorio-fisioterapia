//arrays para guardar pacientes//
let pacientes = [];
let citas = [];
let sesiones =[];

//cargar pacientes al iniciar la pagina//
window.onload = function(){
    cargarPacientes();
    cargarCitas();
    cargarSesiones();

    let quincenal= document.getElementById("quincenal");
    let mensual = document.getElementById("mensual");
    let divQuincena = document.getElementById("divQuincena");

    if (quincenal && mensual && divQuincena) {
        quincenal.addEventListener("change", function(){
            divQuincena.style.display = "block";

        });

        mensual.addEventListener("change", function() {
            divQuincena.style.display = "none";
        });
    }


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
    document.getElementById("seccionReportes").style.display = "none";
    document.getElementById("seccionAsistencias").style.display = "none";



}

function irACitas(){

    document.getElementById("seccionCitas").style.display = "block";
    document.getElementById("seccionPacientes").style.display = "none";
    document.getElementById("seccionSesiones").style.display = "none";
    document.getElementById("seccionReportes").style.display = "none";
    document.getElementById("seccionAsistencias").style.display = "none";
    cargarSelectorPacientes();

}

function irASesiones(){
    document.getElementById("seccionSesiones").style.display ="block";
    document.getElementById("seccionPacientes").style.display ="none";
    document.getElementById("seccionCitas").style.display = "none";
    document.getElementById("seccionReportes").style.display = "none";
    document.getElementById("seccionAsistencias").style.display = "none";
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

function irAAsistencias(){
    document.getElementById("seccionAsistencias").style.display = "block";
    document.getElementById("seccionPacientes").style.display = "none";
    document.getElementById("seccionCitas").style.display = "none";
    document.getElementById("seccionSesiones").style.display = "none";
    document.getElementById("seccionReportes").style.display = "none";
}
function cerrarAsistencias(){
    document.getElementById("seccionAsistencia").style.display = "none";
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
        estado: "programada",
        asistencia: null,
        motivoInasistencia: ""
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
        console.log("Fecha capturada:", fecha);
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

    // reportes//

    function irAReportes(){
        document.getElementById("seccionReportes").style.display = "block";
        document.getElementById("seccionPacientes").style.display = "none";
        document.getElementById("seccionCitas").style.display = "none";
        document.getElementById("seccionSesiones").style.display= "none";
        document.getElementById("seccionAsistencia").style.display= "none";
        cargarSelectorPacientesReporte();
    }

    function cerrarReportes(){
        document.getElementById("seccionReportes").style.display = "none";

    }
    function cargarSelectorPacientesReporte(){
        let select = document.getElementById("reportePaciente");
        select.innerHTML = '<option value="">Todos los Pacientes</option>';

        for (let i=0; i < pacientes.length; i++) {
            select.innerHTML +='<option value="' + pacientes[i].nombre + '">' + pacientes[i].nombre +'</option>';

        }
    }
    function generarReporte(){
        let pacienteSeleccionado = document.getElementById("reportePaciente").value;
        let mes = parseInt(document.getElementById("reporteMes").value); // 1-12
        let anio = parseInt(document.getElementById("reporteAnio").value);
        let periodo = document.querySelector("input[name='periodo']:checked").value;

        let mesJS = mes -1;
        //filtrar sesiones//
        let sesionesFiltradas = [];

        for (let i=0; i< sesiones.length; i++) {
            let sesion = sesiones[i];
            let fechaSesion = new Date(sesion.fecha);

            //verificar si coincide el mes y el anio//

            if (fechaSesion.getMonth() === mesJS && fechaSesion.getFullYear() == anio){
                // si hay  un paciente seleccionado, filtrar por ese paciente//
                if (pacienteSeleccionado === "" || sesion.paciente === pacienteSeleccionado){
                    // filtrar por quincena
                if (periodo === "quincenal"){
                    let dia = fechaSesion.getDate();
                    let quincena = document.getElementById("reporteQuincena").value;

                if (quincena === "primera" && dia <= 15){
                    sesionesFiltradas.push(sesion);
                } else if (quincena === "segunda" && dia > 15){
                    sesionesFiltradas.push(sesion);
                }
                } else {
                    sesionesFiltradas.push(sesion);
                }   
            }          
        }
    }
                
          mostrarResultadoReporte(sesionesFiltradas, pacienteSeleccionado, mes, anio);
}
        function mostrarResultadoReporte(sesiones, paciente, mes, anio) {
        let div = document.getElementById("resultadoReporte");


        if (sesiones.length === 0) {
            div.innerHTML = '<div style= "background: #fff3cd; padding: 20px; border-radius: 10px; color: #856404;">' +
            '<h3> No se encontraron sesiones</h3>' +
            '<p>No hay sesiones registradas para los criterios seleccionados.</p>'+
            '</div>';
            return;
        }
        let nombresMeses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        let html = '<div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">';
        html += '<h3 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px;"> REPORTE DE ASISTENCIAS </h3>';

        if (paciente !== ""){
            html += '<p><strong>Paciente:</strong>' + paciente + '</p>';
        } else {
            html += '<p><strong>Todos los pacientes</strong></p>';

        }
        html += '<p><strong>Periodo:</strong>' + nombresMeses[mes -1] +'' + anio + '</p>';
        html += '<hr style="margin: 20px 0;">';
        html += '<h4 style="color: #27ae60;"> SESIONES REALIZADAS:</h4>';
        html += '<table style="width: 100%; margin-top: 15px;">';
        html += '<thead><tr style="background: #ecf0f1;"><th style="padding: 10px; text-align: left;">Fecha</th><th style="padding: 10px; text-align: left;">Paciente</th><th style="padding: 10px; text-align: left;">Tratamiento</th></tr></thead>';
        html += '<tbody>';

    for (let i=0; i<sesiones.length; i++){
        let s= sesiones[i];
        let tratamientoCorto = s.tratamiento.substring(0,50) + "...";
        html += '<tr style="border-bottom: 1px solid #ecf0f1;">';
        html += '<td style="padding: 10px;">' + s.fecha + '</td>';
        html += '<td style="padding: 10px;">' + s.paciente + '</td>';
        html += '<td style="padding: 10px;">' + tratamientoCorto + '</td>';
        html += '</tr>';

    }
    html += '</tbody></table>';
    html += '<hr style="margin: 20px 0; ">';
    html += '<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin-top: 20px;">';
    html += '<h3 style="color: #155724; margin: 0;"> TOTAL DE SESIONES:' + sesiones.length + '</h3>';
    html += '<p style="margin: 10px 0 0 0 ; color: #155724;"> Sesiones a facturar para este periodo</p>';
    html += '</div>';
    html += '</div>';

    div.innerHTML = html;
    }
    function marcarAsistencia(index, asistio){
        if(asistio){
            citas[index].asistencia = "asistio";
            citas[index].motivoInasistencia = "";

        } else {
            citas[index].asistencia = "no_asistio";
        }
        guardarEnLocalStorage();
        mostrarCitas();
        alert(asistio ? "Asistencia registrada" : "Inasistencia registrada");
        
    }
    function registrarMotivo(index){
        let motivo = prompt(
            "Seleccione el motivo de inasistencia: \n\n" +
            "1. Cancelo con aviso\n" +
            "2. No aviso (falta)\n" +
            "3. Emergencia medica\n" +
            "4. Problema de transporte\n" +
            "5. Otro\n\n" +
            "Ingrese el numero (1-5):"
        );

        if  (motivo === null) return; //usuario cancelo

        let motivoTexto = "";
        switch(motivo){
            case "1":
                motivoTexto = "Cancelo con Aviso";
                break;
             case "2":
                motivoTexto = "No aviso (falta)";
                break;
             case "3":
                motivoTexto = "Emergencia medica";
                break;
             case "4":
                motivoTexto = "Problema de transporte";
                break;
             case "5":
               let otro = prompt("Especifique el motivo:");
               if (otro) {
                    motivoTexto = "Otro:" + otro;

               } else {
                   return;
               }
        
        break;
     default:
        alert("Opcion invalida");
        return;
    }
    citas [index].motivoInasistencia = motivoTexto;
    marcarAsistencia(index, false);
}
function mostrarCitasControl(){
    let fechaHoy = new Date().toISOString().split('T')[0];
    let tbody = document.getElementById("listaControlAsistencias");
    tbody.innerHTML = "";

    let citasHoy = citas.filter(function(cita) {
        return cita.fecha === fechaHoy;

    });

    if (citasHoy.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay citas programadas para hoy</td></tr>';
        return;
    }
    for (let i = 0; i<citasHoy.length; i++){
        let cita = citasHoy[i];
        let indexOriginal = citas.indexOf(cita);

        let estadoHTML = "";
        if (cita.asistencia === null){
            estadoHTML = '<button onclick= "marcarAsistencia(' + indexOriginal + ', true)"> Asistio</button>' +
                        '<button onclick= "registrarMotivo(' + indexOriginal + ')"> No Asistio</button>';

        }   else if (cita.asistencia === "asistio") {
            estadoHTML = '<span style= "color: green;"> ASISITIO</span>';

        } else {
           estadoHTML=  '<span style= "color: red;">NO ASISITIO</span><br><small>' + cita.motivoInasistencia + '</small>';

        }

        let fila = "<tr>" +
            "<td>" + cita.paciente + "</td>" +
            "<td>" + cita.fecha + "</td>" +
            "<td>" + cita.hora + "</td>" +
            "<td>" + cita.tipo + "</td>" +
            "<td>" + estadoHTML + "</td>" +
            "</tr>";

            tbody.innerHTML += fila;

            }
}
function generarReporteInasistencia(){
    let fechInicio = document.getElementById("inasistenciaFechaInicio").value;
    let fechaFin = document.getElementById("inasistenciaFechaFin").value;

    if (!fechInicio || !fechaFin) {
        alert("Por favor selecciona las fechas");
        return;
    }

    let inasistencias = citas.filter(function(cita){
        return cita.asistencia === "no_asistio" &&
        cita.fecha >= fechInicio &&
        cita.fecha <= fechaFin;
    });

    mostrarResultadoInasistencias(inasistencias, fechInicio, fechaFin);

}

function mostrarResultadoInasistencias(inasistencias, fechaInicio, fechaFin,){
    let div = document.getElementById("resultadoInasistencias");

    if (inasistencias.length === 0) {
        div.innerHTML = '<div style="background: #d4edda; padding: 20px, border-radius: 10px, color: #155724;">' +
            '<h3>No hay inasistencias registradas</h3>' +
            '<p> Todos los pacientes asistieron a sus citas en este periodo.</p>' +
            '</div>';
        return
    }

    
}
    















































