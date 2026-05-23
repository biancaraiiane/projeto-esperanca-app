import type { ReactNode } from "react";

import { FloatingChat } from "@/components/FloatingChat";
import { VLibrasWidget } from "@/components/VLibrasWidget";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <FloatingChat />
      <VLibrasWidget />
    </>
  );
}
