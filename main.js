let trackingData;
let whitespaceChecker = /\s/g;
let gridItem = document.querySelectorAll(".grid-item");

let currentHours = document.querySelectorAll(".content-hours>span");
let previousHours = document.querySelectorAll(".content-previous>span");

fetch("./data.json")
  .then((response) => {
    if (!response.ok) return console.log("data load failed");
    else console.log("data went through succesfully");

    return response.json();
  })
  .then((data) => {
    console.log(data);
    trackingData = data;

    UpdateUI("daily");
    let defaultTab = document
      .querySelector("[data-interval=daily]")
      .classList.add("active");
  });

let intervalTab = document.querySelectorAll("[data-interval]");

intervalTab.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    intervalTab.forEach((tab) => tab.classList.remove("active"));
    e.target.classList.add("active");

    const interval = tab.dataset.interval;

    UpdateUI(interval);
  });
});

function toCamelCase(inputstring) {
  return inputstring
    .split(/\s/g)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      } else return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

function UpdateUI(interval) {
  trackingData.forEach((items) => {
    const activityTitle = toCamelCase(items.title);
    gridItem.forEach((gridItem) => {
      if (gridItem.dataset.activity === activityTitle) {
        const intervalData = items.timeframes[interval];
        const current = intervalData.current;
        const previous = intervalData.previous;

        gridItem.querySelector(".content-hours").textContent = `${current} Hrs`;
        gridItem.querySelector(
          ".content-previous"
        ).textContent = `previous - ${previous} Hrs`;
      }
    });
  });
}
