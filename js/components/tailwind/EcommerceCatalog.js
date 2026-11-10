/**
 * EcommerceCatalog.js — Задание 4.3: E-commerce каталог с фильтрами
 * Требования:
 * - Фильтры (категория, цена-слайдер, теги)
 * - Сортировка (dropdown)
 * - Сетка товаров
 * - Пагинация
 * - Мобильные фильтры (drawer снизу: translate-y-full, backdrop-blur-sm)
 * - Skeleton-загрузка (animate-pulse)
 * - Требования: @container (container queries), drawer через translate-y-full, backdrop-blur-sm
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.EcommerceCatalog = {
  name: 'EcommerceCatalog',
  data() {
    return {
      mobileFilterDrawerOpen: false,
      isLoading: false,
      selectedCategory: 'all',
      maxPrice: 3500,
      selectedTag: 'all',
      sortBy: 'price-asc',
      currentPage: 1,
      itemsPerPage: 4,

      categories: [
        { id: 'all', label: 'Все категории' },
        { id: 'Улун', label: 'Улуны' },
        { id: 'Пуэр', label: 'Пуэры' },
        { id: 'Белый чай', label: 'Белый чай' },
        { id: 'Зеленый чай', label: 'Зеленый чай' }
      ],

      tags: [
        { id: 'all', label: 'Все теги' },
        { id: 'organic', label: 'Органический' },
        { id: 'vintage', label: 'Выдержанный' },
        { id: 'exclusive', label: 'Коллекционный' }
      ],

      rawProducts: [
        { id: 1, name: 'Да Хун Пао (Большой Красный Халат)', category: 'Улун', tag: 'exclusive', price: 1850, rating: 4.9, weight: '100 г', image: 'images/collection-1.jpg', fallback: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80' },
        { id: 2, name: 'Те Гуань Инь Ван (Железная Бодхисаттва)', category: 'Улун', tag: 'organic', price: 1420, rating: 4.8, weight: '100 г', image: 'images/collection-2.jpg', fallback: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=500&q=80' },
        { id: 3, name: 'Шу Пуэр Мэнхай 2012 (Императорский)', category: 'Пуэр', tag: 'vintage', price: 2650, rating: 5.0, weight: '357 г блин', image: 'images/hero-bg.jpg', fallback: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
        { id: 4, name: 'Бай Хао Инь Чжэнь (Серебряные Иглы)', category: 'Белый чай', tag: 'exclusive', price: 2950, rating: 4.9, weight: '50 г', image: 'images/tea-leaves.jpg', fallback: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=500&q=80' },
        { id: 5, name: 'Лунцзин Сиху (Колодец Дракона)', category: 'Зеленый чай', tag: 'organic', price: 2100, rating: 4.9, weight: '50 г', image: 'images/collection-3.jpg', fallback: 'https://images.unsplash.com/photo-1563911892437-1feda0179e1b?auto=format&fit=crop&w=500&q=80' },
        { id: 6, name: 'Моли Чжэнь Чжу (Жасминовый Жемчуг)', category: 'Зеленый чай', tag: 'organic', price: 1290, rating: 4.7, weight: '100 г', image: 'images/tea-prep.jpg', fallback: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=500&q=80' },
        { id: 7, name: 'Шэн Пуэр Юньнань 2018 (Древние деревья)', category: 'Пуэр', tag: 'vintage', price: 3200, rating: 4.9, weight: '357 г блин', image: 'images/hero-bg.jpg', fallback: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=500&q=80' },
        { id: 8, name: 'Дун Дин Улун (Морозный Пик Тайвань)', category: 'Улун', tag: 'exclusive', price: 1980, rating: 4.8, weight: '75 г', image: 'images/collection-1.jpg', fallback: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80' }
      ]
    };
  },
  computed: {
    filteredProducts() {
      let list = this.rawProducts.filter(item => {
        const catMatch = this.selectedCategory === 'all' || item.category === this.selectedCategory;
        const tagMatch = this.selectedTag === 'all' || item.tag === this.selectedTag;
        const priceMatch = item.price <= this.maxPrice;
        return catMatch && tagMatch && priceMatch;
      });

      if (this.sortBy === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      }

      return list;
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredProducts.length / this.itemsPerPage));
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredProducts.slice(start, start + this.itemsPerPage);
    }
  },
  methods: {
    triggerLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    changeCategory(cat) {
      this.selectedCategory = cat;
      this.currentPage = 1;
      this.triggerLoading();
    },
    changeTag(tag) {
      this.selectedTag = tag;
      this.currentPage = 1;
      this.triggerLoading();
    },
    resetFilters() {
      this.selectedCategory = 'all';
      this.selectedTag = 'all';
      this.maxPrice = 3500;
      this.currentPage = 1;
      this.mobileFilterDrawerOpen = false;
      this.triggerLoading();
    },
    onImgError(e, fallback) {
      if (e && e.target && fallback) {
        e.target.src = fallback;
      }
    }
  },
  template: `
    <section class="w-full bg-slate-50 dark:bg-slate-900 rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6" aria-label="Каталог чайных сборов">
      
      <!-- Верхний Topbar каталога: заголовок, мобильная кнопка фильтра и сортировка -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span class="caption-text text-emerald-600 font-bold">Уровень 4.3: E-commerce</span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Каталог премиального чая
          </h2>
          <p class="text-xs text-slate-400">Найдено: {{ filteredProducts.length }} сортов</p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Кнопка открытия мобильного drawer-фильтра -->
          <button 
            type="button"
            @click="mobileFilterDrawerOpen = true"
            class="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm"
          >
            <svg class="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>Фильтры</span>
          </button>

          <!-- Dropdown сортировки -->
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400 hidden sm:inline">Сортировка:</span>
            <select 
              v-model="sortBy"
              @change="triggerLoading"
              class="px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="price-asc">По возрастанию цены</option>
              <option value="price-desc">По убыванию цены</option>
              <option value="rating">По рейтингу титестеров</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Главная область: Фильтры слева (десктоп) + Контейнер товаров справа -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- 1. ДЕСКТОПНАЯ КОЛОНКА ФИЛЬТРОВ (lg:col-span-1 hidden lg:block) -->
        <aside class="hidden lg:block space-y-6 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-sm self-start">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h3 class="text-sm font-bold text-slate-900 dark:text-white">Параметры отбора</h3>
            <button type="button" @click="resetFilters" class="text-xs text-emerald-600 hover:underline font-medium">Сбросить</button>
          </div>

          <!-- Категории чая -->
          <div class="space-y-2">
            <span class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Категория</span>
            <div class="space-y-1">
              <button 
                v-for="cat in categories" 
                :key="cat.id"
                type="button"
                @click="changeCategory(cat.id)"
                :class="selectedCategory === cat.id ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/40'"
                class="w-full text-left px-3 py-1.5 rounded-lg text-xs transition flex items-center justify-between"
              >
                <span>{{ cat.label }}</span>
                <span v-if="selectedCategory === cat.id" class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              </button>
            </div>
          </div>

          <!-- Слайдер цены -->
          <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Макс. цена:</span>
              <span class="text-emerald-600 font-extrabold">{{ maxPrice }} ₽</span>
            </div>
            <input 
              type="range" 
              min="1000" 
              max="3500" 
              step="100"
              v-model.number="maxPrice"
              @change="triggerLoading"
              class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div class="flex justify-between text-[11px] text-slate-400">
              <span>1 000 ₽</span>
              <span>3 500 ₽</span>
            </div>
          </div>

          <!-- Теги и особенности -->
          <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <span class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Теги</span>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="t in tags"
                :key="t.id"
                type="button"
                @click="changeTag(t.id)"
                :class="selectedTag === t.id 
                  ? 'bg-emerald-600 text-white font-semibold' 
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
                class="px-2.5 py-1 rounded-lg text-xs transition"
              >
                {{ t.label }}
              </button>
            </div>
          </div>
        </aside>

        <!-- 2. ОБЛАСТЬ ТОВАРОВ С CONTAINER QUERIES (@container) И SKELETON-ЗАГРУЗКОЙ -->
        <main class="lg:col-span-3 space-y-6">
          
          <!-- Обертка с @container для Tailwind 3.4+ Container Queries -->
          <div class="@container w-full">
            
            <!-- Skeleton-загрузка при смене фильтра: animate-pulse -->
            <div v-if="isLoading" class="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-6 animate-pulse">
              <div v-for="n in itemsPerPage" :key="n" class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-3">
                <div class="w-full aspect-square bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div class="h-8 bg-slate-200 dark:bg-slate-700 rounded-xl mt-4"></div>
              </div>
            </div>

            <!-- Реальная сетка товаров через @container: @sm:grid-cols-2 @2xl:grid-cols-4 -->
            <div v-else-if="paginatedProducts.length > 0" class="grid grid-cols-1 @sm:grid-cols-2 @2xl:grid-cols-4 gap-6">
              <article 
                v-for="product in paginatedProducts" 
                :key="product.id"
                class="card-tw card-tw-hover p-4 flex flex-col justify-between"
              >
                <div>
                  <div class="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 mb-3">
                    <img 
                      :src="product.image" 
                      :alt="product.name" 
                      class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      @error="onImgError($event, product.fallback)"
                    />
                    <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-sm">
                      {{ product.category }}
                    </span>
                  </div>

                  <p class="text-[11px] text-slate-400 font-medium">{{ product.weight }}</p>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5 min-h-[40px]">
                    {{ product.name }}
                  </h4>
                </div>

                <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2 mt-2">
                  <div>
                    <span class="text-[10px] text-slate-400 block">Цена</span>
                    <span class="text-base font-extrabold text-slate-900 dark:text-white">{{ product.price }} ₽</span>
                  </div>
                  <button type="button" class="btn-tw-sm btn-tw-primary">
                    В корзину
                  </button>
                </div>
              </article>
            </div>

            <!-- Пустое состояние (empty state) -->
            <div v-else class="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 class="text-base font-bold text-slate-800 dark:text-white">По выбранным фильтрам ничего не найдено</h4>
              <p class="text-xs text-slate-400 max-w-sm mx-auto">Попробуйте увеличить максимальную цену или сбросить фильтр тегов.</p>
              <button type="button" @click="resetFilters" class="btn-tw-sm btn-tw-outline mt-2">Сбросить параметры</button>
            </div>

          </div>

          <!-- Пагинация страниц -->
          <div v-if="totalPages > 1" class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
            <span class="text-xs text-slate-400">
              Страница {{ currentPage }} из {{ totalPages }}
            </span>
            <div class="flex items-center gap-1.5">
              <button 
                type="button" 
                @click="currentPage--; triggerLoading()"
                :disabled="currentPage === 1"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Назад
              </button>
              <button 
                v-for="p in totalPages" 
                :key="p"
                type="button"
                @click="currentPage = p; triggerLoading()"
                :class="currentPage === p ? 'bg-emerald-600 text-white' : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'"
                class="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition"
              >
                {{ p }}
              </button>
              <button 
                type="button" 
                @click="currentPage++; triggerLoading()"
                :disabled="currentPage === totalPages"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Вперед
              </button>
            </div>
          </div>
        </main>
      </div>

      <!-- 3. ВЫЕЗЖАЮЩИЙ СНИЗУ МОБИЛЬНЫЙ DRAWER ФИЛЬТРОВ (translate-y-full + backdrop-blur-sm) -->
      <!-- Оверлей затемнения -->
      <div 
        v-if="mobileFilterDrawerOpen"
        @click="mobileFilterDrawerOpen = false"
        class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
      ></div>

      <!-- Панель Drawer: fixed inset-x-0 bottom-0 z-50 transform translate-y-full -> translate-y-0 -->
      <div 
        :class="mobileFilterDrawerOpen ? 'translate-y-0' : 'translate-y-full'"
        class="fixed inset-x-0 bottom-0 z-50 bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-700 p-6 shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto lg:hidden space-y-5"
      >
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 class="text-base font-bold text-slate-900 dark:text-white">Фильтры каталога</h3>
          <button 
            type="button"
            @click="mobileFilterDrawerOpen = false"
            class="p-1 rounded-lg text-slate-400 hover:text-slate-600"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Категории в drawer -->
        <div class="space-y-2">
          <span class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Категория</span>
          <div class="grid grid-cols-2 gap-2">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              type="button"
              @click="changeCategory(cat.id)"
              :class="selectedCategory === cat.id ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'"
              class="px-3 py-2 rounded-xl text-xs text-center transition"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>

        <!-- Слайдер цены в drawer -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-bold">
            <span>Макс. цена:</span>
            <span class="text-emerald-600">{{ maxPrice }} ₽</span>
          </div>
          <input 
            type="range" 
            min="1000" 
            max="3500" 
            step="100"
            v-model.number="maxPrice"
            @change="triggerLoading"
            class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none accent-emerald-600"
          />
        </div>

        <!-- Кнопка применения фильтров -->
        <div class="pt-4 flex gap-3">
          <button 
            type="button" 
            @click="resetFilters" 
            class="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
          >
            Сбросить
          </button>
          <button 
            type="button" 
            @click="mobileFilterDrawerOpen = false; triggerLoading()" 
            class="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/25"
          >
            Применить ({{ filteredProducts.length }})
          </button>
        </div>
      </div>

    </section>
  `
};
