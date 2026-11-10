/**
 * ExcelTableView.js — Отдельная страница модуля работы с Excel
 * Содержит загрузчик файлов (.xlsx/.xls) и спроектированную отдельную таблицу данных
 */
window.ExcelTableView = {
  name: 'ExcelTableView',
  components: {
    'excel-uploader': window.ExcelUploader,
    'excel-table': window.ExcelTable
  },
  emits: ['toast', 'navigate', 'teas-updated', 'file-error', 'import-success'],
  methods: {
    handleUploadSuccess(res) {
      this.$emit('import-success', res);
      if (this.$refs.excelTable && this.$refs.excelTable.fetchRows) {
        this.$refs.excelTable.fetchRows();
      }
    },
    handleCatalogUpdated() {
      this.$emit('teas-updated');
    }
  },
  template: `
    <div class="excel-table-view py-4" style="background-color: var(--bg-color); min-height: 85vh;">
      <div class="container-fluid px-lg-5">
        <!-- Шапка страницы -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Модуль работы с Excel (Загрузка и отдельная таблица)
            </h2>
            <p class="text-muted small mb-0">
              Загрузка файлов .XLSX и .XLS, автоматический парсинг, сохранение в локальное хранилище и отдельная таблица коллекций
            </p>
          </div>

          <div class="d-flex flex-wrap gap-2 mt-3 mt-md-0">
            <button class="btn btn-outline-dark btn-sm px-3 font-weight-bold" @click="$emit('navigate', 'home')">
              Вернуться на Главную
            </button>
            <button class="btn btn-outline-secondary btn-sm px-3 font-weight-bold" @click="$emit('navigate', 'table')">
              Общий каталог сортов
            </button>
          </div>
        </div>

        <!-- 1. Модуль загрузки Excel (вынесенный с главной страницы) -->
        <div class="row justify-content-center mb-4">
          <div class="col-12">
            <excel-uploader 
              ref="uploader"
              @file-error="(err) => $emit('file-error', err)"
              @import-success="handleUploadSuccess"
              @navigate="(v) => $emit('navigate', v)"
            ></excel-uploader>
          </div>
        </div>

        <!-- 2. Спроектированная отдельная таблица данных из Excel -->
        <div class="row justify-content-center">
          <div class="col-12">
            <excel-table 
              ref="excelTable" 
              @toast="(t) => $emit('toast', t)"
              @catalog-updated="handleCatalogUpdated"
            ></excel-table>
          </div>
        </div>
      </div>
    </div>
  `
};
