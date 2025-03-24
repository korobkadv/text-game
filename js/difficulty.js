/**
 * Система рівнів складності для чат-гри
 */

// Конфігурація рівнів складності
const difficultyLevels = {
  easy: {
    id: "easy",
    name: "Легкий",
    description: "Більше повідомлень, простіші умови перемоги",
    messageCount: 15,
    victoryThreshold: 0.75, // Коефіцієнт зниження порогу для перемоги
    icon: "🟢",
  },
  normal: {
    id: "normal",
    name: "Середній",
    description: "Стандартний режим гри",
    messageCount: 10,
    victoryThreshold: 1, // Стандартний поріг
    icon: "🟡",
  },
  hard: {
    id: "hard",
    name: "Складний",
    description: "Менше повідомлень, складніші умови перемоги",
    messageCount: 7,
    victoryThreshold: 1.25, // Коефіцієнт підвищення порогу для перемоги
    icon: "🔴",
  },
  expert: {
    id: "expert",
    name: "Експерт",
    description: "Мінімум повідомлень, максимальна складність",
    messageCount: 5,
    victoryThreshold: 1.5, // Коефіцієнт підвищення порогу для перемоги
    icon: "⭐",
    locked: true, // Початково заблокований
    unlockRequirement: "completionist", // Потрібне досягнення для розблокування
  },
};

// Поточний рівень складності (за замовчуванням середній)
let currentDifficulty = "normal";

// Експортуємо для інших модулів
window.currentDifficulty = currentDifficulty;
window.difficultyLevels = difficultyLevels;

// Клас для управління рівнями складності
class DifficultyManager {
  constructor() {
    this.storage = "chatGameDifficulty";
    this.loadDifficultySettings();
    this.attachEventListeners();
  }

