import { Request, Response, NextFunction } from 'express';
import { loginService, registerService } from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await registerService(req);
		res.status(201).json(result);
	} catch (err) {
		next(err);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = await loginService(req);
		res.json(token);
	} catch (err) {
		next(err);
	}
};
