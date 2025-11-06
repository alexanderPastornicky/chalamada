import { Button } from "@/components/ui/button";

export function Header() {
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
            <Button>
              Log in
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

