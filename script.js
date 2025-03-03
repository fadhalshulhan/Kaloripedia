// ANDI

const form = document.getElementById("calorie-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get input values
  const gender = document.getElementById("gender").value;
  const age = Number(document.getElementById("age").value);
  const height = Number(document.getElementById("height").value);
  const weight = Number(document.getElementById("weight").value);
  const resultElement = document.getElementById("result");

  // Validate input fields
  if (!gender || !age || !height || !weight) {
    resultElement.innerHTML =
      '<p style="color: red;">Harap isi semua kolom dengan benar.</p>';
    return;
  }

  let bmr;
  if (gender === "male") {
    bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
  } else {
    bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
  }

  resultElement.innerHTML = `<p>Perkiraan kebutuhan kalori harian Anda: <strong>${bmr.toFixed(
    2
  )}</strong> kalori</p>`;
});

// END BY ANDI

// =========

// FADHAL

let foodEntries = [];
let editingIndex = null;

function addFood() {
  let foodName = document.getElementById("foodName").value.trim();
  let totalCalorieOfFood = document
    .getElementById("totalCalorieOfFood")
    .value.trim();
  let addButton = document.getElementById("add-update-button");
  let foodNameError = document.getElementById("foodNameError");
  let calorieError = document.getElementById("calorieError");

  foodNameError.textContent = "";
  calorieError.textContent = "";

  // Validasi Jumlah Kalori (Hanya angka)
  let calorieRegex = /^[0-9]+$/;
  if (!calorieRegex.test(totalCalorieOfFood)) {
    calorieError.textContent = "Jumlah kalori hanya boleh berisi angka.";
    return;
  }

  if (foodName && totalCalorieOfFood) {
    if (editingIndex !== null) {
      foodEntries[editingIndex] = {
        name: foodName,
        calories: totalCalorieOfFood,
      };
      editingIndex = null;
      addButton.textContent = "Tambahkan Makanan";
      document.getElementById("foodName").placeholder = "Nama Makanan";
      document.getElementById("totalCalorieOfFood").placeholder =
        "Jumlah Kalori Makanan";
    } else {
      foodEntries.push({
        name: foodName,
        calories: totalCalorieOfFood,
      });
    }
    document.getElementById("foodName").value = "";
    document.getElementById("totalCalorieOfFood").value = "";
    displayFoodEntries();
  }
}

function displayFoodEntries() {
  let foodList = document.getElementById("foodList");
  foodList.innerHTML = "";
  let totalCalories = 0;

  foodEntries.forEach((entry, index) => {
    totalCalories += parseInt(entry.calories);
    foodList.innerHTML += `
            <div class="food-item d-flex justify-content-between align-items-center border-bottom py-2">
                <span>${entry.name} - ${entry.calories} Kalori</span>
                <div>
                    <button class="btn btn-warning btn-sm" onclick="editFood(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="removeFood(${index})">Hapus</button>
                </div>
            </div>
        `;
  });

  document.getElementById(
    "dailyCalorieStatus"
  ).textContent = `Total dikonsumsi: ${totalCalories}`;
}

function editFood(index) {
  document.getElementById("foodName").value = foodEntries[index].name;
  document.getElementById("totalCalorieOfFood").value =
    foodEntries[index].calories;
  document.getElementById("foodName").placeholder = "Edit Nama Makanan";
  document.getElementById("totalCalorieOfFood").placeholder =
    "Edit Jumlah Kalori Makanan";
  document.getElementById("add-update-button").textContent =
    "Perbarui Data Makanan";
  editingIndex = index;
}

function removeFood(index) {
  foodEntries.splice(index, 1);
  displayFoodEntries();
}

document.addEventListener("DOMContentLoaded", () => {
  displayFoodEntries();
});

// END BY FADHAL
// =========
