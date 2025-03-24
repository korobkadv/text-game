/**
 * Система досягнень для чат-гри
 */

// Конфігурація досягнень
const achievementsConfig = {
  // Категорія: Переконання
  persuasion_starter: {
    id: "persuasion_starter",
    title: "Початківець у переконанні",
    description: 'Переконайте одного персонажа з категорії "Переконання"',
    icon: "🗣️",
    category: "persuasion",
    requirement: {
      type: "wins_in_category",
      category: "persuasion",
      count: 1,
    },
    reward: 'Відкриває доступ до підказок для категорії "Переконання"',
  },
  persuasion_expert: {
    id: "persuasion_expert",
    title: "Експерт з переконання",
    description:
      'Переконайте трьох різних персонажів з категорії "Переконання"',
    icon: "🎯",
    category: "persuasion",
    requirement: {
      type: "wins_in_category",
      category: "persuasion",
      count: 3,
    },
    reward: 'Відкриває додаткові підказки для категорії "Переконання"',
  },
  persuasion_master: {
    id: "persuasion_master",
    title: "Майстер переконання",
    description: 'Переконайте всіх персонажів з категорії "Переконання"',
    icon: "🏆",
    category: "persuasion",
    requirement: {
      type: "wins_in_category",
      category: "persuasion",
      count: 5,
    },
    reward: 'Відкриває секретного персонажа у категорії "Переконання"',
  },

  // Категорія: Романтика
  romance_starter: {
    id: "romance_starter",
    title: "Початківець у романтиці",
    description:
      'Запросіть одного персонажа з категорії "Романтика" на побачення',
    icon: "💌",
    category: "romance",
    requirement: {
      type: "wins_in_category",
      category: "romance",
      count: 1,
    },
    reward: 'Відкриває доступ до підказок для категорії "Романтика"',
  },
  romance_charmer: {
    id: "romance_charmer",
    title: "Чарівник сердець",
    description:
      'Запросіть трьох різних персонажів з категорії "Романтика" на побачення',
    icon: "💘",
    category: "romance",
    requirement: {
      type: "wins_in_category",
      category: "romance",
      count: 3,
    },
    reward: 'Відкриває додаткові підказки для категорії "Романтика"',
  },
  romance_master: {
    id: "romance_master",
    title: "Підкорювач сердець",
    description:
      'Запросіть всіх персонажів з категорії "Романтика" на побачення',
    icon: "💖",
    category: "romance",
    requirement: {
      type: "wins_in_category",
      category: "romance",
      count: 5,
    },
    reward: 'Відкриває секретного персонажа у категорії "Романтика"',
  },

  // Категорія: Пригоди
  adventure_starter: {
    id: "adventure_starter",
    title: "Початківець у пригодах",
    description: 'Пройдіть один сценарій з категорії "Пригоди"',
    icon: "🗺️",
    category: "adventure",
    requirement: {
      type: "wins_in_category",
      category: "adventure",
      count: 1,
    },
    reward: 'Відкриває доступ до підказок для категорії "Пригоди"',
  },
  adventure_explorer: {
    id: "adventure_explorer",
    title: "Дослідник",
    description: 'Пройдіть три різні сценарії з категорії "Пригоди"',
    icon: "🧭",
    category: "adventure",
    requirement: {
      type: "wins_in_category",
      category: "adventure",
      count: 3,
    },
    reward: 'Відкриває додаткові підказки для категорії "Пригоди"',
  },
  adventure_master: {
    id: "adventure_master",
    title: "Майстер пригод",
    description: 'Пройдіть всі сценарії з категорії "Пригоди"',
    icon: "🏝️",
    category: "adventure",
    requirement: {
      type: "wins_in_category",
      category: "adventure",
      count: 5,
    },
    reward: 'Відкриває секретного персонажа у категорії "Пригоди"',
  },

  // Категорія: Загадки
  mystery_starter: {
    id: "mystery_starter",
    title: "Початківець у загадках",
    description: 'Розгадайте одну загадку з категорії "Загадки"',
    icon: "🔍",
    category: "mystery",
    requirement: {
      type: "wins_in_category",
      category: "mystery",
      count: 1,
    },
    reward: 'Відкриває доступ до підказок для категорії "Загадки"',
  },
  mystery_detective: {
    id: "mystery_detective",
    title: "Детектив",
    description: 'Розгадайте три різні загадки з категорії "Загадки"',
    icon: "🕵️",
    category: "mystery",
    requirement: {
      type: "wins_in_category",
      category: "mystery",
      count: 3,
    },
    reward: 'Відкриває додаткові підказки для категорії "Загадки"',
  },
  mystery_master: {
    id: "mystery_master",
    title: "Майстер загадок",
    description: 'Розгадайте всі загадки з категорії "Загадки"',
    icon: "🧩",
    category: "mystery",
    requirement: {
      type: "wins_in_category",
      category: "mystery",
      count: 5,
    },
    reward: 'Відкриває секретного персонажа у категорії "Загадки"',
  },

  // Спеціальні досягнення
  fast_talker: {
    id: "fast_talker",
    title: "Швидкий переконувач",
    description:
      "Переконайте будь-якого персонажа, використавши лише 5 або менше повідомлень",
    icon: "⚡",
    category: "special",
    requirement: {
      type: "win_under_messages",
      count: 5,
    },
    reward: "Відкриває додаткові підказки для всіх категорій",
  },
  multilingual: {
    id: "multilingual",
    title: "Поліглот",
    description: "Пройдіть один сценарій у кожній доступній мові інтерфейсу",
    icon: "🌍",
    category: "special",
    requirement: {
      type: "wins_in_languages",
      count: 2, // українська та англійська
    },
    reward: "Відкриває додаткові мовні опції",
  },
  completionist: {
    id: "completionist",
    title: "Колекціонер перемог",
    description: "Переможіть у всіх сценаріях гри",
    icon: "🌟",
    category: "special",
    requirement: {
      type: "total_wins",
      count: 20,
    },
    reward: "Відкриває спеціальний титул у грі",
  },
  hardcore: {
    id: "hardcore",
    title: "Хардкорний гравець",
    description: 'Пройдіть 5 сценаріїв у режимі "Складний"',
    icon: "🔥",
    category: "special",
    requirement: {
      type: "wins_in_difficulty",
      difficulty: "hard",
      count: 5,
    },
    reward: "Відкриває унікальну тему оформлення",
  },
};

