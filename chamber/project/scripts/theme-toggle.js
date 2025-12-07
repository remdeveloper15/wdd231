const THEME_KEY = "helaman-tech-theme";

export function initThemeToggle() {
  const toggleButton = document.querySelector("#theme-toggle");

  if (!toggleButton) return;

  // Cargar tema guardado
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const isDark = document.body.classList.contains("dark-theme");
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  });
}
