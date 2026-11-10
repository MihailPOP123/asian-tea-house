
window.ExcelUploader = {
  name: 'ExcelUploader',
  emits: ['file-error', 'import-success', 'navigate'],
  data() {
    return {
      isDragging: false,
      isProcessing: false,
      lastImportResult: null
    };
  },
  methods: {
    // Проверка, является ли файл файлом Excel (.xlsx, .xls)
    isExcelFile(file) {
      if (!file) return false;
      const validExtensions = ['.xlsx', '.xls'];
      const fileNameLower = file.name.toLowerCase();
      const hasValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));

      const validMimeTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/msexcel',
        'application/x-msexcel',
        'application/x-ms-excel',
        'application/x-excel',
        'application/x-dos_ms_excel',
        'application/xls',
        'application/x-xls'
      ];

      return hasValidExt || validMimeTypes.includes(file.type);
    },

    triggerFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
        this.$refs.fileInput.click();
      }
    },

    handleFileSelect(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        this.processFile(files[0]);
      }
    },

    handleDrop(event) {
      this.isDragging = false;
      const files = event.dataTransfer.files;
      if (files && files.length > 0) {
        this.processFile(files[0]);
      }
    },

    processFile(file) {
      // 1. Проверяем валидность формата файла
      if (!this.isExcelFile(file)) {
        // Вызываем модальное окно ошибки согласно требованию 1
        this.$emit('file-error', {
          fileName: file.name,
          fileType: file.type || 'Неизвестный тип',
          fileSize: (file.size / 1024).toFixed(1) + ' КБ'
        });
        return;
      }

      
      this.isProcessing = true;

      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          // Используем SheetJS
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          if (!jsonData || jsonData.length === 0) {
            throw new Error('Файл Excel не содержит данных или таблица пуста');
          }

          
          const base64Data = this.arrayBufferToBase64(e.target.result);

          const fileMeta = {
            name: file.name,
            size: file.size,
            type: file.type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            base64Data: base64Data
          };

          const excelTableItems = await window.ExcelTableService.addRows(jsonData, fileMeta);
          const importedItems = await window.TeaApiService.importFromExcel(jsonData, fileMeta);

          this.lastImportResult = {
            fileName: file.name,
            count: excelTableItems.length,
            timestamp: new Date().toLocaleTimeString('ru-RU')
          };

          this.$emit('import-success', {
            fileName: file.name,
            count: excelTableItems.length,
            items: excelTableItems
          });

        } catch (err) {
          console.error('Ошибка при обработке Excel файла:', err);
          this.$emit('file-error', {
            fileName: file.name,
            fileType: 'Ошибка структуры данных: ' + err.message,
            fileSize: (file.size / 1024).toFixed(1) + ' КБ'
          });
        } finally {
          this.isProcessing = false;
        }
      };

      reader.onerror = () => {
        this.isProcessing = false;
        this.$emit('file-error', {
          fileName: file.name,
          fileType: 'Ошибка чтения файла',
          fileSize: (file.size / 1024).toFixed(1) + ' КБ'
        });
      };

      reader.readAsArrayBuffer(file);
    },

    arrayBufferToBase64(buffer) {
      let binary = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    },

   
    downloadSampleExcel() {
      const sampleData = [
        {
          'Название': 'Жасминовый Дракон (Премиум)',
          'Цена': 44.50,
          'Категория': 'Белый чай',
          'Описание': 'Скрученный вручную белый чай с нежнейшим ароматом цветов ночного жасмина',
          'Количество': 25,
          'Происхождение': 'Фуцзянь, Китай',
          'Рейтинг': 4.9,
          'Изображение': 'images/product-image(3).png'
        },
        {
          'Название': 'Алишань Улун Высокогорный',
          'Цена': 52.00,
          'Категория': 'Улун',
          'Описание': 'Свежий тайваньский улун с молочно-цветочными нотами и сладким послевкусием',
          'Количество': 14,
          'Происхождение': 'Тайвань',
          'Рейтинг': 5.0,
          'Изображение': 'images/product-image(1).png'
        },
        {
          'Название': 'Императорский Кокурича',
          'Цена': 36.00,
          'Категория': 'Зеленый чай',
          'Описание': 'Японский купаж с насыщенным травянистым вкусом и витаминами',
          'Количество': 30,
          'Происхождение': 'Киото, Япония',
          'Рейтинг': 4.8,
          'Изображение': 'images/product-image.png'
        }
      ];

      try {
        window.exportToExcel(sampleData, 'Образец_поставки_чая_AsianTeaHouse.xlsx', 'Чайная коллекция');
      } catch (err) {
        alert('Ошибка при скачивании шаблона: ' + err.message);
      }
    }
  },
  template: `
    <div class="excel-uploader-card card border-0 shadow-sm rounded-lg p-4 bg-white">
      <div class="text-center mb-3">
        <h3 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
          Загрузка чайных коллекций из Excel
        </h3>
        <p class="text-muted small mb-0">
          Принимаются исключительно файлы формата <strong>.XLSX</strong> и <strong>.XLS</strong>.
          Данные автоматически заносятся в таблицу, а файл переносится в локальное хранилище.
        </p>
      </div>

      <!-- Drag-and-Drop зона -->
      <div 
        class="dropzone-area p-4 text-center rounded border-dashed"
        :class="{ 'dropzone-active': isDragging, 'dropzone-processing': isProcessing }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
        style="cursor: pointer; border: 2px dashed #C17854; background: #FAF7F2; border-radius: var(--radius-md); transition: all 0.2s ease;"
      >
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileSelect" 
          style="display: none;"
        >

        <div v-if="!isProcessing" class="py-2">
          <!-- Элегантная векторная иконка загрузки (без эмодзи) -->
          <div class="mb-3 d-inline-flex align-items-center justify-content-center" style="width: 52px; height: 52px; background: rgba(193, 120, 84, 0.1); border-radius: 50%;">
            <svg style="width: 28px; height: 28px; fill: none; stroke: var(--accent-brown); stroke-width: 2;" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          <h5 class="font-weight-bold mb-1" style="color: var(--accent-dark);">
            Перетащите файл Excel сюда (Drag and Drop)
          </h5>
          <p class="text-muted small mb-3">
            или нажмите в любую область для классического выбора файла через проводник
          </p>

          <div class="d-inline-flex align-items-center">
            <button 
              type="button" 
              class="btn text-white px-4 py-2 font-weight-bold shadow-sm" 
              style="background-color: var(--accent-brown); border-radius: var(--radius-sm);"
              @click.stop="triggerFileInput"
            >
              Выбрать файл Excel на компьютере
            </button>
          </div>
        </div>

        <div v-else class="py-4">
          <div class="spinner-border text-warning mb-3" role="status" style="width: 3rem; height: 3rem;">
            <span class="sr-only">Обработка...</span>
          </div>
          <h5 class="font-weight-bold text-dark mb-1">Чтение и парсинг книги Excel...</h5>
          <p class="text-muted small mb-0">Сохранение файла в локальное хранилище и добавление данных в таблицу</p>
        </div>
      </div>

      <!-- Дополнительные действия -->
      <div class="d-flex flex-wrap justify-content-between align-items-center mt-3 pt-2 border-top small">
        <div class="text-muted mb-2 mb-md-0">
          <span class="badge badge-success mr-1">.XLSX</span>
          <span class="badge badge-info mr-2">.XLS</span>
          <em>Любой другой формат вызовет предупреждающее модальное окно.</em>
        </div>

        <button 
          type="button" 
          class="btn btn-outline-secondary btn-sm"
          @click.stop="downloadSampleExcel"
          title="Скачать готовый файл Excel для тестирования валидации и парсинга"
        >
          Скачать готовый шаблон Excel
        </button>
      </div>

      <!-- Уведомление о последнем успешном импорте -->
      <div v-if="lastImportResult" class="alert alert-success mt-3 mb-0 py-2 px-3 small d-flex flex-wrap align-items-center justify-content-between">
        <div>
          <strong>Успешно импортировано!</strong> Файл <u>{{ lastImportResult.fileName }}</u> (добавлено сортов: {{ lastImportResult.count }}).
          Файл перенесен в локальное хранилище.
        </div>
        <div class="d-flex align-items-center mt-2 mt-md-0">
          <button 
            type="button" 
            class="btn btn-success btn-sm font-weight-bold px-3 py-1 mr-2"
            @click="$emit('navigate', 'excel-table')"
          >
            Открыть таблицу Excel на новой странице &rarr;
          </button>
          <span class="text-muted">{{ lastImportResult.timestamp }}</span>
        </div>
      </div>
    </div>
  `
};
