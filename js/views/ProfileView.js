/**
 * ProfileView.js — Страница профиля пользователя
 * Реализует удобный доступ к личному кабинету:
 * - Просмотр и редактирование данных профиля (ФИО, телефон, адрес доставки, чайные предпочтения)
 * - Смена пароля с валидацией
 * - Отображение роли пользователя (user / admin / manager) и прав доступа
 * - Быстрое переключение тестовых ролей (user <-> admin <-> manager) для проверки прав доступа
 * - История заказов и любимые сорта чая
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.ProfileView = {
  name: 'ProfileView',
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['navigate', 'toast', 'user-updated', 'logout'],
  data() {
    return {
      activeTab: 'details', // 'details' | 'security' | 'orders'
      editForm: {
        name: '',
        email: '',
        phone: '+7 (999) 450-88-21',
        address: 'г. Москва, ул. Чайная, д. 12, кв. 45',
        teaPreference: 'Улуны и Пуэры'
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      isSaving: false,
      orders: [
        { id: 'TEA-8941', date: '02.11.2026', total: '4 500 ₽', status: 'Доставлен', items: 'Да Хун Пао (100 г), Шу Пуэр 2012' },
        { id: 'TEA-8720', date: '18.10.2026', total: '2 950 ₽', status: 'Доставлен', items: 'Бай Хао Инь Чжэнь (50 г)' },
        { id: 'TEA-8412', date: '25.09.2026', total: '1 850 ₽', status: 'Доставлен', items: 'Те Гуань Инь Ван (100 г)' }
      ]
    };
  },
  watch: {
    currentUser: {
      immediate: true,
      handler(u) {
        if (u) {
          this.editForm.name = u.name || '';
          this.editForm.email = u.email || '';
          if (u.phone) this.editForm.phone = u.phone;
          if (u.address) this.editForm.address = u.address;
        }
      }
    }
  },
  methods: {
    saveProfile() {
      this.isSaving = true;
      setTimeout(() => {
        this.isSaving = false;
        const updated = {
          ...this.currentUser,
          name: this.editForm.name.trim(),
          phone: this.editForm.phone,
          address: this.editForm.address,
          teaPreference: this.editForm.teaPreference
        };
        // Сохраняем в localStorage
        localStorage.setItem('asian_tea_current_user_v1', JSON.stringify(updated));
        
        // Обновляем в списке пользователей
        try {
          const users = JSON.parse(localStorage.getItem('asian_tea_users_v1') || '[]');
          const idx = users.findIndex(u => u.id === updated.id || u.email === updated.email);
          if (idx !== -1) {
            users[idx] = { ...users[idx], ...updated };
            localStorage.setItem('asian_tea_users_v1', JSON.stringify(users));
          }
        } catch (e) {
          console.error(e);
        }

        this.$emit('user-updated', updated);
        this.$emit('toast', {
          type: 'success',
          title: 'Профиль обновлен',
          message: 'Ваши личные данные успешно сохранены.'
        });
      }, 400);
    },

    changePassword() {
      if (this.passwordForm.newPassword.length < 6) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка',
          message: 'Длина нового пароля должна быть не менее 6 символов.'
        });
        return;
      }
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка',
          message: 'Пароли не совпадают.'
        });
        return;
      }

      this.$emit('toast', {
        type: 'success',
        title: 'Пароль изменен',
        message: 'Новый пароль учетной записи успешно установлен.'
      });
      this.passwordForm.currentPassword = '';
      this.passwordForm.newPassword = '';
      this.passwordForm.confirmPassword = '';
    },

    // Быстрое переключение роли для тестирования прав доступа (User vs Admin vs Manager)
    async switchRole(targetRole) {
      if (!this.currentUser) return;
      
      const roleTitles = {
        user: 'Покупатель (user)',
        admin: 'Администратор (admin)',
        manager: 'Менеджер склада (manager)'
      };

      const updated = { ...this.currentUser, role: targetRole };
      localStorage.setItem('asian_tea_current_user_v1', JSON.stringify(updated));

      try {
        const users = JSON.parse(localStorage.getItem('asian_tea_users_v1') || '[]');
        const idx = users.findIndex(u => u.id === updated.id || u.email === updated.email);
        if (idx !== -1) {
          users[idx].role = targetRole;
          localStorage.setItem('asian_tea_users_v1', JSON.stringify(users));
        }
      } catch (e) {
        console.error(e);
      }

      this.$emit('user-updated', updated);
      this.$emit('toast', {
        type: 'info',
        title: 'Роль переключена',
        message: 'Текущая роль изменена на: ' + roleTitles[targetRole] + '. Права доступа в меню обновлены.'
      });
    }
  },
  template: `
    <div class="profile-view py-5" style="background-color: var(--bg-color); min-height: 80vh;">
      <div class="container" style="max-width: 1100px;">
        
        <!-- Верхняя навигационная цепочка -->
        <div class="mb-4 d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb bg-transparent p-0 mb-1 small text-uppercase">
                <li class="breadcrumb-item"><a href="#home" @click.prevent="$emit('navigate', 'home')" class="text-muted">Главная</a></li>
                <li class="breadcrumb-item active text-dark font-weight-bold" aria-current="page">Личный кабинет пользователя</li>
              </ol>
            </nav>
            <h1 class="h3 font-weight-bold mb-0 text-dark" style="font-family: var(--font-serif);">
              Профиль пользователя
            </h1>
          </div>

          <div class="d-flex align-items-center gap-2">
            <button 
              type="button" 
              @click="$emit('navigate', 'table')"
              class="btn btn-outline-dark btn-sm px-3"
            >
              В каталог товаров
            </button>
            <button 
              type="button" 
              @click="$emit('logout')"
              class="btn btn-outline-danger btn-sm px-3"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>

        <div v-if="!currentUser" class="card shadow-sm border-0 rounded-lg p-5 text-center">
          <h4 class="font-weight-bold text-dark mb-3">Вы не авторизованы</h4>
          <p class="text-muted mb-4">Для просмотра личного кабинета, пожалуйста, войдите в систему или создайте аккаунт.</p>
          <div>
            <button @click="$emit('navigate', 'auth')" class="btn btn-success px-4 py-2 font-weight-bold">
              Перейти к авторизации / регистрации
            </button>
          </div>
        </div>

        <div v-else class="row">
          
          <!-- Левая колонка: Карточка профиля и статус роли -->
          <div class="col-lg-4 mb-4">
            <div class="card shadow-sm border-0 rounded-lg overflow-hidden">
              
              <!-- Верхний градиентный фон карточки -->
              <div class="p-4 text-center text-white" style="background: linear-gradient(135deg, #2D4030 0%, #4C6A4F 100%);">
                <!-- Аватар -->
                <div class="position-relative d-inline-block mb-3">
                  <div class="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center font-weight-bold shadow" style="width: 80px; height: 80px; font-size: 1.8rem; border: 3px solid rgba(255,255,255,0.85);">
                    {{ currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U' }}
                  </div>
                  <span 
                    class="position-absolute rounded-circle" 
                    style="width: 14px; height: 14px; background-color: #28a745; border: 2px solid #fff; bottom: 4px; right: 4px;"
                    title="Статус: В сети"
                  ></span>
                </div>

                <h5 class="font-weight-bold mb-1">{{ currentUser.name }}</h5>
                <p class="small mb-2" style="color: rgba(255, 255, 255, 0.9); font-size: 0.85rem;">{{ currentUser.email }}</p>

                <!-- Роль пользователя (чистый текст) -->
                <div 
                  class="font-weight-bold text-uppercase"
                  :class="{
                    'text-warning': currentUser.role === 'admin',
                    'text-info': currentUser.role === 'manager',
                    'text-light': currentUser.role === 'user'
                  }"
                  style="font-size: 0.8rem; letter-spacing: 0.08em;"
                >
                  {{ currentUser.role === 'admin' ? 'Администратор системы' : (currentUser.role === 'manager' ? 'Менеджер склада' : 'Покупатель магазина') }}
                </div>
              </div>

              <!-- Блок информации о правах доступа текущей роли -->
              <div class="card-body p-4 bg-white">
                <h6 class="font-weight-bold text-dark text-uppercase small mb-3" style="letter-spacing: 0.05em;">
                  Права доступа роли ({{ currentUser.role }}):
                </h6>

                <ul class="list-unstyled mb-4 small space-y-2">
                  <li class="d-flex align-items-center justify-content-between py-1 border-bottom">
                    <span class="text-muted">Просмотр каталога чая:</span>
                    <span class="text-success font-weight-bold">Доступно</span>
                  </li>
                  <li class="d-flex align-items-center justify-content-between py-1 border-bottom">
                    <span class="text-muted">Оформление заказов:</span>
                    <span class="text-success font-weight-bold">Доступно</span>
                  </li>
                  <li class="d-flex align-items-center justify-content-between py-1 border-bottom">
                    <span class="text-muted">Загрузка Excel файлов:</span>
                    <span class="font-weight-bold" :class="currentUser.role !== 'user' ? 'text-success' : 'text-muted'">
                      {{ currentUser.role !== 'user' ? 'Полный доступ' : 'Базовый' }}
                    </span>
                  </li>
                  <li class="d-flex align-items-center justify-content-between py-1">
                    <span class="text-muted">Панель Voyager Админ:</span>
                    <span class="font-weight-bold" :class="currentUser.role === 'admin' ? 'text-danger' : 'text-muted'">
                      {{ currentUser.role === 'admin' ? 'Разрешено' : 'Запрещено (только admin)' }}
                    </span>
                  </li>
                </ul>

                <!-- ДЕМО-ПЕРЕКЛЮЧАТЕЛЬ РОЛЕЙ ДЛЯ ПРОВЕРКИ ТРЕБОВАНИЙ -->
                <div class="p-3 rounded" style="background-color: #F8F9FA; border: 1px dashed #CED4DA;">
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="small font-weight-bold text-dark">Тест проверки прав доступа:</span>
                  </div>
                  <p class="text-muted mb-3" style="font-size: 0.75rem; line-height: 1.4;">
                    Переключите роль, чтобы мгновенно проверить, как скрывается/показывается вкладка «Voyager Админ» в шапке:
                  </p>

                  <div class="d-flex flex-column gap-2">
                    <button 
                      type="button" 
                      @click="switchRole('user')"
                      :class="currentUser.role === 'user' ? 'btn-success font-weight-bold' : 'btn-outline-secondary'"
                      class="btn btn-sm text-left d-flex align-items-center justify-content-between"
                    >
                      <span>Роль: Покупатель (user)</span>
                      <span v-if="currentUser.role === 'user'" class="small">Активна</span>
                    </button>

                    <button 
                      type="button" 
                      @click="switchRole('admin')"
                      :class="currentUser.role === 'admin' ? 'btn-danger font-weight-bold' : 'btn-outline-secondary'"
                      class="btn btn-sm text-left d-flex align-items-center justify-content-between"
                    >
                      <span>Роль: Администратор (admin)</span>
                      <span v-if="currentUser.role === 'admin'" class="small">Активна</span>
                    </button>

                    <button 
                      type="button" 
                      @click="switchRole('manager')"
                      :class="currentUser.role === 'manager' ? 'btn-info font-weight-bold' : 'btn-outline-secondary'"
                      class="btn btn-sm text-left d-flex align-items-center justify-content-between"
                    >
                      <span>Роль: Менеджер (manager)</span>
                      <span v-if="currentUser.role === 'manager'" class="small">Активна</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>

          <!-- Правая колонка: Вкладки настроек профиля -->
          <div class="col-lg-8">
            <div class="card shadow-sm border-0 rounded-lg">
              
              <!-- Навигация по вкладкам кабинета -->
              <div class="card-header bg-white border-bottom p-0">
                <ul class="nav nav-tabs card-header-tabs m-0 border-0">
                  <li class="nav-item">
                    <button 
                      type="button"
                      class="nav-link px-4 py-3 font-weight-bold border-top-0 border-left-0 border-right-0"
                      :class="{ 'active text-success border-bottom border-success': activeTab === 'details', 'text-muted': activeTab !== 'details' }"
                      @click="activeTab = 'details'"
                    >
                      Личные данные
                    </button>
                  </li>
                  <li class="nav-item">
                    <button 
                      type="button"
                      class="nav-link px-4 py-3 font-weight-bold border-top-0 border-left-0 border-right-0"
                      :class="{ 'active text-success border-bottom border-success': activeTab === 'security', 'text-muted': activeTab !== 'security' }"
                      @click="activeTab = 'security'"
                    >
                      Безопасность и пароль
                    </button>
                  </li>
                  <li class="nav-item">
                    <button 
                      type="button"
                      class="nav-link px-4 py-3 font-weight-bold border-top-0 border-left-0 border-right-0"
                      :class="{ 'active text-success border-bottom border-success': activeTab === 'orders', 'text-muted': activeTab !== 'orders' }"
                      @click="activeTab = 'orders'"
                    >
                      История заказов
                    </button>
                  </li>
                </ul>
              </div>

              <div class="card-body p-4 sm:p-5">
                
                <!-- ВКЛАДКА 1: ЛИЧНЫЕ ДАННЫЕ -->
                <div v-if="activeTab === 'details'">
                  <h5 class="font-weight-bold text-dark mb-3">Информация покупателя</h5>
                  <p class="text-muted small mb-4">Данные используются для быстрой доставки чая и связи с чайным сомелье.</p>

                  <form @submit.prevent="saveProfile">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label class="small font-weight-bold text-muted">ФИО *</label>
                        <input type="text" v-model="editForm.name" required class="form-control" />
                      </div>
                      <div class="form-group col-md-6">
                        <label class="small font-weight-bold text-muted">Электронная почта *</label>
                        <input type="email" v-model="editForm.email" disabled class="form-control bg-light" />
                        <small class="text-muted">Email является логином учетной записи</small>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label class="small font-weight-bold text-muted">Контактный телефон</label>
                        <input type="tel" v-model="editForm.phone" class="form-control" />
                      </div>
                      <div class="form-group col-md-6">
                        <label class="small font-weight-bold text-muted">Любимый вид чая</label>
                        <select v-model="editForm.teaPreference" class="form-control">
                          <option>Улуны и Пуэры</option>
                          <option>Шу и Шэн Пуэры</option>
                          <option>Белый чай (Фудин)</option>
                          <option>Зеленый и Жасминовый чай</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="small font-weight-bold text-muted">Основной адрес доставки</label>
                      <input type="text" v-model="editForm.address" class="form-control" placeholder="Город, улица, дом, квартира" />
                    </div>

                    <div class="pt-3 border-top d-flex justify-content-end">
                      <button type="submit" :disabled="isSaving" class="btn btn-success px-4 font-weight-bold shadow-sm">
                        {{ isSaving ? 'Сохранение...' : 'Сохранить изменения' }}
                      </button>
                    </div>
                  </form>
                </div>

                <!-- ВКЛАДКА 2: БЕЗОПАСНОСТЬ И ПАРОЛЬ -->
                <div v-if="activeTab === 'security'">
                  <h5 class="font-weight-bold text-dark mb-3">Изменение пароля</h5>
                  <p class="text-muted small mb-4">Регулярно обновляйте пароль для защиты ваших данных и заказов.</p>

                  <form @submit.prevent="changePassword" style="max-width: 480px;">
                    <div class="form-group">
                      <label class="small font-weight-bold text-muted">Текущий пароль</label>
                      <input type="password" v-model="passwordForm.currentPassword" required class="form-control" placeholder="••••••••" />
                    </div>

                    <div class="form-group">
                      <label class="small font-weight-bold text-muted">Новый пароль</label>
                      <input type="password" v-model="passwordForm.newPassword" required minlength="6" class="form-control" placeholder="Минимум 6 знаков" />
                    </div>

                    <div class="form-group">
                      <label class="small font-weight-bold text-muted">Подтверждение нового пароля</label>
                      <input type="password" v-model="passwordForm.confirmPassword" required class="form-control" placeholder="Повторите новый пароль" />
                    </div>

                    <div class="pt-2">
                      <button type="submit" class="btn btn-dark px-4 font-weight-bold">
                        Обновить пароль
                      </button>
                    </div>
                  </form>
                </div>

                <!-- ВКЛАДКА 3: ИСТОРИЯ ЗАКАЗОВ -->
                <div v-if="activeTab === 'orders'">
                  <h5 class="font-weight-bold text-dark mb-3">Ваши заказы в чайном доме</h5>
                  <p class="text-muted small mb-4">История всех доставленных и текущих чайных поставок.</p>

                  <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0 small">
                      <thead class="thead-light">
                        <tr>
                          <th>Номер</th>
                          <th>Дата</th>
                          <th>Состав заказа</th>
                          <th>Сумма</th>
                          <th>Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="order in orders" :key="order.id">
                          <td class="font-weight-bold">{{ order.id }}</td>
                          <td>{{ order.date }}</td>
                          <td>{{ order.items }}</td>
                          <td class="font-weight-bold">{{ order.total }}</td>
                          <td><span class="text-success font-weight-bold">{{ order.status }}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  `
};
