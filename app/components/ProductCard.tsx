/**
 * ProductCard — Server Component
 *
 * Reusable card component for displaying a single product item.
 * Used by both MainProductsSection and SideProductsSection.
 *
 * Props:
 *   - emoji       : Visual icon representing the product
 *   - name        : Product name
 *   - description : Short description
 *   - price       : Price string (e.g. "Rp 25.000")
 *   - badge       : Optional badge text (e.g. "Best Seller", "New")
 *   - badgeColor  : "orange" | "red" (default: "orange")
 */

interface ProductCardProps {
  emoji: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  badgeColor?: "orange" | "red";
}

export default function ProductCard({
  emoji,
  name,
  description,
  price,
  badge,
  badgeColor = "orange",
}: ProductCardProps) {
  const badgeStyles =
    badgeColor === "red"
      ? { backgroundColor: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA" }
      : { backgroundColor: "#FFF7ED", color: "#EA580C", border: "1px solid #FED7AA" };

  return (
    <article
      className="hover-card relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E7E5E4",
        boxShadow: "0 1px 4px rgba(28,25,23,0.06)",
      }}
    >
      {/* Optional badge */}
      {badge && (
        <span
          className="absolute top-3 right-3 font-body font-semibold text-xs rounded-full z-10"
          style={{ ...badgeStyles, padding: "3px 10px" }}
        >
          {badge}
        </span>
      )}

      {/* Emoji illustration area */}
      <div
        className="flex items-center justify-center transition-colors duration-300"
        style={{
          backgroundColor: "#FFF7ED",
          height: "140px",
          fontSize: "72px",
        }}
      >
        {emoji}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1" style={{ padding: "20px" }}>
        <h3
          className="font-heading font-bold text-base mb-1"
          style={{ color: "#1C1917" }}
        >
          {name}
        </h3>
        <p
          className="font-body text-sm leading-relaxed flex-1 mb-4"
          style={{ color: "#78716C" }}
        >
          {description}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto">
          <span
            className="font-heading font-bold text-lg"
            style={{ color: "#F97316" }}
          >
            {price}
          </span>
          <span
            className="font-body font-semibold text-xs rounded-full transition-colors duration-200"
            style={{
              backgroundColor: "#F97316",
              color: "#FFFFFF",
              padding: "6px 14px",
            }}
          >
            Pesan
          </span>
        </div>
      </div>
    </article>
  );
}

