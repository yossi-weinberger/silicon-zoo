import Link from "next/link";
import { getAllAnimals } from "@/lib/data";
import { HeaderNav } from "@/components/HeaderNav";

type Props = {
  showBrowse?: boolean;
};

export function SiteHeader({ showBrowse = true }: Props) {
  const animals = getAllAnimals();

  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <span className="brand-mark" aria-hidden>
          🦦
        </span>
        Silicon Zoo
      </Link>
      <HeaderNav animals={animals} showBrowse={showBrowse} />
    </header>
  );
}
