import 'dotenv/config';
import { createLogger } from './logger.js';
import { run } from './cli.js';
import { PreviewConfig } from './config.js';

const config = new PreviewConfig();
const logger = await createLogger(config.logDir);
await run(config, logger);
