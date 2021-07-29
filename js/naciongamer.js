let carrito = [];

$(document).ready(function () {
  function addLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  window.onload = function () {
    const storage = JSON.parse(localStorage.getItem("carrito"));
    if (storage) {
      carrito = storage;
      crearCarrito();
    }
  };

  const btn = $(".botonCarrito");

  for (let i = 0; i < btn.length; i++) {
    $(btn[i]).click((e) => {
      verValores(e, i);
    });
  }

  function verValores(ev, i) {
    ev.preventDefault();
    let nodoTitulo = $(".card-title");
    let titulo = $(nodoTitulo[i]).text();
    let nodoPrecio = $(".precio");
    let precio = $(nodoPrecio[i]).text();
    let img = $(nodoTitulo[i]).parent().children()[0].src;

    const nuevoProducto = {
      titulo: titulo,
      precio: precio,
      imagen: img,
      cantidad: 1,
    };

    anadirLosProductosAlCarrito(nuevoProducto);
  }

  function anadirLosProductosAlCarrito(nuevoProducto) {
    const inputElemento = $(".tbody .input__elemento");
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].titulo.trim() === nuevoProducto.titulo.trim()) {
        carrito[i].cantidad++;
        const inputValue = inputElemento[i];
        inputValue.value++;
        carritoTotal();
        return null;
      }
    }

    carrito.push(nuevoProducto);
    crearCarrito();
  }

  function crearCarrito() {
    const tablaBody = $(".tbody");
    tablaBody.html("");
    carrito.map((item) => {
      $(".tbody").append(`<tr class='itemCarrito'>

       <th scope="row">1</th>
              <td class="table__productos">
                 <img src=${item.imagen} alt="imagen del producto">
               </td>
               <td>
               <h6 class="title">${item.titulo}</h6></td>
               <td class="table__price"><p class='tabla-precio-interior'>${item.precio}</p></td>
               <td class="table__cantidad">
                 <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                 <button class="delete btn btn-danger">x</button>
               </td>

       </tr>`);
      $(".tbody tr .delete").click(removerItemCarrito);
      $(".tbody tr .input__elemento").change(sumaCantidad);
    });
    carritoTotal();
  }

  function carritoTotal() {
    let total = 0;
    const itemCartTotal = $(".itemCartTotal");
    carrito.forEach((item) => {
      const precio = Number(item.precio.replace("$", ""));
      total = total + precio * item.cantidad;
    });

    itemCartTotal.html(`Total $${total}`);
    addLocalStorage();
  }

  function removerItemCarrito(e) {
    const botonBorrar = e.target;
    const tr = botonBorrar.closest(".itemCarrito");
    const titulo = tr.querySelector(".title").textContent;
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].titulo.trim() === titulo.trim()) {
        carrito.splice(i, 1);
      }
    }
    tr.remove();
    carritoTotal();
  }

  function sumaCantidad(e) {
    const sumaInput = e.target;
    const tr = sumaInput.closest(".itemCarrito");
    const title = tr.querySelector(".title").textContent;
    carrito.forEach((item) => {
      if (item.titulo.trim() === title) {
        sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
        item.cantidad = sumaInput.value;
        carritoTotal();
      }
    });
  }

  $("#botonFinalizarCompra").click(finalizarCompra);
  function finalizarCompra(e) {
    e.preventDefault();
    if (carrito.length != 0) {
      $("#compraRealizada").slideDown(300);
      setTimeout(() => {
        $("#compraRealizada").hide("slow");
      }, 5000);
      while (localStorage != 0) {
        localStorage.clear();
        const tr = document.querySelector(".itemCarrito");
        const titulo = tr.querySelector(".title").textContent;
        for (let i = 0; i < carrito.length; i++) {
          if (carrito[i].titulo.trim() === titulo.trim()) {
            carrito.splice(i, 1);
          }
        }
        tr.remove();
        carritoTotal();
      }
    } else {
      $("#compraRechazada").show(300);
      setTimeout(() => {
        $("#compraRechazada").hide("slow");
      }, 5000);
    }
  }
});
