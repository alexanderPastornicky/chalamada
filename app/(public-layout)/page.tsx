import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="space-y-2">
        <p className="text-foreground text-2xl md:text-4xl tracking-tight">
          <span className="font-thin text-muted-foreground">Lightweight </span>
          <span className="font-light">task management </span>
        </p>
        <div className="flex justify-end">
          <Link href="/sign-in">
            <Button>Get started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
