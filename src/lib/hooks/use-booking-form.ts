import { useState } from 'react';

export interface BookingFormData {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  state: string;
  model: string;
  date: string;
  message: string;
}

interface BookingHookReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  submitBooking: (formData: BookingFormData) => Promise<boolean>;
}

export const useBookingForm = (): BookingHookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitBooking = async (formData: BookingFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.name} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          company: [formData.city, formData.state, formData.country].filter(Boolean).join(', '),
          vehicleType: formData.model || 'General Enquiry',
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit. Please try again.');
      }

      setSuccess(true);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to process your request. Please try again.';
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, success, submitBooking };
};
