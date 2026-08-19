/**
 * IMPOAQUATIQ - ARCHIVO PRINCIPAL DE LÓGICA E INTERACTIVIDAD (app.js)
 * Importadora y Comercializadora Oficial de Soluciones Cementicias
 * Representante Técnico-Comercial: Lorna Pizarro Vera (+54 9 341-6825470)
 * 
 * Funcionalidades desarrolladas:
 * 1. Selector de Temas Visuales en tiempo real (Aqua, Architectural, Glass) con persistencia en localStorage.
 * 2. Lógica matemática de cómputo técnico para Calculadora de m² e Insumos (Piscinas y Terrazas/Bordes).
 * 3. Generador de cotizaciones pre-cargadas para WhatsApp dirigido a Lorna Pizarro Vera.
 * 4. Modal interactivo con Fichas Técnicas detalladas para los 5 productos oficiales.
 * 5. Visor modal lightbox para Fotos y Reproductor de Video para Galería de Obras Reales.
 */

// ==========================================================================
// 1. BASE DE DATOS DE PRODUCTOS Y FICHA TÉCNICA OFICIAL
// ==========================================================================
const OFFICIAL_PRODUCTS = {
    sb: {
        id: 'sb',
        code: 'sb',
        name: 'SÚPER BRITE®',
        subName: 'Revestimiento Continuo de Cuarzo',
        category: 'piscinas',
        badge: 'LÍNEA PISCINAS',
        badgeClass: 'badge-sb',
        headline: 'Revestimiento continuo de cuarzo refinado para piscinas de hormigón.',
        description: 'Súper Brite® es un revestimiento cementicio continuo formulado a base de cristales de cuarzo refinados y polímeros de alta adherencia. Reemplaza la pintura tradicional eliminando el repintado constante y sella la vasija de hormigón previniendo filtraciones.',
        specs: {
            presentacion: 'Bolsa de 22.7 kg (50 lbs)',
            rendimiento: '2.5 m² por bolsa (espesor 8 - 10 mm)',
            espesor: '8 mm a 10 mm de capa continua',
            durabilidad: 'Superior a 10 - 15 años sin decoloración',
            colores: 'Blanco Nieve, Azul Caribe, Celeste Cielo, Arena Natural, Gris Perla',
            resistencia: 'Antideslizante, immune a rayos UV y químicos de piscina (Cloro / Sal)'
        },
        features: [
            'Elimina fugas de agua y sella microfisuras del hormigón.',
            'Textura antideslizante y suave al tacto para pies descalzos.',
            'No junta verdín ni hongos gracias a su baja porosidad.',
            'Efecto cristal de agua cristalina y de alta elegancia.'
        ],
        application: 'Requiere preparación del vaso con puente de adherencia Súper Kote®. Mezclado con aditivo AquaBond, llaneado manual y curado mediante lavado ácido de revelado.',
        datasheetPdf: 'Ficha_Tecnica_SuperBrite_Quartz.pdf'
    },
    sk: {
        id: 'sk',
        code: 'sk',
        name: 'SÚPER KOTE®',
        subName: 'Puente de Unión Bicomponente',
        category: 'adherencia',
        badge: 'LÍNEA ADHERENCIA',
        badgeClass: 'badge-sk',
        headline: 'Imprimación adhesiva bicomponente de alta tenacidad para hormigón.',
        description: 'Súper Kote® es un promotor de adherencia estructural diseñado para generar un anclaje mecánico y químico inquebrantable entre el vasija de hormigón existente y el revestimiento final (Súper Brite o Súper Fullget), evitando picar o martillar la estructura previa.',
        specs: {
            presentacion: 'Kit Bicomponente (5L Líquido Polimérico + 10kg Polvo Fortificado)',
            rendimiento: '15 m² por kit completo',
            espesor: '1.5 mm a 2.0 mm (Capa rugosa)',
            durabilidad: 'Indefinida (Anclaje estructural)',
            colores: 'Gris Cemento Técnico',
            resistencia: 'Resistente a presión hidrostática negativa y humedad permanente'
        },
        features: [
            'Permite remodelar piscinas antiguas sin picar el hormigón.',
            'Crea una superficie rugosa de máxima tenacidad adhesiva.',
            'Fórmula 100% impermeable que bloquea humedad de cimientos.',
            'Fácil aplicación mediante brocha de pintor o rodillo grueso.'
        ],
        application: 'Limpiar la superficie eliminando algas o desmoldantes. Mezclar el componente líquido y polvo hasta homogeneizar. Aplicar a brocha o rodillo dejando textura rugosa. Dejar secar 12-24h antes de aplicar Súper Brite®.',
        datasheetPdf: 'Ficha_Tecnica_SuperKote_Bicomponente.pdf'
    },
    sf: {
        id: 'sf',
        code: 'sf',
        name: 'SÚPER FULLGET®',
        subName: 'Bordes & Terrazas Atérmicas',
        category: 'bordes',
        badge: 'LÍNEA BORDES & TERRAZAS',
        badgeClass: 'badge-sf',
        headline: 'Recubrimiento granítico natural atérmico y antideslizante para exteriores.',
        description: 'Súper Fullget® es la solución definitiva para solárium, bordes de piscina, terrazas y jardineras. Elaborado con piedras de granito natural seleccionadas y cementos hidráulicos fortificados que no retienen calor.',
        specs: {
            presentacion: 'Bolsa de 25 kg + Aditivo de Fraguado',
            rendimiento: '3.0 m² por bolsa (espesor 10-12 mm)',
            espesor: '10 mm a 12 mm',
            durabilidad: 'Mayor a 10 - 15 años',
            colores: 'Blanco Marfil, Hueso Atérmico, Arena Natural, Gris Plata',
            resistencia: '100% Atérmico under sol directo, antideslizante seco y mojado'
        },
        features: [
            'Atérmico garantizado: No quema los pies aun con sol intenso.',
            'Máxima seguridad antideslizante para niños y adultos.',
            'Estética natural de granito continuo sin juntas que junten mugre.',
            'Estructura inmune a heladas y variaciones térmicas extremas.'
        ],
        application: 'Preparar la carpeta previa. Aplicar con llana dentada y compactar. Lavar superficialmente con chorro de agua a presión controlada para exponer el grano de piedra natural.',
        datasheetPdf: 'Ficha_Tecnica_SuperFullget_Atermico.pdf'
    },
    sd: {
        id: 'sd',
        code: 'sd',
        name: 'SPRAY DECK',
        subName: 'Resina Polimérica Texturada',
        category: 'resina',
        badge: 'LÍNEA RESINA TEXTURADA',
        badgeClass: 'badge-sd',
        headline: 'Revestimiento texturado de alta resistencia proyectado a pistola.',
        description: 'Spray Deck es una resina polimérica modificada de alta tenacidad que se aplica mediante pulverizado neumático sobre carpetas, baldosas o hormigón viejo. Brinda un acabado decorativo texturado y atérmico ideal para soláriums y cocheras.',
        specs: {
            presentacion: 'Kit Polimérico (Resina Concentrada 5L + Agregados Sílices 20kg)',
            rendimiento: '4.0 m² por kit completo',
            espesor: '3 mm de textura proyectada',
            durabilidad: 'Superior a 15 años (Uso intensivo)',
            colores: 'Beige Solárium, Blanco Puro, Gris Urbano, Terracota, Arena',
            resistencia: 'Resistente a tráfico vehicular, aceites y cloro'
        },
        features: [
            'Aplicación ultra rápida con pistola de textura neumática.',
            'Crea patrones antideslizantes personalizados y frescos.',
            'Apto para renovar pisos de baldosas o hormigón gastado.',
            'Resiste tránsito pesado de vehículos en cocheras y entradas.'
        ],
        application: 'Reparar grietas previas. Proyectar con pistola tolva a 35-40 PSI formando gotas de textura. Fratasar suavemente las crestas con llana de acero y aplicar sellador acrílico protector.',
        datasheetPdf: 'Ficha_Tecnica_SprayDeck_Resina.pdf'
    },
    ss: {
        id: 'ss',
        code: 'ss',
        name: 'SÚPER SEAL®',
        subName: 'Microcemento Continuo Impermeable',
        category: 'microcemento',
        badge: 'LÍNEA MICROCEMENTO',
        badgeClass: 'badge-ss',
        headline: 'Microcemento decorativo e impermeable para pisos, muros y superficies continuas.',
        description: 'Súper Seal® es un microcemento bicomponente continuo de baja densidad y máxima dureza. Diseñado para renovar muros de piscinas, bordes de terrazas y espacios interiores o exteriores sin necesidad de juntas de dilatación.',
        specs: {
            presentacion: 'Kit Microcemento 10kg + Sellador Poliuretánico 1L',
            rendimiento: '5.0 m² por kit completo (a 2 manos)',
            espesor: '2 mm continuos',
            durabilidad: 'Superior a 10 años',
            colores: 'Gris Cemento, Blanco Ártico, Arena de Playa, Grafito',
            resistencia: '100% Impermeable, resistente a manchas orgánicas y abrasión'
        },
        features: [
            'Diseño veteado continuo sobrio y de arquitectura moderna.',
            'Sin juntas perceptibles: Evita acumulación de hongos.',
            'Excelente adherencia sobre cerámica, azulejos, revoque o placar.',
            'Terminación mate o satinada con laca poliuretánica protectora.'
        ],
        application: 'Aplicar capa base de regularización. Aplicar 2 capas finas de Súper Seal con llana de goma. Lijar suavemente y proteger con 2 manos de Sellador Poliuretánico.',
        datasheetPdf: 'Ficha_Tecnica_SuperSeal_Microcemento.pdf'
    },
    latex: {
        id: 'latex',
        code: 'latex',
        name: 'SÚPER LÁTEX® & RESINAS',
        subName: 'Aditivos e Insumos Complementarios',
        category: 'aditivos',
        badge: 'LÍNEA ADITIVOS & RESINAS',
        badgeClass: 'badge-sk',
        headline: 'Promotores líquidos de adherencia, elasticidad e impermeabilización para morteros.',
        description: 'Súper Látex® y Resinas Granite Ingeprex son aditivos sintéticos concentrados de alto desempeño. Mejoran radicalmente la flexibilidad, resistencia a la tracción y adherencia química de estucos, morteros de pega y lechadas para piscinas y soláriums.',
        specs: {
            presentacion: 'Tineta de 5 Galones (19 L) / Balde 1 Galón (3.8 L)',
            rendimiento: 'Dilución concentrada 1:1 a 1:3 en agua de amasado',
            espesor: 'Aditivo para mezclas cementicias',
            durabilidad: 'Indefinida (Mejora estructural permanente)',
            colores: 'Líquido blanco lechoso (seca transparente)',
            resistencia: 'Máxima elasticidad, previene fisuras y microgrietas'
        },
        features: [
            'Aumenta la plasticidad y trabajabilidad de las mezclas en obra.',
            'Incrementa la impermeabilidad y reduce la absorción capilar.',
            'Refuerza la adherencia entre hormigón fresco y endurecido.',
            'Protección UV y química contra la degradación a la intemperie.'
        ],
        application: 'Homogeneizar antes de usar. Diluir en el agua de amasado en proporción recomendada según el tipo de mortero. No aplicar puro sobre superficies sin mezclar con cemento o arena.',
        datasheetPdf: 'Ficha_Tecnica_SuperLatex_Aditivos.pdf'
    }
};


