import express from "express";
import cors from "cors";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const docClient = DynamoDBDocumentClient.from(client);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Booking endpoint
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const tableName = process.env.DYNAMODB_TABLE_NAME || "autonxt-bookings";

    const params = {
      TableName: tableName,
      Item: {
        id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date().toISOString(),
        status: "pending",
      },
    };

    const command = new PutCommand(params);
    await docClient.send(command);

    res.status(201).json({
      success: true,
      message: "Booking saved successfully",
      bookingId: params.Item.id,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save booking",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
