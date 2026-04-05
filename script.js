
//====== AUTENTICACION ======//
function iniciarSesion(){
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    // Simulación de autenticación (reemplazar con lógica real)
    if (email === "" || password === "") {
        document.getElementById('loginError').style.display = "block";
        document.getElementById('loginError').textContent = "Por favor llene todos los campos";
        return;
}
    Auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            document.getElementById('pantallaLogin').style.display = 'none';
            
        })
        .catch(function(error) {
            document.getElementById('loginError').style.display = 'block';
            document.getElementById('loginError').textContent = "Correo o contraseña incorrectos";
        });
}

function cerrarSesion(){
    Auth.signOut().then(function() {
        document.getElementById('pantallaLogin').style.display = 'flex';
        cerrarTodosLosModales();
    });

}

// verifica si ya hay sesion activa al cdargar la pagina
Auth.onAuthStateChanged(function(user) {
    if (user) { // Usuario autenticado
        document.getElementById('pantallaLogin').style.display = 'none';
    } else { // No hay usuario autenticado
        document.getElementById('pantallaLogin').style.display = 'flex';
    }
});



//arrays para guardar pacientes//
let pacientes = [];
let citas = [];
let sesiones =[];
let semanaOffset = 0;
let idioma = "es";

let traducciones = {
    es: {
        tituloPagina: "Sistema de Gestion - Consultorio de Fisioterapia",
        btnIdioma: "English",
        menuTitulo1: "Pacientes", menuDesc1: "Gestiona la informacion de tus pacientes", menuBtn1:"Ir a Pacientes",
        menuTitulo2: "Citas", menuDesc2: "Agenda y controla las citas", menuBtn2:"Ir a Citas",
        menuTitulo3: "Sesiones", menuDesc3: "Registra las sesiones del tratamiento", menuBtn3:"Ir a Sesiones",
        menuTitulo4: "Reportes", menuDesc4: "Consulta reportes de asistencias", menuBtn4:"Ir a Reportes",
        menuTitulo5: "Asistencias", menuDesc5: "Control de Asistencias e Inasistencias", menuBtn5:"Ir a Asistencias",
        btnGuardar: "Guardar", btnCancelar: "Cancelar", btnEditar: "Editar", btnEliminar: "Eliminar",
        btnAgendar:"Agendar", btnGuardarSesion:"Guardar Sesion",
        msgPacienteGuardado: "Paciente guardado exitosamente",
        msgCitaAgendada: "Cita agendada exitosamente",
        msgSesionGuardada: "Sesion registrada exitosamente",
        msgLlenarCampos: "Por favor llene todos los campos",
        diaSemana: ['LUN','MAR','MIE','JUE','VIE'],
        meses:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        CalAnterior: "Anterior", CalSiguiente: "Siguiente", CalSemana: "Semana del",

        formPacienteTitulo: "Registrar nuevo paciente",
        labelNombre:"Nombre:",
        labelTelefono: "Telefono:",
        labelDireccion: "Direccion:",
        labelFechaNac: "Fecha de nacimiento:",
        btnGuardarPaciente: "Guardar",
        btnCancelarPaciente: "Cancelar",
        tituloPacientesRegistrados: "Pacientes registrados",
        thNombre: "Nombre", thTelefono: "Telefono", thDireccion: "Direccion", thFechaNac: "Fecha de nacimiento", thAcciones: "Acciones",

         formCitasTitulo: "Agendar Nueva Cita",
         labelCitaPaciente: "Paciente:",
        labelCitaFecha: "Fecha:",
        labelCitaHora: "Hora:",
        labelCitaTipo: "Tipo de Cita:",
        labelCitaNotas: "Notas:",
        labelAgendarCita: "Agendar",
        btnCancelarCita: "Cancelar",
        tituloCalendario: "Calendario de Citas:",
        tituloListaCitas: "Lista de Citas",
        thCitaPaciente: "Paciente", thCitaFecha: "Fecha", thCitaHora: "Hora", thCitaTipo: "Tipo", thCitaAcciones: "Acciones",

        formSesionesTitulo: "Gestion de Sesiones",
        labelSesionPaciente: "Paciente:",
        labelSesionFecha: "Fecha:",
        labelSesionTratamiento: "Tratamiento aplicado:",
        labelSesionEjercicios: "Ejercicios realizados:",
        labelSesionObservaciones: "Observaciones:",
        labelSesionEvolucion: "Evolucion del paciente:",
        labelSesionProximos: "Proximos pasos:",
        btnGuardarSesion: "GuardarSesion",
        btnCancelarSesion: "Cancelar",
        tituloSesionesRegistradas: "Sesiones Registradas",
        thSesionTratamiento:"Tratamiento", thSesionDetalles: "Ver Detalles", thSesionExpediente: "Expediente",

        //reportes//
        formReportesTitulo: "Reporte de Asistencias",
        labelReportePaciente: "Seleccionar Paciente: ",
        labelReportePeriodo: "Periodo: ",
        labelQuincenal: "Quincenal",
        labelMensual: "Mensual",
        labelReporteQuincena: "Quincena: ",
        labelReporteMes: "Mes:",
        labelReporteAnio: "Anio: ",
        btnGenerarReporte: "Generar Reporte",
        btnCerrarReportes: "Cerrar",

        //asistencias

        formAsistenciasTitulo: "Control de Asistencias del Dia",
        btnCargarCitas: "Cargar Citas de Hoy",
        btnCerrarAsistencias: "Cerrar",
        tituloCitasHoy: "Citas de Hoy",
        thAsistenciaPaciente: "Paciente", thAsistenciaFecha: "Fecha",
        thAsistenciaHora: "Hora", thAsistenciaTipo: "Tipo", thAsistenciaAcciones: "Acciones",
        tituloReporteInasistencias: "Reporte de Inasistencias",
        labelFechaInicio: "Desde",
        labelFechaFin: "Hasta:",
        btnGenerarInasistencias: "Generar Reporte de Inasistencias"

         },
    en: {
        tituloPagina: "Management System - Physiotherapy Clinic",
        btnIdioma: "Español",
        menuTitulo1: "Patients", menuDesc1: "Manage your patients' information", menuBtn1:"Go to Patients",
        menuTitulo2: "Appointments", menuDesc2: "Schedule and manage appointments", menuBtn2:"Go to Appointments",
        menuTitulo3: "Sessions", menuDesc3: "Record treatment sessions", menuBtn3:"Go to Sessions",
        menuTitulo4: "Reports", menuDesc4: "View attendance reports", menuBtn4:"Go to Reports",
        menuTitulo5: "Attendance", menuDesc5: "Manage attendance and absences", menuBtn5:"Go to Attendance",
        btnGuardar: "Save", btnCancelar: "Cancel", btnEditar: "Edit", btnEliminar: "Delete",
        btnAgendar:"Schedule", btnGuardarSesion:"Save Session",
        msgPacienteGuardado: "Patient saved successfully",
        msgCitaAgendada: "Appointment scheduled successfully",
        msgSesionGuardada: "Session recorded successfully",
        msgLlenarCampos: "Please fill in all fields",
        diaSemana: ['MON','TUE','WED','THU','FRI'],
        meses:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        CalAnterior: "Previous", CalSiguiente: "Next", CalSemana: "Week of",
        formPacienteTitulo: "Register New Patient",
        labelNombre:"Name:",
        labelTelefono: "Phone:",
        labelDireccion: "Address:",
        labelFechaNac: "Date of Birth:",
        btnGuardarPaciente: "Save",
        btnCancelarPaciente: "Cancel",
        tituloPacientesRegistrados: "Registered Patients",
        thNombre: "Name", thTelefono: "Phone", thDireccion: "Address", thFechaNac: "Date of Birth", thAcciones: "Actions",

        formCitasTitulo: "Schedule New Appointment",
        labelCitaPaciente: "Patient:",
        labelCitaFecha: "Date:",
        labelCitaHora: "Time:",
        labelCitaTipo: "Appointment Type:",
        labelCitaNotas: "Notes:",
        labelAgendarCita: "Schedule",
        btnCancelarCita: "Cancel",
        tituloCalendario: "Appointment Calendar:",
        tituloListaCitas: "List of Appointments",
        thCitaPaciente: "Patient", thCitaFecha: "Date", thCitaHora: "Time", thCitaTipo: "Type", thCitaAcciones: "Actions",

        formSesionesTitulo: "Session Management",
        labelSesionPaciente: "Patient:",
        labelSesionFecha: "Date:",
        labelSesionTratamiento: "Applied Treatment:",
        labelSesionEjercicios: "Performed Exercises:",
        labelSesionObservaciones: "Observations:",
        labelSesionEvolucion: "Patient Progress:",
        labelSesionProximos: "Next Steps:",
        btnGuardarSesion: "Save Session",
        btnCancelarSesion: "Cancel",
        tituloSesionesRegistradas: "Registered Sessions",
        thSesionPaciente: "Patients", thSesionFecha: "Date", thSesionDetalles: "View Details", thSesionExpediente: "Record",thSesionTratamiento: "Treatment",

        //reportes//
        formReportesTitulo: "Attendance Report",
        labelReportePaciente: "Select Patient: ",
        labelReportePeriodo: "Period: ",
        labelQuincenal: "Biweekly",
        labelMensual: "Monthly",
        labelReporteQuincena: "Biweek: ",
        labelReporteMes: "Month:",
        labelReporteAnio: "Year: ",
        btnGenerarReporte: "Generate Report",
        btnCerrarReportes: "Close",

        formAsistenciasTitulo: "Daily Attendance Control",
        btnCargarCitas: "Load Today's Appointments",
        btnCerrarAsistencias: "Close",
        tituloCitasHoy: "Today's Appointments",
        thAsistenciaPaciente: "Patient", thAsistenciaFecha: "Date",
        thAsistenciaHora: "Time", thAsistenciaTipo: "Type", thAsistenciaAcciones: "Actions",
        tituloReporteInasistencias: "Absence Report",
        labelFechaInicio: "From",
        labelFechaFin: "To:",
        btnGenerarInasistencias: "Generate Absence Report"

    }
};

