import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Wedding Invitation | ${process.env.BRIDE_NAME} & ${process.env.GROOM_NAME}`,
  description: `Join us in celebrating the wedding of ${process.env.BRIDE_NAME} & ${process.env.GROOM_NAME}.`,
  openGraph: {
    title: `${process.env.BRIDE_NAME} & ${process.env.GROOM_NAME} Wedding`,
    description: `Join us in celebrating our special day on ${process.env.DATE}`,
    images: [
      {
        url: "/us.jpg",
        width: 1200,
        height: 630,
        alt: `${process.env.BRIDE_NAME} and ${process.env.GROOM_NAME}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${process.env.BRIDE_NAME} & ${process.env.GROOM_NAME} Wedding`,
    description: `Join us in celebrating our special day on ${process.env.DATE}`,
    images: ["/us.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} antialiased`}>{children}</body>
    </html>
  );
}
