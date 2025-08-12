import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Quiz Builder - Create Amazing Quizzes",
  description: "Build custom quizzes with various question types. Create, manage, and share your quizzes with ease.",
  keywords: ["quiz", "builder", "education", "assessment", "questions"],
  authors: [{ name: "Yura" }],
  viewport: "width=device-width, initial-scale=1",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
