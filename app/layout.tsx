import type { Metadata } from "next";
import "@/styles/globals.css";
import { TopBar } from "@/components/chrome/TopBar";
import { LeftRail } from "@/components/chrome/LeftRail";
import { Footer } from "@/components/chrome/Footer";

export const metadata: Metadata = {
  title: "AION Green IT — Module 1",
  description:
    "Green IT as a Lever for Climate Protection & Competitiveness — learner playground.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-paper">
        <TopBar />
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col md:flex-row">
          <LeftRail />
          <main className="min-w-0 flex-1 px-4 py-8 md:px-8">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
