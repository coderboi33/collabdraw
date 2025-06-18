"use client";

import React, { useState } from "react";
import EmptyBoards from "./empty-boards";
import EmptyFavourite from "./empty-favourites";
import EmptySearch from "./empty-search";
import Loading from "@/components/Loading";
import BoardCard from "../board-card";
import { NewBoardButton } from "./newboardbutton";
import { useSortedBoards } from "@/app/hooks/useSortedBoards";
import { ListFilter } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUpAZ, ArrowDownAZ, ArrowUp01, ArrowDown01 } from "lucide-react";



interface BoardListProps {

    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    };
}

export default function BoardList({ orgId, query }: BoardListProps) {
    const [sortOption, setSortOption] = useState({
        key: "createdAt", // Default sort key
        order: "dsc",    // Default sort order
    });


    const { sortedData } = useSortedBoards(orgId, query, sortOption);

    const NameAsc = () => {

        setSortOption({
            key: "title",
            order: "asc",
        })
    }

    const NameDsc = () => {

        setSortOption({
            key: "title",
            order: "dsc",
        })
    }

    const CreatedAsc = () => {

        setSortOption({
            key: "createdAt",
            order: "asc",
        })
    }

    const CreatedDsc = () => {

        setSortOption({
            key: "createdAt",
            order: "dsc",
        })
    }

    if (sortedData === undefined) {
        return (
            <Loading />
        );
    }

    if (!sortedData?.length) {
        if (query.search) {
            return (
                <EmptySearch search={query.search} />
            );
        }
        if (query.favourites) {
            return (
                <EmptyFavourite />
            );
        }
        return (
            <EmptyBoards />
        );
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg tracking-tight m-0">
                    {query.favourites ? "Favourite Boards" : "Boards"}
                </h2>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-50 hover:bg-blue-100 text-sm text-blue-800 font-medium transition-colors border border-blue-200 shadow-sm">
                            <ListFilter className="w-4 h-4" />
                            Sort Boards
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="bottom"
                        align="end"
                        onClick={(e) => { e.stopPropagation() }}
                        className="w-36 bg-white text-gray-900 rounded-lg shadow-xl p-1 border border-gray-200"
                    >
                        <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer" onClick={NameAsc}>
                            <ArrowUpAZ className="mr-2 w-4 h-4" /> Name Ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer" onClick={NameDsc}>
                            <ArrowDownAZ className="mr-2 w-4 h-4" /> Name Descending
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer" onClick={CreatedAsc}>
                            <ArrowUp01 className="mr-2 w-4 h-4" /> Created At Ascending
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-2 hover:bg-gray-100 cursor-pointer" onClick={CreatedDsc}>
                            <ArrowDown01 className="mr-2 w-4 h-4" /> Created At Descending
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <hr className="border-2 border-gray-300 mb-6 w-full font-extrabold" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NewBoardButton orgId={orgId} disabled={false} />
                {sortedData?.map((board) => (
                    <BoardCard
                        key={board._id}
                        id={board._id}
                        title={board.title}
                        imageUrl={board.imageUrl}
                        authorName={board.authorName}
                        authorId={board.authorId}
                        updatedAt={board.updatedAt}
                        createdAt={board.createdAt}
                        orgId={board.orgId}
                        isFavourite={board.isfavourite}
                    />
                ))}
            </div>
        </div>
    );
}