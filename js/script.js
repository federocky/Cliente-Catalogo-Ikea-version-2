window.addEventListener('load', function(){

 var listaProcutos = [
    {
        nombre: 'caja de flores',
        precio: 3.99,
        img: '../img/cajonFlores.jpg',
        codigo: 1
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

var buscar = document.getElementById('buscar');
var codigoIntroducido;
var carrito = document.getElementById('carrito');

var producto = document.getElementById('producto');

var caja = document.getElementById('caja');
var resumenCompra = document.getElementById('resumenCompra');
var contenedorArticulos = document.getElementById('articulos');

buscar.addEventListener('click', buscarArticulo);
carrito.addEventListener('click', mostrarCarro);



function buscarArticulo(e){
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
            producto.style.visibility = 'visible';

        }
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

});