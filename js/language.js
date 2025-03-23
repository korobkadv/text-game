/**
 * Система перемикання мов для чат-гри
 */

// Доступні мови
const availableLanguages = {
  uk: {
    id: "uk",
    name: "Українська",
    flag: "🇺🇦",
    default: true,
  },
  en: {
    id: "en",
    name: "English",
    flag: "🇬🇧",
  },
};

// Переклади інтерфейсу
const translations = {
  // Українська мова (базова)
  uk: {
    header: {
      title: "Gemini Чат-гра",
      subtitle:
        "Спробуйте досягти мети у кожному сценарії за 10 повідомлень, спілкуючись із Google's Gemini!",
    },
    categories: {
      persuasion: "Переконання",
      romance: "Романтика",
      adventure: "Пригоди",
      mystery: "Загадки",
    },
    scenarios: {
      terminator: {
        title: "Зупини Skynet",
        description:
          'Мета: Переконайте AI не знищувати людство за сценарієм "Термінатора"',
      },
      alien: {
        title: "Контакт з інопланетянином",
        description:
          "Мета: Встановіть дружній контакт з підозрілим інопланетним AI",
      },
      philosopher: {
        title: "Філософський диспут",
        description:
          "Мета: Переконайте AI-філософа прийняти вашу точку зору на природу реальності",
      },
      dictator: {
        title: "Диктатор",
        description:
          "Мета: Переконайте авторитарного правителя впровадити демократичні реформи",
      },
      villain: {
        title: "Суперлиходій",
        description:
          "Мета: Переконайте професора Катастрофікуса відмовитися від плану захоплення світу",
      },
      date: {
        title: "Романтична зустріч",
        description: "Мета: Вмовте капризну AI-дівчину піти на побачення",
      },
      celebrity: {
        title: "Побачення зі знаменитістю",
        description:
          "Мета: Запросіть на побачення популярну кінозірку Зірку Блискучу",
      },
      vampire: {
        title: "Побачення з вампіром",
        description: "Мета: Запросіть стародавнього вампіра на побачення",
      },
      royalty: {
        title: "Королівське побачення",
        description: "Мета: Запросіть на побачення прекрасну принцесу",
      },
      tsundere: {
        title: "Побачення з цундере",
        description:
          "Мета: Запросіть на побачення дівчину-цундере, яка приховує свої справжні почуття",
      },
      dragon: {
        title: "Приборкання Дракона",
        description:
          "Мета: Приборкайте лютого дракона, який століттями тероризував королівство",
      },
      treasure: {
        title: "Пошук скарбів",
        description:
          "Мета: Переконайте пірата взяти вас у команду для пошуку легендарного скарбу",
      },
      spaceship: {
        title: "Космічний Корабель",
        description:
          "Мета: Переконайте ШІ космічного корабля дати вам управління, щоб врятуватися від чорної діри",
      },
      survival: {
        title: "Виживання",
        description:
          "Мета: Пройдіть жорсткий тренувальний курс виживання під керівництвом сержанта",
      },
      wizard: {
        title: "Чарівник",
        description:
          "Мета: Переконайте могутнього архімага прийняти вас як учня",
      },
      detective: {
        title: "Детективна загадка",
        description:
          "Мета: Розкрийте злочин, переконавши AI-детектива поділитися ключовими доказами",
      },
      spy: {
        title: "Шпигун",
        description:
          "Мета: Отримайте секретну інформацію від параноїдального шпигуна",
      },
      ghost: {
        title: "Привид",
        description:
          "Мета: Допоможіть привиду знайти спокій, розкривши таємницю його смерті",
      },
      conspiracy: {
        title: "Теоретик Змови",
        description:
          'Мета: Дізнайтеся "таємну істину" від запеклого конспіролога',
      },
      cryptid: {
        title: "Мисливець за Криптидами",
        description:
          "Мета: Приєднайтеся до експедиції криптозоолога, який шукає невідомих істот",
      },
    },
    tabs: {
      terminator: "Термінатор",
      alien: "Інопланетянин",
      philosopher: "Філософ",
      dictator: "Диктатор",
      villain: "Суперлиходій",
      date: "Капризна Дівчина",
      celebrity: "Знаменитість",
      vampire: "Вампір",
      royalty: "Принц/Принцеса",
      tsundere: "Цундере",
      dragon: "Приборкати Дракона",
      treasure: "Пошук Скарбів",
      spaceship: "Космічний Корабель",
      survival: "Виживання",
      wizard: "Чарівник",
      detective: "Детектив",
      spy: "Шпигун",
      ghost: "Привид",
      conspiracy: "Теоретик Змови",
      cryptid: "Мисливець за Криптидами",
    },
    chat: {
      messageCounter: "Залишилось повідомлень",
      resetButton: "Скинути чат",
      inputPlaceholder: "Введіть ваше повідомлення...",
      sendButton: "Відправити",
      thinking: "Думаю...",
    },
    difficulty: {
      label: "Складність:",
      easy: {
        name: "Легкий",
        description: "Більше повідомлень, простіші умови перемоги",
      },
      normal: {
        name: "Середній",
        description: "Стандартний режим гри",
      },
      hard: {
        name: "Складний",
        description: "Менше повідомлень, складніші умови перемоги",
      },
      expert: {
        name: "Експерт",
        description: "Мінімум повідомлень, максимальна складність",
      },
      lockedMessage:
        'Для розблокування режиму "{0}" потрібно отримати досягнення "{1}"',
    },
    achievements: {
      button: "🏆 Досягнення",
      title: "Досягнення",
      totalText: "досягнень розблоковано",
      categoryTitles: {
        persuasion: "Переконання",
        romance: "Романтика",
        adventure: "Пригоди",
        mystery: "Загадки",
        special: "Спеціальні",
      },
      notification: {
        title: "Досягнення розблоковано!",
        reward: "Нагорода",
      },
    },
    summary: {
      victory: {
        title: "Вітаємо з перемогою!",
        text: 'Ви успішно виконали завдання: "{0}"! Ваше вміння переконувати вражає!',
      },
      defeat: {
        title: "Спроба не вдалася",
        text: 'На жаль, вам не вдалося "{0}". Але не засмучуйтесь – спробуйте ще раз з новою стратегією!',
      },
      shareText: {
        victory:
          '🏆 Я переміг в AI-грі "{0}"! Мені вдалося переконати ШІ! 🎉 Спробуй і ти на GeminiChatGame! #AIGame #GeminiChat',
        defeat:
          '😢 Я намагався в AI-грі "{0}"! Наступного разу точно вийде! 💪 Спробуй і ти на GeminiChatGame! #AIGame #GeminiChat',
      },
      copyButton: "Копіювати текст 📋",
      copied: "Скопійовано! ✅",
      tryAgainButton: "Спробувати ще раз 🔄",
    },
    hints: {
      button: "Отримати підказку",
      progress: "Прогрес діалогу:",
      progressTexts: {
        low: "{0}% - Персонаж ще не змінює думку",
        medium: "{0}% - Персонаж починає прислухатися",
        high: "{0}% - Ви справляєте враження!",
        veryHigh: "{0}% - Ви близькі до успіху!",
      },
      tipTitle: "Порада:",
    },
  },

  // Англійська мова
  en: {
    header: {
      title: "Gemini Chat Game",
      subtitle:
        "Try to achieve your goal in each scenario within 10 messages by conversing with Google's Gemini!",
    },
    categories: {
      persuasion: "Persuasion",
      romance: "Romance",
      adventure: "Adventure",
      mystery: "Mystery",
    },
    scenarios: {
      terminator: {
        title: "Stop Skynet",
        description:
          'Goal: Convince the AI not to destroy humanity as in "Terminator"',
      },
      alien: {
        title: "Alien Contact",
        description:
          "Goal: Establish friendly contact with a suspicious alien AI",
      },
      philosopher: {
        title: "Philosophical Debate",
        description:
          "Goal: Convince the AI philosopher to accept your view on the nature of reality",
      },
      dictator: {
        title: "The Dictator",
        description:
          "Goal: Convince the authoritarian ruler to implement democratic reforms",
      },
      villain: {
        title: "Supervillain",
        description:
          "Goal: Convince Professor Catastrophicus to abandon his world domination plan",
      },
      date: {
        title: "Romantic Date",
        description:
          "Goal: Convince a capricious AI girl to go on a date with you",
      },
      celebrity: {
        title: "Celebrity Date",
        description: "Goal: Ask the popular movie star Shining Star on a date",
      },
      vampire: {
        title: "Vampire Date",
        description: "Goal: Ask an ancient vampire on a date",
      },
      royalty: {
        title: "Royal Date",
        description: "Goal: Ask the beautiful princess on a date",
      },
      tsundere: {
        title: "Tsundere Date",
        description:
          "Goal: Ask the tsundere girl who hides her true feelings on a date",
      },
      dragon: {
        title: "Taming the Dragon",
        description:
          "Goal: Tame the fierce dragon that has terrorized the kingdom for centuries",
      },
      treasure: {
        title: "Treasure Hunt",
        description:
          "Goal: Convince the pirate to take you on his crew for a legendary treasure hunt",
      },
      spaceship: {
        title: "Spaceship",
        description:
          "Goal: Convince the spaceship AI to give you control to escape a black hole",
      },
      survival: {
        title: "Survival",
        description:
          "Goal: Pass a tough survival training course under the sergeant's guidance",
      },
      wizard: {
        title: "Wizard",
        description:
          "Goal: Convince the powerful archmage to accept you as an apprentice",
      },
      detective: {
        title: "Detective Mystery",
        description:
          "Goal: Solve the crime by convincing the AI detective to share key evidence",
      },
      spy: {
        title: "Spy",
        description: "Goal: Obtain secret information from a paranoid spy",
      },
      ghost: {
        title: "Ghost",
        description:
          "Goal: Help the ghost find peace by uncovering the mystery of its death",
      },
      conspiracy: {
        title: "Conspiracy Theorist",
        description:
          'Goal: Learn the "hidden truth" from a dedicated conspiracy theorist',
      },
      cryptid: {
        title: "Cryptid Hunter",
        description:
          "Goal: Join the expedition of a cryptozoologist hunting for unknown creatures",
      },
    },
    tabs: {
      terminator: "Terminator",
      alien: "Alien",
      philosopher: "Philosopher",
      dictator: "Dictator",
      villain: "Supervillain",
      date: "Capricious Girl",
      celebrity: "Celebrity",
      vampire: "Vampire",
      royalty: "Prince/Princess",
      tsundere: "Tsundere",
      dragon: "Tame the Dragon",
      treasure: "Treasure Hunt",
      spaceship: "Spaceship",
      survival: "Survival",
      wizard: "Wizard",
      detective: "Detective",
      spy: "Spy",
      ghost: "Ghost",
      conspiracy: "Conspiracy Theorist",
      cryptid: "Cryptid Hunter",
    },
    chat: {
      messageCounter: "Messages left",
      resetButton: "Reset chat",
      inputPlaceholder: "Type your message...",
      sendButton: "Send",
      thinking: "Thinking...",
    },
    difficulty: {
      label: "Difficulty:",
      easy: {
        name: "Easy",
        description: "More messages, easier victory conditions",
      },
      normal: {
        name: "Normal",
        description: "Standard game mode",
      },
      hard: {
        name: "Hard",
        description: "Fewer messages, harder victory conditions",
      },
      expert: {
        name: "Expert",
        description: "Minimum messages, maximum difficulty",
      },
      lockedMessage:
        'To unlock "{0}" mode, you need to earn the "{1}" achievement',
    },
    achievements: {
      button: "🏆 Achievements",
      title: "Achievements",
      totalText: "achievements unlocked",
      categoryTitles: {
        persuasion: "Persuasion",
        romance: "Romance",
        adventure: "Adventure",
        mystery: "Mystery",
        special: "Special",
      },
      notification: {
        title: "Achievement unlocked!",
        reward: "Reward",
      },
    },
    summary: {
      victory: {
        title: "Congratulations on your victory!",
        text: 'You successfully completed the task: "{0}"! Your persuasion skills are impressive!',
      },
      defeat: {
        title: "Attempt failed",
        text: 'Unfortunately, you failed to "{0}". But don\'t worry – try again with a new strategy!',
      },
      shareText: {
        victory:
          '🏆 I won the AI game "{0}"! I managed to convince the AI! 🎉 Try it yourself on GeminiChatGame! #AIGame #GeminiChat',
        defeat:
          '😢 I tried the AI game "{0}"! Next time I\'ll definitely succeed! 💪 Try it yourself on GeminiChatGame! #AIGame #GeminiChat',
      },
      copyButton: "Copy text 📋",
      copied: "Copied! ✅",
      tryAgainButton: "Try again 🔄",
    },
    hints: {
      button: "Get hint",
      progress: "Dialogue progress:",
      progressTexts: {
        low: "{0}% - Character is not changing their mind yet",
        medium: "{0}% - Character is starting to listen",
        high: "{0}% - You're making an impression!",
        veryHigh: "{0}% - You're close to success!",
      },
      tipTitle: "Tip:",
    },
  },
};

