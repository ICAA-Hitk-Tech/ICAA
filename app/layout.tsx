export const metadata = {
  title: "ICAA — International Conference on Applied Algorithms",
  description: "The International Conference on Applied Algorithms (ICAA) brings together researchers, practitioners, and students interested in all aspects of algorithm design and analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

