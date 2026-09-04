const REGION_COLORS: Record<string, [string, string]> = {
  Punjab: ["#7A1F2B", "#C98A1F"],
  Sindh: ["#2F4538", "#C98A1F"],
  "Khyber Pakhtunkhwa": ["#5B141D", "#7A1F2B"],
  Balochistan: ["#2F4538", "#5B141D"],
};

export default function DishArt({
  name,
  region,
  className,
}: {
  name: string;
  region: string;
  className?: string;
}) {
  const [c1, c2] = REGION_COLORS[region] ?? ["#7A1F2B", "#C98A1F"];
  const initial = name.trim().charAt(0).toUpperCase();
  const gradId = `g-${region.replace(/\s+/g, "")}`;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={`${name}, ${region}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${gradId})`} />
      <circle
        cx="200"
        cy="150"
        r="86"
        fill="none"
        stroke="#F6EFE3"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle
        cx="200"
        cy="150"
        r="62"
        fill="none"
        stroke="#F6EFE3"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <text
        x="200"
        y="172"
        textAnchor="middle"
        fontSize="72"
        fontFamily="var(--font-display)"
        fill="#F6EFE3"
        opacity="0.92"
      >
        {initial}
      </text>
    </svg>
  );
}
