# Project Context

Last reviewed: 2026-07-02

## 1. Resumen General Del Proyecto

Este repositorio contiene una landing/app comercial de DeSite Products construida con Next.js. Su objetivo principal es mostrar modelos de screeners, sus precios, fotos, videos, especificaciones, reviews y llamadas a la accion para solicitar una cotizacion de envio.

La funcionalidad de negocio central es capturar solicitudes de shipping quote desde un formulario, validarlas en el servidor, enviarlas por email via SMTP y redirigir al usuario a una pagina de agradecimiento que dispara eventos de conversion para analitica.

No es una aplicacion CRM completa. No hay dashboard, autenticacion, base de datos, tenants, pipeline persistente, invoices, Stripe ni almacenamiento de archivos implementados en el codigo actual.

## 2. Arquitectura General

La app esta organizada como una aplicacion Next.js App Router con:

- Frontend: paginas React dentro de `app/`, principalmente la home, paginas de modelos, formulario de quote y thank-you.
- Backend ligero: route handlers de Next.js en `app/api`.
- Base de datos: no existe base de datos ni ORM en el proyecto.
- Servicios persistentes/workers: no hay workers, queues ni jobs.
- Integraciones externas: SMTP con Nodemailer, Google Tag Manager, Google Analytics, Meta Pixel, Microsoft Clarity, Vimeo, YouTube y headers/cookies de geolocalizacion.
- Deploy: configuracion para AWS Amplify en `amplify.yml`.

El flujo de datos es intencionalmente simple:

1. El usuario navega el catalogo en `/`.
2. El usuario abre `/shipping-quote`, opcionalmente con `?model=...`.
3. El formulario hace `POST /api/shipping-quote`.
4. El route handler valida los campos, calcula el modelo recomendado y envia un email a ventas.
5. Si el envio funciona, redirige a `/thank-you?success=1...`.
6. La pagina thank-you muestra la recomendacion y dispara eventos de conversion en `dataLayer` y Meta Pixel.

## 3. Stack Tecnologico

- Framework: Next.js `16.1.6` con App Router.
- UI: React `19.2.3`.
- Lenguaje: TypeScript con `strict: true`.
- Estilos: Tailwind CSS v4 via `@tailwindcss/postcss` y clases utilitarias en JSX.
- Configuracion CSS: `app/globals.css` importa `tailwindcss` y `postcss.config.mjs` usa `@tailwindcss/postcss`.
- Email: `nodemailer`.
- Imagenes: `next/image` con assets locales en `public/`.
- Build: Turbopack/Next build.
- Next config: `next.config.ts` fija `turbopack.root` y `outputFileTracingRoot` al directorio real del repo.
- Lint: ESLint 9 con `eslint-config-next`.
- Testing disponible: smoke test custom `scripts/smoke-shipping-quote.mjs`.
- Runtime esperado: Node.js `>=20.9.0`; `.nvmrc` usa Node `20`.
- Estado frontend: estado local con `useState`/`useEffect`; no hay Redux, Zustand, Context global ni query cache.
- Autenticacion: no implementada.
- Base de datos: no implementada.

## 4. Estructura De Carpetas

```text
app/
  api/
    geo/route.ts
    shipping-quote/route.ts
  models/
    _components/model-detail-page.tsx
    model-metadata.ts
    108-proscreen/
    78-proscreen/
    68-proscreen/
    slg-108/
    slg-78/
    slg-56/
  shipping-quote/
    page.tsx
    quote-flow.ts
    quote-wizard.tsx
  thank-you/page.tsx
  thank-you/conversion-events.tsx
  page.tsx
  layout.tsx
  sitemap.ts
  robots.ts
  globals.css
next.config.ts
postcss.config.mjs
public/
scripts/
```

### `app/`

Contiene la aplicacion Next.js. Las rutas publicas se definen por carpetas y archivos `page.tsx`. Los route handlers viven en `app/api`.

### `app/page.tsx`

