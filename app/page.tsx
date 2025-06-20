import React from "react";
import LoginForm from "@/components/main/login-form";
import {LifeBuoy} from "lucide-react";

export default function Home() {
    return (
        <div className="relative min-h-screen bg-muted/30">
            <div className={"absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4"}>
                <LifeBuoy className="size-9 text-red-500"/>
                <span className={"text-3xl font-semibold"}>Escala GV</span>
            </div>
            <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}>
                <LoginForm/>
            </div>
        </div>
    );
}
