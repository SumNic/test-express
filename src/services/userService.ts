import { Request, Response, NextFunction } from 'express';
import prisma from '../config/prisma';
import { ApiError } from '../utils/ApiError';

export const getUserByIdService = async (req: Request) => {
	if (!req.user) throw new ApiError(401, 'Unauthenticated');
	const id = req.params.id;
	const currentUser = req.user;

	if (currentUser.role !== 'ADMIN' && currentUser.id !== id) {
		throw new ApiError(403, 'Access denied');
	}

	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) throw new ApiError(404, 'Not found');

	return { user };
};

export const getAllUsersService = async (req: Request) => {
	if (!req.user) throw new ApiError(401, 'Unauthenticated');
	const currentUser = req.user;

	if (currentUser.role !== 'ADMIN') {
		throw new ApiError(403, 'Only admin can view all users');
	}

	const users = await prisma.user.findMany({ where: { isActive: true } });

	return { users };
};

export const blockUserService = async (req: Request) => {
	if (!req.user) throw new ApiError(401, 'Unauthenticated');
	const id = req.params.id;
	const currentUser = req.user;

	if (currentUser.role !== 'ADMIN' && currentUser.id !== id) {
		throw new ApiError(403, 'Access denied');
	}

	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) throw new ApiError(404, 'User not found');

	await prisma.user.update({
		where: { id },
		data: { isActive: false },
	});

	user.isActive = false;

	return { message: 'User blocked' };
};
