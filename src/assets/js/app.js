// DOM Elements
const currentTempSlider = document.getElementById("current-temperature");
const currentTempValue = document.getElementById("current-temperature-value");

const currentHumiditySlider = document.getElementById("current-humidity");
const currentHumidityValue = document.getElementById("current-humidity-value");

const roomOccupancySlider = document.getElementById("room-occupancy");
const roomOccupancyValue = document.getElementById("room-occupancy-value");

const desiredTempSlider = document.getElementById("desired-temperature");
const desiredTempValue = document.getElementById("desired-temperature-value");

const desiredHumiditySlider = document.getElementById("desired-humidity");
const desiredHumidityValue = document.getElementById("desired-humidity-value");

const compressorOutput = document.getElementById("compressor-output");
const fanSpeedOutput = document.getElementById("fan-speed-output");
const expansionValveOutput = document.getElementById("expansion-valve-output");

const inputTemperature = document.getElementById("input-temperature");
const calculateBtn = document.getElementById("calculate-btn");
const calculationResult = document.getElementById("calculation-result");

// Update slider values dynamically
function updateSliderValue(slider, valueElement, unit) {
    slider.addEventListener("input", () => {
        valueElement.textContent = `${slider.value}${unit}`;
        updateSystemOutputs();
    });
}

// Attach event listeners to sliders
updateSliderValue(currentTempSlider, currentTempValue, "°C");
updateSliderValue(currentHumiditySlider, currentHumidityValue, "%");
updateSliderValue(roomOccupancySlider, roomOccupancyValue, " people");
updateSliderValue(desiredTempSlider, desiredTempValue, "°C");
updateSliderValue(desiredHumiditySlider, desiredHumidityValue, "%");

// Update system outputs based on fuzzy logic
function updateSystemOutputs() {
    const inputs = {
        currentTemp: parseInt(currentTempSlider.value),
        currentHumidity: parseInt(currentHumiditySlider.value),
        roomOccupancy: parseInt(roomOccupancySlider.value),
        desiredTemp: parseInt(desiredTempSlider.value),
        desiredHumidity: parseInt(desiredHumiditySlider.value),
    };

    // Call fuzzy logic function
    const outputs = calculateFuzzyOutputs(inputs);

    // Update outputs dynamically
    compressorOutput.textContent = outputs.compressor;
    compressorOutput.className = outputs.compressor.toLowerCase();

    fanSpeedOutput.textContent = outputs.fanSpeed;
    fanSpeedOutput.className = outputs.fanSpeed.toLowerCase();

    expansionValveOutput.textContent = outputs.expansionValve;
    expansionValveOutput.className = outputs.expansionValve.toLowerCase();

    // Update all graphs dynamically
    renderAllGraphs(inputs);
}

// Calculate temperature category
calculateBtn.addEventListener("click", () => {
    const temp = parseInt(inputTemperature.value);
    if (isNaN(temp)) {
        calculationResult.textContent = "Please enter a valid temperature.";
        return;
    }

    // Example logic: Display whether the temperature is cold, comfortable, or hot
    if (temp < 18) {
        calculationResult.textContent = "The temperature is Cold.";
    } else if (temp >= 18 && temp <= 25) {
        calculationResult.textContent = "The temperature is Comfortable.";
    } else {
        calculationResult.textContent = "The temperature is Hot.";
    }
});