function cambiarIdioma() {
    idioma = (idioma === "es") ? "en" : "es";
    let tr = traducciones[idioma];
    document.getElementById("tituloSistema").textContent = tr.tituloPagina;
    document.getElementById("btnIdioma").textContent = tr.btnIdioma;

    document.getElementById("menuTitulo1").textContent = tr.menuTitulo1;
    document.getElementById("menuDesc1").textContent = tr.menuDesc1;
    document.getElementById("menuBtn1").textContent = tr.menuBtn1;

    document.getElementById("menuTitulo2").textContent = tr.menuTitulo2;
    document.getElementById("menuDesc2").textContent = tr.menuDesc2;
    document.getElementById("menuBtn2").textContent = tr.menuBtn2;

    document.getElementById("menuTitulo3").textContent = tr.menuTitulo3;
    document.getElementById("menuDesc3").textContent = tr.menuDesc3;
    document.getElementById("menuBtn3").textContent = tr.menuBtn3;

    document.getElementById("menuTitulo4").textContent = tr.menuTitulo4;
    document.getElementById("menuDesc4").textContent = tr.menuDesc4;
    document.getElementById("menuBtn4").textContent = tr.menuBtn4;

    document.getElementById("menuTitulo5").textContent = tr.menuTitulo5;
    document.getElementById("menuDesc5").textContent = tr.menuDesc5;
    document.getElementById("menuBtn5").textContent = tr.menuBtn5;

    mostrarPacientes();
    mostrarTablaCitas();
    mostrarSesiones();
    mostrarCalendarioSemanal();

    document.getElementById("formPacienteTitulo").textContent = tr.formPacienteTitulo;
    document.getElementById("labelNombre").textContent = tr.labelNombre;
    document.getElementById("labelTelefono").textContent = tr.labelTelefono;
    document.getElementById("labelDireccion").textContent = tr.labelDireccion;  
    document.getElementById("labelFechaNac").textContent = tr.labelFechaNac;
    document.getElementById("btnGuardarPaciente").textContent = tr.btnGuardarPaciente;
    document.getElementById("btnCancelarPaciente").textContent = tr.btnCancelarPaciente;
    document.getElementById("tituloPacientesRegistrados").textContent = tr.tituloPacientesRegistrados;
    document.getElementById("thNombre").textContent = tr.thNombre;
    document.getElementById("thTelefono").textContent = tr.thTelefono;
    document.getElementById("thDireccion").textContent = tr.thDireccion;
    document.getElementById("thFechaNac").textContent = tr.thFechaNac;
    document.getElementById("thAcciones").textContent = tr.thAcciones;

    //citas//

    document.getElementById("formCitasTitulo").textContent = tr.formCitasTitulo;
    document.getElementById("labelCitaPaciente").textContent= tr.labelCitaPaciente;
    document.getElementById("labelCitaFecha").textContent = tr.labelCitaFecha;
    document.getElementById("labelCitaHora").textContent = tr.labelCitaHora;
    document.getElementById("labelCitaTipo").textContent = tr.labelCitaTipo;
    document.getElementById("labelCitaNotas").textContent = tr.labelCitaNotas;
    document.getElementById("labelAgendarCita").textContent = tr.labelAgendarCita;
    document.getElementById("btnCancelarCita").textContent = tr.btnCancelarCita;
    document.getElementById("tituloCalendario").textContent = tr.tituloCalendario;
    document.getElementById("tituloListaCitas").textContent = tr.tituloListaCitas;
    document.getElementById("thCitaPaciente").textContent = tr.thCitaPaciente;
    document.getElementById("thCitaFecha").textContent = tr.thCitaFecha;
    document.getElementById("thCitaHora").textContent = tr.thCitaHora;
    document.getElementById("thCitaTipo").textContent = tr.thCitaTipo;
    document.getElementById("thCitaAcciones").textContent = tr.thCitaAcciones;

    //sesiones//

    document.getElementById("formSesionesTitulo").textContent = tr.formSesionesTitulo;
    document.getElementById("labelSesionPaciente").textContent = tr.labelSesionPaciente;
    document.getElementById("labelSesionFecha").textContent= tr.labelSesionFecha;
    document.getElementById("labelSesionTratamiento").textContent = tr.labelSesionTratamiento;
    document.getElementById("labelSesionEjercicios").textContent = tr.labelSesionEjercicios;
    document.getElementById("labelSesionObservaciones").textContent = tr.labelSesionObservaciones;
    document.getElementById("labelSesionEvolucion").textContent = tr.labelSesionEvolucion;
    document.getElementById("labelSesionProximos").textContent = tr.labelSesionProximos;
    document.getElementById("btnGuardarSesion").textContent = tr.btnGuardarSesion;
    document.getElementById("btnCancelarSesion").textContent = tr.btnCancelarSesion;
    document.getElementById("tituloSesionesRegistradas").textContent = tr.tituloSesionesRegistradas;
    document.getElementById("thSesionPaciente").textContent = tr.thSesionPaciente;
    document.getElementById("thSesionFecha").textContent = tr.thSesionFecha;
    document.getElementById("thSesionTratamiento").textContent = tr.thSesionTratamiento;
    document.getElementById("thSesionDetalles").textContent= tr.thSesionDetalles;
    document.getElementById("thSesionExpediente").textContent= tr.thSesionExpediente;

    //reportes//
    document.getElementById("formReportesTitulo").textContent = tr.formReportesTitulo;
    document.getElementById("labelReportePaciente").textContent = tr.labelReportePaciente;
    document.getElementById("labelReportePeriodo").textContent = tr.labelReportePeriodo;
    document.getElementById("labelQuincenal").textContent = tr.labelQuincenal;
    document.getElementById("labelMensual").textContent = tr.labelMensual;
    document.getElementById("labelReporteQuincena").textContent = tr.labelReporteQuincena;
    document.getElementById("labelReporteMes").textContent = tr.labelReporteMes;
    document.getElementById("labelReporteAnio").textContent = tr.labelReporteAnio;
    document.getElementById("btnGenerarReporte").textContent = tr.btnGenerarReporte;
    document.getElementById("btnCerrarReportes").textContent = tr.btnCerrarReportes;

    //asistencias//
    document.getElementById("formAsistenciasTitulo").textContent = tr.formAsistenciasTitulo;
    document.getElementById("btnCargarCitas").textContent = tr.btnCargarCitas;
    document.getElementById("btnCerrarAsistencias").textContent = tr.btnCerrarAsistencias;
    document.getElementById("tituloCitasHoy").textContent = tr.tituloCitasHoy;
    document.getElementById("thAsistenciaPaciente").textContent = tr.thAsistenciaPaciente;
    document.getElementById("thAsistenciaFecha").textContent = tr.thAsistenciaFecha;
    document.getElementById("thAsistenciaHora").textContent = tr.thAsistenciaHora;
    document.getElementById("thAsistenciaTipo").textContent = tr.thAsistenciaTipo;
    document.getElementById("thAsistenciaAcciones").textContent = tr.thAsistenciaAcciones;
    document.getElementById("tituloReporteInasistencia").textContent = tr.tituloReporteInasistencias;
    document.getElementById("labelFechaInicio").textContent = tr.labelFechaInicio;
    document.getElementById("labelFechaFin").textContent = tr.labelFechaFin;
    document.getElementById("btnGenerarInasistencias").textContent = tr.btnGenerarInasistencias;
}


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
    database.ref("pacientes").on("value", function(snapshot){
        let datos = snapshot.val();
        if (datos) {
            pacientes = Object.keys(datos).map(function(key){
                let p = datos[key];
                p._key = key; // guardar la clave de firebase para futuras referencias
                return p;
       
    });
        } else {
            pacientes = [];
        }
        mostrarPacientes();
        actualizarTodosLosSelectores();
    });

}
// EDITAR PACIENTES //
    function editarPaciente(key){
        let paciente = pacientes.find(function(p){ return p._key === key; });
        if (!paciente) return;

        let nuevoNombre = prompt("Editar nombre del paciente:", paciente.nombre);
        if (nuevoNombre === null) return; // usuario cancelo
        let nuevoTelefono = prompt("Editar telefono del paciente:", paciente.telefono);
        if (nuevoTelefono === null) return; // usuario cancelo
        let nuevaDireccion = prompt("Editar direccion del paciente:", paciente.direccion || "");
        if (nuevaDireccion === null) return; // usuario cancelo
        let nuevaFechaNac = prompt("Editar fecha de nacimiento del paciente (YYYY-MM-DD):", paciente.fechaNac || "");
        if (nuevaFechaNac === null) return; // usuario cancelo

        if (nuevoNombre === "" || nuevoTelefono === ""){
            alert("Por favor llene todos los campos");
            return;
        }
        actualizarPacienteEnFirebase(key, {
            nombre: nuevoNombre,
            telefono: nuevoTelefono,
            direccion: nuevaDireccion,
            fechaNac: nuevaFechaNac
        })
        .then(function(){ alert("Paciente editado exitosamente"); })
        .catch(function(error){ alert("Error: " + error.message); });

    }

        //ELIMINAR PACIENTES//
    function eliminarPaciente (key){
        let paciente = pacientes.find(function(p){ return p._key === key; });
        if (!paciente) return;
    let confirmacion = confirm("¿Estas seguro de eliminar a: " + paciente.nombre + "?");
     if (!confirmacion) return;

        eliminarPacienteDeFirebase(key)
            .then(function(){ alert("Paciente eliminado exitosamente"); })
            .catch(function(error){ alert("Error al eliminar: " + error.message); });
    }

