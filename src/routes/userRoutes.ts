import { Router } from 'express';
import { getUserById, getAllUsers, blockUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Получить всех пользователей
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Список пользователей
 */
router.get('/', getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Получить пользователя по ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       '200':
 *         description: Пользователь найден
 *       '404':
 *         description: Пользователь не найден
 */
router.get('/:id', getUserById);

/**
 * @openapi
 * /users/{id}/block:
 *   patch:
 *     summary: Заблокировать пользователя по ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID пользователя
 *     responses:
 *       '200':
 *         description: Пользователь заблокирован
 *       '404':
 *         description: Пользователь не заблокирован
 */
router.patch('/:id/block', blockUser);

export default router;
