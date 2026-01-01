import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, number>();

function checkheader(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;

  if (!authHeader || authHeader !== expectedToken) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid access token" },
      { status: 401 }
    );
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const lastRequest = rateLimitMap.get(ip);
  const now = Date.now();

  if (lastRequest && now - lastRequest < 10000) {
    return NextResponse.json(
      { error: "Too many requests. Please wait 10s." },
      { status: 429 }
    );
  }
  rateLimitMap.set(ip, now);

  const headerError = checkheader(request);
  if (headerError) return headerError;

  try {
    const body = await request.json();
    const { prompt } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server missing API Key" },
        { status: 500 }
      );
    }

    const externalResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!externalResponse.ok) {
      const errorData = await externalResponse.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Error from Google API" },
        { status: externalResponse.status }
      );
    }

    const data = await externalResponse.json();

    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.";

    return NextResponse.json({ answer: answer });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const headerError = checkheader(request);
  if (headerError) return headerError;
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function PUT(request: Request) {
  const headerError = checkheader(request);
  if (headerError) return headerError;
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

export async function DELETE(request: Request) {
  const headerError = checkheader(request);
  if (headerError) return headerError;
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
