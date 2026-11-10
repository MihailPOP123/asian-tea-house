/**
 * TailwindLanding.js — Задание 3.3: Комплексный лендинг
 * Требования:
 * - Секции:
 *   1. Navbar (sticky)
 *   2. Hero с CTA
 *   3. Features (3 колонки с иконками)
 *   4. Testimonials (карусель без JS через snap)
 *   5. Pricing
 *   6. FAQ (аккордеон через <details> + group-open:*)
 *   7. Footer (4 колонки)
 * - Использовать: @apply в отдельном CSS-файле (css/tailwind-custom.css), кастомные цвета tailwind.config
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.TailwindLanding = {
  name: 'TailwindLanding',
  components: {
    'pricing-table': window.PricingTable
  },
  template: `
    <div class="w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors">
      
      <!-- 1. СЕКЦИЯ: NAVBAR (Sticky) -->
      <header class="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-serif font-black">
            T
          </span>
          <span class="font-bold text-lg tracking-wider text-slate-900 dark:text-white uppercase font-serif">
            ASIAN TEA HOUSE
          </span>
        </div>

        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#features" class="hover:text-emerald-600 transition">О чае</a>
          <a href="#testimonials" class="hover:text-emerald-600 transition">Отзывы</a>
          <a href="#pricing" class="hover:text-emerald-600 transition">Абонемент</a>
          <a href="#faq" class="hover:text-emerald-600 transition">Вопросы</a>
        </nav>

        <a href="#catalog" class="btn-tw-sm btn-tw-primary">
          В коллекцию
        </a>
      </header>

      <!-- 2. СЕКЦИЯ: HERO С CTA -->
      <section class="relative py-16 sm:py-24 px-6 text-center overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white dark:from-slate-950 dark:to-slate-900">
        <div class="max-w-4xl mx-auto space-y-6">
          <span class="caption-text text-emerald-600 dark:text-emerald-400 font-bold">
            Истинный вкус китайских традиций
          </span>
          <h1 class="heading-1">
            Откройте мир аутентичного чая высшего грейда
          </h1>
          <p class="body-text max-w-2xl mx-auto text-base sm:text-lg">
            Мы лично отбираем редкие партии у проверенных фермеров провинций Юньнань, Фуцзянь и Тайваня. Никаких ароматизаторов — только чистый лист и живая энергия.
          </p>
          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <a href="#pricing" class="btn-tw-lg btn-tw-primary">
              Выбрать дегустационный сет
            </a>
            <a href="#features" class="btn-tw-lg btn-tw-outline">
              Узнать о стандартах сбора
            </a>
          </div>
        </div>
      </section>

      <!-- 3. СЕКЦИЯ: FEATURES (3 колонки с иконками) -->
      <section id="features" class="py-16 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800">
        <div class="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span class="caption-text text-emerald-600">Наши стандарты</span>
          <h2 class="heading-2">Почему знатоки выбирают Asian Tea House</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Карточка фичи 1 -->
          <article class="card-tw p-6 space-y-4 hover:shadow-lg transition-all">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="heading-3 text-lg">Прямой горный терруар</h3>
            <p class="body-text text-sm">
              Чайные кусты возрастом от 80 до 300 лет, произрастающие на высоте более 1200 метров в экологически чистых заповедниках.
            </p>
          </article>

          <!-- Карточка фичи 2 -->
          <article class="card-tw p-6 space-y-4 hover:shadow-lg transition-all">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 class="heading-3 text-lg">Контроль влажности и выдержки</h3>
            <p class="body-text text-sm">
              Хранение в специализированных климатических комнатах с постоянной циркуляцией очищенного воздуха без посторонних запахов.
            </p>
          </article>

          <!-- Карточка фичи 3 -->
          <article class="card-tw p-6 space-y-4 hover:shadow-lg transition-all">
            <div class="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="heading-3 text-lg">Сопровождение титестера</h3>
            <p class="body-text text-sm">
              К каждому сорту прилагается подробный паспорт лота с точными рекомендациями по посуде, температуре воды и времени проливов.
            </p>
          </article>
        </div>
      </section>

      <!-- 4. СЕКЦИЯ: TESTIMONIALS (Карусель без JS через snap-x snap-mandatory) -->
      <section id="testimonials" class="py-16 px-6 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800">
        <div class="max-w-7xl mx-auto space-y-8">
          <div class="text-center max-w-2xl mx-auto space-y-2">
            <span class="caption-text text-emerald-600">Мнения ценителей</span>
            <h2 class="heading-2">Отзывы участников клуба</h2>
            <p class="body-text text-sm">Прокручивайте карусель жестом или колесом мыши (чистый CSS snap)</p>
          </div>

          <!-- Карусель без JS: overflow-x-auto snap-x snap-mandatory flex gap-6 -->
          <div class="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 pt-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
            
            <article class="flex-shrink-0 w-80 sm:w-96 snap-center card-tw p-6 flex flex-col justify-between">
              <p class="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                «Партия Да Хун Пао превзошла все ожидания. Глубокий минеральный привкус скал Уишань и долгое сладкое послевкусие в горле. Лучший чай в моей коллекции!»
              </p>
              <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <img src="images/team-master.jpg" alt="Михаил Д." class="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white">Михаил Д.</h4>
                  <p class="text-xs text-slate-400">Чайный энтузиаст, Москва</p>
                </div>
              </div>
            </article>

            <article class="flex-shrink-0 w-80 sm:w-96 snap-center card-tw p-6 flex flex-col justify-between">
              <p class="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                «Абонемент Pro стал открытием года. Каждый месяц ждем посылку всей семьей. Особенно запомнился белый чай Серебряные Иглы весеннего сбора.»
              </p>
              <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <img src="images/collection-2.jpg" alt="Елена С." class="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white">Елена С.</h4>
                  <p class="text-xs text-slate-400">Владелица студии йоги</p>
                </div>
              </div>
            </article>

            <article class="flex-shrink-0 w-80 sm:w-96 snap-center card-tw p-6 flex flex-col justify-between">
              <p class="text-sm italic text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                «Как шеф-сомелье могу подтвердить: чистота листа и органолептика чая здесь на европейском ресторанном уровне. Рекомендую всем ценителям.»
              </p>
              <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <img src="images/collection-3.jpg" alt="Алексей В." class="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 class="text-sm font-bold text-slate-900 dark:text-white">Алексей В.</h4>
                  <p class="text-xs text-slate-400">Шеф-сомелье ресторана</p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      <!-- 5. СЕКЦИЯ: PRICING -->
      <section id="pricing" class="py-16 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800">
        <pricing-table></pricing-table>
      </section>

      <!-- 6. СЕКЦИЯ: FAQ (Аккордеон через <details> + group-open:*) -->
      <section id="faq" class="py-16 px-6 max-w-4xl mx-auto border-t border-slate-100 dark:border-slate-800 space-y-6">
        <div class="text-center space-y-2 mb-8">
          <span class="caption-text text-emerald-600">Ответы на частые вопросы</span>
          <h2 class="heading-2">Часто задаваемые вопросы</h2>
        </div>

        <div class="space-y-4">
          <!-- Вопрос 1 с group и group-open:* -->
          <details class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 transition-all">
            <summary class="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-slate-900 dark:text-white select-none">
              <span>Как правильно заваривать коллекционный улун методом проливов?</span>
              <span class="transform group-open:rotate-180 transition-transform duration-200 text-slate-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 body-text text-sm">
              Используйте гайвань или чайник из исинской глины. На 120 мл воды возьмите 6-7 г сухого листа. Температура воды 92-95°C. Первый пролив — промывочный (сразу слить), последующие проливы длятся от 5 до 15 секунд с постепенным увеличением времени.
            </div>
          </details>

          <!-- Вопрос 2 с group и group-open:* -->
          <details class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 transition-all">
            <summary class="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-slate-900 dark:text-white select-none">
              <span>Как упакован чай для почтовой пересылки?</span>
              <span class="transform group-open:rotate-180 transition-transform duration-200 text-slate-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 body-text text-sm">
              Каждый сбор герметично запаян в многослойные фольгированные пакеты с клапаном дегазации или жестяные банки. В коробку вкладывается амортизирующий крафт-наполнитель для защиты хрупких почек и листьев.
            </div>
          </details>

          <!-- Вопрос 3 с group и group-open:* -->
          <details class="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 transition-all">
            <summary class="flex items-center justify-between cursor-pointer list-none font-bold text-sm sm:text-base text-slate-900 dark:text-white select-none">
              <span>Можно ли отменить подписку на чайный клуб в любой момент?</span>
              <span class="transform group-open:rotate-180 transition-transform duration-200 text-slate-400">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 body-text text-sm">
              Да, подписку можно поставить на паузу или полностью отменить в личном кабинете в один клик без скрытых комиссий и штрафов.
            </div>
          </details>
        </div>
      </section>

      <!-- 7. СЕКЦИЯ: FOOTER (4 колонки) -->
      <footer class="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Колонка 1: О компании -->
          <div class="space-y-3">
            <div class="flex items-center gap-2 text-white font-bold font-serif text-lg">
              <span class="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center text-xs">T</span>
              <span>ASIAN TEA HOUSE</span>
            </div>
            <p class="text-xs leading-relaxed text-slate-400">
              Дом аутентичной чайной традиции с 2011 года. Прямой импорт, профессиональные церемонии и школа титестеров.
            </p>
          </div>

          <!-- Колонка 2: Коллекция -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">Коллекция сортов</h4>
            <ul class="space-y-1.5 text-xs">
              <li><a href="#catalog" class="hover:text-white transition">Уишаньские улуны</a></li>
              <li><a href="#catalog" class="hover:text-white transition">Винтажные шу пуэры</a></li>
              <li><a href="#catalog" class="hover:text-white transition">Белый чай Фудин</a></li>
              <li><a href="#catalog" class="hover:text-white transition">Тайваньские высокогорные</a></li>
            </ul>
          </div>

          <!-- Колонка 3: Клуб и услуги -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">Клуб и церемонии</h4>
            <ul class="space-y-1.5 text-xs">
              <li><a href="#services" class="hover:text-white transition">Чайная церемония Гунфу Ча</a></li>
              <li><a href="#pricing" class="hover:text-white transition">Ежемесячная подписка</a></li>
              <li><a href="#table" class="hover:text-white transition">Таблица каталога сортов</a></li>
              <li><a href="#excel-table" class="hover:text-white transition">Загрузка данных Excel</a></li>
            </ul>
          </div>

          <!-- Колонка 4: Контакты -->
          <div class="space-y-2">
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">Контакты и адрес</h4>
            <p class="text-xs text-slate-400">
              г. Москва, Чайный переулок, дом 8<br/>
              Телефон: +7 (495) 800-24-35<br/>
              Ежедневно с 10:00 до 22:00
            </p>
            <div class="pt-2 text-[11px] text-slate-500">
              © 2026 Asian Tea House. Все права защищены.
            </div>
          </div>

        </div>
      </footer>

    </div>
  `
};