function cargarCitas(){
    database.ref("citas").on("value", function(snapshot){
        let datos = snapshot.val();
        if (datos) {
            citas = Object.keys(datos).map(function(key){
                let c = datos[key];
                c._key = key; // guardar la clave de firebase para futuras referencias
                return c;
            });
        } else {
            citas = [];
        }
        mostrarCitas();
    });
    
}

function cargarSesiones(){
    database.ref("sesiones").on("value", function(snapshot){
        let datos = snapshot.val();
        if (datos) {
            sesiones = Object.keys(datos).map(function(key){
                let s = datos[key];
                s._key = key; // guardar la clave de firebase para futuras referencias
                return s;
            });
        } else {            sesiones = [];
        }
    mostrarSesiones();
    });
}

// Pacientes
function guardarPacienteEnFirebase(paciente){
    return database.ref("pacientes").push(paciente);
}
function actualizarPacienteEnFirebase(key,datos){
    return database.ref("pacientes/" + key).update(datos);
}

function eliminarPacienteDeFirebase(key){
    return database.ref("pacientes/" + key).remove();

}

// citas
function guardarCitaEnFirebase(cita){
    return database.ref("citas").push(cita);
}
function actualizarCitaEnFirebase(key,datos){
    return database.ref("citas/" + key).update(datos);
}

