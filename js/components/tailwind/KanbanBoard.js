/**
 * KanbanBoard.js — Задание 3.2: Kanban-доска
 * Требования:
 * - Три колонки (To Do / In Progress / Done)
 * - Карточки задач с тегами, приоритетом, аватарами
 * - Drag-handle (визуальный)
 * - Счётчик задач в колонке
 * - Горизонтальный скролл на мобильных (overflow-x-auto snap-x)
 * - Требования: snap-x snap-mandatory, min-w-[300px], group-hover:*, line-clamp-2
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.KanbanBoard = {
  name: 'KanbanBoard',
  data() {
    return {
      columns: [
        {
          id: 'todo',
          title: 'К выполнению (To Do)',
          badgeColor: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
          tasks: [
            {
              id: 101,
              title: 'Проверка партии Да Хун Пао на влажность',
              desc: 'Отобрать 5 контрольных образцов из новой поставки Уишань и зафиксировать показатели в журнале титестера.',
              tag: 'Контроль качества',
              tagColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
              priority: 'Высокий',
              priorityColor: 'text-rose-600 dark:text-rose-400',
              assignee: 'Ли Вэй',
              avatar: 'images/team-master.jpg'
            },
            {
              id: 102,
              title: 'Подготовка чайных кейсов для дегустации в субботу',
              desc: 'Укомплектовать 12 наборов фарфоровых гайваней и чаш из цзиндэчжэньской глины.',
              tag: 'Клубные встречи',
              tagColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
              priority: 'Средний',
              priorityColor: 'text-amber-600 dark:text-amber-400',
              assignee: 'Анна К.',
              avatar: 'images/collection-2.jpg'
            }
          ]
        },
        {
          id: 'in-progress',
          title: 'В процессе (In Progress)',
          badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
          tasks: [
            {
              id: 201,
              title: 'Фасовка коллекционного белого чая Серебряные Иглы',
              desc: 'Герметичная упаковка партии 10 кг в фольгированные пакеты с азотом для сохранения аромата типсов.',
              tag: 'Склад',
              tagColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
              priority: 'Срочно',
              priorityColor: 'text-rose-600 dark:text-rose-400',
              assignee: 'Сергей Т.',
              avatar: 'images/collection-1.jpg'
            },
            {
              id: 202,
              title: 'Обновление карточек чайных мастеров на сайте',
              desc: 'Добавить сертификаты международной ассоциации титестеров и фото чайных церемоний.',
              tag: 'Маркетинг',
              tagColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
              priority: 'Обычный',
              priorityColor: 'text-slate-500',
              assignee: 'Мария В.',
              avatar: 'images/tea-prep.jpg'
            }
          ]
        },
        {
          id: 'done',
          title: 'Завершено (Done)',
          badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
          tasks: [
            {
              id: 301,
              title: 'Калибровка климатической камеры Шу Пуэров',
              desc: 'Установлен стабильный режим 22°C и 65% влажности для правильной постферментации блинов.',
              tag: 'Оборудование',
              tagColor: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
              priority: 'Выполнено',
              priorityColor: 'text-emerald-600 dark:text-emerald-400',
              assignee: 'Ли Вэй',
              avatar: 'images/team-master.jpg'
            }
          ]
        }
      ]
    };
  },
  methods: {
    onImgError(e) {
      if (e && e.target) {
        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80';
      }
    }
  },
  template: `
    <section class="w-full py-4" aria-label="Kanban доска задач чайного дома">
      
      <!-- Горизонтальный скролл на мобильных устройствах: snap-x snap-mandatory flex gap-4 pb-4 overflow-x-auto -->
      <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 px-1 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        <!-- Колонка доски (min-w-[300px], snap-center) -->
        <div 
          v-for="col in columns" 
          :key="col.id"
          class="flex-1 min-w-[300px] sm:min-w-[320px] max-w-sm snap-center bg-slate-100/80 dark:bg-slate-900/60 rounded-2xl p-4 flex flex-col border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <!-- Заголовок колонки со счётчиком задач -->
          <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80 dark:border-slate-800">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>{{ col.title }}</span>
            </h3>
            <!-- Счётчик задач -->
            <span :class="col.badgeColor" class="px-2.5 py-0.5 rounded-full text-xs font-bold">
              {{ col.tasks.length }}
            </span>
          </div>

          <!-- Список карточек задач в колонке -->
          <div class="flex-1 space-y-3 overflow-y-auto">
            <article 
              v-for="task in col.tasks" 
              :key="task.id"
              class="group bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer"
            >
              <!-- Верхняя строка карточки: drag-handle визуальный + тег категории -->
              <div class="flex items-center justify-between mb-2">
                <span :class="task.tagColor" class="text-[11px] font-semibold px-2 py-0.5 rounded-md">
                  {{ task.tag }}
                </span>

                <!-- Drag-handle (визуальный индикатор 6 точек с подсветкой group-hover:text-slate-600) -->
                <div 
                  class="text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 p-1 cursor-grab"
                  title="Перетащить карточку"
                  aria-label="Ручка для перетаскивания задачи"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 4a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zM7 16a2 2 0 11-4 0 2 2 0 014 0zM17 4a2 2 0 11-4 0 2 2 0 014 0zM17 10a2 2 0 11-4 0 2 2 0 014 0zM17 16a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>

              <!-- Название задачи -->
              <h4 class="text-sm font-bold text-slate-800 dark:text-white mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {{ task.title }}
              </h4>

              <!-- Описание задачи с утилитой line-clamp-2 (из требований) -->
              <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {{ task.desc }}
              </p>

              <!-- Нижняя строка карточки: приоритет и аватар исполнителя -->
              <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-current" :class="task.priorityColor"></span>
                  <span :class="task.priorityColor" class="text-xs font-semibold">
                    {{ task.priority }}
                  </span>
                </div>

                <!-- Аватар исполнителя -->
                <div class="flex items-center gap-1.5">
                  <img 
                    :src="task.avatar" 
                    :alt="task.assignee"
                    class="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    @error="onImgError"
                  />
                  <span class="text-[11px] text-slate-400 font-medium">{{ task.assignee }}</span>
                </div>
              </div>

            </article>
          </div>

          <!-- Кнопка добавления быстрой задачи -->
          <button 
            type="button"
            class="mt-3 w-full py-2 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Добавить задачу</span>
          </button>
        </div>

      </div>

    </section>
  `
};
