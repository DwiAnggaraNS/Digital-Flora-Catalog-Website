"use client";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  // Simple client-side clear and redirect to logout
  const handleLogout = async () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Protected Admin Panel Card */}
      <div className="max-w-md w-full border border-secondary-container bg-surface-container-lowest p-8 rounded-lg shadow-md text-center">
        <h1 className="font-display-lg-mobile text-primary mb-4">Dasbor Admin</h1>
        <p className="font-body-md text-secondary mb-6">
          Selamat datang kembali di panel administrasi Sapa Flora Alamendah!
        </p>
        <button
          onClick={handleLogout}
          className="bg-error text-white py-2 px-6 rounded font-label-md text-sm hover:opacity-90 transition-opacity cursor-pointer"
        >
          Keluar
        </button>
      </div>
    </main>
  );
}
