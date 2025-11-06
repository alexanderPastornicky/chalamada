import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Task } from "@/prisma/generated/prisma/client";

export default async function Page() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
                <p className="text-sm text-muted-foreground">
                    Add tags to your tasks to organize them. Track your time and get things done.
                </p>
            </div>
            <div className="w-full md:w-auto">
                <Button className="w-full md:w-auto">Create Task</Button>    
            </div>
        </div>
    )
}