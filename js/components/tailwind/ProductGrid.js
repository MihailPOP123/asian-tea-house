/**
 * ProductGrid.js — Задание 1.3: Сетка карточек товаров
 * Требования:
 * - Сетка из 6 карточек товаров
 * - Изображение (aspect-square)
 * - Название, цена
 * - Кнопка "В корзину"
 * - Адаптив: 1 колонка -> 2 -> 3 -> 4
 * - Требования: grid, grid-cols-1 sm:grid-cols-2 lg:grid-cols-4, hover:scale-105, transition
 * - Без эмодзи (чистый текст и SVG)
 */

window.ProductGrid = {
  name: 'ProductGrid',
  emits: ['add-to-cart'],
  data() {
    return {
      addedItems: {},
      products: [
        {
          id: 1,
          name: 'Да Хун Пао (Большой Красный Халат)',
          category: 'Улун',
          price: 1850,
          weight: '100 г',
          rating: '4.9',
          image: 'images/collection-1.jpg',
          fallbackImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 2,
          name: 'Те Гуань Инь (Железная Бодхисаттва)',
          category: 'Светлый улун',
          price: 1420,
          weight: '100 г',
          rating: '4.8',
          image: 'images/collection-2.jpg',
          fallbackImage: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 3,
          name: 'Лунцзин (Колодец Дракона)',
          category: 'Зеленый чай',
          price: 2100,
          weight: '50 г',
          rating: '5.0',
          image: 'images/collection-3.jpg',
          fallbackImage: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 4,
          name: 'Шу Пуэр Гунтин 2012 (Императорский)',
          category: 'Пуэр',
          price: 2650,
          weight: '357 г (блин)',
          rating: '4.9',
          image: 'images/hero-bg.jpg',
          fallbackImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 5,
          name: 'Бай Хао Инь Чжэнь (Серебряные Иглы)',
          category: 'Белый чай',
          price: 2950,
          weight: '50 г',
          rating: '4.9',
          image: 'images/tea-leaves.jpg',
          fallbackImage: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=500&q=80'
        },
        {
          id: 6,
          name: 'Моли Чжэнь Чжу (Жасминовая Жемчужина)',
          category: 'Жасминовый чай',
          price: 1290,
          weight: '100 г',
          rating: '4.7',
          image: 'images/tea-prep.jpg',
          fallbackImage: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=500&q=80'
        }
      ]
    };
  },
  methods: {
    addToCart(item) {
      this.addedItems[item.id] = true;
      this.$emit('add-to-cart', item);
      setTimeout(() => {
        this.addedItems[item.id] = false;
      }, 1500);
    },
    onImgError(e, fallback) {
      if (e && e.target && fallback) {
        e.target.src = fallback;
      }
    }
  },
  template: `
    <section class="py-6 sm:py-8" aria-label="Сетка карточек товаров">
      <!-- Сетка с адаптивностью: 1 колонка на мобильных -> 2 на sm -> 3 на md -> 4 на lg -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <article 
          v-for="item in products" 
          :key="item.id"
          class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Область изображения: aspect-square, hover:scale-105, transition -->
          <div class="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
            <img 
              :src="item.image" 
              :alt="'Чай ' + item.name"
              class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              @error="onImgError($event, item.fallbackImage)"
            />
            
            <!-- Бейдж категории -->
            <span class="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-sm shadow-sm">
              {{ item.category }}
            </span>

            <!-- Оценка (без эмодзи) -->
            <span class="absolute top-3 right-3 px-2 py-0.5 text-xs font-bold rounded-md bg-amber-500/90 text-white backdrop-blur-sm">
              Рейтинг {{ item.rating }}
            </span>
          </div>

          <!-- Текстовый контент карточки -->
          <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <p class="text-xs text-slate-400 font-medium">{{ item.weight }}</p>
              <h4 class="text-base font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {{ item.name }}
              </h4>
            </div>

            <!-- Цена и кнопка "В корзину" -->
            <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-3">
              <div>
                <span class="text-xs text-slate-400 block font-normal">Стоимость</span>
                <span class="text-lg font-extrabold text-slate-900 dark:text-white">
                  {{ item.price }} ₽
                </span>
              </div>

              <!-- Кнопка "В корзину" с анимацией и состоянием добавлен -->
              <button 
                type="button"
                @click="addToCart(item)"
                :class="addedItems[item.id] 
                  ? 'bg-emerald-700 text-white' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'"
                class="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm flex items-center gap-1.5"
                :aria-label="'Добавить ' + item.name + ' в корзину'"
              >
                <!-- SVG иконка корзины -->
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>{{ addedItems[item.id] ? 'В корзине' : 'В корзину' }}</span>
              </button>
            </div>
          </div>

        </article>

      </div>
    </section>
  `
};
