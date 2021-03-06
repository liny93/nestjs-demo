import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CustomLogger } from '@src/global/log';
/**
 * 全局http异常过滤器
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new CustomLogger('HttpException')
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const message = exception.message;
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

        // if (status === 404) {
        //     response.sendFile(resolve(__dirname, '../../../public/404.html'))
        //     return
        // }

        const errorResponse = {
            code: status,
            data: {},
            message: message
        };
        if (status !== 404) this.logger.error(`Request original url: ${request.originalUrl}, ip: ${request.ip.split(':').pop()} Method: ${request.method}, error message: ${message}`)

        const logFormat = {
            method: request.method,
            url: request.originalUrl,
            ip: request.ip,
            query: request.query,
            body: request.body,
            params: request.params,
            exception: message
        }
        this.logger.request(JSON.stringify(logFormat))

        // 设置返回的状态码、请求头、发送错误信息
        response.status(status);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.json(errorResponse);
    }
}