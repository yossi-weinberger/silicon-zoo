"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

type Props = {
  href: string;
  children: ReactNode;
};

export function SuggestLink({ href, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("suggestion_clicked", { source: "about" })}
    >
      {children}
    </a>
  );
}
