/**
 * ExcelTable.js — Компонент отдельной спроектированной таблицы данных из Excel
 * Хранит, отображает и управляет данными, распарсенными из файлов .XLSX и .XLS
 */
window.ExcelTable = {
  name: 'ExcelTable',
  emits: ['toast', 'catalog-updated'],
  data() {
    return {
      rows: [],
      isLoading: false,
      searchQuery: '',
      selectedCategory: 'all',
      sortBy: 'default',

      // Пагинация (если строк > 10)
      currentPage: 1,
      itemsPerPage: 10,

      // Модальное окно редактирования строки в отдельной таблице Excel
      showEditModal: false,
      editFormData: {
        id: null,
        title: '',
        price: '',
        category: 'Зеленый чай',
        origin: '',
        stock: 10,
        rating: 4.8,
        desc: ''
      },
      isSavingEdit: false
    };
  },
  computed: {
    categories() {
      const cats = new Set(this.rows.map(r => r.category).filter(Boolean));
      return ['all', ...Array.from(cats)];
    },

    filteredRows() {
      let result = [...this.rows];

      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(r => 
          (r.title && r.title.toLowerCase().includes(q)) ||
          (r.desc && r.desc.toLowerCase().includes(q)) ||
          (r.origin && r.origin.toLowerCase().includes(q)) ||
          (r.sourceFile && r.sourceFile.toLowerCase().includes(q))
        );
      }

      if (this.selectedCategory !== 'all') {
        result = result.filter(r => r.category === this.selectedCategory);
      }

      if (this.sortBy === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === 'title') {
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      } else if (this.sortBy === 'stock') {
        result.sort((a, b) => b.stock - a.stock);
      }

      return result;
    },

    totalRows() {
      return this.filteredRows.length;
    },

    totalPages() {
      return Math.ceil(this.totalRows / this.itemsPerPage) || 1;
    },

    displayedRows() {
      if (this.totalRows <= this.itemsPerPage) {
        return this.filteredRows;
      }
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredRows.slice(start, start + this.itemsPerPage);
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
    selectedCategory() {
      this.currentPage = 1;
    }
  },
  async mounted() {
    await this.fetchRows();
  },
  methods: {
    async fetchRows() {
      this.isLoading = true;
      try {
        this.rows = await window.ExcelTableService.getAll();
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка загрузки таблицы Excel',
          message: err.message
        });
      } finally {
        this.isLoading = false;
      }
    },

    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    openEditModal(row) {
      this.editFormData = {
        id: row.id,
        title: row.title || '',
        price: row.price !== undefined ? row.price : 30,
        category: row.category || 'Зеленый чай',
        origin: row.origin || 'Восточная Азия',
        stock: row.stock !== undefined ? row.stock : 10,
        rating: row.rating !== undefined ? row.rating : 4.8,
        desc: row.desc || ''
      };
      this.showEditModal = true;
    },

    async saveRowEdit() {
      if (!this.editFormData.title.trim()) {
        alert('Укажите наименование чая');
        return;
      }
      this.isSavingEdit = true;
      try {
        await window.ExcelTableService.updateRow(this.editFormData.id, {
          title: this.editFormData.title.trim(),
          price: parseFloat(this.editFormData.price) || 0,
          category: this.editFormData.category,
          origin: this.editFormData.origin,
          stock: parseInt(this.editFormData.stock, 10) || 0,
          rating: parseFloat(this.editFormData.rating) || 5.0,
          desc: this.editFormData.desc
        });
        this.showEditModal = false;
        await this.fetchRows();
        this.$emit('toast', {
          type: 'success',
          title: 'Запись обновлена',
          message: `Строка «${this.editFormData.title}» в таблице Excel успешно сохранена.`
        });
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка сохранения',
          message: err.message
        });
      } finally {
        this.isSavingEdit = false;
      }
    },

    async deleteRow(row) {
      if (confirm(`Удалить запись «${row.title}» из отдельной таблицы Excel?`)) {
        try {
          await window.ExcelTableService.deleteRow(row.id);
          await this.fetchRows();
          this.$emit('toast', {
            type: 'info',
            title: 'Запись удалена',
            message: `Строка «${row.title}» удалена из отдельной таблицы Excel.`
          });
        } catch (err) {
          this.$emit('toast', {
            type: 'danger',
            title: 'Ошибка удаления',
            message: err.message
          });
        }
      }
    },

    async transferToCatalog(row) {
      try {
        await window.ExcelTableService.transferToCatalog(row.id);
        this.$emit('catalog-updated');
        this.$emit('toast', {
          type: 'success',
          title: 'Перенос в общий каталог',
          message: `Сорт «${row.title}» успешно скопирован в общую таблицу сортов чая.`
        });
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка переноса',
          message: err.message
        });
      }
    },

    async transferAllToCatalog() {
      if (this.rows.length === 0) return;
      if (confirm(`Скопировать все ${this.rows.length} записей из таблицы Excel в общий каталог сортов?`)) {
        try {
          const count = await window.ExcelTableService.transferAllToCatalog();
          this.$emit('catalog-updated');
          this.$emit('toast', {
            type: 'success',
            title: 'Массовый перенос',
            message: `Все ${count} записей успешно добавлены в общую таблицу сортов чая.`
          });
        } catch (err) {
          this.$emit('toast', {
            type: 'danger',
            title: 'Ошибка переноса',
            message: err.message
          });
        }
      }
    },

    exportExcel() {
      try {
        if (!this.filteredRows || this.filteredRows.length === 0) {
          this.$emit('toast', {
            type: 'warning',
            title: 'Предупреждение',
            message: 'В таблице Excel нет данных для экспорта.'
          });
          return;
        }

        const exportData = this.filteredRows.map(r => ({
          'ID': r.id,
          'Файл-источник': r.sourceFile || 'Excel импорт',
          'Название': r.title,
          'Цена ($)': r.price,
          'Категория': r.category,
          'Регион': r.origin || 'Азия',
          'Количество': r.stock,
          'Рейтинг': r.rating,
          'Описание': r.desc,
          'Дата импорта': r.importDate ? new Date(r.importDate).toLocaleString('ru-RU') : ''
        }));

        const fileName = `Отдельная_таблица_Excel_${new Date().toISOString().slice(0, 10)}.xlsx`;
        window.exportToExcel(exportData, fileName, 'Данные Excel');

        this.$emit('toast', {
          type: 'success',
          title: 'Экспорт в Excel',
          message: `Сформирован файл «${fileName}» с данными отдельной таблицы.`
        });
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка экспорта',
          message: err.message
        });
      }
    },

    async resetData() {
      if (confirm('Сбросить отдельную таблицу Excel к начальным образцам?')) {
        await window.ExcelTableService.resetToDefault();
        await this.fetchRows();
        this.$emit('toast', {
          type: 'info',
          title: 'Таблица восстановлена',
          message: 'Отдельная таблица Excel сброшена к начальным образцам.'
        });
      }
    },

    async clearTable() {
      if (confirm('Очистить все записи в отдельной таблице Excel?')) {
        await window.ExcelTableService.clear();
        await this.fetchRows();
        this.$emit('toast', {
          type: 'warning',
          title: 'Таблица очищена',
          message: 'Все записи отдельной таблицы Excel удалены.'
        });
      }
    }
  },
  template: `
    <div class="card border-0 shadow-sm rounded-lg overflow-hidden bg-white mb-5">
      <!-- Шапка отдельной таблицы -->
      <div class="card-header bg-white py-3 px-4 border-bottom d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <div class="d-flex align-items-center mb-1">
            <h4 class="font-weight-bold mb-0 mr-3" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Спроектированная таблица данных из Excel
            </h4>
            <span class="badge badge-success px-2 py-1 font-weight-normal">Отдельная таблица</span>
            <span class="badge badge-secondary ml-2 px-2 py-1 font-weight-bold">Всего строк: {{ rows.length }}</span>
          </div>
          <p class="text-muted small mb-0">
            Данные, автоматически распарсенные из файлов .XLSX и .XLS, заносятся в данную специализированную таблицу
          </p>
        </div>

        <div class="d-flex flex-wrap gap-2 mt-3 mt-md-0">
          <button 
            type="button" 
            class="btn btn-outline-success btn-sm font-weight-bold mr-2 shadow-sm"
            @click="exportExcel"
            title="Выгрузить данные этой отдельной таблицы в Excel"
          >
            Экспорт таблицы в Excel
          </button>

          <button 
            type="button" 
            class="btn btn-outline-primary btn-sm font-weight-bold mr-2 shadow-sm"
            @click="transferAllToCatalog"
            :disabled="rows.length === 0"
            title="Скопировать все строки в общую таблицу сортов"
          >
            Перенести все в каталог
          </button>

          <button 
            type="button" 
            class="btn btn-outline-secondary btn-sm mr-2"
            @click="resetData"
            title="Восстановить образец данных"
          >
            Сброс к образцам
          </button>

          <button 
            type="button" 
            class="btn btn-outline-danger btn-sm"
            @click="clearTable"
            :disabled="rows.length === 0"
            title="Очистить таблицу Excel"
          >
            Очистить таблицу
          </button>
        </div>
      </div>

      <!-- Панель фильтров и поиска -->
      <div class="card-body bg-light border-bottom p-3">
        <div class="row align-items-center">
          <div class="col-md-5 mb-2 mb-md-0">
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white font-weight-bold">Поиск:</span>
              </div>
              <input 
                type="text" 
                class="form-control" 
                placeholder="По названию, файлу, региону или описанию..." 
                v-model="searchQuery"
              >
            </div>
          </div>

          <div class="col-md-3 mb-2 mb-md-0">
            <select class="form-control form-control-sm custom-select" v-model="selectedCategory">
              <option value="all">Все категории ({{ rows.length }})</option>
              <option v-for="cat in categories.filter(c => c !== 'all')" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div class="col-md-4 text-md-right small text-muted">
            Показано: <b>{{ displayedRows.length }}</b> из <b>{{ totalRows }}</b> строк
          </div>
        </div>
      </div>

      <!-- Таблица -->
      <div class="table-responsive">
        <table class="table table-hover table-striped mb-0 align-middle">
          <thead class="thead-dark" style="background-color: var(--accent-dark);">
            <tr>
              <th style="width: 45px;">#</th>
              <th>Файл-источник</th>
              <th>Наименование сорта</th>
              <th>Категория</th>
              <th>Регион</th>
              <th class="text-right">Цена ($)</th>
              <th class="text-center">Остаток</th>
              <th class="text-center">Рейтинг</th>
              <th>Дата импорта</th>
              <th class="text-right" style="width: 250px;">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading">
              <td colspan="10" class="text-center py-4">
                <div class="spinner-border text-warning" role="status"></div>
                <div class="mt-2 text-muted small">Загрузка данных отдельной таблицы...</div>
              </td>
            </tr>

            <tr v-else-if="displayedRows.length === 0">
              <td colspan="10" class="text-center py-5 text-muted">
                <h5 class="font-weight-bold">В таблице Excel пока нет строк</h5>
                <p class="small mb-2">Загрузите файл Excel через форму выше, перетащите файл методом Drag and Drop, или восстановите образцы.</p>
                <button type="button" class="btn btn-sm btn-outline-secondary" @click="resetData">
                  Загрузить образец данных
                </button>
              </td>
            </tr>

            <tr v-for="(row, index) in displayedRows" :key="row.id">
              <td class="text-muted small font-weight-bold">
                {{ ((currentPage - 1) * itemsPerPage) + index + 1 }}
              </td>
              <td>
                <span class="badge badge-light border text-truncate text-secondary font-monospace" style="max-width: 150px;" :title="row.sourceFile">
                  {{ row.sourceFile || 'Excel файл' }}
                </span>
              </td>
              <td>
                <div class="font-weight-bold text-dark" style="font-family: var(--font-serif); font-size: 0.98rem;">
                  {{ row.title }}
                </div>
                <div class="text-muted small text-truncate" style="max-width: 280px;" :title="row.desc">
                  {{ row.desc }}
                </div>
              </td>
              <td>
                <span class="badge badge-light border text-secondary font-weight-normal px-2 py-1">
                  {{ row.category }}
                </span>
              </td>
              <td class="small text-muted">
                {{ row.origin || 'Азия' }}
              </td>
              <td class="text-right font-weight-bold text-danger">
                \${{ (row.price || 0).toFixed(2) }}
              </td>
              <td class="text-center">
                <span 
                  class="badge" 
                  :class="{
                    'badge-success': row.stock > 10,
                    'badge-warning': row.stock > 0 && row.stock <= 10,
                    'badge-danger': row.stock === 0
                  }"
                >
                  {{ row.stock }} шт.
                </span>
              </td>
              <td class="text-center small text-dark font-weight-bold">
                {{ row.rating }}
              </td>
              <td class="small text-muted font-monospace">
                {{ row.importDate ? new Date(row.importDate).toLocaleDateString('ru-RU') : '—' }}
              </td>
              <td class="text-right">
                <div class="btn-group btn-group-sm">
                  <button 
                    type="button" 
                    class="btn btn-outline-primary" 
                    @click="openEditModal(row)"
                    title="Редактировать строку"
                  >
                    Редактировать
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-info" 
                    @click="transferToCatalog(row)"
                    title="Скопировать этот сорт в общую таблицу"
                  >
                    В каталог
                  </button>
                  <button 
                    type="button" 
                    class="btn btn-outline-danger" 
                    @click="deleteRow(row)"
                    title="Удалить строку"
                  >
                    Удалить
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Пагинация отдельной таблицы (если строк > 10) -->
      <div v-if="totalPages > 1" class="card-footer bg-light d-flex justify-content-between align-items-center py-2 px-3">
        <span class="text-muted small">Страница {{ currentPage }} из {{ totalPages }}</span>
        <nav aria-label="Excel Table Navigation">
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="setPage(currentPage - 1)">Назад</a>
            </li>
            <li 
              v-for="page in totalPages" 
              :key="page" 
              class="page-item" 
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click.prevent="setPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="setPage(currentPage + 1)">Вперед</a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Модальное окно редактирования строки в отдельной таблице Excel -->
      <div v-if="showEditModal" class="modal-backdrop-custom" @click.self="showEditModal = false">
        <div class="modal-dialog-custom modal-dialog-centered" role="document">
          <div class="modal-content shadow-lg border-0 rounded-lg">
            <div class="modal-header bg-dark text-white py-3 px-4">
              <h5 class="modal-title font-weight-bold">
                Редактирование записи таблицы Excel
              </h5>
              <button type="button" class="btn btn-sm btn-outline-light" @click="showEditModal = false">
                Закрыть
              </button>
            </div>
            <form @submit.prevent="saveRowEdit">
              <div class="modal-body p-4">
                <div class="form-group mb-3">
                  <label class="font-weight-bold small text-muted text-uppercase">Наименование сорта *</label>
                  <input type="text" class="form-control" v-model="editFormData.title" required>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold small text-muted text-uppercase">Цена ($) *</label>
                    <input type="number" step="0.01" min="0" class="form-control" v-model="editFormData.price" required>
                  </div>
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold small text-muted text-uppercase">Категория</label>
                    <input type="text" class="form-control" v-model="editFormData.category">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold small text-muted text-uppercase">Регион происхождения</label>
                    <input type="text" class="form-control" v-model="editFormData.origin">
                  </div>
                  <div class="form-group col-md-6 mb-3">
                    <label class="font-weight-bold small text-muted text-uppercase">Остаток на складе</label>
                    <input type="number" min="0" class="form-control" v-model="editFormData.stock">
                  </div>
                </div>
                <div class="form-group mb-0">
                  <label class="font-weight-bold small text-muted text-uppercase">Описание</label>
                  <textarea class="form-control" rows="3" v-model="editFormData.desc"></textarea>
                </div>
              </div>
              <div class="modal-footer bg-light p-3">
                <button type="button" class="btn btn-secondary px-3" @click="showEditModal = false">Отмена</button>
                <button type="submit" class="btn btn-success px-4" :disabled="isSavingEdit">
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
};
