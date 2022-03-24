import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private configService: ConfigService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) return true

        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization

        try {
            const info = verify(authorization, this.configService.get('JWT_PRIVATE_KEY'))
            if (info.roles.includes('admin')) return true
            if (new Set([...roles, ...info.roles]).size === roles.length + info.roles.length) return false
        } catch (error) {
            return false
        }

        return true
    }
}