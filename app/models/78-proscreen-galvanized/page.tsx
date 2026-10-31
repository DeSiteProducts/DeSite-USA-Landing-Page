import ModelPage from "../_components/proscreen-78-page";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "78 ProScreen Galvanized",
  description: "Explore the 78 ProScreen Galvanized, New 2027 Forever Series, with equipment compatibility, mesh options, and machine specifications.",
  openGraphDescription: "Explore the 78 ProScreen Galvanized and detailed machine specifications.",
  path: "/models/78-proscreen-galvanized",
});

export default function Page() {
  return <ModelPage galvanized />;
}