// Категорії персонажів
const characterCategories = {
  persuasion: ["terminator", "alien", "philosopher", "dictator", "villain"],
  romance: ["date", "celebrity", "vampire", "royalty", "tsundere"],
  adventure: ["dragon", "treasure", "spaceship", "survival", "wizard"],
  mystery: ["detective", "spy", "ghost", "conspiracy", "cryptid"],
};

// Клас для управління досягненнями
class AchievementManager {
  constructor() {
    this.achievements = {};
    this.storage = "chatGameAchievements";
    this.loadAchievements();
    this.attachEventListeners();
  }

  // Завантаження досягнень з локального сховища
  loadAchievements() {
    const savedData = localStorage.getItem(this.storage);
    if (savedData) {
      this.achievements = JSON.parse(savedData);
    } else {
      // Ініціалізація порожніх даних досягнень
      this.achievements = {
        unlocked: {},
        progress: {},
        winsInCategory: {
          persuasion: 0,
          romance: 0,
          adventure: 0,
          mystery: 0,
        },
        winsPerCharacter: {},
        totalWins: 0,
        winsByLanguage: {},
        winMessagesCount: {},
        totalMessages: 0,
        averageMessages: 0,
      };

      // Ініціалізація прогресу для всіх досягнень
      Object.keys(achievementsConfig).forEach((achievementId) => {
        this.achievements.progress[achievementId] = 0;
      });

      // Ініціалізація даних для всіх персонажів
      Object.values(characterCategories)
        .flat()
        .forEach((charId) => {
          this.achievements.winsPerCharacter[charId] = 0;
        });

      this.saveAchievements();
    }
  }

