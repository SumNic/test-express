#!/bin/sh

npx prisma migrate deploy
node ts-node-dev src/index.ts
