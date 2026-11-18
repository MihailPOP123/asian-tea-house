/**
 * FloatingChatWidget.js — Плавающий виджет-консьерж «Чат с чайным мастером»
 * Senior UX паттерн: доступен на всех страницах сайта в правом нижнем углу
 */
window.FloatingChatWidget = {
  name: 'FloatingChatWidget',
  components: {
    'messenger-chat': window.MessengerChat
  },
  emits: ['navigate'],
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    openFullscreen() {
      this.isOpen = false;
      this.$emit('navigate', 'chat');
    }
  },
  template: `
    <div class="floating-chat-container fixed bottom-5 right-5 z-50 select-none">
      
      <!-- Всплывающее окно чата при isOpen === true -->
      <div 
        v-if="isOpen" 
        class="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-3 animate-fade-in flex flex-col"
        style="width: 380px; max-width: calc(100vw - 32px); height: 560px; max-height: calc(100vh - 100px);"
      >
        <!-- Шапка плавающего чата -->
        <div class="px-4 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <div class="font-bold text-xs tracking-wide">Чайный сомелье онлайн</div>
              <div class="text-[10px] text-slate-400">Мастер Ли Вэй готов ответить</div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <!-- Кнопка развернуть на весь экран -->
            <button 
              type="button" 
              class="text-slate-400 hover:text-white p-1 rounded transition" 
              title="Открыть на всю страницу"
              @click="openFullscreen"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>

            <!-- Кнопка закрыть -->
            <button 
              type="button" 
              class="text-slate-400 hover:text-white p-1 rounded transition" 
              title="Свернуть чат"
              @click="isOpen = false"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Тело виджета со встроенным мессенджером -->
        <div class="flex-1 overflow-hidden">
          <messenger-chat></messenger-chat>
        </div>
      </div>

      <!-- Плавающая кнопка вызова виджета (Launcher Button) -->
      <button 
        type="button"
        @click="toggle"
        class="inline-flex items-center gap-2.5 px-4 py-3 rounded-full text-white font-bold shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        style="background: linear-gradient(135deg, #1E2A27 0%, #2C3531 100%); border: 1px solid rgba(255, 255, 255, 0.15);"
        aria-label="Открыть чат с сомелье"
      >
        <!-- Индикатор онлайна -->
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>

        <!-- SVG иконка диалога -->
        <svg class="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>

        <span class="text-xs sm:text-sm tracking-wide">
          {{ isOpen ? 'Свернуть чат' : 'Чат с мастером' }}
        </span>
      </button>

    </div>
  `
};