function eliminarCitaDeFirebase(key){
    return database.ref("citas/" + key).remove();   
}

//sesiones
function guardarSesionEnFirebase(sesion){
    return database.ref("sesiones").push(sesion);
}
function actualizarSesionEnFirebase(key,datos){
    return database.ref("sesiones/" + key).update(datos);
}
function eliminarSesionDeFirebase(key){
    return database.ref("sesiones/" + key).remove();
}

function actualizarTodosLosSelectores(){
    cargarSelectorPacientes();
    mostrarCalendarioSemanal();
    cargarSelectorPacientesSesion();
        cargarSelectorPacientesReporte();
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
}
   

function cerrarAsistencias(){
    cerrarModal("seccionAsistencias");
}
  
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

guardarPacienteEnFirebase(paciente).then(function(){
    document.getElementById("nombrePaciente").value = "";
    document.getElementById("telefonoPaciente").value = "";
    document.getElementById("direccionPaciente").value = "";
    document.getElementById("nacimientoPaciente").value = "";
    alert("Paciente guardado exitosamente");
}).catch(function(error){
    alert("Error al guardar: " + error.message);
});

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
            "<button onclick=\"editarPaciente('" + pacientes[i]._key + "')\" style='background:#ffc107; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;margin-right:5px;'>Editar</button>" +
            "<button onclick=\"eliminarPaciente('" + pacientes[i]._key + "')\" style='background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;'>Eliminar</button>" +
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
        asistencia: "pendiente",
        motivoInasistencia: ""
     };

    
        guardarCitaEnFirebase(cita).then(function(){
        document.getElementById("citaPaciente").value = "";
        document.getElementById("citaFecha").value = "";
        document.getElementById("citaHora").value = "";
        document.getElementById("citaNotas").value = "";
        alert("Cita agendada exitosamente");
    }).catch(function(error){
        alert("Error al agendar cita: " + error.message);
    });

        


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
            "<td><button onclick=\"editarCita('" + citas[i]._key + "')\" style='background:#ffc107; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;margin-right:5px;'>Editar</button>" +
            "<button onclick=\"eliminarCita('" + citas[i]._key + "')\" style='background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;'>Eliminar</button>"+
            "</td>"+ 
            "</tr>";
        tbody.innerHTML += fila;
    }
    }

