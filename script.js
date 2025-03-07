// =========== GLOBAL VARIABLES ===========
let bmrValue = 0; // Menyimpan nilai BMR yang sudah dihitung
let totalCaloriesConsumed = 0; // Menyimpan total kalori dari makanan
let foodEntries = []; // Daftar makanan (name + calories)
let editingIndex = null; // Index item yang sedang di-edit

// =========== ANDI (Hitung BMR) ===========
document
  .getElementById("calorie-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Ambil input
    let gender = document.getElementById("gender").value;
    let age = Number(document.getElementById("age").value);
    let height = Number(document.getElementById("height").value);
    let weight = Number(document.getElementById("weight").value);
    let resultElement = document.getElementById("result");

    // Validasi
    if (!gender || !age || !height || !weight) {
      resultElement.innerHTML =
        '<b style="color: red;">Harap isi semua kolom.</b>';
      bmrValue = 0; // Reset jika data belum lengkap
      hitungDefisit(); // Tampilkan kesimpulan "Belum ada data"
      return;
    }

    // Hitung BMR (Mifflin-St Jeor)
    let bmr =
      gender === "male"
        ? 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age
        : 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;

    bmrValue = Math.round(bmr);

    // Tampilkan hasil BMR di #result
    resultElement.innerHTML = `
       <b>${bmrValue}</b> Kalori
     `;

    // Hitung defisit setelah BMR diperbarui
    hitungDefisit();
  });

// =========== FADHAL (Kelola Makanan) ===========
function addFood() {
  let foodName = document.getElementById("foodName").value.trim();
  let totalCalorieOfFood = document
    .getElementById("totalCalorieOfFood")
    .value.trim();
  let addButton = document.getElementById("add-update-button");
  let foodNameError = document.getElementById("foodNameError");
  let calorieError = document.getElementById("calorieError");

  // Reset error state
  resetErrorState();

  let hasError = false;

  // Validasi field kosong
  if (!foodName) {
    foodNameError.textContent = "Nama makanan tidak boleh kosong.";
    document.getElementById("foodName").classList.add("is-invalid");
    hasError = true;
  }
  if (!totalCalorieOfFood) {
    calorieError.textContent = "Jumlah kalori tidak boleh kosong.";
    document.getElementById("totalCalorieOfFood").classList.add("is-invalid");
    hasError = true;
  }

  if (hasError) {
    return; // Berhenti jika ada error
  }

  // Validasi hanya angka
  let calorieRegex = /^[0-9]+$/;
  if (!calorieRegex.test(totalCalorieOfFood)) {
    calorieError.textContent = "Jumlah kalori hanya boleh berisi angka.";
    document.getElementById("totalCalorieOfFood").classList.add("is-invalid");
    return;
  }

  // Konversi string ke integer
  totalCalorieOfFood = parseInt(totalCalorieOfFood);

  // Mode edit atau tambah baru
  if (editingIndex !== null) {
    // Kurangi total kalori dengan nilai lama sebelum di-update
    totalCaloriesConsumed -= foodEntries[editingIndex].calories;
    // Update data di array
    foodEntries[editingIndex] = {
      name: foodName,
      calories: totalCalorieOfFood,
    };
    editingIndex = null;
    addButton.textContent = "Tambahkan Makanan";
  } else {
    // Mode tambah baru
    foodEntries.push({
      name: foodName,
      calories: totalCalorieOfFood,
    });
  }

  // Hitung total kalori dari semua makanan
  totalCaloriesConsumed = foodEntries.reduce(
    (sum, entry) => sum + entry.calories,
    0
  );

  // Tampilkan daftar makanan dan reset form
  displayFoodEntries();
  document.getElementById("foodName").value = "";
  document.getElementById("totalCalorieOfFood").value = "";

  // Hitung defisit lagi
  hitungDefisit();
}

