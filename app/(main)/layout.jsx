import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";

export default function MainLayout({ children }) {
  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow">{children}</div>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Navigation Bar */}
      <BottomNavbar />
    </>
  );
}