// ==========================================================================
// 2. INICIALIZACIÓN GLOBAL CUANDO EL DOM ESTÁ LISTO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initHeroBubbles();
    initBeforeAfterSlider();
    initCalculator();
    initNavbarScroll();
    initScrollReveal();
    initScrollSpy();
    initMobileMenu();
    initCatalogFilter();
    initModalListeners();
    initGalleryHandlers();
});


// ==========================================================================
// 3. SELECTOR DE TEMAS VISUALES EN TIEMPO REAL (Aqua, Architectural, Glass)
// ==========================================================================
function initThemeSwitcher() {
    // Obtener tema guardado en localStorage o usar 'aqua' por defecto
    const savedTheme = localStorage.getItem('impoaquatic_theme') || 'aqua';
    applyTheme(savedTheme);
}

function switchTheme(theme) {
    applyTheme(theme);
    localStorage.setItem('impoaquatic_theme', theme);
}

function applyTheme(theme) {
    const validThemes = ['aqua', 'architectural', 'glass'];
    const activeTheme = validThemes.includes(theme) ? theme : 'aqua';

    // Modificar el atributo data-theme en la etiqueta <html>
    document.documentElement.setAttribute('data-theme', activeTheme);

    // Actualizar estado activo en botones del Selector de Temas
    const btnAqua = document.getElementById('btn-theme-aqua');
    const btnArch = document.getElementById('btn-theme-architectural');
    const btnGlass = document.getElementById('btn-theme-glass');

    if (btnAqua) btnAqua.classList.toggle('active', activeTheme === 'aqua');
    if (btnArch) btnArch.classList.toggle('active', activeTheme === 'architectural');
    if (btnGlass) btnGlass.classList.toggle('active', activeTheme === 'glass');

    // Notificación en consola para depuración
    console.log(`[ImpoAcuatiq] Tema visual actualizado a: ${activeTheme.toUpperCase()}`);
}

// Hacer la función accesible globalmente para eventos inline
window.switchTheme = switchTheme;


// ==========================================================================
// 4. LÓGICA MATEMÁTICA COMPLETA DE LA CALCULADORA DE M² E INSUMOS
// ==========================================================================
let currentCalcMode = 'piscina';

function initCalculator() {
    const calcInputs = [
        'piscina-largo',
        'piscina-ancho',
        'piscina-profundidad',
        'superficie-m2',
        'producto-select'
    ];

    calcInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', calculateMaterials);
            el.addEventListener('change', calculateMaterials);
        }
    });

    // Calcular valores iniciales
    calculateMaterials();
}

function setCalcType(type) {
    currentCalcMode = type;

    const tabPiscina = document.getElementById('tab-piscina');
    const tabSuperficie = document.getElementById('tab-superficie');
    const modePiscina = document.getElementById('mode-piscina');
    const modeSuperficie = document.getElementById('mode-superficie');

    if (type === 'piscina') {
        if (tabPiscina) tabPiscina.classList.add('active');
        if (tabSuperficie) tabSuperficie.classList.remove('active');
        if (modePiscina) modePiscina.style.display = 'block';
        if (modeSuperficie) modeSuperficie.style.display = 'none';
    } else {
        if (tabSuperficie) tabSuperficie.classList.add('active');
        if (tabPiscina) tabPiscina.classList.remove('active');
        if (modeSuperficie) modeSuperficie.style.display = 'block';
        if (modePiscina) modePiscina.style.display = 'none';
    }

    calculateMaterials();
}

