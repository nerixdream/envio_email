//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

//Expresion regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
	document.addEventListener('DOMContentLoaded', iniciarApp);

	//Valida los campos
	email.addEventListener('blur', validarFormulario);
	asunto.addEventListener('blur', validarFormulario);
	mensaje.addEventListener('blur', validarFormulario);

	//Boton reset
	btnReset.addEventListener('click', resetFormulario);

	//Enviar email
	formulario.addEventListener('submit', enviarEmail);
}

//Funciones
function iniciarApp() {
	email.disabled = false;
	asunto.disabled = false;
	mensaje.disabled = false;
	btnReset.disabled = false;

	btnEnviar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(e) {
	if (e.target.value.length > 0) {
		//Elimina los errores mostrados en el DOM
		const error = document.querySelector('p.error');
		if (error) {
			error.remove();
		}

		e.target.classList.remove('border', 'border-red-500');
		e.target.classList.add('border', 'border-blue-500');
	} else {
		e.target.classList.remove('border', 'border-blue-500');
		e.target.classList.add('border', 'border-red-500');
		mensajeError('Todos los campos son obligatorios');
	}

	//Valida campo de email
	if (e.target.type === 'email') {
		if (er.test(e.target.value)) {
			console.log('Email válido');
		} else {
			mensajeError('Email no válido');
		}
	}

	if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
		btnEnviar.disabled = false;
		btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
	} else {
		btnEnviar.disabled = true;
		btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
	}
}

//Muestra un error si la validación no pasa
function mensajeError(mensaje) {
	const mensajeError = document.createElement('p');
	mensajeError.textContent = mensaje;
	mensajeError.classList.add(
		'border',
		'border-red-500',
		'background-red-100',
		'text-red-500',
		'text-center',
		'mt-5',
		'p-3',
		'error'
	);

	const errores = document.querySelectorAll('.error');

	if (errores.length === 0) {
		formulario.appendChild(mensajeError);
	}
}

//Enviar email
function enviarEmail(e) {
	e.preventDefault();

	email.disabled = true;
	asunto.disabled = true;
	mensaje.disabled = true;
	btnReset.disabled = true;

	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	setTimeout(() => {
		spinner.style.display = 'none';
		const enviado = document.createElement('p');
		enviado.textContent = 'Mensaje enviado correctamente';
		enviado.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

		formulario.insertBefore(enviado, spinner);

		setTimeout(() => {
			enviado.remove();
			resetFormulario();
		}, 3000);
	}, 3000);
}

//Resetear formulario
function resetFormulario() {
	const error = document.querySelector('p.error');
	if (error) {
		error.remove();
	}

	formulario.reset();

	iniciarApp();
}
