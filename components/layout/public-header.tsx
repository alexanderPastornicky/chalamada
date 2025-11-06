import { Button } from "@/components/ui/button";
import { SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";

export function PublicHeader() {
  return (
    <header>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              Chalamada
            </h1>
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
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

