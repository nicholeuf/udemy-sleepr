# Development
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json

RUN npm install -g pnpm
RUN pnpm install
COPY apps/payments apps/payments
COPY libs libs
RUN cd apps/payments && pnpm install

RUN pnpm run build

# Production
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod

COPY --from=development  /usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]