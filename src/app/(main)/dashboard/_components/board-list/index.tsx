//TODO: Add sorting options for boards


"use client";

import React from "react";
import EmptyBoards from "./empty-boards";
import EmptyFavourite from "./empty-favourites";
import EmptySearch from "./empty-search";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import Loading from "@/components/Loading";
import BoardCard from "../board-card";
import { NewBoardButton } from "./newboardbutton";

interface BoardListProps {

    orgId: string;
    query: {
        search?: string;
        favourites?: string;
    };
}

export default function BoardList({ orgId, query }: BoardListProps) {
    const data = useQuery(api.boards.get, { orgId, ...query });

    if (data === undefined) {
        return (
            <Loading />
        );
    }

    if (!data?.length) {
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
    console.log("orgid", orgId);
    console.log("query", query);
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent drop-shadow-lg tracking-tight m-0">
                    {query.favourites ? "Favourite Boards" : "Boards"}
                </h2>

            </div>
            <hr className="border-2 border-gray-300 mb-6 w-full font-extrabold" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <NewBoardButton orgId={orgId} disabled={false} />
                {data?.map((board) => (
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