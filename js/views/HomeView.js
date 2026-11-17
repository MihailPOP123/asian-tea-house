/**
 * HomeView.js — Главная страница с оригинальным стилем Asian Tea House
 * и встроенным компонентом загрузки только Excel-файлов (.xlsx, .xls)
 */
window.HomeView = {
  name: 'HomeView',
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

            <!-- Основной и вторичный CTA с четким визуальным весом -->
            <div class="d-flex flex-wrap align-items-center gap-3">
              <button 
                @click="$emit('navigate', 'table')" 
                class="btn text-white px-4 py-3 mr-3 mb-2 font-weight-bold shadow-sm" 
                style="background-color: var(--accent-brown); letter-spacing: 0.05em; border-radius: var(--radius-sm);"
              >
                ОТКРЫТЬ КАТАЛОГ ЧАЯ &rarr;
              </button>
              <button 
                @click="$emit('navigate', 'excel-table')" 
                class="btn btn-outline-dark px-4 py-3 mb-2 font-weight-bold" 
                style="letter-spacing: 0.05em; border-radius: var(--radius-sm);"
              >
                МОДУЛЬ EXCEL &rarr;
              </button>
            </div>
          </div>
          <div class="hero__media text-center">
            <img src="images/hero-image.png" alt="Матча в чаше" class="hero__img rounded shadow-sm">
          </div>
        </div>
      </section>

      <!-- 2. Секция быстрого доступа к ключевым модулям проекта -->
      <section class="py-5" style="background: #FAF7F2; border-top: 1px solid #E5E0D8; border-bottom: 1px solid #E5E0D8;">
        <div class="container">
          <div class="text-center mb-4">
            <div class="text-uppercase font-weight-bold text-muted small mb-2" style="letter-spacing: 0.12em;">
              Навигация и функционал проекта
            </div>
            <h2 class="font-weight-bold" style="font-family: var(--font-serif); color: var(--accent-dark);">
              Ключевые разделы системы
            </h2>
          </div>

          <div class="row">
            <!-- Карточка 1: Лаборатория Tailwind CSS 3.4+ -->
            <div class="col-md-4 mb-3">
              <div class="card h-100 border-0 shadow-sm rounded-lg p-4 bg-white d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="text-success font-weight-bold small tracking-wider text-uppercase">Tailwind v3.4+</span>
                    <span class="small text-muted font-weight-bold">14 заданий</span>
                  </div>
                  <h5 class="font-weight-bold text-dark mb-2">Лаборатория Tailwind</h5>
                  <p class="text-muted small mb-3" style="line-height: 1.5;">
                    Уровни 1-4: Профиль, навбар без JS, сетка товаров, hero с градиентом, pricing, сайдбар, регистрация, чат, канбан, лендинг, dark mode, дашборд 12 колонок, степпер с has-[:checked], e-commerce и Storybook дизайн-система.
                  </p>
                </div>
                <button 
                  type="button" 
                  class="btn btn-success btn-block font-weight-bold py-2 shadow-sm"
                  @click="$emit('navigate', 'tailwind')"
                >
                  Перейти в Лабораторию &rarr;
                </button>
              </div>
            </div>

            <!-- Карточка 2: Загрузка и таблица Excel -->
            <div class="col-md-4 mb-3">
              <div class="card h-100 border-0 shadow-sm rounded-lg p-4 bg-white d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="text-dark font-weight-bold small tracking-wider text-uppercase">Excel Модуль</span>
                    <span class="small text-muted font-weight-bold">XLSX / XLS</span>
                  </div>
                  <h5 class="font-weight-bold text-dark mb-2">Загрузка и таблица Excel</h5>
                  <p class="text-muted small mb-3" style="line-height: 1.5;">
                    Drag-n-drop и файловый диалог, проверка формата и модальное окно ошибки, парсинг данных, отдельная таблица каталога, хранилище файлов и экспорт в Excel.
                  </p>
                </div>
                <button 
                  type="button" 
                  class="btn text-white btn-block font-weight-bold py-2 shadow-sm"
                  style="background-color: var(--accent-brown);"
                  @click="$emit('navigate', 'excel-table')"
                >
                  Открыть модуль Excel &rarr;
                </button>
              </div>
            </div>

            <!-- Карточка 3: Личный кабинет и Профиль -->
            <div class="col-md-4 mb-3">
              <div class="card h-100 border-0 shadow-sm rounded-lg p-4 bg-white d-flex flex-column justify-content-between">
                <div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <span class="text-info font-weight-bold small tracking-wider text-uppercase">Личный кабинет</span>
                    <span class="small text-muted font-weight-bold">User / Admin</span>
                  </div>
                  <h5 class="font-weight-bold text-dark mb-2">Профиль пользователя</h5>
                  <p class="text-muted small mb-3" style="line-height: 1.5;">
                    Управление учетной записью, просмотр и редактирование личных данных, смена пароля, история заказов и переключение ролей для проверки прав доступа.
                  </p>
                </div>
                <button 
                  type="button" 
                  class="btn btn-outline-dark btn-block font-weight-bold py-2"
                  @click="$emit('navigate', 'profile')"
                >
                  Открыть свой профиль &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Интеграция рекламного блока (Задание 1: AdSlot) -->
      <section class="py-3" style="background-color: var(--bg-color);">
        <div class="container d-flex justify-content-center">
          <ad-slot 
            preset="banner" 
            label="Спонсорский блок чайного клуба" 
            sublabel="Премиальные чайные церемонии и аксессуары из фарфора (Leaderboard 728 × 90)"
          ></ad-slot>
        </div>
      </section>

      <!-- 3. История (Наша история) -->
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
              Все сорта в таблице ({{ teas.length }}) &rarr;
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
              <li class="mb-1"><a href="#table" class="text-light" @click.prevent="$emit('navigate', 'table')">Каталог чая (Таблица CRUD)</a></li>
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
