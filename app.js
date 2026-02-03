// ======================================
// 1. ORIENTACIÓN A OBJETOS EN JAVASCRIPT
// ======================================

/**
 * Clase Tarea - Representa una tarea individual
 * Aplica POO con propiedades y métodos
 */
class Tarea {
    constructor(descripcion, fechaLimite = null) {
        this.id = Date.now() + Math.random(); // ID único
        this.descripcion = descripcion;
        this.estado = 'pendiente'; // 'pendiente' o 'completada'
        this.fechaCreacion = new Date();
        this.fechaLimite = fechaLimite ? new Date(fechaLimite) : null;
    }

    /**
     * Método para cambiar el estado de la tarea
     */
    cambiarEstado() {
        this.estado = this.estado === 'pendiente' ? 'completada' : 'pendiente';
        return this.estado;
    }

    /**
     * Método para editar la descripción de la tarea
     */
    editarDescripcion(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    /**
     * Método para obtener información de la tarea
     */
    obtenerInfo() {
        return {
            id: this.id,
            descripcion: this.descripcion,
            estado: this.estado,
            fechaCreacion: this.fechaCreacion,
            fechaLimite: this.fechaLimite
        };
    }

    /**
     * Método para verificar si la tarea está vencida
     */
    estaVencida() {
        if (!this.fechaLimite) return false;
        return new Date() > this.fechaLimite && this.estado === 'pendiente';
    }

    /**
     * Método para obtener tiempo restante
     */
    getTiempoRestante() {
        if (!this.fechaLimite) return null;
        const ahora = new Date();
        const diferencia = this.fechaLimite - ahora;
        
        if (diferencia <= 0) return 'Vencida';
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        
        if (dias > 0) return `${dias}d ${horas}h`;
        if (horas > 0) return `${horas}h ${minutos}m`;
        return `${minutos}m`;
    }
}

/**
 * Clase GestorTareas - Administra una lista de tareas
 * Implementa el patrón Singleton para una única instancia
 */
class GestorTareas {
    constructor() {
        this.tareas = [];
        this.filtroActual = 'all';
        this.cargarDesdeLStorage();
    }

    /**
     * Método para agregar una nueva tarea
     */
    agregarTarea(tarea) {
        this.tareas.push(tarea);
        this.guardarEnLStorage();
        return tarea;
    }

    /**
     * Método para eliminar una tarea por ID
     */
    eliminarTarea(id) {
        const index = this.tareas.findIndex(t => t.id === id);
        if (index !== -1) {
            const tareaEliminada = this.tareas.splice(index, 1)[0];
            this.guardarEnLStorage();
            return tareaEliminada;
        }
        return null;
    }

    /**
     * Método para obtener todas las tareas
     */
    obtenerTareas() {
        return [...this.tareas]; // Spread operator para clonar array
    }

    /**
     * Método para obtener tareas filtradas
     */
    obtenerTareasFiltradas(filtro = 'all') {
        switch (filtro) {
            case 'pending':
                return this.tareas.filter(t => t.estado === 'pendiente');
            case 'completed':
                return this.tareas.filter(t => t.estado === 'completada');
            default:
                return this.tareas;
        }
    }

    /**
     * Método para cambiar el estado de una tarea
     */
    cambiarEstadoTarea(id) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.cambiarEstado();
            this.guardarEnLStorage();
            return tarea;
        }
        return null;
    }

    /**
     * Método para editar una tarea
     */
    editarTarea(id, nuevaDescripcion) {
        const tarea = this.tareas.find(t => t.id === id);
        if (tarea) {
            tarea.editarDescripcion(nuevaDescripcion);
            this.guardarEnLStorage();
            return tarea;
        }
        return null;
    }

    /**
     * Método para obtener estadísticas
     */
    obtenerEstadisticas() {
        const total = this.tareas.length;
        const completadas = this.tareas.filter(t => t.estado === 'completada').length;
        const pendientes = total - completadas;
        
        return { total, completadas, pendientes };
    }

    // ======================================
    // 5. CONSUMO DE APIS CON JAVASCRIPT
    // ======================================

    /**
     * Guardar tareas en localStorage
     */
    guardarEnLStorage() {
        try {
            const tareasJSON = JSON.stringify(this.tareas.map(t => t.obtenerInfo()));
            localStorage.setItem('taskflow_tareas', tareasJSON);
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }

    /**
     * Cargar tareas desde localStorage
     */
    cargarDesdeLStorage() {
        try {
            const tareasJSON = localStorage.getItem('taskflow_tareas');
            if (tareasJSON) {
                const tareasData = JSON.parse(tareasJSON);
                this.tareas = tareasData.map(data => {
                    const tarea = new Tarea(data.descripcion, data.fechaLimite);
                    tarea.id = data.id;
                    tarea.estado = data.estado;
                    tarea.fechaCreacion = new Date(data.fechaCreacion);
                    if (data.fechaLimite) {
                        tarea.fechaLimite = new Date(data.fechaLimite);
                    }
                    return tarea;
                });
            }
        } catch (error) {
            console.error('Error al cargar desde localStorage:', error);
        }
    }

    /**
     * Cargar tareas desde API externa (JSONPlaceholder)
     */
    async cargarDesdeAPI() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const datos = await response.json();
            
            // Convertir datos de la API a formato de Tarea
            const nuevasTareas = datos.map(item => {
                const tarea = new Tarea(item.title);
                if (item.completed) {
                    tarea.cambiarEstado();
                }
                return tarea;
            });
            
            // Agregar las nuevas tareas
            this.tareas = [...this.tareas, ...nuevasTareas];
            this.guardarEnLStorage();
            
            return nuevasTareas;
        } catch (error) {
            console.error('Error al cargar desde API:', error);
            throw error;
        }
    }
}