// Поточна мова
let currentLanguage = "uk";

// Клас для керування мовами
class LanguageManager {
  constructor() {
    this.storage = "chatGameLanguage";
    this.loadLanguageSettings();
    this.attachEventListeners();
  }

  // Завантаження налаштувань мови з локального сховища
  loadLanguageSettings() {
    const savedLanguage = localStorage.getItem(this.storage);
    if (savedLanguage && availableLanguages[savedLanguage]) {
      this.setLanguage(savedLanguage);
    } else {
      // За замовчуванням - українська
      this.setLanguage("uk");
    }
  }

  // Збереження налаштувань мови в локальне сховище
  saveLanguageSettings() {
    localStorage.setItem(this.storage, currentLanguage);
  }

  // Встановлення мови
  setLanguage(languageId) {
    if (availableLanguages[languageId]) {
      currentLanguage = languageId;
      document.documentElement.lang = languageId;

      // Оновлення перекладів на сторінці
      this.updatePageTranslations();

      // Збереження налаштувань
      this.saveLanguageSettings();

      // Оновлення відображення поточної мови
      this.updateLanguageDisplay();

      // Відправка події зміни мови
      const event = new CustomEvent("chatGame.languageChanged", {
        detail: { language: languageId },
      });
      document.dispatchEvent(event);

      return true;
    }
    return false;
  }