//EDITAR CITAS//
function editarCita(key){
    let cita = citas.find(function(c){ return c._key ===key; });
    if (!cita)return;

    let nuevaFecha = prompt("Editar fecha (YYYY-MM-DD):", cita.fecha);
    if (nuevaFecha === null) return; // usuario cancelo
    let nuevaHora = prompt("Editar hora (HH:MM):", cita.hora);
    if (nuevaHora === null) return; // usuario cancelo
    let nuevoTipo = prompt("Editar tipo de cita:", cita.tipo);
    if (nuevoTipo === null) return; // usuario cancelo

    if (nuevaFecha === "" || nuevaHora === "") {
        alert("Fecha y hora son obligatorios");
        return;
    }
    actualizarCitaEnFirebase(key, {
        fecha: nuevaFecha,
        hora: nuevaHora,
        tipo: nuevoTipo
    })
        .then(function(){ alert("Cita editada exitosamente"); })
        .catch(function(error){ alert("Error: " + error.message); });
}


//ELIMINAR CITAS a//
    function eliminarCita(key){
        let cita = citas.find(function(c){ return c._key === key; });
        if (!cita) return;
        let confirmacion = confirm("¿Eliminar la cita de " + cita.paciente + " del " + cita.fecha + " ? ");
        if (!confirmacion) return;

        eliminarCitaDeFirebase(key)
            .then(function(){ alert("Cita eliminada exitosamente"); })
            .catch(function(error){ alert("Error: " + error.message); });
    }

