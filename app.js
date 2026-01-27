const BMIform = document.querySelector(".bmi-app__form"); //상위요소에 걸어서 이벤트 위임
const output = document.querySelector(".result-bmi");
const bmiClass = document.querySelector(".classification");
const bmiRange = document.querySelector(".range");

let currentUnit = "metric"; // 기본값은 metric으로

const userData = {
  mHeight: document.querySelector("#height-cm"),
  mWeight: document.querySelector("#weight-kg"),
  iFt: document.querySelector("#height-ft"),
  iInch: document.querySelector("#height-in"),
  iSt: document.querySelector("#weight-st"),
  iLb: document.querySelector("#weight-lb"),
};

BMIform.addEventListener("input", (e) => {
  if (e.target.name === "unit") {
    handleUnitChange(e.target.value);
  }
  calculatorBMI();
});

const inputMetric = document.querySelector(".user-data.metric");
const inputImperial = document.querySelector(".user-data.imperial");

function UIswitch() {
  resetUI();
  if (currentUnit === "metric") {
    inputMetric.classList.add("active");
  }
  if (currentUnit === "imperial") {
    inputImperial.classList.add("active");
  }
}

function resetUI() {
  inputMetric.classList.remove("active");
  inputImperial.classList.remove("active");
}

function handleUnitChange(unit) {
  const prevUnit = currentUnit;
  currentUnit = unit;

  UIswitch();

  if (prevUnit === "metric") toImperial();
  else toMetric();

  calculatorBMI();
}

function toImperial() {
  const cm = parseFloat(userData.mHeight.value) || 0;
  const kg = parseFloat(userData.mWeight.value) || 0;
  if (!cm || !kg) return;

  const totalIn = cm / 2.54;
  userData.iFt.value = Math.floor(totalIn / 12);
  userData.iInch.value = (totalIn % 12).toFixed(1);

  const totalLb = kg * 2.2046;
  userData.iSt.value = Math.floor(totalLb / 14);
  userData.iLb.value = (totalLb % 14).toFixed(1);
}

function toMetric() {
  const ft = parseFloat(userData.iFt.value) || 0;
  const inches = parseFloat(userData.iInch.value) || 0;
  const st = parseFloat(userData.iSt.value) || 0;
  const lb = parseFloat(userData.iLb.value) || 0;
  if (!ft || !st) return;

  userData.mHeight.value = Math.round((ft * 12 + inches) * 2.54);
  userData.mWeight.value = ((st * 14 + lb) / 2.20462).toFixed(1);
}

function calculatorBMI() {
  let bmi = 0;
  let heightM = 0;
  if (currentUnit === "metric") {
    const height = (parseFloat(userData.mHeight.value) || 0) / 100;
    const weight = parseFloat(userData.mWeight.value) || 0;
    heightM = height;
    if (height > 0 && weight > 0) bmi = (weight / height ** 2).toFixed(1);
  } else {
    const totalIn = (parseFloat(userData.iFt.value) || 0) * 12 + (parseFloat(userData.iInch.value) || 0);
    const totalLb = (parseFloat(userData.iSt.value) || 0) * 14 + (parseFloat(userData.iLb.value) || 0);
    heightM = (totalIn * 2.54).toFixed(2) / 100;
    if (totalIn > 0 && totalLb > 0) bmi = ((totalLb / totalIn ** 2) * 703).toFixed(1);
  }
  updateUi(bmi, heightM, currentUnit);
}

function updateUi(bmi, heightM, currentUnit) {
  output.textContent = bmi;
  const idealMinKg = (18.5 * heightM ** 2).toFixed(1);
  const idealMaxKg = (24.9 * heightM ** 2).toFixed(1);
  let range = "";
  if (currentUnit === "metric") {
    range = `${idealMinKg}kg - ${idealMaxKg}kg`;
  }
  if (currentUnit === "imperial") {
    let minTotalLb = idealMinKg * 2.2046;
    let minSt = Math.floor(minTotalLb / 14);
    let minLb = (minTotalLb % 14).toFixed(1);

    let maxTotalLb = idealMaxKg * 2.2046;
    let maxSt = Math.floor(maxTotalLb / 14);
    let maxLb = (maxTotalLb % 14).toFixed(1);
    range = `${minSt}st ${minLb}lb - ${maxSt}st ${maxLb}lb`;
  }

  bmiRange.textContent = range;

  let status = "";
  if (bmi < 18.5) status = "Underweight";
  if (18.5 < bmi < 25) status = "a Healty weight";
  if (bmi > 25) status = "Overweight";
  if (bmi > 30) status = "Obese";
  bmiClass.textContent = status;
}
