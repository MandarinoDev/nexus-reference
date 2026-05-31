# Configurar Supabase Auth en LexSimple

## 1. Crear proyecto en Supabase

1. Entra en [https://supabase.com](https://supabase.com) y crea un proyecto.
2. Ve a **Project Settings -> API**.
3. Copia:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Importante:
- `NEXT_PUBLIC_SUPABASE_URL` debe ser solo la URL base del proyecto.
- Correcto: `https://xxxxx.supabase.co`
- Incorrecto: `https://xxxxx.supabase.co/rest/v1/`

## 2. Variables de entorno locales

Crea `.env.local` en la raiz del proyecto (puedes copiar desde `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

`NEXT_PUBLIC_SITE_URL` debe ser una URL absoluta sin path:
- Correcto: `https://lexsimple.es`
- Incorrecto: `https://lexsimple.es/auth/callback`

## 3. Auth en el panel de Supabase

1. **Authentication -> Providers -> Email**: activado.
2. **Authentication -> URL Configuration**:
   - **Site URL**:
     - local: `http://localhost:3000`
     - produccion: `https://lexsimple.es` (tu dominio final)
   - **Redirect URLs** (agrega todas las que uses):
     ```txt
     http://localhost:3000/auth/callback
     https://lexsimple.es/auth/callback
     https://TU-PROYECTO.vercel.app/auth/callback
     ```

3. Opcional en desarrollo:
   - **Authentication -> Providers -> Email** -> desactiva **Confirm email**.

## 4. Vercel

En **Vercel -> Project Settings -> Environment Variables**, configura estas 3 variables para los entornos que uses (Production / Preview / Development):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (ejemplo: `https://lexsimple.es`)

Tras cambiar variables en Vercel, haz un redeploy.

## 5. Error comun: "Invalid path specified in request URL"

Si aparece al registrarte:

1. Verifica que `NEXT_PUBLIC_SUPABASE_URL` no tenga `/rest/v1`.
2. Verifica que `NEXT_PUBLIC_SITE_URL` tenga protocolo (`http://` o `https://`) y no tenga path.
3. Verifica que `/auth/callback` este agregado en Redirect URLs de Supabase para tu dominio.
4. Redeploy en Vercel despues de ajustar variables.

## 6. Rutas de la app

| Ruta | Descripcion |
|------|-------------|
| `/register` | Registro de usuario |
| `/login` | Inicio de sesion |
| `/dashboard` | Area privada (requiere sesion) |
| `/auth/callback` | Callback de confirmacion de email |

## 7. Probar

```bash
pnpm dev
```

1. Abre `http://localhost:3000/register`.
2. Crea una cuenta.
3. Inicia sesion en `/login`.
4. Deberias entrar en `/dashboard`.

## 8. Links de suscripcion PayPal (Growth/Scale)

Para usar links directos de PayPal (sin `client_id` ni `client_secret`), configura estas variables:

```env
PAYPAL_GROWTH_SUBSCRIPTION_URL=https://www.paypal.com/webapps/billing/plans/tu-link-growth
PAYPAL_SCALE_SUBSCRIPTION_URL=https://www.paypal.com/webapps/billing/plans/tu-link-scale
```

- El boton de cada plan en `/dashboard` usa su variable correspondiente.
- Si falta un link o la URL es invalida, ese plan se desactiva y muestra aviso.
