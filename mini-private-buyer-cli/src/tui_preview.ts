import 'dotenv/config';
import { createLogger } from './logger.js';
import { run } from './cli.js';
import { currentDir, PreviewConfig } from './config.js';
import { DockerComposeEnvironment, Wait } from 'testcontainers';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rli = createInterface({ input, output, terminal: true });
const choice = await rli.question('Start Docker containers? [Y/n]: ');
rli.close();

const config = new PreviewConfig();
const logger = await createLogger(config.logDir);

const useDocker = choice.trim().toLowerCase() !== 'n';
const dockerEnv = useDocker
  ? new DockerComposeEnvironment(path.resolve(currentDir, '..'), 'proof-server.yml')
      .withWaitStrategy('proof-server', Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1))
  : undefined;

await run(config, logger, dockerEnv);
