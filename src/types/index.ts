export interface Guest {
  id: string;
  name: string;
  email: string;
  uniqueUrl: string;
  plusOne: boolean;
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
  meal: "beef" | "fish" | "vegetarian";
  guestName?: string;
}

export interface WeddingDetails {
  brideName: string;
  groomName: string;
  date: string;
  time: string;
  ceremonyTime: string;
  venue: {
    name: string;
    address: string;
    city: string;
  };
}
