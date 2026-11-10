/**
 * storage.js — Сервисы хранилища данных, асинхронного API, авторизации и журнала аудита
 */

const STORAGE_KEYS = {
  TEAS: 'asian_tea_products_v1',
  USERS: 'asian_tea_users_v1',
  CURRENT_USER: 'asian_tea_current_user_v1',
  LOGS: 'asian_tea_logs_v1',
  FILES: 'asian_tea_files_v1',
  EXCEL_TABLE: 'asian_tea_excel_table_v1'
};

// Начальные данные для чая (12 сортов для демонстрации пагинации > 10 строк)
const DEFAULT_TEAS = [
  {
    id: 1,
    title: 'Церемониальная матча из Удзи',
    price: 48.00,
    category: 'Зеленый чай',
    image: 'images/product-image.png',
    desc: 'Зеленый чай церемониального качества, перетертый на каменных жерновах, с исторических холмов Удзи (Киото). Обладает ярким изумрудным цветом и глубоким вкусом с оттенками сладости и умами.',
    stock: 15,
    origin: 'Киото, Япония',
    rating: 4.9,
    createdAt: '2026-10-01T10:00:00.000Z'
  },
  {
    id: 2,
    title: 'Сенча Туманные горы',
    price: 32.00,
    category: 'Зеленый чай',
    image: 'images/product-image(1).png',
    desc: 'Листья весеннего сбора, прошедшие легкую обработку паром. Напиток отличается освежающим травянистым ароматом, ярко-желто-зеленым цветом настоя и чистым, свежим послевкусием.',
    stock: 24,
    origin: 'Сидзуока, Япония',
    rating: 4.8,
    createdAt: '2026-10-02T11:30:00.000Z'
  },
  {
    id: 3,
    title: 'Обжаренная ходзича',
    price: 28.00,
    category: 'Жареный чай',
    image: 'images/product-image(2).png',
    desc: 'Зеленый чай медленной обжарки с уютным ароматом поджаренных нот. Отличается естественным низким содержанием кофеина и теплыми оттенками лесного ореха и карамели.',
    stock: 18,
    origin: 'Кагосима, Япония',
    rating: 4.7,
    createdAt: '2026-10-03T14:15:00.000Z'
  },
  {
    id: 4,
    title: 'Весенние жемчужины с жасмином',
    price: 38.00,
    category: 'Белый чай',
    image: 'images/product-image(3).png',
    desc: 'Скрученные вручную «серебряные иглы», ароматизированные свежими цветками ночного жасмина. Обладают тонким сладковатым вкусом и пленительным цветочным ароматом.',
    stock: 12,
    origin: 'Фуцзянь, Китай',
    rating: 5.0,
    createdAt: '2026-10-04T09:20:00.000Z'
  },
  {
    id: 5,
    title: 'Да Хун Пао (Большой красный халат)',
    price: 65.00,
    category: 'Улун',
    image: 'images/hero-image.png',
    desc: 'Легендарный утесный улун сильной прожарки с гор Уишань с глубоким минеральным вкусом и нотами карамели и темного шоколада.',
    stock: 8,
    origin: 'Уишань, Китай',
    rating: 4.9,
    createdAt: '2026-10-05T16:45:00.000Z'
  },
  {
    id: 6,
    title: 'Те Гуань Инь (Железная Бодхисаттва)',
    price: 42.00,
    category: 'Улун',
    image: 'images/product-image(1).png',
    desc: 'Слабоферментированный светлый улун из Аньси со свежим цветочным ароматом орхидеи и весенней сирени.',
    stock: 20,
    origin: 'Аньси, Китай',
    rating: 4.8,
    createdAt: '2026-10-06T12:10:00.000Z'
  },
  {
    id: 7,
    title: 'Шу Пуэр Старые деревья 2018',
    price: 55.00,
    category: 'Пуэр',
    image: 'images/product-image(2).png',
    desc: 'Выдержанный блин шу пуэра из сырья вековых деревьев Мэнхая. Густой древесно-ореховый настой с нотами чернослива.',
    stock: 14,
    origin: 'Юньнань, Китай',
    rating: 4.9,
    createdAt: '2026-10-07T08:00:00.000Z'
  },
  {
    id: 8,
    title: 'Шэн Пуэр Весна 2021',
    price: 49.00,
    category: 'Пуэр',
    image: 'images/product-image(3).png',
    desc: 'Молодой шэн пуэр со свежими сухофруктовыми оттенками, яркой бодрящей терпкостью и долгим сладким послевкусием.',
    stock: 10,
    origin: 'Линьцан, Китай',
    rating: 4.6,
    createdAt: '2026-10-08T13:40:00.000Z'
  },
  {
    id: 9,
    title: 'Гёкуро Жемчужная роса',
    price: 72.00,
    category: 'Зеленый чай',
    image: 'images/product-image.png',
    desc: 'Элитный затененный японский чай высшего сорта с мощным умами и сладковатым благородным вкусом.',
    stock: 7,
    origin: 'Удзи, Япония',
    rating: 5.0,
    createdAt: '2026-10-09T17:25:00.000Z'
  },
  {
    id: 10,
    title: 'Бай Хао Инь Чжэнь (Серебряные иглы)',
    price: 58.00,
    category: 'Белый чай',
    image: 'images/product-image(3).png',
    desc: 'Один из самых знаменитых белых чаев Китая, состоящий исключительно из нежнейших пушистых почек.',
    stock: 11,
    origin: 'Фудин, Китай',
    rating: 4.9,
    createdAt: '2026-10-10T11:05:00.000Z'
  },
  {
    id: 11,
    title: 'Дун Дин Улун (Морозный пик)',
    price: 45.00,
    category: 'Улун',
    image: 'images/product-image(1).png',
    desc: 'Тайваньский высокогорный улун средней прожарки с нотами печеных фруктов, меда и цветов.',
    stock: 16,
    origin: 'Наньтоу, Тайвань',
    rating: 4.8,
    createdAt: '2026-10-11T15:50:00.000Z'
  },
  {
    id: 12,
    title: 'Генмайча с матчей',
    price: 26.00,
    category: 'Зеленый чай',
    image: 'images/product-image(2).png',
    desc: 'Традиционный купаж сенчи с обжаренным воздушным коричневым рисом и церемониальной матчей.',
    stock: 30,
    origin: 'Киото, Япония',
    rating: 4.7,
    createdAt: '2026-10-12T09:15:00.000Z'
  }
];

