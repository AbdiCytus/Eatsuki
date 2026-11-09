"use client";

/**
 * CommentsSection — Client Component
 *
 * Full CRUD comment section for the Eatsuki landing page.
 * Features:
 *   - Fetch and display all comments (newest first) on mount
 *   - Add new comment via CommentForm
 *   - Edit existing comment inline (replaces card with edit form)
 *   - Delete comment with a confirmation dialog
 *   - Loading and empty states
 *   - AOS via ScrollAnimationWrapper on the section header
 */

import { useState, useEffect, useCallback } from "react";
import CommentForm from "./CommentForm";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";

// ── Types ──────────────────────────────────────────────────────────────────
interface Comment {
  id: string;
  name: string;
  message: string;
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
    "#F97316", "#DC2626", "#7C3AED", "#0891B2",
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

// ── Main Component ─────────────────────────────────────────────────────────
export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  // Tracks which comment is being edited (by id), null = none
  const [editingId, setEditingId] = useState<string | null>(null);

  // Tracks which comment delete is being confirmed (by id), null = none
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Loading state for form submission / delete action
  const [submitting, setSubmitting] = useState(false);

  // Global action feedback message
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

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
        body: JSON.stringify(data),
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
        body: JSON.stringify(data),
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
      const res = await fetch(`/api/comments/${id}`, { method: "DELETE" });
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
              className="inline-block font-body font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: "#F97316" }}
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
              <span style={{ color: "#F97316" }}>Pelanggan Kami?</span>
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

          {/* ── Add comment form ── */}
          <div
            className="w-full lg:w-96 flex-shrink-0 rounded-2xl"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E7E5E4",
              padding: "28px",
              boxShadow: "0 1px 8px rgba(28,25,23,0.06)",
              position: "sticky",
              top: "88px",
              alignSelf: "flex-start", // ensures sticky works correctly in flex
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
                className="font-body font-medium text-sm rounded-xl"
                style={{
                  backgroundColor: feedback.type === "success" ? "#F0FDF4" : "#FEF2F2",
                  color: feedback.type === "success" ? "#15803D" : "#DC2626",
                  border: `1px solid ${feedback.type === "success" ? "#BBF7D0" : "#FECACA"}`,
                  padding: "12px 18px",
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
                    borderTopColor: "#F97316",
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
                className="text-center rounded-2xl py-10"
                style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
              >
                <p className="font-body text-sm mb-3" style={{ color: "#DC2626" }}>
                  Gagal memuat komentar.
                </p>
                <button
                  onClick={fetchComments}
                  className="font-body font-semibold text-sm text-white rounded-full"
                  style={{ backgroundColor: "#DC2626", padding: "8px 20px" }}
                >
                  Coba Lagi
                </button>
              </div>
            )}

            {/* Empty state */}
            {status === "success" && comments.length === 0 && (
              <div
                className="text-center rounded-2xl py-14"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E7E5E4" }}
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
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-2xl transition-shadow duration-200"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E7E5E4",
                    padding: "24px",
                    boxShadow: "0 1px 4px rgba(28,25,23,0.04)",
                  }}
                >
                  {/* ── Edit mode: show form instead of card content ── */}
                  {editingId === comment.id ? (
                    <div>
                      <p
                        className="font-heading font-bold text-sm mb-4"
                        style={{ color: "#F97316" }}
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
                          {/* Avatar circle */}
                          <div
                            className="flex-shrink-0 flex items-center justify-center rounded-full font-heading font-bold text-white text-base"
                            style={{
                              width: "42px",
                              height: "42px",
                              backgroundColor: nameToColor(comment.name),
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

                        {/* Action buttons: Edit + Delete */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {/* Edit button */}
                          <button
                            onClick={() => {
                              setEditingId(comment.id);
                              setConfirmDeleteId(null);
                            }}
                            className="font-body text-xs font-semibold rounded-lg transition-colors duration-200"
                            style={{
                              color: "#78716C",
                              backgroundColor: "#F5F5F4",
                              padding: "5px 10px",
                              border: "1px solid #E7E5E4",
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
                            className="font-body text-xs font-semibold rounded-lg transition-colors duration-200"
                            style={{
                              color: "#DC2626",
                              backgroundColor: "#FEF2F2",
                              padding: "5px 10px",
                              border: "1px solid #FECACA",
                            }}
                            title="Hapus komentar"
                          >
                            🗑️ Hapus
                          </button>
                        </div>
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
                          className="flex items-center justify-between gap-4 mt-4 rounded-xl"
                          style={{
                            backgroundColor: "#FEF2F2",
                            border: "1px solid #FECACA",
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
                              className="font-body font-bold text-xs text-white rounded-lg disabled:opacity-60"
                              style={{
                                backgroundColor: "#DC2626",
                                padding: "6px 14px",
                              }}
                            >
                              {submitting ? "..." : "Hapus"}
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              disabled={submitting}
                              className="font-body font-semibold text-xs rounded-lg"
                              style={{
                                color: "#78716C",
                                backgroundColor: "#FFFFFF",
                                padding: "6px 14px",
                                border: "1px solid #E7E5E4",
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
              ))}
          </div>
        </div>
      </div>

      {/* Spinner keyframe — scoped to this section */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

