"use client";

/**
 * CommentsSection — Client Component
 *
 * Full CRUD comment section for the Eatsuki landing page.
 * Features:
 *   - Fetch and display all comments (newest first) on mount
 *   - Add new comment via CommentForm
 *   - Edit / Delete only for comments owned by the current browser session
 *     (sessionId stored in localStorage; verified server-side on PUT/DELETE)
 *   - Loading and empty states
 *   - Claymorphism comment cards (solid fills, puffy shadow, no gradient)
 */

import { useState, useEffect, useCallback, useRef } from "react";
import CommentForm from "./CommentForm";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

// ── Types ──────────────────────────────────────────────────────────────────
interface Comment {
  id: string;
  name: string;
  message: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Format ISO date string to a friendly Indonesian locale string. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Generate a consistent avatar color from the commenter's name. */
function nameToColor(name: string): string {
  const palette = [
    "#DC2626", "#F97316", "#7C3AED", "#0891B2",
    "#059669", "#D97706", "#DB2777", "#2563EB",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

/** Get the first character of a name, uppercased. */
function getInitial(name: string): string {
  return name.trim().charAt(0).toUpperCase();
}

/** Get or create a persistent session ID in localStorage. */
function getOrCreateSessionId(): string {
  const key = "eatsuki_session_id";
  let id = localStorage.getItem(key);
  if (!id) {
    // Generate UUID v4
    id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    localStorage.setItem(key, id);
  }
  return id;
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  // Current browser session ID — loaded from localStorage on mount
  const sessionIdRef = useRef<string>("");

  // Tracks which comment is being edited (by id), null = none
  const [editingId, setEditingId] = useState<string | null>(null);

  // Tracks which comment delete is being confirmed (by id), null = none
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Loading state for form submission / delete action
  const [submitting, setSubmitting] = useState(false);

  // Global action feedback message
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ── Init sessionId from localStorage ────────────────────────────────────
  useEffect(() => {
    sessionIdRef.current = getOrCreateSessionId();
  }, []);

  // ── Fetch comments ──────────────────────────────────────────────────────
  const fetchComments = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/comments");
      if (!res.ok) throw new Error("Failed");
      const data: Comment[] = await res.json();
      setComments(data);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Auto-clear feedback after 3 seconds
  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 3000);
    return () => clearTimeout(t);
  }, [feedback]);

