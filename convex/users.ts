import { v, Validator } from 'convex/values';
import { internalMutation, query, QueryCtx } from './_generated/server';
import { UserJSON } from '@clerk/nextjs/server';

export const upsertFromClerk = internalMutation({
    args: { data: v.any() as Validator<UserJSON> },
    handler: async (ctx, { data }) => {
        const userAttributes = {
            firstName: data.first_name ?? undefined,
            lastName: data.last_name ?? undefined,
            email: data.email_addresses[0].email_address,
            imageUrl: data.image_url ?? undefined,
            clerkUserId: data.id,
        };
        const user = await userByClerkUserId(ctx, data.id);

        if (!user) {
            await ctx.db.insert('users', userAttributes);
        }
        else {
            await ctx.db.patch(user._id, userAttributes)
        }
    },
});

export const deleteFromClerk = internalMutation({
    args: { clerkUserId: v.string() },
    handler: async (ctx, { clerkUserId }) => {
        const user = await userByClerkUserId(ctx, clerkUserId);
        if (user) {
            await ctx.db.delete(user._id);
        } else {
            console.log('User not found');
        }
    },
});

export const getUsers = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.db
            .query('users')
            .collect()
        return user;
    },
});

export const current = query({
    args: {},
    handler: async (ctx) => {
        return await getCurrentUsers(ctx);
    },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
    const userRecord = await getCurrentUsers(ctx)
    if (!userRecord) throw new Error("Can't get current user")
    return userRecord
}

export async function getCurrentUsers(ctx: QueryCtx) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
        return null;
    }
    return await userByClerkUserId(ctx, identity.subject);
};

export async function userByClerkUserId(ctx: QueryCtx, clerkUserId: string) {
    return await ctx.db
        .query('users')
        .withIndex('byClerkUserId', q => q.eq('clerkUserId', clerkUserId))
        .unique();
};
