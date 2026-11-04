import "./globals.css";
export const metadata = {
  title: "Horizon.Hacks · May 2027",
  description: "Builders move the world.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};
export default function L({ children }) {
  return (<html lang="en" className="dark"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@200..900&family=Syne:wght@600;700;800&family=UnifrakturCook:wght@700&display=swap" rel="stylesheet" />
  </head><body>{children}</body></html>);
}
