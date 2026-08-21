import type { ReactNode } from "react";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "68 ProScreen",
  description:
    "Explore the 68 ProScreen with videos, feature details, and compact equipment screening capabilities.",
  openGraphDescription: "Watch 68 ProScreen videos and view key product features.",
  path: "/models/68-proscreen",
});

export default function Model68Layout({ children }: { children: ReactNode }) {
  return children;
}
