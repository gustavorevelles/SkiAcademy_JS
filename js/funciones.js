const estaciones = ["Baqueira", "Candanchu", "Sierra Nevada", "Valdesquí"];
const actividades = ["Alpino", "Freeride", "Freestyle"];
const fechaMes = ["Diciembre","Enero", "Febrero", "Marzo"];
const cantidadPersonas = [1,2,3,4,5];
let instructores;

// Ajax

$.get("data/instructores.json",function(respuesta, estado) {
    console.log(respuesta);
    console.log(estado);
    if (estado == "success") {
        instructores = respuesta;
    } else {
        console.log ("Fallo en la carga de los datos")
    }
    
});

// Función para cargar estaciones en <select>
function cargar_estaciones() {
    estaciones.sort();
    addDestinos("selectDestino", estaciones);   
}

// Función para agregar opciones al <select> de estaciones
function addDestinos(domElement, estaciones) {
    var select = document.getElementById("selectDestino");

    for (value in estaciones) {
        let option = document.createElement("option");
        option.text = estaciones[value];
        select.add(option);
    }
    
}

// Función para cargar actividades en <select>
function cargar_actividades() {
    actividades.sort();
    addActividades("selectTipoActividad", actividades);  
}

// Función para agregar opciones al <select> de actividades
function addActividades(domElement, actividades) {
    var select = document.getElementById("selectTipoActividad");

    for (value in actividades) {
        let option = document.createElement("option");
        option.text = actividades[value];
        select.add(option);
    }
    
}

// Función para cargar las fechas en <select>
function cargar_fechas() {
    addFechas("selectFechas", fechaMes);
}

// Función para agregar opciones al <select> de fechas
function addFechas(domElement, fechaMes) {
    var select = document.getElementById("selectFechas");

    for (value in fechaMes) {
        let option = document.createElement("option");
        option.text = fechaMes[value];
        select.add(option);
 }
    
}

// Función para cargar cantidad personas en <select>
function cargar_cantidad() {
    addCantidad("selectPersonas", cantidadPersonas);
}

// Función para agregar opciones al <select> de cantidad personas
function addCantidad(domElement, cantidadPersonas) {
    var select = document.getElementById("selectPersonas");

    for (value in cantidadPersonas) {
        let option = document.createElement("option");
        option.text = cantidadPersonas[value];
        select.add(option);
 }
    
}

// Función para mostrar los resultados en función de las opciones seleccionadas y almacenarlos con localStorage

$("#formularioBusqueda").on("submit", function(e) {
    
    //prevengo el comportamiento por defecto del formulario
    e.preventDefault();

    //muestra capa de resultados y oculta los generados anteriormente
    //$.scrollTo(document.getElementById('confirmaView'));
    //$('body').scrollTo('#confirmaView');
    $("#confirmaView").show(500);
    $( "#viewResultados").hide();
    $( "#viewFormReserva").hide();

    //asigno los valores seleccionados a las variables
    destino = selectDestino.value;
    tipo = selectTipoActividad.value;
    fecha = selectFechas.value;
    personas = selectPersonas.value;
    dias = cantidadDias.value

    
    //almacena datos del formulario con localStorage
    localStorage.setItem ("Estación:",destino);
    localStorage.setItem ("Tipo de actividad:",tipo);
    localStorage.setItem ("Fecha:",fecha);
    localStorage.setItem ("Cantidad personas:",personas);
    localStorage.setItem ("Cantidad días:",dias);

    
    //inserta en el dom los resultados
    $("#estacionView").html(destino);
    $("#tipoView").html(tipo);
    $("#mesView").html(fecha);
    $("#paxView").html(personas);
    $("#diasView").html(dias);

});



// Función para confirmar la búsqueda y mostrar los resultados filtrados

