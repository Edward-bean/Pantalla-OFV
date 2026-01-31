// Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ==============================
// SOLICITUDES
// ==============================
const solicitudes = {
  // ---- Tus solicitudes existentes ----
  acuerdo_pago: {
    titulo: "Solicitud de Acuerdo de Pago (deudas en RR, RC, FISC y CC)",
    descripcion:
      "Permite solicitar un acuerdo de pago para deudas fiscales. Adjunte los documentos requeridos.",
    costo: "Pago de un inicial del acuerdo de un 10% a un 40%.",
    tiempoRespuesta: "5 días laborables",
    respuestaResultante: "Copia del Acuerdo de Pago y Autorizaciones de Pago",
    documentos: [
      {
        id: "formulario",
        nombre: "Formulario Solicitud Acuerdo de Pago (FI-GECO-016)",
        requerido: true,
        ayuda: "Debe estar llenado y firmado (sellado si es Persona Jurídica).",
      },
      {
        id: "cedula_rep",
        nombre: "Cédula del presidente/representante (ambos lados)",
        requerido: true,
        ayuda: "Aplica a Personas Jurídicas.",
      },
      {
        id: "cedula_sol",
        nombre: "Cédula del solicitante (ambos lados)",
        requerido: true,
        ayuda: "Aplica a Personas Físicas.",
      },
      {
        id: "carta_poder",
        nombre: "Carta de autorización / poder notariado y legalizado",
        requerido: false,
        ayuda: "Solo si gestiona un apoderado/representante.",
      },
      {
        id: "cedula_apoderado",
        nombre: "Cédula del apoderado (ambos lados)",
        requerido: false,
        ayuda: "Solo si gestiona un apoderado.",
      },
    ],
  },

  correccion_pagos: {
    titulo: "Solicitud de Corrección de Pagos",
    descripcion: "Permite solicitar correcciones relacionadas a pagos.",
    costo: "Sin costo",
    tiempoRespuesta: "7 días laborables",
    respuestaResultante:
      "Notificación de corrección aplicada o requerimiento de información adicional",
    documentos: [],
  },

  levantamiento_oposicion: {
    titulo: "Solicitud de Levantamiento de Oposición",
    descripcion:
      "Gestiona el levantamiento de oposición asociado a un proceso de cobranza.",
    costo: "Sin costo",
    tiempoRespuesta: "10 días laborables",
    respuestaResultante:
      "Notificación de levantamiento aprobado o rechazo con motivo",
    documentos: [],
  },

  remision_info_cobro: {
    titulo: "Remisión de Información por Cobro Coactivo",
    descripcion:
      "Permite remitir documentos/información solicitada en un proceso de cobro coactivo.",
    costo: "Sin costo",
    tiempoRespuesta: "5 días laborables",
    respuestaResultante: "Acuse de recibo y actualización del expediente",
    documentos: [],
  },

  certificacion_estado_cobranza: {
    titulo: "Solicitud de Certificación de Estado de Cobranza",
    descripcion:
      "Emite una constancia del estado actual del contribuyente en procesos de cobranza.",
    costo: "RD$ 300.00",
    tiempoRespuesta: "3 días laborables",
    respuestaResultante: "Certificación emitida en PDF",
    documentos: [],
  },

  asignacion_ncf: {
    titulo: "Solicitud de Asignación de NCF",
    descripcion: "Demo: solicitud para asignar o habilitar NCF.",
    documentos: [],
  },
  reposicion_ncf: {
    titulo: "Solicitud de Reposición de NCF",
    descripcion: "Demo: reposición/corrección de secuencias NCF.",
    documentos: [],
  },
  actualizacion_datos: {
    titulo: "Solicitud de Actualización de Datos del Contribuyente",
    descripcion: "Demo: cambio de teléfono, correo, domicilio, actividad, etc.",
    documentos: [],
  },
  cambio_actividad: {
    titulo: "Solicitud de Cambio de Actividad Económica",
    descripcion: "Demo: actualización de actividad económica registrada.",
    documentos: [],
  },
  certificacion_no_adeudo: {
    titulo: "Solicitud de Certificación de No Adeudo",
    descripcion: "Demo: certificación que indica estado de no adeudo.",
    documentos: [],
  },
  certificacion_rnc: {
    titulo: "Solicitud de Certificación de RNC",
    descripcion: "Demo: constancia/certificación asociada al RNC.",
    documentos: [],
  },
  autorizacion_impresion: {
    titulo: "Solicitud de Autorización Especial",
    descripcion: "Demo: autorización especial para proceso específico.",
    documentos: [],
  },
  permiso_operacion: {
    titulo: "Solicitud de Permiso / Autorización de Operación",
    descripcion: "Demo: permiso para operación fiscal especial.",
    documentos: [],
  },
  rectificacion_declaracion: {
    titulo: "Solicitud de Rectificación de Declaración",
    descripcion: "Demo: rectificar declaración por error u omisión.",
    documentos: [],
  },
  correccion_datos_formales: {
    titulo: "Solicitud de Corrección de Datos Formales",
    descripcion: "Demo: corrección de datos en registros/documentos.",
    documentos: [],
  },

  // ---- NUEVAS solicitudes placeholders (para nuevas categorías) ----
  habilitacion_ecf: {
    titulo: "Solicitud de Habilitación como Emisor Electrónico (e-CF)",
    descripcion: "Demo: habilitar contribuyente para facturación electrónica.",
    documentos: [],
  },
  cambio_admin_ecf: {
    titulo: "Solicitud de Cambio de Administrador e-CF",
    descripcion:
      "Demo: cambio de usuario administrador en facturación electrónica.",
    documentos: [],
  },

  reembolso_itbis: {
    titulo: "Solicitud de Reembolso / Saldo a Favor ITBIS",
    descripcion: "Demo: solicitud de reembolso o gestión de saldo a favor.",
    documentos: [],
  },
  compensacion_impuestos: {
    titulo: "Solicitud de Compensación entre Impuestos",
    descripcion: "Demo: compensar saldos a favor con obligaciones tributarias.",
    documentos: [],
  },

  descargo_fiscalizacion: {
    titulo: "Presentación de Descargo / Alegato (Fiscalización)",
    descripcion: "Demo: remisión de alegatos o descargos para fiscalización.",
    documentos: [],
  },
  reduccion_multa: {
    titulo: "Solicitud de Reducción de Multa / Sanción",
    descripcion:
      "Demo: solicitud de reconsideración de multas por deberes formales.",
    documentos: [],
  },

  recurso_reconsideracion: {
    titulo: "Recurso de Reconsideración",
    descripcion: "Demo: iniciar recurso administrativo de reconsideración.",
    documentos: [],
  },
  desistimiento_recurso: {
    titulo: "Desistimiento de Recurso",
    descripcion: "Demo: retiro/desistimiento de un recurso iniciado.",
    documentos: [],
  },

  tramite_fideicomiso: {
    titulo: "Solicitud Relacionada a Fideicomiso",
    descripcion:
      "Demo: trámites generales de fideicomiso (registro/actualización).",
    documentos: [],
  },
  vivienda_bajo_costo: {
    titulo: "Solicitud Vivienda de Bajo Costo",
    descripcion: "Demo: trámites asociados a VBC (bono/validaciones).",
    documentos: [],
  },

  transferencia_inmueble: {
    titulo: "Solicitud de Transferencia Inmobiliaria",
    descripcion: "Demo: trámite relacionado a transferencia de inmueble.",
    documentos: [],
  },
  solicitud_tasacion: {
    titulo: "Solicitud de Tasación / Revaluación",
    descripcion: "Demo: tasación o revaluación de inmueble.",
    documentos: [],
  },

  exencion_itbis: {
    titulo: "Solicitud de Exención ITBIS",
    descripcion: "Demo: solicitud de exención o tratamiento especial ITBIS.",
    documentos: [],
  },
  exencion_isc: {
    titulo: "Solicitud de Exención ISC",
    descripcion: "Demo: solicitud de exención o tratamiento especial ISC.",
    documentos: [],
  },

  remision_documentos: {
    titulo: "Remisión de Documentos / Completar Expediente",
    descripcion: "Demo: aportar documentos para completar un expediente.",
    documentos: [],
  },
  solicitud_constancia: {
    titulo: "Solicitud de Constancia / Comunicación",
    descripcion: "Demo: emisión de constancia o comunicación simple.",
    documentos: [],
  },
};

