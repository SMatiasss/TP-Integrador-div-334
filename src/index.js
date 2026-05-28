function init() {
    initInicio()
    initCarrito()
}

async function initInicio() {
    if (!document.querySelector("#contenedor-productos")) return

    let {teclados, mouses } = await cargarDatos()
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

        console.log(objTeclados);
    console.log(`
        
        `);
    
    console.log(objMouses);
    
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
    let contenedor = document.querySelector("#contenedor-productos")
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
                    <img src=${producto.img} alt=${nombre}>
                    <div>
                        <h3>${nombre}</h3>
                        <p class="precio-producto">${producto.precio}</p>
                        <p class="descripcion-producto">${producto.info}</p>
                    </div>
                    <button class="btn-sumar-a-carrito"> + </button>
                    <button class="btn-restar-a-carrito"> - </button>
                </li>
            `
        });

        contenedor.innerHTML +=`
        </ul>`
    }
}
init()