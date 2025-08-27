export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full flex flex-col auth_layout">{children}</div>;
}
