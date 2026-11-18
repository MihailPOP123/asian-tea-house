/**
 * MultiStepForm.js — Задание 4.2: Многошаговая форма
 * Требования:
 * - Прогресс-бар (степпер)
 * - 4 шага: Личные данные -> Адрес -> Оплата -> Подтверждение
 * - Навигация Back/Next
 * - Все состояния: disabled, error, success
 * - Индикаторы валидации
 * - Использовать:
 *   - aria-* атрибуты (aria-current="step", aria-invalid, aria-required)
 *   - has-[:checked]:* (нововведение Tailwind 3.4+ для стилизации карточек выбора опций)
 *   - data-[state=*]:* (селекторы data-атрибутов)
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.MultiStepForm = {
  name: 'MultiStepForm',
  data() {
    return {
      currentStep: 1, // 1..4
      isSubmitting: false,
      isCompleted: false,

      // Шаг 1: Личные данные
      formData: {
        fullName: 'Михаил Алексеевич',
        phone: '+7 (999) 123-45-67',
        email: 'tea-lover@example.com',
        
        // Шаг 2: Адрес и способ доставки
        city: 'Москва',
        address: 'ул. Чайковского, д. 14, кв. 28',
        deliveryType: 'courier', // 'courier' | 'pickup' | 'express'
        postalCode: '101000',

        // Шаг 3: Оплата
        paymentMethod: 'card', // 'card' | 'sbp' | 'cash'
        cardNumber: '4276 •••• •••• 9812',
        cardExpiry: '12/28',

        // Комментарий
        notes: 'Пожалуйста, упаковать чайный блин в подарочную коробку'
      },

      errors: {
        fullName: false,
        phone: false,
        email: false,
        address: false
      }
    };
  },
  computed: {
    canProceed() {
      if (this.currentStep === 1) {
        return this.formData.fullName.trim().length > 2 && this.formData.phone.trim().length > 6;
      }
      if (this.currentStep === 2) {
        return this.formData.city.trim().length > 1 && this.formData.address.trim().length > 3;
      }
      if (this.currentStep === 3) {
        return !!this.formData.paymentMethod;
      }
      return true;
    }
  },
  methods: {
    nextStep() {
      if (!this.canProceed) return;
      if (this.currentStep < 4) {
        this.currentStep++;
      } else {
        this.submitOrder();
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    goToStep(step) {
      if (step < this.currentStep) {
        this.currentStep = step;
      }
    },
    submitOrder() {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        this.isCompleted = true;
      }, 1500);
    },
    resetForm() {
      this.isCompleted = false;
      this.currentStep = 1;
    }
  },
  template: `
    <div class="w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-700 transition-colors">
      
      <!-- Заголовок формы -->
      <div class="text-center space-y-2 mb-8">
        <span class="caption-text text-emerald-600 font-bold">Уровень 4.2: Оформление заказа</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Многошаговое оформление заказа чая
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Использование Tailwind v3.4+ селекторов has-[:checked]:* и data-[state=*]:*
        </p>
      </div>

      <!-- 1. СТЕППЕР (ПРОГРЕСС-БАР) с data-[state=*]:* и aria-* атрибутами -->
      <nav aria-label="Этапы оформления заказа" class="mb-10">
        <ol class="grid grid-cols-4 gap-2 text-center">
          
          <!-- Шаг 1 -->
          <li 
            :data-state="currentStep === 1 ? 'active' : (currentStep > 1 ? 'completed' : 'pending')"
            :aria-current="currentStep === 1 ? 'step' : null"
            class="group cursor-pointer select-none"
            @click="goToStep(1)"
          >
            <div 
              class="h-2 rounded-full mb-2 transition-all duration-300 group-data-[state=active]:bg-emerald-600 group-data-[state=completed]:bg-emerald-500 group-data-[state=pending]:bg-slate-200 dark:group-data-[state=pending]:bg-slate-700"
            ></div>
            <span class="block text-xs font-bold transition-colors group-data-[state=active]:text-emerald-600 dark:group-data-[state=active]:text-emerald-400 group-data-[state=completed]:text-slate-700 dark:group-data-[state=completed]:text-slate-300 group-data-[state=pending]:text-slate-400">
              1. Контакты
            </span>
          </li>

          <!-- Шаг 2 -->
          <li 
            :data-state="currentStep === 2 ? 'active' : (currentStep > 2 ? 'completed' : 'pending')"
            :aria-current="currentStep === 2 ? 'step' : null"
            class="group cursor-pointer select-none"
            @click="goToStep(2)"
          >
            <div 
              class="h-2 rounded-full mb-2 transition-all duration-300 group-data-[state=active]:bg-emerald-600 group-data-[state=completed]:bg-emerald-500 group-data-[state=pending]:bg-slate-200 dark:group-data-[state=pending]:bg-slate-700"
            ></div>
            <span class="block text-xs font-bold transition-colors group-data-[state=active]:text-emerald-600 dark:group-data-[state=active]:text-emerald-400 group-data-[state=completed]:text-slate-700 dark:group-data-[state=completed]:text-slate-300 group-data-[state=pending]:text-slate-400">
              2. Доставка
            </span>
          </li>

          <!-- Шаг 3 -->
          <li 
            :data-state="currentStep === 3 ? 'active' : (currentStep > 3 ? 'completed' : 'pending')"
            :aria-current="currentStep === 3 ? 'step' : null"
            class="group cursor-pointer select-none"
            @click="goToStep(3)"
          >
            <div 
              class="h-2 rounded-full mb-2 transition-all duration-300 group-data-[state=active]:bg-emerald-600 group-data-[state=completed]:bg-emerald-500 group-data-[state=pending]:bg-slate-200 dark:group-data-[state=pending]:bg-slate-700"
            ></div>
            <span class="block text-xs font-bold transition-colors group-data-[state=active]:text-emerald-600 dark:group-data-[state=active]:text-emerald-400 group-data-[state=completed]:text-slate-700 dark:group-data-[state=completed]:text-slate-300 group-data-[state=pending]:text-slate-400">
              3. Оплата
            </span>
          </li>

          <!-- Шаг 4 -->
          <li 
            :data-state="currentStep === 4 ? 'active' : (isCompleted ? 'completed' : 'pending')"
            :aria-current="currentStep === 4 ? 'step' : null"
            class="group cursor-pointer select-none"
            @click="goToStep(4)"
          >
            <div 
              class="h-2 rounded-full mb-2 transition-all duration-300 group-data-[state=active]:bg-emerald-600 group-data-[state=completed]:bg-emerald-500 group-data-[state=pending]:bg-slate-200 dark:group-data-[state=pending]:bg-slate-700"
            ></div>
            <span class="block text-xs font-bold transition-colors group-data-[state=active]:text-emerald-600 dark:group-data-[state=active]:text-emerald-400 group-data-[state=completed]:text-slate-700 dark:group-data-[state=completed]:text-slate-300 group-data-[state=pending]:text-slate-400">
              4. Финал
            </span>
          </li>

        </ol>
      </nav>

      <!-- Успешное завершение заказа -->
      <div v-if="isCompleted" class="py-12 text-center space-y-4 animate-fade-in">
        <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Заказ успешно оформлен!</h3>
        <p class="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          Номер вашего отправления: <strong class="text-emerald-600">TEA-2026-9941</strong>. Менеджер свяжется с вами для подтверждения времени курьерской доставки.
        </p>
        <div class="pt-4">
          <button type="button" @click="resetForm" class="btn-tw-md btn-tw-primary">
            Оформить новый заказ
          </button>
        </div>
      </div>

      <!-- Контейнер шагов формы -->
      <form v-else @submit.prevent="nextStep" class="space-y-6">
        
        <!-- ШАГ 1: ЛИЧНЫЕ ДАННЫЕ -->
        <fieldset v-if="currentStep === 1" class="space-y-4 animate-fade-in">
          <legend class="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700 w-full">
            Контактные данные покупателя
          </legend>

          <div class="space-y-1">
            <label for="step1-name" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              ФИО получателя *
            </label>
            <input 
              id="step1-name"
              type="text" 
              required
              v-model="formData.fullName"
              aria-required="true"
              placeholder="Иванов Иван Иванович"
              class="input-tw"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label for="step1-phone" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Телефон *
              </label>
              <input 
                id="step1-phone"
                type="tel" 
                required
                v-model="formData.phone"
                aria-required="true"
                placeholder="+7 (___) ___-__-__"
                class="input-tw"
              />
            </div>
            <div class="space-y-1">
              <label for="step1-email" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Электронная почта
              </label>
              <input 
                id="step1-email"
                type="email" 
                v-model="formData.email"
                placeholder="client@mail.ru"
                class="input-tw"
              />
            </div>
          </div>
        </fieldset>

        <!-- ШАГ 2: АДРЕС И СПОСОБ ДОСТАВКИ (Демонстрация has-[:checked]:*) -->
        <fieldset v-if="currentStep === 2" class="space-y-5 animate-fade-in">
          <legend class="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700 w-full">
            Адрес и способ доставки
          </legend>

          <!-- Выбор способа доставки через Tailwind 3.4+ has-[:checked]:* -->
          <div class="space-y-2">
            <span class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Выберите вариант доставки:</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <!-- Карточка 1: Курьер (has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/50 has-[:checked]:ring-2) -->
              <label class="has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/50 dark:has-[:checked]:bg-emerald-950/40 has-[:checked]:ring-2 has-[:checked]:ring-emerald-500/20 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between">
                <div class="flex items-start justify-between">
                  <span class="text-xs font-bold text-slate-900 dark:text-white">Курьер до двери</span>
                  <input type="radio" name="delivery" value="courier" v-model="formData.deliveryType" class="text-emerald-600 focus:ring-emerald-500" />
                </div>
                <div class="mt-2">
                  <span class="block text-sm font-extrabold text-slate-900 dark:text-white">12 BYN</span>
                  <span class="text-[11px] text-slate-400">1-2 дня</span>
                </div>
              </label>

              <!-- Карточка 2: Экспресс -->
              <label class="has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/50 dark:has-[:checked]:bg-emerald-950/40 has-[:checked]:ring-2 has-[:checked]:ring-emerald-500/20 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between">
                <div class="flex items-start justify-between">
                  <span class="text-xs font-bold text-slate-900 dark:text-white">Экспресс-доставка</span>
                  <input type="radio" name="delivery" value="express" v-model="formData.deliveryType" class="text-emerald-600 focus:ring-emerald-500" />
                </div>
                <div class="mt-2">
                  <span class="block text-sm font-extrabold text-slate-900 dark:text-white">25 BYN</span>
                  <span class="text-[11px] text-slate-400">Сегодня за 3 часа</span>
                </div>
              </label>

              <!-- Карточка 3: Самовывоз -->
              <label class="has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/50 dark:has-[:checked]:bg-emerald-950/40 has-[:checked]:ring-2 has-[:checked]:ring-emerald-500/20 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all flex flex-col justify-between">
                <div class="flex items-start justify-between">
                  <span class="text-xs font-bold text-slate-900 dark:text-white">Чайная комната</span>
                  <input type="radio" name="delivery" value="pickup" v-model="formData.deliveryType" class="text-emerald-600 focus:ring-emerald-500" />
                </div>
                <div class="mt-2">
                  <span class="block text-sm font-extrabold text-slate-900 dark:text-white">Бесплатно</span>
                  <span class="text-[11px] text-slate-400">Готово через 1 час</span>
                </div>
              </label>

            </div>
          </div>

          <!-- Поля города и адреса -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="sm:col-span-1 space-y-1">
              <label for="step2-city" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Город *</label>
              <input id="step2-city" type="text" required v-model="formData.city" class="input-tw" />
            </div>
            <div class="sm:col-span-2 space-y-1">
              <label for="step2-address" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Улица, дом, квартира *</label>
              <input id="step2-address" type="text" required v-model="formData.address" class="input-tw" />
            </div>
          </div>
        </fieldset>

        <!-- ШАГ 3: ОПЛАТА (has-[:checked]:* селекторы) -->
        <fieldset v-if="currentStep === 3" class="space-y-5 animate-fade-in">
          <legend class="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700 w-full">
            Способ оплаты
          </legend>

          <div class="space-y-3">
            <!-- Вариант 1: Банковская карта онлайн -->
            <label class="has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/50 dark:has-[:checked]:bg-emerald-950/40 has-[:checked]:ring-2 has-[:checked]:ring-emerald-500/20 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all block">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                    <input type="radio" name="payment" value="card" v-model="formData.paymentMethod" class="text-emerald-600 focus:ring-emerald-500" />
                  </span>
                  <div>
                    <span class="text-sm font-bold text-slate-900 dark:text-white block">Банковская карта онлайн</span>
                    <span class="text-xs text-slate-400">Мир, Visa, Mastercard, UnionPay</span>
                  </div>
                </div>
                <span class="text-xs font-semibold text-emerald-600">Кэшбэк 3%</span>
              </div>
            </label>

            <!-- Вариант 2: СБП (Система быстрых платежей) -->
            <label class="has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/50 dark:has-[:checked]:bg-emerald-950/40 has-[:checked]:ring-2 has-[:checked]:ring-emerald-500/20 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all block">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                    <input type="radio" name="payment" value="sbp" v-model="formData.paymentMethod" class="text-emerald-600 focus:ring-emerald-500" />
                  </span>
                  <div>
                    <span class="text-sm font-bold text-slate-900 dark:text-white block">Система быстрых платежей (СБП)</span>
                    <span class="text-xs text-slate-400">Оплата по QR-коду в приложении вашего банка</span>
                  </div>
                </div>
                <span class="text-xs font-semibold text-indigo-600">Мгновенно</span>
              </div>
            </label>

            <!-- Вариант 3: Наличными при получении -->
            <label class="has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/50 dark:has-[:checked]:bg-emerald-950/40 has-[:checked]:ring-2 has-[:checked]:ring-emerald-500/20 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 cursor-pointer transition-all block">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <span class="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                    <input type="radio" name="payment" value="cash" v-model="formData.paymentMethod" class="text-emerald-600 focus:ring-emerald-500" />
                  </span>
                  <div>
                    <span class="text-sm font-bold text-slate-900 dark:text-white block">Оплата курьеру при получении</span>
                    <span class="text-xs text-slate-400">Картой или наличными после проверки целостности упаковки</span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </fieldset>

        <!-- ШАГ 4: ПОДТВЕРЖДЕНИЕ И СВОДКА -->
        <fieldset v-if="currentStep === 4" class="space-y-4 animate-fade-in">
          <legend class="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-700 w-full">
            Проверка данных заказа перед отправкой
          </legend>

          <div class="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 space-y-3 text-xs sm:text-sm">
            <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400">Получатель:</span>
              <span class="font-bold text-slate-900 dark:text-white">{{ formData.fullName }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400">Телефон:</span>
              <span class="font-medium text-slate-900 dark:text-white">{{ formData.phone }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400">Адрес доставки:</span>
              <span class="font-medium text-slate-900 dark:text-white">{{ formData.city }}, {{ formData.address }}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-200/60 dark:border-slate-800">
              <span class="text-slate-400">Способ оплаты:</span>
              <span class="font-semibold text-emerald-600">
                {{ formData.paymentMethod === 'card' ? 'Банковская карта онлайн' : (formData.paymentMethod === 'sbp' ? 'СБП по QR-коду' : 'При получении') }}
              </span>
            </div>
            <div class="flex justify-between pt-2 text-base font-extrabold text-slate-900 dark:text-white">
              <span>Итого к оплате:</span>
              <span>125 BYN</span>
            </div>
          </div>
        </fieldset>

        <!-- Кнопки навигации по шагам (Назад / Далее / Подтвердить) -->
        <div class="pt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-4">
          <button 
            type="button" 
            @click="prevStep"
            :disabled="currentStep === 1"
            class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Назад
          </button>

          <button 
            type="submit" 
            :disabled="!canProceed || isSubmitting"
            class="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-600/25 transition flex items-center gap-2"
          >
            <svg v-if="isSubmitting" class="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ currentStep === 4 ? (isSubmitting ? 'Оформление...' : 'Подтвердить и заказать') : 'Продолжить' }}</span>
          </button>
        </div>

      </form>

    </div>
  `
};
