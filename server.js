const { startKafkaConsumer } = require('./connectors/kafka');
const path = require('path');
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const matchesRoute = require("./routes/matches");

//.env imports
const dotenv = require("dotenv");
dotenv.config()
// Connect to mongoDB
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
// Cors for mongo connection
app.use(cors());
app.use("/api/test", (req, res)=>{
    return res.send("Successfull test")
  });
app.use("/api/matches", matchesRoute);

// Create HTTP Server and Listen for Requests
app.listen(8080, async (req, res) => {
    // Start Kafka Consumer
    connect();
    await startKafkaConsumer()
  });
