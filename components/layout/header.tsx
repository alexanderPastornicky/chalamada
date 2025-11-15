import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/mode-toggle";

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
          <div className="flex items-center gap-2">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}