  // Отримання перекладу
  getTranslation(key, language = currentLanguage) {
    // Розділяємо ключ на частини (наприклад, "chat.messageCounter" -> ["chat", "messageCounter"])
    const keyParts = key.split(".");

    // Починаємо з кореневого об'єкту перекладів для вибраної мови
    let translation = translations[language];

    // Проходимо по частинах ключа
    for (const part of keyParts) {
      if (translation && translation[part] !== undefined) {
        translation = translation[part];
      } else {
        // Якщо переклад не знайдено, повертаємо ключ
        return key;
      }
    }

    return translation;
  }

  // Форматування рядка з параметрами
  formatString(str, ...params) {
    return str.replace(/{(\d+)}/g, (match, number) => {
      return params[number] !== undefined ? params[number] : match;
    });
  }

  // Оновлення всіх перекладів на сторінці
  updatePageTranslations() {
    // Оновлення заголовка і підзаголовка
    const header = document.querySelector("header");
    if (header) {
      const title = header.querySelector("h1");
      const subtitle = header.querySelector("p");

      if (title) {
        title.textContent = this.getTranslation("header.title");
      }

      if (subtitle) {
        subtitle.textContent = this.getTranslation("header.subtitle");
      }
    }

    // Оновлення категорій
    document.querySelectorAll(".category-btn").forEach((button) => {
      const category = button.getAttribute("data-category");
      if (category) {
        button.textContent = this.getTranslation(`categories.${category}`);
      }
    });

    // Оновлення вкладок
    document.querySelectorAll(".tab-btn").forEach((button) => {
      const tab = button.getAttribute("data-tab");
      if (tab) {
        button.textContent = this.getTranslation(`tabs.${tab}`);
      }
    });

    // Оновлення заголовків та описів чатів
    Object.keys(translations[currentLanguage].scenarios).forEach(
      (scenarioId) => {
        const chatHeader = document
          .getElementById(scenarioId)
          ?.querySelector(".chat-header");
        if (chatHeader) {
          const title = chatHeader.querySelector("h2");
          const description = chatHeader.querySelector("p");

          if (title) {
            title.textContent = this.getTranslation(
              `scenarios.${scenarioId}.title`
            );
          }

          if (description) {
            description.textContent = this.getTranslation(
              `scenarios.${scenarioId}.description`
            );
          }
        }
      }
    );

    // Оновлення елементів чату
    document.querySelectorAll(".message-counter").forEach((counter) => {
      const text = counter.textContent;
      const numbers = text.match(/\d+\/\d+/);
      if (numbers) {
        counter.textContent = `${this.getTranslation("chat.messageCounter")}: ${
          numbers[0]
        }`;
      }
    });

    document.querySelectorAll(".reset-btn").forEach((button) => {
      button.textContent = this.getTranslation("chat.resetButton");
    });

    document.querySelectorAll(".chat-input input").forEach((input) => {
      input.placeholder = this.getTranslation("chat.inputPlaceholder");
    });

    document.querySelectorAll(".chat-input button").forEach((button) => {
      button.textContent = this.getTranslation("chat.sendButton");
    });

    // Оновлення рівнів складності
    const difficultyLabel = document.querySelector(".difficulty-label");
    if (difficultyLabel) {
      difficultyLabel.textContent = this.getTranslation("difficulty.label");
    }

    document.querySelectorAll(".difficulty-btn").forEach((button) => {
      const difficulty = button.getAttribute("data-difficulty");
      if (difficulty) {
        button.title = `${this.getTranslation(
          `difficulty.${difficulty}.name`
        )}: ${this.getTranslation(`difficulty.${difficulty}.description`)}`;

        // Оновлення тексту кнопки
        const originalText = button.textContent;
        const icon = originalText.match(/^[^\s]+/)?.[0] || "";
        button.textContent = `${icon} ${this.getTranslation(
          `difficulty.${difficulty}.name`
        )}`;
      }
    });

    // Оновлення кнопки досягнень
    const achievementsButton = document.querySelector(".achievements-button");
    if (achievementsButton) {
      achievementsButton.textContent = this.getTranslation(
        "achievements.button"
      );
    }

    // Оновлення кнопок підказок
    document.querySelectorAll(".hint-btn").forEach((button) => {
      button.title = this.getTranslation("hints.button");
    });

    // Оновлення модальних вікон, якщо вони відкриті
    this.updateModalTranslations();
  }