// ======================================
// INSTANCIA GLOBAL DEL GESTOR
// ======================================

const gestor = new GestorTareas();

// ======================================
// 3. EVENTOS Y MANIPULACIÓN DEL DOM
// ======================================

/**
 * Función para mostrar notificación
 */
const mostrarNotificacion = (mensaje, tipo = 'success') => {
    const notificaciones = document.getElementById('notifications');
    const notificacion = document.createElement('div');
    notificacion.className = `notification notification-${tipo}`;
    notificacion.textContent = mensaje;
    
    notificaciones.appendChild(notificacion);
    
    // 4. JAVASCRIPT ASÍNCRONO - Notificación desaparece tras 2 segundos
    setTimeout(() => {
        notificacion.classList.add('fade-out');
        setTimeout(() => notificacion.remove(), 300);
    }, 2000);
};

/**
 * Función para renderizar una tarea en el DOM
 */
const renderizarTarea = (tarea) => {
    const tareaDiv = document.createElement('div');
    tareaDiv.className = `task-item ${tarea.estado}`;
    tareaDiv.dataset.id = tarea.id;
    
    // Usar template literals (ES6+)
    const tiempoRestante = tarea.getTiempoRestante();
    const esVencida = tarea.estaVencida();
    
    tareaDiv.innerHTML = `
        <div class="task-content">
            <input type="checkbox" 
                class="task-checkbox" 
                ${tarea.estado === 'completada' ? 'checked' : ''}>
            <span class="task-description ${tarea.estado === 'completada' ? 'completed' : ''}">
                ${tarea.descripcion}
            </span>
            ${tiempoRestante ? `
                <span class="task-deadline ${esVencida ? 'expired' : ''}">
                    ⏰ ${tiempoRestante}
                </span>
            ` : ''}
        </div>
        <div class="task-actions">
            <button class="btn-icon btn-edit" title="Editar">✏️</button>
            <button class="btn-icon btn-delete" title="Eliminar">🗑️</button>
        </div>
    `;
    
    // Eventos de la tarea
    const checkbox = tareaDiv.querySelector('.task-checkbox');
    const btnDelete = tareaDiv.querySelector('.btn-delete');
    const btnEdit = tareaDiv.querySelector('.btn-edit');
    const taskDescription = tareaDiv.querySelector('.task-description');
    
    // Evento: Cambiar estado
    checkbox.addEventListener('change', () => {
        gestor.cambiarEstadoTarea(tarea.id);
        taskDescription.classList.toggle('completed');
        tareaDiv.classList.toggle('completada');
        mostrarNotificacion(
            `Tarea marcada como ${tarea.estado}`,
            'success'
        );
    });
    
    // Evento: Eliminar tarea
    btnDelete.addEventListener('click', () => {
        tareaDiv.classList.add('fade-out');
        setTimeout(() => {
            gestor.eliminarTarea(tarea.id);
            actualizarVista();
            mostrarNotificacion('Tarea eliminada', 'info');
        }, 300);
    });
    
    // Evento: Editar tarea
    btnEdit.addEventListener('click', () => {
        const nuevaDescripcion = prompt('Editar tarea:', tarea.descripcion);
        if (nuevaDescripcion && nuevaDescripcion.trim()) {
            gestor.editarTarea(tarea.id, nuevaDescripcion.trim());
            actualizarVista();
            mostrarNotificacion('Tarea editada correctamente', 'success');
        }
    });
    
    // Evento: Mouseover para destacar (interactividad)
    tareaDiv.addEventListener('mouseover', () => {
        tareaDiv.style.transform = 'translateX(5px)';
    });
    
    tareaDiv.addEventListener('mouseout', () => {
        tareaDiv.style.transform = 'translateX(0)';
    });
    
    return tareaDiv;
};

/**
 * Función para actualizar la vista de tareas
 */
