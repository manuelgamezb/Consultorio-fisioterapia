function irAPacientes(){
    //mostrar la seccion de pacientes//
    document.getElementById("seccionPacientes").style.display = "block";
    }
function cerrarFormulario() {
    //ocultar seccion pacientes//
    document.getElementById("seccionPacientes").style.display = "none";
    
}
function guardarPaciente(){
    //obtener los valores//
    let nombre= document.getElementById("nombrePaciente").value;
    let telefono = document.getElementById("telefonoPaciente").value;

    //mostrar datos//
    alert("Paciente guardado:\nNombre: "  + nombre + "\nTelefono: "  + telefono);
    //limpiar el formulario//
    document.getElementById("nombrePaciente").value= "";
    document.getElementById("telefonoPaciente").value = "";
    
}