$("#btnConfirmar").on("click", function() {

    //muestra capa de resultados confirmados y oculta los generados anteriormente 
    $("#confirmaView").hide();
    $("#viewResultados").show();
    
    if (fecha == "Diciembre" || "Enero" || "Febrero" || "Marzo") {
        
        creaResultadosFiltrados ();
        
    }
    //función para crear los resultados filtrados
    function creaResultadosFiltrados () {

        $('#resultadosFiltrados tbody').empty();
        
        filtroResultado = instructores.filter(instructor => instructor.mesDisponible == fecha);
        
        filtroResultado.forEach(function(item){
    
            localStorage.setItem ("Nombre Instructor:", item.nombre);
            localStorage.setItem ("Precio Total:", item.precioDia * dias);

            $('#resultadosFiltrados tbody').append(`'<tr><td>
            ${item.nombre} </td><td> ${item.fichaTecnica}
             </td><td>${item.precioDia}</td><td> ${dias} 
             </td><td>${item.precioDia * dias + "€"}</td><td>
             <button class='btn-reservar btn btn-primary btn-sm' id='${item.id}'>Reservar</button></td></tr>'`);

        });   
    
    }

    console.log(filtroResultado);

    let resultadoNum = filtroResultado;
    $("#resultadoNum").html(resultadoNum.length);

});

// Función para seleccionar al instructor deseado

//DECLARACIÓN DE CLASE PRODUCTO
class Producto {
    constructor(id, nombre, estacionDisponible,mesDisponible, precioDia) {
            this.id = parseInt(id);
            this.nombre = nombre;
            this.estacionDisponible = estacionDisponible;
            this.mesDisponible = mesDisponible;
            this.precioDia = parseFloat(precioDia);            
    }
    //AGREGAMOS METODOS PARA MANEJAR LAS CANTIDADES Y EL SUBTOTAL
    subTotal(){
        return this.precioDia * this.dias;
    }
    
}

$(document).on('click', '.btn-reservar', function(e) {

    const idProducto = e.target.id;
    console.log(idProducto);
    const existe = filtroResultado.find(item => item.id == idProducto);
    console.log(existe);
    
    $("#demo").html("Su instructor será: " + existe.nombre + " con un precio total de: " + existe.precioDia * dias + "€");
    /*
    let resultadoFinal = "";

    filtroResultado.forEach(muestraResultado);

    function muestraResultado(item) {
        resultadoFinal = "Su instructor será: " + item.nombre + " con un precio total de: " + item.precioDia * dias + "€";
    
    }
    
    $("#demo").html(resultadoFinal);
    */
    
    $("#viewFormReserva").show();    
    $('html, body').animate({
        scrollTop: $("#viewFormReserva").offset().top
        }, 100);
    localStorage.clear();
 }); 


// Variables Función para realizar la reserva
    let f_Nombre;
    let f_Apellidos;
    let f_Direccion;
    let f_Ciudad;
    let f_CP;
    let f_Telefono;
    let f_email;
    let f_pago_tar;

// Función para realizar la reserva
$("#formReserva").on("submit", function(e) {
    
    //prevengo el comportamiento por defecto del formulario
    e.preventDefault();

    f_Nombre = $("#f_Nombre").val();
    f_Apellidos = $("#f_Apellidos").val();
    f_Direccion = $("#f_Direccion").val();
    f_Ciudad = $("#f_Ciudad").val();
    f_CP = $("#f_CP").val();
    f_Telefono = $("#f_Telefono").val();
    f_email = $("#f_email").val();
    f_pago_tar =  $("input[name='f_Pago_Tarjeta']:checked");

    //si esta vacio lanza error
    if (f_Nombre.length == 0 || f_Apellidos.length == 0 || f_Direccion.length == 0 || f_Ciudad.length == 0 || f_CP.length == 0 || f_Telefono.length == 0 || f_email.length == 0 || f_pago_tar.length == 0 ) {
        
        $("#errorForm").show();
      } else {
        $("#okForm").show();
      }

    //almacena datos del formulario con localStorage
    localStorage.setItem ("Nombre cliente:",f_Nombre);
    localStorage.setItem ("Apellidos cliente:",f_Apellidos);
    localStorage.setItem ("Direccion:",f_Direccion);
    localStorage.setItem ("Ciudad:",f_Ciudad);
    localStorage.setItem ("Codigo Postal:",f_CP);
    localStorage.setItem ("Telefono:",f_Telefono);
    localStorage.setItem ("Email:",f_email);
    localStorage.setItem ("Tipo de pago:",f_pago_tar);

});




