(() => {
  const root = document.documentElement;
  const languageButtons = [...document.querySelectorAll("[data-lang]")];
  const printBtn = document.getElementById("printBtn");
  const dialog = document.getElementById("imageDialog");
  const toast = document.getElementById("toast");

  function setLanguage(lang) {
    const normalized = lang === "en" ? "en" : "ru";
    root.dataset.language = normalized;
    root.lang = normalized;
    localStorage.setItem("massMailerLanguage", normalized);
    languageButtons.forEach(btn => {
      const active = btn.dataset.lang === normalized;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.title = normalized === "ru"
      ? "Mass Mailer 2.4 — инструкция"
      : "Mass Mailer 2.4 — Installation & User Guide";
  }

  const saved = localStorage.getItem("massMailerLanguage");
  const browserDefault = navigator.language && navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
  setLanguage(saved || browserDefault);

  languageButtons.forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  if (printBtn) printBtn.addEventListener("click", () => window.print());

  document.querySelectorAll("[data-open-image]").forEach(button => {
    button.addEventListener("click", () => {
      if (dialog && typeof dialog.showModal === "function") {
        dialog.showModal();
        document.body.classList.add("modal-open");
      }
    });
  });

  if (dialog) {
    dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
    dialog.addEventListener("click", event => {
      const rect = dialog.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right &&
                     event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inside) dialog.close();
    });
  }

  let toastTimer;
  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1600);
  }

  document.querySelectorAll("[data-copy]").forEach(button => {
    button.addEventListener("click", async () => {
      const value = button.dataset.copy || "";
      try {
        await navigator.clipboard.writeText(value);
        showToast(root.dataset.language === "ru" ? "Скопировано" : "Copied");
      } catch {
        const area = document.createElement("textarea");
        area.value = value;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.appendChild(area);
        area.select();
        document.execCommand("copy");
        area.remove();
        showToast(root.dataset.language === "ru" ? "Скопировано" : "Copied");
      }
    });
  });
})();
