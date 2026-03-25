# 🛢️ Sistema Operativo Petrolero — Argentina

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> Sistema de monitoreo y control en tiempo real para operaciones petroleras. Diseñado para centralizar datos de producción, costos, márgenes y alertas operativas en una interfaz intuitiva y escalable.

[Demo en Vivo](#) • [Documentación](#instalación) • [Características](#características-principales) • [Contacto](#autor)

---

## 📸 Preview

<div align="center">
  <img src="docs/screenshots/overview.png" alt="Vista General" width="100%">
  <p><em>Vista General — Métricas clave, histórico de producción y acceso rápido a subsistemas</em></p>
</div>

<div align="center">
  <img src="docs/screenshots/campos.png" alt="Campos y Pozos" width="48%">
  <img src="docs/screenshots/margenes.png" alt="Márgenes" width="48%">
  <p><em>Izquierda: Control de campos y pozos | Derecha: Simulador de márgenes</em></p>
</div>

---

## ✨ Características Principales

### 🎯 Vista General
- **Dashboard ejecutivo** con 4 métricas críticas en tiempo real
- Gráfico histórico de 3 productos (Crudo, Gas, Condensado)
- Rangos temporales configurables (6M / 1A / 2A)
- Acceso directo a 6 subsistemas operativos

### ⚙️ Campos y Pozos
- Monitoreo de **4 campos** con producción (bbl), eficiencia (%) y estado
- Control de **4 pozos** con presión (psi) y temperatura
- Gestión de **6 tanques** con niveles de capacidad
- Switches interactivos para activar/desactivar operaciones
- Sistema de alertas por colores (Verde/Naranja/Rojo)

### 📋 Hoja de Productos
- Gestión completa de lotes salientes con destino, volumen y valor USD
- Filtros dinámicos por provincia y tipo de producto
- Control de despacho con barras de progreso
- Switches individuales para pausar/reanudar envíos

### 🗺️ Provincias
- Vista consolidada de 6 provincias productoras
- Métricas por provincia: producción, cuenca, ingreso y margen
- Detalles expandibles con costos operativos desglosados

### 💰 Márgenes y Costos
- Desglose de costos operativos (extracción, transporte, refinación, regalías)
- Simulador interactivo con 3 sliders:
  - Precio Brent ($50 - $120/bbl)
  - Producción (50k - 300k bbl/día)
  - Costo operativo ($15 - $60/bbl)
- Cálculo en tiempo real de margen neto

### 📊 Regresión y Proyección
- Modelo de regresión lineal sobre datos históricos
- Proyección a 30 días con intervalo de confianza 95%
- Scatter de correlación Precio Brent vs Producción
- Indicadores estadísticos (R², p-valor, Durbin-Watson)

### 🚨 Central de Comunicaciones
- Panel de alertas activas ordenadas por criticidad
- Chat en vivo con HQ Buenos Aires
- Estado de sistemas SCADA con switches de activación
- Sistema de reconocimiento de alertas persistente

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | Vanilla JavaScript, HTML5, CSS3 |
| **Backend** | Node.js 18+, Express.js 4.x |
| **Base de Datos** | JSON (db.json) — migrable a PostgreSQL |
| **Autenticación** | Token Bearer (JWT ready) |
| **Arquitectura** | REST API + Responsive SPA |

**Por qué este stack:**
- ⚡ **Zero dependencies** en frontend (carga instantánea)
- 🔧 **Fácil de customizar** sin frameworks complejos
- 📦 **Portable** - funciona en cualquier servidor Node
- 🚀 **Escalable** a PostgreSQL/MongoDB sin refactorizar

---

## 📥 Instalación

### Requisitos
- Node.js 18+ ([Descargar](https://nodejs.org/))
- npm 8+ (incluido con Node.js)

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/petroleum-system.git
cd petroleum-system

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor
npm start
```

El sistema estará disponible en:
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001
- **Health Check:** http://localhost:3001/api/health

---

## 📖 Uso Rápido

### Verificar conexión API
```bash
# Desde navegador
http://localhost:3001/api/health

# Con curl
curl -H "Authorization: Bearer petroleum-ar-2025" \
     http://localhost:3001/api/overview
```

### Cambiar token de seguridad
```bash
# En server.js (línea ~12)
const TOKEN = 'tu-token-personalizado';

# O por variable de entorno
API_TOKEN=mi-token-secreto npm start
```

### Actualizar datos reales
Editar `data/db.json`:
```json
{
  "overview": {
    "produccion_bbl": 158400,  // Producción total del día
    "brent_usd": 84.60,         // Precio Brent actual
    "ingreso_diario_usd": 13390000, // Ingreso estimado
    "alertas_criticas": 3
  },
  "campos": [
    {
      "id": 1,
      "nombre": "Vaca Muerta Norte",
      "produccion_bbl": 62000,
      "eficiencia_pct": 87,
      "activo": true,
      "estado": "ok" // ok | alerta | critico
    }
  ]
}
```

Guardá el archivo — **no requiere reiniciar el servidor**.

---

## 🎨 Temas

El sistema incluye modo claro/oscuro persistente:
- Botón ☀️/🌙 en topbar derecho
- Preferencia guardada en `localStorage`
- Switching instantáneo sin recarga

---

## 📊 Arquitectura del Sistema

```
petroleum-system/
│
├── public/               # Frontend estático
│   ├── index.html       # SPA principal (541 líneas)
│   └── assets/          # Imágenes, iconos
│
├── data/
│   └── db.json          # Base de datos persistente
│
├── server.js            # API REST (Express)
├── package.json
└── README.md
```

### Flujo de datos
```
Usuario → Frontend (index.html)
         ↓
    API REST (server.js)
         ↓
    Base de datos (db.json)
         ↓
    Respuesta JSON
         ↓
    Renderizado en pantalla
```

---

## 🚀 Roadmap

- [ ] **Autenticación JWT** con login de usuarios
- [ ] **WebSockets** para actualizaciones en tiempo real (cada 30s)
- [ ] **PostgreSQL** para multi-tenancy y concurrencia
- [ ] **Exportar a Excel/PDF** desde Hoja de Productos
- [ ] **Notificaciones push** para alertas críticas
- [ ] **Deploy** en Railway/Vercel con CI/CD

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork del proyecto
2. Crear branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar X funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**. Ver archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2025 BayronDev

Se permite el uso, copia, modificación y distribución de este software
con o sin modificaciones, con fines comerciales o no comerciales.
```

---

## 👤 Autor

**BayronDev**

- 🌐 Portfolio: [https://sensei7u7r.github.io/Portafolio/]
- 💼 LinkedIn: [https://www.linkedin.com/in/bayron-gaitan-9a24153b7/]
- 📧 Email: bayronromero1232@gmail.com
- 🐙 GitHub: [bayrondsn](https://github.com/Sensei7u7r)

### 💼 ¿Necesitás una customización?

Este sistema base es **open source**, pero ofrezco servicios de:
- ✅ Adaptación a tu operación específica (YPF, Pampa Energía, etc.)
- ✅ Integración con sensores IoT y SCADA real
- ✅ Migración a PostgreSQL/MongoDB
- ✅ Deploy en infraestructura cloud
- ✅ Desarrollo de módulos adicionales

**Cotizá tu proyecto:** [Fiverr](#) | [Upwork](#) | [Email directo](#)

---

## 🙏 Agradecimientos

- Inspirado en sistemas de control industrial SCADA
- Datos demostrativos basados en estructura de YPF Argentina
- UI/UX influenciada por Bloomberg Terminal y sistemas financieros

---

<div align="center">
  <strong>⭐ Si este proyecto te resultó útil, dejá una estrella en GitHub</strong><br>
  <sub>Ayuda a que más desarrolladores descubran este sistema</sub>
</div>

---

**📌 Nota importante:** Este sistema usa datos demostrativos. Para uso en producción real, debés:
1. Migrar a base de datos robusta (PostgreSQL/MongoDB)
2. Implementar autenticación con JWT y roles
3. Configurar HTTPS y certificados SSL
4. Aplicar rate limiting y validaciones de entrada
5. Auditoría de seguridad completa
