//PARA VERIFICAR SI EXISTEN LOS ID
document.addEventListener("DOMContentLoaded", function() {
	//******************************PAGINA TIENDA***************************//
	iniciarCarrito();


	function iniciarCarrito() {
		const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
		let total = carrito.reduce((acc, item) => acc + item.valor, 0);

		mostrarCarrito();

		const botonesCompra = document.querySelectorAll('.compra');

		botonesCompra.forEach(boton => {
			boton.addEventListener('click', () => {
				const valor = parseInt(boton.value);
				const titulo = boton.dataset.titulo;
				carrito.push({ titulo, valor });
				total += valor;
				localStorage.setItem('carrito', JSON.stringify(carrito));
				mostrarCarrito();
			});
		});

		function mostrarCarrito() {
			const listaCarrito = document.getElementById('carrito');
			const totalElement = document.getElementById('total');
			let carritoHTML = "";

			if (listaCarrito && totalElement) { // Verificar que los elementos existan en la página antes de continuar
				if (carrito.length > 0) {
					carrito.forEach((item, index) => {
						carritoHTML += `
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">${item.titulo}</h6>
                        </div>
                        <span class="text-muted">${item.valor} €</span>
                        <button class="btn btn-sm btn-danger eliminar-item" data-indice="${index}">Eliminar</button>
                    </li>
                `;
					});
				} else {
					carritoHTML += "<p>No hay artículos en el carrito.</p>";
				}

				listaCarrito.innerHTML = carritoHTML;
				totalElement.textContent = `${total} €`;

				// Escuchar eventos de clic en los botones de eliminar
				const botonesEliminar = document.querySelectorAll('.eliminar-item');
				botonesEliminar.forEach(boton => {
					boton.addEventListener('click', () => {
						const indice = boton.dataset.indice;
						// Eliminar el elemento correspondiente del carrito
						carrito.splice(indice, 1);
						// Actualizar el contenido del carrito en el almacenamiento local
						localStorage.setItem('carrito', JSON.stringify(carrito));
						// Volver a mostrar el carrito
						mostrarCarrito();
					});
				});
			}
		}


		//******************************PAGINA COMPRA**************************//

		//*BOTON FORMULARIO */

		// Verificar si el elemento "siguiente" existe antes de agregar el event listener
		var siguienteBtn = document.getElementById("siguiente");
		if (siguienteBtn) {
			siguienteBtn.addEventListener("click", function() {
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
		}



		/*BOTON BORRAR FORMULARIO*/

		var borrarBtn = document.getElementById("borrar");
		if (borrarBtn) {
			borrarBtn.addEventListener("click", function() {
				document.getElementById("inputNombre").value = "";
				document.getElementById("inputApellidos").value = "";
				document.getElementById("inputEmail4").value = "";
				document.getElementById("inputAddress").value = "";
				document.getElementById("inputAddress2").value = "";
				document.getElementById("inputState").value = "";
				document.getElementById("inputZip").value = "";
				document.getElementById("inputCity").value = "";
			});
		}
		//***********************PAGINA PAGO.HTML******************************//

		/*Boton pago*/
		var pagoBtn = document.getElementById("pago");
		if (pagoBtn) {
			pagoBtn.addEventListener("click", function() {
				// Obtener los valores de los campos de entrada
				var numeroTarjeta = document.getElementById("numero_tarjeta").value;
				var mesVencimiento = document.getElementById("mes").value;
				var anoVencimiento = document.getElementById("ano").value;
				var cvv = document.getElementById("ccv").value;
				var nombreTarjeta = document.getElementById("nombre_tarjeta").value;

				// Expresión regular para verificar que solo se ingresen números
				var regexNumeros = /^\d+$/;

				// Verificar que el número de tarjeta contenga solo números  y tener 16 numeros
				if (!regexNumeros.test(numeroTarjeta) || numeroTarjeta.length !== 16) {
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

				alert("¡Pago procesado correctamente!");
			});
		}
		//BOTON BORRAR CELDAS PAGO
		// Verificar si el elemento "cancelar" existe antes de agregar el event listener
		// Verificar si el elemento "cancelar" existe antes de agregar el event listener
		var cancelarBtn = document.getElementById("cancelar");
		if (cancelarBtn) {
			cancelarBtn.addEventListener("click", function() {
				document.getElementById("numero_tarjeta").value = "";
				document.getElementById("mes").value = "";
				document.getElementById("ano").value = "";
				document.getElementById("ccv").value = "";
				document.getElementById("nombre_tarjeta").value = "";
			});
		}
	}});
