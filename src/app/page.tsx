import Link from "next/link";
import { getAllGuests, getWeddingDetails } from "@/utils/guests";

export default function Home() {
  const guests = getAllGuests();
  const weddingDetails = getWeddingDetails();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Header */}
      <div className="relative bg-stone-100 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-stone-400 rounded-full"></div>
          <div className="absolute top-32 right-20 w-20 h-20 border border-stone-400 rounded-full"></div>
          <div className="absolute bottom-20 right-1/4 w-16 h-16 border border-stone-400 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-8">
          {/* Mobile-only Wedding Invitation Header and Names */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center">
              <div className="h-px bg-stone-400 w-16"></div>
              <div className="mx-4 text-stone-600">❦</div>
              <div className="h-px bg-stone-400 w-16"></div>
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
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
            {/* Left Side - Photo */}
            <div className="relative order-1 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/us.jpg"
                  alt={`${weddingDetails.brideName} and ${weddingDetails.groomName}`}
                  className="w-full h-[250px] lg:h-[600px] object-cover"
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
                <div className="h-px bg-stone-400 w-16"></div>
                <div className="mx-4 text-stone-600">❦</div>
                <div className="h-px bg-stone-400 w-16"></div>
              </div>

              <div>
                <p className="hidden lg:block text-stone-700 text-sm font-medium tracking-widest uppercase mb-4">
                  Wedding Invitation
                </p>
                <h1 className="hidden lg:block text-3xl lg:text-5xl  text-stone-900 mb-6 leading-tight">
                  {weddingDetails.brideName}
                  <span className="text-2xl lg:text-3xl text-stone-700 my-3 font-light">
                    &nbsp;&&nbsp;
                  </span>
                  {weddingDetails.groomName}
                </h1>
                <p className="text-xl text-stone-900 mb-4">
                  are getting married!
                </p>
                <p className="text-lg text-stone-700">{weddingDetails.date}</p>
              </div>

              {/* Ornamental Divider */}
              <div className="flex items-center justify-center lg:justify-start">
                <div className="h-px bg-stone-400 w-16"></div>
                <div className="mx-4 text-stone-600">❦</div>
                <div className="h-px bg-stone-400 w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-stone-300">
          <h2 className="text-3xl  text-stone-900 mb-6 text-center">
            Welcome to Our Wedding
          </h2>
          <p className="text-lg text-stone-700 text-center mb-8 leading-relaxed">
            We&apos;re so excited to celebrate our special day with our loved
            ones. If you received a personal invitation, please use the unique
            link provided to RSVP.
          </p>

          {/* Wedding Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-stone-600 text-2xl mb-3">📅</div>
              <h3 className="text-lg  text-stone-900 mb-2">When</h3>
              <p className="text-stone-700 font-medium">
                {weddingDetails.date}
              </p>
              <p className="text-stone-700">{weddingDetails.time}</p>
            </div>
            <div className="text-center">
              <div className="text-stone-600 text-2xl mb-3">📍</div>
              <h3 className="text-lg  text-stone-900 mb-2">Where</h3>
              <p className="text-stone-700 font-medium">
                {weddingDetails.venue.name}
              </p>
              <p className="text-stone-700">{weddingDetails.venue.address}</p>
              <p className="text-stone-700">{weddingDetails.venue.city}</p>
            </div>
          </div>
        </div>

        {/* Development/Demo Section */}
        <div className="bg-stone-100 border border-stone-300 rounded-2xl p-8">
          <h3 className="text-2xl  text-stone-900 mb-6 text-center">
            Guest List
          </h3>

          <div className="grid gap-4">
            {guests.map((guest) => (
              <Link
                key={guest.id}
                href={`/rsvp/${guest.uniqueUrl}`}
                className="block bg-white p-4 rounded-xl border border-stone-300 hover:border-stone-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span className=" text-lg text-stone-900">{guest.name}</span>
                <span className="text-stone-700 text-sm ml-2">
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
