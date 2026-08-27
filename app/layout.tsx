import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://desiteproducts.com"),
  verification: {
    google: "-C8rWak0gVp262BnlBwPTt-TjlE0wdMV8p6AxLekbyo",
  },
  title: {
    default: "Topsoil & Rock Screeners | DeSite Products",
    template: "%s | DeSite Products",
  },
  description:
    "Portable vibratory screeners for topsoil, rock, compost, and aggregate processing. Compare 108, 78, and 68 ProScreen models and request a shipping quote.",
  keywords: [
    "topsoil screener",
    "rock screener",
    "portable screener",
    "vibratory screener",
    "108 ProScreen",
    "78 ProScreen",
    "68 ProScreen",
    "DeSite Products",
  ],
  applicationName: "DeSite Products",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    siteName: "DeSite Products",
    title: "Topsoil & Rock Screeners | DeSite Products",
    description:
      "Explore DeSite ProScreen models and request a shipping quote in minutes.",
    images: [{ url: "/LOGO.webp", width: 1200, height: 630, alt: "DeSite Products" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Topsoil & Rock Screeners | DeSite Products",
    description:
      "Explore DeSite ProScreen models and request a shipping quote in minutes.",
    images: ["/LOGO.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = "G-VDTWZD2082";
  const gtmId = "GTM-PX6HFKVL";
  const metaPixelId = "2030654847372180";
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DeSite Products",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://desiteproducts.com",
    telephone: "+1-877-254-7903",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://desiteproducts.com"}/LOGO.webp`,
  };

  return (
    <html lang="en">

      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);
            t.async=1;
            t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];
            y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "y940c5mzzf");
        `}
        </Script>

        {children}
      </body>
    </html>
  );
}
