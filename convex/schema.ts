import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({

    boards: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
        createdAt: v.string(),
        updatedAt: v.string(),
        elements: v.array(
            v.object({
                type: v.string(),
                x: v.number(),
                y: v.number(),
                width: v.optional(v.number()),
                height: v.optional(v.number()),
                points: v.optional(v.array(v.object({
                    x: v.number(),
                    y: v.number(),
                    pressure: v.optional(v.number()),
                }))),
                text: v.optional(v.string()),
                imageUrl: v.optional(v.string()),
            })
        ),
    }).index('byOrgId', ['orgId'])
        .searchIndex('byTitle', {
            searchField: 'title',
            filterFields: ['orgId'],
        }),

    users: defineTable({
        firstName: v.optional(v.string()),
        lastName: v.optional(v.string()),
        email: v.string(),
        clerkUserId: v.string(),
        imageUrl: v.optional(v.string()),
        boards: v.optional(v.array(v.id('boards'))),
    }).index('byClerkUserId', ['clerkUserId']),

    userFavourites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        boardId: v.id('boards'),
    }).index('byboardid', ['boardId'])
        .index('byuserorgid', ['userId', 'orgId'])
        .index('byuserboardid', ['userId', 'boardId'])
        .index('byuserboardorgid', ['userId', 'orgId', 'boardId']),
});