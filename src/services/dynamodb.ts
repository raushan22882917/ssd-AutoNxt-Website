import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Client
const client = new DynamoDBClient({
  region: import.meta.env.VITE_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "",
  },
});

const docClient = DynamoDBDocumentClient.from(client);

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  tractorModel?: string;
  preferredDate?: string;
  location?: string;
}

/**
 * Save booking data to DynamoDB
 */
export async function saveBookingToDynamoDB(
  bookingData: BookingData
): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  try {
    const bookingId = `BOOKING-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    const params = {
      TableName: import.meta.env.VITE_DYNAMODB_TABLE_NAME || "autonxt-bookings",
      Item: {
        bookingId, // Primary Key
        timestamp, // Sort Key
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        subject: bookingData.subject,
        message: bookingData.message,
        tractorModel: bookingData.tractorModel || "Not specified",
        preferredDate: bookingData.preferredDate || "Not specified",
        location: bookingData.location || "Not specified",
        status: "PENDING", // Initial status
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };

    const command = new PutCommand(params);
    await docClient.send(command);

    console.log("Booking saved successfully:", bookingId);
    return { success: true, bookingId };
  } catch (error) {
    console.error("Error saving booking to DynamoDB:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Get booking by ID
 */
export async function getBookingById(bookingId: string) {
  try {
    const { GetCommand } = await import("@aws-sdk/lib-dynamodb");
    const params = {
      TableName: import.meta.env.VITE_DYNAMODB_TABLE_NAME || "autonxt-bookings",
      Key: {
        bookingId,
      },
    };

    const command = new GetCommand(params);
    const response = await docClient.send(command);
    return response.Item;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
}
