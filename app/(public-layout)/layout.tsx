import { PublicHeader } from "@/components/layout/public-header";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-dvh">
            <PublicHeader />
            <div className="flex-1 flex">
                {children}
            </div>
        </div>
    )
}