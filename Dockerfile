FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile --production

COPY prisma ./prisma
COPY prisma7.config.ts ./
RUN bun prisma generate

COPY src ./src

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
