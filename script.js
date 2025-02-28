let foodEntries = [];
let editingIndex = null;

function addFood() {
  let foodName = document.getElementById("foodName").value;
  let totaCalorieOfFood = parseInt(
    document.getElementById("totaCalorieOfFood")
  );

  if (foodName && totaCalorieOfFood) {
    if (editingIndex !== null) {
      // Update Food Entries
      foodEntries[editingIndex] = {
        foodName: foodName,
        totaCalorieOfFood: totaCalorieOfFood,
      };
      editingIndex = null;
      document.getElementById("add-update-button").textContent =
        "Tambahkan Makanan";
    }
  } else {
    // Add New Food Entries
    foodEntries.push({
      name: foodName,
      calories: calorieAmount,
    });

    document.getElementById("foodName").value = "";
    document.getElementById("totaCalorieOfFood").value = "";
    displayFoodEntries();
  }
}

function displayFoodEntries() {
  let foodList = document.getElementById("foodList");
  foodList.innerHTML = "";
  let totalCalories = 0;

  foodEntries.forEach((entry, index) => {
    totalCalories += entry.calories;
    foodContainer.innerHTML += `
        <div class="food-item">
            <span>${entry.name} - ${entry.calories} Kalori</span>
            <button onclick="editFood(${index})">Edit</button>
            <button onclick="removeFood(${index})">Hapus</button>
        </div>
    `;
  });

  document.getElementById(
    "totaCalorieOfFood"
  ).textContent = `Total Kalori: ${totalCalories}`;
  displayCalorieStatus(totalCalories);
}

function displayCalorieStatus(totalCalories) {
  const statusContainer = document.getElementById("dailyCalorieStatus");
  if (dailyCalorieNeed === 0) {
    statusContainer.textContent =
      "Masukkan data berat dan tinggi badan terlebih dahulu.";
    return;
  }
  if (totalCalories < dailyCalorieNeed) {
    statusContainer.textContent = `Sisa kalori: ${
      dailyCalorieNeed - totalCalories
    } Kcal (Masih bisa makan lebih)`;
    statusContainer.className = "text-green-600";
  } else {
    statusContainer.textContent = `Kalori terlampaui: ${
      totalCalories - dailyCalorieNeed
    } Kcal (Kurangi asupan)`;
    statusContainer.className = "text-red-600";
  }
}

function removeFood(index) {
  foodEntries.splice(index, 1);
  displayFoodEntries();
}

document.addEventListener("DOMContentLoaded", () => {
  displayFoodEntries();
});