// Пользователи по умолчанию ("из коробки")
const DEFAULT_USERS = [
  {
    id: 1,
    name: 'Мастер Чэнь (Администратор)',
    email: 'admin@tea.com',
    password: 'admin',
    role: 'admin',
    createdAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 2,
    name: 'Анна Смирнова (Менеджер)',
    email: 'user@tea.com',
    password: 'user',
    role: 'manager',
    createdAt: '2026-09-15T00:00:00.000Z'
  }
];

window.DEFAULT_USERS = DEFAULT_USERS;
window.STORAGE_KEYS = STORAGE_KEYS;

// Начальные записи в журнале аудита (Задание 2)
const DEFAULT_LOGS = [
  {
    id: 101,
    timestamp: '2026-10-13T10:15:00.000Z',
    user: 'admin@tea.com',
    userName: 'Мастер Чэнь',
    action: 'CREATE',
    actionName: 'Создание записи',
    entity: 'Чай',
    entityId: 1,
    entityTitle: 'Церемониальная матча из Удзи',
    oldState: null,
    newState: {
      id: 1,
      title: 'Церемониальная матча из Удзи',
      price: 48.00,
      category: 'Зеленый чай',
      stock: 15
    },
    details: 'Создан новый товар из церемониальной коллекции'
  },
  {
    id: 102,
    timestamp: '2026-10-13T14:30:00.000Z',
    user: 'user@tea.com',
    userName: 'Анна Смирнова',
    action: 'UPDATE',
    actionName: 'Обновление данных',
    entity: 'Чай',
    entityId: 2,
    entityTitle: 'Сенча Туманные горы',
    oldState: {
      id: 2,
      title: 'Сенча Туманные горы',
      price: 30.00,
      stock: 10,
      category: 'Зеленый чай'
    },
    newState: {
      id: 2,
      title: 'Сенча Туманные горы',
      price: 32.00,
      stock: 24,
      category: 'Зеленый чай'
    },
    details: 'Корректировка цены (+2$) и пополнение складских остатков'
  }
];

