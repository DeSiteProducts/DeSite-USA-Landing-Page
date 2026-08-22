import type { ReactNode } from "react";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "108 ProScreen",
  description:
    "Explore the 108 ProScreen with product videos, equipment compatibility, mesh options, and machine specifications.",
  openGraphDescription:
    "Watch 108 ProScreen demos, features, and detailed machine specs.",
  path: "/models/108-proscreen",
});

export default function Model108Layout({ children }: { children: ReactNode }) {
  return children;
}
