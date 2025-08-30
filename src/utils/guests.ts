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
    brideName: process.env.BRIDE_NAME ?? "",
    groomName: process.env.GROOM_NAME ?? "",
    date: process.env.DATE ?? "",
    time: process.env.TIME ?? "",
    ceremonyTime: process.env.CEREMONY_TIME ?? "",
    venue: {
      name: process.env.VENUE_NAME ?? "",
      address: process.env.VENUE_ADDRESS ?? "",
      city: process.env.VENUE_CITY ?? "",
    },
  };
}