  // Завантаження налаштувань складності з локального сховища
  loadDifficultySettings() {
    const savedSettings = localStorage.getItem(this.storage);
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      this.setDifficulty(settings.currentDifficulty || "normal");

      // Розблокування рівнів складності, якщо є
      if (settings.unlockedLevels) {
        settings.unlockedLevels.forEach((levelId) => {
          if (difficultyLevels[levelId]) {
            difficultyLevels[levelId].locked = false;
          }
        });
      }
    }
  }

  // Збереження налаштувань складності в локальне сховище
  saveDifficultySettings() {
    // Збираємо розблоковані рівні складності
    const unlockedLevels = Object.keys(difficultyLevels).filter(
      (levelId) => !difficultyLevels[levelId].locked
    );

    const settings = {
      currentDifficulty,
      unlockedLevels,
    };

    localStorage.setItem(this.storage, JSON.stringify(settings));
  }

  // Встановлення рівня складності
  setDifficulty(difficultyId) {
    if (
      difficultyLevels[difficultyId] &&
      !difficultyLevels[difficultyId].locked
    ) {
      currentDifficulty = difficultyId;
      window.currentDifficulty = currentDifficulty;

      // Оновлення кількості повідомлень для всіх чатів
      this.updateMessageCounts();

      // Оновлення відображення поточного рівня складності
      this.updateDifficultyDisplay();

      // Збереження налаштувань
      this.saveDifficultySettings();

      // Відправка події зміни рівня складності
      const event = new CustomEvent("chatGame.difficultyChanged", {
        detail: { difficulty: difficultyId },
      });
      document.dispatchEvent(event);

      return true;
    }
    return false;
  }

  // Оновлення кількості повідомлень для всіх чатів відповідно до рівня складності
  updateMessageCounts() {
    const difficulty = difficultyLevels[currentDifficulty];
    if (!difficulty) return;

    const newMessageCount = difficulty.messageCount;

    // Оновлення для всіх чатів
    Object.keys(chatBots).forEach((botId) => {
      // Якщо чат ще не розпочато або скинуто
      if (chatBots[botId].memory.length <= 1) {
        chatBots[botId].messageCount = newMessageCount;

        // Оновлення відображення лічильника повідомлень
        const botElement = document.getElementById(botId);
        if (botElement) {
          const counter = botElement.querySelector(".message-counter");
          if (counter) {
            counter.textContent = `Залишилось повідомлень: ${newMessageCount}/${newMessageCount}`;
          }
        }
      }
    });

    // Оновлення константи MAX_MESSAGES для нових чатів
    window.MAX_MESSAGES = newMessageCount;
  }

  // Оновлення відображення поточного рівня складності
  updateDifficultyDisplay() {
    const difficultySelector = document.querySelector(".difficulty-selector");
    if (difficultySelector) {
      const buttons = difficultySelector.querySelectorAll(".difficulty-btn");
      buttons.forEach((button) => {
        const difficultyId = button.getAttribute("data-difficulty");

        if (difficultyId === currentDifficulty) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }

  // Розблокування рівня складності
  unlockDifficulty(difficultyId) {
    if (
      difficultyLevels[difficultyId] &&
      difficultyLevels[difficultyId].locked
    ) {
      difficultyLevels[difficultyId].locked = false;

      // Оновлення відображення кнопок складності
      this.updateDifficultyButtons();

      // Збереження налаштувань
      this.saveDifficultySettings();

      return true;
    }
    return false;
  }

  // Створення селектора рівнів складності
  createDifficultySelector() {
    const container = document.createElement("div");
    container.className = "difficulty-selector";

    const difficultyLabel = document.createElement("span");
    difficultyLabel.className = "difficulty-label";
    difficultyLabel.textContent = "Складність:";

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "difficulty-buttons";

    // Створення кнопок для кожного рівня складності
    Object.values(difficultyLevels).forEach((difficulty) => {
      const button = document.createElement("button");
      button.className = `difficulty-btn ${
        difficulty.locked ? "difficulty-locked" : ""
      }`;
      button.setAttribute("data-difficulty", difficulty.id);
      button.setAttribute(
        "title",
        `${difficulty.name}: ${difficulty.description}`
      );

      // Встановлення активного класу для поточного рівня складності
      if (difficulty.id === currentDifficulty) {
        button.classList.add("active");
      }

      button.innerHTML = `${difficulty.icon} ${difficulty.name}`;

      // Обробник кліку
      button.addEventListener("click", () => {
        if (!difficulty.locked) {
          this.setDifficulty(difficulty.id);
        } else {
          // Показати повідомлення про необхідність розблокування
          if (difficulty.unlockRequirement) {
            const requirementName =
              achievementsConfig[difficulty.unlockRequirement]?.title ||
              "певного досягнення";
            alert(
              `Для розблокування режиму "${difficulty.name}" потрібно отримати досягнення "${requirementName}"`
            );
          }
        }
      });

      buttonContainer.appendChild(button);
    });

    container.appendChild(difficultyLabel);
    container.appendChild(buttonContainer);

    return container;
  }

  // Оновлення кнопок рівнів складності
  updateDifficultyButtons() {
    const selector = document.querySelector(".difficulty-selector");
    if (!selector) return;

    const buttons = selector.querySelectorAll(".difficulty-btn");
    buttons.forEach((button) => {
      const difficultyId = button.getAttribute("data-difficulty");
      const difficulty = difficultyLevels[difficultyId];

      if (
        difficulty &&
        !difficulty.locked &&
        button.classList.contains("difficulty-locked")
      ) {
        button.classList.remove("difficulty-locked");
      }
    });
  }

  // Додавання селектора рівнів складності на сторінку
  addDifficultySelectorToPage() {
    const header = document.querySelector("header");
    if (!header) return;

    const selector = this.createDifficultySelector();
    header.appendChild(selector);
  }

  // Обробник подій досягнень для розблокування режимів
  handleAchievementUnlock(achievementId) {
    // Перевірка рівнів складності, які розблоковуються цим досягненням
    Object.values(difficultyLevels).forEach((difficulty) => {
      if (difficulty.locked && difficulty.unlockRequirement === achievementId) {
        this.unlockDifficulty(difficulty.id);

        // Показати сповіщення про розблокування
        const notification = document.createElement("div");
        notification.className = "difficulty-notification";
        notification.innerHTML = `
                    <div class="difficulty-unlock-icon">${difficulty.icon}</div>
                    <div class="difficulty-unlock-info">
                        <div class="difficulty-unlock-title">Розблоковано новий рівень складності!</div>
                        <div class="difficulty-unlock-name">${difficulty.name}</div>
                        <div class="difficulty-unlock-desc">${difficulty.description}</div>
                    </div>
                `;

        document.body.appendChild(notification);

        setTimeout(() => {
          notification.classList.add("show");
        }, 100);

        setTimeout(() => {
          notification.classList.remove("show");
          setTimeout(() => {
            notification.remove();
          }, 500);
        }, 5000);
      }
    });
  }

  // Модифікація системи перевірки перемоги з урахуванням рівня складності
  modifyVictoryCheck() {
    // Зберігаємо оригінальні функції перевірки перемоги
    Object.keys(chatBots).forEach((botId) => {
      if (
        chatBots[botId].victoryCheck &&
        !chatBots[botId].originalVictoryCheck
      ) {
        chatBots[botId].originalVictoryCheck = chatBots[botId].victoryCheck;

        // Заміщення функції перевірки перемоги з урахуванням складності
        chatBots[botId].victoryCheck = function (messages) {
          // Отримуємо результат оригінальної перевірки
          const originalResult = this.originalVictoryCheck(messages);

          // Якщо оригінальна перевірка вказує на поразку, відразу повертаємо false
          if (!originalResult) return false;

          // Отримуємо коефіцієнт складності
          const difficultyThreshold =
            difficultyLevels[currentDifficulty]?.victoryThreshold || 1;

          // В легкому режимі перевірка слабкіша, в складному - жорсткіша
          if (difficultyThreshold < 1) {
            // Легший режим - завжди перемога, якщо оригінальна перевірка пройдена
            return true;
          } else if (difficultyThreshold > 1) {
            // Складніший режим

            // Додаткова перевірка залежно від типу персонажа
            const category = Object.entries(characterCategories).find(
              ([cat, chars]) => chars.includes(botId)
            )?.[0];

            if (category === "persuasion") {
              // Для переконання потрібно більше "сумнівів" від персонажа
              let successPhrases = hintsConfig[botId]?.successPhrases || [];
              let successCount = 0;

              messages.forEach((message) => {
                if (message.sender === "ai") {
                  successPhrases.forEach((phrase) => {
                    if (
                      message.text.toLowerCase().includes(phrase.toLowerCase())
                    ) {
                      successCount++;
                    }
                  });
                }
              });

              // В складному режимі потрібно на 1-2 більше успішних фраз
              const requiredSuccess = difficultyThreshold === 1.25 ? 1 : 2;
              return successCount >= 3 + requiredSuccess;
            } else if (category === "romance" || category === "adventure") {
              // Для романтики і пригод потрібно більше згадок ключових слів
              let mentionedKeywords = 0;
              let keywordsList =
                hintsConfig[botId]?.keywords.map((k) => k.word.toLowerCase()) ||
                [];

              messages.forEach((message) => {
                if (message.sender === "user") {
                  keywordsList.forEach((keyword) => {
                    if (
                      message.text.toLowerCase().includes(keyword.toLowerCase())
                    ) {
                      mentionedKeywords++;
                    }
                  });
                }
              });

              // В складному режимі потрібно на 1-2 більше ключових слів
              const requiredKeywords = difficultyThreshold === 1.25 ? 4 : 5;
              return mentionedKeywords >= requiredKeywords;
            } else if (category === "mystery") {
              // Для загадок потрібно ще більша кількість правильних підходів
              // Комбінація перевірок на ключові слова та реакції персонажа
              let userApproaches = 0;
              let aiResponses = 0;

              let keywordsList =
                hintsConfig[botId]?.keywords.map((k) => k.word.toLowerCase()) ||
                [];
              let successPhrases = hintsConfig[botId]?.successPhrases || [];

              messages.forEach((message) => {
                if (message.sender === "user") {
                  keywordsList.forEach((keyword) => {
                    if (
                      message.text.toLowerCase().includes(keyword.toLowerCase())
                    ) {
                      userApproaches++;
                    }
                  });
                } else if (message.sender === "ai") {
                  successPhrases.forEach((phrase) => {
                    if (
                      message.text.toLowerCase().includes(phrase.toLowerCase())
                    ) {
                      aiResponses++;
                    }
                  });
                }
              });

              // Складніша комбінована перевірка
              return userApproaches >= 4 && aiResponses >= 4;
            }
          }

          // За замовчуванням - оригінальний результат
          return originalResult;
        };
      }
    });
  }

  // Приєднання обробників подій
  attachEventListeners() {
    // Обробник для розблокування рівнів складності при отриманні досягнень
    document.addEventListener("chatGame.achievementUnlocked", (event) => {
      const { achievementId } = event.detail;
      this.handleAchievementUnlock(achievementId);
    });
  }
}

// Створення екземпляра менеджера рівнів складності
const difficultyManager = new DifficultyManager();

// Ініціалізація системи рівнів складності після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  // Додаємо селектор рівнів складності на сторінку
  difficultyManager.addDifficultySelectorToPage();

  // Модифікуємо систему перевірки перемоги
  difficultyManager.modifyVictoryCheck();
});

// Модифікація функції скидання чату для правильного встановлення кількості повідомлень
const originalResetChat = window.resetChat;
window.resetChat = function (botId) {
  // Визначення кількості повідомлень відповідно до поточного рівня складності
  const messageCount = difficultyLevels[currentDifficulty]?.messageCount || 10;

  // Встановлення кількості повідомлень перед скиданням
  chatBots[botId].messageCount = messageCount;

  // Виклик оригінальної функції
  const result = originalResetChat.apply(this, arguments);

  return result;
};
