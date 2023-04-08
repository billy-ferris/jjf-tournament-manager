(function initTheme() {
  const isDarkMode =
    localStorage.theme !== "light" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  if (isDarkMode) {
    document.querySelector(".js-theme").classList.add("dark");
  }
})();
