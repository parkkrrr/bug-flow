import { Container } from "@radix-ui/themes";
import ClientThemeProvider from "./ClientThemeProvider";
import "./globals.css";
import NavBar from "./NavBar";
import { Inter } from "next/font/google";
import AuthProvider from "@/app/api/auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log('Layout rendered at', typeof window !== 'undefined' ? 'client' : 'server');

  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AuthProvider>
          <ClientThemeProvider>
            <NavBar />
            <main className="p-5">
              <Container>{children}</Container>
            </main>
          </ClientThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
