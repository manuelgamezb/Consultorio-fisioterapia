//array para guardar todos los pacientes//
let pacientes =[];
function irAPacientes() {
document.getElementById("seccionPacientes").style.display = "block";
}

function cerrarFormulario () {
    alert("la funcion se ejecuto");
    document.getElementById("seccionPacientes").style.display ="none";
    
}
function guardarPaciente(){
    //obtener los valores//
    let nombre = document.getElementById("nombrePaciente").value;
    let telefono = document.getElementById("telefonoPaciente").value;
    //validar que no esten vacios//
    if (nombre ==="" || telefono ===""){
        alert("Por favor llena todos los campos");
        return;
    }
    //crear objeto paciente//
    let paciente = {
        nombre: nombre,
        telefono: telefono
    };

    //agregar array//
    pacientes.push(paciente);

    //mostrar en la tabla//
    mostrarPacientes();
//limpiar el formulario//
document.getElementById("nombrePaciente").value = "";
document.getElementById("telefonoPaciente").value = "";

alert("Paciente Guardado exitosamente");

}
function mostrarPacientes() {
    let tbody = document.getElementById("listaPacientes");
    tbody.innerHTML = ""; 

    //recorrer todos  los pacientes//

    for(let i = 0; i<pacientes.length; i++) {
        let fila = "<tr><td>" + pacientes[i].nombre + "</td><td>" + pacientes[i].telefono + "</td></tr>";
        tbody.innerHTML += fila;
    }


}