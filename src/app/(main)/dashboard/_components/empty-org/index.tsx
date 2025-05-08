"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/clerk-react";
import Image from "next/image";

export default function EmptyOrg() {
    return (
        <div className="h-full flex items-center justify-center">
            <Image
                src={"/board.png"}
                alt={"No Organizations"}
                width={300}
                height={300}
                className="pr-5 hidden md:block"
            />
            <div className="text-center">
                <h2 className="text-3xl font-semibold text-black dark:text-white">
                    You don`t have any organizations yet.
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                    To get started, create an organization and invite your team members.
                </p>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full bg-[#00ff00] hover:bg-[#00c200] text-[#1E1E2F] border-black border-1 font-semibold text-xl rounded-md h-12 mt-4">
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