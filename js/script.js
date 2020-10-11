window.addEventListener('load', function(){

 var listaProcutos = [
    {
        nombre: 'caja de flores',
        precio: 3.99,
        img: '../img/cajonFlores.jpg',
        codigo: 1,
    },
    {
        nombre: 'cafe',
        precio: 1.99,
        img: '../img/cafe.jpg',
        codigo: 2
    },
    {
        nombre: 'especias',
        precio: 5.99,
        img: '../img/especias.jpg',
        codigo: 3
    },
    {
        nombre: 'regalo',
        precio: 20.50,
        img: '../img/regalo.png',
        codigo: 4
    }
];

var botonBuscar = document.getElementById('buscar');
var codigoIntroducido;
var carrito = document.getElementById('carrito');
var articuloNoEncontrado = document.querySelector('#articuloNoEncontrado');

var producto = document.getElementById('producto');
var cerrarProducto = document.getElementById('cerrarProducto');
var modificador = document.querySelectorAll('.modificador');
var cantidad = document.querySelector('#producto #cantidad');
var precioProducto = document.getElementById('precio');

var caja = document.getElementById('caja'); //todo el cuadro del carrito
var resumenCompra = document.getElementById('resumenCompra'); // el footer donde viene el precio
var contenedorArticulos = document.getElementById('articulos'); // donde introduzco los articulosghb


botonBuscar.addEventListener('click', buscarArticulo);
carrito.addEventListener('click', mostrarCarro);
cerrarProducto.addEventListener('click', desapareceProducto);
for (const boton of modificador) {
    boton.addEventListener('click', variarCantidad);
}


function buscarArticulo(e){
    var encontrado = false;

    e.preventDefault();
    codigoIntroducido = document.getElementById('cuadroTexto').value;

    for (const articulo of listaProcutos) {
        if(codigoIntroducido == articulo.codigo) {
            /* var article = document.createElement('article');
            var img = document.createElement('img');
            var nombre = document.createElement('h4');
            var precio = document.createElement('h3');

            article.id = 'contenedorArticulos';
            img.src = articulo.img;
            nombre.appendChild(document.createTextNode(articulo.nombre));
            precio.appendChild(document.createTextNode(articulo.precio));
            article.appendChild(img);
            article.appendChild(nombre);
            article.appendChild(precio);

            contenedorArticulos.appendChild(article); */

            console.log(producto.children);
            producto.children[0].src = articulo.img;
            producto.children[1].textContent = articulo.nombre;
            precioProducto.textContent = articulo.precio;
            cantidad.textContent = 1;
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

var contador = 1;
function mostrarCarro(){
    
    if (contador % 2 === 1)
        caja.style.visibility = 'visible';

     else caja.style.visibility = 'hidden';

     contador++;

     console.log(contador);
}

function desapareceProducto(){
    producto.style.visibility = 'hidden';
}


function variarCantidad(e){
    e.preventDefault();

    if(e.target.value === '+') cantidad.textContent = Number(cantidad.textContent) + 1;

    else if (Number(cantidad.textContent) > 1) cantidad.textContent = Number(cantidad.textContent) -1;
    
}

});