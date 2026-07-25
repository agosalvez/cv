# Guía de fotografías reales para `/setup`

Esta guía define las fotografías necesarias para sustituir los recursos temporales de la landing. Los nombres propuestos coinciden con las rutas centralizadas en `src/data/setup.ts`; al conservarlos, el reemplazo no exigirá modificar componentes.

## Recomendaciones generales

- Fotografía con luz uniforme y sin mezclar temperaturas de color extremas.
- Limpia lentes y superficies antes de cada toma.
- Evita reflejos directos en monitores, datos privados, credenciales y notificaciones visibles.
- Muestra el espacio tal como se utiliza, sin convertirlo en un escenario artificial.
- Conserva los originales, preferiblemente en RAW o JPEG de máxima calidad.
- No apliques filtros intensos. Ajustes moderados de exposición, balance de blancos y perspectiva son suficientes.
- Deja margen alrededor de los elementos importantes para permitir recortes responsive.

## 1. Vista general del setup completo

- **Archivo sugerido:** `setup-overview.jpg`
- **Qué debe aparecer:** escritorio IKEA Bekant en L, tres monitores, torre personal, posición del portátil Dell y una referencia visual del cockpit situado a la derecha.
- **Orientación:** horizontal.
- **Encuadre recomendado:** toma frontal ligeramente elevada desde una distancia suficiente para mostrar la relación entre trabajo y ocio. Mantener líneas verticales rectas y dejar aire a ambos lados.
- **Proporción aproximada:** 3:2.
- **Resolución mínima:** 2400 × 1600 px.
- **Sección:** hero.
- **Sustituye a:** `public/images/setup/workspace-overview.jpg`.

## 2. Distribución de los tres monitores

- **Archivo sugerido:** `monitor-layout.jpg`
- **Qué debe aparecer:** Philips 243V vertical a la izquierda, LG Ergo UltraWide en el centro y Lenovo Legion R27qe a la derecha.
- **Orientación:** horizontal.
- **Encuadre recomendado:** toma frontal centrada a la altura de los ojos, con los tres paneles completos y suficiente espacio para entender su tamaño relativo. Usar contenido neutro en pantalla.
- **Proporción aproximada:** 16:9.
- **Resolución mínima:** 2560 × 1440 px.
- **Sección:** distribución de pantallas.
- **Sustituye a:** el esquema de la disposición dibujado en `DisplayDiagram.astro`. Al añadir la fotografía, decidir si el esquema se mantiene como complemento o se retira.

## 3. Zona de teclado, ratón y tapete

- **Archivo sugerido:** `desk-peripherals.jpg`
- **Qué debe aparecer:** Keychron K2 HE, Logitech MX Vertical y tapete IKEA LÅNESPELARE.
- **Orientación:** horizontal.
- **Encuadre recomendado:** vista diagonal desde arriba, mostrando la relación real entre los tres elementos sin incluir accesorios ajenos. Mantener las manos fuera del encuadre salvo que aporten escala.
- **Proporción aproximada:** 4:3.
- **Resolución mínima:** 2000 × 1500 px.
- **Sección:** periféricos. La imagen se recorta en vertical (3:4), así que conviene dejar margen suficiente arriba y abajo.
- **Sustituye a:** `public/images/setup/workspace-peripherals.jpg`.

## 4. Audio, webcam, micrófono e iluminación

- **Archivo sugerido:** `audio-video-lighting.jpg`
- **Qué debe aparecer:** Sony WH-1000XM5, HyperX QuadCast, Logitech C920, BenQ ScreenBar y Elgato Key Light Neo. Los Sony WF-1000XM5 pueden aparecer como detalle secundario, no como protagonista.
- **Orientación:** horizontal.
- **Encuadre recomendado:** ángulo de tres cuartos que permita reconocer la posición real de webcam, micrófono y luces alrededor del monitor. Evitar encender luces al máximo para no quemar altas luces.
- **Proporción aproximada:** 3:2.
- **Resolución mínima:** 2400 × 1600 px.
- **Sección:** audio, vídeo e iluminación.
- **Sustituye a:** `public/images/setup/workspace-audio.jpg`.

## 5. Mesa, silla y reposapiés

