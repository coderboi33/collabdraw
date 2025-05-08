import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/clerk-react";
import { Plus } from "lucide-react";

export default function InviteButton() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full bg-[#00ff00] hover:bg-[#00c200] text-[#1E1E2F] border-black border-1 font-semibold text-xl rounded-md h-12">
                        <Plus style={{ height: "28px", width: "28px" }} />
                        Invite People

                    </Button>
                </DialogTrigger>
                <DialogContent className="p-0 bg-black border-none flex items-center justify-center w-[1500px] h-auto">
                    <DialogTitle />
                    <div className="flex items-center justify-center w-full">
                        <OrganizationProfile />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}