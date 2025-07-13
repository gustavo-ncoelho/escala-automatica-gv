import React from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Trash2} from "lucide-react";

interface ConfirmDeleteModalProps {
    title: string;
    description: string;
    cancelFunction: () => void;
    deleteFunction: () => void;
}

export default function ConfirmDeleteModal ({title, description, cancelFunction, deleteFunction}: ConfirmDeleteModalProps) {
    return (
        <div onClick={cancelFunction} className={cn("fixed flex justify-center items-center lg:right-0 bottom-0 z-49 w-screen h-screen bg-black/40 dark:bg-black/60")}>
            <div onClick={(e) => e.stopPropagation()} className={"p-6 z-50 bg-background border border-border/30 rounded-2xl flex flex-col items-center justify-center space-y-4"}>
                <div className={"flex w-full justify-start items-center space-x-4"}>
                    <div className={"rounded-full bg-destructive/10 flex items-center justify-center"}>
                        <Trash2 className={"size-6 m-3 text-destructive"}/>
                    </div>
                    <h1 className={"text-xl font-medium"}>{title}</h1>
                </div>

                <p className={"text-muted-foreground"}>{description}</p>

                <div className={"flex w-full items-center justify-between"}>
                    <Button onClick={cancelFunction} variant={"outline"}>Cancelar</Button>
                    <Button onClick={deleteFunction} variant={"trash"}>Excluir</Button>
                </div>
            </div>
        </div>
    );
}