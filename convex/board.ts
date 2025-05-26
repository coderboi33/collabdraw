import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const image = "/whiteboard.svg";

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const board = await ctx.db.insert('boards', {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: image,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            elements: [],
        });
        return board;
    }
});

export const remove = mutation({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }

        const existingFavourite = await ctx.db.query("userFavourites")
            .withIndex("byuserboardid", (q) =>
                q.eq("userId", identity.subject)
                    .eq("boardId", args.id)
            )
            .unique();
        if (existingFavourite) {
            await ctx.db.delete(existingFavourite._id);
        }

        const board = await ctx.db.get(args.id);
        if (!board) {
            throw new Error("Board not found");
        }
        if (board.authorId !== identity.subject) {
            throw new Error("Not authorized to delete this board");
        }
        await ctx.db.delete(args.id);
    }
});

export const update = mutation({
    args: {
        id: v.id("boards"),
        title: v.string(),

    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }
        const title = args.title.trim();
        if (title.length === 0) {
            throw new Error("Title cannot be empty");
        }

        if (title.length > 50) {
            throw new Error("Title too long, maximum length is 50 characters");
        }
        const board = await ctx.db.patch(args.id, {
            title: args.title,
        });
        return board;
    }
});

export const favourite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }
        const board = await ctx.db.get(args.id);
        if (!board) {
            throw new Error("Board not found");
        }
        if (board.authorId !== identity.subject) {
            throw new Error("Not authorized to favorite this board");
        }
        const existingFavourite = await ctx.db.query("userFavourites")
            .withIndex("byuserboardid", (q) =>
                q.eq("userId", identity.subject)
                    .eq("boardId", board._id)
            )
            .unique();

        if (existingFavourite) {
            throw new Error("Board already favorited");
        }
        const favourite = await ctx.db.insert('userFavourites', {
            orgId: args.orgId,
            userId: identity.subject,
            boardId: board._id,
        });
        return favourite;
    }
});

export const unfavourite = mutation({
    args: {
        id: v.id("boards"),
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated");
        }
        const board = await ctx.db.get(args.id);
        if (!board) {
            throw new Error("Board not found");
        }
        if (board.authorId !== identity.subject) {
            throw new Error("Not authorized to unfavorite this board");
        }
        const existingFavourite = await ctx.db.query("userFavourites")
            .withIndex("byuserboardid", (q) =>
                q.eq("userId", identity.subject)
                    .eq("boardId", board._id)
            )
            .unique();

        if (!existingFavourite) {
            throw new Error("Favourite not found");
        }
        const unfavourite = await ctx.db.delete(existingFavourite._id);
        return unfavourite;
    }
});

export const get = query({
    args: {
        id: v.id("boards"),
    },
    handler: async (ctx, args) => {

        const board = await ctx.db.get(args.id);
        if (!board) {
            throw new Error("Board not found");
        }
        return board;
    }
})
