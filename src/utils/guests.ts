import { Guest, WeddingDetails } from "@/types";
import guestsData from "@/data/guests.json";

export function getAllGuests(): Guest[] {
  return guestsData;
}

export function getGuestByUrl(uniqueUrl: string): Guest | null {
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
