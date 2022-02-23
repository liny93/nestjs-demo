import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

/**
 * 全局http异常过滤器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger('HttpException')

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const message = exception.message;
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;



        const errorResponse = {
            code: status,
            message: message
        };
        console.log(errorResponse);
        if (status !== 404) {
            this.logger.error(`Request original url: ${request.originalUrl}, error message: ${message}`)
        }
        // 设置返回的状态码、请求头、发送错误信息
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.json(errorResponse);
    }
}