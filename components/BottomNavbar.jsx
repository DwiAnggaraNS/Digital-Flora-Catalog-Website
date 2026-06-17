"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "Katalog", href: "/explore", icon: "forest" },
    { label: "Pindai QR", href: "#instructions", icon: "center_focus_strong" },
    { label: "Peta Taman", href: "#location", icon: "potted_plant" },
    { label: "Profil", href: "#", icon: "person" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-background/95 backdrop-blur-md border-t border-secondary-container">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center transition-all ${
              isActive
                ? "bg-primary-container text-on-primary rounded-full px-4 py-1"
                : "text-secondary hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined" data-icon={item.icon}>
              {item.icon}
            </span>
            <span className="font-label-md text-label-md">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
