import { saveBookingToDynamoDB, BookingData } from "../services/dynamodb";

/**
 * API endpoint to handle booking submissions
 * This can be called from the frontend
 */
export async function submitBooking(bookingData: BookingData) {
  try {
    // Validate required fields
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      return {
        success: false,
        error: "Name, email, and phone are required fields",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      return {
        success: false,
        error: "Please provide a valid email address",
      };
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(bookingData.phone)) {
      return {
        success: false,
        error: "Please provide a valid phone number",
      };
    }

    // Save to DynamoDB
    const result = await saveBookingToDynamoDB(bookingData);

    if (result.success) {
      return {
        success: true,
        message: "Booking submitted successfully",
        bookingId: result.bookingId,
      };
    } else {
      return {
        success: false,
        error: result.error || "Failed to save booking",
      };
    }
  } catch (error) {
    console.error("Error in submitBooking:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

/**
 * Alternative: Backend API endpoint (if using Express/Node backend)
 * This would be called via fetch/axios from the frontend
 */
export async function submitBookingViaAPI(bookingData: BookingData) {
  try {
    const response = await fetch("/api/bookings/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error submitting booking via API:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to submit booking",
    };
  }
}