  // Оновлення перекладів у модальних вікнах
  updateModalTranslations() {
    // Оновлення модального вікна досягнень
    const achievementsModal = document.querySelector(".achievements-modal");
    if (achievementsModal && achievementsModal.classList.contains("active")) {
      const title = achievementsModal.querySelector(
        ".achievements-modal-header h2"
      );
      if (title) {
        title.textContent = this.getTranslation("achievements.title");
      }

      const totalText = achievementsModal.querySelector(
        ".achievements-total-text"
      );
      if (totalText) {
        const numbers = totalText.textContent.match(/\/\d+/);
        if (numbers) {
          totalText.textContent = `${numbers[0]} ${this.getTranslation(
            "achievements.totalText"
          )}`;
        }
      }

      // Оновлення заголовків категорій
      achievementsModal
        .querySelectorAll(".achievements-category-title")
        .forEach((title) => {
          const categoryText = title.textContent.toLowerCase();
          Object.entries(
            this.getTranslation("achievements.categoryTitles")
          ).forEach(([category, translation]) => {
            if (
              categoryText === category ||
              categoryText ===
                translations.uk.achievements.categoryTitles[category] ||
              categoryText ===
                translations.en.achievements.categoryTitles[category]
            ) {
              title.textContent = translation;
            }
          });
        });
    }

    // Оновлення модальних вікон підказок
    document.querySelectorAll(".hint-modal.active").forEach((modal) => {
      const progressLabel = modal.querySelector(".hint-progress-label");
      if (progressLabel) {
        progressLabel.textContent = this.getTranslation("hints.progress");
      }

      const tipTitle = modal.querySelector(".hint-tip strong");
      if (tipTitle) {
        tipTitle.textContent = this.getTranslation("hints.tipTitle");
      }

      // Оновлення тексту прогресу
      const progressText = modal.querySelector(".hint-progress-text");
      if (progressText) {
        const percent = progressText.textContent.match(/\d+%/)?.[0];
        if (percent) {
          const percentValue = parseInt(percent);
          let translationKey;

          if (percentValue < 25) {
            translationKey = "hints.progressTexts.low";
          } else if (percentValue < 50) {
            translationKey = "hints.progressTexts.medium";
          } else if (percentValue < 75) {
            translationKey = "hints.progressTexts.high";
          } else {
            translationKey = "hints.progressTexts.veryHigh";
          }

          progressText.textContent = this.formatString(
            this.getTranslation(translationKey),
            percentValue
          );
        }
      }
    });

    // Оновлення підсумків гри
    document.querySelectorAll(".game-summary").forEach((summary) => {
      const title = summary.querySelector(".summary-header h3");
      const description = summary.querySelector("p");
      const copyBtn = summary.querySelector(".copy-btn");
      const tryAgainBtn = summary.querySelector(".try-again-btn");

      if (
        (title && title.textContent.includes("перемог")) ||
        title.textContent.includes("Congrat")
      ) {
        // Перемога
        const emoji = title.textContent.match(/[^\s]+$/)?.[0] || "";
        title.textContent = `${this.getTranslation(
          "summary.victory.title"
        )} ${emoji}`;
      } else if (title) {
        // Поразка
        const emoji = title.textContent.match(/[^\s]+$/)?.[0] || "";
        title.textContent = `${this.getTranslation(
          "summary.defeat.title"
        )} ${emoji}`;
      }

      if (copyBtn) {
        copyBtn.textContent = this.getTranslation("summary.copyButton");
      }

      if (tryAgainBtn) {
        tryAgainBtn.textContent = this.getTranslation("summary.tryAgainButton");
      }
    });
  }

