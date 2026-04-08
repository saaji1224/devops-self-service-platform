const express = require("express");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

// AWS Config
AWS.config.update({
  region: "ap-south-1",
});

const dynamo = new AWS.DynamoDB.DocumentClient();

// Health Check
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// Create Project API
app.post("/create-project", async (req, res) => {
  try {
    const { name, type } = req.body;

    const params = {
      TableName: "projects",
      Item: {
        projectId: uuidv4(),
        name,
        type,
        createdAt: new Date().toISOString(),
      },
    };

    await dynamo.put(params).promise();

    res.json({ message: "Project created successfully 🚀" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
