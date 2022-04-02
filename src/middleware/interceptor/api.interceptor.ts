import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Request } from 'express';
import { nanoid } from 'nanoid'

/**
 * 请求拦截器
 */
@Injectable()
export class ApiInterceptor implements NestInterceptor {

    private readonly logger = new Logger(ApiInterceptor.name)

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();

        // setting request id
        if (!request.headers['x-request-id']) {
            request.headers['x-request-id'] = nanoid()
        }

        // this.logger.log(this.getRequestLog(request))

        return next.handle().pipe(map(data => {
            // this.logger.log(`requestId: ${request.headers['x-request-id']}, result: ${JSON.stringify(data)}`)
            return {
                code: 200,
                data: data ?? "",
                message: "success"
            }
        }))
    }

    getRequestLog(request: Request): string {
        let logTemplate = `url: ${request.url}`
        const apiKey = request.headers['x-api-key']
        const requestId = request.headers['x-request-id']
        if (apiKey) {
            logTemplate += `, apiKey: ${apiKey}`
        }
        if (requestId) {
            logTemplate += `, requestId: ${requestId}`
        }
        if (request.params) {
            logTemplate += `, params: ${JSON.stringify(request.params)}`
        }
        if (request.query) {
            logTemplate += `, query: ${JSON.stringify(request.query)}`
        }
        if (request.body) {
            logTemplate += `, body: ${JSON.stringify(request.body)}`
        }
        return logTemplate
    }
}
