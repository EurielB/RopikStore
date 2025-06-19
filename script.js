// Variables globales
let carrito = [];
let total = 0;

// Elementos del DOM
const carritoIcon = document.querySelector('.cart-icon');
const carritoSidebar = document.querySelector('.carrito-sidebar');
const carritoItems = document.querySelector('.carrito-items');
const totalElement = document.getElementById('total');
const cartCount = document.querySelector('.cart-count');

// Mostrar/ocultar carrito
carritoIcon.addEventListener('click', () => {
    carritoSidebar.classList.toggle('active');
});

// Agregar productos al carrito
document.querySelectorAll('.btn-agregar').forEach(button => {
    button.addEventListener('click', (e) => {
        const producto = e.target.parentElement;
        const nombre = producto.querySelector('h3').textContent;
        const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
        
        agregarAlCarrito(nombre, precio);
        actualizarCarrito();
    });
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const itemExistente = carrito.find(item => item.nombre === nombre);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
}

// Función para actualizar el carrito
function actualizarCarrito() {
    carritoItems.innerHTML = '';
    total = 0;
    
    carrito.forEach(item => {
        const itemTotal = item.precio * item.cantidad;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.classList.add('carrito-item');
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.nombre}</h4>
                <p>$${item.precio} x ${item.cantidad}</p>
            </div>
            <div class="item-actions">
                <button class="btn-eliminar" data-nombre="${item.nombre}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        carritoItems.appendChild(itemElement);
    });
    
    totalElement.textContent = total.toFixed(3);
    cartCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            const nombre = e.target.closest('.btn-eliminar').dataset.nombre;
            eliminarDelCarrito(nombre);
            actualizarCarrito();
        });
    });
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
}

// Botón de comprar
document.querySelector('.btn-comprar').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    alert('¡Gracias por tu compra!');
    carrito = [];
    actualizarCarrito();
    carritoSidebar.classList.remove('active');
});

// Funcionalidad de filtrado
document.addEventListener('DOMContentLoaded', function() {
    const filtroCategoria = document.getElementById('filtro-categoria');
    const filtroPrenda = document.getElementById('filtro-prenda');
    const productos = document.querySelectorAll('.producto-card');

    function aplicarFiltros() {
        const categoriaSeleccionada = filtroCategoria.value;
        const prendaSeleccionada = filtroPrenda.value;

        productos.forEach(producto => {
            const categoria = producto.getAttribute('data-categoria');
            const prenda = producto.getAttribute('data-prenda');

            const coincideCategoria = categoriaSeleccionada === 'todos' || categoria === categoriaSeleccionada;
            const coincidePrenda = prendaSeleccionada === 'todos' || prenda === prendaSeleccionada;

            if (coincideCategoria && coincidePrenda) {
                producto.classList.remove('hidden');
            } else {
                producto.classList.add('hidden');
            }
        });
    }

    // Agregar event listeners a los selectores
    filtroCategoria.addEventListener('change', aplicarFiltros);
    filtroPrenda.addEventListener('change', aplicarFiltros);
});

// Funcionalidad del contador regresivo
function actualizarCountdown() {
    const countdownPrincipal = document.getElementById('countdown-principal');
    if (countdownPrincipal) {
        const fechaFin = new Date('2025-06-26T23:59:59').getTime(); 
        let intervalo;
        
        function actualizar() {
            const ahora = new Date().getTime();
            const diferencia = fechaFin - ahora;

            if (diferencia < 0) {
                clearInterval(intervalo);
                countdownPrincipal.innerHTML = '<div class="countdown-item">¡Oferta Finalizada!</div>';
                return;
            }

            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            const diasElement = countdownPrincipal.querySelector('.dias');
            const horasElement = countdownPrincipal.querySelector('.horas');
            const minutosElement = countdownPrincipal.querySelector('.minutos');
            const segundosElement = countdownPrincipal.querySelector('.segundos');

            if (diasElement) diasElement.textContent = String(dias).padStart(2, '0');
            if (horasElement) horasElement.textContent = String(horas).padStart(2, '0');
            if (minutosElement) minutosElement.textContent = String(minutos).padStart(2, '0');
            if (segundosElement) segundosElement.textContent = String(segundos).padStart(2, '0');
        }

        actualizar();
        intervalo = setInterval(actualizar, 1000);
    }

    // Actualizar contadores de productos individuales
    const countdownProductos = document.querySelectorAll('.countdown-producto');
    countdownProductos.forEach(elemento => {
        const fechaFin = new Date(elemento.dataset.end).getTime();
        let intervaloProducto;
        
        function actualizarProducto() {
            const ahora = new Date().getTime();
            const diferencia = fechaFin - ahora;

            if (diferencia < 0) {
                clearInterval(intervaloProducto);
                elemento.textContent = 'Oferta finalizada';
                const card = elemento.closest('.producto-card');
                if (card) card.style.opacity = '0.5';
                return;
            }

            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

            if (dias > 0) {
                elemento.textContent = `${dias} día${dias !== 1 ? 's' : ''}`;
            } else if (horas > 0) {
                elemento.textContent = `${horas} hora${horas !== 1 ? 's' : ''}`;
            } else if (minutos > 0) {
                elemento.textContent = `${minutos} minuto${minutos !== 1 ? 's' : ''}`;
            } else {
                elemento.textContent = '¡Últimos minutos!';
            }
        }

        actualizarProducto();
        intervaloProducto = setInterval(actualizarProducto, 1000); // Actualizar cada segundo
    });
}

