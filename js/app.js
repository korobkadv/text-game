/**
 * Головний модуль додатку
 */

// Оновлення HTML після завантаження сторінки
document.addEventListener("DOMContentLoaded", initApp);

/**
 * Ініціалізація додатку
 */
function initApp() {
  // Ініціалізація обробників подій
  initCategoryHandlers();
  initTabHandlers();
  initChats();
}

/**
 * Ініціалізація обробників подій для категорій
 */
function initCategoryHandlers() {
  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      // Видалення активного класу з усіх кнопок категорій
      document
        .querySelectorAll(".category-btn")
        .forEach((btn) => btn.classList.remove("active"));

      // Додавання активного класу до натиснутої кнопки
      button.classList.add("active");

      // Отримання категорії
      const category = button.getAttribute("data-category");

      // Приховування всіх таб-груп
      document.querySelectorAll(".tabs").forEach((tabs) => {
        tabs.style.display = "none";
      });

      // Відображення потрібної таб-групи
      const activeTabGroup = document.querySelector(`.tabs.${category}`);
      if (activeTabGroup) {
        activeTabGroup.style.display = "flex";

        // Активація першої вкладки в категорії, якщо жодна не активна
        const activeTab = activeTabGroup.querySelector(".tab-btn.active");
        if (!activeTab && activeTabGroup.querySelector(".tab-btn")) {
          const firstTab = activeTabGroup.querySelector(".tab-btn");
          firstTab.classList.add("active");

          // Активація відповідного контенту
          const tabId = firstTab.getAttribute("data-tab");

          // Приховування всіх контентів
          document.querySelectorAll(".tab-content").forEach((content) => {
            content.classList.remove("active");
          });

          // Активація потрібного контенту
          const contentToShow = document.getElementById(tabId);
          if (contentToShow) {
            contentToShow.classList.add("active");

            // Фокусування на поле вводу активного чату
            const inputField =
              contentToShow.querySelector("input[type='text']");
            if (inputField && !inputField.disabled) {
              setTimeout(() => inputField.focus(), 100);
            }
          }
        }
      }
    });
  });
}

/**
 * Ініціалізація обробників подій для вкладок
 */
function initTabHandlers() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      // Видалення активного класу з усіх кнопок і контенту
      document
        .querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));

      // Додавання активного класу до натиснутої кнопки і відповідного контенту
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      const activeContent = document.getElementById(tabId);
      activeContent.classList.add("active");

      // Фокусування на поле вводу активного чату
      const inputField = activeContent.querySelector("input[type='text']");
      if (inputField && !inputField.disabled) {
        setTimeout(() => inputField.focus(), 100);
      }
    });
  });
}

/**
 * Ініціалізація чатів
 */
