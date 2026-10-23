import 'dotenv/config';
import app from './app.js';
import { disconnectDatabase } from './lib/prisma.js';

const port = Number(process.env.PORT || 5000);
const server = app.listen(port, () => {
  console.log(`EthAum API listening on port ${port}`);
});

let isShuttingDown = false;

async function handleShutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  server.close(async () => {
    try {
      await disconnectDatabase();
      console.log('Database connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database disconnection:', err?.message || err);
      process.exit(1);
    }
  });

  // Force shutdown after timeout if pending connections do not drain
  setTimeout(() => {
    console.error('Graceful shutdown timeout exceeded. Forcing exit.');
    process.exit(1);
  }, 10000).unref();
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

export default server;
