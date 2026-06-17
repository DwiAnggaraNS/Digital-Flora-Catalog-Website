"use client";

import { useState } from "react";
import PlantCard from "@/components/PlantCard";
import Link from "next/link";

export default function ExploreClient({ plants }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);

  const filterOptions = [
    { label: "Tanaman Obat", tag: "Tanaman Obat" },
    { label: "Flora Endemik", tag: "Flora Endemik" },
    { label: "Tanaman Hias", tag: "Tanaman Hias" },
    { label: "Bernilai Ekonomi", tag: "Bernilai Ekonomi" },
  ];

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.nama_lokal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.nama_latin.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag =
      !selectedTag ||
      (plant.tags && plant.tags.includes(selectedTag)) ||
      plant.kategori === selectedTag;

    return matchesSearch && matchesTag;
  });

  const handleTagToggle = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <main className="pt-24 pb-32 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto min-h-screen">
      <section className="mb-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">
          Katalog Flora Alamendah
        </h1>
        <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
          Jelajahi keanekaragaman flora Desa Alamendah melalui herbarium digital kami. Setiap spesies didata dengan teliti sebagai wujud nyata pelestarian alam Kabupaten Bandung.
        </p>
      </section>

      <section className="mb-stack-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-gutter">
          <div className="relative flex-grow">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary" data-icon="search">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-secondary-container rounded-lg focus:outline-none focus:border-primary font-body-md transition-all shadow-sm"
              placeholder="Cari nama lokal atau nama latin tanaman..."
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-1">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setSelectedTag(null)} className={`px-6 py-3 border rounded-lg font-label-md text-label-md transition-all flex items-center gap-2 cursor-pointer ${!selectedTag ? "bg-primary text-white border-primary" : "border-secondary-container text-secondary hover:bg-surface-container-low"}`}>
              <span className="material-symbols-outlined text-[20px]" data-icon="filter_list">filter_list</span>
              Semua
            </button>
          </div>
        </div>
        <div className="mt-stack-sm flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button key={opt.tag} onClick={() => handleTagToggle(opt.tag)} className={`px-3 py-1 border rounded-full font-label-caps text-label-caps transition-all cursor-pointer ${selectedTag === opt.tag ? "bg-primary text-white border-primary shadow-sm" : "border-secondary-container text-secondary hover:bg-surface-container-low"}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter animate-in fade-in duration-500">
          {filteredPlants.map((plant) => (
            <Link href={`/explore/${plant.id}`} key={plant.id} className="block group">
              <PlantCard plant={plant} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-secondary-container rounded-xl bg-surface-container-lowest">
          <span className="material-symbols-outlined text-secondary text-5xl mb-4">search_off</span>
          <p className="font-headline-sm text-headline-sm text-primary mb-1">Tanaman Tidak Ditemukan</p>
          <p className="font-body-md text-secondary">Coba ubah kata pencarian atau bersihkan filter Anda.</p>
        </div>
      )}
    </main>
  );
}
