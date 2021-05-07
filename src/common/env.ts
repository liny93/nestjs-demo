import * as dotenv from 'dotenv';
import { mkdirSync } from 'fs'
import { resolve } from 'path'
import logConfig from '../config/log'

const envs = {
    local: './env/.env.local',
    dev: './env/.env.dev',
    test: './env/.env.test',
    gray: './env/.env.gray',
    prod: './env/.env.prod',
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'local'
const NODE_ENV = process.env.NODE_ENV

dotenv.config({ path: envs[NODE_ENV] })

const logLevel = logConfig[NODE_ENV]
process.env.LOG_PATH = resolve(__dirname, '../../logs')
logLevel.forEach(val => mkdirSync(process.env.LOG_PATH + '/' + val, { recursive: true }))
