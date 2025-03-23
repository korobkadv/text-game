/**
 * Утиліти для покращення мобільного досвіду
 */

// Перевірка чи пристрій мобільний
function isMobileDevice() {
  return window.innerWidth <= 768;
}

// Функція для прокручування на мобільних пристроях у горизонтальних вкладках
function setupTabsScrolling() {
  const tabsContainers = document.querySelectorAll(".tabs");

  tabsContainers.forEach((container) => {
    // Додаємо інтерактивне прокручування для мобільних
    if (isMobileDevice()) {
      let isDown = false;
      let startX;
      let scrollLeft;

      container.addEventListener("mousedown", (e) => {
        isDown = true;
        container.classList.add("active-scroll");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("mouseleave", () => {
        isDown = false;
        container.classList.remove("active-scroll");
      });

      container.addEventListener("mouseup", () => {
        isDown = false;
        container.classList.remove("active-scroll");
      });

      container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Швидкість прокручування
        container.scrollLeft = scrollLeft - walk;
      });

      // Для сенсорних пристроїв
      container.addEventListener("touchstart", (e) => {
        isDown = true;
        container.classList.add("active-scroll");
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("touchend", () => {
        isDown = false;
        container.classList.remove("active-scroll");
      });

      container.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });
    }
  });
}

// Додаємо індикатори прокручування для вкладок
function addScrollIndicators() {
  if (!isMobileDevice()) return;

  const tabsContainers = document.querySelectorAll(".tabs");

  tabsContainers.forEach((container) => {
    // Додавання індикаторів прокручування
    const scrollLeftIndicator = document.createElement("div");
    scrollLeftIndicator.className = "scroll-indicator left";
    scrollLeftIndicator.innerHTML = "&lsaquo;";

    const scrollRightIndicator = document.createElement("div");
    scrollRightIndicator.className = "scroll-indicator right";
    scrollRightIndicator.innerHTML = "&rsaquo;";

    // Додавання в DOM
    container.parentNode.insertBefore(scrollLeftIndicator, container);
    container.parentNode.insertBefore(
      scrollRightIndicator,
      container.nextSibling
    );

    // Початковий стан
    updateScrollIndicators(
      container,
      scrollLeftIndicator,
      scrollRightIndicator
    );

    // Прослуховування подій прокручування
    container.addEventListener("scroll", () => {
      updateScrollIndicators(
        container,
        scrollLeftIndicator,
        scrollRightIndicator
      );
    });

    // Прокручування по натисканню
    scrollLeftIndicator.addEventListener("click", () => {
      container.scrollBy({ left: -200, behavior: "smooth" });
    });

    scrollRightIndicator.addEventListener("click", () => {
      container.scrollBy({ left: 200, behavior: "smooth" });
    });
  });
}

// Оновлення стану індикаторів прокручування
function updateScrollIndicators(container, leftIndicator, rightIndicator) {
  if (container.scrollLeft <= 10) {
    leftIndicator.classList.add("hidden");
  } else {
    leftIndicator.classList.remove("hidden");
  }

  if (
    container.scrollLeft + container.clientWidth >=
    container.scrollWidth - 10
  ) {
    rightIndicator.classList.add("hidden");
  } else {
    rightIndicator.classList.remove("hidden");
  }
}

// Ініціалізація мобільних утиліт
document.addEventListener("DOMContentLoaded", () => {
  setupTabsScrolling();
  addScrollIndicators();

  // Обробка зміни розміру вікна
  window.addEventListener("resize", () => {
    setupTabsScrolling();

    // Видалення/додавання індикаторів прокручування
    document.querySelectorAll(".scroll-indicator").forEach((indicator) => {
      indicator.remove();
    });

    addScrollIndicators();
  });
});
