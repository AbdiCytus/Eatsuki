/**
 * API Route: /api/comments
 *
 * GET  — Fetch all comments, ordered newest first.
 *        Returns sessionId per comment so the client can identify ownership.
 * POST — Create a new comment with { name, message, sessionId }.
 *        sessionId is generated client-side (UUID v4) and stored here.
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/db";

// ── GET /api/comments ──────────────────────────────────────────────────────
export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch comments." },
      { status: 500 }
    );
  }
}

// ── POST /api/comments ─────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message, sessionId } = body;

    // Basic validation
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required." },
        { status: 400 }
      );
    }

    if (!sessionId?.trim()) {
      return NextResponse.json(
        { error: "Session ID is required." },
        { status: 400 }
      );
    }

    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name must be 100 characters or fewer." },
        { status: 400 }
      );
    }

    if (message.trim().length > 500) {
      return NextResponse.json(
        { error: "Message must be 500 characters or fewer." },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        name: name.trim(),
        message: message.trim(),
        sessionId: sessionId.trim(),
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create comment." },
      { status: 500 }
    );
  }
}
