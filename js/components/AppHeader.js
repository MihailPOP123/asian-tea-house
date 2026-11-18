/**
 * AppHeader.js — Шапка приложения с адаптивной навигацией,
 * разграничением прав доступа по ролям (user vs admin)
 * и быстрым переходом в профиль пользователя
 */

window.AppHeader = {
  name: 'AppHeader',
  components: {
    'dark-mode-toggle': window.DarkModeToggle
  },
  props: {
    currentView: {
      type: String,
      default: 'home'
    },
    currentUser: {
      type: Object,
      default: null
    },
    isDark: {
      type: Boolean,
      default: false
    }
  },
  emits: ['navigate', 'logout', 'toggle-dark'],
  data() {
    return {
      mobileMenuOpen: false,
      dataDropdownOpen: false
    };
  },
  mounted() {
    this.handleOutsideClick = (e) => {
      if (!this.$el) return;
      const dropdownContainer = this.$el.querySelector('.nav-item.dropdown');
      if (dropdownContainer && !dropdownContainer.contains(e.target)) {
        this.dataDropdownOpen = false;
      }
    };
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    if (this.handleOutsideClick) {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  },
  methods: {
    setRoute(route) {
      this.mobileMenuOpen = false;
      this.dataDropdownOpen = false;
      this.$emit('navigate', route);
    },
    toggleDropdown() {
      this.dataDropdownOpen = !this.dataDropdownOpen;
    }
  },
  template: `
    <header class="header bg-white border-bottom shadow-sm sticky-top" style="z-index: 1040;">
      <div class="container d-flex align-items-center justify-content-between py-2">
        
        <!-- 1. Логотип слева -->
        <a href="#home" class="logo d-flex align-items-center text-decoration-none text-dark" @click.prevent="setRoute('home')">
          <span class="d-inline-flex align-items-center justify-content-center text-white font-weight-bold rounded mr-2" style="width: 32px; height: 32px; background-color: var(--accent-brown); font-family: var(--font-serif);">
            T
          </span>
          <span class="font-weight-bold" style="letter-spacing: 0.1em; font-family: var(--font-serif); font-size: 1.1rem;">
            ASIAN TEA HOUSE
          </span>
        </a>

        <!-- Бургер кнопка для мобильных экранов -->
        <button 
          class="burger-btn d-lg-none btn btn-outline-dark btn-sm px-3" 
          @click="mobileMenuOpen = !mobileMenuOpen" 
          aria-label="Открыть мобильное меню"
        >
          <span>Меню</span>
        </button>

        <!-- 2. Адаптированная навигация по центру для десктопа (сгруппированные разделы) -->
        <nav class="nav-links d-none d-lg-flex align-items-center">
          <ul class="nav align-items-center mb-0">
            
            <!-- Главная -->
            <li class="nav-item">
              <a 
                href="#home" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase"
                :class="{ 'text-success active border-bottom border-success': currentView === 'home', 'text-dark': currentView !== 'home' }"
                @click.prevent="setRoute('home')"
              >
                Главная
              </a>
            </li>

            <!-- Каталог сортов чая -->
            <li class="nav-item">
              <a 
                href="#table" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase"
                :class="{ 'text-success active border-bottom border-success': currentView === 'table', 'text-dark': currentView !== 'table' }"
                @click.prevent="setRoute('table')"
              >
                Каталог
              </a>
            </li>

            <!-- Подбор церемонии (Tailwind MultiStepForm) -->
            <li class="nav-item">
              <a 
                href="#ceremony" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase"
                :class="{ 'text-success active border-bottom border-success': currentView === 'ceremony', 'text-dark': currentView !== 'ceremony' }"
                @click.prevent="setRoute('ceremony')"
              >
                Церемонии
              </a>
            </li>

            <!-- Чат с мастером (Tailwind MessengerChat) -->
            <li class="nav-item">
              <a 
                href="#chat" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase"
                :class="{ 'text-success active border-bottom border-success': currentView === 'chat', 'text-dark': currentView !== 'chat' }"
                @click.prevent="setRoute('chat')"
              >
                Чат с мастером
              </a>
            </li>

            <!-- Аналитика и графики (Senior интеграция дашборда) -->
            <li class="nav-item">
              <a 
                href="#analytics" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase"
                :class="{ 'text-success active border-bottom border-success': currentView === 'analytics', 'text-dark': currentView !== 'analytics' }"
                @click.prevent="setRoute('analytics')"
              >
                Аналитика
              </a>
            </li>

            <!-- Сгруппированное выпадающее меню «Модули данных и Excel» для компактности -->
            <li class="nav-item dropdown position-relative">
              <a 
                href="#" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase d-flex align-items-center"
                :class="{ 'text-success active': ['excel-table', 'files', 'logs'].includes(currentView), 'text-dark': !['excel-table', 'files', 'logs'].includes(currentView) }"
                @click.prevent="toggleDropdown"
              >
                <span>Данные и Excel</span>
                <svg class="ml-1" style="width: 10px; height: 10px; fill: currentColor;" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </a>

              <!-- Выпадающий список -->
              <div 
                v-if="dataDropdownOpen" 
                class="dropdown-menu show shadow-lg border-0 py-2 mt-1 position-absolute"
                style="top: 100%; left: 0; min-width: 220px; border-radius: 8px; z-index: 1050;"
              >
                <a 
                  href="#excel-table" 
                  class="dropdown-item py-2 small font-weight-medium"
                  :class="{ 'text-success font-weight-bold bg-light': currentView === 'excel-table' }"
                  @click.prevent="setRoute('excel-table')"
                >
                  Таблица Excel (Загрузка)
                </a>
                <a 
                  href="#files" 
                  class="dropdown-item py-2 small font-weight-medium"
                  :class="{ 'text-success font-weight-bold bg-light': currentView === 'files' }"
                  @click.prevent="setRoute('files')"
                >
                  Хранилище файлов Excel
                </a>
                <a 
                  href="#logs" 
                  class="dropdown-item py-2 small font-weight-medium"
                  :class="{ 'text-success font-weight-bold bg-light': currentView === 'logs' }"
                  @click.prevent="setRoute('logs')"
                >
                  Журнал действий и Compare
                </a>
              </div>
            </li>

            <!-- Лаборатория Tailwind CSS 3.4+ -->
            <li class="nav-item">
              <a 
                href="#tailwind" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase d-flex align-items-center"
                :class="{ 'text-success active border-bottom border-success': currentView === 'tailwind', 'text-dark': currentView !== 'tailwind' }"
                @click.prevent="setRoute('tailwind')"
              >
                <span>Лаборатория Tailwind</span>
                <span class="text-success font-weight-bold ml-1.5" style="font-size: 0.72rem; letter-spacing: 0.05em;">v3.4</span>
              </a>
            </li>

            <!-- Voyager Админ — СТРОГО ТОЛЬКО ДЛЯ РОЛИ 'admin' (Требование 3) -->
            <!-- Для обычного покупателя (role: 'user') этот пункт скрыт! -->
            <li class="nav-item" v-if="currentUser && currentUser.role === 'admin'">
              <a 
                href="#admin" 
                class="nav-link font-weight-bold px-2.5 small text-uppercase text-danger"
                :class="{ 'active border-bottom border-danger': currentView === 'admin' }"
                @click.prevent="setRoute('admin')"
                title="Панель администратора (доступно только роли admin)"
              >
                Voyager Админ
              </a>
            </li>

          </ul>
        </nav>

        <!-- 3. Пользовательский блок справа с переключателем темы и профилем -->
        <div class="user-action-block d-flex align-items-center">
          
          <!-- Классический переключатель темы (Солнце / Луна) -->
          <div class="mr-3">
            <dark-mode-toggle :is-dark="isDark" @toggle-dark="$emit('toggle-dark')"></dark-mode-toggle>
          </div>
          
          <!-- Авторизованный пользователь (клик открывает профиль, без лишних кнопок в шапке) -->
          <div v-if="currentUser" class="d-flex align-items-center">
            
            <!-- Кликабельная карточка профиля в шапке -->
            <div 
              class="d-flex align-items-center p-1 rounded cursor-pointer profile-nav-badge"
              @click="setRoute('profile')"
              title="Открыть личный кабинет"
              style="cursor: pointer;"
            >
              <!-- Круглый мини-аватар -->
              <div 
                class="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center font-weight-bold mr-2 shadow-sm"
                style="width: 34px; height: 34px; font-size: 0.9rem;"
              >
                {{ currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U' }}
              </div>

              <!-- Имя и роль -->
              <div class="d-none d-sm-block text-left" style="line-height: 1.15;">
                <div class="small font-weight-bold text-dark">{{ currentUser.name }}</div>
                <span 
                  class="font-weight-bold" 
                  :class="{
                    'text-danger': currentUser.role === 'admin',
                    'text-info': currentUser.role === 'manager',
                    'text-success': currentUser.role === 'user'
                  }"
                  style="font-size: 0.65rem; letter-spacing: 0.05em;"
                >
                  {{ currentUser.role === 'admin' ? 'Администратор' : (currentUser.role === 'manager' ? 'Менеджер' : 'Покупатель') }}
                </span>
              </div>
            </div>

          </div>

          <!-- Гость (не авторизован) -->
          <div v-else class="d-flex align-items-center">
            <button 
              class="btn text-white btn-sm px-3 shadow-sm font-weight-bold" 
              style="background-color: var(--accent-brown);"
              @click="setRoute('auth')"
            >
              Войти / Регистрация
            </button>
          </div>

        </div>

      </div>

      <!-- Мобильное раскрывающееся меню -->
      <div v-if="mobileMenuOpen" class="d-lg-none bg-white border-top py-3 px-4 shadow-sm animate-fade-in">
        <ul class="nav flex-column mb-0">
          <li class="nav-item py-1">
            <a href="#home" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('home')">Главная</a>
          </li>
          <li class="nav-item py-1">
            <a href="#table" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('table')">Каталог чая</a>
          </li>
          <li class="nav-item py-1">
            <a href="#ceremony" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('ceremony')">Подбор церемонии</a>
          </li>
          <li class="nav-item py-1">
            <a href="#chat" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('chat')">Чат с сомелье</a>
          </li>
          <li class="nav-item py-1">
            <a href="#analytics" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('analytics')">Аналитика и графики</a>
          </li>
          <li class="nav-item py-1">
            <a href="#excel-table" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('excel-table')">Таблица Excel</a>
          </li>
          <li class="nav-item py-1">
            <a href="#files" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('files')">Файлы хранилища</a>
          </li>
          <li class="nav-item py-1">
            <a href="#logs" class="nav-link text-dark font-weight-bold px-0" @click.prevent="setRoute('logs')">Журнал действий</a>
          </li>
          <li class="nav-item py-1">
            <a href="#tailwind" class="nav-link text-success font-weight-bold px-0" @click.prevent="setRoute('tailwind')">
              Лаборатория Tailwind (Уровни 1-4)
            </a>
          </li>
          
          <!-- Voyager Админ в мобильном меню ТОЛЬКО для role: 'admin' -->
          <li class="nav-item py-1" v-if="currentUser && currentUser.role === 'admin'">
            <a href="#admin" class="nav-link text-danger font-weight-bold px-0" @click.prevent="setRoute('admin')">
              Voyager Админ
            </a>
          </li>

          <!-- Ссылка на профиль в мобильном меню -->
          <li class="nav-item py-1 border-top mt-2 pt-2" v-if="currentUser">
            <a href="#profile" class="nav-link text-primary font-weight-bold px-0" @click.prevent="setRoute('profile')">
              Мой профиль ({{ currentUser.name }})
            </a>
          </li>
          <li class="nav-item py-1" v-if="currentUser">
            <a href="#" class="nav-link text-danger px-0" @click.prevent="$emit('logout'); mobileMenuOpen = false;">
              Выйти из аккаунта
            </a>
          </li>
          <li class="nav-item py-1" v-else>
            <a href="#auth" class="nav-link text-success font-weight-bold px-0" @click.prevent="setRoute('auth')">
              Войти в систему
            </a>
          </li>
          <li class="nav-item py-2 border-top mt-2 d-flex align-items-center justify-content-between text-muted small">
            <span>Тема оформления (светлая / темная):</span>
            <dark-mode-toggle :is-dark="isDark" @toggle-dark="$emit('toggle-dark')"></dark-mode-toggle>
          </li>
        </ul>
      </div>
    </header>
  `
};
