import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="text-foreground text-2xl md:text-4xl tracking-tight">
          <span className="font-thin text-muted-foreground">Lightweight </span>
          <span className="font-light">task management</span>
        </p>
        <p className="text-xs text-muted-foreground md:text-sm">
          For individual use with focus on time
        </p>
      </div>
    </div>
  );
}