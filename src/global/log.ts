import { Logger } from '@nestjs/common';
import { appendFile } from 'fs'
import * as dayjs from 'dayjs'
import { EOL } from 'os';
import logConfig from '@config/log'

export class CustomLogger extends Logger {
    private logPath: string
    private prefix: string
    private eol: string
    private logLevel: string[]

    constructor(context: string, isTimestampEnabled?: boolean) {
        super(context, isTimestampEnabled)
        this.logPath = process.env.LOG_PATH
        this.prefix = context
        this.eol = EOL
        this.logLevel = logConfig[process.env.NODE_ENV]
    }

    log(message: string) {
        if (!this.logLevel.includes('log')) return
        const filePath = `${this.logPath}/log/${this.prefix}.${dayjs().format('YYYYMMDD')}.log`
        appendFile(filePath, message + this.eol, 'utf-8', (err) => {
            if (err) super.error(err);
        })
        super.log(message)
    }

    debug(message: string) {
        if (!this.logLevel.includes('debug')) return
        const filePath = `${this.logPath}/debug/${this.prefix}.${dayjs().format('YYYYMMDD')}.log`
        appendFile(filePath, message + this.eol, 'utf-8', (err) => {
            if (err) super.error(err);
        })
        super.debug(message)
    }

    warn(message: string) {
        if (!this.logLevel.includes('warn')) return
        const filePath = `${this.logPath}/warn/${this.prefix}.${dayjs().format('YYYYMMDD')}.log`
        appendFile(filePath, message + this.eol, 'utf-8', (err) => {
            if (err) super.error(err);
        })
        super.warn(message)
    }

    error(message: string, trace?: string) {
        if (!this.logLevel.includes('error')) return
        const filePath = `${this.logPath}/error/${this.prefix}.${dayjs().format('YYYYMMDD')}.log`
        appendFile(filePath, message + this.eol, 'utf-8', (err) => {
            if (err) super.error(err);
        })
        super.error(message, trace)
    }

    verbose(message: string) {
        super.verbose(message)
    }

    request(message: string) {
        if (!this.logLevel.includes('request')) return
        const filePath = `${this.logPath}/request/${this.prefix}.${dayjs().format('YYYYMMDD')}.log`
        appendFile(filePath, message + this.eol, 'utf-8', (err) => {
            if (err) super.error(err);
        })
    }
}
