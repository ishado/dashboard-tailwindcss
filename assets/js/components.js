const Modal = {
  activeModal: null,

  open(id, options = {}) {
    const modal = document.getElementById(id);
    if (!modal) {
      console.error(`Modal with id "${id}" not found`);
      return;
    }
 
    const content = modal.querySelector('.modal-content');
    const backdrop = modal.querySelector('.modal-backdrop');

    if (!content || !backdrop) {
      console.error(`Modal content or backdrop not found for "${id}"`);
      return;
    }
 
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    requestAnimationFrame(() => {
      content.classList.add('show');
    });

    if (options.onOpen) {
      options.onOpen(modal);
    }

    document.body.style.overflow = 'hidden';
    this.activeModal = modal;
  },

  close(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    const content = modal.querySelector('.modal-content');

    content.classList.remove('show');

    setTimeout(() => {
      modal.classList.add('hidden');
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);

    this.activeModal = null;
  },

  closeAll() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      this.close(modal.id);
    });
  },

  init() {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const modalId = trigger.getAttribute('data-modal');
        if (modalId) {
          this.open(modalId);
        }
      });
    });

    document.querySelectorAll('[data-modal-close]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = trigger.closest('.modal');
        if (modal) {
          this.close(modal.id);
        }
      });
    });

    document.querySelectorAll('.modal').forEach(modal => {
      const backdrop = modal.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          this.close(modal.id);
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close(this.activeModal.id);
      }
    });
  }
};

const Dropdown = {
  activeDropdown: null,

  toggle(id) {
    const dropdown = document.getElementById(id);
    if (!dropdown) return;

    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (this.activeDropdown && this.activeDropdown !== dropdown) {
      this.close(this.activeDropdown.id);
    }

    menu.classList.toggle('show');
    this.activeDropdown = menu.classList.contains('show') ? dropdown : null;
  },

  open(id) {
    const dropdown = document.getElementById(id);
    if (!dropdown) return;

    const menu = dropdown.querySelector('.dropdown-menu');
    menu.classList.add('show');
    this.activeDropdown = dropdown;
  },

  close(id) {
    const dropdown = document.getElementById(id);
    if (!dropdown) return;

    const menu = dropdown.querySelector('.dropdown-menu');
    menu.classList.remove('show');
    
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    }
  },

  closeAll() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
    this.activeDropdown = null;
  },

  init() {
    document.querySelectorAll('[data-dropdown]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dropdownId = trigger.closest('[id]').id;
        this.toggle(dropdownId);
      });
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const dropdown = item.closest('.dropdown');
        if (dropdown) {
          this.close(dropdown.id);
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.closeAll();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAll();
      }
    });
  }
};

const Tabs = {
  activate(tabId, contentId) {
    const tabs = document.querySelectorAll(`[data-tabs-group="${tabId}"] [data-tab]`);
    const contents = document.querySelectorAll(`[data-tabs-group="${tabId}"] [data-tab-content]`);

    tabs.forEach(tab => {
      if (tab.getAttribute('data-tab') === contentId) {
        tab.classList.add('active');
        tab.classList.add('bg-primary-600', 'text-white');
        tab.classList.remove('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-100', 'dark:hover:bg-gray-800');
      } else {
        tab.classList.remove('active');
        tab.classList.remove('bg-primary-600', 'text-white');
        tab.classList.add('text-gray-600', 'dark:text-gray-400', 'hover:bg-gray-100', 'dark:hover:bg-gray-800');
      }
    });

    contents.forEach(content => {
      if (content.getAttribute('data-tab-content') === contentId) {
        content.classList.remove('hidden');
      } else {
        content.classList.add('hidden');
      }
    });
  },

  init() {
    document.querySelectorAll('[data-tab]').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = tab.closest('[data-tabs-group]').getAttribute('data-tabs-group');
        const contentId = tab.getAttribute('data-tab');
        this.activate(tabId, contentId);
      });
    });
  }
};

const Accordion = {
  toggle(id) {
    const accordion = document.getElementById(id);
    if (!accordion) return;

    const content = accordion.querySelector('[data-accordion-content]');
    const icon = accordion.querySelector('[data-accordion-icon]');
    
    const isOpen = !content.classList.contains('hidden');
    
    if (isOpen) {
      content.classList.add('hidden');
      if (icon) {
        icon.style.transform = 'rotate(0deg)';
      }
    } else {
      content.classList.remove('hidden');
      if (icon) {
        icon.style.transform = 'rotate(180deg)';
      }
    }
  },

  open(id) {
    const accordion = document.getElementById(id);
    if (!accordion) return;

    const content = accordion.querySelector('[data-accordion-content]');
    const icon = accordion.querySelector('[data-accordion-icon]');
    
    content.classList.remove('hidden');
    if (icon) {
      icon.style.transform = 'rotate(180deg)';
    }
  },

  close(id) {
    const accordion = document.getElementById(id);
    if (!accordion) return;

    const content = accordion.querySelector('[data-accordion-content]');
    const icon = accordion.querySelector('[data-accordion-icon]');
    
    content.classList.add('hidden');
    if (icon) {
      icon.style.transform = 'rotate(0deg)';
    }
  },

  init() {
    document.querySelectorAll('[data-accordion]').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const accordionId = trigger.closest('[id]').id;
        this.toggle(accordionId);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Modal.init();
  Dropdown.init();
  Tabs.init();
  Accordion.init();
});