// ==============================
// ICONOS
// ==============================
const iconos = {
  cobranza: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24h40M20 24v28m24-28v28M16 52h32"/>
      <path d="M24 16h16M28 16v-6h8v6"/>
    </svg>
  `,
  comprobantes: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10h18l6 6v38H20z"/>
      <path d="M38 10v8h8"/>
      <path d="M26 30h18M26 38h18M26 46h14"/>
    </svg>
  `,
  registro: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 52V14h24v38"/>
      <path d="M24 20h16M24 28h16M24 36h16M24 44h16"/>
    </svg>
  `,
  certificaciones: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10h24v44H20z"/>
      <path d="M24 20h16M24 28h16M24 36h10"/>
      <path d="M30 54l2-4 2 4"/>
    </svg>
  `,
  autorizaciones: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10l18 8v14c0 14-8 20-18 22C22 52 14 46 14 32V18z"/>
      <path d="M24 32l6 6 12-14"/>
    </svg>
  `,
  rectificaciones: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 14h28v12H18z"/>
      <path d="M18 30h28v20H18z"/>
      <path d="M22 36h20M22 44h14"/>
    </svg>
  `,
  facturacion: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 10h28v44H18z"/>
      <path d="M22 18h20M22 26h20M22 34h14"/>
      <path d="M44 46H24"/>
    </svg>
  `,
  creditos: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 24h36a6 6 0 0 1 6 6v12H14z"/>
      <path d="M14 30h42"/>
      <path d="M22 48h20"/>
    </svg>
  `,
  fiscalizacion: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 12h20v8H22z"/>
      <path d="M18 20h28v32H18z"/>
      <path d="M24 30h16M24 38h16M24 46h10"/>
    </svg>
  `,
  recursos: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 52h24"/>
      <path d="M24 52V26h16v26"/>
      <path d="M22 26l10-12 10 12"/>
    </svg>
  `,
  fideicomiso: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 30l20-16 20 16v22H12z"/>
      <path d="M24 52V36h16v16"/>
    </svg>
  `,
  inmuebles: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 52V22l18-10 18 10v30"/>
      <path d="M26 52V34h12v18"/>
    </svg>
  `,
  exenciones: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10l18 8v14c0 14-8 20-18 22C22 52 14 46 14 32V18z"/>
      <path d="M24 36l16-16"/>
      <path d="M24 20h0M40 36h0"/>
    </svg>
  `,
  documentos: `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10h18l6 6v38H20z"/>
      <path d="M38 10v8h8"/>
      <path d="M26 30h18M26 38h18M26 46h14"/>
    </svg>
  `,
};

// ==============================
// CATEGORÍAS
// ==============================
const categorias = [
  {
    id: "cobranza",
    nombre: "Cobranza y Gestión de Deudas",
    items: [
      "acuerdo_pago",
      "correccion_pagos",
      "levantamiento_oposicion",
      "remision_info_cobro",
      "certificacion_estado_cobranza",
    ],
  },
  {
    id: "comprobantes",
    nombre: "Comprobantes Fiscales",
    items: ["asignacion_ncf", "reposicion_ncf"],
  },
  {
    id: "registro",
    nombre: "Registro y Actualización del Contribuyente",
    items: ["actualizacion_datos", "cambio_actividad"],
  },
  {
    id: "certificaciones",
    nombre: "Certificaciones",
    items: ["certificacion_no_adeudo", "certificacion_rnc"],
  },
  {
    id: "autorizaciones",
    nombre: "Autorizaciones Especiales",
    items: ["autorizacion_impresion", "permiso_operacion"],
  },
  {
    id: "rectificaciones",
    nombre: "Rectificaciones y Correcciones",
    items: ["rectificacion_declaracion", "correccion_datos_formales"],
  },

  // Nuevas
  {
    id: "facturacion",
    nombre: "Facturación Electrónica (e-CF)",
    items: ["habilitacion_ecf", "cambio_admin_ecf"],
  },
  {
    id: "creditos",
    nombre: "Créditos, Compensaciones y Reembolsos",
    items: ["reembolso_itbis", "compensacion_impuestos"],
  },
  {
    id: "fiscalizacion",
    nombre: "Fiscalización y Deberes Formales",
    items: ["descargo_fiscalizacion", "reduccion_multa"],
  },
  {
    id: "recursos",
    nombre: "Recursos y Reconsideración",
    items: ["recurso_reconsideracion", "desistimiento_recurso"],
  },
  {
    id: "fideicomiso",
    nombre: "Fideicomiso y Vivienda",
    items: ["tramite_fideicomiso", "vivienda_bajo_costo"],
  },
  {
    id: "inmuebles",
    nombre: "Inmuebles y Tasación",
    items: ["transferencia_inmueble", "solicitud_tasacion"],
  },
  {
    id: "exenciones",
    nombre: "Exenciones e Incentivos",
    items: ["exencion_itbis", "exencion_isc"],
  },
  {
    id: "documentos",
    nombre: "Documentos y Comunicaciones",
    items: ["remision_documentos", "solicitud_constancia"],
  },
];

// ==============================
// STATE + ELEMENTS
// ==============================
let selectedCategoryId = "";
let selectedKey = "";
let docsState = {};

// Step 2: buscador + pager
let searchTerm = "";
let currentPage = 1;
const pageSize = 4;

const categoriasContainer = $("#categoriasContainer");
const solicitudesContainer = $("#solicitudesContainer");

const step1 = $("#step1");
const step2 = $("#step2");
const step3 = $("#step3");

const btnBack2 = $("#btnBack2");
const btnBack3 = $("#btnBack3");

const btnSubmit = $("#btnSubmit");
const docsContainer = $("#docsContainer");

// NUEVOS elementos (si existen en el HTML)
const solSearch = $("#solSearch");
const pagesWrap = $("#pagesWrap");

// Stepper
function setStep(n) {
  step1.hidden = n !== 1;
  step2.hidden = n !== 2;
  step3.hidden = n !== 3;

  $$(".wstep").forEach((x) => x.classList.remove("active"));
  $(`.wstep[data-step="${n}"]`)?.classList.add("active");
}

// ==============================
// STEP 1: Categorías
// ==============================
function renderCategorias() {
  categoriasContainer.innerHTML = "";

  categorias.forEach((cat) => {
    const tile = document.createElement("div");
    tile.className = "cat-tile";
    tile.dataset.cat = cat.id;

    const icon = iconos[cat.id] || iconos["registro"];

    tile.innerHTML = `
      <div class="cat-ico">${icon}</div>
      <div class="cat-title">${cat.nombre}</div>

      <button class="cat-action js-go-solicitudes" type="button" data-cat="${cat.id}">
        VER SERVICIOS <span style="font-size:14px;">›</span>
      </button>
    `;

    categoriasContainer.appendChild(tile);
  });

  categoriasContainer.querySelectorAll(".js-go-solicitudes").forEach((btn) => {
    btn.addEventListener("click", () => {
      const catId = btn.dataset.cat;
      selectedCategoryId = catId;

      // Reset buscador/paginación al cambiar de categoría
      searchTerm = "";
      currentPage = 1;
      if (solSearch) solSearch.value = "";

      renderSolicitudesByCategory(catId);
      setStep(2);
    });
  });
}

// ==============================
// STEP 2: Solicitudes por categoría + Search + Paginación
// ==============================
function normalizeText(str) {
  return String(str || "")
    .toLowerCase()
    .trim();
}

function getFilteredKeys(items) {
  const q = normalizeText(searchTerm);
  if (!q) return items;

  return items.filter((key) => {
    const s = solicitudes[key];
    if (!s) return false;

    // buscable: titulo, descripcion, costo, tiempo, respuesta
    const haystack = [
      s.titulo,
      s.descripcion,
      s.costo,
      s.tiempoRespuesta,
      s.respuestaResultante,
    ]
      .map(normalizeText)
      .join(" ");

    return haystack.includes(q);
  });
}

function renderPager(totalItems) {
  if (!pagesWrap) return;

  pagesWrap.innerHTML = "";

  const totalPagesReal = Math.max(1, Math.ceil(totalItems / pageSize));

  const minPages = 4;
  const totalPages = Math.max(minPages, totalPagesReal);

  // clamp página actual según el total mostrado
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  for (let p = 1; p <= totalPages; p++) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "page-num" + (p === currentPage ? " active" : "");
    b.textContent = String(p);

    b.addEventListener("click", () => {
      currentPage = p;
      renderSolicitudesByCategory(selectedCategoryId);
    });

    pagesWrap.appendChild(b);
  }
}

function renderSolicitudesByCategory(catId) {
  const cat = categorias.find((c) => c.id === catId);
  const items = cat?.items || [];

  solicitudesContainer.innerHTML = "";

  if (!cat) {
    solicitudesContainer.innerHTML = `<div style="color:#888; font-weight:700;">Categoría no encontrada.</div>`;
    renderPager(0);
    return;
  }

  if (items.length === 0) {
    solicitudesContainer.innerHTML = `<div style="color:#888; font-weight:700;">No hay solicitudes en esta categoría.</div>`;
    renderPager(0);
    return;
  }

  // Filtro
  const filtered = getFilteredKeys(items);
  renderPager(filtered.length);

  // Paginar
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  if (filtered.length > 0 && pageItems.length === 0) {
    solicitudesContainer.innerHTML = `
    <div style="color:#888; font-weight:700;">
      No hay solicitudes en esta página.
    </div>
  `;
    return;
  }

  if (filtered.length === 0) {
    solicitudesContainer.innerHTML = `
      <div style="color:#888; font-weight:700;">
        No se encontraron resultados para: <span style="color:#222;">"${searchTerm}"</span>
      </div>
    `;
    return;
  }

  const html = pageItems
    .map((key) => {
      const s = solicitudes[key];
      if (!s) return "";

      return `
        <div class="svc-row">
          <div class="svc-left">
            <div class="svc-name">${s.titulo}</div>
            <div class="svc-desc">${s.descripcion || ""}</div>

            ${
              s.costo || s.tiempoRespuesta || s.respuestaResultante
                ? `
                  <div class="svc-meta">
                    ${s.costo ? `<div><b>Costo:</b> ${s.costo}</div>` : ""}
                    ${s.tiempoRespuesta ? `<div><b>Tiempo:</b> ${s.tiempoRespuesta}</div>` : ""}
                    ${
                      s.respuestaResultante
                        ? `<div><b>Respuesta:</b> ${s.respuestaResultante}</div>`
                        : ""
                    }
                  </div>
                `
                : ""
            }
          </div>

          <button class="btn small js-open-docs" data-key="${key}">
            SELECCIONAR
          </button>
        </div>
      `;
    })
    .join("");

  solicitudesContainer.innerHTML = html;

  // Seleccionar => Step 3
  solicitudesContainer.querySelectorAll(".js-open-docs").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.key;
      if (!solicitudes[key]) return;

      selectedKey = key;
      renderDocs(selectedKey);
      setStep(3);
    });
  });
}

// Buscador (Step 2)
if (solSearch) {
  solSearch.addEventListener("input", (e) => {
    searchTerm = e.target.value || "";
    currentPage = 1;
    renderSolicitudesByCategory(selectedCategoryId);
  });
}

// ==============================
// STEP 3: Documentos
// ==============================
function validateStep3() {
  const reqDocs =
    solicitudes[selectedKey]?.documentos?.filter((d) => d.requerido) || [];
  const ok = reqDocs.every((d) => docsState[d.id] === true);
  btnSubmit.disabled = !ok;
}

function renderDocs(key) {
  docsContainer.innerHTML = "";
  docsState = {};

  const docs = solicitudes[key]?.documentos || [];

  if (docs.length === 0) {
    docsContainer.innerHTML = `
      <div class="doc-card" style="grid-column: 1 / -1;">
        <div class="doc-title">No hay documentos configurados</div>
        <div class="doc-help">Esta solicitud aún no tiene requisitos/documentos definidos.</div>
      </div>
    `;
    validateStep3();
    return;
  }

  docs.forEach((d) => {
    if (d.requerido) docsState[d.id] = false;

    const card = document.createElement("div");
    card.className = "doc-card";
    card.innerHTML = `
      <div class="doc-head">
        <div class="doc-title">
          ${d.nombre}
          ${
            d.requerido
              ? '<span class="doc-req">*</span>'
              : '<span class="doc-opt">Opcional</span>'
          }
        </div>
        <div class="doc-help">${d.ayuda || ""}</div>
      </div>

      <label class="doc-upload">
        <input type="file" accept="application/pdf" data-doc="${d.id}" ${
          d.requerido ? "required" : ""
        }/>
        <div class="doc-upload-box">
          <div class="doc-upload-main">Subir PDF</div>
          <div class="doc-upload-sub">Haz clic para seleccionar un archivo</div>
        </div>
      </label>

      <div class="doc-file" id="file_${d.id}" hidden></div>
    `;
    docsContainer.appendChild(card);
  });

  docsContainer.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", () => {
      const docId = input.dataset.doc;
      const file = input.files?.[0];
      const fileLine = document.getElementById(`file_${docId}`);

      if (!file) {
        fileLine && (fileLine.hidden = true);
        if (docsState.hasOwnProperty(docId)) docsState[docId] = false;
        validateStep3();
        return;
      }

      const max = 5 * 1024 * 1024;
      if (file.size > max) {
        alert("El archivo excede 5MB. Por favor suba un PDF más pequeño.");
        input.value = "";
        fileLine && (fileLine.hidden = true);
        if (docsState.hasOwnProperty(docId)) docsState[docId] = false;
        validateStep3();
        return;
      }

      if (fileLine) {
        fileLine.textContent = `Archivo seleccionado: ${file.name}`;
        fileLine.hidden = false;
      }

      if (docsState.hasOwnProperty(docId)) docsState[docId] = true;
      validateStep3();
    });
  });

  validateStep3();
}

// ==============================
// NAVEGACIÓN
// ==============================
btnBack2?.addEventListener("click", () => setStep(1));

btnBack3?.addEventListener("click", () => {
  // vuelve al step 2 (mantiene filtro y paginación)
  renderSolicitudesByCategory(selectedCategoryId);
  setStep(2);
});

// Submit demo (igual)
btnSubmit?.addEventListener("click", () => {
  if (btnSubmit.disabled) return;

  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 90000) + 10000);
  const id = `SOL-${year}-${seq}`;

  const fecha = new Date().toLocaleString("es-DO", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const tipo = solicitudes[selectedKey]?.titulo || "Solicitud";
  sessionStorage.setItem(
    "lastSolicitud",
    JSON.stringify({ id, tipo, fecha, correo: "" }),
  );

  window.location.href = `solicitud_enviada.html?id=${encodeURIComponent(id)}`;
});

// Init
setStep(1);
renderCategorias();
