import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

/**
 * 异常过滤器
 */
@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
    private logger = new Logger(UnknownExceptionFilter.name)
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 500
        const errorResponse = {
            code: status,
            message: 'server error'
        };

        this.logger.error(`Unknown Server Error: ${exception.message}`)
        // 设置返回的状态码、请求头、发送错误信息
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.json(errorResponse);
    }
}