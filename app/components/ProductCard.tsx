/**
 * ProductCard — Server Component
 *
 * Reusable card component for displaying a single product item.
 * Styled with claymorphism: bold border-radius, solid fills, multi-layer
 * box-shadow. No gradients used anywhere.
 *
 * Props:
 *   - emoji       : Visual icon representing the product
 *   - name        : Product name
 *   - description : Short description
 *   - price       : Price string (e.g. "Rp 25.000")
 *   - badge       : Optional badge text (e.g. "Best Seller", "New")
 *   - badgeColor  : "orange" | "red" (default: "red")
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
  badgeColor = "red",
}: ProductCardProps) {
  const badgeStyles =
    badgeColor === "orange"
      ? { backgroundColor: "#FFF7ED", color: "#EA580C", border: "1.5px solid #FED7AA" }
      : { backgroundColor: "#FEF2F2", color: "#DC2626", border: "1.5px solid #FECACA" };

  return (
    <article
      className="hover-card relative flex flex-col rounded-3xl overflow-hidden transition-all duration-300 group"
      style={{
        backgroundColor: "#FFFFFF",
        border: "2px solid #E7E5E4",
      }}
    >
      {/* Optional badge */}
      {badge && (
        <span
          className="absolute top-3 right-3 font-body font-bold text-xs rounded-full z-10"
          style={{ ...badgeStyles, padding: "4px 12px" }}
        >
          {badge}
        </span>
      )}

      {/* Emoji illustration area — solid bg, no gradient */}
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: "#FFF1F2",
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
            style={{ color: "#DC2626" }}
          >
            {price}
          </span>
          <a
            href="#komentar"
            className="btn-cta-primary inline-flex items-center justify-center font-body font-bold text-xs text-white bg-primary hover:bg-primary-dark rounded-full cursor-pointer"
            style={{
              padding: "7px 16px",
            }}
          >
            Pesan
          </a>
        </div>
      </div>
    </article>
  );
}

