

const convertButton = document.querySelector(".convert-button");
const currencySelectTo = document.querySelector(".currency-select");
const currencySelectFrom = document.querySelector(".currency-select-from");

const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
const currencyValueConverted = document.querySelector(".currency-value");
const currencyNameTo = document.getElementById("currency-name");
const currencyImageTo = document.querySelector(".currency-img");

const exchangeRates = {
  real: 1,
  dolar: 5.89,
  euro: 6.66,
  libra: 7.44,
  bitcoin: 365000.00,
};

const currencyLabels = {
  real: "Real Brasileiro",
  dolar: "Dólar Americano",
  euro: "Euro",
  libra: "Libra",
  bitcoin: "Bitcoin"
};

const currencyFlags = {
  real: "./assets/brasil 2.png",
  dolar: "./assets/dolar.png",
  euro: "./assets/euro.png",
  libra: "./assets/libra.png",
  bitcoin: "./assets/bitcoin.png"
};

function convertValues() {
  const inputField = document.querySelector(".input-currency");
  const inputCurrencyValue = parseFloat(
    inputField.value.replace("R$", "").replace(".", "").replace(",", ".").trim()
  );

  if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
    alert("Por favor, insira um valor válido maior que zero.");
    return;
  }

  const from = currencySelectFrom.value;
  const to = currencySelectTo.value;

  const fromRate = exchangeRates[from];
  const toRate = exchangeRates[to];

  const valueInReal = inputCurrencyValue * fromRate;
  const convertedValue = valueInReal / toRate;

  // Atualiza moeda de origem
  document.querySelector(".box-currency img").src = currencyFlags[from];
  document.querySelector(".box-currency .currency").textContent = currencyLabels[from];
  currencyValueToConvert.textContent = formatCurrency(inputCurrencyValue, from);

  // Atualiza moeda de destino
  currencyNameTo.textContent = currencyLabels[to];
  currencyImageTo.src = currencyFlags[to];
  currencyValueConverted.textContent = formatCurrency(convertedValue, to);
}

function formatCurrency(value, currencyCode) {
  const currencyMap = {
    real: "BRL",
    dolar: "USD",
    euro: "EUR",
    libra: "GBP",
    bitcoin: "BTC"
  };

  const formatOptions = {
    style: "currency",
    currency: currencyMap[currencyCode],
    minimumFractionDigits: currencyCode === "bitcoin" ? 6 : 2
  };

  return new Intl.NumberFormat(
    currencyCode === "real" ? "pt-BR" : "en-US",
    formatOptions
  ).format(value);
}

// Atualiza a moeda de destino ao trocar seleção
function changeCurrencyTo() {
  const to = currencySelectTo.value;
  currencyNameTo.textContent = currencyLabels[to];
  currencyImageTo.src = currencyFlags[to];
  convertValues();
}

// Atualiza a moeda de origem ao trocar seleção
function changeCurrencyFrom() {
  const from = currencySelectFrom.value;
  document.querySelector(".box-currency img").src = currencyFlags[from];
  document.querySelector(".box-currency .currency").textContent = currencyLabels[from];
  convertValues();
}

currencySelectTo.addEventListener("change", changeCurrencyTo);
currencySelectFrom.addEventListener("change", changeCurrencyFrom);
convertButton.addEventListener("click", convertValues);
