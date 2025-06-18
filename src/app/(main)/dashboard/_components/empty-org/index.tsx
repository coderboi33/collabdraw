"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/clerk-react";
import Image from "next/image";

export default function EmptyOrg() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="text-center flex flex-col items-center">
                <Image
                    src={"/board.png"}
                    alt={"No Organizations"}
                    width={240}
                    height={240}
                    className="mb-6 rounded-xl border border-gray-200 dark:border-[#232336] bg-white dark:bg-[#18181b]"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-2">
                    No organizations found
                </h2>
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mt-2 mb-2 font-medium">
                    Start collaborating by creating your first organization. Invite your team and unlock powerful features to work together seamlessly.
                </p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full md:w-auto px-16 py-5 bg-gradient-to-r from-[#b7d2ff] to-[#e0c3fc] hover:from-[#e0c3fc] hover:to-[#b7d2ff] text-[#1E1E2F] font-extrabold text-2xl md:text-3xl rounded-2xl shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#b7d2ff]/40 mt-8 border-4 border-[#e0c3fc]">
                            Create Organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none flex items-center justify-center w-[432px] h-auto">
                        <DialogTitle />
                        <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}