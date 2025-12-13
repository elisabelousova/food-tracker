import { getNutrition } from "./api.js";

const DAILY_NORM = 2000;

let meals = JSON.parse(localStorage.getItem("meals")) || [
  { name: "Завтрак", kcal: 0, B: 0, J: 0, U: 0 },
  { name: "Обед", kcal: 0, B: 0, J: 0, U: 0 },
  { name: "Ужин", kcal: 0, B: 0, J: 0, U: 0 },
  { name: "Другое", kcal: 0, B: 0, J: 0, U: 0 }
];

const list = document.getElementById("meals-list");
const addBtn = document.getElementById("add-meal-btn");
const modal = document.getElementById("modal-overlay");

const dishInput = document.getElementById("dish-input");
const saveBtn = document.getElementById("save-dish-btn");

const pCal = document.getElementById("p-cal");
const pProtein = document.getElementById("p-protein");
const pFat = document.getElementById("p-fat");
const pCarb = document.getElementById("p-carb");

const normNumber = document.getElementById("norm-number");

let selectedMeal = "Завтрак";
let selectedIndex = 0;

renderMeals();
updateNorm();

/Браузерное API: LocalStorage/

function saveToStorage() {
  localStorage.setItem("meals", JSON.stringify(meals));
}

/Выбор приёма пищи/

document.querySelectorAll(".meal-type").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".meal-type").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedMeal = btn.dataset.type;
    selectedIndex = meals.findIndex(m => m.name === selectedMeal);
  });
});

/Поиск еды через API/

dishInput.addEventListener("input", async () => {
  const query = dishInput.value.trim();
  if (query.length < 2) return;

  const result = await getNutrition(query);
  if (!result) return;

  pCal.textContent = result.calories;
  pProtein.textContent = result.protein;
  pFat.textContent = result.fat;
  pCarb.textContent = result.carbs;
});

/Модалка/

addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

saveBtn.addEventListener("click", () => {
  meals[selectedIndex].kcal = Number(pCal.textContent);
  meals[selectedIndex].B = Number(pProtein.textContent);
  meals[selectedIndex].J = Number(pFat.textContent);
  meals[selectedIndex].U = Number(pCarb.textContent);

  saveToStorage();
  renderMeals();
  updateNorm();

  modal.classList.add("hidden");
});

/Рендер/

function renderMeals() {
  list.innerHTML = "";

  meals.forEach(m => {
    const div = document.createElement("div");
    div.className = "meal-item";

    const empty = m.kcal === 0 && m.B === 0 && m.J === 0 && m.U === 0;

    div.innerHTML = empty
      ? `
        <span class="meal-name">${m.name}</span>
        <span class="meal-emojis">🍉 🍋 🍎</span>
      `
      : `
        <span class="meal-name">${m.name}</span>
        <div class="meal-table">
          <div class="meal-table-header">
            <span>Ккал</span><span>Б</span><span>Ж</span><span>У</span>
          </div>
          <div class="meal-values-row">
            <span>${m.kcal}</span><span>${m.B}</span><span>${m.J}</span><span>${m.U}</span>
          </div>
        </div>
      `;

    list.appendChild(div);
  });
}

/% нормы/

function updateNorm() {
  const total = meals.reduce((sum, m) => sum + m.kcal, 0);
  const percent = Math.round((total / DAILY_NORM) * 100);
  normNumber.textContent = `${percent}%`;
}
