import PasswordProtection from "@/components/PasswordProtection";
import { isAuthenticated } from "@/utils/auth";
import AdminClient from "./AdminClient";

export default function AdminPage() {
  const authenticated = isAuthenticated();

  return (
    <PasswordProtection
      title="Admin Access Required"
      description="Please enter the password to access the wedding RSVP dashboard."
      isAuthenticated={authenticated}
    >
      <AdminClient />
    </PasswordProtection>
  );
}
