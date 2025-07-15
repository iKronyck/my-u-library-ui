# Sistema de Autenticación con Magic Link

## Descripción

Este proyecto implementa un sistema de autenticación usando magic links con Zustand para el manejo de estado y persistencia de datos, conectado a tu API real.

## Características

- ✅ Autenticación mediante magic link
- ✅ Persistencia de datos con Zustand
- ✅ Protección de rutas por rol
- ✅ Middleware personalizado
- ✅ Componentes de protección de rutas
- ✅ Manejo de tokens JWT (access_token + refresh_token)
- ✅ React Query para manejo de estado del servidor
- ✅ Manejo de errores específicos de la API
- ✅ Datos reales del usuario desde el backend

## Estructura de Archivos

```
src/
├── stores/
│   └── auth-store.ts          # Store principal de autenticación
├── hooks/
│   ├── auth/
│   │   ├── useLogin.ts        # Hook para enviar magic link
│   │   ├── useMagicLogin.ts   # Hook para verificar token
│   │   └── index.ts           # Exportaciones
│   └── useAuth.ts             # Hook principal de autenticación
├── components/
│   └── auth/
│       └── ProtectedRoute.tsx # Componente de protección de rutas
├── app/
│   ├── auth/
│   │   └── magic-link/
│   │       └── page.tsx       # Página que procesa magic links
│   └── login/
│       └── page.tsx           # Página de login
└── types/
    └── auth.ts                # Tipos de autenticación
```

## Endpoints de la API

### 1. Enviar Magic Link

```
POST /api/resend-magic-link/
Body: { "email": "user@example.com" }
Response: { "message": "Magic link reenviado" }
Error: { "error": "User not found" }
```

### 2. Verificar Token

```
GET /api/magic-login/?token=abc123
Response: {
  "access_token": "jwt_token_here",
  "refresh_token": "refresh_token_here",
  "id": "1",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "role": "librarian",
  "date_joined": "2024-01-01T00:00:00Z"
}
Error: { "error": "Token inválido" }
```

## Uso

### 1. Enviar Magic Link

```tsx
import { useLogin } from "@/hooks";

function LoginPage() {
  const { mutate: sendMagicLink, isPending } = useLogin();

  const handleSubmit = (email: string) => {
    sendMagicLink({ email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <button disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar Magic Link"}
      </button>
    </form>
  );
}
```

### 2. Procesar Magic Link

El sistema automáticamente:

- Extrae el token de la URL: `/auth/magic-link?token=abc123`
- Llama a `/api/magic-login/?token=abc123`
- Recibe datos completos del usuario + tokens JWT
- Almacena los tokens y datos del usuario
- Redirige al dashboard según el rol

### 3. Protección de Rutas

```tsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Proteger ruta para cualquier usuario autenticado
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Proteger ruta solo para librarians
<ProtectedRoute requiredRole="librarian">
  <LibrarianDashboard />
</ProtectedRoute>
```

### 4. Uso del Store

```tsx
import { useAuthStore } from "@/stores/auth-store";

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
      <p>Bienvenido, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Rol: {user?.role}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}
```

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 2. Configurar tu API

Tu backend debe tener estos endpoints:

#### POST /api/resend-magic-link/

```json
// Request
{ "email": "user@example.com" }

// Success Response
{ "message": "Magic link reenviado" }

// Error Response
{ "error": "User not found" }
```

#### GET /api/magic-login/?token=abc123

```json
// Success Response
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": "1",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "role": "librarian",
  "date_joined": "2024-01-01T00:00:00Z"
}

// Error Response
{ "error": "Token inválido" }
```

## Flujo de Autenticación

1. **Usuario ingresa email** en `/login`
2. **Frontend llama** `POST /api/resend-magic-link/` con email
3. **Backend envía email** con magic link
4. **Usuario recibe email** con link: `http://localhost:3000/auth/magic-link?token=abc123`
5. **Frontend extrae token** de la URL
6. **Frontend llama** `GET /api/magic-login/?token=abc123`
7. **Backend valida token** y retorna JWT tokens + datos del usuario
8. **Frontend almacena tokens y datos** en Zustand (persistido en localStorage)
9. **Frontend redirige** al dashboard según el rol del usuario

## Manejo de Tokens JWT

### Access Token

- Se almacena en el store de Zustand
- Se usa para autenticar requests a la API
- Se persiste en localStorage

### Refresh Token

- Se almacena en el store (preparado para futuras implementaciones)
- Se puede usar para renovar el access token cuando expire

## Datos del Usuario

El sistema ahora maneja datos reales del usuario:

```typescript
interface User {
  id: string;
  email: string;
  name: string; // Combinación de first_name + last_name
  role: "student" | "librarian";
}
```

Los datos se extraen automáticamente de la respuesta del magic link:

- `id` → `response.id`
- `email` → `response.email`
- `name` → `${response.first_name} ${response.last_name}`
- `role` → `response.role`

## Personalización

### Cambiar URL de Redirección

Modifica `src/hooks/auth/useMagicLogin.ts`:

```typescript
// Redirigir según el rol del usuario
if (response.role === "librarian") {
  router.push("/dashboard/librarian");
} else {
  router.push("/dashboard/student");
}
```

### Agregar Más Campos del Usuario

Si tu API retorna campos adicionales, puedes extender el tipo `User`:

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: "student" | "librarian";
  dateJoined?: string; // Campo adicional
  avatar?: string; // Campo adicional
}
```

## Troubleshooting

### Error: "User not found"

- Verifica que el email existe en tu base de datos
- Confirma que el endpoint `/api/resend-magic-link/` está funcionando

### Error: "Token inválido"

- Verifica que el token no haya expirado
- Confirma que el endpoint `/api/magic-login/` está funcionando
- Revisa los logs del servidor para más detalles

### Magic link no llega al email

- Verifica la configuración de email en tu backend
- Confirma que el email está correctamente formateado
- Revisa la carpeta de spam

### Usuario no se redirige correctamente

- Verifica que el campo `role` está presente en la respuesta
- Confirma que las rutas de redirección existen
- Revisa la consola del navegador para errores

### Datos del usuario no se muestran correctamente

- Verifica que `first_name` y `last_name` están presentes en la respuesta
- Confirma que el campo `role` tiene el valor correcto
- Revisa que el `id` es un string válido
