import fs from "fs/promises";
import path from "path";
import ExploreClient from "./ExploreClient";

export default async function ExplorePage() {
  const filePath = path.join(process.cwd(), "data", "plants.json");
  const fileData = await fs.readFile(filePath, "utf8");
  const plants = JSON.parse(fileData);

  return <ExploreClient plants={plants} />;
}
