/**
 * TableView.js — Страница отображения данных в виде таблицы (Bootstrap 4)
 * Требования:
 * - Отображение данных в виде таблицы
 * - Если строк больше 10 — постраничная загрузка (пагинация)
 * - Кнопка ленивой подгрузки данных (Lazy loading)
 * - Добавление, редактирование, удаление данных
 * - Переиспользование компонента модального окна для добавления и обновления
 * - Асинхронный обмен данными с клиентом/сервером
 * - Стилизация front-end фреймворком Bootstrap 4
 */
window.TableView = {
  name: 'TableView',
  components: {
    'tea-modal': window.TeaModal
  },
  props: {
    currentUser: {
      type: Object,
      default: null
    }
  },
  emits: ['toast', 'navigate', 'teas-updated'],
  data() {
    return {
      teas: [],
      isLoading: false,
      isSaving: false,
      searchQuery: '',
      selectedCategory: 'all',
      sortBy: 'default',

      // Пагинация (требование: если > 10 строк — постраничная загрузка)
      currentPage: 1,
      itemsPerPage: 10,

      // Ленивая подгрузка (требование: предусмотреть кнопку ленивой подгрузки данных)
      lazyMode: false,
      lazyVisibleCount: 10,

      // Модальное окно (переиспользуемое для добавления и обновления)
      showModal: false,
      isEditMode: false,
      selectedTea: null,

      // Модальное окно подтверждения удаления
      showDeleteConfirm: false,
      teaToDelete: null
    };
  },
  computed: {
    canModify() {
      // Полный доступ к просмотру, добавлению и редактированию таблицы сортов чая
      return true;
    },

    categories() {
      const cats = new Set(this.teas.map(t => t.category).filter(Boolean));
      return ['all', ...Array.from(cats)];
    },

    filteredTeas() {
      let result = [...this.teas];

      // Поиск по названию или описанию
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(t => 
          (t.title && t.title.toLowerCase().includes(query)) ||
          (t.desc && t.desc.toLowerCase().includes(query)) ||
          (t.origin && t.origin.toLowerCase().includes(query))
        );
      }

      // Фильтр по категории
      if (this.selectedCategory !== 'all') {
        result = result.filter(t => t.category === this.selectedCategory);
      }

      // Сортировка
      if (this.sortBy === 'price_asc') {
        result.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'price_desc') {
        result.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === 'title') {
        result.sort((a, b) => a.title.localeCompare(b.title));
      } else if (this.sortBy === 'stock') {
        result.sort((a, b) => b.stock - a.stock);
      }

      return result;
    },

    totalRows() {
      return this.filteredTeas.length;
    },

    totalPages() {
      return Math.ceil(this.totalRows / this.itemsPerPage) || 1;
    },

    // Данные для отображения в таблице (с учетом пагинации или ленивой подгрузки)
    displayedTeas() {
      if (this.lazyMode) {
        // Режим ленивой подгрузки: отдаем первые lazyVisibleCount строк
        return this.filteredTeas.slice(0, this.lazyVisibleCount);
      }

      // Обычный постраничный режим (пагинация)
      if (this.totalRows <= this.itemsPerPage) {
        return this.filteredTeas;
      }
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredTeas.slice(start, start + this.itemsPerPage);
    },

    hasMoreLazyItems() {
      return this.lazyVisibleCount < this.totalRows;
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
      this.lazyVisibleCount = 10;
    },
    selectedCategory() {
      this.currentPage = 1;
      this.lazyVisibleCount = 10;
    }
  },
  async mounted() {
    await this.fetchTeas();
  },
  methods: {
    async fetchTeas() {
      this.isLoading = true;
      try {
        this.teas = await window.TeaApiService.getAll();
        this.$emit('teas-updated', this.teas);
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка загрузки',
          message: 'Не удалось загрузить данные из хранилища: ' + err.message
        });
      } finally {
        this.isLoading = false;
      }
    },

    // Ленивая подгрузка (Lazy loading)
    loadMoreLazy() {
      this.lazyMode = true;
      this.lazyVisibleCount += 5;
      this.$emit('toast', {
        type: 'info',
        title: 'Ленивая подгрузка',
        message: `Подгружено еще 5 записей. Отображается: ${Math.min(this.lazyVisibleCount, this.totalRows)} из ${this.totalRows}`
      });
    },

    toggleViewMode(mode) {
      if (mode === 'lazy') {
        this.lazyMode = true;
      } else {
        this.lazyMode = false;
        this.currentPage = 1;
      }
    },

    setPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    // Открытие модального окна для добавления
    openAddModal() {
      this.isEditMode = false;
      this.selectedTea = null;
      this.showModal = true;
    },

    // Открытие модального окна для редактирования
    openEditModal(tea) {
      this.isEditMode = true;
      this.selectedTea = { ...tea };
      this.showModal = true;
    },

    // Сохранение из модального окна (асинхронный обмен данными)
    async handleModalSave({ isEdit, data }) {
      this.isSaving = true;
      try {
        if (isEdit) {
          // Асинхронное обновление
          const updated = await window.TeaApiService.update(data.id, data);
          this.$emit('toast', {
            type: 'success',
            title: 'Успешно обновлено',
            message: `Сорт чая «${updated.title}» был успешно обновлен.`
          });
        } else {
          // Асинхронное создание
          const created = await window.TeaApiService.create(data);
          this.$emit('toast', {
            type: 'success',
            title: 'Успешно добавлено',
            message: `Новый сорт «${created.title}» успешно сохранен в базе.`
          });
        }
        this.showModal = false;
        await this.fetchTeas();
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка сохранения',
          message: err.message || 'Не удалось сохранить запись'
        });
      } finally {
        this.isSaving = false;
      }
    },

    // Подтверждение и удаление
    confirmDelete(tea) {
      this.teaToDelete = tea;
      this.showDeleteConfirm = true;
    },

    async handleDelete() {
      if (!this.teaToDelete) return;
      this.isLoading = true;
      try {
        await window.TeaApiService.delete(this.teaToDelete.id);
        this.$emit('toast', {
          type: 'success',
          title: 'Запись удалена',
          message: `Сорт чая «${this.teaToDelete.title}» успешно удален.`
        });
        this.showDeleteConfirm = false;
        this.teaToDelete = null;
        await this.fetchTeas();
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка удаления',
          message: err.message
        });
      } finally {
        this.isLoading = false;
      }
    },

    // Восстановление тестовых данных
    async resetData() {
      if (confirm('Сбросить данные к начальным 12 сортам чая?')) {
        this.isLoading = true;
        await window.TeaApiService.resetToDefault();
        await this.fetchTeas();
        this.$emit('toast', {
          type: 'info',
          title: 'Сброс базы данных',
          message: 'Таблица восстановлена до начального состояния.'
        });
      }
    },

    // Экспорт таблицы в Excel
    exportExcel() {
      try {
        if (!this.filteredTeas || this.filteredTeas.length === 0) {
          this.$emit('toast', {
            type: 'warning',
            title: 'Предупреждение',
            message: 'Нет записей для экспорта в Excel.'
          });
          return;
        }
        const exportData = this.filteredTeas.map(t => ({
          'ID': t.id,
          'Название': t.title,
          'Цена ($)': t.price,
          'Категория': t.category,
          'Регион': t.origin || 'Азия',
          'Количество': t.stock,
          'Рейтинг': t.rating,
          'Описание': t.desc
        }));
        const fileName = `Каталог_Asian_Tea_House_${new Date().toISOString().slice(0, 10)}.xlsx`;
        window.exportToExcel(exportData, fileName, 'Чайная коллекция');
        this.$emit('toast', {
          type: 'success',
          title: 'Экспорт в Excel',
          message: `Файл «${fileName}» успешно сформирован и скачан.`
        });
      } catch (err) {
        this.$emit('toast', {
          type: 'danger',
          title: 'Ошибка экспорта',
          message: 'Не удалось экспортировать в Excel: ' + err.message
        });
      }
    }
  },
  template: `
    <div class="table-view py-4" style="background-color: var(--bg-color); min-height: 85vh;">
      <div class="container-fluid px-lg-5">
        <!-- Шапка страницы с четким разделением Action/System кнопок -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h2 class="font-weight-bold mb-1" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Таблица сортов азиатского чая (Управление данными)
            </h2>
            <p class="text-muted small mb-0">
              Полнофункциональная таблица управления товарами на Vue.js и Bootstrap 4 с асинхронным обменом данными
            </p>
          </div>

          <div class="d-flex flex-wrap align-items-center gap-2 mt-3 mt-md-0">
            <!-- Кнопка добавления (Primary CTA) -->
            <button 
              class="btn text-white font-weight-bold px-3 py-2 mr-2 shadow-sm"
              style="background-color: var(--accent-brown); border-radius: var(--radius-sm);"
              @click="openAddModal"
            >
              Добавить новый сорт
            </button>

            <!-- Экспорт в Excel (Secondary CTA) -->
            <button 
              class="btn btn-outline-success font-weight-bold px-3 py-2 shadow-sm"
              style="border-radius: var(--radius-sm);"
              @click="exportExcel"
              title="Выгрузить текущую таблицу в Excel"
            >
              Экспорт в Excel
            </button>
          </div>
        </div>

        <!-- Предупреждение для неавторизованных пользователей -->
        <div v-if="!canModify" class="alert alert-warning d-flex align-items-center justify-content-between shadow-sm mb-4" style="border-radius: var(--radius-md);">
          <div>
            <strong>Внимание!</strong> Вы просматриваете таблицу в режиме чтения.
            Для добавления, изменения и удаления данных требуется войти в учетную запись.
          </div>
          <button class="btn btn-warning btn-sm font-weight-bold ml-3" style="border-radius: var(--radius-sm);" @click="$emit('navigate', 'auth')">
            Войти в систему &rarr;
          </button>
        </div>

        <!-- Фильтры, поиск и режимы отображения -->
        <div class="card border-0 shadow-sm mb-4 bg-white" style="border-radius: var(--radius-md);">
          <div class="card-body p-3">
            <div class="row align-items-center">
              <!-- Поиск с кнопкой быстрой очистки -->
              <div class="col-md-4 mb-2 mb-md-0">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-white small font-weight-bold text-muted border-right-0" style="border-radius: var(--radius-sm) 0 0 var(--radius-sm);">
                      Поиск:
                    </span>
                  </div>
                  <input 
                    type="text" 
                    class="form-control border-left-0" 
                    style="border-radius: 0 var(--radius-sm) var(--radius-sm) 0;"
                    placeholder="По названию, региону или описанию..." 
                    v-model="searchQuery"
                  >
                  <div class="input-group-append" v-if="searchQuery">
                    <button class="btn btn-outline-secondary btn-sm" type="button" @click="searchQuery = ''" title="Очистить поиск">
                      Сброс
                    </button>
                  </div>
                </div>
              </div>

              <!-- Фильтр по категории -->
              <div class="col-md-3 mb-2 mb-md-0">
                <select class="form-control custom-select" style="border-radius: var(--radius-sm);" v-model="selectedCategory">
                  <option value="all">Все категории ({{ teas.length }})</option>
                  <option v-for="cat in categories.filter(c => c !== 'all')" :key="cat" :value="cat">
                    {{ cat }}
                  </option>
                </select>
              </div>

              <!-- Сортировка -->
              <div class="col-md-2 mb-2 mb-md-0">
                <select class="form-control custom-select" style="border-radius: var(--radius-sm);" v-model="sortBy">
                  <option value="default">Сортировка: по умолчанию</option>
                  <option value="price_asc">Цена: по возрастанию</option>
                  <option value="price_desc">Цена: по убыванию</option>
                  <option value="title">По названию (А-Я)</option>
                  <option value="stock">По остаткам на складе</option>
                </select>
              </div>

              <!-- Переключатель режима: Пагинация vs Ленивая загрузка -->
              <div class="col-md-3 text-md-right">
                <div class="btn-group btn-group-sm" style="border-radius: var(--radius-sm); overflow: hidden;">
                  <button 
                    type="button" 
                    class="btn"
                    :class="!lazyMode ? 'btn-dark font-weight-bold' : 'btn-outline-secondary'"
                    @click="toggleViewMode('pagination')"
                  >
                    Постраничный режим
                  </button>
                  <button 
                    type="button" 
                    class="btn"
                    :class="lazyMode ? 'btn-dark font-weight-bold' : 'btn-outline-secondary'"
                    @click="toggleViewMode('lazy')"
                  >
                    Ленивая подгрузка
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Рекламный блок (In-Feed) перед каталогом товаров -->
        <div class="mb-4">
          <ad-slot 
            preset="feed" 
            label="Партнерская витрина сортов чая" 
            sublabel="Специальные условия на оптовые поставки органического чая из Киото и Тайваня"
          ></ad-slot>
        </div>

        <!-- Таблица данных (Bootstrap 4) -->
        <div class="card border-0 shadow-sm overflow-hidden bg-white" style="border-radius: var(--radius-md);">
          <div class="table-responsive">
            <table class="table table-hover table-striped mb-0 align-middle">
              <thead class="thead-dark" style="background-color: var(--accent-dark);">
                <tr>
                  <th style="width: 50px;">#</th>
                  <th style="width: 70px;">Фото</th>
                  <th>Наименование сорта</th>
                  <th>Категория</th>
                  <th>Регион</th>
                  <th class="text-right">Цена ($)</th>
                  <th class="text-center">Остаток</th>
                  <th class="text-center">Рейтинг</th>
                  <th class="text-right" style="width: 170px;">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoading">
                  <td colspan="9" class="text-center py-5">
                    <div class="spinner-border text-warning" role="status"></div>
                    <div class="mt-2 text-muted small">Асинхронная загрузка данных...</div>
                  </td>
                </tr>

                <tr v-else-if="displayedTeas.length === 0">
                  <td colspan="9" class="text-center py-5 text-muted">
                    <h5>Ничего не найдено</h5>
                    <p class="small mb-0">Попробуйте изменить параметры поиска или фильтрации</p>
                  </td>
                </tr>

                <tr v-for="(tea, index) in displayedTeas" :key="tea.id">
                  <td class="text-muted small font-weight-bold">
                    {{ lazyMode ? index + 1 : ((currentPage - 1) * itemsPerPage) + index + 1 }}
                  </td>
                  <td>
                    <div style="width: 48px; height: 48px; background: #fafafa; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center;" class="border">
                      <img :src="tea.image" :alt="tea.title" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                    </div>
                  </td>
                  <td>
                    <div class="font-weight-bold text-dark" style="font-family: var(--font-serif); font-size: 1.02rem;">
                      {{ tea.title }}
                    </div>
                    <div class="text-muted small text-truncate" style="max-width: 320px;" :title="tea.desc">
                      {{ tea.desc }}
                    </div>
                  </td>
                  <td>
                    <span class="badge px-2 py-1 font-weight-normal" style="background: #EFE8DC; color: var(--accent-dark); border-radius: 4px;">
                      {{ tea.category }}
                    </span>
                  </td>
                  <td class="small text-muted">
                    {{ tea.origin || 'Восточная Азия' }}
                  </td>
                  <td class="text-right font-weight-bold text-danger" style="font-size: 1.05rem;">
                    \${{ tea.price.toFixed(2) }}
                  </td>
                  <td class="text-center">
                    <span 
                      class="badge" 
                      :class="{
                        'badge-success': tea.stock > 10,
                        'badge-warning': tea.stock > 0 && tea.stock <= 10,
                        'badge-danger': tea.stock === 0
                      }"
                    >
                      {{ tea.stock }} шт.
                    </span>
                  </td>
                  <td class="text-center small text-dark font-weight-bold">
                    Рейтинг: {{ tea.rating }}
                  </td>
                  <td class="text-right">
                    <!-- Разделенные кнопки действий по Закону Фиттса для предотвращения случайного удаления -->
                    <div class="d-flex justify-content-end align-items-center">
                      <button 
                        class="btn btn-sm btn-outline-primary px-2.5 mr-1" 
                        style="border-radius: var(--radius-sm);"
                        @click="openEditModal(tea)"
                        title="Редактировать сорт"
                      >
                        Редактировать
                      </button>
                      <button 
                        class="btn btn-sm btn-outline-danger px-2.5" 
                        style="border-radius: var(--radius-sm);"
                        @click="confirmDelete(tea)"
                        title="Удалить запись"
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Нижняя панель таблицы: Пагинация ИЛИ Кнопка ленивой подгрузки -->
          <div class="card-footer bg-light d-flex flex-wrap justify-content-between align-items-center py-3">
            <div class="text-muted small mb-2 mb-md-0 d-flex align-items-center flex-wrap">
              <span>Показано <b>{{ displayedTeas.length }}</b> из <b>{{ totalRows }}</b> сортов чая</span>
              <span v-if="lazyMode" class="badge badge-info ml-2">Режим: Ленивая подгрузка</span>
              <span v-else class="badge badge-secondary ml-2">Режим: Пагинация</span>

              <!-- Деликатная ссылка восстановления демо-данных (убрана из верхнего тулбара) -->
              <button 
                type="button" 
                class="btn btn-link btn-sm text-muted ml-3 p-0 text-decoration-none" 
                @click="resetData" 
                title="Восстановить начальные 12 сортов"
              >
                (Сбросить базу к 12 сортам)
              </button>
            </div>

            <!-- 1. ПОСТРАНИЧНАЯ ЗАГРУЗКА (ТРЕБОВАНИЕ: ЕСЛИ БОЛЬШЕ 10 СТРОК — ПАГИНАЦИЯ) -->
            <div v-if="!lazyMode && totalRows > itemsPerPage">
              <nav aria-label="Page navigation">
                <ul class="pagination pagination-sm mb-0">
                  <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click.prevent="setPage(currentPage - 1)">&laquo; Назад</a>
                  </li>
                  <li 
                    v-for="page in totalPages" 
                    :key="page" 
                    class="page-item" 
                    :class="{ active: currentPage === page }"
                  >
                    <a class="page-link" href="#" @click.prevent="setPage(page)">{{ page }}</a>
                  </li>
                  <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click.prevent="setPage(currentPage + 1)">Вперед &raquo;</a>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- 2. КНОПКА ЛЕНИВОЙ ПОДГРУЗКИ (ТРЕБОВАНИЕ: ПРЕДУСМОТРЕТЬ КНОПКУ ЛЕНИВОЙ ПОДГРУЗКИ ДАННЫХ) -->
            <div v-if="lazyMode || totalRows > displayedTeas.length">
              <button 
                class="btn btn-warning btn-sm font-weight-bold shadow-sm"
                @click="loadMoreLazy"
                :disabled="!hasMoreLazyItems"
              >
                {{ hasMoreLazyItems ? 'Загрузить еще (+5 сортов, Lazy Load)' : 'Все записи подгружены' }}
              </button>
            </div>
          </div>
        </div>

        <!-- ПЕРЕИСПОЛЬЗУЕМЫЙ МОДУЛЬ ДОБАВЛЕНИЯ И ОБНОВЛЕНИЯ ДАННЫХ (TeaModal) -->
        <tea-modal 
          :show="showModal"
          :is-edit="isEditMode"
          :item-data="selectedTea"
          :is-saving="isSaving"
          @close="showModal = false"
          @save="handleModalSave"
        ></tea-modal>

        <!-- Модальное окно подтверждения удаления -->
        <div v-if="showDeleteConfirm" class="modal-backdrop-custom" @click.self="showDeleteConfirm = false">
          <div class="modal-dialog-custom modal-dialog-centered" role="document">
            <div class="modal-content shadow-lg border-danger">
              <div class="modal-header bg-danger text-white py-3">
                <h5 class="modal-title font-weight-bold">Подтверждение удаления</h5>
                <button type="button" class="btn btn-sm btn-outline-light" @click="showDeleteConfirm = false">
                  Закрыть
                </button>
              </div>
              <div class="modal-body p-4 text-center">
                <div class="badge badge-danger p-2 mb-3 text-uppercase font-weight-bold">Удаление записи</div>
                <h5>Вы уверены, что хотите удалить сорт?</h5>
                <p class="text-danger font-weight-bold mb-1">{{ teaToDelete ? teaToDelete.title : '' }}</p>
                <p class="text-muted small mb-0">Это действие нельзя отменить. Запись о удалении будет сохранена в журнале аудита.</p>
              </div>
              <div class="modal-footer bg-light p-3">
                <button type="button" class="btn btn-secondary px-3" @click="showDeleteConfirm = false">Отмена</button>
                <button type="button" class="btn btn-danger px-4" @click="handleDelete" :disabled="isLoading">
                  Да, удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};
