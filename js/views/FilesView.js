/**
 * FilesView.js — Модуль просмотра списка загруженных файлов в локальном хранилище
 * Требование: «а сам файл — переносится в локальное хранилище»
 * и «Модуль просмотра списка загруженных файлов в локальном хранилище;
 * возможность удалять файлы из локального хранилища»
 */
window.FilesView = {
  name: 'FilesView',
  emits: ['toast', 'navigate'],
  data() {
    return {
      files: [],
      isLoading: false
    };
  },
  async mounted() {
    await this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      this.isLoading = true;
      try {
        this.files = await window.FileStorageService.getFiles();
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка хранилища',
          message: err.message
        });
      } finally {
        this.isLoading = false;
      }
    },

    downloadFile(file) {
      if (!file.base64Data) {
        alert('Данные файла недоступны для скачивания.');
        return;
      }
      try {
        const byteCharacters = atob(file.base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: file.type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          if (a.parentNode) document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 1000);
      } catch (err) {
        alert('Ошибка при скачивании файла: ' + err.message);
      }
    },

    async deleteFile(file) {
      if (confirm(`Удалить файл «${file.name}» из локального хранилища браузера?`)) {
        await window.FileStorageService.deleteFile(file.id);
        await this.fetchFiles();
        this.$emit('toast', {
          type: 'success',
          title: 'Файл удален',
          message: `Файл «${file.name}» успешно удален из хранилища.`
        });
      }
    }
  },
  template: `
    <div class="files-view py-4" style="background-color: var(--bg-color); min-height: 85vh;">
      <div class="container-fluid px-lg-5">
        <!-- Шапка -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Хранилище загруженных Excel файлов (Локальное хранилище)
            </h2>
            <p class="text-muted small mb-0">
              Список оригиналов файлов Excel, перенесенных в локальное хранилище при импорте каталога
            </p>
          </div>

          <button class="btn btn-outline-primary btn-sm" @click="$emit('navigate', 'home')">
            Загрузить новый файл на Главной
          </button>
        </div>

        <!-- Таблица файлов -->
        <div class="card border-0 shadow-sm rounded-lg overflow-hidden bg-white">
          <div class="table-responsive">
            <table class="table table-hover table-striped mb-0 align-middle">
              <thead class="thead-dark" style="background-color: var(--accent-dark);">
                <tr>
                  <th style="width: 50px;">#</th>
                  <th>Имя файла</th>
                  <th>Формат</th>
                  <th>Размер</th>
                  <th>Импортировано строк</th>
                  <th>Дата и время загрузки</th>
                  <th class="text-right" style="width: 220px;">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoading">
                  <td colspan="7" class="text-center py-5">
                    <div class="spinner-border text-warning" role="status"></div>
                    <div class="mt-2 text-muted small">Чтение файлов из хранилища...</div>
                  </td>
                </tr>

                <tr v-else-if="files.length === 0">
                  <td colspan="7" class="text-center py-5 text-muted">
                    <div class="badge badge-secondary p-2 mb-2 text-uppercase font-weight-bold">Хранилище пусто</div>
                    <h5>В локальном хранилище пока нет файлов</h5>
                    <p class="small mb-3">Загрузите файл Excel на Главной странице, и он автоматически появится здесь</p>
                    <button class="btn text-white btn-sm px-4" style="background-color: var(--accent-brown);" @click="$emit('navigate', 'home')">
                      Перейти к загрузчику
                    </button>
                  </td>
                </tr>

                <tr v-for="(file, index) in files" :key="file.id">
                  <td class="text-muted small font-weight-bold">{{ index + 1 }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <strong class="text-dark">{{ file.name }}</strong>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-success font-monospace">XLSX / XLS</span>
                  </td>
                  <td class="font-monospace small">
                    {{ file.sizeFormatted }}
                  </td>
                  <td>
                    <span class="badge badge-light border font-weight-bold px-2 py-1">
                      {{ file.rowCount }} записей
                    </span>
                  </td>
                  <td class="small text-muted font-monospace">
                    {{ new Date(file.uploadDate).toLocaleString('ru-RU') }}
                  </td>
                  <td class="text-right">
                    <div class="btn-group btn-group-sm">
                      <button 
                        class="btn btn-outline-success font-weight-bold" 
                        @click="downloadFile(file)"
                        title="Скачать файл из локального хранилища"
                      >
                        Скачать
                      </button>
                      <button 
                        class="btn btn-outline-danger" 
                        @click="deleteFile(file)"
                        title="Удалить из хранилища"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
};