  // ── Create comment ──────────────────────────────────────────────────────
  const handleCreate = async (data: { name: string; message: string }) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sessionId: sessionIdRef.current }),
      });
      if (!res.ok) throw new Error("Failed");
      setFeedback({ type: "success", text: "Komentar berhasil ditambahkan! 🎉" });
      await fetchComments();
    } catch {
      setFeedback({ type: "error", text: "Gagal mengirim komentar. Coba lagi." });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Update comment ──────────────────────────────────────────────────────
  const handleUpdate = async (id: string, data: { name: string; message: string }) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sessionId: sessionIdRef.current }),
      });
      if (!res.ok) throw new Error("Failed");
      setEditingId(null);
      setFeedback({ type: "success", text: "Komentar berhasil diperbarui! ✅" });
      await fetchComments();
    } catch {
      setFeedback({ type: "error", text: "Gagal memperbarui komentar." });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete comment ──────────────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current }),
      });
      if (!res.ok) throw new Error("Failed");
      setConfirmDeleteId(null);
      setFeedback({ type: "success", text: "Komentar berhasil dihapus." });
      await fetchComments();
    } catch {
      setFeedback({ type: "error", text: "Gagal menghapus komentar." });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <section
      id="komentar"
      style={{ backgroundColor: "#FAFAF9", padding: "96px 0" }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <ScrollAnimationWrapper delay={0}>
            <span
              className="inline-block font-body font-bold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#DC2626" }}
            >
              Komentar
            </span>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={80}>
            <h2
              className="font-heading font-extrabold leading-tight"
              style={{
                fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                color: "#1C1917",
                letterSpacing: "-0.02em",
              }}
            >
              Apa Kata{" "}
              <span style={{ color: "#DC2626" }}>Pelanggan Kami?</span>
            </h2>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={160}>
            <p
              className="font-body text-lg leading-relaxed mt-4 mx-auto"
              style={{ color: "#78716C", maxWidth: "500px" }}
            >
              Bagikan pengalamanmu atau baca cerita dari pelanggan Eatsuki
              lainnya di sini!
            </p>
          </ScrollAnimationWrapper>
        </div>

        {/* ── Two-column layout: form (left) | comments list (right) ── */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── Add comment form — claymorphism card ── */}
          <div
            className="w-full lg:w-96 flex-shrink-0 rounded-3xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "2px solid #E7E5E4",
              padding: "28px",
              boxShadow: "0 6px 0px #D1D0CF, 0 10px 24px rgba(28,25,23,0.08)",
              position: "sticky",
              top: "88px",
              alignSelf: "flex-start",
            }}
          >
            <h3
              className="font-heading font-bold text-lg mb-6"
              style={{ color: "#1C1917" }}
            >
              💬 Tambah Komentar
            </h3>
            <CommentForm
              onSubmit={handleCreate}
              isLoading={submitting}
            />
          </div>

          {/* ── Comments list ── */}
          <div className="flex-1 flex flex-col gap-5 w-full">

            {/* Global feedback toast */}
            {feedback && (
              <div
                className="font-body font-medium text-sm rounded-2xl"
                style={{
                  backgroundColor: feedback.type === "success" ? "#F0FDF4" : "#FEF2F2",
                  color: feedback.type === "success" ? "#15803D" : "#DC2626",
                  border: `2px solid ${feedback.type === "success" ? "#BBF7D0" : "#FECACA"}`,
                  padding: "12px 18px",
                  boxShadow: feedback.type === "success"
                    ? "0 3px 0px #BBF7D0"
                    : "0 3px 0px #FECACA",
                }}
                role="status"
              >
                {feedback.text}
              </div>
            )}

            {/* Loading state */}
            {status === "loading" && (
              <div className="flex items-center gap-3 py-10 justify-center">
                <div
                  className="rounded-full"
                  style={{
                    width: "24px",
                    height: "24px",
                    border: "3px solid #E7E5E4",
                    borderTopColor: "#DC2626",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                <p className="font-body text-sm" style={{ color: "#78716C" }}>
                  Memuat komentar...
                </p>
              </div>
            )}

            {/* Error state */}
            {status === "error" && (
              <div
                className="text-center rounded-3xl py-10"
                style={{
                  backgroundColor: "#FEF2F2",
                  border: "2px solid #FECACA",
                  boxShadow: "0 4px 0px #FECACA",
                }}
              >
                <p className="font-body text-sm mb-3" style={{ color: "#DC2626" }}>
                  Gagal memuat komentar.
                </p>
                <button
                  onClick={fetchComments}
                  className="font-body font-bold text-sm text-white rounded-full"
                  style={{
                    backgroundColor: "#DC2626",
                    padding: "8px 20px",
                    boxShadow: "0 3px 0px #B91C1C",
                  }}
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* Empty state */}
            {status === "success" && comments.length === 0 && (
              <div
                className="text-center rounded-3xl py-14"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #E7E5E4",
                  boxShadow: "0 4px 0px #D1D0CF",
                }}
              >
                <p style={{ fontSize: "48px", marginBottom: "12px" }}>💬</p>
                <p className="font-heading font-bold text-lg mb-2" style={{ color: "#1C1917" }}>
                  Belum ada komentar
                </p>
                <p className="font-body text-sm" style={{ color: "#78716C" }}>
                  Jadilah yang pertama berbagi pengalaman!
                </p>
              </div>
            )}

            {/* Comment cards */}
            {status === "success" &&
              comments.map((comment) => {
                // Show Edit/Delete only if this comment belongs to the current session
                const isOwner = comment.sessionId === sessionIdRef.current;

                return (
                  <div
                    key={comment.id}
                    className="rounded-3xl"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "2px solid #E7E5E4",
                      padding: "24px",
                      boxShadow: "0 4px 0px #D1D0CF, 0 6px 16px rgba(28,25,23,0.06)",
                    }}
                  >
                    {/* ── Edit mode: show form instead of card content ── */}
                    {editingId === comment.id ? (
                      <div>
                        <p
                          className="font-heading font-bold text-sm mb-4"
                          style={{ color: "#DC2626" }}
                        >
                          ✏️ Edit Komentar
                        </p>
                        <CommentForm
                          initialName={comment.name}
                          initialMessage={comment.message}
                          isEditing
                          isLoading={submitting}
                          onSubmit={(data) => handleUpdate(comment.id, data)}
                          onCancel={() => setEditingId(null)}
                        />
                      </div>
                    ) : (
                      <>
                        {/* Card header: avatar + name + date */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            {/* Avatar circle — claymorphism */}
                            <div
                              className="flex-shrink-0 flex items-center justify-center rounded-full font-heading font-bold text-white text-base"
                              style={{
                                width: "44px",
                                height: "44px",
                                backgroundColor: nameToColor(comment.name),
                                boxShadow: `0 3px 0px ${nameToColor(comment.name)}99`,
                              }}
                            >
                              {getInitial(comment.name)}
                            </div>
                            <div>
                              <p
                                className="font-heading font-bold text-sm"
                                style={{ color: "#1C1917" }}
                              >
                                {comment.name}
                              </p>
                              <p
                                className="font-body text-xs"
                                style={{ color: "#A8A29E" }}
                              >
                                {formatDate(comment.createdAt)}
                              </p>
                            </div>
                          </div>

                          {/* Action buttons — only shown to comment owner */}
                          {isOwner && (
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Edit button */}
                              <button
                                onClick={() => {
                                  setEditingId(comment.id);
                                  setConfirmDeleteId(null);
                                }}
                                className="font-body text-xs font-bold rounded-xl transition-colors duration-200"
                                style={{
                                  color: "#78716C",
                                  backgroundColor: "#F5F5F4",
                                  padding: "6px 12px",
                                  border: "1.5px solid #E7E5E4",
                                  boxShadow: "0 2px 0px #D1D0CF",
                                }}
                                title="Edit komentar"
                              >
                                ✏️ Edit
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => {
                                  setConfirmDeleteId(comment.id);
                                  setEditingId(null);
                                }}
                                className="font-body text-xs font-bold rounded-xl transition-colors duration-200"
                                style={{
                                  color: "#DC2626",
                                  backgroundColor: "#FEF2F2",
                                  padding: "6px 12px",
                                  border: "1.5px solid #FECACA",
                                  boxShadow: "0 2px 0px #FECACA",
                                }}
                                title="Hapus komentar"
                              >
                                🗑️ Hapus
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Comment message */}
                        <p
                          className="font-body text-sm leading-relaxed"
                          style={{ color: "#44403C" }}
                        >
                          {comment.message}
                        </p>

                        {/* ── Delete confirmation inline ── */}
                        {confirmDeleteId === comment.id && (
                          <div
                            className="flex items-center justify-between gap-4 mt-4 rounded-2xl"
                            style={{
                              backgroundColor: "#FEF2F2",
                              border: "1.5px solid #FECACA",
                              padding: "12px 16px",
                            }}
                          >
                            <p
                              className="font-body text-sm"
                              style={{ color: "#DC2626" }}
                            >
                              Yakin ingin menghapus komentar ini?
                            </p>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => handleDelete(comment.id)}
                                disabled={submitting}
                                className="font-body font-bold text-xs text-white rounded-xl disabled:opacity-60"
                                style={{
                                  backgroundColor: "#DC2626",
                                  padding: "6px 14px",
                                  boxShadow: "0 2px 0px #B91C1C",
                                }}
                              >
                                {submitting ? "..." : "Hapus"}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                disabled={submitting}
                                className="font-body font-semibold text-xs rounded-xl"
                                style={{
                                  color: "#78716C",
                                  backgroundColor: "#FFFFFF",
                                  padding: "6px 14px",
                                  border: "1.5px solid #E7E5E4",
                                }}
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
