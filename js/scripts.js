$(document).ready (function (){
    cargar_estaciones();
    cargar_actividades();
    cargar_fechas();
    cargar_cantidad();

    $('#recargar').click(function() {
        location.reload();
        window.location.reload(true)
    });
    
    
    
});


// Recupero los valores del formulario con localStorage

let destino = localStorage.getItem("Estación:");
let tipo = localStorage.getItem("Tipo de actividad:");
let fecha = localStorage.getItem("Fecha:");
let personas = localStorage.getItem("Cantidad personas:");
let dias = localStorage.getItem("Cantidad días:");
let filtroResultado =[]; 