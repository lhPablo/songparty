# Song Party

Crea listas de reproducción colaborativas para tus karaokes. Comparte un código QR, tus invitados añaden canciones en tiempo real y tú controlas la sesión.

## Características

- **Búsqueda de canciones** via Genius API con scroll infinito
- **Edición colaborativa** — los invitados se unen escaneando el QR
- **Bloqueo de playlist** — el dueño puede impedir que los invitados modifiquen la lista
- **Reordenación** por arrastrar y soltar
- **Compartir por QR** — genera y escanea códigos QR directamente desde la app

## Stack

- Next.js 16 (App Router, Server Actions)
- Zustand 5 + TanStack React Query 5
- Upstash Redis (persistencia, TTL de 3 días)
- Genius API (búsqueda de canciones)
- dnd-kit, qrcode.react, Tailwind CSS 4

## Desarrollo local

### 1. Variables de entorno

Crea un archivo `.env.local` en la raíz con:

```env
GENIUS_ACCESS_TOKEN=        # Token de cliente de la Genius API
UPSTASH_REDIS_REST_URL=     # URL REST de tu base de datos Upstash Redis
UPSTASH_REDIS_REST_TOKEN=   # Token REST de tu base de datos Upstash Redis
```

- **Genius API**: crea una app en [genius.com/api-clients](https://genius.com/api-clients) y copia el *Client Access Token*.
- **Upstash Redis**: crea una base de datos gratuita en [console.upstash.com](https://console.upstash.com) y copia las credenciales REST.

### 2. Instalar y arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run dev      # Servidor de desarrollo (Turbopack)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # ESLint
```

## Licencia

MIT — consulta [LICENSE](LICENSE).
Licencias de dependencias de terceros en [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).
