import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const addComment = mutation({
    args: {
        comment: v.string(),
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const currentUser = await getAuthenticatedUser(ctx);
        const post = await ctx.db.get(args.postId);
        if (!post) throw new Error("Post not found");

        const commentId = await ctx.db.insert("comments", {
            userId: currentUser?._id,
            postId: args.postId,
            comment: args.comment
        })

        await ctx.db.patch(post._id, {
            comments: post.comments + 1
        })

        if (post.userId !== currentUser._id) {
            await ctx.db.insert("notifications", {
                receiverId: post.userId,
                senderId: currentUser._id,
                type: "comment",
                postId: args.postId,
                commentId: commentId,
            })
        }

        return commentId;

    }
})

export const getComments = query({
    args: {
        postId: v.id("posts")
    },
    handler: async (ctx, args) => {
        const comments = await ctx.db
            .query("comments")
            .withIndex("by_post", q => q.eq("postId", args.postId))
            .collect();

        const commentInfo = await Promise.all(
            comments.map(async comment => {
                const user = await ctx.db.get(comment.userId);
                return {
                    ...comment,
                    user: {
                        fullname: user?.fullname,
                        image: user?.image,
                    }
                }
            })
        )

        return commentInfo;
    }
})