function calculateMaterials() {
    let totalM2 = 0;

    if (currentCalcMode === 'piscina') {
        const largo = parseFloat(document.getElementById('piscina-largo')?.value) || 0;
        const ancho = parseFloat(document.getElementById('piscina-ancho')?.value) || 0;
        const profundidad = parseFloat(document.getElementById('piscina-profundidad')?.value) || 0;

        // FÓRMULA OFICIAL DE PISCINAS (Piso + Paredes perimetrales):
        // m² = (Largo * Ancho) + ((Largo + Ancho) * 2 * Profundidad Media)
        const areaPiso = largo * ancho;
        const areaParedes = (largo + ancho) * 2 * profundidad;
        totalM2 = areaPiso + areaParedes;
    } else {
        // MODO SUPERFICIE DIRECTA (Bordes / Terrazas / Cocheras / Muros)
        totalM2 = parseFloat(document.getElementById('superficie-m2')?.value) || 0;
    }

    // Redondear a 1 decimal
    totalM2 = Math.round(totalM2 * 10) / 10;

    const prodSelect = document.getElementById('producto-select')?.value || 'sb';
    
    // FÓRMULAS DE RENDIMIENTO TÉCNICO
    // Súper Brite®: 1 bolsa (22.7 kg) rinde 2.5 m²
    // Súper Kote®: 1 kit bicomponente rinde 15 m²
    // Súper Fullget®: 1 bolsa (25 kg) rinde 3.0 m²
    // Spray Deck: 1 kit resina rinde 4.0 m²
    // Súper Seal®: 1 kit microcemento rinde 5.0 m²

    let bolsasSB = Math.ceil(totalM2 / 2.5);
    let unidadesSK = Math.ceil(totalM2 / 15);
    let bolsasSF = Math.ceil(totalM2 / 3.0);
    let kitsSD = Math.ceil(totalM2 / 4.0);
    let kitsSS = Math.ceil(totalM2 / 5.0);

    // Actualizar elementos DOM en pantalla
    const resM2El = document.getElementById('res-m2');
    const labelPrincipalEl = document.getElementById('label-prod-principal');
    const labelSecundarioEl = document.getElementById('label-prod-secundario');
    const resBolsasEl = document.getElementById('res-bolsas');
    const resKoteEl = document.getElementById('res-kote');
    const resRendimientoEl = document.getElementById('res-rendimiento');

    if (resM2El) resM2El.textContent = `${totalM2.toFixed(1)} m²`;

    if (prodSelect === 'sb') {
        if (labelPrincipalEl) labelPrincipalEl.textContent = "Súper Brite® (Cuarzo Piscinas):";
        if (resBolsasEl) resBolsasEl.innerHTML = `${bolsasSB} Bolsas <small style="color: #94A3B8; font-weight: normal;">(22.7 kg c/u)</small>`;
        
        if (labelSecundarioEl) labelSecundarioEl.textContent = "Súper Kote® (Puente Adherencia):";
        if (resKoteEl) resKoteEl.innerHTML = `${unidadesSK} Kits <small style="color: #94A3B8; font-weight: normal;">(Bicomponente)</small>`;
        
        if (resRendimientoEl) resRendimientoEl.textContent = "1 bolsa (22.7 kg) rinde 2.5 m²";
    } else if (prodSelect === 'sk') {
        if (labelPrincipalEl) labelPrincipalEl.textContent = "Súper Kote® Bicomponente:";
        if (resBolsasEl) resBolsasEl.innerHTML = `${unidadesSK} Kits <small style="color: #94A3B8; font-weight: normal;">(Polvo + Resina)</small>`;
        
        if (labelSecundarioEl) labelSecundarioEl.textContent = "Puente Adherencia Estructural:";
        if (resKoteEl) resKoteEl.innerHTML = `100% Adherencia <small style="color: #94A3B8; font-weight: normal;">(Sin picar pared)</small>`;
        
        if (resRendimientoEl) resRendimientoEl.textContent = "1 kit bicomponente rinde 15 m²";
    } else if (prodSelect === 'sf') {
        if (labelPrincipalEl) labelPrincipalEl.textContent = "Súper Fullget® (Bordes & Solárium):";
        if (resBolsasEl) resBolsasEl.innerHTML = `${bolsasSF} Bolsas <small style="color: #94A3B8; font-weight: normal;">(25 kg c/u)</small>`;
        
        if (labelSecundarioEl) labelSecundarioEl.textContent = "Súper Kote® (Imprimación Previa):";
        if (resKoteEl) resKoteEl.innerHTML = `${unidadesSK} Kits <small style="color: #94A3B8; font-weight: normal;">(Recomendado)</small>`;
        
        if (resRendimientoEl) resRendimientoEl.textContent = "1 bolsa (25 kg) rinde 3.0 m² (Atérmico)";
    } else if (prodSelect === 'sd') {
        if (labelPrincipalEl) labelPrincipalEl.textContent = "Spray Deck (Resina Texturada):";
        if (resBolsasEl) resBolsasEl.innerHTML = `${kitsSD} Kits <small style="color: #94A3B8; font-weight: normal;">(Base + Resina)</small>`;
        
        if (labelSecundarioEl) labelSecundarioEl.textContent = "Sellador Acrílico de Protección:";
        if (resKoteEl) resKoteEl.innerHTML = `${Math.ceil(totalM2 / 12)} Litros <small style="color: #94A3B8; font-weight: normal;">(Terminación)</small>`;
        
        if (resRendimientoEl) resRendimientoEl.textContent = "1 kit rinde 4.0 m² proyectado";
    } else if (prodSelect === 'ss') {
        if (labelPrincipalEl) labelPrincipalEl.textContent = "Súper Seal® (Microcemento):";
        if (resBolsasEl) resBolsasEl.innerHTML = `${kitsSS} Kits <small style="color: #94A3B8; font-weight: normal;">(Impermeable)</small>`;
        
        if (labelSecundarioEl) labelSecundarioEl.textContent = "Sellador Poliuretánico / Topcoat:";
        if (resKoteEl) resKoteEl.innerHTML = `${Math.ceil(totalM2 / 10)} Litros <small style="color: #94A3B8; font-weight: normal;">(2 Manos)</small>`;
        
        if (resRendimientoEl) resRendimientoEl.textContent = "1 kit bicomponente rinde 5.0 m²";
    }

    return {
        totalM2,
        prodSelect,
        bolsasSB,
        unidadesSK,
        bolsasSF,
        kitsSD,
        kitsSS
    };
}

function scrollToCalculator(prodCode) {
    if (prodCode) {
        const select = document.getElementById('producto-select');
        if (select) select.value = prodCode;

        if (prodCode === 'sb' || prodCode === 'sk') {
            setCalcType('piscina');
        } else {
            setCalcType('superficie');
        }
    }

    const calcSection = document.getElementById('calculadora');
    if (calcSection) {
        calcSection.scrollIntoView({ behavior: 'smooth' });
    }
}

window.setCalcType = setCalcType;
window.calculateMaterials = calculateMaterials;
window.scrollToCalculator = scrollToCalculator;


