import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../Middlewares/validateRequest';
import { updateUserValidationSchema } from './user.validaton';
// import validateRequest from '../../Middlewares/validateRequest';
// import userValidationSchema from './user.validaton';
// import loginValidationSchema from '../Auth/auth.validation';
// import { AuthControllers } from '../Auth/auth.controller';

const router = Router();

// router.post(
//     '/signup',
//     validateRequest(userValidationSchema),
//     UserControllers.registerUser,
// );

// router.post(
//     '/login',
//     validateRequest(loginValidationSchema),
//     AuthControllers.loginUser,
// );

router.get('/', UserControllers.getAllUsers);

router.get('/usersByUserId/:userId', UserControllers.getUsersByUserId);

router.get('/manageUserProfile/:email', UserControllers.getUserByEmailId);

router.post(
  '/followUnfollow/:action/:userId/:userIWantToFolllowId',
  UserControllers.followUnfollowUsers,
);

router.put('/updateUserProfile/:email', validateRequest(updateUserValidationSchema),
  UserControllers.updateUserByEmailId,
);

router.patch("/updateUserRole/:userId", UserControllers.updateUserRole);

router.put("/deleteUser/:userId", UserControllers.deleteUser);


export const userRoute = router;