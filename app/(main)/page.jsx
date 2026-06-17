import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";

export default function Home() {
  return (
    <main className="pt-16 pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[50vh] md:h-[70vh] w-full">
          <img
            alt="Lush tropical garden pathway with ferns and palms"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6as4ChzhSKhN4dH1ODWCsXAKATIQhNFFHCY6DtjA96CVCL_zjH7BLgsplchXZ5sesf-lRXehUv0lBSW4nYQFlzEyN14JajYpE8OaGS2qVCzUvzQRVf3GgPfkSGl-mDBoAnt0h6FLLdn07llSweBA8Ta0esb833yoiUrYXemgreRTlpbiE_WqaOD7nAkOdpI2j8pJZybhy9pFDPj0oOVvi39COF_TBNAxaq6Zx1B83GN8b-T6tVa9YFCfMwJUqAinjJRQJFfItIQ"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="px-margin-mobile md:px-margin-desktop -mt-24 relative z-10">
          <div className="max-w-3xl bg-background/90 backdrop-blur-sm p-stack-md md:p-stack-lg border border-secondary-container rounded-lg">
            <div className="flex items-center gap-3 mb-stack-sm">
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
                Halo! Selamat datang di Taman Alamendah
              </h1>
            </div>
            <p className="font-body-lg text-body-lg text-secondary mb-stack-md max-w-xl">
              Pindai *QR code* pada tanaman yang kamu temui di kawasan sejuk Rancabali ini untuk kenalan lebih dekat dengan mereka!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/explore"
                className="bg-primary-container text-on-primary text-label-md font-label-md py-3 px-8 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                Jelajahi Koleksi
                <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="#instructions"
                className="border border-primary-container text-primary text-label-md font-label-md py-3 px-8 rounded flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors"
              >
                Cara Memindai QR
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-stack-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-stack-md">
          
          {/* Feature 1 - Botanical Heritage */}
          <FeatureCard
            colSpan="md:col-span-8"
            category="PUSAKA ALAM LOKAL"
            title="Warisan Alam Desa Alamendah"
            description="Temukan kekayaan ragam flora yang tumbuh subur di tanah pegunungan Rancabali, Kabupaten Bandung. Setiap tanaman menyimpan cerita unik tentang kesehatan, ekosistem, dan budaya luhur desa kami."
          >
            <div className="flex gap-stack-sm mt-4">
              <div className="h-20 w-32 border border-secondary-container rounded overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                <img
                  alt="Fern close up"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaMFLOfojpK3NDgh_pAhCtFjttErYp8W1UPlaYdlj9RyT40X9YL7kLbfSrRC9SHYqA1RXrch0tqcaj4mAJCXtM0k-DNtYfKOXCuLrrL3UVROQMBOQvg2e4a4jHDCOrBUWbz6Iubdy50TPn-APUrDek0zXqUz_N1Sozek7NzfS4OqttAAcg4vPGJpUiBl44ss3foz-KU_YTYxhzWvQ6RtN9CxT_5bE7rLbR4Gbvtg4R5eBa4pan17neX8UzmXXZFRU8k1TM_d5XLQ"
                />
              </div>
              <div className="h-20 w-32 border border-secondary-container rounded overflow-hidden grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                <img
                  alt="Moss on stone"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSYy82s74Zi4xNrnb3WssWPG9bfSNvmV5msT_Yg4f5GMShNcfk92wnQTvmsjqPvVPEOB7eOzeiMwI241u8_6aY-8z_c9uqUTzjgwjWtZkC400VCV9RxRtjRWReohcs6sB27qdCkNPCXcDKD-2fZc7TWWJXKfLl4t_lZruXyncrTxxQy2LoXsUFcyBkWh2LuCeYGXdu0nz-24HSaT8SOeVo9xbm31A_ZB_4PQ6RPWNzfCZg3xk4-LKMGahjf1glBClGYe8fiZIygw"
                />
              </div>
            </div>
          </FeatureCard>

          {/* Feature 2 - QR scanner promo */}
          <FeatureCard
            colSpan="md:col-span-4"
            isPrimary={true}
            icon="qr_code_scanner"
            title="Bawa HP-mu!"
            description="Kamera HP kamu adalah kunci untuk membuka rahasia setiap lembar daun di taman ini."
          />

        </div>
      </section>

      {/* Cara Memindai QR Code Guide Section */}
      <section id="instructions" className="px-margin-mobile md:px-margin-desktop py-stack-lg bg-surface-container-low border-y border-secondary-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline-md text-headline-md text-primary text-center mb-8">
            Cara Mengenal Tanaman lewat QR Code 
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-background border border-secondary-container rounded-lg flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-bold text-lg mb-4">1</span>
              <h3 className="font-label-md font-bold mb-2">Papan Informasi</h3>
              <p className="text-sm text-on-surface-variant">Temukan papan informasi tanaman yang telah terpasang di sekitar kawasan taman.</p>
            </div>
            <div className="p-5 bg-background border border-secondary-container rounded-lg flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-bold text-lg mb-4">2</span>
              <h3 className="font-label-md font-bold mb-2">Pindai QR</h3>
              <p className="text-sm text-on-surface-variant">Pindai QR code di papan tersebut menggunakan Google Lens atau aplikasi pemindai di HP Anda.</p>
            </div>
            <div className="p-5 bg-background border border-secondary-container rounded-lg flex flex-col items-center text-center">
              <span className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-bold text-lg mb-4">3</span>
              <h3 className="font-label-md font-bold mb-2">Buka Info</h3>
              <p className="text-sm text-on-surface-variant">Klik tautan yang muncul untuk langsung berkenalan lebih dekat dengan profil lengkap tanamannya!</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-secondary italic">
              Atau kamu juga bisa langsung membuka halaman <Link href="/explore" className="text-primary font-bold underline">Katalog Flora</Link> untuk melihat seluruh koleksi kami.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Quote Divider */}
      <section className="py-stack-lg border-y border-secondary-container bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-margin-mobile text-center">
          <span
            className="material-symbols-outlined text-outline-variant text-4xl block mb-4"
            data-icon="format_quote"
          >
            format_quote
          </span>
          <p className="font-display-lg-mobile md:font-display-lg text-on-surface-variant italic leading-tight">
            &quot;Setiap daun adalah halaman dalam buku sejarah alam yang terbuka lebar bagi siapa saja yang mau membaca.&quot;
          </p>
          <div className="editorial-rule w-24 mx-auto my-stack-md"></div>
          <p className="font-label-caps text-label-caps text-secondary">ARSIP DIGITAL ALAMENDAH</p>
        </div>
      </section>

      {/* Map/Location Section */}
      <section id="location" className="px-margin-mobile md:px-margin-desktop py-stack-lg grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center">
        <div className="order-2 md:order-1 border border-secondary-container aspect-video overflow-hidden rounded-lg w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15836.013216969715!2d107.4263985!3d-7.12561225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e688bce5daa2ed1%3A0x8255c337130666d2!2sRancabali%2C%20Alamendah%2C%20Kec.%20Rancabali%2C%20Kabupaten%20Bandung%2C%20Jawa%20Barat%2C%20Indonesia!5e0!3m2!1sid!2ssg!4v1781712195334!5m2!1sid!2ssg"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="font-headline-md text-headline-md text-primary mb-stack-sm">
            Kunjungi Kami di Rancabali
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-md">
            Berlokasi di dataran tinggi Desa Alamendah yang asri. Udara bersih, hamparan kebun, dan kicauan burung menemani setiap langkah penjelajahan alammu.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" data-icon="location_on">
                location_on
              </span>
              <span className="font-body-md text-body-md">
                Desa Alamendah, Kec. Rancabali, Kabupaten Bandung
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
