import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export function errorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
	const status = err instanceof ApiError ? err.statusCode : 500;
	const message = err.message || 'Internal Server Error';

	res.status(status).json({
		error: {
			message,
			status,
		},
	});
}
