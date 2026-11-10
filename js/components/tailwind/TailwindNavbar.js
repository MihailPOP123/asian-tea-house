/**
 * TailwindNavbar.js — Задание 1.2: Навигационная панель
 * Требования:
 * - Логотип слева
 * - Меню по центру (Home, About, Services, Contact)
 * - Кнопка "Sign In" справа
 * - На мобильных — бургер-меню (без JS, чисто CSS через hidden md:flex и peer-checked)
 * - Использовать: sticky top-0, backdrop-blur, z-50
 * - Доступность: aria-label, focus-visible
 */

window.TailwindNavbar = {
  name: 'TailwindNavbar',
  template: `
    <header class="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- 1. Логотип слева -->
          <div class="flex-shrink-0 flex items-center gap-2">
            <span class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-serif font-black text-lg shadow-sm">
              T
            </span>
            <span class="font-bold text-base sm:text-lg tracking-wider text-slate-900 dark:text-white uppercase font-serif">
              Asian Tea House
            </span>
          </div>

          <!-- Скрытый чекбокс для чистого CSS бургер-меню без единой строчки JS -->
          <input type="checkbox" id="tailwind-nav-toggle" class="peer hidden" aria-hidden="true" />

          <!-- 2. Меню по центру (десктоп: скрыто на мобильных, видно от md:) -->
          <nav class="hidden md:flex items-center space-x-1 lg:space-x-4" aria-label="Основное меню">
            <a 
              href="#home" 
              class="px-3 py-2 rounded-lg text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 transition"
              aria-current="page"
            >
              Главная
            </a>
            <a 
              href="#catalog" 
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Каталог
            </a>
            <a 
              href="#services" 
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Церемонии
            </a>
            <a 
              href="#contact" 
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Контакты
            </a>
          </nav>

          <!-- 3. Кнопка "Войти" справа на десктопе + кнопка бургера для мобильных -->
          <div class="flex items-center gap-3">
            <a 
              href="#auth" 
              class="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-emerald-600 dark:border-emerald-500 text-sm font-semibold rounded-lg text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 transition"
            >
              Войти
            </a>

            <!-- Бургер-иконка (label для скрытого чекбокса peer) -->
            <label 
              for="tailwind-nav-toggle" 
              class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Переключить мобильное меню"
            >
              <!-- SVG бургер линии -->
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>

          <!-- Мобильное выпадающее меню на чистом CSS (без JS: peer-checked:flex hidden) -->
          <div class="peer-checked:flex hidden md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 flex-col px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fade-in">
            <a 
              href="#home" 
              class="px-3 py-2.5 rounded-lg text-base font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
            >
              Главная
            </a>
            <a 
              href="#catalog" 
              class="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Каталог
            </a>
            <a 
              href="#services" 
              class="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Церемонии
            </a>
            <a 
              href="#contact" 
              class="px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Контакты
            </a>
            <div class="pt-2">
              <a 
                href="#auth" 
                class="w-full inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-lg text-center shadow-sm"
              >
                Войти в аккаунт
              </a>
            </div>
          </div>

        </div>
      </div>
    </header>
  `
};
