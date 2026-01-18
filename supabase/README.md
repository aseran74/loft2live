# Configuración de Base de Datos - Proyectos Loft2live

## Migración de Base de Datos

Este directorio contiene las migraciones SQL para crear la tabla de proyectos en Supabase.

### Pasos para aplicar la migración:

1. **Accede a tu proyecto de Supabase:**
   - Ve a https://app.supabase.com
   - Selecciona tu proyecto

2. **Aplica la migración:**
   - Ve a "SQL Editor" en el menú lateral
   - Copia el contenido del archivo `migrations/001_create_proyectos_table.sql`
   - Pega y ejecuta el SQL en el editor

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto
   - Agrega las siguientes variables:
     ```
     VITE_SUPABASE_URL=tu_url_de_supabase
     VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
     ```
   - Puedes encontrar estas credenciales en: Settings > API de tu proyecto Supabase

### Estructura de la tabla `proyectos`:

- `id` (UUID): Identificador único
- `nombre_proyecto` (VARCHAR): Nombre del proyecto
- `objetivo_inversion_total` (DECIMAL): Objetivo de inversión en EUR
- `localizacion` (VARCHAR): Ubicación del proyecto
- `permisos` (TEXT): Información sobre permisos
- `num_lofts` (INTEGER): Número de lofts
- `precio_unidad` (DECIMAL): Precio por unidad en EUR
- `gasto_estimado_comunidad` (DECIMAL): Gasto estimado de comunidad
- `tipo_inversion` (VARCHAR): Tipo de inversión (Quarterly Bullet, Monthly, Annual)
- `porcentaje_llegado` (DECIMAL): Porcentaje de inversión alcanzado
- `min_termino_meses` (INTEGER): Término mínimo en meses
- `monto_restante` (DECIMAL): Monto restante para alcanzar el objetivo
- `created_at` (TIMESTAMP): Fecha de creación
- `updated_at` (TIMESTAMP): Fecha de última actualización

### Políticas de Seguridad (RLS):

Las políticas actuales permiten:
- Lectura pública de proyectos
- Inserción, actualización y eliminación sin restricciones

**Nota:** Ajusta las políticas de Row Level Security según tus necesidades de autenticación y autorización.
