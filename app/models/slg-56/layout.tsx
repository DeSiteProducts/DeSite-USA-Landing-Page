import type { ReactNode } from "react";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "SLG 56",
  description:
    "Explore the SLG 56 with product videos, compact equipment compatibility, mesh options, and quote details.",
  openGraphDescription: "Watch SLG 56 videos and request a shipping quote.",
  path: "/models/slg-56",
});

export default function Slg56Layout({ children }: { children: ReactNode }) {
  return children;
}
