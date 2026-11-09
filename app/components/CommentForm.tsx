"use client";

/**
 * CommentForm — Client Component
 *
 * A form for adding a new comment or editing an existing one.
 * Controlled inputs with character counter and loading/error states.
 *
 * Props:
 *   - onSubmit      : Callback fired with { name, message } on valid submit
 *   - onCancel      : Callback to cancel editing (optional, shown only in edit mode)
 *   - initialName   : Pre-fill name field (for edit mode)
 *   - initialMessage: Pre-fill message field (for edit mode)
 *   - isEditing     : Whether the form is in edit mode (changes button label)
 *   - isLoading     : Disables the form while API call is in progress
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

    onSubmit({ name: name.trim(), message: message.trim() });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
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
          <span
            className="font-body text-xs"
            style={{ color: name.length > NAME_MAX * 0.9 ? "#DC2626" : "#A8A29E" }}
          >
            {name.length}/{NAME_MAX}
          </span>
        </div>
        <input
          id="comment-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, NAME_MAX))}
          placeholder="Masukkan namamu..."
          disabled={isLoading}
          className="w-full font-body text-sm rounded-xl transition-all duration-200 outline-none"
          style={{
            backgroundColor: "#FAFAF9",
            border: "1.5px solid #E7E5E4",
            color: "#1C1917",
            padding: "12px 16px",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#F97316")}
          onBlur={(e) => (e.target.style.borderColor = "#E7E5E4")}
        />
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
          onFocus={(e) => (e.target.style.borderColor = "#F97316")}
          onBlur={(e) => (e.target.style.borderColor = "#E7E5E4")}
        />
      </div>

      {/* Validation error */}
      {error && (
        <p
          className="font-body text-sm"
          style={{ color: "#DC2626" }}
          role="alert"
        >
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
            : "💬 Kirim Komentar"}
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

