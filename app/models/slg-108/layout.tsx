import type { ReactNode } from "react";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "SLG 108",
  description:
    "Explore the SLG 108 with product videos, equipment compatibility, mesh options, and quote details.",
  openGraphDescription: "Watch SLG 108 videos and request a shipping quote.",
  path: "/models/slg-108",
});

export default function Slg108Layout({ children }: { children: ReactNode }) {
  return children;
}
