import NavigationWrapper from "@/components/NavigationWrapper";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      {/* Global Navbar */}
      <NavigationWrapper />

      {/* Page Content */}
      <div className="flex-grow">{children}</div>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