  // Збереження досягнень в локальне сховище
  saveAchievements() {
    localStorage.setItem(this.storage, JSON.stringify(this.achievements));
  }

  // Отримання всіх досягнень з інформацією про їх статус
  getAllAchievements() {
    const result = {};

    Object.keys(achievementsConfig).forEach((achievementId) => {
      const achievement = { ...achievementsConfig[achievementId] };

      // Додаємо статус розблокування та прогрес
      achievement.unlocked = !!this.achievements.unlocked[achievementId];
      achievement.progress = this.achievements.progress[achievementId] || 0;
      achievement.progressMax = achievement.requirement.count;
      achievement.progressPercent = Math.min(
        100,
        Math.round((achievement.progress / achievement.progressMax) * 100)
      );

      result[achievementId] = achievement;
    });

    return result;
  }

  // Перевірка чи досягнення розблоковано
  isAchievementUnlocked(achievementId) {
    return !!this.achievements.unlocked[achievementId];
  }

  // Отримання розблокованих досягнень
  getUnlockedAchievements() {
    const unlocked = {};
    Object.keys(this.achievements.unlocked).forEach((achievementId) => {
      if (
        this.achievements.unlocked[achievementId] &&
        achievementsConfig[achievementId]
      ) {
        unlocked[achievementId] = {
          ...achievementsConfig[achievementId],
          unlockDate: this.achievements.unlocked[achievementId],
        };
      }
    });
    return unlocked;
  }

  // Розблокування досягнення
  unlockAchievement(achievementId) {
    if (
      !this.isAchievementUnlocked(achievementId) &&
      achievementsConfig[achievementId]
    ) {
      // Позначаємо досягнення як розблоковане із зазначенням дати
      this.achievements.unlocked[achievementId] = new Date().toISOString();

      // Застосовуємо нагороди за досягнення
      this.applyAchievementReward(achievementId);

      // Зберігаємо зміни
      this.saveAchievements();

      // Показуємо сповіщення
      this.showAchievementNotification(achievementId);

      return true;
    }
    return false;
  }

  // Застосування нагороди за досягнення
  applyAchievementReward(achievementId) {
    const achievement = achievementsConfig[achievementId];
    if (!achievement) return;

    // Тут логіка застосування різних типів нагород
    // Наприклад, збільшення кількості повідомлень для категорії

    console.log(`Applied reward for achievement: ${achievement.title}`);
  }

