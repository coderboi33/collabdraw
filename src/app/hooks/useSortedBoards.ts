import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useMemo } from "react";

interface SortOption {
    key: string;
    order: string;
}

export function useSortedBoards(orgId: string, query: { search?: string; favourites?: string }, sortOption: SortOption) {

    const data = useQuery(api.boards.get, { orgId, ...query });


    const sortedData = useMemo(() => {
        if (!data) return undefined;

        return [...data].sort((a, b) => {
            if (sortOption.key === "title") {
                return sortOption.order === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }

            if (sortOption.key === "createdAt") {
                return sortOption.order === "asc"
                    ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }

            if (sortOption.key === "updatedAt") {
                return sortOption.order === "asc"
                    ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
                    : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            }

            return 0;
        });
    }, [data, sortOption]);

    return { sortedData, isLoading: data === undefined };
}