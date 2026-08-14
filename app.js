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
    const resBolsasEl = document.getElementById('res-bolsas');
    const resKoteEl = document.getElementById('res-kote');

    if (resM2El) resM2El.textContent = `${totalM2.toFixed(1)} m²`;

    if (prodSelect === 'sb') {
        if (resBolsasEl) resBolsasEl.innerHTML = `<strong>${bolsasSB} Bolsas</strong> <small>(22.7 kg)</small>`;
        if (resKoteEl) resKoteEl.innerHTML = `<strong>${unidadesSK} Unidades</strong> <small>(Súper Kote®)</small>`;
    } else if (prodSelect === 'sk') {
        if (resBolsasEl) resBolsasEl.innerHTML = `<strong>${unidadesSK} Kits</strong> <small>(Súper Kote® Bicomponente)</small>`;
        if (resKoteEl) resKoteEl.innerHTML = `<strong>100% Adherencia</strong> <small>(Sin picar pared)</small>`;
    } else if (prodSelect === 'sf') {
        if (resBolsasEl) resBolsasEl.innerHTML = `<strong>${bolsasSF} Bolsas</strong> <small>(Súper Fullget® 25kg)</small>`;
        if (resKoteEl) resKoteEl.innerHTML = `<strong>${unidadesSK} Unidades</strong> <small>(Puente Adherencia)</small>`;
    } else if (prodSelect === 'sd') {
        if (resBolsasEl) resBolsasEl.innerHTML = `<strong>${kitsSD} Kits</strong> <small>(Spray Deck Resina)</small>`;
        if (resKoteEl) resKoteEl.innerHTML = `<strong>${Math.ceil(totalM2 / 12)} Lts</strong> <small>(Sellador Acrílico)</small>`;
    } else if (prodSelect === 'ss') {
        if (resBolsasEl) resBolsasEl.innerHTML = `<strong>${kitsSS} Kits</strong> <small>(Súper Seal® Microcemento)</small>`;
        if (resKoteEl) resKoteEl.innerHTML = `<strong>${unidadesSK} Lts</strong> <small>(Sellador Poliuretánico)</small>`;
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
// 5. GENERADOR DE MENSAJES PRE-CARGADOS A WHATSAPP (Lorna Pizarro Vera)
// ==========================================================================
function sendCalcToWhatsApp() {
    const calcData = calculateMaterials();
    const phone = "5493416825470"; // Teléfono oficial de Lorna Pizarro Vera (Argentina)
    
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
        desgloseMateriales = `• Bolsas Súper Brite® (22.7 kg): *${calcData.bolsasSB} Bolsas*\n• Puente de Unión Súper Kote®: *${calcData.unidadesSK} Unidades*`;
    } else if (calcData.prodSelect === 'sk') {
        desgloseMateriales = `• Súper Kote® Bicomponente: *${calcData.unidadesSK} Kits completas*`;
    } else if (calcData.prodSelect === 'sf') {
        desgloseMateriales = `• Bolsas Súper Fullget® (25 kg): *${calcData.bolsasSF} Bolsas*\n• Imprimación Previa: *${calcData.unidadesSK} Unidades*`;
    } else if (calcData.prodSelect === 'sd') {
        desgloseMateriales = `• Kits Spray Deck Resina: *${calcData.kitsSD} Kits*\n• Sellador de Acabado: *${Math.ceil(calcData.totalM2 / 12)} Lts*`;
    } else if (calcData.prodSelect === 'ss') {
        desgloseMateriales = `• Kits Súper Seal® Microcemento: *${calcData.kitsSS} Kits*\n• Sellador Poliuretánico: *${calcData.unidadesSK} Lts*`;
    }

    const message = 
`🌊 *COTIZACIÓN DE MATERIALES - IMPOACUATIQ* 🌊
*Atención Comercial:* Lorna Pizarro Vera (+54 9 341-6825470)

📋 *DESGLOSE DEL PROYECTO:*
• *Tipo de Obra:* ${modoTexto}
• *Dimensiones:* ${medidasTexto}
• *Superficie Total:* ${calcData.totalM2} m²
• *Producto Cotizado:* ${productObj.name} (${productObj.subName})

📦 *CÓMPUTO ESTIMADO DE INSUMOS:*
${desgloseMateriales}
• *Rendimiento Estándar:* ${productObj.specs.rendimiento}

Hola Lorna, me gustaría verificar disponibilidad de stock en depósito, confirmar la cotización formal y consultar opciones de envío a mi localidad. Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

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
            <a href="https://wa.me/5493416825470?text=Hola%20Lorna,%20quisiera%20recibir%20la%20Ficha%20T%C3%A9cnica%20en%20PDF%20de%20${encodeURIComponent(product.name)}." target="_blank" class="btn-doc-wa">
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
                <p>ImpoAcuatiq | Representante Comercial Técnico: Lorna Pizarro Vera | Tel: +54 9 341-6825470</p>
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
// 7. REPRODUCTOR Y VISOR MODAL DE LA GALERÍA DE OBRAS REALES
// ==========================================================================
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

function openVideoModal(videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4', videoTitle = 'Demostración de Mezcla y Llaneado Súper Brite®') {
    let videoModal = document.getElementById('video-modal');

    if (!videoModal) {
        videoModal = document.createElement('div');
        videoModal.id = 'video-modal';
        videoModal.className = 'modal-backdrop';
        document.body.appendChild(videoModal);
    }

    videoModal.innerHTML = `
        <div class="modal-card video-modal-card" style="max-width: 800px; padding: 24px;">
            <button class="modal-close" onclick="closeVideoModal()">&times;</button>
            <h3 style="margin-bottom: 16px; color: var(--text-main); font-family: var(--font-heading); display: flex; align-items: center; gap: 10px;">
                <i class="fa-solid fa-circle-play text-cyan"></i> ${videoTitle}
            </h3>
            <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; background: #000;">
                <video controls autoplay style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover;">
                    <source src="${videoUrl}" type="video/mp4">
                    Tu navegador no soporta el reproductor de video HTML5.
                </video>
            </div>
            <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <p style="font-size: 13px; color: var(--text-muted);">🎥 Obra real supervisada por el departamento técnico de ImpoAcuatiq.</p>
                <a href="https://wa.me/5493416825470?text=Hola%20Lorna,%20quisiera%20solicitar%20el%20video%20demostrativo%20completo%20de%20aplicaci%C3%B3n." target="_blank" class="btn btn-whatsapp btn-sm">
                    <i class="fa-brands fa-whatsapp"></i> Solicitar más videos a Lorna
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
        videoModal.classList.remove('active', 'open');
        videoModal.style.display = 'none';
        videoModal.innerHTML = '';
    }
}