// ==========================================================================
// 5. GENERADOR DE MENSAJES PRE-CARGADOS A WHATSAPP (ImpoAcuatiq)
// ==========================================================================
function sendCalcToWhatsApp() {
    const calcData = calculateMaterials();
    const phone = "5493416825470"; // Teléfono oficial de ImpoAcuatiq (Argentina)
    
    let modoTexto = "";
    let medidasTexto = "";

    if (currentCalcMode === 'piscina') {
        const largo = document.getElementById('piscina-largo')?.value || "0";
        const ancho = document.getElementById('piscina-ancho')?.value || "0";
        const prof = document.getElementById('piscina-profundidad')?.value || "0";
        modoTexto = "Piscina (Vaso de Hormigón)";
        medidasTexto = `Largo: ${largo}m | Ancho: ${ancho}m | Prof. Media: ${prof}m`;
    } else {
        const m2 = document.getElementById('superficie-m2')?.value || "0";
        modoTexto = "Superficie Plana (Borde / Terraza / Cochera)";
        medidasTexto = `Superficie Directa: ${m2} m²`;
    }

    const productObj = OFFICIAL_PRODUCTS[calcData.prodSelect] || OFFICIAL_PRODUCTS['sb'];

    let desgloseMateriales = "";
    if (calcData.prodSelect === 'sb') {
        desgloseMateriales = `• Súper Brite® (Cuarzo Piscinas): *${calcData.bolsasSB} Bolsas (22.7 kg)*\n• Puente de Unión Súper Kote®: *${calcData.unidadesSK} Kits Bicomponente*`;
    } else if (calcData.prodSelect === 'sk') {
        desgloseMateriales = `• Súper Kote® Bicomponente: *${calcData.unidadesSK} Kits (Polvo + Resina)*\n• Rendimiento: *Puente de adherencia sin picar hormigón*`;
    } else if (calcData.prodSelect === 'sf') {
        desgloseMateriales = `• Súper Fullget® Atérmico: *${calcData.bolsasSF} Bolsas (25 kg)*\n• Imprimación Previa Súper Kote®: *${calcData.unidadesSK} Kits*`;
    } else if (calcData.prodSelect === 'sd') {
        desgloseMateriales = `• Spray Deck Resina Texturada: *${calcData.kitsSD} Kits*\n• Sellador Acrílico de Acabado: *${Math.ceil(calcData.totalM2 / 12)} Litros*`;
    } else if (calcData.prodSelect === 'ss') {
        desgloseMateriales = `• Súper Seal® Microcemento: *${calcData.kitsSS} Kits*\n• Sellador Poliuretánico: *${Math.ceil(calcData.totalM2 / 10)} Litros*`;
    }

    const message = 
`🌊 *COTIZACIÓN DE INSUMOS - IMPOAQUATIQ* 🌊
*Importador Exclusivo Argentina:* ImpoAcuatiq (+54 9 341-6825470)

📋 *DETALLE DEL PROYECTO:*
• *Tipo de Obra:* ${modoTexto}
• *Dimensiones:* ${medidasTexto}
• *Superficie Total:* ${calcData.totalM2} m²
• *Producto Seleccionado:* ${productObj.name} (${productObj.subName})

📦 *CÓMPUTO ESTIMADO DE MATERIALES:*
${desgloseMateriales}
• *Rendimiento Técnico:* ${productObj.specs.rendimiento}

Hola ImpoAcuatiq, me gustaría verificar disponibilidad de stock en depósito central, confirmar presupuesto mayorista/obra y consultar opciones de despacho. Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

window.sendCalcToWhatsApp = sendCalcToWhatsApp;

const PRODUCT_PACKAGING_IMAGES = {
    sb: 'assets/img/sb-bag.jpg',
    sk: 'assets/img/sk-primer.jpeg',
    sf: 'assets/img/sf-bag.jpg',
    sd: 'assets/img/sd-bucket.png',
    ss: 'assets/img/ss-bucket.png',
    latex: 'assets/img/latex-bucket.png'
};

function openProductModal(prodCode) {
    const product = OFFICIAL_PRODUCTS[prodCode];
    if (!product) return;

    const modalContent = document.getElementById('modal-content');
    const modal = document.getElementById('product-modal');

    if (!modalContent || !modal) return;

    const packImg = PRODUCT_PACKAGING_IMAGES[prodCode] || 'assets/img/sb-bag.jpg';

    modalContent.innerHTML = `
        <div class="modal-doc-header">
            <img src="assets/img/logo-horizontal-transparent.png" alt="ImpoAcuatiq Logo" class="modal-doc-logo">
            <span class="modal-doc-badge">Ficha Técnica Oficial</span>
        </div>

        <h2 class="modal-doc-title">${product.name}</h2>
        <p class="modal-doc-sub">${product.subName} — ${product.headline}</p>

        <div class="modal-doc-grid">
            <img src="${packImg}" alt="${product.name} Packaging" class="modal-doc-img">
            
            <table class="modal-doc-specs">
                <tr>
                    <td class="key">Presentación</td>
                    <td class="val">${product.specs.presentacion}</td>
                </tr>
                <tr>
                    <td class="key">Rendimiento</td>
                    <td class="val">${product.specs.rendimiento}</td>
                </tr>
                <tr>
                    <td class="key">Espesor de Aplicación</td>
                    <td class="val">${product.specs.espesor}</td>
                </tr>
                <tr>
                    <td class="key">Durabilidad Estimada</td>
                    <td class="val">${product.specs.durabilidad}</td>
                </tr>
                <tr>
                    <td class="key">Propiedades</td>
                    <td class="val">${product.specs.resistencia}</td>
                </tr>
            </table>
        </div>

        <div class="modal-doc-section-title">
            <i class="fa-solid fa-layer-group text-blue"></i> Descripción General del Sistema
        </div>
        <p style="font-size: 13.5px; color: #334155; line-height: 1.6; margin-bottom: 16px;">${product.description}</p>

        <div class="modal-doc-section-title">
            <i class="fa-solid fa-circle-check text-blue"></i> Ventajas y Especificaciones de Obra
        </div>
        <ul class="modal-doc-features">
            ${product.features.map(f => `<li><i class="fa-solid fa-check text-blue"></i> ${f}</li>`).join('')}
        </ul>

        <div class="modal-doc-actions">
            <button class="btn-sm-primary" onclick="scrollToCalculator('${product.code}'); closeProductModal();">
                <i class="fa-solid fa-calculator"></i> Calcular m² para este Producto
            </button>
            <button class="btn-doc-pdf" onclick="downloadSpecSheet('${product.name}', '${product.datasheetPdf}')">
                <i class="fa-solid fa-file-pdf"></i> Imprimir / Guardar Ficha PDF
            </button>
            <a href="https://wa.me/5493416825470?text=Hola%20ImpoAcuatiq,%20quisiera%20recibir%20la%20Ficha%20T%C3%A9cnica%20en%20PDF%20de%20${encodeURIComponent(product.name)}." target="_blank" class="btn-doc-wa">
                <i class="fa-brands fa-whatsapp"></i> Solicitar por WhatsApp
            </a>
        </div>
    `;

    document.body.style.overflow = 'hidden';
    modal.classList.add('active', 'open');
    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active', 'open');
        modal.style.display = 'none';
    }
    checkModalsClosed();
}

function downloadSpecSheet(productName, fileName) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert(`📄 Ficha Técnica de "${productName}": Por favor permití las ventanas emergentes para abrir e imprimir el documento PDF oficial.`);
        return;
    }

    const prodKey = Object.keys(OFFICIAL_PRODUCTS).find(k => OFFICIAL_PRODUCTS[k].name === productName) || 'sb';
    const prod = OFFICIAL_PRODUCTS[prodKey];
    const packImg = PRODUCT_PACKAGING_IMAGES[prodKey] || 'assets/img/sb-bag.jpg';

    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Ficha Técnica Oficial - ${prod.name} | ImpoAcuatiq</title>
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
            <style>
                body { font-family: 'Plus Jakarta Sans', sans-serif; padding: 40px; color: #0F172A; max-width: 800px; margin: 0 auto; line-height: 1.5; }
                .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #0284C7; padding-bottom: 20px; margin-bottom: 30px; }
                .logo { height: 50px; }
                .badge { background: #0284C7; color: #fff; padding: 6px 14px; border-radius: 4px; font-weight: 700; font-size: 12px; text-transform: uppercase; }
                h1 { font-size: 28px; margin-bottom: 6px; }
                .sub { color: #64748B; font-size: 15px; margin-bottom: 24px; }
                .grid { display: grid; grid-template-columns: 200px 1fr; gap: 24px; margin-bottom: 30px; background: #F8FAFC; padding: 20px; border-radius: 8px; border: 1px solid #E2E8F0; }
                .grid img { width: 100%; max-height: 200px; object-fit: contain; }
                table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
                td { padding: 8px 10px; border-bottom: 1px solid #E2E8F0; }
                td.key { font-weight: 600; color: #64748B; width: 40%; }
                td.val { font-weight: 700; }
                h3 { font-size: 16px; color: #0F172A; margin-top: 24px; margin-bottom: 10px; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; }
                ul { padding-left: 20px; }
                li { margin-bottom: 6px; font-size: 13.5px; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 12px; color: #64748B; text-align: center; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <div class="no-print" style="margin-bottom: 20px; text-align: right;">
                <button onclick="window.print()" style="background: #0284C7; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; cursor: pointer;">🖨️ Imprimir / Guardar como PDF</button>
            </div>
            <div class="header">
                <div>
                    <h2>ImpoAcuatiq Argentina</h2>
                    <p style="font-size: 12px; color: #64748B;">Importadora & Distribuidora de Soluciones Cementicias</p>
                </div>
                <span class="badge">Ficha Técnica Oficial</span>
            </div>
            <h1>${prod.name}</h1>
            <p class="sub">${prod.subName} — ${prod.headline}</p>
            <div class="grid">
                <img src="${packImg}" alt="${prod.name}">
                <table>
                    <tr><td class="key">Presentación</td><td class="val">${prod.specs.presentacion}</td></tr>
                    <tr><td class="key">Rendimiento</td><td class="val">${prod.specs.rendimiento}</td></tr>
                    <tr><td class="key">Espesor</td><td class="val">${prod.specs.espesor}</td></tr>
                    <tr><td class="key">Durabilidad</td><td class="val">${prod.specs.durabilidad}</td></tr>
                    <tr><td class="key">Resistencia</td><td class="val">${prod.specs.resistencia}</td></tr>
                </table>
            </div>
            <h3>Descripción Técnica</h3>
            <p style="font-size: 13.5px; color: #334155;">${prod.description}</p>
            <h3>Ventajas y Propiedades de Obra</h3>
            <ul>${prod.features.map(f => `<li>${f}</li>`).join('')}</ul>
            <h3>Instrucciones de Aplicación</h3>
            <p style="font-size: 13.5px; color: #334155;">${prod.application}</p>
            <div class="footer">
                <p>ImpoAcuatiq Argentina | Departamento Técnico & Comercial | Tel: +54 9 341-6825470 / +56 9 91359879</p>
                <p>© 2026 ImpoAcuatiq Argentina. Documento técnico de especificación de obra.</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function initModalListeners() {
    const productModal = document.getElementById('product-modal');
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }

    const lightboxModal = document.getElementById('lightbox-modal');
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            closeLightbox();
            closeVideoModal();
        }
    });
}

window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.downloadSpecSheet = downloadSpecSheet;


// ==========================================================================
// 7. GALERÍA DE OBRAS REALES, CAPACITACIONES Y MULTIMEDIA
// ==========================================================================
const GALLERY_ITEMS = [
    // --- 1. APLICACIÓN EN OBRA & TALLER TÉCNICO (VIDEOS Y FOTOS REALES) ---
    {
        type: 'video',
        id: 'v_obra_llaneado',
        title: 'Aplicación & Llaneado Manual de Cuarzo en Pared',
        category: 'obra',
        tag: 'Aplicación en Obra',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-video"></i> OBRA REAL',
        desc: 'Técnica de llaneado simultáneo con llana metálica para lograr capa continua de 8 a 10 mm.',
        thumb: 'assets/videos/thumbs/vid_obra_llaneado_pared.jpg',
        video: 'assets/videos/vid_obra_llaneado_pared.mp4'
    },
    {
        type: 'video',
        id: 'v_taller_hidro',
        title: 'Hidrolavado & Preparación Mecánica del Vaso',
        category: 'obra',
        tag: 'Preparación de Obra',
        tagBg: '#059669',
        badge: '<i class="fa-solid fa-video"></i> PREPARACIÓN',
        desc: 'Apertura de poro y limpieza profunda a presión para asegurar máxima adherencia estructural.',
        thumb: 'assets/videos/thumbs/vid_taller_hidrolavado.jpg',
        video: 'assets/videos/vid_taller_hidrolavado.mp4'
    },
    {
        type: 'photo',
        id: 'p_obra_llaneado_1',
        title: 'Detalle de Llaneado y Textura de Cuarzo',
        category: 'obra',
        tag: 'Aplicación en Obra',
        tagBg: '#D97706',
        badge: '<i class="fa-solid fa-trowel-bricks"></i> EN OBRA',
        desc: 'Compactación manual uniforme para asegurar resistencia mecánica y nula porosidad superficial.',
        thumb: 'assets/img/obra-llaneado-1.jpg',
        src: 'assets/img/obra-llaneado-1.jpg'
    },
    {
        type: 'photo',
        id: 'p_obra_llaneado_2',
        title: 'Acabado Atérmico Manual en Solárium',
        category: 'obra',
        tag: 'Aplicación en Obra',
        tagBg: '#D97706',
        badge: '<i class="fa-solid fa-trowel-bricks"></i> EN OBRA',
        desc: 'Terminación atérmica antideslizante ejecutada por aplicador certificado en borde de piscina.',
        thumb: 'assets/img/obra-llaneado-2.jpg',
        src: 'assets/img/obra-llaneado-2.jpg'
    },
    {
        type: 'photo',
        id: 'p_solarium_fullget',
        title: 'Bordes & Solárium Atérmico — Súper Fullget®',
        category: 'obra',
        tag: 'Súper Fullget®',
        tagBg: '#D97706',
        badge: '<i class="fa-solid fa-sun"></i> FOTO REAL',
        desc: 'Piedra natural calibrada atérmica que no absorbe temperatura bajo sol pleno.',
        thumb: 'assets/gallery/photos/p_solarium_fullget.jpg',
        src: 'assets/gallery/photos/p_solarium_fullget.jpg'
    },

    // --- 2. CAPACITACIONES & DIPLOMAS OFICIALES (FOTO REAL DE GRADUADOS) ---
    {
        type: 'photo',
        id: 'p_cert_graduacion',
        title: 'Graduación y Entrega de Diplomas Oficiales Ingeprex',
        category: 'certificacion',
        tag: 'Capacitación Oficial',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-award"></i> DIPLOMAS OFICIALES',
        desc: 'Acreditación técnica a la nueva camada de aplicadores homologados. Próximas ediciones en Argentina.',
        thumb: 'assets/img/cert-graduacion-4.jpg',
        src: 'assets/img/cert-graduacion-4.jpg'
    },

    // --- 3. PISCINAS TERMINADAS (FOTOS REALES DE CLIENTES) ---
    {
        type: 'photo',
        id: 'p_tahoe_blue',
        title: 'Piscina Súper Brite® — Tono Tahoe Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-camera"></i> PISCINA REAL',
        desc: 'Piscina residencial con escalones sumergidos y agua turquesa brillante bajo sol directo.',
        thumb: 'assets/gallery/photos/p_tahoe_blue.jpg',
        src: 'assets/gallery/photos/p_tahoe_blue.jpg'
    },
    {
        type: 'photo',
        id: 'p_cool_blue',
        title: 'Piscina Súper Brite® — Tono Cool Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-camera"></i> PISCINA REAL',
        desc: 'Piscina angular con solárium atérmico, cascada de piedra natural y luces nocturnas.',
        thumb: 'assets/gallery/photos/p_cool_blue.jpg',
        src: 'assets/gallery/photos/p_cool_blue.jpg'
    },
    {
        type: 'photo',
        id: 'p_onyx_blue',
        title: 'Piscina Súper Brite® — Tono Onyx Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#1E293B',
        badge: '<i class="fa-solid fa-camera"></i> PISCINA REAL',
        desc: 'Efecto espejo profundo de agua azul noche con iluminación subacuática.',
        thumb: 'assets/gallery/photos/p_onyx_blue.jpg',
        src: 'assets/gallery/photos/p_onyx_blue.jpg'
    },
    {
        type: 'photo',
        id: 'p_marlyn_blue',
        title: 'Detalle de Escalones — Marlyn Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#0EA5E9',
        badge: '<i class="fa-solid fa-camera"></i> PISCINA REAL',
        desc: 'Acabado suave y antideslizante con guardas vítreas en escaleras de acceso.',
        thumb: 'assets/gallery/photos/p_marlyn_blue.jpg',
        src: 'assets/gallery/photos/p_marlyn_blue.jpg'
    },

    // --- 4. MUESTRARIOS REALES DE CRISTALES DE CUARZO ---
    {
        type: 'photo',
        id: 'p_cuarzo_tahoe_swatch',
        title: 'Cristales de Cuarzo: Tahoe Blue',
        category: 'muestras',
        tag: 'Cuarzo Real',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-gem"></i> TEXTURA REAL',
        desc: 'Cristales de cuarzo puro seleccionados pigmentados con polímeros marinos.',
        thumb: 'assets/gallery/photos/p_cuarzo_tahoe_swatch.jpg',
        src: 'assets/gallery/photos/p_cuarzo_tahoe_swatch.jpg'
    },
    {
        type: 'photo',
        id: 'p_cuarzo_cool_swatch',
        title: 'Cristales de Cuarzo: Cool Blue',
        category: 'muestras',
        tag: 'Cuarzo Real',
        tagBg: '#38BDF8',
        badge: '<i class="fa-solid fa-gem"></i> TEXTURA REAL',
        desc: 'Mezcla balanceada de cuarzo blanco reflectivo con micro-partículas celestes.',
        thumb: 'assets/gallery/photos/p_cuarzo_cool_swatch.jpg',
        src: 'assets/gallery/photos/p_cuarzo_cool_swatch.jpg'
    },
    {
        type: 'photo',
        id: 'p_cuarzo_marlyn_swatch',
        title: 'Cristales de Cuarzo: Marlyn Blue',
        category: 'muestras',
        tag: 'Cuarzo Real',
        tagBg: '#0EA5E9',
        badge: '<i class="fa-solid fa-gem"></i> TEXTURA REAL',
        desc: 'Tono intermedio de gran luminosidad para aguas turquesas cristalinas.',
        thumb: 'assets/gallery/photos/p_cuarzo_marlyn_swatch.jpg',
        src: 'assets/gallery/photos/p_cuarzo_marlyn_swatch.jpg'
    },
    {
        type: 'photo',
        id: 'p_cuarzo_grey_swatch',
        title: 'Cristales de Cuarzo: Gris Piedra',
        category: 'muestras',
        tag: 'Cuarzo Real',
        tagBg: '#64748B',
        badge: '<i class="fa-solid fa-gem"></i> TEXTURA REAL',
        desc: 'Granulometría seleccionada en tonos grises para arquitectura contemporánea.',
        thumb: 'assets/gallery/photos/p_cuarzo_grey_swatch.jpg',
        src: 'assets/gallery/photos/p_cuarzo_grey_swatch.jpg'
    },
    {
        type: 'photo',
        id: 'p_cuarzo_black_swatch',
        title: 'Cristales de Cuarzo: Black Onyx',
        category: 'muestras',
        tag: 'Cuarzo Real',
        tagBg: '#1E293B',
        badge: '<i class="fa-solid fa-gem"></i> TEXTURA REAL',
        desc: 'Granos de cuarzo negro volcánico para generar efecto de reflejo espejo natural.',
        thumb: 'assets/gallery/photos/p_cuarzo_black_swatch.jpg',
        src: 'assets/gallery/photos/p_cuarzo_black_swatch.jpg'
    },
    {
        type: 'photo',
        id: 'p_arena_cuarzo_flyer',
        title: 'Arena de Cuarzo Colorido & Resinas Ingeprex',
        category: 'muestras',
        tag: 'Insumos & Resinas',
        tagBg: '#64748B',
        badge: '<i class="fa-solid fa-gem"></i> INSUMO OFICIAL',
        desc: 'Cuarzo de alta pureza disponible en granulometrías seleccionadas para revestimientos y decoración.',
        thumb: 'assets/img/flyer-arena-cuarzo.jpg',
        src: 'assets/img/flyer-arena-cuarzo.jpg'
    },

    // --- 5. RENDERS 3D DE PRODUCTOS Y PROBETAS (REFERENCIA COMPLEMENTARIA) ---
    {
        type: 'video',
        id: 'v_lineup',
        title: 'Línea Oficial 5 Productos Ingeprex (3D)',
        category: 'renders',
        tag: 'Gama Oficial 3D',
        tagBg: '#0F172A',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Render completo con la línea de envases oficiales para piscinas y soláriums.',
        thumb: 'assets/gallery/thumbs/v_lineup.jpg',
        video: 'assets/gallery/videos/v_lineup.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_blue',
        title: 'Muestrario 3D: Probeta Tahoe Blue',
        category: 'renders',
        tag: 'Carta Cuarzo 3D',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Simulación 3D de probeta con cuarzo azul turquesa reflectivo.',
        thumb: 'assets/gallery/thumbs/v_swatch_blue.jpg',
        video: 'assets/gallery/videos/v_swatch_blue.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_black',
        title: 'Muestrario 3D: Probeta Onyx Black',
        category: 'renders',
        tag: 'Carta Cuarzo 3D',
        tagBg: '#1E293B',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Simulación 3D con reflejo de cuarzo negro profundo para efecto espejo.',
        thumb: 'assets/gallery/thumbs/v_swatch_black.jpg',
        video: 'assets/gallery/videos/v_swatch_black.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_sand',
        title: 'Muestrario 3D: Probeta Arena Dorada',
        category: 'renders',
        tag: 'Carta Cuarzo 3D',
        tagBg: '#D97706',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Simulación 3D de probeta con textura real de cuarzo tono arena caribeño.',
        thumb: 'assets/gallery/thumbs/v_swatch_sand.jpg',
        video: 'assets/gallery/videos/v_swatch_sand.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_grey',
        title: 'Muestrario 3D: Probeta Gris Nórdico',
        category: 'renders',
        tag: 'Carta Cuarzo 3D',
        tagBg: '#64748B',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Simulación 3D de probeta de cuarzo gris arquitectónico contemporáneo.',
        thumb: 'assets/gallery/thumbs/v_swatch_grey.jpg',
        video: 'assets/gallery/videos/v_swatch_grey.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_white',
        title: 'Muestrario 3D: Probeta White Quartz',
        category: 'renders',
        tag: 'Carta Cuarzo 3D',
        tagBg: '#0EA5E9',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Simulación 3D de cristales de cuarzo blanco reflectivo con destellos celestes.',
        thumb: 'assets/gallery/thumbs/v_swatch_white.jpg',
        video: 'assets/gallery/videos/v_swatch_white.mp4'
    },
    {
        type: 'video',
        id: 'v_latex',
        title: 'Súper Látex Aditivo Líquido (3D)',
        category: 'renders',
        tag: 'Aditivos 3D',
        tagBg: '#4F46E5',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Presentación del promotor líquido de adherencia y elasticidad para morteros.',
        thumb: 'assets/gallery/thumbs/v_latex.jpg',
        video: 'assets/gallery/videos/v_latex.mp4'
    },
    {
        type: 'video',
        id: 'v_resingranite',
        title: 'Super Resin Granite Aislante UV (3D)',
        category: 'renders',
        tag: 'Resinas 3D',
        tagBg: '#DC2626',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Resina elástica resistente a la intemperie, rayos solares y agentes químicos.',
        thumb: 'assets/gallery/thumbs/v_resingranite.jpg',
        video: 'assets/gallery/videos/v_resingranite.mp4'
    },
    {
        type: 'video',
        id: 'v_buckets_duo',
        title: 'Baldes de Resina & Látex Ingeprex (3D)',
        category: 'renders',
        tag: 'Insumos 3D',
        tagBg: '#334155',
        badge: '<i class="fa-solid fa-cube"></i> RENDER 3D',
        desc: 'Render 3D en alta resolución de envases complementarios de obra.',
        thumb: 'assets/gallery/thumbs/v_buckets_duo.jpg',
        video: 'assets/gallery/videos/v_buckets_duo.mp4'
    }
];

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderGallery(filter = 'all') {
    const container = document.getElementById('gal-grid-container');
    if (!container) return;

    let filtered = GALLERY_ITEMS;
    if (filter === 'obra') {
        filtered = GALLERY_ITEMS.filter(item => item.category === 'obra');
    } else if (filter === 'certificacion') {
        filtered = GALLERY_ITEMS.filter(item => item.category === 'certificacion');
    } else if (filter === 'piscinas') {
        filtered = GALLERY_ITEMS.filter(item => item.category === 'piscinas');
    } else if (filter === 'muestras') {
        filtered = GALLERY_ITEMS.filter(item => item.category === 'muestras');
    } else if (filter === 'renders') {
        filtered = GALLERY_ITEMS.filter(item => item.category === 'renders');
    }

    container.innerHTML = filtered.map((item, index) => {
        const isVideo = item.type === 'video';
        const clickAction = isVideo
            ? `openVideoModal('${item.video}', '${escapeHtml(item.title)}', '${escapeHtml(item.desc)}', '${item.tag}', '${item.tagBg}')`
            : `openLightbox('${item.src}', '${escapeHtml(item.title)}', '${escapeHtml(item.desc)}', '${item.tag}', '${item.tagBg}')`;

        return `
            <div class="gal-card" onclick="${clickAction}" style="cursor: pointer;">
                <div class="gal-card-media">
                    <img src="${item.thumb}" alt="${escapeHtml(item.title)}" loading="lazy">
                    <div class="gal-media-badge">
                        ${item.badge}
                    </div>
                    ${isVideo ? `
                        <div class="gal-play-overlay">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    ` : ''}
                </div>
                <div class="gal-caption">
                    <span class="gal-tag" style="background: ${item.tagBg};">${item.tag}</span>
                    <div class="gal-title">${escapeHtml(item.title)}</div>
                    <div class="gal-sub">${escapeHtml(item.desc)}</div>
                </div>
            </div>
        `;
    }).join('');

    // Update counts in buttons if they exist
    const countAll = document.getElementById('count-all');
    const countObra = document.getElementById('count-obra');
    const countCertificacion = document.getElementById('count-certificacion');
    const countPiscinas = document.getElementById('count-piscinas');
    const countMuestras = document.getElementById('count-muestras');
    const countRenders = document.getElementById('count-renders');

    if (countAll) countAll.textContent = GALLERY_ITEMS.length;
    if (countObra) countObra.textContent = GALLERY_ITEMS.filter(i => i.category === 'obra').length;
    if (countCertificacion) countCertificacion.textContent = GALLERY_ITEMS.filter(i => i.category === 'certificacion').length;
    if (countPiscinas) countPiscinas.textContent = GALLERY_ITEMS.filter(i => i.category === 'piscinas').length;
    if (countMuestras) countMuestras.textContent = GALLERY_ITEMS.filter(i => i.category === 'muestras').length;
    if (countRenders) countRenders.textContent = GALLERY_ITEMS.filter(i => i.category === 'renders').length;
}

function filterGallery(filter) {
    const buttons = document.querySelectorAll('.gal-filter-btn');
    buttons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderGallery(filter);
}

function openLightbox(imgSrc, title = 'Obra Real ImpoAcuatiq', desc = 'Revestimiento continuo de cuarzo instalado por aplicadores profesionales.', tag = 'Obra Real', tagBg = '#0284C7') {
    const modal = document.getElementById('lightbox-modal');
    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const descEl = document.getElementById('lightbox-desc');
    const tagEl = document.getElementById('lightbox-tag');
    const waBtn = document.getElementById('lightbox-wa-btn');

    if (!modal) return;

    if (imgEl) {
        imgEl.src = imgSrc;
        imgEl.alt = title;
    }
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (tagEl) {
        tagEl.textContent = tag;
        tagEl.style.background = tagBg || '#0284C7';
    }
    if (waBtn) {
        waBtn.href = `https://wa.me/5493416825470?text=Hola%20ImpoAcuatiq,%20quisiera%20consultar%20por%20esta%20terminaci%C3%B3n:%20${encodeURIComponent(title)}`;
    }

    document.body.style.overflow = 'hidden';
    modal.classList.add('active', 'open');
    modal.style.display = 'flex';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
        modal.classList.remove('active', 'open');
        modal.style.display = 'none';
        const imgEl = document.getElementById('lightbox-img');
        if (imgEl) imgEl.src = '';
    }
    checkModalsClosed();
}

