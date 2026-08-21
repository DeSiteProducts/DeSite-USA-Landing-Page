import type { Metadata } from "next";

type ModelMetadataInput = {
  title: string;
  description: string;
  path: string;
  openGraphDescription: string;
};

export function buildModelMetadata({
  title,
  description,
  path,
  openGraphDescription,
}: ModelMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | DeSite Products`,
      description: openGraphDescription,
      url: path,
      type: "website",
    },
  };
}
