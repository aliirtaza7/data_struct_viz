import type { Metadata } from "next";
import "./globals.css";
import ToastProvider from "./_components/ToastProvider";

export const metadata: Metadata = {
  title: "Data Struct Viz",
  description: "Data Structures and Algorithms Visualizer",
  icons: {
    icon: [
      { url: "/Favicon.ico", sizes: "any" },
    ],
    shortcut: "/Favicon.ico",
    apple: "/Favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full overflow-x-hidden">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
