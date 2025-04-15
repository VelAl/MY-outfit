import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { E_AppThemes } from "@/app-types-ts";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";

import "@/assets/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `MY-store | %s`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          enableSystem
          attribute="class"
          disableTransitionOnChange
          defaultTheme={E_AppThemes.SYSTEM}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
