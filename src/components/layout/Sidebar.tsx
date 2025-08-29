"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Wallet,
  PanelLeftClose,
  Home,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";


const menu = [
  {
    name: "Collapse",
    icon: PanelLeftClose,
    path: "/",
  },
  {
    name: "Home",
    icon: Home,
    path: "/dashboard",
  },
  {
    name: "PMB",
    icon: BookOpen,
    children: [
      { name: "Pendaftaran", path: "/pmb/pendaftaran" },
      { name: "Seleksi", path: "/pmb/seleksi" },
    ],
  },
  {
    name: "KBM",
    icon: GraduationCap,
    children: [
      { name: "Jadwal", path: "/kbm/jadwal" },
      { name: "Absensi", path: "/kbm/absensi" },
    ],
  },
  {
    name: "Keuangan",
    icon: Wallet,
    children: [
      { name: "Dashboard", path: "/keuangan" },
      { name: "Cost Center", path: "/keuangan/cost-center" },
      { name: "Daftar Ulang", path: "/keuangan/daftar-ulang" },
      { name: "Biaya Operasional", path: "/keuangan/operasional" },
      { name: "Biaya Pendidikan", path: "/keuangan/pendidikan" },
      { name: "Rekap Transaksi", path: "/keuangan/rekap" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpen((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="w-64 bg-white min-h-screen flex flex-col text-base">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-2">
        {/* Logo pakai PNG */}
        <Image
          src="/assets/icons/logo.png"
          alt="Nusa Logo"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>



      {/* Menu */}
      <nav className="flex-1 px-3 space-y-2 font-medium">
        {menu.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <>
                {/* Parent with submenu */}
                <button
                  onClick={() => toggleMenu(item.name)}
                  className="flex items-center justify-between w-full px-3 py-3 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  <div className="flex items-center space-x-2">
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {open[item.name] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>

                {/* Submenu */}
                {open[item.name] && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className={`block px-3 py-2 rounded-lg transition ${pathname === sub.path
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-700 hover:bg-blue-50"
                          }`}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // Single item (Collapse)
              <Link
                href={item.path}
                className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition ${pathname === item.path
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-blue-600 hover:bg-blue-50"
                  }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
