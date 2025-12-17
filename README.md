# 📱 To-Do List App – Ionic + Angular

Aplicación móvil híbrida desarrollada con **Ionic + Angular (Standalone Components)** que permite gestionar tareas y categorías, incorporando **Firebase Remote Config** para habilitar o deshabilitar funcionalidades mediante feature flags en tiempo real.

---

## 🚀 Tecnologías utilizadas

- Ionic Framework
- Angular (Standalone Components)
- Capacitor
- Firebase Remote Config
- Ionic Storage
- RxJS
- TypeScript

---

## ✨ Funcionalidades principales

- Crear, listar, completar y eliminar tareas
- Gestión de categorías
- Filtrado de tareas por categoría
- Persistencia local con Ionic Storage
- Feature flag dinámico con Firebase Remote Config
- UI reactiva y optimizada para mobile
- APK Android en modo release
---

## 🧩 Arquitectura y buenas prácticas

- Componentes standalone
- Servicios como fuente de verdad
- Estado compartido con `BehaviorSubject`
- `ChangeDetectionStrategy.OnPush`
- Inmutabilidad de estado
- Limpieza de subscripciones
- TrackBy en listas para mejor rendimiento

---

## 🎛 Feature Flag (Firebase Remote Config)

Se implementó el flag:

```text
enable_categories
```

🧪 Demostración del Feature Flag

Abrir Firebase Console

Remote Config → enable_categories

Cambiar valor (true / false)

Publicar cambios

En la app, el cambio se refleja automáticamente

🛠 Instalación y ejecución (modo desarrollo)
npm install
ionic serve

📦 Generación de APK
ionic build
ionic cap add android
ionic cap copy android
ionic cap open android


Desde Android Studio:

Build → Generate Signed Bundle / APK

Seleccionar APK (release)

📁 Estructura del proyecto
```bash
src/
 ├── app/
 │   ├── tab1/          # Tareas
 │   ├── tab2/          # Categorías
 │   ├── services/      # Servicios y estado
 │   ├── models/        # Modelos
 │   └── app.routes.ts
 ├── environments/
 └── theme/
```

🐳 Docker

No se dockerizó la aplicación debido a que se trata de una app móvil híbrida, cuyo artefacto final es un APK/IPA generado mediante Capacitor.
Docker es más adecuado para aplicaciones backend o servicios web desplegables.

👤 Autor

Edyson Leal
Desarrollador Full Stack / Mobile
Ionic · Angular · Java · Firebase