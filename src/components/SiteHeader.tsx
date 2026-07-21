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
        <img
          className="brand-mark-img"
          src="/logo.png"
          alt="Silicon Zoo"
          width={96}
          height={96}
        />
        <span className="brand-name">Silicon Zoo</span>
      </Link>
      <HeaderNav animals={animals} showBrowse={showBrowse} />
    </header>
  );
}
