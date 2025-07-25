import React from "react";
import LoginForm from "@/components/main/login-form";
import {LifeBuoy} from "lucide-react";

export default function Home() {
    return (
        <div className="relative min-h-screen bg-muted/30">
            <div className={"absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 min-w-52"}>
                <LifeBuoy className="size-9 text-red-500"/>
                <span className={"text-3xl font-semibold block lg:hidden"}>Escala GV</span>
                <span className={"text-3xl font-semibold hidden lg:block"}>Escala Automática GV</span>
            </div>
            <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-md:w-5/6 max-sm:w-full max-sm:px-4"}>
                <LoginForm/>
            </div>
        </div>
    );
}
