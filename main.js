const selectedTip = document.querySelectorAll(".grid-item");
const mainInput = document.getElementById("main-input");
const numPeople = document.getElementById("num-ppl");
const custom = document.getElementById("custom");

let bill = 0;
let people = 0;
let tipMultiplier = 1.0;
let customMultiplier = 1.0;
let result;

mainInput.addEventListener("input", inputSetting);
numPeople.addEventListener("input", inputSetting);

function inputSetting() {
  bill = Number(mainInput.value) || 0;
  people = Number(numPeople.value) || 0;

  if (people === 0) {
    document.querySelector(".zero-alert").textContent = "can't be zero";
    numPeople.classList.add("active");
  } else {
    document.querySelector(".zero-alert").textContent = "";
    numPeople.classList.remove("active");
  }

  resultOut();
}

selectedTip.forEach((element) => {
  element.addEventListener("click", (e) => {
    selectedTip.forEach((element) => element.classList.remove("active"));
    custom.classList.remove("active");
    e.target.classList.add("active");
    let tip = e.target.textContent;
    if (!isNaN(tip)) {
      tipMultiplier = 1 + Number(tip) / 100;
    }
    custom.addEventListener("click", () => {
      custom.classList.add("active");
    });
    custom.addEventListener("input", (e) => {
      let customtip = e.target.value;
      customMultiplier = 1 + Number(customtip) / 100;
      resultOut();
    });

    resultOut();
  });
});

function resultOut() {
  const priceTotal = document.getElementById("price-total");
  const priceToPay = document.getElementById("price-to-pay");

  if (custom.classList.contains("active")) {
    total = customMultiplier * bill;
    totalPerPerson = total / people;
  } else {
    total = tipMultiplier * bill;
    totalPerPerson = total / people;
  }

  priceTotal.textContent = `${total.toFixed(2)}`;
  priceToPay.textContent = `${totalPerPerson.toFixed(2)}`;

  if (!isNaN(total) || !isNaN(totalPerPerson)) {
    const reset = document.querySelector(".reset");
    reset.classList.add("active");
    reset.addEventListener("click", () => {
      location.reload();
    });
  }
}
