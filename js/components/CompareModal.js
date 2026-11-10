/**
 * CompareModal.js — Компонент сравнения состояния объекта до и после изменения
 * Задание 2: «В данной таблице предусмотреть возможность сравнения состояния объекта
 * до изменения и после изменения через использования компонента vuejs для сравнения vue-json-compare»
 */
window.CompareModal = {
  name: 'CompareModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    logEntry: {
      type: Object,
      default: null
    }
  },
  emits: ['close'],
  computed: {
    hasStates() {
      return this.logEntry && (this.logEntry.oldState || this.logEntry.newState);
    },
    allKeys() {
      if (!this.logEntry) return [];
      const oldKeys = this.logEntry.oldState ? Object.keys(this.logEntry.oldState) : [];
      const newKeys = this.logEntry.newState ? Object.keys(this.logEntry.newState) : [];
      return Array.from(new Set([...oldKeys, ...newKeys]));
    },
    formattedOldJson() {
      if (!this.logEntry || !this.logEntry.oldState) return 'null (объект не существовал)';
      return JSON.stringify(this.logEntry.oldState, null, 2);
    },
    formattedNewJson() {
      if (!this.logEntry || !this.logEntry.newState) return 'null (объект удален)';
      return JSON.stringify(this.logEntry.newState, null, 2);
    }
  },
  methods: {
    isKeyChanged(key) {
      if (!this.logEntry) return false;
      const oldVal = this.logEntry.oldState ? this.logEntry.oldState[key] : undefined;
      const newVal = this.logEntry.newState ? this.logEntry.newState[key] : undefined;
      return JSON.stringify(oldVal) !== JSON.stringify(newVal);
    },
    isKeyAdded(key) {
      return this.logEntry && (!this.logEntry.oldState || !(key in this.logEntry.oldState)) && (this.logEntry.newState && key in this.logEntry.newState);
    },
    isKeyRemoved(key) {
      return this.logEntry && (this.logEntry.oldState && key in this.logEntry.oldState) && (!this.logEntry.newState || !(key in this.logEntry.newState));
    },
    formatVal(val) {
      if (val === undefined) return '<не задано>';
      if (val === null) return 'null';
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    }
  },
  template: `
    <div v-if="show" class="modal-backdrop-custom" @click.self="$emit('close')">
      <div class="modal-dialog-custom modal-dialog-centered modal-xl" role="document">
        <div class="modal-content shadow-lg border-0 rounded-lg">
          <!-- Заголовок -->
          <div class="modal-header py-3 px-4 bg-dark text-white">
            <div>
              <h5 class="modal-title font-weight-bold mb-0">
                Сравнение состояния объекта (JSON Diff Compare)
              </h5>
              <div class="small text-muted mt-1" v-if="logEntry">
                Запись #{{ logEntry.id }} | Действие: <span class="badge badge-info">{{ logEntry.actionName }}</span>
                | Объект: <strong>{{ logEntry.entityTitle || logEntry.entity }}</strong>
              </div>
            </div>
            <button type="button" class="btn btn-sm btn-outline-light" @click="$emit('close')" aria-label="Закрыть">
              Закрыть
            </button>
          </div>

          <div class="modal-body p-4" style="max-height: 75vh; overflow-y: auto;">
            <div v-if="!hasStates" class="alert alert-warning text-center">
              Для данного действия нет сохраненных снимков состояния (старого или нового).
            </div>

            <div v-else>
              <!-- Легенда изменений -->
              <div class="d-flex align-items-center mb-3 p-2 bg-light rounded border">
                <span class="small font-weight-bold mr-3 text-secondary">Легенда:</span>
                <span class="badge badge-danger mr-2">Удалено / Старое</span>
                <span class="badge badge-success mr-2">Добавлено / Новое</span>
                <span class="badge badge-warning mr-2">Изменено значение</span>
                <span class="badge badge-secondary">Без изменений</span>
              </div>

              <!-- Табличное визуальное сравнение полей -->
              <div class="card mb-4 border">
                <div class="card-header bg-light py-2 font-weight-bold small text-uppercase">
                  Детальное сравнение полей объекта
                </div>
                <div class="table-responsive">
                  <table class="table table-bordered table-sm mb-0 align-middle">
                    <thead class="thead-light">
                      <tr>
                        <th style="width: 25%;">Свойство (Ключ)</th>
                        <th style="width: 37.5%;" class="text-danger">Состояние ДО изменения</th>
                        <th style="width: 37.5%;" class="text-success">Состояние ПОСЛЕ изменения</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr 
                        v-for="key in allKeys" 
                        :key="key"
                        :class="{
                          'table-warning': isKeyChanged(key) && !isKeyAdded(key) && !isKeyRemoved(key),
                          'table-success': isKeyAdded(key),
                          'table-danger': isKeyRemoved(key)
                        }"
                      >
                        <td class="font-weight-bold font-monospace small">
                          <code>{{ key }}</code>
                          <span v-if="isKeyAdded(key)" class="badge badge-success float-right">+ new</span>
                          <span v-else-if="isKeyRemoved(key)" class="badge badge-danger float-right">- deleted</span>
                          <span v-else-if="isKeyChanged(key)" class="badge badge-warning float-right">~ changed</span>
                        </td>
                        <td class="font-monospace small bg-light-danger" style="white-space: pre-wrap; word-break: break-all;">
                          {{ logEntry.oldState ? formatVal(logEntry.oldState[key]) : '—' }}
                        </td>
                        <td class="font-monospace small bg-light-success" style="white-space: pre-wrap; word-break: break-all;">
                          {{ logEntry.newState ? formatVal(logEntry.newState[key]) : '—' }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Сравнение сырого JSON (vue-json-compare стиль) -->
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="card h-100 border-danger">
                    <div class="card-header bg-danger text-white py-2 font-weight-bold small d-flex justify-content-between">
                      <span>ДО ИЗМЕНЕНИЯ (JSON)</span>
                      <span>Old State</span>
                    </div>
                    <div class="card-body p-2 bg-dark">
                      <pre class="text-light mb-0 p-2 small font-monospace" style="max-height: 250px; overflow-y: auto;">{{ formattedOldJson }}</pre>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <div class="card h-100 border-success">
                    <div class="card-header bg-success text-white py-2 font-weight-bold small d-flex justify-content-between">
                      <span>ПОСЛЕ ИЗМЕНЕНИЯ (JSON)</span>
                      <span>New State</span>
                    </div>
                    <div class="card-body p-2 bg-dark">
                      <pre class="text-light mb-0 p-2 small font-monospace" style="max-height: 250px; overflow-y: auto;">{{ formattedNewJson }}</pre>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Детали действия -->
              <div class="alert alert-info mb-0 small">
                <strong>Информация о событии:</strong> {{ logEntry.details || 'Изменение сохранено в журнал аудита' }}
                <br>
                <strong>Автор:</strong> {{ logEntry.userName }} ({{ logEntry.user }})
                &nbsp;|&nbsp;
                <strong>Время:</strong> {{ new Date(logEntry.timestamp).toLocaleString('ru-RU') }}
              </div>
            </div>
          </div>

          <div class="modal-footer bg-light py-2 px-4">
            <button type="button" class="btn btn-secondary px-4" @click="$emit('close')">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};
