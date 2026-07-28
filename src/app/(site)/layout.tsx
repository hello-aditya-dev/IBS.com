import type { ReactNode } from "react";

import { SiteChrome } from "@/components/layout/site-chrome";
import { ClientIslands } from "@/components/layout/client-islands";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SiteChrome>
      {children}
      <ClientIslands />
    </SiteChrome>
  );
}