Home principal. Es un client component que muestra:

- Logo y hero.
- Catalogo de modelos con carruseles de imagenes.
- Precio en USD/CAD segun pais detectado.
- CTAs a `/shipping-quote` y paginas de detalle.
- Reviews de clientes.
- CTA telefonico con evento `phone_call_click` al `dataLayer`.

### `app/api/shipping-quote/route.ts`

Endpoint server-side para recibir el formulario de cotizacion. Valida campos, calcula la recomendacion de modelo, configura Nodemailer, envia email y redirige.

### `app/shipping-quote/`

Contiene la pagina y componentes del flujo guiado de cotizacion:

- `page.tsx`: server page que lee `searchParams` (`model`, `error`) y renderiza el wizard.
- `quote-wizard.tsx`: client component con el formulario paso a paso, validacion por paso, estado local y formato telefonico en vivo.
- `quote-flow.ts`: opciones permitidas, validaciones compartidas, formato/validacion de telefono, compatibilidad de `?model=...`, logica de recomendacion y valores de conversion.

### `app/api/geo/route.ts`

Endpoint server-side para detectar pais usando headers/cookies del proveedor de hosting/CDN. La home lo usa para decidir si mostrar CAD o USD.

### `app/models/`

Paginas de detalle por modelo. Hay dos patrones:

- `slg-108`, `slg-78` y `slg-56` usan el componente compartido `app/models/_components/model-detail-page.tsx`.
- `108-proscreen`, `78-proscreen` y `68-proscreen` tienen paginas propias con layout duplicado.

`app/models/model-metadata.ts` centraliza la creacion de metadata SEO para layouts de modelos.

### `public/`

Assets estaticos: logo, fotos de modelos, iconos de equipos compatibles, reviews y garantia.

### `scripts/`

Contiene `smoke-shipping-quote.mjs`, un smoke test que levanta un SMTP mock y valida el flujo de `/api/shipping-quote`.

## 5. Flujo De Autenticacion

No hay flujo de autenticacion implementado.

- No hay login.
- No hay registro.
- No hay JWT.
- No hay sesiones.
- No hay usuarios.
- No hay roles/permisos.
- No hay organizaciones/tenants.
- No hay middleware de auth.
- No hay rutas protegidas.

Si en el futuro se agrega autenticacion, debe documentarse desde cero y revisar que no afecte las rutas publicas actuales: `/`, `/models/*`, `/shipping-quote`, `/thank-you`, `/api/geo` y `/api/shipping-quote`.

## 6. Modulos Principales

### Home / Catalogo

Archivo principal: `app/page.tsx`.

Muestra seis modelos:

- `108 ProScreen`
- `78 ProScreen`
- `68 ProScreen`
- `SLG 108`
- `SLG 78`
- `SLG 56`

Cada modelo tiene imagenes, precio USD/CAD, CTA a shipping quote y CTA a detalle.

### Productos / Modelos

Rutas:

- `/models/108-proscreen`
- `/models/78-proscreen`
- `/models/68-proscreen`
- `/models/slg-108`
- `/models/slg-78`
- `/models/slg-56`

Las paginas muestran videos Vimeo, equipo compatible, materiales que se pueden cribar, features, warranties, mesh available y especificaciones segun el modelo.

### Shipping Quote / Lead Capture

Archivos:

- `app/shipping-quote/page.tsx`
- `app/shipping-quote/quote-wizard.tsx`
- `app/shipping-quote/quote-flow.ts`
- `app/api/shipping-quote/route.ts`
- `app/thank-you/page.tsx`
- `scripts/smoke-shipping-quote.mjs`

Este es el flujo mas importante de la app. Captura datos del usuario en un wizard paso a paso, calcula el modelo recomendado segun necesidad de vibracion y ancho de bucket, y envia el lead por email a ventas.

### Geo / Currency

Archivos:

- `app/api/geo/route.ts`
- `app/page.tsx`

