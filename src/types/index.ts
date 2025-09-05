export interface Guest {
  id: string;
  name: string;
  phoneNumber: string;
  uniqueUrl: string;
  maxGuests: number;
}

export interface RSVPResponse {
  guestId: string;
  guestName: string;
  attending: boolean;
  numberOfGuests: number;
  mealChoices: MealChoice[];
  specialRequests?: string;
  submittedAt: string;
}

export interface MealChoice {
  guestNumber: number;
  meal: "beef" | "fish" | "vegetarian" | "kids";
  guestName?: string;
}

export interface WeddingDetails {
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  date: string;
  time: string;
  ceremonyTime: string;
  rsvpDate: string;
  venue: {
    name: string;
    address: string;
    city: string;
  };
}