function openVideoModal(videoUrl, title = 'Video Demostrativo 3D', desc = 'Presentación técnica supervisada por ImpoAcuatiq.', tag = 'Demostración 3D', tagBg = '#0284C7') {
    const modal = document.getElementById('video-modal');
    const videoEl = document.getElementById('video-player-el');
    const titleEl = document.getElementById('video-modal-title');
    const descEl = document.getElementById('video-modal-desc');
    const tagEl = document.getElementById('video-modal-tag');
    const waBtn = document.getElementById('video-modal-wa-btn');

    if (!modal) return;

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (tagEl) {
        tagEl.textContent = tag;
        tagEl.style.background = tagBg || '#0284C7';
    }
    if (waBtn) {
        waBtn.href = `https://wa.me/5493416825470?text=Hola%20ImpoAcuatiq,%20quisiera%20consultar%20por%20este%20producto:%20${encodeURIComponent(title)}`;
    }

    if (videoEl) {
        videoEl.src = videoUrl;
        videoEl.play().catch(() => {});
    }

    document.body.style.overflow = 'hidden';
    modal.classList.add('active', 'open');
    modal.style.display = 'flex';
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
        modal.classList.remove('active', 'open');
        modal.style.display = 'none';
        const videoEl = document.getElementById('video-player-el');
        if (videoEl) {
            videoEl.pause();
            videoEl.removeAttribute('src');
            videoEl.load();
        }
    }
    checkModalsClosed();
}