function initChats() {
  // Завантаження збережених чатів
  loadChats();

  // Ініціалізація кожного чату
  Object.keys(chatBots).forEach((botId) => {
    // Ініціалізація лічильника повідомлень, якщо його ще немає
    if (chatBots[botId].messageCount === undefined) {
      chatBots[botId].messageCount = MAX_MESSAGES;
    }
    const chatContainer = document
      .getElementById(botId)
      .querySelector(".chat-container");
    const inputElement = document.getElementById(botId).querySelector("input");
    const sendButton = document
      .getElementById(botId)
      .querySelector("button:not(.reset-btn)");
    const resetButton = document
      .getElementById(botId)
      .querySelector(".reset-btn");
    const messageCounter = document
      .getElementById(botId)
      .querySelector(".message-counter");

    // Очищення контейнера чату
    chatContainer.innerHTML = "";

    // Додавання збережених повідомлень
    if (chatBots[botId].memory && chatBots[botId].memory.length > 0) {
      chatBots[botId].memory.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(
          message.sender === "user" ? "user-message" : "ai-message"
        );
        messageElement.textContent = message.text;
        chatContainer.appendChild(messageElement);
      });
      // Прокручування до останнього повідомлення
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } else {
      // Додавання привітання від бота, якщо чат порожній
      chatBots[botId].memory = [];
      const greeting = chatBots[botId].greeting;
      if (greeting) {
        const greetingMessage = {
          sender: "ai",
          text: greeting,
        };
        chatBots[botId].memory.push(greetingMessage);

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "ai-message");
        messageElement.textContent = greeting;
        chatContainer.appendChild(messageElement);
      }
    }

    // Оновлення лічильника повідомлень
    updateMessageCounter(botId);

    // Перевірка, чи гра вже завершена
    if (chatBots[botId].gameCompleted) {
      // Блокування введення, якщо гра завершена
      inputElement.disabled = true;
      sendButton.disabled = true;
      inputElement.placeholder = "Гру завершено";

      // Показ підсумку гри, якщо він ще не був показаний
      if (!chatContainer.querySelector(".game-summary")) {
        showGameSummary(botId, chatBots[botId].gameResult === "victory");
      }
    } else {
      // Фокусування на поле вводу, якщо це активний чат і гра не завершена
      const isActiveChat = document
        .getElementById(botId)
        .classList.contains("active");
      if (isActiveChat) {
        setTimeout(() => inputElement.focus(), 100);
      }
    }

    // Обробка надсилання повідомлення
    async function sendMessage() {
      const messageText = inputElement.value.trim();
      if (messageText === "") return;

      // Перевірка, чи залишилися спроби
      if (chatBots[botId].messageCount <= 0) {
        inputElement.value = "";
        return;
      }

      // Додавання повідомлення користувача
      const userMessage = {
        sender: "user",
        text: messageText,
      };
      chatBots[botId].memory.push(userMessage);

      const userMessageElement = document.createElement("div");
      userMessageElement.classList.add("message", "user-message");
      userMessageElement.textContent = messageText;
      chatContainer.appendChild(userMessageElement);

      // Прокручування сторінки до нового повідомлення
      userMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });

      // Зменшення лічильника повідомлень
      chatBots[botId].messageCount--;
      updateMessageCounter(botId);

      // Блокування інтерфейсу під час очікування відповіді
      inputElement.disabled = true;
      sendButton.disabled = true;
      const loadingIndicator = document.createElement("div");
      loadingIndicator.classList.add("message", "ai-message");
      loadingIndicator.textContent = "Думаю...";
      chatContainer.appendChild(loadingIndicator);

      // Прокручування до індикатора завантаження
      loadingIndicator.scrollIntoView({ behavior: "smooth", block: "end" });

      // Очищення поля вводу
      inputElement.value = "";

      try {
        // Перевірка на перемогу перед API запитом
        const victory = checkVictory(botId);

        let botResponse;
        if (victory) {
          // Використовуємо спеціальне повідомлення про перемогу з API
          botResponse = await getVictoryResponse(
            messageText,
            chatBots[botId].characterPrompt
          );
        } else {
          // Звичайна відповідь від API з урахуванням контексту
          botResponse = await getContextualResponse(
            messageText,
            chatBots[botId].characterPrompt,
            chatBots[botId].memory,
            chatBots[botId].name
          );
        }

        // Видалення індикатора завантаження
        chatContainer.removeChild(loadingIndicator);

        // Додавання відповіді AI
        const aiMessage = {
          sender: "ai",
          text: botResponse,
        };
        chatBots[botId].memory.push(aiMessage);

        const aiMessageElement = document.createElement("div");
        aiMessageElement.classList.add("message", "ai-message");
        aiMessageElement.textContent = botResponse;
        chatContainer.appendChild(aiMessageElement);

        // Прокручування до відповіді бота
        aiMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });

        // Перевірка на перемогу після відповіді AI
        const victoryAfterResponse = checkVictory(botId);

        // Розблокування інтерфейсу, але тільки якщо не перемога
        if (!victoryAfterResponse) {
          inputElement.disabled = false;
          sendButton.disabled = false;
          inputElement.focus(); // Фокус на поле вводу після отримання відповіді
        }

        // Перевірка на завершення гри (перемога або використано всі повідомлення)
        if (victoryAfterResponse || chatBots[botId].messageCount <= 0) {
          // Встановлення статусу завершення гри
          chatBots[botId].gameCompleted = true;
          chatBots[botId].gameResult = victoryAfterResponse
            ? "victory"
            : "defeat";

          // Показати висновок гри, але перевірити, чи він вже не був показаний
          if (!chatContainer.querySelector(".game-summary")) {
            showGameSummary(botId, victoryAfterResponse);
          }
        }
      } catch (error) {
        console.error("Помилка при отриманні відповіді:", error);

        // Видалення індикатора завантаження
        chatContainer.removeChild(loadingIndicator);

        // Відображення повідомлення про помилку
        const errorMessage = document.createElement("div");
        errorMessage.classList.add("message", "ai-message");
        errorMessage.textContent =
          "Вибачте, сталася помилка. Будь ласка, спробуйте ще раз пізніше.";
        chatContainer.appendChild(errorMessage);

        // Розблокування інтерфейсу
        inputElement.disabled = false;
        sendButton.disabled = false;
      }

      // Збереження стану чатів
      saveChats();
    }

    // Обробники подій для форми
    sendButton.addEventListener("click", sendMessage);

    inputElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });

    // Обробник скидання чату
    resetButton.addEventListener("click", () => {
      chatBots[botId].memory = [];
      chatBots[botId].messageCount = MAX_MESSAGES;
      chatBots[botId].gameCompleted = false;
      chatBots[botId].gameResult = null;
      chatContainer.innerHTML = "";

      // Додавання привітання від бота
      const greeting = chatBots[botId].greeting;
      if (greeting) {
        const greetingMessage = {
          sender: "ai",
          text: greeting,
        };
        chatBots[botId].memory.push(greetingMessage);

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "ai-message");
        messageElement.textContent = greeting;
        chatContainer.appendChild(messageElement);

        // Прокручування до початку чату
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      // Оновлення лічильника повідомлень
      updateMessageCounter(botId);

      // Розблокування вводу
      inputElement.disabled = false;
      sendButton.disabled = false;
      inputElement.placeholder = "Введіть повідомлення..."; // Відновлення стандартного плейсхолдера

      // Встановлення фокусу на поле вводу
      setTimeout(() => inputElement.focus(), 100);

      // Збереження стану чатів
      saveChats();
    });
  });
}

