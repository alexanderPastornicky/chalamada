import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header>
      <div className="px-6"> 
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-foreground tracking-tight">
              {/* Chalamada */}
            </h1>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

