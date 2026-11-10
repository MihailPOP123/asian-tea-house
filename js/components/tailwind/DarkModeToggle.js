/**
 * DarkModeToggle.js — Задание 3.4: Dark mode с переключателем
 * Требования:
 * - Переключатель light / dark
 * - Все секции адаптированы под обе темы
 * - Использовать dark: префикс
 * - Кнопка-переключатель с иконкой солнца / луны (SVG вектор, без эмодзи)
 * - Требования: darkMode: 'class' в конфиге, dark:bg-slate-900, dark:text-slate-100, плавные transition-colors
 */

window.DarkModeToggle = {
  name: 'DarkModeToggle',
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-dark'],
  methods: {
    toggle() {
      this.$emit('toggle-dark');
    }
  },
  template: `
    <div class="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors">
      <button 
        type="button" 
        @click="toggle"
        :aria-label="isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'"
        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 select-none"
        :class="isDark 
          ? 'bg-slate-900 text-amber-300 shadow-sm border border-slate-700' 
          : 'bg-white text-slate-800 shadow-sm border border-slate-200'"
      >
        <!-- SVG Иконка Солнца (для светлой темы) -->
        <svg 
          v-if="!isDark" 
          class="w-4 h-4 text-amber-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>

        <!-- SVG Иконка Луны (для темной темы) -->
        <svg 
          v-else 
          class="w-4 h-4 text-amber-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>

        <span>{{ isDark ? 'Темная тема' : 'Светлая тема' }}</span>
      </button>

      <span class="text-[11px] text-slate-400 font-medium pr-2 hidden sm:inline">
        Класс .dark
      </span>
    </div>
  `
};
