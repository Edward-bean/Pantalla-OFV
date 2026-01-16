/* ==============================================
   Lógica para el Sistema Interno (MVP Final - Corregido)
============================================== */

// Configuración de Tipos Base
const baseTypes = [
  { asunto: "Remisión de Información por Notificación de Cobro Coactivo", contribuyente: "INDUSTRIAS BANILEJAS SAS", docReq: "formulario.pdf" },
  { asunto: "Levantamiento de Oposición de Vehículos", contribuyente: "JUAN PABLO DUARTE", docReq: "cedula.pdf" },
  { asunto: "Rectificativa IR-1 Periodo 2024", contribuyente: "FARMACIA EL SOL SRL", docReq: "evidencia.pdf" },
  { asunto: "Solicitud de Acuerdo de Pago", contribuyente: "CONSTRUCTORA DEL NORTE", docReq: "formulario.pdf" }
];

// 1. GESTIÓN DE DATOS (PERSISTENCIA)
let mockSolicitudes = loadData();

function loadData() {
  // Intentamos leer de la memoria de sesión para mantener los datos entre pantallas
  const stored = sessionStorage.getItem("dgii_mock_data");
  if (stored) {
    return JSON.parse(stored);
  } else {
    // Si no existe, generamos y guardamos
    const newData = generateData();
    sessionStorage.setItem("dgii_mock_data", JSON.stringify(newData));
    return newData;
  }
}

function generateData() {
  const total = 15;
  let currentId = 4990011; 
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 20); 

  let tempList = [];

  for (let i = 0; i < total; i++) {
    const typeIdx = i % 4; // Repartir equitativamente para pruebas
    const base = baseTypes[typeIdx];

    const timeJump = (Math.random() * 48) + 4; 
    currentDate.setHours(currentDate.getHours() + timeJump);

    const idJump = Math.floor(Math.random() * 50) + 10;
    currentId += idJump;

    // Asignar estatus variado
    let st;
    if(i < 3) st = "En Proceso"; 
    else if (i < 5) st = "Devuelto";
    else if (i < 12) st = "Asignado";
    else st = "Revisión";

    tempList.push({
      id: currentId.toString(),
      asunto: base.asunto,
      contribuyente: base.contribuyente,
      rnc: "10100" + (1000 + i),
      estatus: st,
      fecha: currentDate.toISOString(),
      docs: [
        { name: base.docReq, label: "Documento Principal", type: "pdf" },
        { name: "cedula.pdf", label: "Identificación Rep.", type: "pdf" }
      ],
      tracking: [
        { user: "Sistema", action: "Solicitud recibida", date: getRandomTime(currentDate, -4) },
        { user: "Sistema", action: "Asignado a su cola", date: currentDate.toISOString() }
      ]
    });
  }
  return tempList;
}

function getRandomTime(baseDate, offsetHours) {
  const d = new Date(baseDate);
  d.setHours(d.getHours() + offsetHours);
  return d.toISOString();
}

// ==============================================
// 2. LÓGICA DE ORDENAMIENTO (TU REGLA)
// ==============================================
// 1ro: Estatus (En Proceso > Devuelto > Asignado > Revisión)
// 2do: ID (Menor a Mayor -> Ascendente)
const statusPriority = {
  "En Proceso": 1,
  "Devuelto": 2,
  "Asignado": 3,
  "Revisión": 4
};

function sortRequests(data) {
  return data.sort((a, b) => {
    const prioA = statusPriority[a.estatus] || 99;
    const prioB = statusPriority[b.estatus] || 99;

    // Primer Criterio: Estatus
    if (prioA !== prioB) {
      return prioA - prioB; 
    }
    
    // Segundo Criterio: ID Ascendente (Menor primero)
    return parseInt(a.id) - parseInt(b.id); 
  });
}

// ==============================================
// 3. LÓGICA BANDEJA (inicio.html)
// ==============================================
const inboxTable = document.getElementById("inboxTableBody");
const searchInput = document.getElementById("searchInput");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const pageIndicator = document.getElementById("pageIndicator");
const btnReload = document.getElementById("btnReload");

let currentPage = 1;
const rowsPerPage = 6;
let currentData = [...mockSolicitudes]; 

