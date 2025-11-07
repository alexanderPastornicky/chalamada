export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome to your dashboard. Here you can manage your tasks and projects.
          </p>
        </div>
      </div>
    </div>
  );
}