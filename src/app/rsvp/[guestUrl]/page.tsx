"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Guest } from "@/types";
import { getGuestByUrl, getWeddingDetails } from "@/utils/guests";
import RSVPForm from "@/components/RSVPForm";

export default function GuestRSVPPage() {
  const params = useParams();
  const guestUrl = params.guestUrl as string;

  const [guest, setGuest] = useState<Guest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weddingDetails = getWeddingDetails();

  useEffect(() => {
    if (guestUrl) {
      const foundGuest = getGuestByUrl(guestUrl);
      setGuest(foundGuest);
    }
  }, [guestUrl]);

  const handleRSVPSubmit = async (rsvpData: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rsvpData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit RSVP");
      }
    } catch (err) {
      setError(
        "Sorry, there was an error submitting your RSVP. Please try again."
      );
      console.error("RSVP submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Guest Not Found
          </h1>
          <p className="text-gray-600">
            Sorry, we couldn't find an invitation with this link. Please check
            your invitation for the correct URL.
          </p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your RSVP has been successfully submitted. We can't wait to
            celebrate with you!
          </p>
          <div className="text-sm text-gray-500">
            If you need to make any changes, please contact us directly.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {weddingDetails.brideName} & {weddingDetails.groomName}
            </h1>
            <div className="text-2xl text-pink-600 mb-4">💕</div>
            <p className="text-xl text-gray-600">are getting married!</p>
          </div>
        </div>
      </div>

      {/* Wedding Details */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Wedding Details
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                📅 Date & Time
              </h3>
              <p className="text-gray-600">{weddingDetails.date}</p>
              <p className="text-gray-600">{weddingDetails.time}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                📍 Venue
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

        {/* Personal Greeting */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Dear {guest.name},
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            We are so excited to celebrate our special day with you! Your
            presence would mean the world to us. Please let us know if you'll be
            able to join us by filling out the RSVP form below.
          </p>
        </div>

        {/* RSVP Form */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            RSVP
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          <RSVPForm
            guest={guest}
            onSubmit={handleRSVPSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
