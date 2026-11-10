/**
 * DesignSystemShowcase.js — Задание 4.4: Дизайн-система на Tailwind CSS
 * Требования:
 * - Кастомные цвета (brand, semantic)
 * - Типографика (компоненты h1, h2, body)
 * - Кнопки (primary/secondary/ghost/danger * sm/md/lg)
 * - Инпуты, чекбоксы, toggle
 * - Badge, Alert, Card, Modal
 * - Использовать @layer components и @apply (css/tailwind-custom.css)
 * - Документация в Storybook-подобном виде с интерактивным предпросмотром
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.DesignSystemShowcase = {
  name: 'DesignSystemShowcase',
  data() {
    return {
      activeSection: 'buttons', // 'colors' | 'typography' | 'buttons' | 'forms' | 'feedback' | 'modal'
      sampleInputText: 'Тайваньский улун Дун Дин',
      sampleCheckbox: true,
      sampleToggle: true,
      showModalPreview: false,
      copiedToken: ''
    };
  },
  methods: {
    copyCode(code) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
        this.copiedToken = code;
        setTimeout(() => {
          this.copiedToken = '';
        }, 1500);
      }
    }
  },
  template: `
    <div class="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
      
      <!-- Заголовок Storybook-витрины дизайн-системы -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span class="caption-text text-emerald-600 font-bold">Storybook UI Kit • Tailwind 3.4+</span>
          <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Дизайн-система Asian Tea House
          </h2>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Коллекция переиспользуемых токенов, компонентов и утилит на базе @layer components и @apply
          </p>
        </div>

        <!-- Навигационные вкладки Storybook -->
        <div class="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-semibold">
          <button 
            type="button" 
            @click="activeSection = 'colors'"
            :class="activeSection === 'colors' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'"
            class="px-3 py-1.5 rounded-xl transition"
          >
            Цвета
          </button>
          <button 
            type="button" 
            @click="activeSection = 'typography'"
            :class="activeSection === 'typography' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'"
            class="px-3 py-1.5 rounded-xl transition"
          >
            Типографика
          </button>
          <button 
            type="button" 
            @click="activeSection = 'buttons'"
            :class="activeSection === 'buttons' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'"
            class="px-3 py-1.5 rounded-xl transition"
          >
            Кнопки
          </button>
          <button 
            type="button" 
            @click="activeSection = 'forms'"
            :class="activeSection === 'forms' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'"
            class="px-3 py-1.5 rounded-xl transition"
          >
            Поля ввода
          </button>
          <button 
            type="button" 
            @click="activeSection = 'feedback'"
            :class="activeSection === 'feedback' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'"
            class="px-3 py-1.5 rounded-xl transition"
          >
            Алерты и Бейджи
          </button>
          <button 
            type="button" 
            @click="activeSection = 'modal'"
            :class="activeSection === 'modal' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'"
            class="px-3 py-1.5 rounded-xl transition"
          >
            Модальные окна
          </button>
        </div>
      </div>

      <!-- ВСПЛЫВАЮЩЕЕ УВЕДОМЛЕНИЕ О КОПИРОВАНИИ ТОКЕНА -->
      <div v-if="copiedToken" class="p-3 bg-emerald-500 text-white rounded-xl text-xs font-bold text-center animate-fade-in">
        Скопирован класс: {{ copiedToken }}
      </div>

      <!-- 1. СЕКЦИЯ: ПАЛИТРА ЦВЕТОВ (Brand & Semantic) -->
      <section v-if="activeSection === 'colors'" class="space-y-6 animate-fade-in">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Палитра цветов бренда и семантики</h3>
        
        <!-- Brand Colors -->
        <div>
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Брендовые оттенки (Brand)</h4>
          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div @click="copyCode('bg-brand-500')" class="p-4 rounded-2xl bg-emerald-600 text-white shadow-sm cursor-pointer hover:scale-105 transition">
              <span class="block text-xs font-bold">Brand 500</span>
              <span class="text-[11px] opacity-80">#4c935d</span>
            </div>
            <div @click="copyCode('bg-brand-600')" class="p-4 rounded-2xl bg-emerald-700 text-white shadow-sm cursor-pointer hover:scale-105 transition">
              <span class="block text-xs font-bold">Brand 600</span>
              <span class="text-[11px] opacity-80">#3a7749</span>
            </div>
            <div @click="copyCode('bg-brand-700')" class="p-4 rounded-2xl bg-emerald-800 text-white shadow-sm cursor-pointer hover:scale-105 transition">
              <span class="block text-xs font-bold">Brand 700</span>
              <span class="text-[11px] opacity-80">#2f5f3b</span>
            </div>
            <div @click="copyCode('bg-brand-100')" class="p-4 rounded-2xl bg-emerald-100 text-emerald-900 shadow-sm cursor-pointer hover:scale-105 transition border border-emerald-200">
              <span class="block text-xs font-bold">Brand 100</span>
              <span class="text-[11px] opacity-80">#e5f0e7</span>
            </div>
            <div @click="copyCode('bg-brand-50')" class="p-4 rounded-2xl bg-emerald-50 text-emerald-900 shadow-sm cursor-pointer hover:scale-105 transition border border-emerald-100">
              <span class="block text-xs font-bold">Brand 50</span>
              <span class="text-[11px] opacity-80">#f4f8f5</span>
            </div>
          </div>
        </div>

        <!-- Semantic Colors -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Семантические цвета (Semantic)</h4>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-4 rounded-2xl bg-emerald-500 text-white">
              <span class="block text-xs font-bold">Success</span>
              <span class="text-[11px] opacity-80">Успех / Выполнено</span>
            </div>
            <div class="p-4 rounded-2xl bg-rose-500 text-white">
              <span class="block text-xs font-bold">Danger</span>
              <span class="text-[11px] opacity-80">Ошибка / Удаление</span>
            </div>
            <div class="p-4 rounded-2xl bg-amber-500 text-white">
              <span class="block text-xs font-bold">Warning</span>
              <span class="text-[11px] opacity-80">Предупреждение</span>
            </div>
            <div class="p-4 rounded-2xl bg-indigo-500 text-white">
              <span class="block text-xs font-bold">Info</span>
              <span class="text-[11px] opacity-80">Информация / Акцент</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. СЕКЦИЯ: ТИПОГРАФИКА (h1, h2, body с @apply) -->
      <section v-if="activeSection === 'typography'" class="space-y-6 animate-fade-in">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Компоненты типографики (@apply)</h3>
        
        <div class="space-y-6 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold text-emerald-600">.heading-1</span>
              <button @click="copyCode('heading-1')" class="text-[11px] text-slate-400 hover:text-emerald-600">Копировать</button>
            </div>
            <h1 class="heading-1">Заголовок первого уровня Heading 1</h1>
          </div>

          <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold text-emerald-600">.heading-2</span>
              <button @click="copyCode('heading-2')" class="text-[11px] text-slate-400 hover:text-emerald-600">Копировать</button>
            </div>
            <h2 class="heading-2">Заголовок второго уровня Heading 2</h2>
          </div>

          <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold text-emerald-600">.heading-3</span>
              <button @click="copyCode('heading-3')" class="text-[11px] text-slate-400 hover:text-emerald-600">Копировать</button>
            </div>
            <h3 class="heading-3">Заголовок третьего уровня Heading 3</h3>
          </div>

          <div class="pt-4 border-t border-slate-200 dark:border-slate-700">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-mono font-bold text-emerald-600">.body-text</span>
              <button @click="copyCode('body-text')" class="text-[11px] text-slate-400 hover:text-emerald-600">Копировать</button>
            </div>
            <p class="body-text">
              Основной текст (body-text). Идеальный межстрочный интервал и нейтральный контраст для комфортного чтения больших объемов информации о культуре чая, регламентах заваривания и истории плантаций.
            </p>
          </div>
        </div>
      </section>

      <!-- 3. СЕКЦИЯ: КНОПКИ (primary/secondary/ghost/danger * sm/md/lg) -->
      <section v-if="activeSection === 'buttons'" class="space-y-6 animate-fade-in">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Кнопки дизайн-системы (@apply)</h3>
        
        <div class="space-y-8">
          <!-- Primary кнопки -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">1. Primary (.btn-tw-primary)</span>
            <div class="flex flex-wrap items-center gap-3">
              <button type="button" class="btn-tw-sm btn-tw-primary">Размер SM</button>
              <button type="button" class="btn-tw-md btn-tw-primary">Размер MD (стандарт)</button>
              <button type="button" class="btn-tw-lg btn-tw-primary">Размер LG</button>
              <button type="button" disabled class="btn-tw-md btn-tw-primary">Заблокирована</button>
            </div>
          </div>

          <!-- Secondary кнопки -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">2. Secondary (.btn-tw-secondary)</span>
            <div class="flex flex-wrap items-center gap-3">
              <button type="button" class="btn-tw-sm btn-tw-secondary">Размер SM</button>
              <button type="button" class="btn-tw-md btn-tw-secondary">Размер MD</button>
              <button type="button" class="btn-tw-lg btn-tw-secondary">Размер LG</button>
            </div>
          </div>

          <!-- Outline & Ghost кнопки -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">3. Outline & Ghost (.btn-tw-outline / .btn-tw-ghost)</span>
            <div class="flex flex-wrap items-center gap-3">
              <button type="button" class="btn-tw-md btn-tw-outline">Кнопка с обводкой</button>
              <button type="button" class="btn-tw-md btn-tw-ghost">Ghost кнопка</button>
            </div>
          </div>

          <!-- Danger кнопки -->
          <div class="space-y-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">4. Danger (.btn-tw-danger)</span>
            <div class="flex flex-wrap items-center gap-3">
              <button type="button" class="btn-tw-sm btn-tw-danger">Удалить лот</button>
              <button type="button" class="btn-tw-md btn-tw-danger">Опасное действие MD</button>
              <button type="button" class="btn-tw-lg btn-tw-danger">Удалить аккаунт LG</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. СЕКЦИЯ: ПОЛЯ ВВОДА, ЧЕКБОКСЫ И TOGGLE -->
      <section v-if="activeSection === 'forms'" class="space-y-6 animate-fade-in">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Элементы форм (.input-tw)</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div class="space-y-1">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">Стандартное текстовое поле (.input-tw)</label>
              <input type="text" v-model="sampleInputText" class="input-tw" />
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">Поле в состоянии disabled</label>
              <input type="text" disabled value="Заблокированное поле" class="input-tw" />
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-bold text-slate-700 dark:text-slate-300">Выпадающий список</label>
              <select class="input-tw">
                <option>Уишаньский улун</option>
                <option>Винтажный пуэр</option>
                <option>Белый чай Фудин</option>
              </select>
            </div>
          </div>

          <!-- Чекбоксы и переключатели (Toggle) -->
          <div class="space-y-4 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <span class="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Чекбоксы и переключатели</span>
            
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="sampleCheckbox" class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300" />
              <span class="text-xs font-medium text-slate-800 dark:text-slate-200">Чекбокс согласия на уведомления</span>
            </label>

            <!-- Toggle Switch на Tailwind CSS -->
            <div class="flex items-center justify-between pt-2">
              <span class="text-xs font-medium text-slate-800 dark:text-slate-200">Режим быстрой доставки</span>
              <button 
                type="button" 
                @click="sampleToggle = !sampleToggle"
                :class="sampleToggle ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'"
                class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <span 
                  :class="sampleToggle ? 'translate-x-5' : 'translate-x-0'"
                  class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. СЕКЦИЯ: АЛЕРТЫ И БЕЙДЖИ -->
      <section v-if="activeSection === 'feedback'" class="space-y-6 animate-fade-in">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Бейджи (.badge-tw-*) и Уведомления (.alert-tw-*)</h3>

        <!-- Бейджи -->
        <div class="space-y-3">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Бейджи статусов</span>
          <div class="flex flex-wrap items-center gap-2">
            <span class="badge-tw-success">В наличии (Success)</span>
            <span class="badge-tw-info">В пути (Info)</span>
            <span class="badge-tw-warning">Осталось мало (Warning)</span>
            <span class="badge-tw-danger">Закончился (Danger)</span>
            <span class="badge-tw-neutral">Архив (Neutral)</span>
          </div>
        </div>

        <!-- Алерты с @apply -->
        <div class="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Баннеры сообщений (Alerts)</span>
          
          <div class="alert-tw-success">
            <svg class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <strong>Успешно сохранено:</strong> Новая партия чая успешно добавлена в каталог и синхронизирована с локальным хранилищем.
            </div>
          </div>

          <div class="alert-tw-warning">
            <svg class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <strong>Внимание:</strong> Влажность в комнате хранения улунов превысила 68%. Рекомендуется запустить осушитель воздуха.
            </div>
          </div>

          <div class="alert-tw-danger">
            <svg class="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <div>
              <strong>Ошибка валидации:</strong> Формат файла не поддерживается. Разрешена загрузка только документов Excel (.xlsx, .xls).
            </div>
          </div>
        </div>
      </section>

      <!-- 6. СЕКЦИЯ: МОДАЛЬНОЕ ОКНО -->
      <section v-if="activeSection === 'modal'" class="space-y-6 animate-fade-in">
        <h3 class="text-lg font-bold text-slate-900 dark:text-white">Модальные окна на чистом Tailwind CSS</h3>
        <p class="text-xs text-slate-500">Доступные диалоговые окна с затемнением, плавной анимацией и фокусом</p>

        <button type="button" @click="showModalPreview = true" class="btn-tw-md btn-tw-primary">
          Открыть тестовое модальное окно
        </button>

        <!-- Демонстрационное модальное окно -->
        <div 
          v-if="showModalPreview"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
          <div class="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <h4 class="text-base font-bold text-slate-900 dark:text-white">Паспорт чайного сбора</h4>
              <button type="button" @click="showModalPreview = false" class="p-1 text-slate-400 hover:text-slate-600">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Компонент модального окна дизайн-системы. Поддерживает адаптивное масштабирование от мобильных экранов до ультрашироких 4K мониторов, клавиатурную навигацию и закрытие по клику на оверлей.
            </p>

            <div class="pt-2 flex justify-end gap-2">
              <button type="button" @click="showModalPreview = false" class="btn-tw-sm btn-tw-secondary">
                Закрыть
              </button>
              <button type="button" @click="showModalPreview = false" class="btn-tw-sm btn-tw-primary">
                Применить
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
};