La home consulta `/api/geo`. Si el pais detectado es `CA`, muestra precios en CAD; en cualquier otro caso muestra USD.

### SEO

Archivos:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/models/model-metadata.ts`
- `app/models/*/layout.tsx`
- `app/models/*/head.tsx`

El layout global define metadata base, Open Graph, Twitter card y JSON-LD de organizacion. Cada modelo tiene metadata especifica. Nota: tambien existen archivos `head.tsx` por modelo; revisar antes de modificar para evitar duplicar SEO.

### Modulos No Implementados

Los siguientes modulos no existen en el codigo actual:

- Dashboard.
- Leads persistentes en base de datos.
- Pipelines.
- Email Center.
- Sincronizacion de email.
- Follow-ups.
- Quotes persistentes.
- Invoices.
- Payment Links.
- Stripe.
- Files.
- Settings.
- Webhooks.
- Notificaciones internas.
- Meta Conversions API server-side.
- Google Ads/Analytics server-side.

## 7. Modelos Y Base De Datos

No hay base de datos ni modelos de datos persistentes. No se encontro Prisma, Mongoose, SQL, MongoDB, Supabase, Firebase, Drizzle ni migraciones.

Los "modelos" en este proyecto son modelos de producto, no modelos de base de datos.

### Datos de Producto

Actualmente los datos de producto estan hardcodeados en varios archivos:

- `app/page.tsx`: imagenes de carrusel, precios visibles, reviews y CTAs.
- `app/shipping-quote/quote-flow.ts`: opciones permitidas del wizard, compatibilidad de `?model=...`, logica de recomendacion y valores/currency usados para conversion tracking.
- `app/models/*/page.tsx`: videos, features, specs y equipos compatibles.

### Datos Capturados Del Formulario

El formulario captura:

- `vibrationNeeded`
- `bucketWidthRange`
- `fullName`
- `phone`
- `email`
- `streetAddress`
- `city`
- `state`
- `zipCode`
- `country`
- `financing`
- `consent`

El telefono se normaliza al formato visual `(800) 890 1901`. El modelo recomendado no lo envia el cliente como fuente de verdad: se calcula en servidor con `getRecommendation` desde `quote-flow.ts`. Estos datos no se guardan en una DB. Solo se envian por email mediante SMTP.

## 8. Rutas Y Endpoints Importantes

### Paginas Publicas

- `/`: home/catalogo principal. Archivo: `app/page.tsx`.
- `/shipping-quote`: formulario de cotizacion. Archivo: `app/shipping-quote/page.tsx`.
- `/thank-you`: pagina de exito y conversion tracking. Archivo: `app/thank-you/page.tsx`.
- `/models/108-proscreen`: detalle 108 ProScreen.
- `/models/78-proscreen`: detalle 78 ProScreen.
- `/models/68-proscreen`: detalle 68 ProScreen.
- `/models/slg-108`: detalle SLG 108.
- `/models/slg-78`: detalle SLG 78.
- `/models/slg-56`: detalle SLG 56.
- `/sitemap.xml`: generado por `app/sitemap.ts`.
- `/robots.txt`: generado por `app/robots.ts`.

### API Routes

#### `GET /api/geo`

Archivo: `app/api/geo/route.ts`.

Detecta pais usando, en este orden:

1. Cookie `nf_country`.
2. Header `x-nf-geo` de Netlify, si existe y contiene JSON valido.
3. Headers fallback:
   - `x-vercel-ip-country`
   - `cf-ipcountry`
   - `cloudfront-viewer-country`
   - `x-appengine-country`
   - `x-country-code`
   - `x-forwarded-country`

Responde:

```json
{ "countryCode": "US" }
```

Si se llama con `?debug=1`, incluye fuente, cookie y headers detectados.

#### `POST /api/shipping-quote`

Archivo: `app/api/shipping-quote/route.ts`.

Valida formulario, envia email por SMTP y redirige:

- Exito: `303` a `/thank-you?success=1&model=...&recommendedModel=...&recommendationNote=...&requiresReview=...&vibrationNeeded=...&bucketWidthRange=...&country=...&financing=...&value=...&currency=...`
- Error de validacion/configuracion/envio: `303` a `/shipping-quote?error=1`

No devuelve JSON; esta pensado para POST de formulario HTML.

## 9. Servicios E Integraciones Externas

### SMTP / Email

Integracion server-side con Nodemailer en `app/api/shipping-quote/route.ts`.

Variables usadas:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

El email se envia a `salesusa@desiteproducts.com`. El `replyTo` se establece con el email del lead. El logo se adjunta desde `public/LOGO.webp` con CID `desite-logo`.

### Google Tag Manager

Configurado en `app/layout.tsx`.

- GTM ID hardcodeado: `GTM-PX6HFKVL`
- Se carga con `strategy="beforeInteractive"`.
- Incluye fallback `noscript`.
- El evento de conversion de shipping quote se envia como `lead_generated` a `window.dataLayer` desde `app/thank-you/conversion-events.tsx`, solo cuando `/thank-you` recibe `success=1`.

No se encontro Google Ads conversion ID ni conversion label en el codigo o variables de entorno documentadas. Si se necesita Google Ads conversion tracking, debe configurarse dentro de GTM con un trigger sobre `lead_generated`; no hardcodear IDs ficticios.

### Google Analytics

Configurado en `app/layout.tsx`.

- GA ID hardcodeado: `G-PHS96C5GR5`
- Se carga `gtag/js` con `strategy="lazyOnload"`.
- Inicializa `window.dataLayer`.
- GA tambien puede recibir el evento `lead_generated` a traves de GTM si el contenedor esta configurado para escucharlo.

### Meta Pixel

Configurado en `app/layout.tsx` y `app/thank-you/conversion-events.tsx`.

- Pixel ID hardcodeado: `2030654847372180`
- Evento global: `PageView` desde el layout.
- El script base se carga con `strategy="afterInteractive"`.
- Evento de lead en thank-you: `fbq('track', 'Lead', ...)`, solo cuando `success=1`.
- El evento de lead usa una guarda client-side por URL para evitar duplicados por re-render y reintenta brevemente si `fbq` aun no esta inicializado.
- El payload de Meta incluye solo datos no sensibles: modelo recomendado, necesidad de vibracion, rango de bucket, pais, financiamiento, valor y moneda.

No hay Meta Conversions API server-side.

### Microsoft Clarity

Configurado en `app/layout.tsx`.

- Clarity tag hardcodeado: `vt4b4skigv`.

### Vimeo

Usado para videos de modelos en `app/models/*/page.tsx` y `app/models/_components/model-detail-page.tsx`.

### YouTube

Usado para un video de review en `app/page.tsx`.

### Stripe

No hay integracion Stripe en el proyecto.

### Webhooks

No hay webhooks implementados.

### Almacenamiento De Archivos

No hay storage externo. Todos los assets son locales bajo `public/`.

## 10. Variables De Entorno

Variables encontradas en codigo, README o scripts:

### `NEXT_PUBLIC_SITE_URL`

Usada en:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/api/shipping-quote/route.ts`
- `scripts/smoke-shipping-quote.mjs`

