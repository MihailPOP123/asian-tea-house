/**
 * main.js — Главный скрипт инициализации Vue 3 приложения
 * Адаптация проекта Asian Tea House на Vue.js
 */

const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      currentView: 'home', // 'home' | 'table' | 'logs' | 'files' | 'admin' | 'auth'
      currentUser: (function() {
        try {
          const raw = localStorage.getItem('asian_tea_current_user_v1');
          if (raw) return JSON.parse(raw);
          if (window.DEFAULT_USERS && window.DEFAULT_USERS.length > 0) {
            localStorage.setItem('asian_tea_current_user_v1', JSON.stringify(window.DEFAULT_USERS[0]));
            return window.DEFAULT_USERS[0];
          }
        } catch (e) {
          console.error(e);
        }
        return null;
      })(),
      teas: [],
      toasts: [],
      isDark: (function() {
        try {
          return localStorage.getItem('asian_tea_theme') === 'dark';
        } catch (e) {
          return false;
        }
      })(),

      // Модальное окно ошибки неподходящего формата файла (Требование 1)
      showErrorModal: false,
      errorModalInfo: {
        fileName: '',
        fileType: '',
        fileSize: ''
      }
    };
  },
  components: {
    'ad-slot': window.AdSlot,
    'app-header': window.AppHeader,
    'excel-uploader': window.ExcelUploader,
    'excel-table': window.ExcelTable,
    'error-modal': window.ErrorModal,
    'tea-modal': window.TeaModal,
    'compare-modal': window.CompareModal,
    'toast-notification': window.ToastNotification,
    'home-view': window.HomeView,
    'auth-view': window.AuthView,
    'table-view': window.TableView,
    'excel-table-view': window.ExcelTableView,
    'logs-view': window.LogsView,
    'files-view': window.FilesView,
    'admin-view': window.AdminView,
    'analytics-view': window.AnalyticsView,
    'chat-view': window.ChatView,
    'ceremony-view': window.CeremonyView,
    'tailwind-lab-view': window.TailwindLabView,
    'profile-card': window.ProfileCard,
    'tailwind-navbar': window.TailwindNavbar,
    'product-grid': window.ProductGrid,
    'gradient-hero': window.GradientHero,
    'pricing-table': window.PricingTable,
    'sidebar-dashboard': window.SidebarDashboard,
    'register-form': window.RegisterForm,
    'messenger-chat': window.MessengerChat,
    'kanban-board': window.KanbanBoard,
    'tailwind-landing': window.TailwindLanding,
    'dark-mode-toggle': window.DarkModeToggle,
    'analytics-dashboard': window.AnalyticsDashboard,
    'multi-step-form': window.MultiStepForm,
    'ecommerce-catalog': window.EcommerceCatalog,
    'design-system-showcase': window.DesignSystemShowcase,
    'profile-view': window.ProfileView
  },
  async mounted() {
    // 1. Загрузка текущего пользователя (с сохранением резервной сессии)
    try {
      this.currentUser = await window.AuthService.getCurrentUser();
    } catch (e) {
      console.warn('Не удалось загрузить пользователя:', e);
    }

    // 2. Первоначальная загрузка списка сортов чая
    await this.refreshTeas();

    // 3. Обработка маршрутизации по хэшу URL (#table, #logs, #excel-section и т.д.)
    this.initHashRouting();

    // 4. Применение темной темы при инициализации
    if (this.isDark) {
      document.documentElement.classList.add('dark');
    }
  },
  methods: {
    async refreshTeas() {
      try {
        this.teas = await window.TeaApiService.getAll();
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
      }
    },

    navigate(view) {
      // Защита доступа к Voyager Админ для роли user (Требование 3)
      if (view === 'admin' && (!this.currentUser || this.currentUser.role !== 'admin')) {
        this.addToast({
          type: 'danger',
          title: 'Доступ ограничен',
          message: 'Раздел Voyager Админ доступен только пользователям с ролью Администратор.'
        });
        this.currentView = 'home';
        window.location.hash = 'home';
        return;
      }

      this.currentView = view;
      window.location.hash = view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    toggleDarkMode() {
      this.isDark = !this.isDark;
      try {
        localStorage.setItem('asian_tea_theme', this.isDark ? 'dark' : 'light');
      } catch (e) {}
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },

    initHashRouting() {
      const handleHash = () => {
        const hash = window.location.hash.replace('#', '').trim();
        if (hash === 'excel' || hash === 'excel-section' || hash === 'excel-table' || hash === 'excel-table-section') {
          this.currentView = 'excel-table';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (hash === 'tailwind' || hash === 'tailwind-lab' || hash.startsWith('tw-')) {
          this.currentView = 'tailwind';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (hash === 'analytics' || hash === 'charts' || hash === 'sales-dashboard') {
          this.currentView = 'analytics';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (hash === 'chat' || hash === 'messenger' || hash === 'sommelier-chat') {
          this.currentView = 'chat';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (hash === 'ceremony' || hash === 'order-wizard' || hash === 'quiz' || hash === 'custom-order') {
          this.currentView = 'ceremony';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        // Защита прямого перехода по URL #admin
        if (hash === 'admin' && (!this.currentUser || this.currentUser.role !== 'admin')) {
          this.currentView = 'home';
          window.location.hash = 'home';
          this.addToast({
            type: 'danger',
            title: 'Доступ ограничен',
            message: 'Раздел Voyager Админ доступен только пользователям с ролью Администратор.'
          });
          return;
        }

        const validViews = ['home', 'table', 'excel-table', 'logs', 'files', 'admin', 'auth', 'tailwind', 'profile', 'analytics', 'chat', 'ceremony'];
        if (validViews.includes(hash)) {
          this.currentView = hash;
        }
      };

      window.addEventListener('hashchange', handleHash);
      if (window.location.hash) {
        handleHash();
      }
    },

    handleUserUpdated(user) {
      this.currentUser = user;
    },

    // Обработка ошибки формата файла из загрузчика Excel
    handleFileError(info) {
      this.errorModalInfo = info;
      this.showErrorModal = true;
    },

    // Обработка успешного импорта
    async handleImportSuccess({ fileName, count }) {
      await this.refreshTeas();
      this.addToast({
        type: 'success',
        title: 'Файл Excel успешно обработан',
        message: `Из файла «${fileName}» импортировано ${count} сортов чая в отдельную таблицу Excel и сохранен файл.`
      });
    },

    handleAuthSuccess(user) {
      this.currentUser = user;
    },

    async handleLogout() {
      await window.AuthService.logout();
      this.currentUser = null;
      this.addToast({
        type: 'info',
        title: 'Сеанс завершен',
        message: 'Вы вышли из учетной записи.'
      });
      this.navigate('home');
    },

    addToast({ type = 'info', title = '', message = '' }) {
      const toastId = Date.now() + Math.random();
      this.toasts.push({ id: toastId, type, title, message });

      // Автоматическое скрытие через 4.5 секунды
      setTimeout(() => {
        this.dismissToast(toastId);
      }, 4500);
    },

    dismissToast(id) {
      this.toasts = this.toasts.filter(t => t.id !== id);
    }
  }
});

// Глобальная регистрация всех компонентов для гарантированной доступности во всех представлениях и дочерних компонентах
if (window.AdSlot) app.component('ad-slot', window.AdSlot);
if (window.AppHeader) app.component('app-header', window.AppHeader);
if (window.ExcelUploader) app.component('excel-uploader', window.ExcelUploader);
if (window.ExcelTable) app.component('excel-table', window.ExcelTable);
if (window.ErrorModal) app.component('error-modal', window.ErrorModal);
if (window.TeaModal) app.component('tea-modal', window.TeaModal);
if (window.CompareModal) app.component('compare-modal', window.CompareModal);
if (window.ToastNotification) app.component('toast-notification', window.ToastNotification);
if (window.HomeView) app.component('home-view', window.HomeView);
if (window.AuthView) app.component('auth-view', window.AuthView);
if (window.TableView) app.component('table-view', window.TableView);
if (window.ExcelTableView) app.component('excel-table-view', window.ExcelTableView);
if (window.LogsView) app.component('logs-view', window.LogsView);
if (window.FilesView) app.component('files-view', window.FilesView);
if (window.AdminView) app.component('admin-view', window.AdminView);
if (window.ProfileView) app.component('profile-view', window.ProfileView);
if (window.TailwindLabView) app.component('tailwind-lab-view', window.TailwindLabView);
if (window.ProfileCard) app.component('profile-card', window.ProfileCard);
if (window.TailwindNavbar) app.component('tailwind-navbar', window.TailwindNavbar);
if (window.ProductGrid) app.component('product-grid', window.ProductGrid);
if (window.GradientHero) app.component('gradient-hero', window.GradientHero);
if (window.PricingTable) app.component('pricing-table', window.PricingTable);
if (window.SidebarDashboard) app.component('sidebar-dashboard', window.SidebarDashboard);
if (window.RegisterForm) app.component('register-form', window.RegisterForm);
if (window.MessengerChat) app.component('messenger-chat', window.MessengerChat);
if (window.KanbanBoard) app.component('kanban-board', window.KanbanBoard);
if (window.TailwindLanding) app.component('tailwind-landing', window.TailwindLanding);
if (window.DarkModeToggle) app.component('dark-mode-toggle', window.DarkModeToggle);
if (window.AnalyticsDashboard) app.component('analytics-dashboard', window.AnalyticsDashboard);
if (window.MultiStepForm) app.component('multi-step-form', window.MultiStepForm);
if (window.EcommerceCatalog) app.component('ecommerce-catalog', window.EcommerceCatalog);
if (window.DesignSystemShowcase) app.component('design-system-showcase', window.DesignSystemShowcase);

// Монтирование приложения к элементу #app
app.mount('#app');
