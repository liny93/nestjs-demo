import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { resolve } from 'path'
/**
 * 异常过滤器
 */
@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
    private logger = new Logger(UnknownExceptionFilter.name)
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 500
        const errorResponse = {
            code: status,
            data: {},
            message: 'server error'
        };

        this.logger.error(`Server Error: ${exception}`)
        // 设置返回的状态码、请求头、发送错误信息
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.json(errorResponse);
    }
}