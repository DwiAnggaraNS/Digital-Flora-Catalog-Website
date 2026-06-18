"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Katalog Flora", href: "/explore" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 bg-background/90 backdrop-blur-md border-b border-secondary-container transition-colors">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img alt="Logo Tim KKN Rancabali Merona 2026" className="w-15 h-15" src="/images/ui/logo.png"></img>
          <span className="font-headline-sm text-headline-sm text-primary">Sapa Flora Alamendah</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-2 items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`font-label-md text-label-md px-3 py-1 rounded transition-colors duration-150 ${
                  isActive
                    ? "text-primary bg-primary-container/25 font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 text-on-surface-variant hover:bg-surface-container-low rounded transition-colors"
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </header>

      {/* Mobile Sidebar / Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-background/95 backdrop-blur-md border-b border-secondary-container flex flex-col p-6 gap-4 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`font-label-md text-label-md p-3 rounded-lg border border-transparent transition-all ${
                  isActive
                    ? "bg-primary-container text-on-primary font-bold border-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
