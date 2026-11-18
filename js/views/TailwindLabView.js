/**
 * TailwindLabView.js — Интерактивная лаборатория вёрстки на Tailwind CSS 3.4+
 * Объединяет все 4 уровня заданий:
 * - Уровень 1: Карточка профиля, Навбар без JS, Сетка карточек товаров
 * - Уровень 2: Hero с градиентом, Pricing-таблица, Сайдбар+контент, Форма регистрации
 * - Уровень 3: Мессенджер, Kanban-доска, Комплексный лендинг с @apply, Dark mode
 * - Уровень 4: Дашборд аналитики, Многошаговая форма, E-commerce каталог с container queries, Дизайн-система
 */

window.TailwindLabView = {
  name: 'TailwindLabView',
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['navigate', 'toast'],
  data() {
    return {
      activeTab: 'all', // 'all' | 'level1' | 'level2' | 'level3' | 'level4' | 'design-system'
      isDarkMode: false,
      viewportWidth: 'w-full', // 'w-full' | 'max-w-sm' (384px) | 'max-w-2xl' (672px) | 'max-w-5xl' (1024px)
      viewportLabel: '100% (Респонсив)'
    };
  },
  components: {
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
    'design-system-showcase': window.DesignSystemShowcase
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setViewport(widthClass, label) {
      this.viewportWidth = widthClass;
      this.viewportLabel = label;
    },
    handleAddToCart(product) {
      this.$emit('toast', {
        type: 'success',
        title: 'Корзина обновлена',
        message: 'Товар «' + product.name + '» добавлен в заказ.'
      });
    }
  },
  template: `
    <div :class="{ 'dark': isDarkMode }" class="w-full min-h-screen transition-colors duration-300 py-8 px-3 sm:px-6" style="background-color: var(--bg-color); color: var(--text-main);">
      
      <!-- ВЕРХНЯЯ СЕРВИСНАЯ ПАНЕЛЬ ЛАБОРАТОРИИ TAILWIND (В стиле Asian Tea House) -->
      <section class="max-w-7xl mx-auto mb-8 bg-white dark:bg-[#1E2823] rounded-3xl p-6 sm:p-8 border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
        
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5E0D8] dark:border-[#2C3B34]">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-bold mb-2 tracking-widest uppercase" style="color: var(--accent-brown);">
              <span class="w-2 h-2 rounded-full animate-pulse" style="background-color: var(--accent-brown);"></span>
              <span>Традиции вёрстки &middot; Tailwind CSS v3.4+ &middot; Mobile-First</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-bold tracking-tight text-dark dark:text-white" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Лаборатория вёрстки: Все 4 уровня
            </h1>
            <p class="text-xs sm:text-sm text-muted mt-1.5" style="line-height: 1.6;">
              Интерактивная чайная мастерская: от базовых компонентов до экспертных дашбордов и дизайн-системы
            </p>
          </div>

          <!-- Инструменты: Эмулятор ширины экрана и Переключатель темы -->
          <div class="flex flex-wrap items-center gap-3">
            
            <!-- Переключатель темной темы -->
            <dark-mode-toggle :is-dark="isDarkMode" @toggle-dark="toggleTheme"></dark-mode-toggle>

            <!-- Эмулятор экрана для проверки мобильной вёрстки (mobile-first) -->
            <div class="inline-flex items-center gap-1 p-1 bg-[#FAF7F2] dark:bg-[#25322B] rounded-2xl text-xs font-semibold border border-[#E5E0D8] dark:border-[#2C3B34]">
              <span class="text-[11px] text-muted px-2 font-normal hidden xl:inline">Экран:</span>
              <button 
                type="button" 
                @click="setViewport('max-w-sm', '375px (Мобильный)')"
                :class="viewportWidth === 'max-w-sm' ? 'bg-[#1E2A27] text-white dark:bg-white dark:text-[#1E2A27] shadow-sm' : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'"
                class="px-2.5 py-1.5 rounded-xl transition"
                title="Ширина 375px (Смартфон)"
              >
                375px
              </button>
              <button 
                type="button" 
                @click="setViewport('max-w-2xl', '768px (Планшет)')"
                :class="viewportWidth === 'max-w-2xl' ? 'bg-[#1E2A27] text-white dark:bg-white dark:text-[#1E2A27] shadow-sm' : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'"
                class="px-2.5 py-1.5 rounded-xl transition"
                title="Ширина 768px (Планшет)"
              >
                768px
              </button>
              <button 
                type="button" 
                @click="setViewport('w-full', '100% (Респонсив)')"
                :class="viewportWidth === 'w-full' ? 'bg-[#1E2A27] text-white dark:bg-white dark:text-[#1E2A27] shadow-sm' : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'"
                class="px-3 py-1.5 rounded-xl transition"
                title="Полная ширина экрана"
              >
                100%
              </button>
            </div>

          </div>
        </div>

        <!-- Навигационные вкладки уровней (Tabs в стиле чайного дома) -->
        <nav class="flex overflow-x-auto gap-2 pt-6 [&::-webkit-scrollbar]:h-1" aria-label="Вкладки уровней заданий">
          <button 
            type="button" 
            @click="activeTab = 'all'"
            :class="activeTab === 'all' ? 'text-white shadow-sm font-bold' : 'text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DC] dark:hover:bg-[#2C3B34]'"
            :style="activeTab === 'all' ? 'background-color: var(--accent-brown); border-color: var(--accent-brown);' : 'background-color: #FAF7F2; border: 1px solid #E5E0D8;'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition"
          >
            Все уровни (Обзор)
          </button>
          <button 
            type="button" 
            @click="activeTab = 'level1'"
            :class="activeTab === 'level1' ? 'text-white shadow-sm font-bold' : 'text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DC] dark:hover:bg-[#2C3B34]'"
            :style="activeTab === 'level1' ? 'background-color: var(--accent-brown); border-color: var(--accent-brown);' : 'background-color: #FAF7F2; border: 1px solid #E5E0D8;'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition"
          >
            Уровень 1: Начальный
          </button>
          <button 
            type="button" 
            @click="activeTab = 'level2'"
            :class="activeTab === 'level2' ? 'text-white shadow-sm font-bold' : 'text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DC] dark:hover:bg-[#2C3B34]'"
            :style="activeTab === 'level2' ? 'background-color: var(--accent-brown); border-color: var(--accent-brown);' : 'background-color: #FAF7F2; border: 1px solid #E5E0D8;'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition"
          >
            Уровень 2: Средний
          </button>
          <button 
            type="button" 
            @click="activeTab = 'level3'"
            :class="activeTab === 'level3' ? 'text-white shadow-sm font-bold' : 'text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DC] dark:hover:bg-[#2C3B34]'"
            :style="activeTab === 'level3' ? 'background-color: var(--accent-brown); border-color: var(--accent-brown);' : 'background-color: #FAF7F2; border: 1px solid #E5E0D8;'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition"
          >
            Уровень 3: Продвинутый
          </button>
          <button 
            type="button" 
            @click="activeTab = 'level4'"
            :class="activeTab === 'level4' ? 'text-white shadow-sm font-bold' : 'text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DC] dark:hover:bg-[#2C3B34]'"
            :style="activeTab === 'level4' ? 'background-color: var(--accent-brown); border-color: var(--accent-brown);' : 'background-color: #FAF7F2; border: 1px solid #E5E0D8;'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition"
          >
            Уровень 4: Экспертный
          </button>
          <button 
            type="button" 
            @click="activeTab = 'design-system'"
            :class="activeTab === 'design-system' ? 'text-white shadow-sm font-bold' : 'text-stone-700 dark:text-stone-300 hover:bg-[#EFE8DC] dark:hover:bg-[#2C3B34]'"
            :style="activeTab === 'design-system' ? 'background-color: var(--accent-brown); border-color: var(--accent-brown);' : 'background-color: #FAF7F2; border: 1px solid #E5E0D8;'"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition"
          >
            Дизайн-система (4.4)
          </button>
        </nav>

        <!-- Критерии оценки (Чеклист соблюдения требований) -->
        <div class="mt-6 pt-4 border-t border-[#E5E0D8] dark:border-[#2C3B34] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px] font-semibold text-stone-600 dark:text-stone-300">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: var(--accent-brown);"></span>
            <span>Mobile-First (320px+)</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: var(--accent-brown);"></span>
            <span>Семантика HTML5</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: var(--accent-brown);"></span>
            <span>Aria-* и Доступность</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: var(--accent-brown);"></span>
            <span>Чистота и @apply</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: var(--accent-brown);"></span>
            <span>Hover, Focus, States</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: var(--accent-brown);"></span>
            <span>Zero Emojis (SVG only)</span>
          </div>
        </div>

      </section>

      <!-- КОНТЕЙНЕР ПРЕДПРОСМОТРА С ПОДДЕРЖКОЙ ЭМУЛЯЦИИ ШИРИНЫ ЭКРАНА -->
      <div :class="[viewportWidth, 'mx-auto transition-all duration-300 space-y-12']">
        
        <!-- ================================================================= -->
        <!-- БЛОК 1: УРОВЕНЬ 1 (НАЧАЛЬНЫЙ)                                     -->
        <!-- ================================================================= -->
        <section v-if="activeTab === 'all' || activeTab === 'level1'" class="space-y-8 animate-fade-in">
          
          <div class="border-b border-[#E5E0D8] dark:border-[#2C3B34] pb-3 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider" style="color: var(--accent-brown);">Уровень 1</span>
              <h2 class="text-xl sm:text-2xl font-bold text-dark dark:text-white" style="font-family: var(--font-serif); color: var(--accent-dark);">Базовые компоненты</h2>
            </div>
            <span class="text-xs font-bold" style="color: var(--accent-brown);">
              3 задания
            </span>
          </div>

          <!-- Задание 1.1: Карточка профиля -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 1.1: Карточка профиля (Аватар 80x80, Bio, Follow/Message, 320px десктоп)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">sm:w-80, rounded-full, space-y-*</span>
            </div>
            <div class="flex justify-center p-4 sm:p-8 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
              <profile-card></profile-card>
            </div>
          </div>

          <!-- Задание 1.2: Навигационная панель без JS -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 1.2: Навигационная панель (Логотип, меню, Sign In, бургер без JS через hidden md:flex)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">sticky top-0, backdrop-blur, z-50</span>
            </div>
            <div class="p-2 sm:p-4 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
              <tailwind-navbar></tailwind-navbar>
            </div>
          </div>

          <!-- Задание 1.3: Сетка карточек товаров -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 1.3: Сетка карточек товаров (6 шт, aspect-square, 1 -> 2 -> 3 -> 4)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">grid-cols-1 sm:grid-cols-2 lg:grid-cols-4, hover:scale-105</span>
            </div>
            <div class="p-4 sm:p-8 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
              <product-grid @add-to-cart="handleAddToCart"></product-grid>
            </div>
          </div>

        </section>

        <!-- ================================================================= -->
        <!-- БЛОК 2: УРОВЕНЬ 2 (СРЕДНИЙ)                                       -->
        <!-- ================================================================= -->
        <section v-if="activeTab === 'all' || activeTab === 'level2'" class="space-y-8 animate-fade-in">
          
          <div class="border-b border-[#E5E0D8] dark:border-[#2C3B34] pb-3 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider" style="color: var(--accent-brown);">Уровень 2</span>
              <h2 class="text-xl sm:text-2xl font-bold text-dark dark:text-white" style="font-family: var(--font-serif); color: var(--accent-dark);">Средний уровень</h2>
            </div>
            <span class="text-xs font-bold" style="color: var(--accent-brown);">
              4 задания
            </span>
          </div>

          <!-- Задание 2.1: Hero-секция с градиентом -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 2.1: Hero-секция с градиентом (bg-clip-text, overlay, blur-3xl круги)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">from-purple-500 to-pink-500, animate-pulse</span>
            </div>
            <gradient-hero></gradient-hero>
          </div>

          <!-- Задание 2.2: Pricing-таблица -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 2.2: Pricing-таблица (3 тарифа, Pro бейдж и scale, фичи, вертикальный стек)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">ring-2 ring-indigo-500, lg:scale-105, divide-y</span>
            </div>
            <div class="p-2 sm:p-6 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
              <pricing-table></pricing-table>
            </div>
          </div>

          <!-- Задание 2.3: Sidebar + контент -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 2.3: Sidebar + контент (Фиксированный сайдбар 256px, Topbar с поиском, мобильное скрытие)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">fixed inset-y-0 left-0 w-64, translate-x-*</span>
            </div>
            <sidebar-dashboard></sidebar-dashboard>
          </div>

          <!-- Задание 2.4: Форма регистрации -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 2.4: Форма регистрации (Валидация peer, индикатор силы пароля, loading)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">peer, peer-invalid:border-red-500, disabled:opacity-50</span>
            </div>
            <div class="p-4 sm:p-8 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
              <register-form></register-form>
            </div>
          </div>

        </section>

        <!-- ================================================================= -->
        <!-- БЛОК 3: УРОВЕНЬ 3 (ПРОДВИНУТЫЙ)                                    -->
        <!-- ================================================================= -->
        <section v-if="activeTab === 'all' || activeTab === 'level3'" class="space-y-8 animate-fade-in">
          
          <div class="border-b border-[#E5E0D8] dark:border-[#2C3B34] pb-3 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider" style="color: var(--accent-brown);">Уровень 3</span>
              <h2 class="text-xl sm:text-2xl font-bold text-dark dark:text-white" style="font-family: var(--font-serif); color: var(--accent-dark);">Продвинутый уровень</h2>
            </div>
            <span class="text-xs font-bold" style="color: var(--accent-brown);">
              4 задания
            </span>
          </div>

          <!-- Задание 3.1: Мессенджер -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 3.1: Мессенджер (Диалоги слева, чат справа, скроллбар [&::-webkit-scrollbar]:w-2)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">flex, overflow-y-auto, sticky bottom-0</span>
            </div>
            <messenger-chat></messenger-chat>
          </div>

          <!-- Задание 3.2: Kanban-доска -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 3.2: Kanban-доска (3 колонки, drag-handle, счётчик, горизонтальный snap на мобильных)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">snap-x snap-mandatory, min-w-[300px], line-clamp-2</span>
            </div>
            <div class="p-4 sm:p-6 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
              <kanban-board></kanban-board>
            </div>
          </div>

          <!-- Задание 3.3: Комплексный лендинг -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 3.3: Комплексный лендинг (7 секций, @apply в отдельном CSS, <details> FAQ, карусель snap)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">@apply, details, group-open:*, snap-x</span>
            </div>
            <tailwind-landing></tailwind-landing>
          </div>

          <!-- Задание 3.4: Dark Mode -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 3.4: Dark mode с переключателем (darkMode: 'class', солнце/луна, transition-colors)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">dark:bg-slate-900, dark:text-slate-100</span>
            </div>
            <div class="p-6 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm flex items-center justify-between">
              <div>
                <h4 class="text-sm font-bold text-dark dark:text-white" style="font-family: var(--font-serif); color: var(--accent-dark);">Текущая активная тема оформления</h4>
                <p class="text-xs text-muted">Все компоненты лаборатории реагируют на переключение в реальном времени</p>
              </div>
              <dark-mode-toggle :is-dark="isDarkMode" @toggle-dark="toggleTheme"></dark-mode-toggle>
            </div>
          </div>

        </section>

        <!-- ================================================================= -->
        <!-- БЛОК 4: УРОВЕНЬ 4 (ЭКСПЕРТНЫЙ)                                    -->
        <!-- ================================================================= -->
        <section v-if="activeTab === 'all' || activeTab === 'level4'" class="space-y-8 animate-fade-in">
          
          <div class="border-b border-[#E5E0D8] dark:border-[#2C3B34] pb-3 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider" style="color: var(--accent-brown);">Уровень 4</span>
              <h2 class="text-xl sm:text-2xl font-bold text-dark dark:text-white" style="font-family: var(--font-serif); color: var(--accent-dark);">Экспертный уровень (Tailwind 3.4+)</h2>
            </div>
            <span class="text-xs font-bold" style="color: var(--accent-brown);">
              4 задания
            </span>
          </div>

          <!-- Задание 4.1: Дашборд аналитики -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 4.1: Дашборд аналитики (12 колонок grid, 4 stat-карточки с трендами, график, таблица)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">grid grid-cols-12, col-span-*, min-w-0, truncate</span>
            </div>
            <analytics-dashboard></analytics-dashboard>
          </div>

          <!-- Задание 4.2: Многошаговая форма -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 4.2: Многошаговая форма (4 шага, has-[:checked]:*, data-[state=*]:*, aria-* доступность)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">has-[:checked]:*, data-[state=*]:*, aria-*</span>
            </div>
            <div class="p-4 sm:p-8 bg-white dark:bg-[#1E2823] rounded-3xl border border-[#E5E0D8] dark:border-[#2C3B34] shadow-sm">
              <multi-step-form></multi-step-form>
            </div>
          </div>

          <!-- Задание 4.3: E-commerce каталог с фильтрами -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400">
              <span>Задание 4.3: E-commerce каталог с фильтрами (@container Container Queries, drawer снизу, skeleton)</span>
              <span class="font-mono text-emerald-700 dark:text-emerald-400">@container, translate-y-full, backdrop-blur-sm, animate-pulse</span>
            </div>
            <ecommerce-catalog></ecommerce-catalog>
          </div>

        </section>

        <!-- ================================================================= -->
        <!-- БЛОК 5: ДИЗАЙН-СИСТЕМА (ЗАДАНИЕ 4.4)                              -->
        <!-- ================================================================= -->
        <section v-if="activeTab === 'all' || activeTab === 'design-system'" class="space-y-4 animate-fade-in">
          <div class="border-b border-[#E5E0D8] dark:border-[#2C3B34] pb-3 flex items-center justify-between">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider" style="color: var(--accent-brown);">Задание 4.4</span>
              <h2 class="text-xl sm:text-2xl font-bold text-dark dark:text-white" style="font-family: var(--font-serif); color: var(--accent-dark);">Дизайн-система и Storybook</h2>
            </div>
            <span class="text-xs font-bold" style="color: var(--accent-brown);">
              @layer components &amp; @apply
            </span>
          </div>

          <design-system-showcase></design-system-showcase>
        </section>

      </div>

    </div>
  `
};
