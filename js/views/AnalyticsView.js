/**
 * AnalyticsView.js — Единый аналитический центр Asian Tea House
 * Интеграция графиков выручки, трендов продаж, канбан-логистики и клубных подписок из Tailwind
 */
window.AnalyticsView = {
  name: 'AnalyticsView',
  props: {
    teas: {
      type: Array,
      default: () => []
    },
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['navigate', 'toast'],
  components: {
    'analytics-dashboard': window.AnalyticsDashboard,
    'kanban-board': window.KanbanBoard,
    'pricing-table': window.PricingTable
  },
  data() {
    return {
      activeTab: 'finance' // 'finance' | 'kanban' | 'club'
    };
  },
  methods: {
    exportReport() {
      this.$emit('toast', {
        type: 'success',
        title: 'Формирование отчета',
        message: 'Аналитический отчет за текущий квартал выгружен в формате Excel.'
      });
    }
  },
  template: `
    <div class="analytics-view py-4" style="background-color: var(--bg-color); min-height: 85vh;">
      <div class="container-fluid px-lg-5">
        
        <!-- Шапка аналитического центра -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <div class="text-uppercase font-weight-bold text-muted small mb-1" style="letter-spacing: 0.12em; font-size: 0.75rem;">
              Бизнес-метрики и финансовый мониторинг
            </div>
            <h2 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Аналитика чайного дома
            </h2>
            <p class="text-muted small mb-0">
              Интерактивные графики выручки, мониторинг поставок, динамика заказов и резидентский клуб
            </p>
          </div>

          <div class="d-flex flex-wrap align-items-center gap-2 mt-3 mt-md-0">
            <button 
              class="btn text-white font-weight-bold px-3 py-2 mr-2 shadow-sm"
              style="background-color: var(--accent-brown); border-radius: var(--radius-sm);"
              @click="$emit('navigate', 'table')"
            >
              Открыть каталог сортов
            </button>
            <button 
              class="btn btn-outline-dark font-weight-bold px-3 py-2 shadow-sm"
              style="border-radius: var(--radius-sm);"
              @click="exportReport"
            >
              Экспорт отчета
            </button>
          </div>
        </div>

        <!-- Навигационные вкладки разделов аналитики -->
        <div class="card border-0 shadow-sm mb-4 bg-white" style="border-radius: var(--radius-md);">
          <div class="card-body p-2 d-flex flex-wrap align-items-center justify-content-between">
            <div class="btn-group btn-group-sm" style="border-radius: var(--radius-sm); overflow: hidden;">
              <button 
                type="button" 
                class="btn px-3 py-2 font-weight-bold"
                :class="activeTab === 'finance' ? 'btn-dark text-white' : 'btn-outline-secondary'"
                @click="activeTab = 'finance'"
              >
                График продаж и выручка
              </button>
              <button 
                type="button" 
                class="btn px-3 py-2 font-weight-bold"
                :class="activeTab === 'kanban' ? 'btn-dark text-white' : 'btn-outline-secondary'"
                @click="activeTab = 'kanban'"
              >
                Поставки и логистика (Kanban)
              </button>
              <button 
                type="button" 
                class="btn px-3 py-2 font-weight-bold"
                :class="activeTab === 'club' ? 'btn-dark text-white' : 'btn-outline-secondary'"
                @click="activeTab = 'club'"
              >
                Клубные подписки и тарифы
              </button>
            </div>

            <div class="small text-muted font-weight-medium mt-2 mt-md-0 pr-2">
              Синхронизация данных: в реальном времени
            </div>
          </div>
        </div>

        <!-- 1. ВКЛАДКА: ГРАФИКИ ВЫРУЧКИ И ПРОДАЖ (AnalyticsDashboard) -->
        <section v-if="activeTab === 'finance'" class="mb-4">
          <analytics-dashboard></analytics-dashboard>
        </section>

        <!-- 2. ВКЛАДКА: КАНБАН-ДОСКА ПОСТАВОК (KanbanBoard) -->
        <section v-else-if="activeTab === 'kanban'" class="mb-4">
          <div class="card border-0 shadow-sm bg-white p-4" style="border-radius: var(--radius-md);">
            <div class="mb-3">
              <h4 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
                Движение партий чая и контроль заказов
              </h4>
              <p class="text-muted small mb-0">
                Визуальное управление стадиями обработки: сбор на плантациях, лаборатория контроля качества и отправка резидентам
              </p>
            </div>
            <kanban-board></kanban-board>
          </div>
        </section>

        <!-- 3. ВКЛАДКА: КЛУБНЫЕ ПОДПИСКИ (PricingTable) -->
        <section v-else-if="activeTab === 'club'" class="mb-4">
          <div class="card border-0 shadow-sm bg-white p-4" style="border-radius: var(--radius-md);">
            <pricing-table></pricing-table>
          </div>
        </section>

      </div>
    </div>
  `
};
