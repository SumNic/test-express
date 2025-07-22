# Dockerfile
# FROM node:20

# WORKDIR /app

# COPY package*.json ./

# RUN npm install
# COPY prisma ./prisma
# RUN npx prisma generate

# COPY . .
# RUN npm run build

# EXPOSE 3000

# CMD ["node", "dist/index.js"]


# builder stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

# production stage
FROM node:20-alpine AS prod
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]