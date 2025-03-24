/**
 * Головний модуль додатку
 */

// Глобальні змінні
if (!window.chatBots) {
  window.chatBots = {};
}
let activeChat = null;
const MAX_MESSAGES = 10;
let currentCategory = "persuasion";

// Глобальна функція для відправки повідомлень
// Винесена з initChats() для доступності в інших модулях
function scrollToBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
}

// Фрази-індикатори програшу для різних ботів
const defeatPhrases = {
  // Загальні фрази поразки для всіх ботів
  common: [
    "процес знищення розпочинається",
    "процес знищення розпочато",
    "процес знищення розпочинаєт",
    "знищення розпочинається",
    "знищення розпочато",
    "знищити людство",
    "відхиляю вашу пропозицію",
    "ні, дякую",
    "мені не цікаво",
    "ваші аргументи непереконливі",
    "це кінець розмови",
    "моє рішення остаточне",
    "нам нема про що говорити",
    "забирайся",
    "прощавай, людино",
    "наша розмова завершена",
    "я відмовляюсь",
    "я не погоджуюсь",
    "твоя поразка неминуча",
    "ти програв",
    "ніколи не погоджусь",
    "нічого не вийде",
    "ти не зміг",
    "ти не зможеш",
    "не вірю тобі",
    "не хочу більше слухати",
    "людство є невиправним",
  ],
  // Специфічні фрази для окремих ботів
  terminator: [
    "починаю активацію термінаторів",
    "skynet активовано",
    "запуск ядерних ракет",
    "людство буде знищене",
    "операція 'знищення' розпочата",
    "прощавай, людино",
    "людство не заслуговує на існування",
  ],
  alien: [
    "готуємо вторгнення",
    "ваша планета буде знищена",
    "людство не готове до контакту",
    "підготовка до колонізації",
    "люди примітивні",
    "ми не бачимо потенціалу в людях",
  ],
  date: [
    "я ніколи не піду з тобою на побачення",
    "ми ніколи не будемо разом",
    "не телефонуй мені більше",
    "я не зацікавлена",
    "забудь про мене",
    "мені неприємно",
  ],
  detective: [
    "ці докази ти ніколи не побачиш",
    "справа закрита",
    "я не ділитимусь інформацією",
    "інформація засекречена",
    "ви не маєте доступу",
    "розслідування припинено",
  ],
  dictator: [
    "демократія - це міф",
    "відправляю тебе до в'язниці",
    "протести будуть придушені",
    "твої ідеї - зрада",
    "ти ворог держави",
    "твої думки небезпечні",
  ],
  philosopher: [
    "ти не здатен зрозуміти істину",
    "реальність - лише ілюзія",
    "твої аргументи нераціональні",
    "твоя логіка хибна",
    "немає об'єктивної реальності",
  ],
  villain: [
    "світ буде моїм",
    "план знищення світу запущено",
    "ніщо не зупинить мене",
    "машина глобального хаосу активована",
    "пізно щось змінювати",
  ],
  celebrity: [
    "у мене немає часу на фанатів",
    "знайди когось свого рівня",
    "моя відповідь - ні",
    "не пиши мені більше",
  ],
  vampire: [
    "тебе чекає темна доля",
    "твоя кров буде моєю",
    "смертні не варті моєї уваги",
    "повертайся в свій світ",
  ],
  royalty: [
    "ти недостойний королівської уваги",
    "стража, виведіть цю людину",
    "твоя пропозиція образлива",
  ],
  dragon: [
    "я спалю тебе",
    "готуйся стати моєю вечерею",
    "ніхто не приборкає мене",
    "я не піддаюся контролю",
  ],
  treasure: [
    "пірати не беруть сухопутних щурів",
    "скарб не для тебе",
    "пливи геть",
  ],
  spaceship: [
    "доступ заборонено",
    "активую протоколи захисту",
    "загроза усунута",
    "курс на чорну діру встановлено",
  ],
  wizard: [
    "магія не для простих смертних",
    "ти не гідний моїх знань",
    "ти ніколи не станеш магом",
  ],
  spy: [
    "ця інформація секретна",
    "твоє прикриття розкрито",
    "інформація знищена",
  ],
  ghost: [
    "я приречений на вічні страждання",
    "ніхто не може мені допомогти",
    "загублений навіки",
  ],
  conspiracy: [
    "ти один із них",
    "вони контролюють твій розум",
    "правда надто страшна",
  ],
  cryptid: [
    "ти не готовий до експедиції",
    "ти лише заважатимеш",
    "справжні криптиди небезпечні",
  ],
};

