document.addEventListener('DOMContentLoaded', () => {
    // --- Products Catalog Data & Interactive Filter ---
    const catalogProducts = [
        {
            id: "sb-quartz",
            category: "revestimientos",
            tag: "PRODUCTO ESTRELLA ⭐",
            title: "SuperBrite® Quartz Finish",
            desc: "Revestimiento continuo de cristal de cuarzo refinado y polímeros modificadores. Textura suave, antideslizante y efecto agua transparente.",
            presentation: "Bolsa 22.7 kg (50 lbs)",
            yield: "2.5 m² por bolsa (8-10mm)",
            colors: "Blanco, Azul Caribe, Cielo, Arena, Gris",
            datasheet: "Ficha_Tecnica_SuperBrite_Quartz.pdf"
        },
        {
            id: "sb-marcite",
            category: "revestimientos",
            tag: "LÍNEA CLÁSICA",
            title: "SuperBrite® Marcite Marble",
            desc: "Mezcla tradicional de mármol blanco seleccionado y cemento blanco fortificado para acabados lisos y sobrios en piscinas.",
            presentation: "Bolsa 22.7 kg (50 lbs)",
            yield: "2.8 m² por bolsa",
            colors: "Blanco Nieve, Celeste Claro",
            datasheet: "Ficha_Tecnica_SuperBrite_Marcite.pdf"
        },
        {
            id: "sb-aquabond",
            category: "aditivos",
            tag: "ADITIVO DE ADHERENCIA",
            title: "AquaBond® Polymer Latex",
            desc: "Emulsión polimérica concentrada para incorporar a la mezcla. Aumenta drásticamente la flexibilidad y adherencia sobre el hormigón.",
            presentation: "Bidón 5 Litros / 20 Litros",
            yield: "1 a 2 Litros por bolsa de revestimiento",
            colors: "Líquido Blanco Lechoso",
            datasheet: "Ficha_Tecnica_AquaBond.pdf"
        },
        {
            id: "sb-hydroshield",
            category: "aditivos",
            tag: "IMPERMEABILIZANTE",
            title: "HydroShield® Water Sealer",
            desc: "Protector transparente monocomponente de penetración profunda. Sellado capilar de porosidad y repelencia a manchas orgánicas.",
            presentation: "Bidón 10 Litros",
            yield: "8 a 10 m² por Litro",
            colors: "Incoloro / Invisible",
            datasheet: "Ficha_Tecnica_HydroShield.pdf"
        },
        {
            id: "sb-acidwash",
            category: "mantenimiento",
            tag: "CURADO Y LAVADO",
            title: "SuperBrite® Acid Wash & Neutralizer",
            desc: "Fórmula técnica de revelado de cuarzo. Remueve la película superficial de cemento revelando los destellos del cristal sin agredir el polímero.",
            presentation: "Bidón 5 Litros",
            yield: "30 m² por unidad diluida",
            colors: "Líquido Técnico",
            datasheet: "Ficha_Tecnica_AcidWash.pdf"
        },
        {
            id: "sb-llana",
            category: "herramientas",
            tag: "EQUIPAMIENTO PROFESIONAL",
            title: "Llana Profesional Fresno Inox Pro-Float",
            desc: "Llana de acero inoxidable flexible con bordes redondeados anti-marca. Diseñada específicamente para la aplicación de cuarzo.",
            presentation: "Unidad Individual",
            yield: "Uso Intensivo en Obra",
            colors: "Acero / Mango Ergonómico",
            datasheet: "Manual_Uso_Herramientas.pdf"
        }
    ];

    const catalogGrid = document.getElementById('catalog-products-grid');
    const catTabs = document.querySelectorAll('.cat-tab');

    function renderCatalog(filterCategory = 'todos') {
        catalogGrid.innerHTML = '';
        const items = filterCategory === 'todos'
            ? catalogProducts
            : catalogProducts.filter(p => p.category === filterCategory);

        items.forEach(p => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div>
                    <span class="product-tag">${p.tag}</span>
                    <h3 class="product-title">${p.title}</h3>
                    <p class="product-desc">${p.desc}</p>
                    
                    <div class="product-specs">
                        <div class="spec-item">
                            <span class="spec-label">Presentación:</span>
                            <span class="spec-val">${p.presentation}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Rendimiento:</span>
                            <span class="spec-val">${p.yield}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Variedad / Tono:</span>
                            <span class="spec-val">${p.colors}</span>
                        </div>
                    </div>
                </div>

                <div class="product-footer">
                    <button class="btn btn-primary btn-sm btn-quote-product" data-product="${p.title}">
                        Reservar en Preventa
                    </button>
                    <button class="btn btn-glass btn-sm btn-download-spec" data-file="${p.datasheet}">
                        📄 Ficha Técnica
                    </button>
                </div>
            `;
            catalogGrid.appendChild(card);
        });

        // Bind product buttons
        document.querySelectorAll('.btn-quote-product').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const prodName = e.target.dataset.product;
                const leadMessage = document.getElementById('lead-message');
                leadMessage.value = `Consulta por reserva del producto: ${prodName}`;
                document.getElementById('preventa').scrollIntoView({ behavior: 'smooth' });
            });
        });

        document.querySelectorAll('.btn-download-spec').forEach(btn => {
            btn.addEventListener('click', (e) => {
                alert(`Simulación de Descarga: Ficha Técnica "${e.target.dataset.file}" lista para el cliente/arquitecto.`);
            });
        });
    }

    catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            catTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCatalog(tab.dataset.cat);
        });
    });

    renderCatalog();

    // --- Calculator State & Elements ---
    const tabDims = document.getElementById('tab-dims');
    const tabDirect = document.getElementById('tab-direct');
    const panelDims = document.getElementById('panel-dims');
    const panelDirect = document.getElementById('panel-direct');

    const inputLength = document.getElementById('calc-length');
    const inputWidth = document.getElementById('calc-width');
    const inputDepth = document.getElementById('calc-depth');
    const inputTotalM2 = document.getElementById('calc-total-m2');

    const resM2 = document.getElementById('res-m2');
    const resBags = document.getElementById('res-bags');
    const resColor = document.getElementById('res-color');
    const colorChips = document.querySelectorAll('.color-chip');

    let selectedColor = 'Blanco Cuarzo';

    tabDims.addEventListener('click', () => {
        tabDims.classList.add('active');
        tabDirect.classList.remove('active');
        panelDims.classList.remove('hidden');
        panelDirect.classList.add('hidden');
        calculate();
    });

    tabDirect.addEventListener('click', () => {
        tabDirect.classList.add('active');
        tabDims.classList.remove('active');
        panelDirect.classList.remove('hidden');
        panelDims.classList.add('hidden');
        calculate();
    });

    colorChips.forEach(chip => {
        chip.addEventListener('click', () => {
            colorChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedColor = chip.dataset.color;
            resColor.textContent = selectedColor;
        });
    });

    const YIELD_PER_BAG = 2.5;

    function calculate() {
        let totalM2 = 0;

        if (tabDims.classList.contains('active')) {
            const length = parseFloat(inputLength.value) || 0;
            const width = parseFloat(inputWidth.value) || 0;
            const depth = parseFloat(inputDepth.value) || 0;

            const floorArea = length * width;
            const wallArea = (2 * length * depth) + (2 * width * depth);
            
            totalM2 = Math.round((floorArea + wallArea) * 10) / 10;
        } else {
            totalM2 = parseFloat(inputTotalM2.value) || 0;
        }

        const bagsNeeded = Math.ceil(totalM2 / YIELD_PER_BAG);

        resM2.textContent = `${totalM2} m²`;
        resBags.textContent = `${bagsNeeded} Bolsas`;
    }

    [inputLength, inputWidth, inputDepth, inputTotalM2].forEach(input => {
        input.addEventListener('input', calculate);
    });

    document.getElementById('btn-quote-calc').addEventListener('click', () => {
        const leadM2Input = document.getElementById('lead-m2');
        leadM2Input.value = `${resM2.textContent} (${resBags.textContent} de SuperBrite - ${selectedColor})`;
        document.getElementById('preventa').scrollIntoView({ behavior: 'smooth' });
    });

    calculate();

    // --- Applicators Directory Data & Render ---
    const applicators = [
        {
            name: "Cuadrilla AquaNord - Arq. Rossi",
            zone: "buenos-aires",
            zoneLabel: "Nordelta / Pilar / GBA Norte",
            completedCount: "42 Obras",
            certification: "Nivel Máster 2026"
        },
        {
            name: "Piscinas del Sol SRL",
            zone: "cordoba",
            zoneLabel: "Córdoba Cap. / Villa Carlos Paz",
            completedCount: "28 Obras",
            certification: "Certificado ImpoAquatic"
        },
        {
            name: "Ingeniería Acuática Litoral",
            zone: "santa-fe",
            zoneLabel: "Rosario / Fisherton / Funes",
            completedCount: "35 Obras",
            certification: "Nivel Máster 2026"
        },
        {
            name: "Cuyo Pools - Tec. Mendoza",
            zone: "mendoza",
            zoneLabel: "Chacras de Coria / Maipú",
            completedCount: "19 Obras",
            certification: "Certificado ImpoAquatic"
        },
        {
            name: "Cuadrilla Costa & Sol",
            zone: "buenos-aires",
            zoneLabel: "Pinamar / Cariló / Mar del Plata",
            completedCount: "25 Obras",
            certification: "Certificado ImpoAquatic"
        }
    ];

    const grid = document.getElementById('applicators-grid');
    const selectZone = document.getElementById('zone-select');

    function renderApplicators(filterZone = 'todos') {
        grid.innerHTML = '';
        const filtered = filterZone === 'todos' 
            ? applicators 
            : applicators.filter(a => a.zone === filterZone);

        if (filtered.length === 0) {
            grid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color: var(--text-muted);">No se encontraron cuadrillas certificadas en esta zona aún. ImpoAquatic realiza la capacitación e inspección directa en tu obra.</p>`;
            return;
        }

        filtered.forEach(app => {
            const card = document.createElement('div');
            card.className = 'card applicator-card';
            card.innerHTML = `
                <div>
                    <div class="applicator-header">
                        <span class="applicator-name">${app.name}</span>
                        <span class="applicator-badge">${app.certification}</span>
                    </div>
                    <p class="applicator-zone">📍 ${app.zoneLabel}</p>
                </div>
                <div>
                    <p class="applicator-stats">⭐ Obras Evaluadas: <strong>${app.completedCount}</strong></p>
                    <a href="#preventa" class="btn btn-glass btn-block" style="font-size: 13px; padding: 8px 12px;">Solicitar Derivación de Cuadrilla</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    selectZone.addEventListener('change', (e) => {
        renderApplicators(e.target.value);
    });

    renderApplicators();

    // --- CRM Form Submission Handling ---
    const form = document.getElementById('crm-lead-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('lead-name').value;

        alert(`¡Gracias ${name}! Tu solicitud ha sido registrada correctamente en el sistema de ImpoAquatic. Un asesor técnico-comercial se comunicará por WhatsApp para la atención de tu proyecto.`);

        form.reset();
    });
});
