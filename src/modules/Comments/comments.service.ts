import httpStatus from "http-status";
import AppError from "../../Errors/AppError";
import { GardeningPosts } from "../GardeningPosts/gardeningPosts.model";
import { Comments } from "./comments.model";
import { TComment } from "./comments.interface";

const createcommentsIntoDB = async (payload: TComment) => {
    const postData = await GardeningPosts.findById(payload.postId);

    if (!postData) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'This gardening post is not exist!',
        );
    }

    const result = Comments.create(payload);
    return result;
};

const getCommentsByPostIdFromDB = async (postId: string) => {
    const comments = await Comments.find({ postId, isDeleted: false })
        .populate('postId')
        .populate({
            path: 'userId',
            select: '-password',
        });
    return comments;
};

const getPostsAndCommentsTrendFromDB = async () => {
    try {
        // Aggregate posts count by date
        const postsData = await GardeningPosts.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    posts: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Aggregate comments count by date
        const commentsData = await Comments.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    comments: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Merge posts and comments data into a single trend array
        const trendMap: Record<string, { date: string; posts: number; comments: number }> = {};

        postsData.forEach((entry) => {
            trendMap[entry._id] = { date: entry._id, posts: entry.posts, comments: 0 };
        });

        commentsData.forEach((entry) => {
            if (trendMap[entry._id]) {
                trendMap[entry._id].comments = entry.comments;
            } else {
                trendMap[entry._id] = { date: entry._id, posts: 0, comments: entry.comments };
            }
        });

        // Convert trendMap to array
        const postsAndCommentsTrend = Object.values(trendMap);

        return postsAndCommentsTrend;
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        return [];
    }
};


export const CommentsServices = {
    createcommentsIntoDB,
    getCommentsByPostIdFromDB,
    getPostsAndCommentsTrendFromDB
};