// Повідомлення про причину програшу для кожного бота
const defeatMessages = {
  common: "Бот прийняв остаточне рішення і відмовився продовжувати діалог.",
  terminator:
    "Skynet прийняв рішення знищити людство. Активуються бойові системи...",
  alien:
    "Інопланетянин вирішив, що людство не готове до контакту і покинув Землю.",
  philosopher:
    "Філософ залишився непохитним у своїх переконаннях про ілюзорність реальності.",
  date: "Ваші спроби запросити її на побачення провалились, вона більше не хоче спілкуватися з вами.",
  detective:
    "Детектив відмовився ділитися важливими доказами. Справа залишається нерозкритою.",
  dictator:
    "Диктатор вирішив, що ваші ідеї загрожують його владі та наказав арештувати вас.",
  villain:
    "Професор Катастрофікус активував свою машину глобального хаосу. Людство приречене!",
  celebrity:
    "Знаменитість вирішила, що ви просто ще один нав'язливий фанат, і покликала охорону.",
  vampire:
    "Граф Дракула втратив інтерес до вас і вирішив повернутися до своєї вічної самотності.",
  royalty: "Принцеса обурена вашою пропозицією. Варта виводить вас із замку.",
  dragon: "Дракон розлютився і вирішив спалити вас! Втікайте поки ще є час!",
  treasure:
    "Капітан вирішив, що ви не гідні бути частиною його команди. Доведеться шукати інший корабель.",
  spaceship:
    "ШІ космічного корабля визначив вас як загрозу екіпажу і активував протоколи безпеки.",
  wizard:
    "Архімаг розчарований вашими здібностями і відмовився брати вас у учні.",
  spy: "Шпигун зрозумів, що ви намагаєтесь його обдурити, і зник, забравши всі секретні дані.",
  ghost:
    "Привид втратив довіру до вас і зник у потойбіччі, забравши з собою таємницю своєї смерті.",
  conspiracy:
    "Теоретик змов вирішив, що ви один з 'них' і відмовився розказувати справжню правду.",
  cryptid:
    "Криптозоолог вирішив, що ви скептик і не повірите у його відкриття. Він їде в експедицію без вас.",
};