  // Показ сповіщення про розблокування досягнення
  showAchievementNotification(achievementId) {
    const achievement = achievementsConfig[achievementId];
    if (!achievement) return;

    // Створюємо елемент сповіщення
    const notification = document.createElement("div");
    notification.className = "achievement-notification";

    notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">Досягнення розблоковано!</div>
                <div class="achievement-name">${achievement.title}</div>
                <div class="achievement-desc">${achievement.description}</div>
                <div class="achievement-reward">Нагорода: ${achievement.reward}</div>
            </div>
        `;

    // Додаємо на сторінку
    document.body.appendChild(notification);

    // Анімація появи
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Автоматичне приховування через деякий час
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 500);
    }, 5000);
  }

  // Оновлення прогресу досягнення
  updateAchievementProgress(achievementId, progress) {
    if (achievementsConfig[achievementId]) {
      this.achievements.progress[achievementId] = progress;

      // Перевіряємо, чи досягнення виконано
      if (progress >= achievementsConfig[achievementId].requirement.count) {
        this.unlockAchievement(achievementId);
      }

      this.saveAchievements();
    }
  }

  // Обробка перемоги в сценарії
  handleVictory(characterId, messagesUsed) {
    this.achievements.totalWins++;
    this.achievements.winsPerCharacter[characterId] =
      (this.achievements.winsPerCharacter[characterId] || 0) + 1;
    this.achievements.totalMessages += messagesUsed;
    this.achievements.averageMessages =
      this.achievements.totalMessages / this.achievements.totalWins;

    this.saveAchievements();
    this.checkAchievements();
  }

  // Оновлюємо прогрес всіх досягнень на основі статистики
  updateAchievementsProgress() {
    // Перевіряємо досягнення категорій
    Object.entries(this.achievements.winsInCategory).forEach(
      ([category, wins]) => {
        // Оновлюємо прогрес стартерів
        this.updateAchievementProgress(`${category}_starter`, wins);

        // Оновлюємо прогрес експертів/дослідників
        if (wins >= 1) {
          let expertId;
          if (category === "persuasion") expertId = "persuasion_expert";
          else if (category === "romance") expertId = "romance_charmer";
          else if (category === "adventure") expertId = "adventure_explorer";
          else if (category === "mystery") expertId = "mystery_detective";

          if (expertId) this.updateAchievementProgress(expertId, wins);
        }

        // Оновлюємо прогрес майстрів
        if (wins >= 3) {
          this.updateAchievementProgress(`${category}_master`, wins);
        }
      }
    );

    // Спеціальні досягнення

    // Fast Talker - перемога з 5 або менше повідомлень
    const fastWins = Object.values(this.achievements.winMessagesCount).filter(
      (count) => count <= 5
    ).length;
    this.updateAchievementProgress("fast_talker", fastWins > 0 ? 1 : 0);

    // Completionist - всі перемоги
    this.updateAchievementProgress(
      "completionist",
      this.achievements.totalWins
    );
  }

  // Реєстрація обробників подій
  attachEventListeners() {
    // Обробник події перемоги
    document.addEventListener("chatGame.victory", (event) => {
      const { characterId, messagesUsed, difficulty, language } = event.detail;
      this.handleVictory(characterId, messagesUsed, difficulty, language);
    });
  }

  // Перевірка досягнень після скидання
  checkAchievements(botId) {
    // Перевіряємо "Перша перемога"
    if (!this.isAchievementUnlocked("first_victory")) {
      this.unlockAchievement("first_victory");
    }

    // Перевіряємо "Мастер переконання"
    const victories = JSON.parse(localStorage.getItem("victories") || "{}");
    const totalVictories = Object.keys(victories).length;
    if (
      totalVictories >= 5 &&
      !this.isAchievementUnlocked("master_persuasion")
    ) {
      this.unlockAchievement("master_persuasion");
    }

    // Перевіряємо "Легенда"
    const allScenarios = [
      "terminator",
      "alien",
      "philosopher",
      "dictator",
      "villain",
      "date",
      "celebrity",
      "vampire",
      "royalty",
      "tsundere",
      "dragon",
      "treasure",
      "spaceship",
      "survival",
      "wizard",
      "detective",
      "spy",
      "ghost",
      "conspiracy",
      "cryptid",
    ];

    const allVictories = allScenarios.every((scenario) => victories[scenario]);
    if (allVictories && !this.isAchievementUnlocked("legend")) {
      this.unlockAchievement("legend");
    }
  }

  // Оновлюємо відображення досягнень
  updateAchievementsDisplay() {
    // Отримання всіх досягнень з інформацією про їх статус
    const achievements = this.getAllAchievements();

    // Створення елемента модального вікна
    const modalElement = document.createElement("div");
    modalElement.className = "achievements-modal";

    // Групування досягнень за категоріями
    const categorizedAchievements = {
      persuasion: [],
      romance: [],
      adventure: [],
      mystery: [],
      special: [],
    };

    Object.values(achievements).forEach((achievement) => {
      if (categorizedAchievements[achievement.category]) {
        categorizedAchievements[achievement.category].push(achievement);
      }
    });

    // Формування HTML для кожної категорії
    let achievementsHTML = "";

    Object.entries(categorizedAchievements).forEach(([category, items]) => {
      if (items.length > 0) {
        const categoryTitle =
          category.charAt(0).toUpperCase() + category.slice(1);

        achievementsHTML += `
          <div class="achievements-category">
            <h3 class="achievements-category-title">${categoryTitle}</h3>
            <div class="achievements-grid">
        `;

        items.forEach((achievement) => {
          const lockedClass = achievement.unlocked ? "" : "achievement-locked";

          achievementsHTML += `
            <div class="achievement-card ${lockedClass}">
              <div class="achievement-card-icon">${achievement.icon}</div>
              <div class="achievement-card-content">
                <h4 class="achievement-card-title">${achievement.title}</h4>
                <p class="achievement-card-desc">${achievement.description}</p>
                <div class="achievement-card-progress">
                  <div class="achievement-progress-bar">
                    <div class="achievement-progress-fill" style="width: ${
                      achievement.progressPercent
                    }%"></div>
                  </div>
                  <div class="achievement-progress-text">${
                    achievement.progress
                  }/${achievement.progressMax}</div>
                </div>
                ${
                  achievement.unlocked
                    ? `<div class="achievement-card-reward">Нагорода: ${achievement.reward}</div>`
                    : ""
                }
              </div>
            </div>
          `;
        });

        achievementsHTML += `
            </div>
          </div>
        `;
      }
    });

    // Формування повного HTML модального вікна
    modalElement.innerHTML = `
      <div class="achievements-modal-content">
        <div class="achievements-modal-header">
          <h2>Досягнення</h2>
          <button class="achievements-close-btn">&times;</button>
        </div>
        <div class="achievements-modal-body">
          <div class="achievements-summary">
            <div class="achievements-total">
              <span class="achievements-total-count">${
                Object.keys(this.getUnlockedAchievements()).length
              }</span>
              <span class="achievements-total-text">/${
                Object.keys(achievementsConfig).length
              } досягнень розблоковано</span>
            </div>
          </div>
          <div class="achievements-list">
            ${achievementsHTML}
          </div>
        </div>
      </div>
    `;

    // Додавання модального вікна на сторінку
    document.body.appendChild(modalElement);

    // Обробник закриття модального вікна
    modalElement
      .querySelector(".achievements-close-btn")
      .addEventListener("click", () => {
        modalElement.classList.add("closing");
        setTimeout(() => {
          modalElement.remove();
        }, 300);
      });

    // Клік поза вмістом закриває модальне вікно
    modalElement.addEventListener("click", (e) => {
      if (e.target === modalElement) {
        modalElement.classList.add("closing");
        setTimeout(() => {
          modalElement.remove();
        }, 300);
      }
    });

    // Анімація появи
    setTimeout(() => {
      modalElement.classList.add("active");
    }, 10);
  }
}

// Створення екземпляра менеджера досягнень
const achievementManager = new AchievementManager();

// Модифікація основної логіки гри для відстеження подій перемоги
function registerVictoryEvent(botId, messagesUsed) {
  const event = new CustomEvent("victory", {
    detail: {
      characterId: botId,
      messagesUsed: messagesUsed,
    },
  });
  document.dispatchEvent(event);
}

// Модифікація функції showGameSummary для виклику події перемоги
const originalShowGameSummary = window.showGameSummary;
window.showGameSummary = function (botId, isVictory) {
  // Виклик оригінальної функції
  const result = originalShowGameSummary.apply(this, arguments);

  // Якщо перемога, реєструємо подію
  if (isVictory) {
    const messagesUsed = MAX_MESSAGES - chatBots[botId].messageCount;

    registerVictoryEvent(botId, messagesUsed);
  }

  return result;
};

// Ініціалізація системи досягнень після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  // Оновлюємо стан досягнень без показу модального вікна
  achievementManager.updateAchievementsProgress();
});

// Модифікація функції скидання чату для перевірки досягнень
if (typeof window.originalResetChat === "undefined") {
  window.originalResetChat = window.resetChat;
}

window.resetChat = function (botId) {
  // Виклик оригінальної функції
  const result = window.originalResetChat.apply(this, arguments);

  // Перевірка досягнень після скидання
  achievementManager.checkAchievements(botId);

  return result;
};

/**
 * Глобальна функція для показу досягнень
 */
window.showAchievements = function () {
  const achievementsModal = document.getElementById("achievementsModal");
  achievementsModal.classList.add("active");
  updateAchievements();
};
