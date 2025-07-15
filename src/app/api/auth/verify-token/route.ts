import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    if (token.includes("invalid")) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const mockUser = {
      id: "1",
      email: "user@example.com",
      name: "User Example",
      role: "librarian" as const,
    };

    return NextResponse.json({
      success: true,
      user: mockUser,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
