import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * 请求拦截器
 */
@Injectable()
export class ApiInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // the timestamp server got request
        return next.handle().pipe(map(data => {
            return {
                code: 200,
                data: data ?? "",
                message: "success"
            }
        }))
    }
}