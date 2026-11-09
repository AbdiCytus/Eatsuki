"use client";

/**
 * CommentForm — Client Component
 *
 * A form for adding a new comment or editing an existing one.
 * Features:
 *   - Nama user tersimpan di localStorage (eatsuki_user_name) — terkunci setelah diisi pertama kali.
 *     Di mode add: nama hanya bisa diisi sekali; selanjutnya readonly dengan link "Ganti nama".
 *     Di mode edit: nama selalu editable (user mungkin ingin koreksi).
 *   - Character counter on name & message
 *   - Loading/error states
 */

import { useState, useEffect } from "react";

interface CommentFormProps {
  onSubmit: (data: { name: string; message: string }) => void;
  onCancel?: () => void;
  initialName?: string;
  initialMessage?: string;
  isEditing?: boolean;
  isLoading?: boolean;
}

const NAME_MAX = 100;
const MSG_MAX = 500;
const NAME_STORAGE_KEY = "eatsuki_user_name";

export default function CommentForm({
  onSubmit,
  onCancel,
  initialName = "",
  initialMessage = "",
  isEditing = false,
  isLoading = false,
}: CommentFormProps) {
  const [name, setName] = useState(initialName);
  const [message, setMessage] = useState(initialMessage);
  const [error, setError] = useState("");

  // Whether the name is locked (from localStorage), only relevant in add mode
  const [nameLocked, setNameLocked] = useState(false);

  // On mount: load saved name from localStorage (add mode only)
  useEffect(() => {
    if (!isEditing) {
      const saved = localStorage.getItem(NAME_STORAGE_KEY);
      if (saved) {
        setName(saved);
        setNameLocked(true);
      }
    }
  }, [isEditing]);

  // Sync fields when switching between add/edit mode
  useEffect(() => {
    setName(initialName);
    setMessage(initialMessage);
    setError("");
  }, [initialName, initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }
    if (!message.trim()) {
      setError("Komentar tidak boleh kosong.");
      return;
    }

    // Save name to localStorage on first submit (add mode only)
    if (!isEditing) {
      localStorage.setItem(NAME_STORAGE_KEY, name.trim());
      setNameLocked(true);
    }

    onSubmit({ name: name.trim(), message: message.trim() });
  };

  // Allow user to clear the locked name
  const handleChangeName = () => {
    localStorage.removeItem(NAME_STORAGE_KEY);
    setName("");
    setNameLocked(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

      {/* Name field */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="comment-name"
            className="font-body font-semibold text-sm"
            style={{ color: "#1C1917" }}
          >
            Nama
          </label>
          <div className="flex items-center gap-3">
            {/* "Ganti nama" link — only in add mode when locked */}
            {!isEditing && nameLocked && (
              <button
                type="button"
                onClick={handleChangeName}
                className="font-body text-xs underline"
                style={{ color: "#DC2626" }}
              >
                Ganti nama
              </button>
            )}
            <span
              className="font-body text-xs"
              style={{ color: name.length > NAME_MAX * 0.9 ? "#DC2626" : "#A8A29E" }}
            >
              {name.length}/{NAME_MAX}
            </span>
          </div>
        </div>
        <input
          id="comment-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, NAME_MAX))}
          placeholder="Masukkan namamu..."
          disabled={isLoading || (!isEditing && nameLocked)}
          readOnly={!isEditing && nameLocked}
          className="w-full font-body text-sm rounded-xl transition-all duration-200 outline-none"
          style={{
            backgroundColor: !isEditing && nameLocked ? "#F5F5F4" : "#FAFAF9",
            border: "1.5px solid #E7E5E4",
            color: "#1C1917",
            padding: "12px 16px",
            cursor: !isEditing && nameLocked ? "default" : "text",
          }}
          onFocus={(e) => {
            if (!(!isEditing && nameLocked)) {
              e.target.style.borderColor = "#DC2626";
            }
          }}
          onBlur={(e) => (e.target.style.borderColor = "#E7E5E4")}
        />
        {/* Locked name hint */}
        {!isEditing && nameLocked && (
          <p className="font-body text-xs mt-1" style={{ color: "#A8A29E" }}>
            Nama tersimpan dari komentar sebelumnya.
          </p>
        )}
      </div>

      {/* Message field */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="comment-message"
            className="font-body font-semibold text-sm"
            style={{ color: "#1C1917" }}
          >
            Komentar
          </label>
          <span
            className="font-body text-xs"
            style={{ color: message.length > MSG_MAX * 0.9 ? "#DC2626" : "#A8A29E" }}
          >
            {message.length}/{MSG_MAX}
          </span>
        </div>
        <textarea
          id="comment-message"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MSG_MAX))}
          placeholder="Tulis komentar atau ulasanmu di sini..."
          rows={4}
          disabled={isLoading}
          className="w-full font-body text-sm rounded-xl resize-none transition-all duration-200 outline-none"
          style={{
            backgroundColor: "#FAFAF9",
            border: "1.5px solid #E7E5E4",
            color: "#1C1917",
            padding: "12px 16px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#DC2626")}
          onBlur={(e) => (e.target.style.borderColor = "#E7E5E4")}
        />
      </div>

      {/* Validation error */}
      {error && (
        <p className="font-body text-sm" style={{ color: "#DC2626" }} role="alert">
          ⚠️ {error}
        </p>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-cta-primary flex-1 font-body font-semibold text-sm text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ padding: "12px 0" }}
        >
          {isLoading
            ? "⏳ Menyimpan..."
            : isEditing
            ? "✏️ Simpan Perubahan"
            : "Kirim Komentar"}
        </button>

        {/* Cancel (edit mode only) */}
        {isEditing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="font-body font-semibold text-sm rounded-xl transition-colors duration-200"
            style={{
              padding: "12px 20px",
              border: "1.5px solid #E7E5E4",
              color: "#78716C",
              backgroundColor: "transparent",
            }}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
