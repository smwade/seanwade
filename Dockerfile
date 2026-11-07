FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=4174 CHAT_DATA_DIR=/app/data
COPY server/ ./server/
RUN mkdir -p /app/data && chown node:node /app/data
USER node
EXPOSE 4174
CMD ["node", "server/index.mjs"]
