import { getNutrition } from "./api.js";

let meals = [
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

let selectedMeal = "Завтрак";
let selectedIndex = 0;

renderMeals();
updateNorm();

// выбор приема пищи
document.querySelectorAll(".meal-type").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".meal-type").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedMeal = btn.dataset.type;
    selectedIndex = meals.findIndex(m => m.name === selectedMeal);
  });
});

// расчет нормы (из 2000 ккал)
function updateNorm() {
  const totalKcal = meals.reduce((sum, m) => sum + m.kcal, 0);
  const percent = Math.round((totalKcal / 2000) * 100);
  document.getElementById("norm-number").textContent = percent + "%";
}

// ввод блюда → запрос в API
dishInput.addEventListener("input", async () => {
  const text = dishInput.value.trim();
  if (text.length < 2) return;

  const result = await getNutrition(text);
  if (!result) return;

  pCal.textContent = result.calories;
  pProtein.textContent = result.protein;
  pFat.textContent = result.fat;
  pCarb.textContent = result.carbs;
});

// открыть модалку
addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// сохранить блюдо
saveBtn.addEventListener("click", () => {
  meals[selectedIndex].kcal = Number(pCal.textContent);
  meals[selectedIndex].B = Number(pProtein.textContent);
  meals[selectedIndex].J = Number(pFat.textContent);
  meals[selectedIndex].U = Number(pCarb.textContent);

  renderMeals();
  updateNorm();

  modal.classList.add("hidden");
});

function renderMeals() {
  list.innerHTML = "";

  meals.forEach(m => {
    const div = document.createElement("div");
    div.className = "meal-item";

    const isEmpty = m.kcal === 0 && m.B === 0 && m.J === 0 && m.U === 0;

    let content = "";

    if (isEmpty) {
      content = `
        <span class="meal-name">${m.name}</span>
        <span class="meal-emojis">🍉 🍋 🍎</span>
      `;
    } else {
      content = `
        <span class="meal-name">${m.name}</span>

        <div class="meal-table">
          <div class="meal-table-header">
            <span>Ккал</span>
            <span>Б</span>
            <span>Ж</span>
            <span>У</span>
          </div>

          <div class="meal-values-row">
            <span>${m.kcal}</span>
            <span>${m.B}</span>
            <span>${m.J}</span>
            <span>${m.U}</span>
          </div>
        </div>
      `;
    }

    div.innerHTML = content;
    list.appendChild(div);
  });
}
