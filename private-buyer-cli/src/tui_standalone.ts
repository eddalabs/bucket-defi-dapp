import 'dotenv/config';
import { createLogger } from './logger.js';
import path from 'node:path';
import { run } from './cli.js';
import { DockerComposeEnvironment, Wait } from 'testcontainers';
import { currentDir, UndeployedConfig } from './config.js';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rli = createInterface({ input, output, terminal: true });
const choice = await rli.question('Start Docker containers? [Y/n]: ');
rli.close();

const config = new UndeployedConfig();
const logger = await createLogger(config.logDir);

const useDocker = choice.trim().toLowerCase() !== 'n';
const dockerEnv = useDocker
  ? new DockerComposeEnvironment(path.resolve(currentDir, '..'), 'standalone.yml')
      .withWaitStrategy('private-buyer-proof-server', Wait.forLogMessage('Actix runtime found; starting in Actix runtime', 1))
      .withWaitStrategy('private-buyer-indexer', Wait.forLogMessage('starting indexing', 1))
      .withWaitStrategy('private-buyer-node', Wait.forLogMessage('Running JSON-RPC server', 1))
  : undefined;

await run(config, logger, dockerEnv);
