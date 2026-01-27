//arrays para guardar pacientes//
let pacientes = [];
let citas = [];
let sesiones =[];
let semanaOffset = 0;


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
// EDITAR PACIENTES //
    function editarPaciente(index){
        let paciente = pacientes[index];
        let nuevoNombre = prompt("Editar nombre del paciente:", paciente.nombre);
        if (nuevoNombre === null) return; // usuario cancelo
        let nuevoTelefono = prompt("Editar telefono del paciente:", paciente.telefono);
        if (nuevoTelefono === null) return; // usuario cancelo
        let nuevaDireccion = prompt("Editar direccion del paciente:", paciente.direccio || "");
        if (nuevaDireccion === null) return; // usuario cancelo
        let nuevaFechaNac = prompt("Editar fecha de nacimiento del paciente (YYYY-MM-DD):", paciente.fechaNac || "");
        if (nuevaFechaNac === null) return; // usuario cancelo

        if (nuevoNombre === "" || nuevoTelefono === ""){
            alert("Por favor llene todos los campos");
            return;
        }

        pacientes[index].nombre = nuevoNombre;
        pacientes[index].telefono = nuevoTelefono;
        pacientes[index].direccion = nuevaDireccion;
        pacientes[index].fechaNac = nuevaFechaNac;
        guardarEnLocalStorage();
        mostrarPacientes();
        alert("Paciente editado exitosamente");
    }

        //ELIMINAR PACIENTES//
    function eliminarPaciente (index){
        let paciente = pacientes[index];
    let confirmacion = confirm("¿Estas seguro de eliminar este paciente?"+paciente.nombre+"?");

            if (!confirmacion) return;
            pacientes.splice (index, 1);
            guardarEnLocalStorage();
            mostrarPacientes();
            alert("Paciente eliminado exitosamente");
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
    cerrarTodosLosModales();
    document.getElementById("seccionPacientes").classList.add("active");
    document.getElementById("modalOverlay").classList.remove("active");
}

function irACitas(){
    cerrarTodosLosModales();
    document.getElementById("seccionCitas").classList.add("active");
    document.getElementById("modalOverlay").classList.add("active");
    cargarSelectorPacientes();

}

function irASesiones(){
    cerrarTodosLosModales();
    document.getElementById("seccionSesiones").classList.add("active");
    document.getElementById("modalOverlay").classList.add("active");
    cargarSelectorPacientesSesion();

}  

function cerrarFormulario(){
    document.getElementById("seccionPacientes").style.display = "none";
}

function cerrarCitas(){
  cerrarModal("seccionCitas");
}

function cerrarSesiones(){
    cerrarModal("seccionSesiones");

}

function irAAsistencias(){
    cerrarTodosLosModales();
    document.getElementById("seccionAsistencias").classList.add("active");
    document.getElementById("modalOverlay").classList.add("active");

function cerrarAsistencias(){
    cerrarModal("seccionAsistencias");
}}
  
//          ===== pacientes ======  aqui me quede 12/30   //


