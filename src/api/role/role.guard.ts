import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@src/api/role/role.decorator';
import { Role } from '@src/api/role/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler()); // 从控制器注解中得到的角色组信息。
        if (!roles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user)
            return false
        const hasRole = () => user.roles.some((role) => roles.includes(role)); // 是否匹配到角色
        return user && user.roles && hasRole();
    }
}
