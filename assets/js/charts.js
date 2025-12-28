let charts = {};

const ChartManager = {
  init() {
    this.initDashboardCharts();
  },

  createChart(canvasId, type, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    if (charts[canvasId]) {
      charts[canvasId].destroy();
    }

    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          rtl: document.documentElement.dir === 'rtl',
          labels: {
            font: {
              family: 'Cairo'
            },
            color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#374151'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: document.documentElement.classList.contains('dark') ? '#334155' : '#e5e7eb'
          },
          ticks: {
            font: {
              family: 'Cairo'
            },
            color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#6b7280'
          }
        },
        y: {
          grid: {
            color: document.documentElement.classList.contains('dark') ? '#334155' : '#e5e7eb'
          },
          ticks: {
            font: {
              family: 'Cairo'
            },
            color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#6b7280'
          }
        }
      }
    };

    const mergedOptions = this.mergeDeep(defaultOptions, options);

    charts[canvasId] = new Chart(ctx, {
      type: type,
      data: data,
      options: mergedOptions
    });

    return charts[canvasId];
  },

  updateChart(canvasId, newData) {
    if (charts[canvasId]) {
      charts[canvasId].data = newData;
      charts[canvasId].update();
    }
  },

  destroyChart(canvasId) {
    if (charts[canvasId]) {
      charts[canvasId].destroy();
      delete charts[canvasId];
    }
  },

  destroyAll() {
    Object.keys(charts).forEach(canvasId => {
      this.destroyChart(canvasId);
    });
  },

  initDashboardCharts() {
    this.initRevenueChart();
    this.initUsersChart();
    this.initOrdersChart();
  },

  initRevenueChart() {
    const data = {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
      datasets: [{
        label: 'الإيرادات',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 35000],
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: 'rgba(14, 165, 233, 1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'الإيرادات الشهرية',
          font: {
            size: 16,
            family: 'Cairo'
          },
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#374151'
        }
      }
    };

    this.createChart('revenueChart', 'line', data, options);
  },

  initUsersChart() {
    const data = {
      labels: ['جديد', 'نشط', 'غير نشط'],
      datasets: [{
        label: 'المستخدمين',
        data: [120, 80, 45],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 0
      }]
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'حالة المستخدمين',
          font: {
            size: 16,
            family: 'Cairo'
          },
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#374151'
        }
      }
    };

    this.createChart('usersChart', 'doughnut', data, options);
  },

  initOrdersChart() {
    const data = {
      labels: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
      datasets: [{
        label: 'الطلبات',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(99, 102, 241, 0.8)'
        ],
        borderWidth: 0
      }]
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: 'الطلبات الأسبوعية',
          font: {
            size: 16,
            family: 'Cairo'
          },
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#374151'
        }
      }
    };

    this.createChart('ordersChart', 'bar', data, options);
  },

  createLineChart(canvasId, labels, datasets, title) {
    const data = { labels, datasets };
    const options = {
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16, family: 'Cairo' },
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#374151'
        }
      }
    };
    return this.createChart(canvasId, 'line', data, options);
  },

  createBarChart(canvasId, labels, datasets, title) {
    const data = { labels, datasets };
    const options = {
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16, family: 'Cairo' },
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#374151'
        }
      }
    };
    return this.createChart(canvasId, 'bar', data, options);
  },

  createPieChart(canvasId, labels, data, title) {
    const chartData = {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          'rgba(14, 165, 233, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderWidth: 0
      }]
    };

    const options = {
      plugins: {
        title: {
          display: true,
          text: title,
          font: { size: 16, family: 'Cairo' },
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#374151'
        }
      }
    };

    return this.createChart(canvasId, 'pie', chartData, options);
  },

  mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return this.mergeDeep(target, ...sources);
  },

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ChartManager.init();
});