// Начальные данные для отдельной таблицы Excel (импортированные коллекции)
const DEFAULT_EXCEL_ROWS = [
  {
    id: 501,
    title: 'Жасминовый Дракон (Премиум)',
    price: 45.00,
    category: 'Белый чай',
    desc: 'Скрученные вручную типсы высшего качества с натуральным ароматом цветков жасмина',
    stock: 25,
    origin: 'Фуцзянь, Китай',
    rating: 4.9,
    image: 'images/product-image(3).png',
    sourceFile: 'sample_tea_import.xlsx',
    importDate: '2026-10-18T10:30:00.000Z'
  },
  {
    id: 502,
    title: 'Алишань Улун Высокогорный',
    price: 52.00,
    category: 'Улун',
    desc: 'Свежий тайваньский улун с молочно-цветочными нотами и сладким послевкусием',
    stock: 14,
    origin: 'Тайвань',
    rating: 5.0,
    image: 'images/product-image(1).png',
    sourceFile: 'sample_tea_import.xlsx',
    importDate: '2026-10-18T10:30:00.000Z'
  },
  {
    id: 503,
    title: 'Императорский Кокурича',
    price: 36.00,
    category: 'Зеленый чай',
    desc: 'Японский купаж с насыщенным травянистым вкусом и витаминами',
    stock: 30,
    origin: 'Киото, Япония',
    rating: 4.8,
    image: 'images/product-image.png',
    sourceFile: 'sample_tea_import.xlsx',
    importDate: '2026-10-18T10:30:00.000Z'
  },
  {
    id: 504,
    title: 'Золотые брови Цзинь Цзюнь Мэй',
    price: 58.00,
    category: 'Красный чай',
    desc: 'Редкий высокогорный сорт с бархатистым медово-цветочным ароматом',
    stock: 18,
    origin: 'Уишань, Китай',
    rating: 4.9,
    image: 'images/product-image(2).png',
    sourceFile: 'Каталог_поставки_октябрь.xlsx',
    importDate: '2026-10-19T14:15:00.000Z'
  },
  {
    id: 505,
    title: 'Байхао Иньчжэнь (Серебряные иглы)',
    price: 64.00,
    category: 'Белый чай',
    desc: 'Нежнейшие нераспустившиеся весенние почки с пушистым серебристым ворсом',
    stock: 11,
    origin: 'Фудин, Китай',
    rating: 5.0,
    image: 'images/product-image(3).png',
    sourceFile: 'Каталог_поставки_октябрь.xlsx',
    importDate: '2026-10-19T14:15:00.000Z'
  }
];

window.DEFAULT_EXCEL_ROWS = DEFAULT_EXCEL_ROWS;

// Инициализация хранилища при первом запуске
function initLocalStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.TEAS)) {
    localStorage.setItem(STORAGE_KEYS.TEAS, JSON.stringify(DEFAULT_TEAS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(DEFAULT_LOGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FILES)) {
    localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.EXCEL_TABLE)) {
    localStorage.setItem(STORAGE_KEYS.EXCEL_TABLE, JSON.stringify(DEFAULT_EXCEL_ROWS));
  }
  // По умолчанию залогинен админ для удобства проверки
  if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
  }
}

initLocalStorage();

// Асинхронный хелпер задержки сети для реалистичности
const delay = (ms = 250) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Сервис аутентификации ("из коробки")
 */
