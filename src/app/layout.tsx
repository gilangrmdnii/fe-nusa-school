import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-50">
        <AppProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
