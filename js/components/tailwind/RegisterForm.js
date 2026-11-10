/**
 * RegisterForm.js — Задание 2.4: Форма регистрации
 * Требования:
 * - Email, пароль, подтверждение пароля
 * - Чекбокс согласия
 * - Валидация через peer-invalid:, peer-focus:
 * - Индикатор силы пароля (полоски)
 * - Кнопка Submit с loading-состоянием (через group)
 * - Требования: peer, peer-invalid:border-red-500, focus:ring-2, disabled:opacity-50
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.RegisterForm = {
  name: 'RegisterForm',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: false,
      isLoading: false,
      successMessage: false
    };
  },
  computed: {
    // Вычисление силы пароля: 0..4
    passwordStrength() {
      const p = this.password;
      if (!p) return 0;
      let score = 0;
      if (p.length >= 8) score++;
      if (/[A-Z]/.test(p) || /[А-Я]/.test(p)) score++;
      if (/[0-9]/.test(p)) score++;
      if (/[^A-Za-z0-9]/.test(p)) score++;
      return score;
    },
    strengthText() {
      switch (this.passwordStrength) {
        case 0: return 'Введите надежный пароль';
        case 1: return 'Слабый пароль';
        case 2: return 'Средний пароль';
        case 3: return 'Хороший пароль';
        case 4: return 'Отличный надежный пароль';
        default: return '';
      }
    },
    passwordsMatch() {
      if (!this.confirmPassword) return true;
      return this.password === this.confirmPassword;
    },
    isFormValid() {
      return (
        this.email.length > 3 &&
        this.password.length >= 6 &&
        this.password === this.confirmPassword &&
        this.agreeTerms
      );
    }
  },
  methods: {
    handleSubmit() {
      if (!this.isFormValid) return;
      this.isLoading = true;
      this.successMessage = false;

      setTimeout(() => {
        this.isLoading = false;
        this.successMessage = true;
        this.password = '';
        this.confirmPassword = '';
      }, 1800);
    }
  },
  template: `
    <div class="w-full max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-700">
      
      <!-- Заголовок формы -->
      <div class="text-center space-y-2 mb-8">
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Регистрация в чайном клубе</h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Получите персональную скидку 10% и доступ к закрытым лотам чая
        </p>
      </div>

      <!-- Сообщение об успешной регистрации -->
      <div 
        v-if="successMessage" 
        class="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm flex items-center justify-between"
      >
        <span>Аккаунт успешно создан! На вашу почту отправлено письмо с подтверждением.</span>
        <button type="button" @click="successMessage = false" class="text-xs font-bold underline ml-2">Скрыть</button>
      </div>

      <!-- Форма регистрации -->
      <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
        
        <!-- 1. Поле Email с валидацией через peer, peer-invalid:border-red-500, focus:ring-2 -->
        <div class="relative space-y-1">
          <label for="reg-email" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Электронная почта
          </label>
          <div class="relative">
            <input 
              id="reg-email"
              type="email" 
              required
              v-model="email"
              placeholder="name@teahouse.ru"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
              class="peer w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 peer-invalid:border-red-500 peer-invalid:text-red-900 dark:peer-invalid:border-red-500 transition-colors"
            />
            <!-- Сообщение об ошибке при невалидном email через peer -->
            <p class="hidden peer-invalid:block text-[11px] text-red-600 dark:text-red-400 mt-1">
              Пожалуйста, введите корректный адрес электронной почты
            </p>
          </div>
        </div>

        <!-- 2. Поле Пароль с индикатором силы -->
        <div class="space-y-1.5">
          <label for="reg-password" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Пароль
          </label>
          <input 
            id="reg-password"
            type="password" 
            required
            v-model="password"
            placeholder="Минимум 6 символов, буквы и цифры"
            class="peer w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          />

          <!-- Индикатор силы пароля: полоски прогресса -->
          <div class="pt-1 space-y-1">
            <div class="grid grid-cols-4 gap-1.5 h-1.5">
              <div 
                :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700'"
                class="rounded-full transition-colors duration-300"
              ></div>
              <div 
                :class="passwordStrength >= 2 ? 'bg-amber-500' : 'bg-slate-200 dark:bg-slate-700'"
                class="rounded-full transition-colors duration-300"
              ></div>
              <div 
                :class="passwordStrength >= 3 ? 'bg-blue-500' : 'bg-slate-200 dark:bg-slate-700'"
                class="rounded-full transition-colors duration-300"
              ></div>
              <div 
                :class="passwordStrength >= 4 ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'"
                class="rounded-full transition-colors duration-300"
              ></div>
            </div>
            <div class="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span>Сложность:</span>
              <span class="font-medium text-slate-700 dark:text-slate-300">{{ strengthText }}</span>
            </div>
          </div>
        </div>

        <!-- 3. Поле Подтверждение пароля -->
        <div class="space-y-1">
          <label for="reg-confirm" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Подтверждение пароля
          </label>
          <input 
            id="reg-confirm"
            type="password" 
            required
            v-model="confirmPassword"
            placeholder="Повторите введенный пароль"
            :class="!passwordsMatch ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'"
            class="w-full px-4 py-2.5 rounded-xl text-sm border bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          />
          <p v-if="!passwordsMatch" class="text-[11px] text-red-600 dark:text-red-400 mt-1">
            Пароли не совпадают
          </p>
        </div>

        <!-- 4. Чекбокс согласия -->
        <div class="pt-2">
          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="agreeTerms" 
              required
              class="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-600 dark:bg-slate-900"
            />
            <span class="text-xs text-slate-600 dark:text-slate-400 leading-normal">
              Я соглашаюсь с правилами чайного клуба и обработкой персональных данных
            </span>
          </label>
        </div>

        <!-- 5. Кнопка Submit с loading-состоянием через group и disabled:opacity-50 -->
        <div class="pt-3">
          <button 
            type="submit" 
            :disabled="!isFormValid || isLoading"
            :data-loading="isLoading"
            class="group w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-emerald-600/25 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <!-- Спиннер загрузки при data-loading="true" -->
            <svg 
              v-if="isLoading" 
              class="animate-spin w-4 h-4 text-white" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isLoading ? 'Создание учетной записи...' : 'Зарегистрироваться' }}</span>
          </button>
        </div>

      </form>

    </div>
  `
};
