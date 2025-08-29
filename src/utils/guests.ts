import { Guest, WeddingDetails } from "@/types";

// Get guests from environment variable (private and secure)
function getGuestsData(): Guest[] {
  try {
    const guestsJson = process.env.GUESTS;
    if (!guestsJson) {
      console.warn("GUESTS environment variable not found");
      return [];
    }
    return JSON.parse(guestsJson);
  } catch (error) {
    console.error("Error parsing GUESTS:", error);
    return [];
  }
}

export function getAllGuests(): Guest[] {
  return getGuestsData();
}

export function getGuestByUrl(uniqueUrl: string): Guest | null {
  const guestsData = getGuestsData();
  return guestsData.find((guest) => guest.uniqueUrl === uniqueUrl) || null;
}

export function getWeddingDetails(): WeddingDetails {
  return {
    brideName: "Sarah",
    groomName: "Michael",
    date: "Saturday, June 15th, 2024",
    time: "4:00 PM",
    venue: {
      name: "The Grand Ballroom",
      address: "123 Elegant Avenue",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
    },
  };
}
