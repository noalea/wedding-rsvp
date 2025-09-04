import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    const correctPassword = process.env.WEDDING_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    // Check if the environment variables are set
    if (!correctPassword) {
      console.error("WEDDING_PASSWORD is not set in environment variables");
      return NextResponse.json(
        { success: false, message: "Password not configured" },
        { status: 500 }
      );
    }

    if (!jwtSecret) {
      console.error("JWT_SECRET is not set in environment variables");
      return NextResponse.json(
        { success: false, message: "JWT secret not configured" },
        { status: 500 }
      );
    }

    // Verify the password
    const isValid = password === correctPassword;

    if (isValid) {
      // Generate JWT token
      const token = jwt.sign(
        {
          authenticated: true,
          timestamp: Date.now(),
        },
        jwtSecret,
        {
          expiresIn: "24h",
          issuer: "wedding-site",
          audience: "wedding-users",
        }
      );

      // Set HTTP-only cookie with JWT token
      const response = NextResponse.json({
        success: true,
        message: "Authentication successful",
      });

      response.cookies.set("wedding_auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
