import { create } from 'zustand';
import { Id } from '../convex/_generated/dataModel';

const defaultValues = { id: "", title: "" };

interface RenameModelState {
    isOpen: boolean;
    initialValues: typeof defaultValues;
    onOpen: (id: Id<"boards">, title: string) => void;
    onClose: () => void;
}

export const useRenameModel = create<RenameModelState>((set) => ({
    isOpen: false,
    initialValues: defaultValues,
    onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
    onClose: () => set({ isOpen: false, initialValues: defaultValues }),

}));