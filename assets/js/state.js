class Store {
  constructor(options = {}) {
    this.state = options.state || {};
    this.mutations = options.mutations || {};
    this.actions = options.actions || {};
    this.getters = options.getters || {};
    this.subscribers = [];
    this.cache = new Map();
  }

  getState() {
    return { ...this.state };
  }

  commit(mutationName, payload) {
    const mutation = this.mutations[mutationName];
    if (mutation) {
      mutation(this.state, payload);
      this.notify();
    } else {
      console.warn(`Mutation "${mutationName}" not found`);
    }
  }

  dispatch(actionName, payload) {
    const action = this.actions[actionName];
    if (action) {
      return action(this, payload);
    } else {
      console.warn(`Action "${actionName}" not found`);
      return Promise.resolve();
    }
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notify() {
    const state = this.getState();
    this.subscribers.forEach(callback => callback(state));
  }

  get(getterName) {
    if (this.cache.has(getterName)) {
      return this.cache.get(getterName);
    }

    const getter = this.getters[getterName];
    if (getter) {
      const result = getter(this.state);
      this.cache.set(getterName, result);
      return result;
    }

    console.warn(`Getter "${getterName}" not found`);
    return undefined;
  }

  clearCache() {
    this.cache.clear();
  }
}

const appStore = new Store({
  state: {
    user: null,
    isAuthenticated: false,
    theme: localStorage.getItem('theme') || 'light',
    direction: localStorage.getItem('direction') || 'rtl',
    notifications: [],
    sidebarCollapsed: false,
    loading: false,
    error: null
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
      state.isAuthenticated = !!user;
    },
    
    setTheme(state, theme) {
      state.theme = theme;
      localStorage.setItem('theme', theme);
    },
    
    setDirection(state, direction) {
      state.direction = direction;
      localStorage.setItem('direction', direction);
    },
    
    addNotification(state, notification) {
      state.notifications.push({
        id: Date.now(),
        ...notification,
        timestamp: new Date().toISOString()
      });
    },
    
    removeNotification(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id);
    },
    
    clearNotifications(state) {
      state.notifications = [];
    },
    
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    
    setLoading(state, loading) {
      state.loading = loading;
    },
    
    setError(state, error) {
      state.error = error;
    }
  },

  actions: {
    async login({ commit }, credentials) {
      commit('setLoading', true);
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        
        if (!response.ok) throw new Error('Login failed');
        
        const user = await response.json();
        commit('setUser', user);
        commit('setError', null);
        return user;
      } catch (error) {
        commit('setError', error.message);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    
    logout({ commit }) {
      commit('setUser', null);
      commit('clearNotifications');
    },
    
    switchTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      commit('setTheme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    },
    
    switchDirection({ commit, state }) {
      const newDirection = state.direction === 'rtl' ? 'ltr' : 'rtl';
      commit('setDirection', newDirection);
      document.documentElement.setAttribute('dir', newDirection);
    },
    
    async fetchUser({ commit }) {
      commit('setLoading', true);
      try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Failed to fetch user');
        
        const user = await response.json();
        commit('setUser', user);
        return user;
      } catch (error) {
        commit('setError', error.message);
        throw error;
      } finally {
        commit('setLoading', false);
      }
    },
    
    showNotification({ commit }, notification) {
      commit('addNotification', notification);
      if (typeof Toast !== 'undefined') {
        Toast.show(notification.message, notification.type || 'info', notification.duration);
      }
      
      if (notification.duration && notification.duration > 0) {
        setTimeout(() => {
          commit('removeNotification', notification.id);
        }, notification.duration);
      }
    }
  },

  getters: {
    isLoggedIn: state => !!state.user,
    userName: state => state.user?.name || '',
    userRole: state => state.user?.role || 'guest',
    unreadNotifications: state => state.notifications.filter(n => !n.read),
    isDarkMode: state => state.theme === 'dark',
    isRTL: state => state.direction === 'rtl'
  }
});

const StateManager = {
  store: appStore,
  
  init() {
    const { state } = this.store;
    
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
    document.documentElement.setAttribute('dir', state.direction);
    
    this.store.subscribe((newState) => {
      document.documentElement.classList.toggle('dark', newState.theme === 'dark');
      document.documentElement.setAttribute('dir', newState.direction);
    });
  },
  
  dispatch(actionName, payload) {
    return this.store.dispatch(actionName, payload);
  },
  
  commit(mutationName, payload) {
    this.store.commit(mutationName, payload);
  },
  
  get(getterName) {
    return this.store.get(getterName);
  },
  
  subscribe(callback) {
    return this.store.subscribe(callback);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  StateManager.init();
});
