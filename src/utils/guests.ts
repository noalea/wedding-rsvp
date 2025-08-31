import { Guest, WeddingDetails } from "@/types";

// Calculate RSVP date (3 weeks prior to wedding date)
function calculateRSVPDate(weddingDateStr: string): string {
  try {
    // Parse the wedding date string (assuming format like "Saturday, October 26, 2024")
    const weddingDate = new Date(weddingDateStr);

    // Subtract 21 days (3 weeks)
    const rsvpDate = new Date(weddingDate);
    rsvpDate.setDate(rsvpDate.getDate() - 21);

    // Format as a readable date
    return rsvpDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error calculating RSVP date:", error);
    return "Please respond by 3 weeks before the wedding";
  }
}

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
  const weddingDate = process.env.DATE ?? "";

  return {
    brideName: process.env.BRIDE_NAME ?? "",
    groomName: process.env.GROOM_NAME ?? "",
    date: weddingDate,
    time: process.env.TIME ?? "",
    ceremonyTime: process.env.CEREMONY_TIME ?? "",
    rsvpDate: calculateRSVPDate(weddingDate),
    venue: {
      name: process.env.VENUE_NAME ?? "",
      address: process.env.VENUE_ADDRESS ?? "",
      city: process.env.VENUE_CITY ?? "",
    },
  };
}