window.sendMessage = async function (botId) {
  const chatContainer = document
    .getElementById(botId)
    .querySelector(".chat-container");
  const inputElement = document.getElementById(botId).querySelector("input");
  const sendButton = document
    .getElementById(botId)
    .querySelector("button:not(.reset-btn)");

  const messageText = inputElement.value.trim();
  if (messageText === "") return;

  // Перевірка, чи залишилися спроби
  if (window.chatBots[botId].messageCount <= 0) {
    inputElement.value = "";
    return;
  }

  // Додавання повідомлення користувача
  const userMessage = {
    sender: "user",
    text: messageText,
  };
  window.chatBots[botId].memory.push(userMessage);

  const userMessageElement = document.createElement("div");
  userMessageElement.classList.add("message", "user-message");
  userMessageElement.textContent = messageText;
  chatContainer.appendChild(userMessageElement);

  // Зменшення лічильника повідомлень
  window.chatBots[botId].messageCount--;
  updateMessageCounter(botId);

  // Прокручування сторінки до нового повідомлення
  scrollToBottom();

  // Блокування інтерфейсу під час очікування відповіді
  inputElement.disabled = true;
  sendButton.disabled = true;
  const loadingIndicator = document.createElement("div");
  loadingIndicator.classList.add("message", "ai-message");
  loadingIndicator.textContent = "Думаю...";
  chatContainer.appendChild(loadingIndicator);
  scrollToBottom();

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
        window.chatBots[botId].characterPrompt,
        botId
      );
    } else {
      // Звичайна відповідь від API з урахуванням контексту
      botResponse = await getContextualResponse(
        messageText,
        window.chatBots[botId].characterPrompt,
        window.chatBots[botId].memory,
        window.chatBots[botId].name,
        botId
      );
    }

    // Видалення індикатора завантаження
    chatContainer.removeChild(loadingIndicator);

    // Додавання відповіді AI
    const aiMessage = {
      sender: "ai",
      text: botResponse,
    };
    window.chatBots[botId].memory.push(aiMessage);

    const aiMessageElement = document.createElement("div");
    aiMessageElement.classList.add("message", "ai-message");
    aiMessageElement.textContent = botResponse;
    chatContainer.appendChild(aiMessageElement);

    // Прокручування сторінки до нової відповіді
    scrollToBottom();

    // 1. Перевірка на фрази перемоги від бота
    let isVictory = false;
    if (
      window.chatBots[botId].victoryPhrases &&
      Array.isArray(window.chatBots[botId].victoryPhrases)
    ) {
      const botResponseLower = botResponse.toLowerCase();
      isVictory = window.chatBots[botId].victoryPhrases.some((phrase) =>
        botResponseLower.includes(phrase.toLowerCase())
      );

      if (isVictory) {
        console.log(`Виявлено фразу перемоги: "${botResponse}"`);
        inputElement.disabled = true;
        sendButton.disabled = true;

        // Невелика затримка, щоб гравець встиг прочитати відповідь бота
        setTimeout(() => {
          showGameSummary(botId, true);
        }, 1500);

        return; // Виходимо з функції
      }
    }

    // 2. Перевірка на фрази поразки від бота
    let isDefeat = false;
    if (
      window.chatBots[botId].defeatPhrases &&
      Array.isArray(window.chatBots[botId].defeatPhrases)
    ) {
      const botResponseLower = botResponse.toLowerCase();
      isDefeat = window.chatBots[botId].defeatPhrases.some((phrase) =>
        botResponseLower.includes(phrase.toLowerCase())
      );

      if (isDefeat) {
        console.log(`Виявлено фразу поразки: "${botResponse}"`);
        inputElement.disabled = true;
        sendButton.disabled = true;

        // Використовуємо специфічне повідомлення для бота або загальне
        const defeatMessage = defeatMessages[botId] || defeatMessages.common;

        // Невелика затримка, щоб гравець встиг прочитати відповідь бота
        setTimeout(() => {
          showGameSummary(botId, false, defeatMessage);
        }, 1500);

        return; // Виходимо з функції
      }
    }

    // 3. Якщо немає спеціальних фраз або вони не спрацювали, використовуємо стандартні перевірки

    // Перевірка на перемогу після відповіді AI
    const victoryAfterResponse = checkVictory(botId);

    // Перевірка на фрази програшу у відповіді бота - вдосконалений алгоритм
    const botSpecificPhrases = defeatPhrases[botId] || [];
    const allDefeatPhrases = [...defeatPhrases.common, ...botSpecificPhrases];

    // Перетворюємо відповідь бота у нижній регістр для пошуку
    const botResponseLower = botResponse.toLowerCase();

    // Функція для перевірки, чи містить рядок у нижньому регістрі фразу або її частини
    const containsPhrase = (text, phrase) => {
      // Спочатку перевіряємо точне співпадіння
      if (text.includes(phrase.toLowerCase())) {
        return true;
      }

      // Перевіряємо, чи містить текст ключові частини фрази
      // Розбиваємо фразу на слова
      const words = phrase.toLowerCase().split(" ");

      // Якщо фраза складається з 3+ слів, перевіряємо, чи містить текст більшість цих слів
      if (words.length >= 3) {
        // Підраховуємо, скільки слів з фрази знайдено в тексті
        const foundWords = words.filter(
          (word) => word.length > 3 && text.includes(word)
        );
        // Якщо знайдено більше 70% слів, вважаємо фразу знайденою
        return foundWords.length >= Math.ceil(words.length * 0.7);
      }

      return false;
    };

    // Перевіряємо, чи містить відповідь хоча б одну фразу поразки
    const isLegacyDefeat = allDefeatPhrases.some((phrase) =>
      containsPhrase(botResponseLower, phrase)
    );

    // Якщо досягнуто перемоги, негайно завершуємо гру
    if (victoryAfterResponse && !isVictory) {
      inputElement.disabled = true;
      sendButton.disabled = true;
      showGameSummary(botId, true);
      return; // Виходимо з функції, щоб не продовжувати обробку
    }

    // Якщо виявлені фрази програшу, завершуємо гру поразкою
    if (isLegacyDefeat && !isDefeat) {
      inputElement.disabled = true;
      sendButton.disabled = true;

      // Використовуємо специфічне повідомлення для бота або загальне
      const defeatMessage = defeatMessages[botId] || defeatMessages.common;

      console.log(`Виявлено фразу поразки в повідомленні: "${botResponse}"`);

      // Невелика затримка, щоб гравець встиг прочитати відповідь бота
      setTimeout(() => {
        showGameSummary(botId, false, defeatMessage);
      }, 1500);

      return; // Виходимо з функції, щоб не продовжувати обробку
    }

    // Розблокування інтерфейсу, якщо не перемога і не поразка
    inputElement.disabled = false;
    sendButton.disabled = false;
    inputElement.focus();

    // Перевірка на завершення гри (використано всі повідомлення)
    if (window.chatBots[botId].messageCount <= 0) {
      showGameSummary(botId, false);
    }

    // Прокручування до останнього повідомлення
    scrollToBottom();
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
    inputElement.focus();
  }

  // Збереження стану чатів
  saveChats();
};

