(() => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let theme;
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      theme = savedTheme;
      document.documentElement.dataset.theme = theme;
    }
  } catch {
    // System appearance still applies when storage is unavailable.
  }

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.theme-toggle');
    const isDark = () => theme ? theme === 'dark' : preference.matches;
    const syncButton = () => button.setAttribute('aria-pressed', String(isDark()));

    button.addEventListener('click', () => {
      theme = isDark() ? 'light' : 'dark';
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem('theme', theme);
      } catch {
        // The current page still reflects the selection.
      }
      syncButton();
    });
    preference.addEventListener('change', syncButton);
    syncButton();
    button.hidden = false;
  });
})();
