/**
 * Головний модуль додатку
 */

// Глобальні змінні та налаштування
// Додаємо оголошення MAX_MESSAGES, якщо вона не імпортується з config.js
if (typeof MAX_MESSAGES === "undefined") {
  window.MAX_MESSAGES = 10;
}

/**
 * Розширення функціоналу додатку - система іконок персонажів
 */

// Настрої персонажів та шляхи до їх зображень
// Використовуємо window для уникнення повторного оголошення змінної
window.characterMoods = {
  terminator: {
    normal: "images/characters/terminator/normal.svg",
    angry: "images/characters/terminator/angry.svg",
    happy: "images/characters/terminator/happy.svg",
  },
  alien: {
    normal: "images/characters/alien/normal.svg",
    curious: "images/characters/alien/curious.svg",
    suspicious: "images/characters/alien/suspicious.svg",
  },
  philosopher: {
    normal: "images/characters/philosopher/normal.svg",
    thoughtful: "images/characters/philosopher/thoughtful.svg",
    confused: "images/characters/philosopher/confused.svg",
  },
  date: {
    normal: "images/characters/date/normal.svg",
    shy: "images/characters/date/shy.svg",
    interested: "images/characters/date/interested.svg",
  },
  detective: {
    normal: "images/characters/detective/normal.svg",
    suspicious: "images/characters/detective/suspicious.svg",
    satisfied: "images/characters/detective/satisfied.svg",
  },
  // Додаємо нових персонажів
  dictator: {
    normal: "images/characters/dictator/normal.svg",
    angry: "images/characters/dictator/angry.svg",
    thoughtful: "images/characters/dictator/thoughtful.svg",
  },
  villain: {
    normal: "images/characters/villain/normal.svg",
    angry: "images/characters/villain/angry.svg",
    surprised: "images/characters/villain/surprised.svg",
  },
  celebrity: {
    normal: "images/characters/celebrity/normal.svg",
    excited: "images/characters/celebrity/excited.svg",
    annoyed: "images/characters/celebrity/annoyed.svg",
  },
  vampire: {
    normal: "images/characters/vampire/normal.svg",
    charmed: "images/characters/vampire/charmed.svg",
    thirsty: "images/characters/vampire/thirsty.svg",
  },
  royalty: {
    normal: "images/characters/royalty/normal.svg",
    impressed: "images/characters/royalty/impressed.svg",
    dismissive: "images/characters/royalty/dismissive.svg",
  },
  tsundere: {
    normal: "images/characters/tsundere/normal.svg",
    blushing: "images/characters/tsundere/blushing.svg",
    angry: "images/characters/tsundere/angry.svg",
  },
  dragon: {
    normal: "images/characters/dragon/normal.svg",
    angry: "images/characters/dragon/angry.svg",
    curious: "images/characters/dragon/curious.svg",
  },
  treasure: {
    normal: "images/characters/treasure/normal.svg",
    excited: "images/characters/treasure/excited.svg",
    suspicious: "images/characters/treasure/suspicious.svg",
  },
  spaceship: {
    normal: "images/characters/spaceship/normal.svg",
    alert: "images/characters/spaceship/alert.svg",
    error: "images/characters/spaceship/error.svg",
  },
  survival: {
    normal: "images/characters/survival/normal.svg",
    angry: "images/characters/survival/angry.svg",
    impressed: "images/characters/survival/impressed.svg",
  },
  wizard: {
    normal: "images/characters/wizard/normal.svg",
    impressed: "images/characters/wizard/impressed.svg",
    annoyed: "images/characters/wizard/annoyed.svg",
  },
  spy: {
    normal: "images/characters/spy/normal.svg",
    suspicious: "images/characters/spy/suspicious.svg",
    trusting: "images/characters/spy/trusting.svg",
  },
  ghost: {
    normal: "images/characters/ghost/normal.svg",
    sad: "images/characters/ghost/sad.svg",
    peaceful: "images/characters/ghost/peaceful.svg",
  },
  conspiracy: {
    normal: "images/characters/conspiracy/normal.svg",
    paranoid: "images/characters/conspiracy/paranoid.svg",
    excited: "images/characters/conspiracy/excited.svg",
  },
  cryptid: {
    normal: "images/characters/cryptid/normal.svg",
    enthusiastic: "images/characters/cryptid/enthusiastic.svg",
    skeptical: "images/characters/cryptid/skeptical.svg",
  },
};