function mostrarCalendarioSemanal(){
    let contenedor = document.getElementById("calendarioSemanal");
    let hoy = new Date();
    let diaSemana = hoy.getDay(); // 0 (domingo) a 6 (sabado)
    if (diaSemana === 0) diaSemana = 7; // ajustar domingo a 7
    let inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - diaSemana + 1 + (semanaOffset * 7)); // lunes de la semana actual + offset

    let tr= traducciones[idioma];

    let html = '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  padding: 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">';

    html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">';
    html += '<button onclick="cambiarSemana(-1)" style="padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; border: 2px solid white; border-radius: 8px; cursor: pointer; font-weight: bold;">' + tr.CalAnterior +'</button>';
    html += '<h3 style= "margin: 0; color: white; font-size: 1.3em;">' + tr.CalSemana + ' ' + formatearFecha(inicioSemana) + '</h3>';
    html += '<button onclick="cambiarSemana(1)" style="padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; border: 2px solid white; border-radius: 8px; cursor: pointer; font-weight: bold;">' + tr.CalSiguiente + '</button>';
    html += '</div>';
    html += '<div style="background: white; border-radius: 10px; overflow: hidden;">';



  

    html += '<table style="width: 100%; border-collapse: collapse; text-align: center;font-size:0.85em;">';
    html += '<thead><tr style="background: linear-gradient(135deg, #2c3e50, #34495e);">';
    html += '<th style="padding:12px 8px; color:white; width: 60px; font-size: 0.85em;">HORA</th>';
    

    // encabezados de dias a//
    let diasNombres = traducciones[idioma].diaSemana;
   
    for(let i=0; i<5; i++){
        let fecha = new Date(inicioSemana);
        fecha.setDate(inicioSemana.getDate() + i);
        let dia = fecha.getDate();
        let esHoy = fecha.toDateString() === hoy.toDateString();
        let bgColor = esHoy ? '#3498db' : 'transparent';
       let borderRadius = esHoy ? '8px' : '0';
       
       html += '<th style= "padding :12px 8px; color: white; background:' + bgColor + '; border-radius:' + borderRadius + ';">'+
       diasNombres[i] + '<br><span style="font-size: 1.2em;">' + dia + '</span></th>';
      
    }
    

    //filas cada 15 minutos 8:00 a 20:00//
    for (let hora=8; hora<=20; hora++){
        for (let minuto=0; minuto<60; minuto += 15){
            let horaStr = (hora < 10 ? '0' + hora : hora) + ':' + (minuto < 10 ? '0' + minuto : minuto);
            let esCadaHora = minuto === 0;

            html += '<tr style= "border-bottom: ' + (esCadaHora ? '2px solid #3498db' : '1px solid #ecf0f1') + ';">';
            html += '<td style="padding: 6px; font-weight:' + (esCadaHora ? 'bold' : 'normal') + '; background: #f8f9fa; color:' + (esCadaHora ? '#2c3e50' : '#95a5a6') + '; font-size: ' + (esCadaHora ? '0.85em' : '0.75em')  + ';">' + horaStr + '</td>';

            //columnas lunes a viernes//

    for (let dia=0; dia<5; dia++){
        let fechaDia = new Date(inicioSemana);
        fechaDia.setDate(inicioSemana.getDate() + dia);
        let fechaStr = fechaDia.getFullYear() + '-' +
            String(fechaDia.getMonth() + 1).padStart(2, '0') + '-' +
            String(fechaDia.getDate()).padStart(2, '0');

        //buscar citas en este dia y hora//
        let citaEncontrada = null;
        for (let c = 0; c < citas.length; c++){       
            if(citas[c].fecha === fechaStr && citas[c].hora === horaStr){
                citaEncontrada = citas[c];
                break;
            }
        }

        if (citaEncontrada){
            let colorFondo = '#e3f2fd';
            let emoji = '📅';
            let colorBorde = '#2196f3';

            if(citaEncontrada.asistencia === 'asistio') {
                colorFondo = '#e8f5e9';
                emoji = '✅';
                colorBorde = '#4caf50';
            } else if (citaEncontrada.asistencia === 'no_asistio'){
                colorFondo = '#ffebee';
                emoji = '❌';
                colorBorde = '#f44336';
            
            }
            html += '<td style="padding: 4px; background:' + colorFondo + '; border-left: 3px solid ' + colorBorde + ';">';
            html += '<div style="font-size: 0.75em; font-weight: bold; color: #2c3e50;">'  + emoji + ' ' + citaEncontrada.paciente.split(' ')[0] +'</div>';
            html += '<div style="font-size: 0.65em; color: #7f8c8d;">' + citaEncontrada.tipo + '</div>';
            html += '</td>';
        } else {
            let celdaColor = esCadaHora ? '#fafafa' : 'white';
            html += '<td style="padding: 6px; background:' + celdaColor + ';"></td>';
        }
    }
            html += '</tr>';
        }
    }
    html += '</tbody></table></div>';

    contenedor.innerHTML = html;
}

         //fomratear fecha a//
    function formatearFecha(fecha){
        let meses = ['Ene', 'Feb', 'Mar', 'Abr','May','Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        return fecha.getDate() + ' ' + meses[fecha.getMonth()] + ' ' + fecha.getFullYear();

}
    //cambiar semana a//
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
    guardarSesionEnFirebase(sesion).then(function(){
    document.getElementById("sesionPaciente").value = "";
    document.getElementById("sesionFecha").value = "";
    document.getElementById("sesionTratamiento").value = "";
    document.getElementById("sesionEjercicios").value = "";
    document.getElementById("sesionObservaciones").value = "";
    document.getElementById("sesionEvolucion").value = "";
    document.getElementById("sesionProximos").value = "";
    alert("Sesion registrada exitosamente");
}).catch(function(error){
    alert("Error al registrar sesion: " + error.message);
});
    
    }

    function mostrarSesiones(){
        let tbody = document.getElementById("listaSesiones");
        tbody.innerHTML = "";

        for (let i= 0; i< sesiones.length; i++){
            let tratamientoCorto = (sesiones[i].tratamiento || ".").substring(0,50) + "...."; // mostrar solo los primeros 20 caracteres
            let fila = "<tr>" +
                "<td>" + sesiones[i].paciente + "</td>" +
                "<td>" + sesiones[i].fecha + "</td>" +
                "<td>" + tratamientoCorto + "</td>" +
                "<td><button onclick= 'verDetalleSesion(\"" + sesiones[i]._key  + "\")'>ver</button></td>" +
                "<td><button onclick= 'verExpediente(\"" + sesiones[i].paciente + "\")'>Expediente</button></td>" +
                "</tr>";
            tbody.insertAdjacentHTML("beforeend", fila);

        }

    }

    function verDetalleSesion(key){
        let sesion = sesiones.find(function(s){ return s._key === key; });
        if (!sesion) return;

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
        let tratamientoCorto = (s.tratamiento || ".").substring(0,50) + "...."; // mostrar solo los primeros 20 caracteres
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
    html += '<br><button type="button" onclick="imprimirReporte(\'resultadoReporte\')" style="background: #2c3e50; color: white; padding: 12px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; margin-top: 10px;">Imprimir Reporte</button>';

    div.innerHTML = html;
 }

    function marcarAsistencia(key, asistio){
        actualizarCitaEnFirebase(key, {
            asistencia: asistio ? "asistio" : "no_asistio"
        })
        .then(function(){ alert(asistio ? "Asistencia registrada" : "Inasistencia registrada"); })
        .catch(function(error){ alert("Error: " + error.message); });
    }


    function registrarMotivo(key){
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
    actualizarCitaEnFirebase(key, {
        asistencia: "no_asistio",
        motivoInasistencia: motivoTexto
    })
    .then(function(){ alert("Inasistencia registrada" + motivoTexto); })
    .catch(function(error){ alert("Error: " + error.message); });

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

        let estadoHTML = "";
        if (cita.asistencia === "pendiente" || !cita.asistencia) {
            estadoHTML = '<button onclick= "marcarAsistencia(\'' + cita._key + '\', true)" style= "background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;"> Asistio</button>' +
                        '<button onclick= "registrarMotivo(\'' + cita._key + '\')" style= "background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer; margin-right: 5px;"> No Asistio</button>';

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
        div.innerHTML = '<div style="background: #d4edda; padding: 20px; border-radius: 10px; color: #155724;">' +
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
    html += '<thead><tr style="background: #f8d7da;">' +
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
        html += '<td style="padding: 10px; border: 1px solid #ddd;">' + cita.paciente + '</td>';
        html += '<td style="padding: 10px; border: 1px solid #ddd;">' + cita.fecha + '</td>';
        html += '<td style="padding: 10px; border: 1px solid #ddd;">' + cita.hora + '</td>';
        html += '<td style="padding: 10px; border: 1px solid #ddd;">' + cita.tipo + '</td>';
        html += '<td style="padding: 10px; border: 1px solid #ddd;">' + cita.motivoInasistencia + '</td>';
        html += '</tr>';

        
    }
    html += '</tbody></table>';
    html += '<hr style="margin: 20px 0;">';
    html += '<div style="background: #f8d7da; padding: 20px; border-radius: 8px; border: 2px solid #dc3545;">';
    html += '<h3 style="color: #721c24; margin: 0;"> TOTAL DE INASISTENCIAS: ' + inasistencias.length + '</h3>';
    html += '<p style="margin: 10px 0 0 0; color: #721c24;"> Pacientes a reportar al sistema de salud</p>';
    html += '</div>';
    html += '</div>';

    html += '<br><button type="button" onclick="imprimirReporte(\'resultadoInasistencias\')" style="background: #dc3545; color: white; padding: 12px 30px;border: none; border-radius: 8px; cursor: pointer; font-size 1em; margin-top: 10px;">Imprimir Reporte</button>';
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
    function verExpediente(nombrePaciente){
        let historial = "";
        let contenido ="";

        for (let i=0; i< sesiones.length; i++){

            if (sesiones[i].paciente === nombrePaciente){
                contenido +='<div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px;">';
                contenido += '<p><strong>Fecha:</strong> ' + sesiones[i].fecha + '</p>';
                contenido += '<p><strong>Tratamiento:</strong> ' + sesiones[i].tratamiento + '</p>';
                contenido += '<P><strong>Ejercicios:</strong> ' + sesiones[i].ejercicios + '</p>';
                contenido += '<p><strong>Observaciones:</strong> ' + sesiones[i].observaciones + '</p>';
                contenido += '<p><strong>Evolucion:</strong> ' + sesiones[i].evolucion + '</p>';
                contenido += '<p><strong>Proximos pasos:</strong> ' + sesiones[i].proximos + '</p>';
                contenido += '</div>';
                historial= "encontrado";
            }
        }

    if (historial === ""){
        alert("No hay sesiones registradas para este paciente");
        return;
    }
    document.getElementById("tituloExpediente").textContent = "Expediente Clinico de " + nombrePaciente;
    document.getElementById("cuerpoExpediente").innerHTML = contenido;
    document.getElementById("modalExpediente").classList.add("active");
    document.getElementById("modalOverlay").classList.add("active");


    }

    function imprimirExpediente(){
        let titulo = document.getElementById("tituloExpediente").textContent;
        let cuerpo = document.getElementById("cuerpoExpediente").innerHTML;

        let ventana = window.open("", "_blank");
            ventana.document.write(`
            <html>
            <head>
                <title>${titulo}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 30px;}
                    h2 {color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;}
                    div {border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px;}
                    p {margin: 5px 0;}
                    strong {color: #2c3e50;}

                </style>
            </head>
            <body>
                <h2>${titulo}</h2>
                ${cuerpo}
            </body>
            </html>
        `);     
    
        ventana.document.close();
        ventana.print();
    }
    function imprimirReporte(idDiv){
        let contenido = document.getElementById(idDiv).innerHTML;
        let ventana = window.open("", "_blank");
        ventana.document.write(`
            <html> 
            <head>
                <title>Reporte</title>
                <style>

                    body { font-family: Arial, sans-serif; padding: 30px;}
                    h3 {color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;}
                    table {width: 100%; border-collapse: collapse; margin-top: 15px;}
                    th {background: #ecf0f1; padding: 10px;text-align: left;}
                    td {padding: 10px; border-bottom: 1px solid #ddd;}
                    button {display: none;}
                </style>
            </head>
            <body>
                ${contenido}
            </body>
            </html>
        `);
        ventana.document.close();
        ventana.print();
    }




  




 
















