- **Archivo sugerido:** `furniture-comfort.jpg`
- **Qué debe aparecer:** Secretlab Titan Evo en primer plano, forma en L del escritorio IKEA Bekant y reposapiés IKEA ÖVNING.
- **Orientación:** vertical, porque la sección recorta la imagen a 3:4.
- **Encuadre recomendado:** toma lateral con la silla ligeramente separada de la mesa para que el reposapiés resulte visible. Evitar poses o afirmaciones visuales de tipo médico.
- **Resolución mínima:** 1500 × 2000 px.
- **Sección:** mobiliario y comodidad.
- **Sustituye a:** `public/images/setup/workspace-furniture.jpg`.

## 6. Switch HDMI, hub USB y gestión de conexiones

- **Archivo sugerido:** `connection-management.jpg`
- **Qué debe aparecer:** switch HDMI, hub USB, conexiones que permiten alternar torre y portátil y, si el encuadre lo permite, separación entre las dos regletas.
- **Orientación:** horizontal.
- **Encuadre recomendado:** plano cercano y ordenado, fotografiado en diagonal para mostrar entradas y salidas sin exponer números de serie. Si ambas regletas aparecen, debe distinguirse claramente cuál protege la zona de trabajo.
- **Proporción aproximada:** 3:2.
- **Resolución mínima:** 1800 × 1200 px.
- **Sección:** conexiones y alimentación, la única que hoy no lleva imagen.
- **Cómo añadirla:** declarar la imagen en `setupImages` y asignarla al campo `image` de la sección `conexiones` en `src/data/setup.ts`. La página ya la renderiza si existe.

## 7. Vista general del cockpit

- **Archivo sugerido:** `simracing-cockpit.jpg`
- **Qué debe aparecer:** cockpit VEVOR Racing completo, Logitech G29 y LG UltraGear 32GS60QC-B, mostrando su ubicación a la derecha de la mesa.
- **Orientación:** horizontal.
- **Encuadre recomendado:** toma de tres cuartos desde el lado de acceso al asiento. Mostrar el conjunto completo y una pequeña referencia del escritorio para situarlo dentro de la habitación.
- **Proporción aproximada:** 3:2, que es el recorte de la sección.
- **Resolución mínima:** 2400 × 1600 px.
- **Sección:** gaming y simracing.
- **Sustituye a:** `public/images/setup/workspace-simracing.jpg`.

## 8. Detalle del Logitech G29 y LG UltraGear

- **Archivo sugerido:** `simracing-controls.jpg`
- **Qué debe aparecer:** volante Logitech G29 en primer plano y monitor LG UltraGear 32GS60QC-B al fondo.
- **Orientación:** horizontal.
- **Encuadre recomendado:** plano medio desde la posición del conductor, con el volante nítido y la pantalla ligeramente desenfocada o mostrando una imagen neutra sin marcas de terceros dominantes.
- **Proporción aproximada:** 3:2.
- **Resolución mínima:** 2400 × 1600 px.
- **Sección:** detalle opcional de gaming y simracing.

## 9. Imagen horizontal para Open Graph

- **Archivo sugerido:** `setup-social.jpg`
- **Qué debe aparecer:** vista reconocible del setup real con el monitor central y parte de los laterales, evitando información pequeña que se pierda al reducir la imagen.
- **Orientación:** horizontal.
- **Encuadre recomendado:** composición limpia con el setup desplazado ligeramente hacia la derecha o izquierda y espacio negativo útil. No incluir texto incrustado; los metadatos sociales ya proporcionan título y descripción.
- **Proporción aproximada:** 1.91:1.
- **Resolución mínima:** 2400 × 1260 px; exportación final recomendada de 1200 × 630 px.
- **Sección:** metadatos Open Graph y vista previa en redes.
- **Situación actual:** la página usa la foto de perfil del CV como imagen social, para no compartir una imagen de archivo como si fuera el setup real. Al disponer de esta fotografía, pasarla como `ogImage` en `src/pages/[lang]/setup.astro`.

## Flujo de sustitución

1. Exportar cada fotografía con el nombre indicado.
2. Optimizar en JPEG con perfil sRGB, manteniendo una calidad visual alta.
3. Sustituir el archivo temporal correspondiente dentro de `public/images/setup/`.
4. Actualizar en `src/data/setup.ts` las dimensiones finales, el texto alternativo, la fuente y `temporary: false`.
5. Para fotografías nuevas que actualmente no tienen archivo temporal, añadir su ruta únicamente en `src/data/setup.ts`.
6. Ejecutar `npm test` y `npm run build`, y revisar `/es/setup` y `/en/setup` en móvil y escritorio.
