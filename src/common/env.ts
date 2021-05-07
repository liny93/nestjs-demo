import * as dotenv from 'dotenv';
const envs = {
    local: './env/.env.local',
    dev: './env/.env.dev',
    test: './env/.env.test',
    gray: './env/.env.gray',
    prod: './env/.env.prod',
}
const NODE_ENV = process.env.NODE_ENV || 'local'
dotenv.config({ path: envs[NODE_ENV] })