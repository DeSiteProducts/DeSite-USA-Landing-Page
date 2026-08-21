import type { ReactNode } from "react";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "78 ProScreen",
  description:
    "Explore the 78 ProScreen with showcase videos, feature breakdowns, and equipment compatibility.",
  openGraphDescription: "Watch 78 ProScreen demos and feature videos.",
  path: "/models/78-proscreen",
});

export default function Model78Layout({ children }: { children: ReactNode }) {
  return children;
}
