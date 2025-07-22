import { Request, Response, NextFunction } from 'express';
import { blockUserService, getAllUsersService, getUserByIdService } from '../services/userService';

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await getUserByIdService(req);
		res.json(user);
	} catch (err) {
		next(err);
	}
};

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await getAllUsersService(req);
		res.json(users);
	} catch (err) {
		next(err);
	}
};

export const blockUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await blockUserService(req);
		res.json(result);
	} catch (err) {
		next(err);
	}
};
