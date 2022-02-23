import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { AppException } from "./appException";

/**
 * for routes
 */
@Catch(AppException)
export class AppExceptionFilter implements ExceptionFilter {
    private logger = new Logger(AppExceptionFilter.name)
    catch(exception: AppException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const errorResponse = {
            code: exception.code,
            message: exception.message,
        };
        this.logger.error(`Server Error: ${exception.message}`)

        // 设置返回的状态码、请求头、发送错误信息
        response.status(exception.httpStatus);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.json(errorResponse);
    }
}