/**
 * Contenido y metadatos de la landing `/setup`.
 *
 * Toda la información editorial, las rutas de imagen y los enlaces oficiales
 * viven aquí. Los componentes de `src/components/setup/` solo reciben datos:
 * sustituir una fotografía o un texto no debe requerir tocar el marcado.
 */

export type SetupLang = 'es' | 'en';

/** Texto disponible en los dos idiomas de la web. */
export interface Localized {
  es: string;
  en: string;
}

/**
 * Imagen de la landing.
 *
 * `temporary` marca las imágenes de archivo que todavía no son fotografías
 * reales del espacio. La marca es interna: sirve para el inventario del
 * repositorio y para la guía de `docs/setup-photo-guide.md`, y no se muestra
 * al visitante.
 */
export interface SetupImage {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  source: {
    name: string;
    author: string;
    url: string;
  };
  temporary: boolean;
}

/** Enlace al destino oficial del fabricante. Se omite si no existe uno inequívoco. */
export interface OfficialLink {
  url: string;
  label: Localized;
}

/**
 * Elemento del inventario: qué es, para qué se usa y qué se le pediría.
 *
 * `name` admite texto plano para los nombres de producto, que no se traducen,
 * y texto localizado para los elementos descritos por su función.
 */
export interface GearEntry {
  name: string | Localized;
  role: Localized;
  notes: Localized;
  specs?: Localized[];
  pending?: Localized;
  change?: Localized;
  link?: OfficialLink;
}

/** Bloque de equipos agrupados por función dentro de una sección. */
export interface GearGroup {
  label?: Localized;
  entries: GearEntry[];
}

export interface SetupSection {
  id: string;
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  groups?: GearGroup[];
  notes?: Localized[];
  image?: SetupImage;
}

export const localize = (text: Localized, lang: SetupLang): string => text[lang];

/** Como `localize`, pero acepta nombres de producto sin traducción. */
export const localizeName = (name: string | Localized, lang: SetupLang): string =>
  typeof name === 'string' ? name : name[lang];

const officialPage: Localized = { es: 'Página oficial', en: 'Official page' };
const viewProduct: Localized = { es: 'Ver producto', en: 'View product' };

/**
 * Imágenes de la landing.
 *
 * Todas son fotografías de archivo (Pexels) usadas de forma temporal: sirven de
 * referencia del encuadre que debe tener cada fotografía real, siguiendo
 * `docs/setup-photo-guide.md`. Al sustituirlas basta con reemplazar el archivo
 * en `public/images/setup/`, ajustar `width`/`height`/`alt` y poner
 * `temporary: false`.
 *
 * Los archivos viven bajo `public/images/` y no bajo `public/setup/`: ese
 * directorio se serviría en la misma URL que la página `/setup` y sobrescribiría
 * su redirección al construir el sitio.
 */
export const setupImages = {
  overview: {
    src: '/images/setup/workspace-overview.jpg',
    width: 1600,
    height: 1200,
    alt: {
      es: 'Escritorio en L con varias pantallas, torre y silla de escritorio',
      en: 'L-shaped desk with several displays, a tower and a desk chair',
    },
    source: {
      name: 'Pexels',
      author: 'Kaushal Moradiya',
      url: 'https://www.pexels.com/photo/modern-gaming-and-trading-setup-with-rgb-lighting-32260117/',
    },
    temporary: true,
  },
  peripherals: {
    src: '/images/setup/workspace-peripherals.jpg',
    width: 1200,
    height: 2134,
    alt: {
      es: 'Teclado mecánico retroiluminado y auriculares sobre un escritorio, junto a dos pantallas',
      en: 'Backlit mechanical keyboard and headphones on a desk, next to two displays',
    },
    source: {
      name: 'Pexels',
      author: 'Salah Darwish',
      url: 'https://www.pexels.com/photo/camera-on-monitor-screen-17112932/',
    },
    temporary: true,
  },
  audioVideo: {
    src: '/images/setup/workspace-audio.jpg',
    width: 1200,
    height: 800,
    alt: {
      es: 'Micrófono de condensador sobre un brazo articulado en un escritorio con luz natural',
      en: 'Condenser microphone on a boom arm at a desk lit by natural light',
    },
    source: {
      name: 'Pexels',
      author: 'Alpha En',
      url: 'https://www.pexels.com/photo/minimalist-home-office-with-microphone-setup-31726566/',
    },
    temporary: true,
  },
  furniture: {
    src: '/images/setup/workspace-furniture.jpg',
    width: 1200,
    height: 1800,
    alt: {
      es: 'Silla de escritorio con reposacabezas junto a una mesa de trabajo',
      en: 'Desk chair with a headrest next to a work desk',
    },
    source: {
      name: 'Pexels',
      author: 'Alpha En',
      url: 'https://www.pexels.com/photo/modern-home-office-chair-with-desktop-setup-31236091/',
    },
    temporary: true,
  },
  simracing: {
    src: '/images/setup/workspace-simracing.jpg',
    width: 1600,
    height: 1067,
    alt: {
      es: 'Cockpit de simracing con volante, asiento envolvente y pantalla curva',
      en: 'Sim racing cockpit with a wheel, bucket seat and curved display',
    },
    source: {
      name: 'Pexels',
      author: 'Matheus Bertelli',
      url: 'https://www.pexels.com/photo/realistic-vr-racing-simulator-experience-28993071/',
    },
    temporary: true,
  },
} satisfies Record<string, SetupImage>;

