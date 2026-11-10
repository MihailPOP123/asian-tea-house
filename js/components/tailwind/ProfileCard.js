/**
 * ProfileCard.js — Задание 1.1: Карточка профиля
 * Требования:
 * - Аватар (круглый, 80x80px)
 * - Имя и должность
 * - Короткое описание (bio)
 * - Кнопки "Follow" и "Message"
 * - Адаптивность: на мобильных на всю ширину (w-full), на десктопе фиксированная (320px / sm:w-80)
 * - Использовать: rounded-full, shadow, flex, space-y-*, gap-*
 * - Без эмодзи (используем чистый текст и SVG)
 */

window.ProfileCard = {
  name: 'ProfileCard',
  data() {
    return {
      isFollowing: false,
      followersCount: 1420
    };
  },
  methods: {
    toggleFollow() {
      this.isFollowing = !this.isFollowing;
      this.followersCount += this.isFollowing ? 1 : -1;
    },
    sendMessage() {
      alert('Открытие диалога с мастером чайного дома Чэнь Юнь');
    },
    onImgError(e) {
      if (e && e.target) {
        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80';
      }
    }
  },
  template: `
    <article 
      class="w-full sm:w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl space-y-4"
      aria-label="Карточка профиля чайного мастера"
    >
      <!-- Контейнер аватара 80x80px (w-20 h-20) -->
      <div class="relative">
        <img 
          src="images/team-master.jpg" 
          alt="Фото профиля: Чэнь Юнь"
          class="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-50 dark:ring-emerald-950/50 shadow-md"
          @error="onImgError"
        />
        <span 
          class="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full" 
          title="В сети"
          aria-label="Статус: В сети"
        ></span>
      </div>

      <!-- Имя и должность -->
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          Чэнь Юнь
        </h3>
        <p class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
          Главный титестер и чайный мастер
        </p>
      </div>

      <!-- Краткое описание (bio) -->
      <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        Более 14 лет изучает высокогорные улуны провинции Фуцзянь и традиционный ритуал Гунфу Ча. Проводит авторские дегустации.
      </p>

      <!-- Метрики профиля -->
      <div class="w-full grid grid-cols-3 gap-2 py-2 border-y border-slate-100 dark:border-slate-700/60 text-center">
        <div>
          <span class="block text-sm font-bold text-slate-900 dark:text-white">{{ followersCount }}</span>
          <span class="block text-[11px] text-slate-400 uppercase tracking-wider">Читатели</span>
        </div>
        <div>
          <span class="block text-sm font-bold text-slate-900 dark:text-white">28</span>
          <span class="block text-[11px] text-slate-400 uppercase tracking-wider">Экспедиций</span>
        </div>
        <div>
          <span class="block text-sm font-bold text-slate-900 dark:text-white">184</span>
          <span class="block text-[11px] text-slate-400 uppercase tracking-wider">Рецепта</span>
        </div>
      </div>

      <!-- Кнопки действий: Follow и Message -->
      <div class="w-full flex items-center gap-3 pt-1">
        <button 
          type="button"
          @click="toggleFollow"
          :class="isFollowing 
            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200' 
            : 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-sm'"
          class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          :aria-pressed="isFollowing"
        >
          {{ isFollowing ? 'Вы подписаны' : 'Подписаться' }}
        </button>

        <button 
          type="button"
          @click="sendMessage"
          class="flex-1 py-2 px-3 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
        >
          Сообщение
        </button>
      </div>
    </article>
  `
};
