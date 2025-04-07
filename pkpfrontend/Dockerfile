# Build stage
FROM node:18.17.0-alpine AS builder
WORKDIR /staging
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18.17.0-alpine
WORKDIR /staging
COPY --from=builder /staging/next.config.mjs ./next.config.mjs
COPY --from=builder /staging/public ./public
COPY --from=builder /staging/.next ./.next
COPY --from=builder /staging/node_modules ./node_modules
COPY --from=builder /staging/package.json ./package.json

CMD ["npm", "start"]