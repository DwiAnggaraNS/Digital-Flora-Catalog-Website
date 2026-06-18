"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PlantDetailClient({ plant }) {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!plant || !plant.images || plant.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % plant.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [plant]);

  const { name, nama_lokal, nama_latin, famili, kategori, lokasi_taman, deskripsi_singkat, deskripsi_lengkap, manfaat, images } = plant;
  const displayName = nama_lokal || name;

  return (
      <main className="pt-16 pb-12 max-w-4xl mx-auto w-full flex-grow">
        <section className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden rounded-b-xl border border-secondary-container bg-surface-container-low">
          <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {images && images.map((imgUrl, index) => (
              <div key={index} className="min-w-full h-full relative">
                <img alt={`${displayName} slide ${index + 1}`} className="w-full h-full object-cover" src={imgUrl} />
              </div>
            ))}
          </div>
          {images && images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
              {images.map((_, index) => (
                <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-primary ring-2 ring-background ring-offset-2 scale-110" : "bg-secondary-fixed hover:bg-primary/50"}`} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          )}
        </section>

        <section className="px-margin-mobile md:px-margin-desktop py-stack-md bg-background">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap gap-2 text-on-surface-variant tracking-widest uppercase font-label-caps text-label-caps items-center">
              <span>{famili}</span><span>•</span><span>{kategori}</span>
              {lokasi_taman && (<><span>•</span><span className="text-primary font-bold bg-primary-container/10 px-2 py-0.5 rounded">{lokasi_taman}</span></>)}
            </div>
            <h1 className="font-display-lg-mobile md:text-display-lg text-primary mt-2">{displayName}</h1>
            <p className="font-body-lg italic text-secondary-fixed-dim -mt-1">{nama_latin}</p>
            {deskripsi_singkat && <p className="font-body-md text-on-surface-variant font-medium mt-2">{deskripsi_singkat}</p>}
          </div>
        </section>

        <section className="px-margin-mobile md:px-margin-desktop py-stack-md border-t border-secondary-container">
          <h2 className="font-headline-sm text-headline-sm text-primary mb-4">Kenalan Yuk!</h2>
          <div className="max-w-prose">
            <p className="font-body-lg text-on-surface-variant leading-relaxed">{deskripsi_lengkap}</p>
          </div>
        </section>

        {manfaat && manfaat.length > 0 && (
          <section className="px-margin-mobile md:px-margin-desktop py-stack-md border-t border-secondary-container">
            <h2 className="font-headline-sm text-headline-sm text-primary mb-6">Manfaat &amp; Khasiat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {manfaat.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 border border-secondary-container rounded-lg bg-surface-container-low transition-colors duration-150 hover:bg-surface-container-high">
                  <span className="material-symbols-outlined text-primary text-xl" data-icon="task_alt">task_alt</span>
                  <p className="font-body-md text-on-surface-variant font-medium">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
  );
}
