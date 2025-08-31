"use client";

import { useState } from "react";
import { Guest, MealChoice } from "@/types";

interface RSVPFormProps {
  guest: Guest;
  onSubmit: (data: {
    guestId: string;
    guestName: string;
    attending: boolean;
    numberOfGuests: number;
    mealChoices: MealChoice[];
    specialRequests?: string;
  }) => void;
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
    <div className="bg-white shadow-xl p-8 border border-stone-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Attendance Question */}
        <div>
          <h3 className="text-2xl  text-slate-800 mb-6 text-center">
            Will you be attending our wedding?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => handleAttendingChange(true)}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-300 border-2 ${
                attending === true
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-white text-slate-700 border-stone-300 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              Yes, I&apos;ll be there! ✨
            </button>
            <button
              type="button"
              onClick={() => handleAttendingChange(false)}
              className={`px-8 py-4 rounded-full font-medium transition-all duration-300 border-2 ${
                attending === false
                  ? "bg-black text-white border-black shadow-lg"
                  : "bg-white text-slate-700 border-stone-300 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              Sorry, can&apos;t make it 💔
            </button>
          </div>
        </div>

        {/* Guest Count - Only show if attending */}
        {attending === true && (
          <>
            <div className="bg-stone-50 rounded-xl p-6">
              <h3 className="text-xl  text-slate-800 mb-4 text-center">
                How many guests will be attending?
              </h3>
              <p className="text-slate-700 mb-4 text-center">
                Including yourself (maximum {guest.maxGuests} guests)
              </p>
              <select
                value={numberOfGuests}
                onChange={(e) =>
                  handleGuestCountChange(parseInt(e.target.value))
                }
                className="w-full p-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 bg-white text-slate-800 font-medium"
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
            <div className="bg-stone-50 rounded-xl p-6">
              <h3 className="text-xl  text-slate-800 mb-6 text-center">
                Meal Preferences
              </h3>
              <div className="space-y-6">
                {mealChoices.map((choice) => (
                  <div
                    key={choice.guestNumber}
                    className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm"
                  >
                    <h4 className=" text-lg text-slate-800 mb-4">
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
                        className="w-full p-3 mb-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 bg-white text-slate-800"
                      />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(["beef", "fish", "vegetarian"] as const).map((meal) => (
                        <button
                          key={meal}
                          type="button"
                          onClick={() =>
                            updateMealChoice(choice.guestNumber, meal)
                          }
                          className={`p-4 rounded-xl text-sm font-medium transition-all duration-300 border-2 ${
                            choice.meal === meal
                              ? "bg-black text-white border-black shadow-lg"
                              : "bg-white text-slate-700 border-stone-300 hover:border-stone-400 hover:bg-stone-50"
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
            <div className="bg-stone-50 rounded-xl p-6">
              <h3 className="text-xl  text-slate-800 mb-4 text-center">
                Special Dietary Requirements or Requests
              </h3>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any allergies, dietary restrictions, or special requests..."
                className="w-full p-4 border-2 border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-500 focus:border-stone-500 bg-white text-slate-800 resize-none"
                rows={4}
              />
            </div>
          </>
        )}

        {/* Submit Button */}
        <div className="pt-6 text-center">
          <button
            type="submit"
            disabled={attending === null || isSubmitting}
            className="bg-stone-800 text-white py-4 px-12 rounded-full  text-lg hover:bg-stone-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {isSubmitting ? "Sending..." : "Send RSVP"}
          </button>
        </div>
      </form>
    </div>
  );
}
