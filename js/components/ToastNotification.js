/**
 * ToastNotification.js — Всплывающие уведомления для асинхронных операций
 */
window.ToastNotification = {
  name: 'ToastNotification',
  props: {
    toasts: {
      type: Array,
      default: () => []
    }
  },
  emits: ['dismiss'],
  template: `
    <div class="toast-container position-fixed" style="top: 20px; right: 20px; z-index: 9999; max-width: 420px;">
      <transition-group name="fade">
        <div 
          v-for="toast in toasts" 
          :key="toast.id" 
          :class="['alert', 'alert-' + (toast.type || 'info'), 'shadow-lg', 'd-flex', 'align-items-start', 'justify-content-between', 'mb-2', 'py-2', 'px-3', 'rounded']"
          role="alert"
        >
          <div class="d-flex align-items-start">
            <span class="mr-2 mt-1 font-weight-bold small text-uppercase" :class="{
              'text-success': toast.type === 'success',
              'text-danger': toast.type === 'danger',
              'text-warning': toast.type === 'warning',
              'text-info': !toast.type || toast.type === 'info'
            }">
              <span v-if="toast.type === 'success'">Успешно:</span>
              <span v-else-if="toast.type === 'danger'">Ошибка:</span>
              <span v-else-if="toast.type === 'warning'">Внимание:</span>
              <span v-else>Инфо:</span>
            </span>
            <div>
              <div v-if="toast.title" class="font-weight-bold small text-uppercase mb-1">{{ toast.title }}</div>
              <div class="small" style="line-height: 1.3;">{{ toast.message }}</div>
            </div>
          </div>
          <button type="button" class="btn btn-sm btn-link text-dark p-0 ml-2" @click="$emit('dismiss', toast.id)" style="font-size: 0.75rem; text-decoration: none;">
            Закрыть
          </button>
        </div>
      </transition-group>
    </div>
  `
};
