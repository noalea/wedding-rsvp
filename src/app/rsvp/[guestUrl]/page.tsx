import { getGuestByUrl, getWeddingDetails } from "@/utils/guests";
import GuestRSVPClient from "./GuestRSVPClient";

interface PageProps {
  params: {
    guestUrl: string;
  };
}

export default function GuestRSVPPage({ params }: PageProps) {
  const { guestUrl } = params;
  const guest = getGuestByUrl(guestUrl);
  const weddingDetails = getWeddingDetails();

  if (!guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Guest Not Found
          </h1>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find an invitation with this link. Please
            check your invitation for the correct URL.
          </p>
        </div>
      </div>
    );
  }

  return <GuestRSVPClient guest={guest} weddingDetails={weddingDetails} />;
}
