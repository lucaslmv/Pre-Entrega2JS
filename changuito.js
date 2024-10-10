let cartContainer = document.getElementById("seccion-carro")

let cartStorage = localStorage.getItem("productosCarro")
cartStorage = JSON.parse(cartStorage)

function renderCarrito(cartItems) {
    cartItems.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                            <p>$${producto.precio}</p>`
        cartContainer.appendChild(card)
    })
}
renderCarrito(cartStorage)


function renderCarrito(cartItems) {
    cartContainer.innerHTML = ""; 
    cartItems.forEach(producto => {
        const card = document.createElement("div");
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <p>$${producto.precio}</p>
                          <p>Cantidad: ${producto.cantidad}</p>
                          <button class="btn-increase" data-id="${producto.id}">+</button>
                          <button class="btn-decrease" data-id="${producto.id}">-</button>
                          <button class="btn-remove" data-id="${producto.id}">Eliminar</button>`;
        cartContainer.appendChild(card);
    });
    addCartButtonEvents();
}


function addCartButtonEvents() {
   
    document.querySelectorAll(".btn-increase").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            const product = cartStorage.find(p => p.id == productId);
            product.cantidad++;
            localStorage.setItem("productosCarro", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        };
    });

    
    document.querySelectorAll(".btn-decrease").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            const product = cartStorage.find(p => p.id == productId);
            if (product.cantidad > 1) {
                product.cantidad--;
            } else {
                
                cartStorage = cartStorage.filter(p => p.id != productId);
            }
            localStorage.setItem("productosCarro", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        };
    });

    
    document.querySelectorAll(".btn-remove").forEach(button => {
        button.onclick = (e) => {
            const productId = e.target.dataset.id;
            cartStorage = cartStorage.filter(p => p.id != productId); 
            localStorage.setItem("productosCarro", JSON.stringify(cartStorage));
            renderCarrito(cartStorage);
        };
    });
}

renderCarrito(cartStorage);


