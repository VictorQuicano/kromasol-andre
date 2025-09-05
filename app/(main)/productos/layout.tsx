export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full flex-1 flex flex-col bg-black items-center">
      {children}
    </div>
  );
}
