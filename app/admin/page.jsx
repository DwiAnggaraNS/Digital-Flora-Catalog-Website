"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";

export default function AdminPage() {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [origin, setOrigin] = useState("");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentPlant, setCurrentPlant] = useState(null);

  // Form input files state
  const [fileInputs, setFileInputs] = useState([null, null, null]);

  // Form inputs state
  const [formData, setFormData] = useState({
    nama_lokal: "",
    nama_latin: "",
    famili: "",
    kategori: "Tanaman Hias",
    lokasi_taman: "",
    deskripsi_singkat: "",
    deskripsi_lengkap: "",
    manfaat: "",
  });

  // Fetch plants from API
  const fetchPlants = async () => {
    try {
      const res = await fetch("/api/plants");
      const data = await res.json();
      setPlants(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlants();
    setOrigin(window.location.origin);
  }, []);

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/");
  };

  const openAdd = () => {
    setFormData({
      nama_lokal: "",
      nama_latin: "",
      famili: "",
      kategori: "Tanaman Hias",
      lokasi_taman: "",
      deskripsi_singkat: "",
      deskripsi_lengkap: "",
      manfaat: "",
    });
    setFileInputs([null, null, null]);
    setIsAddOpen(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "manfaat") {
        data.append(
          "manfaat",
          JSON.stringify(formData.manfaat.split(",").map((s) => s.trim()).filter(Boolean))
        );
      } else {
        data.append(key, formData[key]);
      }
    });

    fileInputs.forEach((file, index) => {
      if (file) data.append(`image_${index}`, file);
    });

    await fetch("/api/plants", { method: "POST", body: data });
    fetchPlants();
    setIsAddOpen(false);
  };

  const openEdit = (plant) => {
    setCurrentPlant(plant);
    setFormData({
      nama_lokal: plant.nama_lokal,
      nama_latin: plant.nama_latin,
      famili: plant.famili,
      kategori: plant.kategori,
      lokasi_taman: plant.lokasi_taman || "",
      deskripsi_singkat: plant.deskripsi_singkat || "",
      deskripsi_lengkap: plant.deskripsi_lengkap || "",
      manfaat: plant.manfaat ? plant.manfaat.join(", ") : "",
    });
    setFileInputs([null, null, null]);
    setIsEditOpen(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "manfaat") {
        data.append(
          "manfaat",
          JSON.stringify(formData.manfaat.split(",").map((s) => s.trim()).filter(Boolean))
        );
      } else {
        data.append(key, formData[key]);
      }
    });

    fileInputs.forEach((file, index) => {
      if (file) data.append(`image_${index}`, file);
    });

    if (!currentPlant?.id) return;
    await fetch(`/api/plants/${currentPlant.id}`, { method: "PUT", body: data });
    fetchPlants();
    setIsEditOpen(false);
  };

  const openDelete = (plant) => {
    setCurrentPlant(plant);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!currentPlant?.id) return;
    await fetch(`/api/plants/${currentPlant.id}`, { method: "DELETE" });
    fetchPlants();
    setIsDeleteOpen(false);
  };

  // Generate QR on client and save it to server
  const handleGenerateQR = async (plant) => {
    const canvas = document.getElementById(`qr-gen-${plant.id}`);
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");

    const res = await fetch(`/api/plants/${plant.id}/save-qr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qr_image: dataUrl }),
    });

    if (res.ok) {
      fetchPlants();
    }
  };

  // Download QR file
  const downloadQR = (plant) => {
    const a = document.createElement("a");
    a.href = plant.qr_code_path;
    a.download = `QR-${plant.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="p-8 bg-background min-h-screen">
      {/* Hidden QR Generator canvas */}
      <div className="hidden">
        {plants.filter(Boolean).map((plant) => (
          <QRCodeCanvas
            key={plant?.id}
            id={`qr-gen-${plant?.id}`}
            value={`${origin}/explore/${plant?.slug}`}
            size={256}
            level="H"
            includeMargin={true}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display-lg-mobile text-primary text-2xl">Admin Dashboard</h1>
          <p className="text-secondary text-sm">Kelola katalog dan generate QR Code tanaman.</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={openAdd}
            className="bg-primary text-white px-4 py-2 rounded font-label-md text-sm cursor-pointer hover:opacity-90"
          >
            Tambah Tanaman
          </button>
          <button
            onClick={handleLogout}
            className="border border-error text-error px-4 py-2 rounded font-label-md text-sm cursor-pointer hover:bg-error/5"
          >
            Keluar
          </button>
        </div>
      </div>

      {/* CRUD Table */}
      <div className="overflow-x-auto border border-secondary-container rounded-lg bg-surface-container-lowest shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container-low border-b border-secondary-container">
              <th className="p-4 font-bold text-primary">ID</th>
              <th className="p-4 font-bold text-primary">Foto (Max 3)</th>
              <th className="p-4 font-bold text-primary">Nama</th>
              <th className="p-4 font-bold text-primary">Kategori</th>
              <th className="p-4 font-bold text-primary">QR Code</th>
              <th className="p-4 font-bold text-primary">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {plants.filter(Boolean).map((plant) => (
              <tr key={plant?.id} className="border-b border-secondary-container/50 hover:bg-surface-container-lowest/80">
                <td className="p-4 font-mono font-bold text-secondary">{plant?.id}</td>
                <td className="p-4">
                  <div className="flex gap-1.5">
                    {plant.images && plant.images.slice(0, 3).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-12 h-12 object-cover rounded border border-secondary-container"
                      />
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-primary">{plant.nama_lokal}</div>
                  <div className="text-xs italic text-secondary">{plant.nama_latin}</div>
                </td>
                <td className="p-4">{plant.kategori}</td>
                <td className="p-4">
                  <div className="flex flex-col items-center gap-2">
                    {plant?.is_qr_code_generated ? (
                      <>
                        <img
                          src={plant.qr_code_path}
                          alt="QR Code"
                          className="w-20 h-20 object-contain border border-secondary-container"
                        />
                        <button
                          onClick={() => downloadQR(plant)}
                          className="text-xs text-primary font-bold underline cursor-pointer hover:opacity-85"
                        >
                          Unduh QR
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleGenerateQR(plant)}
                        className="bg-primary text-white px-3 py-1.5 rounded-md text-xs font-bold hover:opacity-90 cursor-pointer"
                      >
                        GENERATE QR-CODE
                      </button>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(plant)}
                      className="px-3 py-1 border border-secondary text-secondary rounded text-xs hover:bg-secondary/5 cursor-pointer"
                    >
                      Ubah
                    </button>
                    <button
                      onClick={() => openDelete(plant)}
                      className="px-3 py-1 border border-error text-error rounded text-xs hover:bg-error/5 cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Dialog Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <form onSubmit={handleAdd} className="bg-background max-w-lg w-full p-6 border border-secondary-container rounded-lg max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-sm text-primary mb-4">Tambah Tanaman Baru</h3>
            <div className="grid grid-cols-1 gap-4 text-xs mb-6">
              <div>
                <label className="block mb-1 font-bold">Nama Lokal</label>
                <input type="text" required value={formData.nama_lokal} onChange={(e) => setFormData({...formData, nama_lokal: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Nama Latin</label>
                <input type="text" required value={formData.nama_latin} onChange={(e) => setFormData({...formData, nama_latin: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Famili</label>
                <input type="text" required value={formData.famili} onChange={(e) => setFormData({...formData, famili: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Kategori</label>
                <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} className="w-full p-2 border border-secondary-container rounded">
                  <option value="Tanaman Obat">Tanaman Obat</option>
                  <option value="Flora Endemik">Flora Endemik</option>
                  <option value="Tanaman Hias">Tanaman Hias</option>
                  <option value="Bernilai Ekonomi">Bernilai Ekonomi</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-bold">Lokasi Taman</label>
                <input type="text" value={formData.lokasi_taman} onChange={(e) => setFormData({...formData, lokasi_taman: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Deskripsi Singkat</label>
                <input type="text" value={formData.deskripsi_singkat} onChange={(e) => setFormData({...formData, deskripsi_singkat: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Deskripsi Lengkap</label>
                <textarea rows="3" value={formData.deskripsi_lengkap} onChange={(e) => setFormData({...formData, deskripsi_lengkap: e.target.value})} className="w-full p-2 border border-secondary-container rounded"></textarea>
              </div>
              <div>
                <label className="block mb-1 font-bold">Manfaat (pisahkan dengan koma)</label>
                <input type="text" value={formData.manfaat} onChange={(e) => setFormData({...formData, manfaat: e.target.value})} className="w-full p-2 border border-secondary-container rounded" placeholder="Manfaat A, Manfaat B" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block font-bold">Upload Foto (Maksimal 3)</label>
                {[0, 1, 2].map((i) => (
                  <input
                    key={i}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...fileInputs];
                      updated[i] = e.target.files[0];
                      setFileInputs(updated);
                    }}
                    className="w-full p-1 border border-secondary-container rounded text-xs"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button type="button" onClick={() => setIsAddOpen(false)} className="px-4 py-2 border border-secondary rounded cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded cursor-pointer">Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Dialog Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-150">
          <form onSubmit={handleEdit} className="bg-background max-w-lg w-full p-6 border border-secondary-container rounded-lg max-h-[90vh] overflow-y-auto">
            <h3 className="font-headline-sm text-primary mb-4">Ubah Informasi Tanaman</h3>
            <div className="grid grid-cols-1 gap-4 text-xs mb-6">
              <div>
                <label className="block mb-1 font-bold">Nama Lokal</label>
                <input type="text" required value={formData.nama_lokal} onChange={(e) => setFormData({...formData, nama_lokal: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Nama Latin</label>
                <input type="text" required value={formData.nama_latin} onChange={(e) => setFormData({...formData, nama_latin: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Famili</label>
                <input type="text" required value={formData.famili} onChange={(e) => setFormData({...formData, famili: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Kategori</label>
                <select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} className="w-full p-2 border border-secondary-container rounded">
                  <option value="Tanaman Obat">Tanaman Obat</option>
                  <option value="Flora Endemik">Flora Endemik</option>
                  <option value="Tanaman Hias">Tanaman Hias</option>
                  <option value="Bernilai Ekonomi">Bernilai Ekonomi</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-bold">Lokasi Taman</label>
                <input type="text" value={formData.lokasi_taman} onChange={(e) => setFormData({...formData, lokasi_taman: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Deskripsi Singkat</label>
                <input type="text" value={formData.deskripsi_singkat} onChange={(e) => setFormData({...formData, deskripsi_singkat: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div>
                <label className="block mb-1 font-bold">Deskripsi Lengkap</label>
                <textarea rows="3" value={formData.deskripsi_lengkap} onChange={(e) => setFormData({...formData, deskripsi_lengkap: e.target.value})} className="w-full p-2 border border-secondary-container rounded"></textarea>
              </div>
              <div>
                <label className="block mb-1 font-bold">Manfaat (pisahkan dengan koma)</label>
                <input type="text" value={formData.manfaat} onChange={(e) => setFormData({...formData, manfaat: e.target.value})} className="w-full p-2 border border-secondary-container rounded" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="block font-bold">Ganti Foto (Maksimal 3)</label>
                {[0, 1, 2].map((i) => (
                  <input
                    key={i}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...fileInputs];
                      updated[i] = e.target.files[0];
                      setFileInputs(updated);
                    }}
                    className="w-full p-1 border border-secondary-container rounded text-xs"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 text-xs">
              <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 border border-secondary rounded cursor-pointer">Batal</button>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded cursor-pointer">Simpan</button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-background max-w-sm w-full p-6 border border-secondary-container rounded-lg">
            <h3 className="font-headline-sm text-primary mb-2">Hapus Tanaman</h3>
            <p className="text-secondary text-xs mb-6">
              Apakah Anda yakin ingin menghapus <strong>{currentPlant?.nama_lokal}</strong> dari katalog? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2 text-xs">
              <button onClick={() => setIsDeleteOpen(false)} className="px-4 py-2 border border-secondary rounded cursor-pointer">Batal</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-error text-white rounded cursor-pointer">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
