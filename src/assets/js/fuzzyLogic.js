// Function to calculate fuzzy outputs based on inputs
function calculateFuzzyOutputs(inputs) {
    const { currentTemp, currentHumidity, roomOccupancy, desiredTemp, desiredHumidity } = inputs;

    // Fuzzy logic rules
    let compressor = "Low";
    let fanSpeed = "Low";
    let expansionValve = "Closed";

    if (
        currentTemp > desiredTemp + 2 ||
        currentHumidity > desiredHumidity + 10 ||
        roomOccupancy > 30
    ) {
        compressor = "High";
        fanSpeed = "High";
        expansionValve = "Fully Open";
    } else if (
        Math.abs(currentTemp - desiredTemp) <= 2 &&
        Math.abs(currentHumidity - desiredHumidity) <= 10 &&
        roomOccupancy <= 30
    ) {
        compressor = "Medium";
        fanSpeed = "Medium";
        expansionValve = "Half Open";
    } else if (
        currentTemp < desiredTemp - 2 ||
        currentHumidity < desiredHumidity - 10 ||
        roomOccupancy < 10
    ) {
        compressor = "Low";
        fanSpeed = "Low";
        expansionValve = "Closed";
    }

    // Return the calculated outputs
    return {
        compressor,
        fanSpeed,
        expansionValve,
    };
}

// Function to render all graphs dynamically
function renderAllGraphs(inputs) {
    renderSummaryGraph(inputs); // Call the new graph rendering function

    // Existing graph rendering logic (e.g., temperature, humidity, etc.)
    const tempData = [
        {
            x: [10, 15, 20, 25, 30, 35],
            y: [1, 0.8, 0.5, 0.2, 0, 0],
            type: "scatter",
            name: "Cold",
        },
        {
            x: [10, 15, 20, 25, 30, 35],
            y: [0, 0.2, 0.8, 1, 0.8, 0.2],
            type: "scatter",
            name: "Comfortable",
        },
        {
            x: [10, 15, 20, 25, 30, 35],
            y: [0, 0, 0.2, 0.5, 0.8, 1],
            type: "scatter",
            name: "Hot",
        },
    ];
    const tempLayout = {
        title: "Temperature Membership Functions",
        xaxis: { title: "Temperature (°C)" },
        yaxis: { title: "Membership Degree" },
    };
    Plotly.newPlot("membership-graph", tempData, tempLayout);
}

// Function to render the dynamic summary graph
function renderSummaryGraph(inputs) {
    const data = [
        {
            x: ["Temperature", "Humidity", "Occupancy"],
            y: [inputs.currentTemp, inputs.currentHumidity, inputs.roomOccupancy],
            type: "bar",
            marker: {
                color: ["#007bff", "#28a745", "#ffc107"],
            },
        },
    ];

    const layout = {
        title: "Dynamic Summary of Input Parameters",
        xaxis: { title: "Parameters" },
        yaxis: { title: "Values" },
    };

    Plotly.newPlot("summary-graph", data, layout);
}

// Call the graph rendering function initially
renderAllGraphs();
