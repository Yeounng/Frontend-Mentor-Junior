const selectedTip = document.querySelectorAll(".grid-item");
const mainInput = document.getElementById("main-input");
const numPeople = document.getElementById("num-ppl");

let bill = 0;
let people = 0;
let tipMultiplier = 1.0;
let result;

mainInput.addEventListener("input", inputSetting);
numPeople.addEventListener("input", inputSetting);

function inputSetting() {
  bill = Number(mainInput.value) || 0;
  people = Number(numPeople.value) || 0;
  if (people === 0) {
    numPeople.previousSibling.textContent = "cant be zero";
  } else numPeople.previousSibling.textContent = "";

  resultOut();
}

selectedTip.forEach((element) => {
  element.addEventListener("click", (e) => {
    let tip = e.target.textContent;
    if (!isNaN(tip)) {
      tipMultiplier = 1 + Number(tip) / 100;
      console.log(tipMultiplier);
    } else console.log("Custom option is not ready!");
    resultOut();
  });
});

function resultOut() {
  const priceTotal = document.getElementById("price-total");
  const priceToPay = document.getElementById("price-to-pay");

  let total = tipMultiplier * bill;
  let totalPerPerson = total / people;

  priceTotal.textContent = `${total.toFixed(2)}`;
  priceToPay.textContent = `${totalPerPerson.toFixed(2)}`;
}
