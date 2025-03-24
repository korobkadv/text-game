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
    reward: 'Збільшує кількість повідомлень у категорії "Переконання" на 2',
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
    reward: 'Збільшує кількість повідомлень у категорії "Романтика" на 2',
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
    reward: 'Збільшує кількість повідомлень у категорії "Пригоди" на 2',
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
    reward: 'Збільшує кількість повідомлень у категорії "Загадки" на 2',
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
    reward:
      "Відкриває режим швидкого діалогу з меншою кількістю повідомлень, але більшою складністю",
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
    reward: 'Відкриває режим складності "Експерт" і спеціальний титул у грі',
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
        winsByDifficulty: {
          easy: 0,
          normal: 0,
          hard: 0,
        },
        winsByLanguage: {},
        winMessagesCount: {},
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
  handleVictory(characterId, messagesUsed, difficulty = "normal") {
    const character = characterId;

    // Визначаємо категорію персонажа
    let characterCategory = null;
    Object.entries(characterCategories).forEach(([category, chars]) => {
      if (chars.includes(character)) {
        characterCategory = category;
      }
    });

    if (!characterCategory) return;

    // Оновлюємо лічильники
    this.achievements.winsPerCharacter[character] =
      (this.achievements.winsPerCharacter[character] || 0) + 1;
    this.achievements.totalWins++;

    // Рахуємо унікальні перемоги в категорії
    const uniqueWinsInCategory = Object.keys(
      this.achievements.winsPerCharacter
    ).filter((charId) => {
      const category = Object.entries(characterCategories).find(
        ([cat, chars]) => chars.includes(charId)
      )?.[0];

      return (
        category === characterCategory &&
        this.achievements.winsPerCharacter[charId] > 0
      );
    }).length;

    this.achievements.winsInCategory[characterCategory] = uniqueWinsInCategory;

    // Оновлюємо лічильник перемог за складністю
    this.achievements.winsByDifficulty[difficulty] =
      (this.achievements.winsByDifficulty[difficulty] || 0) + 1;

    // Зберігаємо кількість повідомлень, використаних для перемоги
    if (
      !this.achievements.winMessagesCount[character] ||
      messagesUsed < this.achievements.winMessagesCount[character]
    ) {
      this.achievements.winMessagesCount[character] = messagesUsed;
    }

    // Зберігаємо стан досягнень
    this.saveAchievements();

    // Оновлюємо прогрес досягнень
    this.updateAchievementsProgress();
  }

  // Оновлення прогресу всіх досягнень на основі статистики
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

    this.updateAchievementProgress("multilingual", 0);

    // Completionist - всі перемоги
    this.updateAchievementProgress(
      "completionist",
      this.achievements.totalWins
    );

    // Hardcore - перемоги у складному режимі
    const hardWins = this.achievements.winsByDifficulty.hard || 0;
    this.updateAchievementProgress("hardcore", hardWins);
  }

  // Реєстрація обробників подій
  attachEventListeners() {
    // Обробник події перемоги
    document.addEventListener("chatGame.victory", (event) => {
      const { characterId, messagesUsed, difficulty, language } = event.detail;
      this.handleVictory(characterId, messagesUsed, difficulty, language);
    });
  }
}

// Створення екземпляра менеджера досягнень
const achievementManager = new AchievementManager();

// Модифікація основної логіки гри для відстеження подій перемоги
function registerVictoryEvent(
  characterId,
  messagesUsed,
  difficulty = "normal"
) {
  // Створення і відправлення події перемоги
  const victoryEvent = new CustomEvent("chatGame.victory", {
    detail: {
      characterId,
      messagesUsed,
      difficulty,
    },
  });

  document.dispatchEvent(victoryEvent);
}

// Модифікація функції showGameSummary для виклику події перемоги
const originalShowGameSummary = window.showGameSummary;
window.showGameSummary = function (botId, isVictory) {
  // Виклик оригінальної функції
  const result = originalShowGameSummary.apply(this, arguments);

  // Якщо перемога, реєструємо подію
  if (isVictory) {
    const messagesUsed = MAX_MESSAGES - chatBots[botId].messageCount;
    const difficulty = window.currentDifficulty || "normal";

    registerVictoryEvent(botId, messagesUsed, difficulty, language);
  }

  return result;
};

// Функція для відображення панелі досягнень
function showAchievementsPanel() {
  // Отримання всіх досягнень з інформацією про їх статус
  const achievements = achievementManager.getAllAchievements();

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
                        <div class="achievement-card-icon">${
                          achievement.icon
                        }</div>
                        <div class="achievement-card-content">
                            <h4 class="achievement-card-title">${
                              achievement.title
                            }</h4>
                            <p class="achievement-card-desc">${
                              achievement.description
                            }</p>
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
                          Object.keys(
                            achievementManager.getUnlockedAchievements()
                          ).length
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

// Додавання кнопки досягнень в інтерфейс
function addAchievementsButton() {
  const header = document.querySelector("header");
  if (!header) return;

  const achievementsButton = document.createElement("button");
  achievementsButton.className = "achievements-button";
  achievementsButton.innerHTML = "🏆 Досягнення";
  achievementsButton.addEventListener("click", showAchievementsPanel);

  header.appendChild(achievementsButton);
}

// Ініціалізація системи досягнень після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  // Додаємо кнопку досягнень
  addAchievementsButton();
});
