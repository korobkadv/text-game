/**
 * Модуль для роботи з локальним сховищем
 */

/**
 * Зберігає стан чатів у локальне сховище
 */
function saveChats() {
  const chatsToSave = {};
  Object.keys(window.chatBots).forEach((botId) => {
    chatsToSave[botId] = {
      memory: window.chatBots[botId].memory,
      messageCount: window.chatBots[botId].messageCount || MAX_MESSAGES,
    };
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatsToSave));
}

/**
 * Завантажує стан чатів з локального сховища
 */
function loadChats() {
  const savedChats = localStorage.getItem(STORAGE_KEY);
  if (savedChats) {
    const chats = JSON.parse(savedChats);
    Object.keys(chats).forEach((botId) => {
      if (window.chatBots[botId]) {
        window.chatBots[botId].memory = chats[botId].memory || [];
        window.chatBots[botId].messageCount =
          chats[botId].messageCount || MAX_MESSAGES;
      }
    });
  }
}

/**
 * Перевіряє умову перемоги для конкретного чату
 * @param {string} botId - Ідентифікатор бота
 * @returns {boolean} - true, якщо досягнуто перемоги
 */
function checkVictory(botId) {
  return window.chatBots[botId].victoryCheck(window.chatBots[botId].memory);
}
