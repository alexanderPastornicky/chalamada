import { PublicHeader } from "@/components/layout/public-header";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <PublicHeader />
            {children}
        </div>
    )
}