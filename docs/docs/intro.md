---
sidebar_position: 1
---

# Tutorial de la Aplicación: Perspectivas Políticas

Este tutorial te guiará a través de las funciones principales de la página de inicio de la aplicación.

## 1. Inicio de Sesión

La página principal te da la bienvenida a "Perspectivas Políticas" y te pide iniciar sesión en tu cuenta.

![Página de Inicio de Sesión](/tutorial-login.png)

### Pasos para iniciar sesión:

1.  **Correo Electrónico**: En el primer campo, titulado "Correo Electronico", introduce la dirección de correo electrónico con la que te registraste.
2.  **Contraseña**: En el segundo campo, "Contraseña", introduce tu contraseña.
3.  **Enviar**: Haz clic en el botón azul que dice **"iniciar sesión"** para acceder a la aplicación.

## 2. Opciones Adicionales

¿Qué pasa si no tienes una cuenta o has olvidado tu contraseña?

*   **Registrarse**: Si eres un usuario nuevo, haz clic en el enlace **"Regístrate"**. Serás dirigido a una nueva página para crear tu cuenta. Puedes ver una vista previa de esta página aquí: ![Página de Registro](/tutorial-register.png)

*   **Recuperar Contraseña**: Si has olvidado tu contraseña, haz clic en el enlace **"¿Olvidaste tu contraseña?"**. Esto te llevará al flujo de recuperación de contraseña.

## 3. Política de Privacidad

En la parte inferior de la página, puedes encontrar un enlace a la **"política de privacidad"** para consultar cómo se manejan tus datos.

## 4. Página de Comparación

Una vez que inicias sesión, serás dirigido a la página de "Comparar". Esta es la herramienta principal para el análisis de políticas digitales.

![Página de Comparación](/tutorial-comparar.png)

### Navegación Principal

En la parte superior, encontrarás el menú de navegación principal con las siguientes secciones:
*   **Comparar**: La página actual.
*   **Informes**: Para generar y ver informes.
*   **Recursos**: Para gestionar fuentes de datos.
*   **Admin**: Para la administración de usuarios (si tienes permisos).

### Realizar una Comparación

El objetivo de esta página es comparar indicadores de Tecnologías de la Información y la Comunicación (TIC) entre varios países.

1.  **Seleccionar País Principal**: En el menú desplegable **"Su País"**, elige el país base para tu análisis.
2.  **Seleccionar Países de Referencia**: En la lista **"Países de Referencia"**, puedes seleccionar hasta cinco países con los que deseas comparar.
3.  **Seleccionar Indicadores**: En la lista **"Indicadores"**, elige uno o más indicadores de TIC que te interesen (ej. "Ciberseguridad", "Gobierno digital").
4.  **Generar Gráfico**: Haz clic en el botón **"Comparar"**. En el área de la derecha, aparecerá un gráfico comparando los datos de los países e indicadores seleccionados.

## 5. Generador de Informes

La sección "Informes" te permite crear y descargar informes personalizados basados en los datos de comparación.

![Página de Informes](/tutorial-informes.png)

### Configuración del Informe

1.  **País Principal**: Selecciona el país que será el foco principal de tu informe.
2.  **Países a comparar**: Elige uno o más países para comparar con el país principal. Puedes seleccionar varios manteniendo pulsada la tecla `Ctrl` (o `Cmd` en Mac).
3.  **Indicadores**: Selecciona los indicadores de TIC que deseas incluir en el informe. También puedes seleccionar varios.
4.  **Formato del Informe**: Elige si deseas que el informe se genere en formato **PDF** o **CSV**.

### Vista Previa y Descarga

A la derecha, verás una sección de **"Vista Previa del Informe"** que te dará una idea de cómo se verá el documento final.

Una vez que hayas configurado tu informe, haz clic en el botón **"Generar y Descargar Informe"** para guardarlo en tu dispositivo.

## 6. Recursos y Fuentes de Datos

Esta página te informa sobre el origen de los datos de la aplicación y te permite cargar tus propios datos para un análisis personalizado.

![Página de Recursos](/tutorial-recursos.png)

### Fuentes de Datos

*   **Banco Mundial**: La aplicación utiliza la API del Banco Mundial como fuente principal para obtener indicadores de desarrollo actualizados.

### Carga de Datos Personalizados

Puedes subir tus propios datos para analizarlos en la plataforma.

1.  **Formato del Archivo**: Tus datos deben estar en un archivo CSV o Excel (.xlsx).
2.  **Estructura Requerida**: El archivo debe tener una estructura específica con columnas como `CodigoISO_Pais`, `NombrePais`, `ID_indicador`, `Nombre_Indicador`, `Año`, `Valor`, y `Unidad`.
3.  **Plantilla**: Si no estás seguro del formato, puedes hacer clic en el botón **"Descargar Plantilla"** para obtener un archivo de ejemplo.
4.  **Subir Archivo**: Cuando tu archivo esté listo, haz clic en **"Seleccionar Archivo"** para subirlo a la plataforma.

## 7. Panel de Administración

Si inicias sesión con una cuenta de administrador, tendrás acceso al "Panel de Administración". Esta sección te da una visión general de la actividad de la aplicación y te permite gestionar usuarios e informes.

El panel de administración tiene su propio menú de navegación lateral.

### Panel de Control (Dashboard)

Esta es la página principal del panel de administración. Ofrece un resumen rápido de las métricas clave:

![Panel de Control de Admin](/tutorial-admin-dashboard.png)

*   **Total Users**: El número total de usuarios registrados.
*   **Reports Generated**: La cantidad de informes que se han generado.
*   **Site Visits**: Un conteo de las visitas al sitio.
*   **Open Issues**: Un seguimiento de los problemas o tickets abiertos.

También muestra una sección de **"Recent Activity"** donde puedes ver las acciones más recientes de los usuarios en la plataforma.

### Gestión de Usuarios

Esta sección te permite administrar todos los usuarios de la plataforma.

![Gestión de Usuarios](/tutorial-admin-usuarios.png)

*   **Tabla de Usuarios**: Muestra una lista de todos los usuarios con su nombre, email, rol y estado (Activo/Inactivo).
*   **Buscar**: Puedes usar la barra de búsqueda para encontrar usuarios específicos por su nombre o correo electrónico.
*   **Añadir Usuario**: El botón para añadir un nuevo usuario abre un formulario donde puedes especificar el nombre, email, contraseña y rol (Usuario o Administrador).
*   **Acciones por Usuario**:
    *   **Editar**: Permite modificar el nombre, email y rol de un usuario existente.
    *   **Eliminar**: Borra un usuario de la plataforma, pidiendo confirmación antes de hacerlo.
    *   **Ver**: Muestra una vista detallada con toda la información del usuario.

### Gestión de Informes

Esta sección te permite administrar todos los informes generados en la plataforma.

![Gestión de Informes de Admin](/tutorial-admin-informes.png)

*   **Vista de Tarjetas**: Los informes se muestran como "tarjetas", cada una con el título del informe, el usuario que lo creó y la fecha de creación.
*   **Buscar**: Puedes usar la barra de búsqueda para encontrar informes específicos por su título o por el nombre del usuario que lo generó.
*   **Acciones por Informe**:
    *   **Ver**: Abre una ventana con los detalles del informe (título, usuario, fecha).
    *   **Descargar**: Permite descargar el archivo del informe directamente a tu dispositivo.
    *   **Eliminar**: Borra un informe de la plataforma, pidiendo confirmación previa.