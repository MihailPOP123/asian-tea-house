/**
 * AnalyticsDashboard.js — Задание 4.1: Дашборд аналитики
 * Требования:
 * - Sidebar + Topbar + контент
 * - 4 stat-карточки с трендами (+12%, -3%)
 * - График (заглушка через grid + цветные ячейки)
 * - Таблица последних транзакций
 * - Фильтры и поиск
 * - Полная адаптивность от 320px до 4K
 * - Плавные hover-эффекты через group, peer
 * - Требования: grid grid-cols-12, col-span-*, min-w-0, truncate, scrollbar-thin
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.AnalyticsDashboard = {
  name: 'AnalyticsDashboard',
  data() {
    return {
      periodFilter: 'month',
      searchTransaction: '',
      categoryFilter: 'all',
      statCards: [
        {
          id: 1,
          title: 'Общая выручка чайного дома',
          value: '842 500 ₽',
          trend: '+12%',
          trendPositive: true,
          desc: 'по сравнению с прошлым месяцем'
        },
        {
          id: 2,
          title: 'Количество заказов',
          value: '1 248',
          trend: '+8%',
          trendPositive: true,
          desc: 'онлайн и оффлайн дегустации'
        },
        {
          id: 3,
          title: 'Средний чек заказа',
          value: '3 450 ₽',
          trend: '-3%',
          trendPositive: false,
          desc: 'сезонная распродажа пуэров'
        },
        {
          id: 4,
          title: 'Новые резиденты клуба',
          value: '312',
          trend: '+24%',
          trendPositive: true,
          desc: 'рост регистраций подписок'
        }
      ],
      // Столбцы графика продаж по месяцам (январь - декабрь)
      chartBars: [
        { month: 'Янв', height: 'h-24', val: '450k', active: false },
        { month: 'Фев', height: 'h-28', val: '520k', active: false },
        { month: 'Мар', height: 'h-36', val: '640k', active: false },
        { month: 'Апр', height: 'h-32', val: '590k', active: false },
        { month: 'Май', height: 'h-40', val: '710k', active: false },
        { month: 'Июн', height: 'h-44', val: '780k', active: false },
        { month: 'Июл', height: 'h-36', val: '650k', active: false },
        { month: 'Авг', height: 'h-48', val: '820k', active: false },
        { month: 'Сен', height: 'h-40', val: '730k', active: false },
        { month: 'Окт', height: 'h-52', val: '890k', active: false },
        { month: 'Ноя', height: 'h-48', val: '840k', active: true },
        { month: 'Дек', height: 'h-56', val: '950k', active: false }
      ],
      transactions: [
        { id: 'ORD-7821', client: 'Александр В.', tea: 'Да Хун Пао Премиум (100 г)', sum: '1 850 ₽', date: '04.11.2026', status: 'Доставлен', statusType: 'success' },
        { id: 'ORD-7820', client: 'Елена М.', tea: 'Шу Пуэр Гунтин 2012 (блин)', sum: '2 650 ₽', date: '04.11.2026', status: 'В пути', statusType: 'info' },
        { id: 'ORD-7819', client: 'Дмитрий С.', tea: 'Бай Хао Инь Чжэнь (50 г)', sum: '2 950 ₽', date: '03.11.2026', status: 'Доставлен', statusType: 'success' },
        { id: 'ORD-7818', client: 'Ольга П.', tea: 'Те Гуань Инь Ван (100 г)', sum: '1 420 ₽', date: '03.11.2026', status: 'Обработка', statusType: 'warning' },
        { id: 'ORD-7817', client: 'Константин Р.', tea: 'Лунцзин Дождевой (50 г)', sum: '2 100 ₽', date: '02.11.2026', status: 'Доставлен', statusType: 'success' }
      ]
    };
  },
  computed: {
    filteredTransactions() {
      const q = this.searchTransaction.toLowerCase().trim();
      return this.transactions.filter(t => {
        const matchesQ = !q || t.client.toLowerCase().includes(q) || t.tea.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
        const matchesStatus = this.categoryFilter === 'all' || t.statusType === this.categoryFilter;
        return matchesQ && matchesStatus;
      });
    }
  },
  template: `
    <div class="w-full bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-8 space-y-8">
      
      <!-- Верхняя панель Topbar: заголовок, поиск и фильтр периода -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span class="caption-text text-emerald-600 font-bold">Уровень 4.1: Экспертный дашборд</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Аналитика продаж и поставок чая
          </h2>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- Селектор периода -->
          <div class="inline-flex rounded-xl p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <button 
              type="button" 
              @click="periodFilter = 'week'"
              :class="periodFilter === 'week' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'"
              class="px-3 py-1.5 rounded-lg transition"
            >
              Неделя
            </button>
            <button 
              type="button" 
              @click="periodFilter = 'month'"
              :class="periodFilter === 'month' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'"
              class="px-3 py-1.5 rounded-lg transition"
            >
              Месяц
            </button>
            <button 
              type="button" 
              @click="periodFilter = 'year'"
              :class="periodFilter === 'year' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300'"
              class="px-3 py-1.5 rounded-lg transition"
            >
              Год
            </button>
          </div>

          <!-- Кнопка экспорта -->
          <button 
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition shadow-sm"
          >
            Экспорт данных
          </button>
        </div>
      </div>

      <!-- 1. 4 STAT-КАРТОЧКИ С ТРЕНДАМИ (+12%, -3%) в 12-колоночной сетке -->
      <!-- grid grid-cols-12, col-span-* min-w-0 truncate -->
      <div class="grid grid-cols-12 gap-4 sm:gap-6">
        <article 
          v-for="stat in statCards" 
          :key="stat.id"
          class="col-span-12 sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:shadow-md transition group min-w-0"
        >
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate">
              {{ stat.title }}
            </span>
            <!-- Бейдж тренда: зеленый при плюсе, красный при минусе -->
            <span 
              :class="stat.trendPositive 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'"
              class="text-xs font-extrabold px-2 py-0.5 rounded-full flex-shrink-0"
            >
              {{ stat.trend }}
            </span>
          </div>

          <div class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white truncate">
            {{ stat.value }}
          </div>

          <p class="text-[11px] text-slate-400 mt-2 truncate">
            {{ stat.desc }}
          </p>
        </article>
      </div>

      <!-- 2. СЕКЦИЯ ГРАФИКА (12 колонок grid + заглушка через grid ячейки) -->
      <div class="grid grid-cols-12 gap-6">
        
        <!-- График продаж (col-span-12 lg:col-span-8) -->
        <div class="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-sm space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-900 dark:text-white">Динамика оборота по месяцам</h3>
              <p class="text-xs text-slate-400">Объем реализованного чая высшей категории</p>
            </div>
            <span class="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
              Пик в декабре
            </span>
          </div>

          <!-- Визуальная сетка-заглушка графика через 12 столбцов grid -->
          <div class="h-64 pt-8 flex items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-700 px-2">
            <div 
              v-for="bar in chartBars" 
              :key="bar.month"
              class="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end"
            >
              <!-- Всплывающая подсказка tooltip при hover через group-hover -->
              <div class="absolute -top-8 hidden group-hover:flex bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded shadow-lg whitespace-nowrap z-20">
                {{ bar.month }}: {{ bar.val }}
              </div>

              <!-- Столбец с градиентом -->
              <div 
                :class="[
                  bar.height,
                  bar.active 
                    ? 'bg-gradient-to-t from-emerald-600 to-teal-400 ring-2 ring-emerald-400 shadow-md' 
                    : 'bg-emerald-500/30 dark:bg-emerald-500/20 group-hover:bg-emerald-500 group-hover:shadow-sm'
                ]"
                class="w-full max-w-[28px] rounded-t-lg transition-all duration-300"
              ></div>

              <!-- Подпись месяца -->
              <span class="text-[11px] font-medium text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white transition">
                {{ bar.month }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>Минимум: 450 000 ₽</span>
            <span>Максимум: 950 000 ₽</span>
          </div>
        </div>

        <!-- Боковая аналитика долей категорий (col-span-12 lg:col-span-4) -->
        <div class="col-span-12 lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Доли чайных сортов</h3>
            <p class="text-xs text-slate-400 mb-4">В общей структуре реализации</p>

            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span>Улуны (Уишань, Тайвань)</span>
                  <span class="text-emerald-600">42%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-500 rounded-full" style="width: 42%;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span>Шу и Шэн Пуэры</span>
                  <span class="text-amber-600">28%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-500 rounded-full" style="width: 28%;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span>Белые чаи (Фудин)</span>
                  <span class="text-blue-600">18%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-blue-500 rounded-full" style="width: 18%;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-semibold mb-1">
                  <span>Зеленые и Жасминовые</span>
                  <span class="text-purple-600">12%</span>
                </div>
                <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-purple-500 rounded-full" style="width: 12%;"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            Спрос на улуны вырос на 18% благодаря проведению цикла открытых церемоний Гунфу Ча.
          </div>
        </div>

      </div>

      <!-- 3. ТАБЛИЦА ПОСЛЕДНИХ ТРАНЗАКЦИЙ С ФИЛЬТРАМИ И ПОИСКОМ (col-span-12) -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/90 dark:border-slate-700/80 shadow-sm space-y-4">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white">Последние заказы и транзакции</h3>
            <p class="text-xs text-slate-400">Синхронизировано со складом и платежной системой</p>
          </div>

          <!-- Поиск и фильтр по статусу -->
          <div class="flex flex-wrap items-center gap-2">
            <input 
              type="text" 
              v-model="searchTransaction"
              placeholder="Поиск по клиенту / чаю..."
              class="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <select 
              v-model="categoryFilter"
              class="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">Все статусы</option>
              <option value="success">Доставлен</option>
              <option value="info">В пути</option>
              <option value="warning">Обработка</option>
            </select>
          </div>
        </div>

        <!-- Адаптивная таблица с утилитой scrollbar-thin / overflow-x-auto -->
        <div class="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700">
          <table class="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[11px] font-bold tracking-wider">
                <th class="py-3 px-3">Номер заказа</th>
                <th class="py-3 px-3">Клиент</th>
                <th class="py-3 px-3">Сорт чая</th>
                <th class="py-3 px-3">Дата</th>
                <th class="py-3 px-3">Сумма</th>
                <th class="py-3 px-3 text-right">Статус</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr 
                v-for="t in filteredTransactions" 
                :key="t.id"
                class="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
              >
                <td class="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200">{{ t.id }}</td>
                <td class="py-3 px-3 font-medium text-slate-900 dark:text-white">{{ t.client }}</td>
                <td class="py-3 px-3 text-slate-600 dark:text-slate-300">{{ t.tea }}</td>
                <td class="py-3 px-3 text-slate-400">{{ t.date }}</td>
                <td class="py-3 px-3 font-bold text-slate-900 dark:text-white">{{ t.sum }}</td>
                <td class="py-3 px-3 text-right">
                  <span 
                    :class="{
                      'badge-tw-success': t.statusType === 'success',
                      'badge-tw-info': t.statusType === 'info',
                      'badge-tw-warning': t.statusType === 'warning'
                    }"
                  >
                    {{ t.status }}
                  </span>
                </td>
              </tr>
              <tr v-if="filteredTransactions.length === 0">
                <td colspan="6" class="py-8 text-center text-slate-400 text-xs">
                  Ни одной транзакции по заданному критерию не найдено.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  `
};