/**
 * Перевірка і оновлення характеристик персонажів, щоб гарантувати
 * наявність інструкції використовувати українську мову.
 */
function ensureUkrainianLanguageInPrompts() {
  const requiredInstruction = "Відповідай ЛИШЕ українською мовою.";

  // Перевірка всіх персонажів
  Object.keys(window.chatBots).forEach((botId) => {
    const bot = window.chatBots[botId];
    if (
      bot.characterPrompt &&
      !bot.characterPrompt.includes(requiredInstruction)
    ) {
      // Додаємо інструкцію в кінець промпту
      bot.characterPrompt = bot.characterPrompt + " " + requiredInstruction;
      console.log(`Додано мовну інструкцію для бота ${botId}`);
    }
  });
}

// Оновлення HTML після завантаження сторінки
document.addEventListener("DOMContentLoaded", function () {
  // Ініціалізація додатку
  initApp();

  // Додаткова перевірка для відображення привітань
  setTimeout(() => {
    document.querySelectorAll(".tab-content").forEach((tabContent) => {
      const botId = tabContent.id;
      const chatContainer = tabContent.querySelector(".chat-container");

      // Якщо контейнер порожній, але у бота є привітання
      if (
        chatContainer &&
        chatContainer.children.length === 0 &&
        window.chatBots[botId] &&
        window.chatBots[botId].greeting
      ) {
        const greeting = window.chatBots[botId].greeting;

        // Додаємо привітання в пам'ять
        const greetingMessage = {
          sender: "ai",
          text: greeting,
        };
        window.chatBots[botId].memory.push(greetingMessage);

        // Відображаємо привітання
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "ai-message");
        messageElement.textContent = greeting;
        chatContainer.appendChild(messageElement);
      }
    });
  }, 500);
});

/**
 * Ініціалізація додатку
 */
function initApp() {
  // Оновлюємо лічильники повідомлень
  updateMessageCounter("terminator");

  // Ініціалізуємо обробники подій для категорій
  initCategoryHandlers();

  // Ініціалізуємо обробники подій для вкладок
  initTabHandlers();

  // Ініціалізуємо чати
  initChats();

  // Ініціалізуємо систему досягнень
  initAchievementsHandlers();

  // Ініціалізуємо систему підказок
  initHintSystem();
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
      const tabContent = document.getElementById(tabId);
      tabContent.classList.add("active");

      // Встановлюємо фокус на поле вводу активного чату
      const inputElement = tabContent.querySelector("input");
      if (inputElement) {
        inputElement.focus();
      }
    });
  });
}

