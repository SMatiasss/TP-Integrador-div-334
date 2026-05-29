function init() {
    initInicio()
    initCarrito()
}

async function initInicio() {
    if (!document.querySelector("#contenedor-productos")) return

    ({teclados, mouses} = await cargarDatos())
    imprimirProductos(teclados)

}

function initCarrito() {
    if (!document.querySelector("#carrito")) return

    /* Lógica carrito */
}

async function cargarDatos() {
    const respuestaTeclados = await fetch("../../data/teclados.json")
    const objTeclados = await respuestaTeclados.json()

    const respuestaMouses = await fetch("../../data/mouses.json")
    const objMouses = await respuestaMouses.json()

    
    return {teclados: objTeclados.teclados, mouses: objMouses.mouses}
}

/* 
async function cargarJSON(direccion) {
    try {
        const respuesta = await fetch(direccion)
        if (!respuesta.ok) return []
        return await respuesta.json()
    } catch {
        return []
    }
}
    
async function cargarDatos() {
    const teclados = await cargarJSON("../data/teclados.json")
    const mouses = await cargarJSON("../data/mouses.json")

    return {teclados, mouses}
}    
*/

function imprimirProductos(productos){
    const contenedor = document.querySelector("#contenedor-productos")
    contenedor.innerHTML = `
    <p>No hay Productos disponibles</p>
    `
    if (productos.length > 0){
        console.log("entré");
        
        contenedor.innerHTML = `
        <ul>
        `
        productos.forEach(producto => {
            const nombre = producto.nombre
            contenedor.innerHTML += `
                <li id="producto-${nombre}">
                    <img src=${producto.img}>
                    <div>
                        <h3>${nombre}</h3>
                        <p class="precio-producto">${producto.precio}</p>
                        <p class="descripcion-producto">${producto.info}</p>
                    </div>
                    <button onclick="actualizarCarrito(-1, '${nombre}')"> + </button>
                    <button onclick="actualizarCarrito(1, '${nombre}')"> - </button>
                </li>
            `
        });

        contenedor.innerHTML +=`
        </ul>`
    }
}

function actualizarCarrito(operador, nombre){
    console.log(carrito);
    console.log("");
    
    const producto = teclados.find(producto => producto.nombre === nombre) || mouses.find(producto => producto.nombre === nombre)
    
    let productoEncontrado = carrito.find(prod => prod[0].nombre == nombre)
    if (!productoEncontrado) {
        carrito.push([productoEncontrado, {"cantidad": 1}])
    } else {
        productoEncontrado[1].cantidad += operador
    }
    console.log(carrito);
    
    /* if (!productoEncontrado) carrito.push([producto, { cantidad: 1 }]); else productoEncontrado[1].cantidad++ */
}

/*
function actualizarCarrito(operador, nombre){

    const producto =
        teclados.find(p => p.nombre === nombre) ||
        mouses.find(p => p.nombre === nombre)

    let productoEnCarrito = carrito.find(item => item.producto.nombre === nombre)

    if (!productoEnCarrito) {
        carrito.push({
            producto: producto,
            cantidad: 1
        })
    } else {
        productoEnCarrito.cantidad += operador
    }

    console.log(carrito)
} */

let teclados = []
let mouses = []
let carrito = JSON.parse(localStorage.getItem("carrito")) || [] 

init()