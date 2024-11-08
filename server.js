const express = require("express");
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;


app.use(express.json());

let telemetryData = []; // using an in-memory array to store the telemetry data




// async function fetchTelemetryData() {
//   try {
//       const response = await fetch('https:.../api/telemetry');
//       const data = await response.json();
//       return data.map((item, index) => ({
//           id: `id_${index}`,
//           power: item.power,
//           energy: item.energy,
//           voltage: item.voltage,
//           status: item.status,
//           timestamp: item.timestamp,
//       }));
//   } catch (error) {
//       console.error('Error fetching telemetry data:', error);
//       return [];
//   }
// }

 // the commneted out function above can be used to fetch data from an external API and return it as an array of objects but since we dont have access to the actual external API, we can simulate fetching data from external API

function fetchTelemetryData() {
  return {
    power: Math.floor(Math.random() * 1000),
    energy: Math.floor(Math.random() * 10000),
    voltage: Math.floor(Math.random() * 140) + 100,
    status: "active",
    timestamp: new Date().toISOString(),
  };
}

// generate a UID for each data point, id is seperated from the featchTelemetryData function
function generateUniqueId() {
  return uuidv4();
}

// Store fetched data
function storeTelemetryData() {
  const rawData = fetchTelemetryData();
  rawData.id = generateUniqueId(); // creates an ID property for data and assigns a unique ID

  // constructing an obj with properties in the expected order to ensure the 'id' property appears first otherwise it would be added at the end of the object
  const data = {
    id: rawData.id,
    power: rawData.power,
    energy: rawData.energy,
    voltage: rawData.voltage,
    status: rawData.status,
    timestamp: rawData.timestamp,
  };

  telemetryData.push(data);
  console.log("Stored new telemetry data:", data);
}

// data fetching every 10 seconds for testing purposes, (change to 5 mins for production) to similute fetching data at same intervals to build up a dataset over time.
setInterval(storeTelemetryData, 10000);

// fetch data on startup so theres at least 1 data point available
storeTelemetryData();

// GET /api/telemetry
app.get("/api/telemetry", (req, res) => {
  res.json(telemetryData);
});

// GET /api/telemetry/hourly
app.get("/api/telemetry/hourly", (req, res) => {
  const groupedData = {}; // object to store the grouped data

  telemetryData.forEach((data) => {
    const date = new Date(data.timestamp);
    const hour = date.getHours();

    // if the hour key doesn't exist, create it and initialize the values
    if (!groupedData[hour]) {
      groupedData[hour] = {
        hour: `${hour}:00`,
        totalPower: 0,
        totalEnergy: 0,
        count: 0,
      };
    }

    // adding the power and energy values to the total for the hour
    groupedData[hour].totalPower += data.power;
    groupedData[hour].totalEnergy += data.energy;
    groupedData[hour].count += 1;
  });

  // convert the groupedData object into an array of objects with the average power and energy values
  const result = Object.values(groupedData).map((group) => ({
    hour: group.hour,
    averagePower: group.totalPower / group.count,
    averageEnergy: group.totalEnergy / group.count,
  }));

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server's running on port ${port}`);
});
