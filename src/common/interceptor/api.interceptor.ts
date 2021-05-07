import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { CustomLogger } from '@src/global/log'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * 请求拦截器
 */
@Injectable()
export class ApiInterceptor implements NestInterceptor {
    private readonly logger: CustomLogger = new CustomLogger(ApiInterceptor.name)
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // the timestamp server got request
        const req = context.switchToHttp().getRequest();
        const logFormat = {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            query: req.query,
            body: req.body,
            params: req.params,
        }

        return next.handle().pipe(map(data => {
            logFormat['code'] = 200
            logFormat['data'] = data
            this.logger.request(JSON.stringify(logFormat))
            return {
                code: 200,
                data: data ?? "",
                message: "success"
            }
        }))
    }
}