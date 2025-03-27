/**
 * Модуль для роботи з локальним сховищем
 */

/**
 * Зберігає стан чатів у локальне сховище
 */
function saveChats() {
  const chatsToSave = {};
  Object.keys(chatBots).forEach((botId) => {
    chatsToSave[botId] = {
      memory: chatBots[botId].memory,
      messageCount: chatBots[botId].messageCount || MAX_MESSAGES,
      gameCompleted: chatBots[botId].gameCompleted || false,
      gameResult: chatBots[botId].gameResult || null,
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
      if (chatBots[botId]) {
        chatBots[botId].memory = chats[botId].memory || [];
        chatBots[botId].messageCount =
          chats[botId].messageCount || MAX_MESSAGES;
        chatBots[botId].gameCompleted = chats[botId].gameCompleted || false;
        chatBots[botId].gameResult = chats[botId].gameResult || null;
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
  return chatBots[botId].victoryCheck(chatBots[botId].memory);
}
