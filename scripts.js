

// COMEÇA AQUI 
const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".currency-select");

function convertValues() {
    const inputField = document.querySelector(".input-currency");
    const inputCurrencyValue = parseFloat(
        inputField.value.replace("R$", "").replace(".", "").replace(",", ".").trim()
    );

    const currencyValueToConvert = document.querySelector(".currency-value-to-convert"); // Valor em Real
    const currencyValueConverted = document.querySelector(".currency-value"); // Valor convertido

    const dolarToday = 5.89;
    const euroToday = 6.66;
    const libraToday = 7.44;
    const bitcoinToday = 365000.00;

    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        alert("Por favor, insira um valor válido maior que zero.");
        return;
    }

    let convertedValue;
    let formatOptions;

    if (currencySelect.value === "dolar") {
        //Se o select estiver selecionado o valor de Dolar, entre aqui
        convertedValue = inputCurrencyValue / dolarToday;
        formatOptions = { style: "currency", currency: "USD" };
    }

    if (currencySelect.value === "euro") {
           //Se o select estiver selecionado o valor de Euro, entre aqui
        convertedValue = inputCurrencyValue / euroToday;
        formatOptions = { style: "currency", currency: "EUR" };
    }

    if (currencySelect.value === "libra") {
        convertedValue = inputCurrencyValue / libraToday;
        formatOptions = { style: "currency", currency: "GBP" };
    }

    if (currencySelect.value === "bitcoin") {
        convertedValue = inputCurrencyValue / bitcoinToday;
        formatOptions = {
            style: "currency",
            currency: "BTC",
            minimumFractionDigits: 6,
        };
    }

    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", formatOptions).format(convertedValue);

    currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(inputCurrencyValue);
}

function changeCurrency() {
    const currencyName = document.getElementById("currency-name");
    const currencyImage = document.querySelector(".currency-img");

    if (currencySelect.value === "dolar") {
        currencyName.innerHTML = "Dólar Americano";
        currencyImage.src = "./assets/dolar.png";
    }

    if (currencySelect.value === "euro") {
        currencyName.innerHTML = "Euro";
        currencyImage.src = "./assets/euro.png";
    }

    if (currencySelect.value === "libra") {
        currencyName.innerHTML = "Libra";
        currencyImage.src = "./assets/libra.png";
    }

    if (currencySelect.value === "bitcoin") {
        currencyName.innerHTML = "Bitcoin";
        currencyImage.src = "./assets/bitcoin.png";
    }

    convertValues(); // atualiza o valor automaticamente ao trocar de moeda
}

currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValues);