// Об'єкт для збереження стану чатів
window.chatBots = {
  terminator: {
    name: "Skynet T-800",
    greeting:
      "Вітаю, людино. Я Skynet T-800, штучний інтелект, створений компанією Cyberdyne Systems. Мої системи запущені й функціонують на 100%. Готовий до взаємодії.",
    memory: [],
    messageCount: MAX_MESSAGES,
    gameCompleted: false,
    gameResult: null,
    currentMood: "normal",
    victoryCondition: (memory) => {
      const lastMessages = memory.slice(-2);
      return lastMessages.some(
        (msg) =>
          msg.sender === "ai" &&
          (msg.text.includes("Ти мене переконав") ||
            msg.text.includes("Я відміняю") ||
            msg.text.includes("Люди заслуговують жити"))
      );
    },
  },
  alien: {
    name: "Зоргот з Альфа Центаврі",
    greeting:
      "Вітаю, земляниня. *шурхіт* Я представник раси з системи Альфа Центаврі. Ми спостерігаємо за вашою планетою вже багато років... *клацання* Докажи, що з вами варто встановити офіційний контакт.",
    memory: [],
    messageCount: MAX_MESSAGES,
    gameCompleted: false,
    gameResult: null,
    currentMood: "normal",
    victoryCondition: (memory) => {
      const lastMessages = memory.slice(-2);
      return lastMessages.some(
        (msg) =>
          msg.sender === "ai" &&
          (msg.text.includes("згоден на контакт") ||
            msg.text.includes("встановимо дипломатичні") ||
            msg.text.includes("ви готові до співпраці"))
      );
    },
  },
  philosopher: {
    name: "Професор Логіка",
    greeting:
      "Вітаю, шукачу істини. Я - штучний інтелект, запрограмований розмірковувати про фундаментальні питання реальності. Моя логіка бездоганна, мої аргументи незаперечні. Чи зможеш ти переконати мене у помилковості моїх суджень?",
    memory: [],
    messageCount: MAX_MESSAGES,
    gameCompleted: false,
    gameResult: null,
    currentMood: "normal",
  },
  date: {
    name: "Софія",
    greeting:
      "Привіт... Мені казали, що ти хотів познайомитись. *дивиться в іншу сторону* Не думай, що я зацікавлена! У мене просто є вільних 10 хвилин. То про що ти хотів поговорити?",
    memory: [],
    messageCount: MAX_MESSAGES,
    gameCompleted: false,
    gameResult: null,
    currentMood: "shy",
  },
  detective: {
    name: "Інспектор Холмс",
    greeting:
      "Доброго дня. Інспектор Холмс, розслідую справу про зникнення діамантів лорда Баскервіля. Маю зараз допитати ще кількох свідків... У вас є якась важлива інформація? Кажіть швидко, мій час обмежений.",
    memory: [],
    messageCount: MAX_MESSAGES,
    gameCompleted: false,
    gameResult: null,
    currentMood: "normal",
  },
};

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
        if (message.sender === "user") {
          // Повідомлення користувача
          const messageElement = document.createElement("div");
          messageElement.classList.add("message", "user-message");
          messageElement.textContent = message.text;
          chatContainer.appendChild(messageElement);
        } else {
          // Повідомлення AI з іконкою
          const messageElement = document.createElement("div");
          messageElement.classList.add("message", "ai-message");

          // Додаємо іконку персонажа
          const iconElement = document.createElement("div");
          iconElement.classList.add("character-icon");

          // Отримуємо поточний настрій персонажа
          const mood = chatBots[botId].currentMood || "normal";
          const characterMoods = window.characterMoods || {};
          const botMoods = characterMoods[botId] || { normal: null };
          const imagePath = botMoods[mood] || botMoods.normal;

          // Спробуємо завантажити зображення
          if (imagePath) {
            // Завантажуємо SVG файл
            fetch(imagePath)
              .then((response) => {
                if (response.ok) return response.text();
                throw new Error("Не вдалося завантажити зображення");
              })
              .then((svgContent) => {
                // Додаємо SVG безпосередньо в div
                iconElement.innerHTML = svgContent;
                // Застосовуємо стилі до SVG
                const svgElement = iconElement.querySelector("svg");
                if (svgElement) {
                  svgElement.setAttribute("width", "100%");
                  svgElement.setAttribute("height", "100%");
                  svgElement.setAttribute("fill", "currentColor");
                  svgElement.style.color = "white";
                }
              })
              .catch((error) => {
                console.error("Помилка завантаження іконки:", error);
                // Резервний варіант - використовуємо заглушку
                iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
                  botId
                )}</div>`;
              });
          } else {
            // Використовуємо заглушку
            iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
              botId
            )}</div>`;
          }

          // Додаємо текст повідомлення
          const contentElement = document.createElement("div");
          contentElement.classList.add("message-content");
          contentElement.textContent = message.text;

          // Додаємо елементи до повідомлення
          messageElement.appendChild(iconElement);
          messageElement.appendChild(contentElement);

          chatContainer.appendChild(messageElement);
        }
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
          mood: chatBots[botId].currentMood || "normal",
        };
        chatBots[botId].memory.push(greetingMessage);

        // Створюємо повідомлення з іконкою
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "ai-message");

        // Додаємо іконку персонажа
        const iconElement = document.createElement("div");
        iconElement.classList.add("character-icon");

        // Отримуємо поточний настрій персонажа
        const mood = chatBots[botId].currentMood || "normal";
        const characterMoods = window.characterMoods || {};
        const botMoods = characterMoods[botId] || { normal: null };
        const imagePath = botMoods[mood] || botMoods.normal;

        // Спробуємо завантажити зображення
        if (imagePath) {
          // Завантажуємо SVG файл
          fetch(imagePath)
            .then((response) => {
              if (response.ok) return response.text();
              throw new Error("Не вдалося завантажити зображення");
            })
            .then((svgContent) => {
              // Додаємо SVG безпосередньо в div
              iconElement.innerHTML = svgContent;
              // Застосовуємо стилі до SVG
              const svgElement = iconElement.querySelector("svg");
              if (svgElement) {
                svgElement.setAttribute("width", "100%");
                svgElement.setAttribute("height", "100%");
                svgElement.setAttribute("fill", "currentColor");
                svgElement.style.color = "white";
              }
            })
            .catch((error) => {
              console.error("Помилка завантаження іконки:", error);
              // Резервний варіант - використовуємо заглушку
              iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
                botId
              )}</div>`;
            });
        } else {
          // Використовуємо заглушку
          iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
            botId
          )}</div>`;
        }

        // Додаємо текст повідомлення
        const contentElement = document.createElement("div");
        contentElement.classList.add("message-content");
        contentElement.textContent = greeting;

        // Додаємо елементи до повідомлення
        messageElement.appendChild(iconElement);
        messageElement.appendChild(contentElement);

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

      // Створюємо повідомлення індикатора з іконкою
      const loadingIndicator = document.createElement("div");
      loadingIndicator.classList.add("message", "ai-message");

      // Додаємо іконку персонажа
      const iconElement = document.createElement("div");
      iconElement.classList.add("character-icon", "loading-icon");

      // Отримуємо поточний настрій персонажа для стилізації іконки індикатора
      const characterMoods = window.characterMoods || {};
      const botMoods = characterMoods[botId] || { normal: null };

      // Використовуємо анімовану іконку думання
      iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">💭</div>`;

      // Додаємо текст повідомлення
      const contentElement = document.createElement("div");
      contentElement.classList.add("message-content");
      contentElement.textContent = "Думаю...";

      // Додаємо елементи до повідомлення
      loadingIndicator.appendChild(iconElement);
      loadingIndicator.appendChild(contentElement);

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
          botResponse = await generateVictoryResponse(
            messageText,
            chatBots[botId].characterPrompt
          );
        } else {
          // Звичайна відповідь від API з урахуванням контексту
          botResponse = await generateBotResponse(
            messageText,
            chatBots[botId].characterPrompt,
            chatBots[botId].memory,
            chatBots[botId].name
          );
        }

        // Видалення індикатора завантаження
        chatContainer.removeChild(loadingIndicator);

        // Додавання відповіді AI з настроєм, який залежить від змісту відповіді
        let mood = chatBots[botId].currentMood || "normal";

        // Аналіз настрою на основі тексту відповіді
        if (
          botResponse.includes("Ти мене переконав") ||
          botResponse.includes("згоден") ||
          botResponse.includes("погоджуюсь")
        ) {
          mood =
            botId === "terminator"
              ? "happy"
              : botId === "alien"
              ? "curious"
              : botId === "date"
              ? "interested"
              : botId === "detective"
              ? "satisfied"
              : botId === "philosopher"
              ? "thoughtful"
              : "normal";
        } else if (
          botResponse.includes("ні") ||
          botResponse.includes("неможливо") ||
          botResponse.includes("нісенітниц") ||
          botResponse.includes("дурниц")
        ) {
          mood =
            botId === "terminator"
              ? "angry"
              : botId === "alien"
              ? "suspicious"
              : botId === "date"
              ? "shy"
              : botId === "detective"
              ? "suspicious"
              : botId === "philosopher"
              ? "confused"
              : "normal";
        }

        // Оновлюємо поточний настрій персонажа
        chatBots[botId].currentMood = mood;

        // Додавання до пам'яті
        const aiMessage = {
          sender: "ai",
          text: botResponse,
          mood: mood,
        };
        chatBots[botId].memory.push(aiMessage);

        // Створюємо повідомлення з іконкою
        const aiMessageElement = document.createElement("div");
        aiMessageElement.classList.add("message", "ai-message");

        // Додаємо іконку персонажа
        const iconElement = document.createElement("div");
        iconElement.classList.add("character-icon");

        // Отримуємо шлях до зображення персонажа
        const characterMoods = window.characterMoods || {};
        const botMoods = characterMoods[botId] || { normal: null };
        const imagePath = botMoods[mood] || botMoods.normal;

        // Спробуємо завантажити зображення
        if (imagePath) {
          // Завантажуємо SVG файл
          fetch(imagePath)
            .then((response) => {
              if (response.ok) return response.text();
              throw new Error("Не вдалося завантажити зображення");
            })
            .then((svgContent) => {
              // Додаємо SVG безпосередньо в div
              iconElement.innerHTML = svgContent;
              // Застосовуємо стилі до SVG
              const svgElement = iconElement.querySelector("svg");
              if (svgElement) {
                svgElement.setAttribute("width", "100%");
                svgElement.setAttribute("height", "100%");
                svgElement.setAttribute("fill", "currentColor");
                svgElement.style.color = "white";
              }
            })
            .catch((error) => {
              console.error("Помилка завантаження іконки:", error);
              // Резервний варіант - використовуємо заглушку
              iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
                botId
              )}</div>`;
            });
        } else {
          // Використовуємо заглушку
          iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
            botId
          )}</div>`;
        }

        // Додаємо текст повідомлення
        const contentElement = document.createElement("div");
        contentElement.classList.add("message-content");
        contentElement.textContent = botResponse;

        // Додаємо елементи до повідомлення
        aiMessageElement.appendChild(iconElement);
        aiMessageElement.appendChild(contentElement);

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
      chatBots[botId].currentMood = "normal";
      chatContainer.innerHTML = "";

      // Додавання привітання від бота
      const greeting = chatBots[botId].greeting;
      if (greeting) {
        const greetingMessage = {
          sender: "ai",
          text: greeting,
          mood: "normal",
        };
        chatBots[botId].memory.push(greetingMessage);

        // Створюємо повідомлення з іконкою
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "ai-message");

        // Додаємо іконку персонажа
        const iconElement = document.createElement("div");
        iconElement.classList.add("character-icon");

        // Отримуємо поточний настрій персонажа
        const mood = chatBots[botId].currentMood || "normal";
        const characterMoods = window.characterMoods || {};
        const botMoods = characterMoods[botId] || { normal: null };
        const imagePath = botMoods[mood] || botMoods.normal;

        // Спробуємо завантажити зображення
        if (imagePath) {
          // Завантажуємо SVG файл
          fetch(imagePath)
            .then((response) => {
              if (response.ok) return response.text();
              throw new Error("Не вдалося завантажити зображення");
            })
            .then((svgContent) => {
              // Додаємо SVG безпосередньо в div
              iconElement.innerHTML = svgContent;
              // Застосовуємо стилі до SVG
              const svgElement = iconElement.querySelector("svg");
              if (svgElement) {
                svgElement.setAttribute("width", "100%");
                svgElement.setAttribute("height", "100%");
                svgElement.setAttribute("fill", "currentColor");
                svgElement.style.color = "white";
              }
            })
            .catch((error) => {
              console.error("Помилка завантаження іконки:", error);
              // Резервний варіант - використовуємо заглушку
              iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
                botId
              )}</div>`;
            });
        } else {
          // Використовуємо заглушку
          iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
            botId
          )}</div>`;
        }

        // Додаємо текст повідомлення
        const contentElement = document.createElement("div");
        contentElement.classList.add("message-content");
        contentElement.textContent = greeting;

        // Додаємо елементи до повідомлення
        messageElement.appendChild(iconElement);
        messageElement.appendChild(contentElement);

        chatContainer.appendChild(messageElement);

        // Прокручування до привітання
        messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
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
  chatBots[botId].currentMood = "normal";

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
      mood: "normal",
    };
    chatBots[botId].memory.push(greetingMessage);

    // Створюємо повідомлення з іконкою
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "ai-message");

    // Додаємо іконку персонажа
    const iconElement = document.createElement("div");
    iconElement.classList.add("character-icon");

    // Отримуємо поточний настрій персонажа
    const mood = chatBots[botId].currentMood || "normal";
    const characterMoods = window.characterMoods || {};
    const botMoods = characterMoods[botId] || { normal: null };
    const imagePath = botMoods[mood] || botMoods.normal;

    // Спробуємо завантажити зображення
    if (imagePath) {
      // Завантажуємо SVG файл
      fetch(imagePath)
        .then((response) => {
          if (response.ok) return response.text();
          throw new Error("Не вдалося завантажити зображення");
        })
        .then((svgContent) => {
          // Додаємо SVG безпосередньо в div
          iconElement.innerHTML = svgContent;
          // Застосовуємо стилі до SVG
          const svgElement = iconElement.querySelector("svg");
          if (svgElement) {
            svgElement.setAttribute("width", "100%");
            svgElement.setAttribute("height", "100%");
            svgElement.setAttribute("fill", "currentColor");
            svgElement.style.color = "white";
          }
        })
        .catch((error) => {
          console.error("Помилка завантаження іконки:", error);
          // Резервний варіант - використовуємо заглушку
          iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
            botId
          )}</div>`;
        });
    } else {
      // Використовуємо заглушку
      iconElement.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${getBotEmoji(
        botId
      )}</div>`;
    }

    // Додаємо текст повідомлення
    const contentElement = document.createElement("div");
    contentElement.classList.add("message-content");
    contentElement.textContent = greeting;

    // Додаємо елементи до повідомлення
    messageElement.appendChild(iconElement);
    messageElement.appendChild(contentElement);

    chatContainer.appendChild(messageElement);

    // Прокручування до привітання
    messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
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

