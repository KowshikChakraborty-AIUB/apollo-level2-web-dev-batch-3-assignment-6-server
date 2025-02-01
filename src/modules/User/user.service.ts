import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { createToken } from '../Auth/auth.utils';
import config from '../../config';

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

const getUsersByUserIdFromDB = async (userId: string) => {
    const result = await User.find({ _id: userId })
    return result;
};

export const UserServices = {
    registerUserIntoDB,
    getUsersByUserIdFromDB
};