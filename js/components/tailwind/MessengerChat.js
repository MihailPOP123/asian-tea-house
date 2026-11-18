/**
 * MessengerChat.js — Задание 3.1: Мессенджер (макет)
 * Требования:
 * - Список диалогов слева (аватары, превью, unread-badge)
 * - Область сообщений справа
 * - Сообщения: свои (справа, синие/изумрудные) / чужие (слева, серые)
 * - Поле ввода с кнопкой отправки
 * - Скроллбары со стилизацией через arbitrary values ([&::-webkit-scrollbar]:w-2)
 * - Требования: flex, overflow-y-auto, sticky bottom-0, [&::-webkit-scrollbar]:*
 * - Строго БЕЗ эмодзи (чистый текст и SVG)
 */

window.MessengerChat = {
  name: 'MessengerChat',
  data() {
    return {
      activeChatId: 1,
      newMessageText: '',
      chats: [
        {
          id: 1,
          name: 'Мастер Ли Вэй',
          role: 'Главный титестер',
          avatar: 'images/team-master.jpg',
          fallbackAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
          lastMessage: 'Партия Да Хун Пао готова к дегустации. Температура воды 95°C.',
          time: '14:20',
          unread: 2,
          online: true,
          messages: [
            { id: 1, sender: 'other', text: 'Приветствую в клубе Asian Tea House! Я подготовил для вас образцы весеннего сбора.', time: '14:10' },
            { id: 2, sender: 'self', text: 'Здравствуйте! Подскажите, какая выдержка у блина Шу Пуэра 2012 года?', time: '14:15' },
            { id: 3, sender: 'other', text: 'Партия Да Хун Пао готова к дегустации. Температура воды 95°C.', time: '14:20' }
          ]
        },
        {
          id: 2,
          name: 'Служба логистики чая',
          role: 'Экспедиция и склад',
          avatar: 'images/collection-1.jpg',
          fallbackAvatar: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=100&q=80',
          lastMessage: 'Ваш заказ № 8412 передан курьеру в специальном изотермическом кейсе.',
          time: 'Вчера',
          unread: 0,
          online: false,
          messages: [
            { id: 1, sender: 'other', text: 'Ваш заказ № 8412 передан курьеру в специальном изотермическом кейсе.', time: 'Вчера 18:00' }
          ]
        },
        {
          id: 3,
          name: 'Чайная академия Гунфу',
          role: 'Запись на мастер-классы',
          avatar: 'images/tea-prep.jpg',
          fallbackAvatar: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=100&q=80',
          lastMessage: 'В эту субботу состоится закрытый семинар по завариванию габы.',
          time: 'Пн',
          unread: 1,
          online: true,
          messages: [
            { id: 1, sender: 'other', text: 'В эту субботу состоится закрытый семинар по завариванию габы.', time: 'Пн 11:30' }
          ]
        }
      ]
    };
  },
  computed: {
    activeChat() {
      return this.chats.find(c => c.id === this.activeChatId) || this.chats[0];
    }
  },
  methods: {
    sendMessage() {
      const text = this.newMessageText.trim();
      if (!text) return;

      this.activeChat.messages.push({
        id: Date.now(),
        sender: 'self',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.activeChat.lastMessage = text;
      this.activeChat.time = 'Только что';
      this.newMessageText = '';

      this.$nextTick(() => {
        const area = this.$refs.messagesArea;
        if (area) area.scrollTop = area.scrollHeight;
      });
    },
    onImgError(e, fallback) {
      if (e && e.target && fallback) {
        e.target.src = fallback;
      }
    }
  },
  template: `
    <div class="w-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden flex flex-col md:flex-row h-[600px]">
      
      <!-- 1. Список диалогов слева -->
      <!-- Используем arbitrary values для стилизации скроллбара: [&::-webkit-scrollbar]:w-2 -->
      <aside class="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700 flex flex-col flex-shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
        
        <!-- Шапка списка диалогов -->
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h3 class="font-bold text-slate-900 dark:text-white text-base">Сообщения</h3>
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            3 диалога
          </span>
        </div>

        <!-- Список чатов с кастомным скроллбаром: [&::-webkit-scrollbar]:w-2 -->
        <div class="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full divide-y divide-slate-100 dark:divide-slate-800">
          <div
            v-for="chat in chats"
            :key="chat.id"
            @click="activeChatId = chat.id; chat.unread = 0"
            :class="chat.id === activeChatId 
              ? 'bg-white dark:bg-slate-800 border-l-4 border-emerald-600 shadow-sm' 
              : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/50 cursor-pointer'"
            class="p-4 transition-all duration-150 flex items-start gap-3"
          >
            <!-- Аватар с индикатором онлайна -->
            <div class="relative flex-shrink-0">
              <img 
                :src="chat.avatar" 
                :alt="chat.name"
                class="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                @error="onImgError($event, chat.fallbackAvatar)"
              />
              <span 
                v-if="chat.online"
                class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"
                title="В сети"
              ></span>
            </div>

            <!-- Имя, роль и последнее сообщение -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-0.5">
                <h4 class="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {{ chat.name }}
                </h4>
                <span class="text-[11px] text-slate-400 font-medium">{{ chat.time }}</span>
              </div>
              <p class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold truncate mb-1">
                {{ chat.role }}
              </p>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                {{ chat.lastMessage }}
              </p>
            </div>

            <!-- Unread-badge -->
            <div v-if="chat.unread > 0" class="flex-shrink-0 mt-1">
              <span class="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center">
                {{ chat.unread }}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <!-- 2. Область сообщений справа -->
      <section class="flex-1 flex flex-col justify-between bg-white dark:bg-slate-800 min-w-0" aria-label="Чат с собеседником">
        
        <!-- Шапка открытого диалога -->
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <div class="flex items-center gap-3">
            <img 
              :src="activeChat.avatar" 
              :alt="activeChat.name"
              class="w-9 h-9 rounded-full object-cover"
              @error="onImgError($event, activeChat.fallbackAvatar)"
            />
            <div>
              <h4 class="text-sm font-bold text-slate-900 dark:text-white">{{ activeChat.name }}</h4>
              <p class="text-[11px] text-slate-400">{{ activeChat.online ? 'В сети' : 'Не в сети' }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400">
              Чат поддержки
            </span>
          </div>
        </div>

        <!-- Список сообщений: свои (справа, синие/изумрудные) / чужие (слева, серые) -->
        <!-- Стилизация скроллбара: [&::-webkit-scrollbar]:w-2 overflow-y-auto -->
        <div 
          ref="messagesArea"
          class="flex-1 p-4 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col space-y-4"
        >
          <div 
            v-for="msg in activeChat.messages" 
            :key="msg.id"
            :class="msg.sender === 'self' ? 'self-end items-end' : 'self-start items-start'"
            class="flex flex-col max-w-[85%] sm:max-w-md animate-fade-in"
          >
            <!-- Текст сообщения: свои синие/изумрудные, чужие серые -->
            <div 
              :class="msg.sender === 'self' 
                ? 'bg-emerald-600 text-white rounded-2xl rounded-tr-none shadow-sm' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-none'"
              class="px-4 py-2.5 text-xs sm:text-sm leading-relaxed"
            >
              {{ msg.text }}
            </div>
            <!-- Время сообщения -->
            <span class="text-[10px] text-slate-400 mt-1 px-1">
              {{ msg.time }}
            </span>
          </div>
        </div>

        <!-- 3. Поле ввода с кнопкой отправки (sticky bottom-0) -->
        <form 
          @submit.prevent="sendMessage"
          class="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4 flex items-center gap-2"
        >
          <input 
            type="text" 
            v-model="newMessageText"
            placeholder="Напишите сообщение чайному мастеру..."
            class="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          />
          <button 
            type="submit" 
            :disabled="!newMessageText.trim()"
            class="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <span>Отправить</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>

      </section>

    </div>
  `
};