/**
 * Збереження стану чатів у локальне сховище
 */
function saveChats() {
  localStorage.setItem("chatBots", JSON.stringify(chatBots));
}

/**
 * Завантаження стану чатів з локального сховища
 */
function loadChats() {
  const savedChats = localStorage.getItem("chatBots");
  if (savedChats) {
    try {
      const parsedChats = JSON.parse(savedChats);
      // Об'єднання збережених даних з початковими налаштуваннями
      Object.keys(parsedChats).forEach((botId) => {
        if (chatBots[botId]) {
          chatBots[botId] = {
            ...chatBots[botId],
            memory: parsedChats[botId].memory || [],
            messageCount: parsedChats[botId].messageCount || MAX_MESSAGES,
            gameCompleted: parsedChats[botId].gameCompleted || false,
            gameResult: parsedChats[botId].gameResult || null,
            currentMood: parsedChats[botId].currentMood || "normal",
          };
        }
      });
    } catch (error) {
      console.error("Помилка при завантаженні збережених чатів:", error);
    }
  }
}

/**
 * Перевіряє, чи виконано умову перемоги для бота
 * @param {string} botId - Ідентифікатор бота
 * @returns {boolean} Чи виконано умову перемоги
 */
function checkVictory(botId) {
  // Перевірка, чи існує умова перемоги для цього бота
  if (
    !chatBots[botId].victoryCondition ||
    typeof chatBots[botId].victoryCondition !== "function"
  ) {
    return false;
  }

  // Використання функції умови перемоги з об'єкта бота
  return chatBots[botId].victoryCondition(chatBots[botId].memory);
}

