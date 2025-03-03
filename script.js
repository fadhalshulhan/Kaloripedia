<<<<<<< HEAD
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

=======
>>>>>>> 70fcf1b32a034a6734c8f20ec91b9adff0571124
let foodEntries = [];
let editingIndex = null;

function addFood() {
<<<<<<< HEAD
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
=======
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
>>>>>>> 70fcf1b32a034a6734c8f20ec91b9adff0571124
    displayFoodEntries();
  }
}

function displayFoodEntries() {
  let foodList = document.getElementById("foodList");
  foodList.innerHTML = "";
  let totalCalories = 0;

  foodEntries.forEach((entry, index) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 70fcf1b32a034a6734c8f20ec91b9adff0571124
}

function removeFood(index) {
  foodEntries.splice(index, 1);
  displayFoodEntries();
}

document.addEventListener("DOMContentLoaded", () => {
  displayFoodEntries();
});
<<<<<<< HEAD

// END BY FADHAL
// =========
=======
>>>>>>> 70fcf1b32a034a6734c8f20ec91b9adff0571124
