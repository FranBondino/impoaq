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
        subName: 'Quartz Finish',
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
    }
};


// ==========================================================================
// 2. INICIALIZACIÓN GLOBAL CUANDO EL DOM ESTÁ LISTO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
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

window.sendCalcToWhatsApp = sendCalcToWhatsApp;


// ==========================================================================
// 6. MODAL INTERACTIVO DE FICHAS TÉCNICAS (DOCUMENTO TÉCNICO OFICIAL)
// ==========================================================================
const PRODUCT_PACKAGING_IMAGES = {
    sb: 'assets/img/sb-bag.jpg',
    sk: 'assets/img/sk-primer.jpeg',
    sf: 'assets/img/sf-bag.jpg',
    sd: 'assets/img/sd-bucket.png',
    ss: 'assets/img/ss-bucket.png'
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
            <img src="assets/img/logo-horizontal.jpg" alt="ImpoAcuatiq Logo" class="modal-doc-logo">
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

    modal.classList.add('active', 'open');
    modal.style.display = 'flex';
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) {
        modal.classList.remove('active', 'open');
        modal.style.display = 'none';
    }
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
// 7. GALERÍA DE OBRAS REALES Y REPRODUCTOR MULTIMEDIA 3D
// ==========================================================================
const GALLERY_ITEMS = [
    // --- 14 VIDEOS 3D MP4 ---
    {
        type: 'video',
        id: 'v_sb_bag',
        title: 'Súper Brite® Quartz Finish (3D)',
        category: 'videos',
        tag: 'Súper Brite®',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Presentación 3D oficial del revestimiento de cuarzo refinado para piscinas (22.7 kg).',
        thumb: 'assets/gallery/thumbs/v_sb_bag.jpg',
        video: 'assets/gallery/videos/v_sb_bag.mp4'
    },
    {
        type: 'video',
        id: 'v_sk_bag',
        title: 'Súper Kote® Puente de Adherencia (3D)',
        category: 'videos',
        tag: 'Súper Kote®',
        tagBg: '#16A34A',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Presentación 3D del promotor de anclaje químico estructural bicomponente.',
        thumb: 'assets/gallery/thumbs/v_sk_bag.jpg',
        video: 'assets/gallery/videos/v_sk_bag.mp4'
    },
    {
        type: 'video',
        id: 'v_sf_bag',
        title: 'Súper Fullget® Bordes & Terrazas (3D)',
        category: 'videos',
        tag: 'Súper Fullget®',
        tagBg: '#D97706',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Presentación 3D del revestimiento de grano fino atérmico para soláriums.',
        thumb: 'assets/gallery/thumbs/v_sf_bag.jpg',
        video: 'assets/gallery/videos/v_sf_bag.mp4'
    },
    {
        type: 'video',
        id: 'v_sd_bag',
        title: 'Spray Deck Resina Texturada (3D)',
        category: 'videos',
        tag: 'Spray Deck',
        tagBg: '#CA8A04',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Presentación 3D del sistema de resina proyectada para pisos y soláriums.',
        thumb: 'assets/gallery/thumbs/v_sd_bag.jpg',
        video: 'assets/gallery/videos/v_sd_bag.mp4'
    },
    {
        type: 'video',
        id: 'v_ss_bag',
        title: 'Súper Seal® Microcemento Continuo (3D)',
        category: 'videos',
        tag: 'Súper Seal®',
        tagBg: '#EA580C',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Presentación 3D del microcemento impermeabilizante continuo.',
        thumb: 'assets/gallery/thumbs/v_ss_bag.jpg',
        video: 'assets/gallery/videos/v_ss_bag.mp4'
    },
    {
        type: 'video',
        id: 'v_lineup',
        title: 'Línea Oficial 5 Productos Ingeprex (3D)',
        category: 'videos',
        tag: 'Gama Oficial',
        tagBg: '#0F172A',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Render completo con la línea de envases oficiales para piscinas y soláriums.',
        thumb: 'assets/gallery/thumbs/v_lineup.jpg',
        video: 'assets/gallery/videos/v_lineup.mp4'
    },
    {
        type: 'video',
        id: 'v_latex',
        title: 'Súper Látex Aditivo Líquido (3D)',
        category: 'videos',
        tag: 'Aditivos',
        tagBg: '#4F46E5',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Presentación del promotor líquido de adherencia y elasticidad para morteros.',
        thumb: 'assets/gallery/thumbs/v_latex.jpg',
        video: 'assets/gallery/videos/v_latex.mp4'
    },
    {
        type: 'video',
        id: 'v_resingranite',
        title: 'Super Resin Granite Aislante UV (3D)',
        category: 'videos',
        tag: 'Resinas',
        tagBg: '#DC2626',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Resina elástica resistente a la intemperie, rayos solares y agentes químicos.',
        thumb: 'assets/gallery/thumbs/v_resingranite.jpg',
        video: 'assets/gallery/videos/v_resingranite.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_blue',
        title: 'Muestrario 3D: Tahoe Blue',
        category: 'videos',
        tag: 'Carta Cuarzo',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Render 3D de probeta con cuarzo azul turquesa reflectivo.',
        thumb: 'assets/gallery/thumbs/v_swatch_blue.jpg',
        video: 'assets/gallery/videos/v_swatch_blue.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_black',
        title: 'Muestrario 3D: Onyx Black',
        category: 'videos',
        tag: 'Carta Cuarzo',
        tagBg: '#1E293B',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Render 3D con reflejo de cuarzo negro profundo para efecto espejo.',
        thumb: 'assets/gallery/thumbs/v_swatch_black.jpg',
        video: 'assets/gallery/videos/v_swatch_black.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_sand',
        title: 'Muestrario 3D: Arena Dorada',
        category: 'videos',
        tag: 'Carta Cuarzo',
        tagBg: '#D97706',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Render 3D de probeta con textura real de cuarzo tono arena caribeño.',
        thumb: 'assets/gallery/thumbs/v_swatch_sand.jpg',
        video: 'assets/gallery/videos/v_swatch_sand.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_grey',
        title: 'Muestrario 3D: Gris Nórdico',
        category: 'videos',
        tag: 'Carta Cuarzo',
        tagBg: '#64748B',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Render 3D de probeta de cuarzo gris arquitectónico contemporáneo.',
        thumb: 'assets/gallery/thumbs/v_swatch_grey.jpg',
        video: 'assets/gallery/videos/v_swatch_grey.mp4'
    },
    {
        type: 'video',
        id: 'v_swatch_white',
        title: 'Muestrario 3D: White Quartz',
        category: 'videos',
        tag: 'Carta Cuarzo',
        tagBg: '#0EA5E9',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Render 3D de cristales de cuarzo blanco reflectivo con destellos celestes.',
        thumb: 'assets/gallery/thumbs/v_swatch_white.jpg',
        video: 'assets/gallery/videos/v_swatch_white.mp4'
    },
    {
        type: 'video',
        id: 'v_buckets_duo',
        title: 'Baldes de Resina & Látex Ingeprex (3D)',
        category: 'videos',
        tag: 'Insumos',
        tagBg: '#334155',
        badge: '<i class="fa-solid fa-play"></i> 3D HD',
        desc: 'Render 3D en alta resolución de envases complementarios de obra.',
        thumb: 'assets/gallery/thumbs/v_buckets_duo.jpg',
        video: 'assets/gallery/videos/v_buckets_duo.mp4'
    },

    // --- FOTOS REALES DE PISCINAS ---
    {
        type: 'photo',
        id: 'p_tahoe_blue',
        title: 'Piscina Súper Brite® — Tono Tahoe Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-camera"></i> FOTO REAL',
        desc: 'Piscina residencial con escalones sumergidos y agua turquesa brillante bajo sol directo.',
        thumb: 'assets/gallery/photos/p_tahoe_blue.jpg',
        src: 'assets/gallery/photos/p_tahoe_blue.jpg'
    },
    {
        type: 'photo',
        id: 'p_onyx_blue',
        title: 'Piscina Súper Brite® — Tono Onyx Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#1E293B',
        badge: '<i class="fa-solid fa-camera"></i> FOTO REAL',
        desc: 'Efecto espejo profundo de agua azul noche con iluminación subacuática.',
        thumb: 'assets/gallery/photos/p_onyx_blue.jpg',
        src: 'assets/gallery/photos/p_onyx_blue.jpg'
    },
    {
        type: 'photo',
        id: 'p_cool_blue',
        title: 'Piscina Súper Brite® — Tono Cool Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-camera"></i> FOTO REAL',
        desc: 'Piscina angular con solárium atérmico, cascada de piedra natural y luces nocturnas.',
        thumb: 'assets/gallery/photos/p_cool_blue.jpg',
        src: 'assets/gallery/photos/p_cool_blue.jpg'
    },
    {
        type: 'photo',
        id: 'p_marlyn_blue',
        title: 'Detalle de Escalones — Marlyn Blue',
        category: 'piscinas',
        tag: 'Súper Brite®',
        tagBg: '#0EA5E9',
        badge: '<i class="fa-solid fa-camera"></i> FOTO REAL',
        desc: 'Acabado suave y antideslizante con guardas vítreas en escaleras de acceso.',
        thumb: 'assets/gallery/photos/p_marlyn_blue.jpg',
        src: 'assets/gallery/photos/p_marlyn_blue.jpg'
    },

    // --- MUESTRARIOS REALES DE CUARZO ---
    {
        type: 'photo',
        id: 'p_cuarzo_tahoe_swatch',
        title: 'Cristales de Cuarzo: Tahoe Blue',
        category: 'muestras',
        tag: 'Cuarzo Real',
        tagBg: '#0284C7',
        badge: '<i class="fa-solid fa-gem"></i> MUESTRARIO',
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
        badge: '<i class="fa-solid fa-gem"></i> MUESTRARIO',
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
        badge: '<i class="fa-solid fa-gem"></i> MUESTRARIO',
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
        badge: '<i class="fa-solid fa-gem"></i> MUESTRARIO',
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
        badge: '<i class="fa-solid fa-gem"></i> MUESTRARIO',
        desc: 'Granos de cuarzo negro volcánico para generar efecto de reflejo espejo natural.',
        thumb: 'assets/gallery/photos/p_cuarzo_black_swatch.jpg',
        src: 'assets/gallery/photos/p_cuarzo_black_swatch.jpg'
    },

    // --- BORDES Y SOLÁRIUM ---
    {
        type: 'photo',
        id: 'p_solarium_fullget',
        title: 'Bordes & Solárium Atérmico — Súper Fullget®',
        category: 'bordes',
        tag: 'Súper Fullget®',
        tagBg: '#D97706',
        badge: '<i class="fa-solid fa-sun"></i> FOTO REAL',
        desc: 'Textura de piedra natural calibrada atérmica que no absorbe temperatura solar.',
        thumb: 'assets/gallery/photos/p_solarium_fullget.jpg',
        src: 'assets/gallery/photos/p_solarium_fullget.jpg'
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

    const filtered = (filter === 'all')
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(item => item.category === filter);

    container.innerHTML = filtered.map((item, index) => {
        const isVideo = item.type === 'video';
        const clickAction = isVideo
            ? `openVideoModal('${item.video}', '${escapeHtml(item.title)}', '${escapeHtml(item.desc)}', '${item.tag}')`
            : `openLightbox('${item.src}', '${escapeHtml(item.title)}')`;

        return `
            <div class="gal-card" onclick="${clickAction}">
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
    const countVideos = document.getElementById('count-videos');
    const countPiscinas = document.getElementById('count-piscinas');
    const countMuestras = document.getElementById('count-muestras');
    const countBordes = document.getElementById('count-bordes');

    if (countAll) countAll.textContent = GALLERY_ITEMS.length;
    if (countVideos) countVideos.textContent = GALLERY_ITEMS.filter(i => i.category === 'videos').length;
    if (countPiscinas) countPiscinas.textContent = GALLERY_ITEMS.filter(i => i.category === 'piscinas').length;
    if (countMuestras) countMuestras.textContent = GALLERY_ITEMS.filter(i => i.category === 'muestras').length;
    if (countBordes) countBordes.textContent = GALLERY_ITEMS.filter(i => i.category === 'bordes').length;
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

function openLightbox(imgSrc, caption = "Obra Real Ejecutada con ImpoAcuatiq") {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');

    if (!lightboxModal) return;

    if (lightboxImg) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = caption;
    }

    lightboxModal.classList.add('active', 'open');
    lightboxModal.style.display = 'flex';
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightbox-modal');
    if (lightboxModal) {
        lightboxModal.classList.remove('active', 'open');
        lightboxModal.style.display = 'none';
    }
}

function openVideoModal(videoUrl, videoTitle = 'Video Demostrativo 3D Oficial', videoDesc = 'Presentación técnica supervisada por ImpoAcuatiq.', tag = 'Gama Oficial') {
    let videoModal = document.getElementById('video-modal');

    if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.id = 'video-modal';
        videoModal.className = 'modal-backdrop';
        document.body.appendChild(videoModal);
    }

    videoModal.innerHTML = `
        <div class="video-modal-card">
            <button class="modal-close" onclick="closeVideoModal()">&times;</button>
            <div class="video-meta-info" style="margin-bottom: 14px;">
                <span class="gal-tag" style="background: #0284C7; margin-bottom: 6px;">${tag}</span>
                <h3 style="color: #FFFFFF; font-size: 18px; margin: 4px 0;">
                    <i class="fa-solid fa-circle-play text-cyan"></i> ${videoTitle}
                </h3>
            </div>
            <div class="video-player-box">
                <video controls autoplay loop playsinline>
                    <source src="${videoUrl}" type="video/mp4">
                    Tu navegador no soporta reproducción de video HTML5.
                </video>
            </div>
            <div class="video-meta-bar">
                <p style="font-size: 13px; color: #94A3B8; max-width: 520px; line-height: 1.4;">${videoDesc}</p>
                <a href="https://wa.me/5493416825470?text=Hola%20ImpoAcuatiq,%20quisiera%20consultar%20por%20el%20producto:%20${encodeURIComponent(videoTitle)}" target="_blank" class="btn btn-whatsapp btn-sm">
                    <i class="fa-brands fa-whatsapp"></i> Consultar por este insumo
                </a>
            </div>
        </div>
    `;

    videoModal.classList.add('active', 'open');
    videoModal.style.display = 'flex';
}

function closeVideoModal() {
    const videoModal = document.getElementById('video-modal');
    if (videoModal) {
        // Stop video playback
        const vid = videoModal.querySelector('video');
        if (vid) vid.pause();
        videoModal.classList.remove('active', 'open');
        videoModal.style.display = 'none';
        videoModal.innerHTML = '';
    }
}

function initGalleryHandlers() {
    renderGallery('all');
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;
window.filterGallery = filterGallery;
window.renderGallery = renderGallery;


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
            threshold: 0.08,
            rootMargin: '0px 0px -20px 0px'
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

window.filterCategory = filterCategory;
window.submitContactForm = submitContactForm;
