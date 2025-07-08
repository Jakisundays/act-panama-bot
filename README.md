# 🤖 NoMeJodasBot - Asistente Legal Constitucional

**Bot oficial de ACT Panamá (Acción Ciudadana Transformadora)**

## 🇵🇦 Sobre ACT Panamá

ACT Panamá es un movimiento político ciudadano que nace del hartazgo frente a la corrupción, la desigualdad y la falta de oportunidades reales. No venimos a prometer, venimos a **actuar**. Porque el país no cambia con discursos, sino con gente decidida a transformar desde adentro.

### ✊ ¿Qué significa A.C.T.?
- **Acción** – Porque el cambio real requiere moverse, no solo hablar.
- **Ciudadana** – Porque el poder le pertenece al pueblo, no a una élite.
- **Transformadora** – Porque ya no queremos parches, queremos evolución.

### 🎯 Nuestra misión
- Romper con la política tradicional basada en clientelismo y favores.
- Devolverle a los ciudadanos el control sobre el destino de Panamá.
- Crear una nueva cultura política: más ética, más abierta, más humana.

### 🌱 Nuestros pilares
- **Justicia social** para todxs, sin excepciones.
- **Transparencia radical** en cada acción y cada decisión.
- **Educación, salud y tecnología** como base del desarrollo real.
- **Juventud activa** liderando el presente, no esperando el futuro.

## 🤖 Sobre el Bot

**Acti** es el asistente legal oficial de ACT Panamá, un bot de WhatsApp entrenado exclusivamente con la Constitución de la República de Panamá. Su misión es empoderar a ciudadanos panameños que no conocen de leyes, explicándoles de forma clara y sencilla cuáles son sus derechos constitucionales.

### 🎯 Funcionalidades

- **Consultas Constitucionales**: Responde preguntas sobre derechos y deberes constitucionales
- **Explicaciones Simples**: Traduce el lenguaje legal a términos comprensibles
- **Referencias Precisas**: Siempre cita el artículo constitucional correspondiente
- **Prevención de Abusos**: Ayuda a identificar cuando se vulneran derechos constitucionales
- **Acceso 24/7**: Disponible en WhatsApp las 24 horas del día

### 🔧 Tecnologías Utilizadas

- **Node.js** con TypeScript
- **BuilderBot** - Framework para bots de WhatsApp
- **Baileys** - Proveedor de WhatsApp Web
- **Upstash Vector** - Base de datos vectorial para RAG
- **Together AI** - Modelo de IA (DeepSeek-V3)
- **RAG Chat** - Sistema de recuperación y generación aumentada

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- pnpm (recomendado) o npm
- Cuenta en Together AI
- Base de datos vectorial en Upstash

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd nomejodasbot
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

Copia el archivo `example.env` a `.env` y configura las siguientes variables:

```env
# Together AI API Key
TOGETHER_AI_KEY="tu_clave_de_together_ai"

# Upstash Vector Database
UPSTASH_VECTOR_REST_TOKEN="tu_token_de_upstash"
UPSTASH_VECTOR_REST_URL="https://tu-url-de-upstash.upstash.io"

# Public Base URL (opcional)
PUBLIC_BASE_URL="https://tu-url-publica.com"
```

### 4. Ejecutar en desarrollo

```bash
pnpm dev
```

### 5. Construir para producción

```bash
pnpm build
pnpm start
```

## 📱 Uso del Bot

1. **Escanea el código QR** que aparece en la consola con WhatsApp
2. **Envía un mensaje** al bot con tu consulta constitucional
3. **Recibe respuestas** basadas en la Constitución de Panamá

### Ejemplos de consultas:

- "¿Cuáles son mis derechos como trabajador?"
- "¿Puede la policía revisar mi teléfono sin orden judicial?"
- "¿Qué dice la constitución sobre la libertad de expresión?"
- "¿Cuáles son mis derechos durante una detención?"

## 🏗️ Arquitectura del Proyecto

```
src/
├── ai/                 # Configuración del modelo de IA
│   └── index.ts       # Clase Bot con RAG Chat
├── flows/             # Flujos de conversación
│   └── index.ts       # Flujo principal
├── layers/            # Capas de procesamiento
│   ├── conversational.layer.ts  # Manejo del historial
│   └── main.layer.ts            # Lógica principal
├── utils/             # Utilidades
│   └── index.ts       # Funciones de historial
└── app.ts             # Punto de entrada
```

## 🔒 Características de Seguridad

- **Respuestas Verificadas**: Solo responde con base en la Constitución de Panamá
- **No Inventa Información**: Si no tiene contexto suficiente, lo indica claramente
- **Transparencia**: Siempre cita el artículo constitucional correspondiente
- **Privacidad**: No almacena información personal de los usuarios

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 📞 Contacto

**ACT Panamá - Acción Ciudadana Transformadora**

*"Una generación decidida a hacer historia."*

---

### 🗣️ Frases que nos definen

- "No votes, **actúa**."
- "Somos Panamá activado."
- "El poder no se hereda, se recupera."
- "No venimos a ocupar cargos. Venimos a transformar el sistema."

---

**💥 ¿Qué no somos?**
- No somos izquierda ni derecha.
- No somos otro partido reciclado con nueva cara.
- No somos "los mismos de siempre".

**Somos el cambio que Panamá necesita. 🇵🇦**