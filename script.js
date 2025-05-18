// ===== ЗБЕРЕЖЕННЯ СИСТЕМНОЇ ІНФОРМАЦІЇ В localStorage =====
const systemInfo = {
  platform: navigator.platform,
  userAgent: navigator.userAgent,
  language: navigator.language,
  cookieEnabled: navigator.cookieEnabled
};

localStorage.setItem("systemInfo", JSON.stringify(systemInfo));

const data = JSON.parse(localStorage.getItem("systemInfo"));
const list = document.getElementById("localStorage-data");

for (let key in data) {
  const li = document.createElement("li");
  li.textContent = `${key}: ${data[key]}`;
  list.appendChild(li);
}

// ===== ОТРИМАННЯ КОМЕНТАРІВ З JSONPLACEHOLDER =====
fetch("https://jsonplaceholder.typicode.com/posts/11/comments")
  .then(res => res.json())
  .then(comments => {
    const ul = document.getElementById("comments-list");
    comments.forEach(c => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${c.name}</strong> (${c.email}): ${c.body}`;
      ul.appendChild(li);
    });
  })
  .catch(err => console.error("Помилка завантаження коментарів:", err));

  // Показ коментарів по кліку
// Показ/сховати коментарі
  const commentsSection = document.getElementById("comments-section");
  const toggleBtn = document.getElementById("toggle-comments-btn");

  if (toggleBtn && commentsSection) {
    toggleBtn.addEventListener("click", () => {
      commentsSection.classList.toggle("hidden");
      toggleBtn.textContent = commentsSection.classList.contains("hidden")
        ? "Показати коментарі"
        : "Сховати коментарі";
    });
  }

// ===== ТЕМА: АВТОМАТИЧНА ТА РУЧНА ЗМІНА =====
document.addEventListener("DOMContentLoaded", () => {
  const hour = new Date().getHours();
  const autoTheme = hour >= 7 && hour < 21 ? "light" : "dark";
  if (autoTheme === "dark") document.body.classList.add("dark");

    const themeBtn = document.getElementById("theme-switch");
    themeBtn?.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });

  const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

  // ===== МОДАЛЬНЕ ВІКНО ЧЕРЕЗ 60 СЕКУНД =====
  const modal = document.getElementById("feedback-modal");
  const closeBtn = document.querySelector(".close-button");
  // показати через 1 хв
  setTimeout(() => {
    if (modal) modal.style.display = "flex";
  }, 60000);

  // закрити по хрестику
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

    window.addEventListener("click", e => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
