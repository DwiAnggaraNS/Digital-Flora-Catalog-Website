import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop flex flex-col items-center gap-stack-sm text-center bg-surface-container-low border-t border-secondary-container dark:bg-inverse-surface dark:border-on-secondary-fixed-variant">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-2xl" data-icon="eco">
          eco
        </span>
        <span className="font-headline-sm text-headline-sm text-primary dark:text-primary-fixed">
          Sapa Flora Alamendah
        </span>
      </div>

      <p className="font-sans text-sm text-[#625e53] max-w-xl leading-relaxed">
        Website ini merupakan program kerja tim Rancabali Merona KKN-PM Periode 2 Tahun 2026, 
        Universitas Gadjah Mada.
      </p>

      <br/>

      <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
        <Link
          href="https://www.instagram.com/rancarona?igsh=MWI4MG45bHB1eDVxOQ=="
          className="font-body-md text-body-md text-primary dark:text-secondary-fixed-dim hover:text-primary hover:underline transition-all duration-300"
        >
          Instagram Kami
        </Link>
        <Link
          href="https://www.tiktok.com/@rancarona?_r=1&_t=ZS-97I722yfh0T"
          className="font-body-md text-body-md text-primary dark:text-secondary-fixed-dim hover:text-primary hover:underline transition-all duration-300"
        >
          Tiktok Kami
        </Link>
      </div>

      <p className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim max-w-md">
        © 2026 Desa Alamendah, Kec. Rancabali. Melestarikan Pusaka Hijau Kita.
      </p>
    </footer>
  );
}