function displayFoodEntries() {
  let foodList = document.getElementById("foodList");
  foodList.innerHTML = "";

  foodEntries.forEach((entry, index) => {
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

  // Update tampilan total kalori
  document.getElementById(
    "dailyCalorieStatus"
  ).innerHTML = `<b>${totalCaloriesConsumed}</b> Kalori`;

  // Jika semua makanan dihapus, kembalikan ke default
  if (foodEntries.length === 0) {
    document.getElementById("add-update-button").textContent =
      "Tambahkan Makanan";
    document.getElementById("foodName").value = "";
    document.getElementById("totalCalorieOfFood").value = "";
    resetErrorState();
    editingIndex = null;
  }
}

function editFood(index) {
  document.getElementById("foodName").value = foodEntries[index].name;
  document.getElementById("totalCalorieOfFood").value =
    foodEntries[index].calories;
  document.getElementById("add-update-button").textContent =
    "Perbarui Data Makanan";
  editingIndex = index;
  resetErrorState();
}

function removeFood(index) {
  // Kurangi total kalori dengan nilai item yang dihapus
  totalCaloriesConsumed -= foodEntries[index].calories;
  foodEntries.splice(index, 1);

  displayFoodEntries();
  hitungDefisit(); // panggil lagi setelah hapus
}

function resetErrorState() {
  document.getElementById("foodNameError").textContent = "";
  document.getElementById("calorieError").textContent = "";
  document.getElementById("foodName").classList.remove("is-invalid");
  document.getElementById("totalCalorieOfFood").classList.remove("is-invalid");
}

// =========== FAHRI (Hitung Defisit) ===========
function hitungDefisit() {
  // Gunakan nilai bmrValue dan totalCaloriesConsumed
  let totalKebutuhanKalori = bmrValue;
  let totalKaloriDikonsumsi = totalCaloriesConsumed;

  let defisitKalori = totalKebutuhanKalori - totalKaloriDikonsumsi;

  // Tampilkan di #resultDefisit
  document.getElementById(
    "resultDefisit"
  ).innerHTML = `<h5><b>${defisitKalori} Kalori</b></h5>`;

  // Kesimpulan utama
  let kesimpulan = "";
  let bgColor = "";

  // Jika belum ada data BMR dan makanan
  if (totalKebutuhanKalori === 0 && totalKaloriDikonsumsi === 0) {
    kesimpulan =
      "Hasil akan muncul setelah Anda memasukkan data. Yuk, lengkapi sekarang!";
    bgColor = "bg-light";
  } else {
    if (defisitKalori <= 300) {
      kesimpulan =
        "Kalorimu seimbang dan aktivitasmu cukup, pertahankan pola makan dan olahragamu.";
      bgColor = "bg-success text-white";
    } else if (defisitKalori > 300 && defisitKalori <= 500) {
      kesimpulan =
        "Defisit kalorimu kecil, dengan sedikit peningkatan aktivitas bisa menyeimbangkan kalorimu.";
      bgColor = "bg-info text-white";
    } else if (defisitKalori > 500 && defisitKalori <= 700) {
      kesimpulan =
        "Defisit kalorimu mulai besar, kontrol pola makan dan tingkatkan aktivitas.";
      bgColor = "bg-warning text-dark";
    } else if (defisitKalori > 700 && defisitKalori <= 1000) {
      kesimpulan =
        "Defisit kalorimu ekstrem! Kamu berisiko obesitas atau kekurangan gizi, segera perbaiki!";
      bgColor = "bg-danger text-white";
    } else if (defisitKalori > 1000) {
      kesimpulan =
        "Kalorimu tidak terkendali! Ini berbahaya bagi kesehatan, segera ubah pola makan atau konsultasi dokter!";
      bgColor = "bg-dark text-white";
    }
  }

  document.getElementById("kesimpulan").innerText = kesimpulan;
  let kesimpulanContainer = document.getElementById("kesimpulan-container");
  kesimpulanContainer.className = `text-center mt-4 p-3 rounded ${bgColor}`;

  // Kategori Defisit
  let kategori = "";
  let targetDefisit = "";
  let masukan = "";
  let textColor = "text-dark";

  if (totalKebutuhanKalori === 0 && totalKaloriDikonsumsi === 0) {
    kategori = "Belum ada data";
    targetDefisit = "Belum ada data";
    masukan = "Belum ada data";
  } else {
    if (defisitKalori > 1000) {
      kategori = "Sangat Buruk";
      targetDefisit = "Kalori tidak terkendali";
      masukan = "Segera ubah pola makan!";
      textColor = "text-danger";
    } else if (defisitKalori > 700) {
      kategori = "Buruk";
      targetDefisit = "Defisit/Surplus ekstrem";
      masukan = "Perbaiki keseimbangan kalori!";
      textColor = "text-warning";
    } else if (defisitKalori > 500) {
      kategori = "Cukup";
      targetDefisit = "Defisit/Surplus mulai besar";
      masukan = "Tambahkan sedikit aktivitas.";
      textColor = "text-info";
    } else if (defisitKalori > 300) {
      kategori = "Baik";
      targetDefisit = "Defisit/Surplus kecil";
      masukan = "Pertahankan pola makan & olahraga.";
      textColor = "text-success";
    } else {
      kategori = "Sangat Baik";
      targetDefisit = "Kalori seimbang";
      masukan = "Teruskan pola hidup sehat!";
      textColor = "text-primary";
    }
  }

  document.getElementById(
    "resultDefisitKesimpulan"
  ).innerHTML = `<b>${defisitKalori}</b> Kalori`;

  // Update elemen detail
  let kategoriElement = document.getElementById("kategori");
  kategoriElement.textContent = kategori;
  kategoriElement.className = `card-text ${textColor}`;

  let targetElement = document.getElementById("target_defisit");
  targetElement.textContent = targetDefisit;
  targetElement.className = `card-text rounded ${textColor}`;

  document.getElementById(
    "total_kalori_dikonsumsi"
  ).innerHTML = `<b>${totalKaloriDikonsumsi}</b> Kalori`;
  document.getElementById(
    "total_kalori_dibakar"
  ).innerHTML = `<b>${totalKebutuhanKalori}</b> Kalori`;
  document.getElementById("masukan").textContent = masukan;
}
