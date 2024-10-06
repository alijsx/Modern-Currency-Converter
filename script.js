const url = 'https://api.exchangerate-api.com/v4/latest/USD'; // Fetch rates based on USD
const options = {
    method: 'GET',
};

// Fetch currency rates and populate the dropdowns
async function fetchCurrencyRates() {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        populateCurrencyOptions(data.rates);
    } catch (error) {
        displayError(error.message);
    }
}

// Populate currency dropdowns
function populateCurrencyOptions(rates) {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    for (const currency in rates) {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrency.appendChild(optionTo);
    }

    // Set up conversion on button click
    document.getElementById('convertBtn').onclick = () => {
        const amount = parseFloat(document.getElementById('amount').value);
        const from = fromCurrency.value;
        const to = toCurrency.value;
        convertCurrency(amount, from, to, rates);
    };
}

// Convert currency
function convertCurrency(amount, from, to, rates) {
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    resultDiv.textContent = '';
    errorDiv.textContent = '';

    if (!amount || from === to) {
        errorDiv.textContent = 'Please enter a valid amount and select different currencies.';
        return;
    }

    const rate = rates[to] / rates[from];
    const result = amount * rate;

    resultDiv.innerHTML = `
        <p>${amount.toFixed(2)} ${from} is equal to <strong>${result.toFixed(2)} ${to}</strong>.</p>
        <p>Conversion Rate: <strong>1 ${from} = ${rate.toFixed(4)} ${to}</strong></p>
    `;
}

// Display error messages
function displayError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
}

// Initial fetch of currency rates
fetchCurrencyRates();