Define la URL publica base del sitio. Si falta, el codigo usa `https://desiteproducts.com` en SEO/sitemap/robots y `request.url` para redirects del endpoint de quote.

### `SMTP_HOST`

Host SMTP para enviar emails de shipping quote.

### `SMTP_PORT`

Puerto SMTP. Si falta, el endpoint usa `587`. Si es `465`, Nodemailer usa `secure: true`.

### `SMTP_USER`

Usuario SMTP. Tambien se usa como fallback para `SMTP_FROM` si `SMTP_FROM` no esta definido.

### `SMTP_PASS`

Password SMTP.

### `SMTP_FROM`

Sender del email. Esta documentada en README y `.env.example`; si falta, el endpoint usa `SMTP_USER`.

### `SMOKE_APP_PORT`

Variable opcional del smoke test. Default: `3100`.

### `SMOKE_SMTP_PORT`

Variable opcional del smoke test. Default: `2525`.

Notas:

- `.env` local observado contiene `SMTP_HOST`, `SMTP_PASS`, `SMTP_PORT` y `SMTP_USER`.
- `.env.example` contiene `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` y `SMTP_FROM`.
- No se deben exponer valores reales de `.env` en documentacion, logs o commits.

## 11. Flujos Importantes De Negocio

### Recibir Leads Desde Formularios / Crear Lead

