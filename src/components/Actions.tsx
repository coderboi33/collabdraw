"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useRenameModel } from "../../store/use-rename-model";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: Id<"boards">;
    title: string;
};

export function Actions({ children, side, sideOffset, id, title }: ActionsProps) {
    const remove = useMutation(api.board.remove);
    const { onOpen } = useRenameModel();

    const handleCopyLink = () => {
        const link = `${window.location.origin}/board/${id}`;
        navigator.clipboard.writeText(link).then(() => {
            toast.success("Link copied to clipboard!");
            console.log("Link copied to clipboard:", link);
        }).catch((err) => {
            toast.error("Failed to copy link");
            console.error("Failed to copy link:", err);
        });
    }

    const handleDelete = () => {
        console.log("Attempting to delete board with id:", id);
        remove({ id })
            .then((response) => {
                toast.success("Board deleted successfully!");
                console.log("Board deleted successfully:", response);
            })
            .catch((err) => {
                toast.error("Failed to delete board");
                console.error("Failed to delete board:", err);
            });
    }
    //TODO: Add a confirmation dialog before deleting the board like rename model

    const handleRename = () => {
        console.log("Renaming board with id:", id);
        onOpen(id, title);
        console.log("Rename model opened with id:", id);
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                onClick={(e) => { e.stopPropagation() }}
                className="w-56 bg-white rounded-md shadow-lg p-2"
            >
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleCopyLink} >
                    <Link2 className="mr-2" /> Copy Link
                </DropdownMenuItem>
                {/* <Confirm
                    header="Delete Board"
                    description="Are you sure you want to delete this board? This action cannot be undone."
                    onConfirm={() => {
                        console.log("Delete confirmation received"); // Debug log
                        handleDelete();
                    }}> */}
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleDelete}>
                    <Trash2 className="mr-2" />
                    Delete
                </DropdownMenuItem>
                {/* </Confirm> */}
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleRename}>
                    <Pencil className="mr-2" />
                    Rename
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                    Add to Favourites
                    <Star className="ml-2 text-yellow-500" />
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer">
                    Remove from Favourites
                    <Star className="ml-2 text-gray-400" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}