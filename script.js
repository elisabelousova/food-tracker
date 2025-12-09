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

document.querySelectorAll(".meal-type").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".meal-type").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    selectedMeal = btn.dataset.type;
    selectedIndex = meals.findIndex(m => m.name === selectedMeal);
  });
});

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

addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

saveBtn.addEventListener("click", () => {
  meals[selectedIndex].kcal = Number(pCal.textContent);
  meals[selectedIndex].B = Number(pProtein.textContent);
  meals[selectedIndex].J = Number(pFat.textContent);
  meals[selectedIndex].U = Number(pCarb.textContent);

  renderMeals();
  modal.classList.add("hidden");
});

function renderMeals() {
  list.innerHTML = "";

  meals.forEach(m => {
    const div = document.createElement("div");
    div.className = "meal-item";

    div.innerHTML = `
      <span class="meal-name">${m.name}</span>
      <span class="meal-values">${m.kcal} | ${m.B} | ${m.J} | ${m.U}</span>
    `;

    list.appendChild(div);
  });
}
