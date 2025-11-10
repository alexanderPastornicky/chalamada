import { Button } from "@/components/ui/button";
import { SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export function PublicHeader() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-xl font-semibold text-foreground tracking-tight">
                Chalamada
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <SignedOut>
              <SignInButton>
              <Button>
                  Log in
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
          <SignedIn>
            <div className="flex gap-2">
            <Link href="/app">
              <Button>
                Dashboard
              </Button>
            </Link>
            <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

