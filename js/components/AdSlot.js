/**
 * AdSlot.js — Компонент рекламного плейсхолдера (Задание 1)
 * 
 * Требования:
 * - Стилизация через Tailwind: пунктирная рамка, светлый фон, скругление.
 * - Текстовый идентификатор («Рекламное место» / «Спонсорский блок»).
 * - Настраиваемый размер через props: width, height или preset (banner, sidebar, billboard, feed).
 * - Строго БЕЗ эмодзи (чистый текст и векторный SVG).
 */

window.AdSlot = {
  name: 'AdSlot',
  props: {
    // Настраиваемая ширина и высота (например: '728px', '100%', '300px')
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    // Пресеты размеров: 'banner' (728x90), 'sidebar' (300x250), 'billboard' (970x250), 'feed' (адаптивный ленточный)
    preset: {
      type: String,
      default: 'banner',
      validator: (val) => ['banner', 'sidebar', 'billboard', 'feed', 'inline'].includes(val)
    },
    label: {
      type: String,
      default: 'Рекламное место'
    },
    sublabel: {
      type: String,
      default: ''
    },
    badgeText: {
      type: String,
      default: 'Реклама'
    }
  },
  computed: {
    presetClasses() {
      switch (this.preset) {
        case 'sidebar':
          return 'w-full max-w-[300px] min-h-[250px] mx-auto';
        case 'billboard':
          return 'w-full max-w-5xl min-h-[180px] sm:min-h-[220px] mx-auto';
        case 'feed':
          return 'w-full min-h-[110px] mx-auto';
        case 'banner':
        default:
          return 'w-full max-w-4xl min-h-[90px] sm:min-h-[105px] mx-auto';
      }
    },
    computedStyle() {
      const styles = {};
      if (this.width) styles.width = this.width;
      if (this.height) styles.height = this.height;
      return styles;
    },
    computedSizeLabel() {
      switch (this.preset) {
        case 'sidebar':
          return 'Формат 300 × 250 (Medium Rectangle)';
        case 'billboard':
          return 'Формат 970 × 250 (Billboard Banner)';
        case 'feed':
          return 'Формат In-Feed (Адаптивный баннер в ленте)';
        case 'banner':
        default:
          return 'Формат 728 × 90 (Leaderboard Banner)';
      }
    }
  },
  template: `
    <aside 
      class="ad-slot relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 transition-colors hover:border-slate-400 dark:hover:border-slate-600 text-center select-none overflow-hidden my-3"
      :class="presetClasses"
      :style="computedStyle"
      role="complementary"
      :aria-label="label"
    >
      <!-- Маркировка рекламного блока по требованиям ФЗ / IAB (чистый текст) -->
      <div class="absolute top-2.5 right-3 flex items-center">
        <span class="text-[11px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">
          {{ badgeText }}
        </span>
      </div>

      <!-- Векторная иконка рекламного плейсхолдера (без эмодзи) -->
      <div class="mb-1 text-slate-400 dark:text-slate-500">
        <svg class="w-6 h-6 mx-auto stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.75">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      </div>

      <!-- Текстовый идентификатор -->
      <h6 class="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-0.5 tracking-tight">
        {{ label }}
      </h6>

      <!-- Подпись формата / слота -->
      <p class="text-xs text-slate-400 dark:text-slate-500 mb-0">
        {{ sublabel || computedSizeLabel }}
      </p>
    </aside>
  `
};