1. El usuario abre `/shipping-quote`.
2. Puede llegar con `?model=...`; si el modelo coincide con un producto conocido, el wizard preselecciona respuestas compatibles para vibracion y ancho de bucket.
3. El usuario responde un flujo paso a paso: vibracion, rango de bucket, nombre, telefono, email, direccion completa, pais, financiamiento y consentimiento.
4. El formulario hace POST a `/api/shipping-quote`.
5. El servidor valida:
   - Vibracion en `Yes` o `No`.
   - Rango de bucket permitido.
   - Nombre presente.
   - Telefono US/Canada valido y normalizado como `(800) 890 1901`.
   - Email valido.
   - Street address, city, state/province y ZIP/postal presentes.
   - Pais en `United States` o `Canada`.
   - Financiamiento en `Yes` o `No`.
   - Consentimiento `accepted`.
6. Si es valido, calcula el modelo recomendado en servidor.
7. Se envia email via SMTP con la recomendacion y los datos del lead.
8. En exito, redirige a thank-you con datos de conversion y recomendacion.

No se crea un lead persistente en base de datos.

### Enviar Email

El email se envia con Nodemailer usando SMTP. Incluye texto plano, HTML escapado, logo adjunto, modelo recomendado, necesidad de vibracion, rango de bucket, direccion desglosada y datos de contacto. Si falla SMTP, el usuario vuelve al formulario con `error=1`.

### Enviar Eventos A Meta / Google

En `/thank-you`, si `success=1`, el componente client-side `LeadConversionEvents` dispara conversiones:

- `window.dataLayer.push({ event: 'lead_generated', ... })`
- `window.fbq('track', 'Lead', ...)` si `fbq` existe; si todavia no existe, reintenta brevemente.

Los payloads incluyen solo datos no sensibles: `form_name`, `recommended_model`, `vibration_needed`, `bucket_width_range`, `country`, `financing`, `value` y `currency`. No deben incluir nombre, telefono, email ni direccion completa.

El telefono en la home dispara:

- `window.dataLayer.push({ event: 'phone_call_click', ... })`

### Mostrar Precios USD/CAD

La home llama `/api/geo`. Si el pais detectado es `CA`, usa CAD; si no, usa USD. Los precios visibles estan hardcodeados en `app/page.tsx`. Los valores de conversion del quote flow viven en `app/shipping-quote/quote-flow.ts`.

### Ver Detalle De Producto

El usuario entra desde `WATCH IN ACTION` a `/models/...`. Las paginas muestran videos, equipos compatibles, materiales, features, warranties, mallas y specs segun el modelo.

### Flujos No Implementados

No existen estos flujos en el codigo actual:

- Mover lead en pipeline.
- Enviar email desde un Email Center.
- Sincronizar email.
- Crear cotizacion persistente.
- Crear invoice.
- Generar payment link.
- Recibir pago por Stripe.
- Crear follow-up.
- Procesar webhooks.
- Gestionar archivos.
- Gestionar usuarios, roles, permisos u organizaciones.

## 12. Riesgos Tecnicos

