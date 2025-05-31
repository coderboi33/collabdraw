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
                        <button className="bg-gray-200 hover:bg-gray-300 h-full w-full rounded-lg flex items-center justify-center shadow-lg border-2 border-gray-300 text-gray-800 opacity-100 transition-all duration-200 scale-105 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400">
                            <Plus className="text-gray-700 w-6 h-6" />
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