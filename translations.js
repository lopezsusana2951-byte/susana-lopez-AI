/* ─── Koda Agency · Translation Dictionary ──────────────────────────────────
   window.T      — { en: {...}, es: {...} }
   window.makeTr — factory: lang → tr(dotPath) lookup with EN fallback
   ─────────────────────────────────────────────────────────────────────────── */
(function () {

  window.T = {

    /* ════════════════════════════════════════════════════════════════════════
       ENGLISH
    ════════════════════════════════════════════════════════════════════════ */
    en: {

      rail: {
        logoSub: 'AI VIDEO\nCREATOR',
        mid: 'A CREATIVE PROPOSAL FOR YOUR REAL ESTATE BRAND',
      },

      hero: {
        brandmark: 'REAL ESTATE\nAI VIDEO CREATOR',
        headline: 'A BUYER DECIDES IN EIGHT SECONDS.',
        headlineItalic: 'I design those eight seconds.',
        copy: 'MOST LUXURY LISTINGS LOOK THE SAME — POLISHED, FORGETTABLE, GONE BY THE NEXT SCROLL. I MAKE THE ONES PEOPLE SAVE, SHARE, AND COME BACK TO. AI-NATIVE FILMS FOR PROPERTIES THAT REFUSE TO BE BACKGROUND NOISE.',
        cta: 'DISCOVER THE VISION',
        corner: 'BORN. BASED. INSPIRED.',
        scroll: 'SCROLL',
      },

      manifesto: {
        eyebrow: 'A NOTE FROM SUSANA',
        h2line1: 'When a listing',
        h2line2: 'comes alive,',
        h2em: 'so does the buyer.',
        body: "A floor plan tells you a house has four bedrooms. A film tells you which one your daughter would pick. That is the whole game. I make buyers see themselves living there — long before they book the flight.",
        beliefs: [
          'Photos sell square footage. Films sell a future.',
          "If a buyer hasn't felt it, they won't fly for it.",
          'The best listing video answers a question the agent never gets asked.',
        ],
        videoCaption: 'HOVER TO SEE\nTHE DIFFERENCE',
        videoOverlay1: 'A 5-bedroom waterfront.',
        videoOverlay2: 'Or — your Sunday morning, ten years from now.',
      },

      stats: {
        eyebrow: 'THE EVIDENCE',
        h2: "Pretty doesn't sell.",
        h2em: 'Proof does.',
        body: 'Four numbers that stopped me from making another photo-only listing. They should stop you, too.',
        items: [
          { num: '403%',   label: 'MORE INQUIRIES',        body: 'Listings with high-quality video receive over 4x the qualified inquiries of photo-only listings.',             src: 'Matterport / NAR' },
          { num: '73%',    label: 'OF SELLERS PREFER',     body: 'Choose agents who use video marketing — making cinematic content the new minimum standard for luxury.',        src: 'NAR 2025' },
          { num: '49%',    label: 'FASTER REVENUE GROWTH', body: "Brokerages investing in video marketing grow nearly half again as fast as those that don't.",                  src: 'Digital Agency Network' },
          { num: '1,200%', label: 'MORE SOCIAL SHARES',    body: 'Video content is shared at twelve times the rate of text and images combined across social platforms.',        src: 'Amplifiles Research 2026' },
        ],
      },

      portfolio: {
        eyebrow: 'CASE STUDY · 1750 OCEAN VIEW',
        h2: 'One property.',
        h2em: 'Five formats.',
        sub: 'SAME SHOOT. FIVE WAYS A BUYER MEETS IT.',
        formatLabel: 'FORMAT',
        formats: [
          { n: '01', title: 'Lifestyle Agent Video',    pitch: 'A face to the listing.',
            body: 'A guided tour through the 5 main areas of the property with a real agent or AI avatar — entrance, living room, kitchen, master bedroom, outdoor space. Short, punchy, personal. The format that makes a listing feel like a conversation.',
            deliverable: '15s · Vertical 9:16 · Social media ready',
            badge: 'AGENT-LED' },
          { n: '02', title: 'Interior 3D Tour',         pitch: 'The first showing — without the flight.',
            body: "Starts outside, moves through the full interior room by room. No person — just the property with cinematic music and 15+ photos composed into seamless motion. Replaces the first in-person showing for international buyers completely.",
            deliverable: '30–60s · Vertical 9:16 · MLS + Social',
            badge: 'PROPERTY TOUR' },
          { n: '03', title: 'Space Remodel Video',      pitch: "Buyers stop scrolling when they see what a space could look like.",
            body: "Shows a property's transformation potential — takes existing spaces and visually reimagines them with new furniture, finishes, colors, or layouts using AI. Turns 'needs work' into 'full of potential.' Sellers can show multiple design directions without spending a dollar on physical staging.",
            deliverable: '30–45s · Vertical 9:16 · Pre-listing',
            badge: 'AI STAGING' },
          { n: '04', title: 'Land & Vision',            pitch: 'Show investors what their money builds before anything exists.',
            body: 'Transforms empty lots and pre-construction projects into animated vision videos. Renders raw land into finished towers, lobbies, and views — months before the first shovel breaks ground. Perfect for pre-construction portfolios.',
            deliverable: '15–30s · Vertical 9:16 · Investor deck',
            badge: 'PRE-CONSTRUCTION' },
          { n: '05', title: 'Full Vision Composite',    pitch: 'The complete dream of a property that doesn\'t exist yet.',
            body: 'Created entirely from scratch. Full architectural concept → photorealistic interior renders → lifestyle scenes → emotional narrative. The most premium format we produce. Closes international investors remotely.',
            deliverable: '30s–1min · Vertical 9:16 · Investor close',
            badge: 'MOST PREMIUM' },
        ],
      },

      social: {
        eyebrow: 'CONTENT MANAGEMENT',
        h2: 'YOUR FEED.',
        h2em: 'Elevated.',
        body: 'A cohesive, bilingual social presence — every post composed, captioned, and color-graded to feel like one continuous brand experience across Instagram, Facebook, and LinkedIn.',
        handle: '@susana.lopez.ai',
        posts: [
          { title: 'Just Listed',     caption: 'Bayfront residence — 5 BR · Luxury Tower',  es: 'Frente al mar · Torre de lujo' },
          { title: 'Sunset Tour',     caption: 'Penthouse · Ocean Views',                  es: 'Atardecer en el penthouse' },
          { title: 'Open House',      caption: 'Saturday · 2pm · Waterfront Estate',       es: 'Sábado · 2pm' },
          { title: 'New to Market',   caption: 'Waterfront estate · Private Island',       es: 'Nuevo al mercado' },
          { title: 'Coming Soon',     caption: 'Pre-construction · Urban Residences',      es: 'Próximamente' },
          { title: 'Sold',            caption: '$8.4M · Closed in 14 days',               es: 'Vendido en 14 días' },
        ],
      },

      beforeAfter: {
        eyebrow: 'AI IMAGE ENHANCEMENT',
        h2: 'THE SAME SPACE.',
        h2em: 'A different world.',
        body: 'Three transformative services — render-to-reality, photo enhancement, and time-of-day editing — each designed to take an existing asset and make it sell.',
        before: 'BEFORE',
        after: 'AFTER',
        pairs: [
          { label: 'Lifestyle Rendering', desc: 'Elevating everyday interiors into aspirational living spaces.',                                                              tag: '01 · LIFESTYLE RENDERING' },
          { label: 'Virtual Renovation',  desc: 'Reimagining spaces with premium finishes and architectural upgrades.',                                                       tag: '02 · VIRTUAL RENOVATION' },
          { label: 'Photo Enhancement',   desc: 'Kitchen photography elevated to editorial standard — natural light, precise staging, and pro color grading.',                tag: '03 · PHOTO ENHANCEMENT' },
          { label: 'Render to Reality',   desc: 'A raw space transformed into a photorealistic 3D render — every surface, material, and light source re-imagined.',          tag: '04 · RENDER TO REALITY' },
        ],
        services: [
          { num: '01', name: 'Lifestyle Rendering', body: 'Elevating everyday interiors into aspirational living spaces.' },
          { num: '02', name: 'Virtual Renovation',  body: 'Reimagining spaces with premium finishes and architectural upgrades.' },
          { num: '03', name: 'Photo Enhancement',   body: 'Kitchen photography elevated to editorial standard — natural light, precise staging, and pro color grading.' },
          { num: '04', name: 'Render to Reality',   body: 'A raw space transformed into a photorealistic 3D render — every surface, material, and light source re-imagined.' },
        ],
      },

      signature: {
        eyebrow: 'THE DIFFERENCE IS\nIN THE DETAILS',
        h2: 'AI IS MY TOOL.',
        h2em: 'VISION IS',
        h2line3: 'MY SIGNATURE.',
        quote: "Over 3 years creating AI-driven content that actually sells. I don't just make things look beautiful — I make people stop, feel something, and want in. Every video I create is built to turn attention into desire.",
        sigName: 'Susana Lopez',
        title1: 'AI VIDEO CREATOR',
        location: 'AVAILABLE WORLDWIDE',
        portraitEyebrow: 'PORTRAIT',
        portraitTitle: 'FOUNDER · DIRECTOR',
      },

      pricing: {
        eyebrow: 'INVESTMENT IN VISION',
        h2: 'MONTHLY PACKAGES\nFOR',
        h2em: 'EVERY BRAND.',
        body: "Consistent, cinematic content — delivered every month. Choose your tier and let's build your brand's presence together.",
        bannerTag: 'LAUNCH OFFER',
        bannerText: '25% off your first 3 months — limited availability',
        addonsLabel: 'PERSONALIZATION ADD-ONS',
        imageServicesLabel: 'IMAGE SERVICES',
        tierLabel: 'TIER',
        packages: [
          { name: 'Essential', note: 'PER MONTH',  cta: 'BEGIN PROJECT',  badge: null },
          { name: 'Growth',    note: 'PER MONTH',  cta: 'BEGIN PROJECT',  badge: 'MOST POPULAR' },
          { name: 'Luxury',    note: 'PER MONTH',  cta: 'REQUEST CALL',   badge: null },
        ],
        features: [
          { label: 'AI Videos',                vals: ['4 / mo',   '8 / mo',     '12 / mo'] },
          { label: 'Instagram Carousels',       vals: ['2 / mo',   '4 / mo',     '8 / mo'] },
          { label: 'Platforms',                 vals: ['1',        '2',          'All incl. TikTok'] },
          { label: 'Bilingual EN + ES',         vals: [true,       true,         true] },
          { label: 'Captions + Hashtags',       vals: [true,       true,         true] },
          { label: 'Scheduling & Publishing',   vals: [true,       true,         true] },
          { label: 'Stories & Reels Strategy',  vals: [false,      true,         true] },
          { label: 'Engagement Management',     vals: [false,      true,         true] },
          { label: 'Full Composite Video',      vals: [false,      false,        '1 / mo'] },
          { label: 'Paid Ads Management',       vals: [false,      false,        true] },
          { label: 'Analytics Report',          vals: ['Monthly',  'Bi-weekly',  'Weekly'] },
          { label: 'Strategy Call',             vals: [false,      'Bi-weekly',  'Weekly'] },
          { label: 'Delivery',                  vals: ['Standard', 'Standard',   'Priority 48hr'] },
        ],
        addons: [
          { name: 'Custom AI Avatar',            price: '$100', note: 'one-time setup' },
          { name: 'Animated Logo Intro/Outro',   price: '$75',  note: 'one-time per logo' },
        ],
        imagePackages: [
          { name: 'Single image enhancement', price: '$15' },
          { name: 'Package of 10 images',     price: '$100' },
          { name: 'Package of 25 images',     price: '$200' },
        ],
      },

      faq: {
        eyebrow: 'FREQUENTLY ASKED',
        h2: 'QUESTIONS,',
        h2em: 'answered with care.',
        body: "Everything you'd want to know before we begin. If anything is missing, write to me directly — I respond personally.",
        items: [
          { q: 'What makes AI real estate video better than traditional listing photos?',
            a: 'Photos sell square footage. AI cinematic video sells a future. Real footage forms the spine of every film — AI adds lifestyle scenes, virtual staging, twilight conditions, and drone work that would otherwise take weeks to produce. The result converts browsers into buyers before they ever book a showing.' },
          { q: 'What is included in a monthly content package?',
            a: 'Every package includes AI videos, Instagram carousels, bilingual captions in English and Spanish, hashtag strategy, and scheduling. Growth and Luxury tiers add Stories and Reels strategy, engagement management, and bi-weekly or weekly strategy calls. The Luxury tier also includes a full composite film and paid ads management each month.' },
          { q: 'Who owns the video and creative assets after delivery?',
            a: 'You do — fully and permanently. Every deliverable is licensed in perpetuity across MLS, social media, paid advertising, and brand channels. No recurring rights fees. No restrictions.' },
          { q: 'Do you create content in Spanish as well as English?',
            a: "Yes. All monthly packages include bilingual content — every video, caption, and hashtag set is crafted in both English and Spanish to reach international luxury buyers natively." },
          { q: 'Can you match my existing brand identity?',
            a: 'Yes. Every project begins with a brand alignment session. Color grading, typography, motion language, and pacing are all calibrated to feel native to your existing visual universe — not like outside production.' },
          { q: 'How quickly will I receive my content?',
            a: 'Essential package content delivers within 4 business days. Growth deliverables are ready within one week. Luxury packages run on a bi-weekly schedule — half your content in the first two weeks, the other half in the second. Rush delivery for individual one-minute videos is available within 48 hours, priced by format.' },
          { q: 'Is there a setup fee to get started?',
            a: "Yes — a one-time $300 onboarding fee covers a full brand audit: social media bios, profile imagery, and visual positioning are all reviewed and updated before your first piece of content goes live. This ensures every video lands in a profile that's already set up to convert." },
          { q: 'Can I see a sample before committing to a package?',
            a: "Yes. Every new client receives a sample video and a dedicated intro call before any commitment is made. The call is used to understand your brand, your listings, and what you want content to do for your business — so the sample already reflects your world, not a generic template." },
        ],
      },

      contact: {
        eyebrow: 'YOUR NEXT LISTING',
        h2: 'Send me the address.',
        h2em: "I'll send back the film.",
        connectEyebrow: "LET'S CONNECT",
        email: 'SUSANA@NEURATEKGROUP.COM',
        location: 'AVAILABLE WORLDWIDE',
        availability: 'AVAILABLE FOR PROJECTS WORLDWIDE',
        formName: 'YOUR NAME',
        formEmail: 'EMAIL',
        formProperty: 'PROPERTY OR BRAND',
        formMessage: 'TELL ME ABOUT YOUR LISTING',
        formSubmit: 'SEND INQUIRY',
        formSent: 'SENT —',
        msgError: 'PLEASE COMPLETE NAME AND EMAIL.',
        msgSuccess: 'MESSAGE SENT — SUSANA WILL RESPOND WITHIN 24 HOURS.',
      },
    },

    /* ════════════════════════════════════════════════════════════════════════
       ESPAÑOL
    ════════════════════════════════════════════════════════════════════════ */
    es: {

      rail: {
        logoSub: 'CREADORA\nDE VIDEO IA',
        mid: 'UNA PROPUESTA CREATIVA PARA TU MARCA INMOBILIARIA',
      },

      hero: {
        brandmark: 'REAL ESTATE\nCREADORA DE VIDEO IA',
        headline: 'UN COMPRADOR DECIDE EN OCHO SEGUNDOS.',
        headlineItalic: 'Yo diseño esos ocho segundos.',
        copy: 'LA MAYORÍA DE LAS PROPIEDADES DE LUJO SE VEN IGUAL — PULIDAS, OLVIDABLES, PERDIDAS AL SIGUIENTE SCROLL. YO CREO LAS QUE LA GENTE GUARDA, COMPARTE Y VUELVE A VER. VIDEOS CON IA PARA PROPIEDADES QUE SE NIEGAN A PASAR DESAPERCIBIDAS.',
        cta: 'DESCUBRE LA VISIÓN',
        corner: 'NACIDA. BASADA. INSPIRADA.',
        scroll: 'BAJAR',
      },

      manifesto: {
        eyebrow: 'UNA NOTA DE SUSANA',
        h2line1: 'Cuando un inmueble',
        h2line2: 'cobra vida,',
        h2em: 'el comprador también.',
        body: 'Un plano te dice que una casa tiene cuatro habitaciones. Una película te dice cuál elegiría tu hija. Ese es el juego. Hago que los compradores se imaginen viviendo ahí — mucho antes de reservar el vuelo.',
        beliefs: [
          'Las fotos venden metros. Los videos venden un futuro.',
          'Si un comprador no lo ha sentido, no volará por ello.',
          'El mejor video de un inmueble responde una pregunta que el agente nunca recibe.',
        ],
        videoCaption: 'PASA EL CURSOR\nPARA VER LA DIFERENCIA',
        videoOverlay1: 'Una propiedad frente al mar, 5 habitaciones.',
        videoOverlay2: 'O — tu domingo por la mañana, diez años después.',
      },

      stats: {
        eyebrow: 'LA EVIDENCIA',
        h2: 'Lo bonito no vende.',
        h2em: 'Los datos, sí.',
        body: 'Cuatro cifras que me hicieron dejar de crear listados solo con fotos. A ti también deberían hacerlo.',
        items: [
          { num: '403%',   label: 'MÁS CONSULTAS',         body: 'Los listados con video de alta calidad reciben más de 4 veces las consultas calificadas que los de solo fotos.',     src: 'Matterport / NAR' },
          { num: '73%',    label: 'DE VENDEDORES PREFIEREN', body: 'Agentes que usan marketing en video — convirtiendo el contenido cinematográfico en el nuevo mínimo para el lujo.', src: 'NAR 2025' },
          { num: '49%',    label: 'MÁS CRECIMIENTO',        body: 'Las agencias que invierten en video crecen casi la mitad más rápido que las que no lo hacen.',                       src: 'Digital Agency Network' },
          { num: '1,200%', label: 'MÁS COMPARTIDOS',        body: 'El contenido en video se comparte doce veces más que el texto y las imágenes combinadas en redes sociales.',          src: 'Amplifiles Research 2026' },
        ],
      },

      portfolio: {
        eyebrow: 'CASO DE ESTUDIO · 1750 OCEAN VIEW',
        h2: 'Una propiedad.',
        h2em: 'Cinco formatos.',
        sub: 'MISMA SESIÓN. CINCO FORMAS EN QUE UN COMPRADOR LA CONOCE.',
        formatLabel: 'FORMATO',
        formats: [
          { n: '01', title: 'Video de Agente Lifestyle',     pitch: 'Un rostro para el listado.',
            body: 'Un recorrido guiado por las 5 áreas principales de la propiedad con un agente real o avatar IA — entrada, sala, cocina, habitación principal, espacio exterior. Corto, directo, personal. El formato que hace que un listado se sienta como una conversación.',
            deliverable: '15s · Vertical 9:16 · Listo para redes',
            badge: 'CON AGENTE' },
          { n: '02', title: 'Tour 3D de Interiores',         pitch: 'La primera visita — sin el vuelo.',
            body: 'Comienza afuera y recorre el interior completo habitación por habitación. Sin personas — solo la propiedad con música cinematográfica y 15+ fotos compuestas en movimiento fluido. Reemplaza completamente la primera visita presencial para compradores internacionales.',
            deliverable: '30–60s · Vertical 9:16 · MLS + Redes',
            badge: 'TOUR DE PROPIEDAD' },
          { n: '03', title: 'Video de Remodelación',         pitch: 'Los compradores dejan de hacer scroll cuando ven el potencial.',
            body: "Muestra el potencial de transformación de una propiedad — toma los espacios existentes y los reimagina visualmente con nuevos muebles, acabados, colores o distribuciones usando IA. Convierte 'necesita trabajo' en 'lleno de potencial.' Los vendedores pueden mostrar múltiples direcciones de diseño sin gastar un dólar en staging físico.",
            deliverable: '30–45s · Vertical 9:16 · Pre-listado',
            badge: 'STAGING IA' },
          { n: '04', title: 'Terreno y Visión',              pitch: 'Muestra a los inversores qué construye su dinero antes de que exista.',
            body: 'Transforma lotes vacíos y proyectos de preconstrucción en videos de visión animados. Convierte terreno en bruto en torres terminadas, lobbies y vistas — meses antes de que empiece la obra. Perfecto para portafolios de preconstrucción.',
            deliverable: '15–30s · Vertical 9:16 · Deck inversor',
            badge: 'PRECONSTRUCCIÓN' },
          { n: '05', title: 'Compuesto de Visión Completa',  pitch: 'El sueño completo de una propiedad que aún no existe.',
            body: 'Creado completamente desde cero. Concepto arquitectónico completo → renders interiores fotorrealistas → escenas de estilo de vida → narrativa emocional. El formato más premium que producimos. Cierra inversores internacionales de forma remota.',
            deliverable: '30s–1min · Vertical 9:16 · Cierre inversor',
            badge: 'MÁS PREMIUM' },
        ],
      },

      social: {
        eyebrow: 'GESTIÓN DE CONTENIDO',
        h2: 'TU FEED.',
        h2em: 'Elevado.',
        body: 'Una presencia en redes coherente y bilingüe — cada publicación compuesta, con texto y corrección de color para sentirse como una experiencia de marca continua en Instagram, Facebook y LinkedIn.',
        handle: '@susana.lopez.ai',
        posts: [
          { title: 'Recién Publicado',    caption: 'Residencia frente al mar — 5 hab · Torre de lujo', es: 'Frente al mar · Torre de lujo' },
          { title: 'Tour al Atardecer',   caption: 'Penthouse · Vistas al mar',                      es: 'Atardecer en el penthouse' },
          { title: 'Casa Abierta',        caption: 'Sábado · 2pm · Residencia privada',              es: 'Sábado · 2pm' },
          { title: 'Nuevo en el Mercado', caption: 'Residencia frente al agua · Isla privada',       es: 'Nuevo al mercado' },
          { title: 'Próximamente',        caption: 'Preconstrucción · Residencias urbanas',           es: 'Próximamente' },
          { title: 'Vendida',             caption: '$8.4M · Cerrado en 14 días',                     es: 'Vendido en 14 días' },
        ],
      },

      beforeAfter: {
        eyebrow: 'EDICIÓN DE IMAGEN CON IA',
        h2: 'EL MISMO ESPACIO.',
        h2em: 'Un mundo diferente.',
        body: 'Tres servicios transformadores — render a realidad, mejora fotográfica y edición de hora del día — cada uno diseñado para tomar un activo existente y hacerlo vender.',
        before: 'ANTES',
        after: 'DESPUÉS',
        pairs: [
          { label: 'Render de Estilo de Vida', desc: 'Transformando interiores cotidianos en espacios de vida aspiracionales.',                                                tag: '01 · RENDER DE ESTILO DE VIDA' },
          { label: 'Renovación Virtual',       desc: 'Reimaginando espacios con acabados premium y mejoras arquitectónicas.',                                                  tag: '02 · RENOVACIÓN VIRTUAL' },
          { label: 'Mejora Fotográfica',       desc: 'Fotografía de cocina elevada al nivel editorial — luz natural, decoración precisa y corrección de color profesional.',   tag: '03 · MEJORA FOTOGRÁFICA' },
          { label: 'Render a Realidad',        desc: 'Un espacio en bruto transformado en un render 3D fotorrealista — cada superficie, material y fuente de luz reimaginada.', tag: '04 · RENDER A REALIDAD' },
        ],
        services: [
          { num: '01', name: 'Render de Estilo de Vida', body: 'Transformando interiores cotidianos en espacios de vida aspiracionales.' },
          { num: '02', name: 'Renovación Virtual',       body: 'Reimaginando espacios con acabados premium y mejoras arquitectónicas.' },
          { num: '03', name: 'Mejora Fotográfica',       body: 'Fotografía de cocina elevada al nivel editorial — luz natural, decoración precisa y corrección de color profesional.' },
          { num: '04', name: 'Render a Realidad',        body: 'Un espacio en bruto transformado en un render 3D fotorrealista — cada superficie, material y fuente de luz reimaginada.' },
        ],
      },

      signature: {
        eyebrow: 'LA DIFERENCIA ESTÁ\nEN LOS DETALLES',
        h2: 'LA IA ES MI HERRAMIENTA.',
        h2em: 'LA VISIÓN ES',
        h2line3: 'MI FIRMA.',
        quote: 'Más de 3 años creando contenido con IA que realmente vende. No solo hago que las cosas se vean hermosas — logro que la gente se detenga, sienta algo y quiera entrar. Cada video que creo está hecho para convertir atención en deseo.',
        sigName: 'Susana Lopez',
        title1: 'CREADORA DE VIDEO IA',
        location: 'AVAILABLE WORLDWIDE',
        portraitEyebrow: 'RETRATO',
        portraitTitle: 'FUNDADORA · DIRECTORA',
      },

      pricing: {
        eyebrow: 'INVERSIÓN EN VISIÓN',
        h2: 'PAQUETES MENSUALES\nPARA',
        h2em: 'CADA MARCA.',
        body: "Contenido consistente y cinematográfico — entregado cada mes. Elige tu nivel y construyamos juntos la presencia de tu marca.",
        bannerTag: 'OFERTA DE LANZAMIENTO',
        bannerText: '25% de descuento en tus primeros 3 meses — disponibilidad limitada',
        addonsLabel: 'COMPLEMENTOS DE PERSONALIZACIÓN',
        imageServicesLabel: 'SERVICIOS DE IMAGEN',
        tierLabel: 'NIVEL',
        packages: [
          { name: 'Esencial',     note: 'POR MES', cta: 'INICIAR PROYECTO',   badge: null },
          { name: 'Crecimiento',  note: 'POR MES', cta: 'INICIAR PROYECTO',   badge: 'MÁS POPULAR' },
          { name: 'Lujo',         note: 'POR MES', cta: 'SOLICITAR LLAMADA',  badge: null },
        ],
        features: [
          { label: 'Videos con IA',                  vals: ['4 / mes',   '8 / mes',      '12 / mes'] },
          { label: 'Carruseles de Instagram',         vals: ['2 / mes',   '4 / mes',      '8 / mes'] },
          { label: 'Plataformas',                    vals: ['1',         '2',            'Todas incl. TikTok'] },
          { label: 'Bilingüe EN + ES',               vals: [true,        true,           true] },
          { label: 'Captions + Hashtags',            vals: [true,        true,           true] },
          { label: 'Programación y Publicación',     vals: [true,        true,           true] },
          { label: 'Estrategia Stories y Reels',     vals: [false,       true,           true] },
          { label: 'Gestión de Engagement',          vals: [false,       true,           true] },
          { label: 'Video Compuesto Completo',       vals: [false,       false,          '1 / mes'] },
          { label: 'Gestión de Anuncios Pagados',    vals: [false,       false,          true] },
          { label: 'Reporte de Analytics',           vals: ['Mensual',   'Quincenal',    'Semanal'] },
          { label: 'Llamada Estratégica',            vals: [false,       'Quincenal',    'Semanal'] },
          { label: 'Entrega',                        vals: ['Estándar',  'Estándar',     'Prioritaria 48h'] },
        ],
        addons: [
          { name: 'Avatar IA Personalizado',         price: '$100', note: 'configuración única' },
          { name: 'Intro/Outro de Logo Animado',     price: '$75',  note: 'único por logo' },
        ],
        imagePackages: [
          { name: 'Mejora de imagen individual', price: '$15' },
          { name: 'Paquete de 10 imágenes',      price: '$100' },
          { name: 'Paquete de 25 imágenes',      price: '$200' },
        ],
      },

      faq: {
        eyebrow: 'PREGUNTAS FRECUENTES',
        h2: 'TUS DUDAS,',
        h2em: 'resueltas con claridad.',
        body: 'Todo lo que necesitas saber antes de comenzar. Si te queda alguna pregunta, escríbeme directamente — respondo personalmente.',
        items: [
          { q: '¿Qué hace que el video inmobiliario con IA sea mejor que las fotos tradicionales?',
            a: 'Las fotos venden metros cuadrados. El video cinematográfico con IA vende un futuro. Las imágenes reales forman la columna de cada film — la IA agrega escenas de estilo de vida, staging virtual, condiciones de atardecer y trabajo aéreo que de otra forma tomaría semanas producir. El resultado convierte visitantes en compradores antes de que reserven una visita.' },
          { q: '¿Qué incluye un paquete mensual de contenido?',
            a: 'Todos los paquetes incluyen videos con IA, carruseles de Instagram, captions bilingües en inglés y español, estrategia de hashtags y programación. Los niveles Crecimiento y Lujo agregan estrategia de Stories y Reels, gestión de engagement y llamadas estratégicas quincenales o semanales. El nivel Lujo también incluye un film compuesto completo y gestión de anuncios pagados cada mes.' },
          { q: '¿Quién es el dueño de los videos y activos creativos después de la entrega?',
            a: 'Tú — total y permanentemente. Cada entregable está licenciado a perpetuidad para MLS, redes sociales, publicidad pagada y canales de marca. Sin tarifas de derechos recurrentes. Sin restricciones.' },
          { q: '¿Crean contenido en español además de inglés?',
            a: "Sí. Todos los paquetes mensuales incluyen contenido bilingüe — cada video, caption y conjunto de hashtags está elaborado en inglés y español para llegar de forma nativa a compradores internacionales de lujo." },
          { q: '¿Pueden adaptarse a mi identidad de marca existente?',
            a: 'Sí. Cada proyecto comienza con una sesión de alineación de marca. La gradación de color, la tipografía, el lenguaje de movimiento y el ritmo se calibran para sentirse nativos de tu universo visual existente — no como producción externa.' },
          { q: '¿Con qué rapidez recibiré mi contenido?',
            a: 'El paquete Esencial entrega en 4 días hábiles. Los del paquete Crecimiento están listos en una semana. Los paquetes Lujo funcionan con un calendario quincenal — la mitad del contenido en las primeras dos semanas, la otra mitad en las segundas. La entrega urgente de videos de un minuto está disponible en 48 horas, con precio según el formato.' },
          { q: '¿Hay una tarifa de configuración para comenzar?',
            a: 'Sí — una tarifa de incorporación única de $300 cubre una auditoría completa de marca: bios de redes sociales, imágenes de perfil y posicionamiento visual se revisan y actualizan antes de que tu primer contenido salga en vivo. Esto asegura que cada video llegue a un perfil ya configurado para convertir.' },
          { q: '¿Puedo ver una muestra antes de comprometerme con un paquete?',
            a: 'Sí. Cada nuevo cliente recibe un video de muestra y una llamada introductoria dedicada antes de cualquier compromiso. La llamada se usa para entender tu marca, tus inmuebles y qué quieres que el contenido haga por tu negocio — para que la muestra ya refleje tu mundo, no una plantilla genérica.' },
        ],
      },

      contact: {
        eyebrow: 'TU PRÓXIMA PROPIEDAD',
        h2: 'Envíame la dirección.',
        h2em: 'Te envío el film.',
        connectEyebrow: 'CONECTEMOS',
        email: 'SUSANA@NEURATEKGROUP.COM',
        location: 'AVAILABLE WORLDWIDE',
        availability: 'DISPONIBLE PARA PROYECTOS EN TODO EL MUNDO',
        formName: 'TU NOMBRE',
        formEmail: 'CORREO ELECTRÓNICO',
        formProperty: 'PROPIEDAD O MARCA',
        formMessage: 'CUÉNTAME SOBRE TU INMUEBLE',
        formSubmit: 'ENVIAR CONSULTA',
        formSent: 'ENVIADO —',
        msgError: 'POR FAVOR COMPLETA NOMBRE Y CORREO.',
        msgSuccess: 'MENSAJE ENVIADO — SUSANA RESPONDERÁ EN 24 HORAS.',
      },
    },
  };

  /* ── tr factory ──────────────────────────────────────────────────────────
     makeTr('es') → tr function
     tr('stats.items') → array
     tr('hero.headline') → string
     Falls back to EN if key is missing in requested language.
  ── */
  window.makeTr = function makeTr(lang) {
    const dict = window.T[lang] || window.T.en;
    return function tr(path) {
      const keys = path.split('.');
      let val = dict;
      for (var i = 0; i < keys.length; i++) {
        val = (val != null) ? val[keys[i]] : undefined;
      }
      if (val !== undefined && val !== null) return val;
      // Fallback to EN
      var fb = window.T.en;
      for (var j = 0; j < keys.length; j++) {
        fb = (fb != null) ? fb[keys[j]] : undefined;
      }
      return fb;
    };
  };

})();
