"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavbarDetail() {
  const router = useRouter();
  return (
    <>
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 bg-background/90 backdrop-blur-md border-b border-secondary-container transition-all">
        <div className="flex items-center gap-2">
          <button onClick={() => router.back()} className="p-2 hover:bg-surface-container-low text-primary rounded-lg transition-colors cursor-pointer" aria-label="Kembali">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="font-headline-sm text-headline-sm text-primary">Sapa Flora Alamendah</span>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: `Sapa Flora Alamendah`, text: `Yuk kenalan dengan tanaman yang ada di Desa Alamendah)`, url: window.location.href }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Tautan halaman berhasil disalin ke papan klip!");
              }
            }}
            className="p-2 hover:bg-surface-container-low text-primary rounded-lg transition-colors cursor-pointer" aria-label="Bagikan"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
          <Link href="/explore" className="p-2 hover:bg-surface-container-low text-primary rounded-lg transition-colors flex-shrink-0" aria-label="Katalog">
            <img 
              alt="Logo Tim KKN Rancabali Merona 2026" 
              className="w-10 h-10 object-contain" 
              src="/images/ui/logo.png"
            />
          </Link>
        </div>
      </header>
    </>
  );
}