/**
 * Оновлення лічильника повідомлень
 * @param {string} botId - Ідентифікатор бота
 */
function updateMessageCounter(botId) {
  const messageCounter = document
    .getElementById(botId)
    .querySelector(".message-counter");

  if (chatBots[botId].gameCompleted) {
    messageCounter.textContent = `Залишилось повідомлень: 0/${MAX_MESSAGES}`;
  } else {
    messageCounter.textContent = `Залишилось повідомлень: ${chatBots[botId].messageCount}/${MAX_MESSAGES}`;
  }
}

/**
 * Показує підсумок гри та можливість поділитися результатом
 * @param {string} botId - Ідентифікатор бота
 * @param {boolean} isVictory - Чи здобув користувач перемогу
 */
function showGameSummary(botId, isVictory) {
  const chatContainer = document
    .getElementById(botId)
    .querySelector(".chat-container");
  const scenarioTitles = {
    terminator: "Переконати Skynet не знищувати людство",
    date: "Запросити капризну AI-дівчину на побачення",
    detective: "Отримати секретні докази від детектива",
    alien: "Встановити дружній контакт з інопланетянином",
    philosopher: "Переконати філософа у існуванні об'єктивної реальності",
  };

  // Блокування подальшого вводу
  const inputElement = document.getElementById(botId).querySelector("input");
  const sendButton = document
    .getElementById(botId)
    .querySelector("button:not(.reset-btn)");

  inputElement.disabled = true;
  sendButton.disabled = true;
  inputElement.placeholder = "Гру завершено";

  // Оновлення лічильника повідомлень
  updateMessageCounter(botId);

  // Створення елемента з підсумком гри
  const summaryElement = document.createElement("div");
  summaryElement.classList.add("game-summary");

  // Визначення змісту залежно від результату
  let summaryTitle, summaryText, summaryEmoji;

  if (isVictory) {
    summaryTitle = "Вітаємо з перемогою!";
    summaryEmoji = "🏆";
    summaryText = `Ви успішно виконали завдання: "${scenarioTitles[botId]}"! Ваше вміння переконувати вражає!`;
  } else {
    summaryTitle = "Спроба не вдалася";
    summaryEmoji = "😢";
    summaryText = `На жаль, вам не вдалося "${scenarioTitles[botId]}". Але не засмучуйтесь – спробуйте ще раз з новою стратегією!`;
  }

  // Створення тексту для публікації в соціальних мережах
  const shareText = `${summaryEmoji} ${
    isVictory ? "Я переміг" : "Я намагався"
  } в AI-грі "${scenarioTitles[botId]}"! ${
    isVictory
      ? "Мені вдалося переконати ШІ! 🎉"
      : "Наступного разу точно вийде! 💪"
  } Спробуй і ти!`;

  // Формування HTML для підсумку
  summaryElement.innerHTML = `
        <div class="summary-header">
            <h3>${summaryTitle} ${summaryEmoji}</h3>
        </div>
        <p>${summaryText}</p>
        <div class="share-container">
            <textarea class="share-text" readonly>${shareText}</textarea>
            <div class="share-buttons">
                <button class="copy-btn" onclick="copyToClipboard('${botId}')">Копіювати текст 📋</button>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareText
                )}" target="_blank" class="share-btn twitter-btn">Twitter</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}&quote=${encodeURIComponent(
    shareText
  )}" target="_blank" class="share-btn facebook-btn">Facebook</a>
            </div>
        </div>
        <button class="try-again-btn" onclick="resetChat('${botId}')">Спробувати ще раз 🔄</button>
    `;

  // Додавання в чат
  chatContainer.appendChild(summaryElement);

  // Плавне прокручування до підсумку
  summaryElement.scrollIntoView({ behavior: "smooth", block: "end" });
}

