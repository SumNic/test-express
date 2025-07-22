# Проект Express + Prisma + JWT + Swagger + Docker

Сервис на Express.js с авторизацией по JWT, ORM Prisma и автодокументацией Swagger.

## 📦 Установка

1. Клонируем репозиторий и переходим в папку проекта.
2. Копируем пример конфига:
   ```bash
   cp .env.example .env
   ```
   и вносим свои значения (JWT_SECRET, PORT, DATABASE_URL, POSTGRES_PASSWORD).

## 🚀 Запуск с помощью Docker Compose:

- Скрипт запускающий Docker Compose в режиме разработки:
  ```bash
  npm run docker:dev
  ```
- Скрипт запускающий Docker Compose в режиме продакшена:

  ```bash
  npm run docker:prod
  ```

  ```
   После запуска проекта, вы можете получить доступ к API по адресу http://localhost:3000/api.
  ```

## Остановка сервера:

```bash
docker compose down
```
