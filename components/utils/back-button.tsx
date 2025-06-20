import React from "react";
import Link from "next/link";
import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function BackButton ({href}: {href: string}) {
    return (
        <Button variant="outline" size="icon" asChild>
            <Link href={href}>
                <ArrowLeft className="h-4 w-4"/>
            </Link>
        </Button>
    );
}