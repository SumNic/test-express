import { Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '../config/prisma';

import { ApiError } from '../utils/ApiError';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerService = async (req: Request) => {
	const { fullName, birthDate, email, password, role } = req.body;

	const existing = await prisma.user.findUnique({ where: { email } });
	if (existing) throw new ApiError(400, 'Email already used');

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			fullName,
			birthDate: new Date(birthDate),
			email,
			password: hashedPassword,
			role,
		},
	});

	const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
		expiresIn: '1d',
	});

	return { token };
};

export const loginService = async (req: Request) => {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new ApiError(401, 'Invalid credentials');
	}

	const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
		expiresIn: '1d',
	});

	return { token };
};
