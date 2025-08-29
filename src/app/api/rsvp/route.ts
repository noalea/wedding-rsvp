import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { RSVPResponse } from "@/types";

// GitHub repository configuration
const GITHUB_OWNER = process.env.GITHUB_OWNER || "noa-leas-projects"; // Your GitHub username
const GITHUB_REPO = process.env.GITHUB_REPO || "wedding"; // Your repository name
const RESPONSES_FILE_PATH = "src/data/rsvp-responses.json";
const BRANCH = "main";

// Initialize Octokit with GitHub token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function getResponsesFromGitHub(): Promise<RSVPResponse[]> {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: RESPONSES_FILE_PATH,
      ref: BRANCH,
    });

    if ("content" in data) {
      const content = Buffer.from(data.content, "base64").toString();
      return JSON.parse(content);
    }
    return [];
  } catch (error) {
    console.log("No existing responses file or error reading it:", error);
    return [];
  }
}

async function saveResponsesToGitHub(
  responses: RSVPResponse[],
  sha?: string
): Promise<void> {
  const content = JSON.stringify(responses, null, 2);
  const encodedContent = Buffer.from(content).toString("base64");

  await octokit.rest.repos.createOrUpdateFileContents({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: RESPONSES_FILE_PATH,
    message: `Update RSVP responses - ${new Date().toISOString()}`,
    content: encodedContent,
    branch: BRANCH,
    sha, // Include SHA if updating existing file
  });
}

export async function POST(request: NextRequest) {
  try {
    // Check if GitHub token is configured
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { success: false, message: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const rsvpResponse: RSVPResponse = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    // Get current responses and file SHA from GitHub
    let existingResponses: RSVPResponse[] = [];
    let fileSha: string | undefined;

    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: RESPONSES_FILE_PATH,
        ref: BRANCH,
      });

      if ("content" in data && "sha" in data) {
        const content = Buffer.from(data.content, "base64").toString();
        existingResponses = JSON.parse(content);
        fileSha = data.sha;
      }
    } catch (error) {
      console.log("Creating new responses file");
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

    // Save updated responses back to GitHub
    await saveResponsesToGitHub(existingResponses, fileSha);

    return NextResponse.json({
      success: true,
      message: "RSVP saved successfully to GitHub",
    });
  } catch (error) {
    console.error("Error saving RSVP to GitHub:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save RSVP" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Check if GitHub token is configured
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { success: false, message: "GitHub token not configured" },
        { status: 500 }
      );
    }

    const responses = await getResponsesFromGitHub();
    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error fetching RSVPs from GitHub:", error);
    return NextResponse.json([]);
  }
}