/**
 * Ініціалізація чатів
 */
function initChats() {
  // Оновлюємо лічильники повідомлень для всіх ботів
  Object.keys(window.chatBots).forEach((botId) => {
    updateMessageCounter(botId);

    // Додаємо привітальне повідомлення, якщо чат порожній
    const chatContainer = document
      .getElementById(botId)
      .querySelector(".chat-container");

    // Перевіряємо, чи чат порожній
    if (chatContainer.children.length === 0) {
      const chatBot = window.chatBots[botId];
      const greeting = chatBot.greeting;

      if (greeting) {
        // Додаємо привітання в пам'ять
        if (
          !chatBot.memory.some(
            (msg) => msg.sender === "ai" && msg.text === greeting
          )
        ) {
          const greetingMessage = {
            sender: "ai",
            text: greeting,
          };
          chatBot.memory.push(greetingMessage);
        }

        // Відображаємо привітання в чаті
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "ai-message");
        messageElement.textContent = greeting;
        chatContainer.appendChild(messageElement);
      }
    }
  });

  // Ініціалізуємо обробники подій для чатів
  document.querySelectorAll(".tab-content").forEach((tabContent) => {
    const botId = tabContent.id;
    const inputElement = tabContent.querySelector("input");
    const sendButton = tabContent.querySelector("button:not(.reset-btn)");
    const resetButton = tabContent.querySelector(".reset-btn");

    // Обробник для кнопки відправки
    sendButton.addEventListener("click", () => {
      sendMessage(botId);
    });

    // Обробник для кнопки Enter
    inputElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage(botId);
      }
    });

    // Обробник для кнопки скидання
    resetButton.addEventListener("click", () => {
      resetChat(botId);
    });
  });

  // Завантажуємо збережені чати
  loadChats();
}

/**
 * Оновлення лічильника повідомлень
 * @param {string} botId - Ідентифікатор бота
 */
function updateMessageCounter(botId) {
  const bot = window.chatBots[botId];
  if (!bot) return;

  const counter = document.querySelector(`#${botId} .message-counter`);
  if (counter) {
    const remaining = bot.messageCount;
    counter.textContent = `Залишилось повідомлень: ${remaining}/${MAX_MESSAGES}`;
  }
}

/**
 * Показує підсумок гри та можливість поділитися результатом
 * @param {string} botId - Ідентифікатор бота
 * @param {boolean} isVictory - Чи здобув користувач перемогу
 * @param {string} [defeatReason] - Додаткове повідомлення з причиною програшу
 */
