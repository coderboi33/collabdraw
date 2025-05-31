import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/clerk-react";
import { UserPlus } from "lucide-react";

export default function InviteButton() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold text-xl rounded-lg h-12 flex items-center gap-2 shadow-lg transition-all duration-200 border-0">
                        <UserPlus style={{ height: "28px", width: "28px" }} />
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