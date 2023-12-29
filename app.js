// Currency API
const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


// To populate the options from countrylist in dropdown 
for (let select of dropdowns) {

   // add all countries with their codes in select option 
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    // to set deafault USD to INR Conversion
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// create async function
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // create a new URL which is used to fetch information(get response using this URL)
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  // get exchange rate between currencies
  let rate = data[toCurr.value.toLowerCase()];
  
  // get final conversion value for the total value
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


// To change image of flag when element is selected
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode]; // eg. IN ,EU

  // used Flagsapi to get flags of different countries
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  // select img element
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();// default actions prevented
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});