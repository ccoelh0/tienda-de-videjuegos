$(document).ready(function () {
  $("#form").submit(enviarForm);

  function enviarForm(e) {
    e.preventDefault();
    const URL = "https://jsonplaceholder.typicode.com/posts";
    const obj = {
      nombre: $("#name").val(),
      email: $("#email").val(),
      mensaje: $("#msj").val(),
    };
    $.post(URL, obj, function (data) {
      console.log(
        "su informacion ha sido enviada ",
        data.nombre,
        ", su ID es:",
        data.id
      );
      $("#boton-enviar").hide();
      $("#mensajeEnviado").show("slow");

      setTimeout(() => {
        $("#boton-enviar").show();
        $("#name").val("");
        $("#email").val("");
        $("#msj").val("");
        $("#mensajeEnviado").hide("slow");
      }, 3000);
    });
  }
});