function checkModalsClosed() {
    const openModals = document.querySelectorAll('.modal-backdrop.active, .modal-backdrop.open');
    if (openModals.length === 0) {
        document.body.style.overflow = '';
    }
}

function handleBackdropClick(event, modalId) {
    if (event.target && event.target.id === modalId) {
        if (modalId === 'lightbox-modal') closeLightbox();
        else if (modalId === 'video-modal') closeVideoModal();
        else if (modalId === 'product-modal') closeProductModal();
    }
}

function openHeroLightbox() {
    const heroImg = document.getElementById('hero-main-img');
    const badgeText = document.getElementById('hero-badge-text');
    const src = heroImg ? heroImg.src : 'assets/img/hero_real_tahoe.jpg';
    const title = badgeText ? badgeText.textContent : 'Obra Real: Súper Brite® Tahoe Blue';
    openLightbox(src, title, 'Piscina real revestida con cuarzo continuo Súper Brite®. Acabado continuo de alta gama sin repintar.', 'Obra Real Piscinas', '#0284C7');
}

// ESC Key closes any open modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeVideoModal();
        closeProductModal();
    }
});

function initGalleryHandlers() {
    renderGallery('all');
}

const HERO_POOLS = {
    tahoe: {
        src: 'assets/img/hero_real_tahoe.jpg',
        title: 'Obra Real: Súper Brite® Tahoe Blue'
    },
    cool: {
        src: 'assets/img/hero_real_cool.jpg',
        title: 'Obra Real: Súper Brite® Cool Blue'
    },
    onyx: {
        src: 'assets/img/hero_real_onyx.jpg',
        title: 'Obra Real: Súper Brite® Onyx Blue'
    }
};

