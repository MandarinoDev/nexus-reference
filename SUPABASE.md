# Configurar Supabase Auth en Apex

## 1. Crear proyecto en Supabase

1. Entra en [https://supabase.com](https://supabase.com) y crea un proyecto.
2. Ve a **Project Settings → API**.
3. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Variables de entorno locales

Crea un archivo `.env.local` en la raíz del proyecto (copia desde `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Auth en el panel de Supabase

1. **Authentication → Providers → Email**: activado.
2. **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` (en producción, tu dominio de Vercel)
   - **Redirect URLs** (añade todas):
     ```
     http://localhost:3000/auth/callback
     https://TU-DOMINIO.vercel.app/auth/callback
     ```

3. (Opcional) Para desarrollo sin confirmar email:
   - **Authentication → Providers → Email** → desactiva **Confirm email**.

## 4. Vercel

En el proyecto de Vercel → **Settings → Environment Variables**, añade las mismas tres variables y usa tu URL de producción en `NEXT_PUBLIC_SITE_URL`.

## 5. Rutas de la app

| Ruta | Descripción |
|------|-------------|
| `/register` | Registro de usuario |
| `/login` | Inicio de sesión |
| `/dashboard` | Área privada (requiere sesión) |
| `/auth/callback` | Callback de confirmación de email |

## 6. Probar

```bash
pnpm dev
```

1. Abre `http://localhost:3000/register`
2. Crea una cuenta
3. Inicia sesión en `/login`
4. Deberías entrar en `/dashboard`
