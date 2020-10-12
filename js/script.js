window.addEventListener('load', function(){

 var arrayCarro = [];

 var listaProcutos = [
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


var botonBuscar = document.getElementById('buscar');
var codigoIntroducido;
var carrito = document.getElementById('carrito');
var articuloNoEncontrado = document.querySelector('#articuloNoEncontrado');
var actualizarCarro = document.getElementById('actualizado');

var producto = document.getElementById('producto');
var cerrarProducto = document.getElementById('cerrarProducto');
var cancelar = document.getElementById('cancelar');
var modificador = document.querySelectorAll('.modificador');
var cantidadProducto = document.querySelector('#producto #cantidad');
var agregarCarro = document.getElementById('agregarCarro');
var precioProducto = document.getElementById('precio');
var nombreProducto = document.querySelector('#producto h2');
var imagenProducto = document.querySelector('#producto img');

var caja = document.getElementById('caja'); //todo el cuadro del carrito
var resumenCompra = document.getElementById('resumenCompra'); // el footer donde viene el precio
var contenedorArticulos = document.getElementById('articulos'); // donde introduzco los articulosghb
var cerrarCaja = document.getElementById('cerrarCaja');
var precioVariable = document.getElementById('precioVariable');
var quitarProductoCarro = document.querySelectorAll('.quitarProducto');

botonBuscar.addEventListener('click', buscarArticulo);
carrito.addEventListener('click', mostrarCarro);
cerrarProducto.addEventListener('click', desapareceProducto);
cancelar.addEventListener('click', desapareceProducto);
for (const boton of modificador) {
    boton.addEventListener('click', variarCantidad);
}
agregarCarro.addEventListener('click', llenarCarro);
cerrarCaja.addEventListener('click', cerrarCarro);

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
function mostrarCarro() {
    carrito.style.visibility = 'hidden';
    contenedorArticulos.innerHTML = '';
    total = 0;

    for (const articulo of arrayCarro) {
        var contador = 1;
        var article = document.createElement('article');
        var img = document.createElement('img');
        var nombre = document.createElement('h4');
        var precio = document.createElement('h3');
        article.id = 'contenedorArticulos';
        var cantidad = document.createElement('p');
        var cerrarProducto = document.createElement('div');
        cerrarProducto.appendChild(document.createTextNode('x'));
        cerrarProducto.classList = 'quitarProducto';

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

    precioVariable.textContent = total;
    caja.style.visibility = 'visible';
    quitarProductoCarro = document.querySelectorAll('.quitarProducto');//TODO:
    for (const iterator of quitarProductoCarro) {
        iterator.addEventListener('click', quitarUnProducto);
    }
    console.log(quitarProductoCarro); //FIXME: quitar luego


}

function desapareceProducto(){
    producto.style.visibility = 'hidden';
}


function variarCantidad(e){
    e.preventDefault();

    if(e.target.value === '+') cantidadProducto.textContent = Number(cantidadProducto.textContent) + 1;

    else if (Number(cantidadProducto.textContent) > 1) cantidadProducto.textContent = Number(cantidadProducto.textContent) -1;
    
}

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

    actualizarCarro.style.visibility = 'visible';
    setTimeout(function(){
        actualizarCarro.style.visibility = 'hidden';
    }, 1500);
    
}

function cerrarCarro(){
    carrito.style.visibility = 'visible';
    caja.style.visibility = 'hidden';
}


function quitarUnProducto(e){
    //FIXME: esta complicada la cosa. tengo que recuperar el codigo del articulo. Eliminarlo del array y volver a cargar la funcion mostrar carro.
}


});