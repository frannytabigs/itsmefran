import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, number>();

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  const lastRequest = rateLimitMap.get(ip);
  const now = Date.now();

  if (lastRequest && now - lastRequest < 10000) {
    return NextResponse.json(
      { error: "Too many requests. Please wait." },
      { status: 429 }
    );
  }

  rateLimitMap.set(ip, now);
  const authHeader = request.headers.get("authorization");
  const expectedToken = `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;

  if (!authHeader || authHeader !== expectedToken) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid access token" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const { prompt } = body;
  try {
    const externalResponse = await fetch(
      "https://api.example.com/v1/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CHATBOT_SERVICE_KEY}`,
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!externalResponse.ok) {
      const err = await externalResponse.json();
      return NextResponse.json(
        { error: err },
        { status: externalResponse.status }
      );
    }

    const data = await externalResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
