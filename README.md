# DeSite-USA-Landing-Page

## Origen de los contactos

El formulario envía `leadSource` y `trafficAttribution` al servicio AWS
`SendEmailUSA`. El campo oculto `trafficAttribution` se completa al enviar.
Se conserva la primera entrada de la pestaña mediante `sessionStorage`, incluso
al navegar entre modelos y formulario o recargar. Cerrar la pestaña normalmente
finaliza este registro; no se usa una ventana de atribución entre visitas.
Si el almacenamiento está bloqueado, solo se conserva en memoria mientras
permanezca cargada la aplicación.

Ejemplos de enlaces para campañas (también admiten `utm_campaign=nombre`):

- Facebook: `https://desiteproducts.com/?utm_source=facebook&utm_medium=paid_social`
- Instagram: `https://desiteproducts.com/?utm_source=instagram&utm_medium=paid_social`
- Google Ads: `https://desiteproducts.com/?utm_source=google&utm_medium=cpc`

Para enlaces de publicaciones sin anuncios puede usarse `utm_medium=social`.
Se reconocen también las fuentes `fb` e `ig`, y los identificadores de Google
`gclid`, `gbraid` y `wbraid`. Sin etiquetas, se usa el dominio de procedencia
cuando el navegador lo facilita. Google sin señal de anuncio se clasifica como
`google`. `fbclid` por sí solo se clasifica como `meta`, porque no permite
distinguir Facebook de Instagram. Otros sitios/fuentes son `other`.
Sin señales disponibles se registra `direct_unknown`: no es posible asegurar
que toda visita sin procedencia sea realmente directa.

`trafficAttribution` incluye `source`, `utmSource`, `utmMedium`, `utmCampaign`,
`landingPage` (sin parámetros ni fragmento) y `referrerHost` (solo dominio).
La API limita y normaliza estos datos; son metadatos declarados por el cliente,
no prueba de identidad ni de conversiones verificadas.

**Integración pendiente fuera de este repositorio:** la plantilla de correo de
la función AWS debe leer `leadSource` y/o `trafficAttribution` y mostrarlos en el
correo, escapando cualquier texto al insertarlo en HTML. Los nuevos campos ya
se incluyen en el JSON enviado, pero agregar propiedades no modifica por sí
solo la plantilla externa.

Pruebas locales sin enviar correos: `node scripts/test-traffic-attribution.mjs`.
