"use client";

import { useState } from "react";
import { Guest, MealChoice, WeddingDetails } from "@/types";
import RSVPForm from "@/components/RSVPForm";
import ElegantConfetti from "@/components/ElegantConfetti";

interface GuestRSVPClientProps {
  guest: Guest;
  weddingDetails: WeddingDetails;
}

export default function GuestRSVPClient({
  guest,
  weddingDetails,
}: GuestRSVPClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRSVPSubmit = async (rsvpData: {
    guestId: string;
    guestName: string;
    attending: boolean;
    numberOfGuests: number;
    mealChoices: MealChoice[];
    specialRequests?: string;
  }) => {
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12 border border-stone-200">
            <div className="text-6xl mb-6">🌿</div>
            <h1 className="text-4xl  text-stone-900 mb-6">Thank You!</h1>
            <p className="text-lg text-stone-700 mb-8 leading-relaxed">
              Your RSVP has been received. We can&apos;t wait to celebrate this
              special day with you!
            </p>
            <div className="text-sm text-rose-400 italic">
              You can return to this page anytime to update your RSVP if needed.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <ElegantConfetti />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Elegant Floral Accents - Hero Section */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 right-8 text-rose-400 text-2xl opacity-60 animate-pulse">
            🌸
          </div>
          <div
            className="absolute bottom-32 left-20 text-rose-300 text-xl opacity-50 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            🌿
          </div>
          <div
            className="absolute top-1/2 right-8 text-rose-400 text-lg opacity-40 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            🌸
          </div>
          <div
            className="absolute bottom-16 right-32 text-rose-300 text-sm opacity-60 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            🌿
          </div>
          <div
            className="absolute top-24 left-8 text-rose-300 text-lg opacity-40 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          >
            🌺
          </div>
          <div
            className="absolute top-3/4 left-16 text-rose-400 text-sm opacity-50 animate-pulse"
            style={{ animationDelay: "3s" }}
          >
            🌸
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto py-8">
          {/* Mobile-only Wedding Invitation Header and Names */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center">
              <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-16"></div>
              <div className="mx-4 text-rose-400">❦</div>
              <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-16"></div>
            </div>
            <p className="text-stone-700 text-sm font-medium tracking-widest uppercase mt-4 mb-6">
              Wedding Invitation
            </p>
            <h1 className="text-4xl  text-stone-900 mb-6 leading-tight">
              {weddingDetails.brideName}
              <span className="text-2xl text-stone-700 my-3 font-light">
                &nbsp;&&nbsp;
              </span>
              {weddingDetails.groomName}
            </h1>
            <div className="text-center text-stone-600 text-sm italic mb-6 leading-relaxed">
              <div>Son of {weddingDetails.groomParents}</div>
              <div className="mb-1">
                Daughter of {weddingDetails.brideParents}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Side - Photo */}
            <div className="relative order-1 lg:order-1">
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src="/us.jpg"
                  alt={`${weddingDetails.brideName} and ${weddingDetails.groomName}`}
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  style={{ objectPosition: "center 20%" }}
                />
                {/* Subtle overlay for elegance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-stone-300 rounded-2xl -z-10"></div>
            </div>

            {/* Right Side - Wedding Information */}
            <div className="text-center lg:text-left space-y-8 order-2 lg:order-2">
              {/* Ornamental Divider */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-16"></div>
                <div className="mx-4 text-rose-400">❦</div>
                <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-16"></div>
              </div>

              {/* Wedding Invitation Header */}
              <div>
                <p className="hidden lg:block text-stone-700 text-sm font-medium tracking-widest uppercase mb-4">
                  Wedding Invitation
                </p>
                <h1 className="hidden lg:block text-4xl lg:text-5xl text-stone-900 mb-6 leading-tight">
                  {weddingDetails.brideName}
                  <span className="text-2xl lg:text-3xl text-stone-700 my-3 font-light">
                    &nbsp;&&nbsp;
                  </span>
                  {weddingDetails.groomName}
                </h1>
                <div className="hidden lg:block text-left text-stone-600 text-sm italic mb-6 leading-relaxed">
                  <div>Son of {weddingDetails.groomParents}</div>
                  <div className="mb-1">
                    Daughter of {weddingDetails.brideParents}
                  </div>
                </div>
              </div>

              {/* Wedding Details */}
              <div className="bg-white/70 backdrop-blur-sm p-8 shadow-lg border border-stone-300">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="text-center mb-8">
                    <div className="text-rose-400 text-2xl mb-2">📅</div>
                    <h3 className="text-lg text-stone-900 mb-1">When</h3>
                    <p className="text-stone-700 font-medium text-sm">
                      {weddingDetails.date}
                    </p>
                    <p className="text-stone-700 text-sm">
                      {weddingDetails.time}
                    </p>
                    {weddingDetails.ceremonyTime && (
                      <p className="text-slate-500 text-xs mt-1 italic">
                        Ceremony begins {weddingDetails.ceremonyTime} sharp
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-rose-400 text-2xl mb-2">📍</div>
                    <h3 className="text-lg text-stone-900 mb-1">Where</h3>
                    <p className="text-stone-700 font-medium text-sm">
                      {weddingDetails.venue.name}
                    </p>
                    <p className="text-stone-700 text-sm">
                      {weddingDetails.venue.address}
                    </p>
                    <p className="text-stone-700 text-sm">
                      {weddingDetails.venue.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ornamental Divider */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-16"></div>
                <div className="mx-4 text-rose-400">❦</div>
                <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Greeting Section */}
      <div className="relative max-w-4xl mx-auto py-6">
        {/* Floral Accents around Greeting */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-4 left-8 text-rose-300 text-xl opacity-50 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            🌸
          </div>
          <div
            className="absolute top-12 right-12 text-rose-400 text-lg opacity-40 animate-pulse"
            style={{ animationDelay: "2s" }}
          >
            🌿
          </div>
          <div
            className="absolute bottom-8 left-16 text-rose-300 text-sm opacity-60 animate-pulse"
            style={{ animationDelay: "1.5s" }}
          >
            🌺
          </div>
          <div
            className="absolute bottom-4 right-8 text-rose-400 text-lg opacity-45 animate-pulse"
            style={{ animationDelay: "3s" }}
          >
            🌸
          </div>
        </div>

        <div className="relative bg-white shadow-lg p-12 border border-stone-300 text-center">
          <h2 className="text-2xl  text-stone-900 mb-6">Dear {guest.name},</h2>
          <p className="text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto">
            We are so excited to celebrate our special day with you! Your
            presence would mean the world to us. <br />
            <br />
            Please let us know if you&apos;ll be able to join us by filling out
            the RSVP form below.
          </p>
        </div>
      </div>

      {/* RSVP Section */}
      <div className="relative max-w-4xl mx-auto py-16">
        {/* Floral Accents around RSVP */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-8 left-4 text-rose-400 text-2xl opacity-50 animate-pulse"
            style={{ animationDelay: "1s" }}
          >
            🌸
          </div>
          <div
            className="absolute top-20 right-8 text-rose-300 text-lg opacity-45 animate-pulse"
            style={{ animationDelay: "2.5s" }}
          >
            🌿
          </div>
          <div
            className="absolute top-1/2 left-8 text-rose-400 text-sm opacity-40 animate-pulse"
            style={{ animationDelay: "4s" }}
          >
            🌺
          </div>
          <div
            className="absolute bottom-16 right-12 text-rose-300 text-xl opacity-55 animate-pulse"
            style={{ animationDelay: "0.8s" }}
          >
            🌸
          </div>
          <div
            className="absolute bottom-32 left-16 text-rose-400 text-lg opacity-40 animate-pulse"
            style={{ animationDelay: "3.2s" }}
          >
            🌿
          </div>
        </div>

        <div className="relative text-center mb-12">
          <h2 className="text-4xl  text-stone-900 mb-4">RSVP</h2>
          <p className="text-stone-700 text-lg">
            Kindly respond by <br />
            {weddingDetails.rsvpDate}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8 max-w-2xl mx-auto">
            {error}
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <RSVPForm
            guest={guest}
            onSubmit={handleRSVPSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative py-12">
        {/* Floral Accents in Footer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-4 left-12 text-rose-300 text-lg opacity-40 animate-pulse"
            style={{ animationDelay: "1.2s" }}
          >
            🌸
          </div>
          <div
            className="absolute top-8 right-16 text-rose-400 text-sm opacity-50 animate-pulse"
            style={{ animationDelay: "2.8s" }}
          >
            🌿
          </div>
          <div
            className="absolute bottom-4 left-20 text-rose-300 text-xl opacity-45 animate-pulse"
            style={{ animationDelay: "0.6s" }}
          >
            🌺
          </div>
          <div
            className="absolute bottom-8 right-8 text-rose-400 text-lg opacity-35 animate-pulse"
            style={{ animationDelay: "3.5s" }}
          >
            🌸
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-20"></div>
            <div className="mx-6 text-rose-400 text-2xl">❦</div>
            <div className="h-px bg-gradient-to-r from-stone-400 to-rose-300 w-20"></div>
          </div>
          <p className="text-stone-700 italic">
            We can&apos;t wait to celebrate with you!
          </p>
        </div>
      </div>
    </div>
  );
}
