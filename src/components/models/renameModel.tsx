"use client";

import { useRenameModel } from "../../../store/use-rename-model";
import { Button } from "../ui/button";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";


export const RenameModel = () => {
    const { isOpen, initialValues, onClose } = useRenameModel();
    const [newtitle, setNewTitle] = useState(initialValues.title);

    const update = useMutation(api.board.update);

    const tempReload = () => {
        window.location.reload();
    };//TODO: Remove this and use a better way to update the board list

    useEffect(() => {
        if (isOpen) {
            setNewTitle(initialValues.title || "");
        }
    }, [isOpen, initialValues.title]);

    const handleSave: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (!initialValues.id) {
            toast.error("No board ID found");
            return;
        }
        if (!newtitle) {
            toast.error("No title found");
            return;
        }
        if (newtitle.length > 50) {
            toast.error("Title is too long. Maximum length is 50 characters.");
            return;
        }
        if (newtitle === initialValues.title) {
            toast.error("Title is unchanged.");
            return;
        }

        try {
            await update({
                id: initialValues.id as Id<"boards">,
                title: newtitle,
            });
            toast.success("Board title changed!");
            console.log("Board title changed with ID:", initialValues.id);
            onClose();
            tempReload();
        } catch (error) {
            toast.error("Error changing board title.");
            console.error("Error changing board title:", error);
        }
    };

    const debouncedSetNewTitle = useCallback((value: string) => {
        setNewTitle(value);
    }, []);



    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Board Title</DialogTitle>
                    <DialogDescription>
                        Enter the new title for the board.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSave} className="flex flex-col items-start justify-start">
                    <Input
                        required
                        value={newtitle}
                        placeholder="Enter new title"
                        className="mb-4"
                        maxLength={50}
                        onChange={(e) => debouncedSetNewTitle(e.target.value)}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" onClick={tempReload} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}