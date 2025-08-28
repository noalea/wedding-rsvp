import Link from "next/link";
import { getAllGuests, getWeddingDetails } from "@/utils/guests";

export default function Home() {
  const guests = getAllGuests();
  const weddingDetails = getWeddingDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              {weddingDetails.brideName} & {weddingDetails.groomName}
            </h1>
            <div className="text-4xl mb-6">💕</div>
            <p className="text-2xl text-gray-600 mb-2">are getting married!</p>
            <p className="text-lg text-gray-500">{weddingDetails.date}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome to Our Wedding!
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
            We're so excited to celebrate our special day with our loved ones.
            If you received a personal invitation, please use the unique link
            provided to RSVP.
          </p>

          {/* Wedding Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                📅 When
              </h3>
              <p className="text-gray-600">{weddingDetails.date}</p>
              <p className="text-gray-600">{weddingDetails.time}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                📍 Where
              </h3>
              <p className="text-gray-600 font-medium">
                {weddingDetails.venue.name}
              </p>
              <p className="text-gray-600">{weddingDetails.venue.address}</p>
              <p className="text-gray-600">
                {weddingDetails.venue.city}, {weddingDetails.venue.state}{" "}
                {weddingDetails.venue.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Development/Demo Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Demo Guest Links
          </h3>
          <p className="text-blue-700 mb-4">
            Below are the demo guest RSVP links. In a real wedding website,
            guests would receive these unique URLs via email or text.
          </p>
          <div className="grid gap-3">
            {guests.map((guest) => (
              <Link
                key={guest.id}
                href={`/rsvp/${guest.uniqueUrl}`}
                className="block bg-white p-3 rounded border border-blue-200 hover:border-blue-400 transition-colors"
              >
                <span className="font-medium text-blue-800">{guest.name}</span>
                <span className="text-blue-600 text-sm ml-2">
                  (Max {guest.maxGuests} guests)
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
