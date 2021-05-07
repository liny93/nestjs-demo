import { HttpExceptionFilter } from "./filter/httpexception.filter";
import { UnknownExceptionFilter } from "./filter/unknowexception.filter";
import { ApiInterceptor } from "./interceptor/api.interceptor";

export function register(app) {
    app.useGlobalInterceptors(new ApiInterceptor())
    app.useGlobalFilters(new UnknownExceptionFilter()); // 异常过滤器
    app.useGlobalFilters(new HttpExceptionFilter()); // 异常过滤器
}