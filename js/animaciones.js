$(document).ready(function () {
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
      productoAgregado(e, i);
    });
  }

  function productoAgregado(e, i) {
    let btnNodo = $(".botonCarrito");
    let msjNodo = $(".confirmacionCarrito");
    $(btnNodo[i]).hide();
    $(msjNodo[i]).slideDown("slow");

    setTimeout(() => {
      $(btnNodo[i]).slideDown("slow");
      $(msjNodo[i]).hide();
    }, 3000);
  }
});
