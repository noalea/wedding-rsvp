"use client";

import { useState } from "react";
import { Guest, MealChoice } from "@/types";

interface RSVPFormProps {
  guest: Guest;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export default function RSVPForm({
  guest,
  onSubmit,
  isSubmitting,
}: RSVPFormProps) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [mealChoices, setMealChoices] = useState<MealChoice[]>([
    { guestNumber: 1, meal: "beef" },
  ]);
  const [specialRequests, setSpecialRequests] = useState("");

  const handleAttendingChange = (value: boolean) => {
    setAttending(value);
    if (!value) {
      setNumberOfGuests(0);
      setMealChoices([]);
    } else {
      setNumberOfGuests(1);
      setMealChoices([{ guestNumber: 1, meal: "beef" }]);
    }
  };

  const handleGuestCountChange = (count: number) => {
    setNumberOfGuests(count);
    const newMealChoices: MealChoice[] = [];
    for (let i = 1; i <= count; i++) {
      const existingChoice = mealChoices.find(
        (choice) => choice.guestNumber === i
      );
      newMealChoices.push({
        guestNumber: i,
        meal: existingChoice?.meal || "beef",
        guestName: existingChoice?.guestName || "",
      });
    }
    setMealChoices(newMealChoices);
  };

  const updateMealChoice = (
    guestNumber: number,
    meal: "beef" | "fish" | "vegetarian"
  ) => {
    setMealChoices((prev) =>
      prev.map((choice) =>
        choice.guestNumber === guestNumber ? { ...choice, meal } : choice
      )
    );
  };

  const updateGuestName = (guestNumber: number, guestName: string) => {
    setMealChoices((prev) =>
      prev.map((choice) =>
        choice.guestNumber === guestNumber ? { ...choice, guestName } : choice
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (attending === null) return;

    onSubmit({
      guestId: guest.id,
      guestName: guest.name,
      attending,
      numberOfGuests: attending ? numberOfGuests : 0,
      mealChoices: attending ? mealChoices : [],
      specialRequests: specialRequests.trim() || undefined,
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Attendance Question */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Will you be attending our wedding?
          </h3>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleAttendingChange(true)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                attending === true
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Yes, I'll be there! ✨
            </button>
            <button
              type="button"
              onClick={() => handleAttendingChange(false)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                attending === false
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Sorry, can't make it 💔
            </button>
          </div>
        </div>

        {/* Guest Count - Only show if attending */}
        {attending === true && (
          <>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                How many guests will be attending?
              </h3>
              <p className="text-gray-600 mb-3">
                Including yourself (maximum {guest.maxGuests} guests)
              </p>
              <select
                value={numberOfGuests}
                onChange={(e) =>
                  handleGuestCountChange(parseInt(e.target.value))
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                {Array.from({ length: guest.maxGuests }, (_, i) => i + 1).map(
                  (num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Meal Choices */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Meal Preferences
              </h3>
              <div className="space-y-4">
                {mealChoices.map((choice) => (
                  <div
                    key={choice.guestNumber}
                    className="bg-gray-50 p-4 rounded-lg"
                  >
                    <h4 className="font-medium text-gray-700 mb-2">
                      Guest {choice.guestNumber}
                      {choice.guestNumber === 1 ? ` (${guest.name})` : ""}
                    </h4>

                    {choice.guestNumber > 1 && (
                      <input
                        type="text"
                        placeholder="Guest name (optional)"
                        value={choice.guestName || ""}
                        onChange={(e) =>
                          updateGuestName(choice.guestNumber, e.target.value)
                        }
                        className="w-full p-2 mb-3 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      />
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      {(["beef", "fish", "vegetarian"] as const).map((meal) => (
                        <button
                          key={meal}
                          type="button"
                          onClick={() =>
                            updateMealChoice(choice.guestNumber, meal)
                          }
                          className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                            choice.meal === meal
                              ? "bg-pink-600 text-white"
                              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {meal === "beef" && "🥩 Beef"}
                          {meal === "fish" && "🐟 Fish"}
                          {meal === "vegetarian" && "🥗 Vegetarian"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Special Dietary Requirements or Requests
              </h3>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any allergies, dietary restrictions, or special requests..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={attending === null || isSubmitting}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-pink-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Submit RSVP"}
          </button>
        </div>
      </form>
    </div>
  );
}
