//******************************PAGINA TIENDA***************************//



//******************************PAGINA COMPRA**************************//

//*BOTON FORMULARIO */
document.getElementById("siguiente").addEventListener("click", function() {
    var nombre = document.getElementById("inputNombre").value.trim();
    var apellidos = document.getElementById("inputApellidos").value.trim();
    var direccion = document.getElementById("inputAddress").value.trim();
    var ciudad = document.getElementById("inputCity").value.trim();
    var cp = document.getElementById("inputZip").value.trim();
    var provincia = document.getElementById("inputState").value.trim();
    var aceptarTerminos = document.getElementById("aceptarTerminos").checked;

    if (nombre === "" || apellidos === "" || direccion === "" || ciudad === "" || cp === "" || provincia === "" || !aceptarTerminos) {
        alert("Por favor complete todos los campos requeridos (Nombre, Apellidos, Dirección, Ciudad, CP y Provincia) y acepte los términos y condiciones para proceder al pago.");
        return; // Detener la ejecución del código si falta algún campo o no se han aceptado los términos y condiciones
    }

    // Si todos los campos están completos y se han aceptado los términos y condiciones, continuar con la redirección
    window.location.href = "pago.html";
});



/*BOTON BORRAR FORMULARIO*/

document.getElementById("borrar").addEventListener("click", function() {
	document.getElementById("inputNombre").value = "";
	document.getElementById("inputApellidos").value = "";
	document.getElementById("inputEmail4").value = "";
	document.getElementById("inputAddress").value = "";
	document.getElementById("inputAddress2").value = "";
	document.getElementById("inputState").value = "";
	document.getElementById("inputZip").value = "";
	document.getElementById("inputCity").value = "";

});

//***********************PAGINA PAGO.HTML******************************//

/*Boton pago*/
document.getElementById("pago").addEventListener("click", function() {
	// Obtener los valores de los campos de entrada
	var numeroTarjeta = document.getElementById("numero_tarjeta").value;
	var mesVencimiento = document.getElementById("mes").value;
	var anoVencimiento = document.getElementById("ano").value;
	var cvv = document.getElementById("ccv").value;
	var nombreTarjeta = document.getElementById("nombre_tarjeta").value;

	// Expresión regular para verificar que solo se ingresen números
	var regexNumeros = /^\d+$/;

	// Verificar que el número de tarjeta contenga solo números  y tener 16 numeros
	if (!regexNumeros.test(numeroTarjeta) || numeroTarjeta.length !==16) {
		alert("El número de tarjeta debe contener solo números y tener 16 numeros.");
		return; // Detener la ejecución del código si el número de tarjeta no es válido
	}

	// Verificar que el mes de vencimiento contenga solo números y esté en el rango válido (01-12)
	if (!regexNumeros.test(mesVencimiento) || parseInt(mesVencimiento) < 1 || parseInt(mesVencimiento) > 12) {
		alert("El mes de vencimiento debe contener solo números y estar en el rango válido (01-12).");
		return; // Detener la ejecución del código si el mes de vencimiento no es válido
	}

	// Verificar que el año de vencimiento contenga solo números y tenga 4 caracteres
	if (!regexNumeros.test(anoVencimiento) || anoVencimiento.length !== 4) {
		alert("El año de vencimiento debe contener solo números y tener 4 caracteres.");
		return; // Detener la ejecución del código si el año de vencimiento no es válido
	}

	// Verificar que el CVV contenga solo números y tenga exactamente 3 caracteres
	if (!regexNumeros.test(cvv) || cvv.length !== 3) {
		alert("El CVV debe contener solo números y tener exactamente 3 caracteres.");
		return; // Detener la ejecución del código si el CVV no es válido
	}

	// Verificar que se haya ingresado un nombre de tarjeta
	if (nombreTarjeta.trim() === "") {
		alert("Por favor, ingrese el nombre de la tarjeta.");
		return; // Detener la ejecución del código si el campo del nombre de tarjeta está vacío
	}

	// Verificar si la tarjeta está caducada
	var fechaActual = new Date();
	var mesActual = fechaActual.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
	var anoActual = fechaActual.getFullYear();

	if (anoActual > parseInt(anoVencimiento) || (anoActual == parseInt(anoVencimiento) && mesActual > parseInt(mesVencimiento))) {
		alert("La tarjeta está caducada. Por favor, introduzca una tarjeta válida.");
		return; // Detener la ejecución del código si la tarjeta está caducada
	}

	// Resto del código para procesar el pago
	// Aquí podrías agregar el código para enviar los detalles del pago al servidor, etc.
	alert("¡Pago procesado correctamente!");
});


/*Boton cancelar */
document.getElementById("cancelar").addEventListener("click", function() {
	document.getElementById("numero_tarjeta").value = "";
	document.getElementById("mes").value = "";
	document.getElementById("ano").value = "";
	document.getElementById("ccv").value = "";
	document.getElementById("nombre_tarjeta").value = "";
});
