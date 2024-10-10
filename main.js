const productos = [
    
    {
        id: 1 ,
        nombre: "Lámpara de lava",
        precio: 18000
    },
    
    {
        id: 2 ,
        nombre: "Lámpara globo de filamento led", 
        precio: 6900
    },
    
    {
        id: 3 ,
        nombre: "Lámpara globo de filamento incandescente de carbono",
        precio: 5900
    },
    
    {
        id: 4 ,
        nombre: "Velador de madera",
        precio: 10000
    },
    
    {
        id: 5 ,
        nombre: "Velador gancho",
        precio: 15000
    },
    
    {
        id: 6 ,
        nombre: "Velador Pixar",
        precio: 25000
    },
    
    {
        id: 7 ,
        nombre: "Velador Estudiantes",
        precio: 17000
    },
    
    {
        id: 8 ,
        nombre: "Lámpara fria 8w",
        precio: 1500
    },

    {
        id: 9 ,
        nombre: "Lámpara cálida 8w",
        precio: 1200
    },
]

let productosCarro = []

let container = document.getElementById("contenedor-productos")

 function renderProductos (productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>${producto.precio}</p>
                          <button class="productoAgregar" id="${producto.id}">Agregar </button>`
        container.appendChild(card)                  
    })
    addToCartButton()
 }

 renderProductos(productos)

 function addToCartButton () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
            productosCarro.push(selectedProduct)
            console.log(productosCarro)

            localStorage.setItem("productosCarro", JSON.stringify(productosCarro))
        }
    })
}

function renderProductos(productsArray) {
    container.innerHTML = "";
    productsArray.forEach(producto => {
        const card = document.createElement("div");
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <p>Cantidad: <span id="cantidad-${producto.id}">1</span></p>
            <button class="btn-increase" data-id="${producto.id}">+</button>
            <button class="btn-decrease" data-id="${producto.id}">-</button>
            <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>
        `;
        container.appendChild(card);
    });
    addCartButtonEvents();
    addToCartButton();
}

function addCartButtonEvents() {
    document.querySelectorAll(".btn-increase").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            let cantidadElement = document.getElementById(`cantidad-${productId}`);
            let cantidad = parseInt(cantidadElement.innerText);
            cantidad++;
            cantidadElement.innerText = cantidad;
        };
    });

    document.querySelectorAll(".btn-decrease").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            let cantidadElement = document.getElementById(`cantidad-${productId}`);
            let cantidad = parseInt(cantidadElement.innerText);
            if (cantidad > 1) {
                cantidad--;
                cantidadElement.innerText = cantidad;
            }
        };
    });
}

function addToCartButton() {
    let addButton = document.querySelectorAll(".productoAgregar");
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id;
            const selectedProduct = productos.find(producto => producto.id == productId);
            let cantidadElement = document.getElementById(`cantidad-${productId}`);
            let cantidad = parseInt(cantidadElement.innerText);

            const productoEnCarro = productosCarro.find(producto => producto.id == selectedProduct.id);
            if (productoEnCarro) {
                productoEnCarro.cantidad += cantidad;
            } else {
                productosCarro.push({...selectedProduct, cantidad: cantidad});
            }

            localStorage.setItem("productosCarro", JSON.stringify(productosCarro));
        };
    });
}

renderProductos(productos);
