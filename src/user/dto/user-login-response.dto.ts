import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

export class UserLoginResponseDto {
    @ApiProperty()
    token: string;

    constructor(token?: string) {
        this.token = token
    }
}
