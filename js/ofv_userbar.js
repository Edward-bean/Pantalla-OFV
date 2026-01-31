// ofv_userbar.js
(() => {
  // No insertar en login
  const file = (location.pathname.split("/").pop() || "").toLowerCase();
  if (file === "login.html") return;

  // Datos inventados del contribuyente
  const perfil = {
    usuario: "JUAN PÉREZ - JPEREZ",
    rnc: "001-1234567-8",
    empresa: "CONSTRUCTORA DEL NORTE SRL",
  };

  // 🔹 CREAR EL CONTENEDOR (esto faltaba)
  const bar = document.createElement("section");
  bar.className = "ofv-userbar";

  bar.innerHTML = `
  <div class="ofv-userbar-inner row3">
    <div class="ub-item">
      <div class="ub-label">USUARIO</div>
      <div class="ub-value">${perfil.usuario}</div>
    </div>

    <div class="ub-item">
      <div class="ub-label">RNC</div>
      <div class="ub-value">${perfil.rnc}</div>
    </div>

    <div class="ub-item">
      <div class="ub-label">EMPRESA</div>
      <div class="ub-value">${perfil.empresa}</div>
    </div>
  </div>
`;

  // Insertar en el contenido (posición correcta)
  const content =
    document.querySelector("main.content") ||
    document.querySelector(".content");

  if (content) {
    content.insertAdjacentElement("afterbegin", bar);
    return;
  }

  // Fallback
  const header = document.querySelector(".ofv-header");
  if (header && header.parentNode) {
    header.insertAdjacentElement("afterend", bar);
  } else {
    document.body.insertAdjacentElement("afterbegin", bar);
  }
})();