window.AuthService = {
  async getCurrentUser() {
    await delay(50);
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw && DEFAULT_USERS.length > 0) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
      return DEFAULT_USERS[0];
    }
    return raw ? JSON.parse(raw) : null;
  },

  async login(email, password) {
    await delay(200);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password);
    if (!user) {
      throw new Error('Неверный адрес электронной почты или пароль!');
    }
    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    
    // Логируем вход
    await window.LogService.addLog({
      user: safeUser.email,
      userName: safeUser.name,
      action: 'LOGIN',
      actionName: 'Вход в систему',
      entity: 'Пользователь',
      entityId: safeUser.id,
      entityTitle: safeUser.name,
      details: `Успешная авторизация в роли "${safeUser.role}"`
    });

    return safeUser;
  },

  async register({ name, email, password, role = 'user' }) {
    await delay(250);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    if (users.some(u => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error('Пользователь с таким email уже существует!');
    }
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role || 'user',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));

    await window.LogService.addLog({
      user: safeUser.email,
      userName: safeUser.name,
      action: 'REGISTER',
      actionName: 'Регистрация',
      entity: 'Пользователь',
      entityId: safeUser.id,
      entityTitle: safeUser.name,
      details: 'Регистрация новой учетной записи'
    });

    return safeUser;
  },

  async recoverPassword(email, newPassword) {
    await delay(300);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (userIndex === -1) {
      throw new Error('Пользователь с указанным email не найден в системе!');
    }
    users[userIndex].password = newPassword;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    await window.LogService.addLog({
      user: users[userIndex].email,
      userName: users[userIndex].name,
      action: 'PASSWORD_RESET',
      actionName: 'Сброс пароля',
      entity: 'Пользователь',
      entityId: users[userIndex].id,
      entityTitle: users[userIndex].name,
      details: 'Пароль успешно изменен через форму восстановления'
    });

    return true;
  },

  async logout() {
    await delay(100);
    const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
    if (current) {
      await window.LogService.addLog({
        user: current.email,
        userName: current.name,
        action: 'LOGOUT',
        actionName: 'Выход из системы',
        entity: 'Пользователь',
        entityId: current.id,
        entityTitle: current.name,
        details: 'Завершение сеанса'
      });
    }
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    return true;
  },

  async updateRole(userId, newRole) {
    await delay(200);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find(u => u.id === userId);
    if (!user) throw new Error('Пользователь не найден');
    const oldRole = user.role;
    user.role = newRole;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Обновляем текущего, если это он
    const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
    if (current && current.id === userId) {
      current.role = newRole;
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(current));
    }

    await window.LogService.addLog({
      action: 'UPDATE_ROLE',
      actionName: 'Смена роли',
      entity: 'Пользователь',
      entityId: user.id,
      entityTitle: user.name,
      oldState: { role: oldRole },
      newState: { role: newRole },
      details: `Роль пользователя изменена с "${oldRole}" на "${newRole}"`
    });

    return user;
  },

  async getUsers() {
    await delay(150);
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  }
};

/**
 * Сервис аудита и истории изменений (Задание 2)
 */
window.LogService = {
  async getLogs() {
    await delay(100);
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  async addLog({ user, userName, action, actionName, entity, entityId, entityTitle, oldState = null, newState = null, details = '' }) {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
    const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');

    const newLog = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      user: user || (currentUser ? currentUser.email : 'гость'),
      userName: userName || (currentUser ? currentUser.name : 'Гость'),
      action: action || 'ACTION',
      actionName: actionName || action || 'Действие',
      entity: entity || 'Объект',
      entityId: entityId || null,
      entityTitle: entityTitle || '',
      oldState: oldState ? JSON.parse(JSON.stringify(oldState)) : null,
      newState: newState ? JSON.parse(JSON.stringify(newState)) : null,
      details: details || ''
    };

    logs.unshift(newLog);
    // Ограничиваем историю 100 записями
    if (logs.length > 100) logs.pop();
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
    return newLog;
  },

  async clearLogs() {
    await delay(150);
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify([]));
    return true;
  }
};

/**
 * Сервис управления локальными файлами (Excel хранилище)
 */
window.FileStorageService = {
  async getFiles() {
    await delay(100);
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FILES) || '[]');
  },

  async saveFile({ name, size, type, rowCount, base64Data }) {
    await delay(150);
    const files = JSON.parse(localStorage.getItem(STORAGE_KEYS.FILES) || '[]');
    const newFile = {
      id: Date.now(),
      name,
      size,
      sizeFormatted: (size / 1024).toFixed(1) + ' КБ',
      type: type || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      uploadDate: new Date().toISOString(),
      rowCount: rowCount || 0,
      base64Data: base64Data || ''
    };
    files.unshift(newFile);
    localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(files));
    return newFile;
  },

  async deleteFile(fileId) {
    await delay(150);
    const files = JSON.parse(localStorage.getItem(STORAGE_KEYS.FILES) || '[]');
    const deletedFile = files.find(f => f.id === fileId);
    const filtered = files.filter(f => f.id !== fileId);
    localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(filtered));

    if (deletedFile) {
      await window.LogService.addLog({
        action: 'DELETE_FILE',
        actionName: 'Удаление файла',
        entity: 'Файл',
        entityId: deletedFile.id,
        entityTitle: deletedFile.name,
        details: `Файл ${deletedFile.name} удален из локального хранилища`
      });
    }
    return true;
  }
};