function switchHeroPool(key) {
    const data = HERO_POOLS[key];
    if (!data) return;
    const img = document.getElementById('hero-main-img');
    const badge = document.getElementById('hero-badge-text');
    if (img) {
        img.style.opacity = '0.3';
        setTimeout(() => {
            img.src = data.src;
            img.style.opacity = '1';
        }, 160);
    }
    if (badge) badge.textContent = data.title;
    
    document.querySelectorAll('.hero-switch-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(key));
    });
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.filterGallery = filterGallery;
window.renderGallery = renderGallery;
window.switchHeroPool = switchHeroPool;


// ==========================================================================
// 8. OTRAS FUNCIONALIDADES DE INTERACCIÓN (Filtro de Catálogo, Formulario, Nav)
// ==========================================================================
function filterCategory(category, btnElement) {
    const products = document.querySelectorAll('.product-card-horizontal');
    const filterBtns = document.querySelectorAll('.filter-pill');

    // Actualizar clase active en los botones de filtro
    if (filterBtns.length > 0 && btnElement) {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }

    products.forEach(card => {
        const cardCat = card.dataset.cat;
        if (category === 'todos' || cardCat === category) {
            card.style.display = 'grid';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
        }
    });
}

function initCatalogFilter() {
    const filterBtns = document.querySelectorAll('.pill-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px 50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('revealed'));
    }
}

function initNavbarScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }, { passive: true });
}

function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navMenu.classList.toggle('open');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        // Mobile dropdown click toggle for "Productos"
        const dropdownItem = navMenu.querySelector('.nav-item-dropdown');
        if (dropdownItem) {
            dropdownItem.addEventListener('click', (e) => {
                if (window.innerWidth <= 900) {
                    dropdownItem.classList.toggle('active');
                }
            });
        }

        // Close menu when clicking outside or on a navigation link
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                navMenu.classList.remove('open');
                const icon = toggleBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });

        navMenu.querySelectorAll('a:not(.nav-item-dropdown > a)').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = toggleBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }
}

function submitContactForm() {
    const nombre = document.getElementById('c-nombre')?.value || "";
    const telefono = document.getElementById('c-telefono')?.value || "";
    const tipo = document.getElementById('c-tipo')?.value || "Cliente Particular";
    const mensaje = document.getElementById('c-mensaje')?.value || "";

    const textWhatsApp = 
`📩 *NUEVA CONSULTA DESDE LA WEB IMPOACUATIQ*

👤 *Nombre / Empresa:* ${nombre}
📞 *Teléfono:* ${telefono}
🏢 *Tipo de Cliente:* ${tipo}
📝 *Consulta / Proyecto:*
"${mensaje}"`;

    const url = `https://wa.me/5493416825470?text=${encodeURIComponent(textWhatsApp)}`;
    
    alert(`¡Gracias ${nombre}! Tu consulta ha sido enviada. Te derivaremos a WhatsApp con el canal de atención oficial de ImpoAcuatiq.`);
    window.open(url, '_blank');

    const form = document.getElementById('contact-form');
    if (form) form.reset();
}

