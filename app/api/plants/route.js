import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "plants.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "plants");

// Get all plants
export async function GET() {
  try {
    const fileData = await fs.readFile(DATA_PATH, "utf8");
    return NextResponse.json(JSON.parse(fileData));
  } catch (err) {
    return NextResponse.json([], { status: 500 });
  }
}

// Add a new plant with multipart/form-data images
export async function POST(request) {
  try {
    const formData = await request.formData();
    const nama_lokal = formData.get("nama_lokal");
    const nama_latin = formData.get("nama_latin");
    const famili = formData.get("famili");
    const kategori = formData.get("kategori");
    const lokasi_taman = formData.get("lokasi_taman");
    const deskripsi_singkat = formData.get("deskripsi_singkat");
    const deskripsi_lengkap = formData.get("deskripsi_lengkap");
    const manfaat = formData.get("manfaat") ? JSON.parse(formData.get("manfaat")) : [];

    // Ensure uploads directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Handle files (max 3 images)
    const images = [];
    for (let i = 0; i < 3; i++) {
      const file = formData.get(`image_${i}`);
      if (file && typeof file !== "string") {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const filePath = path.join(UPLOAD_DIR, fileName);
        await fs.writeFile(filePath, buffer);
        images.push(`/images/plants/${fileName}`);
      } else if (typeof file === "string" && file) {
        images.push(file); // If it is a string URL
      }
    }

    const id = `flora-${String(Date.now()).slice(-6)}`;
    const slug = nama_lokal.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newPlant = {
      id,
      slug,
      nama_lokal,
      nama_latin,
      famili,
      kategori,
      lokasi_taman,
      deskripsi_singkat,
      deskripsi_lengkap,
      manfaat,
      images,
      is_qr_code_generated: false,
      qr_code_path: "",
    };

    const fileData = await fs.readFile(DATA_PATH, "utf8");
    const list = JSON.parse(fileData);
    list.push(newPlant);
    await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2));

    return NextResponse.json(newPlant);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
