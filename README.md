# Moose Telemetry API

## Setup

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/RoshanDewmina/moose-telemetry-api.git
cd moose-telemetry-api
```

### 2. Install Dependencies

Install all required packages:

```bash
npm install
```

### 3. Start the Server

Start the server using one of the following commands:

- **For production:**

  ```bash
  npm start
  ```

- **For development with automatic restarts using Nodemon:**

  ```bash
  npm run dev
  ```

---

## Testing the API Endpoints

Use Postman or a similar tool to test the endpoints.

### **GET /api/telemetry**

**Description:** Returns all telemetry data in JSON format.

- **Request:**

  ```http
  GET http://localhost:3000/api/telemetry
  ```

- **Response:**

  ```json
  [
    {
      "id": "abc123",
      "power": 500,
      "energy": 7500,
      "voltage": 220,
      "status": "active",
      "timestamp": "2024-11-07T15:45:00Z"
    },
    {
      "id": "def456",
      "power": 520,
      "energy": 7600,
      "voltage": 225,
      "status": "active",
      "timestamp": "2024-11-07T15:50:00Z"
    },
    ...
  ]
  ```

### **GET /api/telemetry/hourly**

**Description:** Returns hourly average power and energy data in JSON format.

- **Request:**

  ```http
  GET http://localhost:3000/api/telemetry/hourly
  ```

- **Response:**

  ```json
  [
    {
      "hour": "15:00",
      "averagePower": 600,
      "averageEnergy": 8000
    },
    {
      "hour": "16:00",
      "averagePower": 620,
      "averageEnergy": 8200
    },
    ...
  ]
  ```

---

## Additional Information

- **Data Simulation:**
  - The telemetry data is simulated and generated at regular intervals (every 10 seconds for testing purposes).
  - Each data point includes random values for `power`, `energy`, `voltage`, and updates the `timestamp` accordingly.

- **Data Storage:**
  - Data is stored in-memory during runtime.
  - Restarting the server will reset the data.

- **Scripts in `package.json`:**
  - `"start": "node server.js"`
  - `"dev": "nodemon server.js"`

---

## Notes

- **Port Configuration:**
  - The server runs on port `3000` by default.
  - If you need to change the port, update the `port` variable in `server.js`.

- **Testing Intervals:**
  - The data fetch interval is set to every 10 seconds for testing.
  - In a production environment, adjust the interval to match the external API's data availability.

- **Extending Functionality:**
  - For persistent data storage, consider integrating a database like MongoDB or PostgreSQL.

---