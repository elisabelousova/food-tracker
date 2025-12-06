export const meals = [
  { name: "Завтрак", icons: "🍉 🍋 🍎" },
  { name: "Обед", icons: "🍉 🍋 🍎" },
  { name: "Ужин", icons: "🍉 🍋 🍎" },
  { name: "+ Ещё", icons: "🍉 🍋 🍎" }
];

const list = document.getElementById("meals-list");
const addButton = document.getElementById("add-button");
const modal = document.getElementById("modal");
const saveBtn = document.getElementById("save-meal");
const cancelBtn = document.getElementById("cancel");

const nameInput = document.getElementById("meal-name");
const iconsInput = document.getElementById("meal-icons");

function renderMeals() {
  list.innerHTML = "";

  meals.forEach(m => {
    const div = document.createElement("div");
    div.className = "meal-item";

    div.innerHTML = `
      <span>${m.name}</span>
      <span class="icons">${m.icons}</span>
    `;

    list.appendChild(div);
  });
}

renderMeals();

// открыть модалку
addButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// закрыть
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// сохранить
saveBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const icons = iconsInput.value.trim();

  if (!name) return alert("Введите название");

  meals.push({ name, icons: icons || "" });
  renderMeals();

  nameInput.value = "";
  iconsInput.value = "";
  modal.classList.add("hidden");
});
