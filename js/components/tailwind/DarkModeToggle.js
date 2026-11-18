/**
 * DarkModeToggle.js — Классический переключатель темы (Солнце / Луна)
 * Senior UX: лаконичная круглая кнопка с иконками солнца и луны без лишнего текста
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
    <button 
      type="button" 
      @click="toggle"
      :title="isDark ? 'Включить светлую тему' : 'Включить темную тему'"
      :aria-label="isDark ? 'Включить светлую тему' : 'Включить темную тему'"
      class="theme-toggle-btn d-inline-flex align-items-center justify-content-center rounded-circle border shadow-sm transition-all"
      :class="isDark 
        ? 'bg-dark text-warning border-secondary' 
        : 'bg-white text-secondary border-light'"
      style="width: 38px; height: 38px; min-width: 38px; cursor: pointer; transition: all 0.2s ease;"
    >
      <!-- Классическая Луна для светлой темы (нажатие переключает на темную) -->
      <svg 
        v-if="!isDark" 
        style="width: 18px; height: 18px; fill: #4B5563;" 
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>

      <!-- Классическое Солнце для темной темы (нажатие переключает на светлую) -->
      <svg 
        v-else 
        style="width: 20px; height: 20px; fill: #FBBF24;" 
        viewBox="0 0 20 20"
      >
        <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
      </svg>
    </button>
  `
};
