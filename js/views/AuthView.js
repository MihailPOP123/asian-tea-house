/**
 * AuthView.js — Страницы авторизации, регистрации и восстановления пароля («из коробки»)
 * Требование: «Страницы авторизации\\регистрации\\восстановления пароля —
 * реализовать «из коробки». После авторизации пользователь получает доступ к странице
 * отображения данных, возможность редактирования и добавления данных в таблицу.»
 */
window.AuthView = {
  name: 'AuthView',
  emits: ['auth-success', 'navigate', 'toast'],
  data() {
    return {
      activeTab: 'login', // 'login' | 'register' | 'recover'
      isLoading: false,
      errorMessage: '',
      successMessage: '',

      // Форма входа
      loginForm: {
        email: 'admin@tea.com',
        password: 'admin',
        remember: true
      },

      // Форма регистрации
      registerForm: {
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        role: 'user'
      },

      // Форма восстановления
      recoverForm: {
        email: '',
        newPassword: '',
        newPasswordConfirm: ''
      }
    };
  },
  methods: {
    setTab(tab) {
      this.activeTab = tab;
      this.errorMessage = '';
      this.successMessage = '';
    },

    quickFill(email, password) {
      this.loginForm.email = email;
      this.loginForm.password = password;
    },

    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = '';
      try {
        const user = await window.AuthService.login(this.loginForm.email, this.loginForm.password);
        this.$emit('auth-success', user);
        this.$emit('toast', {
          type: 'success',
          title: 'Авторизация успешна',
          message: `Добро пожаловать, ${user.name}! Доступ к управлению данными активирован.`
        });
        this.$emit('navigate', 'table');
      } catch (err) {
        this.errorMessage = err.message || 'Ошибка авторизации';
      } finally {
        this.isLoading = false;
      }
    },

    async handleRegister() {
      this.errorMessage = '';
      if (this.registerForm.password !== this.registerForm.passwordConfirm) {
        this.errorMessage = 'Пароли не совпадают!';
        return;
      }
      if (this.registerForm.password.length < 4) {
        this.errorMessage = 'Пароль должен содержать не менее 4 символов';
        return;
      }

      this.isLoading = true;
      try {
        const user = await window.AuthService.register({
          name: this.registerForm.name,
          email: this.registerForm.email,
          password: this.registerForm.password,
          role: this.registerForm.role
        });
        this.$emit('auth-success', user);
        this.$emit('toast', {
          type: 'success',
          title: 'Регистрация завершена',
          message: `Аккаунт ${user.email} успешно зарегистрирован. Вы вошли в систему.`
        });
        this.$emit('navigate', 'table');
      } catch (err) {
        this.errorMessage = err.message || 'Ошибка регистрации';
      } finally {
        this.isLoading = false;
      }
    },

    async handleRecover() {
      this.errorMessage = '';
      this.successMessage = '';
      if (this.recoverForm.newPassword !== this.recoverForm.newPasswordConfirm) {
        this.errorMessage = 'Новые пароли не совпадают!';
        return;
      }
      if (this.recoverForm.newPassword.length < 4) {
        this.errorMessage = 'Новый пароль должен содержать минимум 4 символа';
        return;
      }

      this.isLoading = true;
      try {
        await window.AuthService.recoverPassword(this.recoverForm.email, this.recoverForm.newPassword);
        this.successMessage = 'Пароль успешно обновлен! Теперь вы можете войти в систему с новым паролем.';
        this.loginForm.email = this.recoverForm.email;
        this.loginForm.password = this.recoverForm.newPassword;
        setTimeout(() => {
          this.setTab('login');
        }, 1500);
      } catch (err) {
        this.errorMessage = err.message || 'Ошибка восстановления пароля';
      } finally {
        this.isLoading = false;
      }
    }
  },
  template: `
    <div class="auth-view py-5" style="background-color: var(--bg-color); min-height: 80vh;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6">
            <div class="card border-0 shadow-lg rounded-lg overflow-hidden bg-white">
              <!-- Шапка карточки -->
              <div class="card-header border-0 text-center text-white py-4" style="background-color: var(--accent-dark);">
                <h4 class="font-weight-bold mb-1" style="font-family: var(--font-serif); letter-spacing: 0.05em;">
                  ASIAN TEA HOUSE
                </h4>
                <p class="text-white-50 small mb-0">Система аутентификации и управления каталогом</p>
              </div>

              <!-- Вкладки навигации по формам -->
              <div class="d-flex border-bottom bg-light">
                <button 
                  type="button" 
                  class="btn flex-fill py-3 font-weight-bold rounded-0 text-uppercase small border-right"
                  :class="{ 'bg-white text-danger border-bottom-0': activeTab === 'login', 'text-muted': activeTab !== 'login' }"
                  @click="setTab('login')"
                >
                  Вход
                </button>
                <button 
                  type="button" 
                  class="btn flex-fill py-3 font-weight-bold rounded-0 text-uppercase small border-right"
                  :class="{ 'bg-white text-danger border-bottom-0': activeTab === 'register', 'text-muted': activeTab !== 'register' }"
                  @click="setTab('register')"
                >
                  Регистрация
                </button>
                <button 
                  type="button" 
                  class="btn flex-fill py-3 font-weight-bold rounded-0 text-uppercase small"
                  :class="{ 'bg-white text-danger border-bottom-0': activeTab === 'recover', 'text-muted': activeTab !== 'recover' }"
                  @click="setTab('recover')"
                >
                  Сброс пароля
                </button>
              </div>

              <div class="card-body p-4 p-md-5">
                <!-- Ошибки и уведомления -->
                <div v-if="errorMessage" class="alert alert-danger py-2 px-3 small mb-4">
                  <strong>Ошибка:</strong> {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="alert alert-success py-2 px-3 small mb-4">
                  {{ successMessage }}
                </div>

                <!-- 1. ФОРМА ВХОДА -->
                <div v-if="activeTab === 'login'">
                  <form @submit.prevent="handleLogin">
                    <div class="form-group mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Email адрес</label>
                      <input 
                        type="email" 
                        class="form-control" 
                        v-model="loginForm.email" 
                        placeholder="admin@tea.com"
                        required
                      >
                    </div>

                    <div class="form-group mb-3">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <label class="font-weight-bold small text-muted text-uppercase mb-0">Пароль</label>
                        <a href="#" class="small text-muted" @click.prevent="setTab('recover')">Забыли пароль?</a>
                      </div>
                      <input 
                        type="password" 
                        class="form-control" 
                        v-model="loginForm.password" 
                        placeholder="••••••••"
                        required
                      >
                    </div>

                    <div class="form-group form-check mb-4">
                      <input type="checkbox" class="form-check-input" id="rememberMe" v-model="loginForm.remember">
                      <label class="form-check-label small text-muted" for="rememberMe">Запомнить меня на этом устройстве</label>
                    </div>

                    <button 
                      type="submit" 
                      class="btn btn-block text-white py-2 font-weight-bold shadow-sm"
                      style="background-color: var(--accent-brown);"
                      :disabled="isLoading"
                    >
                      <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                      Войти в систему
                    </button>
                  </form>

                  <!-- Быстрый вход для тестирования -->
                  <div class="mt-4 pt-3 border-top text-center">
                    <div class="small text-muted font-weight-bold text-uppercase mb-2">Быстрый тестовый вход (аккаунты по умолчанию):</div>
                    <div class="btn-group btn-group-sm w-100">
                      <button type="button" class="btn btn-outline-danger" @click="quickFill('admin@tea.com', 'admin')">
                        Администратор (admin)
                      </button>
                      <button type="button" class="btn btn-outline-info" @click="quickFill('user@tea.com', 'user')">
                        Менеджер (user)
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 2. ФОРМА РЕГИСТРАЦИИ -->
                <div v-if="activeTab === 'register'">
                  <form @submit.prevent="handleRegister">
                    <div class="form-group mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Имя пользователя *</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="registerForm.name" 
                        placeholder="Алексей Иванов"
                        required
                      >
                    </div>

                    <div class="form-group mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Электронная почта *</label>
                      <input 
                        type="email" 
                        class="form-control" 
                        v-model="registerForm.email" 
                        placeholder="alexey@domain.ru"
                        required
                      >
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6 mb-3">
                        <label class="font-weight-bold small text-muted text-uppercase">Пароль *</label>
                        <input 
                          type="password" 
                          class="form-control" 
                          v-model="registerForm.password" 
                          placeholder="Минимум 4 симв."
                          required
                        >
                      </div>
                      <div class="form-group col-md-6 mb-3">
                        <label class="font-weight-bold small text-muted text-uppercase">Повтор пароля *</label>
                        <input 
                          type="password" 
                          class="form-control" 
                          v-model="registerForm.passwordConfirm" 
                          placeholder="Повторите пароль"
                          required
                        >
                      </div>
                    </div>

                    <div class="form-group mb-4">
                      <label class="font-weight-bold small text-muted text-uppercase">Роль в системе</label>
                      <select class="form-control custom-select" v-model="registerForm.role">
                        <option value="user">Пользователь (Клиент)</option>
                        <option value="manager">Менеджер каталога</option>
                        <option value="admin">Администратор</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      class="btn btn-block text-white py-2 font-weight-bold shadow-sm"
                      style="background-color: var(--accent-brown);"
                      :disabled="isLoading"
                    >
                      <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                      Зарегистрироваться
                    </button>
                  </form>
                </div>

                <!-- 3. ФОРМА ВОССТАНОВЛЕНИЯ ПАРОЛЯ -->
                <div v-if="activeTab === 'recover'">
                  <p class="text-muted small mb-3">
                    Укажите email вашей учетной записи и задайте новый пароль. Доступ будет обновлен мгновенно.
                  </p>
                  <form @submit.prevent="handleRecover">
                    <div class="form-group mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Email учетной записи</label>
                      <input 
                        type="email" 
                        class="form-control" 
                        v-model="recoverForm.email" 
                        placeholder="admin@tea.com"
                        required
                      >
                    </div>

                    <div class="form-group mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Новый пароль</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        v-model="recoverForm.newPassword" 
                        placeholder="Новый пароль"
                        required
                      >
                    </div>

                    <div class="form-group mb-4">
                      <label class="font-weight-bold small text-muted text-uppercase">Подтверждение нового пароля</label>
                      <input 
                        type="password" 
                        class="form-control" 
                        v-model="recoverForm.newPasswordConfirm" 
                        placeholder="Повторите новый пароль"
                        required
                      >
                    </div>

                    <button 
                      type="submit" 
                      class="btn btn-block text-white py-2 font-weight-bold shadow-sm"
                      style="background-color: var(--accent-dark);"
                      :disabled="isLoading"
                    >
                      <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                      Обновить пароль
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
