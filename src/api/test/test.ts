import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export function Process(): MethodDecorator {
    return SetMetadata('TASK_PROCESS', 'ppooo'); // NOTE: no options for now
}