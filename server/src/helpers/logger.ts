const pino = require('pino');
const day = require('dayjs');
import { logObject } from '../utils/constants';

require('dotenv/config');
const currentDay = day().format('DD_MM_YYYY');
const logState = process.env['logger'];

const consoleConfig = [
  {
    target: 'pino-pretty',
    options: {
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss.l',
      ignore: 'pid,hostname',
      colorize: true,
    },
  },
];
let writeLogConfig = [
  {
    target: consoleConfig[0]?.target,
    options: {
      ...consoleConfig[0]?.options,
      colorize: false,
      destination: `${process.cwd()}/logs/${currentDay}/tracking.log`,
      append: true,
      mkdir: true,
    },
  },
];

writeLogConfig = logState === logObject.on ? writeLogConfig : [];

const configuration = {
  transport: {
    targets: [...consoleConfig, ...writeLogConfig],
  },
};
export const logger = pino(configuration);
