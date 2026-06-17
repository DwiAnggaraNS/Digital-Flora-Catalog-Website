import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Sapa Flora Alamendah",
  description:
    "Katalog Flora Digital Desa Alamendah, Kec. Rancabali, Kabupaten Bandung. Kenali lebih dekat berbagai spesies flora eksotis, endemik, dan herbal di sekitar kita.",
  keywords: "flora, botanical, catalog, alamendah, rancabali, tanaman obat, anggrek",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased light`}
    >
      <head>
        {/* Material Symbols Outlined stylesheet */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-body-md text-on-background bg-background">
        {children}
      </body>
    </html>
  );
}
