/**
 * API Route: /api/comments/[id]
 *
 * PUT    — Update an existing comment's name and/or message.
 * DELETE — Delete a comment by its ID.
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/db";

// ── PUT /api/comments/[id] ─────────────────────────────────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, message } = body;

    // Basic validation
    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name and message are required." },
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

    // Check comment exists before updating
    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Comment not found." },
        { status: 404 }
      );
    }

    const updated = await prisma.comment.update({
      where: { id },
      data: {
        name: name.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update comment." },
      { status: 500 }
    );
  }
}

// ── DELETE /api/comments/[id] ──────────────────────────────────────────────
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check comment exists before deleting
    const existing = await prisma.comment.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Comment not found." },
        { status: 404 }
      );
    }

    await prisma.comment.delete({ where: { id } });

    return NextResponse.json(
      { message: "Comment deleted successfully." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete comment." },
      { status: 500 }
    );
  }
}
