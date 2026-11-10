/**
 * LogsView.js — Страница журнала истории действий (Задание 2)
 * Требование:
 * «Сделать таблицу Log и вести историю всех действия в этой таблице,
 * вывести данные из таблицы на отдельной странице. В данной таблице
 * предусмотреть возможность сравнения состояния объекта до изменения
 * и после изменения через использования компонента vuejs для сравнения vue-json-compare»
 */
window.LogsView = {
  name: 'LogsView',
  components: {
    'compare-modal': window.CompareModal
  },
  emits: ['toast'],
  data() {
    return {
      logs: [],
      isLoading: false,
      filterAction: 'all',
      searchQuery: '',

      // Модальное окно сравнения состояний до/после
      showCompareModal: false,
      selectedLogForCompare: null
    };
  },
  computed: {
    filteredLogs() {
      let result = [...this.logs];

      if (this.filterAction !== 'all') {
        result = result.filter(l => l.action === this.filterAction);
      }

      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(l => 
          (l.entityTitle && l.entityTitle.toLowerCase().includes(q)) ||
          (l.user && l.user.toLowerCase().includes(q)) ||
          (l.userName && l.userName.toLowerCase().includes(q)) ||
          (l.details && l.details.toLowerCase().includes(q))
        );
      }

      return result;
    }
  },
  async mounted() {
    await this.fetchLogs();
  },
  methods: {
    async fetchLogs() {
      this.isLoading = true;
      try {
        this.logs = await window.LogService.getLogs();
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка журнала',
          message: err.message
        });
      } finally {
        this.isLoading = false;
      }
    },

    openCompare(log) {
      this.selectedLogForCompare = log;
      this.showCompareModal = true;
    },

    async clearAllLogs() {
      if (confirm('Очистить всю историю журнала действий?')) {
        await window.LogService.clearLogs();
        await this.fetchLogs();
        this.$emit('toast', {
          type: 'info',
          title: 'Журнал очищен',
          message: 'История действий была очищена.'
        });
      }
    },

    getActionBadgeClass(action) {
      switch (action) {
        case 'CREATE': return 'badge-success';
        case 'UPDATE': return 'badge-warning text-dark';
        case 'DELETE': return 'badge-danger';
        case 'EXCEL_IMPORT': return 'badge-primary';
        case 'LOGIN': return 'badge-info';
        case 'LOGOUT': return 'badge-secondary';
        case 'REGISTER': return 'badge-success';
        default: return 'badge-dark';
      }
    }
  },
  template: `
    <div class="logs-view py-4" style="background-color: var(--bg-color); min-height: 85vh;">
      <div class="container-fluid px-lg-5">
        <!-- Шапка страницы -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Журнал аудита действий и версий (Audit Log & Compare)
            </h2>
            <p class="text-muted small mb-0">
              Реализация <b>Задания 2</b>: фиксация каждого действия над объектами, вывод истории и сравнение состояния «До / После» (vue-json-compare)
            </p>
          </div>

          <div class="d-flex gap-2 mt-3 mt-md-0">
            <button class="btn btn-outline-danger btn-sm" @click="clearAllLogs">
              Очистить журнал
            </button>
            <button class="btn btn-outline-secondary btn-sm" @click="fetchLogs">
              Обновить
            </button>
          </div>
        </div>

        <!-- Фильтры -->
        <div class="card border-0 shadow-sm rounded-lg mb-4 bg-white">
          <div class="card-body p-3">
            <div class="row align-items-center">
              <div class="col-md-5 mb-2 mb-md-0">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Поиск по пользователю, объекту или описанию..." 
                  v-model="searchQuery"
                >
              </div>

              <div class="col-md-4 mb-2 mb-md-0">
                <select class="form-control custom-select" v-model="filterAction">
                  <option value="all">Все типы событий ({{ logs.length }})</option>
                  <option value="CREATE">Создание товара (CREATE)</option>
                  <option value="UPDATE">Обновление товара (UPDATE)</option>
                  <option value="DELETE">Удаление товара (DELETE)</option>
                  <option value="EXCEL_IMPORT">Импорт из Excel</option>
                  <option value="LOGIN">Авторизация (LOGIN)</option>
                </select>
              </div>

              <div class="col-md-3 text-md-right text-muted small">
                Записей в логе: <b>{{ filteredLogs.length }}</b>
              </div>
            </div>
          </div>
        </div>

        <!-- Таблица логов -->
        <div class="card border-0 shadow-sm rounded-lg overflow-hidden bg-white">
          <div class="table-responsive">
            <table class="table table-hover table-striped mb-0 align-middle">
              <thead class="thead-dark" style="background-color: var(--accent-dark);">
                <tr>
                  <th style="width: 80px;">ID</th>
                  <th style="width: 170px;">Время события</th>
                  <th>Пользователь</th>
                  <th style="width: 150px;">Тип действия</th>
                  <th>Объект / Сорт чая</th>
                  <th>Подробности</th>
                  <th class="text-right" style="width: 190px;">Сравнение состояний</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoading">
                  <td colspan="7" class="text-center py-5">
                    <div class="spinner-border text-warning" role="status"></div>
                    <div class="mt-2 text-muted small">Загрузка журнала действий...</div>
                  </td>
                </tr>

                <tr v-else-if="filteredLogs.length === 0">
                  <td colspan="7" class="text-center py-5 text-muted">
                    <h5>Записи в журнале отсутствуют</h5>
                    <p class="small mb-0">Совершите операции создания, редактирования товара или импорта Excel для наполнения журнала</p>
                  </td>
                </tr>

                <tr v-for="log in filteredLogs" :key="log.id">
                  <td class="font-monospace small font-weight-bold text-muted">
                    #{{ log.id }}
                  </td>
                  <td class="small text-muted font-monospace">
                    {{ new Date(log.timestamp).toLocaleString('ru-RU') }}
                  </td>
                  <td>
                    <div class="font-weight-bold small text-dark">{{ log.userName || 'Неизвестный' }}</div>
                    <div class="text-muted small">{{ log.user }}</div>
                  </td>
                  <td>
                    <span class="badge py-1 px-2" :class="getActionBadgeClass(log.action)">
                      {{ log.actionName || log.action }}
                    </span>
                  </td>
                  <td>
                    <span class="font-weight-bold text-dark">{{ log.entityTitle || '—' }}</span>
                    <span class="badge badge-light border text-muted ml-1">{{ log.entity }}</span>
                  </td>
                  <td class="small text-secondary" style="max-width: 280px;">
                    {{ log.details }}
                  </td>
                  <td class="text-right">
                    <!-- Кнопка сравнения состояния до и после изменения (vue-json-compare) -->
                    <button 
                      v-if="log.oldState || log.newState"
                      class="btn btn-outline-info btn-sm font-weight-bold shadow-sm"
                      @click="openCompare(log)"
                      title="Открыть сравнение объекта До и После изменения"
                    >
                      Сравнить изменения
                    </button>
                    <span v-else class="text-muted small">—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- МОДАЛЬНОЕ ОКНО СРАВНЕНИЯ СОСТОЯНИЙ (vue-json-compare) -->
        <compare-modal 
          :show="showCompareModal"
          :log-entry="selectedLogForCompare"
          @close="showCompareModal = false"
        ></compare-modal>
      </div>
    </div>
  `
};
