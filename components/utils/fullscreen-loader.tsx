import React from "react";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";

export default function FullscreenLoader ({className}: {className?: string}) {
    return (
        <div className={"fixed w-full h-full top-0 left-0 z-45 flex items-center justify-center bg-black/10 dark:bg-black/50 lg:pl-48 lg:pb-32"}>
            <Loader2 className={cn("animate-spin size-14 stroke-1 text-red-500", className)}/>
        </div>
    );
}