function initGalleryHandlers() {
    // Vincular clic en la tarjeta de video demostrativo si existe
    const videoCard = document.querySelector('.video-showcase');
    if (videoCard) {
        videoCard.style.cursor = 'pointer';
        videoCard.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                openVideoModal('https://www.w3schools.com/html/mov_bbb.mp4', 'Demostración Técnica: Aplicación de Súper Brite® y Spray Deck');
            }
        });
    }
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.openVideoModal = openVideoModal;
window.closeVideoModal = closeVideoModal;


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

function initNavbarScroll() {
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
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
*Representante:* Lorna Pizarro Vera

👤 *Nombre / Empresa:* ${nombre}
📞 *Teléfono:* ${telefono}
🏢 *Tipo de Cliente:* ${tipo}
📝 *Consulta / Proyecto:*
"${mensaje}"`;

    const url = `https://wa.me/5493416825470?text=${encodeURIComponent(textWhatsApp)}`;
    
    alert(`¡Gracias ${nombre}! Tu consulta ha sido enviada. Te derivaremos a WhatsApp con Lorna Pizarro Vera para atención personalizada.`);
    window.open(url, '_blank');

    const form = document.getElementById('contact-form');
    if (form) form.reset();
}

window.filterCategory = filterCategory;
window.submitContactForm = submitContactForm;
