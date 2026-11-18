/**
 * PricingTable.js — Задание 2.2: Pricing-таблица
 * Требования:
 * - 3 тарифа: Basic / Pro / Enterprise
 * - У Pro — бейдж "Popular" и выделение (ring, scale)
 * - Список фич с иконками (SVG галочка / крестик, строго БЕЗ эмодзи)
 * - Адаптив: на мобильных — вертикальный стек
 * - Использовать: ring-2 ring-indigo-500, lg:scale-105, divide-y, space-y-*
 */

window.PricingTable = {
  name: 'PricingTable',
  data() {
    return {
      billingCycle: 'monthly', // 'monthly' | 'annual'
      plans: [
        {
          id: 'basic',
          name: 'Базовый (Basic)',
          badge: null,
          isPopular: false,
          description: 'Идеально для любителей качественного чая и домашних дегустаций.',
          priceMonthly: 1490,
          priceAnnual: 1190,
          features: [
            { text: '3 сорта чая по 50 г каждый месяц', included: true },
            { text: 'Гид по правильному завариванию', included: true },
            { text: 'Скидка 5% на весь каталог', included: true },
            { text: 'Приглашение на онлайн-вебинары', included: false },
            { text: 'Индивидуальный подбор титестера', included: false },
            { text: 'Бесплатная курьерская доставка', included: false }
          ],
          cta: 'Выбрать Базовый',
          buttonClass: 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
        },
        {
          id: 'pro',
          name: 'Мастерский (Pro)',
          badge: 'Popular (Популярный)',
          isPopular: true,
          description: 'Для ценителей редких улунов, коллекционных пуэров и церемоний.',
          priceMonthly: 3490,
          priceAnnual: 2790,
          features: [
            { text: '5 премиальных сортов по 75 г каждый месяц', included: true },
            { text: 'Гид по завариванию + карта чайных садов', included: true },
            { text: 'Скидка 15% на весь каталог', included: true },
            { text: 'Приглашение на закрытые дегустации', included: true },
            { text: 'Индивидуальные консультации мастера', included: true },
            { text: 'Бесплатная курьерская доставка', included: false }
          ],
          cta: 'Выбрать Мастерский Pro',
          buttonClass: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/30'
        },
        {
          id: 'enterprise',
          name: 'Клубный (Enterprise)',
          badge: 'Премиум',
          isPopular: false,
          description: 'Для чайных клубов, ресторанов и коллекционеров винтажных блинов.',
          priceMonthly: 7990,
          priceAnnual: 6390,
          features: [
            { text: '8 редких сортов + 1 аукционный лот', included: true },
            { text: 'Персональная полка выдержки в хранилище', included: true },
            { text: 'Скидка 25% на оптовые поставки', included: true },
            { text: 'Выездные чайные церемонии мастера', included: true },
            { text: 'Персональный титестер 24/7', included: true },
            { text: 'Бесплатная экспресс-доставка по РФ', included: true }
          ],
          cta: 'Выбрать Клубный',
          buttonClass: 'bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
        }
      ]
    };
  },
  template: `
    <section class="py-8 sm:py-12 px-4 sm:px-6" aria-label="Тарифные планы подписки">
      
      <!-- Заголовок секции -->
      <div class="max-w-3xl mx-auto text-center space-y-4 mb-8 sm:mb-12">
        <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Чайный клуб по подписке
        </span>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Выберите подходящий формат дегустаций
        </h2>
        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Каждый месяц свежая подборка редких сортов с плантаций Китая и Тайваня прямо к вашей двери.
        </p>

        <!-- Переключатель помесячно / за год -->
        <div class="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mt-4">
          <button 
            type="button" 
            @click="billingCycle = 'monthly'"
            :class="billingCycle === 'monthly' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'"
            class="px-4 py-1.5 text-xs font-semibold rounded-lg transition"
          >
            Ежемесячно
          </button>
          <button 
            type="button" 
            @click="billingCycle = 'annual'"
            :class="billingCycle === 'annual' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'"
            class="px-4 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
          >
            <span>На год</span>
            <span class="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              Скидка 20%
            </span>
          </button>
        </div>
      </div>

      <!-- Контейнер тарифов: вертикальный стек на мобильных -> 3 колонки на lg -->
      <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-6 pt-4">
        
        <article 
          v-for="plan in plans" 
          :key="plan.id"
          :class="[
            'w-full max-w-md lg:max-w-none lg:w-1/3 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative',
            plan.isPopular 
              ? 'bg-white dark:bg-slate-800 ring-2 ring-indigo-500 lg:scale-105 shadow-2xl z-10' 
              : 'bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-md'
          ]"
        >
          <div class="space-y-6">
            <!-- Заголовок и описание тарифа -->
            <div>
              <div v-if="plan.badge" class="mb-1">
                <span class="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">{{ plan.badge }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ plan.name }}</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">{{ plan.description }}</p>
            </div>

            <!-- Цена -->
            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-extrabold text-slate-900 dark:text-white">
                {{ billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual }} ₽
              </span>
              <span class="text-xs text-slate-400 font-medium">/ месяц</span>
            </div>

            <!-- Кнопка действия -->
            <button 
              type="button" 
              :class="plan.buttonClass"
              class="w-full py-3 px-4 rounded-xl text-sm font-bold text-center transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              {{ plan.cta }}
            </button>

            <!-- Список фич с divide-y и space-y-* (из требований задания) -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-700/80">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">В тариф входит:</p>
              <ul class="divide-y divide-slate-100 dark:divide-slate-700/60 space-y-3">
                <li 
                  v-for="(feature, idx) in plan.features" 
                  :key="idx"
                  class="pt-3 flex items-start gap-3 text-xs sm:text-sm"
                >
                  <!-- SVG галочка для включенных опций (Строго без эмодзи) -->
                  <span v-if="feature.included" class="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  
                  <!-- SVG крестик для отключенных опций (Строго без эмодзи) -->
                  <span v-else class="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mt-0.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>

                  <span :class="feature.included ? 'text-slate-700 dark:text-slate-200 font-medium' : 'text-slate-400 dark:text-slate-500 line-through'">
                    {{ feature.text }}
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </article>

      </div>
    </section>
  `
};
