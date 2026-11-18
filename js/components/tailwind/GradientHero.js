/**
 * GradientHero.js — Задание 2.1: Hero-секция с градиентом
 * Требования:
 * - Большой заголовок с градиентным текстом (bg-clip-text)
 * - Подзаголовок
 * - Две кнопки (primary + outline)
 * - Фоновое изображение с overlay
 * - Декоративные blur-круги на фоне
 * - Плавная анимация появления
 * - Требования: bg-gradient-to-r, from-purple-500 to-pink-500, blur-3xl, animate-pulse, backdrop-blur
 */

window.GradientHero = {
  name: 'GradientHero',
  template: `
    <section class="relative min-h-[540px] sm:min-h-[620px] rounded-3xl overflow-hidden flex items-center justify-center p-6 sm:p-12 shadow-2xl border border-slate-200/50 dark:border-slate-800">
      
      <!-- 1. Фоновое изображение с оверлеем (overlay) -->
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style="background-image: url('images/hero-bg.jpg');"
      ></div>
      <div class="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px]"></div>

      <!-- 2. Декоративные blur-круги на фоне с animate-pulse (из требований) -->
      <div 
        class="absolute -top-16 -left-16 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-3xl animate-pulse pointer-events-none"
        style="animation-duration: 6s;"
      ></div>
      <div 
        class="absolute -bottom-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 opacity-25 blur-3xl animate-pulse pointer-events-none"
        style="animation-duration: 8s;"
      ></div>
      <div 
        class="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 rounded-full bg-emerald-500 opacity-20 blur-3xl pointer-events-none"
      ></div>

      <!-- 3. Центральный контент с плавной анимацией появления -->
      <div class="relative z-10 max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in">
        
        <!-- Верхняя текстовая плашка (чистая типографика) -->
        <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-300 tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Новый сезонный сбор 2026 уже в каталоге</span>
        </div>

        <!-- Большой заголовок с градиентным текстом bg-clip-text text-transparent -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Искусство восточного чая: 
          <span class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-amber-300">
            Гармония, Традиция и Вкус
          </span>
        </h1>

        <!-- Подзаголовок -->
        <p class="text-base sm:text-xl text-slate-200/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Погрузитесь в аутентичную чайную культуру Китая и Тайваня. Прямые поставки с высокогорных плантаций, строгий органолептический отбор каждого листа.
        </p>

        <!-- Две кнопки: primary + outline с эффектами hover и focus-visible -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <!-- Primary кнопка с градиентом и тенью -->
          <a 
            href="#catalog"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 text-center"
          >
            Перейти в каталог
          </a>

          <!-- Outline кнопка с backdrop-blur -->
          <a 
            href="#services"
            class="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white border-2 border-white/40 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 text-center"
          >
            Чайная церемония
          </a>
        </div>

        <!-- Преимущества в одну строку на мобильных и десктопе -->
        <div class="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 text-white/80 text-xs sm:text-sm">
          <div>
            <span class="block font-bold text-white text-base sm:text-lg">100%</span>
            <span>Аутентичный сбор</span>
          </div>
          <div>
            <span class="block font-bold text-white text-base sm:text-lg">350+</span>
            <span>Редких сортов</span>
          </div>
          <div>
            <span class="block font-bold text-white text-base sm:text-lg">24 часа</span>
            <span>Бережная доставка</span>
          </div>
        </div>

      </div>

    </section>
  `
};
