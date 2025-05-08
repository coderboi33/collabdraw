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
    const data = useQuery(api.boards.get, { orgId });

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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {query.favourites ? "Favourite Boards" : "Boards"}
            </h2>
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
                        isFavourite={true}
                    />
                ))}
            </div>
        </div>
    );
}