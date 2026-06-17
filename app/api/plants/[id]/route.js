import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "plants.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "plants");

// Update plant by id
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    const nama_lokal = formData.get("nama_lokal");
    const nama_latin = formData.get("nama_latin");
    const famili = formData.get("famili");
    const kategori = formData.get("kategori");
    const lokasi_taman = formData.get("lokasi_taman");
    const deskripsi_singkat = formData.get("deskripsi_singkat");
    const deskripsi_lengkap = formData.get("deskripsi_lengkap");
    const manfaat = formData.get("manfaat") ? JSON.parse(formData.get("manfaat")) : [];

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

    const fileData = await fs.readFile(DATA_PATH, "utf8");
    const list = JSON.parse(fileData);
    const index = list.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    const current = list[index];
    const slug = nama_lokal.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const updated = {
      ...current,
      slug,
      nama_lokal,
      nama_latin,
      famili,
      kategori,
      lokasi_taman,
      deskripsi_singkat,
      deskripsi_lengkap,
      manfaat,
      // Keep existing images if no new images are provided
      images: images.length > 0 ? images : current.images,
    };

    list[index] = updated;
    await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2));

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Delete plant by id
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const fileData = await fs.readFile(DATA_PATH, "utf8");
    const list = JSON.parse(fileData);
    const updated = list.filter((p) => p.id !== id);

    if (list.length === updated.length) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    await fs.writeFile(DATA_PATH, JSON.stringify(updated, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
