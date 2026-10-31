import ModelPage from "../_components/proscreen-108-page";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "108 ProScreen Galvanized",
  description: "Explore the 108 ProScreen Galvanized, New 2027 Forever Series, with equipment compatibility, mesh options, and machine specifications.",
  openGraphDescription: "Explore the 108 ProScreen Galvanized and detailed machine specifications.",
  path: "/models/108-proscreen-galvanized",
});

export default function Page() {
  return <ModelPage galvanized />;
}