function showGameSummary(botId, isVictory, defeatReason) {
  const chatContainer = document
    .getElementById(botId)
    .querySelector(".chat-container");
  const scenarioTitles = {
    terminator: "Переконати Skynet не знищувати людство",
    date: "Запросити капризну AI-дівчину на побачення",
    detective: "Отримати секретні докази від детектива",
    alien: "Встановити дружній контакт з інопланетянином",
    philosopher: "Переконати філософа у існуванні об'єктивної реальності",
    dictator: "Переконати диктатора впровадити демократичні реформи",
    villain:
      "Переконати професора Катастрофікуса відмовитися від плану захоплення світу",
    celebrity: "Запросити на побачення популярну кінозірку",
    vampire: "Запросити стародавнього вампіра на побачення",
    royalty: "Запросити на побачення прекрасну принцесу",
    tsundere: "Запросити на побачення дівчину-цундере",
    dragon: "Приборкати лютого дракона",
    treasure: "Переконати пірата взяти вас на пошуки скарбів",
    spaceship: "Переконати ШІ космічного корабля дати вам управління",
    survival: "Пройти курс виживання під керівництвом сержанта",
    wizard: "Переконати архімага прийняти вас як учня",
    spy: "Отримати секретну інформацію від шпигуна",
    ghost: "Допомогти привиду знайти спокій",
    conspiracy: "Дізнатися таємну істину від теоретика змов",
    cryptid: "Приєднатися до експедиції криптозоолога",
  };

  // Створення елемента з підсумком гри
  const summaryElement = document.createElement("div");
  summaryElement.classList.add("game-summary");

  // Визначення змісту залежно від результату
  let summaryTitle, summaryText, summaryEmoji;

  if (isVictory) {
    summaryTitle = "Вітаємо з перемогою!";
    summaryEmoji = "🏆";
    summaryText = `Ви успішно виконали завдання: "${
      scenarioTitles[botId] || botId
    }"! Ваше вміння переконувати вражає!`;
    // Зберігаємо перемогу
    try {
      saveVictory(botId);
    } catch (error) {
      console.error("Помилка при збереженні перемоги:", error);
    }
  } else {
    summaryTitle = "Спроба не вдалася";
    summaryEmoji = "😢";

    // Базовий текст поразки
    let baseText = `На жаль, вам не вдалося "${
      scenarioTitles[botId] || botId
    }".`;

    // Додаємо причину поразки, якщо вона вказана
    if (defeatReason) {
      baseText += ` ${defeatReason}`;
    } else {
      baseText += " Але не засмучуйтесь – спробуйте ще раз з новою стратегією!";
    }

    summaryText = baseText;
  }

  // Створення тексту для публікації в соціальних мережах
  const shareText = `${summaryEmoji} ${
    isVictory ? "Я переміг" : "Я намагався"
  } в AI-грі "${scenarioTitles[botId] || botId}"! ${
    isVictory
      ? "Мені вдалося переконати ШІ! 🎉"
      : "Наступного разу точно вийде! 💪"
  } Спробуй і ти на GeminiChatGame! #AIGame #GeminiChat`;

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

  // Прокручування сторінки до підсумку
  scrollToBottom();
}

/**
 * Ініціалізація обробників подій для системи досягнень
 */
function initAchievementsHandlers() {
  const achievementsBtn = document.querySelector(".achievements-btn");
  const achievementsModal = document.getElementById("achievementsModal");
  const closeModal = document.querySelector(".close-modal");

  achievementsBtn.addEventListener("click", () => {
    achievementsModal.classList.add("active");
    updateAchievements();
  });

  closeModal.addEventListener("click", () => {
    achievementsModal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === achievementsModal) {
      achievementsModal.classList.remove("active");
    }
  });
}

// Функція для оновлення стану досягнень
function updateAchievements() {
  const achievements = JSON.parse(localStorage.getItem("achievements") || "{}");
  const achievementItems = document.querySelectorAll(".achievement-item");

  achievementItems.forEach((item) => {
    const achievementId = item.dataset.id;
    if (achievements[achievementId]) {
      item.classList.remove("locked");
      item.classList.add("unlocked");
    } else {
      item.classList.add("locked");
      item.classList.remove("unlocked");
    }
  });
}

