"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch plant data by slug from api
  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const res = await fetch("/api/plants");
        const list = await res.json();
        const found = list.find((p) => p.slug === slug);
        setPlant(found || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [slug]);

  // Auto-slide effect
  useEffect(() => {
    if (!plant || !plant.images || plant.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % plant.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [plant]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-secondary text-sm animate-pulse">Memuat informasi tanaman...</p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="pt-24 pb-32 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <span className="material-symbols-outlined text-secondary text-5xl mb-4">
          question_mark
        </span>
        <h1 className="font-headline-sm text-headline-sm text-primary mb-2">
          Tanaman Tidak Ditemukan
        </h1>
        <p className="font-body-md text-secondary mb-6 max-w-sm">
          Maaf, data tanaman dengan pengenal &quot;{slug}&quot; tidak dapat kami temukan di arsip kami.
        </p>
        <Link
          href="/explore"
          className="bg-primary text-white text-label-md font-label-md py-3 px-8 rounded hover:opacity-90 transition-opacity"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const { name, nama_lokal, nama_latin, famili, kategori, lokasi_taman, deskripsi_singkat, deskripsi_lengkap, manfaat, images } = plant;
  const displayName = nama_lokal || name;

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      
      {/* Sub-page Navigation Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 bg-background/90 backdrop-blur-md border-b border-secondary-container transition-all">
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-surface-container-low text-primary rounded-lg transition-colors cursor-pointer"
            aria-label="Kembali"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-headline-sm text-headline-sm text-primary">Sapa Flora Alamendah</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Sapa Flora Alamendah - ${displayName}`,
                  text: `Yuk kenalan dengan ${displayName} (${nama_latin})`,
                  url: window.location.href,
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Tautan halaman berhasil disalin ke papan klip!");
              }
            }}
            className="p-2 hover:bg-surface-container-low text-primary rounded-lg transition-colors cursor-pointer"
            aria-label="Bagikan"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
          <Link
            href="/explore"
            className="p-2 hover:bg-surface-container-low text-primary rounded-lg transition-colors"
            aria-label="Katalog"
          >
            <span className="material-symbols-outlined">eco</span>
          </Link>
        </div>
      </header>

      {/* Main Details Body */}
      <main className="pt-16 pb-12 max-w-4xl mx-auto w-full flex-grow">
        
        {/* Image Carousel Section */}
        <section className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden rounded-b-xl border border-secondary-container bg-surface-container-low">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images && images.map((imgUrl, index) => (
              <div key={index} className="min-w-full h-full relative">
                <img
                  alt={`${displayName} slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  src={imgUrl}
                />
              </div>
            ))}
          </div>

          {/* Carousel Dot Indicators */}
          {images && images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-primary ring-2 ring-background ring-offset-2 scale-110"
                      : "bg-secondary-fixed hover:bg-primary/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Header Content */}
        <section className="px-margin-mobile md:px-margin-desktop py-stack-md bg-background">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-2 text-on-surface-variant tracking-widest uppercase font-label-caps text-label-caps items-center">
              <span>{famili}</span>
              <span>•</span>
              <span>{kategori}</span>
              {lokasi_taman && (
                <>
                  <span>•</span>
                  <span className="text-primary font-bold bg-primary-container/10 px-2 py-0.5 rounded">
                    {lokasi_taman}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-display-lg-mobile md:text-display-lg text-primary mt-2">
              {displayName}
            </h1>
            <p className="font-body-lg italic text-secondary-fixed-dim -mt-1">
              {nama_latin}
            </p>
            {deskripsi_singkat && (
              <p className="font-body-md text-on-surface-variant font-medium mt-2">
                {deskripsi_singkat}
              </p>
            )}
          </div>
        </section>

        {/* Kenalan Yuk Section */}
        <section className="px-margin-mobile md:px-margin-desktop py-stack-md border-t border-secondary-container">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Kenalan Yuk!</h2>
          <div className="max-w-prose">
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              {deskripsi_lengkap}
            </p>
          </div>
        </section>

        {/* Manfaat & Khasiat Section */}
        {manfaat && manfaat.length > 0 && (
          <section className="px-margin-mobile md:px-margin-desktop py-stack-md border-t border-secondary-container">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Manfaat &amp; Khasiat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {manfaat.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 border border-secondary-container rounded-lg bg-surface-container-low transition-colors duration-150 hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-primary text-xl" data-icon="task_alt">
                    task_alt
                  </span>
                  <p className="font-body-md text-on-surface-variant font-medium">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sub-page Specific Footer */}
      <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop flex flex-col items-center gap-stack-sm text-center bg-surface-container-low border-t border-secondary-container">
        <span className="font-headline-sm text-headline-sm text-primary">Sapa Flora Alamendah</span>
        <div className="flex gap-6 my-4">
          <Link className="font-body-md text-secondary hover:text-primary underline transition-opacity" href="#">
            Tentang Kami
          </Link>
          <Link className="font-body-md text-secondary hover:text-primary underline transition-opacity" href="#">
            Program Konservasi
          </Link>
          <Link className="font-body-md text-secondary hover:text-primary underline transition-opacity" href="#">
            Dukung Kami
          </Link>
        </div>
        <p className="font-body-md text-secondary text-sm">
          © 2026 Desa Alamendah, Kec. Rancabali. Melestarikan Pusaka Hijau Kita.
        </p>
      </footer>
    </div>
  );
}
