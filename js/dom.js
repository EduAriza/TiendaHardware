let productos = []
const carrito = []
const URL = "../Base de datos/productos.json" //ARCHIVO JSON//
const container = document.querySelector("div.container")

const activarBotonesAdd = ()=> { //BOTONES DE LAS TARJETAS 
    const botonesAdd = document.querySelectorAll(".button.button-outline.button-add")
          botonesAdd.forEach(btn => btn.addEventListener("click", (e)=> agregarAlCarrito(e)))
}

//ASYNC - AWAIT
const cargarMisProductos = async ()=> {
    let armoHTML = ""
    let activoBotones = true
        try {
            const response = await fetch(URL)
                  productos = await response.json()
                  productos.forEach(producto => armoHTML += retornoCard(producto))
        } catch (error) {
            armoHTML = retornoError()
            activoBotones = false 
        } finally {
            container.innerHTML = armoHTML
            activoBotones && activarBotonesAdd()
        }
}

//TOASTIFY//
const toast = (mensaje)=> {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right",
        style: {
          background: "black",
        }
      }).showToast();
}

const agregarAlCarrito = (e)=> {  //AGREGAR PRODUCTO AL CARRITO
    let resultado = productos.find(prod => prod.nombre === e.target.id)
        if (resultado !== undefined) {
            carrito.push(resultado)
            guardarCarrito()
            toast(`'${e.target.id}' se agregó al carrito.`)
        }
}

const guardarCarrito = ()=> { 
    carrito.length > 0 && localStorage.setItem("carrito", JSON.stringify(carrito))
}

const recuperarCarrito = ()=> {
    if (localStorage.getItem("carrito")) {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
            carritoRecuperado.forEach(producto => carrito.push(producto))
    } else {
        console.warn("No se encontró un carrito guardado.")
    }
}

recuperarCarrito()
cargarMisProductos()