// Глобальна функція для скидання чату, яка використовується в index.html
window.resetChat = function (botId) {
  // Скидання даних чату
  chatBots[botId].memory = [];
  chatBots[botId].messageCount = MAX_MESSAGES;
  chatBots[botId].gameCompleted = false;
  chatBots[botId].gameResult = null;

  const chat = document.getElementById(botId);
  const chatContainer = chat.querySelector(".chat-container");
  const inputElement = chat.querySelector("input");
  const sendButton = chat.querySelector("button:not(.reset-btn)");

  // Очищення контейнера
  chatContainer.innerHTML = "";

  // Додавання привітання від бота
  const greeting = chatBots[botId].greeting;
  if (greeting) {
    const greetingMessage = {
      sender: "ai",
      text: greeting,
    };
    chatBots[botId].memory.push(greetingMessage);

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "ai-message");
    messageElement.textContent = greeting;
    chatContainer.appendChild(messageElement);

    // Прокручування до привітання
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Оновлення лічильника повідомлень
  updateMessageCounter(botId);

  // Розблокування вводу
  inputElement.disabled = false;
  sendButton.disabled = false;
  inputElement.placeholder = "Введіть повідомлення..."; // Відновлення стандартного плейсхолдера

  // Встановлення фокусу на поле вводу
  setTimeout(() => inputElement.focus(), 100);

  // Збереження стану чатів
  saveChats();
};

// Глобальна функція для копіювання тексту в буфер обміну
window.copyToClipboard = function (botId) {
  const shareTextarea = document
    .getElementById(botId)
    .querySelector(".share-text");
  shareTextarea.select();
  document.execCommand("copy");

  // Візуальний фідбек для користувача
  const copyBtn = document.getElementById(botId).querySelector(".copy-btn");
  const originalText = copyBtn.textContent;
  copyBtn.textContent = "Скопійовано! ✓";

  setTimeout(() => {
    copyBtn.textContent = originalText;
  }, 2000);
};
