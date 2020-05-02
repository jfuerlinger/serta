FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine

COPY --from=builder /app/dist /serta/runtime
COPY --from=builder /app/node_modules /serta/node_modules

WORKDIR '/serta/runtime'

CMD ["node", "index.js"]
