import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
      <div className="space-y-2">
        <p className="text-foreground text-2xl md:text-4xl tracking-tight">
          <span className="font-thin text-muted-foreground">Lightweight </span>
          <span className="font-light">time management</span>
        </p>
        <div className="flex justify-end">
          <Button>Get started</Button>
        </div>
      </div>
    </div>
  );
}
