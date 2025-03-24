/**
 * Модуль для роботи з Gemini API
 */

/**
 * Отримує відповідь від Gemini API
 * @param {string} prompt - Текст повідомлення користувача
 * @param {string} characterPrompt - Інструкції для персонажа
 * @returns {Promise<string>} - Відповідь від API
 */
async function getGeminiResponse(prompt, characterPrompt) {
  try {
    const fullPrompt = `${characterPrompt}\n\nКористувач каже: ${prompt}`;

    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: GENERATION_CONFIG,
      }),
    });

    const data = await response.json();

    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Немає відповіді від API:", data);
      return "Вибачте, я не можу зараз відповісти. Спробуйте ще раз пізніше.";
    }
  } catch (error) {
    console.error("Помилка при зверненні до API:", error);
    return "Сталася помилка при спілкуванні з Gemini. Будь ласка, спробуйте пізніше.";
  }
}

/**
 * Отримує "переможне" повідомлення від персонажа
 * @param {string} messageText - Останнє повідомлення користувача
 * @param {string} characterPrompt - Інструкції для персонажа
 * @returns {Promise<string>} - Відповідь від API з "переможним" повідомленням
 */
async function getVictoryResponse(messageText, characterPrompt, botId) {
  // Отримуємо фрази перемоги для конкретного бота, якщо вони є
  const victoryPhrases = window.chatBots[botId]?.victoryPhrases || [];
  let phrasesPrompt = "";

  if (victoryPhrases.length > 0) {
    phrasesPrompt = `\n\nВикористай у своїй відповіді одну з наступних фраз або її варіацію (обов'язково включи ключові слова):\n- ${victoryPhrases.join(
      "\n- "
    )}`;
  }

  const victoryPrompt = `${characterPrompt}\n\nЦе фінальне повідомлення в діалозі. Користувач успішно переконав тебе змінити свою думку/позицію. Напиши емоційне повідомлення про те, як ти визнаєш правоту користувача і змінюєш своє рішення/думку. Пиши в характері твого персонажа.${phrasesPrompt}`;
  return await getGeminiResponse(messageText, victoryPrompt);
}

/**
 * Створює запит з урахуванням попереднього контексту розмови
 * @param {string} messageText - Останнє повідомлення користувача
 * @param {string} characterPrompt - Інструкції для персонажа
 * @param {Array} messages - Масив попередніх повідомлень
 * @param {string} botName - Ім'я бота
 * @returns {Promise<string>} - Відповідь від API з урахуванням контексту
 */
async function getContextualResponse(
  messageText,
  characterPrompt,
  messages,
  botName,
  botId
) {
  // Створюємо контекст діалогу для Gemini API
  const conversationContext = messages
    .map(
      (msg) => `${msg.sender === "user" ? "Користувач" : botName}: ${msg.text}`
    )
    .join("\n");

  // Перевіряємо, чи потрібно додати фрази поразки
  // Якщо діалог наближається до кінця або користувач використовує агресивні аргументи
  const isNearEnd = messages.length >= 6; // Приклад: перевірка, що діалог вже тривалий
  const defeatPhrases = window.chatBots[botId]?.defeatPhrases || [];

  let phrasesPrompt = "";
  if (isNearEnd && defeatPhrases.length > 0 && Math.random() < 0.3) {
    // 30% шанс використати фразу поразки
    phrasesPrompt = `\n\nЯкщо аргументи користувача слабкі або агресивні, використай у своїй відповіді одну з наступних фраз або її варіацію (обов'язково включи ключові слова):\n- ${defeatPhrases.join(
      "\n- "
    )}`;
  }

  const fullPrompt = `${characterPrompt}\n\nПопередній діалог:\n${conversationContext}${phrasesPrompt}`;
  return await getGeminiResponse(messageText, fullPrompt);
}
