$(document).ready(function () {
  ////Nav scroll:

  const nav = document.getElementById("navegador");

  function scrollNav() {
    "use strict";
    if (
      document.body.scrollTop >= 280 ||
      document.documentElement.scrollTop >= 280
    ) {
      nav.classList.add("menu-scroll");
    } else {
      nav.classList.remove("menu-scroll");
    }
  }

  window.onscroll = scrollNav;

  const btn = $(".botonCarrito");

  for (let i = 0; i < btn.length; i++) {
    $(btn[i]).click((e) => {
      console.log(btn[i]);
      productoAgregado(e, i);
    });
  }

  function productoAgregado(e, i) {
    let btnNodo = $(".botonCarrito");
    let msjNodo = $(".confirmacionCarrito");
    let btn = $(btnNodo[i]).hide();
    let msj = $(msjNodo[i]).slideDown("slow");

    setTimeout(() => {
      let btn = $(btnNodo[i]).slideDown("slow");
      let msj = $(msjNodo[i]).hide();
    }, 3000);
  }
});
