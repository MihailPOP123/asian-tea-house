/**
 * CeremonyView.js — Интерактивный подбор и оформление чайной церемонии
 * Единая интеграция MultiStepForm из Tailwind в архитектуру Asian Tea House
 */
window.CeremonyView = {
  name: 'CeremonyView',
  components: {
    'multi-step-form': window.MultiStepForm
  },
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['navigate', 'toast'],
  template: `
    <div class="ceremony-view py-5" style="background-color: var(--bg-color); min-height: 85vh;">
      <div class="container py-2">
        
        <!-- Заголовок раздела -->
        <div class="text-center max-w-2xl mx-auto mb-5">
          <div class="text-uppercase font-weight-bold text-muted small mb-1" style="letter-spacing: 0.12em; font-size: 0.75rem;">
            Персонализированный ритуал
          </div>
          <h2 class="font-weight-bold mb-2" style="font-family: var(--font-serif); color: var(--accent-dark); font-size: 2.2rem;">
            Подбор и заказ чайной церемонии
          </h2>
          <p class="text-muted" style="max-width: 600px; margin: 0 auto; font-size: 0.95rem; line-height: 1.6;">
            Пройдите 4 простых шага: укажите ваши контакты, адрес доставки, выберите метод оплаты и подтвердите параметры заказа редких сортов или церемониального набора.
          </p>
        </div>

        <!-- Преимущества сервиса подбора -->
        <div class="row justify-content-center mb-5">
          <div class="col-lg-10">
            <div class="row text-center">
              <div class="col-md-4 mb-3">
                <div class="p-3 bg-white rounded-lg shadow-sm border border-light h-100">
                  <div class="font-weight-bold text-dark mb-1">Прямой терруар</div>
                  <div class="small text-muted">Сбор с высокогорных плантаций Удзи, Уишань и Юньнань без посредников</div>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="p-3 bg-white rounded-lg shadow-sm border border-light h-100">
                  <div class="font-weight-bold text-dark mb-1">Изотермическая упаковка</div>
                  <div class="small text-muted">Вакуумные металлизированные пакеты с сохранением эфирных масел</div>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <div class="p-3 bg-white rounded-lg shadow-sm border border-light h-100">
                  <div class="font-weight-bold text-dark mb-1">Паспорт лота и проливы</div>
                  <div class="small text-muted">Точная инструкция по температуре воды, граммовке и выбору чайной посуды</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Интегрированная многошаговая форма из Tailwind (has-[:checked], data-[state=*]) -->
        <div class="d-flex justify-content-center">
          <div class="w-100" style="max-width: 820px;">
            <multi-step-form></multi-step-form>
          </div>
        </div>

      </div>
    </div>
  `
};
