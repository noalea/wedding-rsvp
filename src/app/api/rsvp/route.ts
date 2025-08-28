import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { RSVPResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rsvpResponse: RSVPResponse = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // Read existing responses
    const responsesPath = path.join(
      process.cwd(),
      "src/data/rsvp-responses.json"
    );
    let existingResponses: RSVPResponse[] = [];

    try {
      const data = await fs.readFile(responsesPath, "utf8");
      existingResponses = JSON.parse(data);
    } catch {
      // File doesn't exist or is empty, start with empty array
      existingResponses = [];
    }

    // Check if guest has already submitted (update if exists)
    const existingIndex = existingResponses.findIndex(
      (response) => response.guestId === rsvpResponse.guestId
    );

    if (existingIndex !== -1) {
      existingResponses[existingIndex] = rsvpResponse;
    } else {
      existingResponses.push(rsvpResponse);
    }

    // Write updated responses back to file
    await fs.writeFile(
      responsesPath,
      JSON.stringify(existingResponses, null, 2)
    );

    return NextResponse.json({
      success: true,
      message: "RSVP saved successfully",
    });
  } catch (error) {
    console.error("Error saving RSVP:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const responsesPath = path.join(
      process.cwd(),
      "src/data/rsvp-responses.json"
    );
    const data = await fs.readFile(responsesPath, "utf8");
    const responses = JSON.parse(data);

    return NextResponse.json(responses);
  } catch {
    return NextResponse.json([]);
  }
}
