(function () {
  const idEl = document.getElementById("solId");
  const metaEl = document.getElementById("solMeta");

  function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  // 1) Preferimos el id por query (?id=...)
  const idFromUrl = getQueryParam("id");

  // 2) Si no existe, intentamos el ultimo registro guardado
  let last = null;
  try {
    last = JSON.parse(sessionStorage.getItem("lastSolicitud") || "null");
  } catch (_) {}

  const finalId = idFromUrl || last?.id || "SOL-0000-00000";
  if (idEl) idEl.textContent = finalId;

  // metadata opcional (tipo, fecha, correo)
  const parts = [];
  if (last?.tipo) parts.push(`<div><b>Tipo:</b> ${escapeHtml(last.tipo)}</div>`);
  if (last?.fecha) parts.push(`<div><b>Fecha:</b> ${escapeHtml(last.fecha)}</div>`);
  if (last?.correo) parts.push(`<div><b>Correo:</b> ${escapeHtml(last.correo)}</div>`);

  if (metaEl) {
    metaEl.innerHTML = parts.length ? parts.join("") : "";
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
