"use client"; 

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import NavbarDetail from "@/components/NavbarDetail";

export default function NavigationWrapper() {
  const pathname = usePathname();

  // Logic: Checks if the URL starts with "/explore/" and has any content after it (like an ID or slug).
  // The regex /^\/explore\/[^/]+$/ ensures it matches "/explore/ficus" but NOT "/explore"
  const isDetailPage = pathname.startsWith("/explore/") && pathname.length > 9;

  // If on the detail page, render the NavbarDetail. Otherwise, render the regular Navbar.
  return isDetailPage ? <NavbarDetail /> : <Navbar />;
}