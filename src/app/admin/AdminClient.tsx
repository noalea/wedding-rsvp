"use client";

import { useState, useEffect } from "react";
import { RSVPResponse } from "@/types";

export default function AdminClient() {
  const [responses, setResponses] = useState<RSVPResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch("/api/rsvp");
        const data = await response.json();
        setResponses(data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const attendingGuests = responses.filter((r) => r.attending);
  const notAttendingGuests = responses.filter((r) => !r.attending);
  const totalGuestCount = attendingGuests.reduce(
    (sum, r) => sum + r.numberOfGuests,
    0
  );

  const mealCounts = attendingGuests.reduce((counts, response) => {
    response.mealChoices.forEach((choice) => {
      counts[choice.meal] = (counts[choice.meal] || 0) + 1;
    });
    return counts;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading responses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Wedding RSVP Admin
        </h1>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total Responses
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {responses.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Attending
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {attendingGuests.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Not Attending
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {notAttendingGuests.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Total Guests
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {totalGuestCount}
            </p>
          </div>
        </div>

        {/* Meal Count Summary */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Meal Preferences
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {mealCounts.beef || 0}
              </p>
              <p className="text-gray-600">🥩 Beef</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {mealCounts.fish || 0}
              </p>
              <p className="text-gray-600">🐟 Fish</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mealCounts.vegetarian || 0}
              </p>
              <p className="text-gray-600">🥗 Vegetarian</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {mealCounts.kids || 0}
              </p>
              <p className="text-gray-600">🧒 Kids Meal</p>
            </div>
          </div>
        </div>

        {/* Attending Guests */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Attending Guests ({attendingGuests.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meal Choices
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Special Requests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendingGuests.map((response) => (
                  <tr key={response.guestId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {response.guestName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {response.numberOfGuests}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {response.mealChoices.map((choice, index) => (
                        <div key={index} className="mb-1">
                          {choice.guestName && `${choice.guestName}: `}
                          <span>
                            {choice.meal === "beef" && "🥩 Beef"}
                            {choice.meal === "fish" && "🐟 Fish"}
                            {choice.meal === "vegetarian" && "🥗 Vegetarian"}
                            {choice.meal === "kids" && "🧒 Kids Meal"}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      {response.specialRequests || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(response.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Not Attending Guests */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Not Attending ({notAttendingGuests.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notAttendingGuests.map((response) => (
                  <tr key={response.guestId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {response.guestName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(response.submittedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