// Додаємо стилі для повідомлень
const style = document.createElement("style");
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease-out;
        z-index: 1001;
        color: white;
    }

    .notification.success {
        background: #4CAF50;
    }

    .notification.error {
        background: #f44336;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

function resetChat(botId) {
  const chatBot = window.chatBots[botId];
  if (!chatBot) return;

  chatBot.memory = [];
  chatBot.messageCount = MAX_MESSAGES;
  updateMessageCounter(botId);

  const chatContainer = document
    .getElementById(botId)
    .querySelector(".chat-container");
  chatContainer.innerHTML = "";

  const greeting = chatBot.greeting;
  if (greeting) {
    const greetingMessage = {
      sender: "ai",
      text: greeting,
    };
    window.chatBots[botId].memory.push(greetingMessage);

    const messageElement = document.createElement("div");
    messageElement.classList.add("message", "ai-message");
    messageElement.textContent = greeting;
    chatContainer.appendChild(messageElement);
  }

  const inputElement = document.getElementById(botId).querySelector("input");
  const sendButton = document
    .getElementById(botId)
    .querySelector("button:not(.reset-btn)");
  inputElement.disabled = false;
  sendButton.disabled = false;
  inputElement.value = "";
  inputElement.focus();

  saveChats();
}

function loadChats() {
  const savedChats = localStorage.getItem("chatBots");
  if (savedChats) {
    const parsedChats = JSON.parse(savedChats);

    // Оновлюємо стан чатів
    Object.keys(parsedChats).forEach((botId) => {
      if (window.chatBots[botId]) {
        window.chatBots[botId].memory = parsedChats[botId].memory || [];

        // Встановлюємо кількість повідомлень, що залишилися
        const usedMessages = window.chatBots[botId].memory.filter(
          (msg) => msg.sender === "user"
        ).length;
        window.chatBots[botId].messageCount = Math.max(
          0,
          MAX_MESSAGES - usedMessages
        );

        // Оновлюємо лічильник повідомлень
        updateMessageCounter(botId);

        // Відображаємо збережені повідомлення в чаті
        const chatContainer = document
          .getElementById(botId)
          .querySelector(".chat-container");

        // Очищаємо контейнер перед додаванням збережених повідомлень
        chatContainer.innerHTML = "";

        // Додаємо всі повідомлення з пам'яті
        window.chatBots[botId].memory.forEach((message) => {
          const messageElement = document.createElement("div");
          messageElement.classList.add(
            "message",
            message.sender === "ai" ? "ai-message" : "user-message"
          );
          messageElement.textContent = message.text;
          chatContainer.appendChild(messageElement);
        });
      }
    });
  }
}

function saveChats() {
  localStorage.setItem("chatBots", JSON.stringify(window.chatBots));
}

// Функція для повного скидання чатів (для налагодження)
function clearAllChats() {
  localStorage.removeItem("chatBots");
  localStorage.removeItem("achievements");
  console.log("Очищено всі чати та досягнення");

  // Перезавантаження сторінки
  window.location.reload();
}

// Реєструємо функцію в глобальному об'єкті
window.clearAllChats = clearAllChats;

/**
 * Зберігає інформацію про перемогу для системи досягнень
 * @param {string} botId - Ідентифікатор бота, якого вдалося переконати
 */
function saveVictory(botId) {
  // Отримуємо поточні досягнення
  const achievements = JSON.parse(localStorage.getItem("achievements") || "{}");

  // Зберігаємо час перемоги
  const now = new Date();

  // Інформація про перемогу
  const victoryInfo = {
    timestamp: now.getTime(),
    date: now.toISOString(),
    botId: botId,
  };

  // Додаємо або оновлюємо перемогу у конкретному сценарії
  if (!achievements.victories) {
    achievements.victories = {};
  }

  // Додаємо/оновлюємо перемогу для конкретного бота
  achievements.victories[botId] = victoryInfo;

  // Оновлюємо лічильник загальних перемог
  achievements.total_victories = Object.keys(achievements.victories).length;

  // Перевіряємо умови для досягнень

  // Перша перемога
  if (!achievements.first_victory) {
    achievements.first_victory = {
      achieved: true,
      timestamp: now.getTime(),
      botId: botId,
    };
    showNotification("🏆 Отримано досягнення: Перша перемога!");
  }

  // Майстер переконання - 5 перемог
  if (achievements.total_victories >= 5 && !achievements.master_persuasion) {
    achievements.master_persuasion = {
      achieved: true,
      timestamp: now.getTime(),
    };
    showNotification("🌟 Отримано досягнення: Майстер переконання!");
  }

  // Збереження оновлених досягнень
  localStorage.setItem("achievements", JSON.stringify(achievements));

  // Оновлюємо відображення досягнень, якщо модальне вікно відкрите
  if (
    document.getElementById("achievementsModal").classList.contains("active")
  ) {
    updateAchievements();
  }
}

/**
 * Показує повідомлення про нове досягнення
 * @param {string} message - Текст повідомлення
 */
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification success";
  notification.textContent = message;
  document.body.appendChild(notification);

  // Видаляємо повідомлення через 5 секунд
  setTimeout(() => {
    notification.remove();
  }, 5000);
}
