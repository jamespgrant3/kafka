FROM public.ecr.aws/docker/library/node:22-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./dist ./dist
COPY ./node_modules ./node_modules

CMD ["node", "dist/main.js"]
