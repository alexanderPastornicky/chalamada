import { Header } from "@/components/layout/header";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <div className="max-w-7xl mx-auto px-6">    
                {children}
            </div>
        </>
  );
}