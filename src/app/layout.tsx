import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; 
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/AuthContext";
import { UsersProvider } from "@/lib/context/UserContext";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Barber App",
  description: "Sistema de agendamento para barbearia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.variable} antialiased`}>
        <UsersProvider>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
        </UsersProvider>
      </body>
    </html>
  );
}