/** Etiquetas de interfaz de la landing. */
export const setupUi = {
  skipToContent: { es: 'Ir al contenido', en: 'Skip to content' },
  navLabel: { es: 'Navegación principal', en: 'Main navigation' },
  navCv: { es: 'CV', en: 'CV' },
  navSetup: { es: 'Setup', en: 'Setup' },
  languageLabel: { es: 'Idioma', en: 'Language' },
  tocLabel: { es: 'Índice de secciones', en: 'Sections index' },
  change: { es: 'Qué cambiaría', en: 'What I would change' },
  pending: { es: 'Por confirmar', en: 'To be confirmed' },
  newTab: { es: 'se abre en una pestaña nueva', en: 'opens in a new tab' },
} satisfies Record<string, Localized>;

/**
 * Índice de las secciones navegables, en orden de aparición. Es la fuente única
 * para el sumario superior: cada entrada debe corresponder a un `id` real de la
 * página.
 */
export const setupToc: { id: string; label: Localized }[] = [
  { id: 'vista-general', label: { es: 'Vista general', en: 'Overview' } },
  { id: 'equipos', label: { es: 'Equipos', en: 'Machines' } },
  { id: 'pantallas', label: { es: 'Pantallas', en: 'Displays' } },
  { id: 'perifericos', label: { es: 'Periféricos', en: 'Peripherals' } },
  { id: 'audio-video', label: { es: 'Audio y vídeo', en: 'Audio & video' } },
  { id: 'mobiliario', label: { es: 'Mobiliario', en: 'Furniture' } },
  { id: 'conexiones', label: { es: 'Conexiones', en: 'Connections' } },
  { id: 'software', label: { es: 'Software', en: 'Software' } },
  { id: 'gaming', label: { es: 'Gaming', en: 'Gaming' } },
  { id: 'funciona', label: { es: 'Aciertos', en: 'What works' } },
  { id: 'cambiaria', label: { es: 'Cambios', en: 'Changes' } },
];

export const setupSeo = {
  title: {
    es: 'Setup — Adrián Gosálvez',
    en: 'Setup — Adrián Gosálvez',
  },
  description: {
    es: 'El espacio de trabajo desde el que desarrollo software, trabajo con sistemas de inteligencia artificial y desconecto: equipos, pantallas, periféricos y decisiones tomadas a lo largo de los años.',
    en: 'The workspace I use to develop software, work with artificial intelligence systems and switch off: machines, displays, peripherals and decisions made over the years.',
  },
} satisfies Record<string, Localized>;

export const setupHero = {
  eyebrow: { es: 'Espacio de trabajo', en: 'Workspace' },
  title: {
    es: 'El setup desde el que construyo software e inteligencia artificial',
    en: 'The setup I build software and artificial intelligence from',
  },
  intro: {
    es: 'Este es el espacio desde el que desarrollo software, trabajo con sistemas de inteligencia artificial, participo en reuniones remotas y desconecto cuando termina la jornada. No es un setup construido de una sola vez: ha ido evolucionando con los años a partir de necesidades reales.',
    en: 'This is the space where I develop software, work with artificial intelligence systems, join remote meetings and switch off when the working day ends. It is not a setup built in one go: it has evolved over the years out of real needs.',
  },
  uses: [
    { es: 'Desarrollo de software', en: 'Software development' },
    { es: 'Inteligencia artificial', en: 'Artificial intelligence' },
    { es: 'Trabajo remoto', en: 'Remote work' },
    { es: 'Gaming', en: 'Gaming' },
    { es: 'Simracing', en: 'Sim racing' },
  ] satisfies Localized[],
  image: setupImages.overview,
};

export const setupOverview = {
  eyebrow: { es: 'Vista general', en: 'Overview' },
  title: {
    es: 'Un puesto compartido y una zona para desconectar',
    en: 'One shared workstation and an area to switch off',
  },
  paragraphs: [
    {
      es: 'El escritorio funciona como un único puesto: la torre personal y el portátil corporativo comparten las mismas tres pantallas y los mismos periféricos, y se alternan con un switch HDMI y un hub USB. Cambiar de contexto no implica cambiar de sitio ni recolocar cables.',
      en: 'The desk works as a single workstation: the personal tower and the corporate laptop share the same three displays and the same peripherals, switched over with an HDMI switch and a USB hub. Changing context does not mean changing seats or rearranging cables.',
    },
    {
      es: 'A la derecha de la mesa está el cockpit de simracing. Tenerlo separado del escritorio me ayuda a cerrar la jornada: el trabajo se queda en un sitio y el ocio ocurre en otro, dentro de la misma habitación.',
      en: 'The sim racing cockpit sits to the right of the desk. Keeping it away from the desk helps me close the day: work stays in one place and downtime happens in another, inside the same room.',
    },
  ] satisfies Localized[],
  facts: [
    {
      value: '2',
      label: { es: 'Equipos compartiendo periféricos', en: 'Machines sharing peripherals' },
    },
    {
      value: '3',
      label: { es: 'Pantallas con funciones distintas', en: 'Displays with distinct roles' },
    },
    {
      value: '2',
      label: { es: 'Zonas separadas: trabajo y ocio', en: 'Separate areas: work and play' },
    },
  ],
};

