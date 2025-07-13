'use client';

import React from "react";
import {Loader2} from "lucide-react";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export default function FullscreenLoader ({className}: {className?: string}) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    return (
        <div className={cn("fixed w-full h-full bottom-0 left-0 z-20 flex items-center justify-center bg-black/5 dark:bg-black/30", isAdmin && "lg:pl-48", className)}>
            <Loader2 className={cn("animate-spin size-14 stroke-1 text-red-500")}/>
        </div>
    );
}