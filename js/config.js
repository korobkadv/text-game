/**
 * Конфігураційний файл для додатку
 */

// API ключ для доступу до Google's Gemini
const API_KEY = "AIzaSyCoXQJZEzAhjnKctVQZI1v8pjvhpWnxeY8"; // Замініть на свій API ключ

// Базовий URL для Gemini API
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Назва для локального сховища
const STORAGE_KEY = "AiChatGame";

// Налаштування для генерації відповідей
const GENERATION_CONFIG = {
  temperature: 0.9, // Креативність (0.0 - більш детерміністичні відповіді, 1.0 - більш креативні)
  maxOutputTokens: 800, // Максимальна довжина відповіді
};

// Максимальна кількість повідомлень для кожного чату
const MAX_MESSAGES = 10;

// Таймаут для імітації "думання" ШІ (мілісекунди)
const THINKING_TIMEOUT = 500;
