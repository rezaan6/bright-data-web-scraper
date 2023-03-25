import ClientProvider from "@/components/ClientProvider";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";

export const metadata = {
  title: "Bright Data Web Scraper",
  description: "Bright Data Web Scraper",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-[#F7FBFF] h-screen">
        <ClientProvider>

        {/* SideBar */}
        <Sidebar />

        <main className="p-10 max-w-screen-2xl mx-auto overflow-y-auto ">
          {/* Header */}
          <Header />
          {children}
        </main>
        </ClientProvider>
      </body>
    </html>
  );
}