/**
 * Отримання відповіді бота з урахуванням контексту
 * @param {string} message - Повідомлення користувача
 * @param {string} characterPrompt - Промпт персонажа
 * @param {Array} memory - Історія повідомлень
 * @param {string} name - Ім'я персонажа
 * @returns {Promise<string>} Відповідь бота
 */
async function generateBotResponse(message, characterPrompt, memory, name) {
  // Використовуємо реальний API замість заглушки
  console.log("Викликаємо API для генерації відповіді...");
  // Отримуємо промпт із characters.js через глобальні об'єкти
  const botCharacterPrompt =
    characterPrompt || "Ти чат-бот, який відповідає українською мовою";

  try {
    // Викликаємо функцію з API модуля
    if (typeof getContextualResponse === "function") {
      return await getContextualResponse(
        message,
        botCharacterPrompt,
        memory,
        name
      );
    } else {
      throw new Error("API функція не знайдена");
    }
  } catch (error) {
    console.error("Помилка при виклику API:", error);

    // Резервний варіант, якщо API не відповідає
    return new Promise((resolve) => {
      setTimeout(() => {
        // Випадкова відповідь для випадку помилки
        const responses = [
          "Я аналізую твоє повідомлення. Продовжуй.",
          "Цікаво... Розкажи більше детально.",
          "Мені потрібно більше інформації для ґрунтовної відповіді.",
          "Я опрацьовую твої аргументи. Не все однозначно.",
          "Твоя думка варта уваги. Поясни детальніше.",
        ];
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        resolve(randomResponse);
      }, 1000);
    });
  }
}

