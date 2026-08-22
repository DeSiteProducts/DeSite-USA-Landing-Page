import type { ReactNode } from "react";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "SLG 78",
  description:
    "Explore the SLG 78 with product videos, equipment compatibility, mesh options, and quote details.",
  openGraphDescription: "Watch SLG 78 videos and request a shipping quote.",
  path: "/models/slg-78",
});

export default function Slg78Layout({ children }: { children: ReactNode }) {
  return children;
}
