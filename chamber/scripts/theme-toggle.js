document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector("#theme-toggle");
    if (!toggleBtn) return;

    const body = document.body;
    const savedTheme = localStorage.getItem("theme");

    // 1. Aplicar modo guardado
    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        toggleBtn.setAttribute("aria-label", "Activar modo claro");
    } else {
        body.classList.remove("dark-theme");
        toggleBtn.setAttribute("aria-label", "Activar modo oscuro");
    }

    // 2. Evento de click
    toggleBtn.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark-theme");

        if (isDark) {
            localStorage.setItem("theme", "dark");
            toggleBtn.setAttribute("aria-label", "Activar modo claro");
        } else {
            localStorage.setItem("theme", "light");
            toggleBtn.setAttribute("aria-label", "Activar modo oscuro");
        }
    });
});