const actualizarVista = () => {
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    
    // Obtener tareas filtradas
    const tareas = gestor.obtenerTareasFiltradas(gestor.filtroActual);
    
    // Limpiar lista
    tasksList.innerHTML = '';
    
    if (tareas.length === 0) {
        emptyState.style.display = 'block';
        tasksList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        tasksList.style.display = 'block';
        
        // Renderizar cada tarea (usando spread y destructuring)
        tareas.forEach(tarea => {
            const tareaElement = renderizarTarea(tarea);
            tasksList.appendChild(tareaElement);
        });
    }
};

// ======================================
// 4. JAVASCRIPT ASÍNCRONO
// ======================================

/**
 * Función asíncrona para agregar tarea con retardo simulado
 */
const agregarTareaConRetardo = async (descripcion, fechaLimite) => {
    return new Promise((resolve) => {
        // Simular retardo de red
        setTimeout(() => {
            const tarea = new Tarea(descripcion, fechaLimite);
            gestor.agregarTarea(tarea);
            resolve(tarea);
        }, 500); // Retardo de 500ms
    });
};

/**
 * Iniciar contador regresivo para tareas con fecha límite
 */
const iniciarContadorRegresivo = () => {
    setInterval(() => {
        const tareas = gestor.obtenerTareas();
        tareas.forEach(tarea => {
            if (tarea.fechaLimite && tarea.estado === 'pendiente') {
                const elemento = document.querySelector(`[data-id="${tarea.id}"] .task-deadline`);
                if (elemento) {
                    const tiempoRestante = tarea.getTiempoRestante();
                    elemento.textContent = `⏰ ${tiempoRestante}`;
                    
                    if (tarea.estaVencida()) {
                        elemento.classList.add('expired');
                    }
                }
            }
        });
    }, 60000); // Actualizar cada minuto
};

// ======================================
// EVENTOS DEL FORMULARIO
// ======================================

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskDescription = document.getElementById('taskDescription');
    const taskDeadline = document.getElementById('taskDeadline');
    const charCount = document.getElementById('charCount');
    const filterButtons = document.querySelectorAll('.btn-filter');
    const loadFromAPIBtn = document.getElementById('loadFromAPI');
    const saveToLocalStorageBtn = document.getElementById('saveToLocalStorage');
    
    // 2. CARACTERÍSTICAS JAVASCRIPT ES6+
    // Evento: Submit del formulario (usando arrow function)
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Destructuring del form
        const { taskDescription: descInput, taskDeadline: deadlineInput } = e.target.elements;
        
        const descripcion = descInput.value.trim();
        const fechaLimite = deadlineInput.value || null;
        
        if (descripcion) {
            try {
                // Agregar tarea con retardo (asíncrono)
                await agregarTareaConRetardo(descripcion, fechaLimite);
                
                actualizarVista();
                taskForm.reset();
                charCount.textContent = '0 caracteres';
                
                // Notificación tras 2 segundos
                mostrarNotificacion('✅ Tarea agregada exitosamente', 'success');
                
            } catch (error) {
                mostrarNotificacion('❌ Error al agregar tarea', 'error');
            }
        }
    });
    
    // Evento: Keyup para contador de caracteres (interactividad)
    taskDescription.addEventListener('keyup', (e) => {
        const length = e.target.value.length;
        charCount.textContent = `${length} caracteres`;
        
        if (length > 100) {
            charCount.style.color = '#e74c3c';
        } else {
            charCount.style.color = '#7f8c8d';
        }
    });
    
    // Eventos: Filtros de tareas
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover clase active de todos los botones
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            e.target.classList.add('active');
            
            // Actualizar filtro
            gestor.filtroActual = e.target.dataset.filter;
            actualizarVista();
        });
    });
    
    // Evento: Cargar tareas desde API
    loadFromAPIBtn.addEventListener('click', async () => {
        try {
            loadFromAPIBtn.disabled = true;
            loadFromAPIBtn.textContent = 'Cargando...';
            
            const nuevasTareas = await gestor.cargarDesdeAPI();
            actualizarVista();
            
            mostrarNotificacion(
                `✅ ${nuevasTareas.length} tareas cargadas desde la API`,
                'success'
            );
        } catch (error) {
            mostrarNotificacion('❌ Error al cargar tareas de la API', 'error');
        } finally {
            loadFromAPIBtn.disabled = false;
            loadFromAPIBtn.textContent = 'Cargar Tareas de JSONPlaceholder';
        }
    });
    
    // Evento: Guardar manualmente en localStorage
    saveToLocalStorageBtn.addEventListener('click', () => {
        gestor.guardarEnLStorage();
        mostrarNotificacion('💾 Tareas guardadas en LocalStorage', 'success');
    });
    
    // Inicializar vista
    actualizarVista();
    
    // Iniciar contador regresivo
    iniciarContadorRegresivo();
    
    // Mensaje de bienvenida
    console.log('🚀 TaskFlow iniciado correctamente');
    console.log('📊 Estadísticas:', gestor.obtenerEstadisticas());
});
