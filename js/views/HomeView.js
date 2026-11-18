/**
 * HomeView.js — Главная страница с оригинальным стилем Asian Tea House
 * и встроенным компонентом загрузки только Excel-файлов (.xlsx, .xls)
 */
window.HomeView = {
  name: 'HomeView',
  components: {
    'pricing-table': window.PricingTable,
    'multi-step-form': window.MultiStepForm,
    'profile-card': window.ProfileCard
  },
  props: {
    teas: {
      type: Array,
      default: () => []
    }
  },
  emits: ['navigate', 'toast'],
  computed: {
    featuredTeas() {
      return this.teas.slice(0, 4);
    }
  },
  methods: {
    handleSubscribe() {
      this.$emit('toast', {
        type: 'success',
        title: 'Подписка оформлена',
        message: 'Благодарим за интерес! Дайджест чайной культуры будет приходить на вашу почту.'
      });
    }
  },
  template: `
    <div class="home-view">
      <!-- 1. Hero Section (Очищенная иерархия по Закону Фиттса и Хика) -->
      <section class="hero py-5" style="background-color: var(--bg-color);">
        <div class="container hero__container">
          <div class="hero__content">
            <div class="text-uppercase font-weight-bold text-muted small mb-3" style="letter-spacing: 0.15em; font-size: 0.8rem;">
              Традиции Востока &middot; Премиум сбор
            </div>
            <h1 class="hero__title mb-3">
              Откройте для себя искусство настоящего азиатского чая
            </h1>
            <p class="lead mb-4" style="font-size: 1.15rem; line-height: 1.65; color: var(--text-muted);">
              Поставляется напрямую с высокогорных чайных плантаций Японии, Тайваня и Китая.
              Насладитесь балансом чистоты, свежести и древней чайной философии.
            </p>

            <!-- Основной и вторичные CTA с четким визуальным весом -->
            <div class="d-flex flex-wrap align-items-center gap-2">
              <button 
                @click="$emit('navigate', 'table')" 
                class="btn text-white px-4 py-3 mr-2 mb-2 font-weight-bold shadow-sm" 
                style="background-color: var(--accent-brown); letter-spacing: 0.05em; border-radius: var(--radius-sm);"
              >
                ОТКРЫТЬ КАТАЛОГ &rarr;
              </button>
              <button 
                @click="$emit('navigate', 'ceremony')" 
                class="btn btn-outline-dark px-4 py-3 mr-2 mb-2 font-weight-bold" 
                style="letter-spacing: 0.05em; border-radius: var(--radius-sm);"
              >
                ПОДБОР ЦЕРЕМОНИИ &rarr;
              </button>
              <button 
                @click="$emit('navigate', 'chat')" 
                class="btn btn-dark text-white px-4 py-3 mr-2 mb-2 font-weight-bold shadow-sm" 
                style="background-color: var(--accent-dark); letter-spacing: 0.05em; border-radius: var(--radius-sm);"
              >
                ЧАТ С СОМЕЛЬЕ &rarr;
              </button>
              <button 
                @click="$emit('navigate', 'analytics')" 
                class="btn btn-outline-secondary px-3 py-3 mb-2 font-weight-bold" 
                style="letter-spacing: 0.05em; border-radius: var(--radius-sm);"
              >
                АНАЛИТИКА &rarr;
              </button>
            </div>
          </div>
          <div class="hero__media text-center">
            <img src="images/hero-image.png" alt="Матча в чаше" class="hero__img rounded shadow-sm">
          </div>
        </div>
      </section>

      <!-- 2. История (Наша история) -->
      <section class="history py-5" id="history">
        <div class="container history__container">
          <div class="history__media">
            <img src="images/about-image.png" alt="Чайная плантация в горах" class="history__img rounded shadow-sm">
          </div>
          <div class="history__content">
            <h2 class="section-title section-title--left mb-4">Наша история</h2>
            <p class="history__text mb-3">
              На протяжении многих поколений чай в Восточной Азии был чем-то большим, чем просто напитком: это путь к состоянию «здесь и сейчас», к единению и осознанному спокойствию.
            </p>
            <p class="text-muted" style="line-height: 1.7;">
              Каждый лист в нашем доме отбирается вручную опытными мастерами. Мы бережно храним традиции сухого томления, щадящей парки и каменного помола, чтобы донести первозданный вкус до вашей пиалы.
            </p>
          </div>
        </div>
      </section>

      <!-- 4. Динамическая коллекция чая -->
      <section class="products py-5" id="products" style="background-color: #FFFFFF;">
        <div class="container">
          <div class="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 class="section-title mb-1 text-left">Наша коллекция</h2>
              <p class="text-muted mb-0">Свежий урожай и церемониальные сорта этого сезона</p>
            </div>
            <button @click="$emit('navigate', 'table')" class="btn btn-outline-dark btn-sm px-3">
              Все сорта в каталоге ({{ teas.length }}) &rarr;
            </button>
          </div>

          <div class="products__grid">
            <article 
              v-for="tea in featuredTeas" 
              :key="tea.id" 
              class="card product-card-clean border-0 shadow-sm rounded-lg overflow-hidden h-100"
              @click="$emit('navigate', 'table')"
              title="Нажмите, чтобы открыть каталог сортов"
            >
              <div style="height: 220px; overflow: hidden; background: #fdfbf7; display: flex; align-items: center; justify-content: center;">
                <img :src="tea.image" :alt="tea.title" class="card__img" style="height: 100%; object-fit: contain;">
              </div>
              <div class="card-body p-3 d-flex flex-column justify-content-between">
                <div>
                  <div class="card__header mb-2">
                    <h3 class="card__title mb-0" style="font-size: 1.05rem;">{{ tea.title }}</h3>
                    <span class="card__price font-weight-bold">\${{ tea.price.toFixed(2) }}</span>
                  </div>
                  <div class="small text-muted font-weight-medium mb-2">
                    {{ tea.category }}
                  </div>
                  <p class="card__desc small text-muted mb-3" style="min-height: 55px;">
                    {{ tea.desc }}
                  </p>
                </div>
                <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                  <span class="small text-muted">Остаток: <b>{{ tea.stock }} шт.</b></span>
                  <span class="small text-dark font-weight-bold">Рейтинг: {{ tea.rating }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- 4.1. Чайный клуб по подписке (Интеграция тарифов Tailwind Pricing) -->
      <section class="py-5" id="club" style="background-color: var(--bg-color); border-top: 1px solid #E5E0D8; border-bottom: 1px solid #E5E0D8;">
        <div class="container">
          <pricing-table></pricing-table>
        </div>
      </section>

      <!-- 4.2. Индивидуальный подбор чайной церемонии (Интеграция Tailwind MultiStepForm) -->
      <section class="py-5" id="ceremony" style="background-color: #FAF7F2; border-bottom: 1px solid #E5E0D8;">
        <div class="container">
          <div class="text-center max-w-2xl mx-auto mb-4">
            <span class="text-uppercase font-weight-bold text-muted small" style="letter-spacing: 0.12em; font-size: 0.75rem;">Индивидуальный заказ</span>
            <h2 class="section-title mb-2">Подбор и заказ чайной церемонии</h2>
            <p class="text-muted small">Интерактивный мастер: контакты, доставка, выбор ритуала и подтверждение</p>
          </div>
          <div class="d-flex justify-content-center">
            <div class="w-100" style="max-width: 820px;">
              <multi-step-form></multi-step-form>
            </div>
          </div>
        </div>
      </section>

      <!-- 4.3. Наши чайные мастера (Интеграция Tailwind ProfileCard) -->
      <section class="py-5" id="masters" style="background-color: var(--bg-color); border-bottom: 1px solid #E5E0D8;">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-4 mb-lg-0">
              <span class="text-uppercase font-weight-bold text-muted small" style="letter-spacing: 0.12em; font-size: 0.75rem;">Хранители традиций</span>
              <h2 class="section-title text-left mb-3">Мастера чайного дома</h2>
              <p class="text-muted mb-3" style="line-height: 1.7;">
                В Asian Tea House каждую партию чая лично оценивают дипломированные титестеры. Наш ведущий мастер Чэнь Юнь ежегодно проводит месяцы в чайных садах Уишань и Юньнань, отбирая сырьё с древних чайных деревьев.
              </p>
              <p class="text-muted mb-4" style="line-height: 1.7;">
                Вы можете задать любой вопрос о проливах, гайванях и выдержке пуэров прямо в онлайн-чате с сомелье.
              </p>
              <div class="d-flex flex-wrap gap-2">
                <button @click="$emit('navigate', 'chat')" class="btn btn-dark font-weight-bold px-4 py-2.5 mr-2 mb-2" style="border-radius: var(--radius-sm); background-color: var(--accent-dark);">
                  Написать мастеру в чат &rarr;
                </button>
                <button @click="$emit('navigate', 'analytics')" class="btn btn-outline-dark font-weight-bold px-4 py-2.5 mb-2" style="border-radius: var(--radius-sm);">
                  Поставки и аналитика
                </button>
              </div>
            </div>
            <div class="col-lg-6 d-flex justify-content-center">
              <profile-card></profile-card>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Преимущества -->
      <section class="advantages py-5" id="advantages" style="background-color: var(--bg-color);">
        <div class="container">
          <h2 class="section-title mb-5">Почему выбирают нас</h2>

          <div class="advantages__grid">
            <div class="advantage-card">
              <img src="images/icon-container.png" alt="Листья ручного сбора" class="advantage-card__icon-img">
              <h3 class="advantage-card__title">Листья ручного сбора</h3>
              <p class="advantage-card__desc">Поставляется исключительно с семейных ферм в Японии и Тайване; собирается бережно вручную на пике сезона.</p>
            </div>

            <div class="advantage-card">
              <img src="images/icon-container(1).png" alt="Традиционные методы" class="advantage-card__icon-img">
              <h3 class="advantage-card__title">Традиционные методы</h3>
              <p class="advantage-card__desc">Сохранение вековых технологий обжарки, пропаривания и скручивания, позволяющих раскрыть истинный характер чайного листа.</p>
            </div>

            <div class="advantage-card">
              <img src="images/icon-container(2).png" alt="Экологически чистые источники" class="advantage-card__icon-img">
              <h3 class="advantage-card__title">Экологически чистые источники</h3>
              <p class="advantage-card__desc">Прямые торговые отношения, обеспечивающие экологически чистое органическое земледелие и справедливые условия труда.</p>
            </div>

            <div class="advantage-card">
              <img src="images/icon-container(3).png" alt="Премиальное качество" class="advantage-card__icon-img">
              <h3 class="advantage-card__title">Премиальное качество</h3>
              <p class="advantage-card__desc">Каждая партия проходит строгую проверку на чистоту и оценивается мастерами перед вакуумной упаковкой.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Отзыв -->
      <section class="testimonial py-5">
        <div class="container container--narrow text-center">
          <blockquote class="testimonial__quote">
            «Церемониальный матча из Удзи полностью преобразил мой утренний ритуал. Его цвет не похож ни на что, что мне доводилось видеть за пределами Киото, а вкус — невероятно мягкий, сладковатый и дарящий ощущение уюта».
          </blockquote>
          <div class="testimonial__author">Ханако Сато</div>
          <div class="testimonial__role">ГИЛЬДИЯ КУЛЬТУРНОГО НАСЛЕДИЯ КИОТО</div>
        </div>
      </section>

      <!-- 6.1. Часто задаваемые вопросы (Интеграция Tailwind FAQ Accordion) -->
      <section class="py-5" id="faq" style="background-color: var(--bg-color); border-top: 1px solid #E5E0D8;">
        <div class="container container--narrow">
          <div class="text-center mb-4">
            <span class="text-uppercase font-weight-bold text-muted small" style="letter-spacing: 0.12em; font-size: 0.75rem;">Вопросы и ответы</span>
            <h2 class="section-title mb-2">Часто задаваемые вопросы</h2>
            <p class="text-muted small">Всё, что нужно знать о проливах, культуре чая и хранении сортов</p>
          </div>
          <div class="space-y-3" style="display: flex; flex-direction: column; gap: 12px;">
            <details class="bg-white rounded-lg border p-3.5 shadow-sm" style="border-color: #E5E0D8;">
              <summary class="font-weight-bold text-dark cursor-pointer d-flex justify-content-between align-items-center" style="cursor: pointer;">
                <span>Как правильно заваривать коллекционный улун методом проливов?</span>
                <span class="text-muted small">&darr;</span>
              </summary>
              <div class="mt-2 text-muted small pt-2 border-top">
                Используйте гайвань или чайник из исинской глины. На 120 мл воды возьмите 6-7 г сухого листа. Температура воды 92-95°C. Первый пролив — промывочный (сразу слить), последующие проливы длятся от 5 до 15 секунд с постепенным увеличением времени.
              </div>
            </details>
            <details class="bg-white rounded-lg border p-3.5 shadow-sm" style="border-color: #E5E0D8;">
              <summary class="font-weight-bold text-dark cursor-pointer d-flex justify-content-between align-items-center" style="cursor: pointer;">
                <span>В чём разница между Шу Пуэром и Шэн Пуэром?</span>
                <span class="text-muted small">&darr;</span>
              </summary>
              <div class="mt-2 text-muted small pt-2 border-top">
                Шэн Пуэр — традиционный светлый пуэр естественной ферментации, с годами приобретающий сухофруктовые ноты. Шу Пуэр проходит ускоренную ферментацию (Во Дуй), имеет тёмный настой, древесно-ореховый профиль и бархатистый вкус.
              </div>
            </details>
            <details class="bg-white rounded-lg border p-3.5 shadow-sm" style="border-color: #E5E0D8;">
              <summary class="font-weight-bold text-dark cursor-pointer d-flex justify-content-between align-items-center" style="cursor: pointer;">
                <span>Как работает доставка и вакуумная упаковка чая?</span>
                <span class="text-muted small">&darr;</span>
              </summary>
              <div class="mt-2 text-muted small pt-2 border-top">
                Каждая партия герметично фасуется в многослойные фольгированные пакеты с zip-замком или в фирменные жестяные тубы, защищающие лист от ультрафиолета и посторонних запахов. Доставка осуществляется курьером или экспресс-почтой.
              </div>
            </details>
          </div>
        </div>
      </section>

      <!-- 7. Подписка (С реактивным тостом вместо alert) -->
      <section class="subscribe py-5" id="subscribe" style="background-color: #FAF7F2; border-top: 1px solid #E5E0D8;">
        <div class="container container--subscribe text-center">
          <h2 class="subscribe__title mb-3">Присоединяйтесь к нашему чайному путешествию</h2>
          <p class="subscribe__desc mb-4 text-muted">
            Получайте умиротворяющие размышления о чайной культуре, ранний доступ к эксклюзивным сортам и приглашения на чайные церемонии.
          </p>
          <form class="subscribe__form d-flex justify-content-center" @submit.prevent="handleSubscribe">
            <input type="email" class="subscribe__input" placeholder="Введите свой адрес электронной почты" required>
            <button type="submit" class="subscribe__btn">ПОДПИСАТЬСЯ</button>
          </form>
        </div>
      </section>

      <!-- 8. Подвал с высокой контрастностью (WCAG AAA) -->
      <footer class="footer bg-dark text-white pt-5 pb-3" id="contacts">
        <div class="container footer__container">
          <div class="footer__col">
            <a href="#" class="logo footer__logo text-white mb-2 d-block">ASIAN TEA HOUSE</a>
            <p class="footer__text text-light" style="opacity: 0.85;">
              Перенося древние чайные традиции в современность. Чай с конкретных плантаций, прямые поставки, безмятежность в духе ваби-саби.
            </p>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading text-warning">КОНТАКТЫ</h4>
            <address class="footer__address text-light" style="opacity: 0.85;">
              120 Wabi-Sabi Lane, Kyoto Hills<br>
              +81 (75) 432-1098<br>
              <a href="mailto:serenity@asianteahouse.com" class="text-white font-weight-bold">serenity@asianteahouse.com</a>
            </address>
          </div>

          <div class="footer__col">
            <h4 class="footer__heading text-warning">СТРАНИЦЫ СИСТЕМЫ</h4>
            <ul class="list-unstyled small">
              <li class="mb-1"><a href="#home" class="text-light" @click.prevent="$emit('navigate', 'home')">Главная страница</a></li>
              <li class="mb-1"><a href="#table" class="text-light" @click.prevent="$emit('navigate', 'table')">Каталог сортов чая</a></li>
              <li class="mb-1"><a href="#ceremony" class="text-light" @click.prevent="$emit('navigate', 'ceremony')">Подбор чайной церемонии</a></li>
              <li class="mb-1"><a href="#chat" class="text-light" @click.prevent="$emit('navigate', 'chat')">Чат с сомелье и мастером</a></li>
              <li class="mb-1"><a href="#analytics" class="text-light" @click.prevent="$emit('navigate', 'analytics')">Аналитика и графики выручки</a></li>
              <li class="mb-1"><a href="#excel-table" class="text-light" @click.prevent="$emit('navigate', 'excel-table')">Модуль Excel (Загрузка)</a></li>
              <li class="mb-1"><a href="#tailwind" class="text-light" @click.prevent="$emit('navigate', 'tailwind')">Лаборатория Tailwind (Уровни 1-4)</a></li>
              <li class="mb-1"><a href="#logs" class="text-light" @click.prevent="$emit('navigate', 'logs')">Журнал изменений (Log)</a></li>
              <li class="mb-1"><a href="#files" class="text-light" @click.prevent="$emit('navigate', 'files')">Файлы хранилища</a></li>
              <li class="mb-1"><a href="#admin" class="text-light" @click.prevent="$emit('navigate', 'admin')">Voyager Админ-панель</a></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom border-top border-secondary mt-4 pt-3">
          <div class="container footer__bottom-container d-flex justify-content-between align-items-center text-light small" style="opacity: 0.85;">
            <p class="mb-0">© 2026 Asian Tea House. Все права защищены.</p>
            <p class="mb-0">Kyoto · Taipei · San Francisco · УП Веб</p>
          </div>
        </div>
      </footer>
    </div>
  `
};
