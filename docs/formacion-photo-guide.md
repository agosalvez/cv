# Guía de fotos — landing de formación

**Los tres huecos ya tienen fotografía real** (agosto de 2026), de la sesión
corporativa de Aunoa. Este documento se conserva como criterio para cuando haya
que repetirlas: qué va en cada hueco y con qué encuadre.

Dos avances quedaron pendientes respecto a lo descrito aquí: la foto de la sala
de reuniones lleva las caras del equipo sustituidas para no publicar la imagen
de terceros, y en la de «trabajando» la mirada va a cámara y no a la pantalla.

Las fotos importan aquí más que en el resto de la web. La página se abre después
de haberte conocido, y su trabajo es confirmar que hay una persona real y
solvente detrás. Un retrato de archivo o un selfi recortado hacen justo lo
contrario.

---

## Reglas que valen para las tres

| | |
|---|---|
| **Fotógrafo** | Con un móvil moderno basta, pero que las haga otra persona. Nada de temporizador ni de selfi. |
| **Luz** | De ventana, de lado o en tres cuartos. Nunca flash directo ni fluorescente cenital: marcan ojeras. |
| **Ropa** | Lisa. Sin estampados, sin rayas finas (vibran en pantalla) y sin logotipos. |
| **Fondo** | Ordenado y con profundidad. Mejor una oficina real desenfocada que una pared blanca vacía. |
| **Coherencia** | Las tres del mismo día y con el mismo registro de ropa. Si en una vas de camisa azul y en otra de traje, parecen de dos personas distintas. |
| **Cantidad** | Haz treinta de cada una y elige después. Las buenas salen por acumulación, no por puntería. |

**Registro recomendado: camisa lisa, sin corbata y sin americana.** Con traje
completo pareces consultor de gran cuenta y tu cliente es la pyme; en camiseta
pierdes autoridad para cobrar una formación. La camisa es el punto medio.

---

## Foto 1 — Retrato principal

**Dónde:** cabecera de la página, junto al titular. Es la que más se ve.

- **Encuadre:** vertical 4:5. De la cintura para arriba.
- **Vestuario:** camisa lisa azul, blanca o gris. Sin corbata ni americana.
- **Postura:** de pie, de frente o en tres cuartos. Brazos relajados o cruzados
  —cruzados dan seguridad, sueltos dan cercanía; prueba las dos.
- **Mirada:** a cámara. Es la única de las tres en la que miras al objetivo.
- **Expresión:** sonrisa leve, con la boca cerrada. Ni carcajada ni cara de foto
  de carné.
- **Fondo:** oficina o pared lisa, desenfocado.

**Archivo:** `public/images/formacion/retrato-hero.jpg` · ~1000 × 1250 px

---

## Foto 2 — Impartiendo

**Dónde:** sección de modalidades. Es la prueba de que esto es una actividad que
haces, no una idea que se te ha ocurrido.

- **Encuadre:** horizontal 3:2. Plano medio o general.
- **Postura:** de pie, explicando, gesticulando con las manos.
- **Mirada:** de perfil o en tres cuartos. **No mires a cámara.**
- **Escena:** ante una pantalla, una pizarra o un grupo. Si no tienes un grupo a
  mano, sirve una sala de reuniones con el proyector encendido.
- **Clave:** que se vea acción. Pide que te disparen mientras hablas de verdad;
  las posadas se notan a un kilómetro.

**Archivo:** `public/images/formacion/impartiendo.jpg` · ~1600 × 1067 px

> Si consigues hacerla en una sesión real con asistentes, **pide permiso** o
> encuadra de forma que no se les reconozca.

---

## Foto 3 — Trabajando

**Dónde:** sección de quién imparte. Respalda el perfil técnico.

- **Encuadre:** horizontal 3:2. Plano medio, desde un lado.
- **Vestuario:** camisa o jersey liso. Informal pero cuidado.
- **Postura:** sentado ante el portátil, trabajando. Atención en la pantalla.
- **Escena:** tu escritorio real, que ya está documentado en `/setup`. Que se
  vea el espacio.
- **Evitar:** manos apoyadas en el teclado sin escribir, sonrisa a cámara y
  escritorios vacíos de atrezzo.

**Archivo:** `public/images/formacion/trabajando.jpg` · ~1600 × 1067 px

---

## Cómo sustituirlas

1. Deja el archivo en `public/images/formacion/`.
2. En `src/data/training.ts`, dentro de `trainingImages`, actualiza la entrada:
   - `src` con la nueva extensión (`.jpg` en lugar de `.svg`),
   - `width` y `height` con las dimensiones reales,
   - `alt` si la escena cambia respecto a lo descrito,
   - `temporary: false`.
3. `npm test` y `npm run build`.

Los componentes no llevan ninguna ruta de imagen escrita: todo sale de
`trainingImages`, así que no hay que tocar marcado.

**Antes de subirlas:** redimensiona a los tamaños indicados y pásalas por un
compresor. Un JPEG de calidad 80 a esas medidas ronda los 150-250 KB. Una foto
de 4 MB directa de la cámara penaliza la carga en móvil, que es justo el
dispositivo desde el que se abrirá esta página tras escanear un QR.

`temporary: true` es una marca interna para el inventario del repositorio y
para esta guía: nunca se muestra al visitante.