- No hay persistencia para leads: si SMTP falla, el lead no queda guardado.
- No hay retry, queue ni backup para envio de emails.
- No hay CAPTCHA, honeypot ni rate limiting en `/api/shipping-quote`.
- Los precios visibles de home y los valores de conversion del quote flow viven en archivos distintos; si se cambia pricing hay que sincronizarlos.
- Los valores de conversion se pasan por query params a `/thank-you`; una visita manual podria disparar eventos de conversion si incluye `success=1`.
- La deteccion de pais depende de headers/cookies del proveedor de hosting/CDN. Si Amplify/CloudFront no envia `cloudfront-viewer-country` u otro header esperado, la app cae a USD.
- Las paginas `108-proscreen`, `78-proscreen` y `68-proscreen` duplican layout y logica que en SLG esta centralizada en `ModelDetailPage`.
- Hay tanto `head.tsx` como `layout.tsx` con metadata por modelo; revisar antes de editar SEO para no duplicar o dejar valores inconsistentes.
- `app/page.tsx` es un client component grande con mucha logica de carrusel y datos hardcodeados.
- Los IDs de Google/Meta/Clarity estan hardcodeados en `app/layout.tsx`; cualquier cambio de propiedad/tenant de analitica requiere editar codigo.
- El recipient de ventas `salesusa@desiteproducts.com` esta hardcodeado en el endpoint de quote.

## 13. Errores O Areas Incompletas

- No hay backend de leads real, solo envio de email.
- No hay base de datos ni auditoria de envios.
- No hay integracion Stripe, invoices o payment links.
- No hay autenticacion ni permisos.
- No hay panel administrativo.
- El modelo `78 ProScreen` no define una seccion `machineSpecs` como si hacen `108 ProScreen` y `68 ProScreen`; pendiente de confirmar si es intencional.
- Existen assets que parecen no referenciados desde el codigo, por ejemplo `public/reviews/7.webp`, `public/SLG-78/PHOTO78STATIC.JPG` y `public/SLG-108/slg108Front.png`; pendiente de confirmar antes de borrar.
- El README todavia conserva texto generico de create-next-app ademas de la documentacion especifica del shipping quote.
- La logica general de producto/precios podria centralizarse mas; actualmente el quote flow esta centralizado en `app/shipping-quote/quote-flow.ts`, pero la home y paginas de modelos mantienen datos hardcodeados por separado.

## 14. Guia Para Futuros Cambios

- Mantener `/api/shipping-quote` compatible con el wizard actual; no cambiar nombres de campos sin revisar `app/shipping-quote/quote-wizard.tsx`, `app/shipping-quote/quote-flow.ts`, `scripts/smoke-shipping-quote.mjs` y tracking en `app/thank-you/page.tsx`.
- Si se agregan o renombran modelos, actualizar como minimo:
  - `app/page.tsx`
  - `app/shipping-quote/quote-flow.ts`
  - `app/sitemap.ts`
  - `app/models/*`
- Si se cambian precios, actualizar tanto los precios visibles de `app/page.tsx` como `getLeadValueAndCurrency` en `app/shipping-quote/quote-flow.ts`.
- Antes de tocar SEO de modelos, revisar `app/models/model-metadata.ts`, `app/models/*/layout.tsx` y los `head.tsx` existentes.
- Para nuevos formularios o integraciones de lead, preferir crear una capa compartida de validacion/modelos permitidos antes de duplicar arrays.
- Si se agrega persistencia, definir explicitamente schema, migraciones, manejo de errores y estrategia de privacidad antes de guardar datos personales.
- Si se agrega Stripe, documentar webhooks, variables de entorno, idempotencia y estados de pago.
- Si se agrega auth, mantener publicas las rutas comerciales necesarias y documentar middlewares/permisos.
- Si se agregan eventos server-side a Meta/Google, evitar duplicar eventos client-side sin una estrategia de deduplicacion.
- Siempre ejecutar antes de entregar:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test:shipping-quote
```

En entornos sandbox locales, `next build` y el smoke test pueden requerir permisos para abrir procesos/puertos locales; eso no necesariamente indica fallo de codigo.
