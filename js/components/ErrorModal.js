/**
 * ErrorModal.js — Модальное окно ошибки неподходящего формата файла
 * Требование: «Все файлы, не являющиеся файлами excel должны приводить к выводу
 * модального окна с ошибкой и информацией о формате подходящих файлов.»
 */
window.ErrorModal = {
  name: 'ErrorModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    errorInfo: {
      type: Object,
      default: () => ({
        fileName: '',
        fileType: '',
        fileSize: ''
      })
    }
  },
  emits: ['close'],
  template: `
    <div v-if="show" class="modal-backdrop-custom" @click.self="$emit('close')">
      <div class="modal-dialog-custom modal-dialog-centered" role="document">
        <div class="modal-content shadow-lg border-danger">
          <div class="modal-header bg-danger text-white py-3">
            <h5 class="modal-title font-weight-bold">
              Внимание: Ошибка формата файла
            </h5>
            <button type="button" class="btn btn-sm btn-outline-light" @click="$emit('close')" aria-label="Закрыть">
              Закрыть
            </button>
          </div>
          <div class="modal-body p-4">
            <div class="text-center mb-3">
              <div class="badge badge-danger p-2 mb-2 text-uppercase font-weight-bold" style="font-size: 0.85rem;">
                Ошибка валидации
              </div>
              <h5 class="text-danger font-weight-bold">Выбран недопустимый тип файла</h5>
              <p class="text-muted small">
                Загрузка отклонена системой валидации. Вы попытались загрузить файл, не являющийся электронной таблицей Excel.
              </p>
            </div>

            <!-- Данные об отклоненном файле -->
            <div class="alert alert-light border mb-4 p-3 rounded">
              <div class="font-weight-bold small text-uppercase text-secondary mb-2">Сведения о загруженном файле:</div>
              <div class="d-flex justify-content-between small py-1 border-bottom">
                <span class="text-muted">Имя файла:</span>
                <strong class="text-danger">{{ errorInfo.fileName || 'Неизвестно' }}</strong>
              </div>
              <div class="d-flex justify-content-between small py-1 border-bottom">
                <span class="text-muted">MIME-тип:</span>
                <span class="badge badge-secondary font-monospace">{{ errorInfo.fileType || 'Не определен' }}</span>
              </div>
              <div class="d-flex justify-content-between small py-1">
                <span class="text-muted">Размер:</span>
                <span>{{ errorInfo.fileSize || '0 КБ' }}</span>
              </div>
            </div>

            <!-- Информация о подходящих форматах -->
            <div class="card border-info bg-light">
              <div class="card-body p-3">
                <h6 class="card-title text-info font-weight-bold mb-2">
                  Подходящие форматы файлов:
                </h6>
                <ul class="mb-0 small text-dark pl-3" style="line-height: 1.6;">
                  <li>
                    <strong>.XLSX</strong> — Книга Microsoft Excel OpenXML (начиная с 2007 г., <code>application/vnd.openxmlformats-officedocument.spreadsheetml.sheet</code>)
                  </li>
                  <li>
                    <strong>.XLS</strong> — Таблица Microsoft Excel 97-2003 (<code>application/vnd.ms-excel</code>)
                  </li>
                </ul>
                <div class="mt-2 pt-2 border-top small text-muted">
                  <em>Примечание: Таблица должна содержать столбцы: <b>Название</b>, <b>Цена</b>, <b>Категория</b>, <b>Описание</b>, <b>Количество</b>.</em>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer bg-light p-3">
            <button type="button" class="btn btn-secondary px-4" @click="$emit('close')">
              Понятно, закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};
