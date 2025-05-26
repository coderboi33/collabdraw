import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favourites: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        if (args.favourites) {
            const favouriteBoards = await ctx.db.query("userFavourites")
                .withIndex("byuserorgid", (q) =>
                    q.eq("userId", identity.subject)
                        .eq("orgId", args.orgId)
                ).order("desc")
                .collect();

            const ids = favouriteBoards.map((favourite) => favourite.boardId);

            const boards = await getAllOrThrow(ctx.db, ids);
            return boards.map((board) => {
                return {
                    ...board,
                    isfavourite: true
                };
            });

        }

        const title = args.search as string;
        let boards = [];
        if (title) {
            boards = await ctx.db.query("boards")
                .withSearchIndex("byTitle", (q) => // Corrected index name
                    q.search("title", title)
                        .eq("orgId", args.orgId)

                ).collect(); // Ensure results are collected into an array
        }
        else {
            boards = await ctx.db.query("boards")
                .withIndex("byOrgId", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect(); // Ensure results are collected into an array
        }

        const boardsWithFavouritesRelation = boards.map((board) => {
            if (!identity) {
                throw new Error("Identity is null during board processing");
            }
            return ctx.db.query("userFavourites")
                .withIndex("byuserboardid", (q) =>
                    q.eq("userId", identity.subject)
                        .eq("boardId", board._id)
                ).unique()
                .then((favourite) => {
                    return {
                        ...board,
                        isfavourite: !!favourite
                    };
                });

        });
        const boardsWithFavouritesBoolean = Promise.all
            (boardsWithFavouritesRelation);

        return boardsWithFavouritesBoolean
    }
})

