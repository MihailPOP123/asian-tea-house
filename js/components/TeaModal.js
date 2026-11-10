/**
 * TeaModal.js — Переиспользуемый компонент модального окна для добавления и обновления данных
 * Требование: «Модуль добавление и обновление данных реализовать в виде компонента модального окна.
 * Данный компонент должен быть переиспользован для обеих функций.»
 */
window.TeaModal = {
  name: 'TeaModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    itemData: {
      type: Object,
      default: () => ({})
    },
    isSaving: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'close'],
  data() {
    return {
      formData: {
        id: null,
        title: '',
        price: '',
        category: 'Зеленый чай',
        origin: 'Япония',
        stock: 10,
        rating: 4.8,
        image: 'images/product-image.png',
        desc: ''
      },
      errors: {},
      presetImages: [
        { label: 'Церемониальная матча (Зеленый)', url: 'images/product-image.png' },
        { label: 'Сенча Туманные горы (Банка)', url: 'images/product-image(1).png' },
        { label: 'Обжаренная ходзича (Коричневый)', url: 'images/product-image(2).png' },
        { label: 'Жемчужины с жасмином (Светлый)', url: 'images/product-image(3).png' },
        { label: 'Матча в чаше (Hero баннер)', url: 'images/hero-image.png' },
        { label: 'Чайная плантация (Горы)', url: 'images/about-image.png' }
      ]
    };
  },
  watch: {
    show(val) {
      if (val) {
        this.errors = {};
        if (this.isEdit && this.itemData) {
          this.formData = {
            id: this.itemData.id,
            title: this.itemData.title || '',
            price: this.itemData.price !== undefined ? this.itemData.price : '',
            category: this.itemData.category || 'Зеленый чай',
            origin: this.itemData.origin || 'Восточная Азия',
            stock: this.itemData.stock !== undefined ? this.itemData.stock : 10,
            rating: this.itemData.rating !== undefined ? this.itemData.rating : 4.8,
            image: this.itemData.image || 'images/product-image.png',
            desc: this.itemData.desc || ''
          };
        } else {
          this.formData = {
            id: null,
            title: '',
            price: '',
            category: 'Зеленый чай',
            origin: 'Япония',
            stock: 10,
            rating: 4.8,
            image: 'images/product-image.png',
            desc: ''
          };
        }
      }
    }
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.formData.title.trim()) {
        this.errors.title = 'Введите наименование сорта чая';
      }
      if (!this.formData.price || parseFloat(this.formData.price) <= 0) {
        this.errors.price = 'Укажите корректную цену (больше 0)';
      }
      if (!this.formData.category) {
        this.errors.category = 'Выберите категорию';
      }
      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (!this.validate()) return;
      this.$emit('save', {
        isEdit: this.isEdit,
        data: {
          ...this.formData,
          price: parseFloat(this.formData.price),
          stock: parseInt(this.formData.stock, 10) || 0,
          rating: parseFloat(this.formData.rating) || 5.0
        }
      });
    }
  },
  template: `
    <div v-if="show" class="modal-backdrop-custom" @click.self="$emit('close')">
      <div class="modal-dialog-custom modal-dialog-centered modal-lg" role="document">
        <div class="modal-content shadow-lg border-0 rounded-lg">
          <div class="modal-header py-3 px-4 text-white" :style="{ backgroundColor: isEdit ? 'var(--accent-dark)' : 'var(--accent-brown)' }">
            <h5 class="modal-title font-weight-bold">
              {{ isEdit ? 'Редактирование сорта чая' : 'Добавление нового сорта чая' }}
            </h5>
            <button type="button" class="btn btn-sm btn-outline-light" @click="$emit('close')" aria-label="Закрыть">
              Закрыть
            </button>
          </div>

          <form @submit.prevent="handleSubmit">
            <div class="modal-body p-4">
              <div class="row">
                <!-- Левая колонка: форма ввода -->
                <div class="col-md-7">
                  <!-- Название -->
                  <div class="form-group mb-3">
                    <label class="font-weight-bold small text-muted text-uppercase">Наименование чая *</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      :class="{ 'is-invalid': errors.title }" 
                      v-model="formData.title" 
                      placeholder="Например: Церемониальная матча из Удзи"
                      required
                    >
                    <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
                  </div>

                  <div class="form-row">
                    <!-- Цена -->
                    <div class="form-group col-md-6 mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Цена ($) *</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">$</span>
                        </div>
                        <input 
                          type="number" 
                          step="0.01" 
                          min="0.1" 
                          class="form-control" 
                          :class="{ 'is-invalid': errors.price }" 
                          v-model="formData.price" 
                          placeholder="48.00"
                          required
                        >
                        <div v-if="errors.price" class="invalid-feedback">{{ errors.price }}</div>
                      </div>
                    </div>

                    <!-- Категория -->
                    <div class="form-group col-md-6 mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Категория *</label>
                      <select class="form-control custom-select" v-model="formData.category">
                        <option value="Зеленый чай">Зеленый чай</option>
                        <option value="Белый чай">Белый чай</option>
                        <option value="Улун">Улун</option>
                        <option value="Пуэр">Пуэр</option>
                        <option value="Жареный чай">Жареный чай</option>
                        <option value="Черный чай">Черный чай</option>
                        <option value="Травяной сбор">Травяной сбор</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-row">
                    <!-- Происхождение -->
                    <div class="form-group col-md-6 mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Регион происхождения</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        v-model="formData.origin" 
                        placeholder="Киото, Япония"
                      >
                    </div>

                    <!-- Остаток на складе -->
                    <div class="form-group col-md-6 mb-3">
                      <label class="font-weight-bold small text-muted text-uppercase">Остаток на складе (упаковок)</label>
                      <input 
                        type="number" 
                        min="0" 
                        class="form-control" 
                        v-model="formData.stock" 
                        placeholder="15"
                      >
                    </div>
                  </div>

                  <!-- Описание -->
                  <div class="form-group mb-3">
                    <label class="font-weight-bold small text-muted text-uppercase">Описание сорта</label>
                    <textarea 
                      class="form-control" 
                      rows="3" 
                      v-model="formData.desc" 
                      placeholder="Опишите вкусовой профиль, сбор, аромат и рекомендации по завариванию..."
                    ></textarea>
                  </div>
                </div>

                <!-- Правая колонка: предпросмотр и выбор фото -->
                <div class="col-md-5">
                  <div class="form-group mb-3">
                    <label class="font-weight-bold small text-muted text-uppercase">Выбор иллюстрации</label>
                    <select class="form-control custom-select mb-2" v-model="formData.image">
                      <option v-for="img in presetImages" :key="img.url" :value="img.url">
                        {{ img.label }}
                      </option>
                    </select>
                    <input 
                      type="text" 
                      class="form-control form-control-sm" 
                      v-model="formData.image" 
                      placeholder="Или введите путь/URL к изображению"
                    >
                  </div>

                  <!-- Карточка предпросмотра -->
                  <div class="card border rounded shadow-sm overflow-hidden text-center p-3 bg-light">
                    <div class="small text-muted font-weight-bold text-uppercase mb-2">Предпросмотр карточки</div>
                    <div style="height: 140px; display: flex; align-items: center; justify-content: center; background: #fff; border-radius: 4px; overflow: hidden;" class="mb-2 border">
                      <img :src="formData.image" alt="Preview" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                    </div>
                    <h6 class="font-italic font-weight-bold text-truncate mb-1" style="font-family: var(--font-serif);">
                      {{ formData.title || 'Название чая' }}
                    </h6>
                    <div class="badge badge-warning text-dark font-weight-bold align-self-center mb-1">
                      {{ formData.category }}
                    </div>
                    <div class="text-danger font-weight-bold">
                      \${{ formData.price ? parseFloat(formData.price).toFixed(2) : '0.00' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-footer bg-light px-4 py-3 d-flex justify-content-between">
              <span class="text-muted small">
                <span class="text-danger">*</span> Обязательные для заполнения поля
              </span>
              <div>
                <button type="button" class="btn btn-secondary px-3 mr-2" @click="$emit('close')" :disabled="isSaving">
                  Отмена
                </button>
                <button 
                  type="submit" 
                  class="btn text-white px-4 font-weight-bold" 
                  :style="{ backgroundColor: isEdit ? 'var(--accent-dark)' : 'var(--accent-brown)' }"
                  :disabled="isSaving"
                >
                  <span v-if="isSaving" class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
                  {{ isEdit ? 'Сохранить изменения' : 'Добавить в каталог' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
};
