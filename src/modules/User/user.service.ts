import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from '../Auth/auth.utils';
import config from '../../config';
import { Types } from 'mongoose';

const registerUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);

    // checking if the user is exist
    const user = await User?.isUserExistsByEmail(payload.email);


    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found');
    }

    //create token and sent to the  client
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profileImg: user.profileImg,
        address: user.address,
        payment: user.payment,
        verified: user.verified,
        followers: user.followers,
        following: user.following,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        result,
        accessToken,
    };

};

const getAllUsersFromDB = async () => {
    const result = User.find({ role: 'user' }).select('-password');
    return result;
};

const getUsersByUserIdFromDB = async (userId: string) => {
    const result = await User.find({ _id: userId })
    return result;
};

const followUser = async (userId: string, userIWantToFolllowId: string) => {
    const user = await User.findById(userId);
    const userIWantToFolllow = await User.findById(userIWantToFolllowId);

    if (!user || !userIWantToFolllow) {
        return {
            success: false,
            message: 'User is not found',
            data: null,
        };
    }

    const isAlreadyFollowing = user.following.includes(
        new Types.ObjectId(userIWantToFolllowId),
    );
    const isAlreadyFollower = userIWantToFolllow.followers.includes(
        new Types.ObjectId(userId),
    );

    if (isAlreadyFollowing || isAlreadyFollower) {
        return {
            success: false,
            message: 'You are already following this user',
            data: null,
        };
    }

    user.following.push(new Types.ObjectId(userIWantToFolllowId));
    userIWantToFolllow.followers.push(new Types.ObjectId(userId));

    await user.save();
    await userIWantToFolllow.save();

    return {
        success: true,
        message: 'You are following this user now',
        data: { following: user.following, followers: userIWantToFolllow.followers },
    };
};

const unfollowUser = async (userId: string, userIWantToFolllowId: string) => {
    const user = await User.findById(userId);
    const userIWantToFollow = await User.findById(userIWantToFolllowId);

    if (!user || !userIWantToFollow) {
        return {
            success: false,
            message: 'User not found',
            data: null,
        };
    }

    const isFollowing = user.following.includes(new Types.ObjectId(userIWantToFolllowId));
    const isFollower = userIWantToFollow.followers.includes(new Types.ObjectId(userId));

    if (!isFollowing || !isFollower) {
        return {
            success: false,
            message: 'You are not following this user',
            data: null,
        };
    }

    user.following = user.following.filter(
        (id) => !id.equals(new Types.ObjectId(userIWantToFolllowId)),
    );
    userIWantToFollow.followers = userIWantToFollow.followers.filter(
        (id) => !id.equals(new Types.ObjectId(userId)),
    );

    await user.save();
    await userIWantToFollow.save();

    return {
        success: true,
        message: 'You unfollowed this user',
        data: { following: user.following, followers: userIWantToFollow.followers },
    };
};

export const UserServices = {
    registerUserIntoDB,
    getAllUsersFromDB,
    getUsersByUserIdFromDB,
    followUser,
    unfollowUser
};