/*
 * 封装统一的拦截用户输入请求错误参数拦截
 */
import { ArgumentMetadata, Injectable, PipeTransform, HttpException, HttpStatus, } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        console.log(metatype);
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        console.log(object, errors);

        if (!errors || errors.length <= 0) {
            return object;
        }


        const message = this.getMessage(errors)

        throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private getMessage(errors: ValidationError[]): string {
        if (errors[0].constraints) {
            for (const key of Object.keys(errors[0].constraints)) {
                return errors[0].constraints[key];
            }
        } else {
            let children = errors[0].children;
            while (children && children[0]) {
                if (children[0].constraints) {
                    for (const key of Object.keys(children[0].constraints)) {
                        return children[0].constraints[key];
                    }
                }
                children = children[0].children;
            }
        }
    }
}