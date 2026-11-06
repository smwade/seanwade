import { createSiteServer } from "./app.mjs";
const port = Number(process.env.PORT || 4174);
const host = process.env.HOST || "127.0.0.1";
const origin = process.env.CHAT_ORIGIN || `http://localhost:${port}`;
const server = createSiteServer({ origin, dataDir: process.env.CHAT_DATA_DIR });
server.listen(port, host, () =>
  console.log(`Portfolio server listening at ${origin}`),
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.close(() => process.exit(0)));
