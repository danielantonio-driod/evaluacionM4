# 📋 TaskFlow - Aplicación de Gestión de Tareas

## 🎯 Descripción del Proyecto

**TaskFlow** es una aplicación web interactiva para gestionar tareas de manera eficiente, desarrollada con JavaScript moderno (ES6+). Implementa principios de Programación Orientada a Objetos, manipulación del DOM, eventos, asincronía y consumo de APIs.

## ✨ Características Implementadas

### 1️⃣ Orientación a Objetos en JavaScript

- **Clase `Tarea`**: Representa una tarea individual con propiedades:
  - `id`: Identificador único
  - `descripcion`: Texto de la tarea
  - `estado`: Estado actual ('pendiente' o 'completada')
  - `fechaCreacion`: Fecha de creación automática
  - `fechaLimite`: Fecha límite opcional
  
  Métodos implementados:
  - `cambiarEstado()`: Alterna entre pendiente y completada
  - `editarDescripcion()`: Modifica la descripción
  - `obtenerInfo()`: Retorna la información de la tarea
  - `estaVencida()`: Verifica si la tarea está vencida
  - `getTiempoRestante()`: Calcula el tiempo restante

- **Clase `GestorTareas`**: Administra la lista completa de tareas
  - Gestión completa de tareas (agregar, eliminar, editar)
  - Filtrado de tareas (todas, pendientes, completadas)
  - Persistencia en localStorage
  - Carga desde API externa

### 2️⃣ Características JavaScript ES6+

- ✅ **let y const** en lugar de var
- ✅ **Template literals** para strings dinámicos
- ✅ **Arrow functions** para funciones concisas
- ✅ **Destructuring** para extraer valores
- ✅ **Spread operator** (...) para clonar arrays
- ✅ **Async/Await** para operaciones asíncronas
- ✅ **Clases** con sintaxis moderna

### 3️⃣ Eventos y Manipulación del DOM

- **Eventos implementados**:
  - `submit`: Envío del formulario para crear tareas
  - `click`: Eliminación, edición y cambio de estado
  - `change`: Checkbox para completar tareas
  - `keyup`: Contador de caracteres en tiempo real
  - `mouseover/mouseout`: Efectos de hover interactivos

- **Manipulación dinámica del DOM**:
  - Renderizado dinámico de tareas
  - Actualización automática de la lista
  - Creación de elementos HTML con JavaScript
  - Modificación de clases CSS dinámicamente

### 4️⃣ JavaScript Asíncrono

- ⏱️ **Retardo simulado** al agregar tareas (500ms)
- 🔔 **Notificaciones** que desaparecen tras 2 segundos
- ⏰ **Contador regresivo** para tareas con fecha límite
- 🔄 **Actualización automática** del tiempo restante

### 5️⃣ Consumo de APIs

- 🌐 **fetch()** para obtener datos de JSONPlaceholder API
- 💾 **localStorage** para persistencia local de datos
- ✅ **Manejo de errores** con try/catch
- 🔄 **Sincronización** automática con localStorage

## 🚀 Funcionalidades de la Aplicación

1. ✏️ **Crear tareas** con descripción y fecha límite opcional
2. ✅ **Marcar tareas como completadas**
3. 🗑️ **Eliminar tareas**
4. ✏️ **Editar descripción** de tareas existentes
5. 🔍 **Filtrar tareas** (Todas / Pendientes / Completadas)
6. ⏰ **Visualizar tiempo restante** para tareas con fecha límite
7. 🌐 **Cargar tareas** desde API externa (JSONPlaceholder)
8. 💾 **Guardar automáticamente** en localStorage
9. 🔔 **Notificaciones visuales** para acciones del usuario
10. 📊 **Estadísticas** de tareas (total, completadas, pendientes)

## 📁 Estructura del Proyecto

```
evaluacionM4/
├── index.html      # Estructura HTML de la aplicación
├── styles.css      # Estilos CSS con diseño moderno y responsive
├── app.js          # Lógica JavaScript con POO, eventos y APIs
└── README.md       # Documentación del proyecto
```

## 💻 Cómo Usar la Aplicación

### Instalación

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador web

### Uso Básico

1. **Agregar una tarea**:
   - Escribe la descripción en el campo de texto
   - Opcionalmente, selecciona una fecha límite
   - Haz clic en "Agregar Tarea"

2. **Completar una tarea**:
   - Marca el checkbox junto a la tarea

3. **Editar una tarea**:
   - Haz clic en el ícono de edición ✏️
   - Modifica el texto en el prompt

4. **Eliminar una tarea**:
   - Haz clic en el ícono de eliminar 🗑️

5. **Filtrar tareas**:
   - Usa los botones: Todas / Pendientes / Completadas

6. **Cargar tareas desde API**:
   - Haz clic en "Cargar Tareas de JSONPlaceholder"
   - Se cargarán 5 tareas de ejemplo

## 🎨 Características de Diseño

- 🎨 **Diseño moderno** con gradientes y sombras
- 📱 **Responsive** adaptable a móviles y tablets
- 🌈 **Animaciones fluidas** para mejor experiencia
- ♿ **Accesibilidad** con etiquetas semánticas
- 🎯 **Interfaz intuitiva** y fácil de usar

## 🔧 Tecnologías Utilizadas

- HTML5
- CSS3 (Variables CSS, Flexbox, Grid, Animaciones)
- JavaScript ES6+ (Clases, Async/Await, Destructuring, etc.)
- LocalStorage API
- Fetch API
- JSONPlaceholder API (para pruebas)

## 📋 Validación de Requisitos

### ✅ Orientación a Objetos
- Clase Tarea con propiedades y métodos ✓
- Clase GestorTareas para administración ✓

### ✅ ES6+
- let/const ✓
- Template literals ✓
- Arrow functions ✓
- Destructuring ✓
- Spread operators ✓

### ✅ Eventos y DOM
- Formulario HTML ✓
- Eventos submit, click, mouseover, keyup ✓
- Modificación dinámica del DOM ✓

### ✅ JavaScript Asíncrono
- Retardo simulado ✓
- Notificación tras 2 segundos ✓
- Contador regresivo ✓

### ✅ Consumo de APIs
- fetch() para API de tareas ✓
- localStorage para persistencia ✓
- Manejo de errores con try/catch ✓

## 👨‍💻 Autor

Proyecto desarrollado como evaluación del Módulo 4 - Programación Avanzada en JavaScript

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.
