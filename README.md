# Song Party

![Song Party](public/logo.svg)

Crea listas de canciones colaborativas para karaokes, bodas y fiestas.  
Comparte un QR, tus invitados se unen y la fiesta la hacéis todos.

## Funcionalidades

- **Busca canciones** con Genius API y scroll infinito
- **Comparte por QR** — los invitados escanean y se unen al instante
- **Modo colaborativo** — todos pueden sugerir canciones
- **Modo solo lectura** — bloquea la lista para que nadie la modifique
- **Reordena** arrastrando y soltando
- **Multiidioma** con next-intl
- **Rate limiting** con Upstash para evitar abusos

## Stack

| Capa            | Tecnologias                                        |
| --------------- | -------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Server Actions)            |
| Runtime         | **Vercel Edge Runtime** (en APIs críticas)         |
| Estado cliente  | Zustand 5 (persistido en localStorage)             |
| Estado servidor | TanStack React Query 5                             |
| Persistencia    | Upstash Redis (TTL de 15 días)                     |
| Búsqueda        | Genius API (vía native **Fetch** con caching)      |
| UI              | Tailwind CSS 4, Lucide icons                       |
| Drag & drop     | dnd-kit                                            |
| QR              | qr-code-styling (generar), html5-qrcode (escanear) |
| i18n            | next-intl                                          |

## Desarrollo local

### 1. Variables de entorno

Crea un archivo `.env.local` en la raiz:

```env
GENIUS_ACCESS_TOKEN=        # Token de cliente de la Genius API
UPSTASH_REDIS_REST_URL=     # URL REST de tu base de datos Upstash Redis
UPSTASH_REDIS_REST_TOKEN=   # Token REST de tu base de datos Upstash Redis
```

- **Genius API**: crea una app en [genius.com/api-clients](https://genius.com/api-clients) y copia el _Client Access Token_.
- **Upstash Redis**: crea una base de datos gratuita en [console.upstash.com](https://console.upstash.com) y copia las credenciales REST.

### 2. Instalar y arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comandos

| Comando         | Descripcion                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de produccion                |
| `npm run start` | Servidor de produccion             |
| `npm run lint`  | ESLint                             |

## Despliegue

Funciona en cualquier plataforma compatible con Next.js:

- **Vercel** — Despliegue recomendado. Utiliza **Edge Runtime** para la API de búsqueda, eliminando _cold starts_ y reduciendo la latencia global.
- **Docker / VPS** — Compatible mediante `npm run build && npm run start`.

## Licencia

MIT — consulta [LICENSE](LICENSE).
Licencias de dependencias de terceros en [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