if (inboxTable) {
  
  function renderTable(dataToRender) {
    inboxTable.innerHTML = "";
    
    // Aplicar ordenamiento antes de paginar
    const sorted = sortRequests([...dataToRender]);

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = sorted.slice(start, end);
    const totalPages = Math.ceil(sorted.length / rowsPerPage) || 1;

    if (pageData.length === 0) {
      inboxTable.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px; color:#666;">No se encontraron solicitudes.</td></tr>`;
      if(pageIndicator) pageIndicator.textContent = `Página 0 de 0`;
      return;
    }

    pageData.forEach(sol => {
      const d = new Date(sol.fecha);
      const dateStr = d.toLocaleDateString("es-DO", { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = d.toLocaleTimeString("es-DO", { hour: '2-digit', minute: '2-digit', hour12: true });

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td style="font-weight:700; color:#444;">${sol.id}</td>
        <td><div class="subject-text">${sol.asunto}</div></td>
        <td>
            <div style="font-weight:700; font-size:13px;">${sol.contribuyente}</div>
            <div style="font-size:11px; color:#666;">RNC: ${sol.rnc}</div>
        </td>
        <td><span class="badge ${getStatusColor(sol.estatus)}">${sol.estatus}</span></td>
        <td>
            <div class="td-date">${dateStr}</div>
            <div class="td-time">${timeStr}</div>
        </td>
        <td class="td-right">
          <button class="btn small" onclick="goToDetail('${sol.id}')">VER</button>
        </td>
      `;
      inboxTable.appendChild(tr);
    });

    if(pageIndicator) pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
    if(btnPrev) btnPrev.disabled = currentPage === 1;
    if(btnNext) btnNext.disabled = currentPage >= totalPages;
  }

  // Buscador
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = mockSolicitudes.filter(s => 
        s.id.includes(term) || 
        s.rnc.includes(term) ||
        s.contribuyente.toLowerCase().includes(term) ||
        s.asunto.toLowerCase().includes(term)
      );
      currentData = filtered; 
      currentPage = 1; 
      renderTable(currentData);
    });
  }

  // Botón Recargar (Limpia filtros y recarga data)
  if (btnReload) {
    btnReload.addEventListener("click", () => {
      // Opcional: Si quieres generar NUEVOS datos al recargar, descomenta la linea de abajo:
      // sessionStorage.removeItem("dgii_mock_data"); mockSolicitudes = loadData();
      
      searchInput.value = "";
      currentData = [...mockSolicitudes];
      currentPage = 1;
      renderTable(currentData);
    });
  }

  // Paginación
  if(btnPrev) btnPrev.addEventListener("click", () => { if(currentPage > 1) { currentPage--; renderTable(currentData); }});
  if(btnNext) btnNext.addEventListener("click", () => { 
      const totalPages = Math.ceil(currentData.length / rowsPerPage);
      if(currentPage < totalPages) { currentPage++; renderTable(currentData); }
  });

  renderTable(currentData);
}

function getStatusColor(status) {
  if (status === "Asignado") return "orange";
  if (status === "En Proceso") return "blue";
  if (status === "Revisión") return "purple";
  if (status === "Devuelto") return "red";
  return "green"; 
}

// Navegación Segura
window.goToDetail = function(id) {
  console.log("Navegando a ID:", id); // Debug
  sessionStorage.setItem("currentSolId", id);
  window.location.href = "vista_solicitud.html";
};

// ==============================================
// 4. LÓGICA VISTA DETALLE (vista_solicitud.html)
// ==============================================
const detId = document.getElementById("detId");
const viewer = document.getElementById("docViewer");
const trackingContainer = document.getElementById("trackingFeed");

if (detId) { 
  const currentId = sessionStorage.getItem("currentSolId");
  
  // Buscar en la lista PERSISTENTE
  const solicitud = mockSolicitudes.find(s => s.id === currentId);

  if (!solicitud) {
    alert("No se encontró la solicitud seleccionada.");
    window.location.href = "inicio.html";
  } else {
    // Renderizar Datos
    document.getElementById("detId").textContent = solicitud.id;
    document.getElementById("detAsunto").textContent = solicitud.asunto;
    document.getElementById("detContrib").textContent = solicitud.contribuyente;
    document.getElementById("detEstatus").textContent = solicitud.estatus;
    document.getElementById("detEstatus").className = `badge ${getStatusColor(solicitud.estatus)}`;
    
    const d = new Date(solicitud.fecha);
    document.getElementById("detFecha").textContent = d.toLocaleDateString("es-DO");

    renderDocs(solicitud.docs);
    renderTracking(solicitud.tracking);
    
    // Auto-cargar primer doc
    if(solicitud.docs.length > 0) showPreview(solicitud.docs[0]);
  }
}

function renderDocs(docs) {
  const list = document.getElementById("docList");
  if (!list) return;
  list.innerHTML = "";

  docs.forEach((d, idx) => {
    const item = document.createElement("div");
    item.className = "doc-item";
    if(idx === 0) item.classList.add("active");

    item.innerHTML = `
      <div style="font-size:16px;">📄</div>
      <div class="doc-name">
        <div>${d.label}</div>
        <div style="font-size:10px; color:#999; font-weight:400;">${d.name}</div>
      </div>
      <div style="font-size:14px; color:var(--green);">👁️</div>
    `;

    item.addEventListener("click", () => {
      document.querySelectorAll(".doc-item").forEach(x => x.classList.remove("active"));
      item.classList.add("active");
      showPreview(d);
    });
    list.appendChild(item);
  });
}

function showPreview(doc) {
  if (!viewer) return;
  // Ajusta la ruta si es necesario (asume assets/docs está al nivel de css/js)
  const pdfPath = `../assets/docs/${doc.name}`;

  viewer.innerHTML = `
    <iframe src="${pdfPath}" width="100%" height="100%" style="border:none; display:block;">
        <p>Tu navegador no soporta iframes.</p>
    </iframe>
  `;
}

function renderTracking(trackList) {
  if (!trackingContainer) return;
  trackingContainer.innerHTML = "";

  // Ordenar: fecha más reciente primero (descendente)
  const sorted = [...trackList].sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach((t, index) => {
    const d = new Date(t.date);
    const dateStr = d.toLocaleDateString("es-DO") + " " + d.toLocaleTimeString("es-DO", {hour:'2-digit', minute:'2-digit'});
    
    const div = document.createElement("div");
    div.className = `track-item ${index === 0 ? 'latest' : ''}`;
    div.innerHTML = `
        <div class="track-header">${dateStr} - <b>${t.user}</b></div>
        <div class="track-body">${t.action}</div>
    `;
    trackingContainer.appendChild(div);
  });
}