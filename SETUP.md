# Configuración de Proyectos Loft2live

## ✅ Paso 1: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
VITE_SUPABASE_URL=https://fbnvpgshbeosyrmypnlv.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

**Para obtener tu clave anónima:**
1. Ve a https://app.supabase.com
2. Selecciona tu proyecto
3. Ve a Settings > API
4. Copia la "anon public" key y pégala en el archivo `.env`

## ✅ Paso 2: Aplicar la Migración de Base de Datos

Tienes dos opciones:

### Opción A: Usando el SQL Editor de Supabase (Recomendado)

1. Ve a https://app.supabase.com
2. Selecciona tu proyecto `fbnvpgshbeosyrmypnlv`
3. Ve a "SQL Editor" en el menú lateral
4. Crea una nueva query
5. Copia y pega el contenido del archivo `supabase/migrations/001_create_proyectos_table.sql`
6. Ejecuta la query

### Opción B: Usando Supabase CLI

Si tienes Supabase CLI instalado:

```bash
supabase db push
```

## ✅ Paso 3: Verificar la Tabla

1. Ve a "Table Editor" en Supabase
2. Deberías ver la tabla `proyectos` creada
3. Puedes insertar datos de prueba directamente desde ahí

## 📋 Estructura de la Tabla

La tabla `proyectos` incluye los siguientes campos:

- **id**: UUID (generado automáticamente)
- **nombre_proyecto**: Nombre del proyecto
- **objetivo_inversion_total**: Objetivo de inversión en EUR
- **localizacion**: Ubicación del proyecto
- **permisos**: Información sobre permisos (opcional)
- **num_lofts**: Número de lofts
- **precio_unidad**: Precio por unidad en EUR
- **gasto_estimado_comunidad**: Gasto estimado de comunidad (opcional)
- **tipo_inversion**: Tipo de inversión (Quarterly Bullet, Monthly, Annual)
- **porcentaje_llegado**: Porcentaje de inversión alcanzado (0-100)
- **min_termino_meses**: Término mínimo en meses (default: 24)
- **monto_restante**: Monto restante para alcanzar el objetivo (calculado automáticamente)
- **created_at**: Fecha de creación (automático)
- **updated_at**: Fecha de última actualización (automático)

## 🚀 Uso de la Aplicación

Una vez configurado:

1. **Gestión de Proyectos**: Accede a `/proyectos` para crear, editar y eliminar proyectos
2. **Landing Page**: Los proyectos se mostrarán automáticamente en la sección "Oportunidades de inversión"

## 🔒 Seguridad

Las políticas RLS (Row Level Security) están configuradas para permitir:
- Lectura pública de proyectos
- Inserción, actualización y eliminación sin restricciones

**Nota:** Ajusta estas políticas según tus necesidades de autenticación en producción.
