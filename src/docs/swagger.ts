// src/swagger.ts
import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import YAML from 'yaml';

const file = fs.readFileSync('./src/docs/components.yaml', 'utf8');
const extraComponents = YAML.parse(file);

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'User Service API',
			version: '1.0.0',
			description: 'Документация для сервиса пользователей',
		},
		...extraComponents,
		servers: [{ url: 'http://localhost:3000/api' }],
		tags: [
			{
				name: 'Auth',
				description: 'Регистрация и вход',
			},
			{
				name: 'Admin',
				description: 'Назначение админа (для теста)',
			},
			{
				name: 'Users',
				description: 'Операции с пользователями',
			},
		],
	},
	// пути к файлам, где будут JSDoc‑комментарии с описанием
	apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
	app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
}
