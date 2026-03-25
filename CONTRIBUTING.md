# Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema Operativo Petrolero! 🎉

## 🤝 Cómo Contribuir

### 1. Fork y Clone
```bash
# Fork el repositorio desde GitHub
# Luego clona tu fork:
git clone https://github.com/sensei7u7r/petroleum-system.git
cd petroleum-system
```

### 2. Crear Branch
```bash
git checkout -b feature/descripcion-corta
# O para bugfixes:
git checkout -b fix/descripcion-del-bug
```

### 3. Hacer Cambios
- Mantené el estilo de código existente
- Agregá comentarios cuando sea necesario
- Probá tus cambios localmente

### 4. Commit
```bash
git add .
git commit -m "feat: descripción clara del cambio"
```

**Convenciones de commits:**
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` formato, punto y coma faltantes, etc
- `refactor:` refactorización de código
- `test:` agregar tests
- `chore:` actualizar dependencias, etc

### 5. Push y Pull Request
```bash
git push origin feature/tu-branch
```
Luego abrí un Pull Request en GitHub con:
- Descripción clara del cambio
- Screenshots si es visual
- Referencia a issues relacionados

## 📋 Áreas de Contribución

### Alta prioridad
- [ ] Tests unitarios (Jest/Mocha)
- [ ] Migración a PostgreSQL
- [ ] WebSockets para tiempo real
- [ ] Sistema de autenticación JWT

### Media prioridad
- [ ] Internacionalización (i18n)
- [ ] Modo offline con Service Workers
- [ ] Exportar datos a Excel/CSV
- [ ] Dashboard analytics avanzado

### Bugs conocidos
- [ ] Filtros no persisten al cambiar de página
- [ ] Switches en mobile requieren doble tap
- [ ] Gráficos no son responsive en tablets

## 🐛 Reportar Bugs

Usá el template de issues de GitHub e incluí:
1. **Descripción clara** del problema
2. **Pasos para reproducir**
3. **Comportamiento esperado** vs **actual**
4. **Screenshots** si aplica
5. **Entorno** (OS, navegador, versión Node)

## 💡 Solicitar Features

Abrí un issue con tag `enhancement` explicando:
- Qué problema resuelve
- Cómo imaginás la solución
- Casos de uso específicos

## ⚡ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Modo desarrollo con hot reload
npm run dev

# Linter
npm run lint

# Tests (cuando existan)
npm test
```

## 📝 Estilo de Código

- **Indentación:** 2 espacios
- **Comillas:** simples `'texto'` en JS
- **Semicolons:** sí, siempre
- **Nombres:** camelCase para variables, PascalCase para componentes
- **Comentarios:** en español, concisos

## 🎯 Proceso de Review

1. Al menos 1 aprobación requerida
2. CI debe pasar (cuando esté configurado)
3. Sin conflictos con `main`
4. Código revisado por calidad y seguridad

## 📄 Licencia

Al contribuir, aceptás que tu código será licenciado bajo MIT License.

---

¿Dudas? Abrí un issue o contactame directamente.
