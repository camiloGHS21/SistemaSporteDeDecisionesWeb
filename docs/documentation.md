## Functions

<dl>
<dt><a href="#getAuthToken">getAuthToken()</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Obtiene el token de autenticación del almacenamiento local.</p>
</dd>
<dt><a href="#fetchWithAuth">fetchWithAuth(url, [options], [responseType])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Realiza una solicitud fetch con el token de autenticación en los encabezados.</p>
</dd>
<dt><a href="#getDashboardStats">getDashboardStats()</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Obtiene las estadísticas del panel de administración.</p>
</dd>
<dt><a href="#getUsers">getUsers()</a> ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code></dt>
<dd><p>Obtiene la lista de usuarios.</p>
</dd>
<dt><a href="#getUser">getUser(userId)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Obtiene un usuario por su ID.</p>
</dd>
<dt><a href="#createUser">createUser(userData)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Crea un nuevo usuario.</p>
</dd>
<dt><a href="#updateUser">updateUser(userId, userData)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Actualiza un usuario existente.</p>
</dd>
<dt><a href="#deleteUser">deleteUser(userId)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Elimina un usuario.</p>
</dd>
<dt><a href="#getReports">getReports()</a> ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code></dt>
<dd><p>Obtiene la lista de informes.</p>
</dd>
<dt><a href="#getReportContent">getReportContent(reportId)</a> ⇒ <code>Promise.&lt;Blob&gt;</code></dt>
<dd><p>Descarga el contenido de un informe.</p>
</dd>
<dt><a href="#deleteReport">deleteReport(reportId)</a> ⇒ <code>Promise.&lt;object&gt;</code></dt>
<dd><p>Elimina un informe.</p>
</dd>
<dt><a href="#getAuthToken">getAuthToken()</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>Obtiene el token de autenticación del almacenamiento local.</p>
</dd>
<dt><a href="#fetchWithAuth">fetchWithAuth(url, [options], [responseType])</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>Realiza una solicitud fetch con el token de autenticación en los encabezados.</p>
</dd>
<dt><a href="#getCountries">getCountries()</a> ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code></dt>
<dd><p>Obtiene la lista de países.</p>
</dd>
<dt><a href="#getIndicatorNames">getIndicatorNames()</a> ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code></dt>
<dd><p>Obtiene los nombres de los indicadores.</p>
</dd>
<dt><a href="#generateReport">generateReport(reportData)</a> ⇒ <code>Promise.&lt;Blob&gt;</code></dt>
<dd><p>Genera un nuevo informe.</p>
</dd>
<dt><a href="#AdminHeader">AdminHeader(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que muestra el encabezado de la sección de usuarios y un botón para añadir nuevos usuarios.</p>
</dd>
<dt><a href="#AdminSidebar">AdminSidebar(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que renderiza la barra lateral de navegación para el panel de administración.</p>
</dd>
<dt><a href="#getLinkClass">getLinkClass(view)</a> ⇒ <code>string</code></dt>
<dd><p>Determina la clase CSS para un enlace de la barra lateral en función de si es la vista activa.</p>
</dd>
<dt><a href="#StatCard">StatCard(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que muestra una tarjeta de estadística con un icono, etiqueta y valor.</p>
</dd>
<dt><a href="#ActivityItem">ActivityItem(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que muestra un elemento de actividad reciente.</p>
</dd>
<dt><a href="#DashboardSection">DashboardSection()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que renderiza la sección del panel de control, mostrando estadísticas y actividad reciente.</p>
</dd>
<dt><a href="#ReportCard">ReportCard(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que muestra una tarjeta de informe con opciones para ver, descargar y eliminar.</p>
</dd>
<dt><a href="#ReportsSection">ReportsSection()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que renderiza la sección de informes, mostrando una lista de informes con opciones de búsqueda y filtrado.</p>
</dd>
<dt><a href="#UserSearchBar">UserSearchBar(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que renderiza una barra de búsqueda para filtrar usuarios.</p>
</dd>
<dt><a href="#UsersTable">UsersTable(props)</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que muestra una tabla de usuarios con funcionalidades de crear, editar, eliminar y ver.</p>
</dd>
<dt><a href="#Header">Header()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que renderiza el encabezado de la aplicación, incluyendo la navegación y las acciones del usuario.</p>
</dd>
<dt><a href="#isActiveRoute">isActiveRoute(path)</a> ⇒ <code>boolean</code></dt>
<dd><p>Comprueba si la ruta proporcionada es la ruta activa actualmente.</p>
</dd>
<dt><a href="#handleLogout">handleLogout()</a></dt>
<dd><p>Cierra la sesión del usuario y lo redirige a la página de inicio.</p>
</dd>
<dt><a href="#LoginForm">LoginForm()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>Un componente que renderiza el formulario de inicio de sesión y maneja el envío del formulario.</p>
</dd>
<dt><a href="#handleSubmit">handleSubmit(e)</a></dt>
<dd><p>Maneja el envío del formulario de inicio de sesión, realiza una solicitud a la API y maneja la autenticación.</p>
</dd>
<dt><a href="#Login">Login()</a> ⇒ <code>JSX.Element</code></dt>
<dd><p>El componente principal de la página de inicio de sesión.</p>
</dd>
</dl>

<a name="getAuthToken"></a>

## getAuthToken() ⇒ <code>string</code> \| <code>null</code>
Obtiene el token de autenticación del almacenamiento local.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - El token de autenticación o nulo si no se encuentra.  
<a name="fetchWithAuth"></a>

## fetchWithAuth(url, [options], [responseType]) ⇒ <code>Promise.&lt;any&gt;</code>
Realiza una solicitud fetch con el token de autenticación en los encabezados.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - La respuesta de la solicitud.  
**Throws**:

- <code>Error</code> Si la solicitud falla.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | La URL a la que se va a realizar la solicitud. |
| [options] | <code>object</code> | <code>{}</code> | Las opciones para la solicitud fetch. |
| [responseType] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | El tipo de respuesta esperado ('json' o 'blob'). |

<a name="getDashboardStats"></a>

## getDashboardStats() ⇒ <code>Promise.&lt;object&gt;</code>
Obtiene las estadísticas del panel de administración.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Las estadísticas del panel.  
<a name="getUsers"></a>

## getUsers() ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Obtiene la lista de usuarios.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - Una lista de usuarios.  
<a name="getUser"></a>

## getUser(userId) ⇒ <code>Promise.&lt;object&gt;</code>
Obtiene un usuario por su ID.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - El objeto de usuario.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | El ID del usuario. |

<a name="createUser"></a>

## createUser(userData) ⇒ <code>Promise.&lt;object&gt;</code>
Crea un nuevo usuario.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - El usuario creado.  

| Param | Type | Description |
| --- | --- | --- |
| userData | <code>object</code> | Los datos del nuevo usuario. |

<a name="updateUser"></a>

## updateUser(userId, userData) ⇒ <code>Promise.&lt;object&gt;</code>
Actualiza un usuario existente.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - El usuario actualizado.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | El ID del usuario a actualizar. |
| userData | <code>object</code> | Los nuevos datos para el usuario. |

<a name="deleteUser"></a>

## deleteUser(userId) ⇒ <code>Promise.&lt;object&gt;</code>
Elimina un usuario.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Un objeto vacío si tiene éxito.  

| Param | Type | Description |
| --- | --- | --- |
| userId | <code>string</code> | El ID del usuario a eliminar. |

<a name="getReports"></a>

## getReports() ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Obtiene la lista de informes.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - Una lista de informes.  
<a name="getReportContent"></a>

## getReportContent(reportId) ⇒ <code>Promise.&lt;Blob&gt;</code>
Descarga el contenido de un informe.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Blob&gt;</code> - El contenido del informe como un blob.  

| Param | Type | Description |
| --- | --- | --- |
| reportId | <code>string</code> | El ID del informe a descargar. |

<a name="deleteReport"></a>

## deleteReport(reportId) ⇒ <code>Promise.&lt;object&gt;</code>
Elimina un informe.

**Kind**: global function  
**Returns**: <code>Promise.&lt;object&gt;</code> - Un objeto vacío si tiene éxito.  

| Param | Type | Description |
| --- | --- | --- |
| reportId | <code>string</code> | El ID del informe a eliminar. |

<a name="getAuthToken"></a>

## getAuthToken() ⇒ <code>string</code> \| <code>null</code>
Obtiene el token de autenticación del almacenamiento local.

**Kind**: global function  
**Returns**: <code>string</code> \| <code>null</code> - El token de autenticación o nulo si no se encuentra.  
<a name="fetchWithAuth"></a>

## fetchWithAuth(url, [options], [responseType]) ⇒ <code>Promise.&lt;any&gt;</code>
Realiza una solicitud fetch con el token de autenticación en los encabezados.

**Kind**: global function  
**Returns**: <code>Promise.&lt;any&gt;</code> - La respuesta de la solicitud.  
**Throws**:

- <code>Error</code> Si la solicitud falla.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | La URL a la que se va a realizar la solicitud. |
| [options] | <code>object</code> | <code>{}</code> | Las opciones para la solicitud fetch. |
| [responseType] | <code>string</code> | <code>&quot;&#x27;json&#x27;&quot;</code> | El tipo de respuesta esperado ('json' o 'blob'). |

<a name="getCountries"></a>

## getCountries() ⇒ <code>Promise.&lt;Array.&lt;object&gt;&gt;</code>
Obtiene la lista de países.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;object&gt;&gt;</code> - Una lista de países.  
<a name="getIndicatorNames"></a>

## getIndicatorNames() ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code>
Obtiene los nombres de los indicadores.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> - Una lista de nombres de indicadores.  
<a name="generateReport"></a>

## generateReport(reportData) ⇒ <code>Promise.&lt;Blob&gt;</code>
Genera un nuevo informe.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Blob&gt;</code> - El informe generado como un blob.  

| Param | Type | Description |
| --- | --- | --- |
| reportData | <code>object</code> | Los datos para el informe. |

<a name="AdminHeader"></a>

## AdminHeader(props) ⇒ <code>JSX.Element</code>
Un componente que muestra el encabezado de la sección de usuarios y un botón para añadir nuevos usuarios.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - El encabezado de la sección de usuarios renderizado.  
**Component**: AdminHeader  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Las propiedades del componente. |
| props.onAddUser | <code>function</code> | La función a llamar cuando se hace clic en el botón de añadir usuario. |

<a name="AdminSidebar"></a>

## AdminSidebar(props) ⇒ <code>JSX.Element</code>
Un componente que renderiza la barra lateral de navegación para el panel de administración.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La barra lateral de administración renderizada.  
**Component**: AdminSidebar  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Las propiedades del componente. |
| props.currentView | <code>string</code> | La vista actual seleccionada en el panel de administración. |
| props.setCurrentView | <code>function</code> | La función para actualizar la vista actual. |

<a name="getLinkClass"></a>

## getLinkClass(view) ⇒ <code>string</code>
Determina la clase CSS para un enlace de la barra lateral en función de si es la vista activa.

**Kind**: global function  
**Returns**: <code>string</code> - Las clases CSS para el enlace.  

| Param | Type | Description |
| --- | --- | --- |
| view | <code>string</code> | El nombre de la vista a comprobar. |

<a name="StatCard"></a>

## StatCard(props) ⇒ <code>JSX.Element</code>
Un componente que muestra una tarjeta de estadística con un icono, etiqueta y valor.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La tarjeta de estadística renderizada.  
**Component**: StatCard  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Las propiedades del componente. |
| props.icon | <code>string</code> | El icono a mostrar. |
| props.label | <code>string</code> | La etiqueta de la estadística. |
| props.value | <code>number</code> | El valor de la estadística. |
| props.color | <code>string</code> | El color de la tarjeta. |

<a name="ActivityItem"></a>

## ActivityItem(props) ⇒ <code>JSX.Element</code>
Un componente que muestra un elemento de actividad reciente.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - El elemento de actividad renderizado.  
**Component**: ActivityItem  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Las propiedades del componente. |
| props.avatar | <code>string</code> | La URL del avatar del usuario. |
| props.name | <code>string</code> | El nombre del usuario. |
| props.action | <code>string</code> | La acción realizada por el usuario. |
| props.subject | <code>string</code> | El asunto de la acción. |
| props.time | <code>string</code> | El tiempo transcurrido desde la acción. |

<a name="DashboardSection"></a>

## DashboardSection() ⇒ <code>JSX.Element</code>
Un componente que renderiza la sección del panel de control, mostrando estadísticas y actividad reciente.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La sección del panel de control renderizada.  
**Component**: DashboardSection  
<a name="ReportCard"></a>

## ReportCard(props) ⇒ <code>JSX.Element</code>
Un componente que muestra una tarjeta de informe con opciones para ver, descargar y eliminar.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La tarjeta de informe renderizada.  
**Component**: ReportCard  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Las propiedades del componente. |
| props.report | <code>object</code> | El objeto de informe a mostrar. |
| props.onDelete | <code>function</code> | La función a llamar cuando se hace clic en el botón de eliminar. |
| props.onView | <code>function</code> | La función a llamar cuando se hace clic en el botón de ver. |
| props.onDownload | <code>function</code> | La función a llamar cuando se hace clic en el botón de descargar. |

<a name="ReportsSection"></a>

## ReportsSection() ⇒ <code>JSX.Element</code>
Un componente que renderiza la sección de informes, mostrando una lista de informes con opciones de búsqueda y filtrado.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La sección de informes renderizada.  
**Component**: ReportsSection  
<a name="UserSearchBar"></a>

## UserSearchBar(props) ⇒ <code>JSX.Element</code>
Un componente que renderiza una barra de búsqueda para filtrar usuarios.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La barra de búsqueda de usuarios renderizada.  
**Component**: UserSearchBar  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Las propiedades del componente. |
| props.searchQuery | <code>string</code> | La consulta de búsqueda actual. |
| props.setSearchQuery | <code>function</code> | La función para actualizar la consulta de búsqueda. |

<a name="UsersTable"></a>

## UsersTable(props) ⇒ <code>JSX.Element</code>
Un componente que muestra una tabla de usuarios con funcionalidades de crear, editar, eliminar y ver.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La tabla de usuarios renderizada.  
**Component**: UsersTable  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | Las propiedades del componente. |
| props.isCreateModalOpen | <code>boolean</code> | Un booleano que indica si el modal de creación está abierto. |
| props.setIsCreateModalOpen | <code>function</code> | La función para abrir o cerrar el modal de creación. |
| props.searchQuery | <code>string</code> | La consulta de búsqueda para filtrar usuarios. |

<a name="Header"></a>

## Header() ⇒ <code>JSX.Element</code>
Un componente que renderiza el encabezado de la aplicación, incluyendo la navegación y las acciones del usuario.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - El encabezado renderizado.  
**Component**: Header  
<a name="isActiveRoute"></a>

## isActiveRoute(path) ⇒ <code>boolean</code>
Comprueba si la ruta proporcionada es la ruta activa actualmente.

**Kind**: global function  
**Returns**: <code>boolean</code> - `true` si la ruta es activa, de lo contrario `false`.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> | La ruta a comprobar. |

<a name="handleLogout"></a>

## handleLogout()
Cierra la sesión del usuario y lo redirige a la página de inicio.

**Kind**: global function  
<a name="LoginForm"></a>

## LoginForm() ⇒ <code>JSX.Element</code>
Un componente que renderiza el formulario de inicio de sesión y maneja el envío del formulario.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - El formulario de inicio de sesión renderizado.  
**Component**: LoginForm  
<a name="handleSubmit"></a>

## handleSubmit(e)
Maneja el envío del formulario de inicio de sesión, realiza una solicitud a la API y maneja la autenticación.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>React.FormEvent.&lt;HTMLFormElement&gt;</code> | El evento del formulario. |

<a name="Login"></a>

## Login() ⇒ <code>JSX.Element</code>
El componente principal de la página de inicio de sesión.

**Kind**: global function  
**Returns**: <code>JSX.Element</code> - La página de inicio de sesión renderizada.  
**Component**: Login  
