import Image from "next/image";
import type { AnimalUse } from "@/lib/schemas";
import { relationshipLabel } from "@/lib/data";

type Props = {
  use: AnimalUse;
  emoji: string;
  onNavigate?: () => void;
};

export function ResidentCard({ use, emoji, onNavigate }: Props) {
  const label = use.characterName
    ? `${use.organization} · ${use.characterName}`
    : use.displayLabel;
  const imageSrc = use.image?.src;
  const remoteSrc = use.image?.remoteSrc;

  return (
    <a
      className="brand-chip"
      href={use.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-use-id={use.id}
      onClick={onNavigate}
    >
      {imageSrc ? (
        <Image
          className="brand-visual"
          src={imageSrc}
          alt={use.image?.alt || label}
          width={72}
          height={72}
        />
      ) : remoteSrc ? (
        // ponytail: remote fallback until local assets are audited
        // eslint-disable-next-line @next/next/no-img-element
        <img className="brand-visual" src={remoteSrc} alt={use.image?.alt || label} />
      ) : (
        <span className="brand-fallback" aria-hidden>
          {emoji}
        </span>
      )}
      <span className="brand-text">
        {label}
        <small>
          {relationshipLabel(use.relationshipType)} · {use.verificationStatus.replaceAll("_", " ")}
          {imageSrc || remoteSrc ? " ↗" : " · Image coming soon"}
        </small>
      </span>
    </a>
  );
}
