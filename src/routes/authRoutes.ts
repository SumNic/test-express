import { Router } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Регистрация пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       '201':
 *         description: Пользователь зарегистрирован
 */
router.post('/register', register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Авторизация пользователя
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       '200':
 *         description: Пользователь авторизован
 */
router.post('/login', login);

export default router;
