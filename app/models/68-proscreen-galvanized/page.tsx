import ModelPage from "../_components/proscreen-68-page";
import { buildModelMetadata } from "../model-metadata";

export const metadata = buildModelMetadata({
  title: "68 ProScreen Galvanized",
  description: "Explore the 68 ProScreen Galvanized, New 2027 Forever Series, with equipment compatibility, mesh options, and machine specifications.",
  openGraphDescription: "Explore the 68 ProScreen Galvanized and detailed machine specifications.",
  path: "/models/68-proscreen-galvanized",
});

export default function Page() {
  return <ModelPage galvanized />;
}