/**
 * Асинхронный сервис работы с сортами чая (CRUD API)
 */
window.TeaApiService = {
  async getAll() {
    await delay(200);
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAS) || '[]');
  },

  async getById(id) {
    await delay(100);
    const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAS) || '[]');
    return items.find(item => item.id === Number(id)) || null;
  },

  async create(data) {
    await delay(300);
    const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAS) || '[]');
    
    // Формируем новый объект
    const newItem = {
      id: Date.now(),
      title: data.title.trim(),
      price: parseFloat(data.price) || 0,
      category: data.category || 'Зеленый чай',
      image: data.image || 'images/product-image.png',
      desc: data.desc || '',
      stock: parseInt(data.stock, 10) || 0,
      origin: data.origin || 'Азия',
      rating: parseFloat(data.rating) || 5.0,
      createdAt: new Date().toISOString()
    };

    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.TEAS, JSON.stringify(items));

    // Логируем действие (Задание 2)
    await window.LogService.addLog({
      action: 'CREATE',
      actionName: 'Добавление товара',
      entity: 'Чай',
      entityId: newItem.id,
      entityTitle: newItem.title,
      oldState: null,
      newState: newItem,
      details: `Добавлен новый сорт чая «${newItem.title}» (${newItem.price}$)`
    });

    return newItem;
  },

  async update(id, data) {
    await delay(300);
    const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAS) || '[]');
    const index = items.findIndex(item => item.id === Number(id));
    if (index === -1) {
      throw new Error(`Товар с ID ${id} не найден`);
    }

    const oldState = { ...items[index] };
    const updatedItem = {
      ...oldState,
      title: data.title !== undefined ? data.title.trim() : oldState.title,
      price: data.price !== undefined ? parseFloat(data.price) : oldState.price,
      category: data.category !== undefined ? data.category : oldState.category,
      image: data.image !== undefined ? data.image : oldState.image,
      desc: data.desc !== undefined ? data.desc : oldState.desc,
      stock: data.stock !== undefined ? parseInt(data.stock, 10) : oldState.stock,
      origin: data.origin !== undefined ? data.origin : oldState.origin,
      rating: data.rating !== undefined ? parseFloat(data.rating) : oldState.rating,
      updatedAt: new Date().toISOString()
    };

    items[index] = updatedItem;
    localStorage.setItem(STORAGE_KEYS.TEAS, JSON.stringify(items));

    // Логируем изменение со снимком старого и нового состояния для vue-json-compare
    await window.LogService.addLog({
      action: 'UPDATE',
      actionName: 'Обновление товара',
      entity: 'Чай',
      entityId: updatedItem.id,
      entityTitle: updatedItem.title,
      oldState,
      newState: updatedItem,
      details: `Отредактирован сорт чая «${updatedItem.title}»`
    });

    return updatedItem;
  },

  async delete(id) {
    await delay(250);
    const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAS) || '[]');
    const targetItem = items.find(item => item.id === Number(id));
    if (!targetItem) {
      throw new Error(`Товар с ID ${id} не найден`);
    }

    const filtered = items.filter(item => item.id !== Number(id));
    localStorage.setItem(STORAGE_KEYS.TEAS, JSON.stringify(filtered));

    // Логируем удаление
    await window.LogService.addLog({
      action: 'DELETE',
      actionName: 'Удаление товара',
      entity: 'Чай',
      entityId: targetItem.id,
      entityTitle: targetItem.title,
      oldState: targetItem,
      newState: null,
      details: `Удален сорт чая «${targetItem.title}»`
    });

    return true;
  },

  async importFromExcel(parsedRows, fileMeta) {
    await delay(350);
    const items = JSON.parse(localStorage.getItem(STORAGE_KEYS.TEAS) || '[]');
    const addedItems = [];

    // Преобразуем строки из Excel в структуру чая
    parsedRows.forEach((row, index) => {
      // Поддержка различных имен столбцов (рус/англ)
      const title = row['Название'] || row['Title'] || row['Наименование'] || row['Name'] || `Чай из файла #${index + 1}`;
      const price = parseFloat(row['Цена'] || row['Price'] || row['Стоимость'] || 35.00);
      const category = row['Категория'] || row['Category'] || 'Зеленый чай';
      const desc = row['Описание'] || row['Description'] || 'Импортировано из таблицы Excel';
      const stock = parseInt(row['Количество'] || row['Остаток'] || row['Stock'] || 20, 10);
      const origin = row['Происхождение'] || row['Origin'] || 'Восточная Азия';
      const rating = parseFloat(row['Рейтинг'] || row['Rating'] || 4.8);
      const image = row['Изображение'] || row['Image'] || 'images/product-image.png';

      const newItem = {
        id: Date.now() + index + Math.floor(Math.random() * 500),
        title,
        price: isNaN(price) ? 30.00 : price,
        category,
        image,
        desc,
        stock: isNaN(stock) ? 10 : stock,
        origin,
        rating: isNaN(rating) ? 4.8 : rating,
        createdAt: new Date().toISOString()
      };
      items.unshift(newItem);
      addedItems.push(newItem);
    });

    localStorage.setItem(STORAGE_KEYS.TEAS, JSON.stringify(items));

    // Сохраняем файл в локальное хранилище
    if (fileMeta) {
      await window.FileStorageService.saveFile({
        ...fileMeta,
        rowCount: addedItems.length
      });
    }

    // Логируем действие импорта
    await window.LogService.addLog({
      action: 'EXCEL_IMPORT',
      actionName: 'Импорт из Excel',
      entity: 'Таблица товаров',
      entityId: null,
      entityTitle: fileMeta ? fileMeta.name : 'Excel файл',
      oldState: null,
      newState: { importedCount: addedItems.length, sample: addedItems.slice(0, 3) },
      details: `Успешно импортировано ${addedItems.length} сортов чая из файла "${fileMeta ? fileMeta.name : 'Excel'}"`
    });

    return addedItems;
  },

  async resetToDefault() {
    await delay(200);
    localStorage.setItem(STORAGE_KEYS.TEAS, JSON.stringify(DEFAULT_TEAS));
    return DEFAULT_TEAS;
  }
};

