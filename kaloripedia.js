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
      '<p style="color: red;">Please fill in all fields correctly.</p>';
    return;
  }

  let bmr;
  if (gender === "male") {
    bmr = 88.36 + 13.4 * weight + 4.8 * height - 5.7 * age;
  } else {
    bmr = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
  }

  resultElement.innerHTML = `<p>Your estimated daily calorie needs: <strong>${bmr.toFixed(
    2
  )}</strong> calories</p>`;
});
