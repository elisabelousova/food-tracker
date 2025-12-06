const API_KEY = "xRT+rEwv58sPvc/rpjviTA==TxBGup8so2O3****";

const addMealBtn = document.querySelector(".add-meal");
const overlay = document.querySelector("#modal-overlay");
const foodInput = document.querySelector("#food-input");

const kcalEl = document.querySelector("#cal");
const proteinEl = document.querySelector("#protein");
const fatEl = document.querySelector("#fat");
const carbsEl = document.querySelector("#carbs");

const mealButtons = document.querySelectorAll(".meal-type");
let selectedMeal = "Завтрак";

mealButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    mealButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMeal = btn.dataset.type;
  })
);

addMealBtn.addEventListener("click", () => overlay.classList.remove("hidden"));

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.add("hidden");
});

foodInput.addEventListener("input", async () => {
  const q = foodInput.value.trim();
  if (!q) return;

  const res = await fetch(
    `https://api.calorieninjas.com/v1/nutrition?query=${q}`,
    { headers: { "X-Api-Key": API_KEY } }
  );

  const data = await res.json();

  if (data.items?.length > 0) {
    const item = data.items[0];

    kcalEl.textContent = item.calories;
    proteinEl.textContent = item.protein_g;
    fatEl.textContent = item.fat_total_g;
    carbsEl.textContent = item.carbohydrates_total_g;
  }
});

document.querySelector("#add-food-btn").addEventListener("click", () => {
  const mealListItems = document.querySelectorAll(".meal-item");

  mealListItems.forEach(item => {
    if (item.querySelector(".meal-name").textContent === selectedMeal) {
      item.querySelector(".meal-emojis").innerHTML =
        `${kcalEl.textContent} / ${proteinEl.textContent} / ${fatEl.textContent} / ${carbsEl.textContent}`;
    }
  });

  overlay.classList.add("hidden");
});
