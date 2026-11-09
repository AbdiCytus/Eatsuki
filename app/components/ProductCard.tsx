/**
 * ProductCard — Server Component
 *
 * Reusable card component for displaying a single product item.
 * Styled with claymorphism: bold border-radius, solid fills, multi-layer box-shadow.
 * Fully responsive for 2-column mobile layout and 3/4-column desktop layout.
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
      className="hover-card relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 group"
      style={{
        backgroundColor: "#FFFFFF",
        border: "2px solid #E7E5E4",
      }}
    >
      {/* Optional badge */}
      {badge && (
        <span
          className="absolute top-2 right-2 sm:top-3 sm:right-3 font-body font-bold text-[10px] sm:text-xs rounded-full z-10"
          style={{ ...badgeStyles, padding: "2px 8px" }}
        >
          {badge}
        </span>
      )}

      {/* Emoji illustration area — responsive height & text size */}
      <div
        className="flex items-center justify-center h-28 sm:h-36 text-5xl sm:text-6xl"
        style={{
          backgroundColor: "#FFF1F2",
        }}
      >
        {emoji}
      </div>

      {/* Card body — responsive padding */}
      <div className="flex flex-col flex-1 p-3 sm:p-5">
        <h3
          className="font-heading font-bold text-sm sm:text-base mb-1 line-clamp-1"
          style={{ color: "#1C1917" }}
          title={name}
        >
          {name}
        </h3>
        <p
          className="font-body text-xs sm:text-sm leading-relaxed flex-1 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-none text-text-muted"
        >
          {description}
        </p>

        {/* Price row — stacks vertically on mobile 2-col, inline on desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-auto pt-1">
          <span
            className="font-heading font-extrabold text-sm sm:text-lg"
            style={{ color: "#DC2626" }}
          >
            {price}
          </span>
          <a
            href="#komentar"
            className="btn-cta-primary inline-flex items-center justify-center font-body font-bold text-xs text-white bg-primary hover:bg-primary-dark rounded-full cursor-pointer py-1.5 px-3 sm:py-2 sm:px-4 text-center"
          >
            Pesan
          </a>
        </div>
      </div>
    </article>
  );
}