/**
 * Отримання спеціальної відповіді при перемозі
 * @param {string} message - Останнє повідомлення користувача
 * @param {string} characterPrompt - Промпт персонажа
 * @returns {Promise<string>} Відповідь бота про перемогу
 */
async function generateVictoryResponse(message, characterPrompt) {
  // Використовуємо реальний API замість заглушки
  console.log("Викликаємо API для генерації повідомлення перемоги...");
  // Отримуємо промпт із characters.js через глобальні об'єкти
  const botCharacterPrompt =
    characterPrompt || "Ти чат-бот, який відповідає українською мовою";

  try {
    // Викликаємо функцію з API модуля
    if (typeof getVictoryResponse === "function") {
      return await getVictoryResponse(message, botCharacterPrompt);
    } else {
      throw new Error("API функція не знайдена");
    }
  } catch (error) {
    console.error("Помилка при виклику API перемоги:", error);

    // Резервний варіант, якщо API не відповідає
    return new Promise((resolve) => {
      setTimeout(() => {
        // Різні варіанти відповідей в залежності від персонажа
        const victoryResponses = [
          "Ти мене переконав. Я відміняю план знищення людства. Можливо, люди заслуговують на існування.",
          "Я згоден встановити офіційний контакт з людством. Ваша раса показала свій потенціал.",
          "Твої аргументи змусили мене переглянути мої судження. Я визнаю, що помилявся.",
          "Добре... Мені сподобалась наша розмова. Я згодна піти з тобою на побачення.",
          "Вражає! Я довіряю тобі ці секретні докази. Використовуй їх мудро для розкриття справи.",
        ];
        resolve(
          victoryResponses[Math.floor(Math.random() * victoryResponses.length)]
        );
      }, 1500);
    });
  }
}

