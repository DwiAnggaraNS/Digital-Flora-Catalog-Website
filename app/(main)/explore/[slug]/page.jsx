import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import PlantDetailClient from "./PlantDetailClient";

export default async function PlantDetailPage({ params }) {
  const { slug } = await params;
  
  try {
    const filePath = path.join(process.cwd(), "data", "plants.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const plants = JSON.parse(fileData);
    
    // We are matching `id === params.slug` based on user requirements.
    // However, if the slug field is what's in the URL, we might need to check `plant.slug === slug` or `plant.id === slug`.
    // The instructions say "Find plant where id === params.slug".
    const plant = plants.find((p) => p.id === slug || p.slug === slug);

    if (!plant) {
      return notFound();
    }
    return <PlantDetailClient plant={plant}/>;
  } catch (error) {
    console.error("Error reading plants data:", error);
    return notFound();
  }
}