/**
 * Esquema de la disposición real de las tres pantallas.
 *
 * Las proporciones son relativas al conjunto y solo pretenden reflejar el
 * tamaño y la orientación de cada panel, no medidas exactas. Es el placeholder
 * editorial de esta sección mientras no exista una fotografía propia.
 */
export const displayDiagram = {
  caption: {
    es: 'Esquema de la disposición: panel de 24 pulgadas en vertical a la izquierda, ultrawide de 34 pulgadas en el centro y panel de 27 pulgadas a la derecha.',
    en: 'Layout diagram: 24-inch panel in portrait on the left, 34-inch ultrawide in the centre and 27-inch panel on the right.',
  },
  panels: [
    {
      widthPercent: 17,
      heightPercent: 100,
      label: { es: 'Izquierda', en: 'Left' },
      caption: { es: '24" vertical', en: '24" portrait' },
    },
    {
      widthPercent: 48,
      heightPercent: 62,
      label: { es: 'Centro', en: 'Centre' },
      caption: { es: '34" ultrawide', en: '34" ultrawide' },
    },
    {
      widthPercent: 35,
      heightPercent: 62,
      label: { es: 'Derecha', en: 'Right' },
      caption: { es: '27"', en: '27"' },
    },
  ],
};

export const setupSections: SetupSection[] = [
  {
    id: 'equipos',
    eyebrow: { es: 'Equipos principales', en: 'Primary machines' },
    title: {
      es: 'Una torre propia y un portátil corporativo',
      en: 'A personal tower and a corporate laptop',
    },
    intro: {
      es: 'Dos máquinas con propósitos distintos que comparten mesa, pantallas y periféricos. La torre asume el trabajo propio y el ocio; el portátil, la jornada laboral.',
      en: 'Two machines with different purposes sharing desk, displays and peripherals. The tower handles personal work and downtime; the laptop covers the working day.',
    },
    groups: [
      {
        entries: [
          {
            name: { es: 'Torre personal', en: 'Personal tower' },
            role: {
              es: 'Desarrollo, proyectos propios, ocio y gaming',
              en: 'Development, personal projects, downtime and gaming',
            },
            notes: {
              es: 'Es la máquina que uso fuera del horario corporativo, tanto para los entornos de desarrollo como para jugar. Va bien con varios servicios levantados a la vez, que es lo que suelo necesitar.',
              en: 'This is the machine I use outside corporate hours, both for development environments and for gaming. It copes well with several services running at once, which is what I usually need.',
            },
            specs: [
              { es: 'AMD Ryzen 7 5700X', en: 'AMD Ryzen 7 5700X' },
              { es: 'AMD Radeon RX 6750 XT, 12 GB', en: 'AMD Radeon RX 6750 XT, 12 GB' },
              { es: '32 GB de RAM', en: '32 GB of RAM' },
              { es: '2 TB de almacenamiento', en: '2 TB of storage' },
              { es: 'Windows 10 Pro', en: 'Windows 10 Pro' },
            ],
            link: { url: 'https://www.amd.com/en/product/11826', label: officialPage },
          },
          {
            name: { es: 'Portátil corporativo Dell', en: 'Dell corporate laptop' },
            role: {
              es: 'Jornada laboral y reuniones remotas',
              en: 'Working day and remote meetings',
            },
            notes: {
              es: 'Se conecta al mismo escritorio y utiliza los monitores, el teclado, el ratón y el audio de la torre. Cuando trabajo con él solo cambia la fuente de vídeo y el hub USB; la disposición del puesto es la misma.',
              en: 'It connects to the same desk and uses the tower’s monitors, keyboard, mouse and audio. When I work from it, only the video source and the USB hub change; the layout stays the same.',
            },
            pending: {
              es: 'No tengo verificada la referencia exacta, así que prefiero no publicar sus especificaciones.',
              en: 'I have not verified its exact reference, so I would rather not publish its specifications.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'pantallas',
    eyebrow: { es: 'Distribución de pantallas', en: 'Display layout' },
    title: {
      es: 'Tres pantallas con funciones distintas',
      en: 'Three displays with different roles',
    },
    intro: {
      es: 'Cada pantalla tiene un uso asignado. En la central trabajo; en las laterales dejo lo que necesito consultar o tener a la vista sin que ocupe el espacio principal.',
      en: 'Each display has an assigned use. I work on the central one; the side panels hold whatever I need to check or keep in view without taking up the main space.',
    },
    groups: [
      {
        entries: [
          {
            name: 'Philips 243V',
            role: {
              es: 'Izquierda, en vertical: correo, Microsoft Teams, Spotify y WhatsApp',
              en: 'Left, in portrait: email, Microsoft Teams, Spotify and WhatsApp',
            },
            notes: {
              es: 'En vertical concentra todo lo que es conversación y notificación, fuera del campo de trabajo. Buena relación calidad-precio para lo que le pido; no le cambiaría nada.',
              en: 'In portrait it gathers everything conversational and notification-driven, away from my working field of view. Good value for what I ask of it; I would not change anything.',
            },
            specs: [
              { es: '24 pulgadas', en: '24 inches' },
              { es: 'Panel IPS', en: 'IPS panel' },
              { es: 'Orientación vertical', en: 'Portrait orientation' },
            ],
          },
          {
            name: 'LG Ergo 34"',
            role: {
              es: 'Centro: código, navegador, aplicaciones y trabajo diario',
              en: 'Centre: code, browser, apps and daily work',
            },
            notes: {
              es: 'Es la pantalla principal. Valoro el espacio horizontal, la resolución, el brazo Ergo y poder mantener varias ventanas a la vista sin superponerlas. El inconveniente es real: es demasiado ancha y ocupa mucho espacio en la mesa.',
              en: 'This is the main display. I value the horizontal space, the resolution, the Ergo arm and being able to keep several windows visible without stacking them. The downside is real: it is too wide and takes up a lot of desk space.',
            },
            specs: [
              { es: '34 pulgadas', en: '34 inches' },
              { es: 'UltraWide WQHD', en: 'UltraWide WQHD' },
              { es: 'Brazo Ergo', en: 'Ergo arm' },
            ],
            pending: {
              es: 'Todavía no he verificado la referencia exacta del modelo.',
              en: 'I have not verified the exact model reference yet.',
            },
            change: {
              es: 'Sustituirla por una configuración más compacta: una sola pantalla de 27 pulgadas, o 27 pulgadas más la de 24 en vertical.',
              en: 'Replace it with a more compact configuration: a single 27-inch display, or 27 inches plus the 24-inch panel in portrait.',
            },
          },
          {
            name: 'Lenovo Legion R27qe',
            role: {
              es: 'Derecha: webs, documentación, apoyo, YouTube y gaming ocasional',
              en: 'Right: websites, documentation, reference, YouTube and occasional gaming',
            },
            notes: {
              es: 'Es la pantalla de apoyo: lo que consulto mientras trabajo en la central. La calidad de imagen, la resolución, el tamaño y los 180 Hz la hacen también válida para jugar. No le cambiaría nada.',
              en: 'This is the reference display: whatever I am consulting while working on the central one. Image quality, resolution, size and 180 Hz also make it fine for gaming. I would not change anything.',
            },
            specs: [
              { es: '27 pulgadas', en: '27 inches' },
              { es: '180 Hz', en: '180 Hz' },
            ],
            link: {
              url: 'https://pcsupport.lenovo.com/us/en/products/monitors-and-projectors/lcd-monitors/lenovo-legion-r27qe',
              label: officialPage,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'perifericos',
    eyebrow: { es: 'Periféricos', en: 'Peripherals' },
    title: {
      es: 'Teclado, ratón y tapete',
      en: 'Keyboard, mouse and desk mat',
    },
    intro: {
      es: 'Son las piezas que más he cambiado antes de quedarme con las actuales. Los tres los elegí después de probar otras opciones durante bastante tiempo.',
      en: 'These are the pieces I changed most before settling on the current ones. I picked all three after living with other options for a good while.',
    },
    image: setupImages.peripherals,
    groups: [
      {
        entries: [
          {
            name: 'Logitech MX Vertical',
            role: {
              es: 'Ratón de trabajo, muchas horas frente al ordenador',
              en: 'Work mouse, long hours at the computer',
            },
            notes: {
              es: 'Lo elegí por ergonomía y comodidad en jornadas largas. En mi caso funciona bien; es una preferencia personal, no una recomendación general.',
              en: 'I chose it for ergonomics and comfort over long sessions. It works well for me; it is a personal preference, not a general recommendation.',
            },
            change: {
              es: 'Le añadiría más botones configurables, o pasaría a un Logitech MX Master 4.',
              en: 'I would add more configurable buttons, or move to a Logitech MX Master 4.',
            },
            link: {
              url: 'https://www.logitech.com/en-us/shop/p/mx-vertical-ergonomic-mouse',
              label: officialPage,
            },
          },
          {
            name: 'Keychron K2 HE',
            role: {
              es: 'Teclado principal para los dos equipos',
              en: 'Main keyboard for both machines',
            },
            notes: {
              es: 'Es el teclado con el que me he quedado después de probar varios: Cherry MX, Logitech MX, Keychron K3 Pro, K2 HE y Q16 HE. Pesaron la comodidad, el carácter multidispositivo y poder configurar y personalizar las teclas. No le cambiaría nada.',
              en: 'This is the keyboard I settled on after trying several: Cherry MX, Logitech MX, Keychron K3 Pro, K2 HE and Q16 HE. Comfort, multi-device support and being able to configure and customise the keys tipped the balance. I would not change anything.',
            },
            specs: [
              { es: 'Bluetooth, cable y receptor USB', en: 'Bluetooth, cable and USB receiver' },
              { es: 'Multidispositivo', en: 'Multi-device' },
              { es: 'Windows y macOS', en: 'Windows and macOS' },
              { es: 'Retroiluminación RGB', en: 'RGB backlight' },
            ],
            link: {
              url: 'https://www.keychron.com/products/keychron-k2-he-wireless-magnetic-switch-keyboard',
              label: officialPage,
            },
          },
          {
            name: 'IKEA LÅNESPELARE',
            role: {
              es: 'Tapete grande bajo teclado y ratón',
              en: 'Large desk mat under keyboard and mouse',
            },
            notes: {
              es: 'Cubre toda la zona de teclado y ratón con una superficie continua. Buena calidad para lo que cuesta y suficiente para el uso diario.',
              en: 'It covers the whole keyboard and mouse area with a single continuous surface. Good quality for the price and enough for daily use.',
            },
            link: {
              url: 'https://www.ikea.com/es/es/p/lanespelare-tapete-raton-jugar-negro-40507813/',
              label: viewProduct,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'audio-video',
    eyebrow: { es: 'Audio, vídeo e iluminación', en: 'Audio, video and lighting' },
    title: {
      es: 'Auriculares, micrófono, cámara y luces',
      en: 'Headphones, microphone, camera and lights',
    },
    intro: {
      es: 'Trabajo en remoto buena parte del tiempo, así que oír bien, que se me oiga y que se me vea con claridad forma parte del puesto. Es también lo que uso para aislarme cuando necesito concentrarme.',
      en: 'I work remotely much of the time, so hearing well, being heard and being seen clearly are part of the workstation. It is also what I use to shut the world out when I need to concentrate.',
    },
    image: setupImages.audioVideo,
    groups: [
      {
        label: { es: 'Audio', en: 'Audio' },
        entries: [
          {
            name: 'Sony WH-1000XM5',
            role: {
              es: 'Trabajo, concentración, videollamadas y ocio',
              en: 'Work, focus, video calls and downtime',
            },
            notes: {
              es: 'Son los auriculares que uso a diario. Cancelación de ruido, sonido, comodidad, autonomía y multidispositivo funcionan para lo que necesito, y no les encuentro pegas importantes.',
              en: 'These are my everyday headphones. Noise cancelling, sound, comfort, battery life and multi-device support all work for what I need, and I find no significant drawbacks.',
            },
            change: {
              es: 'Como mejora hipotética, todavía más aislamiento.',
              en: 'As a hypothetical improvement, even more isolation.',
            },
            link: {
              url: 'https://www.sony.es/electronics/diadema/wh-1000xm5',
              label: officialPage,
            },
          },
          {
            name: 'Sony WF-1000XM5',
            role: {
              es: 'Oficina y movilidad',
              en: 'Office and mobility',
            },
            notes: {
              es: 'Son el complemento móvil, no una pieza del escritorio: los uso cuando trabajo fuera de casa o me muevo.',
              en: 'They are the mobile complement, not a desk item: I use them when working away from home or on the move.',
            },
            link: {
              url: 'https://www.sony.es/headphones/products/wf-1000xm5',
              label: officialPage,
            },
          },
        ],
      },
      {
        label: { es: 'Micrófono y webcam', en: 'Microphone and webcam' },
        entries: [
          {
            name: 'HyperX QuadCast',
            role: {
              es: 'Microsoft Teams y juego online',
              en: 'Microsoft Teams and online gaming',
            },
            notes: {
              es: 'Para mi uso es perfecto: se oye bien en reuniones y en partidas, y ocupa un sitio fijo en la mesa. No le cambiaría nada.',
              en: 'For my use it is perfect: I come through clearly in meetings and in games, and it has a fixed spot on the desk. I would not change anything.',
            },
            link: {
              url: 'https://hyperx.com/products/hyperx-quadcast-usb-microphone',
              label: officialPage,
            },
          },
          {
            name: 'Logitech C920',
            role: {
              es: 'Microsoft Teams y grabación personal en retransmisiones de gameplay',
              en: 'Microsoft Teams and personal recording during gameplay streams',
            },
            notes: {
              es: 'Cumple en reuniones y en las grabaciones que hago mientras juego. Actualmente es suficiente.',
              en: 'It does the job in meetings and in the recordings I make while playing. For now it is enough.',
            },
            change: {
              es: 'Una cámara superior sería una posible mejora, sin ser urgente.',
              en: 'A better camera would be a possible upgrade, though it is not urgent.',
            },
            link: {
              url: 'https://www.logitech.com/en-us/products/webcams/c920-pro-hd-webcam.html',
              label: officialPage,
            },
          },
        ],
      },
      {
        label: { es: 'Iluminación', en: 'Lighting' },
        entries: [
          {
            name: 'BenQ ScreenBar',
            role: {
              es: 'Iluminación de la superficie de trabajo, con control táctil',
              en: 'Desk surface lighting, with touch controls',
            },
            notes: {
              es: 'Lleva aproximadamente tres o cuatro años en uso y sigue funcionando y conservándose perfectamente. La iluminación, los materiales y la construcción son la razón por la que no la he sustituido. No le cambiaría nada.',
              en: 'It has been in use for roughly three or four years and still works and looks perfect. The light quality, materials and build are why I have never replaced it. I would not change anything.',
            },
            link: {
              url: 'https://www.benq.com/en-us/lighting/monitor-light/screenbar.html',
              label: officialPage,
            },
          },
          {
            name: 'Elgato Key Light Neo',
            role: {
              es: 'Iluminación frontal para videoconferencias, con soporte para monitor',
              en: 'Front lighting for video calls, with monitor mount',
            },
            notes: {
              es: 'Evita sombras y mejora la imagen en las reuniones. Montada sobre el monitor no ocupa mesa. No le cambiaría nada.',
              en: 'It removes shadows and improves how I look in meetings. Mounted on the monitor, it takes no desk space. I would not change anything.',
            },
            link: {
              url: 'https://www.elgato.com/us/en/p/key-light-neo-black',
              label: officialPage,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'mobiliario',
    eyebrow: { es: 'Mobiliario y comodidad', en: 'Furniture and comfort' },
    title: {
      es: 'Mesa, silla y reposapiés',
      en: 'Desk, chair and footrest',
    },
    intro: {
      es: 'Son las piezas que más tiempo llevan aquí y las que menos he cambiado. También las que más horas acumulan al cabo del año.',
      en: 'These have been here the longest and are the ones I have changed least. They are also the ones that add up the most hours over a year.',
    },
    image: setupImages.furniture,
    groups: [
      {
        entries: [
          {
            name: { es: 'IKEA Bekant en L', en: 'IKEA Bekant, L-shaped' },
            role: {
              es: 'Escritorio principal, con el cockpit a su derecha',
              en: 'Main desk, with the cockpit to its right',
            },
            notes: {
              es: 'El tamaño y la forma en L dan sitio a tres pantallas, dos equipos y los accesorios, y aún queda superficie libre para trabajar sin apilar cosas.',
              en: 'Its size and L shape make room for three displays, two machines and the accessories, and there is still free surface left to work without stacking things.',
            },
            change: {
              es: 'Mejoraría la facilidad para cambiar la altura. Una mesa regulable sería una evolución posible.',
              en: 'I would improve how easy it is to change the height. A height-adjustable desk would be a possible evolution.',
            },
          },
          {
            name: 'Secretlab Titan Evo',
            role: {
              es: 'Silla para jornadas completas',
              en: 'Chair for full working days',
            },
            notes: {
              es: 'La comodidad, la calidad general y los materiales son lo que esperaba de ella después de varios años de uso. No le cambiaría nada.',
              en: 'Comfort, overall quality and materials are what I expected after several years of use. I would not change anything.',
            },
            link: {
              url: 'https://secretlab.co/products/titan-evo-2022-series',
              label: officialPage,
            },
          },
          {
            name: 'IKEA ÖVNING',
            role: {
              es: 'Reposapiés bajo la mesa',
              en: 'Footrest under the desk',
            },
            notes: {
              es: 'Cómodo y con dos posiciones. Es un detalle pequeño, pero se nota en las sesiones largas.',
              en: 'Comfortable and with two positions. A small detail, but it shows in long sessions.',
            },
            specs: [
              { es: '38 × 32 × 18 cm', en: '38 × 32 × 18 cm' },
              { es: 'Dos posiciones', en: 'Two positions' },
            ],
            link: {
              url: 'https://www.ikea.com/es/es/p/ovning-reposapies-ergonomico-00552020/',
              label: viewProduct,
            },
          },
        ],
      },
    ],
  },
  {
    id: 'conexiones',
    eyebrow: { es: 'Conexiones y alimentación', en: 'Connections and power' },
    title: {
      es: 'Dos equipos en un solo espacio físico',
      en: 'Two machines in one physical space',
    },
    intro: {
      es: 'Compartir monitores y periféricos entre la torre y el portátil solo funciona si cambiar de equipo cuesta un segundo. La alimentación va separada entre la zona de trabajo y la de ocio, y no con el mismo nivel de protección.',
      en: 'Sharing monitors and peripherals between the tower and the laptop only works if switching takes a second. Power is split between the work area and the leisure area, and not with the same level of protection.',
    },
    groups: [
      {
        label: { es: 'Conmutación', en: 'Switching' },
        entries: [
          {
            name: { es: 'Switch HDMI', en: 'HDMI switch' },
            role: {
              es: 'Cambiar las señales de vídeo entre la torre y el portátil',
              en: 'Switching video signals between tower and laptop',
            },
            notes: {
              es: 'Permite pasar de un equipo a otro sin recablear las pantallas.',
              en: 'It lets me move from one machine to the other without recabling the displays.',
            },
          },
          {
            name: { es: 'Hub USB', en: 'USB hub' },
            role: {
              es: 'Mantener los periféricos conectados y alternarlos',
              en: 'Keeping peripherals connected and switching them over',
            },
            notes: {
              es: 'Teclado, ratón y audio quedan siempre enchufados en el mismo sitio; solo cambia qué equipo los está usando.',
              en: 'Keyboard, mouse and audio stay plugged into the same place; only the machine using them changes.',
            },
          },
        ],
      },
      {
        label: { es: 'Alimentación', en: 'Power' },
        entries: [
          {
            name: { es: 'Zona de trabajo', en: 'Work area' },
            role: {
              es: 'Regleta con protección frente a sobretensiones',
              en: 'Power strip with surge protection',
            },
            notes: {
              es: 'Alimenta la torre, los monitores y los periféricos importantes. Es la línea que me interesa mantener protegida.',
              en: 'It powers the tower, the monitors and the peripherals that matter. This is the line I care about keeping protected.',
            },
          },
          {
            name: { es: 'Zona de ocio', en: 'Leisure area' },
            role: {
              es: 'Regleta independiente, sin protección especial',
              en: 'Separate power strip, without special protection',
            },
            notes: {
              es: 'Alimenta el volante, el monitor de simracing y los dispositivos asociados. Va aparte de la zona de trabajo y no tiene el mismo nivel de protección.',
              en: 'It powers the wheel, the sim racing monitor and the associated devices. It is separate from the work area and does not have the same level of protection.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'software',
    eyebrow: { es: 'Software principal', en: 'Core software' },
    title: {
      es: 'Lo que uso a diario',
      en: 'What I use every day',
    },
    intro: {
      es: 'El día a día de desarrollo se reparte entre tres herramientas. El resto son utilidades puntuales que no merecen una lista aparte.',
      en: 'My day-to-day development is split across three tools. The rest are occasional utilities that do not need a list of their own.',
    },
    groups: [
      {
        entries: [
          {
            name: 'Visual Studio Code',
            role: { es: 'Editor principal', en: 'Main editor' },
            notes: {
              es: 'Donde escribo, reviso y depuro el código de todos los proyectos.',
              en: 'Where I write, review and debug the code for every project.',
            },
            link: { url: 'https://code.visualstudio.com/', label: officialPage },
          },
          {
            name: 'Claude',
            role: { es: 'Asistencia sobre el propio código', en: 'Assistance on my own code' },
            notes: {
              es: 'Lo uso sobre el contexto del repositorio en el que estoy trabajando.',
              en: 'I use it against the context of whichever repository I am working on.',
            },
            link: { url: 'https://claude.com/', label: officialPage },
          },
          {
            name: 'Codex',
            role: { es: 'Tareas de desarrollo asistidas', en: 'Assisted development tasks' },
            notes: {
              es: 'Segunda herramienta para tareas concretas dentro del mismo flujo de trabajo.',
              en: 'A second tool for specific tasks within the same workflow.',
            },
            link: { url: 'https://openai.com/codex/', label: officialPage },
          },
        ],
      },
    ],
  },
];

export const setupPlay = {
  eyebrow: { es: 'Gaming y simracing', en: 'Gaming and sim racing' },
  title: {
    es: 'El cockpit, a la derecha de la mesa',
    en: 'The cockpit, to the right of the desk',
  },
  quote: {
    es: 'Siempre quise tener un cockpit. Era una deuda pendiente con mi yo de 15 años.',
    en: 'I always wanted a cockpit. It was unfinished business with my 15-year-old self.',
  },
  intro: {
    es: 'Está a un metro del escritorio y cumple una función concreta: desconexión, diversión, competición e inmersión. Es la parte del espacio que no tiene nada que ver con el trabajo.',
    en: 'It sits a metre from the desk and serves a specific purpose: switching off, fun, competition and immersion. It is the part of the room that has nothing to do with work.',
  },
  image: setupImages.simracing,
  entries: [
    {
      name: { es: 'Cockpit VEVOR Racing', en: 'VEVOR Racing cockpit' },
      role: { es: 'Estructura del puesto de simracing', en: 'Sim racing rig frame' },
      notes: {
        es: 'Fija la posición de volante, pedales y pantalla, que era lo que me faltaba cuando jugaba desde la silla del escritorio.',
        en: 'It fixes the position of wheel, pedals and screen, which was what I missed when I played from the desk chair.',
      },
      pending: {
        es: 'Todavía no he verificado la referencia exacta del modelo.',
        en: 'I have not verified the exact model reference yet.',
      },
    },
    {
      name: 'Logitech G29',
      role: { es: 'Volante y pedales', en: 'Wheel and pedals' },
      notes: {
        es: 'Es el volante con el que uso el cockpit; el conjunto se monta sobre la estructura y no se desmonta entre sesiones.',
        en: 'This is the wheel I use with the cockpit; the set is mounted on the frame and never comes off between sessions.',
      },
      link: {
        url: 'https://www.logitechg.com/en-us/shop/p/driving-force-racing-wheel',
        label: officialPage,
      },
    },
    {
      name: 'LG UltraGear 32GS60QC-B',
      role: { es: 'Pantalla del cockpit', en: 'Cockpit display' },
      notes: {
        es: 'Curva y a la distancia del volante, es la que da la sensación de inmersión que buscaba en el cockpit.',
        en: 'Curved and at wheel distance, it is what gives the cockpit the sense of immersion I was after.',
      },
      specs: [
        { es: '31,5 pulgadas', en: '31.5 inches' },
        { es: 'Panel VA', en: 'VA panel' },
        { es: 'QHD', en: 'QHD' },
        { es: 'Curvo', en: 'Curved' },
        { es: '180 Hz', en: '180 Hz' },
        { es: 'AMD FreeSync', en: 'AMD FreeSync' },
      ],
      link: { url: 'https://www.lg.com/uk/monitors/gaming/32gs60qc-b/', label: officialPage },
    },
    {
      name: 'Logitech G502 X Plus',
      role: { es: 'Ratón de ocio y gaming', en: 'Mouse for downtime and gaming' },
      notes: {
        es: 'Se queda en la zona de ocio y no sustituye al MX Vertical del escritorio; cada uno tiene su sitio y su uso.',
        en: 'It stays in the leisure area and does not replace the MX Vertical at the desk; each has its own place and use.',
      },
      link: {
        url: 'https://www.logitechg.com/en-us/shop/p/g502-x-plus-wireless-lightforce',
        label: officialPage,
      },
    },
  ] satisfies GearEntry[],
};

export const setupAssessment = {
  works: {
    eyebrow: { es: 'Lo que funciona bien', en: 'What works well' },
    title: {
      es: 'Decisiones que repetiría',
      en: 'Decisions I would make again',
    },
    intro: {
      es: 'Conclusiones de uso real, no reglas generales: es lo que me funciona a mí en este espacio.',
      en: 'Conclusions from real use, not general rules: this is what works for me in this space.',
    },
    items: [
      {
        es: 'Separar físicamente el trabajo y el ocio dentro de la misma habitación.',
        en: 'Physically separating work and downtime within the same room.',
      },
      {
        es: 'Tres pantallas con funciones diferenciadas, en lugar de tres pantallas iguales.',
        en: 'Three displays with distinct roles, rather than three identical ones.',
      },
      {
        es: 'Compartir monitores y periféricos entre la torre y el portátil corporativo.',
        en: 'Sharing monitors and peripherals between the tower and the corporate laptop.',
      },
      {
        es: 'Haber probado alternativas de teclado y ratón antes de quedarme con los actuales.',
        en: 'Having tried keyboard and mouse alternatives before settling on the current ones.',
      },
      {
        es: 'Tratar el audio, la iluminación y la videoconferencia como parte del puesto, no como accesorios.',
        en: 'Treating audio, lighting and video conferencing as part of the workstation, not as accessories.',
      },
      {
        es: 'Tener una mesa amplia, que es lo que permite el resto.',
        en: 'Having a large desk, which is what makes the rest possible.',
      },
      {
        es: 'Mobiliario cómodo, porque son muchas horas al día.',
        en: 'Comfortable furniture, because it adds up to many hours a day.',
      },
      {
        es: 'El cockpit como desconexión real al terminar la jornada.',
        en: 'The cockpit as a real way to switch off when the day ends.',
      },
    ] satisfies Localized[],
  },
  changes: {
    eyebrow: { es: 'Lo que cambiaría', en: 'What I would change' },
    title: {
      es: 'Cambios que me plantearía',
      en: 'Changes I would consider',
    },
    intro: {
      es: 'Ninguno responde a un problema real; son ajustes que me plantearía si rehiciera el puesto hoy.',
      en: 'None of them fixes an actual problem; they are adjustments I would consider if I set the workstation up again today.',
    },
    items: [
      {
        es: 'Sustituir la ultrawide por una configuración más compacta.',
        en: 'Replace the ultrawide with a more compact configuration.',
      },
      {
        es: 'Valorar una mesa regulable en altura y, con ella, una posible cinta de andar bajo la mesa.',
        en: 'Consider a height-adjustable desk and, with it, a possible under-desk walking pad.',
      },
      {
        es: 'Más botones configurables en el MX Vertical, o pasar a un MX Master 4.',
        en: 'More configurable buttons on the MX Vertical, or moving to an MX Master 4.',
      },
      {
        es: 'Una posible mejora de webcam.',
        en: 'A possible webcam upgrade.',
      },
      {
        es: 'Simplificar el conjunto sin perder funcionalidad.',
        en: 'Simplify the whole thing without losing functionality.',
      },
    ] satisfies Localized[],
  },
};

export const setupClosing = {
  eyebrow: { es: 'En resumen', en: 'In short' },
  title: {
    es: 'Un espacio ajustado poco a poco',
    en: 'A space adjusted little by little',
  },
  text: {
    es: 'Cada pieza entró aquí para resolver algo concreto y se quedó porque siguió funcionando. Si te interesa en qué trabajo desde este escritorio, el CV lo cuenta con más detalle.',
    en: 'Every piece arrived here to solve something specific and stayed because it kept working. If you are interested in what I do from this desk, my CV covers it in more detail.',
  },
  cta: { es: 'Ver el CV', en: 'View the CV' },
};
