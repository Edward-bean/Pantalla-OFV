(function () {
  const form = document.getElementById("authForm");
  if (!form) return;

  const email = form.querySelector('input[name="email"]');
  const password = form.querySelector('input[name="password"]');

  const emailErr = form.querySelector('[data-error="email"]');
  const passErr = form.querySelector('[data-error="password"]');

  function setError(el, msg) {
    if (!el) return;
    el.textContent = msg || "";
    el.style.display = msg ? "block" : "none";
  }

  function isValidEmail(value) {
    // Simple y robusto para MVP
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function validate() {
    let ok = true;

    const e = (email?.value || "").trim();
    const p = (password?.value || "");

    if (!e) {
      setError(emailErr, "El correo es obligatorio.");
      ok = false;
    } else if (!isValidEmail(e)) {
      setError(emailErr, "Formato de correo inválido. Ej: usuario@dominio.com");
      ok = false;
    } else {
      setError(emailErr, "");
    }

    if (!p) {
      setError(passErr, "La clave es obligatoria.");
      ok = false;
    } else if (p.length < 8) {
      setError(passErr, "La clave debe tener al menos 8 caracteres.");
      ok = false;
    } else {
      setError(passErr, "");
    }

    return ok;
  }

  [email, password].forEach((i) => {
    if (!i) return;
    i.addEventListener("input", validate);
    i.addEventListener("blur", validate);
  });

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    const redirect = form.getAttribute("data-redirect") || "../index.html";
    window.location.href = redirect;
  });
})();