// Llamar a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    actualizarCountdown();
    // ... existing code ...
});

// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const formularioContacto = document.querySelector('.contacto-formulario form');
    
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const nombre = this.querySelector('input[name="nombre"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const telefono = this.querySelector('input[name="telefono"]').value;
            const asunto = this.querySelector('select[name="asunto"]').value;
            const mensaje = this.querySelector('textarea[name="mensaje"]').value;
            
            // Validación básica
            if (!nombre || !email || !telefono || !asunto || !mensaje) {
                alert('Por favor, complete todos los campos del formulario.');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, ingrese un email válido.');
                return;
            }
            
            // Validación de teléfono (solo números y algunos caracteres especiales)
            const telefonoRegex = /^[0-9+\-\s()]{8,15}$/;
            if (!telefonoRegex.test(telefono)) {
                alert('Por favor, ingrese un número de teléfono válido.');
                return;
            }
            
            // Aquí iría el código para enviar el formulario al servidor
            // Por ahora, solo mostraremos un mensaje de éxito
            alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }
    
    // Funcionalidad del modal de login/registro
    const modal = document.getElementById('modal-login');
    const btnLogin = document.querySelector('.btn-login');
    const closeBtn = document.querySelector('.close');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    // Abrir modal
    if (btnLogin) {
        btnLogin.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        });
    }

    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            limpiarMensajes();
        });
    }

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            limpiarMensajes();
        }
    });

    // Cambiar entre formularios
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
            limpiarMensajes();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
            limpiarMensajes();
        });
    }

    // Manejo del formulario de login
    if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validación básica
            if (!email || !password) {
                mostrarMensaje('Por favor, complete todos los campos.', 'error');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarMensaje('Por favor, ingrese un email válido.', 'error');
                return;
            }
            
            // Simular login exitoso
            mostrarMensaje('¡Inicio de sesión exitoso!', 'success');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                btnLogin.textContent = 'Mi Cuenta';
                btnLogin.style.backgroundColor = '#4CAF50';
                limpiarMensajes();
                formLogin.reset();
            }, 1500);
        });
    }

    // Manejo del formulario de registro
    if (formRegister) {
        formRegister.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('register-nombre').value;
            const email = document.getElementById('register-email').value;
            const telefono = document.getElementById('register-telefono').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Validación básica
            if (!nombre || !email || !telefono || !password || !confirmPassword) {
                mostrarMensaje('Por favor, complete todos los campos.', 'error');
                return;
            }
            
            // Validación de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                mostrarMensaje('Por favor, ingrese un email válido.', 'error');
                return;
            }
            
            // Validación de teléfono
            const telefonoRegex = /^[0-9+\-\s()]{8,15}$/;
            if (!telefonoRegex.test(telefono)) {
                mostrarMensaje('Por favor, ingrese un número de teléfono válido.', 'error');
                return;
            }
            
            // Validación de contraseña
            if (password.length < 6) {
                mostrarMensaje('La contraseña debe tener al menos 6 caracteres.', 'error');
                return;
            }
            
            // Validación de confirmación de contraseña
            if (password !== confirmPassword) {
                mostrarMensaje('Las contraseñas no coinciden.', 'error');
                return;
            }
            
            // Validación de términos
            if (!terms) {
                mostrarMensaje('Debe aceptar los términos y condiciones.', 'error');
                return;
            }
            
            // Simular registro exitoso
            mostrarMensaje('¡Cuenta creada exitosamente!', 'success');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                btnLogin.textContent = 'Mi Cuenta';
                btnLogin.style.backgroundColor = '#4CAF50';
                limpiarMensajes();
                formRegister.reset();
            }, 1500);
        });
    }

    // Funciones auxiliares
    function mostrarMensaje(mensaje, tipo) {
        limpiarMensajes();
        
        const mensajeElement = document.createElement('div');
        mensajeElement.className = `auth-message ${tipo}`;
        mensajeElement.textContent = mensaje;
        
        const formActivo = document.querySelector('.auth-form.active');
        formActivo.insertBefore(mensajeElement, formActivo.querySelector('form'));
    }

    function limpiarMensajes() {
        const mensajes = document.querySelectorAll('.auth-message');
        mensajes.forEach(mensaje => mensaje.remove());
    }
}); 