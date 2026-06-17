import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "plants.json");
const QR_DIR = path.join(process.cwd(), "public", "images", "qrcodes");

// Save client-generated base64 QR image to public directory and update status
export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const { qr_image } = await request.json();

    const base64Data = qr_image.replace(/^data:image\/png;base64,/, "");
    await fs.mkdir(QR_DIR, { recursive: true });

    const qrFileName = `QR-${id}.png`;
    const filePath = path.join(QR_DIR, qrFileName);
    await fs.writeFile(filePath, base64Data, "base64");

    const fileData = await fs.readFile(DATA_PATH, "utf8");
    const list = JSON.parse(fileData);
    const index = list.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    list[index].is_qr_code_generated = true;
    list[index].qr_code_path = `/images/qrcodes/${qrFileName}`;

    await fs.writeFile(DATA_PATH, JSON.stringify(list, null, 2));

    return NextResponse.json(list[index]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
