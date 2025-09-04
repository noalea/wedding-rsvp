import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const authCookie = cookieStore.get("wedding_auth");

    if (!authCookie?.value) {
      return false;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not set in environment variables");
      return false;
    }

    // Verify the JWT token
    const decoded = jwt.verify(authCookie.value, jwtSecret, {
      issuer: "wedding-site",
      audience: "wedding-users",
    }) as { authenticated: boolean; timestamp: number };

    return decoded.authenticated === true;
  } catch (error) {
    // Token is invalid, expired, or malformed
    console.error("Error verifying authentication token:", error);
    return false;
  }
}

export function requireAuth(): boolean {
  const authenticated = isAuthenticated();
  if (!authenticated) {
    return false;
  }
  return true;
}
