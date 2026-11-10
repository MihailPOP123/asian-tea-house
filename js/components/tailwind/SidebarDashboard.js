/**
 * SidebarDashboard.js — Задание 2.3: Sidebar + контент
 * Требования:
 * - Дашборд с фиксированным сайдбаром
 * - Sidebar 256px слева (иконки + текст)
 * - Основной контент справа
 * - Topbar с поиском и аватаром
 * - На мобильных sidebar скрывается, открывается по кнопке
 * - Требования: fixed inset-y-0 left-0 w-64, translate-x-*, h-screen, overflow-y-auto
 */

window.SidebarDashboard = {
  name: 'SidebarDashboard',
  data() {
    return {
      mobileSidebarOpen: false,
      activeMenu: 'overview',
      searchQuery: '',
      menuItems: [
        { id: 'overview', label: 'Обзор склада', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { id: 'teas', label: 'Коллекция сортов', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { id: 'orders', label: 'Заказы и поставки', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { id: 'analytics', label: 'Аналитика продаж', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: 'settings', label: 'Настройки системы', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
      ]
    };
  },
  methods: {
    onImgError(e) {
      if (e && e.target) {
        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
      }
    }
  },
  template: `
    <div class="relative w-full rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-xl min-h-[580px]">
      
      <!-- Затемнение фона на мобильных при открытом сайдбаре -->
      <div 
        v-if="mobileSidebarOpen" 
        @click="mobileSidebarOpen = false"
        class="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
      ></div>

      <!-- 1. Сайдбар фиксированной ширины 256px (w-64) -->
      <!-- В соответствии с требованиями: fixed inset-y-0 left-0 w-64, translate-x-*, h-screen, overflow-y-auto -->
      <!-- (Используем z-50 и абсолют/фикс позиционирование внутри контейнера задания) -->
      <aside 
        :class="mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
        class="absolute lg:fixed top-0 bottom-0 left-0 w-64 z-50 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700/80 transition-transform duration-300 ease-in-out flex flex-col justify-between overflow-y-auto"
      >
        <div>
          <!-- Логотип в шапке сайдбара -->
          <div class="h-16 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-700/60">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                TH
              </span>
              <span class="font-bold text-slate-800 dark:text-white text-sm tracking-wide uppercase">
                Tea House Panel
              </span>
            </div>
            <!-- Кнопка закрытия на мобильных -->
            <button 
              type="button"
              @click="mobileSidebarOpen = false"
              class="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Навигационные пункты -->
          <nav class="p-4 space-y-1" aria-label="Меню панели управления">
            <button
              v-for="item in menuItems"
              :key="item.id"
              type="button"
              @click="activeMenu = item.id; mobileSidebarOpen = false"
              :class="activeMenu === item.id 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold' 
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm transition-colors text-left"
            >
              <!-- SVG иконка пункта меню -->
              <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" :d="item.icon" />
              </svg>
              <span>{{ item.label }}</span>
            </button>
          </nav>
        </div>

        <!-- Нижний блок профиля пользователя в сайдбаре -->
        <div class="p-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
          <img 
            src="images/team-master.jpg" 
            alt="Аватар администратора"
            class="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/20"
            @error="onImgError"
          />
          <div class="min-w-0 flex-1">
            <p class="text-xs font-bold text-slate-800 dark:text-white truncate">Ли Вэй</p>
            <p class="text-[11px] text-slate-400 truncate">Управляющий мастер</p>
          </div>
        </div>
      </aside>

      <!-- 2. Основная рабочая область справа (lg:pl-64) -->
      <div class="lg:pl-64 flex flex-col min-h-[580px]">
        
        <!-- Topbar с поиском и аватаром -->
        <header class="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/80 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          
          <div class="flex items-center gap-3 flex-1 max-w-md">
            <!-- Кнопка гамбургер для открытия сайдбара на мобильных -->
            <button 
              type="button"
              @click="mobileSidebarOpen = true"
              class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none"
              aria-label="Открыть боковую панель"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <!-- Поле поиска в topbar -->
            <div class="relative w-full">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Поиск по партиям чая и клиентам..."
                class="w-full pl-9 pr-4 py-1.5 rounded-lg text-xs sm:text-sm bg-slate-100 dark:bg-slate-700/60 border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none text-slate-900 dark:text-white transition"
              />
            </div>
          </div>

          <!-- Правая часть topbar: уведомления и аватар -->
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hidden sm:inline-flex">
              Склад: В норме
            </span>
            <div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200">
              ЛВ
            </div>
          </div>
        </header>

        <!-- Контент страницы дашборда -->
        <main class="p-4 sm:p-6 flex-1 space-y-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">Текущее состояние чайного фонда</h2>
              <p class="text-xs text-slate-500 dark:text-slate-400">Оперативная сводка на сегодня</p>
            </div>
            <button type="button" class="self-start sm:self-auto px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition">
              Сформировать отчет
            </button>
          </div>

          <!-- Карточки метрик дашборда -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 shadow-sm">
              <span class="text-xs text-slate-400 block font-medium">Активных сортов на складе</span>
              <span class="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">48 позиций</span>
              <span class="text-xs text-emerald-600 font-semibold mt-1 inline-block">+4 свежие поставки</span>
            </div>
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 shadow-sm">
              <span class="text-xs text-slate-400 block font-medium">Остаток премиального пуэра</span>
              <span class="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">184 блина</span>
              <span class="text-xs text-amber-600 font-semibold mt-1 inline-block">12 в резерве дегустаций</span>
            </div>
            <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700/70 shadow-sm">
              <span class="text-xs text-slate-400 block font-medium">Влажность в хранилище</span>
              <span class="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">62.4 %</span>
              <span class="text-xs text-emerald-600 font-semibold mt-1 inline-block">Оптимальный микроклимат</span>
            </div>
          </div>

          <!-- Информационный блок -->
          <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700/70">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-2">Последние действия операторов склада</h3>
            <div class="text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div class="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/40">
                <span>Приемка партии «Да Хун Пао Премиум» 25 кг</span>
                <span class="text-slate-400">10 минут назад</span>
              </div>
              <div class="flex items-center justify-between py-1.5 border-b border-slate-100 dark:border-slate-700/40">
                <span>Инвентаризация ячеек белого чая Фудин</span>
                <span class="text-slate-400">1 час назад</span>
              </div>
              <div class="flex items-center justify-between py-1.5">
                <span>Калибровка влагомеров в пуэрной комнате</span>
                <span class="text-slate-400">Сегодня, 08:30</span>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  `
};