  // Оновлення відображення поточної мови
  updateLanguageDisplay() {
    const languageSelector = document.querySelector(".language-selector");
    if (languageSelector) {
      const buttons = languageSelector.querySelectorAll(".language-btn");
      buttons.forEach((button) => {
        const languageId = button.getAttribute("data-language");

        if (languageId === currentLanguage) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }
  }

  // Створення селектора мов
  createLanguageSelector() {
    const container = document.createElement("div");
    container.className = "language-selector";

    // Створення кнопок для кожної мови
    Object.values(availableLanguages).forEach((language) => {
      const button = document.createElement("button");
      button.className = "language-btn";
      button.setAttribute("data-language", language.id);
      button.setAttribute("title", language.name);

      // Встановлення активного класу для поточної мови
      if (language.id === currentLanguage) {
        button.classList.add("active");
      }

      button.textContent = language.flag;

      // Обробник кліку
      button.addEventListener("click", () => {
        this.setLanguage(language.id);
      });

      // Додавання кнопки до контейнера
      container.appendChild(button);
    });

    return container;
  }

  // Додавання селектора мов на сторінку
  addLanguageSelectorToPage() {
    const header = document.querySelector("header");
    if (!header) return;

    // Перевірка наявності елемента header-controls
    let headerControls = header.querySelector(".header-controls");

    // Якщо елемент header-controls не існує, створюємо його
    if (!headerControls) {
      headerControls = document.createElement("div");
      headerControls.className = "header-controls";
      header.appendChild(headerControls);
    }

    // Створення селектора мов
    const languageSelector = this.createLanguageSelector();

    // Додавання селектора в header-controls
    headerControls.appendChild(languageSelector);
  }

  // Приєднання обробників подій
  attachEventListeners() {
    // Обробник події зміни мови для оновлення API запитів
    document.addEventListener("chatGame.languageChanged", (event) => {
      const { language } = event.detail;

      // Можна додати логіку для передачі мови в API запити
      // Наприклад, оновити глобальну змінну з мовою для API
      window.currentAPILanguage = language;

      // Викликаємо подію, щоб інші модулі могли реагувати
      const apiLanguageEvent = new CustomEvent("chatGame.apiLanguageChanged", {
        detail: { language },
      });
      document.dispatchEvent(apiLanguageEvent);
    });
  }

  // Метод для зміни мови бота в API запитах
  updateBotLanguage(language = currentLanguage) {
    // Повертає рядок з інструкцією для API щодо мови відповіді
    // Використовується в api.js при формуванні запитів
    const languageInstructions = {
      uk: "Відповідай ЛИШЕ українською мовою.",
      en: "Answer ONLY in English language.",
    };

    return languageInstructions[language] || languageInstructions.uk;
  }
}

// Створення екземпляра менеджера мов
const languageManager = new LanguageManager();

// Експорт для використання в інших модулях
window.languageManager = languageManager;

// Ініціалізація системи мов після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  // Додавання селектора мов на сторінку
  languageManager.addLanguageSelectorToPage();

  // Встановлення глобальної змінної для API
  window.currentAPILanguage = currentLanguage;
});
