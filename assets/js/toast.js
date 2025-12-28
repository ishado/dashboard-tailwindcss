const Toast = {
  container: null,
  toasts: [],
  initialized: false,

  init() {
    if (this.initialized) return;
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = this.createContainer();
      document.body.appendChild(this.container);
    }
    this.initialized = true;
  },

  createContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 end-4 z-[100] flex flex-col gap-2';
    return container;
  },

  show(message, type = 'info', duration = 5000) {
    if (!this.initialized) {
      this.init();
    }
    const toast = this.createToast(message, type, duration);
    this.container.appendChild(toast);
    this.toasts.push(toast);

    requestAnimationFrame(() => {
      toast.classList.add('toast-enter');
    });

    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }

    return toast;
  },

  createToast(message, type, duration = 5000) {
    const toast = document.createElement('div');
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    toast.className = `toast flex items-center gap-3 min-w-[320px] max-w-sm p-4 rounded-lg shadow-lg border transform transition-all duration-300 opacity-0 ${isRTL ? '-translate-x-full' : 'translate-x-full'}`;
    
    const config = {
      success: {
        bg: 'bg-white dark:bg-dark-surface',
        border: 'border-green-200 dark:border-green-800',
        icon: `<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        titleClass: 'text-green-800 dark:text-green-200'
      },
      error: {
        bg: 'bg-white dark:bg-dark-surface',
        border: 'border-red-200 dark:border-red-800',
        icon: `<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        titleClass: 'text-red-800 dark:text-red-200'
      },
      warning: {
        bg: 'bg-white dark:bg-dark-surface',
        border: 'border-yellow-200 dark:border-yellow-800',
        icon: `<svg class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
        titleClass: 'text-yellow-800 dark:text-yellow-200'
      },
      info: {
        bg: 'bg-white dark:bg-dark-surface',
        border: 'border-blue-200 dark:border-blue-800',
        icon: `<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        titleClass: 'text-blue-800 dark:text-blue-200'
      }
    };

    const style = config[type] || config.info;
    toast.classList.add(...style.bg.split(' '), ...style.border.split(' '));

    toast.innerHTML = `
      <div class="flex-shrink-0">${style.icon}</div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium ${style.titleClass}">${message}</p>
      </div>
      <button class="toast-close flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      ${this.createProgressBar(duration)}
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.dismiss(toast));

    return toast;
  },

  createProgressBar(duration) {
    if (duration <= 0) return '';
    return `<div class="toast-progress absolute bottom-0 start-0 h-0.5 bg-current opacity-30 transition-all duration-300" style="width: 100%; animation: toast-progress ${duration}ms linear forwards"></div>`;
  },

  dismiss(toast) {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
      this.toasts = this.toasts.filter(t => t !== toast);
    }, 300);
  },

  clear() {
    this.toasts.forEach(toast => this.dismiss(toast));
  },

  success(message, duration) {
    return this.show(message, 'success', duration);
  },

  error(message, duration) {
    return this.show(message, 'error', duration);
  },

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  },

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
};

const styles = `
  @keyframes toast-progress {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  .toast {
    position: relative;
    overflow: hidden;
  }
  
  .toast-enter {
    opacity: 1;
    transform: translateX(0);
  }
  
  .toast-exit {
    opacity: 0;
  }

  [dir="ltr"] .toast-exit {
    transform: translateX(100%);
  }
  
  [dir="rtl"] .toast-exit {
    transform: translateX(-100%);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
