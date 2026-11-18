/**
 * ChatView.js — Онлайн-чат поддержки и консультаций с чайными сомелье
 * Единая интеграция мессенджера Tailwind в архитектуру Asian Tea House
 */
window.ChatView = {
  name: 'ChatView',
  components: {
    'messenger-chat': window.MessengerChat
  },
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['navigate', 'toast'],
  template: `
    <div class="chat-view py-4" style="background-color: var(--bg-color); min-height: 85vh;">
      <div class="container py-2">
        
        <!-- Шапка раздела чата -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">
          <div>
            <div class="text-uppercase font-weight-bold text-muted small mb-1" style="letter-spacing: 0.12em; font-size: 0.75rem;">
              Прямая связь с чайным домом
            </div>
            <h2 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Чат с чайными мастерами и сомелье
            </h2>
            <p class="text-muted small mb-0">
              Индивидуальные консультации по выбору чая, рекомендации по температуре заваривания и статус доставки
            </p>
          </div>

          <div class="d-flex align-items-center mt-3 mt-md-0">
            <div class="mr-3 text-right d-none d-sm-block">
              <div class="small font-weight-bold text-success d-flex align-items-center justify-content-end">
                <span class="d-inline-block rounded-circle bg-success mr-1.5" style="width: 8px; height: 8px;"></span>
                Мастера онлайн
              </div>
              <div class="text-muted" style="font-size: 0.72rem;">Среднее время ответа: 2 минуты</div>
            </div>
            <button 
              class="btn btn-outline-dark font-weight-bold px-3 py-2"
              style="border-radius: var(--radius-sm);"
              @click="$emit('navigate', 'home')"
            >
              Вернуться на главную &rarr;
            </button>
          </div>
        </div>

        <!-- Подсказки по темам обращения -->
        <div class="row mb-4">
          <div class="col-md-4 mb-2">
            <div class="card border-0 shadow-sm bg-white p-3 h-100" style="border-radius: var(--radius-md);">
              <div class="font-weight-bold small text-dark mb-1">Подбор чайного сорта</div>
              <p class="text-muted small mb-0">Поможем выбрать улун или пуэр под ваше настроение и ритуал дня.</p>
            </div>
          </div>
          <div class="col-md-4 mb-2">
            <div class="card border-0 shadow-sm bg-white p-3 h-100" style="border-radius: var(--radius-md);">
              <div class="font-weight-bold small text-dark mb-1">Служба логистики и склад</div>
              <p class="text-muted small mb-0">Уточнение трек-номера посылки и изотермической упаковки.</p>
            </div>
          </div>
          <div class="col-md-4 mb-2">
            <div class="card border-0 shadow-sm bg-white p-3 h-100" style="border-radius: var(--radius-md);">
              <div class="font-weight-bold small text-dark mb-1">Академия церемоний Гунфу</div>
              <p class="text-muted small mb-0">Запись на очные дегустации и закрытые субботние семинары.</p>
            </div>
          </div>
        </div>

        <!-- Интегрированный мессенджер из Tailwind -->
        <div class="shadow-sm rounded-lg overflow-hidden">
          <messenger-chat></messenger-chat>
        </div>

      </div>
    </div>
  `
};
