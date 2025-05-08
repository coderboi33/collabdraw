"use client";

import Hint from "@/components/hint/hint";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/clerk-react";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

export default function NewButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint label="Create a new organization">
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none flex items-center justify-center w-[432px]">
                <DialogTitle />
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
}