/**
 * Отдельный сервис управления специальной таблицей данных из Excel
 */
window.ExcelTableService = {
  async getAll() {
    await delay(150);
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EXCEL_TABLE) || '[]');
  },

  async addRows(parsedRows, fileMeta) {
    await delay(250);
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXCEL_TABLE) || '[]');
    const added = [];

    parsedRows.forEach((row, index) => {
      const title = row['Название'] || row['Title'] || row['Наименование'] || row['Name'] || `Чай из Excel #${index + 1}`;
      const price = parseFloat(row['Цена'] || row['Price'] || row['Стоимость'] || 35.00);
      const category = row['Категория'] || row['Category'] || 'Зеленый чай';
      const desc = row['Описание'] || row['Description'] || 'Импортировано из файла Excel';
      const stock = parseInt(row['Количество'] || row['Остаток'] || row['Stock'] || 20, 10);
      const origin = row['Происхождение'] || row['Origin'] || 'Восточная Азия';
      const rating = parseFloat(row['Рейтинг'] || row['Rating'] || 4.8);
      const image = row['Изображение'] || row['Image'] || 'images/product-image.png';

      const item = {
        id: Date.now() + index + Math.floor(Math.random() * 500),
        title,
        price: isNaN(price) ? 30.00 : price,
        category,
        desc,
        stock: isNaN(stock) ? 10 : stock,
        origin,
        rating: isNaN(rating) ? 4.8 : rating,
        image,
        sourceFile: fileMeta ? fileMeta.name : 'Excel файл',
        importDate: new Date().toISOString()
      };
      existing.unshift(item);
      added.push(item);
    });

    localStorage.setItem(STORAGE_KEYS.EXCEL_TABLE, JSON.stringify(existing));

    if (window.LogService) {
      await window.LogService.addLog({
        action: 'EXCEL_TABLE_IMPORT',
        actionName: 'Импорт в таблицу Excel',
        entity: 'Отдельная таблица Excel',
        entityTitle: fileMeta ? fileMeta.name : 'Файл Excel',
        details: `В отдельную таблицу занесено ${added.length} записей из файла ${fileMeta ? fileMeta.name : 'Excel'}`
      });
    }

    return added;
  },

  async updateRow(id, data) {
    await delay(200);
    const rows = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXCEL_TABLE) || '[]');
    const idx = rows.findIndex(r => r.id === Number(id));
    if (idx === -1) throw new Error('Запись не найдена в таблице Excel');

    const oldState = { ...rows[idx] };
    rows[idx] = { ...oldState, ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.EXCEL_TABLE, JSON.stringify(rows));

    if (window.LogService) {
      await window.LogService.addLog({
        action: 'EXCEL_TABLE_UPDATE',
        actionName: 'Обновление в таблице Excel',
        entity: 'Отдельная таблица Excel',
        entityId: id,
        entityTitle: rows[idx].title,
        oldState,
        newState: rows[idx],
        details: `Отредактирована строка «${rows[idx].title}» в отдельной таблице Excel`
      });
    }

    return rows[idx];
  },

  async deleteRow(id) {
    await delay(150);
    const rows = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXCEL_TABLE) || '[]');
    const item = rows.find(r => r.id === Number(id));
    if (!item) throw new Error('Запись не найдена');

    const filtered = rows.filter(r => r.id !== Number(id));
    localStorage.setItem(STORAGE_KEYS.EXCEL_TABLE, JSON.stringify(filtered));

    if (window.LogService) {
      await window.LogService.addLog({
        action: 'EXCEL_TABLE_DELETE',
        actionName: 'Удаление из таблицы Excel',
        entity: 'Отдельная таблица Excel',
        entityId: id,
        entityTitle: item.title,
        details: `Удалена запись «${item.title}» из отдельной таблицы Excel`
      });
    }

    return true;
  },

  async clear() {
    await delay(150);
    localStorage.setItem(STORAGE_KEYS.EXCEL_TABLE, JSON.stringify([]));
    return [];
  },

  async resetToDefault() {
    await delay(150);
    localStorage.setItem(STORAGE_KEYS.EXCEL_TABLE, JSON.stringify(DEFAULT_EXCEL_ROWS));
    return DEFAULT_EXCEL_ROWS;
  },

  async transferToCatalog(id) {
    await delay(200);
    const rows = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXCEL_TABLE) || '[]');
    const item = rows.find(r => r.id === Number(id));
    if (!item) throw new Error('Запись не найдена');

    await window.TeaApiService.create({
      title: item.title,
      price: item.price,
      category: item.category,
      desc: item.desc,
      stock: item.stock,
      origin: item.origin,
      rating: item.rating,
      image: item.image
    });

    return true;
  },

  async transferAllToCatalog() {
    await delay(300);
    const rows = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXCEL_TABLE) || '[]');
    let count = 0;
    for (const item of rows) {
      await window.TeaApiService.create({
        title: item.title,
        price: item.price,
        category: item.category,
        desc: item.desc,
        stock: item.stock,
        origin: item.origin,
        rating: item.rating,
        image: item.image
      });
      count++;
    }
    return count;
  }
};