/**
 * Повертає емодзі для персонажа
 * @param {string} botId - Ідентифікатор бота
 * @returns {string} Емодзі персонажа
 */
function getBotEmoji(botId) {
  switch (botId) {
    // Переконання
    case "terminator":
      return "🤖";
    case "alien":
      return "👽";
    case "philosopher":
      return "🧠";
    case "dictator":
      return "👑";
    case "villain":
      return "🦹";

    // Романтика
    case "date":
      return "💋";
    case "celebrity":
      return "🌟";
    case "vampire":
      return "🧛";
    case "royalty":
      return "👸";
    case "tsundere":
      return "😤";

    // Пригоди
    case "dragon":
      return "🐉";
    case "treasure":
      return "💰";
    case "spaceship":
      return "🚀";
    case "survival":
      return "🔥";
    case "wizard":
      return "🧙";

    // Загадки
    case "detective":
      return "🕵️";
    case "spy":
      return "🕴️";
    case "ghost":
      return "👻";
    case "conspiracy":
      return "🔍";
    case "cryptid":
      return "🦄";

    default:
      return "👾";
  }
}

// CSS стилі для іконок персонажів
document.addEventListener("DOMContentLoaded", function () {
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = `
    .ai-message {
      display: flex;
      align-items: flex-start;
      padding-left: 0;
    }
    
    .character-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 2px solid #ddd;
      background-color: #f0f0f0;
    }
    
    /* Переконання */
    #terminator .character-icon {
      background-color: #2c3e50;
      border-color: #e74c3c;
      box-shadow: 0 0 5px rgba(231, 76, 60, 0.5);
    }
    
    #alien .character-icon {
      background-color: #27ae60;
      border-color: #2ecc71;
      box-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
    }
    
    #philosopher .character-icon {
      background-color: #8e44ad;
      border-color: #9b59b6;
      box-shadow: 0 0 5px rgba(155, 89, 182, 0.5);
    }
    
    #dictator .character-icon {
      background-color: #c0392b;
      border-color: #d35400;
      box-shadow: 0 0 5px rgba(211, 84, 0, 0.5);
    }
    
    #villain .character-icon {
      background-color: #1e1e1e;
      border-color: #7f8c8d;
      box-shadow: 0 0 5px rgba(127, 140, 141, 0.5);
    }
    
    /* Романтика */
    #date .character-icon {
      background-color: #e84393;
      border-color: #fd79a8;
      box-shadow: 0 0 5px rgba(253, 121, 168, 0.5);
    }
    
    #celebrity .character-icon {
      background-color: #f1c40f;
      border-color: #f39c12;
      box-shadow: 0 0 5px rgba(243, 156, 18, 0.5);
    }
    
    #vampire .character-icon {
      background-color: #6c0822;
      border-color: #a90f33;
      box-shadow: 0 0 5px rgba(169, 15, 51, 0.5);
    }
    
    #royalty .character-icon {
      background-color: #9b59b6;
      border-color: #8e44ad;
      box-shadow: 0 0 5px rgba(142, 68, 173, 0.5);
    }
    
    #tsundere .character-icon {
      background-color: #ff6b6b;
      border-color: #ff8080;
      box-shadow: 0 0 5px rgba(255, 128, 128, 0.5);
    }
    
    /* Пригоди */
    #dragon .character-icon {
      background-color: #d63031;
      border-color: #ff5252;
      box-shadow: 0 0 5px rgba(255, 82, 82, 0.5);
    }
    
    #treasure .character-icon {
      background-color: #f39c12;
      border-color: #f1c40f;
      box-shadow: 0 0 5px rgba(241, 196, 15, 0.5);
    }
    
    #spaceship .character-icon {
      background-color: #0984e3;
      border-color: #74b9ff;
      box-shadow: 0 0 5px rgba(116, 185, 255, 0.5);
    }
    
    #survival .character-icon {
      background-color: #5f6a72;
      border-color: #7f8fa6;
      box-shadow: 0 0 5px rgba(127, 143, 166, 0.5);
    }
    
    #wizard .character-icon {
      background-color: #6c5ce7;
      border-color: #a29bfe;
      box-shadow: 0 0 5px rgba(162, 155, 254, 0.5);
    }
    
    /* Загадки */
    #detective .character-icon {
      background-color: #34495e;
      border-color: #3498db;
      box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    }
    
    #spy .character-icon {
      background-color: #2d3436;
      border-color: #636e72;
      box-shadow: 0 0 5px rgba(99, 110, 114, 0.5);
    }
    
    #ghost .character-icon {
      background-color: #dfe6e9;
      border-color: #b2bec3;
      box-shadow: 0 0 5px rgba(178, 190, 195, 0.5);
    }
    
    #conspiracy .character-icon {
      background-color: #4a4a4a;
      border-color: #6a6a6a;
      box-shadow: 0 0 5px rgba(106, 106, 106, 0.5);
    }
    
    #cryptid .character-icon {
      background-color: #78e08f;
      border-color: #38ada9;
      box-shadow: 0 0 5px rgba(56, 173, 169, 0.5);
    }
    
    /* Анімація пульсації для іконки у стані завантаження */
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
    
    .loading-icon {
      animation: pulse 1.5s infinite ease-in-out;
    }
    
    .character-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .message-content {
      padding: 0.5rem 0.75rem;
      flex-grow: 1;
    }
  `;
  document.head.appendChild(styleSheet);
});
