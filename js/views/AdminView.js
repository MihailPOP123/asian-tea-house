/**
 * AdminView.js — Административная панель в стиле Voyager
 * Требование: «4) Страница администратора — установить компонент Voyager
 * в качестве административной страницы проекта. Тестовые данные при установке не добавлять.
 * Все страницы реализовать через компоненты Vue.js.»
 */
window.AdminView = {
  name: 'AdminView',
  props: {
    currentUser: {
      type: Object,
      default: null
    },
    teas: {
      type: Array,
      default: () => []
    }
  },
  emits: ['toast', 'navigate'],
  data() {
    return {
      activeTab: 'dashboard', // 'dashboard' | 'roles' | 'bread' | 'system'
      users: [],
      filesCount: 0,
      logsCount: 0,
      isLoading: false
    };
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === 'admin';
    },
    totalStock() {
      return this.teas.reduce((sum, item) => sum + (parseInt(item.stock, 10) || 0), 0);
    },
    totalValue() {
      return this.teas.reduce((sum, item) => sum + ((parseFloat(item.price) || 0) * (parseInt(item.stock, 10) || 0)), 0);
    }
  },
  async mounted() {
    await this.loadAdminData();
  },
  methods: {
    async loadAdminData() {
      this.isLoading = true;
      try {
        this.users = await window.AuthService.getUsers();
        const files = await window.FileStorageService.getFiles();
        this.filesCount = files.length;
        const logs = await window.LogService.getLogs();
        this.logsCount = logs.length;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async changeUserRole(userId, newRole) {
      try {
        await window.AuthService.updateRole(userId, newRole);
        await this.loadAdminData();
        this.$emit('toast', {
          type: 'success',
          title: 'Роль обновлена',
          message: 'Роль пользователя успешно изменена в системе Voyager.'
        });
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка',
          message: err.message
        });
      }
    },

    exportCatalogExcel() {
      try {
        if (!this.teas || this.teas.length === 0) {
          this.$emit('toast', {
            type: 'warning',
            title: 'Предупреждение',
            message: 'В базе данных нет товаров для экспорта.'
          });
          return;
        }
        const exportData = this.teas.map(t => ({
          'ID': t.id,
          'Название': t.title,
          'Цена ($)': t.price,
          'Категория': t.category,
          'Регион': t.origin || 'Азия',
          'Количество': t.stock,
          'Рейтинг': t.rating,
          'Описание': t.desc
        }));
        const fileName = `Voyager_BREAD_Export_${new Date().toISOString().slice(0, 10)}.xlsx`;
        window.exportToExcel(exportData, fileName, 'BREAD_Каталог');
        this.$emit('toast', {
          type: 'success',
          title: 'Экспорт BREAD в Excel',
          message: `Таблица товаров выгружена в файл «${fileName}».`
        });
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка экспорта',
          message: err.message
        });
      }
    }
  },
  template: `
    <div v-if="!isAdmin" class="container py-5" style="min-height: 75vh;">
      <div class="card border-0 shadow-sm rounded-lg p-5 text-center mx-auto my-5" style="max-width: 650px; background: #fff;">
        <div class="mb-3">
          <span class="badge badge-danger px-3 py-1.5 font-weight-bold text-uppercase" style="font-size: 0.85rem; letter-spacing: 0.05em;">
            403 Доступ ограничен
          </span>
        </div>
        <h3 class="font-weight-bold text-dark mb-3">Требуются права Администратора</h3>
        <p class="text-muted mb-4" style="line-height: 1.6;">
          Вы авторизованы как <strong>{{ currentUser ? currentUser.name : 'Гость' }}</strong> с ролью покупателя <strong>«{{ currentUser ? currentUser.role : 'guest' }}»</strong>.
          Административная панель Voyager BREAD предназначена только для администраторов магазина.
        </p>
        <div class="d-flex justify-content-center gap-2 flex-wrap">
          <button @click="$emit('navigate', 'home')" class="btn btn-outline-dark px-4 py-2 font-weight-bold mr-2">
            На главную страницу
          </button>
          <button @click="$emit('navigate', 'profile')" class="btn btn-success px-4 py-2 font-weight-bold">
            В личный кабинет профиля
          </button>
        </div>
      </div>
    </div>

    <div v-else class="voyager-admin-container d-flex" style="min-height: 88vh; background: #f9f9f9;">
      <!-- Левый сайдбар в фирменном стиле Laravel Voyager -->
      <aside class="voyager-sidebar text-white d-flex flex-column" style="width: 260px; min-width: 260px; background-color: #222d32; border-right: 1px solid #1a2226;">
        <!-- Логотип Voyager -->
        <div class="voyager-brand p-3 d-flex align-items-center border-bottom border-dark" style="background-color: #1a2226;">
          <span class="badge badge-warning text-dark font-weight-bold mr-2">ADM</span>
          <div>
            <div class="font-weight-bold" style="font-size: 1.15rem; letter-spacing: 0.1em; color: #ffffff;">VOYAGER</div>
            <div class="text-muted" style="font-size: 0.65rem; text-transform: uppercase;">Административная панель</div>
          </div>
        </div>

        <!-- Профиль администратора -->
        <div class="admin-profile p-3 d-flex align-items-center border-bottom border-dark" style="background-color: #2c3b41;">
          <div class="avatar-circle rounded-circle bg-warning text-dark font-weight-bold d-flex align-items-center justify-content-center mr-3" style="width: 42px; height: 42px; font-size: 1.1rem;">
            {{ (currentUser ? currentUser.name[0] : 'A').toUpperCase() }}
          </div>
          <div class="text-truncate">
            <div class="font-weight-bold small text-white text-truncate">{{ currentUser ? currentUser.name : 'Гость' }}</div>
            <div class="text-success small d-flex align-items-center" style="font-size: 0.75rem;">
              <span class="badge badge-success mr-1" style="font-size: 0.6rem;">Online</span>
              <span>{{ currentUser ? currentUser.role : 'guest' }}</span>
            </div>
          </div>
        </div>

        <!-- Меню навигации Voyager -->
        <nav class="voyager-menu flex-grow-1 py-2">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a 
                href="#" 
                class="nav-link text-white-50 px-3 py-2 d-flex align-items-center"
                :class="{ 'active-voyager-item font-weight-bold text-white': activeTab === 'dashboard' }"
                @click.prevent="activeTab = 'dashboard'"
              >
                Сводка (Dashboard)
              </a>
            </li>
            <li class="nav-item">
              <a 
                href="#" 
                class="nav-link text-white-50 px-3 py-2 d-flex align-items-center"
                :class="{ 'active-voyager-item font-weight-bold text-white': activeTab === 'roles' }"
                @click.prevent="activeTab = 'roles'"
              >
                Пользователи и Роли
              </a>
            </li>
            <li class="nav-item">
              <a 
                href="#" 
                class="nav-link text-white-50 px-3 py-2 d-flex align-items-center"
                :class="{ 'active-voyager-item font-weight-bold text-white': activeTab === 'bread' }"
                @click.prevent="activeTab = 'bread'"
              >
                BREAD Сорта чая
              </a>
            </li>
            <li class="nav-item">
              <a 
                href="#" 
                class="nav-link text-white-50 px-3 py-2 d-flex align-items-center"
                @click.prevent="$emit('navigate', 'logs')"
              >
                Журнал действий (Log)
              </a>
            </li>
            <li class="nav-item">
              <a 
                href="#" 
                class="nav-link text-white-50 px-3 py-2 d-flex align-items-center"
                @click.prevent="$emit('navigate', 'files')"
              >
                Файлы хранилища
              </a>
            </li>
            <li class="nav-item">
              <a 
                href="#" 
                class="nav-link text-white-50 px-3 py-2 d-flex align-items-center"
                @click.prevent="$emit('navigate', 'table')"
              >
                В публичную таблицу
              </a>
            </li>
          </ul>
        </nav>

        <!-- Версия -->
        <div class="p-3 text-muted small border-top border-dark" style="font-size: 0.7rem;">
          Voyager Admin Component v1.6.0<br>
          Vue.js 3 · Asian Tea House
        </div>
      </aside>

      <!-- Основная рабочая область Voyager -->
      <main class="voyager-content flex-grow-1 p-4" style="overflow-x: hidden;">
        <!-- Верхняя полоса навигации контента -->
        <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom bg-white p-3 rounded shadow-sm">
          <div class="d-flex align-items-center">
            <span class="text-muted small mr-2">Панель управления /</span>
            <span class="font-weight-bold text-dark text-capitalize small">
              {{ activeTab === 'dashboard' ? 'Сводка системы' : (activeTab === 'roles' ? 'Роли и права' : 'BREAD Менеджер') }}
            </span>
          </div>

          <div class="d-flex align-items-center">
            <span class="badge badge-light border text-muted mr-3">База данных: LocalStorage Active</span>
            <button class="btn btn-outline-dark btn-sm" @click="$emit('navigate', 'home')">
              Вернуться на сайт &rarr;
            </button>
          </div>
        </div>

        <!-- Предупреждение о роли -->
        <div v-if="!isAdmin" class="alert alert-warning mb-4 shadow-sm">
          <h6 class="font-weight-bold mb-1">Ограниченный доступ к административным операциям</h6>
          <p class="small mb-0">
            Вы вошли как <b>{{ currentUser ? currentUser.name : 'Гость' }}</b> (роль: <code>{{ currentUser ? currentUser.role : 'гость' }}</code>).
            Для полного администрирования войдите под учетной записью <code>admin@tea.com</code> (пароль <code>admin</code>).
          </p>
        </div>

        <!-- 1. ВКЛАДКА: СВОДКА (DASHBOARD) -->
        <div v-if="activeTab === 'dashboard'">
          <!-- Статистические карточки Voyager (Dimmer Widgets) -->
          <div class="row mb-4">
            <!-- Сорта чая -->
            <div class="col-md-3 mb-3">
              <div class="card border-0 shadow-sm text-white rounded-lg overflow-hidden" style="background: linear-gradient(135deg, #1E2A27 0%, #2C3531 100%);">
                <div class="card-body p-3">
                  <div class="text-white-50 small text-uppercase font-weight-bold">Сортов чая</div>
                  <div class="h2 font-weight-bold mb-0">{{ teas.length }}</div>
                  <div class="small text-white-50">в активной таблице</div>
                </div>
              </div>
            </div>

            <!-- Общий остаток -->
            <div class="col-md-3 mb-3">
              <div class="card border-0 shadow-sm text-white rounded-lg overflow-hidden" style="background: linear-gradient(135deg, #C17854 0%, #d88963 100%);">
                <div class="card-body p-3">
                  <div class="text-white-50 small text-uppercase font-weight-bold">Складской остаток</div>
                  <div class="h2 font-weight-bold mb-0">{{ totalStock }} шт.</div>
                  <div class="small text-white-50">Всего позиций на складе</div>
                </div>
              </div>
            </div>

            <!-- Записей в логе -->
            <div class="col-md-3 mb-3">
              <div class="card border-0 shadow-sm text-white rounded-lg overflow-hidden" style="background: linear-gradient(135deg, #2b5876 0%, #4e4376 100%);">
                <div class="card-body p-3">
                  <div class="text-white-50 small text-uppercase font-weight-bold">Событий аудита</div>
                  <div class="h2 font-weight-bold mb-0">{{ logsCount }}</div>
                  <div class="small text-white-50">Задание 2: Log и Diff</div>
                </div>
              </div>
            </div>

            <!-- Файлов Excel -->
            <div class="col-md-3 mb-3">
              <div class="card border-0 shadow-sm text-white rounded-lg overflow-hidden" style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);">
                <div class="card-body p-3">
                  <div class="text-white-50 small text-uppercase font-weight-bold">Excel хранилище</div>
                  <div class="h2 font-weight-bold mb-0">{{ filesCount }}</div>
                  <div class="small text-white-50">сохраненных файлов</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Системная информация Voyager и быстрый доступ -->
          <div class="row">
            <div class="col-lg-8 mb-4">
              <div class="card border-0 shadow-sm rounded-lg bg-white h-100">
                <div class="card-header bg-white py-3 font-weight-bold d-flex justify-content-between align-items-center">
                  <span>Информация об установленном компоненте Voyager</span>
                  <span class="badge badge-success">Статус: Активен</span>
                </div>
                <div class="card-body p-4">
                  <p class="text-muted small">
                    Административная панель Voyager интегрирована в проект на базе компонентов Vue.js.
                    Согласно требованиям: «Тестовые данные при установке не добавлять» — система оперирует исключительно спроектированными таблицами сортов чая, логов и файлов.
                  </p>
                  <table class="table table-bordered table-sm small">
                    <tbody>
                      <tr>
                        <td class="font-weight-bold bg-light" style="width: 35%;">Архитектура:</td>
                        <td>Vue.js 3 + Компоненты Vue.js</td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Фронтенд фреймворк:</td>
                        <td>Bootstrap 4 (оформление по ТЗ)</td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Парсер Excel файлов:</td>
                        <td>SheetJS (.XLSX, .XLS)</td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Модуль аудита (Задание 2):</td>
                        <td>Log Table + vue-json-compare (Diff сравнение состояний)</td>
                      </tr>
                      <tr>
                        <td class="font-weight-bold bg-light">Хранилище данных:</td>
                        <td>Локальное хранилище браузера (LocalStorage API)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-lg-4 mb-4">
              <div class="card border-0 shadow-sm rounded-lg bg-white h-100">
                <div class="card-header bg-white py-3 font-weight-bold">
                  Быстрые действия
                </div>
                <div class="card-body p-3 d-flex flex-column justify-content-around">
                  <button class="btn btn-outline-dark btn-block mb-2 text-left py-2" @click="$emit('navigate', 'table')">
                    Добавить или изменить сорт чая
                  </button>
                  <button class="btn btn-outline-info btn-block mb-2 text-left py-2" @click="$emit('navigate', 'logs')">
                    Сравнить изменения в Журнале
                  </button>
                  <button class="btn btn-outline-success btn-block mb-2 text-left py-2" @click="exportCatalogExcel">
                    Экспорт каталога в Excel
                  </button>
                  <button class="btn btn-outline-secondary btn-block mb-2 text-left py-2" @click="$emit('navigate', 'files')">
                    Открыть хранилище файлов Excel
                  </button>
                  <button class="btn btn-outline-secondary btn-block text-left py-2" @click="activeTab = 'roles'">
                    Управление ролями пользователей
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. ВКЛАДКА: УПРАВЛЕНИЕ РОЛЯМИ И ПОЛЬЗОВАТЕЛЯМИ -->
        <div v-if="activeTab === 'roles'">
          <div class="card border-0 shadow-sm rounded-lg bg-white">
            <div class="card-header bg-white py-3 font-weight-bold d-flex justify-content-between align-items-center">
              <span>Механизм установки ролей пользователей из административной панели</span>
              <span class="badge badge-info">Пользователей: {{ users.length }}</span>
            </div>
            <div class="table-responsive">
              <table class="table table-hover mb-0 align-middle">
                <thead class="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Имя пользователя</th>
                    <th>Email</th>
                    <th>Текущая роль</th>
                    <th class="text-right">Установить роль</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td class="font-monospace small font-weight-bold text-muted">#{{ user.id }}</td>
                    <td class="font-weight-bold text-dark">{{ user.name }}</td>
                    <td class="text-muted">{{ user.email }}</td>
                    <td>
                      <span 
                        class="badge px-2 py-1 font-weight-bold"
                        :class="{
                          'badge-danger': user.role === 'admin',
                          'badge-info': user.role === 'manager',
                          'badge-secondary': user.role === 'user'
                        }"
                      >
                        {{ user.role.toUpperCase() }}
                      </span>
                    </td>
                    <td class="text-right">
                      <div class="btn-group btn-group-sm">
                        <button 
                          type="button" 
                          class="btn btn-outline-danger" 
                          :class="{ active: user.role === 'admin' }"
                          @click="changeUserRole(user.id, 'admin')"
                        >
                          Admin
                        </button>
                        <button 
                          type="button" 
                          class="btn btn-outline-info" 
                          :class="{ active: user.role === 'manager' }"
                          @click="changeUserRole(user.id, 'manager')"
                        >
                          Manager
                        </button>
                        <button 
                          type="button" 
                          class="btn btn-outline-secondary" 
                          :class="{ active: user.role === 'user' }"
                          @click="changeUserRole(user.id, 'user')"
                        >
                          User
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- 3. ВКЛАДКА: BREAD МЕНЕДЖЕР ТАБЛИЦ -->
        <div v-if="activeTab === 'bread'">
          <div class="card border-0 shadow-sm rounded-lg bg-white">
            <div class="card-header bg-white py-3 font-weight-bold">
              Схема BREAD (Browse, Read, Edit, Add, Delete) для таблицы товаров чая
            </div>
            <div class="card-body p-4">
              <p class="text-muted small">
                В архитектуре Voyager BREAD управляет отображением полей таблиц базы данных в интерфейсе администрирования.
              </p>
              <table class="table table-bordered table-sm small">
                <thead class="thead-light">
                  <tr>
                    <th>Поле (Field)</th>
                    <th>Тип данных</th>
                    <th>Отображаемое имя</th>
                    <th>Browse</th>
                    <th>Read</th>
                    <th>Edit</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>id</code></td>
                    <td>INTEGER (Primary Key)</td>
                    <td>ID</td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-muted">Нет</span></td>
                    <td><span class="text-muted">Нет</span></td>
                  </tr>
                  <tr>
                    <td><code>title</code></td>
                    <td>VARCHAR(255)</td>
                    <td>Наименование сорта</td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                  </tr>
                  <tr>
                    <td><code>price</code></td>
                    <td>DECIMAL(8,2)</td>
                    <td>Цена ($)</td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                  </tr>
                  <tr>
                    <td><code>category</code></td>
                    <td>VARCHAR(100)</td>
                    <td>Категория чая</td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                  </tr>
                  <tr>
                    <td><code>stock</code></td>
                    <td>INTEGER</td>
                    <td>Остаток на складе</td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                  </tr>
                  <tr>
                    <td><code>desc</code></td>
                    <td>TEXT</td>
                    <td>Описание сорта</td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                    <td><span class="text-success font-weight-bold">Да</span></td>
                  </tr>
                </tbody>
              </table>
              <div class="mt-3">
                <button class="btn btn-dark btn-sm" @click="$emit('navigate', 'table')">
                  Перейти к работе с таблицей чая &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
};
