import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    readonly username: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}