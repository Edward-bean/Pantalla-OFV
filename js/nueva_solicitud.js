// Datos de ejemplo
const tipos = {
  acuerdo_pago: {
    titulo: "Solicitud de Acuerdo de Pago (deudas en RR, RC, FISC y CC)",
    codigo: "650",
    costo: "Pago inicial del acuerdo de un 10% a un 40%.",
    tiempo: "5 días laborables",
    respuesta: "Copia del Acuerdo de Pago y Autorizaciones de Pago.",
    descripcion:
      "Permite solicitar un acuerdo de pago para deudas fiscales. Complete los datos del contribuyente y adjunte los documentos requeridos.",
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
};

// Helpers
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

let selectedKey = "";
let docsState = {}; // { docId: boolean }

// Elements
const tipoSelect = $("#tipoSolicitud");

const infoBox = $("#infoSolicitud");
const infoCodigo = $("#infoCodigo");
const infoCosto = $("#infoCosto");
const infoTiempo = $("#infoTiempo");
const infoRespuesta = $("#infoRespuesta");
const infoDescripcion = $("#infoDescripcion");

const step1 = $("#step1");
const step2 = $("#step2");
const step3 = $("#step3");

const btnNext1 = $("#btnNext1");
const btnBack2 = $("#btnBack2");
const btnNext2 = $("#btnNext2");
const btnBack3 = $("#btnBack3");
const btnSubmit = $("#btnSubmit");

const docsContainer = $("#docsContainer");

const rnc = $("#rnc");
const razon = $("#razon");
const correo = $("#correo");
const telefono = $("#telefono");

// Stepper UI
function setStep(n) {
  step1.hidden = n !== 1;
  step2.hidden = n !== 2;
  step3.hidden = n !== 3;

  $$(".wstep").forEach((x) => x.classList.remove("active"));
  $(`.wstep[data-step="${n}"]`)?.classList.add("active");
}

function validateStep2() {
  const ok =
    rnc.value.trim().length >= 5 &&
    razon.value.trim().length >= 3 &&
    correo.value.trim().includes("@") &&
    telefono.value.trim().length >= 7;

  btnNext2.disabled = !ok;
}

function validateStep3() {
  // solo obligatorios
  const reqDocs = tipos[selectedKey]?.documentos?.filter((d) => d.requerido) || [];
  const ok = reqDocs.every((d) => docsState[d.id] === true);
  btnSubmit.disabled = !ok;
}

function renderDocs(key) {
  docsContainer.innerHTML = "";
  docsState = {};

  const docs = tipos[key].documentos;

  docs.forEach((d) => {
    if (d.requerido) docsState[d.id] = false;

    const card = document.createElement("div");
    card.className = "doc-card";

    card.innerHTML = `
      <div class="doc-head">
        <div class="doc-title">
          ${d.nombre}
          ${d.requerido ? '<span class="doc-req">*</span>' : '<span class="doc-opt">Opcional</span>'}
        </div>
        <div class="doc-help">${d.ayuda || ""}</div>
      </div>

      <label class="doc-upload">
        <input type="file" accept="application/pdf" data-doc="${d.id}" ${d.requerido ? "required" : ""}/>
        <div class="doc-upload-box">
          <div class="doc-upload-main">Subir PDF</div>
          <div class="doc-upload-sub">Haz clic para seleccionar un archivo</div>
        </div>
      </label>

      <div class="doc-file" id="file_${d.id}" hidden></div>
    `;

    docsContainer.appendChild(card);
  });

  // listeners
  docsContainer.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", () => {
      const docId = input.dataset.doc;
      const file = input.files?.[0];
      const fileLine = document.getElementById(`file_${docId}`);

      if (!file) {
        if (fileLine) fileLine.hidden = true;
        if (docsState.hasOwnProperty(docId)) docsState[docId] = false;
        validateStep3();
        return;
      }

      // Validación simple: tamaño 5MB
      const max = 5 * 1024 * 1024;
      if (file.size > max) {
        alert("El archivo excede 5MB. Por favor suba un PDF más pequeño.");
        input.value = "";
        if (fileLine) fileLine.hidden = true;
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

// On select change => mostrar info + habilitar siguiente
tipoSelect.addEventListener("change", () => {
  selectedKey = tipoSelect.value;

  if (!selectedKey) {
    infoBox.hidden = true;
    btnNext1.disabled = true;
    return;
  }

  const t = tipos[selectedKey];
  infoCodigo.textContent = t.codigo;
  infoCosto.textContent = t.costo;
  infoTiempo.textContent = t.tiempo;
  infoRespuesta.textContent = t.respuesta;
  infoDescripcion.textContent = t.descripcion;

  infoBox.hidden = false;
  btnNext1.disabled = false;

  // pre-render docs para cuando llegue al paso 3
  renderDocs(selectedKey);
});

// Navegación
btnNext1.addEventListener("click", () => setStep(2));
btnBack2.addEventListener("click", () => setStep(1));
btnNext2.addEventListener("click", () => setStep(3));
btnBack3.addEventListener("click", () => setStep(2));

[rnc, razon, correo, telefono].forEach((i) => i.addEventListener("input", validateStep2));

// Submit (demo)
btnSubmit.addEventListener("click", () => {
  alert("Solicitud enviada (demo).");
});

// inicial
setStep(1);
validateStep2();
