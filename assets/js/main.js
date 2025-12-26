const DirectionManager = {
  init() {
    this.loadDirection();
    this.loadTheme();
    this.bindEvents();
  },

  loadDirection() {
    const savedDir = localStorage.getItem('direction') || 'rtl';
    document.documentElement.setAttribute('dir', savedDir);
    this.updateDirectionUI(savedDir);
  },

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    this.updateThemeUI(savedTheme);
  },

  bindEvents() {
    const dirToggle = document.getElementById('dirToggle');
    const themeToggle = document.getElementById('themeToggle');

    if (dirToggle) {
      dirToggle.addEventListener('click', () => this.toggleDirection());
    }

    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  },

  toggleDirection() {
    const currentDir = document.documentElement.getAttribute('dir');
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('direction', newDir);
    this.updateDirectionUI(newDir);
  },

  toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.updateThemeUI(isDark ? 'dark' : 'light');
  },

  updateDirectionUI(dir) {
    const dirToggle = document.getElementById('dirToggle');
    if (dirToggle) {
      dirToggle.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }
  },

  updateThemeUI(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      if (theme === 'dark') {
        themeToggle.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
        `;
      } else {
        themeToggle.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
        `;
      }
    }
  }
};

const Sidebar = {
  init() {
    this.bindEvents();
  },

  bindEvents() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        sidebarOverlay.classList.toggle('hidden');
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DirectionManager.init();
  Sidebar.init();
});
