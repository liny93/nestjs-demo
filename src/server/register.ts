import { INestApplication } from "@nestjs/common";
import { AppExceptionFilter } from "./filter/appException.filter";
import { HttpExceptionFilter } from "./filter/httpException.filter";
import { UnknownExceptionFilter } from "./filter/unknowException.filter";
import { ApiInterceptor } from "./interceptor/api.interceptor";

export function register(app: INestApplication) {
    app.useGlobalFilters(new UnknownExceptionFilter(), new HttpExceptionFilter(), new AppExceptionFilter());
    app.useGlobalInterceptors(new ApiInterceptor())
}