export async function getNutrition(query) {
  try {
    const res = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
      {
        headers: {
          "X-Api-Key": "xRT+rEwv58sPvc/rpjviTA==TxBGup8so2O3QSQ1"
        }
      }
    );

    const data = await res.json();
    if (!data.items || !data.items.length) return null;

    const item = data.items[0];

    return {
      calories: item.calories,
      protein: item.protein_g,
      fat: item.fat_total_g,
      carbs: item.carbohydrates_total_g
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}
