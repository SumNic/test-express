import '@types/express';

declare global {
	namespace Express {
		interface UserPayload {
			id: string;
			role: 'ADMIN' | 'USER';
		}

		interface Request {
			user?: UserPayload;
		}
	}
}