// ==========================================================================
// ==========================================================================
// 12. MOTOR DE BURBUJAS ACUÁTICAS CRISTALINAS (CANVAS 60FPS)
// Efecto sutil de efervescencia y movimiento de agua cristalina
// ==========================================================================
function initHeroBubbles() {
    const canvas = document.getElementById('hero-bubbles-canvas');
    const heroSection = document.getElementById('inicio');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    let mouse = { x: -1000, y: -1000, radius: 120, vx: 0, vy: 0 };
    let prevMouse = { x: -1000, y: -1000 };

    function resize() {
        const rect = heroSection.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    class CrystalBubble {
        constructor(isInitial = false) {
            this.reset(isInitial);
        }

        reset(isInitial = false) {
            const rand = Math.random();
            if (rand < 0.45) {
                // Micro sparkling bubble (3 - 6px)
                this.tier = 'micro';
                this.baseRadius = Math.random() * 3 + 3;
                this.speedY = Math.random() * 0.85 + 0.45;
                this.opacity = Math.random() * 0.25 + 0.5;
            } else if (rand < 0.82) {
                // Medium 3D crystal bubble (7 - 14px)
                this.tier = 'medium';
                this.baseRadius = Math.random() * 7 + 7;
                this.speedY = Math.random() * 0.65 + 0.35;
                this.opacity = Math.random() * 0.2 + 0.6;
            } else {
                // Hero Large Glass Bubble (16 - 26px)
                this.tier = 'large';
                this.baseRadius = Math.random() * 10 + 16;
                this.speedY = Math.random() * 0.5 + 0.25;
                this.opacity = Math.random() * 0.2 + 0.65;
            }

            this.x = Math.random() * (width || 800);
            this.y = isInitial 
                ? Math.random() * (height || 600) 
                : (height || 600) + this.baseRadius + Math.random() * 50;

            this.oscSpeed = Math.random() * 0.025 + 0.012;
            this.oscAmp = Math.random() * 1.5 + 0.6;
            this.angle = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.03 + 0.015;
            this.wobbleAngle = Math.random() * Math.PI * 2;
            this.vx = 0;
            this.vy = 0;
        }

        update() {
            this.y -= (this.speedY + this.vy);
            this.angle += this.oscSpeed;
            this.wobbleAngle += this.wobbleSpeed;
            this.x += Math.sin(this.angle) * this.oscAmp + this.vx;

            this.vx *= 0.95;
            this.vy *= 0.95;

            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius && dist > 0) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.vx += (dx / dist) * force * 2.2;
                this.vy += (dy / dist) * force * 1.5;
            }

            if (this.y < -this.baseRadius * 2.5) {
                this.reset(false);
            }
        }

        draw() {
            const rx = this.baseRadius * (1 + Math.sin(this.wobbleAngle) * 0.05);
            const ry = this.baseRadius * (1 - Math.sin(this.wobbleAngle) * 0.05);

            ctx.save();
            ctx.translate(this.x, this.y);

            if (this.tier === 'micro') {
                // Sparkling micro-bubble
                ctx.beginPath();
                ctx.arc(0, 0, rx, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity * 0.6})`;
                ctx.fill();
                ctx.strokeStyle = `rgba(2, 132, 199, ${this.opacity * 0.8})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Center highlight
                ctx.beginPath();
                ctx.arc(-rx * 0.3, -ry * 0.3, rx * 0.35, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.9})`;
                ctx.fill();
            } else {
                // 3D Glassy Bubble (Medium & Large)
                // 1. Soft depth shadow / outer refraction halo
                ctx.beginPath();
                ctx.ellipse(0, 0, rx + 1, ry + 1, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(2, 132, 199, ${this.opacity * 0.35})`;
                ctx.lineWidth = this.tier === 'large' ? 2 : 1.2;
                ctx.stroke();

                // 2. Translucent aquatic gradient body
                ctx.beginPath();
                ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);

                const grad = ctx.createRadialGradient(
                    -rx * 0.35, -ry * 0.35, rx * 0.08,
                    0, 0, rx
                );
                grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.85})`);
                grad.addColorStop(0.3, `rgba(186, 230, 253, ${this.opacity * 0.45})`);
                grad.addColorStop(0.75, `rgba(56, 189, 248, ${this.opacity * 0.25})`);
                grad.addColorStop(1, `rgba(2, 132, 199, ${this.opacity * 0.65})`);

                ctx.fillStyle = grad;
                ctx.fill();

                // 3. Crisp Glassy Rim
                ctx.strokeStyle = `rgba(2, 132, 199, ${this.opacity * 0.75})`;
                ctx.lineWidth = this.tier === 'large' ? 1.4 : 1.0;
                ctx.stroke();

                // 4. Primary Specular Glare (Top Left)
                ctx.beginPath();
                ctx.ellipse(-rx * 0.38, -ry * 0.38, rx * 0.32, ry * 0.18, -Math.PI / 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.95})`;
                ctx.fill();

                // 5. Secondary Glare point
                ctx.beginPath();
                ctx.arc(-rx * 0.15, -ry * 0.52, rx * 0.14, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.85})`;
                ctx.fill();

                // 6. Bottom Internal Light Reflection
                ctx.beginPath();
                ctx.ellipse(rx * 0.32, ry * 0.35, rx * 0.28, ry * 0.14, -Math.PI / 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(125, 211, 252, ${this.opacity * 0.6})`;
                ctx.fill();
            }

            ctx.restore();
        }
    }

    resize();
    const count = Math.min(60, Math.max(30, Math.floor(width / 22)));
    const bubbles = Array.from({ length: count }, () => new CrystalBubble(true));

    function animate() {
        if (!isVisible) return;
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < bubbles.length; i++) {
            bubbles[i].update();
            bubbles[i].draw();
        }

        animationId = requestAnimationFrame(animate);
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    cancelAnimationFrame(animationId);
                    animationId = requestAnimationFrame(animate);
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.05 });
        observer.observe(heroSection);
    } else {
        animate();
    }

    window.addEventListener('resize', () => {
        resize();
    }, { passive: true });

    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const curX = e.clientX - rect.left;
        const curY = e.clientY - rect.top;
        if (prevMouse.x !== -1000) {
            mouse.vx = curX - prevMouse.x;
            mouse.vy = curY - prevMouse.y;
        }
        prevMouse.x = curX;
        prevMouse.y = curY;
        mouse.x = curX;
        mouse.y = curY;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
        prevMouse.x = -1000;
        prevMouse.y = -1000;
    }, { passive: true });
}

// ==========================================================================
// 13. COMPARADOR INTERACTIVO ANTES VS DESPUÉS (REMODELACIÓN SLIDER)
// ==========================================================================
function initBeforeAfterSlider() {
    const slider = document.getElementById('ba-slider');
    const beforeWrapper = document.getElementById('ba-before-wrapper');
    const beforeImg = document.getElementById('ba-img-before');
    const divider = document.getElementById('ba-divider');
    if (!slider || !beforeWrapper || !beforeImg || !divider) return;

    let isDragging = false;

    function updateSliderWidth() {
        const rect = slider.getBoundingClientRect();
        beforeImg.style.width = rect.width + 'px';
    }

    function setPosition(percent) {
        const clamped = Math.max(0, Math.min(100, percent));
        beforeWrapper.style.width = clamped + '%';
        divider.style.left = clamped + '%';
    }

    function handleMove(clientX) {
        const rect = slider.getBoundingClientRect();
        const offsetX = clientX - rect.left;
        const percent = (offsetX / rect.width) * 100;
        setPosition(percent);
    }

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleMove(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.touches && e.touches[0]) {
            handleMove(e.touches[0].clientX);
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.touches && e.touches[0]) {
            handleMove(e.touches[0].clientX);
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('resize', updateSliderWidth, { passive: true });
    updateSliderWidth();
    setPosition(50);
}

function switchCertPhoto(imgSrc, btn) {
    const mainImg = document.getElementById('cert-main-img');
    if (mainImg) {
        mainImg.style.opacity = '0.4';
        setTimeout(() => {
            mainImg.src = imgSrc;
            mainImg.style.opacity = '1';
        }, 150);
    }
    const btns = document.querySelectorAll('.cert-thumb-btn');
    btns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
}

window.switchCertPhoto = switchCertPhoto;
window.filterCategory = filterCategory;
window.submitContactForm = submitContactForm;
window.initHeroBubbles = initHeroBubbles;
window.initBeforeAfterSlider = initBeforeAfterSlider;
