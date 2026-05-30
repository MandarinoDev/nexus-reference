# Nexus Reference (Apex)

Landing page SaaS en Next.js 16 con autenticación Supabase.

## Desarrollo local

```bash
pnpm install
cp .env.example .env.local
# Edita .env.local con tus claves de Supabase
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas

- `/` — Landing
- `/register` — Registro
- `/login` — Inicio de sesión
- `/dashboard` — Área privada

## Supabase

Ver [SUPABASE.md](./SUPABASE.md) para configurar Auth y variables de entorno.

## Despliegue

Compatible con Vercel. Configura en el dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`