function guardarPaciente(){

    let nombre = document.getElementById("nombrePaciente").value;
    let telefono = document.getElementById("telefonoPaciente").value;
    let direccion = document.getElementById("direccionPaciente").value;
        let fechaNac = document.getElementById("nacimientoPaciente").value;
    if (nombre === ""|| telefono === "") {
        alert("por favor llene todos los campos");
        return;
}

let paciente = {
    nombre : nombre,
    telefono : telefono,
    direccion : direccion,
    fechaNac : fechaNac


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

    for (let i=0; i< pacientes.length; i++){    
        let fila = "<tr>" +
            "<td>" + pacientes[i].nombre + "</td>" +
            "<td>" + pacientes[i].telefono + "</td>" +
            "<td>" + (pacientes[i].direccion || "-") + "</td>" +
            "<td>" + (pacientes[i].fechaNac || "-") + "</td>" +
            "<td>" +
            "<button onclick='editarPaciente(" + i + ")' style='background:#ffc107; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;margin-right:5px;'>Editar</button>" +
            "<button onclick='eliminarPaciente(" + i + ")' style='background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;'>Eliminar</button>" +
        "</td>" +
            "</tr>";
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
//MOSTRAR CITAS TIPO AGENDA
function mostrarCitas(){
    mostrarCalendarioSemanal();
    mostrarTablaCitas();
}

function mostrarTablaCitas(){
    let tbody = document.getElementById("listaCitas");
    tbody.innerHTML = "";

    for (let i=0; i< citas.length; i++){

        let fila = "<tr>" +
            "<td>" + citas[i].paciente + "</td>" +
            "<td>" + citas[i].fecha + "</td>" +
            "<td>" + citas[i].hora + "</td>" +
            "<td>" + citas[i].tipo + "</td>" +
            "<td><button onclick='editarCita(" + i + ")' style='background:#ffc107; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;margin-right:5px;'>Editar</button>" +
            "<button onclick='eliminarCita(" + i + ")' style='background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;'>Eliminar</button>"+
            "</td>"+ 
            "</tr>";
        tbody.innerHTML += fila;
    }
    }

//EDITAR CITAS//
function editarCita(index){
    let cita = citas[index];
    let nuevaFecha = prompt("Editar fecha: (YYYY-MM-DD)" , cita.fecha);
    if (nuevaFecha === null) return; // usuario cancelo
    let nuevaHora = prompt("Editar hora (HH:MM):", cita.hora);
    if (nuevaHora === null) return; // usuario cancelo
    let nuevoTipo = prompt("Editar tipo de cita:", cita.tipo);
    if (nuevoTipo === null) return; // usuario cancelo
    if (nuevaFecha === "" || nuevaHora === ""){
        alert("Fecha y hora son obligatorios");
        return;
    }
    citas[index].fecha = nuevaFecha;
    citas[index].hora = nuevaHora;
    citas[index].tipo = nuevoTipo;
    guardarEnLocalStorage();
    mostrarCitas();
    alert("Cita editada exitosamente");
}

//ELIMINAR CITAS//
function eliminarCita(index){
    let cita = citas[index];
    let confirmacion = confirm("¿Estas seguro de eliminar la cita de " + cita.paciente + " del " + cita.fecha + "?");
    if (!confirmacion) return;
    citas.splice(index, 1);
    guardarEnLocalStorage();
    mostrarCitas();
    alert("Cita eliminada exitosamente");
}

function mostrarCalendarioSemanal(){
    let contenedor = document.getElementById("calendarioSemanal");

    let hoy = new Date();
    let diaSemana = hoy.getDay(); // 0 DOMINGO, 1 LUNES, ETC
    let inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - diaSemana + 1 + semanaOffset * 7); //lunes

    //Genera html calendario
    let html = '<div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px rgba(0,0,0,0.1);">';

    //titulo y botones de  navegacion//
    html += '<div style=display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">';
    html += '<button onclick="cambiarSemana(-1)" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;"> Semana Anterior</button>';
    html += '<h3 style="margin: 0;">Semana del ' + formatearFecha(inicioSemana)+ '</h3>';
    html += '<button onclick="cambiarSemana(1)" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;"> Semana Siguiente </button>';
    html += '</div>';

    //tabla de calendario
    html += '<table style="width: 100%; border-collapse: collapse; text-align: center;">';
    html += '<thead><tr style="background: #ecf0f1; color: #000;">';
    html += '<th style="padding: 10px; border: 1px solid #ddd; width: 80px; color: #000;">HORA</th>';

    // encabezados de dias//
    let diasSemana = ['LUN','MAR','MIE','JUE','VIE', 'SAB', 'DOM'];
   
    for(let i=0; i<7; i++){
        let fecha = new Date(inicioSemana);
        fecha.setDate(inicioSemana.getDate() + i);
        let dia = fecha.getDate();
        html +=  '<th style="padding: 10px; border: 1px solid #ddd; color: #000;">' + diasSemana[i] + '<br>' + dia + '</th>';
    }
    html += '</tr></thead><tbody>';

    // horarios (8 a 8 pm)
    for (let hora=8; hora<=20; hora++){
        html += '<tr>';
        html += '<td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; background: #f8f9fa;">' +
        (hora < 10 ? '0' + hora : hora) + ':00</td>';

        //para cada dia de la semana//

    for (let dia=0; dia<7; dia++){
        let fechaDia = new Date(inicioSemana);
        fechaDia.setDate(inicioSemana.getDate() + dia);
        let fechaStr = fechaDia.getFullYear() + '-' +
            String(fechaDia.getMonth() + 1).padStart(2, '0') + '-' +
            String(fechaDia.getDate()).padStart(2, '0');

        // Buscar citas en este dia y hora
        let citasEnHora = citas.filter(function(cita){
            if(cita.fecha !== fechaStr) return false;   
            let horaCita= parseInt(cita.hora.split(':')[0]);
            return horaCita === hora;
        
        });


        if(citasEnHora.length > 0){
            let cita = citasEnHora[0];
            let colorFondo = '#e3f2fd';
            let emoji = '📅';
            if(cita.asistencia === 'asistio') {
                colorFondo = '#d4edda';
                emoji = '✅';
            } else if(cita.asistencia === 'no_asistio') {
                colorFondo = '#f8d7da';
                emoji = '❌' ;

            }
            html += '<td style="padding: 10px; border: 1px solid #ddd; background:' + colorFondo + ';">';
            html += '<strong>' + emoji + ' ' + cita.paciente + '</strong><br>';
            html += '<small>' + cita.tipo + '</small>';
            html += '</td>';
        } else{
            html += '<td style="padding: 10px; border: 1px solid #ddd; background: white;">-</td>';
        }
     }
        html += '</tr>';

         
    }

    html += '</tbody></table></div>';

     
    function cambiarSemana(direccion){
        semanaOffset += direccion;
        mostrarCalendarioSemanal();

    }

    contenedor.innerHTML = html;
}
        //CORREGIDO HASTA AQUI TODO LO DE ARRIBA
    

    function formatearFecha(fecha){
        let meses = ['Ene', 'Feb', 'Mar', 'Abr','May','Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return fecha.getDate() + ' ' + meses[fecha.getMonth()] + ' ' + fecha.getFullYear();

}

    function cambiarSemana(direccion){
        semanaOffset += direccion;
        mostrarCalendarioSemanal();

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
        cerrarTodosLosModales();
        document.getElementById("seccionReportes").classList.add("active");
        document.getElementById("modalOverlay").classList.add("active");
        cargarSelectorPacientesReporte();
    }

    function cerrarReportes(){
        cerrarModal("seccionReportes");

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
        mostrarCitasControl();
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
    let hoy = new Date();
    let year = hoy.getFullYear();
    let month = String(hoy.getMonth() + 1).padStart(2, '0');
    let day = String(hoy.getDate()).padStart(2, '0');
    let fechaHoy = year + '-' + month  + '-'+ day;
    
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
    function generarReporteInasistencias(){
    let fechaInicio = document.getElementById("inasistenciaFechaInicio").value;
    let fechaFin = document.getElementById("inasistenciaFechaFin").value;

    if (!fechaInicio || !fechaFin) {
        alert("Por favor selecciona las fechas");
        return;
    }

    let inasistencias = citas.filter(function(cita){
        return cita.asistencia === "no_asistio" &&
        cita.fecha >= fechaInicio &&
        cita.fecha <= fechaFin;
    });

    mostrarResultadoInasistencias(inasistencias, fechaInicio, fechaFin);

}

function mostrarResultadoInasistencias(inasistencias, fechaInicio, fechaFin){
    let div = document.getElementById("resultadoInasistencias");

    if (inasistencias.length === 0) {
        div.innerHTML = '<div style="background: #d4edda; padding: 20px; border-radius: 10px, color: #155724;">' +
            '<h3>No hay inasistencias registradas</h3>' +
            '<p> Todos los pacientes asistieron a sus citas en este periodo.</p>' +
            '</div>';
        return
    }

    let html = '<div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0  4px 15px  rgba(0, 0, 0, 0.1);">';
    html += '<h3 style="color: #dc3545;"> REPORTE DE INASISTENCIAS</h3>';
    html += '<p><strong>Periodo:</strong> ' + fechaInicio + ' al ' + fechaFin + '</p>';
    html += '<hr style="margin: 20px 0;">';

    html += '<table style="width: 100%; border-collapse: collapse; ">';
    html += '<thead><tr "style=background: #f8d7da;">' +
            '<th style="padding: 10px; border: 1px solid #ddd;">Paciente</th>' +
            '<th style="padding: 10px; border: 1px solid #ddd;">Fecha</th>' +
            '<th style="padding: 10px; border: 1px solid #ddd;">Hora</th>' +
            '<th style="padding: 10px; border: 1px solid #ddd;">Tipo de Cita</th>' +
            '<th style="padding: 10px; border: 1px solid #ddd;">Motivo</th>' +
            '</tr></thead>';
    html += '<tbody>';

    for (let i = 0; i < inasistencias.length; i++) {
        let cita = inasistencias[i];
        html += '<tr>';
        html += '<td style="padding: 10px; border: 1px; solid #ddd;">' + cita.paciente + '</td>';
        html += '<td style="padding: 10px; border: 1px; solid #ddd;">' + cita.fecha + '</td>';
        html += '<td style="padding: 10px; border: 1px; solid #ddd;">' + cita.hora + '</td>';
        html += '<td style="padding: 10px; border: 1px; solid #ddd;">' + cita.tipo + '</td>';
        html += '<td style="padding: 10px; border: 1px; solid #ddd;">' + cita.motivoInasistencia + '</td>';
        html += '</tr>';

        
    }
    html += '</tbody></table>';
    html += '<hr style="margin: 20px 0;">';
    html += '<div style="background: #f8d7da; padding: 20px; border-radius: 8px; border: 2px; solid #dc3545;">';
    html += '<h3 style="color: #721c24; margin: 0;"> TOTAL DE INASISTENCIAS: ' + inasistencias.length + '</h3>';
    html += '<p style="margin: 10px 0 0 0; color: #721c24;"> Pacientes a reportar al sistema de salud</p>';
    html += '</div>';
    html += '</div>';

    div.innerHTML = html;

}
function cerrarModal(idModal){
    document.getElementById(idModal).classList.remove("active");
    document.getElementById("modalOverlay").classList.remove("active");
}
function cerrarTodosLosModales(){
    let modales = document.querySelectorAll(".modal-container");
    for (let i=0; i< modales.length; i++){
        modales[i].classList.remove("active");
}   
    document.getElementById("modalOverlay").classList.remove("active");

}
















































