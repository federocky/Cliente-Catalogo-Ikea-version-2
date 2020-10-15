window.addEventListener('load', function(){

 var arrayCarro = []; // Donde se almacenaran los productos comprados

 var listaProcutos = [ // es el almacen de la tienda
    {
        nombre: 'caja de flores',
        precio: 3.99,
        img: 'img/cajonFlores.jpg',
        codigo: 1,
    },
    {
        nombre: 'cafe',
        precio: 1.99,
        img: 'img/cafe.jpg',
        codigo: 2
    },
    {
        nombre: 'especias',
        precio: 5.99,
        img: 'img/especias.jpg',
        codigo: 3
    },
    {
        nombre: 'regalo',
        precio: 20.50,
        img: 'img/regalo.png',
        codigo: 4
    }
];


/**
 * Capturando los diferentes elementos del DOM
 */
var botonBuscar = document.getElementById('buscar'); 
var codigoIntroducido;
var carrito = document.getElementById('carrito'); //imagen del carrito
var articuloNoEncontrado = document.querySelector('#articuloNoEncontrado'); //Mensaje de error en caso de introducir un codigo incorrecto
var actualizarCarro = document.getElementById('actualizado');  // Mensaje que aparece al introducir un articulo en el carro

var producto = document.getElementById('producto'); // es la tarjeta contenedora del producto
var cerrarProducto = document.getElementById('cerrarProducto');
var cancelar = document.getElementById('cancelar');
var modificador = document.querySelectorAll('.modificador'); // - y + que actualizan la cantidad de productos para comprar
var cantidadProducto = document.querySelector('#producto #cantidad');
var agregarCarro = document.getElementById('agregarCarro');
var precioProducto = document.getElementById('precio');
var nombreProducto = document.querySelector('#producto h2');
var imagenProducto = document.querySelector('#producto img');

var caja = document.getElementById('caja'); //todo el cuadro del carrito
//var resumenCompra = document.getElementById('resumenCompra'); // el footer donde viene el precio
var contenedorArticulos = document.getElementById('articulos'); // donde introduzco los articulos
var cerrarCaja = document.getElementById('cerrarCaja');
var precioVariable = document.getElementById('precioVariable'); // precio total
var quitarProductoCarro = document.querySelectorAll('.quitarProducto'); 



/**
 * Ponemos las variables necesarias a la escucha de un evento
 */
botonBuscar.addEventListener('click', buscarArticulo);
carrito.addEventListener('click', mostrarCarro);
cerrarProducto.addEventListener('click', desapareceProducto);
cancelar.addEventListener('click', desapareceProducto);
for (const boton of modificador) {
    boton.addEventListener('click', variarCantidad);
}
agregarCarro.addEventListener('click', llenarCarro);
cerrarCaja.addEventListener('click', cerrarCarro);


/**
 * 
 * Implementeacion de las funciones
 */

/**
 * Funcion que busca el articulo dentro del almacen y almacena los valores en caso de ser necesaria su utilizacion posterior.
 */
function buscarArticulo(e){
    var encontrado = false;

    e.preventDefault();
    codigoIntroducido = document.getElementById('cuadroTexto').value;

    for (const articulo of listaProcutos) {
        if(codigoIntroducido == articulo.codigo) {

            nombreProducto.textContent = articulo.nombre; // esto lo voy a usar en agregar al carro
            precioProducto.textContent = articulo.precio;
            imagenProducto.src = articulo.img;
            cantidadProducto.textContent = 1;
            producto.style.visibility = 'visible';

            encontrado = true;
        } 
    }

    if (!encontrado) {
        articuloNoEncontrado.style.visibility = 'visible';
        setTimeout(function(){
            articuloNoEncontrado.style.visibility = 'hidden';
        }, 1500);
        producto.style.visibility = 'hidden';
    }
};


var total = 0;

/**
 * Funcion que nos muestra una ventana con los elementos que tenemos en nuestro carrito. 
 * 
 */
function mostrarCarro() {
    carrito.style.visibility = 'hidden';
    contenedorArticulos.innerHTML = '';
    total = 0; // precio total mostrado por pantalla. 

    for (const articulo of arrayCarro) {
        //var contador = 0;
        var article = document.createElement('article');
        var img = document.createElement('img');
        var nombre = document.createElement('h4');
        var precio = document.createElement('h3');
        article.id = 'contenedorArticulos';
        var cantidad = document.createElement('p');
        var cerrarProducto = document.createElement('div');
        cerrarProducto.appendChild(document.createTextNode('x'));
        cerrarProducto.classList = 'quitarProducto'; // necesario para ponerlo a la escucha de un evento. 
        cerrarProducto.id = articulo.codigo; // este id sera utilizado en caso de necesitar eliminar este articulo del carro. 

        img.src = articulo.imagen;
        nombre.appendChild(document.createTextNode(articulo.nombre));
        cantidad.appendChild(document.createTextNode('x ' + articulo.cantidad));
        precio.appendChild(document.createTextNode(articulo.precioTotal));
        article.appendChild(img);
        article.appendChild(nombre);
        article.appendChild(precio);
        article.appendChild(cantidad);
        article.appendChild(cerrarProducto);
        contenedorArticulos.appendChild(article);

        total += articulo.precioTotal;
    }

    precioVariable.textContent = total.toFixed(2); // moestramos por pantalla el precio con solo dos decimales
    caja.style.visibility = 'visible'; // mostramos el elemtno contenedor

    quitarProductoCarro = document.querySelectorAll('.quitarProducto');//Selecciono todas las cajitas y las pongo a la escucha
    for (const iterator of quitarProductoCarro) {
        iterator.addEventListener('click', quitarUnProducto);
    }

}


/**
 * Funcion que hace desaparecer la ventana contenedora del producto, desencadenado tanto al pulsar el boton cancelar como al pulsar el boton de cerrar de la esquina superior derecha
 */
function desapareceProducto(){
    producto.style.visibility = 'hidden';
}


/**
 * Function que altera la cantidad de productos que el cliente desea comprar al pulsar + o -
 */
function variarCantidad(e){
    e.preventDefault();

    if(e.target.value === '+') cantidadProducto.textContent = Number(cantidadProducto.textContent) + 1;

    else if (Number(cantidadProducto.textContent) > 1) cantidadProducto.textContent = Number(cantidadProducto.textContent) -1;
    
}


/**
 * Funcion que agrega un producto al carro. En caso de que este ya exista actualiza su cantidad. 
 */
function llenarCarro(){
    var flag = false;

    for (const articulo of arrayCarro) {
        if (articulo.codigo == codigoIntroducido) {
            flag = true;
            articulo.cantidad = Number(articulo.cantidad) + Number(cantidadProducto.textContent);
            articulo.precioTotal = Number(articulo.precioTotal) + Number(precioProducto.textContent);
        }
    }

    if (!flag) {

        arrayCarro.push({
            nombre: nombreProducto.textContent,
            precio: precioProducto.textContent,
            cantidad: cantidadProducto.textContent,
            imagen: imagenProducto.src, 
            precioTotal: (Number(precioProducto.textContent) * Number(cantidadProducto.textContent)),
            codigo: codigoIntroducido
        });
    }

    //Muestro el mensaje de carro actualizado y lo cierro automaticamente. 
    actualizarCarro.style.visibility = 'visible';
    setTimeout(function(){
        actualizarCarro.style.visibility = 'hidden';
    }, 1500);
    
}


/**
 * Cierra la ventana contenedora de articulos en el carrito
 */
function cerrarCarro(){
    carrito.style.visibility = 'visible';
    caja.style.visibility = 'hidden';
}

/**
 * Funcion que elimina el producto seleccinado del carrito.
 */
function quitarUnProducto(e){
    for (const art of arrayCarro) {
        if(art.codigo == e.target.id){
            arrayCarro.splice(arrayCarro.indexOf(art), 1);
            mostrarCarro();
        }
    }
}


});