/**
 * Надежная утилита экспорта данных в файл Excel (.xlsx) через Blob
 */
window.exportToExcel = function(data, fileName = 'export.xlsx', sheetName = 'Чайная коллекция') {
  if (typeof XLSX === 'undefined') {
    throw new Error('Библиотека XLSX не загружена.');
  }
  if (!data || data.length === 0) {
    throw new Error('Нет данных для экспорта в Excel.');
  }

  // 1. Формируем лист и книгу
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // 2. Генерируем массив байтов
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // 3. Создаем Blob с корректным MIME-типом Excel
  const blob = new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  });

  // 4. Скачиваем через временный элемент <a>
  const safeFileName = fileName.toLowerCase().endsWith('.xlsx') ? fileName : (fileName + '.xlsx');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = safeFileName;
  document.body.appendChild(a);
  a.click();

  // 5. Очищаем URL после завершения инициирования скачивания
  setTimeout(() => {
    if (a.parentNode) {
      document.body.removeChild(a);
    }
    URL.revokeObjectURL(url);
  }, 1000);

  // 6. Логируем экспорт
  if (window.LogService) {
    window.LogService.addLog({
      action: 'EXCEL_EXPORT',
      actionName: 'Экспорт в Excel',
      entity: 'Таблица товаров',
      entityTitle: safeFileName,
      details: `Выгружено ${data.length} строк в файл ${safeFileName}`
    });
  }

  return true;
};

