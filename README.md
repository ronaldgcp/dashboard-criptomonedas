# 🚀 Dashboard de Criptomonedas

Un dashboard moderno y completo para el seguimiento de criptomonedas, construido como parte del reto de aprendizaje de IA para programación de Platzi.

## 📋 Descripción del Proyecto

Este proyecto es un dashboard interactivo para el seguimiento y análisis de criptomonedas que incluye:

- **Portfolio Overview**: Vista general del portafolio con métricas clave y gráficos en tiempo real
- **Portfolio Management**: Gestión detallada de holdings y asignación de activos
- **DeFi & Yield**: Seguimiento de pools de liquidez y rendimientos
- **NFT Tracker**: Monitorización de colecciones NFT y precios floor
- **On-Chain Data**: Análisis de actividad blockchain y estadísticas
- **Gas Tracker**: Monitoreo de precios de gas y estimaciones
- **Whale Alerts**: Alertas de movimientos grandes en el mercado
- **Sistema de Alertas**: Notificaciones personalizables

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 16.1.6 con React 19.2.4
- **Estilos**: Tailwind CSS 4.2.0
- **Componentes**: Radix UI para componentes accesibles
- **Gráficos**: Chart.js para visualizaciones interactivas
- **Tipado**: TypeScript 5.7.3
- **Gestión de Estado**: React Hooks y Context API
- **Iconos**: Lucide React
- **Formularios**: React Hook Form con Zod para validación

## 🎯 Características Principales

### 💰 Portfolio Management
- Seguimiento en tiempo real del valor del portafolio
- Visualización de holdings con cambios porcentuales
- Gráficos de rendimiento histórico
- Análisis de asignación de activos

### 📊 Análisis Avanzado
- Gráficos interactivos con múltiples períodos
- Estadísticas de red y métricas de mercado
- Mapa de calor de actividad blockchain
- Análisis de contratos inteligentes más utilizados

### 🔔 Sistema de Alertas Inteligentes
- Alertas de precio personalizables
- Notificaciones de gas económico
- Detección de movimientos de ballenas (whales)
- Alertas de portafolio y DeFi

### 🎨 Diseño Moderno
- Interfaz oscura elegante con gradientes
- Animaciones suaves y transiciones fluidas
- Diseño responsive para todos los dispositivos
- Tema personalizable con modo oscuro/claro

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm, yarn o pnpm

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/dashboard-criptomonedas.git
cd dashboard-criptomonedas
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
dashboard-criptomonedas/
├── app/                    # Páginas de Next.js
│   ├── page.tsx           # Página principal del dashboard
│   └── layout.tsx         # Layout principal
├── components/            # Componentes React
│   ├── dashboard/         # Componentes del dashboard
│   ├── ui/               # Componentes UI reutilizables
│   └── theme-provider.tsx # Proveedor de tema
├── lib/                   # Utilidades y configuraciones
├── public/               # Archivos estáticos
├── styles/               # Estilos globales
├── hooks/                # Custom hooks
└── .next/               # Build de Next.js
```

## 🎨 Componentes Destacados

### Sidebar Component
- Navegación principal con múltiples vistas
- Indicador de conexión de wallet
- Diseño minimalista con efectos hover

### Portfolio Chart
- Gráficos de línea con gradientes
- Múltiples períodos (1D, 1W, 1M, 3M, 1Y)
- Tooltips interactivos con datos detallados

### Metric Cards
- Tarjetas informativas con iconos
- Indicadores de rendimiento
- Animaciones de conteo

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env.local` para configurar variables de entorno:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
```

### Personalización
- Modifica los colores en `tailwind.config.js`
- Ajusta las métricas en `app/page.tsx`
- Personaliza componentes en `components/dashboard/`

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Mejoras Futuras

- [ ] Conexión real con APIs de criptomonedas
- [ ] Integración con wallets (MetaMask, WalletConnect)
- [ ] Sistema de notificaciones push
- [ ] Exportación de datos a CSV/Excel
- [ ] Modo móvil optimizado
- [ ] Multi-idioma
- [ ] Backtesting de estrategias

## 🙋‍♂️ Sobre el Desarrollador

Este proyecto fue desarrollado por **Ronald Cubides** como parte del reto de aprendizaje de IA para programación de Platzi. Es un demostración de las capacidades de la IA para asistir en el desarrollo de aplicaciones web modernas.

### ¿Cómo puedes ayudar?

Me encantaría recibir feedback y sugerencias para mejorar este proyecto:

- **Reportes de bugs**: Si encuentras algún error, por favor abre un issue
- **Sugerencias de features**: Ideas para nuevas funcionalidades
- **Mejoras de código**: Optimizaciones o mejores prácticas
- **Diseño UI/UX**: Mejoras en la interfaz y experiencia de usuario
- **Documentación**: Ayuda a mejorar la documentación del proyecto

### Contacto

Si quieres colaborar o tienes preguntas, no dudes en contactarme:

- GitHub: [tu-perfil-github]
- LinkedIn: [tu-perfil-linkedin]
- Email: [tu-email]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Mira el archivo [LICENSE](LICENSE) para más detalles.

---

**⭐ Si este proyecto te gusta, no olvides darle una estrella en GitHub!**

---

*Desarrollado con ❤️ por Ronald Cubides*
